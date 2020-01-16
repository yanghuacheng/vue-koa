<template>
  <div class="left" :class="{active:!$parent.zhankai}">
    <div>
      <img src="../../../static/public/images/deltop.png" alt="" />
      <p>{{$cookies.get('nowinfo')?$cookies.get('nowinfo').username:''}}</p>
    </div>
    <ul>
      <li :class="{ active: status == 1 }">
        <span @click="isrun(1)">
          <i class="layui-icon layui-icon-group"></i>
          用户管理
        </span>
        <dl>
          <dd><router-link to="/">权限管理</router-link></dd>
          <dd><router-link to="/">用户编辑</router-link></dd>
        </dl>
      </li>
      <li :class="{ active: status == 2 }">
        <span @click="isrun(2)">
          <i class="layui-icon layui-icon-group"></i>
          好友列表
        </span>
        <dl>
          <dd v-for="i in guolu" :class="{error:!i.type}" v-if="i.id != $cookies.get('nowinfo').id">
            <router-link :to="'/chat?id' + '=' + i.id + '&username=' + i.username">{{ i.username }} <span>{{i.num}}</span></router-link>
          </dd>
        </dl>
      </li>
      <li :class="{ active: status == 3 }">
        <span @click="isrun(3)">
          <i class="layui-icon layui-icon-group"></i>
          文章管理
        </span>
        <dl>
          <dd><router-link to="/articlelst">文章列表</router-link></dd>
          <dd><router-link to="/">栏目</router-link></dd>
        </dl>
      </li>
      <li :class="{ active: status == 4 }">
        <span @click="isrun(4)">
          <i class="layui-icon layui-icon-group"></i>
          产品管理
        </span>
        <dl>
          <dd><router-link to="/prolst">产品列表</router-link></dd>
          <dd><router-link to="/proclass">产品类别</router-link></dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'left',
  data() {
    return {
      status: 0
    };
  },
  created() {console.log(this.$parent.zhankai)},
  methods: {
    isrun(num) {
      if (!this.status || this.status != num) {
        this.status = num;
      } else {
        this.status = 0;
      }
    }
  },
  computed: {
    guolu() {
      // if(!this.$store.state.flst.length || !this.$store.state.runflst.length) return [];
      for (var i in this.$root.flst) {
        var o = this.$root.flst[i];
        var type = false;
        for(var k in this.$root.runflst){
          var ok = this.$root.runflst[k];
          if (ok == o.id) {
            type = true;
          }
        };
        if(type){
          this.$root.flst[i].type = true
        }else{
          this.$root.flst[i].type = false
        };
        var num = 0;
        for(var is in this.$root.weidu){
          var io = this.$root.weidu[is];
           if(io.id == o.id){
             num ++;
           }
        }
        this.$root.flst[i].num = num;
      }
      return this.$root.flst;
    },
    msg(){
      return this.$root.msg
    }
  },
  mounted() {},

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../../static/public/css/left.css';
</style>
