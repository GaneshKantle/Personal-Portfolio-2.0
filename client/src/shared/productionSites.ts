import sites from "./productionSites.json";

export type ProductionSite = {
  title: string;
  description: string;
  url: string;
};

export const productionSites: ProductionSite[] = sites;

export function getHost(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
