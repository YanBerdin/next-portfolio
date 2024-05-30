import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

export const Grid = () => {
    return (
        <>
            <div id="projects" className="md:h-10 md:mt-8"></div>
            <section >
                <BentoGrid className="w-full p-16">
                    {gridItems.map((item, i) => (
                        <BentoGridItem
                            id={item.id}
                            key={i}
                            title={item.title}
                            description={item.description}
                            // remove icon prop
                            // remove original classname condition
                            className={item.className}
                            img={item.img}
                            //width={item.width}
                            imgClassName={item.imgClassName}
                            titleClassName={item.titleClassName}
                            spareImg={item.spareImg}
                        />
                    ))}
                </BentoGrid>
            </section>
        </>
    );
};

// export default Grid;