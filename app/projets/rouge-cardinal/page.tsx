import type { Metadata } from "next";

import RougeCardinalCaseStudy from "@/components/RougeCardinalCaseStudy";

const description =
  "Étude de cas : Rouge Cardinal, application fullstack Next.js / TypeScript / Supabase en production - autorisation RLS PostgreSQL, back-office multi-rôles, CI/CD et tests end-to-end.";

export const metadata: Metadata = {
  title: "Rouge Cardinal - étude de cas | Yan Berdin",
  description,
  alternates: {
    canonical: "https://www.yanberdin.com/projets/rouge-cardinal",
  },
  openGraph: {
    title: "Rouge Cardinal - étude de cas",
    description,
    url: "https://www.yanberdin.com/projets/rouge-cardinal",
  },
};

export default function RougeCardinalPage() {
  return <RougeCardinalCaseStudy />;
}
