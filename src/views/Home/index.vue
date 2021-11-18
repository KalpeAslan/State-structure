<template>
  <div style="height: 100%">
    <NavSidebar v-if="isShowNavSidebar" />
    <VueTree :tree="tree" />
    <ContentSidebar> <router-view /> </ContentSidebar>
    <Footer v-if="isShowFooter" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import ContentSidebar from "../../components/ContentSidebar/ContentSidebar.vue";
import VueTree from "../../components/Vue-Tree/Vue-Tree.vue";
import { SET_WEBSOCKET_STATE } from "@/store/mutation-types";

export default Vue.extend({
  name: "Home",
  computed: {
    ...mapGetters([
      "GET_USER_TYPE",
      "gaState",
      "isShowFooter",
      "isShowNavSidebar",
      "tree",
    ]),
  },
  created() {
    if (this.$route.path === "/home") {
      this.$router.push({ name: "home.constructor" });
    }
  },
  methods: {
    setWebSocket(): void {
      if (
        this.GET_USER_TYPE === "departmentHead" &&
        [317, 319].includes(this.gaState)
      ) {
        this.$store.dispatch(SET_WEBSOCKET_STATE, "open");
      }
    },
  },
  updated() {
    this.setWebSocket();
  },
  components: {
    ContentSidebar,
    VueTree,
    NavSidebar: () => import("../../components/NavSidebar/NavSidebar.vue"),
    Footer: () => import("../../components/Footer/Footer.vue"),
  },
});
</script>
