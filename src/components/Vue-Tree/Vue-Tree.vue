<template>
  <div class="container d-flex justify-center align-items-center">
    <Tree
      v-if="tree"
      style="border: 1px solid gray"
      :dataset="tree"
      :config="treeConfig"
      linkStyle="straight"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          v-if="!node.hidden"
          :class="computeClassByNodeType(node)"
          @click="selectPosition(node)"
          :style="{
            border: collapsed ? '2px solid grey' : '',
          }"
        >
          <v-icon color="#828282" v-if="unlock(node)"> mdi-lock </v-icon>
          <span
            style="
              padding: 12px 16px;
              white-space: nowrap;
              font-size: 14px;
              border-radius: 2px;
            "
            :style="{
              fontWeight:
                node.entityType === 'governmentAgency' && '500 !important',
              fontSize:
                node.entityType === 'governmentAgency' && '20px !important',
            }"
            >{{ node | translate }}</span
          >
          <div
            v-if="node.entityType === 'position'"
            class="d-flex flex-column justify-center align-center"
          >
            <v-list-item
              v-for="positionChild in node.employees"
              :key="positionChild.key"
              style="min-height: 0px !important"
            >
              <div
                :class="[
                  'position-node_child',
                  node.employeeReplacement && 'flex-column',
                ]"
              >
                <div class="d-flex align-center" style="font-size: 12px">
                  {{ positionChild.user.name }}
                </div>
                <template v-if="node.employeeReplacement">
                  <div>
                    <v-icon> mdi-chevron-down </v-icon>
                  </div>
                  <div
                    class="d-flex flex-column align-center"
                    style="font-size: 12px"
                  >
                    {{ node.employeeReplacement.substitutionBasisRu }}
                    <div color="#DADADA">
                      до {{ node.employeeReplacement.endDate }}
                    </div>
                  </div>
                </template>
              </div>
              <v-btn icon @click="deleteEmployee(node, positionChild)">
                <v-icon color="danger"> mdi-minus-circle-outline </v-icon>
              </v-btn>
            </v-list-item>

            <template v-if="node.roleId">
              <v-list-item
                :key="node.roleId"
                style="min-height: 0px !important"
              >
                <div class="position-node_child">
                  <span class="d-flex align-center" style="font-size: 12px">
                    {{ node.roleId }}
                  </span>
                  <v-btn icon @click="deleteRole(node)">
                    <v-icon color="danger"> mdi-minus-circle-outline </v-icon>
                  </v-btn>
                </div>
              </v-list-item>
            </template>
          </div>
        </div>
      </template>
    </Tree>
    <div v-else class="text-body">
      Выберите ГО из списка ГО или же создадите его
    </div>
  </div>
</template>
<script>
import {
  DELETE_EMPLOYEE,
  DELETE_ROLE_FROM_TREE,
  SET_TEMP_POSITION,
} from "../../store/mutation-types";

export default {
  name: "treemap",
  data() {
    return {
      treeConfig: { nodeWidth: 400, nodeHeight: 80, levelHeight: 100 },
    };
  },
  computed: {
    tree() {
      return this.$store.state.treeStore.tree;
    },
  },
  watch: {
    tree: {
      deep: true,
      handler(val) {
        if (val) {
          // setTimeout(() => {
          //   window
          //     .$(".tree-container")
          //     .draggable({ cancel: ".node-container" });
          // }, 1000);
        }
      },
    },
  },
  methods: {
    unlock(node) {
      return this.$store.getters.GET_UNLOCK && node.entityType !== "position";
    },
    computeClassByNodeType(node) {
      const classes = [
        "d-flex",
        "align-items-center",
        "text-md-center text-center",
      ];
      if (node.entityType === "position") {
        classes.push("justify-center flex-column position-node secondary");
      } else {
        classes.push("justify-space-between");
        if (this.unlock(node)) classes.push("unlock-node secondary");
        else classes.push("text-white node-subdivision");
      }
      return classes;
    },
    deleteEmployee(selectedNode, positionChild) {
      this.$store.dispatch(DELETE_EMPLOYEE, {
        selectedNode,
        positionChild,
      });
    },
    deleteRole(selectedNode) {
      this.$store.dispatch(DELETE_ROLE_FROM_TREE, selectedNode);
    },
    selectPosition(node) {
      if (node.entityType === "position" && this.$route.name === "home.time") {
        this.$store.dispatch(SET_TEMP_POSITION, node);
      }
    },
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

.node-subdivision {
  background: #414649;
  color: white;
  border-radius: 2px;
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

.unlock-node {
  background: #dadada !important;
  border: 1px solid #dadada !important;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 0 12px !important;
}

.position-node {
  border: 2px solid #828282 !important;
  background: #f7f7f8 !important;
  border-radius: 4px;
  color: #414649 !important;
  .position-node_child {
    border: 1px solid #dadada;
    box-sizing: border-box;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 8px 0;
    padding: 6px 8px;
  }
}
</style>
