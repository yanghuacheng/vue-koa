<template>
  <div class="articles">
    <h5>新增文章</h5>
    <div class="form">
      <div>
        <span>标题</span>
        <p><input type="text" v-model="query.title" /></p>
      </div>
      <div>
        <span>作者</span>
        <p><input type="text" v-model="query.author" /></p>
      </div>
      <div>
        <span>描述</span>
        <p><input type="text" v-model="query.descs" /></p>
      </div>
      <div id="content">
        <span>文章内容</span>
        <div id="cont"><script id="editor" type="text/plain" style="width:1024px;height:400px;"></script></div>
      </div>

      <div>
        <span>所属分类</span>
        <p>
          <select name="" id="" v-model="query.columns">
            <option value="0">所属分类</option>
            <option value="1">所属分类</option>
            <option value="2">所属分类</option>
          </select>
        </p>
      </div>
      <div>
        <span>缩略图</span>
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
  name: 'articles', //捆绑类名
  data() {
    return {
      Ue: {},
      query: {
        artid: '',
        title: '',
        content: '',
        columns: '',
        descs: '',
        author: '',
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
      var cont = this.Ue.getContent();
      var type = 'set';
      _this.query['artid'] = this.$route.query.id;
      if (id == 0) {
        type = 'add';
        delete _this.query['artid'];
      }
      this.query.content = cont;
      if (!_this.query.img) {
        _this.showmsg('请选择缩略图', true);
        return;
      }
      this.apiaxio('post', 'http://localhost:3000/setdata?type=' + type, _this.query, function(res) {
        if (res.data.success) {
          _this.showmsg('操作成功！');
          _this.$router.push('/articlelst');
        }
      });
    },
    getdata: function(id) {
      var _this = this;
      this.apiaxio('get', 'http://localhost:3000/getdata?id=' + id, null, function(res) {
        if (res.data.success) {
          _this.query = res.data.list[0];
          _this.Ue.ready(function() {
              //设置编辑器的内容
              _this.Ue.setContent( _this.query.content);
          });
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
        url = 'http://localhost:3000' + url;
      }
      return url;
    }
  },
  computed: {},
  mounted() {
    var _this = this;
    UE.delEditor('editor');
    this.Ue = UE.getEditor('editor', {
      serverUrl: 'http://localhost:3000/controller',
      autoHeightEnabled: false,
      toolbars: [
        [
          'anchor', //锚点
          'undo', //撤销
          'redo', //重做
          'bold', //加粗
          'indent', //首行缩进
          // 'snapscreen', //截图
          'italic', //斜体
          'underline', //下划线
          'strikethrough', //删除线
          'subscript', //下标
          'fontborder', //字符边框
          'superscript', //上标
          // 'formatmatch', //格式刷
          // 'source', //源代码
          // 'blockquote', //引用
          'pasteplain', //纯文本粘贴模式
          // 'selectall', //全选
          'print', //打印
          // 'preview', //预览
          'horizontal', //分隔线
          // 'removeformat', //清除格式
          'time', //时间
          'date', //日期
          'unlink', //取消链接
          // 'insertrow', //前插入行
          // 'insertcol', //前插入列
          // 'mergeright', //右合并单元格
          // 'mergedown', //下合并单元格
          'deleterow', //删除行
          'deletecol', //删除列
          'splittorows', //拆分成行
          'splittocols', //拆分成列
          'splittocells', //完全拆分单元格
          'deletecaption', //删除表格标题
          // 'inserttitle', //插入标题
          // 'mergecells', //合并多个单元格
          // 'deletetable', //删除表格
          'cleardoc', //清空文档
          'insertparagraphbeforetable', //"表格前插入行"
          // 'insertcode', //代码语言
          'fontfamily', //字体
          'fontsize', //字号
          'paragraph', //段落格式
          // 'simpleupload', //单图上传
          'insertimage', //多图上传
          'edittable', //表格属性
          'edittd', //单元格属性
          'link', //超链接
          'emotion', //表情
          'spechars', //特殊字符
          'searchreplace', //查询替换
          // 'map', //Baidu地图
          // 'gmap', //Google地图
          'insertvideo', //视频
          // 'help', //帮助
          'justifyleft', //居左对齐
          'justifyright', //居右对齐
          'justifycenter', //居中对齐
          'justifyjustify', //两端对齐
          'forecolor', //字体颜色
          'backcolor', //背景色
          'insertorderedlist', //有序列表
          'insertunorderedlist', //无序列表
          'fullscreen', //全屏
          'directionalityltr', //从左向右输入
          'directionalityrtl', //从右向左输入
          'rowspacingtop', //段前距
          'rowspacingbottom', //段后距
          // 'pagebreak', //分页
          // 'insertframe', //插入Iframe
          'imagenone', //默认
          'imageleft', //左浮动
          'imageright', //右浮动
          'attachment', //附件
          'imagecenter', //居中
          // 'wordimage', //图片转存
          'lineheight', //行间距
          'edittip ', //编辑提示
          // 'customstyle', //自定义标题
          'autotypeset', //自动排版
          // 'webapp', //百度应用
          'touppercase', //字母大写
          'tolowercase', //字母小写
          'background', //背景
          // 'template', //模板
          // 'scrawl', //涂鸦
          'music' //音乐
          // 'inserttable', //插入表格
          // 'drafts', // 从草稿箱加载
          // 'charts', // 图表
        ]
      ]
    });
  },
  destroyed() {
    //销毁后，第一次和切换路由后都能加载出来
    this.Ue.destroy();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../static/public/css/article.css';
</style>
