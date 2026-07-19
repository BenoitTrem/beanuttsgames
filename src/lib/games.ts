export type Control = {
  key: string;
  action: string;
};

export type Game = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  descriptionParagraphs: string[];
  closingLines: string[];
  controls: Control[];
  contentWarning: string;
  tags: string[];
  status: string;
  steamUrl: string;
  itchUrl: string;
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
    descriptionParagraphs: [
      "The Last Wait places you in the fading mind of an elderly man confined to a hospital bed, where time stretches, memories blur, and each night becomes harder to endure. As you wait for your daughter's arrival, the quiet slowly unravels into something far more unsettling.",
      "As time passes, the surroundings twist into threatening dreams, and your own body begins to fail you. Strange presences emerge, forcing you to react with what little strength you have left. To survive, you must carefully manage your actions and interact with the environment around you, where every choice carries weight and even small mistakes can have lasting consequences.",
      "The boundary between reality and imagination grows thinner. Are these horrors invading you… or are they being shaped by something deeper? As fragments of truth surface, the hospital becomes less a place of care and more a reflection of a mind struggling to hold itself together.",
    ],
    closingLines: [
      "Endure the nights. Hold on to what feels real.",
      "Will you survive the wait, or will the darkness consume you before you can see her again?",
    ],
    controls: [
      { key: "Mouse", action: "Look around" },
      { key: "WASD", action: "Move" },
      { key: "Shift", action: "Sprint" },
      { key: "LMB", action: "Interact" },
      { key: "RMB", action: "Use camera" },
      { key: "Scroll", action: "Hide eyes" },
      { key: "Space", action: "Use oxygen mask" },
      { key: "Esc / P", action: "Pause" },
    ],
    contentWarning:
      "This game contains flashing lights, sudden loud noises, disturbing imagery, and jumpscares. Player discretion is advised.",
    tags: [
      "Horror",
      "Atmospheric",
      "Survival",
      "Psychological",
      "Dark",
      "Singleplayer",
      "Immersive",
      "Solo Dev",
      "Indie",
    ],
    status: "In development",
    steamUrl: "https://store.steampowered.com/app/4165280/The_Last_Wait/",
    itchUrl: "https://beanutts.itch.io/the-last-wait",
    folder: "the-last-wait",
    screenshotCount: 12,
  },
];

export function getGame(slug: string) {
  return games.find((g) => g.slug === slug);
}
