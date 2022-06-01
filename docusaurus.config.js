const lightTheme = require("./src/theme/prism-light-theme-chialisp");
const darkTheme = require("./src/theme/prism-dark-theme-chialisp");

// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Chia Dev Guides",
  tagline: "Resources for developers onboarding to Chia.",
  url: "https://staging.devs.chia.net",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Chia-Network", // Usually your GitHub org/user name.
  projectName: "chia-dev-guides-stage", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Chia-Network/",
          path: "guides",
          routeBasePath: "guides",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Dev Guides",
        style: "dark",
        logo: {
          alt: "Chialisp Logo",
          src: "img/chia-logo.svg",
          href: "/guides/intro",
          width: 60,
        },
        items: [
          {
            href: "https://github.com/Chia-Network",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Guides",
            items: [
              {
                label: "Intro",
                to: "/guides/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Keybase",
                href: "https://keybase.io/team/chia_network.public",
              },
              {
                label: "Chia Devs Forum",
                href: "https://developers.chia.net/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/chia_project",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/Chia-Network/chia-blockchain",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Chia Network Inc., Licensed under the <a href="https://github.com/Chia-Network/chialisp-web/blob/main/LICENSE" target="_blank">Apache License, Version 2.0</a> | <a href="https://www.chia.net/terms">Terms</a>`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ["json"],
      },
    }),
  customFields: {
    landingTitle: "Chia Developer Portal",
    landingTagline: "Resources for Chia Developers",
  },
};

module.exports = config;
