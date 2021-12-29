<template>
  <div>500 错误页</div>
  <h2 ref="titleRef">{{ name }} {{ age }}</h2>
  <a-button type="primary" @click="changeName">改变name</a-button>
  <a-button type="primary" @click="changeAge">改变age</a-button>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";

const name = ref("hello world");
const age = ref(10);

// 1. watchEffect 自动收集 响应式数据的依赖
// 首先，watchEffect传入的函数会被立即执行一次，并且在执行的过程中会收集依赖；
// 其次，只有收集的依赖发生变化时，watchEffect传入的函数才会再次执行；
const stop = watchEffect((onInvalidate) => {
  //情况1：只会监听name，name变化时会执行
  console.log("watchEffect执行", name.value);
  // 情况2：只会监听name和age，任意一个变化时都会执行
  console.log("watchEffect执行", name.value + " " + age.value);

  // 3. watchEffect 清除副作用
  // 在侦听函数中执行网络请求，但是在网络请求还没有达到时，停止了侦听器，或者侦听器侦听函数被再次执行了。那么上一次的网络请求应该被取消掉，这个时候就可以清除上一次的副作用；
  // 当副作用即将重新执行 或者 侦听器被停止 时会执行该函数传入的回调函数(onInvalidate)，在回调函数中执行清除
  onInvalidate(() => {
    // 清除额外的副作用；如清除定时器；清除上一次请求
    // clearTimeout(timer)
    // requestCancel
    console.log("onInvalidate");
  });
});

const changeName = () => (name.value += "。");
const changeAge = () => {
  age.value++;
  if (age.value > 15) {
    // 2. watchEffect 停止侦听：
    // 获取watchEffect的返回值函数，调用该函数即可
    stop();
  }
};

// 4. ref的使用：定义一个ref对象，绑定到元素或者组件的ref属性上即可
const titleRef = ref(null);

// 5. watchEffect的执行时机
// 默认时立即执行的；
watchEffect(
  () => {
    // 第一次为null；第二次才有值
    console.log(titleRef.value);
  },
  {
    // pre 默认值是pre，它会在元素 挂载 或者 更新 之前执行：null->h2，执行了两次
    // post dom挂载之后执行：h2，仅执行了一次
    // sync 将强制效果始终同步触发，然而是低效的，很少需要：null->h2，执行了两次
    flush: "post",
  }
);
</script>

<style></style>
