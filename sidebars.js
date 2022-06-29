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
      label: "Chialisp Primer",
      items: [
        "chialisp-primer/intro",
        "chialisp-primer/using-modules",
        "chialisp-primer/testnet-setup",
        "chialisp-primer/first-smart-coin",
        "chialisp-primer/bls-signatures",
      ],
    },
  ],
};

module.exports = sidebars;
