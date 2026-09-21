export type ProductionSite = {
  title: string;
  description: string;
  url: string;
};

export const productionSites: ProductionSite[] = [
  {
    title: "Influencer X Media",
    description: "Performance Marketing Site",
    url: "https://influencerxmedia.com",
  },
  {
    title: "WI Thinkers",
    description: "Company website for WI Thinkers.",
    url: "https://thewithinkers.com/",
  },
  {
    title: "WI Thinkers CRM",
    description: "Internal CRM platform for client and workflow management.",
    url: "https://crm.thewithinkers.com/",
  },
  {
    title: "Swing Boudoir Mag",
    description: "Membership and content platform for Swing Boudoir Magazine.",
    url: "https://app.swingboudoirmag.com/",
  },
  {
    title: "AcqoraX Marketing",
    description:
      "Performance marketing site that drives customer acquisition, sales, and measurable growth.",
    url: "https://www.acqoraxmarketing.com/",
  },
  {
    title: "WI Thinkers Services",
    description:
      "Magazine service plans for editorial promotion, placement, and brand growth.",
    url: "https://services.thewithinkers.com/",
  },
  {
    title: "WI Thinkers Exclusive",
    description:
      "Exclusive magazine services for editorial-style promotion and brand positioning.",
    url: "https://exclusive.thewithinkers.com/",
  },
  {
    title: "Blaze Billboard",
    description:
      "Times Square billboard campaign with magazine feature and exclusive interview.",
    url: "https://billboard.blazemagazines.com/",
  },
  {
    title: "The Glam Model",
    description: "Creator platform for The Glam Model.",
    url: "https://onlyfans.theglammodel.com/",
  },
];

export function getHost(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
