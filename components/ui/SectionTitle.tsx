import { cn } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "eyebrow flex items-center gap-2.5",
              align === "center" && "justify-center",
              light && "text-leaf-light",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "h-px w-7",
                light ? "bg-leaf-light/60" : "bg-leaf-dark/50",
              )}
            />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "mt-4 text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl",
            light ? "text-white" : "text-forest",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed sm:text-lg",
              light ? "text-cream/85" : "text-forest-dark/75",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
