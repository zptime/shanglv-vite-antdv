<template>
  <a-sub-menu :key="menuInfo.key">
    <template #title>
      <span>
        <Icon
          v-if="menuInfo.icon"
          :icon="menuInfo.icon"
        />
        <span>{{ menuInfo.title }}</span>
      </span>
    </template>
    <template v-if="menuInfo.child && menuInfo.child.length">
      <template v-for="item in menuInfo.child">
        <!-- 不存在子级的菜单 -->
        <a-menu-item
          v-if="
            !item.child ||
            (item.child &&
              item.child.length &&
              item.child.length === 1)
          "
          :key="item.key"
        >
          <router-link
            :to="{
              key:
                item.child &&
                item.child.length &&
                item.child.length === 1
                  ? item.child[0].key
                  : item.key,
            }"
          >
            <Icon v-if="item.icon" :icon="item.icon" />
            <span>{{ item.title }}</span>
          </router-link>
        </a-menu-item>
        <!-- 存在子级菜单 -->
        <SubMenu v-else :menu-info="item" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  key: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style scoped></style>
