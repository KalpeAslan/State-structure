<template>
  <div style="height: 100%">
    <AddGoverment
      :modalDialog="modalDialog"
      @close-modal="modalDialog = false"
    />
    <v-navigation-drawer
      width="353"
      permanent
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="d-flex align-items-center">
        <v-icon size="20"> mdi-close </v-icon>
        <div
          class="text-h6 d-inline-block ml-4"
          style="
            font-weight: 500;
            font-size: 16px !important;
            line-height: 24px;
            margin-top: 12px;
            margin-bottom: 10px;
          "
        >
          {{ $t("stateStructure") }}
        </div>
      </div>
      <v-btn
        color="primary"
        class="mb-3 mt-4 d-inline-block"
        outlined
        style="width: 100%"
        variant="outlined"
        @click="modalDialog = true"
      >
        <v-icon size="14"> mdi-plus-thick </v-icon>
        <div class="text-caption">Добавить</div>
      </v-btn>

      <template v-if="isShowTabs">
        <v-tabs v-model="selectedTab" style="font-size: 12px !important">
          <v-tab value="all" va>Все</v-tab>
          <v-tab v-if="userType === 'departmentBoss'" value="departmentBoss">
            <v-badge :content="listOfGAForApply.length">
              На согласование
            </v-badge>
          </v-tab>
          <v-tab v-else value="departmentHead">На утверждении</v-tab>
        </v-tabs>
        <v-divider style="margin-bottom: 18px" />
      </template>
      <v-text-field
        outlined
        label="Поиск"
        v-model="inputSearch"
        hide-details
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-list v-if="listOfGA">
        <v-list-item
          v-for="(govOrg, index) in listOfGA"
          @click="selectGov(govOrg)"
          style="padding: 0 !important"
          :key="index"
        >
          <v-list-item-content class="d-flex justify-space-between badge">
            <span
              style="
                font-size: 14px;
                line-height: 16px;
                color: #000000;
                max-width: 150px;
                width: 150px;
              "
            >
              {{ govOrg | translate }}
            </span>
            <Badge :state="computeStatus(govOrg)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { IGoverment } from "@/store/interfaces";
import {
  SELECT_GOVERMENT,
  SET_ALL_GOVERMENT_AGENCIES,
} from "@/store/mutation-types";
import Vue from "vue";

export type VForm = Vue & {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
};

export default Vue.extend({
  data() {
    return {
      modalDialog: false as boolean,
      loading: false,
      inputSearch: null,
      selectedTab: 0,
    };
  },
  methods: {
    selectGov(govOrg: IGoverment) {
      this.$store.dispatch(SELECT_GOVERMENT, govOrg);
    },
    computeStatus(govOrg: IGoverment) {
      if (govOrg.status === null) return 1;
      return govOrg.status;
    },
  },
  computed: {
    governmentAgencies() {
      return this.$store.getters.GET_ALL_GOVERMENT_AGENCIES;
    },
    form() {
      return this.$refs.form as VForm;
    },
    listOfGA(): IGoverment[] {
      const listOfGA =
        this.selectedTab === 0
          ? this.governmentAgencies
          : this.listOfGAForApply;
      return !this.inputSearch
        ? listOfGA
        : listOfGA.filter((govAgency) =>
            govAgency.nameRu.includes(this.inputSearch)
          );
      // return this.$store.getters.GET_ALL_GOVERMENT_AGENCIES;
    },
    userType() {
      return this.$store.getters.GET_USER_TYPE;
    },
    isShowTabs(): boolean {
      return ["departmentBoss", "departmentHead"].includes(this.userType);
    },
    listOfGAForApply(): IGoverment[] {
      const codeForApply = this.userType === "departmentBoss" ? 2 : 5;
      return this.governmentAgencies.filter((govAgency) => {
        return govAgency.status === codeForApply;
      });
    },
  },
  created() {
    this.loading = true;
    this.$store.dispatch(SET_ALL_GOVERMENT_AGENCIES).then(() => {
      this.loading = false;
    });
  },
  components: {
    Badge: () => import("../../components/Badge/Badge.vue"),
    AddGoverment: () =>
      import("../../components/HeaderModals/AddGoverment.vue"),
  },
});
</script>
<style lang="scss" scoped>
.nav-constructor {
  height: 100%;
  .nav-constructor_item {
    height: 50%;
  }
}
.badge {
  font-size: 12px;
}
</style>
