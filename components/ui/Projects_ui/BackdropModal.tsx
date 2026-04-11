import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

// import { gridItems } from "../../data/index"; //TODO @/data/index
import { Repositories } from "../../../data/projectRefactoData";
import { BackgroundGradient } from "../Background-gradient";
import { DemoIcon, GithubIcon2 } from "../Icon";
//import { ButtonsCard } from "./tailwindcss-buttons";
import { motion } from "framer-motion";

// Afficher le contenu de gridItems dans un modal 

/**
 * UI : Backdrop Modal
 * Link : https://nextui.org/docs/components/modal#backdrop
 */
export default function BackdropModal({ id }: { id: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState<"blur" | "transparent" | "opaque" | undefined>('blur');
  const [size, setSize] = React.useState<'xl' | 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'>('xl');

  const [title, settitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [explanationList, setexplanationList] = React.useState<string[]>([]);
  const [demoLink, setDemoLink] = React.useState<string>("");
  const [githubLink, setGithubLink] = React.useState<string>("");

  const backdrops: ("blur" | "transparent" | "opaque")[] = ["blur"];

  const handleOpen = (backdropValue: "blur" | "transparent" | "opaque", itemId: number, modalSize: typeof size) => {
    setBackdrop(backdropValue);
    setSize(modalSize);

    // const item = gridItems.find(item => item.id === id);
    const item = Repositories.find(item => item.id === itemId);
    if (item) {
      settitle(item.title);
      setDescription(item.description);
      setexplanationList(item.explanationList ?? []);
      setDemoLink(item.demoLink ?? "");
      setGithubLink(item.githubLink ?? "");
    }
    onOpen();
  }

  const handleCodeClick = () => {
    window.open(githubLink, "_blank", 'noopener noreferrer');
  }
  const handleDemoClick = () => {
    window.open(demoLink, "_blank", 'noopener noreferrer');
  }


  return (
    <div className="details">
      <div className="flex flex-wrap gap-2">
        {backdrops.map((b) => (
          <Button
            key={b}
            onPress={() => handleOpen(b, id, 'xl')}
            className="capitalize text-xs md:text-sm px-1"
          >
            Details
          </Button>
        ))}
      </div>

      <Modal 
        backdrop={backdrop} 
        isOpen={isOpen} 
        onClose={onClose} 
        size={size} 
        placement="center" 
        className="max-sm:mt-24" 
        scrollBehavior="inside"
      >
        <ModalContent
          style={{
            //   generate the color from https://cssgradient.io/
            background:
              "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            // add this border radius to make it more rounded so that the moving border is more realistic
            borderRadius: `calc(1.75rem* 0.96)`,
          }}
          // remove bg-white dark:bg-slate-900
          className="border-neutral-200 dark:border-slate-800 w-10/12 md:max-w-[80vw] lg:max-w-[70vw]"
        >
          {(onClose) => (
            <BackgroundGradient className="rounded-[22px] bg-white dark:bg-zinc-900 p-3 text-md">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ModalHeader className="flex flex-col py-4 px-4">
                  <h2 className="px-3 text-[#00AAFF] text-xl brightness-125">{title}</h2>
                </ModalHeader>
                <ModalBody className="text-slate-100 max-h-[70vh] overflow-y-auto gap-0 scrollbar max-sm:px-3 max-sm:text-sm">
                  <h3 className="mb-4 text-[#24b3fa] brightness-125 text-md">{description}</h3>
                  {explanationList.map((line, index) => {
                    // Separators (═══...) → clean divider
                    if (/^[═─=]+$/.test(line.trim())) {
                      return <hr key={index} className="border-slate-700/40 my-3" />;
                    }
                    // Empty / whitespace-only lines → spacer
                    if (line.trim() === '') {
                      return <div key={index} className="h-3" />;
                    }
                    // Section headers: lines starting with a section emoji
                    if (/^[📌🏗️🔒🚀🎯💡🎙️🏠🏭ℹ️👉]/.test(line)) {
                      return (
                        <p key={index} className="text-[#00AAFF] font-semibold text-sm md:text-base mt-5 mb-2">
                          {line}
                        </p>
                      );
                    }
                    // Continuation / solution lines (→)
                    if (line.startsWith('→')) {
                      return (
                        <p key={index} className="text-slate-400 text-xs md:text-sm pl-4 leading-loose mb-1">
                          {line}
                        </p>
                      );
                    }
                    // Bullet lines "• Label : value" → colorize the label part, strip bullet
                    if (line.startsWith('•')) {
                      const stripped = line.slice(2); // remove "• "
                      const colonIdx = stripped.indexOf(' : ');
                      if (colonIdx !== -1) {
                        const label = stripped.slice(0, colonIdx + 3);
                        const value = stripped.slice(colonIdx + 3);
                        return (
                          <p key={index} className="text-xs md:text-sm lg:text-base leading-loose mb-0.5">
                            <span className="text-[#70b0fa] font-medium">{label}</span>
                            <span className="text-slate-200">{value}</span>
                          </p>
                        );
                      }
                      // Bullet without " : " separator
                      return (
                        <p key={index} className="text-xs md:text-sm lg:text-base leading-loose mb-0.5">
                          {stripped}
                        </p>
                      );
                    }
                    // Regular line
                    return (
                      <p key={index} className="text-xs md:text-sm lg:text-base leading-loose mb-0.5">
                        {line}
                      </p>
                    );
                  })}
                </ModalBody>
                <ModalFooter className="max-sm:px-3 flex flex-wrap">
                  {/*
                ---------------------- A SUPPRIMER ------------------------
                
                <button className="max-sm:w-full px-3 py-1 bg-transparent border border-red-800 dark:border-red-800 dark:text-slate-300 text-red-400 rounded-md transform hover:scale-90 transition duration-200 font-medium text-sm focus:outline-none focus:ring-1 focus:ring-offset-2" onClick={onClose}>
                  X
                </button>
                */}
                  {/*
                *---------------------- FIN DE A SUPPRIMER ------------------------
                */}

                  <motion.button
                    className="max-sm:w-full inline-flex h-10 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-300 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-red-50 transform hover:scale-95 ease-in-out hover:brightness-150  max-sm:text-sm"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    onClick={onClose}>
                    Close
                  </motion.button>


                  {demoLink && (<motion.button className="max-sm:w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-300 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-300 transform hover:scale-95 ease-in-out hover:brightness-150 max-sm:text-sm "
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    onClick={handleDemoClick}>{/* max-md:text-sm max-md:px-4 max-md:pt-1 max-md:pb-1 max-md:max-h-[30px]*/}
                    <span className="mr-2">
                      Démo
                    </span>
                    <DemoIcon />
                  </motion.button>)}
                  <motion.button className="max-sm:w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-300 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-300 transform hover:scale-95 ease-in-out hover:brightness-150 max-sm:text-sm"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    onClick={handleCodeClick}>{/* max-md:text-sm max-md:px-4 max-md:pt-1 max-md:pb-1 max-md:max-h-[30px]*/}
                    <span className="mr-2">Code</span> <GithubIcon2 />
                  </motion.button>
                </ModalFooter>
              </motion.div>
            </BackgroundGradient>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
