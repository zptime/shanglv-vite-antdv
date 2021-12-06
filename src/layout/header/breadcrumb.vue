<template>
  <a-breadcrumb class="c-breadcrumb">
    <a-breadcrumb-item v-for="item in breadcrumbMenu" :key="item.keyPath">
      <router-link :to="{ name: item.key }">
        {{ item.title }}
      </router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { useBreadcrumbStore } from "stores/breadcrumb";
const { generateBreadcrumb } = useBreadcrumbStore();
const breadcrumbMenu = generateBreadcrumb();
</script>

<style lang="scss" scoped>
.c-breadcrumb {
}
</style>
