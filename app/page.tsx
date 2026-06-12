import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import RealisationsPreview from "@/components/sections/RealisationsPreview";
import About from "@/components/sections/About";
import Zone from "@/components/sections/Zone";
import Testimonials from "@/components/sections/Testimonials";
import CtaBand from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <RealisationsPreview />
      <About />
      <Zone />
      <Testimonials />
      <CtaBand />
    </>
  );
}
