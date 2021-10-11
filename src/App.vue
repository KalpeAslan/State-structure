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
});
</script>
