import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import { gridItems } from "../../data/index";
// afficher le contenu de gridItems dans la modal 

/**
 * UI : Backdrop Modal
 * Link : https://nextui.org/docs/components/modal#backdrop
 */
export default function BackdropModal({ id }: { id: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState<"blur" | "transparent" | "opaque" | "backdrop-blur-md" | undefined>('transparent') as any[];
  const [title, settitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const backdrops = ["blur"];

  const handleOpen = (backdrop: string, id: number) => { // Explicitly type the 'backdrop' parameter as a string
    setBackdrop(backdrop);
    const item = gridItems.find(item => item.id === id);
    if (item) {
      settitle(item.title);
      setDescription(item.description);
    }
    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <Button
            key={b}
            variant="flat"
            color="warning"
            onPress={() => handleOpen(b, id)} // Pass both 'b' and 'id' as parameters
            className="capitalize text-sm"
          >
            {/*{b}*/}
            En savoir +
          </Button>
        ))}
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
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
          className=" border-neutral-200 dark:border-slate-800"
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="mt-2">{title}</h2>
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
