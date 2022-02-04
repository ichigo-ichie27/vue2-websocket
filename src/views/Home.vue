<template>
  <div class="home">
    <ul>
      <li v-for="item of msgList"
        :key="item.id"
      >
      <div>
        <span>{{ item.username }}</span>
        <span>{{ new Date(item.dateTime) }}</span>
      </div>
      <p>{{ item.msg }}</p>
      </li>
    </ul>

    <input placeholder="please enter message" v-model="msg" />
    <button @click="sendMsgBtn">send</button>
  </div>
</template>

<script>
const ws  = new WebSocket("ws:localhost:8085");

export default {
  name: 'Home',
  data(){
    return{
      msg:'',
      username:'',
      msgList:[]
    }
  },
  mounted(){
    this.username = localStorage.getItem("username");
    if(!this.username){
      this.$router.push("/login");
      return;
    }

    // 将websocket事件绑定到外部事件 
    ws.addEventListener('open',this.handleWsOpen.bind(this),false);
    ws.addEventListener('close',this.handleWsClose.bind(this),false);
    ws.addEventListener('error',this.handleWsError.bind(this),false);
    ws.addEventListener('message',this.handleWsMessage.bind(this),false);
  },
  methods:{
    // 发送消息按钮
    sendMsgBtn(){
      const msg = this.msg;
      if(!msg.trim().length){
        return;
      }
      const msgs = {
        id:new Date().getTime(),
        username:this.username,
        dateTime:new Date().getTime(),
        msg:this.msg
      }
      ws.send(JSON.stringify(msgs));
      this.msg = '';
    },
    handleWsOpen(e){
      console.log('client: websocket open',e);
    
    },
    handleWsClose(e){
      console.log('client: websocket close',e);

    },
    handleWsError(e){
      console.log('client: websocket error',e);
    },
    handleWsMessage(e){
      const msgs = JSON.parse(e.data);
      this.msgList.push(msgs);
    }
  }
}
</script>
