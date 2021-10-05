<template>
  <div class="history-versions">
    <ContentSidebar>
      <v-navigation-drawer
        width="353"
        permanent
        style="height: 100%"
        class="pt-5 px-5 nav-constructor_item"
      >
        <div class="d-flex align-items-center">
          <v-icon size="20"> mdi-close </v-icon>
          <div class="text-h6 d-inline-block ml-4">История версий</div>
        </div>
        <v-list>
          <v-list-item
            v-for="historyVersion in historyVersions"
            :key="historyVersion.date"
            @click="editGovOrg(historyVersion.id)"
            class="pl-0"
          >
            <v-list-item-content class="d-flex justify-space-between">
              <div class="d-inline-block" style="flex: none">
                <v-list-item-title style="font-size: 12px">{{
                  historyVersion.name
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  historyVersion.date
                }}</v-list-item-subtitle>
              </div>
              <Badge :state="historyVersion.state" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </ContentSidebar>
    <router-view> </router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ContentSidebar from "../../components/ContentSidebar/ContentSidebar.vue";

interface IHistoryVersion {
  name: string;
  state: string;
  date: string;
  id: number;
}

export default Vue.extend({
  name: "Home",
  data() {
    return {
      historyVersions: [
        {
          name: "Фамилия Имя Отчество",
          state: "claimed",
          date: "21/03/2021 12:56",
          id: 0,
        },
        {
          name: "Фамилия Имя Отчество",
          state: "aproved",
          date: "21/03/2021 12:56",
          id: 1,
        },
        {
          name: "Фамилия Имя Отчество",
          state: "created",
          date: "21/03/2021 12:56",
          id: 2,
        },
      ] as Array<IHistoryVersion>,
    };
  },
  components: {
    ContentSidebar,
    Badge: () => import("../../components/Badge/Badge.vue"),
  },
});
</script>

<style lang="scss" scoped>
.history-versions {
  background: #dadada;
  width: 100%;
  height: 100%;
}
</style>
