import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import {initMenu} from "./api/menu";

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

// router.beforeEach((to, from, next) => {
//   console.log("to "+to.path);
//   if (to.path == '/') {
//     console.log("/ "+to.path);
//     next();
//   }else {
//     if (window.sessionStorage.getItem("user")) {
//       console.log("initMenu "+to.path);
//       initMenu(router, store);
//       next();
//     }else{
//       console.log("redirect "+to.path);
//       next('/?redirect='+to.path);
//     }
//   }
// })

router.beforeEach((to, from, next) => {
  NProgress.start()


    // if (to.path === '/login') {
    //   next({ path: '/' })
    //   NProgress.done()
    // } else {
    //   if (to.path == '/') {
    //     console.log("/ "+to.path);
    //     next();
    //   }else {
        if (window.sessionStorage.getItem("user")) {
          initMenu(router, store);
          /*const roles = 0;
          store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
            // 测试 默认静态页面
            // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })*/

          next();
        } else {
          console.log("no user "+to.path);
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
          // 在免登录白名单，直接进入
          next()
        } else {
          next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
          NProgress.done()
        }
      }

      // }
      // if (store.getters.roles.length === 0) {
      //   // 判断当前用户是否已拉取完user_info信息
      //   store.dispatch('GetInfo').then(res => {
      //     // 拉取user_info
      //     const roles = res.roles
      //     store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
      //     // 测试 默认静态页面
      //     // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
      //       // 根据roles权限生成可访问的路由表
      //       router.addRoutes(accessRoutes) // 动态添加可访问路由表
      //       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
      //     })
      //   })
      //     .catch(err => {
      //       store.dispatch('FedLogOut').then(() => {
      //         Message.error(err)
      //         next({ path: '/' })
      //       })
      //     })
      // } else {
      //   next()
      //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      //   // if (hasPermission(store.getters.roles, to.meta.roles)) {
      //   //   next()
      //   // } else {
      //   //   next({ path: '/401', replace: true, query: { noGoBack: true }})
      //   // }
      //   // 可删 ↑
      // }
    // }
})

router.afterEach(() => {
  NProgress.done()
})
