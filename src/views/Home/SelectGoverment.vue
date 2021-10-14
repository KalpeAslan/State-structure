<template>
  <div style="height: 100%">
    <AddGoverment :show="show" />
    <v-navigation-drawer
      width="353"
      permanent
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="d-flex align-items-center">
        <v-icon size="20"> mdi-close </v-icon>
        <div class="text-h6 d-inline-block ml-4">Штатная структура</div>
      </div>
      <v-btn
        color="primary"
        class="mb-3 mt-4 d-inline-block"
        outlined
        style="width: 100%"
        variant="outlined"
        @click="show = true"
      >
        <v-icon size="14"> mdi-plus-thick </v-icon>
        <div class="text-caption">Добавить</div>
      </v-btn>
      <v-text-field
        outlined
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-list>
        <v-list-item
          v-for="(govOrg, index) in govOrgs"
          @click="selectGov(govOrg)"
          :key="index"
        >
          <v-list-item-content class="d-flex justify-space-between badge">
            {{ govOrg.nameRu }}
            <Badge :state="govOrg.state" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { IGoverment } from "@/store/interfaces";
import { SELECT_GOVERMENT } from "@/store/mutation-types";
import Vue from "vue";

export type VForm = Vue & {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
};

export default Vue.extend({
  data() {
    return {
      govOrgs: [
        {
          nameRu: "Наименование ГО",
          bin: "010908550522",
          state: "created",
        },
        {
          nameRu: "Наименование ГО",
          state: "created",
          bin: "010908550522",
        },
        {
          nameRu: "Наименование ГО",
          state: "created",
          bin: "010908550522",
        },
        {
          nameRu: "Наименование ГО",
          state: "onApproval",
          bin: "010908550522",
        },
        {
          nameRu: "Наименование ГО",
          state: "aproved",
          bin: "010908550522",
        },
        {
          nameRu: "Наименование ГО",
          state: "notAproved",
          bin: "010908550522",
        },
        {
          nameRu: "Наименование ГО",
          state: "onClaim",
          bin: "010908550522",
        },
        {
          nameRu: "Наименование ГО",
          state: "claimed",
          bin: "010908550522",
        },
        {
          nameRu: "Наименование ГО",
          state: "notClaimed",
          bin: "010908550522",
        },
      ],
      show: false as boolean,
    };
  },

  computed: {
    form() {
      return this.$refs.form as VForm;
    },
  },
  components: {
    Badge: () => import("../../components/Badge/Badge.vue"),
    AddGoverment: () =>
      import("../../components/HeaderModals/AddGoverment.vue"),
  },
  methods: {
    selectGov(govOrg: IGoverment) {
      this.$store.dispatch(SELECT_GOVERMENT, govOrg);
    },
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

.v-card {
  .v-card__text {
    padding-bottom: 0 !important;
  }
  .v-text-field__details {
    display: none !important;
  }
}
</style>
