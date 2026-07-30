import type { Metadata } from "next";
import { site } from "@/config/site";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: site.seo.title,
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: site.seo.ogImage }],
    locale: "fr_FR",
    type: "website",
  },
};
