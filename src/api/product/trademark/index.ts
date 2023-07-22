//品牌管理模块接口
import request from '@/utils/request'
//引入品牌接口返回数据类型
import type { TradeMark, TradeMarkResponseData } from './type'
//接口地址
enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌接口
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
}
//page:获取第几页
//limit:获取几个已有的品牌数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

//添加与修改已有品牌接口
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  //修改品牌
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  }
  //添加品牌
  else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
