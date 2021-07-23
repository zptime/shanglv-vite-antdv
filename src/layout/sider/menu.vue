<template>
  <a-menu mode="inline" theme="dark">
    <template v-for="item in menus">
      <a-menu-item v-if="!item.children" :key="item.name">
        <router-link :to="item.path">
          <span>{{ item.meta && item.meta.title }}</span>
        </router-link>
      </a-menu-item>
      <SubMenu v-else :menu-info="item" :key="item.name" />
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from "vue";
import { useStore } from "store/index";
import SubMenu from "./subMenu.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const routes = computed(() => store.state.routes.routes);
    const menus = computed(() => store.state.routes.menus);
    const { ctx, proxy } = getCurrentInstance();
    console.log(ctx);
    console.log(proxy);

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

