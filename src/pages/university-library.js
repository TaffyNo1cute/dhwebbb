import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../css/university-library.module.css';

// === 我们直接把数据写在同一个文件里，彻底告别导入失败！ ===
const universityData = [
  {
    province: '北京市',
    shortName: '京',
    description: '政治中心，名校云集',
    universities: [
      { name: '北京大学', tag: '北京大学', desc: '燕园' },
      { name: '清华大学', tag: '清华大学', desc: '水木清华' },
      { name: '北京师范大学', tag: '北京师范大学', desc: '学为人师，行为世范' },
    ]
  },
  {
    province: '湖北省',
    shortName: '鄂',
    description: '九省通衢，教育重镇',
    universities: [
      { name: '武汉大学', tag: '武汉大学', desc: '珞珈山人民公园', customLink: '/wuhan-university' },
      { name: '华中科技大学', tag: '华中科技大学', desc: '关山口职业技术学院' },
    ]
  },
  {
    province: '广东省',
    shortName: '粤',
    description: '改革前沿，美食天堂',
    universities: [
      { name: '中山大学', tag: '中山大学', desc: '双鸭山大学' },
      { name: '华南理工大学', tag: '华南理工大学', desc: '五山禅寺' },
      { name: '暨南大学', tag: '暨南大学', desc: '华侨最高学府' },
    ]
  },
  {
    province: '山东省',
    shortName: '鲁',
    description: '齐鲁大地，孔孟之乡',
    universities: [
      { name: '山东大学', tag: '山东大学', desc: '学无止境，气有浩然' },
      { name: '中国海洋大学', tag: '中国海洋大学', desc: '海大' },
    ]
  },
  {
    province: '甘肃省',
    shortName: '甘',
    description: '丝路重镇，黄河明珠',
    universities: [
      { name: '兰州大学', tag: '兰州大学', desc: '自强不息，独树一帜' },
    ]
  },
];
// === 数据区结束 ===

export default function UniversityLibrary() {
  const [selectedProvince, setSelectedProvince] = useState(null);

  const handleProvinceClick = (province) => {
    setSelectedProvince(province);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedProvince(null);
  };

  return (
    <Layout title="院校指北" description="按省份查找大学文章">
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h1>🏛️ 院校索引库</h1>
          <p>先选择省份，再找到你的目标院校</p>
        </div>

        <div className={styles.breadcrumbs}>
          {selectedProvince ? (
            <div>
              <button onClick={handleBack} className={styles.backButton}>
                ← 返回省份列表
              </button>
              <span style={{ margin: '0 10px' }}>/</span>
              <span>{selectedProvince.province}</span>
            </div>
          ) : (
            <span>📍 请选择地区：</span>
          )}
        </div>

        <div className={styles.content}>
          {selectedProvince ? (
            <div className={styles.grid}>
              {(selectedProvince.universities || []).map((uni, idx) => (
                <Link
                  key={idx}
                  to={uni.customLink ? uni.customLink : `/blog/tags/${uni.tag}`}
                  className={styles.card}
                >
                  <div className={styles.uniName}>{uni.name}</div>
                  <div className={styles.uniDesc}>{uni.desc}</div>
                  <div style={{ marginTop: '1rem', color: 'var(--ifm-color-primary)' }}>
                    点击查看文章 →
                  </div>
                </Link>
              ))}
              
              {(!selectedProvince.universities || selectedProvince.universities.length === 0) && (
                <div className={styles.emptyState}>
                  该省份下暂无收录院校
                </div>
              )}
            </div>
          ) : (
            <div className={styles.grid}>
              {(universityData || []).map((item, idx) => (
                <div
                  key={idx}
                  className={styles.card}
                  onClick={() => handleProvinceClick(item)}
                >
                  <div className={styles.provinceName}>{item.province}</div>
                  <div className={styles.provinceDesc}>{item.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}