<template>
  <div class="container">
    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray"
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
    </vue-tree>
  </div>
</template>
<script>
export default {
  name: "treemap",
  data() {
    return {
      vehicules: {
        name: "Название ГО",
        children: [
          {
            name: "Департамент 1",
            children: [
              {
                name: "Отдел 1",
              },
              {
                name: "Отдел 2",
              },
            ],
          },
          {
            name: "Департамент 2",
            children: [
              {
                name: "Отдел 1",
              },
              {
                name: "Отдел 2",
              },
            ],
          },
        ],
      },
      treeConfig: { nodeWidth: 140, nodeHeight: 80, levelHeight: 200 },
    };
  },
  mounted() {
    const treeContainer = document.querySelector(
      ".container > .tree-container"
    );
    let scale = 1;
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
