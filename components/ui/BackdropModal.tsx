import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import { gridItems } from "../../data/index";
import { BackgroundGradient } from "./background-gradient";

// afficher le contenu de gridItems dans la modal 

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
  const [explanationList, setexplanationList] = React.useState<string[]>([]); // Explicitly type the 'explanationList' state as an array of strings

  const backdrops = ["blur"];

  const handleOpen = (backdrop: string, id: number, size: string) => { // Explicitly type the 'backdrop' parameter as a string
    setBackdrop(backdrop);
    setSize(size);

    const item = gridItems.find(item => item.id === id);
    if (item) {
      settitle(item.title);
      setDescription(item.description);
      setexplanationList(item.explanationList ?? []);
    }
    onOpen();
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
            className="capitalize text-sm"
          >
            {/*{b}*/}
            En savoir +
          </Button>
        ))}
      </div>

      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} size={size as "lg" | "xs" | "sm" | "md" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"} placement="center" className="" scrollBehavior={"inside"}>
        <ModalContent
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
          className=" border-neutral-200 dark:border-slate-800 w-10/12 md:max-w-[80vw] max-h-[10/12] xl:max-h-max "
        >
          {(onClose) => (
            <BackgroundGradient className="rounded-[22px] bg-white dark:bg-zinc-900 p-3 text-md">
              <ModalHeader className="flex flex-col py-2">
                <h2 className="lg:text-lg ">{title}</h2>
              </ModalHeader>
              <ModalBody className="max-h-[70vh] max-lg:overflow-y-auto text-ellipsis gap-1 scrollbar">
                <h3 className="mb-2">{description}</h3>
                {explanationList.map((explanation, index) => (
                  <p className="" key={index}>{explanation}</p>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </BackgroundGradient>
          )}
        </ModalContent>
      </Modal>

    </article>
  );
}
