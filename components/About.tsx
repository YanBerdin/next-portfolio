"use client";

import Image from "next/image";
import Portrait from "../public/about-assets/a-professional-studio-portrait-of-a-man.jpeg";
import { motion } from "framer-motion";

const TIMELINE_ITEMS = [
  {
    period: "Présent",
    title: "Développeur Fullstack",
    company: "Rouge Cardinal Company",
    description: "Next.js · TypeScript · Supabase · DDD · BackOffice complet",
  },
  {
    period: "2024",
    title: "Reconversion Dev Web",
    company: "Formation intensive",
    description: "React, Next.js, TypeScript, PHP, Supabase",
  },
  {
    period: "2013 – 2023",
    title: "Gérant e-commerce",
    company: "eBay / Amazon",
    description: "15 000 commandes/an · Stocks & logistique",
  },
  {
    period: "Avant",
    title: "Manager",
    company: "Levi's Store (10 ans)",
    description: "Équipe de 8 personnes · +15 % CA/an",
  },
] as const;

const PASSIONS = [
  { icon: "💿", label: "DJing", description: "Créativité musicale & sets" },
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
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Grid background overlay */}
      <div
        className="absolute inset-0 dark:bg-grid-white/[0.03] bg-grid-black/[0.1]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto">
        {/* Section title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white-100"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          À propos{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AAFF] to-[#38BEFF]">
            de moi
          </span>
        </motion.h2>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Col 1 — Photo avec bordure néon */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#00AAFF] to-[#38BEFF] blur opacity-50"
                aria-hidden="true"
              />
              <div className="relative rounded-xl border-2 border-purple/80 shadow-[0_0_32px_rgba(0,170,255,0.35)] overflow-hidden">
                <Image
                src={Portrait}
                alt="Portrait professionnel de Yan souriant"
                className="object-cover w-full max-w-[340px]"
                loading="lazy"
                placeholder="blur"
              />
            </div>
        </div>
      </motion.div>

      {/* Col 2 — Mon Histoire + Passions */}
      <div className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white-100 mb-4">
            <span className="text-purple font-mono">// </span>Mon Histoire
          </h3>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              +15 ans dans le commerce et l&apos;e-commerce. Manager, puis
              gérant d&apos;une activité eBay/Amazon à 15&nbsp;000
              commandes/an. J&apos;ai vécu les pannes en pleine période de
              soldes, les bugs qui coûtent cher.
            </p>
            <p>
              Aujourd&apos;hui je construis des applications Fullstack en
              pensant architecture dès le départ - pour que ça tienne, que
              ça se maintienne, que ça coûte moins cher à faire évoluer.
            </p>
            <p>
              Je traduis les contraintes métier en décisions techniques, et
              inversement. 10 ans de management, ça ne s&apos;oublie pas.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm">
              🔧 Présentiel, hybride ou remote &nbsp;·&nbsp; 📍 Basé près de Dijon
            </p>
          </div>
        </motion.div>

        {/* Passions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white-100 mb-4">
            <span className="text-purple font-mono">// </span>Au-delà du code
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {PASSIONS.map((passion, i) => (
              <motion.div
                key={passion.label}
                className="flex flex-col items-center text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-purple/50 transition-colors"
                custom={i}
                initial="hidden"
                whileInView="visible"
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
      </div>

      {/* Col 3 — Parcours timeline */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-white-100 mb-6">
          <span className="text-purple font-mono">// </span>Parcours
        </h3>

        <div className="relative">
          {/* Ligne verticale */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#00AAFF]/80 via-[#38BEFF]/30 to-transparent"
            aria-hidden="true"
          />
          <ol className="space-y-6">
            {TIMELINE_ITEMS.map((item, i) => (
              <motion.li
                key={item.period}
                className="flex gap-4 pl-7 relative"
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
              >
                {/* Point de la timeline */}
                <div
                  className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-purple bg-black-100 shadow-[0_0_8px_rgba(103,232,249,0.7)]"
                  aria-hidden="true"
                />
                <div>
                  <span className="text-xs text-purple font-mono font-semibold">
                    {item.period}
                  </span>
                  <p className="text-white font-semibold text-sm mt-0.5">
                    {item.title}
                  </p>
                  <p className="text-slate-400 text-xs font-medium">
                    {item.company}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Maxime */}
        <motion.blockquote
          className="mt-8 p-4 rounded-lg bg-slate-800/40 border-l-2 border-purple/60 text-white-100 text-sm italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          « Il n&apos;est pas nécessaire d&apos;espérer pour entreprendre,
          ni de réussir pour persévérer. »
        </motion.blockquote>
      </motion.div>

    </div>
      </div >
    </section >
  );
};
