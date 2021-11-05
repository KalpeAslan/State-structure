import { ITree } from "./../store/interfaces";
import { SET_DRAG_TREE } from "./../store/mutation-types";
import { DELETE_NODE, UPDATE_TREE } from "@/store/mutation-types";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      dragEnteredNode: null,
    };
  },
  methods: {
    deleteNode(selectedNode: ITree, parentNode: ITree) {
      this.$store.dispatch(DELETE_NODE, {
        selectedNode,
        parent: parentNode,
      });
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
        console.log(node);
        this.$store.dispatch(SET_DRAG_TREE, node);
      }
    },
    onDrop($event: DragEvent, node: ITree) {
      console.log(node);
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
