//品牌管理模块接口
import request from '@/utils/request'
//引入品牌接口返回数据类型
import type { TradeMarkResponseData } from './type'
//接口地址
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}
//page:获取第几页
//limit:获取几个已有的品牌数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
