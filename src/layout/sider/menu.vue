<template>
  <a-menu mode="inline" theme="dark">
    <template v-for="item in menus">
      <!-- 一级菜单 -->
      <a-menu-item
        v-if="
          !item.children ||
          (item.children && item.children.length && item.children.length === 1)
        "
        :key="item.name"
      >
        <router-link
          :to="{
            name:
              item.children &&
              item.children.length &&
              item.children.length === 1
                ? item.children[0].name
                : item.name,
          }"
        >
          <span>{{ item.meta && item.meta.title }}</span>
        </router-link>
      </a-menu-item>
      <!-- 子级菜单 -->
      <SubMenu v-else :menu-info="item" :key="item.name" />
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "store/index";
import SubMenu from "./subMenu.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const routes = computed(() => store.state.routes.routes);
    const menus = computed(() => store.state.routes.menus);
    // console.log("routes", routes.value);
    // console.log("menus", menus.value);

    // 路由查看调用
    const { options, getRoutes } = useRouter();
    console.log("getRoutes", getRoutes());
    console.log("options.routes", options.routes);
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