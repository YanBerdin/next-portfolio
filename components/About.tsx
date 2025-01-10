"use client";

import Image from "next/image";
import Portrait from "../public/about-assets/portrait.png";
// import { IconCloudComp } from "./ui/IconCloudComp";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <>
      <div className="h-8 sm:h-24"></div>
      {/* bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased */}
      <motion.div
        className="bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl rounded-lg justify-center w-11/12 mx-auto h-full"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className=" flex flex-col lg:flex-row gap-4 md:gap-12 py-4 px-4 md:py-12 md:px-12"> {/* lg:p-18 xl:p-20 flex-col-reverse px-6*/}

          <div className="flex justify-around max-lg:flex-col">
            <div className="min-w-2/3 mx-auto py-4 px-4">
              <Image
                src={Portrait}
                alt="Portrait de Yan souriant"
                className=" max-w-[100px] md:max-w-[130px] object-cover rounded-lg mx-auto max-h-[108px] md:max-h-[150px] flex-shrink-2 sm:float-start flex sm:mr-4 max-sm:mb-4"
                loading="lazy"
                placeholder={"blur"} // (only SSR) blur pendant le chargement 
              /> {/**  lg:max-w-[180px] xl:max-w-[200px] lg:max-h-[207px] xl:max-h-[212px] */}

              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground mt-4">

                <strong>💻 Concepteur d’applications</strong> performantes et sécurisées, j’allie curiosité et rigueur pour répondre aux besoins techniques et métiers. Je porte une attention particulière à la maintenabilité et l&apos;accessibilité.
              </p>

              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground mt-4">🌐 Mon expérience dans le domaine de la vente et du e-commerce a profondément influencé mon approche centrée sur l&apos;utilisateur. </p>

              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground mt-4">
                <strong>Gestion de projets</strong> : Pilotage d&apos;une activité en ligne générant 15 000 commandes annuelles.
              </p>

              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground mt-4">
                <strong>Stratégies collaboratives</strong> :
                Animation d&apos;une équipe de 8 collaborateurs en tant que manager chez Levi’s Store, avec une augmentation de 15 % du chiffre d&apos;affaires annuel grâce à l&apos;amélioration continue des processus et de la satisfaction client.
              </p>

              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground mt-4">Collaborer avec une équipe passionnée et engagée, serait une opportunité exceptionnelle pour continuer à évoluer professionnellement.</p>

              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground mt-4">Hobbies : 💿 Créativité musicale (DJing) | 🏍️ Moto | 🎮 Video-game
              </p>

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
