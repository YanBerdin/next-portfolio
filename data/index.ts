import { GithubIcon2, ResumeIcon } from '@/components/ui/Icon';

export const navItems = [

  { name: "Skills", link: "#skills" },
  { name: "Réalisations", link: "#projects" },
  { name: "A propos", link: "#about" },
  { name: "Contact", link: "#contact" },
  { name: "", link: "#experience", icon: ResumeIcon, title:"CV" },
  // { name: "Experience", link: "https://raw.githubusercontent.com/YanBerdin/YanBerdin/master/Doc/CV_Yan_Berdin.docx", target:"_blank" },
  //https://YanBerdin.github.io/resume 
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
        "Spécialisation React",
        "Création de wireframes et de maquettes d'application.",
        "Développement d'interfaces dynamiques et responsives.",
        "Programmation orientée objet (POO).",
        "Programmation fonctionnelle et déclarative.",
        "Utilisation avancée d'ES6+.",
        "Gestion du state avec Redux.",
        "Résolution efficace d'algorithmes.",
        // "Creation, installation, and activation of WordPress themes.",
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
        "Modélisation de base de données en fonction des besoins de l'application.",
        "Gestion de bases de données et développement de composants d'accès aux données.",
        "Maîtrise des frameworks Laravel et Express.",
        "Maîtrise de Socket.io pour les fonctionnalités temps réel.",
        "Conception d'API REST.",
      ],
      className: "md:col-span-2", // change to md:col-span-2
      thumbnail: "/exp2.svg",
    },
    //{
    //  id: 3,
    //  title: "Freelance App Dev Project",
    //  desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    //  className: "md:col-span-2", // change to md:col-span-2
    //  thumbnail: "/exp3.svg",
    //},
    {
      id: 3,
      title: "Transverse",
      desc: "Developed and maintained user-facing features using modern frontend technologies.",
      skillsList: [
        "Connaissance approfondie des normes d'accessibilité web (WCAG) et des bonnes pratiques SEO.",
        "Respect des normes de sécurité des données (RGPD) et des meilleures pratiques de sécurité des applications web (OWASP).",
        "Expérience avec le Shell et les commandes SSH.",
        "Maîtrise de Git/GitHub pour la gestion de versions et la collaboration.",
        "Utilisation agile de Scrum pour la gestion de projet.",
      ],
      className: "md:col-span-2",
      thumbnail: "/exp4.svg",
    },
    {
      id: 4,
      title: "Wordpress",
      desc: "Installation de WordPress et configuration initiale.",
      skillsList: [
        "Installation de WordPress.",
        "configuration initiale",
        "Gestion des sidebars pour personnaliser la mise en page.",
        "Création de thèmes personnalisés.",
        "Configuration de plugins pour étendre les fonctionnalités de WordPress.",
        "Modification des options de WordPress via l'interface d'administration pour adapter le site aux besoins du client.",
      ],
      className: "md:col-span-2", // change to md:col-span-2
     thumbnail: "/exp3.svg",

    },
  ];

