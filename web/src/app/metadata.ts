import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
};
