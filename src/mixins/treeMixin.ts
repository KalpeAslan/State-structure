import { treeStore } from "./../store/treeStore";
import { treeService } from "./../services/treeService";
import { ITree } from "./../store/interfaces";
import {
  SET_DRAG_TREE,
  INSERT_POSITION_TO_NODE,
} from "./../store/mutation-types";
import {
  DELETE_NODE,
  INSERT_NODE_TO_TREE,
  UPDATE_TREE,
} from "@/store/mutation-types";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      dragEnteredNode: null,
    };
  },
  methods: {
    deleteNode(selectedNode: ITree) {
      this.$store.dispatch(DELETE_NODE, selectedNode);
    },
    dragEnter(node) {
      if (node) {
        this.dragEnteredNode = node;
      }
    },
    dragEnd() {
      this.$store.dispatch(SET_DRAG_TREE, null);
    },
    dragStart($event: DragEvent, node) {
      if (!this.$store.getters.GET_DRAG_TREE) {
        this.$store.dispatch(SET_DRAG_TREE, node);
      }
    },
    onDrop($event: DragEvent, node: ITree) {
      this.$store.dispatch(UPDATE_TREE, {
        dragEnteredNode: node,
        dragTargetNode: this.$store.getters.GET_DRAG_TREE,
      });
    },
  },
  computed: {
    getDragTree() {
      return this.$store.getters.GET_DRAG_TREE;
    },
  },
});

// if (
//   $event.dataTransfer.getData("employeeId") &&
//   node.entityType === "position"
// ) {
//   treeService.connectEmployeeWithPosition(
//     +$event.dataTransfer.getData("employeeId"),
//     node.id
//   );
//   this.$store.dispatch(INSERT_POSITION_TO_NODE, {
//     selectedNode: node,
//     position: this.$store.getters.GET_EMPLOYEE_BY_ID(
//       +$event.dataTransfer.getData("employeeId")
//     ),
//   });
// } else if (
//   $event.dataTransfer.getData("nodeId") &&
//   ["subdivision", "governmentAgency"].includes(node.entityType)
// ) {
//   treeService.connectSubdivisionWithSuperiorSubdivision(
//     +$event.dataTransfer.getData("nodeId"),
//     node.id
//   );
//   this.$store.dispatch(UPDATE_TREE, {
//     dragEnteredNode: node,
//     dragTargetNode: this.$store.getters.GET_NODE_BY_ID(
//       $event.dataTransfer.getData("nodeId")
//     ),
//   });
// } else if (
//   $event.dataTransfer.getData("roleId") &&
//   node.entityType === "position"
// ) {
//   this.$store.dispatch(INSERT_POSITION_TO_NODE, {
//     selectedNode: node,
//     position: this.$store.getters.GET_ROLE_BY_ID(
//       +$event.dataTransfer.getData("roleId")
//     ),
//   });
// }
// this.$store.dispatch("DELETE_DRAG_TREE");
