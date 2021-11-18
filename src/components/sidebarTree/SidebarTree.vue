<template>
  <div>
    <template v-for="node in nodes">
      <div
        :key="node.key"
        :style="{ 'margin-left': `${depth * 20}px` }"
        class="node-container"
        dropzone
        @dragover.prevent
        @dragenter.prevent
        @drop="onDrop($event, node)"
      >
        <div
          :draggable="isEditable"
          @dragstart="dragStart($event, node)"
          @dragend="dragEnd"
        >
          <v-btn
            v-if="node.children && node.children.length"
            icon
            @click="nodeClicked(node)"
          >
            <v-icon>
              {{ isExpanded(node) ? "mdi-chevron-down" : "mdi-chevron-right" }}
            </v-icon>
          </v-btn>
          <div class="node" style="font-size: 14px">
            <span
              :style="{
                marginLeft: node.children && 36,
              }"
              >{{ node | translate }}</span
            >
            <div class="node-buttons" v-if="isEditable">
              <v-btn
                v-if="node.entityType !== 'position'"
                icon
                @click="addSubdivison(node)"
              >
                <v-icon color="primary"> mdi-plus-circle-outline </v-icon>
              </v-btn>
              <v-btn
                v-if="node.entityType !== 'governmentAgency'"
                icon
                class="remove-button"
                @click="deleteNode(node)"
              >
                <v-icon color="danger"> mdi-minus-circle-outline </v-icon>
              </v-btn>
            </div>
          </div>
          <SidebarTree
            v-if="isExpanded(node) && node.children"
            :nodes="node.children"
            :depth="depth + 1"
            @onClick="(node) => $emit('onClick', node)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import treeMixin from "../../mixins/treeMixin";
import Vue from "vue";
export default Vue.extend({
  name: "SidebarTree",
  props: {
    nodes: Array,
    depth: {
      type: Number,
      default: 0,
    },
  },
  mixins: [treeMixin],
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
  },
  computed: {
    showButtons() {
      return (
        this.$store.state.systemStore.userType === "dispatcher" &&
        this.addButtonHover
      );
    },
    getRandomId() {
      return Math.round(Math.round(505) * 123456789);
    },
    isEditable(): boolean {
      return this.$store.getters.isEditable;
    },
  },
});
</script>

<style scoped lang="scss">
.node-container {
  text-align: left;
  font-size: 18px;

  .node {
    display: inline-block;
    .node-buttons {
      display: none;
    }
    &:hover {
      .node-buttons {
        display: inline-block;
      }
    }
  }
}
.type {
  margin-right: 10px;
}
</style>
