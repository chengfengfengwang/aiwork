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
import book415 from '../views/book415.vue'
import AlbumList from '../views/SongList/AlbumList.vue'
import AudioList from '../views/SongList/AudioList.vue'

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
        //导流送书活动415
        {
          name: 'book415',
          path: '/book415',
          component: book415
        }, 
        //歌单
        {
          name: 'AlbumList',
          path: '/AlbumList',
          component: AlbumList
        }, 
        {
          name: 'AudioList',
          path: '/AudioList',
          component: AudioList
        },
        {
      name: 'OpenVip',
      path: '/OpenVip',
      component: OpenVip,
    },
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    
    {
      name: 'searchVip',
      path: '/searchVip',
      component: searchVip,
    }
  ],
})
router.beforeEach((to, from, next) => {
  if (to.name == 'Login' || to.name == 'AlbumList') {
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