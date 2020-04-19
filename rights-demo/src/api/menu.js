import request from '@/utils/request'
import {getRequest} from "@/utils/api";

// 获取路由
export const getRouters = () => {
  // return request({
  //   url: '/getRouters',
  //   method: 'get'
  // })
  return request({
    url: '/system/config/menu',
    method: 'get'
  })
}
export const initMenu = (router, store) => {
  if (store.getters.menu_routes.length > 0) {
    return;
  }
  getRequest("/system/config/menu").then(data => {
    console.log("then(data ");
    console.log(data);
    if (data) {
      let fmtRoutes = formatRoutes(data);
      router.addRoutes(fmtRoutes);
      store.commit('initRoutes', fmtRoutes);
    }
  })
}
export const formatRoutes = (routes) => {
  let fmRoutes = [];
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children,
      component(resolve) {
        if (component.startsWith("index")) {
          require(['../layout/' + component + '.vue'], resolve);
        } else if (component.startsWith("Emp")) {
          require(['../views/emp/' + component + '.vue'], resolve);
        } /*else if (component.startsWith("Per")) {
          require(['../views/per/' + component + '.vue'], resolve);
        } else if (component.startsWith("Sal")) {
          require(['../views/sal/' + component + '.vue'], resolve);
        } else if (component.startsWith("Sta")) {
          require(['../views/sta/' + component + '.vue'], resolve);
        } */else if (component.startsWith("Sys")) {
          require(['../views/sys/' + component + '.vue'], resolve);
        } else if (component.startsWith("system")) {
          require(['@/views/' + component + '.vue'], resolve);
        }
      }
    }
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}

