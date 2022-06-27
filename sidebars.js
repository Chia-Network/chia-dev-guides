/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/intro",
        "getting-started/using-modules",
        "getting-started/testnet-setup",
        "getting-started/first-smart-coin",
        "getting-started/bls-signatures",
      ],
    },
  ],
};

module.exports = sidebars;
