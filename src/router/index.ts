import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";
import store from "store/index";
import { constRoutes } from "./constantRoutes";
import { dynamicRoutes } from "./dynamicRoutes";
export { constRoutes, dynamicRoutes };

const router = createRouter({
  history: createWebHistory(), // history路由
  routes: constRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // 通过前进后台时才触发
    } else {
      return { top: 0, behavior: "smooth" }; // 滚动到顶部
    }
  },
});

// 路由守卫：进行菜单和权限的处理
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    document.title = `${to.meta.title}`;
  }

  if (to.path === "/login" || to.path === "/register") {
    next();
  } else if (store.getters.routes.length <= 3) {
    // 防止无限循环，要根据条件停止：通用路由表长度3
    store.dispatch("generateRoutes");
    next({ ...to, replace: true });
  } else {
    next();
  }
});

// 错误处理
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    location.reload();
  }
});

// 删除/重置路由
export function resetRoute(): void {
  // getRoutes()：获取一个包含所有路由记录的数组
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      // hasRoute()：检查路由是否存在
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// 注册路由
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
