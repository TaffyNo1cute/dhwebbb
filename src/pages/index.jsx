import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <div style={{display: 'inline-block'}}>
            <Link
              className="button button--secondary button--lg"
              to="/university-library">
              📚 开始阅读文章
            </Link>
            <div style={{fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.8, textAlign: 'center'}}>
              按省份和学校查找文章
            </div>
          </div>
          <div style={{display: 'inline-block', marginLeft: '1rem'}}>
            <Link
              className="button button--outline button--lg"
              to="/tags-filter">
              🔍 高级标签筛选
            </Link>
            <div style={{fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.8, textAlign: 'center'}}>
              多标签交集筛选
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: '📖 真实经验分享',
    icon: '📖',
    description: (
      <>
        来自学长学姐的第一手大学生活经验，涵盖学习、生活、住宿、饮食等各个方面。
        真实的声音，帮助你更好地了解心仪的大学。
      </>
    ),
  },
  {
    title: '🏷️ 智能标签筛选',
    icon: '🏷️',
    description: (
      <>
        通过学校、专业、主题等多维度标签快速定位你关心的内容。
        支持多标签交集筛选，精准找到最相关的文章。
      </>
    ),
  },
  {
    title: '🤝 开放贡献平台',
    icon: '🤝',
    description: (
      <>
        任何人都可以分享自己的大学经验。简单的 Markdown 格式，
        无需复杂的技术知识，就能为学弟学妹提供帮助。
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
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

function QuickLinks() {
  const links = [
    {
      title: '👀 阅读者指南',
      description: '了解如何使用本站',
      link: '/docs/reading',
      emoji: '📖',
    },
    {
      title: '👀 浏览文章',
      description: '查看所有学长学姐的分享',
      link: '/blog',
      emoji: '📚',
    },
    {
      title: '🏛️ 院校索引',
      description: '按省份和学校查找文章',
      link: '/university-library',
      emoji: '🏛️',
    },
    {
      title: '🏷️ 标签索引',
      description: '按标签浏览文章',
      link: '/blog/tags',
      emoji: '🏷️',
    },
    {
      title: '🔍 高级筛选',
      description: '多标签交集筛选',
      link: '/tags-filter',
      emoji: '🔍',
    },
    {
      title: '✍️ 投稿指南',
      description: '分享你的大学经验',
      link: '/docs/writing',
      emoji: '✍️',
    },
    {
      title: '👨‍💻 开发者指南',
      description: '了解项目技术架构',
      link: '/docs/developer',
      emoji: '👨‍💻',
    },
    {
      title: '📞 联系我们',
      description: '反馈问题或建议',
      link: '/docs/contact',
      emoji: '📞',
    },
  ];

  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <h2 className={styles.sectionTitle}>快速导航</h2>
        <div className={styles.linksGrid}>
          {links.map((item, idx) => (
            <Link key={idx} className={styles.linkCard} to={item.link}>
              <div className={styles.linkEmoji}>{item.emoji}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>开始探索你的大学之路</h2>
          <p>让学长学姐的经验成为你的指路明灯</p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/blog">
              立即开始阅读 →
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/writing"
              style={{marginLeft: '1rem'}}>
              我要投稿 ✍️
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`欢迎 - ${siteConfig.title}`}
      description="东华高中毕业生大学指北，学长学姐的经验分享平台">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickLinks />
        <CallToAction />
      </main>
    </Layout>
  );
}
