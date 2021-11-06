<template>
  <div class="tree-container" ref="container" :style="{}">
    <AddSubdivison
      :show="showAddSubdivison"
      @close-modal="showAddSubdivison = false"
    />
    <svg class="svg vue-tree" ref="svg" :style="initialTransformStyle"></svg>

    <div
      class="dom-container"
      ref="domContainer"
      :style="initialTransformStyle"
    >
      <template v-for="(node, index) of nodeDataList">
        <div
          v-if="node.data.entityType !== 'employee' && !node.hidden"
          :class="['node-slot', `node-slot__${node.data.key}`]"
          :key="node.data.key"
          :index="index"
          :style="{
            left: formatDimension(
              direction === DIRECTION.VERTICAL ? node.x : node.y
            ),
            top: formatDimension(
              direction === DIRECTION.VERTICAL ? node.y : node.x
            ),
            width: formatDimension(config.nodeWidth),
            height: formatDimension(config.nodeHeight),
          }"
          dropzone
          @dragover.prevent
          @dragenter.prevent
          @drop="onDrop($event, node.data)"
        >
          <div
            :draggable="unlock && isCanDispatcherEdit"
            @dragstart.stop="dragStart($event, node.data)"
            @mousedown.stop
            @mousemove.stop
            @dragend.stop="dragEnd"
            class="node-container"
          >
            <v-btn
              v-if="unlock && isShowNodeButtons(node.data.entityType)"
              icon
              absolute
              @click="deleteNode(node.data)"
              class="node-button minus"
            >
              <v-icon color="danger"> mdi-minus-circle-outline </v-icon>
            </v-btn>

            <slot
              name="node"
              v-bind:node="node.data"
              v-bind:collapsed="node.data._collapsed"
            >
              <span> {{ node.data.value }}</span>
            </slot>
            <v-btn
              icon
              v-if="
                node.data.entityType !== 'position' &&
                unlock &&
                isShowNodeButtons(node.data.entityType)
              "
              absolute
              class="node-button plus"
              @click.stop="addSubdivison(node.data)"
            >
              <v-icon color="primary"> mdi-plus-circle-outline </v-icon>
            </v-btn>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { uuid } from "./base/utils";
import treeMixin from "../../mixins/treeMixin";
import { SET_PLUS_SELECTED_NODE } from "@/store/mutation-types";
import { mapGetters } from "vuex";

const MATCH_TRANSLATE_REGEX = /translate\((-?\d+)px, ?(-?\d+)px\)/i;

const LinkStyle = {
  CURVE: "curve",
  STRAIGHT: "straight",
};

const DIRECTION = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
};

const DEFAULT_NODE_WIDTH = 200;
const DEFAULT_NODE_HEIGHT = 100;
const DEFAULT_LEVEL_HEIGHT = 200;

const DEFAULT_HEIGHT_DECREMENT = 200;

function rotatePoint({ x, y }) {
  return {
    x: y,
    y: x,
  };
}

