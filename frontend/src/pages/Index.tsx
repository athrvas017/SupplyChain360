import { useNavigate } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Logos from "@/components/site/Logos";
import Features from "@/components/site/Features";
import Routes from "@/components/site/RouteMap";
import Risk from "@/components/site/RiskSection";
import CTA from "@/components/site/CTA";
import Footer from "@/components/site/Footer";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/trace?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero onSearch={handleSearch} />
      <Logos />
      <Features />
      <Routes />
      <Risk />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
