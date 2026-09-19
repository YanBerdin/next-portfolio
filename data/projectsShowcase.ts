export type ProjectLink = {
  label: string;
  href: string;
  external: boolean;
};

export type ShowcaseProject = {
  id: number;
  title: string;
  summary: string;
  img: string;
  alt: string;
  technologies: string[];
  links: ProjectLink[];
};

export type TrainingProject = {
  title: string;
  stack: string;
  githubLink: string;
  demoLink?: string;
};

export const featuredProject: ShowcaseProject = {
  id: 16,
  title: "Rouge Cardinal",
  summary:
    "Application fullstack en production pour une compagnie de théâtre professionnelle : site public accessible WCAG 2.2 AA et back-office d'édition multi-rôles. L'autorisation est portée par PostgreSQL - RLS sur les 36 tables - avec CI/CD, tests d'intégration et tests end-to-end.",
  img: "/projectRefactor-assets/compagnie-rouge-cardinal.fr.jpeg",
  alt: "Page d'accueil du site de la compagnie Rouge Cardinal",
  technologies: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Zod", "Playwright", "T3 Env"],
  links: [
    { label: "Voir le site en production", href: "https://compagnie-rouge-cardinal.fr", external: true },
    { label: "Lire l'étude de cas", href: "/projets/rouge-cardinal", external: false },
    { label: "Code source", href: "https://github.com/YanBerdin/rougecardinalcompany", external: true },
  ],
};

export const secondaryProjects: ShowcaseProject[] = [
  {
    id: 1,
    title: "Express MongoDB REST API",
    summary:
      "API REST Node / Express en architecture hexagonale : authentification JWT avec révocation de tokens, persistance MongoDB et documentation Swagger générée.",
    img: "/projectRefactor-assets/express-mongodb-api.png",
    alt: "Documentation Swagger de l'API Express",
    technologies: ["Node.js", "Express", "MongoDB"],
    links: [{ label: "Code source", href: "https://github.com/YanBerdin/Express_mongodb_api", external: true }],
  },
];

export const trainingProjects: TrainingProject[] = [
  {
    title: "Express Recipes API",
    stack: "Express · Node.js · Swagger",
    githubLink: "https://github.com/YanBerdin/Express-Recipes-API",
  },
  {
    title: "Recipes App",
    stack: "React · Redux · Axios",
    githubLink: "https://github.com/YanBerdin/React-Recipes-App",
  },
  {
    title: "DiscO'tech",
    stack: "React.js · Vite · Redux · Bootstrap",
    githubLink: "https://github.com/YanBerdin/discOtech",
  },
  {
    title: "Github Explorer",
    stack: "React · Axios · Semantic UI",
    githubLink: "https://github.com/YanBerdin/create-react-github-explorer",
    demoLink: "https://new-react-github-explorer.vercel.app/",
  },
  {
    title: "Spotify Controller",
    stack: "React · Vite · Axios · Styled-components · API Spotify",
    githubLink: "https://github.com/YanBerdin/spotify-controller",
  },
  {
    title: "Task-Manager",
    stack: "Php · Laravel  · JavaScript · MySQL",
    githubLink: "https://github.com/YanBerdin/Laravel-Vanilla_JS-Task_Manager",
  },
  {
    title: "Shoes-Shop - boutique",
    stack: "PHP · Bootstrap",
    githubLink: "https://github.com/YanBerdin/shoes-shop-frontoffice-php",
  },
  {
    title: "Shoes-Shop - back-office",
    stack: "PHP · MySQL",
    githubLink: "https://github.com/YanBerdin/shoes-shop-backoffice-php",
  },
];

{/*
    {
    title: "Pokedex MVC",
    stack: "PHP · MySQL · Bootstrap",
    githubLink: "https://github.com/YanBerdin/Pokedex-php-yanberdin",
  }
  {
    title: "Widget météo",
    stack: "React",
    githubLink: "https://github.com/YanBerdin/React_Widget_Meteo",
    demoLink: "https://yanberdin.github.io/React_Widget_Meteo/",
  },
  {
    title: "Text to Speech",
    stack: "JavaScript, Web Audio API",
    githubLink: "https://github.com/YanBerdin/text_to_speech_web_app",
    demoLink: "https://yanberdin.github.io/text_to_speech_web_app",
  },
  {
    title: "Script Runner",
    stack: "JavaScript",
    githubLink: "https://github.com/YanBerdin/script-runner-game-js",
    demoLink: "https://yanberdin.github.io/script-runner-game-js",
  },
  {
    title: "Soundpad",
    stack: "JavaScript",
    githubLink: "https://github.com/YanBerdin/soundpad-js-vanilla",
    demoLink: "https://yanberdin.github.io/soundpad-js-vanilla",
  },
  */}