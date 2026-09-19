"use client";

// import { FaLocationArrow } from "react-icons/fa6";
import { Spotlight } from "./ui/Hero_ui/Spotlight";
import { TextGenerateEffect } from "./ui/Hero_ui/TextGenerateEffect";
import { MagicButton } from "./MagicButton";
// import { OrbitingCirclesLg } from "./ui/OrbitingCirclesLg";
// import Title from "./ui/Title";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const CASE_STUDY_URL = "/projets/rouge-cardinal";
const ROUGE_CARDINAL_SITE_URL = "https://compagnie-rouge-cardinal.fr";

export const Hero = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="relative mb-20">
            <div>
                <Spotlight className="-top-10 -left-10 md:-left-32 md:-top-20 h-[60vh] w-[60vw]" fill="white" aria-hidden="true" />
                <Spotlight className="top-10 left-full h-[80vh] w-[60vw]" fill="#6F9DC4" aria-hidden="true" />
            </div>

            {/*
            *  UI: grid
            *  change bg color to bg-black-100 and reduce grid color from
            *  0.2 to 0.03
            */}

            <div className="h-[65vh] min-h-[420px] w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0" aria-hidden="true">

                {/* Radial gradient for the container to give a faded look */}

                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
                // change the bg to bg-black-100, so it matches the bg color and will blend in
                />

            </div>
            <div className="flex justify-center gap-10 relative mt-0 md:mt-20 mb-24 z-10"> {/*flex-wrap md:justify-around*/}
                <div className="max-sm:w-11/12 w-10/12 flex flex-col items-center justify-center">
                    {/*<p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
                        Dynamic Web Magic With Next.js
                    </p>*/}
                    {/**
                     *  Link: https://ui.aceternity.com/components/text-generate-effect
                     *
                     *  change md:text-6xl, add more responsive code
                     */}
                    
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900/60 backdrop-blur-sm mt-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                    >
                        <span className="w-2 h-2 rounded-full bg-purple" aria-hidden="true" />
                        <span className="text-xs font-medium text-slate-300 tracking-widest uppercase">
                          Yan Berdin · Disponible · CDI, alternance ou mission longue
                        </span>
                    </motion.div>
                    
                    <TextGenerateEffect
                        as="h1"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-center w-full mt-16 mb-4"
                        words="Développeur Web fullstack"
                    />


                    <motion.p className="font-medium md:tracking-wider my-8 text-lg sm:text-xl md:text-xl lg:text-2xl text-center text-slate-300"
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Node.js · Next.js · React.js · TypeScript
                    </motion.p>

                    <motion.p
                        className="text-sm md:text-lg text-center text-slate-400 leading-relaxed mb-6 sm:mt-8 max-w-6xl"
                        initial={shouldReduceMotion ? { opacity: 1 } : { y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: shouldReduceMotion ? 0 : 0.8,
                            ease: "easeOut"
                        }}
                    >
                        J&apos;ai conçu et mis en production Rouge Cardinal, un CMS complet utilisé en conditions réelles par une compagnie de théâtre.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        initial={shouldReduceMotion ? { opacity: 1 } : { y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: shouldReduceMotion ? 0 : 0.4,
                            delay: shouldReduceMotion ? 0 : 0.3,
                            ease: "easeOut"
                        }}
                    >
                        <MagicButton
                            title="Voir l'étude de cas Rouge Cardinal"
                            icon={""}
                            position="right"
                            href={CASE_STUDY_URL}
                        />
                        <Link
                            href={ROUGE_CARDINAL_SITE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="touch-hitbox inline-flex h-12 min-w-[14rem] items-center justify-center rounded-lg border border-slate-600 bg-slate-950/60 px-7 text-md md:text-lg font-medium text-slate-100 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
                        >
                            Voir le site en production
                        </Link>
                    </motion.div>

                    <motion.p
                        className="mt-6 text-xs sm:text-sm md:text-base lg:text-lg text-center text-slate-300 tracking-wide"
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.5 }}
                    >
                        Next.js / Supabase / PostgreSQL · 36 tables · RLS complète · CI/CD · tests E2E Playwright
                    </motion.p>
                    {/*<Title />*/}
                </div>
            </div>

        </section>

        /*
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
            <div className="text-center lg:text-start space-y-10 lg:space-y-6 lg:ml-4">
                <main className="text-5xl md:text-6xl font-bold">
                    <h1 className="inline text-justify">
                        Welcome{" "}
                        
                        <img
                            src="/assets/waving-hand.webp"
                            alt="waving hand"
                            className="w-14 h-14 inline transform rotate-15 animate-waving ease-linear relative top-[-10px]"
                            srcSet="./src/assets/waving-hand.webp 1x, /assets/waving-hand.webp 2x"
                        />
                        
                        <br />
                        I&apos;m{" "}
                        <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                            Yan
                        </span>{" "}
                    </h1>{" "}
                    <br />
                    {" "}
                    <h2 className="inline">
                        <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                            React
                        </span>{" "}
                        Developer
                    </h2>
                </main>
 
                <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                    I 💖 creating elegant and intuitive solutions. Explore my portfolio to discover my projects and skills in web development.
                </p>
 
                <div className="space-y-4 md:space-y-0 md:space-x-4">
                <Button className="w-full md:w-1/3">Contact</Button> 
                   
                    <a
                        rel="noreferrer noopener"
                        href="https://github.com/YanBerdin"
                        target="_blank"
                                             className={`w-full md:w-1/3  ${buttonVariants({
                            variant: "outline",
                        })}`}
                 
                        className={`w-full md:w-1/3  ${buttonVariants({
                            variant: "outline",
                        })}`}
                    >
                        My Github
                     <GitHubLogoIcon className="ml-2 w-5 h-5" />
                    </a>
            
                </div> 
            </div>
 
            Hero cards sections 
            <div className="z-10 max-sm:space-y-4">
                <HeroCards />  
            </div>
 
            Shadow effect
            <div className="shadow"></div>
        </section>
        */
    );
};
