import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/index'

import Login from './../views/Login.vue';
import Layout from './../views/Layout.vue';
import ClassList from './../views/ClassList.vue';
import ClassDetail from './../views/ClassDetail.vue'
import Permissions from './../views/Permissions.vue'
import ClassInfo from '../views/ClassInfo.vue'
import Group from '../views/Group.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          name: 'ClassList',
          path: '/',
          component: ClassList
        },
        {
          name: 'ClassDetail',
          path: '/ClassDetail',
          component: ClassDetail
        },
        {
          name: 'Permissions',
          path: '/User/Permissions',
          component: Permissions,  
          meta: { parentMenu: 'User' }
        },
        {
          name: 'ClassInfo',
          path: '/ClassInfo',
          component: ClassInfo      
        },
        {
          name: 'Group',
          path: '/User/Group',
          component: Group,
          meta: { parentMenu: 'User' }   
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {}
    // if (savedPosition) {
    //   console.log(savedPosition)
    //   return false
    // } else {
    //   return {}
    // }
  }
})
router.beforeEach((to, from, next) => {
  if (to.name == 'Login') {
    next()
  } else {
    if (store.state.userInfo.token) {
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  }
})
export default router