<template>
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
          !item.children ||
          (item.children && item.children.length && item.children.length === 1)
        "
        :key="item.name"
      >
        <!-- 注意：此处to属性中用的是name值，而不是path；如果用path,
        router/index.ts中的子菜单path应该定义为“/父菜单路由/子菜单路由”，例如：将“role”改为“/system/role”。 -->
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
          <Icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
          <span>{{ item.meta && item.meta.title }}</span>
        </router-link>
      </a-menu-item>
      <!-- 子级菜单 -->
      <SubMenu v-else :menu-info="item" :key="item.name" />
    </template>
  </a-menu>
</template>

<!-- <script setup lang="ts">
import SubMenu from "./subMenu.vue";

</script> -->

<script lang="ts">
import * as R from "ramda";
import { defineComponent, computed, toRefs, reactive } from "vue";
import { useStore } from "store/index";
import SubMenu from "./subMenu.vue";
import { useBreadcrumbStore } from "stores/breadcrumb";

export default defineComponent({
  setup() {
    const store = useStore();
    const menus = computed(() => store.state.routes.menus);

    const state = reactive({
      selectedKeys: localStorage.getItem("selectedMenu")
        ? [localStorage.getItem("selectedMenu")]
        : [],
      openKeys: localStorage.getItem("openMenu")
        ? R.split(",", localStorage.getItem("openMenu") || "")
        : [],
    });
    const { setBreadcrumb } = useBreadcrumbStore();

    const handleMenuClick = ({ key = "", keyPath = [] }) => {
      // 点击时，将状态保存到vuex和localStorage
      store.commit("SELECTED_MENU", key);
      store.commit("OPEN_MENU", state.openKeys);
      // 保存选中路径
      // store.commit("SET_BREADCRUMB", keyPath);
      setBreadcrumb(keyPath);
    };

    return {
      menus,

      ...toRefs(state),
      handleMenuClick,
    };
  },
  components: {
    SubMenu,
  },
});
</script>
