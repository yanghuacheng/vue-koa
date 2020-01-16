<template>
  <div class="logbox">
  <div class="login">
         <div class="l-left">
             <img src="../../static/public/images/dgbg.jpg" alt="">
         </div>
         <div class="l-right">
             <img src="../../static/public/images/deltop.png" alt="">
             <input type="text" v-model="ques.name" placeholder="请输入用户名">
             <input type="password" v-model="ques.password" placeholder="请输入用户密码" @keyup.enter="check()">
             <button @click="check()">注册</button>
             <router-link to="/login" style="display: block;margin:20px auto;">去登录</router-link>
             <p style=" padding-top: 15px;">@2019 阳阳得以有限公司 版权所有</p>
         </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      newtype:false,
      ques:{
          name:'',
          password:''
      }
    };
  },
  created() {},
  methods: {
    check(){
      if(!this.ques.name){
          this.showmsg('用户名不能为空',true);
          return;
      };
      if(!this.ques.password){
          this.showmsg('密码不能为空',true);
          return;
      };
      this.apiaxio('POST',this.rootpath + '/registe',{username:this.ques.name,pass:this.$md5(this.ques.password)},function(data){
        window.location.href = '#/login'
      })
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 @import "../../static/public/css/login.css";
</style>
