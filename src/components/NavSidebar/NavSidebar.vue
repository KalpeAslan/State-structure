<template>
  <nav class="sidebar">
    <div
      v-for="item in sidebarItems"
      :key="item.title"
      style="margin-bottom: 12px"
    >
      <router-link
        style="text-decoration: none; color: inherit"
        :to="{
          name: item.routeName,
        }"
      >
        <v-btn
          width="96"
          height="68"
          class="px-1"
          depressed
          :color="sidebarItemColor(item.routeName)"
        >
          <div class="text-caption sidebar-item">
            <v-icon>
              {{ item.iconName }}
            </v-icon>
            {{ item.title }}
          </div>
        </v-btn>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      currentSidbarItem: "constructor",
      sidebarItems: [
        {
          title: "Конструктор",
          iconName: "mdi-view-grid-plus-outline",
          value: "constructor",
          routeName: "home.constructor",
        },
        {
          title: "Привязка",
          iconName: "mdi-pin-outline",
          value: "pin",
          routeName: "home.attach",
        },
        {
          title: "Время",
          iconName: "mdi-clock-time-four-outline",
          value: "clock",
          routeName: "Logs",
        },
      ],
    };
  },
  methods: {
    sidebarItemColor(routeName: string): string {
      console.log(this.$route.name);
      return routeName === this.$route.name ? "primary" : "white";
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
  z-index: 999;
  .sidebar-item {
    @include flex-column-center;
    padding: 12px;
  }
}
</style>
