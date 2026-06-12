type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/** En-tête sobre pour les pages internes (sous le header fixe). */
export default function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="bg-forest pt-32 pb-16 text-center text-cream lg:pt-40 lg:pb-20">
      <div className="container-content">
        {eyebrow && (
          <p className="eyebrow text-leaf-light animate-fade-in">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl lg:text-6xl animate-fade-in">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-cream/80 animate-fade-in">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
