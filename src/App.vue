<template>
  <v-app>
    <Header />
    <Modals />
    <notifications group="alert" class="alert" position="bottom right" />

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
    Modals: () => import("../src/components/Modals/Modals.vue"),
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

<style lang="scss">
$bg: #414649;
$color: white;
.alert {
  font-family: Roboto, sans-serif;
  border-radius: 4px !important;
  bottom: 16px !important;
  right: 16px !important;

  .vue-notification-wrapper {
    .vue-notification {
      border-left: 5px solid $bg;
      padding: 16px;
      background: $bg;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      .notification-title {
        background: $bg;
      }

      .notification-content {
        background: $bg;
      }

      &.success {
        &::before {
          display: inline-block;
          content: "";
        }
      }
    }
  }
}
</style>
