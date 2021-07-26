# Vite + TS + AntdV 搭建后台管理系统（五）

> 完善 header 头部功能

## 1. 完善 breadcrumb 面包屑组件

### 修改 breadcrumb 位置

将 breadcrumb 面包屑组件从 layout/main 中移到 layout/header 中

（1）修改 layout/main/index.vue

```html
<template>
  <a-layout-content style="margin: 0 16px">
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

  export default defineComponent({
    data() {
      return {};
    },
  });
</script>

<style></style>
```

（2）修改 layout/header/index.vue

```html

```

（3）修改 layout/header/breadcrumb.vue

```html

```

## 2. 新增 tagsView 导航标签组件

## 3. 新增 user 用户信息组件
