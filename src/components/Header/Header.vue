<template>
  <v-app-bar elevation="0" app absolute color="white" max-height="56px">
    <div class="header-content_left">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="
              $router.push({
                name: 'home.select-goverment',
              })
            "
            color="white"
            elevation="0"
            v-bind="attrs"
            v-on="on"
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: self-start;
              "
            >
              Наименование ГО
              <div class="text-caption" style="display: block">123456789</div>
            </div>
            <v-icon size="18"> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <Badge>Создан диспетчером</Badge>
    </div>
    <v-spacer></v-spacer>
    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="white"
            elevation="0"
            v-bind="attrs"
            v-on="on"
            class="secondary--text button"
          >
            <v-icon size="16" style="margin-right: 5px"> mdi-history </v-icon>
            История
            <v-icon size="18"> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <router-link
            v-for="(item, index) in historyItems"
            :key="index"
            :to="{
              name: item.routeName,
            }"
          >
            <v-list-item>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list>
      </v-menu>
      <v-btn
        v-for="button in headerButtons"
        :key="button.title"
        color="white"
        class="ma-2 secondary--text button"
        elevation="0"
      >
        <v-icon size="16" style="margin-right: 5px">{{
          button.iconName
        }}</v-icon>
        {{ button.title }}
      </v-btn>
    </div>
    <template>
      <v-row v-if="false" justify="center">
        <v-dialog v-model="editDialog" max-width="400px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Редактировать ГО</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <template>
                  <v-form ref="form" lazy-validation>
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
              <v-btn color="primary" @click="editDialog = false">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      editDialog: false,
      headerButtons: [
        {
          title: "Экспорт в PDF",
          iconName: "mdi-export-variant",
        },
        {
          title: "Редактировать",
          iconName: "mdi-pencil",
        },
        {
          title: "Удалить ГО",
          iconName: "mdi-delete-outline",
        },
      ],
      historyItems: [
        {
          title: "История действий",
          routeName: "Logs",
        },
        {
          title: "История версий",
          routeName: "versions-history",
        },
      ],
      items: [],
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
  components: {
    Badge: () => import("../Badge/Badge.vue"),
  },
  computed: {
    showEditDeleteButton(): boolean {
      return this.$route.name === "home.constructor";
    },
    selectedToEditGovOrg() {
      return {
        name: "Наименование ГО",
        bin: "010908550522",
        state: "created",
      };
    },
  },
  methods: {
    editGovOrg() {
      // this.selectedToEditGovOrg = this.$store.homeStore.selectedGovOrg;
      this.editDialogvalid = true;
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
});
</script>

<style lang="scss" scoped>
.header-content_left {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.button {
  font-size: 14px;
  line-height: 16px;
  padding: 0 6px;
  font-weight: 400;
}
</style>
