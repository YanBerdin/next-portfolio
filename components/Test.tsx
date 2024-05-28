// rafce + tab
import React from 'react'

export const Test = () => {
  return (
    <div>Test</div>
  )
}

// export default Test
"use client";
{/*
import React from "react";
import { useEffect, useRef } from 'react';
//import 'tailwindcss/tailwind.css';

export const Cursor: React.FC = () => {

    const cursorRef = useRef<HTMLDivElement>(null);

    /* useEffect(() => {
         const cursor = document.querySelector('.cursor');
 
         document.addEventListener('mousemove', e => {
             if (cursor) {
                 /*cursor.setAttribute('style', `top: ${e.pageY - 10}px; left: ${e.pageX - 10}px;`);*/
    //  cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
    // }
    //  });
    //  }, []);

   /* useEffect(() => {

        const handleMouseMove = (e: MouseEvent) => {
            requestAnimationFrame(() => {
                const cursor = cursorRef.current;
                if (cursor) {
                    cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
                }
                // console.log('requestAnimationFrame is called'); // Log a message
            });
        }

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return (
        <div className="cursor shadow w-20 h-20 border-2 border-white rounded-full absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        //animate-shadow-slide 
    );
};
*/}
// export default Cursor;