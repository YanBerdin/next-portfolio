"use client";

import React, { useEffect, useRef } from 'react';
// import { FaLocationArrow } from 'react-icons/fa';
import Image from 'next/image';
import { timelineData } from '@/data';
import { MagicButton } from './MagicButton';
import { ResumeIcon } from './ui/Icon';


const TimelineRefacto = () => {
    const containerRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const currentContainer = containerRefs.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Si l'élément est visible à l'écran
                    if (entry.isIntersecting) {
                        // Ajoute la classe pour déclencher l'animation
                        entry.target.classList.add('animate');
                    }
                });
            },
            {
                threshold: 0.20, // L'élément est considéré comme visible lorsque 20% est visible
            }
        );

        // Observer chaque conteneur
        currentContainer.forEach((container) => {
            observer.observe(container);
        });

        // Nettoyer l'observateur lorsque le composant est affiché (ou démonté)
        return () => {
            currentContainer.forEach((container) => {
                observer.unobserve(container);
            });
        };
    }, []); // 1er render only

    return (
        <section>
            <div id="experience" className="h-12"></div>
            <div className="timeline relative w-11/12 mx-auto"> {/*max-w-screen-2xl*/}
                {timelineData.map((item, index) => (
                    <div
                        key={item.id}
                        ref={(ref) => {
                            if (ref) containerRefs.current.push(ref);
                        }}
                        className={`container relative w-1/2 py-2.5 max-sm:w-full opacity-0 rounded-xl bg-transparent ${index % 2 === 0 ? 'left-container' : 'right-container'
                            } ${index % 2 === 0
                                ? ' sm:pr-12 sm:-left-1/4 max-sm:pr-2 pl-2 lg:pl-6'
                                : ' sm:pl-12 -right-1/4 pr-2 lg:pr-6 max-sm:left-0'
                            } max-sm:pl-[74px] z-10`}
                    >
                        <Image
                            src={item.imageUrl}
                            alt="Company Logo"
                            width={40}
                            height={40}
                            className={`absolute ${index % 2 === 0 ? '-right-5' : '-left-5'
                                } top-8 rounded-full z-10 max-sm:left-2.5`}
                        />
                        <div


                            className={`text-box relative py-3 px-5 lg:py-5 lg:px-8 rounded-lg border border-slate-800  bg-slate-900/[0.9] backdrop-brightness-200 ${index % 2 === 0 ? 'left-0' : 'right-0'
                                }`}
                        >
                            <h2 className="text-sm sm:text-base md:text-lg font-bold text-white">{item.company}</h2>
                            <small className="text-xs lg:text-sm text-white mb-1">{item.period}</small>
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white">{item.description}</p>
                            <span
                                className={`${index % 2 === 0 ? 'left-container-arrow' : 'right-container-arrow'
                                    } max-sm:border-r-[15px] max-sm:border-l-0 max-sm:-left-[15px] absolute border-solid border-transparent top-6 w-0 h-0 z-1 border-t-[15px] border-b-[15px] ${index % 2 === 0 ? 'max-sm:-left-4 md:-right-4 md:border-l-[15px] md:border-l-slate-800 max-sm:border-r-[15px] max-sm:border-r-slate-800' : '-left-4 border-r-[15px] border-r-slate-800'
                                    }`}
                            ></span>
                        </div>
                    </div>
                ))}

            </div>
            <div className="w-11/12 flex justify-center mt-8 relative max-sm:left-6 mx-auto"> {/*max-w-screen-2xl*/}
                <MagicButton
                    title="Télécharger mon CV"
                    icon={<ResumeIcon />}
                    position="right"
                    otherClasses="custom-class hover:opacity-90"
                    href="https://raw.githubusercontent.com/YanBerdin/YanBerdin/master/Doc/CV_Yan_Berdin.docx"
                />
            </div>
        </section>
    );
};

export default TimelineRefacto;

