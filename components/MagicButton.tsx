import React from 'react';
import Link from 'next/link';

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  change border radius to rounded-lg
 *  add margin of md:mt-10
 *  remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
 */

export const MagicButton = (
    {
        title,
        icon,
        position,
        handleClick,
        otherClasses,
        type,
        href,
        target,
        rel,
    }: {
        title: string;
        icon: React.ReactNode;
        position: string;
        handleClick?: () => void;
        type?: "button" | "submit" | "reset";
        otherClasses?: string;
        href?: string;
        target?: string;
        rel?: string;
    }) => {
    // utilisé avec l'attribut href plus besoin de l'envelopper dans <a>.
    // Une route interne passe par next/link pour une transition client, sans rechargement complet.
    const LinkOrButtonComp: React.ElementType = href ? (href.startsWith('/') ? Link : 'a') : 'button';
    const LinkOrButtonCompProps = href ? { href, target, rel } : { onClick: handleClick, type: type || 'button' };
    return (
        <LinkOrButtonComp
            {...LinkOrButtonCompProps}
            // remove w-full md:w-60 add w-60 mt-4
            className={`group touch-hitbox overflow-hidden relative inline-flex h-12 w-auto min-w-[14rem] rounded-lg p-[2px] focus:outline-none ${otherClasses}`} //  mt-4 md:mt-10
        >

            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6F9DC4_0%,#2E4A63_50%,#6F9DC4_100%)]" />
            {/* Pattern touch-hitbox: shrink sur l'enfant avec transition, focus clavier inclus */}
            <span className={`h-full w-full cursor-pointer flex items-center justify-center rounded-lg bg-slate-950 px-7 text-md md:text-lg font-medium text-purple  backdrop-blur-3xl gap-2 whitespace-nowrap transition-all duration-200 ease-out hover:brightness-200 group-focus-visible:scale-95 group-focus-visible:brightness-125 ${otherClasses}`}>
                {position === "left" && icon}
                {title}
                {position === "right" && icon}
            </span>
        </LinkOrButtonComp>
    );
};

// export default MagicButton