export const gridItems = [
  {
    id: 1,
    title: "DiscO'tech",
    description: "React.js | Redux | Axios | Rest API | PropTypes",
      explanationList: ["DiscO'tech, un hommage à l'école O’clock, est une application de référencement musical conçue en mobile first pour répondre aux habitudes de consommation de musique à l'ère numérique.",
      " ", 
      "Les utilisateurs peuvent :",
      "- Rechercher des artistes ou des albums,",
      "- Explorer différents genres musicaux,",
      "- Créer leurs propres playlists",
      "- Centraliser leur bibliothèque musicale sur une seule application.",
      " ",
      "🔒 Validation des données provenant de l’utilisateur et du serveur. Même principe de double-validation que côté serveur.",
      "🔒 Sécurisation des formulaires et des méthodes d’écriture des données par jeton de synchronisation (aléatoire et à usage unique), dont l’accès est protégé par CORS",
      "🔒 Protection contre les attaques CSRF (Cross-Site Request Forgery)",
      "🔒 Protection contre les attaques par injection SQL",
      "🔒 Protection contre les vulnérabilités XSS (Cross Site Scripting)"],
      className: "order-3 lg:order-2 lg:col-span-3 md:col-span-6 md:row-span-4 h-[13vh] h-auto md:min-h-[30vh] lg:min-h-[20vh] xl:min-h-[40vh]",//"lg:col-span-2 lg:row-span-3 md:col-span-6 md:row-span-3", // change lg:col-span-3 md:row-span-4 order-3 lg:order-2
      imgClassName: "w-full h-full object-cover h-auto", // "h-auto object-cover",
      titleClassName: "justify-end text-md md:text-lg lg:text-2xl",
      img: "/DiscotechV2.jpg", // "/b1.svg",
      width: 320,
      height: 200,
      spareImg: "",
      demoLink: "https://discotech-git-master-yanberdins-projects.vercel.app/",
      githubLink: "https://github.com/YanBerdin/discOtech",
  },

  {
      id: 2,
      title: "Réalisations", // "I'm very flexible with time zone communications"
      description: "",
      explanation: "",
      className: "order-first lg:col-span-2 md:col-span-3 md:row-span-2 h-auto min-h-[10vh] md:min-h-[15vh]", //"lg:col-span-3 md:col-span-3 md:row-span-2 lg::row-span-3 " added order-first
      imgClassName: "h-auto",
      titleClassName: "text-3xl justify-start",
      img: "",
      width: 0,
      height: 0,
      spareImg: "",
  },

  {
    id: 3,
    title: "Dev Tools", //  tech 
    description: "", // "I constantly try to improve"
    explanation: "",
    className: "-order-1 lg:order-3 lg:col-span-2 md:col-span-3 md:row-span-2 min-h-[15vh] md:min-h-[20vh] lg:min-h-[18vh]", //"lg:col-span-3 lg:raw-span-3 md:col-span-3 md:row-span-3" added -order-1
    imgClassName: "h-auto",
    titleClassName: "text-md md:text-lg lg:text-2xl justify-center",
    img: "",
    width : 350,
    height: 200,
    spareImg: "",
  },

  {
    id: 4,
    title: "Github Explorer",
    description: "React | Axios | Semantic UI | React-router-dom | PropTypes",
    explanationList: ["Intégration interactive, dynamique et responsive pour offrir une expérience utilisateur optimale sur les appareils mobiles et les ordinateurs de bureau.",
    "",
      "🔒 Protection contre les vulnérabilités XSS (Cross Site Scripting).",
      "🔒 Validation des données provenant de l’utilisateur et du serveur.",
      "",
      "- Prise en main d'Axios, une bibliothèque JavaScript populaire pour effectuer des requêtes HTTP.",
      "- Prise en main de Semantic UI, un framework CSS.",
      "- Utilisation de l'API de GitHub.",
    ],
    className: "order-4 lg:order-5 lg:col-span-2 md:col-span-3 md:row-span-1 min-h-[17vh] md:min-h-[20vh] lg:min-h-[27vh]",// lg:raw-span-3 md:col-span-3 md:row-span-2", added order-4 lg:order-5
    imgClassName: " absolute h-auto", // object-cover
    titleClassName: "text-md md:text-lg lg:text-2xl justify-start h-auto",
    img: "/grid.svg",
    width: 320,
    height: 200,
    spareImg:"/codeEditorGithub.png",  // "/b4.svg",
    demoLink:"https://new-react-github-explorer.vercel.app/",
    githubLink:"https://github.com/YanBerdin/create-react-github-explorer",
  },

  {
    id: 5,
    title: "Shoes-Shop & BackOffice",
    description: "PHP | MySQL | Apache | Singleton | Active Record | Bootstrap",
    explanationList: [ " ",
    "Intégration de l'interface utilisateur d'un site e-commerce de vente de chaussures.",
    "Mise en application des notions d'héritage, de classes abstraites, namespace.",
    "Architecture MVC (Modèle-Vue-Contrôleur).",
    " ",
    "Navigation principale : Accueil | Catégories. | Types de produits | Marques | Catalogue",
    "- Page d'accueil (avec 5 catégories mises en avant).",
    "- Page du détail d'un produit.",
    "- Page des produits + pagination pour chaque catégorie, chaque type, chaque marque",
    "- La possibilité de filtrer par nom, note, ou prix.",
    " ",
    "BackOffice :",
    "- Gestion des catégories / produits / types / marques",
    "- Gestion des catégories présentées en page d'accueil",
    " 🔒  Encryptage des données utilisateur.",
    " 🔒  Sécurisation des méthodes d’écriture de données par jeton de synchronisation (aléatoire et à usage unique), dont l’accès est protégé par CORS.",
    " 🔒  Gestion de l'authentification de la session et des permissions des utilisateurs",
    " 🔒  Protection contre les injections SQL, les attaques XSS et CSRF."],
    className: "order-5 lg:order-4 md:col-span-3 md:row-span-2", //"md:col-span-3 md:row-span-2 lg:raw-span-2 lg:col-span-2", added order-5 lg:order-4 
    imgClassName: "absolute right-0 sm:right-3 md:right-5 bottom-0 sm:bottom-1 md:bottom-4 lg:bottom-5 sm:w-40 md:w-3/6 w-32 lg:right-10 xl:right-1 xl:-bottom-1 h-auto max-h-15vh", // bottom-0
    titleClassName: "text-md md:text-lg lg:text-2xl justify-center md:justify-start ",
    img: "/codeEditor-oshop-front1-s.png", // b5.svg
    width: 220,
    height: 100,
    spareImg: "/grid.svg",
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
      imageUrl: '/Logo.png'
  },
  {
      id: 2,
      company: 'Vendeur Atelier - Dafy Moto',
      period: 'Janv. 2022 - Avr. 2022',
      description: 'Booste les ventes entretien/réparation/accessoires.',
      imageUrl: '/dafy-logo-300.png'
  },
  {
      id: 3,
      company: 'Vendeur Web - Holding de Marché aux Affaires',
      period: 'Janv. 2017 - Avr. 2017',
      description: 'Expertise en vente sur eBay & Amazon.',
      imageUrl: '/maa-logo-300.png'
  },
  {
      id: 4,
      company: 'Gérant e-commerce - eBay & Amazon',
      period: 'Janv. 2010 - Mars 2017',
      description: 'Gestion de 15k commandes/an.',
      imageUrl: '/ebay-logo-208.jpeg'
  },
  {
    id: 5,
    company: 'Responsable - Levi’s Store',
    period: 'Mars 2006 - Mars 2009',
    description: "Leadership proactif d'une équipe de 8 collaborateurs, axé sur la performance.",
    imageUrl: '/levis_logo.png'
},
  {
      id: 6,
      company: 'Cogérant - Blackmoon Records',
      period: 'Janv. 2000 - Févr. 2003',
      description: 'Spécialiste en import de vinyles musique électronique.',
      imageUrl: '/levis_logo.png'
  },
  {
    id: 7,
    company: 'Assistant Responsable - Levi’s Store',
    period: 'Janv. 1998 - Févr. 2006',
    description: "Dynamisation et leadership d'une équipe de 8 collaborateurs.",
    imageUrl: '/levis_logo.png'
},
];

export const socialMedia = [
  {
    id: 1,
    img: "/githubicon.svg",
    link: "https://github.com/YanBerdin",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  {
    id: 2,
    img: "/link.svg",
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