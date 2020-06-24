import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const DEBUG = process.env.NODE_ENV !== "production";

const moduleName = "admin";

let basePath = "/";

if (!DEBUG) {
  basePath = basePath + moduleName; // 例：/page_1
}

const routes = [
  {
    path: `/${moduleName}`,
    redirect: { name: 'home' }
  },
  {
    path: `/${moduleName}/home`,
    name: 'home',
    component: () => import('./views/home.vue')
  },
  {
    path: `/${moduleName}/element-ui-dialog/:id/:name`,
    name: 'element-ui-dialog',
    component: () => import('./views/element-ui-dialog.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: basePath,
  routes
})

export default router
