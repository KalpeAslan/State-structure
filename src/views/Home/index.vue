<template>
  <div style="height: 100%">
    <NavSidebar />
    <VueTree />
    <ContentSidebar> <router-view /> </ContentSidebar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ContentSidebar from "../../components/ContentSidebar/ContentSidebar.vue";
import VueTree from "../../components/Vue-Tree/Vue-Tree.vue";

export default Vue.extend({
  name: "Home",
  components: {
    ContentSidebar,
    VueTree,
    NavSidebar: () => import("../../components/NavSidebar/NavSidebar.vue"),
  },
  created() {
    if (this.$route.path === "/home") {
      this.$router.push({ name: "home.constructor" });
    }
  },
});
</script>
