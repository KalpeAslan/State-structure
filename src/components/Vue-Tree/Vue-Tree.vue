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
              font-size: 14px;
              border-radius: 2px;
              max-width: 200px;
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
                  positionChild.employeeReplacement &&
                    positionChild.employeeState !== 'replacementEmployee' &&
                    'flex-column',
                ]"
              >
                <div class="d-flex align-center" style="font-size: 12px">
                  {{
                    positionChild.employeeState === "replacementEmployee"
                      ? positionChild.employeeReplacement.substituteUserObject
                          .username
                      : positionChild.user.username
                  }}
                </div>
                <template
                  v-if="
                    positionChild.employeeReplacement &&
                    positionChild.employeeState !== 'replacementEmployee'
                  "
                >
                  <div>
                    <v-icon> mdi-chevron-down </v-icon>
                  </div>
                  <div
                    class="d-flex flex-column align-center"
                    style="font-size: 12px"
                  >
                    {{
                      positionChild.employeeReplacement.substituteUserObject
                        .username
                    }}
                    <div color="#DADADA">
                      до
                      {{
                        formatDate(positionChild.employeeReplacement.endDate)
                      }}
                    </div>
                  </div>
                </template>
                <v-btn
                  v-if="isShowButtons"
                  icon
                  @click="deleteEmployee(node, positionChild)"
                >
                  <v-icon color="danger"> mdi-minus-circle-outline </v-icon>
                </v-btn>
              </div>
            </v-list-item>

            <template v-if="node.roleId">
              <v-list-item
                :key="node.roleId"
                style="min-height: 0px !important"
              >
                <div class="position-node_child">
                  <span class="d-flex align-center" style="font-size: 12px">
                    {{ node.roleObject | translate }}
                  </span>
                  <v-btn v-if="isShowButtons" icon @click="deleteRole(node)">
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
      {{ $t("chooseGa") }}
    </div>
  </div>
</template>
<script>
import moment from "moment";
import {
  DELETE_EMPLOYEE,
  DELETE_ROLE_FROM_TREE,
  SET_TEMP_POSITION,
} from "../../store/mutation-types";

export default {
  name: "treemap",
  props: {
    tree: {
      required: true,
    },
    isEditable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      treeConfig: { nodeWidth: 250, nodeHeight: 80, levelHeight: 200 },
    };
  },
  computed: {
    isShowButtons() {
      return this.$store.getters.isEditableTree && this.isEditable;
    },
  },
  watch: {
    tree: {
      deep: true,
      handler(val) {},
    },
  },
  methods: {
    unlock(node) {
      return this.$store.getters.GET_UNLOCK && node.entityType !== "position";
    },
    formatDate(sDate) {
      return moment(sDate).format("DD/MM/YYYY");
    },
    computeClassByNodeType(node) {
      const classes = [
        "d-flex",
        "align-items-center",
        "text-md-center text-center",
      ];
      if (node.entityType === "position") {
        classes.push("justify-center flex-column position-node");
      } else {
        classes.push("justify-space-between");
        if (this.unlock(node)) classes.push("unlock-node");
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
        if (node.employees.length === 0) {
          return this.$notify({
            group: "alert",
            text: "У данной должности нет сотрудников для замещения!",
            type: "danger",
          });
        }
        if (node.employees[0].employeeReplacement) {
          return this.$notify({
            group: "alert",
            text: "У данной должности уже есть временный сотрудник!",
            type: "danger",
          });
        }
        this.$store.dispatch(SET_TEMP_POSITION, node);
        return;
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
    align-items: center;
    margin: 8px 0;
    max-width: 160px;
    padding: 6px 8px;
  }
}
</style>
