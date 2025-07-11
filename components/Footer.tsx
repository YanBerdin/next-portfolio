"use client";

import { socialMedia } from "@/data/index";
import { MagicButton } from "./MagicButton";
import Link from "next/link";
// import Image from "next/image";
import BlurImage from "./ui/BlurImage";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="md:h-24 w-full lg:h-44"></div>
      <footer className="w-full pt-10 pb-10">
        {/* background grid */}
        <div className="w-full max-h-6/12 absolute left-0 -bottom-4 min-h-96 mt-10"> {/*  max-h-[900px]*/}
          <BlurImage
            src="/footer-grid.svg"
            alt="grid"
            className="w-full opacity-50"
            width={331}
            height={156}
            loading="lazy"
            // priority={true}
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col items-center">
          <motion.h2 className="heading text-white-100"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ma passion et mon expertise <br /> <span className="heading text-purple"> A votre service  </span>
          </motion.h2>
          <p className="text-white-200 md:mt-10 my-5 text-center"></p>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MagicButton
              title="Contactez-moi"
              icon={""} // icon={<FaLocationArrow />}
              position="right"
              href="#contact"
            />
          </motion.div>
        </div>
        <div className="flex mt-16 md:flex-row flex-col-reverse justify-between items-center">
          <p className="md:text-base text-sm md:font-normal font-light mt-4">
            Copyright © {currentYear} Yan Berdin
          </p>

          <div className="flex items-center md:gap-3 gap-6">
            {socialMedia.map((info) => (
              <Link
                key={info.id}
                href={info.link}
                target={info.target}
                rel={info.rel}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-50 bg-black-200 rounded-md border border-black-300 hover:scale-95 hover:brightness-150"
                title={info.title}
                aria-label={info.alt}
              >
                <BlurImage
                  src={info.img}
                  alt={info.alt}
                  width={24}
                  height={24}
                  loading="lazy"
                // fetchPriority="high"
                // rel="preload"
                // aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;