<template>
  <div>JSON.stringify(menuList)</div>
  <a-menu
    mode="inline"
    theme="dark"
    @click="handleMenuClick"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
  >
    <template v-for="item in menus">
      <!-- 一级菜单 -->
      <a-menu-item
        v-if="
          !item.child ||
          (item.child && item.child.length && item.child.length === 1)
        "
        :key="item.key"
      >
        <router-link
          :to="{
            key:
              item.child && item.child.length && item.child.length === 1
                ? item.child[0].key
                : item.key,
          }"
        >
          <Icon v-if="item.icon" :icon="item.icon" />
          <span>{{ item.title }}</span>
        </router-link>
      </a-menu-item>
      <!-- 子级菜单 -->
      <SubMenu v-else :menu-info="item" />
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SubMenu from "./subMenu.vue";
import { storeToRefs } from "pinia";
import { useMenuStore } from "stores/menus";
import { useBreadcrumbStore } from "stores/breadcrumb";

const { setBreadcrumb } = useBreadcrumbStore();
const { menus } = storeToRefs(useMenuStore());
const { setSelectedMenu, setOpenMenu } = useMenuStore();

let selectedKeys = ref<string[]>([]);
let openKeys = ref<string[]>([]);

const handleMenuClick = ({ key = "", keyPath = [] }) => {
  console.log("handleMenuClick", key, keyPath, openKeys);
  // 选中菜单数据保存
  setSelectedMenu(key);
  setOpenMenu(openKeys.value);

  // 保存选中路径
  setBreadcrumb(keyPath);
};
</script>
