export type Game = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  status: string;
  steamUrl: string;
  folder: string;
  screenshotCount: number;
};

export const games: Game[] = [
  {
    slug: "the-last-wait",
    title: "The Last Wait",
    tagline:
      "Trapped in a sterile hospital, clinging to life, you anticipate your daughter's arrival as reality slowly begins to slip.",
    description:
      "Trapped in a sterile hospital, clinging to life, you anticipate your daughter's arrival as reality slowly begins to slip. Your only chance is to endure the long, suffocating wait. The Last Wait. Can you hold on long enough to see her once more?",
    tags: ["Horror", "Atmospheric", "Solo Dev"],
    status: "In development",
    steamUrl: "https://store.steampowered.com/app/4165280/The_Last_Wait/",
    folder: "the-last-wait",
    screenshotCount: 10,
  },
];

export function getGame(slug: string) {
  return games.find((g) => g.slug === slug);
}
