# 开发者指南

欢迎参与 University-Guide 项目！本指南将帮助你了解如何为项目贡献内容和代码。

## 🏗️ 项目架构

### 技术栈

- **框架**：Docusaurus 3.9.2（React 18.2.0）
- **语言**：JavaScript / TypeScript
- **部署**：GitHub Pages + GitHub Actions
- **依赖**：pinyin（拼音转换）、clsx（类名管理）

### 核心功能

1. **博客系统**：Docusaurus 原生博客插件
2. **标签索引**：自定义拼音首字母分类
3. **高级筛选**：React 自定义页面，支持多标签交集
4. **大学图书馆**：基于标签的省份-学校自动分类系统
5. **自动导入**：Webpack require.context 自动扫描文章
6. **动态检测**：无需手动配置，自动识别省份和学校

## 📁 项目结构

```
University-Guide/
├── blog/                     # 文章目录（主要内容）
│   ├── authors.yml          # 作者信息配置
│   └── *.md                 # 文章文件（自动导入）
├── docs/                     # 文档页面
│   ├── reading.md           # 阅读指南
│   ├── writing.md           # 投稿指南
│   ├── developer.md         # 开发者指南（本文档）
│   └── contact.md           # 联系方式
├── src/
│   ├── pages/
│   │   ├── index.jsx            # 首页
│   │   ├── tags-filter.jsx      # 高级标签筛选（自动导入文章）
│   │   ├── university-library.js # 大学图书馆（省份-学校分类）
│   │   └── *.module.css         # 页面样式
│   ├── data/
│   │   └── universityData.js    # 省份基础数据（37个省级行政区）
│   ├── theme/                   # Swizzle 的主题组件
│   │   ├── BlogTagsListPage/    # 标签索引页（拼音分类）
│   │   └── TagsListByLetter/    # 标签列表组件
│   └── css/
│       ├── custom.css           # 全局样式
│       └── university-library.module.css  # 大学图书馆样式
├── static/                   # 静态资源
│   ├── img/                 # 图片资源
│   └── CNAME                # 自定义域名配置
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD 配置
├── docusaurus.config.js      # 站点配置
├── sidebars.js              # 文档侧边栏
├── package.json             # 项目依赖
└── README.md                # 项目说明
```

## 添加新文章

### 1. 文件命名规范

在 `blog/` 目录下创建新的 Markdown 文件，文件名格式：

```
YYYY-MM-DD-省份-学校-序号.md
```

例如：
- `2024-02-03-shandong-sdu-1.md`
- `2024-02-04-guangdong-jnu-1.md`

### 2. 文章头部信息（Frontmatter）

每篇文章必须包含以下头部信息：

```markdown
---
slug: shandong-sdu-1
title: 山大计算机测评
authors: [username]
tags: [山东大学, 计算机, 山东, 青岛校区, 学习生活]
date: 2024-02-03
---

这里是文章摘要，会显示在文章列表中。

<!--truncate-->

这里是文章正文...
```

**字段说明：**
- `slug`: 文章的 URL 路径（唯一标识）
- `title`: 文章标题
- `authors`: 作者用户名数组（需在 authors.yml 中配置）
- `tags`: 标签数组，用于分类和筛选
- `date`: 发布日期

### 3. 添加作者信息

在 `blog/authors.yml` 中添加作者信息：

```yaml
username:
  name: 显示名称
  title: 学校 + 专业
  url: https://个人主页（可选）
  image_url: https://头像链接（可选）
```

例如：
```yaml
meilinamok:
  name: 美丽娜莫克
  title: 山东大学 · 计算机科学与技术
```

### 4. 标签使用规范

**推荐标签类型：**
- 学校名称：山东大学、武汉大学、中山大学
- 省份标签：山东、广东、湖北（必须包含，不要使用城市名）
- 专业类别：计算机、旅游管理、经济学
- 校区位置：青岛校区、珞珈山校区（作为补充信息）
- 主题分类：学习生活、饮食、住宿、保研、就业

**示例：**
```yaml
tags: [武汉大学, 饮食, 生活服务]
```

## 本地开发

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

访问 http://localhost:3000/University-Guide/ 查看效果。

### 构建生产版本

```bash
npm run build
```

生成的静态文件位于 `build/` 目录。

## 大学图书馆功能

项目实现了基于文章标签的省份-学校自动分类系统，位于 `/university-library` 页面。

### 核心特性

1. **全自动检测**：无需手动配置，只需在文章中添加标签
2. **省份识别**：仅匹配去掉后缀的省份名（如：山东、广东、北京）
3. **学校归类**：自动识别第一个标签作为学校名
4. **动态生成**：每次访问页面时实时扫描所有文章
5. **响应式布局**：1-6列自适应网格布局

### 工作原理

```javascript
// 1. 扫描所有博客文章
const context = require.context('../../blog', false, /\.md$/);

// 2. 提取第一个标签作为学校名
const universityName = tags[0];

// 3. 匹配省份（只匹配去掉后缀的省份名）
function matchProvince(tag) {
  // 只有 "山东"、"广东"、"北京" 能识别
  // "山东省"、"鲁" 不会匹配
  // "青岛"、"深圳" 等城市名也不会匹配
}

// 4. 动态生成数据结构
const provinceData = {
  '广东省': {
    universities: {
      '中山大学': [article1, article2],
      '暨南大学': [article3]
    }
  }
};
```

