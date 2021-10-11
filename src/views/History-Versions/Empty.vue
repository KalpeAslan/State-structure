<template>
  <div style="height: 100%">
    <div class="empty" v-if="!isShowTree">
      <p class="text-subtitle1">Выберите версию из списка, чтобы просмотреть</p>
    </div>
    <VueTree v-else />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueTree from "../../components/Vue-Tree/Vue-Tree.vue";

export default Vue.extend({
  components: {
    VueTree,
  },
  computed: {
    isShowTree() {
      return this.$store.state.treeStore.tree != null;
    },
  },
});
</script>

<style lang="scss" scoped>
.empty {
  text-align: center;
  color: #828282;
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
