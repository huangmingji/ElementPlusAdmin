import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const constantRoutes:Array<RouteRecordRaw> = [
    {
        path: '/account/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: '登录',
            hidden: true
        }
    },
    {
        path: '/',
        name: 'home',
        redirect: '/dashboard',
        meta: {
            title: '首页',
            hidden: true
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: {
            title: '首页',
            hidden: true,
        }
    }
]

export const asyncRoutes:Array<RouteRecordRaw> = []

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
  });
export default router;