//对外暴露常量路由
export const constantRouter = [
    {
        path:'/login',
        component:() => import('@/view/login/index.vue'),
        name:'login' //命名路由
    },
    {
        path:'/',
        component:() => import('@/view/home/index.vue'),
        name:'layout' 
    },
    {
        path:'/404',
        component:() => import('@/view/404/index.vue'),
        name:'404'
    },
    {
        path:'/:pathMatch(.*)*',
        redirect:'/404',
        name:'any'
    }
]