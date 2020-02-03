import Vue from 'vue'
import Router from 'vue-router'

import Login from './../views/Login.vue';
import Layout from './../views/Layout.vue';
import GroupList from './../views/GroupList.vue';
import GroupUserList from './../views/GroupUserList.vue'
import Activity from './../views/Activity.vue'
import UserList from './../views/Users/UserList.vue'
import UserDetail from './../views/Users/UserDetail.vue'
import Schools from './../views/Schools/Schools.vue'
import ScloolClass from './../views/Schools/ScloolClass.vue'
import Students from './../views/Schools/Students.vue'
import Grades from './../views/Schools/Grades.vue'
import StudentsList from './../views/StudentsList.vue'
import Test from './../views/Test.vue';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          name: 'GroupList',
          path: '/',
          component: GroupList,
          redirect: '/Schools'
        },
        {
          name: 'GroupUserList',
          path: '/GroupUserList',
          component: GroupUserList
        },
        {
          name: 'Activity',
          path: '/Activity',
          component: Activity
        },
        {
          name: 'UserList',
          path: '/UserList',
          component: UserList
        },
        {
          name: 'UserDetail',
          path: '/UserDetail',
          component: UserDetail 
        },
        {
          name: 'Schools',
          path: '/Schools',
          component: Schools  
        },
        {
          name: 'ScloolClass',
          path: '/ScloolClass',
          component: ScloolClass  
        }, 
        {
          name: 'Students',
          path: '/Students',
          component: Students  
        }, 
        {
          name: 'Grades',
          path: '/Grades',
          component: Grades  
        },
        {
          name: 'StudentsList',
          path: '/StudentsList',
          component: StudentsList  
        },
        {
          name: 'Test',
          path: '/test',
          component: Test
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    }
  ]
})
export default router