import { CategoryObj } from '@/api/product/attr/type'
import { RouteRecordRaw } from 'vue-router'
//定义小仓库数据state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface CategoryState {
  c1Id: string | number,
  c1Arr: CategoryObj[]
}