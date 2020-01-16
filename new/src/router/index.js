import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import registe from '@/components/registe'
import index from '@/components/index'
import chat from '@/components/chat'
import article from '@/components/article'
import articlelst from '@/components/articlelst'
import prolst from '@/components/prolst'
import pro from '@/components/pro'
import proclass from '@/components/proclass'

Vue.use(Router)
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
    {
      path: '/registe',
      name: 'registe',
      component: registe
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    {
      path: '/articlelst',
      name: 'articlelst',
      component: articlelst
    },
    {
      path: '/prolst',
      name: 'prolst',
      component: prolst
    },
    {
      path: '/pro',
      name: 'pro',
      component: pro
    },
    {
      path: '/proclass',
      name: 'proclass',
      component: proclass
    }
  ]
})