export default {
  name: "Tree",
  mixins: [treeMixin],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          nodeWidth: DEFAULT_NODE_WIDTH,
          nodeHeight: DEFAULT_NODE_HEIGHT,
          levelHeight: DEFAULT_LEVEL_HEIGHT,
        };
      },
    },
    linkStyle: {
      type: String,
      default: LinkStyle.CURVE,
    },
    direction: {
      type: String,
      default: DIRECTION.VERTICAL,
    },
    collapseEnabled: {
      type: Boolean,
      default: true,
    },
    dataset: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      d3,
      nodeDataList: [],
      linkDataList: [],
      initTransformX: 0,
      initTransformY: 0,
      DIRECTION,
      currentScale: 1,
      hoverNode: false,
      isVertical: true,
      showAddSubdivison: false,
    };
  },
  computed: {
    ...mapGetters({
      GET_UNLOCK: "GET_UNLOCK",
      dragTree: "GET_DRAG_TREE",
      tree: "tree",
      userType: "GET_USER_TYPE",
    }),
    unlock() {
      return !this.GET_UNLOCK;
    },
    isCanDispatcherEdit() {
      if(this.userType !== 'dispatcher') return false
      const status = this.tree.status;
      return [null, 315, 318].includes(status);
    },
    initialTransformStyle() {
      return {
        transform: `scale(1) translate(${this.initTransformX}px, ${this.initTransformY}px)`,
        transformOrigin: "center",
        top: "200px",
      };
    },
    _dataset() {
      return this.updatedInternalData(this.dataset);
    },
    showNodeButton() {
      return this.hoverNode;
    },

    treeContainerHeight() {
      return this.$store.getters.GET_DEPTH * 300;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    isShowNodeButtons(nodeEntityType) {
      switch (this.userType) {
        case "dispatcher":
          return this.isCanDispatcherEdit;
        case "departmentBoss":
          return nodeEntityType === "position";
        default:
          false;
      }
    },
    init() {
      this.draw();
      this.initTransform();
      this.enableDrag();
    },
    addSubdivison(node) {
      this.showAddSubdivison = true;
      this.$store.commit(SET_PLUS_SELECTED_NODE, node);
    },
    computeDirection(node) {
      if (node.type === "division") {
        return DIRECTION.HORIZONTAL;
      }
      return this.direction;
    },
    updatedInternalData(externalData) {
      var data = { name: "__invisible_root", children: [] };
      if (!externalData) return data;
      if (Array.isArray(externalData)) {
        for (var i = externalData.length - 1; i >= 0; i--) {
          data.children.push(this.deepCopy(externalData[i]));
        }
      } else {
        data.children.push(this.deepCopy(externalData));
      }
      return data;
    },
    deepCopy(node) {
      let obj = { _key: uuid() };
      for (var key in node) {
        if (!node) {
        }
        if (node[key] === null) {
          obj[key] = null;
        } else if (Array.isArray(node[key])) {
          obj[key] = node[key].map((x) => this.deepCopy(x));
        } else if (typeof node[key] === "object") {
          obj[key] = this.deepCopy(node[key]);
        } else {
          obj[key] = node[key];
        }
      }
      return obj;
    },
    initTransform() {
      const containerWidth = this.$refs.container.offsetWidth;
      const containerHeight = this.$refs.container.offsetHeight;
      if (this.isVertical) {
        this.initTransformX = Math.floor(containerWidth / 2);
        this.initTransformY = Math.floor(this.config.nodeHeight - 200);
      } else {
        this.initTransformX = Math.floor(this.config.nodeWidth - 200);
        this.initTransformY = Math.floor(containerHeight / 2);
      }
    },
    generateLinkPath(d) {
      const self = this;
      if (this.linkStyle === LinkStyle.CURVE) {
        const linkPath = this.isVertical
          ? d3.linkVertical()
          : d3.linkHorizontal();
        linkPath
          .x(function (d) {
            return d.x;
          })
          .y(function (d) {
            return d.y;
          })
          .source(function (d) {
            const sourcePoint = {
              x: d.source.x,
              y: d.source.y,
            };
            return self.direction === self.DIRECTION.VERTICAL
              ? sourcePoint
              : rotatePoint(sourcePoint);
          })
          .target(function (d) {
            const targetPoint = {
              x: d.target.x,
              y: d.target.y,
            };
            return self.direction === self.DIRECTION.VERTICAL
              ? targetPoint
              : rotatePoint(targetPoint);
          });
        return linkPath(d);
      }
      if (this.linkStyle === LinkStyle.STRAIGHT) {
        const linkPath = d3.path();
        let sourcePoint = { x: d.source.x, y: d.source.y };
        let targetPoint = { x: d.target.x, y: d.target.y };
        if (!this.isVertical) {
          sourcePoint = rotatePoint(sourcePoint);
          targetPoint = rotatePoint(targetPoint);
        }
        const xOffset = targetPoint.x - sourcePoint.x;
        const yOffset = targetPoint.y - sourcePoint.y;
        const secondPoint = this.isVertical
          ? { x: sourcePoint.x, y: sourcePoint.y + yOffset / 2 }
          : { x: sourcePoint.x + xOffset / 2, y: sourcePoint.y };
        const thirdPoint = this.isVertical
          ? { x: targetPoint.x, y: sourcePoint.y + yOffset / 2 }
          : { x: sourcePoint.x + xOffset / 2, y: targetPoint.y };
        linkPath.moveTo(sourcePoint.x, sourcePoint.y);
        linkPath.lineTo(secondPoint.x, secondPoint.y);
        linkPath.lineTo(thirdPoint.x, thirdPoint.y);
        linkPath.lineTo(targetPoint.x, targetPoint.y);
        return linkPath.toString();
      }
    },
    draw() {
      var [nodeDataList, linkDataList] = this.buildTree(this._dataset);
      nodeDataList.splice(0, 1);
      linkDataList = linkDataList.filter(
        (x) => x.source.data.name !== "__invisible_root"
      );
      this.linkDataList = linkDataList;
      this.nodeDataList = nodeDataList;
      const identifier = this.dataset["identifier"];
      const specialLinks = this.dataset["links"];
      if (specialLinks && identifier) {
        for (const link of specialLinks) {
          let parent,
            children = undefined;
          if (identifier === "value") {
            parent = this.nodeDataList.find((d) => {
              return d[identifier] == link.parent;
            });
            children = this.nodeDataList.filter((d) => {
              return d[identifier] == link.child;
            });
          } else {
            parent = this.nodeDataList.find((d) => {
              return d["data"][identifier] == link.parent;
            });
            children = this.nodeDataList.filter((d) => {
              return d["data"][identifier] == link.child;
            });
          }
          if (parent && children) {
            for (const child of children) {
              const new_link = {
                source: parent,
                target: child,
              };
              this.linkDataList.push(new_link);
            }
          }
        }
      }

      this.svg = this.d3.select(this.$refs.svg);

      const self = this;
      const links = this.svg.selectAll(".link").data(linkDataList, (d) => {
        return `${d.source.data._key}-${d.target.data._key}`;
      });

      links
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", function (d, i) {
          return self.generateLinkPath(d);
        });
      links.attr("d", function (d) {
        return self.generateLinkPath(d);
      });
      links.exit().style("opacity", 0).remove();
    },
    buildTree(rootNode) {
      const treeBuilder = this.d3
        .tree()
        .nodeSize([this.config.nodeWidth, this.config.levelHeight]);
      const tree = treeBuilder(this.d3.hierarchy(rootNode));
      return [tree.descendants(), tree.links()];
    },
    enableDrag() {
      if (this.dragTree) {
        return;
      }

      const path = this.$refs.container;

      let startX = 0;
      let startY = 0;
      let isDrag = false;
      let mouseDownTransform = "";
      path.onmousedown = (event) => {
        mouseDownTransform = this.$refs.svg.style.transform;
        startX = event.clientX;
        startY = event.clientY;
        isDrag = true;
      };
      path.onmousemove = (event) => {
        if (!isDrag) return;
        const originTransform = mouseDownTransform;
        let originOffsetX = 0;
        let originOffsetY = 0;
        if (originTransform) {
          const result = originTransform.match(MATCH_TRANSLATE_REGEX);
          if (result !== null && result.length !== 0) {
            const [offsetX, offsetY] = result.slice(1);
            originOffsetX = parseInt(offsetX);
            originOffsetY = parseInt(offsetY);
          }
        }
        let newX =
          Math.floor((event.clientX - startX) / this.currentScale) +
          originOffsetX;
        let newY =
          Math.floor((event.clientY - startY) / this.currentScale) +
          originOffsetY;
        let transformStr = `translate(${newX}px, ${newY}px)`;
        if (originTransform) {
          transformStr = originTransform.replace(
            MATCH_TRANSLATE_REGEX,
            transformStr
          );
        }

        this.$refs.svg.style.transform = transformStr;
        this.$refs.domContainer.style.transform = transformStr;
      };

      path.onmouseup = (event) => {
        startX = 0;
        startY = 0;
        isDrag = false;
      };
    },
    enableMoveTree() {
      const container = this.$refs.container;
      const domContainer = this.$refs.domContainer;
      const svg = this.$refs.svg;
      const mouseMove = (e) => {
        //offsetY
        //offsetX

        const scale = domContainer.style.transform.split(" ")[0];
        const transform = `${scale} translate(${domContainer.offsetX + 1}px, -${
          domContainer.offsetY + 1
        }px)`;
        domContainer.style.transform = transform;
        svg.style.transform = transform;
      };
      container.addEventListener("mousedown", () => {
        container.addEventListener("mousemove", mouseMove);
      });
      container.addEventListener("mouseup", (e) => {
        container.removeEventListener("mousemove", mouseMove);
      });
    },
    formatDimension(dimension) {
      if (typeof dimension === "number") return `${dimension}px`;
      if (dimension.indexOf("px") !== -1) {
        return dimension;
      } else {
        return `${dimension}px`;
      }
    },
  },
  watch: {
    _dataset: {
      deep: true,
      handler: function () {
        this.draw();
        this.initTransform();
      },
    },
  },
  components: {
    AddSubdivison: () => import("../HeaderModals/AddSubdivision.vue"),
  },
};
</script>

