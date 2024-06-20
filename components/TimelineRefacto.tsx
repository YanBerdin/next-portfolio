"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { timelineData } from '@/data';

const TimelineRefacto = () => {
    const containerRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
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
        containerRefs.current.forEach((container) => {
            observer.observe(container);
        });

        // Nettoyer l'observateur lorsque le composant est démonté
        return () => {
            containerRefs.current.forEach((container) => {
                observer.unobserve(container);
            });
        };
    }, []); // 1er render only

    return (
        <section>
            <div id="experience" className="h-12 md:h-20"></div>
            <div className="timeline relative max-w-screen-2xl bg-green-300 sm:bg-green-700 lg:bg-green-950 mx-auto">
                {timelineData.map((item, index) => (
                    <div
                        key={item.id}
                        ref={(ref) => {
                            if (ref) containerRefs.current.push(ref);
                        }}
                        className={`container relative w-1/2 py-2.5 max-sm:w-full opacity-0 rounded-xl ${index % 2 === 0 ? 'left-container' : 'right-container'
                            } ${index % 2 === 0
                                ? 'bg-pink-500 lg:bg-yellow-800 xl:bg-blue-500 sm:pr-12 sm:-left-1/4 max-sm:pr-2 pl-2 lg:pl-6'
                                : 'bg-red-800 sm:pl-12 -right-1/4 pr-2 lg:pr-6 max-sm:left-0'
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
                            className={`text-box relative py-3 px-5 lg:py-5 lg:px-8 rounded-lg bg-white-100 ${index % 2 === 0 ? 'left-0' : 'right-0'
                                }`}
                        >
                            <h2 className="text-sm sm:text-md lg:text-lg font-bold text-gray-900">{item.company}</h2>
                            <small className="text-xs text-gray-800 mb-1">{item.period}</small>
                            <p className="text-xs sm:text-sm text-gray-900">{item.description}</p>
                            <span
                                className={`${index % 2 === 0 ? 'left-container-arrow' : 'right-container-arrow'
                                    } max-sm:border-r-[15px] max-sm:border-l-0 max-sm:-left-[15px] absolute border-solid border-transparent top-4 w-0 h-0 z-1 border-t-[15px] border-b-[15px] ${index % 2 === 0 ? 'max-sm:-left-4 md:-right-4 md:border-l-[15px] md:border-l-white-100 max-sm:border-r-[15px] max-sm:border-r-white-100' : '-left-4 border-r-[15px] border-r-white-100'
                                    }`}
                            ></span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TimelineRefacto;

