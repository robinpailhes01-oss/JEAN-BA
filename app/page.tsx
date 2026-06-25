import Hero from "@/components/sections/Hero";
import Approche from "@/components/sections/Approche";
import RealisationsPreview from "@/components/sections/RealisationsPreview";
import AvantApres from "@/components/sections/AvantApres";
import About from "@/components/sections/About";
import Zone from "@/components/sections/Zone";
import Testimonials from "@/components/sections/Testimonials";
import CtaBand from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Approche />
      <RealisationsPreview />
      <AvantApres />
      <About />
      <Zone />
      <Testimonials />
      <CtaBand />
    </>
  );
}
