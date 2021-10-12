<template>
  <vue-tree> </vue-tree>
</template>

<script lang="ts">
import Vue from "vue";
import ContentSidebar from "../../components/ContentSidebar/ContentSidebar.vue";
import VueTree from "../../components/Vue-Tree/Vue-Tree.vue";

interface IHistoryVersion {
  name: string;
  state: string;
  date: string;
  id: number;
}

export default Vue.extend({
  name: "Home",
  data() {
    return {
      historyVersions: [
        {
          name: "Фамилия Имя Отчество",
          state: "claimed",
          date: "21/03/2021 12:56",
          id: 0,
        },
        {
          name: "Фамилия Имя Отчество",
          state: "aproved",
          date: "21/03/2021 12:56",
          id: 1,
        },
        {
          name: "Фамилия Имя Отчество",
          state: "created",
          date: "21/03/2021 12:56",
          id: 2,
        },
      ] as Array<IHistoryVersion>,
    };
  },
  components: {
    ContentSidebar,
    VueTree,
  },
  computed: {
    currentId(): string {
      return this.$route.params.id;
    },
  },
});
</script>

<style lang="scss" scoped>
.history-versions {
  background: #f7f7f8;
  width: 100%;
}
</style>
