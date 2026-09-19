import type { MetadataRoute } from "next";

const SITE_URL = "https://www.yanberdin.com";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${SITE_URL}/`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/projets/rouge-cardinal`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}
