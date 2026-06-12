"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "Création de jardin",
  "Aménagement de terrasse",
  "Abords de piscine / bassin",
  "Entretien / contrat annuel",
  "Arrosage automatique",
  "Autre projet",
];

type Status = "idle" | "loading" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [errorMsg, setErrorMsg] = useState("");

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (name.length < 2) next.name = "Merci d'indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Adresse e-mail invalide.";
    if (phone.replace(/[\s.()-]/g, "").length < 8)
      next.phone = "Numéro de téléphone invalide.";
    if (message.length < 10)
      next.message = "Votre message est un peu court (10 caractères min.).";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot anti-spam
    if (data.get("company")) return;

    const validation = validate(data);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          projectType: data.get("projectType"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Une erreur est survenue.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Réessayez ou appelez-nous.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-white p-10 text-center shadow-soft">
        <CheckCircle2 size={56} className="text-leaf" strokeWidth={1.5} />
        <h3 className="mt-5 font-display text-2xl text-forest">
          Message bien reçu&nbsp;!
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-forest-dark/70">
          Merci pour votre demande. Nous revenons vers vous sous 48&nbsp;heures
          pour échanger sur votre projet.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-leaf-dark link-underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-xl border bg-cream/50 px-4 py-3 text-sm text-forest-dark transition-colors placeholder:text-forest-dark/40 focus:border-leaf focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf/30";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl bg-white p-7 shadow-soft sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" error={errors.name} htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Marie Dupont"
            className={cn(inputBase, errors.name ? "border-red-400" : "border-beige-dark")}
          />
        </Field>

        <Field label="Téléphone" error={errors.phone} htmlFor="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            className={cn(inputBase, errors.phone ? "border-red-400" : "border-beige-dark")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="E-mail" error={errors.email} htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="marie.dupont@email.fr"
            className={cn(inputBase, errors.email ? "border-red-400" : "border-beige-dark")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Type de projet" htmlFor="projectType">
          <select
            id="projectType"
            name="projectType"
            defaultValue={PROJECT_TYPES[0]}
            className={cn(inputBase, "border-beige-dark")}
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Votre projet" error={errors.message} htmlFor="message" required>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Décrivez votre projet, la surface concernée, vos envies…"
            className={cn(inputBase, "resize-none", errors.message ? "border-red-400" : "border-beige-dark")}
          />
        </Field>
      </div>

      {/* Honeypot caché anti-spam */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && (
        <p className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={18} className="shrink-0" />
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-leaf px-7 py-4 text-sm font-semibold text-white shadow-soft transition-all duration-300 ease-smooth hover:bg-leaf-dark hover:shadow-card disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Envoi en cours…
          </>
        ) : (
          <>
            <Send size={18} /> Envoyer ma demande
          </>
        )}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-forest-dark/50">
        En envoyant ce formulaire, vous acceptez que vos données soient utilisées
        pour traiter votre demande. Voir notre{" "}
        <a href="/politique-confidentialite" className="link-underline text-leaf-dark">
          politique de confidentialité
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-forest"
      >
        {label}
        {required && <span className="text-leaf-dark"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
