<template>
  <a-layout-header class="c-header">
    <div class="c-header-top">
      <Icon
        :icon="isCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'"
        class="c-header-trigger"
        @click="toggleCollapse"
      />
      <!-- 面包屑组件 -->
      <hl-breadcrumb class="c-header-breadcrumb" />
    </div>
    <!-- 头部导航 -->
    <hl-tabs />
  </a-layout-header>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSettingStore } from "stores/setting";
import HlBreadcrumb from "./breadcrumb.vue";
import HlTabs from "./tabs.vue";

const { isCollapse } = storeToRefs(useSettingStore());
const { toggleCollapse } = useSettingStore();
</script>

<style lang="scss" scoped>
.c-header {
  background: #fff;
  padding: 0;
  height: auto;
  line-height: 1;
  &-top {
    display: flex;
    align-items: center;
    height: 56px;
  }
  &-trigger {
    font-size: 18px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  &-breadcrumb {
    flex: 1;
  }
}
</style>
