import Image from "next/image";
// import pilot from "../public/pilot.png";
import portrait from "../public/portrait.png";

export const About = () => {
  return (
    <>
      <div id="about" className="h-14 "></div>
      {/* bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased */}
      <section
        id="about"
        className="bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl rounded-lg justify-center w-11/12 mx-auto h-full p-4 sm:p-10 md:p-10 lg:p-18 xl:p-20 mt-10 sm:mt-20 lg:mt-10  mb-10">
        <div className=" flex flex-col lg:flex-row gap-4 md:gap-12 p-4"> {/* flex-col-reverse px-6*/}

          <div className="bg-green-0 flex flex-col justify-around">
          <h2 className="text-xl md:text-2xl xl:text-3xl font-bold">
                A propos
                {/*
                LET ME{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  INTRODUCE{" "}
                </span>
                MYSELF */}
              
              </h2>
            <div className="">

            <Image
            src={portrait}
            alt="portrait de Yan souriant"
            className=" max-w-[100px] md:max-w-[130px] object-cover rounded-lg mx-auto max-h-[108px] md:max-h-[150px] my-4 flex-shrink-2 float-start mr-4" /**/
          /> {/**  lg:max-w-[180px] xl:max-w-[200px] lg:max-h-[207px] xl:max-h-[212px] */}

              <p className="text-sm md:text-md lg:text-lg text-muted-foreground mt-4">
              Fort d&apos;une récente reconversion en développement web, mon parcours professionnel s&apos;est enrichi d&apos;une expertise technique en conception et sécurité web, acquise en téléprésentiel chez École O&apos;clock. 
             
              {/*Passionné par la programmation depuis mon jeune âge, j&apos;ai été inspiré par mon frère architecte, qui est également devenu mon mentor dans ce domaine. Cette fascination m&apos;a conduit à entreprendre une reconversion professionnelle audacieuse après avoir accumulé 20 ans d&apos;expérience dans les secteurs du commerce et du e-commerce.*/}
                {/*Fascinated by programming from a young age thanks to my architect brother, who also became my mentor, I recently undertook a bold career change. After 20 years of experience in commerce and e-commerce, I decided to follow my passion for web development.*/}
              </p>

                <p className="text-sm md:text-md lg:text-lg text-muted-foreground mt-4">
                Mon profil Fullstack s&apos;est consolidé par la pratique, grâce à l&apos;implémentation de fonctionnalités utilisateur avancées côté client et à la sécurisation contre diverses attaques en ligne côté serveur, témoignant de ma capacité à créer des solutions digitales robustes et fonctionnelles.
               
                {/*En 2023, j&apos;ai obtenu mon Titre Professionnel de Développeur Web et Web Mobile (TP DWWM) grâce à un programme de formation à distance avec O&apos;clock. Cette expérience m&apos;a permis de plonger dans l&apos;univers complexe et ingénieux du développement web, où chaque défi rencontré a été une occasion d&apos;acquérir de nouvelles compétences et de renforcer ma passion.*/}
                 { /*In 2023, I earned my Fullstack Web and Mobile Developer Professional Title (TP DWWM) through a remote training program with O'clock school.*/}
                </p>

              <p className="text-sm md:text-md  lg:text-lg text-muted-foreground mt-4">
              Parallèlement, mon expérience précédente dans la vente et le e-commerce a façonné mon approche centrée sur les utilisateurs, me permettant de comprendre et de répondre efficacement aux besoins des clients dans des environnements variés. 
                {/*Web development, with its complexity and ingenuity, captivated my interest and fueled my desire to learn. Each challenge I encountered was an opportunity to acquire new skills and strengthen my passion.*/}
              </p>

              <p className="text-sm md:text-md lg:text-lg text-muted-foreground mt-4">
              Ma transition vers le développement web est guidée par une passion pour la programmation, inspirée par mon frère architecte, ainsi que par un engagement à contribuer positivement aux projets d&apos;équipe et aux objectifs de l&apos;entreprise.
              {/*Aujourd&apos;hui, fort d&apos;une formation Fullstack rigoureuse, je suis déterminé à exceller dans ce domaine et à continuer à affiner mes compétences à travers de nouveaux projets.*/}
              </p>
              
              <p className="text-sm md:text-md lg:text-lg text-muted-foreground mt-4">
              {/*Ma rigueur, ma capacité à comprendre les besoins des clients et ma faculté à m&apos;adapter à de nouveaux environnements techniques sont des atouts essentiels pour mener à bien les missions qui me sont confiées.*/}
                {/*Today, with a rigorous Fullstack training and a determination to excel in this field, I am eager to continue honing my skills through new projects.*/}
              </p>

            </div>

            {/*<Statistics />*/}
          </div>
        </div>
      </section>
    </>
  );
};
