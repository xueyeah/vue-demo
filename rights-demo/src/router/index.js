import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },

    {
      path: '/redirect',
      component: Layout,
      hidden: true,
      children: [
        {
          path: '/redirect/:path(.*)',
          component: () => import('@/views/redirect')
        }
      ]
    },
    {
      path: '/',
      hidden: true,
      component: () => import('@/views/login')
    },{
      path: '/login',
      hidden: true,
      component: () => import('@/views/login')
    }/*,{
      path: '/home',
      component: () => import('@/views/home'),
      hidden:true,
      children:[
        {
          path: '/chat',
          name: '在线聊天',
          component: () => import('@/views/chat/FriendChat'),
          hidden:true
        }
      ]
    }*/
  ]
export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

