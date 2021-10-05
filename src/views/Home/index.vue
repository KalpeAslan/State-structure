<template>
  <div>
    <NavSidebar />
    <HelloWorld />
    <ContentSidebar> <router-view /> </ContentSidebar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "../../components/HelloWorld.vue";
import ContentSidebar from "../../components/ContentSidebar/ContentSidebar.vue";

export default Vue.extend({
  name: "Home",
  components: {
    HelloWorld,
    ContentSidebar,
    NavSidebar: () => import("../../components/NavSidebar/NavSidebar.vue"),
  },
});
</script>
