<template>
  <div id="app">
    <top />
    <left />
    <div class="center">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import top from '@/components/public/top';
import left from '@/components/public/left';
export default {
  name: 'App',
  data() {
    return {
      zhankai:true
    };
  },
  components: {
    top,
    left
  },
  created() {
    if ($cookies.get('loginStatic')) {
      this.getweb(this);
    }
  },
  methods: {},
  mounted() {
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
* {
  margin: 0;
  padding: 0;
}
.center {
  width: calc(100% - 165px);
  height: calc(100% - 60px);
  position: fixed;
  z-index: 1;
  top: 60px;
  left: 180px;
  overflow-y: scroll;
}
</style>
