import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

// import { gridItems } from "../../data/index"; //TODO @/data/index
import { Repositories } from "../../data/projectRefactoData";
import { BackgroundGradient } from "./Background-gradient";
import { DemoIcon, GithubIcon2 } from "./Icon";
//import { ButtonsCard } from "./tailwindcss-buttons";

// Afficher le contenu de gridItems dans un modal 

/**
 * UI : Backdrop Modal
 * Link : https://nextui.org/docs/components/modal#backdrop
 */
export default function BackdropModal({ id }: { id: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState<"blur" | "transparent" | "opaque" | "backdrop-blur-md" | undefined>('transparent') as any[];
  const [size, setSize] = React.useState('xl')
  const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  const [title, settitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [explanationList, setexplanationList] = React.useState<string[]>([]);
  const [demoLink, setDemoLink] = React.useState<string>("");
  const [githubLink, setGithubLink] = React.useState<string>("");

  const backdrops = ["blur"];

  const handleOpen = (backdrop: string, id: number, size: string) => {
    setBackdrop(backdrop);
    setSize(size);

    // const item = gridItems.find(item => item.id === id);
    const item = Repositories.find(item => item.id === id);
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
    <article className="">
      <div className="flex flex-wrap gap-2">
        {backdrops.map((b) => (
          <Button
            key={b}
            variant="flat"
            color="warning"
            onPress={() => handleOpen(b, id, size)} // Pass both 'b' and 'id' as parameters
            className="capitalize text-xs md:text-sm px-1"
          >
            {/*{b}*/}
            Details
          </Button>
        ))}
      </div>

      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} size={size as "lg" | "xs" | "sm" | "md" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"} placement="center" className="mt-28" scrollBehavior={"inside"}>
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
              <ModalHeader className="flex flex-col py-4 px-4">
                <h2 className="px-3 text-[#123af0] text-xl brightness-200">{title}</h2>
              </ModalHeader>
              <ModalBody className="text-slate-100 max-h-[70vh] overflow-y-auto gap-1 scrollbar max-sm:px-3 max-sm:text-sm">
                <h3 className="mb-2 text-[#123af0] brightness-200 text-md">{description}</h3>
                {explanationList.map((explanation, index) => (
                  <p className="text-xs md:text-sm lg:text-base" key={index}>{explanation}</p>
                ))}
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
                <button className="max-sm:w-full inline-flex h-10 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-red-50 transform hover:scale-95 ease-in-out hover:brightness-150  max-sm:text-sm">
                  Close
                </button>


                {demoLink && (<button className="max-sm:w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-300 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-300 transform hover:scale-95 ease-in-out hover:brightness-150 max-sm:text-sm " onClick={handleDemoClick}>{/* max-md:text-sm max-md:px-4 max-md:pt-1 max-md:pb-1 max-md:max-h-[30px]*/}
                  <span className="mr-2">
                    Démo
                  </span>
                  <DemoIcon />
                </button>)}
                <button className="max-sm:w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-300 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-300 transform hover:scale-95 ease-in-out hover:brightness-150 max-sm:text-sm" onClick={handleCodeClick}>{/* max-md:text-sm max-md:px-4 max-md:pt-1 max-md:pb-1 max-md:max-h-[30px]*/}
                  <span className="mr-2">Code</span> <GithubIcon2 />
                </button>
              </ModalFooter>
            </BackgroundGradient>
          )}
        </ModalContent>
      </Modal>

    </article>
  );
}
