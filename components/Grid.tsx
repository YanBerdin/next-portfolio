import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

export const Grid = () => {
    return (
        <>
            <div id="projects" className="h-2 md:h-5 mt-4"></div>
            <section >
                <BentoGrid className="w-full  "> {/* lg:p-4 mb-30 */}
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
                            width={item.width}
                            height={item.height}
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