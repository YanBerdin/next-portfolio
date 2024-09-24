import Image from "next/image";
// import pilot from "../public/pilot.png";
import Portrait from "../public/github-explorer-xs.jpeg";
import { IconCloudComp } from "./ui/IconCloudComp";

export const About = () => {
  return (
    <>
      <div className="h-8 sm:h-24 lg:h-32"></div>
      {/* bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased */}
      <section
        className="bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl rounded-lg justify-center w-11/12 mx-auto h-full">
        <div className=" flex flex-col lg:flex-row gap-4 md:gap-12 py-4 px-4 md:py-12 md:px-12"> {/* lg:p-18 xl:p-20 flex-col-reverse px-6*/}

          <div className="flex justify-around max-lg:flex-col">

            <div className="min-w-2/3 mx-auto py-4 px-4">
              <Image
                src={Portrait}
                alt="Portrait de Yan souriant"
                className=" max-w-[100px] md:max-w-[130px] object-cover rounded-lg mx-auto max-h-[108px] md:max-h-[150px] flex-shrink-2 sm:float-start flex sm:mr-4 max-sm:mb-4"
                loading="lazy"
                placeholder={"blur"} // permet d'avoir une version floutée très basse résolution  de l'image finale pendant le chargement
              /> {/**  lg:max-w-[180px] xl:max-w-[200px] lg:max-h-[207px] xl:max-h-[212px] */}

              <p className="text-sm sm:text-base xl:text-lg text-muted-foreground">
                Fort d&apos;une formation Fullstack de niveau 5 (Bac+2) et d&apos;une expérience pratique acquise à travers plusieurs projets, j&apos;ai réorienté ma carrière du e-commerce vers le développement web.
              </p>

              <p className="text-sm sm:text-base xl:text-lg text-muted-foreground mt-4">
                Déterminé à poursuivre cette montée en compétence. Je recherche une entreprise où m&apos;investir et dont l&apos;encadrement me permettra d&apos;accroitre mon expertise pour contribuer efficacement à ses projets. Focalisé sur cet objectif, j&apos;accorde une attention particulière à la sécurité des données, la maintenabilité et l&apos;accessibilité des applications.
              </p>

              <p className="text-sm sm:text-base xl:text-lg text-muted-foreground mt-4">Parallèlement, mon expérience précédente dans la vente et le e-commerce a façonné mon approche centrée sur les utilisateurs. </p>

              <p className="text-sm sm:text-base xl:text-lg text-muted-foreground mt-4">
                <strong>Gestion de projets, analyse de données et relation client</strong> : En tant que gérant e-commerce, j&apos;ai piloté avec succès la croissance d&apos;une activité en ligne générant 15 000 commandes annuelles, optimisé les processus, suivi les indicateurs de performance et assuré une relation client de qualité.
              </p>

              <p className="text-sm sm:text-base xl:text-lg text-muted-foreground mt-4">
                <strong>Agilité, collaboration et optimisation de processus</strong> : En tant que vendeur puis manager chez Levi&apos;s, j&apos;ai animé une équipe de 8 collaborateurs et amélioré le chiffre d&apos;affaires de 15% par an avec des stratégies pour optimiser les processus et améliorer la satisfaction client.
              </p>

              <p className="text-sm sm:text-base xl:text-lg text-muted-foreground mt-4"><strong>Adaptabilité et apprentissage continu</strong> : Mon parcours m&apos;a permis de développer une grande adaptabilité et une capacité à apprendre rapidement de nouvelles compétences. De la vente en magasin à la gestion d&apos;une activité en ligne, j&apos;ai toujours su m&apos;adapter à de nouveaux environnements et relever de nouveaux défis. Cette polyvalence est un atout précieux pour un poste de développeur en constante évolution.</p>

              <p className="text-sm sm:text-base xl:text-lg text-muted-foreground mt-4">Ces compétences combinées à ma passion pour la programmation inspirée par mon frère architecte de solutions, me permettent de contribuer positivement aux projets d&apos;équipe et aux objectifs métiers.</p>
            </div>
            <IconCloudComp />
            {/*<Statistics />*/}
          </div>
        </div>

      </section>
    </>
  );
};
