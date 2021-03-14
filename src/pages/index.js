import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Vectors and matrices</>,
    imageUrl: 'img/lego.svg',
    description: (
      <>
          The fundamental building blocks of linear algebra: heap or stack-allocated vectors and
          matrices parametrized by their dimensions.
      </>
    ),
  },
  {
    title: <>Decompositions and Lapack</>,
    imageUrl: 'img/decomposition.svg',
    description: (
      <>
          Compute matrix decompositions, and solutions to linear systems.
          Benefit from efficient Rust implementations, or Lapack bindings.
      </>
    ),
  },
{
    title: <>Points and transformations</>,
    imageUrl: 'img/rotation.svg',
    description: (
        <>
            Strongly typed geometric entities like points, rotation
            matrices, quaternions, isometries, similarities, projections, etc.
        </>
    ),
},
{
    title: <>nalgebra-glm, for computer graphics</>,
    imageUrl: 'img/logo_glm.svg',
    description: (
        <>
            Use the nalgebra-glm crate for a simpler, straight-to-the-point, graphics programming-oriented API.
            Inspired by the C++ GLM library.
        </>
    ),
},
{
    title: <>Wasm and Embedded programming</>,
    imageUrl: 'img/cpu.svg',
    description: (
        <>
            Use and compile nalgebra for browser applications or embedded targets
            that do not support the Rust standard library.
        </>
    ),
},
{
    title: <>Forever free and Open-Source</>,
    imageUrl: 'img/undraw_open_source.svg',
    description: (
        <>
            Built with a FOSS mindset, we aim to empower the Rust and web communities
            with an efficient linear algebra library.
        </>
    ),
},
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title} linear-algebra library`}
      description="Fast and cross-platform linear-algebra library">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
            <div className="">
                <img src="img/logo_nalgebra.svg" width="60%" alt="Project Logo" />
            </div>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--lg --ifm-color-prim force-border', /*button--secondary*/
                styles.getStarted,
              )}
              to={useBaseUrl('docs/user_guide/getting_started')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
