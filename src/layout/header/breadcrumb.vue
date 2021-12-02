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
import { useStore } from "store/index";
import { useBreadcrumbStore } from "stores/breadcrumb";

const { filterBreadcrumb } = useBreadcrumbStore();

const store = useStore();
const menus = computed(() => store.state.routes.menus);
const breadcrumbMenu = computed(() => {
  let result = filterBreadcrumb(menus.value);
  console.log("breadcrumbMenu...", result);
  return result;
});
</script>

<style lang="scss" scoped>
.c-breadcrumb {}
</style>
