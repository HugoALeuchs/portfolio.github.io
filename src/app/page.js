"use client";
import styles from "./page.module.css";
import Spline from "@splinetool/react-spline";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const TaggedContentCard = dynamic(() =>
  import("react-ui-cards").then((module) => module.TaggedContentCard)
);

const ReactProgressMeter = dynamic(() => import("react-progress-meter"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let auxCount = 0;
    const interval = setInterval(() => {
      auxCount += 1;
      setCounter(auxCount);
      if (auxCount > 100) {
        setLoading(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={loaded ? styles.main : styles.loading}>
      {loaded ? (
        <>
          <p className={styles.contact}>
            <a href="mailto:hugoandradeleuchs@hotmail.com">
              hugoandradeleuchs@hotmail.com
            </a>
            <br />
            <a
              href="https://api.whatsapp.com/send?l=pt_br&phone=5544998896630"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "black" }}
            >
              +55 (44) 9 9889-6630
            </a>
            <br />
            <a
              href="https://hugoaleuchs.github.io/portfolio.github.io/CN_EN_23.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "black" }}
            >
              Resume
            </a>
          </p>
          <TypeAnimation
            sequence={[
              "Hi!\n",
              100,
              "Hi!\nI'm Hugo Leuchs \n",
              100,
              "Hi!\nI'm Hugo Leuchs \nWeb/Front-End Developer",
              100,
            ]}
            className={styles.heroText}
            repeat={0}
          />
          <div className={styles.textBlock}>
            Bachelor in Computer Engineering
            <br />
            4 years as a Web/Front-End Developer
            <br />
            Highly experienced in Next.js
            <br />
            Experienced building creative and
            <br />
            pixel-perfect websites
          </div>
          <h3 className={styles.companiesText}>
            Companies that I&apos;ve worked on:
          </h3>
          <div className={styles.portifolioGrid}>
            <TaggedContentCard
              float
              href="https://loadsmart.com"
              thumbnail="https://hugoaleuchs.github.io/portfolio.github.io/images/LoadsmartHomePage.png"
              title="Loadsmart"
              description="I worked on creating new pages and maintaining old ones and also helped to migrate the website from a monolith project to a Next.js project."
              tags={[]}
              className={styles.card}
            />
            <TaggedContentCard
              float
              href="https://loadsmart.com/shipper/shipperguide/"
              thumbnail="https://hugoaleuchs.github.io/portfolio.github.io/images/LoadsmartShipperGuide.png"
              title="Loadsmart ShipperGuide"
              description="I participated in all stages of the development of this page, from design discussions to coding, helping with development decision-making."
              tags={[]}
              className={styles.card}
            />
            <TaggedContentCard
              float
              href="https://loja.bariguiseminovos.com.br/"
              thumbnail="https://hugoaleuchs.github.io/portfolio.github.io/images/NovoVarejo.png"
              title="NovoVarejo E-Commerce"
              description="I helped with the development of new features for the company's E-Commerce platform, mainly using React with GraphQL."
              tags={[]}
              className={styles.card}
            />
            <TaggedContentCard
              float
              href="https://biopark.com.br"
              thumbnail="https://hugoaleuchs.github.io/portfolio.github.io/images/Biopark.png"
              title="Biopark"
              description="I led the website development, participating in decision-making together with the marketing team and the board to make this website from scratch."
              tags={[]}
              className={styles.card}
            />
          </div>
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "50%",
            display: "inline-block",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
          }}
        >
          <ReactProgressMeter
            currentProgress={counter}
            showPercent={true}
            color="cyan"
          />
        </div>
      )}
      <Spline
        scene="https://prod.spline.design/3y2cbA4TrOjBFPEX/scene.splinecode"
        style={{ visibility: loaded ? "visible" : "hidden", position: "fixed" }}
      />
    </main>
  );
}
