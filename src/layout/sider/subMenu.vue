<template>
  <a-sub-menu :key="menus.name">
    <template #icon>
      <Icon v-if="menus.icon" :icon="menus.icon" />
    </template>
    <template #title>{{ menus.title }}</template>
    <template v-for="item in menus.child">
      <template v-if="!(item.child && item.child.length)">
        <a-menu-item :key="item.name">
          <template #icon>
            <Icon v-if="item.icon" :icon="item.icon" />
          </template>
          <router-link :to="{ name: item.name }">
            {{ item.title }}
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menus="item" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubMenu",
  props: {
    menus: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style scoped></style>
