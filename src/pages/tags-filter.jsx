import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './tags-filter.module.css';

// 使用 require.context 自动导入所有博客文章
function importAllBlogPosts() {
  // 使用 Webpack 的 require.context 自动扫描 blog 目录
  const context = require.context('../../blog', false, /\.md$/);
  const posts = [];
  
  context.keys().forEach((key) => {
    // 排除 authors.yml 等非文章文件
    if (key.endsWith('.md')) {
      try {
        const module = context(key);
        if (module.metadata) {
          posts.push({
            metadata: module.metadata,
            Preview: module.default,
          });
        }
      } catch (error) {
        console.error(`Failed to load blog post: ${key}`, error);
      }
    }
  });
  
  // 按日期降序排序
  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date);
    const dateB = new Date(b.metadata.date);
    return dateB - dateA;
  });
}

// 构建文章列表（自动导入）
const allBlogPosts = importAllBlogPosts();

export default function TagsFilter() {
  const { siteConfig } = useDocusaurusContext();
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [searchInput, setSearchInput] = useState('');

  // 获取所有标签
  const allTags = useMemo(() => {
    const tagsMap = new Map();
    
    allBlogPosts.forEach(post => {
      const tags = post.metadata?.tags || [];
      tags.forEach(tag => {
        const tagLabel = tag.label || tag.name || tag;
        if (tagLabel) {
          const count = tagsMap.get(tagLabel) || 0;
          tagsMap.set(tagLabel, count + 1);
        }
      });
    });

    return Array.from(tagsMap.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // 切换标签选择
  const toggleTag = (tagLabel) => {
    setSelectedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tagLabel)) {
        newSet.delete(tagLabel);
      } else {
        newSet.add(tagLabel);
      }
      return newSet;
    });
  };

  // 清除所有选择
  const clearAll = () => {
    setSelectedTags(new Set());
  };

  // 添加自定义标签
  const addCustomTag = () => {
    const trimmedTag = searchInput.trim();
    if (trimmedTag) {
      setSelectedTags(prev => {
        const newSet = new Set(prev);
        newSet.add(trimmedTag);
        return newSet;
      });
      setSearchInput(''); // 清空输入框
    }
  };

  // 处理回车键
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addCustomTag();
    }
  };

  // 筛选文章（交集）
  const filteredPosts = useMemo(() => {
    if (selectedTags.size === 0) {
      return allBlogPosts;
    }

    return allBlogPosts.filter(post => {
      const tags = post.metadata?.tags || [];
      const postTags = tags.map(t => t.label || t.name || t);
      return Array.from(selectedTags).every(tag => postTags.includes(tag));
    });
  }, [selectedTags]);

  return (
    <Layout
      title="高级标签筛选"
      description="通过多标签交集筛选文章">
      <div className="container margin-vert--lg">
        <div className={styles.filterContainer}>
          <div className={styles.header}>
            <h1>🔍 高级标签筛选</h1>
            <p>选择多个标签，查看同时包含所有标签的文章（交集筛选）</p>
          </div>

          {/* 已选标签显示区域 */}
          {selectedTags.size > 0 && (
            <div className={styles.selectedTagsContainer}>
              <div className={styles.selectedHeader}>
                <strong>已选标签 ({selectedTags.size})：</strong>
                <button 
                  className={styles.clearButton}
                  onClick={clearAll}>
                  清除所有
                </button>
              </div>
              <div className={styles.selectedTags}>
                {Array.from(selectedTags).map(tag => (
                  <span key={tag} className={styles.selectedTag}>
                    {tag}
                    <button
                      className={styles.removeButton}
                      onClick={() => toggleTag(tag)}
                      title="移除此标签">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 自定义标签搜索 */}
          <div className={styles.searchSection}>
            <h2>🔎 手动输入标签</h2>
            <p className={styles.hint}>💡 输入标签名称后按回车或点击添加按钮</p>
            <div className={styles.searchBox}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="输入标签名称，如：计算机、保研..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className={styles.addButton}
                onClick={addCustomTag}
                disabled={!searchInput.trim()}>
                添加标签
              </button>
            </div>
          </div>

          {/* 所有标签列表 */}
          <div className={styles.tagsSection}>
            <h2>所有标签 ({allTags.length})</h2>
            <p className={styles.hint}>💡 点击标签进行筛选（可多选）</p>
            <div className={styles.tagsList}>
              {allTags.map(({ label, count }) => (
                <button
                  key={label}
                  className={clsx(styles.tagButton, {
                    [styles.tagButtonSelected]: selectedTags.has(label)
                  })}
                  onClick={() => toggleTag(label)}>
                  {label} <span className={styles.tagCount}>({count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* 筛选结果 */}
          <div className={styles.resultsSection}>
            <h2>
              {selectedTags.size === 0 
                ? `所有文章 (${filteredPosts.length})`
                : `筛选结果 (${filteredPosts.length})`}
            </h2>
            
            {filteredPosts.length === 0 ? (
              <div className={styles.noResults}>
                <p>😔 没有找到同时包含所有选中标签的文章</p>
                <p>试试减少一些标签，或者清除重新选择</p>
              </div>
            ) : (
              <div className={styles.postsList}>
                {filteredPosts.map(post => {
                  const { metadata } = post;
                  const tags = metadata.tags || [];
                  
                  return (
                    <article key={metadata.permalink} className={styles.postCard}>
                      <h3>
                        <a href={metadata.permalink}>
                          {metadata.title}
                        </a>
                      </h3>
                      <div className={styles.postMeta}>
                        <time dateTime={metadata.date}>
                          {new Date(metadata.date).toLocaleDateString('zh-CN')}
                        </time>
                        {metadata.authors?.length > 0 && (
                          <>
                            <span className={styles.separator}>•</span>
                            <span>{metadata.authors[0].name}</span>
                          </>
                        )}
                      </div>
                      {metadata.description && (
                        <p className={styles.postDescription}>
                          {metadata.description}
                        </p>
                      )}
                      <div className={styles.postTags}>
                        {tags.map((tag, idx) => {
                          const tagLabel = tag.label || tag.name || tag;
                          return (
                            <span key={tagLabel || idx} className={styles.postTag}>
                              {tagLabel}
                            </span>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
