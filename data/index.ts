
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
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 md:min-h-[30vh]",//"lg:col-span-2 lg:row-span-3 md:col-span-6 md:row-span-3", // change lg:col-span-3 md:row-span-4 
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    width: 100,
    height: 100,
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2 min-h-[15vh] lg:min-h-[20vh]", //"lg:col-span-3 md:col-span-3 md:row-span-2 lg::row-span-3",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    width: 200,
    height: 200,
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2 lg:min-h-[20vh]", //"lg:col-span-3 lg:raw-span-3 md:col-span-3 md:row-span-3",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    width : 200,
    height: 200,
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1 lg:min-h-[20vh]",//"lg:col-span-2 lg:raw-span-3 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    width: 200,
    height: 200,
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2", //"md:col-span-3 md:row-span-2 lg:raw-span-2 lg:col-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    width: 200,
    height: 200,
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1 max-h-[20vh]",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full  text-center",
    img: "",
    width: 200,
    height: 200,
    spareImg: "",
  },
];