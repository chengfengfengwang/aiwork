import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/index'

import Login from './../views/Login.vue';
import Layout from './../views/Layout.vue';
import ClassDetail from './../views/ClassDetail.vue'
import UserList from './../views/UserList.vue'
import ClassInfo from '../views/ClassInfo.vue' 
import OpenClassYinji from '../views/OpenClassYinji.vue'
import OpenClassAi from '../views/OpenClassAi.vue'
import Group from '../views/Group.vue'
import OpenVip from '../views/OpenVip'
import searchVip from '../views/searchVip'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          name: 'ClassDetail',
          path: '/ClassDetail',
          component: ClassDetail
        },
        {
          name: 'UserList',
          path: '/User/UserList',
          component: UserList,  
          meta: { parentMenu: 'User' }
        },
        // {
        //   name: 'ClassInfo',
        //   path: '/',
        //   component: ClassInfo      
        // },
        {
          name: 'OpenClassYinji',
          path: '/',
          component: OpenClassYinji       
        },
        {
          name: 'OpenClassAi',
          path: '/OpenClassAi',
          component: OpenClassAi       
        },
        {
          name: 'Group',
          path: '/User/Group',
          component: Group,
          meta: { parentMenu: 'User' }   
        },
        
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      name: 'OpenVip',
      path: '/OpenVip',
      component: OpenVip,
    },
    {
      name: 'searchVip',
      path: '/searchVip',
      component: searchVip,
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
// router.beforeEach((to, from, next) => {
//   if (to.name == 'Login') {
//     next()
//   } else {
//     if (store.state.userInfo.token) {
//       next()
//     } else {
//       next({
//         path: '/Login'
//       })
//     }
//   }
// })
export default router