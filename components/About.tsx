"use client";

import Image from "next/image";
import Portrait from "../public/about-assets/a-professional-studio-portrait-of-a-man.jpeg";
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
      <div className="h-10 lg:h-20"></div>

      <motion.div
        className="bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl rounded-lg justify-center w-11/12 mx-auto h-full"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row px-6 md:px-4 justify-center">

          <div className="flex justify-around max-lg:flex-col">
            <div className="min-w-2/3 mx-auto max-sm:px-2 px-8 py-8 relative">

              <div className="flex flex-col items-center text-center space-y-4 p-2" >

                {/* Image flottante avec effet d'elevation */}
                <div className="relative float-right shadow-xl">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-30"></div>
                  <Image
                    src={Portrait}
                    alt="Portrait de Yan souriant"
                    className="relative max-w-[80px] md:max-w-[120px] object-cover rounded-full mx-auto max-h-[120px] md:max-h-[120px]"
                    loading="lazy"
                    placeholder={"blur"}
                  />
                </div>

                {/*<div className="bg-primary/10 p-3 rounded-full">
              <CodeIcon className="h-10 w-10 text-primary" />
            </div>*/}

                <motion.h2 className="heading mb-10 text-white-100 mt-16"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  A propos de moi

                </motion.h2>

                {/*<p className="max-sm:text-sm sm:text-base md:text-xl lg:text-xl text-muted-foreground max-w-2xl">
                  Développeur Web depuis une reconversion réussie après 20 ans dans le commerce
                </p>*/}
              </div>

              <motion.div className="space-y-4 text-foreground max-sm:text-sm sm:text-base md:text-md lg:text-xl mt-6 mb-6 text-white-100" variants={container} initial="hidden"
                animate="visible">
                <motion.p variants={item} className="leading-relaxed">
                  +15 ans dans le commerce et l&apos;e-commerce. Manager, puis gérant d&apos;une activité eBay/Amazon à 15 000 commandes/an. J&apos;ai vécu les pannes en pleine période de soldes, les bugs qui coûtent cher, les back-offices impossibles à utiliser.

                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  Aujourd&apos;hui je développe des applications Fullstack en pensant architecture dès le départ. Pas juste pour que ça marche. Pour que ça tienne, que ça se maintienne, que ça coûte moins cher à faire évoluer.
                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  Ce que j&apos;apporte qu&apos;un junior classique n&apos;a pas :<br></br>
                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  ✅  Je sais ce que peux coûter un bug<br></br>
                  ✅  Je comprends les contraintes métier : stock, délais, conversion, fidélisation, pression client<br></br>
                  ✅  Je traduis les contraintes métier en décisions techniques, et inversement.<br></br>
                  ✅  J&apos;ai managé des équipes pendant 10 ans, je sais travailler en équipe et en autonomie
                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  Projet récents :<br />
                  Rouge Cardinal Company - Next.js · TypeScript · Supabase · Architecture DDD · BackOffice complet
                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  Je cherche un CDI ou une alternance dans une agence, une startup ou une PME - idéalement avec des enjeux e-commerce ou produit. Un environnement où la qualité du code compte autant que la vitesse de livraison.
                  Ouvert aux missions longues en freelance.<br />
                </motion.p>

                <motion.p variants={item} className="leading-relaxed">
                  🔧 Présentiel, hybride ou remote<br />
                  📍 Basé près de Dijon<br />
                </motion.p>

                <motion.p variants={item} className="leading-relaxed relative px-4 py-4 bg-slate-800/30 rounded-lg border border-slate-600/50 xl:w-3/4 mx-auto">
                  <span className="block text-center px-6 text-white-100">Ma maxime favorite</span>
                  <span className="block text-center text-white-100 max-sm:text-sm sm:text-base md:text-md lg:text-lg mt-2">« Il n&apos;est pas nécessaire d&apos;espérer pour entreprendre, ni de réussir pour persévérer. »</span>
                  <span className="absolute right-2 bottom-0 text-5xl text-blue-500/80"></span>
                </motion.p>

                {/* Badges de compétences */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Badge variant="outline" className="border-blue-600/80 text-blue-300 hover:bg-blue-800 hover:text-white">Rigueur</Badge>
                  <Badge variant="outline" className="border-green-600/80 text-green-300 hover:bg-green-800 hover:text-white">Curiosité</Badge>
                  <Badge variant="outline" className="border-pink-600/80 text-pink-300 hover:bg-pink-800 hover:text-white">Communication</Badge>
                  <Badge variant="outline" className="border-violet-500/50 text-violet-300 hover:bg-violet-800 hover:text-white">Collaboration</Badge>

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
