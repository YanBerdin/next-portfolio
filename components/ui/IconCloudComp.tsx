"use client";
import IconCloud from "./icon-cloud";

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
];
// "dart",
// "java",
// "flutter",
// "android",
// "nodedotjs",
// "nextdotjs",
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
        <div className="flex h-full w-full max-w-[34rem] items-center justify-center overflow-hidden bg-transparent p-4 md:max-w-[26rem] min-w-[18rem] md:min-w-[24rem] xl:min-w-[30rem] my-auto mx-auto pt-0"> {/*flex rounded-lg border*/}
             <IconCloud iconSlugs={slugs} />
        </div>
    );
}
