"use client";

import { socialMedia } from "@/data/index";
import Link from "next/link";
// import Image from "next/image";
import BlurImage from "./ui/BlurImage";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-slate-800 py-10">
      <div className="mx-auto flex w-11/12 max-w-6xl flex-col-reverse items-center justify-between gap-6 md:flex-row">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © {currentYear} Yan Berdin
        </p>

        <div className="flex items-center gap-4">
          {socialMedia.map((info) => (
            <Link
              key={info.id}
              href={info.link}
              target={info.target}
              rel={info.rel}
              className="w-12 h-12 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-50 bg-black-200 rounded-md border border-black-300 hover:scale-95 hover:brightness-150"
              title={info.title}
              aria-label={info.alt}
            >
              <BlurImage
                src={info.img}
                alt={info.alt}
                width={28}
                height={28}
                loading="lazy"
                className="h-7 w-7"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;