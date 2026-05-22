/**
 * VitePress 配置文件
 * ================
 * 这是整个博客的"控制中心"——所有导航、侧边栏、搜索等功能都在这里配置。
 *
 * 核心概念：
 * - nav:      顶部导航栏（桌面端显示为一行链接，移动端折叠为汉堡菜单）
 * - sidebar:  侧边栏（每个路径 `/wiki/` `/log/` 可以有独立的侧边栏结构）
 * - themeConfig: 主题相关配置（外观、社交链接、搜索、页脚等）
 */

import { defineConfig } from "vitepress";

export default defineConfig({
  // ============ 站点元数据 ============
  // title: 浏览器标签页上显示的名称，也是导航栏左侧的站点标题
  title: "Sylen-X の博客",

  // description: SEO 描述，搜索引擎会显示这段文字
  description: "在这里，记录我眼中的世界",

  // base: 站点部署的根路径。GitHub Pages 上通常设为 "/仓库名/"，
  // 如果你绑定自定义域名则为 "/"。此处假设使用用户名.github.io，默认根路径为 "/"
  base: "/",

  // cleanUrls: 设为 true 时，URL 省略 .html 后缀（需要服务器/Pages 配置支持）
  // 此项目保持 VitePress 默认值 false
  cleanUrls: false,

  // ============ 主题配置 ============
  themeConfig: {
    // ---- 顶部导航栏 ----
    // 每个对象 { text: 显示文字, link: 跳转路径 }
    // link 路径对应 .md 文件路径，省略 .md 后缀
    nav: [
      { text: "首页", link: "/" },
      { text: "知识库", link: "/wiki/" },
      { text: "记录", link: "/log/" },
    ],

    // ---- 侧边栏 ----
    // 键（key）是路径前缀，值是该路径下显示的侧边栏菜单
    // 同一个路径前缀下的所有页面共享一个侧边栏
    sidebar: {
      "/wiki/": [
        {
          // 分组标题
          text: "知识库 📚",
          items: [
            { text: "总览", link: "/wiki/" },
            { text: "博客搭建教程", link: "/wiki/搭建教程" },
          ],
        },
      ],
      "/log/": [
        {
          text: "记录 📝",
          items: [
            { text: "全部记录", link: "/log/" },
            // 示例子页面，按需添加
            // { text: "2026年5月", link: "/log/2026-05" },
          ],
        },
      ],
    },

    // ---- 社交链接 ----
    // 显示在导航栏右侧的图标链接，VitePress 内置了 GitHub / Twitter 等图标
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Sylen-X",
      },
    ],

    // ---- 本地搜索 ----
    // 构建时自动生成搜索索引，用户按 Ctrl+K 唤起搜索框
    // 不需要任何第三方服务，完全离线可用
    search: {
      provider: "local",
    },

    // ---- 页脚 ----
    footer: {
      message: "Powered by VitePress · Sylen-X's Blog",
      // copyright: "© 2026 Sylen-X",  // 可选：版权信息行
    },
  },

  // markdown 相关配置（预留，可按需调整）
  // markdown: {
  //   lineNumbers: true,  // 代码块显示行号
  // },
});
