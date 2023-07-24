import request from "@/utils/request";
enum API {
    //一级分类接口地址
    C1_URL = '/admin/product/getCategory1'
}

//获取一级分类的接口方法
export const reqC1 = () => request.get<any,any>(API.C1_URL)