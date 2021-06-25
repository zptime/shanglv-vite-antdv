# Vite + TS + AntdV 搭建后台管理系统（三）

## 完善sider菜单组件

### 新增多个路由菜单

### 功能完善

### 侧边菜单收起和打开

## 完善header头部组件

### breadcrumb（面包屑）组件

### tags（导航标签）组件

## 1. 基础配置

### VSCode 2021 git bash 配置

旧版VScode 的 git bash 终端配置如下：

```json
"terminal.integrated.shell.windows": "D:\\Program Files\\Git\\bin\\bash.exe"
```

当VSCode升级至1.57.1(2021.6.17)时，会出现警告提示：此项已弃用，配置默认 shell 的新推荐方法是在 `#terminal.integrated.profiles.windows#` 中创建一个终端配置文件，并将其配置文件名称设置为 `#terminal.integrated.defaultProfile.windows#` 中的默认值。此操作当前将优先于新的配置文件设置，但将来会发生更改。

![警告截图](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/bash-old.jpg)

新版配置如下：

![git bash配置](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/bash.jpg)

VSCode 官方配置文档：[https://code.visualstudio.com/docs/editor/integrated-terminal#\_configuration](https://code.visualstudio.com/docs/editor/integrated-terminal#_configuration)

### ramda 安装

官方文档：[https://ramdajs.com/](https://ramdajs.com/)

```bash
npm install ramda
```

错误提示：无法找到模块“ramda”的声明文件。“e:/MyRemote/shanglv-vite-antdv/node_modules/ramda/src/index.js”隐式拥有 "any" 类型。尝试使用 `npm i --save-dev @types/ramda` (如果存在)，或者添加一个包含 `declare module 'ramda';` 的新声明(.d.ts)文件

```bash
# ts支持
npm install --save-dev types/npm-ramda#dist
```

## 新增多个路由菜单

### 修改router/index.ts文件

```js

```

### 新增路由相关页面

```html
// system/permission/index.vue
// system/role/index.vue
// system/user/index.vue

<template>
  <div>permission 权限列表</div>
</template>

<script>
export default {};
</script>

<style>
</style>
```

## 完善sider菜单组件

### ant design icon安装及配置

官方文档：[https://2x.antdv.com/components/icon-cn](https://2x.antdv.com/components/icon-cn)
Github地址：[https://github.com/ant-design/ant-design-icons/tree/master/packages/icons-vue](https://github.com/ant-design/ant-design-icons/tree/master/packages/icons-vue)

```bash
npm install --save @ant-design/icons-vue
```

使用icon图标

```vue
<template>
  <div>
    <MailOutlined />
    <PieChartOutlined />
    </div>
</template>

<script lang="ts">
import {
  PieChartOutlined,
  MailOutlined
} from "@ant-design/icons-vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    PieChartOutlined,
    MailOutlined,
  },
});
</script>

<style scoped>
</style>
```

问题：找不到模块“ant-design/icons/lib/outline/xxx”或其相应的类型声明。

### Menu 导航菜单动态取值

官方文档之单文件递归菜单：[https://2x.antdv.com/components/menu-cn](https://2x.antdv.com/components/menu-cn)


用户登录
  ↓
  - 成功
    ↓
    - 把用户信息保存至vuex
    - 把用户信息保存至localStorage
    - 用addRutes动态添加路由并跳转至首页
  ↓
  - 失败
    ↓
    - 继续登录

拦截路由变化
  ↓
  - 判断vuex中是否有用户信息
    ↓
    - 有用户信息
      ↓
      - 验证token
        ↓
        - token验证通过
          ↓
          - 跳转路由
        ↓
        - token验证不通过
          ↓
          - 跳转登录页面
    ↓
    - 没有用户信息
      ↓
      - 判断localStorage中是否有用户信息
        ↓
        - 有用户信息
          ↓
          - 验证token
            ↓
            - token验证通过
              ↓
              - 获取localStorage用户信息
                ↓
                - 设置vuex中的用户信息
                ↓
                - 重新设置用户路由
            ↓
            - token验证不通过
              ↓
              - 跳转登录页面
        ↓
        - 没有用户信息
          ↓
          - 跳转登录
