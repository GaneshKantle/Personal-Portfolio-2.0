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
    title: "AcqoraX Marketing",
    description:
      "Performance marketing site that drives customer acquisition, sales, and measurable growth.",
    url: "https://www.acqoraxmarketing.com/",
  },
];

export function getHost(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
