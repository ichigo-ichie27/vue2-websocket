# websocket 原理

# 聊天室
  - 前端
    
    1. login
        input username(6) -> localstorage -> enter the chatting room

    2. home
        localstorage -> username / message / id / time -> 后端socket服务

    open
    close
    error
    message 接收广播来的数据    

  - 后端

        接收 -> 消息数据 -> 广播给所有连接到socket服务的客户端

    open
    close
    error
    connection
        message 接收客户端发送的消息数据 -> 广播
