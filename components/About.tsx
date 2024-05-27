import Image from "next/image";
import pilot from "../public/pilot.png";

export const About = () => {
  return (
    <>
      <div id="about" className="h-10 mt-10"></div>
      {/* bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased */}
      <section
        id="about"
        className="bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl rounded-lg justify-center w-11/12 mx-auto h-full  py-8">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12  lg:py-6">
          <Image
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                LET ME{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  INTRODUCE{" "}
                </span>
                MYSELF
              </h2>
              <p className="text-md lg:text-xl text-muted-foreground mt-4">
                Fascinated by programming from a young age thanks to my architect brother, who also became my mentor, I recently undertook a bold career change. After 20 years of experience in commerce and e-commerce, I decided to follow my passion for web development.
              </p>

              <p className="text-md lg:text-xl text-muted-foreground mt-4">
                In 2023, I earned my Fullstack Web and Mobile Developer Professional Title (TP DWWM) through a remote training program with O&apos;clock school.
              </p>

              <p className="text-md lg:text-xl text-muted-foreground mt-4">
                Web development, with its complexity and ingenuity, captivated my interest and fueled my desire to learn. Each challenge I encountered was an opportunity to acquire new skills and strengthen my passion.
              </p>

              <p className="text-md lg:text-xl text-muted-foreground mt-4">
                Today, with a rigorous Fullstack training and a determination to excel in this field, I am eager to continue honing my skills through new projects.
              </p>

            </div>

            {/*<Statistics />*/}
          </div>
        </div>
      </section>
    </>
  );
};
