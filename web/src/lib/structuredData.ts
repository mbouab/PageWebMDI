import { site } from "@/config/site";

type OrganizationNode = {
  "@type": "Organization";
  name: string;
};

type ProductNode = {
  "@type": "Product";
  name: string;
  description: string;
  image: string;
  brand: OrganizationNode;
};

export type StructuredData = {
  "@context": "https://schema.org";
  "@graph": [OrganizationNode, ProductNode];
};

export function getStructuredData(): StructuredData {
  const organization: OrganizationNode = {
    "@type": "Organization",
    name: site.company,
  };

  const product: ProductNode = {
    "@type": "Product",
    name: site.productName,
    description: site.seo.description,
    image: site.seo.ogImage,
    brand: organization,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, product],
  };
}
