<template>
  <div style="height: 100%">
    <NavSidebar />
    <VueTree />
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
import { jsPDF } from "jspdf";

export default Vue.extend({
  name: "Home",

  computed: {
    ...mapGetters(["GET_USER_TYPE", "gaState"]),
    isShowFooter(): boolean {
      const gaState: number = this.gaState;
      switch (this.GET_USER_TYPE) {
        case "dispatcher":
          return [1, 4, 8].includes(gaState);
        case "departmentBoss":
          return 2 === gaState;
        case "departmentHead":
          return 5 === gaState;
        case "admin":
          return false;
      }
    },
  },
  created() {
    if (this.$route.path === "/home") {
      this.$router.push({ name: "home.constructor" });
    }
    if (this.GET_USER_TYPE === "departmentHead") {
      this.$store.dispatch(SET_WEBSOCKET_STATE, true);
    }
  },
  mounted() {
    // const doc = new jsPDF();
    // doc.text("Hello world!", 10, 10);
    // doc.save("a4.pdf");
  },

  components: {
    ContentSidebar,
    VueTree,
    NavSidebar: () => import("../../components/NavSidebar/NavSidebar.vue"),
    Footer: () => import("../../components/Footer/Footer.vue"),
  },
});
</script>
