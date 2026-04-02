"use client";

import dynamic from "next/dynamic";
import type { SVGProps } from "react";

const FloatingNav = dynamic(
    () => import("./FloatingNavbar").then((m) => m.FloatingNav),
    { ssr: false }
);

interface NavItem {
    name: string;
    link: string;
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element | undefined;
}

interface FloatingNavbarClientProps {
    navItems: NavItem[];
    className?: string;
}

export default function FloatingNavbarClient({ navItems, className }: FloatingNavbarClientProps) {
    return <FloatingNav navItems={navItems} className={className} />;
}
