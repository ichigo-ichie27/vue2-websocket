const Ws = require('ws');

((Ws) => {

    const server = new Ws.Server({ port:8085 });
    
    const init = () => {
        bindEvent();
    }

    function bindEvent(){
        server.on('open',handleOpen);
        server.on('close',handleClose);
        server.on('error',handleError);
        server.on('connection',handleConnection);
    }

    function handleOpen() {
        console.log('server: websocket open');
    }

    function handleClose(){
        console.log('server: websocket close');

    }

    function handleError(){
        console.log('server: websocket error');

    }

    function handleConnection(ws){
        
        console.log('server: websocket connection');

        ws.on('message',handleMessage);

    }

    function handleMessage(msg){
        console.log(msg)
      // 遍历所有的客户端，将接收到的消息广播出去  
      server.clients.forEach((c) => {
          c.send(msg)
      })       
    }

    init();
})(Ws); 