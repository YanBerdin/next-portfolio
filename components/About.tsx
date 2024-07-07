import Image from "next/image";
// import pilot from "../public/pilot.png";
import portrait from "../public/portrait.png";
import { IconCloudComp } from "./ui/IconCloudComp";

export const About = () => {
  return (
    <>
      <div className="h-24 lg:h-44"></div>
      {/* bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased */}
      <section
        className="bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl rounded-lg justify-center w-11/12 mx-auto h-full">
        <div className=" flex flex-col lg:flex-row gap-4 md:gap-12 py-4 px-4 md:py-12 md:px-12"> {/* lg:p-18 xl:p-20 flex-col-reverse px-6*/}

          <div className="flex justify-around max-lg:flex-col">

            <div className="min-w-2/3 mx-auto py-4 px-4">
              <Image
                src={portrait}
                alt="portrait de Yan souriant"
                className=" max-w-[100px] md:max-w-[130px] object-cover rounded-lg mx-auto max-h-[108px] md:max-h-[150px] flex-shrink-2 sm:float-start flex sm:mr-4 max-sm:mb-4" /**/
                loading="lazy"
              /> {/**  lg:max-w-[180px] xl:max-w-[200px] lg:max-h-[207px] xl:max-h-[212px] */}

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                Fort d&apos;une récente reconversion en développement web, mon parcours professionnel s&apos;est enrichi d&apos;une expertise technique en conception et sécurité web, acquise en téléprésentiel auprès de l&apos;École O&apos;clock.
              </p>

              <p className="text-sm sm:text-base xl:text-lg text-muted-foreground mt-4 ">
                Mon profil Fullstack s&apos;est consolidé par la pratique, grâce à l&apos;implémentation de fonctionnalités utilisateur avancées côté client et à la sécurisation contre diverses attaques en ligne côté serveur, témoignant de ma capacité à créer des solutions digitales robustes et fonctionnelles.
              </p>

              <p className="text-sm sm:text-base xl:text-lg text-muted-foreground mt-4">
                Parallèlement, mon expérience précédente dans la vente et le e-commerce a façonné mon approche centrée sur les utilisateurs, me permettant de comprendre et de répondre efficacement aux besoins des clients dans des environnements variés.
              </p>

              <p className="text-sm sm:text-base xl:text-lg text-muted-foreground mt-4">
                Ma transition vers le développement web est guidée par une passion pour la programmation, inspirée par mon frère architecte, ainsi que par un engagement à contribuer positivement aux projets d&apos;équipe et aux objectifs de l&apos;entreprise.
              </p>

            </div>
            <IconCloudComp />
            {/*<Statistics />*/}
          </div>
        </div>

      </section>
    </>
  );
};
