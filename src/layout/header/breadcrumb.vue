<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item v-for="item in breadcrumbMenu" :key="item.name">
      <router-link :to="{ name: item.name }">
        {{ item.title }}
      </router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "store/index";

const store = useStore();
const menus = computed(() => store.state.routes.menus);
const breadcrumbList = computed(() => {
  let list = store.state.settings.breadcrumbList;
  console.log("list", list);
  // if (!list?.length) {
  //   list = (localStorage.getItem("breadcrumbList") || "").split(",");
  // }
  return list;
});

console.log(menus.value);
console.log("breadcrumbList", breadcrumbList.value);

const filterBreadcrumb = (menus, path, result = []) => {
  if (!(menus?.length && path?.length)) return [];
  let node = path.shift();
  if (node) {
    let item = menus.find((o) => o.name === node);
    result.push({ name: item.name, title: item.meta.title });
    if (item?.children) {
      return filterBreadcrumb(item.children, path, result);
    }
    return result;
  }
};

let breadcrumbMenu = ref([]);
breadcrumbMenu = filterBreadcrumb(menus.value, breadcrumbList.value);

console.log(breadcrumbMenu);
</script>

<style></style>
