import { ArrowUpRight } from "lucide-react";
import BlurImage from "@/components/ui/BlurImage";
import type { ShowcaseProject } from "@/data/projectsShowcase";

interface SecondaryProjectCardProps {
  project: ShowcaseProject;
  layout?: "card" | "wide";
}

export function SecondaryProjectCard({ project, layout = "card" }: SecondaryProjectCardProps) {
  const headingId = `projet-${project.id}`;
  const isWide = layout === "wide";

  return (
    <article
      aria-labelledby={headingId}
      className={`flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40 ${isWide ? "md:col-span-2 md:grid md:grid-cols-2" : ""}`}
    >
      <div
        className={`border-slate-800 bg-slate-950 ${isWide ? "border-b md:border-b-0 md:border-r" : "border-b"}`}
      >
        <BlurImage
          src={project.img}
          alt={project.alt}
          width={720}
          height={480}
          loading="lazy"
          className={`h-48 w-full object-cover object-top ${isWide ? "md:h-full md:min-h-72" : ""}`}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 id={headingId} className="text-lg lg:text-2xl font-semibold text-white-100">
          {project.title}
        </h3>
        <p className="mt-2 text-sm lg:text-base leading-relaxed text-slate-300">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded border border-slate-700 px-2 py-0.5 text-xs text-slate-400">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-4 pt-5">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-slate-200 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
            >
              {link.label}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
