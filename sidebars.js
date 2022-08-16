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
      type: 'category',
      label: 'Chialisp Primer',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/chialisp-primer',
        title: 'Chialisp Primer',
        description:
          'This guide will teach you the basics of Chialisp, a smart coin language used on the Chia blockchain. You will learn the skills required to write basic programs that can dictate how and when coins (including XCH) can be spent.',
      },
      items: [
        'chialisp-primer/chialisp-primer-intro',
        'chialisp-primer/chialisp-primer-using-modules',
        'chialisp-primer/chialisp-primer-testnet-setup',
        'chialisp-primer/chialisp-primer-first-smart-coin',
        'chialisp-primer/chialisp-primer-bls-signatures',
      ],
    },
    {
      type: 'category',
      label: 'Chialisp Concepts',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/chialisp-concepts',
        title: 'Chialisp Concepts',
        description:
          'This guide introduces some key Chialisp concepts. Understanding these concepts will enable you to write Chialisp programs more easily.',
      },
      items: [
        'chialisp-concepts/chialisp-concepts-currying',
        'chialisp-concepts/chialisp-concepts-inner-puzzles',
        'chialisp-concepts/chialisp-concepts-condition-morphing',
      ],
    },
    {
      type: 'category',
      label: 'NFT Guide',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: '/nft-developer-guide',
        title: 'NFT Developer Guide',
        description:
          "This tutorial will guide you through the process of creating DIDs that conform to Chia's DID standard, as well as minting NFTs that adhere to Chia's NFT standard.",
      },
      items: ['nft/nft-intro', 'nft/nft-cli', 'nft/nft-rpc'],
    },
    {
      type: 'category',
      label: 'CAT Guide',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: '/cat-developer-guide',
        title: 'CAT Developer Guide',
        description:
          "These guides will guide you through the process of creating CATs that conform to Chia's CAT standard.",
      },
      items: ['cat/cat-creation-tutorial'],
    },
  ],
};

module.exports = sidebars;
