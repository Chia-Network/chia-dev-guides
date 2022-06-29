import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "NFT Developer Guide",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    dest_url: "/guides/nft-developer-guide",
    description: (
      <>Find out more about minting NFTs on Chia - the secure, sustainable blockchain</>
    ),
  },
  {
    title: "Get Started with Chialisp",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    dest_url: "/guides",
    description: (
      <> Learn the fundamentals of Chialisp - the smart coin programming language</>
    ),
  },
  {
    title: "Developer Forum",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    dest_url: "https://developers.chia.net/",
    description: (
      <>Connect with Chia developers, discuss your projects and get help from the community.</>
    ),
  },
];

function Feature({ Svg, title, description, dest_url }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <a href={dest_url}>
          <Svg className={styles.featureSvg} role="img" />
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <a href={dest_url}>
          <h3>{title}</h3>
        </a>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
