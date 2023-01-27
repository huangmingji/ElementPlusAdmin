import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import router from './router'

router.beforeEach(async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: any
) => {
    return next()
})

router.afterEach(() => {
})

/**
 * 判断用户是否有权限访问单个路由
 * roles：用户角色
 * route：访问的路由
 */
const hasPermission = (roles: string[], route: any) => {
    if (route.meta && route.meta.roles) {
      return roles.some((role) => {
        if (route.meta?.roles !== undefined) {
          return route.meta.roles.includes(role)
        } else {
          return false
        }
      })
    } else {
      return true
    }
  }

/**
 * 筛选可访问的动态路由
 * roles：用户角色
 * route：访问的动态列表
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
    const res: RouteRecordRaw[] = []
    routes.forEach((route) => {
      const r = { ...route }
      if (hasPermission(roles, r)) {
        if (r.children) {
          r.children = filterAsyncRoutes(r.children, roles)
        }
        res.push(r)
      }
    })
    return res
  }