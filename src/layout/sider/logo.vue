<template>
  <div class="m-logo">
    <Icon :icon="logo" class="icon" />
    <div v-show="!isCollapse" class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useStore } from "store/index";

  export default defineComponent({
    setup() {
      const store = useStore();
      const title = computed(() => store.state.settings.title);
      const logo = computed(() => store.state.settings.logo);
      const isCollapse = computed(() => store.state.settings.isCollapse);

      return {
        title,
        logo,
        isCollapse,
      };
    },
    data() {
      return {};
    },
  });
</script>

<style scoped lang="scss">
  .m-logo {
    display: flex;
    align-items: center;
    margin: 16px 0;
    .icon {
      font-size: 25px;
      color: #fff;
      margin-left: 26px;
    }
    .title {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      margin-left: 12px;
    }
  }
</style>
