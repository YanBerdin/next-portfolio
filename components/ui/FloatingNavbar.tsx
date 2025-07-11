"use client";

import React, { useState, SVGProps } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Icon } from './Icon';

/** 
*  UI: Floating Navbar
*  Link: https://ui.aceternity.com/components/floating-navbar
**/

export const FloatingNav = ({
  navItems, // "@/data"
  className,
}: {
  navItems: { name: string; link: string; icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element | undefined; }[];
  className?: string;
  target?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          // change rounded-full to rounded-lg
          // remove dark:border-white/[0.2] dark:bg-black bg-white border-transparent
          // change  pr-2 pl-8 py-2 to px-10 py-5
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-3 md:top-4 inset-x-0 mx-auto px-2 sm:px-4 py-2 sm:py-3 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-2 sm:space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-muted-foreground brightness-110 items-center flex space-x-0.5 sm:space-x-1 text-neutral-600 hover:brightness-200 hover:scale-95 transition-transform duration-300 ease-in-out rounded-md !cursor-pointer"
            )}
            target={navItem.target}
            rel="noopener noreferrer"
            title={navItem.title}
          >
            {/** navItem.icon && <Icon icon={navItem.icon} /> */}
            {/** navItem.icon est une référence à un composant (GithubIcon2), et non une instance d’un composant. Je ne peux pas l’utiliser directement comme un enfant dans JSX.*/}
            {/*<span className="block sm:hidden">{navItem.icon}</span>*/}
            <span className="block">{navItem.icon && <Icon icon={navItem.icon} className="nav-icon" />}</span>
            {/* add !cursor-pointer */}
            {/* remove hidden sm:block for the mobile responsive */}
            <span className=" text-xs sm:text-sm md:text-base !cursor-pointer">{navItem.name}</span>
          </Link>
        ))}
        {/* remove this login btn */}
        {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button> */}
      </motion.div>
    </AnimatePresence>
  );
};