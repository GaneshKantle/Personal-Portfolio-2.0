export type ProductionSite = {
  title: string;
  description: string;
  url: string;
};

export const productionSites: ProductionSite[] = [
  {
    title: "Influencer X Media",
    description: "Marketing site for Influencer X Media.",
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
