import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { productScreens } from "@/data/rougeCardinalCaseStudy";

export default function RougeCardinalProductScreens() {
    return (
        <div className="mt-8 space-y-12">
            {productScreens.items.map((screen) => (
                <figure key={screen.title}>
                    <div className="w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-2xl shadow-black/40">
                        <Image
                            src={screen.imagePath}
                            alt={screen.imageAlt}
                            width={screen.width}
                            height={screen.height}
                            sizes="(max-width: 767px) calc(100vw - 2.5rem), 768px"
                            className="h-auto w-full"
                        />
                    </div>
                    <figcaption className="mt-4">
                        <h3 className="text-base font-semibold text-slate-100">{screen.title}</h3>
                        <p className="mt-2 leading-relaxed text-slate-400">{screen.description}</p>
                        <Link
                            href={screen.imagePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-slate-200 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
                        >
                            Voir {screen.title.toLocaleLowerCase("fr")} en taille réelle
                            <ExternalLink size={15} aria-hidden="true" />
                        </Link>
                    </figcaption>
                </figure>
            ))}
        </div>
    );
}