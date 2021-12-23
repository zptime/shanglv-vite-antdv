<template>
  <div>200 成功页</div>
  <button @click="increment">不响应 count +1：{{ count }}</button>
  <!-- 为了方便，模版中会自动解包，不需要使用count2.value，而是count2 -->
  <button @click="increment2">ref响应 count2 +1:{{ count2 }}</button>
  <div>info.count2: {{ info.count2 }}</div>
  <div>info.count2.value: {{ info.count2.value }}</div>
  <button @click="incrementN">
    reactive响应 state.count +1:{{ state.count }}
  </button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  setup() {
    // 1. 不响应
    let count = 100;
    const increment = () => {
      count++;
      console.log(count);
    };

    // 2. ref响应基础数据类型，string、boolean、number
    // 模版中自动解包，不需要使用count2.value，而是count2；
    // setup没有自动解包，必须使用count2.value
    let count2 = ref(100);
    const increment2 = () => {
      count2.value++;
    };

    // ref解包只能是浅层解包，嵌套到对象就不行了；
    // 注意：录视频的时候是的。我看的时候已经3.2版本了，已经没有这个问题了，深层也可解包，可忽略
    let info = {
      count2,
    };

    // 3. reactive处理对象或数组，提供响应式；
    // data数据也是在内部交给reactive函数，处理成响应式对象的
    let state = reactive({
      count,
    });
    const incrementN = () => {
      state.count++;
      console.log(state.count);
    };

    return {
      count,
      increment,
      count2,
      info,
      increment2,
      state,
      incrementN,
    };
  },
});
</script>

<style></style>
