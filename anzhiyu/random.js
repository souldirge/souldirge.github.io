var posts=["2025/04/04/Linux 在线练习/","2025/04/06/ps命令简介/","2025/04/04/第一篇文章/","2025/04/04/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };