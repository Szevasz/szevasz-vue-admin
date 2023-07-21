//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
//引入数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { constantRouter } from '@/router/routers'
//创建用户小仓库
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRouter, //仓库存储生成菜单需要数组(路由)
      username: '',
      avatar: '',
    }
  },
  //异步逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      //登陆请求
      let result: loginResponseData = await reqLogin(data)
      console.log(result)
      //登陆请求：成功200->token
      //登陆请求：失败201->登陆失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia/vuex存储数据其实利用js对象
        this.token = result.data as string
        //本地存储持久化存储一份
        // localStorage.setItem('TOKEN', result.data as string)
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息的方法
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      //如果获取用户信息成功,存储用户信息
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登陆
    async userLogout() {
      //退出登陆请求
      let result: any = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
