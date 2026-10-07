import Hero from "@/components/sections/Hero";
import Approche from "@/components/sections/Approche";
import RealisationsPreview from "@/components/sections/RealisationsPreview";
import VideoShowcase from "@/components/sections/VideoShowcase";
import AvantApres from "@/components/sections/AvantApres";
import About from "@/components/sections/About";
import Zone from "@/components/sections/Zone";
import Testimonials from "@/components/sections/Testimonials";
import CtaBand from "@/components/sections/CtaBand";
import { hasHomeVideo } from "@/lib/home-video";

export default function HomePage() {
  // La section vidéo s'insère en 04 quand le fichier est présent :
  // les sections suivantes se décalent d'un cran pour garder la numérotation juste.
  const shift = hasHomeVideo() ? 1 : 0;
  const n = (base: number) => String(base + shift).padStart(2, "0");

  return (
    <>
      <Hero />
      <Approche />
      <RealisationsPreview />
      <VideoShowcase index={n(3)} />
      <AvantApres index={n(4)} />
      <About index={n(5)} />
      <Zone index={n(6)} />
      <Testimonials index={n(7)} />
      <CtaBand />
    </>
  );
}
