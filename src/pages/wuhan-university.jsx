import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl'; // 【新增点 1】导入路径工具
import styles from './wuhan-university.module.css';

export default function WuhanUniversity() {
  const observerRef = useRef(null);
  const bgUrl = useBaseUrl('/img/whu-bg.jpg'); // 【新增点 2】自动计算背景图路径

  useEffect(() => {
    // ... 这里保留你原本的 IntersectionObserver 代码，不要动 ...
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateVisible);
          }
        });
      },
      { threshold: 0.1 }
    );
    observerRef.current = observer;
    const elements = document.querySelectorAll(`.${styles.animateHidden}`);
    elements.forEach((el) => observer.observe(el));
    return () => {
      if (observerRef.current) {
        elements.forEach((el) => observerRef.current.unobserve(el));
      }
    };
  }, []);

  return (
    <Layout title="武汉大学" description="珞珈山下，东湖之滨">
      {/* 【新增点 3】在这里把背景图挂载上去 */}
      <main 
        className={styles.mainContainer}
        style={{ 
          backgroundImage: `url("${bgUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        
        <section className={styles.heroSection}>
          {/* ... 这里保留你原本的 heroSection 内容 ... */}
          <div className={styles.heroContent}>
            <div className={styles.typewriterWrapper}>
              <h1 className={styles.typewriterTitle}>武汉大学</h1>
            </div>
            <p className={styles.subtitle}>自强、弘毅、求是、拓新</p>
            <div className={styles.scrollIndicator}>
              <span>向下滑动探索</span>
              <div className={styles.arrow}>↓</div>
            </div>
          </div>
        </section>

        {/* 这一部分就是你担心的“标签内容”，保持原样不动 */}
        <section className={styles.articleSection}>
          <div className={styles.contentWrapper}>
            <h2 className={`${styles.sectionTitle} ${styles.animateHidden}`}>珞珈印记</h2>
            <div className={styles.articleGrid}>
              <Link to="/blog/tags/武汉大学" className={`${styles.card} ${styles.animateHidden}`}>
                <div className={styles.cardIcon}>📚</div>
                <h3>whu小指南</h3>
                <p>点击这里，查阅所有关于武大生活指南。🤗</p>
                <div className={styles.glowEffect}></div>
              </Link>

              <div className={`${styles.card} ${styles.animateHidden}`} style={{transitionDelay: '0.2s'}}>
                <div className={styles.cardIcon}>🌸</div>
                <h3>珞珈风光图集(施工中🙌🙌)</h3>
                <p>三月樱花，秋日落叶，这里收录了校园四季最美的视觉记忆。</p>
                <div className={styles.glowEffect}></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.practiceSection}>
          <div className={styles.contentWrapper}>
            <h2 className={`${styles.sectionTitle} ${styles.animateHidden}`}>普法实践与法律援助</h2>
            <div className={styles.articleGrid}>
              <Link to="/legal-aid" className={`${styles.card} ${styles.practiceCard} ${styles.animateHidden}`}>
                <div className={styles.cardIcon}>⚖️</div>
                <h3>数字隐私安全护航与法律援助</h3>
                <p>本项目由武汉大学弘毅学堂大学生创新创业计划“谁的正义？未经同意传播他人私密图像刑法再审视”项目组联合发布，旨在建立与东华高级中学的长效法制连接。</p>
                <div className={styles.glowEffect}></div>
              </Link>
            </div>
          </div>
        </section>

        <footer className={styles.footerSection}>
          <div className={styles.footerContent}>
            <p className={styles.publisherRole}>联合发布</p>
            <p>武汉大学法学院嘉然单推人</p>
            <p>武汉大学弘毅学堂大学生创新创业计划“谁的正义？未经同意传播他人私密图像刑法再审视”项目组</p>
          </div>
        </footer>

      </main>
    </Layout>
  );
}