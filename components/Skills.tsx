"use client";

import React from "react";
import { mySkills } from "@/data/index";
import { Button } from "./ui/Skills_ui/MovingBorders";
import { Check } from "lucide-react";
// import Image from "next/image";
import BlurImage from "./ui/BlurImage";
import { motion } from "framer-motion";
//import {inView} from "framer-motion";

export const Skills = () => {
  return (
    <>
      <div className="h-4 mt-10"></div>

      <section className="mx-auto w-11/12 mb-5 lg:mb-52" id="skills">
        <div className="flex flex-col pointer-events-none items-center">
          <motion.h2 className="heading mb-4 text-white-100 mt-16"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }} // whileInView=
            transition={{ duration: 0.6 }}
          >
            Fullstack
            <span className="bg-gradient-to-b from-[#9f96f5]  to-[#6c47d2] text-transparent bg-clip-text edge:text-purple">
              {" "}
              Javascript & Php
              {" "}
            </span>
            spécialiste{" "}
            <span className="inline bg-gradient-to-r from-[#cf96f5]  to-[#8f47d2] text-transparent bg-clip-text edge:text-purple">
              React.js
            </span>
          </motion.h2>

          <motion.div
            //key={card.id}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }} // whileInView / animate
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mx-auto mt-4 md:mt-6 grid lg:grid-cols-2 xl:grid-cols-3 gap-2"> {/* "w-11/12 lg:w-full */}
              {mySkills.map((card) => (

                <Button
                  key={card.id}
                  //   random duration could be fun
                  duration={Math.floor(Math.random() * 10000) + 10000}
                  borderRadius="1.75rem"
                  style={{
                    //   add these two
                    //   generate the color from here https://cssgradient.io/
                    // background: "rgb(4,7,29)",
                    background:
                      "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                    // add this border radius to make it more rounded so that the moving border is more realistic
                    borderRadius: `calc(1.75rem* 0.96)`,
                  }}
                  // remove bg-white dark:bg-slate-900
                  className="flex-1 border-neutral-200 dark:border-slate-800 p-4"
                >
                  <div className="flex flex-col lg:items-center p-2 md:p-3 gap-5"> {/*remove lg:flex-raw*/}
                    <BlurImage
                      src={card.thumbnail}
                      //alt={card.thumbnail}
                      alt={card.thumbnail} // Remplacer card.thumbnail par card.title pour un alt plus descriptif 
                      width={90}
                      height={90}
                      className=" md:w-20 m-auto object-cover" // remove w-16 add m-auto
                      loading="lazy"
                      fill={false}
                      //TODO placeholder={"blur"} // This option only supports local images
                      // blurDataURL={card.thumbnail} // For dynamic images, provide the blurDataURL
                      aria-hidden="true"
                    />
                    <div className="w-full"> {/*ms-5*/}
                      <h3 className="text-center text-black dark:inline bg-gradient-to-r from-[#f8bda9] to-[#f8997c] text-transparent bg-clip-text max-sm:text-xl text-2xl xl:text-2xl font-bold">
                        {card.title}
                      </h3>
                      {/*                  [#f77062] to-[#fe5196]
                  <p className="text-start text-white-100 mt-3 font-semibold">
                    {card.desc}
                  </p>
                  */}
                      <div className="space-y-4 text-start text-white-100 mt-6 font-semibold">
                        {card.skillsList && card.skillsList.filter((skills): skills is string => skills !== undefined).map((skills: string) => (
                          <span key={skills} className="flex">
                            <Check className="text-green-500 min-w-[20px]" />{" "}
                            <p className="ml-2 max-sm:text-sm sm:text-base md:text-md lg:text-lg">{skills}</p>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Button>

              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// export default Skills;