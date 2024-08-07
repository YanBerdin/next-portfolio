/*
"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const Timeline = () => {
    //  const containerRefs = useRef([]);
    const containerRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const currentRefs = containerRefs.current;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    // Si l'élément est visible à l'écran
                    if (entry.isIntersecting) {
                        // Ajoute la classe pour déclencher l'animation
                        entry.target.classList.add('animate');
                    }
                });
            },
            {
                // L'animation se déclenche lorsque 75% de l'élément est visible
                threshold: 0.75
            }
        );

        containerRefs.current.forEach(container => {
            observer.observe(container);
        });

        // Utiliser la variable dans la fonction de nettoyage
        // Nettoyer l'observateur lorsque le composant est démonté
        return () => {
            currentRefs.forEach(container => {
                observer.unobserve(container);
            });
        };
    }, []);


    return (
        <section>
            <div className="h-12 md:h-20"></div>
            <div className="timeline relative max-w-screen-2xl bg-green-300 sm:bg-green-700 lg:bg-green-950 mx-auto">

                <div ref={ref => { containerRefs.current.push(ref!); }} className="container left-container relative w-1/2 bg-pink-500 lg:bg-red-800 xl:bg-blue-500 rounded-xl py-2.5 sm:pr-12 pl-2 lg:pl-6 sm:-left-1/4  opacity-0 max-sm:w-full max-sm:pl-[74px] max-sm:pr-2 z-10">
                    <Image src="/next.svg" alt="Google Logo" width={40} height={40} className="absolute -right-5 top-8 rounded-full z-10 max-sm:left-2.5" loading="lazy"/>
                    <div className="text-box relative py-3 px-5 lg:py-5 lg:px-8 rounded-lg bg-white-100 left-0">

                        <h2 className="text-sm sm:text-md lg:text-lg font-bold">Alphabet Inc.</h2>

                        <small className="text-xs text-gray-800 mb-1">2018 - 2019</small>

                        <p className="text-xs sm:text-sm text-gray-900">
                            The success of every websites depends on search engine optimisation and digital marketing strategy. If you are on first page of all major search ...
                        </p>
                        <span className="left-container-arrow max-sm:border-r-[15px] max-sm:border-l-0 max-sm:-left-[15px] absolute -right-4 top-7 w-0 h-0 z-1 border-t-[15px] border-b-[15px] border-l-[15px] border-l-white-100 border-solid border-transparent"></span>
                    </div>
                </div>


                <div ref={ref => { containerRefs.current.push(ref!); }} className="container right-container relative w-1/2 bg-red-800 rounded-lg py-2.5 sm:pl-12 -right-1/4 opacity-0 max-sm:w-full max-sm:pl-[74px] pr-2 lg:pr-6 max-sm:left-0 z-10">
                    <Image src="/next.svg" alt="Google Logo" width={40} height={40} className="absolute -left-5 top-8 rounded-full z-10 max-sm:left-2.5" loading="lazy" />
                    <div className="text-box relative py-3 px-5 lg:py-5 lg:px-8 rounded-lg bg-white-100">

                        <h2 className="text-sm sm:text-md lg:text-lg font-bold">Alphabet Inc.</h2>

                        <small className="text-xs text-gray-800 mb-2.5">2018 - 2019</small>

                        <p className="text-xs sm:text-sm text-gray-900">
                            The success of every websites depends on search engine optimisation and digital marketing strategy. If you are on first page of all major search ...
                        </p>
                        <span className="right-container-arrow max-sm:border-r-[15px] max-sm:border-l-0 max-sm:-left-[15px] absolute -left-4 top-7 w-0 h-0 z-1 border-t-[15px] border-b-[15px] border-r-[15px] border-r-white-100 border-solid border-transparent "></span>
                    </div>
                </div>

                <div ref={ref => { containerRefs.current.push(ref!); }} className="container left-container relative w-1/2 bg-pink-500 lg:bg-red-800 xl:bg-blue-500 rounded-xl py-2.5 sm:pr-12 pl-2 lg:pl-6 sm:-left-1/4  opacity-0 max-sm:w-full max-sm:pl-[74px] max-sm:pr-2 z-10">
                    <Image src="/next.svg" alt="Google Logo" width={40} height={40} className="absolute -right-5 top-8 rounded-full z-10 max-sm:left-2.5" loading="lazy" />
                    <div className="text-box relative py-3 px-5 lg:py-5 lg:px-8 rounded-lg bg-white-100 left-0">

                        <h2 className="text-sm sm:text-md lg:text-lg font-bold">Alphabet Inc.</h2>

                        <small className="text-xs text-gray-800 mb-1">2018 - 2019</small>

                        <p className="text-xs sm:text-sm text-gray-900">
                            The success of every websites depends on search engine optimisation and digital marketing strategy. If you are on first page of all major search ...
                        </p>
                        <span className="left-container-arrow max-sm:border-r-[15px] max-sm:border-l-0 max-sm:-left-[15px] absolute -right-4 top-7 w-0 h-0 z-1 border-t-[15px] border-b-[15px] border-l-[15px] border-l-white-100 border-solid border-transparent"></span>
                    </div>
                </div>


                <div ref={ref => { containerRefs.current.push(ref!); }} className="container right-container relative w-1/2 bg-red-800 rounded-lg py-2.5 sm:pl-12 -right-1/4 opacity-0 max-sm:w-full max-sm:pl-[74px] pr-2 lg:pr-6 max-sm:left-0 z-10">
                    <Image src="/next.svg" alt="Google Logo" width={40} height={40} className="absolute -left-5 top-8 rounded-full z-10 max-sm:left-2.5" loading="lazy" />
                    <div className="text-box relative py-3 px-5 lg:py-5 lg:px-8 rounded-lg bg-white-100">

                        <h2 className="text-sm sm:text-md lg:text-lg font-bold">Alphabet Inc.</h2>

                        <small className="text-xs text-gray-800 mb-2.5">2018 - 2019</small>

                        <p className="text-xs sm:text-sm text-gray-900">
                            The success of every websites depends on search engine optimisation and digital marketing strategy. If you are on first page of all major search ...
                        </p>
                        <span className="right-container-arrow max-sm:border-r-[15px] max-sm:border-l-0 max-sm:-left-[15px] absolute -left-4 top-7 w-0 h-0 z-1 border-t-[15px] border-b-[15px] border-r-[15px] border-r-white-100 border-solid border-transparent "></span>
                    </div>
                </div>

                <div ref={ref => { containerRefs.current.push(ref!); }} className="container left-container relative w-1/2 bg-pink-500 lg:bg-red-800 xl:bg-blue-500 rounded-xl py-2.5 sm:pr-12 pl-2 lg:pl-6 sm:-left-1/4  opacity-0 max-sm:w-full max-sm:pl-[74px] max-sm:pr-2 z-10">
                    <Image src="/next.svg" alt="Google Logo" width={40} height={40} className="absolute -right-5 top-8 rounded-full z-10 max-sm:left-2.5" loading="lazy" />
                    <div className="text-box relative py-3 px-5 lg:py-5 lg:px-8 rounded-lg bg-white-100 left-0">

                        <h2 className="text-sm sm:text-md lg:text-lg font-bold">Alphabet Inc.</h2>

                        <small className="text-xs text-gray-800 mb-1">2018 - 2019</small>

                        <p className="text-xs sm:text-sm text-gray-900">
                            The success of every websites depends on search engine optimisation and digital marketing strategy. If you are on first page of all major search ...
                        </p>
                        <span className="left-container-arrow max-sm:border-r-[15px] max-sm:border-l-0 max-sm:-left-[15px] absolute -right-4 top-7 w-0 h-0 z-1 border-t-[15px] border-b-[15px] border-l-[15px] border-l-white-100 border-solid border-transparent"></span>
                    </div>
                </div>


                <div ref={ref => { containerRefs.current.push(ref!); }} className="container right-container relative w-1/2 bg-red-800 rounded-lg py-2.5 sm:pl-12 -right-1/4 opacity-0 max-sm:w-full max-sm:pl-[74px] pr-2 lg:pr-6 max-sm:left-0 z-10">
                    <Image src="/next.svg" alt="Google Logo" width={40} height={40} className="absolute -left-5 top-8 rounded-full z-10 max-sm:left-2.5" loading="lazy" />
                    <div className="text-box relative py-3 px-5 lg:py-5 lg:px-8 rounded-lg bg-white-100">

                        <h2 className="text-sm sm:text-md lg:text-lg font-bold">Alphabet Inc.</h2>

                        <small className="text-xs text-gray-800 mb-2.5">2018 - 2019</small>

                        <p className="text-xs sm:text-sm text-gray-900">
                            The success of every websites depends on search engine optimisation and digital marketing strategy. If you are on first page of all major search ...
                        </p>
                        <span className="right-container-arrow max-sm:border-r-[15px] max-sm:border-l-0 max-sm:-left-[15px] absolute -left-4 top-7 w-0 h-0 z-1 border-t-[15px] border-b-[15px] border-r-[15px] border-r-white-100 border-solid border-transparent "></span>
                    </div>
                </div>

                <style jsx>
                    {`

                 `}
                </style>
            </div>
        </section>
    );
};

export default Timeline;
*/