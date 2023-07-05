//本地存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
//本地获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
//本地删除数据
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
