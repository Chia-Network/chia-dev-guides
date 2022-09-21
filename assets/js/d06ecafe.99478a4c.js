"use strict";(self.webpackChunkchia_dev_guides=self.webpackChunkchia_dev_guides||[]).push([[226],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),h=o,f=p["".concat(s,".").concat(h)]||p[h]||d[h]||i;return n?a.createElement(f,r(r({ref:t},u),{},{components:n})):a.createElement(f,r({ref:t},u))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var c=2;c<i;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5162:function(e,t,n){n.d(t,{Z:function(){return r}});var a=n(7294),o=n(4334),i="tabItem_Ymn6";function r(e){var t=e.children,n=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",className:(0,o.Z)(i,r),hidden:n},t)}},5488:function(e,t,n){n.d(t,{Z:function(){return h}});var a=n(3117),o=n(7294),i=n(4334),r=n(2389),l=n(7392),s=n(7094),c=n(2466),u="tabList__CuJ",d="tabItem_LNqP";function p(e){var t,n,r=e.lazy,p=e.block,h=e.defaultValue,f=e.values,m=e.groupId,k=e.className,g=o.Children.map(e.children,(function(e){if((0,o.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),b=null!=f?f:g.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),y=(0,l.l)(b,(function(e,t){return e.value===t.value}));if(y.length>0)throw new Error('Docusaurus error: Duplicate values "'+y.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var w=null===h?h:null!=(t=null!=h?h:null==(n=g.find((function(e){return e.props.default})))?void 0:n.props.value)?t:g[0].props.value;if(null!==w&&!b.some((function(e){return e.value===w})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+w+'" but none of its children has the corresponding value. Available values are: '+b.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var v=(0,s.U)(),C=v.tabGroupChoices,T=v.setTabGroupChoices,N=(0,o.useState)(w),x=N[0],I=N[1],O=[],S=(0,c.o5)().blockElementScrollPositionUntilNextRender;if(null!=m){var j=C[m];null!=j&&j!==x&&b.some((function(e){return e.value===j}))&&I(j)}var A=function(e){var t=e.currentTarget,n=O.indexOf(t),a=b[n].value;a!==x&&(S(t),I(a),null!=m&&T(m,String(a)))},P=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a,o=O.indexOf(e.currentTarget)+1;n=null!=(a=O[o])?a:O[0];break;case"ArrowLeft":var i,r=O.indexOf(e.currentTarget)-1;n=null!=(i=O[r])?i:O[O.length-1]}null==(t=n)||t.focus()};return o.createElement("div",{className:(0,i.Z)("tabs-container",u)},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":p},k)},b.map((function(e){var t=e.value,n=e.label,r=e.attributes;return o.createElement("li",(0,a.Z)({role:"tab",tabIndex:x===t?0:-1,"aria-selected":x===t,key:t,ref:function(e){return O.push(e)},onKeyDown:P,onFocus:A,onClick:A},r,{className:(0,i.Z)("tabs__item",d,null==r?void 0:r.className,{"tabs__item--active":x===t})}),null!=n?n:t)}))),r?(0,o.cloneElement)(g.filter((function(e){return e.props.value===x}))[0],{className:"margin-top--md"}):o.createElement("div",{className:"margin-top--md"},g.map((function(e,t){return(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==x})}))))}function h(e){var t=(0,r.Z)();return o.createElement(p,(0,a.Z)({key:String(t)},e))}},7761:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return u},default:function(){return m},frontMatter:function(){return c},metadata:function(){return d},toc:function(){return h}});var a=n(3117),o=n(102),i=(n(7294),n(3905)),r=n(5488),l=n(5162),s=["components"],c={slug:"/crash-course/introduction",title:"Introduction"},u=void 0,d={unversionedId:"crash-course/introduction",id:"crash-course/introduction",title:"Introduction",description:"This course is designed to give you an end-to-end introduction to Chia. We'll start off with a foundational understanding of the Chia blockchain. This includes what blockchains are for and what makes Chia different from other options. Once you understand the basics, we'll learn about plotting and farming. Finally, we'll cover many of the DeFi possibilities including fungible tokens (CATs), non-fungible tokens (NFTs), and writing custom coins in Chialisp.",source:"@site/guides/crash-course/introduction.md",sourceDirName:"crash-course",slug:"/crash-course/introduction",permalink:"/guides/crash-course/introduction",draft:!1,editUrl:"https://github.com/Chia-Network/chia-dev-guides/edit/main/guides/crash-course/introduction.md",tags:[],version:"current",frontMatter:{slug:"/crash-course/introduction",title:"Introduction"}},p={},h=[{value:"Intro to Chia",id:"intro-to-chia",level:2},{value:"Consensus",id:"consensus",level:3},{value:"Decentralization",id:"decentralization",level:3},{value:"Getting Started",id:"getting-started",level:2},{value:"Getting Started with the CLI",id:"getting-started-with-the-cli",level:2},{value:"Getting on Testnet",id:"getting-on-testnet",level:2},{value:"CLI",id:"cli",level:2},{value:"Getting TXCH",id:"getting-txch",level:2}],f={toc:h};function m(e){var t=e.components,n=(0,o.Z)(e,s);return(0,i.kt)("wrapper",(0,a.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This course is designed to give you an end-to-end introduction to Chia. We'll start off with a foundational understanding of the Chia blockchain. This includes what blockchains are for and what makes Chia different from other options. Once you understand the basics, we'll learn about plotting and farming. Finally, we'll cover many of the DeFi possibilities including fungible tokens (CATs), non-fungible tokens (NFTs), and writing custom coins in Chialisp."),(0,i.kt)("h2",{id:"intro-to-chia"},"Intro to Chia"),(0,i.kt)("p",null,"The goal of cryptocurrency is to transfer monetary value on a peer-to-peer decentralized network. This means that there is no centralized intermediary to facilitate the transaction. Instead, blockchain relies on a network of nodes to confirm transactions according to some rules. Additionally, cryptocurrency makes the exchange of value extremely fast and easy, even for cross-border payments."),(0,i.kt)("p",null,"However, cryptocurrencies can be used for more than just facilitating digital payments. We are seeing many projects pop up that are designed as decentralized applications, or ",(0,i.kt)("strong",{parentName:"p"},"dApps"),". The value of a cryptocurrency is not only in its ability to be used for buying and selling goods, but also that it is designed to host applications without a centralized authority."),(0,i.kt)("p",null,"Each person who runs a Chia blockchain node runs a full copy of the software and is required to adhere to the consensus algorithm. This allows for peer-to-peer transactions confirmed against an entire network of nodes as opposed to a single entity."),(0,i.kt)("h3",{id:"consensus"},"Consensus"),(0,i.kt)("p",null,"As new transactions are added to the network, full nodes must confirm these transactions. For a decentralized network to work, every node must be in agreement with every other node. This means they must follow the same rules."),(0,i.kt)("p",null,"The rules are known as the ",(0,i.kt)("strong",{parentName:"p"},"consensus")," and are rules defined in the software every node must adhere to."),(0,i.kt)("p",null,"Chia follows a consensus algorithm known as ",(0,i.kt)("strong",{parentName:"p"},"Proof of Space and Time")," (PoST). The way it works is by utilizing hard drive space and elapsed time as your contribution to the network. This is required to prevent what's known as a ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Sybil_attack"},"Sybil attack"),"."),(0,i.kt)("p",null,"Chia is intentionally different than networks that use ",(0,i.kt)("strong",{parentName:"p"},"Proof of Stake")," (PoS). Many argue that staking has a centralizing effect of the network as there are much fewer decision-making nodes, and they continue to gain power. Chia, on the other hand, has over 350,000 full nodes all following the PoST consensus mechanism, a protocol that is similar to that of Bitcoin (but with less electricity usage required)."),(0,i.kt)("h3",{id:"decentralization"},"Decentralization"),(0,i.kt)("p",null,"For a network to be decentralized, we want the creation of a full node to be possible for many. Ideally, running a full node would be as permissionless as possible."),(0,i.kt)("p",null,"Anyone can become a full node in Chia. The majority of computers can handle the technical requirements with many people even running off of a Raspberry Pi. A full node can be ran with less storage requirements and computing power. These smaller requirements for a full node allow for stronger decentralization."),(0,i.kt)("p",null,"Farmers in the network are those who designate hard drive storage to support the network. The more space you reserve, the higher chances you have of confirming a block and getting rewarded Chia (XCH). As you'll learn, the network has grown so much that solo farming can be quite unrewarding with massive times to win. Pooling was introduced as a solution to more evenly distribute farming rewards based on your space contribution."),(0,i.kt)("p",null,"Pooling is possible with other major cryptocurrencies, but a major difference is that the Chia network designed an official protocol where the individual farmers confirm their blocks rather than the pool. This completely removes the problem of centralization introduced by current ",(0,i.kt)("strong",{parentName:"p"},"Proof of Work")," (PoW) mining. Centralized mining power puts the integrity of the network in question as large pools are capable of easily performing 51% attacks. This specific centralization problem is not a problem with the pooling protocol, even if a single farming pool maintained a majority of the network."),(0,i.kt)("p",null,"Essentially:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Chia is a blockchain that is decentralized."),(0,i.kt)("li",{parentName:"ul"},"It uses significantly less electricity."),(0,i.kt)("li",{parentName:"ul"},"It offers dApp capabilities with the Chialisp programming language.")),(0,i.kt)("h2",{id:"getting-started"},"Getting Started"),(0,i.kt)("p",null,"You can refer to the ",(0,i.kt)("a",{parentName:"p",href:"https://docs.chia.net/quick-start-guide"},"Quick Start Guide page")," to download and install the Chia client. The installer is usually the simplest and we will go through how to set up the ",(0,i.kt)("inlineCode",{parentName:"p"},"chia")," command for CLI use."),(0,i.kt)("p",null,"To make the commands as close as possible across operating systems I recommend Windows users ",(0,i.kt)("a",{parentName:"p",href:"https://git-scm.com/download/win"},"download Git"),", which comes with Git bash. You can of course use Windows Command Prompt or PowerShell, but commands may be slightly different."),(0,i.kt)("p",null,"Before we get started using the CLI, we need to be able to issue the ",(0,i.kt)("inlineCode",{parentName:"p"},"chia")," command."),(0,i.kt)("p",null,"Use this line in Git Bash / terminal:"),(0,i.kt)(r.Z,{groupId:"OS",defaultValue:"windows (Git Bash)",values:[{label:"Windows (Git Bash)",value:"windows (Git Bash)"},{label:"Linux/MacOS",value:"nix"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"windows (Git Bash)",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"~/AppData/Local/chia-blockchain/app-1.5.1/resources/app.asar.unpacked/daemon/chia.exe\n"))),(0,i.kt)(l.Z,{value:"nix",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia\n")))),(0,i.kt)("p",null,"Response:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Usage: chia.exe [OPTIONS] COMMAND [ARGS]...\n\n  Manage chia blockchain infrastructure (1.5.1)\n\nOptions:\n  --root-path PATH                Config file root  [default:\n                                  C:\\Users\\calebcurry\\.chia\\mainnet]\n\n  --keys-root-path PATH           Keyring file root  [default:\n                                  C:\\Users\\calebcurry\\.chia_keys]\n\n  --passphrase-file FILENAME      File or descriptor to read the keyring\n                                  passphrase from\n\n  --force-legacy-keyring-migration / --no-force-legacy-keyring-migration\n                                  Force legacy keyring migration. Legacy\n                                  keyring support will be removed in an\n                                  upcoming version!\n\n  -h, --help                      Show this message and exit.\n\nCommands:\n  configure   Modify configuration\n  db          Manage the blockchain database\n  farm        Manage your farm\n  init        Create or migrate the configuration\n  keys        Manage your keys\n  netspace    Estimate total farmed space on the network\n  passphrase  Manage your keyring passphrase\n  plotnft     Manage your plot NFTs\n  plots       Manage your plots\n  plotters    Advanced plotting options\n  rpc         RPC Client\n  run_daemon  Runs chia daemon\n  show        Show node information\n  start       Start service groups\n  stop        Stop services\n  version     Show chia version\n  wallet      Manage your wallet\n\n  Try 'chia start node', 'chia netspace -d 192', or 'chia show -s'\n\n")),(0,i.kt)("p",null,"Using this path each time can get old, so you have the option of creating an alias or environment variable."),(0,i.kt)(r.Z,{groupId:"OS",defaultValue:"windows (Git Bash)",values:[{label:"Windows (Git Bash)",value:"windows (Git Bash)"},{label:"Linux/MacOS",value:"nix"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"windows (Git Bash)",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"alias chia=~/AppData/Local/chia-blockchain/app-1.5.1/resources/app.asar.unpacked/daemon/chia.exe\n"))),(0,i.kt)(l.Z,{value:"nix",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"alias chia=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia\n")))),(0,i.kt)("p",null,"Now, you can just say:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia\n")),(0,i.kt)("h2",{id:"getting-started-with-the-cli"},"Getting Started with the CLI"),(0,i.kt)("p",null,"Once you can issue the ",(0,i.kt)("inlineCode",{parentName:"p"},"chia")," command, the differences between operating systems are minimal."),(0,i.kt)("p",null,"To gain more experience in Chia and to be more comfortable with troubleshooting you should become comfortable with the command line interface (this will allow you to interact with Chia through the terminal). A lot of other tools like madMAx plotter also are commonly used through the terminal."),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"madMAx is a software created as an alternative way of creating plots for Chia. The software performed great and was ultimately brought in to the official software. This is the easiest way to get started created plots with Chia.")),(0,i.kt)("p",null,"The instructions to use the CLI depends on the operating system, you can get the exact instructions in ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference"},"this document"),"."),(0,i.kt)("p",null,"So the goal is to be able to use the ",(0,i.kt)("inlineCode",{parentName:"p"},"chia")," command from the terminal. On mac, you can issue ",(0,i.kt)("inlineCode",{parentName:"p"},"/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia"),"."),(0,i.kt)("p",null,"Add this to your path with ",(0,i.kt)("inlineCode",{parentName:"p"},"PATH=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon:$PATH"),". This will allow you to just type ",(0,i.kt)("inlineCode",{parentName:"p"},"chia")," in the terminal without everything else."),(0,i.kt)("p",null,"Now that you have the CLI running you can initialize Chia."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia init\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia keys generate\n")),(0,i.kt)("admonition",{title:"Fingerprints",type:"info"},(0,i.kt)("p",{parentName:"admonition"},"It's possible to manage multiple keys from a single Chia client. These will be identified by a ",(0,i.kt)("strong",{parentName:"p"},"fingerprint"),". In ",(0,i.kt)("inlineCode",{parentName:"p"},"chia wallet show")," you'll see a message like ",(0,i.kt)("inlineCode",{parentName:"p"},"fingerprint: 1660000549"),"."),(0,i.kt)("p",{parentName:"admonition"},"Working with only a single fingerprint in your client is easier as if you have multiple you'll often need to specify which fingerprint you want to use. For example. here is the usuage for ",(0,i.kt)("inlineCode",{parentName:"p"},"chia wallet send"),":"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre"},"chia wallet send [OPTIONS]\n\nOptions:\n\n  ...\n\n  -f, --fingerprint INTEGER       Set the fingerprint to specify which wallet\n                                  to use\n\n  ...\n\n")),(0,i.kt)("p",{parentName:"admonition"},"By managing just a single wallet, all of your chia commands can be simplified by leaving off the ",(0,i.kt)("inlineCode",{parentName:"p"},"-f")," option.")),(0,i.kt)("h2",{id:"getting-on-testnet"},"Getting on Testnet"),(0,i.kt)("p",null,"If you are already on a testnet, skip to ",(0,i.kt)("a",{parentName:"p",href:"#cli"},"instructions for the CLI"),"."),(0,i.kt)("p",null,"For most dev work on Chia, you'll want to be on the testnet. That way, you're learning with fake Chia and don't put any funds at risk."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia stop all -d\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia configure --testnet true\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia start farmer\n")),(0,i.kt)("p",null,"Response:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia_harvester: started\nchia_farmer: started\nchia_full_node: started\nchia_wallet: started\n")),(0,i.kt)("h2",{id:"cli"},"CLI"),(0,i.kt)("p",null,"At this point you should be able to use the CLI to get information about your farm and confirm you are on testnet."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia show --state\n")),(0,i.kt)("p",null,"Response:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Network: testnet10    Port: 58444   RPC Port: 8555\nNode ID: 67095d445d879556da95feeee70174c66b131d4f29bd447df5fbc56789a01f24\nGenesis Challenge: ae83525ba8d1dd3f09b277de18ca3e43fc0af20d20c4b3e92ef2a48bd291ccb2\nCurrent Blockchain Status: Not Synced. Peak height: 1462514\n      Time: Wed Aug 31 2022 13:49:51 EDT                  Height:    1462514\n\nEstimated network space: 1.181 TiB\nCurrent difficulty: 708\nCurrent VDF sub_slot_iters: 70778880\nTotal iterations since the start of the blockchain: 3364480016373\n\n  Height: |   Hash:\n  1462514 | d799fedae1ef226669f61ad843c5ae7947b42e596664f39fd68fcd299e076916\n  1462513 | 0764f546d9186da788485ce69ebe91969e8cf9495722d9567d67e54e3e3e6ed3\n  1462512 | d6132b015365b7609d0b5179b9daf9e4fd2ad7a9040ec1d13e15df65660cf69e\n  1462511 | 8ae2273b4a86fd9af85837c538faa75b572014ac281c6c51ad1eb4ce2a7f8072\n  1462510 | fb392a40b7e3bf38c8628311224b5aaa4a32ecdea403c16ae5d3c48d16b57f47\n  1462509 | 012b1f9213bf823e6b73408019f18ff8330e46b911ba78c1d64fd5019d6cc6d9\n  1462508 | e0f66ca2e00566eee9a3ce4028b6aa11771aa42c9bce34f296d89f42d1a909ce\n  1462507 | c900e2fb449db0def030a3c0e6a8bff5d23f6470730236120bcac442b2f1ab0f\n  1462506 | 39db9fe7658b545dcf45e8e99797c937b7b93a041485ef28bf9cda2b3529ac0a\n  1462505 | ca343b0e985fe9dafb7cba7cee0c1515c6bddd732e2542b8fbd49ac8d90c13f3\n\n")),(0,i.kt)("p",null,"Ideally, you'll see within this response a value like ",(0,i.kt)("inlineCode",{parentName:"p"},"Current Blockchain Status: Syncing 1462514/1462514 (0 behind)")," showing that you are syncing."),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Testnet Database"),(0,i.kt)("p",null,"For many things you will need a synced full node. Fortunately, an official ",(0,i.kt)("a",{parentName:"p",href:"https://downloads.chia.net/testnet10/"},"testnet database")," download is available, which can be a much faster option than syncing from scratch."),(0,i.kt)("p",null,"Once this file is downloaded, stop your node:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia stop all -d\n")),(0,i.kt)("p",null,"Now, ",(0,i.kt)("strong",{parentName:"p"},"unzip the file")," and replace the ",(0,i.kt)("inlineCode",{parentName:"p"},"blockchain_v2_mainnet.sqlite")," database file in ",(0,i.kt)("inlineCode",{parentName:"p"},"/Users/<username>/.chia/mainnet/db")," directory."),(0,i.kt)("p",null,"Once this is complete, you can restart chia."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia start farmer\n")),(0,i.kt)("p",null,"Now, you can confirm your sync height. It should be much closer to the peak height of the blockchain."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia show --state\n"))),(0,i.kt)("h2",{id:"getting-txch"},"Getting TXCH"),(0,i.kt)("p",null,"For the rest of this workshop you will need some TXCH (Testnet Chia). You can get some for free from the ",(0,i.kt)("a",{parentName:"p",href:"https://testnet10-faucet.chia.net/"},"official Chia faucet"),"."),(0,i.kt)("p",null,"For this you will need a receive address."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia wallet get_address\n")),(0,i.kt)("p",null,"Example response:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"txch14hdpnww04nezf9y7gmsdaryjtqpgnyrv6set8fykdx7v8u3jjvps5xjxre\n")),(0,i.kt)("p",null,"Once this transaction has been added to the blockchain and your wallet sees it, you will have a TXCH balance."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia wallet show\n")),(0,i.kt)("p",null,"Example response:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Chia Wallet:\n   -Total Balance:         0.899259999996 txch (899259999996 mojo)\n   -Pending Total Balance: 0.899259999996 txch (899259999996 mojo)\n   -Spendable:             0.899259999996 txch (899259999996 mojo)\n   -Type:                  STANDARD_WALLET\n   -Wallet ID:             1\n")),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Sending Chia"),"You can send Chia through the CLI as well. This requires a little more information, but isn't too bad.",(0,i.kt)("p",null,"The command looks like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia wallet send -i 1 -a <amount in XCH> -m <amount in fee in XCH> -t <target address>\n")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"-i 1")," is the wallet ID. Later on we will have multiple wallet IDs to store different types of assets (tokens). For now, ",(0,i.kt)("inlineCode",{parentName:"p"},"-i 1")," refers to the default Chia wallet as seen in the ",(0,i.kt)("inlineCode",{parentName:"p"},"-Wallet ID")," response from the ",(0,i.kt)("inlineCode",{parentName:"p"},"chia wallet show")," command."),(0,i.kt)("p",null,"Any Chia keys will have multiple receive addresses. You can test sending Chia by sending some to yourself (or a friend). Take a note of the response from ",(0,i.kt)("inlineCode",{parentName:"p"},"chia wallet get_address")," command."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia wallet send -i 1 -a .01 -m 0 -t txch14hdpnww04nezf9y7gmsdaryjtqpgnyrv6set8fykdx7v8u3jjvps5xjxre\n")),(0,i.kt)("p",null,"Response:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Submitting transaction...\nTransaction submitted to nodes: ...\nRun 'chia wallet get_transaction -f 1660000549 -tx 0x468399be58604e7199f6899d838d3206fada9c12b29f545410616856413457c7' to get status\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia wallet get_transaction -f 1660000549 -tx 0x468399be58604e7199f6899d838d3206fada9c12b29f545410616856413457c7\n")),(0,i.kt)("p",null,"Response:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Transaction 468399be58604e7199f6899d838d3206fada9c12b29f545410616856413457c7\nStatus: In mempool\nAmount sent: 0.01 TXCH\nTo address: txch14hdpnww04nezf9y7gmsdaryjtqpgnyrv6set8fykdx7v8u3jjvps5xjxre\nCreated at: 2022-09-08 10:52:15\n")),(0,i.kt)("p",null,"You can see ",(0,i.kt)("inlineCode",{parentName:"p"},"Status: In mempool"),", which means a full node has not yet confirmed the transaction. This can take some time if the network is busy or if you did not include a fee. Ultimately we want this command to return ",(0,i.kt)("inlineCode",{parentName:"p"},"Status: Confirmed"),"."),(0,i.kt)("p",null,"You can see all your transactions as well:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"chia wallet get_transactions\n")),(0,i.kt)("p",null,"Response:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"...\n\nTransaction 2aa603c52e4b56b8af41a489081056de40421a6398caf4fbdc8be861eb210b2e\nStatus: Confirmed\nAmount received in trade: 0.01 TXCH\nTo address: txch1ttx32j6lg9c6d4jhf9rdpugk7ulmuxsz4u42jdmy5xr94t933q5skfv0av\nCreated at: 2022-09-01 13:40:07\n\nTransaction 29dd86e548957ff90bebd83aaa11f5e5f0fa4978f9c207252137dcbed40b2222\nStatus: Confirmed\nAmount sent in trade: 0.01 TXCH\nTo address: txch1qyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszf0rpn\nCreated at: 2022-09-01 13:40:07\n\n...\n"))),"At this point you have a Chia wallet and a basic understanding of the CLI. You should now be able to move on to the next section which will introduce many of the Chia primitives including CATs, offers, and NFTs.")}m.isMDXComponent=!0}}]);