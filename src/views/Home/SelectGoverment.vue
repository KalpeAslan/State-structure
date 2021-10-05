<template>
  <div style="height: 100%">
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
          @click="editGovOrg(govOrg)"
          v-for="(govOrg, index) in govOrgs"
          :key="index"
        >
          <v-list-item-content class="d-flex justify-space-between badge">
            {{ govOrg.name }}
            <Badge :state="govOrg.state" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="400px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Редактировать ГО</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <template>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <div v-for="input in editForm" :key="input.title">
                      <div class="text-subtitle1">{{ input.title }}</div>
                      <v-text-field
                        :placeholder="selectedToEditGovOrg[input.name]"
                        outlined
                        class="mb-3"
                        hide-details
                        v-model="selectedToEditGovOrg[input.name]"
                      >
                      </v-text-field>
                    </div>
                  </v-form>
                </template>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="dialog = false"> Сохранить </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface IGovOrgItem {
  name: string;
  state: string;
  bin: string;
  nameKz?: string;
  nameEn?: string;
}
interface ISelectedToEditGovOrg {
  name: string;
  bin: string;
  nameKz?: string;
  nameEn?: string;
}

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
          name: "Наименование ГО",
          bin: "010908550522",
          state: "created",
        },
        {
          name: "Наименование ГО",
          state: "created",
          bin: "010908550522",
        },
        {
          name: "Наименование ГО",
          state: "created",
          bin: "010908550522",
        },
        {
          name: "Наименование ГО",
          state: "onApproval",
          bin: "010908550522",
        },
        {
          name: "Наименование ГО",
          state: "aproved",
          bin: "010908550522",
        },
        {
          name: "Наименование ГО",
          state: "notAproved",
          bin: "010908550522",
        },
        {
          name: "Наименование ГО",
          state: "onClaim",
          bin: "010908550522",
        },
        {
          name: "Наименование ГО",
          state: "claimed",
          bin: "010908550522",
        },
        {
          name: "Наименование ГО",
          state: "notClaimed",
          bin: "010908550522",
        },
      ] as Array<IGovOrgItem>,
      dialog: false as boolean,
      selectedToEditGovOrg: {
        bin: "",
        name: "",
        nameKz: "",
        nameEn: "",
      } as ISelectedToEditGovOrg,
      editForm: [
        {
          title: "БИН",
          name: "bin",
        },
        {
          title: "Наименование на русском",
          name: "name",
        },
        {
          title: "Наименование на казахском",
          name: "nameKz",
        },
        {
          title: "Наименование на английском",
          name: "nameEn",
        },
      ],
    };
  },

  computed: {
    form() {
      return this.$refs.form as VForm;
    },
  },
  methods: {
    editGovOrg(govOrg: IGovOrgItem) {
      this.selectedToEditGovOrg = govOrg;
      console.log(this.selectedToEditGovOrg);
      this.dialog = true;
    },
    validate() {
      this.form.reset();
    },
    reset() {
      this.form.reset();
    },
    resetValidation() {
      this.form.resetValidation();
    },
  },
  components: {
    Badge: () => import("../../components/Badge/Badge.vue"),
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
