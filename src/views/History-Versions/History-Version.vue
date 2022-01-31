<template>
  <vue-tree :isEditable="false" :tree="versionTree"> </vue-tree>
</template>

<script lang="ts">
import { ITree } from "@/store/interfaces";
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {
    VueTree: () => import("../../components/Vue-Tree/Vue-Tree.vue"),
  },
  computed: {
    currentId(): string {
      return this.$route.params.id;
    },
    versionTree(): ITree | null {
      console.log(this.$store.getters.versionTree)
      return this.$store.getters.versionTree;
    },
  },
});
</script>

<style lang="scss" scoped>
.history-versions {
  background: #f7f7f8;
  width: 100%;
}
</style>
