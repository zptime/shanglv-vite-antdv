<template>
  <a-menu mode="inline" theme="dark">
    <template v-for="item in menus" :key="item.name">
      <template v-if="!item.children">
        <a-menu-item :key="item.name">
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.name" />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useStore } from "store/index";
  import SubMenu from "./subMenu.vue";

  export default defineComponent({
    setup() {
      const store = useStore();
      const routes = computed(() => store.state.routes.routes);
      const menus = computed(() => store.state.routes.menus);

      return {
        routes,
        menus,
      };
    },
    components: {
      SubMenu,
    },
  });
</script>
