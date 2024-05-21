// import React from "react";
import { Spotlight } from "./ui/Spotlight";

export const Hero = () => {
    return (
        <div className="pb-20 pt-36">
            <div>
                <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="yellow" />
                <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
                <Spotlight className="-top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
            </div>
            <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.3] bg-grid-black/[0.2] relative flex items-center justify-center">
                {/* Radial gradient for the container to give a faded look */}
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>
                {/*
                <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                    Backgrounds
                </p>
                */}
                
            </div>
        </div>

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
