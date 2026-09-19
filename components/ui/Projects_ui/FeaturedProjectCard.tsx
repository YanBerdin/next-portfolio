import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlurImage from "@/components/ui/BlurImage";
import type { ProjectLink, ShowcaseProject } from "@/data/projectsShowcase";

function PrimaryLink({ link }: { link: ProjectLink }) {
  const className =
    "inline-flex items-center gap-1.5 rounded-md border border-slate-600 bg-slate-950/60 px-4 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:border-slate-400 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple";

  if (!link.external) {
    return (
      <Link href={link.href} className={className}>
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
      <ArrowUpRight className="size-4" aria-hidden="true" />
      <span className="sr-only">(nouvel onglet)</span>
    </a>
  );
}

export function FeaturedProjectCard({ project }: { project: ShowcaseProject }) {
  const headingId = `projet-${project.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className="grid gap-8 rounded-lg border border-slate-800 bg-slate-900/60 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center"
    >
      <div className="overflow-hidden rounded-md border border-slate-800 bg-slate-950">
        <BlurImage
          src={project.img}
          alt={project.alt}
          width={1040}
          height={840}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Projet en production</p>
        <h3 id={headingId} className="mt-2 text-2xl font-semibold text-white-100 md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-slate-300">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded border border-slate-700 px-2.5 py-1 text-xs text-slate-400">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <PrimaryLink key={link.href} link={link} />
          ))}
        </div>
      </div>
    </article>
  );
}
