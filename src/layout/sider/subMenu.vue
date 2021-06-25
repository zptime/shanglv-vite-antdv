<template>
  <a-sub-menu :key="menuInfo.name" v-bind="$attrs">
      <template #title>
        <span>
          <MailOutlined />
          <span>{{ menuInfo.meta.title }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <PieChartOutlined />
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
import {
  PieChartOutlined,
  MailOutlined
} from "@ant-design/icons-vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    PieChartOutlined,
    MailOutlined,
  },
});
</script>

<style scoped>
</style>
