//用户管理模块的接口
import request from '@/utils/request'
import type { User, UserResponseData } from './type'
//枚举地址
enum API {
  //获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
}
//获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)
//添加用户与更新已有用户的接口
export const reqAddOrUpdateUser = (data: User) => {
  //携带参数有ID更新
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
