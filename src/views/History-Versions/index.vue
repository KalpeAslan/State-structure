<template>
  <div class="history-versions">
    <ContentSidebar>
      <v-navigation-drawer
        width="353"
        permanent
        style="height: 100%"
        class="pt-5 pr-5 nav-constructor_item"
      >
        <div class="d-flex align-items-center pl-5">
          <v-icon size="20"> mdi-close </v-icon>
          <div class="text-h6 d-inline-block ml-4">История версий</div>
        </div>
        <v-list>
          <v-list-item
            selectable
            v-for="version in versions"
            :key="version.date"
            @click="selectHistoryVersion(version.id)"
            class="pl-0"
            :class="[
              'pl-0',
              'pl-5',
              selectedHistoryVersionId === version.id && 'selected',
            ]"
          >
            <v-list-item-content class="d-flex justify-space-between">
              <div class="d-inline-block" style="flex: none">
                <v-list-item-title style="font-size: 12px">{{
                  version.userObject.username
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  formatDate(version.date)
                }}</v-list-item-subtitle>
              </div>
              <Badge :state="version.state" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </ContentSidebar>
    <router-view> </router-view>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import Vue from "vue";
import { mapGetters } from "vuex";
import ContentSidebar from "../../components/ContentSidebar/ContentSidebar.vue";
import {
  SET_TREE,
  SET_VERSION,
  SET_VERSIONS,
} from "../../store/mutation-types";
export default Vue.extend({
  name: "Home",
  data() {
    return {
      selectedHistoryVersionId: null as null | number,
      isLoading: false as boolean,
    };
  },
  components: {
    ContentSidebar,
    Badge: () => import("../../components/Badge/Badge.vue"),
  },
  computed: {
    ...mapGetters(["versions"]),
  },
  methods: {
    selectHistoryVersion(id: number) {
      this.selectedHistoryVersionId = id;
      // this.$store.dispatch(SET_TREE, id);
      this.$store.dispatch(SET_VERSION, id);
    },
    formatDate(date: string): string {
      return moment(date).format("DD/MM/YYY hh:mm");
    },
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch(SET_VERSIONS);
    this.isLoading = false;
  },
});
</script>

<style lang="scss" scoped>
.history-versions {
  background: #f7f7f8;
  width: 100%;
  height: 100%;
}
.selected {
  background: $primary;
  border-radius: 10px;
  .v-list-item__title,
  .v-list-item__subtitle {
    color: white !important;
  }
}
</style>
