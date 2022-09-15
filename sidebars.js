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
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/cat-developer-guide',
        title: 'CAT Developer Guide',
        description:
          "These guides will guide you through the process of creating CATs that conform to Chia's CAT standard.",
      },
      items: ['cat/cat-creation-tutorial'],
    },
    {
      type: 'category',
      label: 'Crash Course',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/crash-course',
        title: 'Crash Course',
        description:
          'These lessons will guide you through the essentials of Chia.',
      },
      items: [
        'crash-course/introduction',
        'crash-course/cats-offers-nfts',
        'crash-course/chialisp',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsible: true,
      collapsed: true,
      items: [
        {
          'Video Series': [
            'tutorials/video-series/why_chia_is_great',
            'tutorials/video-series/developing_applications',
            'tutorials/video-series/tools_and_setup',
            'tutorials/video-series/programming_chialisp',
            'tutorials/video-series/coin_lifecycle_and_testing',
            'tutorials/video-series/singletons',
            'tutorials/video-series/high-level-tips-1',
            'tutorials/video-series/high-level-tips-2',
            'tutorials/video-series/high-level-tips-3',
            'tutorials/video-series/single_issuance_CAT',
            'tutorials/video-series/multiple_issuance_CAT',
          ],
        },
        'tutorials/custom_puzzle_lock',
        'tutorials/coin_spend_rpc',
        'tutorials/structure_of_a_chia_application',
        'tutorials/CAT_Launch_Process_Linux_MacOS',
        'tutorials/CAT_Launch_Process_Windows',
        'tutorials/offers_gui_tutorial',
        'tutorials/offers_cli_tutorial',
      ],
    },
  ],
};

module.exports = sidebars;
