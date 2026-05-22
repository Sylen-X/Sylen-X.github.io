# 用 VitePress 搭建个人博客 —— 完整教程

> 从零开始，手把手教你搭建一个属于自己的个人博客，并免费部署到 GitHub Pages。

---

## 目录

1. [前置准备](#1-前置准备)
2. [创建项目](#2-创建项目)
3. [理解 VitePress 的目录结构](#3-理解-vitepress-的目录结构)
4. [编写配置文件](#4-编写配置文件)
5. [编写首页](#5-编写首页)
6. [添加内容页面](#6-添加内容页面)
7. [本地预览](#7-本地预览)
8. [部署到 GitHub Pages](#8-部署到-github-pages)
9. [添加新文章](#9-添加新文章)
10. [进阶玩法](#10-进阶玩法)

---

## 1. 前置准备

你只需要两样东西：

| 工具 | 用途 |
|------|------|
| **Node.js 18+** | 运行 VitePress 的 JavaScript 运行环境 |
| **VS Code**（或其他编辑器） | 编辑 Markdown 和配置文件 |

检查是否已安装 Node.js：

```bash
node -v   # 应该显示 v18.0.0 或更高
npm -v    # 应该显示 9.0.0 或更高
```

> 如果提示"找不到命令"，去 [nodejs.org](https://nodejs.org/) 下载 LTS 版本安装。

---

## 2. 创建项目

### 2.1 新建文件夹并初始化

```bash
# 创建项目文件夹（名字随意）
mkdir my-blog
cd my-blog

# 初始化 npm 项目，-y 表示全部使用默认值
npm init -y
```

### 2.2 安装 VitePress

```bash
npm install -D vitepress
```

这个命令做了什么？
- `npm install` → 下载包
- `-D` → 安装为开发依赖（只在本地开发时用，部署时不需要）
- `vitepress` → 包名

### 2.3 修改 package.json

打开 `package.json`，确认以下两点：

```json
{
  "type": "module",          // ← 必须有这一行！VitePress 是 ESM 包
  "scripts": {
    "dev": "vitepress dev",      // 启动开发服务器
    "build": "vitepress build",  // 构建静态文件
    "preview": "vitepress preview" // 预览构建结果
  }
}
```

**重点**：`"type": "module"` 必须加，否则构建会报错（VitePress 只支持 ESM 格式）。

---

## 3. 理解 VitePress 的目录结构

```
my-blog/
├── package.json              # 项目配置（依赖、脚本）
├── index.md                  # 首页（网站的"门面"）
├── wiki/                     # 内容目录1（名字随意，对应一个板块）
│   └── index.md
├── log/                      # 内容目录2
│   └── index.md
└── .vitepress/               # VitePress 专用目录（以点开头，隐藏文件夹）
    └── config.ts             # 站点配置（导航、侧边栏、搜索等）
```

**核心规则**：
- **每个 `.md` 文件就是一个页面**。文件路径 = 网址路径。
  - `wiki/index.md` → 访问 `/wiki/`
  - `wiki/frontend.md` → 访问 `/wiki/frontend.html`
- **`.vitepress/config.ts`** 是整站的"控制台"，所有导航、外观、搜索都在这里配置。
- **首页 `index.md`** 使用特殊布局 `layout: home`，有 Hero 大图和 Feature 卡片。

---

## 4. 编写配置文件

创建 `.vitepress/config.ts`：

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  // ===== 站点信息 =====
  title: "我的博客",                    // 浏览器标签上的名称
  description: "这是我的个人博客描述",    // SEO 描述
  base: "/",                           // 部署路径，GitHub Pages 通常为 "/"

  themeConfig: {
    // ===== 顶部导航栏 =====
    nav: [
      { text: "首页", link: "/" },
      { text: "知识库", link: "/wiki/" },
      { text: "记录", link: "/log/" },
    ],

    // ===== 侧边栏 =====
    sidebar: {
      // /wiki/ 路径下的页面共享这个侧边栏
      "/wiki/": [
        {
          text: "知识库",
          items: [
            { text: "总览", link: "/wiki/" },
          ],
        },
      ],
      // /log/ 路径下的页面共享这个侧边栏
      "/log/": [
        {
          text: "记录",
          items: [
            { text: "全部记录", link: "/log/" },
          ],
        },
      ],
    },

    // ===== 社交链接（导航栏右侧图标）=====
    socialLinks: [
      { icon: "github", link: "https://github.com/你的用户名" },
    ],

    // ===== 本地搜索 =====
    search: {
      provider: "local",    // 构建时自动生成索引，无需第三方服务
    },

    // ===== 页脚 =====
    footer: {
      message: "Powered by VitePress",
    },
  },
});
```

> **`sidebar` 的工作原理**：键（`"/wiki/"`）是路径前缀，值是该路径下的菜单。所有 `/wiki/xxx` 的页面共享同一个侧边栏。

---

## 5. 编写首页

`index.md` 是网站的首页，使用 VitePress 内置的 `layout: home`：

```markdown
---
layout: home

hero:
  name: "我的博客"
  text: "在这里，记录我眼中的世界"
  tagline: "The world, through my eyes."
  actions:
    - theme: brand
      text: 开始阅读
      link: /wiki/
    - theme: alt
      text: GitHub
      link: https://github.com/你的用户名

features:
  - icon: 📚
    title: 知识库
    details: 技术笔记、学习资料、踩坑经验的系统整理
    link: /wiki/
  - icon: 📝
    title: 记录
    details: 日常随笔、生活碎片，留住每一个值得纪念的瞬间
    link: /log/
---
```

**理解这段代码**：

- `---` 之间的部分叫 **frontmatter**（YAML 格式），是页面的"元数据"。
- `layout: home` 告诉 VitePress 用首页布局渲染。
- `hero` 是页面顶部的**大标题区**。
  - `name`：主标题（大字，渐变色）
  - `text`：副标题（加粗）
  - `tagline`：标语（灰色小字）
  - `actions`：按钮组，`brand` 是实心主题色，`alt` 是空心
- `features` 是 Hero 下方的**卡片区**，每个卡片有图标、标题、描述和跳转链接。

---

## 6. 添加内容页面

### 知识库首页 `wiki/index.md`

```markdown
# 知识库 📚

这里是我的技术笔记和学习资料整理。

## 文章列表

- [前端开发笔记](./frontend.md)
- [后端学习路线](./backend.md)

::: tip 提示
知识库采用「渐进式整理」——学到什么就记录什么。
:::
```

### 常用 Markdown 语法速查

| 语法 | 效果 |
|------|------|
| `# 一级标题` | 最大标题 |
| `## 二级标题` | 二级标题 |
| `**粗体**` | **粗体** |
| `[文字](链接)` | [文字](链接) |
| `![图片描述](图片地址)` | 插入图片 |
| ` ```js ` 代码块 ` ``` ` | 代码块（指定语言有语法高亮） |
| `- 列表项` | 无序列表 |
| `1. 列表项` | 有序列表 |

### VitePress 扩展语法

```markdown
::: tip 提示
这是一个提示框
:::

::: warning 注意
这是一个警告框
:::

::: info 信息
这是一个信息框
:::
```

---

## 7. 本地预览

```bash
# 启动开发服务器（热更新，改文件自动刷新）
npm run dev

# 或者，先构建再预览（预览正式版本）
npm run build
npm run preview
```

启动后会看到类似输出：

```
  vitepress v1.6.4

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

在浏览器打开 `http://localhost:5173/` 就能看到你的博客。

---

## 8. 部署到 GitHub Pages

### 8.1 创建 GitHub 仓库

1. 在 GitHub 上新建仓库，**仓库名必须是** `你的用户名.github.io`
   - 例如：`Sylen-X.github.io`
   - 这是 GitHub Pages 的命名规则，只有这个名字才能用 `https://用户名.github.io` 直接访问

### 8.2 初始化 Git 并推送

```bash
# 在项目目录中初始化 Git
git init
git add .
git commit -m "初始化博客"

# 关联远程仓库并推送
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git branch -M main
git push -u origin main
```

### 8.3 配置 GitHub Actions 自动部署

在项目中创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]      # 当 main 分支有推送时触发

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - run: npm ci         # 安装依赖

      - run: npm run build  # 构建

      - uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist   # 构建输出目录

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
```

> 推送后去仓库的 **Settings → Pages**，把 Source 设为 **GitHub Actions**。

### 8.4 访问你的博客

等待 Action 运行完成（约 1 分钟），打开 `https://你的用户名.github.io` 就能看到你的博客了！

---

## 9. 添加新文章

### 添加一篇知识库文章

```bash
# 在 wiki 目录下新建一个 .md 文件
touch wiki/frontend.md
```

然后在 `wiki/frontend.md` 中写内容：

```markdown
# 前端开发笔记

这是我的前端学习记录。

## HTML 基础

HTML 是网页的骨架...

## CSS 基础

CSS 负责网页的外观...
```

最后在 `wiki/index.md` 里添加文章链接：

```markdown
## 文章列表

- [前端开发笔记](./frontend.md)    ← 新增这一行
```

同时在 `.vitepress/config.ts` 的 sidebar 中添加对应的侧边栏条目：

```typescript
"/wiki/": [
  {
    text: "知识库",
    items: [
      { text: "总览", link: "/wiki/" },
      { text: "前端笔记", link: "/wiki/frontend" },  // ← 新增
    ],
  },
],
```

保存后，开发服务器会自动刷新。**每次添加新文章，做这三步就够了**：
1. 新建 `.md` 文件
2. 在 `index.md` 中加入链接
3. 在 `config.ts` 中添加侧边栏条目

---

## 10. 进阶玩法

### 自定义主题色

在 `.vitepress/config.ts` 中添加 CSS 变量覆盖：

```css
/* 在 .vitepress/theme/custom.css 中 */
:root {
  --vp-c-brand: #ff6b35;        /* 品牌色 */
  --vp-c-brand-light: #ff8a5c;  /* 品牌色浅色 */
  --vp-c-brand-dark: #e55a2b;   /* 品牌色深色 */
}
```

### 添加评论系统

推荐 **Giscus**（基于 GitHub Discussions，免费、开源）：
1. 安装 [Giscus GitHub App](https://github.com/apps/giscus)
2. 在仓库 Settings 中启用 Discussions
3. 在 Giscus 官网生成配置代码
4. 在 `.vitepress/theme/index.ts` 中注册评论组件

### 添加统计

推荐 **Google Analytics** 或 **Umami**（开源、隐私友好）。

### 绑定自定义域名

1. 购买域名（阿里云、Namecheap 等）
2. 在仓库 `Settings → Pages → Custom domain` 填入域名
3. 在域名 DNS 中添加 CNAME 记录指向 `你的用户名.github.io`

---

## 总结

| 步骤 | 你做了什么 |
|------|-----------|
| `npm init -y` | 创建项目 |
| `npm install -D vitepress` | 安装 VitePress |
| 写 `config.ts` | 配置导航、侧边栏、搜索 |
| 写 `index.md` | 创建首页（Hero + 卡片） |
| 写 `wiki/index.md` `log/index.md` | 创建内容页面 |
| 推送 GitHub + Actions | 自动部署上线 |

**整个流程的核心**：写 Markdown → 配置导航 → 推送到 GitHub → 自动部署。没有数据库，没有后端，没有服务器维护。
