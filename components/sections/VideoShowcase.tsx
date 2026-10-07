import { HOME_VIDEO } from "@/lib/constants";
import { hasHomeVideo } from "@/lib/home-video";
import SectionIntro from "@/components/ui/SectionIntro";
import Reveal from "@/components/motion/Reveal";

/**
 * Film de présentation, placé entre les réalisations et les avant/après.
 * La section n'est rendue que si le fichier existe dans /public : on évite
 * ainsi un lecteur cassé tant que la vidéo n'a pas été ajoutée.
 * Le lecteur s'adapte au format de la vidéo (paysage ou portrait).
 */
export default function VideoShowcase({ index = "04" }: { index?: string }) {
  if (!hasHomeVideo()) return null;

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="container-content">
        <SectionIntro
          index={index}
          label={HOME_VIDEO.label}
          title={
            <>
              {HOME_VIDEO.title}{" "}
              <span className="accent-italic">{HOME_VIDEO.titleAccent}</span>
            </>
          }
          description={HOME_VIDEO.description}
        />

        <Reveal className="mt-14 flex justify-center">
          {/* #t=0.1 : force l'affichage de la première image sur iOS */}
          <video
            src={`${HOME_VIDEO.src}#t=0.1`}
            aria-label={HOME_VIDEO.ariaLabel}
            controls
            playsInline
            preload="metadata"
            className="block h-auto max-h-[80vh] w-auto max-w-full rounded-[2rem] bg-forest-dark shadow-card"
          />
        </Reveal>
      </div>
    </section>
  );
}