<style lang="scss" scoped>
.tree-node-item-enter,
.tree-node-item-leave-to {
  transition-timing-function: ease-in-out;
  transition: transform 0.8s;
  opacity: 0;
}

.tree-node-item-enter-active,
.tree-node-item-leave-active {
  transition-timing-function: ease-in-out;
  transition: all 0.8s;
}

.tree-container {
  .node {
    fill: grey !important;
  }

  .link {
    stroke-width: 2px !important;
    fill: transparent !important;
    stroke: red !important;
  }
}

.tree-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .vue-tree {
    position: relative;
  }

  > svg,
  .dom-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible;
    transform-origin: 0 50%;
  }

  .dom-container {
    z-index: 1;
    pointer-events: none;
  }
}

.node-slot {
  cursor: pointer;
  pointer-events: all;
  position: absolute;
  background-color: transparent;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  transition: all 0.8s;
  transition-timing-function: ease-in-out;
}
.node-container {
  position: relative;
  &:hover {
    border: 3px solid $primary;
    border-radius: 2px;
    .node-button {
      display: inline-block;
    }
  }
  .node-button {
    display: none;
    top: 50%;
    transform: translateY(-50%);
    &.plus {
      right: -35px;
    }
    &.minus {
      left: -35px;
    }
  }
}
</style>
