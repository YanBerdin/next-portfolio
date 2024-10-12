import { GithubIcon2, ResumeIcon } from '@/components/ui/Icon';

export const navItems = [

  { name: "Skills", link: "#skills", title:"Compétences" },
  { name: "Réalisations", link: "#projects", title:"Réalisations" },
  { name: "A-propos", link: "#about", title:"A-propos" },
  { name: "Contact", link: "#contact", title:"Contact" },
  { name: "", link: "https://raw.githubusercontent.com/YanBerdin/YanBerdin/master/Doc/Yan_Berdin.pdf", target:"_blank", icon: ResumeIcon, title:"CV" },
  { name: "", link: "https://github.com/YanBerdin", target: "_blank", rel: "noopener noreferrer", icon: GithubIcon2, title:"Github" },
  // { name: "Testimonials", link: "#testimonials" },
];

interface mySkills {

  /**
  * The title of the skills.
  */
  title: string;

  /**
  * The list of skillss of the skills.
  */
  skillsList: string[];
}

  export const mySkills = [
    {
      id: 1,
      title: "Développement Frontend",
      desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
      skillsList: [
        "Maîtrise de React et Next.js, Redux",
        "Création de wireframes et de maquettes d'application.",
        "Développement d'interfaces dynamiques et responsives.",
        "Utilisation avancée d'ES6+.",
        "Résolution efficace d'algorithmes.",
        "Respect des normes d'accessibilité web (WCAG) et des bonnes pratiques SEO.",
        "Expérience avec le Shell et les commandes SSH."
    ],
      className: "md:col-span-2",
      thumbnail: "/exp1.svg",
    },
    {
      id: 2,
      title: "Développement Backend",
      desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
      skillsList: [
        "Création de l'infrastructure back-end sécurisée d'applications web",
        "Programmation orientée objet (POO) fonctionnelle et déclarative.",
        "Modélisation et gestion de base de données relationnelle.",
        "Développement de composants d'accès aux données.",
        "Conception d'API REST.",
        "Respect des normes de sécurité des données (RGPD) et des meilleures pratiques (OWASP).",
        // "Maîtrise des frameworks Laravel, Node.js, Express et Socket.io."
      ],
      className: "md:col-span-2",
      thumbnail: "/exp2.svg",
    },
    /*
    {
      id: 3,
      title: "Transverse",
      desc: "Developed and maintained user-facing features using modern frontend technologies.",
      skillsList: [
        "Respect des normes d'accessibilité web (WCAG) et des bonnes pratiques SEO.",
       // "Respect des normes de sécurité des données (RGPD) et des meilleures pratiques (OWASP).",
       // "Expérience avec le Shell et les commandes SSH.",
       // "Maîtrise de Git/GitHub pour la gestion de versions et la collaboration.",
       // "Utilisation agile de Scrum pour la gestion de projet.",
      ],
      className: "md:col-span-2",
      thumbnail: "/exp4.svg",
    },
    */
    {
      id: 4,
      title: "Wordpress",
      desc: "Création de site sécurisé, configuration et maintenance.",
      skillsList: [
        "Création de site sécurisé, configuration et maintenance.",
        "Installation, paramétrage et personnalisation de thème.",
        "Edition de contenu (Gutenberg).",
        "Configuration de plugins.",
        // "Modification des options de WordPress via l'interface d'administration pour adapter le site aux besoins du client.",
        "Maîtrise de Git/GitHub pour la gestion de versions et la collaboration.",
        "Utilisation agile de Scrum pour la gestion de projet."
      ],
      className: "md:col-span-2",
     thumbnail: "/exp4.svg", //"/exp3.svg",

    },
  ];

