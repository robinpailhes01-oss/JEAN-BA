import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 ease-smooth hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-[850ms] before:ease-out hover:before:translate-x-full motion-reduce:before:hidden";

const variants: Record<Variant, string> = {
  // CTA principal — Vert Feuille de la charte
  primary:
    "bg-leaf text-white shadow-soft hover:bg-leaf-dark hover:shadow-card",
  outline:
    "border border-white/70 text-white hover:border-white hover:bg-white hover:text-forest",
  ghost:
    "border border-forest/20 text-forest hover:border-forest hover:bg-forest hover:text-white",
  light:
    "bg-white text-forest shadow-soft hover:shadow-card",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);
  // Le contenu reste au-dessus du reflet (sheen) qui balaie le bouton
  const content = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
    </span>
  );

  if (props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props;
    const isExternal = href.startsWith("http") || href.startsWith("tel:");
    if (isExternal) {
      return (
        <a href={href} className={classes} {...rest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } =
    props;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
