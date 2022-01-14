<template>
  <nav class="sidebar d-flex flex-column justify-space-between">
    <div class="sidebar_content">
      <div
          v-for="(item, i) in sidebarItems"
          :key="item.title + i"
          style="margin-bottom: 12px"
      >
        <v-btn
            width="96"
            height="68"
            class="px-1 text-capitalize"
            depressed
            @click="navClick(item.routeName)"
            :color="sidebarItemColor(item.routeName)"
        >
          <div class="text-caption sidebar-item">
            <v-icon :color="computeIconColor(item.routeName)">
              {{ item.iconName }}
            </v-icon>
            <span
                :style="{ color: computeIconColor(item.routeName) }"
                style="
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 16px;
              margin-top: 7px;
            "
            >
            {{ $t(item.title) }}
          </span>
          </div>
        </v-btn>
      </div>
    </div>
    <div class="app-version text-subtitle-2 text-center">
      {{version}}
    </div>
  </nav>
</template>

<script lang="ts">
import { SET_MODE } from "@/store/mutation-types";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      currentSidbarItem: "constructor",
      sidebarItems: [
        {
          title: "constructor",
          iconName: "mdi-view-grid-plus-outline",
          value: "constructor",
          routeName: "home.constructor",
        },
        {
          title: "attach",
          iconName: "mdi-pin-outline",
          value: "pin",
          routeName: "home.attach",
        },
        {
          title: "time",
          iconName: "mdi-clock-time-four-outline",
          value: "clock",
          routeName: "home.time",
        },
      ],
    };
  },
  computed: {
    version(): string {
      return this.$store.getters.appVersion
    }
  },
  methods: {
    sidebarItemColor(routeName: string): string {
      return routeName === this.$route.name ? "primary" : "white";
    },
    navClick(routeName: string) {
      if (routeName === "Logs") {
        return this.$store.dispatch(SET_MODE);
      }
      return this.$router.push({
        name: routeName,
        params: {
          id: this.$route.params.id,
        },
      });
    },
    computeIconColor(routeName) {
      return routeName === this.$route.name ? "white" : "#828282";
    },
  },
});
</script>
<style lang="scss" scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #ffffff;
  box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.04);
  padding: 16px 8px;
  z-index: 7;
  .sidebar-item {
    @include flex-column-center;
    padding: 12px;
  }
}
</style>
