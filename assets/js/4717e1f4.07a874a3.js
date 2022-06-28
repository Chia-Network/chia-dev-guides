"use strict";(self.webpackChunkchia_dev_guides=self.webpackChunkchia_dev_guides||[]).push([[704],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return g}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=u(n),g=i,h=d["".concat(l,".").concat(g)]||d[g]||c[g]||r;return n?a.createElement(h,s(s({ref:t},p),{},{components:n})):a.createElement(h,s({ref:t},p))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,s=new Array(r);s[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,s[1]=o;for(var u=2;u<r;u++)s[u]=n[u];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3899:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return g},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return c}});var a=n(7462),i=n(3366),r=(n(7294),n(3905)),s=["components"],o={id:"bls-signatures",slug:"/bls-signatures",title:"BLS Signatures"},l=void 0,u={unversionedId:"getting-started/bls-signatures",id:"getting-started/bls-signatures",title:"BLS Signatures",description:"When creating a spend bundle previously, we have left the aggregated_signature field set to the default value of c0 followed by 190 zeros. This value indicates that there are no signatures. We will detail what signatures are, and how you can use them on the blockchain.",source:"@site/guides/getting-started/bls-signatures.md",sourceDirName:"getting-started",slug:"/bls-signatures",permalink:"/guides/bls-signatures",draft:!1,editUrl:"https://github.com/Chia-Network/guides/getting-started/bls-signatures.md",tags:[],version:"current",frontMatter:{id:"bls-signatures",slug:"/bls-signatures",title:"BLS Signatures"},sidebar:"tutorialSidebar",previous:{title:"First Smart Coin",permalink:"/guides/first-smart-coin"}},p={},c=[{value:"Digital Signatures",id:"digital-signatures",level:2},{value:"Example",id:"example",level:2},{value:"Conclusion",id:"conclusion",level:2}],d={toc:c};function g(e){var t=e.components,n=(0,i.Z)(e,s);return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"When creating a spend bundle previously, we have left the ",(0,r.kt)("inlineCode",{parentName:"p"},"aggregated_signature")," field set to the default value of ",(0,r.kt)("inlineCode",{parentName:"p"},"c0")," followed by 190 zeros. This value indicates that there are no signatures. We will detail what signatures are, and how you can use them on the blockchain."),(0,r.kt)("h2",{id:"digital-signatures"},"Digital Signatures"),(0,r.kt)("p",null,"A ",(0,r.kt)("strong",{parentName:"p"},"digital signature")," is a cryptographically secure way to check the author of a message. It is quite similar to written signatures."),(0,r.kt)("p",null,"To create a signature, first you need a ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Public-key_cryptography"},"key pair")," that consists of a ",(0,r.kt)("strong",{parentName:"p"},"private key")," and its corresponding ",(0,r.kt)("strong",{parentName:"p"},"public key"),". The private key is used to sign messages, whereas the public key is used to verify the signature created for the message."),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"danger")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Your private key should ",(0,r.kt)("strong",{parentName:"p"},"never")," be shared with anyone other than yourself unless you are fine with them having complete control over the wallet it is for, as well as signing messages on your behalf. The same is true for the mnemonic seed phrase used to generate the key pair."))),(0,r.kt)("p",null,"The first thing you need to do is find the fingerprint of the wallet you are going to be using for message signing."),(0,r.kt)("p",null,"You can use the following command to do this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"chia keys show\n")),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You are not going to be using the root key pair itself to sign messages, but rather a child key derived from it. The ",(0,r.kt)("inlineCode",{parentName:"p"},"hd_path")," represents the path used for deriving the child key from the root."),(0,r.kt)("p",{parentName:"div"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"12381")," is specific to BLS signatures, whereas ",(0,r.kt)("inlineCode",{parentName:"p"},"8444")," is specific to Chia. Wallets use the index ",(0,r.kt)("inlineCode",{parentName:"p"},"2"),", and finally the last value is just the key index, starting at ",(0,r.kt)("inlineCode",{parentName:"p"},"0"),"."),(0,r.kt)("p",{parentName:"div"},"You will not need to change the value in this guide, but you can tweak the last value if you want."))),(0,r.kt)("p",null,"You can now sign messages using this key pair like so:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'chia keys sign --fingerprint "FingerPrint" --hd_path "m/12381/8444/2/0" --message "Message"\n')),(0,r.kt)("p",null,"It will show you the derived public key and signature based on the path and message specified."),(0,r.kt)("p",null,"You can use those values to verify that the signature is correct like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'chia keys verify --public_key "PublicKey" --signature "Signature" --message "Message"\n')),(0,r.kt)("p",null,"If the result is ",(0,r.kt)("inlineCode",{parentName:"p"},"True"),", it is valid. Otherwise, either the public key, signature, or message is incorrect."),(0,r.kt)("h2",{id:"conclusion"},"Conclusion"),(0,r.kt)("p",null,"This was just a primer on BLS signatures, and in practice it can be a bit more complicated. They will be put to good use in future guides, and it's a good idea to understand how they work before you dive into them. If you have any questions about BLS signature, feel free to ask on our ",(0,r.kt)("a",{parentName:"p",href:"https://keybase.io/team/chia_network.public"},"Keybase"),"!"))}g.isMDXComponent=!0}}]);