export const gridItems = [
  {
    id: 1,
    title: "DiscO'tech 💿",
    description: "🛠️ Technologies Utilisées : React.js | Redux | Axios | Interceptor | Rest API | PropTypes",
      explanationList: ["🎙️ Description : DiscO'tech, un hommage à l'école O’clock, est une application de référencement musical.",
      " ",
      "Les utilisateurs peuvent : Rechercher des artistes ou des albums, Explorer différents genres musicaux, Créer leurs propres playlists.",
      " ",
      "💡 La sécurisation de notre application s’attache à 6 aspects :",
      "🔒 L’authentification, Le contrôle d’accès, L’intégrité des données, La confidentialité des données, La non-répudiation (envoi et réception de messages incontestables), La protection contre l’analyse du trafic",
      " ",
      "🚧 Défi : Gérer efficacement l'état global de l'application pour synchroniser les données entre les différents composants.",
      "✅ Utilisation Redux pour centraliser la gestion de l'état, ce qui a permis de synchroniser les données entre les composants de manière efficace.",
      " ",
      "🚧 Défi : Assurer la validation des données provenant des utilisateurs et du serveur pour éviter les erreurs et les comportements inattendus.",
      "✅ Utilisation de PropTypes pour valider les types de données dans les composants et mis en place une validation pour garantir l'intégrité des données.",
      " ",
      "🚧 Défi : Protéger l'application contre diverses vulnérabilités de sécurité.",
      " 🔒 Protection contre les attaques XSS par une double validation des données (côté client et serveur) et interdiction du stockage de Password et Login en clair dans le state.",
      " 🔒 Utilisation de tokens de synchronisation, aléatoires et à usage unique, pour sécuriser les formulaires et les méthodes d'écriture de données.",
      " 🔒 Configuration de CORS pour contrôler l'accès aux ressources.",
      " 🔒 Sécurisation de la connexion à l'API en utilisant des variables d'environnement (.env).",
      " 🔒 Implémentation d'une approche par token JWT pour l'authentification, avec utilisation d'interceptors Axios pour gérer automatiquement les tokens, évitant de passer l’id de l’utilisateur connecté.",
      " ",
      "🎯 Résultat : Implémentation réussie des fonctionnalités utilisateur, sécurisation de l’application et optimisation pour le référencement et l’accessibilité. La gestion de l'état global avec Redux a permis de synchroniser efficacement les données entre les composants.",
    ],
      className: "order-3 lg:order-2 lg:col-span-3 md:col-span-6 md:row-span-4 h-[13vh] h-auto md:min-h-[30vh] lg:min-h-[20vh] xl:min-h-[40vh]",//"lg:col-span-2 lg:row-span-3 md:col-span-6 md:row-span-3", // change lg:col-span-3 md:row-span-4 order-3 lg:order-2
      imgClassName: "w-full h-full object-cover h-auto", // "h-auto object-cover",
      titleClassName: "justify-end text-md md:text-lg lg:text-2xl",
      img: "/gridItems-assets/DiscotechV2.jpg", // "/b1.svg",
      alt:"illustrations des styles musicaux sur fond de palmiers au crépuscule",
      width: 320,
      height: 200,
      spareImg: "",
      demoLink: "https://discotech-git-master-yanberdins-projects.vercel.app/",
      githubLink: "https://github.com/YanBerdin/discOtech",
      technologies: ['Html', 'Css', 'JS', 'React', 'Next', 'Tailwind'],
  },

  {
      id: 2,
      title: "Réalisations",
      description: "",
      explanation: "",
      className: "order-first lg:col-span-2 md:col-span-3 md:row-span-2 h-auto min-h-[10vh] md:min-h-[15vh]", //"lg:col-span-3 md:col-span-3 md:row-span-2 lg::row-span-3 " added order-first
      imgClassName: "h-auto",
      titleClassName: "text-3xl justify-start",
      img: "",
      alt: "",
      width: 0,
      height: 0,
      spareImg: "",
      technologies: ['Html', 'Css', 'JS', 'React', 'Next', 'Tailwind'],
  },

  {
    id: 3,
    title: "Dev Tools", //  stack 
    description: "",
    explanation: "",
    className: "-order-1 lg:order-3 lg:col-span-2 md:col-span-3 md:row-span-2 min-h-[15vh] md:min-h-[20vh] lg:min-h-[18vh]", //"lg:col-span-3 lg:raw-span-3 md:col-span-3 md:row-span-3" added -order-1
    imgClassName: "h-auto",
    titleClassName: "text-md md:text-lg lg:text-2xl justify-center",
    img: "",
    alt: "liste des technologies et outils de développement web",
    width : 350,
    height: 200,
    spareImg: "",
    technologies: ['Html', 'Css', 'JS', 'React', 'Next', 'Tailwind'],
  },

  {
    id: 4,
    title: "Github Explorer 🔎",
    description: "🛠️	Technologies Utilisées : React | Axios | Semantic UI | React-router-dom | PropTypes",
    explanationList: ["🎙️ Description : Github Explorer permet de rechercher et d’explorer les dépôts GitHub..",
    "",
    "🚧 Défi : Développer une interface utilisateur responsive.",
    "✅ J'ai utilisé Semantic UI et testé l'application sur différents appareils et résolutions pour m'assurer qu'elle s'adapte correctement à toutes les tailles d'écran.",
    "",
    "🚧 Défi : Gérer efficacement l'affichage d'un grand nombre de résultats de l'API GitHub tout en maintenant de bonnes performances et une expérience utilisateur fluide.",
    "",
    " ✅ Requêtes API dynamiques : J'ai configuré les requêtes Axios pour inclure les paramètres de pagination (page et per_page) lors des appels à l'API GitHub, permettant de récupérer les données appropriées pour chaque page.",
    "",
    " ✅ Optimisation des performances : J'ai utilisé useEffect pour déclencher de nouvelles requêtes API uniquement lorsque la page actuelle change, évitant ainsi des appels API inutiles.",
    "",
    " ✅ Pagination : J'ai mis en place un système de pagination pour gérer efficacement un grand nombre de résultats..",
    "",
    " ✅ Gestion du chargement : J'ai implémenté un indicateur de chargement pour informer l'utilisateur lorsque de nouvelles données sont en cours de récupération.",
    "",
    " ✅ Gestion des erreurs : J'ai mis en place un système de gestion des erreurs pour afficher des messages appropriés en cas de problème avec l'API.",
    "",
    "🚧 Défi : Valider les données provenant des utilisateurs et du serveur pour éviter les erreurs et les comportements inattendus.",
    "✅ J'ai utilisé PropTypes pour valider les types de données dans les composants React et j'ai mis en place des validations supplémentaires côté serveur pour garantir l'intégrité des données.",
    "",
    "🔒 La sécurité de l'application contre les attaques XSS (Cross Site Scripting) est garantie grâce aux techniques de validation et d'échappement des données fournies par React.",
    "🔒 Côté serveur, c’est l’API de Github qui se charge de valider l’intégrité des données reçues et empêcher l'injection de scripts malveillants.",
    "",
    "🎯 Résultat : Interface dynamique et responsive. Les utilisateurs peuvent rechercher des dépôts, afficher les informations essentielles et accéder directement aux dépôts sur GitHub."

    ],
    className: "order-4 lg:order-5 lg:col-span-2 md:col-span-3 md:row-span-1 min-h-[17vh] md:min-h-[20vh] lg:min-h-[27vh]",// lg:raw-span-3 md:col-span-3 md:row-span-2", added order-4 lg:order-5
    imgClassName: " absolute h-auto", // object-cover
    titleClassName: "text-md md:text-lg lg:text-2xl justify-start h-auto",
    img: "/gridItems-assets/grid.svg",
    alt: "Page d'acceuil avec grille d'affichage des repositories GitHub",
    width: 320,
    height: 200,
    spareImg:"/gridItems-assets/codeEditorGithub.png",  // "/b4.svg",
    demoLink:"https://new-react-github-explorer.vercel.app/",
    githubLink:"https://github.com/YanBerdin/create-react-github-explorer",
  },

  {
    id: 5,
    title: "Shoes-Shop & BackOffice 👠",
    description: "🛠️	Technologies Utilisées : PHP | MySQL | Apache | Singleton | Active Record | Bootstrap",
    explanationList: [ " ",
    "🎙️ Description : Site e-commerce de vente de chaussures & BackOffice.",
    " ",
    "⚓ Navigation principale :",
    "Accueil | Catégories | Types de produits | Marques | Catalogue",
    " ",
    "🏠 Page d'accueil avec 5 catégories mises en avant, Page du détail d'un produit, Page des produits + pagination pour chaque catégorie / type / marque.",
    " ",
    "🏭 BackOffice :",
    " Gestion des catégories / produits / types / marques / catégories présentées en page d'accueil",
    " ",
    "🚧 Défi : Implémenter une architecture MVC pour un projet e-commerce.",
    "✅ J'ai mis en place une structure modulaire avec des classes abstraites et l'utilisation de namespaces pour une meilleure organisation du code.",
    " ",
    "🚧 Défi : Assurer la protection des informations sensibles des utilisateurs.",
    "🔒 Solution : J'ai implémenté un système d'encryptage des données utilisateur et mis en place des jetons de synchronisation à usage unique, dont l’accès est protégé par CORS, pour sécuriser les méthodes d'écriture de données.",
    " ",
    "🚧 Défi : Mettre en place un système d'authentification et de gestion des permissions.",
    "🔒 Solution : J'ai développé un système de rôles et de permissions, en utilisant des sessions sécurisées et en implémentant des contrôles d'accès sur chaque route sensible.",
    " ",
    "🚧 Défi : Sécuriser l'application contre les injections SQL, XSS et CSRF.",
    "🔒 Solution : J'ai mis en place des pratiques de codage sécurisé, notamment l'utilisation de requêtes préparées, l'échappement des données utilisateur et l'implémentation de tokens CSRF.",
    " ",
    "🎯 Résultat : Navigation facile entre les catégories, les types de produits et les marques. Le BackOffice offre une gestion efficace des données. Les mesures de sécurité mises en place ont renforcé la fiabilité de l’application. De plus, j'ai amélioré mes compétences en développement PHP, en architecture logicielle et en sécurité web."],
    className: "order-5 lg:order-4 md:col-span-3 md:row-span-2", //"md:col-span-3 md:row-span-2 lg:raw-span-2 lg:col-span-2", added order-5 lg:order-4 
    imgClassName: "absolute right-0 sm:right-3 md:right-5 bottom-0 sm:bottom-1 md:bottom-4 lg:bottom-5 sm:w-40 md:w-3/6 w-32 lg:right-10 xl:right-1 xl:-bottom-1 h-auto max-h-15vh", // bottom-0
    titleClassName: "text-md md:text-lg lg:text-2xl justify-center md:justify-start ",
    img: "/gridItems-assets/codeEditor-oshop-front1-s.png", // b5.svg
    alt:"page d'acceuil du site avec 3 chaussures en gros plan",
    width: 220,
    height: 100,
    spareImg: "/gridItems-assets/grid.svg",
    demoLink: "https://github.com/YanBerdin/shoes-shop-backoffice-php",
    githubLink: "https://github.com/YanBerdin/shoes-shop-frontoffice-php",
  },
  
  {
    id: 6,
    title: "",
    description: "",
    explanation: [""],
    className: "order-6 lg:order-last lg:col-span-2 md:col-span-3 md:row-span-1 min-h-[7vh] md:min-h-[14vh] lg:min-h-[17vh]", // added order-6 lg:order-last
    imgClassName: "h-auto",
    titleClassName: "justify-center w-full text-center", // md:max-w-full
    img: "",
    alt: "Arriere-plan de sphères lumineuses",
    width: 320,
    height: 100,
    spareImg: "",
  },
];


