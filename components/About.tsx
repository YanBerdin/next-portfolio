"use client";

import Image from "next/image";
import Portrait from "../public/about-assets/portrait.png";
// import { IconCloudComp } from "./ui/IconCloudComp";
import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";

export const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <div className="h-8 sm:h-20"></div>

      <motion.div
        className="bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl rounded-lg justify-center w-11/12 mx-auto h-full"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row gap-4 px-6 md:px-4">

          <div className="flex justify-around max-lg:flex-col">
            <div className="min-w-2/3 mx-auto py-4 px-8 relative">

              <div className="flex flex-col items-center text-center space-y-4 p-2" >

                {/* Image flottante avec effet d'elevation */}
                <div className="relative float-right shadow-xl">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-30"></div>
                  <Image
                    src={Portrait}
                    alt="Portrait de Yan souriant"
                    className="relative max-w-[80px] md:max-w-[120px] object-cover rounded-full mx-auto max-h-[80px] md:max-h-[120px]"
                    loading="lazy"
                    placeholder={"blur"}
                  />
                </div>

                {/*<div className="bg-primary/10 p-3 rounded-full">
              <CodeIcon className="h-10 w-10 text-primary" />
            </div>*/}

                <motion.h2 className="heading mb-10 text-white-100 mt-16"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }} // whileInView=
                  transition={{ duration: 0.6 }}
                >
                  A
                  <span className="heading bg-gradient-to-b from-[#9f96f5]  to-[#6c47d2] text-transparent bg-clip-text edge:text-purple tracking-tight">
                    {" "}
                    propos
                    {" "}
                  </span>
                  de{" "}
                  <span className="heading inline bg-gradient-to-r from-[#cf96f5]  to-[#8f47d2] text-transparent bg-clip-text edge:text-purple">
                    moi{" "}
                  </span>
                  ☺️
                </motion.h2>

                {/*<p className="max-sm:text-sm sm:text-base md:text-xl lg:text-xl text-muted-foreground max-w-2xl">
                  Développeur Web depuis une reconversion réussie après 20 ans dans le commerce
                </p>*/}
              </div>

              <motion.div className="space-y-4 text-foreground max-sm:text-sm sm:text-base md:text-md lg:text-lg mt-6 mb-6" variants={container} initial="hidden"
                animate="visible">
                <motion.p variants={item} className="leading-relaxed">
                  Fasciné par la programmation depuis l&apos;enfance, passion transmise par mon frère architecte technique, j&apos;ai toujours été attiré par la logique algorithmique et le Web.
                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  Après 20 ans d&apos;expérience dans le commerce, dont plusieurs années à piloter une activité e-commerce (15 000 commandes/an), j&apos;ai ressenti le besoin de relever un nouveau défi. J&apos;ai donc décidé de transformer ma curiosité de toujours en véritable compétence en me lançant dans une reconversion en développement web.
                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  Mon projet de fin d&apos;études, réalisé en équipe avec Git (branches, pull requests, merge conflicts), m&apos;a donné un aperçu concret du travail collaboratif en environnement agile.
                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  Aujourd&apos;hui, je suis prêt à intégrer une équipe où je pourrai continuer à apprendre, à contribuer, et à évoluer.<br />
                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  Conseiller de vente, manager, gérant, j&apos;ai appris à comprendre les besoins utilisateurs, à communiquer efficacement, et à toujours chercher la solution la plus adaptée.
                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  Curieux, rigoureux et profondément motivé, je suis enthousiaste à l&apos;idée de participer à la conception, la maintenance et l&apos;évolution de vos applications.<br />
                </motion.p>

                <motion.p variants={item} className="leading-relaxed relative px-4 py-8 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <span className="block text-center px-6 ">Ma maxime favorite</span>
                  <span className="block text-center font-semibold text-blue-300 max-sm:text-sm sm:text-base md:text-md lg:text-lg mt-2">« Il n&apos;est pas nécessaire d&apos;espérer pour entreprendre, ni de réussir pour persévérer. »</span>
                  <span className="absolute right-2 bottom-0 text-5xl text-blue-500/80"></span>
                </motion.p>

                {/* Badges de compétences */}
                <div className="flex flex-wrap justify-center gap-4 mt-10 mb-10">
                  <Badge variant="outline" className="border-blue-600/80 text-blue-300 hover:bg-blue-800 hover:text-white">Rigueur</Badge>
                  <Badge variant="outline" className="border-green-600/80 text-green-300 hover:bg-green-800 hover:text-white">Curiosité</Badge>
                  <Badge variant="outline" className="border-pink-600/80 text-pink-300 hover:bg-pink-800 hover:text-white">Communication</Badge>
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-300 hover:bg-yellow-800 hover:text-white">Collaboration</Badge>

                  {/* <Badge variant="default" className="bg-pink-600/80 hover:bg-pink-600">Fullstack</Badge> */}
                </div>

              </motion.div>

              {/* <p className="text-sm sm:text-base md:text-xl lg:text-xl text-muted-foreground">
                <strong>💻 Concepteur d’applications</strong> performantes et sécurisées, j’allie curiosité et rigueur pour répondre aux besoins techniques et métiers.
              </p>

              <p className="text-sm sm:text-base md:text-xl lg:text-xl text-muted-foreground mt-4">
                🛠️ Réalisation de Landing Page, site vitrine, site e-commerce, SaaS, CRM, API Rest, BackOffice...
              </p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mt-4">🌐 Mon expérience de la vente et du e-commerce a profondément influencé mon approche centrée sur l&apos;utilisateur. </p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mt-4">
                <strong>Gestion de projets</strong> : Pilotage d&apos;une activité en ligne générant 15 000 commandes annuelles.
              </p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mt-4">
                <strong>Stratégies collaboratives</strong> :
                Animation d&apos;une équipe de 8 collaborateurs en tant que manager chez Levi’s Store, avec une augmentation constante de 15 % du chiffre d&apos;affaires annuel grâce à l&apos;amélioration continue des processus et de la satisfaction client.
              </p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mt-4">Collaborer avec une équipe passionnée et engagée, serait une opportunité exceptionnelle pour continuer à évoluer professionnellement.</p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mt-4">Hobbies : 💿 Créativité musicale (DJing) | 🏍️ Moto | 🎮 Video-game
              </p>*/}

            </div>

            {/*<IconCloudComp />*/}
            {/*<Statistics />*/}
          </div>
        </div>
      </motion.div>
      <div className="h-0 lg:h-32"></div>
    </>
  );
};
