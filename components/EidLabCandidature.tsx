import { Coffee, Github, ExternalLink } from "lucide-react";
import Link from "next/link";

const CAL_LINK = "https://calendly.com/yanberdin2025/30min";
const REPO_LINK = "https://github.com/YanBerdin/rougecardinalcompany/tree/master";
const SITE_LINK = "https://compagnie-rouge-cardinal.fr";

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-1.5 text-sm">
      <span className="min-w-0 text-stone-500">{label}</span>
      <span className={`min-w-0 break-words text-right ${strong ? "font-semibold text-stone-900" : "text-stone-800"}`}>
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="my-4 border-t-2 border-dashed border-stone-300" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone-400">
      {children}
    </p>
  );
}

function Barcode() {
  const widths = [2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 4, 1, 2, 1, 3, 1, 2];
  return (
    <div className="flex h-10 items-stretch gap-[2px]" aria-hidden="true">
      {widths.map((w, i) => (
        <div key={i} className="bg-stone-900" style={{ width: `${w}px` }} />
      ))}
    </div>
  );
}

export default function EidLabCandidature() {
  return (
    <div className="min-h-screen w-full bg-stone-100 px-4 py-16 font-sans text-stone-900">
      <div className="relative mx-auto max-w-md border border-stone-300 bg-white p-5 shadow-sm sm:p-8">
        {/* Tampon */}
        <div className="absolute -right-3 -top-3 -rotate-12 rounded-full border-2 border-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-700">
          Disponible
        </div>

        {/* En-tête ticket */}
        <p className="text-xs uppercase tracking-widest text-stone-400">Bon de livraison</p>
        <div className="mt-1 flex items-baseline justify-between font-mono text-xs text-stone-500">
          <span>N° CAND-2026-08</span>
          <span>08/08/2026</span>
        </div>

        <Divider />

        <div className="grid grid-cols-2 gap-4 font-mono text-xs">
          <div>
            <p className="text-stone-400">De</p>
            <p className="mt-1 font-semibold text-stone-900">Yan Berdin</p>
            <p className="text-stone-600">Développeur Web</p>
          </div>
          <div className="text-right">
            <p className="text-stone-400">À l'attention de</p>
            <p className="mt-1 font-semibold text-stone-900">Philippe Eid</p>
            <p className="text-stone-600">CEO, Eid Lab</p>
          </div>
        </div>

        <Divider />

        <SectionLabel>Poste proposé</SectionLabel>
        <div className="font-mono">
          <Row label="Rôle" value="Alternant Développeur Web" strong />
          <Row label="Stack" value="Next.js · React · TypeScript · PostgreSQL" />
          <Row label="Expérience produit" value="10 ans e-commerce" />
        </div>

        <Divider />

        <SectionLabel>Détail de la livraison — compagnie-rouge-cardinal.fr</SectionLabel>
        <div className="font-mono">
          <Row label="Auth JWT" value="2-5 ms ✓" />
          <Row label="Audit trail" value="27 tables" />
          <Row label="RLS PostgreSQL" value="100%" />
          <Row label="Médiathèque" value="Déduplication ✓" />
          <Row label="Tests" value="Unitaires + E2E ✓" />
          <Row label="Core Web Vitals" value="✓" />
          <Row label="Statut" value="EN PROD" strong />
        </div>

        <div className="mt-3 flex gap-4 font-mono text-xs">
          <Link
            href={SITE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-700 focus-visible:ring-offset-2"
          >
            <ExternalLink size={12} /> Voir le site
          </Link>
          <Link
            href={REPO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-700 focus-visible:ring-offset-2"
          >
            <Github size={12} /> Voir le code
          </Link>
        </div>

        <Divider />

        <SectionLabel>Commentaire client</SectionLabel>
        <p className="border-l-2 border-stone-300 pl-4 text-sm italic text-stone-600">
          Avant de coder des produits web, j'ai passé dix ans à les utiliser et les piloter côté business : e-commerce, conversion, expérience client et opérations.
          Aujourd'hui, je cherche surtout le collectif : code review, standards d'équipe, projets exigeants et progression au contact d'autres développeurs.
        </p>

        <Divider />

        <SectionLabel>Garantie</SectionLabel>
        <div className="font-mono">
          <Row label="Validité" value="Sans expiration" />
          <Row label="Motivation" value="À toute épreuve" />
        </div>

        <Divider />

        <div className="flex items-baseline justify-between font-mono text-sm">
          <span className="font-semibold text-stone-900">Total à payer</span>
          <span className="font-semibold text-stone-900">1 café virtuel</span>
        </div>

        <Link
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Réserver un café virtuel avec Yan Berdin"
          className="mt-6 flex w-full items-center justify-center gap-2 bg-stone-900 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
        >
          <Coffee size={16} />
          Réserve ton café virtuel
        </Link>

        <div className="mt-6">
          <Barcode />
        </div>
      </div>
    </div>
  );
}
