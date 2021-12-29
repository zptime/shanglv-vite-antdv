<template>
  <a-menu
    mode="inline"
    theme="dark"
    @click="handleMenuClick"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
  >
    <template v-for="menu in menus">
      <template v-if="!(menu.child && menu.child.length)">
        <a-menu-item :key="menu.name">
          <template #icon>
            <Icon v-if="menu.icon" :icon="menu.icon" />
          </template>
          <router-link :to="{ name: menu.name }">
            {{ menu.title }}
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menus="menu" />
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SubMenu from "./subMenu.vue";
import { storeToRefs } from "pinia";
import { useMenuStore } from "stores/menus";
import { useBreadcrumbStore } from "stores/breadcrumb";

const { menus } = storeToRefs(useMenuStore());
const { setSelectedMenu, setOpenMenu } = useMenuStore();
const { setBreadcrumb } = useBreadcrumbStore();
console.log(menus.value);

let selectedKeys = ref<string[]>([]);
let openKeys = ref<string[]>([]);

const handleMenuClick = ({ key = "", keyPath = [] }) => {
  console.log(
    "setSelectedMenu:",
    key,
    ";keyPath:",
    keyPath,
    ";setOpenMenu:",
    openKeys.value
  );
  // 选中菜单数据保存
  // setSelectedMenu(key);
  // setOpenMenu(openKeys.value);
  
  // 保存选中路径
  setBreadcrumb(keyPath);
};
</script>
