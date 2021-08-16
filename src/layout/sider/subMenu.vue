<template>
  <a-sub-menu :key="menuInfo.name">
    <template #title>
      <span>
        <Icon
          v-if="menuInfo.meta && menuInfo.meta.icon"
          :icon="menuInfo.meta.icon"
        />
        <!-- <component v-if="menuInfo.meta.icon" :is="menuInfo.meta.icon" /> -->
        <span>{{ menuInfo.meta && menuInfo.meta.title }}</span>
      </span>
    </template>
    <template v-if="menuInfo.children && menuInfo.children.length">
      <template v-for="item in menuInfo.children">
        <!-- 不存在子级的菜单 -->
        <a-menu-item v-if="!item.children ||
          (item.children && item.children.length && item.children.length === 1)" :key="item.name">
          <router-link :to="{
            name:
              item.children &&
              item.children.length &&
              item.children.length === 1
                ? item.children[0].name
                : item.name,
          }">
            <Icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
            <!-- <component v-if="item.meta.icon" :is="item.meta.icon" /> -->
            <span>{{ item.meta && item.meta.title }}</span>
          </router-link>
        </a-menu-item>
        <!-- 存在子级菜单 -->
        <SubMenu v-else :menu-info="item" :key="item.path" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style scoped></style>
