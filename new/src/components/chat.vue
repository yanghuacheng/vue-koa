<template>
  <div class="chat app-cont">
    <ul>
        <li v-for="i in jilu" :class="{ other: !i.type }">
          <p>用户名:{{ i.name }}</p>
          内容:{{ i.message }}
        </li>
    </ul>

    <textarea id="textarea" v-model="text" name=""></textarea>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
      yidu:[],
      text:''
    };
  },
  created() {},
  methods: {},
  computed: {
    jilu(){
      var _this = this;
      var list = this.$root.weidu;
      var nowid = this.$route.query.id;
      _this.yidu = $cookies.get('yidu' + $cookies.get('nowinfo').id + nowid)?JSON.parse($cookies.get('yidu' + $cookies.get('nowinfo').id + nowid)):[];
      function del(list){
        for (var i in list){
          var o = list[i];
          if(o.id == nowid){
            o.name = _this.$route.query.username;
            _this.yidu.push(o);
            list.splice(i,1);
            del(list);
            break;
          }
        }
      };
      del(list);
      // if(!list) {$cookies.remove('weidu');return _this.yidu;}
      $cookies.set('weidu', JSON.stringify(list), { expireTimes: 10 });
      $cookies.set('yidu' + $cookies.get('nowinfo').id + nowid, JSON.stringify(_this.yidu), { expireTimes: 10 });
      return _this.yidu;
    }
  },
  mounted() {

    // this.$root.asd = 123
    var _this = this;
    var nowid = this.$route.query.id;
    // Web Socket 已连接上，使用 send() 方法发送数据
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        _this.$root.websock.send(_this.text);
        _this.yidu.push({id:$cookies.get('nowinfo').id,message:_this.text,type:true,name:_this.$route.query.username});
        $cookies.set('yidu' + $cookies.get('nowinfo').id + nowid, JSON.stringify(_this.yidu), { expireTimes: 10 });
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../static/public/css/chat.css';
</style>
