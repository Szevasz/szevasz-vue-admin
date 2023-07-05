//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
//引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN} from '@/utils/token'
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
    async userLogin(data: loginForm) {
      //登陆请求
      let result: loginResponseData = await reqLogin(data)
      //登陆请求：成功200->token
      //登陆请求：失败201->登陆失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia/vuex存储数据其实利用js对象
        this.token = result.data.token as string
        //本地存储持久化存储一份
        localStorage.setItem('TOKEN', result.data.token as string)
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    //获取用户信息的方法
    async userInfo() {
      let result = await reqUserInfo()
      //如果获取用户信息成功,存储用户信息
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      }
    },
    //退出登陆
    userLogout(){
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    }
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
