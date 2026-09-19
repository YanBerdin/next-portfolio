import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { trainingProjects } from "@/data/projectsShowcase";

export function TrainingProjectsList() {
  return (
    <details className="group rounded-lg border border-slate-800 bg-slate-900/30">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm md:text-lg text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple">
        <span>Autres projets personnels</span>
        <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>

      <div className="border-t border-slate-800 px-5 py-4">
        <p className="mb-4 text-sm md:text-base text-slate-400">
          Travaux réalisés pendant ma formation. Je les laisse accessibles par transparence, sans les présenter comme des réalisations professionnelles.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {trainingProjects.map((project) => (
            <li key={project.githubLink} className="text-sm lg:text-base">
              <span className="text-slate-200">{project.title}</span>
              <span className="text-slate-400"> - {project.stack}</span>
              <span className="mt-1 flex flex-wrap gap-3">
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-slate-400 underline underline-offset-4 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
                >
                  Code
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                  <span className="sr-only">
                    de {project.title} (nouvel onglet)
                  </span>
                </Link>
                {project.demoLink && (
                  <Link
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-400 underline underline-offset-4 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
                  >
                    Démo
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                    <span className="sr-only">
                      de {project.title} (nouvel onglet)
                    </span>
                  </Link>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
