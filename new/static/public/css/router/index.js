import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import registe from '@/components/registe'
import index from '@/components/index'
import chat from '@/components/chat'

Vue.use(Router)
console.log(index)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    ,
    {
      path: '/registe',
      name: 'registe',
      component: registe
    }
  ]
})
