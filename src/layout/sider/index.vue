<template>
  <a-layout-sider v-model:collapsed="isCollapse">
    <Logo />
    <Menu />
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSettingStore } from "stores/setting";
import Logo from "./logo.vue";
import Menu from "./menu.vue";

const { isCollapse } = storeToRefs(useSettingStore());
</script>

<style></style>
