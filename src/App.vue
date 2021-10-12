<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { SET_UNLOCK } from "./store/mutation-types";

export default Vue.extend({
  name: "App",

  components: {
    Header: () => import("../src/components/Header/Header.vue"),
  },
  created() {
    if (this.$route.path === "/") {
      // this.$router.push({ name: "home.constructor" });
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "home.select-goverment") {
        this.$store.dispatch(SET_UNLOCK, true);
      } else if (from.name === "home.select-goverment") {
        this.$store.dispatch(SET_UNLOCK, false);
      }
    },
  },
});
</script>
