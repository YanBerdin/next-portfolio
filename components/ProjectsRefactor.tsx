"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { ProjectsRefactorButton } from "@/components/ui/ProjectsRefactorButton"
//import { DemoIcon, GithubIcon2 } from "./ui/Icon";

type Technology = 'Html' | 'Css' | 'JS' | 'PHP' | 'Singleton' | 'Typescript' | 'React' | 'Next' | 'Laravel' | 'Symfony' | 'Node.js' | 'Tailwind' | 'Sql' | 'MariaDb' | 'Mysql' | 'MongoDB' | 'Redis' | 'Firebase' | 'React Native' | 'DigitalOcean' | 'Cloud Functions' | 'Heroku' | 'Vercel'

type Repository = {
    id: number
    title: string
    image: string
    codeLink: string
    websiteLink: string
    detailsLink: string
    technologies: Technology[]
}

const technologies: Technology[] = ['Html', 'Css', 'JS', 'PHP', 'Singleton', 'Typescript', 'React', 'Next', 'Laravel', 'Symfony', 'Node.js', 'Tailwind', 'Sql', 'MariaDb', 'Mysql', 'MongoDB', 'Redis', 'Firebase', 'React Native', 'DigitalOcean', 'Cloud Functions', 'Heroku', 'Vercel']

// Mock data for repositories
const mockRepositories: Repository[] = [
    // Add mock data here
    {
        id: 1,
        title: 'Portfolio',
        image: '/github-explorer-xs.jpeg',
        codeLink: '',
        websiteLink: '',
        detailsLink: '',
        technologies: ['Html', 'Css', 'JS', 'React', 'Next', 'Tailwind'],
    },
    {
        id: 2,
        title: 'Portfolio',
        image: '/github-explorer-xs.jpeg',
        codeLink: '',
        websiteLink: '',
        detailsLink: '',
        technologies: ['Html', 'Css', 'JS', 'React', 'Next', 'Tailwind'],
    },
    {
        id: 3,
        title: 'Portfolio',
        image: '/github-explorer-xs.jpeg',
        codeLink: '',
        websiteLink: '',
        detailsLink: '',
        technologies: ['Html', 'Css', 'JS', 'React', 'Next', 'Tailwind'],
    },
    {
        id: 4,
        title: 'Portfolio',
        image: '/github-explorer-xs.jpeg',
        codeLink: '',
        websiteLink: '',
        detailsLink: '',
        technologies: ['Html', 'Css', 'JS', 'React', 'Next', 'Tailwind'],
    },
    {
        id: 5,
        title: 'Portfolio',
        image: '/github-explorer-xs.jpeg',
        codeLink: '',
        websiteLink: '',
        detailsLink: '',
        technologies: ['Html', 'Css', 'JS', 'React', 'Next', 'Tailwind'],
    },
    {
        id: 6,
        title: 'Portfolio',
        image: '/github-explorer-xs.jpeg',
        codeLink: '',
        websiteLink: '',
        detailsLink: '',
        technologies: ['Html', 'Css', 'JS', 'React', 'Next', 'Tailwind'],
    },
]


export default function ProjectsRefactor() {
    const [selectedTech, setSelectedTech] = useState<Technology | null>(null)
    const [visibleRepos, setVisibleRepos] = useState(6)

    const filteredRepos = selectedTech
        ? mockRepositories.filter(repo => repo.technologies.includes(selectedTech))
        : mockRepositories

    const handleLoadMore = () => {
        setVisibleRepos(prev => prev + 3)
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.slice(0, visibleRepos).map(repo => (
                    <div key={repo.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        <div className="relative h-48 group">
                            <Image
                                src={repo.image}
                                alt={repo.title}
                                //layout="fill"
                                fill
                                //objectFit="cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="space-x-4">
                                    <ProjectsRefactorButton variant="secondary" asChild>
                                        <a href={repo.codeLink} target="_blank" rel="noopener noreferrer">Code</a>
                                    </ProjectsRefactorButton>
                                    <ProjectsRefactorButton variant="secondary" asChild>
                                        <a href={repo.websiteLink} target="_blank" rel="noopener noreferrer">Website</a>
                                    </ProjectsRefactorButton>
                                    <ProjectsRefactorButton variant="secondary" asChild>
                                        <a href={repo.detailsLink} target="_blank" rel="noopener noreferrer">Details</a>
                                    </ProjectsRefactorButton>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{repo.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {repo.technologies.map(tech => (
                                    <span key={tech} className="text-xs bg-gray-700 px-2 py-1 rounded">
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