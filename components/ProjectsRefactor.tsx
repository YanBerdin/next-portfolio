"use client"

import React, { useState } from 'react'
import cn from 'classnames'
// import Image from 'next/image'
import { ProjectsRefactorButton } from "@/components/ui/Projects_ui/ProjectsRefactorButton"
import BackdropModal from "@/components/ui/Projects_ui/BackdropModal";
import BlurImage from "@/components/ui/BlurImage";
import { Repositories } from "@/data/projectRefactoData";
//import { DemoIcon, GithubIcon2 } from "./ui/Icon";


type Technology = 'Html' | 'Css' | 'JS' | 'PHP' | 'Singleton' | 'Typescript' | 'React' | 'Next' | 'Laravel' | 'Symfony' | 'Node.js' | 'Express' | 'Tailwind' | 'Shadcn' | 'MySQL' | 'Heroku' | 'Vercel' | 'Aceternity' | 'PostCss' | 'Framer-Motion' | 'Sass' | 'Axios' | 'Composer' | 'Bootstrap' | 'Apache' | 'Active Record' | 'Eloquent' | 'Semantic UI' | 'PropTypes' | 'Redux' | 'AltoRouter' | 'Styled-components' | 'Vite' | 'CORS' | 'JWT' | 'Swagger'

interface Repository {
    id: number
    title: string
    // image: string // img
    // codeLink: string // githubLink
    // websiteLink: string // demoLink
    // detailsLink: string
    description: string,
    explanationList: string[],
    className: string,
    imgClassName: string,
    titleClassName: string,
    img: string,
    alt: string,
    width: number,
    height: number,
    spareImg: string,
    demoLink: string,
    githubLink: string,
    // technologies: Technology[]
    technologies: string[]
}

const technologies: Technology[] = ['Html', 'Css', 'PHP', 'JS', 'Typescript', 'Sass', 'PostCss', 'React', 'Redux', 'Next', 'Framer-Motion', 'Vite', 'Axios', 'Node.js', 'Express', 'Apache', 'Singleton', 'Laravel', 'Symfony', 'AltoRouter', 'Composer', 'MySQL', 'Eloquent', 'Bootstrap', 'Tailwind', 'Semantic UI', 'Styled-components', 'PropTypes', 'CORS', 'JWT', 'Swagger',]


const myRepositories: Repository[] = Repositories.map(repo => ({
    ...repo,
    technologies: repo.technologies ?? []
}));
// 
export default function ProjectsRefactor() {
    const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
    const [visibleRepos, setVisibleRepos] = useState(6)
    const [visibleTechCount, setVisibleTechCount] = useState(12); // Affiche seulement 9 technologies au départ

    const handleLoadMoreTechnologies = () => {
        setVisibleTechCount(technologies.length); // Affiche toutes les technologies
    };

    const filteredRepos = selectedTech
        ? myRepositories.filter(repo => repo.technologies && repo.technologies.includes(selectedTech))
        : myRepositories

    const handleLoadMore = () => {
        setVisibleRepos(numVisibleRepos => numVisibleRepos + 3)
    }

    return (
        <>
            <div className="h-10"></div>

            <div className="flex flex-col pointer-events-none w-11/12 mx-auto">
                <h2 className="max-sm:text-2xl text-3xl lg:text-4xl font-bold text-center mt-3 mb-10 text-white-100">
                    Découvrez
                    <span className="bg-gradient-to-b from-[#9f96f5]  to-[#6c47d2] text-transparent bg-clip-text edge:text-purple">
                        {" "}
                        mes projets
                        {" "}
                    </span>
                    récents
                </h2>
            </ div>
            <div className="min-h-screen w-11/12 bg-slate-900/[0.9] border border-slate-800 backdrop-blur-xl rounded-lg text-white p-8 mx-auto">

                {/* Navbar des technologies */}
                <nav className="mb-8">
                    <ul className="flex flex-wrap gap-2 justify-center">
                        {technologies.slice(0, visibleTechCount).map(tech => (
                            <li key={tech}>
                                <ProjectsRefactorButton
                                    variant={selectedTech === tech ? "default" : "secondary"}
                                    // onClick={() => setSelectedTech(tech)}
                                    onClick={() => setSelectedTech(currentTech => currentTech === tech ? null : tech)}
                                >
                                    {tech}
                                </ProjectsRefactorButton>
                            </li>
                        ))}
                        {visibleTechCount < technologies.length && (
                            <li>
                                <ProjectsRefactorButton onClick={handleLoadMoreTechnologies}>
                                    Plus de Technos
                                </ProjectsRefactorButton>
                            </li>
                        )}
                    </ul>

                </nav>

                {/* Liste des projets filtrés */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 md:mt-16">
                    {filteredRepos.slice(0, visibleRepos).map(repo => (
                        <div key={repo.id} className="bg-slate-800/[0.8] border border-slate-700 backdrop-blur-xl rounded-lg overflow-hidden min-w-[180px] max-w-[290px] lg:max-w-[310px] mx-auto">
                            <div className="relative group"> {/* min-h-36 md:h-64 lg:h-72 */}
                                <BlurImage
                                    src={repo.img}
                                    alt={repo.title}
                                    fill={false}
                                    width={520}
                                    height={420}
                                    loading="lazy"
                                    className={cn(
                                        'object-cover px-4 shrink-1 group-hover:scale-95 transition-transform duration-300 ease-in-out',
                                    )}
                                />

                                <div className="absolute inset-0 bg-blue-200 bg-opacity-50 opacity-0 origin-center group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg p-2 ease-in-out">

                                    <div className="space-x-1 inline-flex shrink-1">
                                        <ProjectsRefactorButton variant="secondary" asChild>
                                            <a href={repo.githubLink} target="_blank" rel="noopener noreferrer">Code</a>
                                        </ProjectsRefactorButton>
                                        {repo.demoLink && (
                                            <ProjectsRefactorButton variant="secondary" asChild>
                                                <a href={repo.demoLink} target="_blank" rel="noopener noreferrer">Website</a>
                                            </ProjectsRefactorButton>
                                        )}
                                        <ProjectsRefactorButton variant="secondary" asChild>
                                            <BackdropModal id={repo.id} />
                                            { /* <a href={repo.detailsLink} target="_blank" rel="noopener noreferrer">Details</a>*/}
                                        </ProjectsRefactorButton>
                                    </div>

                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="max-sm:text-sm text-xl font-semibold mb-4 text-white-100">{repo.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(repo.technologies ?? []).map(tech => (
                                        <span key={tech} className="text-xs lg:text-sm bg-slate-700 max-sm:px-3 max-sm:py-1 px-4 py-1.5 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleRepos < filteredRepos.length && (
                    <div className="mt-8 text-center">
                        <ProjectsRefactorButton onClick={handleLoadMore}>Voir tous les projets</ProjectsRefactorButton>
                    </div>
                )}
            </div>
            <div className="h-0 lg:h-24 xl:h-48"></div> {/* 48 */}
        </>
    )
}