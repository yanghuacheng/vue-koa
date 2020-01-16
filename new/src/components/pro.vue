<template>
  <div class="articles pros">
    <h5>产品编辑</h5>
    <div class="form">
      <div>
        <span>标题</span>
        <p><input type="text" v-model="query.title" /></p>
      </div>
      <div>
        <span>描述</span>
        <p><input type="text" v-model="query.descs" /></p>
      </div>
      <div>
        <span>所属分类</span>
        <p>
          <select name="" id="" v-model="query.classid">
            <option value="0">所属分类</option>
            <option value="1">所属分类</option>
            <option value="2">所属分类</option>
          </select>
        </p>
      </div>
      <div>
        <span>产品图</span>
        <p>
          <input type="file" id="file" @change="changeimg()" />
          <img :src="reurl(query.img)" alt="" />
        </p>
      </div>
      <button v-if="$route.query.type" @click="setdata(1)">保存</button>
      <button v-else @click="setdata(0)">添加</button>
    </div>
  </div>
</template>

<script>
import axio from 'axios';
export default {
  name: 'pro', //捆绑类名
  data() {
    return {
      query: {
        proid: '',
        title: '',
        classid: '',
        descs:'',
        img: ''
      }
    };
  },
  created() {
    var _this = this;
    if (this.$route.query.type) {
      this.getdata(this.$route.query.id);
    }
  },
  methods: {
    setdata: function(id) {
      var _this = this;
      var type = 'set';
      _this.query['proid'] = this.$route.query.id;
      if (id == 0) {
        type = 'add';
        delete _this.query['proid'];
      }
      if (!_this.query.img) {
        _this.showmsg('请选择产品图', true);
        return;
      }
      this.apiaxio('post', 'http://192.168.188.219:3000/prosetdata?type=' + type, _this.query, function(res) {
        if (res.data.success) {
          _this.showmsg('操作成功！');
          _this.$router.push('/prolst');
        }
      });
    },
    getdata: function(id) {
      var _this = this;
      this.apiaxio('get', 'http://192.168.188.219:3000/progetdata?id=' + id, null, function(res) {
        if (res.data.success) {
          _this.query = res.data.list[0];
        }
      });
    },
    changeimg: function() {
      var _this = this;
      var files = document.getElementById('file');
      var file = files.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); // 读出 base64
      reader.onloadend = function(e) {
        var dataURL = e.target.result; //base64
        _this.query.img = dataURL;
      };
    },
    reurl(url) {
      if (url.indexOf('base64') == -1) {
        url = 'http://192.168.188.219:3000' + url;
      }
      return url;
    }
  },
  computed: {},
  mounted() {
    var _this = this;
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../static/public/css/article.css';
@import '../../static/public/css/pro.css';
</style>
