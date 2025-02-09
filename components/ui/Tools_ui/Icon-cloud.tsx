"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import {
    Cloud,
    fetchSimpleIcons,
    ICloud,
    renderSimpleIcon,
    SimpleIcon,
} from "react-icon-cloud";

/**
 *  UI: Interactive Icon Cloud
 *  Link: https://magicui.design/docs/components/icon-cloud#iconcloud
 */

export const cloudProps: Omit<ICloud, "children"> = {
    containerProps: {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingTop: 40,
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "default",
        tooltip: "native",
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: "#0000",
        maxSpeed: 0.03,
        minSpeed: 0.02,
        dragControl: false, // disable dragging
    },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
    const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
    const fallbackHex = theme === "light" ? "#6e6e73" : "#e6e6e7"; // : #ffffff
    const minContrastRatio = theme === "dark" ? 2 : 1.2;

    return renderSimpleIcon({
        icon,
        bgHex,
        fallbackHex,
        minContrastRatio,
        size: 40,
        aProps: {
            href: "",
            target: undefined,
            rel: undefined,
            onClick: (e: any) => e.preventDefault(),
            title: icon.slug,
        },
    });
};

export type DynamicCloudProps = {
    iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
    const [data, setData] = useState<IconData | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }, [iconSlugs]);

    const renderedIcons = useMemo(() => {
        if (!data) return null;

        return Object.values(data.simpleIcons).map((icon) =>
            renderCustomIcon(icon, theme || "light"),
        );
    }, [data, theme]);

    // console.log(data);
    console.log("renderedIcons", renderedIcons); //TODO Remove this line
    //console.log(theme);
    //console.log(iconSlugs);



    return (
        // @ts-ignore
        <Cloud {...cloudProps}>
            <>{renderedIcons}</>
        </Cloud>
    );
}
