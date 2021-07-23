<template>
  <a-sub-menu :key="menuInfo.name" v-bind="$attrs">
    <template #title>
      <router-link :to="menuInfo.path">
        <span>
          <Icon
            v-if="menuInfo.meta && menuInfo.meta.icon"
            :icon="menuInfo.meta.icon"
          />
          <!-- <component v-if="menuInfo.meta.icon" :is="menuInfo.meta.icon" /> -->
          <span>{{ menuInfo.meta && menuInfo.meta.title }}</span>
        </span>
      </router-link>
    </template>
    <template v-for="item in menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.name">
        <router-link :to="item.path">
          <Icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
          <!-- <component v-if="item.meta.icon" :is="item.meta.icon" /> -->
          <span>{{ item.meta && item.meta.title }}</span>
        </router-link>
      </a-menu-item>
      <SubMenu v-else :menu-info="item" :key="item.name" />
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

<style scoped>
</style>
