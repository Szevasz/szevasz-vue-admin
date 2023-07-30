import request from '@/utils/request'
import type { AttrResponseData, CategoryResponseData } from './type'
enum API {
  //一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  //二级分类接口地址
  C2_URL = '/admin/product/getCategory2/',
  //三级分类接口地址
  C3_URL = '/admin/product/getCategory3/',
  //商品基础属性接口地址
  ATTR_URL = '/admin/product/attrInfoList/',
  //添加或修改已有的属性的接口地址
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo/',
}

//获取一级分类的接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
//获取二级分类的接口方法
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
//获取三级分类的接口方法
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
//获取对应分类下的已有属性与属性值接口
export const reqAttr = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )
//添加或新增已有属性接口方法
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
