<template>
  <div class="absolute">
    <slot> </slot>
  </div>
</template>

<style lang="scss" scoped>
.absolute {
  z-index: 7;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none;
}
</style>
