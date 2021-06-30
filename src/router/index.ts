import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

const Layout = () => import("@/layout/index.vue");

// 通用路由表
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
    component: Layout,
    redirect: "/system/user",
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
    path: "/permission",
    component: Layout,
    name: "permission",
    redirect: "/permission/index",
    meta: { title: "权限测试", icon: "QqOutlined", role: ["admin", "root"] },
    children: [
      {
        path: "index",
        component: { template: "<div>权限测试页</div>" },
        name: "权限测试页",
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
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

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
