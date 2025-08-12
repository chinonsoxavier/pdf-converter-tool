import HeroSection from "@/components/landing/hero_section";
import ToolsSection from "@/components/landing/tools_section";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { EmailCapture } from "@/components/landing/email_capture";
import SidemenuLyout from "@/components/layout/sidemenu_layout";

const LandingPage = () => {
  return (
    <>
      {/* Header layout */}
      <Header isLanding />

      {/* side menu */}
      <SidemenuLyout/>

      {/* main content */}

      <main>
        {/* hero section */}
        <HeroSection />

        {/* tools section */}
        <ToolsSection />

        {/* email capture */}
        <EmailCapture />
      </main>

      {/* footer */}
      <Footer />
    </>
  );
};

export default LandingPage;
