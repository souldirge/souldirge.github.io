---
title: 零成本搭建HEXO博客
cover: https://img.090227.xyz/file/ae62475a131f3734a201c.png
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-11-24 16:41:00
updated:
tags:
categories:
keywords:
description:
top:
top_img:
comments:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
ai:
---

# 【Hexo 博客系列】零成本搭建个人博客

主题分类: 网络工具
录入日期: 2025年11月24日 13:59
ID: 34
关键字: HEXO 个人博客 Github Cloudflare
网络链接: https://blog.cmliussss.com/p/HexoBlogNo1/

本文详细介绍了如何使用 Hexo 框架搭建一个个人博客，并将其部署到 GitHub Pages 和 Cloudflare Pages 上。主要内容包括：

- 环境准备：安装 Node.js 和 Git
- 配置 Git 和 GitHub：设置 SSH 密钥，创建 GitHub 仓库
- 初始化 Hexo 项目：安装 Hexo，创建新博客
- 部署到 GitHub Pages：配置部署设置，推送静态文件
- 部署到 Cloudflare Pages：连接 GitHub 仓库，自动部署
- 基本使用方法：创建新文章，本地预览，发布更新

这个教程适合那些想要快速搭建个人博客，但又不想花费太多成本的人。通过使用 Hexo、GitHub 和 Cloudflare 的免费服务，您可以轻松创建一个高效、简洁的博客网站。

## 1. 事前准备

