import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl'; // 导入路径工具
import styles from './legal-aid.module.css';

export default function LegalAid() {
  // 定义智能路径，解决 /dhwebbb/ 部署后的失效问题
  const qrCodePath = useBaseUrl('/img/qrcode.jpg');
  const pdfPath = useBaseUrl('/pdf/manual.pdf');

  return (
    <Layout title="法律援助" description="数字隐私安全护航与法律援助">
      <main className={styles.mainContainer}>
        
        {/* 顶部引言区 */}
        <div className={styles.header}>
          <h1 className={styles.title}>数字隐私安全护航与法律援助</h1>
          <p className={styles.intro}>
            本项目由武汉大学弘毅学堂大学生创新创业计划“谁的正义？未经同意传播他人私密图像刑法再审视”项目组联合发布，旨在建立与东华高级中学的长效法制连接。
            这里记录了我们在东华高级中学开展的数字人格尊严与隐私安全普法讲座经验，并提供《数字人格尊严与隐私安全护航手册》的在线阅览。
          </p>
        </div>

        <div className={styles.contentGrid}>
          
          {/* 第一个卡片：紧急法律援助 */}
          <div className={styles.card}>
            <div className={styles.icon}>🤝</div>
            <h2>法律援助</h2>
            <p>如果您遇到法律问题需要援助，请随时联系团队成员，我们将为东华uu提供力所能及的解答与支持!</p>
            <div className={styles.teamInfo}>
              <div className={styles.infoItem}>求助邮箱：15913759036@163.com</div>
              <div className={styles.infoItem}>援助团队：</div>
              <div className={styles.teamMember}>whu法学院最懂法之人 </div>
              <div className={styles.teamMember}>whu弘毅学堂绩点的神(保研版) </div>
              <div className={styles.teamMember}>中南民族大学法学院热心退伍老兵</div>
            </div>
          </div>

          {/* 第二个卡片：长效法制联系群 */}
          <div className={styles.card}>
            <div className={styles.icon}>💬</div>
            <h2>长效法制联系群</h2>
            <p>扫描下方二维码加入我们的微信交流群。在这里，您可以就任何法律疑问与我们进行即时沟通。</p>
            <div className={styles.qrCodeWrapper}>
              {/* 使用转换后的路径 */}
              <img src={qrCodePath} alt="扫码加入联系群" className={styles.qrCode} />
              <p className={styles.qrText}>扫码加入微信群</p>
            </div>
          </div>

          {/* 第三个卡片：护航手册阅览 */}
          <div className={styles.card}>
            <div className={styles.icon}>📄</div>
            <h2>护航手册阅览</h2>
            <p>点击下方按钮在线阅读《数字人格尊严与隐私安全护航手册》，学习如何防范并应对未经同意传播私密图像的行为。</p>
            {/* 使用转换后的路径 */}
            <a href={pdfPath} target="_blank" rel="noopener noreferrer" className={styles.actionButton}>
              在线阅览手册
            </a>
          </div>

        </div>

        {/* 底部署名 */}
        <footer className={styles.pageFooter}>
          <p>© 2026 武汉大学弘毅学堂“谁的正义”项目组</p>
        </footer>

      </main>
    </Layout>
  );
}