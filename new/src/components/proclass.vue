<template>
  <div class="articlelst prolst">
    <button @click="$router.push('/pro')">+ 添加</button>
    <table>
      <tr>
        <td>ID</td>
        <td>标题</td>
        <td>产品图</td>
        <td>创建时间</td>
        <td>所属栏目</td>
        <td>操作</td>
      </tr>
      <tr v-for="i,index in query">
        <td style="min-width: 100px;">{{i.proid}}</td>
        <td>{{i.title}}</td>
        <td><img style="max-width: 100px;max-height: 40px;" :src="rootpath + i.img" alt=""></td>
        <td>{{i.createdtime}}</td>
        <td>{{i.classid}}</td>
        <td><span @click="$router.push('/pro?type=1&id='+i.proid)">编辑</span>｜<span @click="del(i.proid,index)">删除</span></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'prolst',
  data() {
    return {
      query:[]
    };
  },
  created() {this.getdata();},
  methods: {
    getdata(id) {
      var _this = this;
      this.apiaxio('get', 'http://192.168.188.219:3000/progetdata', null, function(res) {
        // 获取富文本内容
        // console.log(res)
        _this.query = res.data.list;
      });
    },
    del(id,idx){
      var _this = this;
      this.apiaxio('post', 'http://192.168.188.219:3000/prodeldata', {proid:id}, function(res) {
        // 获取富文本内容
        if(res.data.success){
          _this.query.splice(idx,1);
        }
      });
    }
  },
  computed: {},
  mounted() {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../static/public/css/articlelst.css';
</style>
