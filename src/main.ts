import { createApp } from 'vue'
import App from '@/App.vue'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
//配置element-plus国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg配置入口文件
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components'
//引入模版的全局样式
import '@/styles/index.scss'
//引入路由
import router from './router'
//引入pinia
import pinia from './store'
//引入路由鉴权
import './permission'
//获取应用实例对象
const app = createApp(App)
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})
//安装自定义插件
app.use(globalComponent)
app.use(router)
app.use(pinia)
//将应用挂载到挂载点
app.mount('#app')