export const timelineData = [
  {
      id: 1,
      company: "Développeur React.js - O'clock",
      period: 'Juin 2023 - Juill. 2023',
      description: "Conception du site Disc'Otech. Implémentation de fonctionnalités utilisateur Incluant la gestion de profil et la personnalisation des favoris.",
      imageUrl: '/Logo.png',
      alt:"Logo du site DiscO'tech"
  },
  {
      id: 2,
      company: 'Vendeur Atelier - Dafy Moto',
      period: 'Janv. 2022 - Avr. 2022',
      description: 'Booste les ventes entretien réparation.',
      imageUrl: '/dafy-logo-300.png',
      alt:"Logo de la marque Dafy Moto"
  },
  {
      id: 3,
      company: 'Vendeur Web - Holding de Marché aux Affaires',
      period: 'Janv. 2017 - Avr. 2017',
      description: 'Expertise en vente sur eBay & Amazon.',
      imageUrl: '/maa-logo-300.png',
      alt:"Logo de la marque Marché aux Affaires"
  },
  {
      id: 4,
      company: 'Gérant e-commerce - eBay & Amazon',
      period: 'Janv. 2010 - Mars 2017',
      description: 'Gestion de 15k commandes/an.',
      imageUrl: '/ebay-logo-208.jpeg',
      alt:"Logo de la marque eBay"
  },
  {
    id: 5,
    company: 'Responsable - Levi’s Store',
    period: 'Mars 2006 - Mars 2009',
    description: "Leadership proactif d'une équipe de 8 collaborateurs, axé sur la performance.",
    imageUrl: '/levis_logo.png',
      alt:"Logo de la marque Levi's"
},
  {
      id: 6,
      company: 'Cogérant - Blackmoon Records',
      period: 'Janv. 2000 - Févr. 2003',
      description: 'Spécialiste en import de vinyles musique électronique.',
      imageUrl: '/levis_logo.png',
      alt:"Logo de la marque Levi's"

  },
  {
    id: 7,
    company: 'Assistant Responsable - Levi’s Store',
    period: 'Janv. 1998 - Févr. 2006',
    description: "Dynamisation et leadership d'une équipe de 8 collaborateurs.",
    imageUrl: '/levis_logo.png',
    alt:"Logo de la marque Levi's"
},
];

export const socialMedia = [
  {
    id: 1,
    img: "/githubicon.svg",
    alt:"Icone de Github ",
    title: "lien vers le profil Github de Yan",
    link: "https://github.com/YanBerdin",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  {
    id: 2,
    img: "/link.svg",
    alt:"Icone de Linkedin",
    title: "lien vers le profil Linkedin de Yan",
    link: "https://www.linkedin.com/in/yan-berdin",
    target: "_blank",
    rel: "noopener noreferrer"
  },
 /*{
    id: 3,
    img: "/twit.svg",
    link: "https://twitter.com/YanBerdin",
    target: "_blank",
    rel: "noopener noreferrer"
  },*/
];