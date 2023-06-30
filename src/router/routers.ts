//对外暴露常量路由
export const constantRouter = [
  {
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      title: '登陆',  //路由标题
      hidden: true,  //代表路由标题在菜单中是否隐藏
      icon: "Promotion"  //菜单文字左侧图标，支持element-plus图标
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'layout',  //路由标题
      hidden: false,
      icon: 'Avatar'
    },
    children: [
      {
        path: '/home',
        component: () => import('@/view/home/index.vue'),
        meta: {
          title: '首页', //路由标题
          hidden: false,
          icon: 'HomeFilled'
        }
      },
    ]
  },
  {
    path: '/404',
    component: () => import('@/view/404/index.vue'),
    name: '404',
    meta: {
      title: '404',  //路由标题
      hidden: true,
      icon: 'DocumentDelete'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意路由',  //路由标题
      hidden: true,
      icon: 'DataLine'
    }
  },
]
