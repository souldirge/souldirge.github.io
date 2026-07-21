var posts=["2025/04/04/Linux 在线练习/","2026/07/17/纪录片解读-《大国崛起》/","2025/11/24/零成本搭建HEXO博客/","2025/04/06/ps命令简介/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };