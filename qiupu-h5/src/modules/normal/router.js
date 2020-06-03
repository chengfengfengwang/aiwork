import Vue from 'vue'
import Router from 'vue-router'


const home = () => import('./src/index.vue')
const qiupu_me = () => import('./src/qiupu/me.vue')
const qiupu_apply = () => import('./src/qiupu/apply.vue')
const qiupu_list = () => import('./src/qiupu/list.vue')
//const qiupu_test = () => import('./src/qiupu/test.vue')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/qiupu_me',
      name: 'qiupu_me',
      component: qiupu_me
    },
    {
      path: '/qiupu_apply',
      name: 'qiupu_apply',
      component: qiupu_apply
    },
    {
      path: '/qiupu_list',
      name: 'qiupu_list',
      component: qiupu_list
    },
    // {
    //   path: '/qiupu_test',
    //   name: 'qiupu_test',
    //   component: qiupu_test
    // }
  ]
})
