<template>
  <div class="about">
   <input v-model="username" placeholder="please enter username" />
   <button @click="handleEnterChattingRoom">enter chatting room</button>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data(){
    return{
      username:'',
    }
  },
  mounted(){
    const username = localStorage.getItem("username");
    if(username){
      this.$router.push("/");
      return;
    }
  },  
  methods:{
    handleEnterChattingRoom(){
      const username = this.username.trim();
      if(username.length < 6){
        alert("用户名不能小于6位");
        return;
      }
      localStorage.setItem("username",username);
      this.$router.push("/");
    }
  }

}
</script>