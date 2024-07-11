"use client";

import { useState } from "react";
// import { IoCopyOutline } from "react-icons/io5";
// Also install this npm i --save-dev @types/react-lottie
// import Lottie from "react-lottie";
import { cn } from "@/lib/utils/cn";
import { BackgroundGradientAnimation } from "./GradientBg";
import { GridGlobe } from "./GridGlobe";
// import animationData from "@/data/confetti.json";
import { MagicButton } from "../MagicButton";

import Image from "next/image";
// import { ImGit } from "react-icons/im";
import BackdropModal from "./BackdropModal";
import { GithubIcon2 } from "./Icon";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code remove lg:gap-8 
                "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-2 lg:gap-3 mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    id,
    title,
    description,
    //   remove unecessary things here
    img,
    imgClassName,
    titleClassName,
    spareImg,
    width,
    height,
}: {
    className?: string;
    id: number;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    img?: string;
    imgClassName?: string;
    titleClassName?: string;
    spareImg?: string;
    width?: number;
    height?: number;
}) => {
    const leftLists = ["React.js", "Next.js", "Express", "Node.js"];
    const rightLists = ["Javascript", "Typescript", "Svelte", "Redux"];
    const centerLists = ["PHP", "SQL", "Laravel", "Tailwind"];


    const [copied, setCopied] = useState(false);

    const defaultOptions = {
        loop: copied,
        autoplay: copied,
        // animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const handleCopy = () => {
        const text = "yandevformation@gmail.com";
        navigator.clipboard.writeText(text);
        setCopied(true);
    };

    const handleClick = () => {
        window.open("https://github.com/YanBerdin", "_blank", 'noopener noreferrer');
    }

    // <BackdropModal />
    return (
        <div
            className={cn(
                // remove p-4 rounded-3xl dark:bg-black dark:border-white/[0.2] bg-white  border border-transparent, add border border-white/[0.1] overflow-hidden relative
                "row-span-1 relative overflow-hidden rounded-xl border border-white/[0.1] group/bento hover:shadow-2xl hover:brightness-125 transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col ", // space-y-8
                className
            )}
            style={{
                //   add these two
                //   you can generate the color from here https://cssgradient.io/
                background: "rgb(4,7,29)",
                backgroundColor:
                    "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
        >
            {/* add img divs */}
            <div className={`${id === 6 && "flex justify-center"} h-full`}>
                <div className="w-full h-full absolute ">
                    {img && (
                        <Image
                            src={img}
                            alt={img}
                            width={width}
                            height={height}
                            className={cn(imgClassName, "object-cover object-center ")}
                            loading="lazy"
                        />
                    )}
                </div>
                <div
                    className={`absolute right-0 sm:right-4 bottom-0 sm:bottom-2 ${id === 5 && "w-full" // opacity-80 right-0 -bottom-5
                        } `}
                >
                    {spareImg && (
                        <Image
                            src={spareImg}
                            alt={spareImg}
                            width={width}
                            height={height}
                            className="object-cover object-center max-w-[150px] lg:max-w-[180px] xl:max-w-[250px]"
                            loading="lazy"
                        /> //  w-full h-full
                    )}

                </div>
                {id === 6 && (
                    // add background animation , remove the p tag
                    <BackgroundGradientAnimation>
                        <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-2 pointer-events-none text-center"></div> {/*  text-xl md:text-xl lg:text-2xl lg:text-7xl */}
                    </BackgroundGradientAnimation>
                )}

                <div
                    className={cn(
                        titleClassName,
                        "group-hover/bento:brightness-125 transition duration-200 relative h-full flex flex-col px-5 p-3 sm:p-5"
                    )} //  min-h-30 lg:p-10  [text-md md:text-lg lg:text-2xl] => moved to index.ts
                >
                    {/* change the order of the title and des, font-extralight, remove text-xs text-neutral-600 dark:text-neutral-300 , change the text-color */}
                    <div className="font-sans font-light w-full text-[#C1C2D3] z-10 text-xs md:text-sm lg:text-base">
                        {description}
                    </div>
                    {/* add text-3xl max-w-96 , remove text-neutral-600 dark:text-neutral-300*/}
                    {/* remove mb-2 mt-2 md:text-xs md:max-w-32 */}
                    <div
                        className={`font-sans max-w-96 font-bold z-10 mt-1`} // text-md lg:text-xl
                    >
                        {title}

                    </div>

                    {/* for the github 3d globe */}
                    {id === 2 && <GridGlobe />}
                    {/** {id === 2 }*/}

                    {/* Tech stack list div */}
                    {id === 3 && (
                        <div className="flex gap-1 lg:gap-3 w-fit absolute right-3 lg:mr-2">
                            {/* tech stack lists */}
                            <div className="flex flex-col gap-1 md:gap-2">
                                {leftLists.map((item, i) => (
                                    <span
                                        key={i}
                                        className="py-1 px-2 text-xs opacity-50 
                    lg:opacity-100 rounded-xs text-center bg-[#10132E]" // lg:py-2 lg:px-3 
                                    > {/* rounded-lg */}
                                        {item}
                                    </span>
                                ))}
                                <span className="py-1 px1 rounded-sm text-center bg-[#10132E]"></span>
                            </div>

                            <div className="flex flex-col gap-1 md:gap-2">
                                <span className=" py-1 px-2  rounded-sm text-center bg-[#10132E]"></span>
                                {rightLists.map((item, i) => (
                                    <span
                                        key={i}
                                        className=" py-1 px-1 text-xs opacity-50 
                    lg:opacity-100 rounded-xs text-center bg-[#10132E]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-1 md:gap-2">
                                {centerLists.map((item, i) => (
                                    <span
                                        key={i}
                                        className="py-1 px-1 text-xs opacity-50 
                    lg:opacity-100 rounded-xs text-center bg-[#10132E]" // lg:py-2 lg:px-3 
                                    > {/* rounded-lg */}
                                        {item}
                                    </span>
                                ))}
                                <span className="py-1 px-1 rounded-sm text-center bg-[#10132E]"></span>
                            </div>
                        </div>
                    )}

                    {(id === 1 || id === 4 || id === 5) && (
                        <div className="mt-2">
                            <BackdropModal id={id} />
                        </div>
                    )}


                    {/* for the email copy */}

                    {id === 6 && (
                        <div className="">
                            {/* button border magic from tailwind css buttons  */}
                            {/* add rounded-md h-8 md:h-8, remove rounded-full */}
                            {/* remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 */}
                            {/* add handleCopy() for the copy the text */}
                            <div
                                className={`absolute bottom-3 right-0 ${copied ? "block" : "block"
                                    }`}
                            >
                                {/* <img src="/confetti.gif" alt="confetti" /> */}
                                {/* <Lottie options={defaultOptions} height={200} width={400} /> */}
                            </div>

                            {/*   <MagicButton
                                title={copied ? "Email is Copied!" : "Copy my email address"}
                                icon={<IoCopyOutline />}
                                position="left"
                                handleClick={handleCopy}
                                otherClasses="!bg-[#161A31]"
                            /> */}
                            <MagicButton
                                title="Visitez mon Github"
                                icon={<GithubIcon2 />}
                                position="right"
                                handleClick={handleClick}
                                otherClasses="!bg-[#161A31]"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
