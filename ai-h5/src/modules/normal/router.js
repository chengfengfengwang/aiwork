import Vue from 'vue'
import Router from 'vue-router'


const jxj_home = () => import('./src/jxj_ac/index.vue')
const jxj_ingroup = () => import('./src/jxj_ac/inGroup.vue')
const jxj_success = () => import('./src/jxj_ac/success.vue')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/jxj_home',
      name: 'jxj_home',
      component: jxj_home
    },
    {
      path: '/jxj_ingroup',
      name: 'jxj_ingroup',
      component: jxj_ingroup
    },
    {
      path: '/jxj_success',
      name: 'jxj_success',
      component: jxj_success
    }
  ] 
})
