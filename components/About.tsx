"use client";

import Image from "next/image";
import Portrait from "../public/about-assets/portrait.jpeg";
import { motion } from "framer-motion";

const TIMELINE_ITEMS = [
  {
    period: "Présent",
    title: "Développeur Fullstack",
    company: "Compagnie Rouge Cardinal",
    description: "Next.js · TypeScript · Supabase · DDD · BackOffice complet (CMS)",
  },
  {
    period: "2023",
    title: "Diplôme Dev Web",
    company: "O'clock",
    description: "JS · React.js · PHP · Laravel · MySQL · WCAG 2.2 / RGAA",
  },
  {
    period: "2010 – 2018",
    title: "Gérant e-commerce",
    company: "eBay / Amazon",
    description: "15 000 commandes/an · Gold Power Seller · Stocks & logistique",
  },
  {
    period: "2003 – 2010",
    title: "Responsable de magasin",
    company: "Original Levi's Store",
    description: "Équipe de 8 personnes · +15 % CA/an",
  },
] as const;

const PASSIONS = [
  { icon: "💿", label: "DJing", description: "Créativité musicale" },
  { icon: "🏍️", label: "Moto", description: "Liberté sur deux roues" },
  { icon: "🎮", label: "Gaming", description: "Stratégie & mondes virtuels" },
] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export const About = () => {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="relative z-10 w-11/12 max-w-6xl mx-auto">
        {/* Section title */}
        <motion.h2
          className="heading text-3xl font-bold text-white-100 md:text-4xl mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          À propos
        </motion.h2>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 items-start">

          {/* Col 1 — Photo */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full max-w-[22rem] overflow-hidden rounded-xl border border-slate-800">
              <Image
                src={Portrait}
                alt="Portrait professionnel de Yan Berdin"
                className="w-full object-cover"
                sizes="(min-width: 1024px) 22rem, 90vw"
                loading="lazy"
                placeholder="blur"
              />
            </div>
          </motion.div>

          {/* Col 2 — Mon Histoire + Passions */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl lg:text-2xl font-semibold text-white-100 mb-4">
                Mon histoire
              </h3>
              <div className="space-y-4 text-slate-300 text-base lg:text-lg leading-relaxed">
                <p>
                  La plupart des développeurs découvrent les vrais enjeux d'un site e-commerce quand ils lisent le brief.
                </p>
                <p>
                  J’y ai passé huit ans : gestion e-commerce (jusqu’à 15 000 commandes/an), optimisation de la conversion et des opérations.
                </p>
                <p>
                  Cette expérience terrain m’a conduit au développement web. Aujourd’hui, je conçois des applications fullstack de bout en bout (backend, front, data) avec une lecture directe des enjeux business : conversion, performance, fiabilité et architecture durable.
                </p>
                <p>Je cherche à rejoindre une équipe (agence, startup ou PME) où les choix techniques servent réellement le produit et où la qualité d’exécution est aussi importante que la vitesse.
                </p>
                <p className="text-slate-400 text-xs sm:text-sm lg:text-base">
                  🔧 Présentiel, hybride ou remote &nbsp;·&nbsp; 📍 Basé près de Dijon
                </p>
              </div>
            </motion.div>

            {/* Passions */}
            {/*
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl lg:text-4xl font-bold text-white-100 mb-4">
            <span className="text-purple font-mono">// </span>Au-delà du code
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {PASSIONS.map((passion, i) => (
              <motion.div
                key={passion.label}
                className="flex flex-col items-center text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-purple/50 transition-colors"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <span
                  className="text-3xl mb-2"
                  role="img"
                  aria-label={passion.label}
                >
                  {passion.icon}
                </span>
                <p className="text-purple font-semibold text-xs sm:text-sm">
                  {passion.label}
                </p>
                <p className="text-slate-400 text-xs mt-1 hidden sm:block">
                  {passion.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        */}
          </div>

          {/* Col 3 — Parcours timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl lg:text-2xl font-semibold text-white-100 mb-6">
              Parcours
            </h3>

            <div className="relative">
              {/* Ligne verticale */}
              <div
                className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-700"
                aria-hidden="true"
              />
              <ol className="space-y-6">
                {TIMELINE_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.period}
                    className="flex gap-4 pl-7 relative"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                  >
                    {/* Point de la timeline */}
                    <div
                      className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-slate-600 bg-black-100"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-xs lg:text-sm text-slate-400 font-mono font-semibold">
                        {item.period}
                      </span>
                      <p className="text-white font-semibold text-sm lg:text-base mt-0.5">
                        {item.title}
                      </p>
                      <p className="text-slate-400 text-xs lg:text-sm font-medium">
                        {item.company}
                      </p>
                      <p className="text-slate-400 text-xs lg:text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Maxime */}
            {/* 
        <motion.blockquote
          className="mt-8 p-4 rounded-lg bg-slate-800/40 border-l-2 border-purple/60 text-white-100 text-sm italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          « Il n&apos;est pas nécessaire d&apos;espérer pour entreprendre,
          ni de réussir pour persévérer. »
        </motion.blockquote>
        */}
          </motion.div>

        </div>
      </div >
    </section >
  );
};
