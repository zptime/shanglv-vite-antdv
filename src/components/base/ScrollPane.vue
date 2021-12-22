<template>
  <div class="scroll-container" ref="scrollRef" @wheel.prevent="handleScroll">
    <div
      class="scroll-wrapper"
      ref="scrollWrapper"
      :style="{ left: left + 'px' }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const PADDING = 0;
const SPACE = 20;
export default defineComponent({
  name: "ScrollPane",
  setup() {
    let scrollRef = ref(null);
    let left = 0;

    const handleScroll = (e) => {
      let eventDelta = e.wheelDeltaX || -e.deltaX * 3;
      let containerWidth = scrollRef.value.offsetWidth;
      let wrapperWidth = scrollRef.value.offsetWidth;
      if (eventDelta > 0) {
        left = Math.min(0, left + eventDelta);
      } else {
        if (containerWidth < wrapperWidth) {
          left < -(wrapperWidth - containerWidth)
            ? null
            : (left = Math.max(
                left + eventDelta,
                containerWidth - wrapperWidth
              ));
        } else {
          left = 0;
        }
      }
    };

    const moveByClick = (type: string) => {
      let containerWidth = scrollRef.value.offsetWidth;
      let wrapperWidth = scrollRef.value.offsetWidth;
      if (type === "left") {
        if (left < 0) {
          left = Math.min(0, left + SPACE);
        }
      }
      if (type === "right") {
        if (containerWidth < wrapperWidth) {
          left < -(wrapperWidth - containerWidth)
            ? null
            : (left = Math.max(left - SPACE, containerWidth - wrapperWidth));
        }
      }
    };

    const moveToTarget = ($target) => {
      let $container = scrollRef.value;
      let $containerWidth = $container.offsetWidth;
      let $targetLeft = $target.offsetLeft;
      let $targetWidth = $target.offsetWidth;
      if ($targetLeft <= -left) {
        // tag in the left
        left = -$targetLeft;
      } else if (
        $targetLeft > -left &&
        $targetLeft + $targetWidth < -left + $containerWidth
      ) {
        // tag in the current view
      } else {
        // tag in the right
        left = -($targetLeft - ($containerWidth - $targetWidth));
      }
    };

    return { left, handleScroll };
  },
});
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .scroll-wrapper {
    position: absolute;
    cursor: pointer;
  }
}
</style>
