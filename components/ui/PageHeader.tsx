type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/**
 * En-tête des pages internes : entrée échelonnée (fondu + montée) en CSS pur.
 * Composant serveur — aucun JS embarqué. `prefers-reduced-motion` est géré
 * globalement dans globals.css (animations neutralisées).
 */
export default function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="bg-forest pt-32 pb-16 text-center text-cream lg:pt-40 lg:pb-20">
      <div className="container-content">
        {eyebrow && (
          <p
            className="eyebrow flex animate-rise-in items-center justify-center gap-2.5 text-leaf-light"
            style={{ animationDelay: "0ms" }}
          >
            <span aria-hidden className="h-px w-7 bg-leaf-light/60" />
            {eyebrow}
          </p>
        )}
        <h1
          className="mt-4 animate-rise-in text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "100ms" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mx-auto mt-5 max-w-2xl animate-rise-in leading-relaxed text-cream/80"
            style={{ animationDelay: "200ms" }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
