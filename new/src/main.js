// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './vuex'
import MyPlugin from './api'
import md5 from 'js-md5'
import VueCookies from 'vue-cookies'


Vue.use(VueCookies)
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false
Vue.use(MyPlugin, {
  someOption: true
})
router.beforeEach(function(to, from, next) {
  // 登录验证
  if (to.path !== '/login') {
    //	需在登陆页设置loginStatic cookie
    if ($cookies.get('loginStatic')) {
      $cookies.set('loginStatic', "true", {
        expireTimes: 1
      });
      next();
    } else {
      $cookies.remove('loginStatic')
      next('/login');
    };
  } else {
    next();
  };
  if (to.matched.length === 0) { ///未匹配到路由跳转404页面
    location.href = './400/404.html';
  } else {
    next()
  };

});
new Vue({
  el: '#app',
  router,
  data() {
    return {
      websock: null,
      weidu: [],
      flst: [],
      runflst: [],
    }
  },
  store,
  components: {
    App
  },
  template: '<App/>'
})
