import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

const Layout = () => import("@/layout/index.vue");

export const dynamicRoutes = [
  {
    id: "C01",
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: { title: "首页", icon: "" },
    children: [
      {
        id: "R010",
        path: "home",
        name: "home",
        component: () => import("comps/HelloWorld.vue"),
      },
    ],
  },
  {
    id: "C02",
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: { title: "系统管理" },
    children: [
      {
        id: "R020",
        path: "user",
        name: "user",
        meta: { title: "用户列表" },
        component: () => import("views/system/user/index.vue"),
      },
      {
        id: "R021",
        path: "role",
        name: "role",
        meta: { title: "角色列表" },
        component: () => import("views/system/role/index.vue"),
      },
      {
        id: "R022",
        path: "permission",
        name: "permission",
        meta: { title: "权限列表" },
        component: () => import("views/system/permission/index.vue"),
      },
    ],
  },
  {
    id: "C03",
    path: "/result",
    component: Layout,
    redirect: "/result/200",
    meta: { title: "结果页" },
    children: [
      {
        id: "R030",
        path: "200",
        name: "200",
        meta: { title: "成功页" },
        component: () => import("views/result/200.vue"),
      },
      {
        id: "R031",
        path: "404",
        name: "404",
        meta: { title: "404" },
        component: () => import("views/result/404.vue"),
      },
    ],
  },
];

const router = createRouter({
  // createWebHashHistory (hash路由 Hash模式 #)
  // createWebHistory (history路由 HTML5 模式 推荐，需要服务器配置支持)
  // createMemoryHistory 带缓存 history 路由
  // 添加baseUrl，createWebHistory(baseUrl)
  history: createWebHistory(),
  routes: [],
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
