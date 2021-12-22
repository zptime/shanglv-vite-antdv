<template>
  <a-breadcrumb class="c-breadcrumb">
    <a-breadcrumb-item v-for="item in breadcrumbMenu" :key="item.name">
      <router-link :to="{ name: item.name }">
        {{ item.title }}
      </router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBreadcrumbStore } from "stores/breadcrumb";
const { generateBreadcrumb } = useBreadcrumbStore();
const breadcrumbMenu = computed(() => {
  let result = generateBreadcrumb();
  console.log("breadcrumbMenu", result);
  return result;
});
console.log("breadcrumbMenu", breadcrumbMenu.value);
</script>

<style lang="scss" scoped>
// .c-breadcrumb {}
</style>
