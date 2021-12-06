// 路由表
export const routes = [
  { id: "R000", path: "home", component: () => import("comps/HelloWorld.vue") },
  { id: "R001", path: "login", component: { template: "<div>登录页</div>" } },
  { id: "R002", path: "404", component: { template: "<div>404页面</div>" } },
  { id: "R003", path: "user", component: () => import("views/system/user/index.vue") },
  { id: "R004", path: "user/add", component: { template: "<div>用户新增页</div>" } },
  { id: "R005", path: "user/edit", component: { template: "<div>用户编辑页</div>" } },
  { id: "R006", path: "user/detail", component: { template: "<div>用户详情页</div>" } },
  { id: "R007", path: "role", component: () => import("views/system/role/index.vue"), },
  { id: "R008", path: "permission", component: () => import("views/system/permission/index.vue"), },
  { id: "R009", path: "menu", component: () => import("views/system/permission/index.vue"), },
  { id: "R010", path: "depart", component: { template: "<div>部门管理</div>" }},
  { id: "R011", path: "form", component: { template: "<div>表单</div>" }},
  { id: "R012", path: "table", component: { template: "<div>表格</div>" }},
  { id: "R013", path: "tree", component: { template: "<div>树</div>" }},
];

// 权限表
export const permissions = [
  // 一级菜单
  { id: "C01", meta: { title: "首页", icon: "PieChartOutlined", order: 1 } },
  { id: "C02", meta: { title: "系统管理", icon: "DesktopOutlined", order: 2 } },
  { id: "C03", meta: { title: "组织管理", icon: "SettingOutlined", order: 3 } },
  { id: "C04", meta: { title: "产品管理", icon: "QqOutlined", order: 4 } },
  { id: "C05", meta: { title: "错误管理", icon: "MailOutlined", order: 5 } },

  // 二级菜单
  { id: "R001", meta: { title: "账号管理", icon: "QqOutlined", pid: "C02" } },
  { id: "R002", meta: { title: "角色管理", icon: "QqOutlined", pid: "C02" } },
  { id: "R003", meta: { title: "菜单管理", icon: "QqOutlined", pid: "C02" } },
  { id: "R004", meta: { title: "用户管理", icon: "QqOutlined", pid: "C03" } },
  { id: "R005", meta: { title: "部门管理", icon: "QqOutlined", pid: "C03" } },
  { id: "R006", meta: { title: "产品列表", icon: "QqOutlined", pid: "C04" } },
  { id: "R007", meta: { title: "产品类别", icon: "QqOutlined", pid: "C04" } },
  { id: "R008", meta: { title: "成功页", icon: "QqOutlined", pid: "C05" } },
  { id: "R009", meta: { title: "失败页", icon: "QqOutlined", pid: "C05" } },
];

// 前端路由表：（id,path,components）
// - 通用路由表（登陆页，404页，首页）
// - 动态路由表（剩余其他页）

// 路由权限表：（id，meta）
// - 路由（id）
// - 权限（meta：title，icon，pid，order，hidden）

// 菜单表：
