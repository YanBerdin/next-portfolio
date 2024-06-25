import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { MagicButton } from "./MagicButton";
// import { OrbitingCirclesLg } from "./ui/OrbitingCirclesLg";

export const Hero = () => {
    return (
        <section className="pb-20 pt-36" id="hero">
            <div>
                <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
                <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
                <Spotlight className="-top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
            </div>

            {/*
            *  UI: grid
            *  change bg color to bg-black-100 and reduce grid color from
            *  0.2 to 0.03
            */}

            <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">

                {/* Radial gradient for the container to give a faded look */}

                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
                // change the bg to bg-black-100, so it matches the bg color and will blend in
                />

            </div>
            <div className="flex justify-center gap-32 lg:gap-10 relative my-28 md:my-60 lg:my-36 z-10 "> {/*flex-wrap md:justify-around*/}
                <div className="max-w-[89vh] md:max-w-2xl lg:max-w-[45vw] xl:m-w-[60vw] flex flex-col items-center justify-center">
                    {/*<p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
                        Dynamic Web Magic With Next.js
                    </p>*/}
                    {/**
                     *  Link: https://ui.aceternity.com/components/text-generate-effect
                     *
                     *  change md:text-6xl, add more responsive code
                     */}
                    <TextGenerateEffect
                        className="text-2xl sm:text-3xl lg:text-4xl max-w-[610px] text-center" // remove text-center text-[30px]
                        words="Créateur d'Expériences Web élégantes et intuitives"
                    />
                    <p className="md:tracking-wider mb-4 md:mb-10 text-md md:text-lg lg:text-2xl text-center"> {/*text-center */}
                        Bienvenue, je suis Yan, développeur Php et React.js.
                    </p>


                    <MagicButton
                        title="Voir mes réalisations"
                        icon={<FaLocationArrow />}
                        position="right"
                        // handleClick={() => console.log('Button clicked!')}
                        otherClasses="custom-class hover:opacity-90"
                        href="#projects"
                    />
                </div>
                {/* 
                <div className="max-sm:hidden sm:min-w-[414px] sm:max-w-[450px]"> */}{/* max-sm:hidden  */}
                {/* <OrbitingCirclesLg /> */}
                {/*
                </div>
                */}
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