### 省份数据维护

省份基础数据位于 `src/data/universityData.js`：

```javascript
export const allProvinces = [
  { name: '广东省', shortName: '粤', description: '改革开放前沿' },
  { name: '山东省', shortName: '鲁', description: '齐鲁大地' },
  // ... 共 37 个省级行政区
];
```

**添加新省份：**
1. 在 `allProvinces` 数组中添加省份对象
2. 包含 `name`（全称）、`shortName`（简称）、`description`（描述）
3. 系统会自动支持该省份的识别

### 响应式布局

使用 CSS Grid 实现自适应布局：

```css
/* 6 列（大屏） */
@media (min-width: 1600px) {
  grid-template-columns: repeat(6, 1fr);
}

/* 5 列 */
@media (min-width: 1200px) and (max-width: 1599px) {
  grid-template-columns: repeat(5, 1fr);
}

/* ... 递减至 1 列（手机） */
```

## 高级标签筛选功能

项目实现了多标签交集筛选功能，位于 `/tags-filter` 页面。

### 工作原理

用户可以选择多个标签，系统会显示**同时包含所有选中标签**的文章（交集筛选），而不是包含任意标签的文章（并集筛选）。

### 自动导入机制

**重要更新**：项目已实现文章自动导入功能，使用 Webpack 的 `require.context` API：

```javascript
// 自动扫描 blog 目录下的所有 .md 文件
const context = require.context('../../blog', false, /\.md$/);
```

**优势：**
- ✅ 添加新文章时无需手动修改代码
- ✅ 自动提取文章元数据和内容
- ✅ 自动按日期排序

**注意事项：**
- 确保文章文件以 `.md` 结尾
- 文章必须包含有效的 frontmatter
- `authors.yml` 文件会被自动排除

## 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages。

### 部署流程

1. 将代码推送到 `main` 分支
2. GitHub Actions 自动触发构建
3. 构建完成后自动部署到 GitHub Pages

### GitHub Pages 设置

确保仓库的 Settings → Pages 中：
- Source 选择：GitHub Actions
- Branch：gh-pages（自动创建）

## 常见问题

### Q: 如何修改网站标题和描述？

编辑 `docusaurus.config.js` 中的 `title` 和 `tagline` 字段。

### Q: 如何添加新的文档页面？

在 `docs/` 目录下创建 `.md` 文件，然后在 `docusaurus.config.js` 的导航栏配置中添加链接。

### Q: 文章中的图片如何处理？

将图片放在 `static/img/` 目录下，然后在文章中使用：

```markdown
![描述](/University-Guide/img/图片名.png)
```

### Q: 如何自定义样式？

在 `src/css/custom.css` 中添加自定义 CSS 样式。

## 技术栈

- **Docusaurus**: 静态站点生成器
- **React**: UI 框架
- **MDX**: Markdown + JSX
- **GitHub Pages**: 托管平台
- **GitHub Actions**: CI/CD

## 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 自定义域名配置

项目支持自定义域名：

1. **添加 CNAME 文件**：
   - 在 `static/` 目录下创建 `CNAME` 文件
   - 文件内容为你的域名（如：`blog.university-guide.top`）

2. **更新配置**：
   ```javascript
   // docusaurus.config.js
   url: 'https://你的域名',
   baseUrl: '/',
   ```

3. **DNS 配置**：
   - 在域名服务商添加 CNAME 记录指向 `用户名.github.io`

## Swizzle 组件维护

项目使用了 Docusaurus 的 Swizzle 功能自定义主题组件：

**已自定义的组件：**
- `BlogTagsListPage`：标签索引页，添加了拼音分类功能
- `TagsListByLetter`：标签列表组件，按拼音首字母分组

**维护注意事项：**
- 升级 Docusaurus 时需要检查这些组件是否兼容
- 修改组件时要保持与原始 API 的兼容性
- 使用 `npm run swizzle` 查看可自定义的组件

## 依赖管理与版本升级

### 检查过时依赖

```bash
npm outdated
```

### 更新依赖

```bash
# 更新所有次要版本
npm update

# 更新主要版本（谨慎操作）
npm install @docusaurus/core@latest
```

### 升级 Docusaurus

1. 查看 [Docusaurus 更新日志](https://docusaurus.io/changelog)
2. 备份项目
3. 更新相关依赖包
4. 测试自定义组件是否正常工作
5. 更新配置文件（如有 Breaking Changes）

## 环境变量

项目暂不使用环境变量。如需添加：

1. 创建 `.env` 文件（不要提交到 Git）
2. 在 `docusaurus.config.js` 中通过 `process.env` 访问
3. 在 GitHub Actions 中配置 Secrets

## 联系方式

如有问题，请查看 [联系方式](/docs/contact) 页面。

---

感谢你为 University-Guide 项目做出贡献！🎉
