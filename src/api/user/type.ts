//定义用户相关数据的ts接口
//用户登陆接口携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

//定义接口返回数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//定义登陆接口返回类型
export interface loginResponseData extends ResponseData {
  data: string
}

//定义获取用户信息接口返回类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
