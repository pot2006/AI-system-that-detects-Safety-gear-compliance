import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import UseCases from "../components/landing/UseCases";
import ContactSection from "../components/landing/ContactSection";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#07110D] dark:text-white">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
