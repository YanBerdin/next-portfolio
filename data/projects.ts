//import { Technology } from './types'

export interface Project {
  id: number
  title: string
  image: string
  codeLink: string
  websiteLink: string
  detailsLink: string
  //technologies: Technology[]
}
/*
const technologies: Technology[] = [
  'Html', 'Css', 'JS', 'PHP', 'Singleton', 'Typescript', 'React', 'Next', 'Laravel', 'Symfony', 
  'Node.js', 'Tailwind', 'Sql', 'MariaDb', 'Mysql', 'MongoDB', 'Redis', 'Firebase', 'React Native', 
  'DigitalOcean', 'Cloud Functions', 'Heroku', 'Vercel'
]
*/
const projectNames = [
  'E-commerce Platform', 'Social Media Dashboard', 'Task Management App', 'Weather Forecast App',
  'Portfolio Website', 'Blog CMS', 'Real-time Chat Application', 'Fitness Tracker', 'Recipe Finder',
  'Movie Database', 'Job Board', 'Expense Tracker', 'News Aggregator', 'Quiz Game', 'Booking System',
  'Music Streaming Service', 'Stock Market Analyzer', 'Virtual Classroom', 'Cryptocurrency Tracker',
  'Travel Planner'
]
/*
function getRandomTechnologies(count: number): Technology[] {
  const shuffled = [...technologies].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
*/
export const projects: Project[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: projectNames[i],
  image: `/placeholder.svg?height=300&width=400&text=Project+${i + 1}`,
  codeLink: `https://github.com/example/project-${i + 1}`,
  websiteLink: `https://project-${i + 1}.example.com`,
  detailsLink: `/projects/${i + 1}`,
  //technologies: getRandomTechnologies(Math.floor(Math.random() * 5) + 2)
}))
