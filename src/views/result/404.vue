<template>
  <div>404 错误页</div>
  <h2>{{ info.name }}</h2>
  <a-button type="primary" @click="changeName">改变值</a-button>
</template>

<script lang="ts" setup>
import { reactive, watch, watchEffect, ref } from "vue";

const info = reactive({
  name: "hello",
  age: 10,
});
let name = ref("hello");
let age = ref(10);

const changeName = () => {
  info.name += " hah";
  name.value += " hha";
};

// 0. 直接监听
watchEffect(() => {
  console.log("watchEffect...", info.name);
});

// 1. 监听单个数据源
// 1.1 使用getter函数：该getter函数必须引用可响应式的对象，如reactive或者ref
watch(
  () => info.name,
  (newVal, oldVal) => {
    console.log("watch...name", "new:", newVal, " old:", oldVal);
  }
);

// 1.2 接监听可响应式对象，如reactive或者ref，常用ref
// 情况一：reactive对象获取到的newVal和oldVal都是reactive对象，而且值是一样的
// Proxy {name: 'hello hah', age: 10}
watch(info, (newVal, oldVal) => {
  console.log("watch...info", newVal, oldVal);
});

// 如果希望newVal和oldVal是普通对象
watch(
  () => {
    return { ...info };
  },
  (newVal, oldVal) => {
    // watch...info... {name: 'hello hah', age: 10} {name: 'hello', age: 10}
    console.log("watch...info...", newVal, oldVal);
  }
);

// 情况二：ref对象获取到的newVal和oldVal是值的本身
watch(name, (newVal, oldVal) => {
  // hello hha hello
  console.log("ref...watch...name", newVal, oldVal);
});

// 2. 监听多个数据源：使用数组
// watch([info, name], ([newVal, oldVal], [newV, oldV]) => {
watch(
  [info, name],
  (newVal, oldVal) => {
    // newVal: (2) [Proxy, 'hello hha'] ，oldVal: (2) [Proxy, 'hello']
    // Proxy {name: 'hello hah', age: 10}
    console.log("newVal:", newVal, "，oldVal:", oldVal);
  },
  {
    deep: false,
    immediate: false,
  }
);
</script>

<style></style>
