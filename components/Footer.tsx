import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import { MagicButton } from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-10 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full h-auto absolute left-0 -bottom-4 min-h-96"> {/* min-h-96*/} 
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading max-w-[70vw] lg:max-w-[32vw]">
        Ma passion et mon expertise <span className="text-purple"> A votre service</span>
        </h1>
       <p className="text-white-200 md:mt-10 my-5 text-center"></p>
      
          <MagicButton
            title="Contactez-moi"
            icon={<FaLocationArrow />}
            position="right"
            href="#contact"
          />

      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Yan Berdin
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-50 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={24} height={24} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;