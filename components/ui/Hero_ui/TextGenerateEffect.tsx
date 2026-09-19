"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
  as: Tag = "div",
  //gradientClass,
}: {
  words: string;
  className?: string;
  as?: "div" | "h1" | "h2" | "p";
  //gradientClass?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    // console.log(wordsArray);
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.span className="block" ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              //change here if idx is greater than 3, change the text color to #CBACF9
              // from-bg-violet-400 to-bg-violet-700 => Bug
              // className="dark:text-white text-white opacity-0"

              //! Move the gradient style to the parent component < Hero />  
              className={` ${idx > 0 ? "text-slate-300" : "text-white"} opacity-0`}
            //className={`opacity-0 ${gradientClass}`}

            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.span>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      {/* mt-4 to my-4 */}
      <div className="w-full">
        {/* remove  text-2xl from the original */}
        <Tag className=" dark:text-white text-black leading-snug tracking-wide w-full">
          {renderWords()}
        </Tag>
      </div>
    </div>
  );
};