<template>
  <div class="m-logo">
    <Icon :icon="logo" class="icon" />
    <div v-show="!isCollapse" class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSettingStore } from "stores/setting.ts";

// storeToRefs，保持响应式
const { logo, title, isCollapse } = storeToRefs(useSettingStore());
console.log(isCollapse.value);
</script>

<style scoped lang="scss">
.m-logo {
  display: flex;
  align-items: center;
  margin: 16px 0;
  .icon {
    font-size: 25px;
    color: #fff;
    margin-left: 26px;
  }
  .title {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    margin-left: 12px;
  }
}
</style>
