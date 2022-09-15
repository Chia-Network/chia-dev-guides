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
      label: 'Video Tutorials',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/video-tutorials',
        title: 'Video Tutorials',
        description:
          'A large collection of Chia video tutorial content. Keep in mind that these tutorials were written a while ago, and may contain some outdated information.',
      },
      items: [
        {
          'Chialisp Tutorial Video Series': [
            'video-tutorials/why_chia_is_great',
            'video-tutorials/developing_applications',
            'video-tutorials/tools_and_setup',
            'video-tutorials/programming_chialisp',
            'video-tutorials/coin_lifecycle_and_testing',
            'video-tutorials/singletons',
            'video-tutorials/high-level-tips-1',
            'video-tutorials/high-level-tips-2',
            'video-tutorials/high-level-tips-3',
            'video-tutorials/single_issuance_CAT',
          ],
        },
        'video-tutorials/custom_puzzle_lock',
        'video-tutorials/coin_spend_rpc',
        'video-tutorials/structure_of_a_chia_application',
        'video-tutorials/CAT_Launch_Process_Linux_MacOS',
        'video-tutorials/CAT_Launch_Process_Windows',
        'video-tutorials/multiple_issuance_CAT',
        'video-tutorials/offers_gui_tutorial',
        'video-tutorials/offers_cli_tutorial',
      ],
    },
  ],
};

module.exports = sidebars;
