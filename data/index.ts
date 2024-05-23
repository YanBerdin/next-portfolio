export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projets", link: "#projets" },
    { name: "Skills", link: "#experience" },
    { name: "CV", link: "#cv" },
    { name: "Github", link: "#github" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
  ];
  
/**
 * Represents the pricing details for a plan.
 */
interface mySkills {

/**
* The title of the plan.
*/
title: string;

/**
* The list of skillss for the plan.
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
        "Database management and development of data access components.",
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
        "Adherence to data security standards (GDPR).",
        "Application of best practices in security (OWASP)",
        "Skilled in Shell and SSH commands.",
        "Skilled in Git/GitHub for version control and collaboration.",
        "Agile use of Scrum for project management.",
      ],
      className: "md:col-span-2",
      thumbnail: "/exp4.svg",
    },
  ];