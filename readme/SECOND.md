# Vite + TS + AntdV 搭建后台管理系统（二）

> 在[（一）](https://github.com/zptime/shanglv-vite-antdv/blob/main/readme/FIRST.md)的基础上，Antdv 的引入方式选择的是全局引入

## 1. 基础布局搭建

Antdv Layout 布局文档：[https://2x.antdv.com/components/layout-cn](https://2x.antdv.com/components/layout-cn)

在 src 目录下新建 layout/index.vue 文件

```html
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          Bill is a cat.
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from "@ant-design/icons-vue";
  import { defineComponent, ref } from "vue";
  export default defineComponent({
    components: {
      PieChartOutlined,
      DesktopOutlined,
      UserOutlined,
      TeamOutlined,
      FileOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
    },
    data() {
      return {
        collapsed: ref<boolean>(false),
        selectedKeys: ref<string[]>(["1"]),
      };
    },
  });
</script>
<style>
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
  [data-theme="dark"] .site-layout .site-layout-background {
    background: #141414;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
</style>
```

修改 router/index.ts 路由配置

```js
const Layout = () => import("@/layout/index.vue");
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("comps/HelloWorld.vue"),
      },
    ],
  },
];
```

![整体布局效果](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/layout.jpg)

## 2. 模块化改造

> 上面的基础布局都在一个文件中，不便维护和扩展，因此进行模块化改造

改造后，目录如下：

![layout目录结构](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/layout2.jpg)

新建 layout/sider/index.vue 文件

```html
<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
      <a-menu-item key="1">
        <pie-chart-outlined />
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <desktop-outlined />
        <span>Option 2</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>
          <span>
            <user-outlined />
            <span>User</span>
          </span>
        </template>
        <a-menu-item key="3">Tom</a-menu-item>
        <a-menu-item key="4">Bill</a-menu-item>
        <a-menu-item key="5">Alex</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <team-outlined />
            <span>Team</span>
          </span>
        </template>
        <a-menu-item key="6">Team 1</a-menu-item>
        <a-menu-item key="8">Team 2</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="9">
        <file-outlined />
        <span>File</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
  import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  } from "@ant-design/icons-vue";

  import { defineComponent, ref } from "vue";
  export default defineComponent({
    components: {
      PieChartOutlined,
      DesktopOutlined,
      UserOutlined,
      TeamOutlined,
      FileOutlined,
    },
    data() {
      return {
        collapsed: ref<boolean>(false),
        selectedKeys: ref<string[]>(["1"]),
      };
    },
  });
</script>

<style scoped>
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
</style>
```

新建 layout/header/index.vue 文件

```html
<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="() => (collapsed = !collapsed)"
    />
    <menu-fold-outlined
      v-else
      class="trigger"
      @click="() => (collapsed = !collapsed)"
    />
  </a-layout-header>
</template>

<script lang="ts">
  import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    components: {
      MenuUnfoldOutlined,
      MenuFoldOutlined,
    },
    data() {
      return {
        collapsed: ref<boolean>(false),
      };
    },
  });
</script>

<style lang="scss" scoped>
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
</style>
```

新建 layout/footer/index.vue 文件

```html
<template>
  <a-layout-footer style="text-align: center">
    Ant Design ©2018 Created by Ant UED
  </a-layout-footer>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({});
</script>

<style></style>
```

新建 layout/main/index.vue 文件

```html
<template>
  <a-layout-content style="margin: 0 16px">
    <Breadcrumb />
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      Bill is a cat.
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Breadcrumb from "./breadcrumb.vue";

  export default defineComponent({
    components: {
      Breadcrumb,
    },
    data() {
      return {};
    },
  });
</script>

<style></style>
```

新建 layout/main/breadcrumb.vue 文件

```html
<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>User</a-breadcrumb-item>
    <a-breadcrumb-item>Bill</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    data() {
      return {};
    },
  });
</script>

<style></style>
```

修改 layout/index.vue 文件

```html
<template>
  <a-layout style="min-height: 100vh">
    <Sider />
    <a-layout>
      <header />
      <main />
      <footer />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Sider from "./sider/index.vue";
  import Header from "./header/index.vue";
  import Main from "./main/index.vue";
  import Footer from "./footer/index.vue";

  export default defineComponent({
    components: {
      Sider,
      Header,
      Footer,
      Main,
    },
    data() {
      return {};
    },
  });
</script>

<style></style>
```
