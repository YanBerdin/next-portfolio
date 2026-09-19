import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import RougeCardinalProductScreens from "@/components/RougeCardinalProductScreens";

import {
  ROUGE_CARDINAL_REPO_URL,
  ROUGE_CARDINAL_SITE_URL,
  architectureDecisions,
  caseStudyIntro,
  contextSection,
  measuredResults,
  productScreens,
  qualitySection,
  securitySection,
} from "@/data/rougeCardinalCaseStudy";

function SectionHeading({ step, children }: { step: string; children: React.ReactNode }) {
  return (
    <h2 className="flex items-baseline gap-3 text-xl lg:text-3xl font-semibold tracking-tight text-slate-100">
      <span className="font-mono text-sm text-slate-400" aria-hidden="true">
        {step}
      </span>
      {children}
    </h2>
  );
}

export default function RougeCardinalCaseStudy() {
  return (
    <main className="min-h-dvh bg-black-100 px-5 py-14 text-slate-300 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 underline-offset-4 hover:text-slate-100 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Retour aux projets
        </Link>

        <header className="mt-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            {caseStudyIntro.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl lg:text-6xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            {caseStudyIntro.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">{caseStudyIntro.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {caseStudyIntro.stack.map((tech) => (
              <li
                key={tech}
                className="rounded border border-slate-700 px-2.5 py-1 text-xs text-slate-400"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={ROUGE_CARDINAL_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-hitbox inline-flex h-11 items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-5 text-sm font-medium text-slate-100 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Voir le site en production
            </Link>
            <Link
              href={ROUGE_CARDINAL_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-hitbox inline-flex h-11 items-center gap-2 rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 hover:border-slate-500 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              <Github size={16} aria-hidden="true" />
              Voir le code source
            </Link>
          </div>
        </header>

        <section aria-labelledby="contexte" className="mt-16 border-t border-slate-800 pt-10">
          <SectionHeading step="01">
            <span id="contexte">{contextSection.title}</span>
          </SectionHeading>
          {contextSection.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-slate-400">
            Contraintes
          </h3>
          <ul className="mt-3 space-y-2">
            {contextSection.constraints.map((constraint) => (
              <li key={constraint} className="border-l border-slate-700 pl-4 leading-relaxed">
                {constraint}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="produit" className="mt-16 border-t border-slate-800 pt-10">
          <SectionHeading step="02">
            <span id="produit">{productScreens.title}</span>
          </SectionHeading>
          <p className="mt-4 leading-relaxed text-slate-400">{productScreens.intro}</p>
          <RougeCardinalProductScreens />
        </section>

        <section aria-labelledby="architecture" className="mt-16 border-t border-slate-800 pt-10">
          <SectionHeading step="03">
            <span id="architecture">Architecture</span>
          </SectionHeading>
          <p className="mt-4 leading-relaxed text-slate-400">
            Trois décisions structurantes, et ce qu&apos;elles ont coûté.
          </p>
          <div className="mt-8 space-y-12">
            {architectureDecisions.map((item) => (
              <article key={item.title}>
                <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-3 leading-relaxed">{item.decision}</p>
                <h4 className="mt-5 text-sm font-semibold uppercase tracking-widest text-slate-400">
                  Pourquoi
                </h4>
                <ul className="mt-3 space-y-2">
                  {item.why.map((reason) => (
                    <li key={reason} className="border-l border-slate-700 pl-4 leading-relaxed">
                      {reason}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-slate-400">
                  <span className="font-semibold text-slate-300">Contrepartie - </span>
                  {item.tradeoff}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="resultats" className="mt-16 border-t border-slate-800 pt-10">
          <SectionHeading step="04">
            <span id="resultats">Résultats mesurés</span>
          </SectionHeading>
          <dl className="mt-8 space-y-8">
            {measuredResults.map((result) => (
              <div key={result.label}>
                <dt className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-sm uppercase tracking-widest text-slate-400">
                    {result.label}
                  </span>
                  <span className="font-mono text-lg font-semibold text-slate-100">
                    {result.value}
                  </span>
                </dt>
                <dd className="mt-2 leading-relaxed text-slate-400">{result.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="securite" className="mt-16 border-t border-slate-800 pt-10">
          <SectionHeading step="05">
            <span id="securite">{securitySection.title}</span>
          </SectionHeading>
          <p className="mt-4 leading-relaxed text-slate-400">{securitySection.intro}</p>

          <ol className="mt-8 space-y-3">
            {securitySection.layers.map((layer, index) => (
              <li key={layer.step} className="relative">
                <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-slate-400" aria-hidden="true">
                      {layer.step}
                    </span>
                    <span className="font-semibold text-slate-100">{layer.name}</span>
                  </p>
                  <p className="mt-1 pl-7 text-sm leading-relaxed text-slate-400">{layer.detail}</p>
                </div>
                {index < securitySection.layers.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-auto block h-3 w-px bg-slate-700"
                  />
                )}
              </li>
            ))}
          </ol>

          <h3 className="mt-10 text-sm font-semibold uppercase tracking-widest text-slate-400">
            {securitySection.roleModel.title}
          </h3>
          <p className="mt-3 leading-relaxed">{securitySection.roleModel.body}</p>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-slate-400">
            Principes appliqués
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {securitySection.principles.map((principle) => (
              <li
                key={principle}
                className="rounded border border-slate-700 px-2.5 py-1 text-xs text-slate-400"
              >
                {principle}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-slate-400">
            {securitySection.headers.title}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {securitySection.headers.items.map((header) => (
              <li
                key={header}
                className="rounded border border-slate-700 px-2.5 py-1 font-mono text-xs text-slate-400"
              >
                {header}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="qualite" className="mt-16 border-t border-slate-800 pt-10">
          <SectionHeading step="06">
            <span id="qualite">Qualité et exploitation</span>
          </SectionHeading>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {qualitySection.map((item) => (
              <article key={item.title}>
                <h3 className="text-base font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>

          <figure className="mt-10">
            <Link
              href="/capture-run-CI-vert-(lint,typecheck,tests).jpeg"
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg border border-slate-700 bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
              aria-label="Voir la capture du run CI réussi en taille réelle"
            >
              <Image
                src="/capture-run-CI-vert-(lint,typecheck,tests).jpeg"
                alt="Run GitHub Actions réussi avec huit contrôles validés, dont lint, typecheck, tests unitaires et tests end-to-end."
                width={801}
                height={491}
                sizes="(max-width: 767px) calc(100vw - 2.5rem), 768px"
                className="h-auto w-full"
              />
            </Link>
            <figcaption className="mt-4">
              <h3 className="text-base font-semibold text-slate-100">Pipeline CI validé</h3>
              <p className="mt-2 leading-relaxed text-slate-400">
                Huit contrôles réussis sur le même run : analyse CodeQL, preview Supabase,
                déploiement Vercel, tests E2E, lint, typecheck et tests unitaires.
              </p>
            </figcaption>
          </figure>
        </section>

        <section aria-labelledby="liens" className="mt-16 border-t border-slate-800 pt-10">
          <SectionHeading step="07">
            <span id="liens">Liens</span>
          </SectionHeading>
          <ul className="mt-6 space-y-3">
            <li>
              <Link
                href={ROUGE_CARDINAL_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-200 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
              >
                <ExternalLink size={16} aria-hidden="true" />
                compagnie-rouge-cardinal.fr - application en production
              </Link>
            </li>
            <li>
              <Link
                href={ROUGE_CARDINAL_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-200 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
              >
                <Github size={16} aria-hidden="true" />
                github.com/YanBerdin/rougecardinalcompany - code source
              </Link>
            </li>
          </ul>
        </section>

        <footer className="mt-16 border-t border-slate-800 pt-8">
          <Link
            href="/#contact"
            className="text-slate-200 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            Parlons-en
          </Link>
        </footer>
      </div>
    </main>
  );
}
