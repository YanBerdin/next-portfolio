"use client";

import React, { useState } from 'react';
import cn from 'classnames';
// import Image from 'next/image'
import { ProjectsRefactorButton } from "@/components/ui/Projects_ui/ProjectsRefactorButton";
import BackdropModal from "@/components/ui/Projects_ui/BackdropModal";
import BlurImage from "@/components/ui/BlurImage";
import { Repositories } from "@/data/projectRefactoData";
//import { DemoIcon, GithubIcon2 } from "./ui/Icon";
import { motion } from 'framer-motion';


type Technology = 'Html' | 'Css' | 'JS' | 'PHP' | 'Typescript' | 'React' | 'React Native' | 'Next' | 'Nuxt' | 'Laravel' | 'Symfony' | 'Node.js' | 'Express' | 'Tailwind' | 'Shadcn' | 'MySQL' | 'PostgreSQL' | 'Heroku' | 'Vercel' | 'Aceternity' | 'SCSS' | 'PostCss' | 'Framer-Motion' | 'Axios' | 'Composer' | 'Bootstrap' | 'Apache' | 'Eloquent' | 'Semantic UI' | 'PropTypes' | 'Redux' | 'AltoRouter' | 'Styled-components' | 'Vite' | 'CORS' | 'JWT' | 'Swagger' | 'Supabase' | 'Strapi' | 'Mongoose' | 'MongoDb'

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

const technologies: Technology[] = ['Html', 'Css', 'PHP', 'JS', 'Typescript', 'React', 'React Native', 'Redux', 'Next', 'Nuxt', 'SCSS', 'PostCss', 'Framer-Motion', 'Vite', 'Axios', 'Node.js', 'Express', 'Apache', 'Laravel', 'Symfony', 'AltoRouter', 'Composer', 'MySQL', 'PostgreSQL', 'Eloquent', 'Bootstrap', 'Tailwind', 'Semantic UI', 'Styled-components', 'PropTypes', 'CORS', 'JWT', 'Swagger', 'Supabase', 'Strapi', 'Mongoose', 'MongoDb']


const myRepositories: Repository[] = Repositories.map(repo => ({
    ...repo,
    technologies: repo.technologies ?? []
}));

export default function ProjectsRefactor() {
    const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
    const [visibleRepos, setVisibleRepos] = useState(3)
    const [visibleTechCount, setVisibleTechCount] = useState(10); // Affiche seulement 9 technologies au départ

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
                <motion.h2 className="heading font-bold text-center mt-3 mb-10 text-white-100"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Découvrez
                    <span className="bg-gradient-to-b from-[#9f96f5]  to-[#6c47d2] text-transparent bg-clip-text edge:text-purple">
                        {" "}
                        mes projets
                        {" "}
                    </span>
                    récents
                </motion.h2>
            </ div>
            <motion.div className=" w-11/12 bg-slate-900/[0.9] border border-slate-800 backdrop-blur-xl rounded-lg text-slate-100 p-8 mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >

                {/* Navbar des technologies */}
                <nav className="mb-8">
                    <motion.ul className="flex flex-wrap gap-2 justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        {technologies.slice(0, visibleTechCount).map(tech => (
                            <motion.li
                                key={tech}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <ProjectsRefactorButton
                                    variant={selectedTech === tech ? "default" : "secondary"}
                                    // onClick={() => setSelectedTech(tech)}
                                    onClick={() => setSelectedTech(currentTech => currentTech === tech ? null : tech)}
                                >
                                    {tech}
                                </ProjectsRefactorButton>
                            </motion.li>
                        ))}
                        {visibleTechCount < technologies.length && (
                            <motion.li>
                                <ProjectsRefactorButton onClick={handleLoadMoreTechnologies}>
                                    Plus de Technos
                                </ProjectsRefactorButton>
                            </motion.li>
                        )}
                    </motion.ul>

                </nav>

                {/* Liste des projets filtrés */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 md:mt-16">
                    {filteredRepos.slice(0, visibleRepos).map(repo => (
                        <motion.div key={repo.id} className="bg-slate-800/[0.8] border border-slate-700 backdrop-blur-xl rounded-lg overflow-hidden min-w-[180px] max-w-[290px] lg:max-w-[310px] mx-auto"
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
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
                        </motion.div>
                    ))}
                </div>

                {visibleRepos < filteredRepos.length && (
                    <motion.div className="mt-8 text-center"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <ProjectsRefactorButton onClick={handleLoadMore}>Voir tous les projets</ProjectsRefactorButton>
                    </motion.div>
                )}
            </motion.div>
            <div className="h-0 lg:h-24 xl:h-48"></div> {/* 48 */}
        </>
    )
}