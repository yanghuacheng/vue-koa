<template>
  <div class="top" :class="{active:!$parent.zhankai}">
     <i class="layui-icon layui-icon-app" id="appico" @click="$parent.zhankai = !$parent.zhankai"></i>
     <h5>后台管理系统</h5>

     <div>
       <span>设置</span>
       <ul>
         <li>个人资料</li>
         <li>主题</li>
       </ul>
     </div>
     <p>查看消息  <span class="layui-badge layui-bg-gray" style="height: 16px;">{{$root.weidu.length}}</span></p>
  </div>
</template>

<script>
export default {
  name: 'top',
  data() {
    return {

    };
  },
  created() {},
  methods: {},
  mounted() {}
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../../static/public/css/top.css';
</style>
