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
               <button @click="check()">登录</button>
               <router-link to="/registe" style="display: block;margin:20px auto;">去注册</router-link>
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
  created() {
    this.$store.state.nowinfo = null;
    $cookies.remove('nowinfo');
  },
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
      var _thiss = this;
      this.apiaxio('POST',this.rootpath + '/login',{username:this.ques.name,pass:this.$md5(this.ques.password)},function(data){
        if(!data.data.success) return  _thiss.showmsg(data.data.info,true);
        $cookies.set('loginStatic',"true",{expireTimes:1});
        $cookies.set('nowinfo',JSON.stringify(data.data.lst[0]),{expireTimes:1});
        _thiss.getweb(_thiss);
        _thiss.$router.push('/index');
      });

    }
  },
  mounted() {
    $cookies.remove('nowinfo');
    $cookies.remove('loginStatic');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 @import "../../static/public/css/login.css";
</style>
