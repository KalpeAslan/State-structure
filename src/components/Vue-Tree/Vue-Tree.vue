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
          :class="[
            'd-flex',
            'justify-space-between',
            'align-items-center',
            node.type === 'position' ? 'flex-column' : 'flex-row',
            node.type === 'position' ? 'position-node' : 'rich-media-node',
          ]"
          :style="{
            border: collapsed ? '2px solid grey' : '',
            background: unlock(node) ? '#DADADA' : '#414649',
            textAlign: 'center',
          }"
        >
          <v-icon color="#828282" v-if="unlock(node)"> mdi-lock </v-icon>
          <span
            style="padding: 4px 0; font-weight: bold; white-space: nowrap"
            :style="{ color: unlock(node) ? '#828282' : 'white' }"
            >{{ node.name }}</span
          >
          <template v-if="node.type === 'position'">
            <v-list-item
              class="d-flex flex-column justify-center"
              v-for="positionChild in node.positionChildren"
              :key="positionChild.id"
              style="min-height: 0px !important"
            >
              <span class="position-node_child" style="min-width: 120px">
                {{ positionChild.name }}
                <v-btn icon @click="deletePositionChild(node, positionChild)">
                  <v-icon color="danger"> mdi-minus-circle-outline </v-icon>
                </v-btn>
              </span>
            </v-list-item>
          </template>
        </div>
      </template>
    </Tree>
  </div>
</template>
<script>
import {
  DELETE_POSITION_FROM_NODE,
  SET_TREE,
} from "../../store/mutation-types";

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
  methods: {
    unlock(node) {
      return this.$store.getters.GET_UNLOCK && node.type !== "position";
    },
    deletePositionChild(selectedNode, positionChild) {
      this.$store.dispatch(DELETE_POSITION_FROM_NODE, {
        selectedNode,
        positionChild,
      });
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
  background: #f7f7f8 !important;
  width: 100%;
  height: 100%;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  .tree-container {
    width: 100% !important;
    height: 100% !important;
    border: none !important;
    overflow: scroll;
  }
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
.position-node {
  background: transparent !important;
  border: 1px solid #828282;
  border-radius: 4px;
  color: #414649 !important;
  .position-node_child {
    border: 1px solid #828282;
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 8px 0;
    padding: 8px 4px;
  }
}
</style>
