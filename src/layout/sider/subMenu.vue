<template>
  <a-sub-menu :key="menuInfo.name" v-bind="$attrs">
    <template #title>
      <span>
        <Icon v-if="menuInfo.meta.icon" :icon="menuInfo.meta.icon" />
        <!-- <component v-if="menuInfo.meta.icon" :is="menuInfo.meta.icon" /> -->
        <span>{{ menuInfo.meta.title }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <template v-if="!item.children">
        <a-menu-item :key="item.name">
          <Icon v-if="item.meta.icon" :icon="item.meta.icon" />
          <!-- <component v-if="item.meta.icon" :is="item.meta.icon" /> -->
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.name" />
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

<style scoped>
</style>
