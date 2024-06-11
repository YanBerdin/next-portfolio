
/**
 * Represents the NavBar Links.
 */
export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Skills", link: "#skills" },
    { name: "CV", link: "" },
    { name: "Github", link: "" },
    // { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
  ];
  
/**
 * Represents the list of my skills.
 */
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
      title: "Frontend Development",
      desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
      skillsList: [
        "Mockups and wireframes creation.",
        "Developing dynamic and responsive interfaces.",
        "Proficient in object-oriented programming (OOP).",
        "Skilled in functional and declarative programming.",
        "Advanced knowledge of ES6+.",
        "Skilled in state management libraries (Redux).",
        "Creation, installation, and activation of WordPress themes.",
    ],
      className: "md:col-span-2",
      thumbnail: "/exp1.svg",
    },
    {
      id: 2,
      title: "Backend Development",
      desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
      skillsList: [
        "Secure and efficient server-side development.",
        "Database modeling tailored to application requirements.",
        "Building backend infrastructure for web applications.",
        "Development of data access components.",
        "Skilled in Laravel and Express frameworks.",
        "Skilled in Socket.io for real-time features and WebSockets.",
        "Skilled in REST APIs.",
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
      title: "Transversal",
      desc: "Developed and maintained user-facing features using modern frontend technologies.",
      skillsList: [
        "Efficient algorithm resolution.",
        "Adherence to accessibility standards (WCAG).",
        "SEO best practices.",
        "Application of best practices in security (OWASP, GDPR)",
        "Skilled in Shell and SSH commands.",
        "Skilled in Git/GitHub for version control and collaboration.",
        "Agile use of Scrum for project management.",
      ],
      className: "md:col-span-2",
      thumbnail: "/exp4.svg",
    },
    {
      id: 4,
      title: "Wordpress",
      desc: "Installation de WordPress et configuration initiale.",
      skillsList: [
        "Installation de WordPress et configuration initiale.",
        "Gestion des sidebars pour personnaliser la mise en page.",
        "Création de thèmes personnalisés.",
        "Configuration de plugins  pour étendre les fonctionnalités de WordPress.",
        "Modification des options de WordPress via l'interface d'administration.",
        "Adapter le site aux besoins du client.",
      ],
      className: "md:col-span-2", // change to md:col-span-2
     thumbnail: "/exp3.svg",

    },

  ];


export const gridItems = [
  {
    id: 1,
    title: "DiscO'tech",
    description: "React | Vite | Javascript | Redux | Hooks",
      explanationList: ["DiscO'tech, un hommage à l'école O’clock, est une application de référencement musical conçue en mobile first pour répondre aux habitudes de consommation de musique à l'ère numérique.",
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
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 h-[13vh] h-auto md:min-h-[30vh] lg:min-h-[20vh] xl:min-h-[40vh]",//"lg:col-span-2 lg:row-span-3 md:col-span-6 md:row-span-3", // change lg:col-span-3 md:row-span-4 
      imgClassName: "w-full h-full h-auto object-cover", // "h-auto object-cover",
      titleClassName: "justify-end text-md md:text-lg lg:text-2xl",
      img: "/DiscotechV2.jpg", // "/b1.svg",
      width: 320,
      height: 200,
      spareImg: "",
    },
    {
      id: 2,
      title: "Projets récents", // "I'm very flexible with time zone communications"
      description: "",
    explanation: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2 h-auto min-h-[12vh] md:min-h-[15vh]", //"lg:col-span-3 md:col-span-3 md:row-span-2 lg::row-span-3",
    imgClassName: "h-auto",
    titleClassName: "text-xl md:text-3xl justify-start",
    img: "",
    width: 320,
    height: 100,
    spareImg: "",
  },
  {
    id: 3,
    title: "My stack", //  tech 
    description: "", // "I constantly try to improve"
    explanation: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2 h-auto min-h-[15vh] md:min-h-[20vh] lg:min-h-[18vh]", //"lg:col-span-3 lg:raw-span-3 md:col-span-3 md:row-span-3",
    imgClassName: "h-auto",
    titleClassName: "text-xl md:text-3xl justify-center",
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
      "- Prise en main de l'API de GitHub.",
    ],
    className: "lg:col-span-2 md:col-span-3 md:row-span-1 min-h-[17vh] md:min-h-[20vh] lg:min-h-[27vh]",// lg:raw-span-3 md:col-span-3 md:row-span-2",
    imgClassName: "object-cover absolute min-w-24 h-auto",
    titleClassName: "text-md md:text-lg lg:text-2xl justify-start",
    img: "/grid.svg",
    width: 320,
    height: 100,
    spareImg:"/codeEditorGithub.png",  // "/b4.svg",
  },

  {
    id: 5,
    title: "Shoes-Shop & BackOffice",
    description: "PHP | MySQL | Apache | Singleton | Active Record | Bootstrap",
    explanationList: [ " ",
    "Intégration de l'interface utilisateur d'un site e-commerce de vente de chaussures.",
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
    className: "md:col-span-3 md:row-span-2", //"md:col-span-3 md:row-span-2 lg:raw-span-2 lg:col-span-2",
    imgClassName: "absolute right-0 sm:right-3 md:right-5 bottom-0 sm:bottom-1 md:bottom-4 lg:bottom-5 sm:w-40 md:w-3/6 lg:w-3/5 w-32 lg:right-10 xl:right-1 xl:-bottom-4 h-auto", // bottom-0
    titleClassName: "text-md md:text-lg lg:text-2xl justify-center md:justify-start ",
    img: "/codeEditor-oshop-front1-s.png", // b5.svg
    width: 220,
    height: 100,
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "",
    description: "",
    explanation: [""],
    className: "lg:col-span-2 md:col-span-3 md:row-span-1 h-[9vh] md:min-h-[14vh] lg:min-h-[17vh]",
    imgClassName: "",
    titleClassName: "justify-center w-full text-center", // md:max-w-full
    img: "",
    width: 320,
    height: 100,
    spareImg: "",
  },
];