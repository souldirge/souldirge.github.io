---
title: ps命令简介
cover: https://img.090227.xyz/file/ae62475a131f3734a201c.png
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-04-06 22:31:33
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

`ps` 命令是 Linux 中查看进程信息的常用工具，以下是常用参数及解释，并附带简单示例：

---

### **常用参数及解释**

| 参数 | 说明 |
| --- | --- |
| `-e` 或 `-A` | 显示所有进程（包括其他用户的进程） |
| `-f` | 显示完整格式的进程信息（如 UID、PID、PPID 等） |
| `-u <用户>` | 显示指定用户的进程 |
| `-aux` | 组合参数：显示所有进程（包括无终端的进程），并以用户友好格式输出 |
| `-ef` | 组合参数：显示所有进程的完整信息 |
| `-l` | 显示长格式信息（包含优先级、内存占用等） |
| `-j` | 显示作业信息（包括 PGID、SID） |
| `--forest` | 以树状结构显示进程层级关系 |
| `-p <PID>` | 显示指定 PID 的进程信息 |
| `-o <字段>` | 自定义输出字段（如 `pid,cmd,%mem,%cpu`） |

---

### **简单示例**

1. **查看当前终端下的进程**（默认）：
    
    ```bash
    ps
    
    ```
    
    输出示例：
    
    ```
      PID TTY          TIME CMD
     1234 pts/0    00:00:00 bash
     5678 pts/0    00:00:00 ps
    
    ```
    
2. **查看所有进程（完整格式）**：
    
    ```bash
    ps -ef
    
    ```
    
    输出示例：
    
    ```
    UID        PID  PPID  C STIME TTY          TIME CMD
    root         1     0  0 09:00 ?        00:00:01 /sbin/init
    user      1234  5678  0 09:30 pts/0    00:00:00 bash
    
    ```
    
3. **查看指定用户的进程**：
    
    ```bash
    ps -u root
    
    ```
    
4. **显示进程树状结构**：
    
    ```bash
    ps -ef --forest
    
    ```
    
    输出示例：
    
    ```
    root         1     0  0 09:00 ?        Ss    0:01 /sbin/init
    root       123     1  0 09:00 ?        S     0:00  \\_ /usr/sbin/sshd
    user      456   123  0 09:30 ?        S     0:00      \\_ sshd: user@pts/0
    
    ```
    
5. **自定义输出字段**（显示 PID、命令、CPU 和内存占用）：
    
    ```bash
    ps -eo pid,cmd,%mem,%cpu
    
    ```
    
    输出示例：
    
    ```
      PID CMD                         %MEM %CPU
        1 /sbin/init                   0.1  0.0
     1234 /usr/lib/firefox             5.2  3.1
    
    ```
    
6. **查找特定进程**（如 `nginx`）：
    
    ```bash
    ps -ef | grep nginx
    
    ```
    

---

### **常用组合**

- **快速查看资源占用**：

```bash
ps aux

```

输出包含：`USER`, `PID`, `%CPU`, `%MEM`, `VSZ`（虚拟内存）, `RSS`（物理内存）, `TTY`, `STAT`, `START`, `TIME`, `COMMAND`。

- **按 CPU 或内存排序**（需结合 `sort`）：

```bash
ps aux --sort=-%cpu | head -5  # 显示 CPU 占用前 5 的进程
ps aux --sort=-%mem | head -5  # 显示内存占用前 5 的进程

```

---

### **注意事项**

- `ps` 默认显示当前终端的进程，若需查看所有进程需加 `e` 或 `A`。
- 不同 Linux 发行版可能参数略有差异（如 `ps aux` 在 BSD 风格中常用）。

## ps常常结合grep使用，达到快速查找指定程序进程的目的

`ps` 命令常常配合 `grep` 使用，主要是因为 `ps` 本身输出的进程列表可能非常庞大，而 `grep` 可以帮助快速过滤出我们关心的特定进程。以下是具体原因和常见用法：

---

### **1. 为什么 `ps` 要配合 `grep`？**

### （1）**`ps` 默认输出所有进程，难以直接查找目标**

- `ps -ef` 或 `ps aux` 会列出系统所有进程，可能包含几十甚至上百行信息。
• 手动逐行查找特定进程（如 `nginx`、`java`）效率极低。

### （2）**`ps` 没有内置的关键字过滤功能**

- 虽然 `ps` 支持 `C` 参数按命令名过滤（如 `ps -C nginx`），但：
• 仅匹配精确的命令名，不支持模糊搜索（如 `python3 app.py` 无法用 `C` 直接匹配）。
• 无法同时过滤多个关键词（如同时找 `nginx` 和 `mysql`）。

### （3）**`grep` 提供灵活的关键词过滤**

- 支持正则表达式和模糊匹配。
• 可以组合多个关键词（如 `grep -e "nginx" -e "mysql"`）。
• 结合管道符 `|` 能快速筛选 `ps` 的输出。

---

### **2. 常见用法示例**

### （1）**查找包含特定名称的进程**

```bash
ps aux | grep nginx

```

输出示例：

```
root      1234  0.0  0.5  12345  6789 ?        Ss   10:00   0:00 nginx: master process
www-data  5678  0.0  0.3  12340  5432 ?        S    10:01   0:00 nginx: worker process

```

### （2）**排除 `grep` 自身进程**

```bash
ps aux | grep [n]ginx  # 技巧：正则匹配 "[n]ginx" 会匹配 "nginx" 但不会匹配 "grep nginx"

```

或：

```bash
ps aux | grep nginx | grep -v grep  # 用 -v 反向过滤掉包含 "grep" 的行

```

### （3）**同时匹配多个关键词**

```bash
ps aux | grep -e "python" -e "java"  # 查找 Python 或 Java 进程

```

### （4）**显示进程的完整命令行**

```bash
ps -ef | grep "python.*app.py"  # 匹配运行 app.py 的 Python 进程

```

---

### **3. 替代方案（无需 `grep` 的情况）**

虽然 `grep` 最常用，但某些场景可以直接用 `ps` 参数：

### （1）**按命令名精确匹配**

```bash
ps -C nginx  # 仅显示命令名为 "nginx" 的进程

```

### （2）**按用户过滤**

```bash
ps -u www-data  # 显示用户 www-data 的所有进程

```

### （3）**按进程 ID（PID）过滤**

```bash
ps -p 1234  # 显示 PID 为 1234 的进程

```

---

### **4. 为什么不用 `pgrep`？**

- `pgrep` 是专门用来查找进程 ID 的工具，例如：

```bash
pgrep nginx  # 直接输出 Nginx 的 PID

```

- 但 `pgrep` 功能较简单，无法显示完整进程信息（如 CPU/内存占用），因此复杂场景仍需 `ps + grep`。

---

### **总结**

| 场景 | 推荐命令 |
| --- | --- |
| 快速过滤进程名 | `ps aux |
| 精确匹配命令 | `ps -C <命令名>` 或 `pgrep <命令名>` |
| 排除干扰行 | `ps aux |
| 多关键词过滤 | `ps aux |

**核心原因**：`ps` 负责列出进程，`grep` 负责灵活过滤，两者结合是 Linux 下最通用的进程查找方式。

<div class="video-container">
[up主专用，视频内嵌代码贴在这]
</div>

<style>
.video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 aspect ratio (height/width = 9/16 * 100%) */
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
