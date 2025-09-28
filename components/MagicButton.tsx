import React from 'react';

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
    }: {
        title: string;
        icon: React.ReactNode;
        position: string;
        handleClick?: () => void;
        type?: "button" | "submit" | "reset";
        otherClasses?: string;
        href?: string;
    }) => {
    // utilisé avec l'attribut href plus besoin de l'envelopper dans <a>.
    const LinkOrButtonComp = href ? 'a' : 'button';
    const LinkOrButtonCompProps = href ? { href } : { onClick: handleClick, type: type || 'button' };
    return (
        <LinkOrButtonComp
            {...LinkOrButtonCompProps}
            // remove w-full md:w-60 add w-60 mt-4
            className={`group touch-hitbox overflow-hidden relative inline-flex h-12 w-60 rounded-lg p-[1px] focus:outline-none ${otherClasses}`} //  mt-4 md:mt-10
        >

            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            {/* Pattern touch-hitbox: shrink sur l'enfant avec transition, focus clavier inclus */}
            <span className={`block h-full w-full cursor-pointer flex items-center justify-center rounded-lg bg-slate-950 px-7 text-sm md:text-md font-medium text-white-100 backdrop-blur-3xl gap-2 transition-transform duration-150 hover:brightness-200  group-focus-visible:scale-95 ${otherClasses}`}>
                {position === "left" && icon}
                {title}
                {position === "right" && icon}
            </span>
        </LinkOrButtonComp>
    );
};

// export default MagicButton

