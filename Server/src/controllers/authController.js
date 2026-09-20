import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

// =========================
// Register with email/password
// =========================
export const registerUser = async (req, res) => {
  try {
    const { name, email, organization, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      organization: organization?.trim() || "",
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        organization: user.organization || "",
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while registering user",
    });
  }
};

// =========================
// Login with email/password
// =========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check account status
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "This account has been disabled",
      });
    }

    // Make sure the account has a password
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "This account uses Google login. Please continue with Google.",
      });
    }

    // Compare password with hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Return authentication data
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization || "",
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while logging in",
    });
  }
};
// =========================
// Google Login / Signup
// =========================
export const loginWithGoogle = async (req, res) => {
  try {
    const { credential, mode = "login" } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google credential",
      });
    }

    const {
      sub: googleId,
      name,
      email,
      email_verified: emailVerified,
    } = payload;

    if (!email || !emailVerified) {
      return res.status(401).json({
        success: false,
        message: "Google email could not be verified",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ==========================================
    // Find existing Vigil account
    // ==========================================
    let user = await User.findOne({
      googleId,
    });

    // If Google ID is not linked,
    // check whether this email already exists.
    if (!user) {
      user = await User.findOne({
        email: normalizedEmail,
      });
    }

    // ==========================================
    // GOOGLE LOGIN
    // ==========================================
    if (mode === "login") {
      // No Vigil account exists
      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "No Vigil account found with this Google account. Please sign up first.",
        });
      }

      // Account exists but Google ID isn't linked yet
      if (!user.googleId) {
        user.googleId = googleId;

        if (!user.name && name) {
          user.name = name;
        }

        await user.save();
      }
    }

    // ==========================================
    // GOOGLE SIGNUP
    // ==========================================
    if (mode === "signup") {
      // Account already exists
      if (user) {
        return res.status(409).json({
          success: false,
          message:
            "A Vigil account already exists with this Google account or email. Please sign in instead.",
        });
      }

      // Create new Vigil account
      user = await User.create({
        name: name || "Vigil User",
        email: normalizedEmail,
        googleId,
        organization: "",
        role: "safety_manager",
      });
    }

    // ==========================================
    // Validate mode
    // ==========================================
    if (mode !== "login" && mode !== "signup") {
      return res.status(400).json({
        success: false,
        message: "Invalid authentication mode",
      });
    }

    // ==========================================
    // Check account status
    // ==========================================
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "This account has been disabled",
      });
    }

    // ==========================================
    // Generate JWT
    // ==========================================
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message:
        mode === "signup"
          ? "Google signup successful"
          : "Google login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        organization: user.organization || "",
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};
