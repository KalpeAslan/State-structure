<template>
  <div class="container">
    <Tree
      v-if="!loading"
      style="border: 1px solid gray"
      :dataset="vehicules"
      :config="treeConfig"
      linkStyle="straight"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <span style="padding: 4px 0; font-weight: bold">{{ node.name }}</span>
        </div>
      </template>
    </Tree>
  </div>
</template>
<script>
import { SET_TREE } from "../../store/mutation-types";

export default {
  name: "treemap",
  data() {
    return {
      treeConfig: { nodeWidth: 140, nodeHeight: 80, levelHeight: 200 },
      loading: true,
    };
  },
  computed: {
    vehicules() {
      return this.$store.state.treeStore.tree;
    },
  },
  async beforeCreate() {
    this.loading = true;
    await this.$store.dispatch(SET_TREE, 0);
    this.loading = false;
  },
  mounted() {
    const treeContainer = document.querySelector(
      ".container > .tree-container"
    );
    let scale = 1;
    treeContainer &&
      treeContainer.addEventListener("wheel", (e) => {
        if (e.deltaY < 0 && scale < 1.1) scale += 0.03;
        else if (scale > 0.5) scale -= 0.03;
        treeContainer.style.transform =
          treeContainer.style.WebkitTransform =
          treeContainer.style.MsTransform =
            "scale(" + scale + ")";
        e.preventDefault();
      });
  },
  components: {
    Tree: () => import("../tree/Tree.vue"),
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(218, 218, 218) !important;
  width: 100%;
  .tree-container {
    width: 100% !important;
    height: 100% !important;
    border: none !important;
  }
  height: 100%;
}

.rich-media-node {
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #414649;
  border-radius: 4px;
}
</style>
