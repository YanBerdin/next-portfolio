"use client"

import React, { useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { ProjectsRefactorButton } from "@/components/ui/ProjectsRefactorButton"
import BackdropModal from "@/components/ui/BackdropModal"; // Add this line
import { Repositories } from "@/data/projectRefactoData";
//import { DemoIcon, GithubIcon2 } from "./ui/Icon";


type Technology = 'Html' | 'Css' | 'JS' | 'PHP' | 'Singleton' | 'Typescript' | 'React' | 'Next' | 'Laravel' | 'Symfony' | 'Node.js' | 'Tailwind' | 'Shadcn' | 'MySQL' | 'Heroku' | 'Vercel' | 'Aceternity' | 'PostCss' | 'Framer-Motion' | 'Sass' | 'DOMPurify' | 'Axios' | 'Composer' | 'Bootstrap' | 'Apache' | 'Active Record' | 'Eloquent' | 'Semantic UI' | 'PropTypes' | 'Rest API' | 'Redux' | 'AltoRouter' | 'Styled-components' | 'Vite'

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

const technologies: Technology[] = ['Html', 'Css', 'JS', 'PHP', 'Singleton', 'Typescript', 'React', 'Next', 'Laravel', 'Symfony', 'Node.js', 'Tailwind', 'Shadcn', 'MySQL', 'Heroku', 'Vercel', 'Aceternity', 'PostCss', 'Framer-Motion', 'Sass', 'DOMPurify', 'Axios', 'Composer', 'Bootstrap', 'Apache', 'Active Record', 'Eloquent', 'Semantic UI', 'PropTypes', 'Rest API', 'Redux', 'AltoRouter', 'Styled-components', 'Vite']


const myRepositories: Repository[] = Repositories.map(repo => ({
    ...repo,
    technologies: repo.technologies ?? []
}));
// 
export default function ProjectsRefactor() {
    const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
    const [visibleRepos, setVisibleRepos] = useState(6)

    {/*
     const filteredRepos = selectedTech
        ? mockRepositories.filter(repo => repo.technologies.includes(selectedTech))
        : mockRepositories
 */}

    const filteredRepos = selectedTech
        ? myRepositories.filter(repo => repo.technologies && repo.technologies.includes(selectedTech))
        : myRepositories

    const handleLoadMore = () => {
        setVisibleRepos(prev => prev + 3)
    }

    return (
            <div className="min-h-screen w-10/12 bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl rounded-lg text-white p-8 mx-auto">

                <nav className="mb-8">
                    <ul className="flex flex-wrap gap-2">
                        {technologies.map(tech => (
                            <li key={tech}>
                                <ProjectsRefactorButton
                                    variant={selectedTech === tech ? "default" : "outline"}
                                    onClick={() => setSelectedTech(tech)}
                                >
                                    {tech}
                                </ProjectsRefactorButton>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRepos.slice(0, visibleRepos).map(repo => (
                        <div key={repo.id} className="bg-gray-800 rounded-lg overflow-hidden min-w-[200px] max-w-[280px] lg:max-w-[300px] mx-auto">
                            <div className="relative h-48 md:h-64 lg:h-72 group">
                                <Image
                                    src={repo.img}
                                    alt={repo.title}
                                    fill={false}
                                    //objectFit="cover"
                                    width={540}
                                    height={420}
                                    loading="lazy"
                                    className={cn(
                                        'object-cover max-sm:p-2 p-3 shrink-1'
                                    )}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">

                                    <div className="space-x-4">
                                        <ProjectsRefactorButton variant="secondary" asChild>
                                            <a href={repo.githubLink} target="_blank" rel="noopener noreferrer">Code</a>
                                        </ProjectsRefactorButton>
                                        <ProjectsRefactorButton variant="secondary" asChild>
                                            <a href={repo.demoLink} target="_blank" rel="noopener noreferrer">Website</a>
                                        </ProjectsRefactorButton>
                                        <ProjectsRefactorButton variant="secondary" asChild>
                                            <BackdropModal id={repo.id} />
                                            { /* <a href={repo.detailsLink} target="_blank" rel="noopener noreferrer">Details</a>*/}
                                        </ProjectsRefactorButton>
                                    </div>

                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg md:text-xl font-semibold mb-2">{repo.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(repo.technologies ?? []).map(tech => (
                                        <span key={tech} className="max-sm:text-xs text-sm md:text-md bg-gray-700 max-sm:px-3 max-sm:py-1 px-5 py-1.5 rounded">
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
                        <ProjectsRefactorButton onClick={handleLoadMore}>Load More</ProjectsRefactorButton>
                    </div>
                )}
            </div>
    )
}