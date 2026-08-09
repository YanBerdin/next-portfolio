import type { Metadata } from "next";

import EidLabCandidature from "@/components/EidLabCandidature";

export const metadata: Metadata = {
  title: "Yan Berdin — Candidature Eid Lab",
  description: "Un bon de livraison pour présenter la candidature de Yan Berdin à Eid Lab.",
  openGraph: {
    title: "Yan Berdin — Candidature Eid Lab",
    description: "Un bon de livraison pour présenter la candidature de Yan Berdin à Eid Lab.",
    url: "https://www.yanberdin.com/eid-lab",
  },
};

export default function EidLabPage() {
  return <EidLabCandidature />;
}