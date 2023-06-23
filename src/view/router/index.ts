//使用vue-router插件实现模版路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouter } from './routers'
//创建路由器
let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
