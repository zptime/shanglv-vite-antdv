import * as R from "ramda";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type { App } from "vue";
import store from "store/index";

const Layout = () => import("@/layout/index.vue");

// 通用路由表
// export const constRoutes: Array<RouteRecordRaw> = [
export const constRoutes = [
  {
    path: "/login",
    name: "login",
    component: { template: "<div>登录页</div>" },
    meta: { title: "登录页", hidden: true },
  },
  {
    path: "/404",
    name: "404",
    component: { template: "<div>404页面</div>" },
    meta: { title: "404", hidden: true },
  },
  {
    id: "C01",
    path: "/",
    name: "dashboard",
    component: Layout,
    redirect: "/dashboard",
    meta: { title: "首页", icon: "PieChartOutlined" },
    children: [
      {
        id: "R010",
        path: "dashboard",
        name: "dashboard",
        meta: { title: "首页" },
        component: () => import("comps/HelloWorld.vue"),
      },
    ],
  },
];

// 动态路由表：根据权限加载
export const dynamicRoutes = [
  {
    id: "C02",
    path: "/system",
    name: "system",
    component: Layout,
    meta: { title: "系统管理", icon: "DesktopOutlined", role: ["admin"] },
    children: [
      {
        id: "R020",
        path: "user",
        name: "user",
        meta: { title: "用户列表", icon: "AppstoreOutlined", role: ["admin"] },
        component: () => import("views/system/user/index.vue"),
        children: [
          {
            path: "add",
            name: "userAdd",
            meta: { title: "新增用户", role: ["admin"] },
            component: { template: "<div>新增用户</div>" },
          },
          {
            path: "edit",
            name: "userEdit",
            meta: { title: "编辑用户", role: ["admin"] },
            component: { template: "<div>编辑用户</div>" },
          },
          {
            path: "edit",
            name: "userHidden",
            meta: { title: "隐藏页", role: ["admin"], hidden: true },
            component: { template: "<div>隐藏页</div>" },
          },
        ],
      },
      {
        id: "R021",
        path: "role",
        name: "role",
        meta: { title: "角色列表", icon: "InboxOutlined", role: ["admin"] },
        component: () => import("views/system/role/index.vue"),
      },
      {
        id: "R022",
        path: "permission",
        name: "permission",
        meta: { title: "权限列表", icon: "MailOutlined", role: ["admin"] },
        component: () => import("views/system/permission/index.vue"),
      },
    ],
  },
  {
    id: "C03",
    path: "/result",
    name: "result",
    component: Layout,
    redirect: "/result/200",
    meta: { title: "结果页", icon: "SettingOutlined", role: ["admin"] },
    children: [
      {
        id: "R030",
        path: "200",
        name: "200",
        meta: { title: "成功页", role: ["admin"] },
        component: { template: "<div>200页面</div>" },
        children: [
          {
            path: "200",
            name: "one",
            meta: { title: "成功页1", role: ["admin"] },
            component: { template: "<div>200页面111</div>" },
          }
        ]
      },
      {
        id: "R031",
        path: "500",
        name: "500",
        meta: { title: "失败页", role: ["admin"] },
        component: { template: "<div>500页面</div>" },
      },
    ],
  },
  {
    path: "/components",
    component: Layout,
    name: "components",
    meta: { title: "组件库", icon: "QqOutlined", role: ["admin", "root"] },
    children: [
      {
        path: "table",
        component: { template: "<div>表格展示页</div>" },
        name: "table",
        meta: { title: "表格", role: ["admin", "root"] },
      },
      {
        path: "tree",
        component: { template: "<div>树组件页</div>" },
        name: "tree",
        meta: { title: "树组件", role: ["admin", "root"] },
      },
    ],
  },
  {
    path: "/test",
    name: "test",
    component: Layout,
    redirect: "/test/index",
    meta: { title: "权限测试", icon: "AppstoreOutlined", role: ["admin", "root"] },
    children: [
      {
        path: "index",
        component: { template: "<div>权限测试页</div>" },
        name: "testIndex",
        meta: { title: "权限测试页", role: ["admin", "root"] },
      },
    ],
  },
  // 一定要放在最后，且在动态路由中添加，避免所有页面都被拦截到404
  { path: "/:pathMatch(.*)*", redirect: "/404", meta: { hidden: true } },
];

// createWebHashHistory (hash路由 Hash模式 #)
// createWebHistory (history路由 HTML5 模式 推荐，需要服务器配置支持)
// createMemoryHistory 带缓存 history 路由
const router = createRouter({
  history: createWebHistory(),
  routes: constRoutes,
  // routes: R.concat(constRoutes, dynamicRoutes),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 通过前进后台时才触发
      return savedPosition
    } else {
      // 滚动到顶部
      return { top: 0, behavior: "smooth" }
    }
  },
});

// 路由守卫，进行菜单和权限的处理
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    document.title = `${to.meta.title}`;
  }

  if (to.path === "/login" || to.path === "/register") {
    next();
  } else if (store.getters.routes.length <= 3) {
    // 防止无限循环，要根据条件停止：通用路由表长度3
    store.dispatch("generateRoutes");
    // @ts-ignore
    next({ ...to, replace: true });
  } else {
    next();
  }
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    location.reload()
  }
})

// 删除/重置路由
// getRoutes()：获取一个包含所有路由记录的数组
// hasRoute()：检查路由是否存在
export function resetRoute(): void {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
