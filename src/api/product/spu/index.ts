//SPU管理模块接口
import request from '@/utils/request'
import { HasSpuResponseData } from './type'
enum API {
  //获取已有的SPU数据
  HASSPU_URL = '/admin/product/',
}

//获取某一三级分类下的数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
