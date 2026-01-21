import { defineConfig } from "vitepress";

export default defineConfig({
  title: "GAFF Docs",
  description: "Official GAFF documentation",

  lang: "en-US",
  lastUpdated: true,

  themeConfig: {
    logo: "/logo.png",

    nav: [
      { text: "Vision", link: "/vision" },
      { text: "Competitions", link: "/competitions" },
      { text: "Roadmap", link: "/roadmap" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Gaff", link: "/" },
          { text: "Introduction to Gaff", link: "/introduction" },
          { text: "Vision", link: "/vision" },
          { text: "The promise", link: "/the-promise" },
          { text: "The problem", link: "/the-problem" },
          { text: "Gaff's Solution", link: "/gaffs-solution" },
        ],
      },
      {
        text: "GAFF Core",
        items: [
          { text: "Product Pillars", link: "/product-pillars" },
          { text: "Marketplace & Club Ops", link: "/marketplace-and-club-ops" },
          { text: "Academy", link: "/academy" },
          { text: "Training", link: "/training" },
          { text: "Competitions", link: "/competitions" },
          { text: "Managers’ Chat Threads", link: "/managers-chat-threads" },
          { text: "Clubs", link: "/clubs" },
          { text: "Players", link: "/players" },
          { text: "Gaff Coin (GAFF)", link: "/gaff-coin-gaff" },
          { text: "Predict & Arcade", link: "/predict-and-arcade" },
          { text: "Roadmap", link: "/roadmap" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "Gaff App", link: "https://gaff.coach" },
          { text: "Gaff Blog", link: "https://gaff.coach/news" },
        ],
      },
      {
        text: "Socials",
        items: [
          { text: "Twitter(X)", link: "https://x.com/gaffcoach" },
          { text: "Telegram", link: "https://t.me/gaffcoach" },
          { text: "YouTube", link: "https://youtube.com/@gaffcoach" },
        ],
      },

      {
        text: "Support",
        items: [
          { text: "Contact Gaff", link: "/contact-gaff" },
          { text: "Gaff Help Center", link: "https://gaff.coach/help" },
          { text: "Disclaimer", link: "/disclaimer" },
        ],
      },
    ],

    socialLinks: [{ icon: "twitter", link: "https://twitter.com/gaffcoach" }],

    footer: {
      message: "Built with ❤️ by GAFF",
      copyright: "© 2026 GAFF",
    },
  },
});
