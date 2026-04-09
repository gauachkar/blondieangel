import { useState } from "react";
import HeroSection from "./components/HeroSection";
import TrustBar from "./components/TrustBar";
import LiveStatusSection from "./components/LiveStatusSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import GallerySection from "./components/GallerySection";
import VideoTeasers from "./components/VideoTeasers";
import DropsCarousel from "./components/DropsCarousel";
import RequestForm from "./components/RequestForm";
import VIPSection from "./components/VIPSection";
import FAQSection from "./components/FAQSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FooterSection from "./components/FooterSection";
import MobileNav from "./components/MobileNav";
import ChatSimulator from "./components/ChatSimulator";
import FantasySpinner from "./components/FantasySpinner";
import AdminLogin from "./components/AdminLogin";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [spinnerOpen, setSpinnerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <main className="bg-[#0A0A0A] min-w-[320px] relative overflow-x-hidden">
      <HeroSection onChatOpen={() => setChatOpen(true)} />
      <TrustBar />
      <LiveStatusSection />
      <AboutSection />
      <MenuSection onChatOpen={() => setChatOpen(true)} />
      <GallerySection />
      <VideoTeasers />
      <DropsCarousel />
      <VIPSection />
      <RequestForm />
      <FAQSection />
      <TestimonialsSection />
      <FooterSection onAdminOpen={() => setAdminOpen(true)} />

      {/* Floating UI */}
      <MobileNav
        onChatOpen={() => setChatOpen(true)}
        onSpinnerOpen={() => setSpinnerOpen(true)}
      />

      {/* Modals */}
      {chatOpen && <ChatSimulator onClose={() => setChatOpen(false)} />}
      {spinnerOpen && <FantasySpinner onClose={() => setSpinnerOpen(false)} />}
      {adminOpen && <AdminLogin onClose={() => setAdminOpen(false)} />}
    </main>
  );
}
