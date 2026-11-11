export function shot(src: string, alt: string, caption: string) {
  return { src, alt, caption };
}

const sharedFields = {
  categoryColor: "primary",
  deployment: "Vercel",
  status: "Live",
  teamSize: "Solo",
  category: "Web Application",
};

export function projectEntry<T extends Record<string, unknown>>(entry: T) {
  return { ...sharedFields, ...entry };
}
