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
import {
  CHECK_IS_LOGGINED,
  SET_LOGGINED,
  SET_MODAL_NAME,
  SET_UNLOCK, SET_USER_TYPE,
} from "./store/mutation-types";
import {language} from "@/store/interfaces";

const computeDocumentTitle = (lang: language): string => {
  switch (lang){
    case "en":
      return 'GA'
    case "kz":
      return 'МЕМЛЕКЕТТІК ОРГАН'
    case "ru":
      return 'ГО'
  }
}

export default Vue.extend({
  name: "App",

  components: {
    Header: () => import("../src/components/Header/Header.vue"),
    Modals: () => import("../src/components/Modals/Modals.vue"),
  },
  computed: {
    lang(): language {
      return this.$store.getters.GET_CURRENT_LANGUAGE
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
    lang(value){
      document.title = computeDocumentTitle(value)
    }
  },
  beforeCreate() {
    this.$store.dispatch(SET_LOGGINED, localStorage.getItem('login'))
    this.$store.dispatch(SET_USER_TYPE, localStorage.getItem('login'))
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

      .notification-content {
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
      }

      &.success {
        background: $bg !important;
        border-color: $bg !important;
        display: flex;
        align-items: center;
        &::before {
          display: inline-block;
          margin-right: 15px;
          content: "";
          @include bg("./assets/icons/mark.svg", 18);
          @include size(18px, 14px);
        }
      }
    }
  }
}
</style>
