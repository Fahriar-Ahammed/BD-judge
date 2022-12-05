import { route } from 'quasar/wrappers'
import {createRouter, createMemoryHistory, createWebHistory, createWebHashHistory} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'hash' ? createWebHistory : createWebHashHistory)


  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })


  Router.beforeEach((to,from,next)=> {
    let roles = localStorage.getItem("role");
    if (to.path.substring(1,7) === "admin/") {
      console.log("Role : "+roles)
      if(roles != null && roles === 'admin' ){
        next()
      }else{
        next({
          path: '/admin-login',
          params: { nextUrl: to.fullPath }
        })
      }
    }else if(to.path.substring(1,5) === "user"){
      if(roles != null && roles === 'user' ){
        next()
      }else{
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      }
    }else{
      next()
    }
    })
  return Router
})
