import { ITree } from "./../store/interfaces";
import {
  SET_DRAG_TREE,
  SET_MODAL_NAME,
  SET_PLUS_SELECTED_NODE,
} from "./../store/mutation-types";
import { DELETE_NODE, UPDATE_TREE } from "@/store/mutation-types";
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
    addSubdivison(node) {
      if (!this.isLoading) {
        this.$store.commit(SET_PLUS_SELECTED_NODE, node);
        this.$store.dispatch(SET_MODAL_NAME, "add-subdivision-modal");
      }
    },
  },
  computed: {
    getDragTree() {
      return this.$store.getters.GET_DRAG_TREE;
    },
  },
});
