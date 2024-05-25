import React from "react";

import { mySkills } from "@/data";
import { Button } from "./ui/MovingBorders";
// https://lucide.dev/guide/packages/lucide-react
import { Check } from "lucide-react";



export const Experience = () => {
  return (
    <section
      id="skills"
      className="w-11/12 mx-auto px-6 py-10">
      <div className="">
        {/*<h1 className="heading">
        My <span className="text-purple">work experience</span>
  </h1>*/}
        <h2 className="text-3xl md:text-4xl font-bold text-center ">
          Specializing in

          <span className="bg-gradient-to-b from-[#9f96f5]  to-[#6c47d2] text-transparent bg-clip-text">
            {" "}
            Javascript & PHP
            {" "}
          </span>
          with a core focus on{" "}
          <span className="inline bg-gradient-to-r from-[#cf96f5]  to-[#8f47d2] text-transparent bg-clip-text">
            React
          </span>
        </h2>
        <div className="w-full mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4"> {/*remove lg:grid-cols-4*/}
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
              className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <div className="flex flex-col lg:items-center p-3 py-6 md:p-5 gap-5 "> {/*remove lg:flex-raw*/}
                <img
                  src={card.thumbnail}
                  //alt={card.thumbnail}
                  alt={card.thumbnail} // Remplacé card.thumbnail par card.title pour un alt plus descriptif
                  className="lg:w-32 md:w-20 m-auto" // remove w-16 add m-auto
                />
                <div className="lg:ms-5 ">
                  <h3 className="text-center text-xl md:text-2xl font-bold">
                    {card.title}
                  </h3>
                  {/*                  
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
                */}
                  <div className="space-y-4 text-start text-white-100 mt-3 font-semibold">
                    {card.skillsList && card.skillsList.map((skills: string) => (
                      <span key={skills} className="flex">
                        <Check className="text-green-500" />{" "}
                        <p className="ml-2">{skills}</p>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

// export default Experience;