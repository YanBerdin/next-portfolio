import { FeaturedProjectCard } from "@/components/ui/Projects_ui/FeaturedProjectCard";
import { SecondaryProjectCard } from "@/components/ui/Projects_ui/SecondaryProjectCard";
import { TrainingProjectsList } from "@/components/ui/Projects_ui/TrainingProjectsList";
import { featuredProject, secondaryProjects } from "@/data/projectsShowcase";

export default function ProjectsRefactor() {
    const secondaryProjectLayout = secondaryProjects.length === 1 ? "wide" : "card";

    return (
        <section aria-labelledby="projets-titre" className="mx-auto w-11/12 max-w-6xl">
            <h2 id="projets-titre" className="heading text-3xl font-bold text-white-100 md:text-5xl">
                Projets
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-400">
                Une application livrée en production, puis des projets personnels.
            </p>

            <div className="mt-10">
                <FeaturedProjectCard project={featuredProject} />
            </div>

            <h3 className="mt-12 text-sm font-semibold uppercase tracking-widest text-slate-400">
                Projets personnels
            </h3>

            <div className="mt-4 grid gap-6 md:grid-cols-2">
                {secondaryProjects.map((project) => (
                    <SecondaryProjectCard
                        key={project.id}
                        project={project}
                        layout={secondaryProjectLayout}
                    />
                ))}
            </div>

            <div className="mt-8">
                <TrainingProjectsList />
            </div>
        </section>
    );
}
