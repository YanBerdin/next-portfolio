"use client";

// For IconCloudComp.tsx
import IconCloud from "./Icon-cloud";

const slugs = [
    "typescript",
    "javascript",
    "react",
    "html5",
    "css3",
    "express",
    "prisma",
    "postgresql",
    "firebase",
    "vercel",
    "jest",
    "git",
    "github",
    "visualstudiocode",
    "figma",
    "php",
    "apache",
    "laravel",
    "wordpress",
    "prettier",
    "eslint",
    "tailwindcss",
    "bootstrap",
    "materialui",
    "sass",
    "mysql",
    "redux",
    "nodedotjs",
    "nextdotjs"
];
// "dart",
// "java",
// "flutter",
// "android",
// "amazonaws",
// "nginx",
// "cypress",
// "docker",
// "jira",
// "gitlab",
// "androidstudio",
// "sonarqube",
// "testinglibrary",


/**
 *  UI: Interactive Icon Cloud
 *  Link: https://magicui.design/docs/components/icon-cloud#iconcloud
 */

export function IconCloudComp() {

    return (
        <div className="flex h-full w-full items-center justify-center overflow-hidden bg-transparent p-3  my-auto mx-auto pt-0"> {/*flex rounded-lg border  min-w-[16rem] max-w-[34rem] md:min-w-[24rem] md:max-w-[26rem] xl:min-w-[30rem]*/}
            <IconCloud iconSlugs={slugs} />
        </div>
    );
}
