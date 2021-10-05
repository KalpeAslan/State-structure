<template>
  <div class="absolute">
    <slot> </slot>
  </div>
</template>

<style lang="scss" scoped>
.absolute {
  z-index: 99;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
</style>
