<template>
  <div>
    <div
      v-for="node in nodes"
      :key="node.id"
      :style="{ 'margin-left': `${depth * 20}px` }"
      class="node"
      @mouseover="addButtonHover = true"
      @mouseleave="addButtonHover = false"
      draggable
      @dragend="dragEnd(node)"
      @dragenter="dragEnter(node)"
    >
      <v-btn v-if="node.children.length" icon @click="nodeClicked(node)">
        <v-icon>
          {{ isExpanded(node) ? "mdi-chevron-down" : "mdi-chevron-right" }}
        </v-icon>
      </v-btn>
      <span
        :style="{
          marginLeft: node.children && 36,
        }"
        >{{ node.name }}</span
      >
      <v-btn v-if="showAddButton" icon @click="insertToNode(node)">
        <v-icon color="primary"> mdi-plus-circle-outline </v-icon>
      </v-btn>
      <SidebarTree
        v-if="isExpanded(node) && node.children"
        :nodes="node.children"
        :depth="depth + 1"
        @onClick="(node) => $emit('onClick', node)"
      />
    </div>
  </div>
</template>

<script>
import {
  UPDATE_TREE,
  INSERT_NODE_TO_TREE,
} from "../../store/mutation-types.ts";
export default {
  name: "SidebarTree",
  props: {
    nodes: Array,
    depth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      expanded: [],
      addButtonHover: false,
    };
  },
  methods: {
    isExpanded(node) {
      return this.expanded.indexOf(node) !== -1;
    },
    nodeClicked(node) {
      if (!this.isExpanded(node)) {
        this.expanded.push(node);
      } else {
        this.expanded.splice(this.expanded.indexOf(node));
      }
    },
    dragEnd(node) {
      if (this.dragEnteredNode.id !== node.id) {
        this.$store.dispatch(UPDATE_TREE, {
          dragEnteredNode: this.dragEnteredNode,
          dragTargetNode: node,
        });
      }
    },
    dragEnter(node) {
      this.dragEnteredNode = node;
    },
    insertToNode(selectedNode, newNode = {}) {
      newNode = {
        children: [],
        name: "TestNode1",
        id: this.getRandomId,
        _key: this.getRandomId,
      };
      this.$store.dispatch(INSERT_NODE_TO_TREE, {
        selectedNode,
        newNode,
      });
    },
  },
  computed: {
    showAddButton() {
      return (
        this.$store.state.systemStore.userType === "dispatcher" &&
        this.addButtonHover
      );
    },
    getRandomId() {
      return Math.round(Math.round(505) * 123456789);
    },
  },
};
</script>

<style scoped lang="scss">
.node {
  text-align: left;
  font-size: 18px;
  .add-button {
    display: none;
  }
  &:hover {
    .add-button {
      display: inline-block;
    }
  }
}
.type {
  margin-right: 10px;
}
</style>
