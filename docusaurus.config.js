const config = {
  title: '东华高中毕业生大学指北',
  tagline: '学长学姐的经验分享',
  favicon: 'img/favicon.ico',
  
  url: 'https://TaffyNo1cute.github.io', // 这一行末尾要有逗号
  baseUrl: '/dhwebbb/',                 // 这里必须是小写 b 大写 U，末尾也要有逗号
  
  organizationName: 'TaffyNo1cute',     // 这一行也要有逗号
  projectName: 'dhwebbb',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          // 修改为你的仓库地址
          editUrl: 'https://github.com/TaffyNo1cute/dhwebbb/edit/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: '文章列表',
          blogDescription: '学长学姐的大学生活分享',
          postsPerPage: 10,
          blogSidebarTitle: '最近文章',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  
  themeConfig: {
    navbar: {
      title: '大学指北',
      items: [
        {to: '/blog', label: '📚 文章列表', position: 'left'},
        {to: '/university-library', label: '🏛️ 院校索引', position: 'left'},
        {to: '/blog/tags', label: '🏷️ 标签索引', position: 'left'},
        {to: '/tags-filter', label: '🔍 高级筛选', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '📖 文档说明',
        },
        {
          href: 'https://github.com/TaffyNo1cute/dhwebbb',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {label: '阅读者指南', to: '/docs/reading'},
            {label: '贡献指南', to: '/docs/writing'},
            {label: '开发者指南', to: '/docs/developer'},
            {label: '联系我们', to: '/docs/contact'},
          ],
        },
        {
          title: '快速访问',
          items: [
            {label: '文章列表', to: '/blog'},
            {label: '院校索引', to: '/university-library'},
            {label: '标签索引', to: '/blog/tags'},
            {label: '高级筛选', to: '/tags-filter'},
          ],
        },
        {
          title: '更多',
          items: [
            {label: 'GitHub', href: 'https://github.com/TaffyNo1cute/dhwebbb'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 东华高中毕业生. Built with Docusaurus.`,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },
};

module.exports = config;