1. 域名（**非必须**，你也可以使用免费域名，或者`GitHub.io`或`Pages.dev`分配的域名也可以）
2. [GitHub](https://github.com/)（**必须**，你需要注册一个 GitHub 帐号）
3. [Cloudflare](https://dash.cloudflare.com/)（**非必须**，你需要注册一个 Cloudflare 帐号，这样你就可以将博客部署在 CF 的 CDN 里加速，但是你也可以直接使用`GitHub.io`分配的域名）

## 2. 软件支持

1. [Node](https://blog.cmliussss.com/p/HexoBlogNo1/#2-1-%E5%AE%89%E8%A3%85-Node)（**必须**）
2. [Git](https://blog.cmliussss.com/p/HexoBlogNo1/#2-2-%E5%AE%89%E8%A3%85-Git)（**必须**）
3. [VSCode](https://code.visualstudio.com/)（**非必须**，这是一款轻量型的代码编辑器，可以帮助你养成一个很好的编程习惯）

### 2.1. 安装 Node

1. 打开 Node 官网，下载和自己系统相配的 Node 的安装程序，否则会出现安装问题。下载地址：[https://nodejs.org/en](https://nodejs.org/en)
2. 下载后安装，安装的目录可以使用默认目录`C:/Program Files/nodejs/`
3. 安装完成后，检查是否安装成功。在键盘按下 win + R 键，输入 CMD，然后回车，打开 CMD 窗口，执行`node -v`命令，看到版本信息，则说明安装成功。
   
    ![](https://img.090227.xyz/file/5ca2f549a4489064d3444.jpg)
    
4. 修改 npm 源。npm 下载各种模块，默认是从国处服务器下载，速度较慢，建议配置成华为云镜像源。打开 CMD 窗口，运行如下命令:
   
    ```
    npm config set registry https://mirrors.huaweicloud.com/repository/npm/
    ```
    

### 2.2. 安装 Git

1. 进入官网下载适合你当前系统的 Git：[https://git-scm.com/downloads](https://git-scm.com/downloads)
   
    ![](https://img.090227.xyz/file/14b9fdf14c49320e531fb.jpg)
    
2. 下载后傻瓜式安装 Git 即可，安装的目录最好使用默认目录`C:/Program Files/Git`
3. 点击电脑左下角开始即可看见`Git CMD`、`Git Bash`、`Git GUI`。
    - `Git CMD` 是 windows 命令行的指令风格
    - `Git Bash` 是 linux 系统的指令风格（建议使用）
    - `Git GUI`是图形化界面（新手学习不建议使用）

## 3. 配置 Git 密钥并连接至 Github

常用 Git 命令

```
git config -l  //查看所有配置
git config --system --list //查看系统配置
git config --global --list //查看用户（全局）配置
```

![](https://img.090227.xyz/file/f403664b22ad3488a5fb4.jpg)

### 3.1. 配置用户名和邮箱

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

通过`git config -l` 检查是否配置成功。

![](https://img.090227.xyz/file/67dca39142021e2214e2b.jpg)

### 3.2. 配置公钥连接 Github

1. 执行以下命令生成 ssh 公钥，此公钥用于你的计算机连接 Github
   
    ```
    ssh-keygen -t rsa -C "你的邮箱"
    ```
    
    提示`Enter file in which to save the key`直接**一路回车**即可，新手小白不推荐设置密钥
    
    ![](https://img.090227.xyz/file/45d70737c64caeb4393ad.jpg)
    
    之后打开 C 盘下用户文件夹下的. ssh 的文件夹，会看到以下文件
    
2. 将 SSH KEY 配置到 GitHub
   
    进入 github，点击右上角头像 选择`settings`，进入设置页后选择 `SSH and GPG keys`，名字随便起，公钥填到`Key`那一栏。
    
    ![](https://img.090227.xyz/file/75fc281237bfc6751a295.jpg)
    
    ![](https://img.090227.xyz/file/993edae3bbca9489dc156.jpg)
    
    ![](https://img.090227.xyz/file/fa8a7628c285e6be5c0a4.png)
    
    ![](https://img.090227.xyz/file/f3fa79cf3d639ef2d5bcb.png)
    
3. 测试连接，输入以下命令
   
    ```
    ssh -T git@github.com
    ```
    
    第一次连接会提示`Are you sure you want to continue connecting (yes/no/[fingerprint])?`，输入`yes`即可
    
    ![](https://img.090227.xyz/file/faa0077eeab8c82f1de9e.png)
    
    出现连接到账户的信息，说明已经大功告成，至此完成了环境准备工作。
    
    ![](https://img.090227.xyz/file/faa0077eeab8c82f1de9e.png)
    

### 3.3. 创建 GitHub.io 仓库

1. 点击右上角的`+`按钮，选择 **New repository**，创建一个`<用户名>.github.io`的仓库。
2. 仓库名字的格式必须为：`<用户名>.github.io` (注意：前缀必须为用户名，此为预览博客需要，后期可修改仓库名)
3. 可见性必须选择 `Public` 方便第一次部署检查问题，点击 **Creat repository** 进行创建即可
   
    ![](https://img.090227.xyz/file/3d9274644460cd1ffeb26.png)
    

## 4. 初始化 Hexo 博客

1. 创建一个文件夹来保存博客源码（我这里选的路径为`D:/Hexo-Blog`），在文件夹内右键鼠标，选择`Open Git Bash here`
   
    ![](https://img.090227.xyz/file/f78e04406dc803d610538.png)
    
2. 在`Git BASH`输入如下命令安装 Hexo
   
    ```bash
    npm install -g hexo-cli && hexo -v
    ```
    
    ![](https://img.090227.xyz/file/808bff9b7ab5b13fcd200.png)
    
3. 安装完后输入`hexo -v`验证是否安装成功。
   
    ![](https://img.090227.xyz/file/17349517f78516f7ac8ff.png)
    
4. 初始化 Hexo 项目安装相关依赖。
   
    ```
    hexo init blog-demo
    cd blog-demo
    npm i
    ```
    
    ![](https://img.090227.xyz/file/1c130d7beed537111d448.png)
    
5. 初始化项目后，`blog-demo`有如下结构：
   
    ![](https://img.090227.xyz/file/74128294708705e22e188.png)
    
- **node_modules**：依赖包
- **scaffolds**：生成文章的一些模板
- **source**：用来存放你的文章
- **themes**：主题
- **.npmignore**：发布时忽略的文件（可忽略）
- **_config.landscape.yml**：主题的配置文件
- **config.yml**：博客的配置文件
- **package.json**：项目名称、描述、版本、运行和开发等信
1. 输入`hexo cl && hexo s`启动项目
   
    ![](https://img.090227.xyz/file/e8c930919bb49270bde5a.png)
    
2. 打开浏览器，输入地址：[http://localhost:4000/](http://localhost:4000/) ，看到下面的效果，说明你的博客已经构建成功了。
   
    ![](https://img.090227.xyz/file/e285037815104f68f4514.jpg)
    

## 5. 将静态博客挂载到 GitHub Pages

1. 安装 hexo-deployer-git
   
    ```
    npm install hexo-deployer-git --save
    ```
    
2. 修改 `_config.yml` 文件
   
    在 blog-demo 目录下的_config.yml，就是整个 Hexo 框架的配置文件了。可以在里面修改大部分的配置。详细可参考官方的[配置描述](https://hexo.io/zh-cn/docs/configuration)。
    
    修改最后一行的配置，将 repository 修改为你自己的 github 项目地址即可，还有分支要改为`main`代表主分支（注意缩进）。
    
    ```bash
    deploy:
      type: git
      repository: git@github.com:cmliussss2024/cmliussss2024.github.io.git
      branch: main
    ```
    
3. 修改好配置后，运行如下命令，将代码部署到 GitHub（Hexo 三连）。
   
    ```bash
    // Git BASH终端
    hexo clean && hexo generate && hexo deploy
    
    // 或者
    
    // VSCODE终端
    hexo cl; hexo g; hexo d
    ```
    
- **hexo clean**：删除之前生成的文件，可以用`hexo cl`缩写。
- **hexo generate**：生成静态文章，可以用`hexo g`缩写
- **hexo deploy**：部署文章，可以用`hexo d`缩写*注意：deploy 时可能要你输入 username 和 password。*
  
    ![](https://img.090227.xyz/file/18b052b831896bf00cfc4.jpg)
    

如果出现 **Deploy done**，则说明部署成功了。

![](https://img.090227.xyz/file/93a5d61648491a5278556.jpg)

稍等两分钟，打开浏览器访问：[https://cmliussss2024.github.io](https://cmliussss2024.github.io/) ，这时候我们就可以看到博客内容了。

![](https://img.090227.xyz/file/1239b1270fcdc8bd896a6.jpg)

## 6. 将静态博客挂载到 Cloudflare Pages

1. 在 `Workers 和 Pages` 中选择 `Pages` 的 `连接到 Git`
   
    ![](https://img.090227.xyz/file/b3eae4e84c4c7c31af665.jpg)
    
    ![](https://img.090227.xyz/file/440581264cb313ed77e75.jpg)
    
2. 然后登录你 Blog 仓库对应的 GitHub 帐号
   
    ![](https://img.090227.xyz/file/733c0a673bb66670b7ca1.jpg)
    
    ![](https://img.090227.xyz/file/8fb282e32991167a98f57.jpg)
    
3. 点击`保存并部署`后等待部署完成即可。
   
    ![](https://img.090227.xyz/file/60cca5e2200e260327227.jpg)
    
4. 提示`成功！您的项目已部署到以下区域：全球`后，浏览器访问：[https://cmliussss2024-github-io.pages.dev](https://cmliussss2024-github-io.pages.dev/) ，这时候我们就可以看到博客内容了。
   
    ![](https://img.090227.xyz/file/0f2a697243725c6fa2ab8.jpg)
    
    *这时你也就可以将你的`<用户名>.github.io`的仓库设置为`Private`私库了*
    
5. 如果你有自己的域名，你可以在这里绑定你自己的自定义域，即可
   
    ![](https://img.090227.xyz/file/2c9ce4b9b67c09376bb91.jpg)
    

## 7. 博客文章发布

### 7.1 新建一篇博文

```
hexo new 这是一篇新的博文
```

然后用文本编辑器去编辑`_posts/这是一篇新的博文.md`里的内容即可，注意要使用 **Markdown** 格式书写。

详细使用方法可以查阅 [https://hexo.io/zh-cn/docs/writing](https://hexo.io/zh-cn/docs/writing)

### 7.2 本地部署

编辑完文章保存后可以使用如下命令，生成本地页面 [http://localhost:4000/](http://localhost:4000/) ，进行预览

```bash
// Git BASH终端
hexo cl && hexo s

// 或者

// VSCODE终端
hexo cl; hexo s
```

### 7.3 推送至Github仓库

确认无误后使用以下命令，将本地文章推送至 GitHub 仓库即可

```bash
// Git BASH终端
hexo cl && hexo g && hexo d

// 或者

// VSCODE终端
hexo cl; hexo g; hexo d
```
