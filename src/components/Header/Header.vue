<template>
  <v-app-bar elevation="0" app absolute color="white" max-height="56px">
    <div class="header-content_left">
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
          style="display: flex; flex-direction: column; align-items: self-start"
        >
          Наименование ГО
          <div class="text-caption" style="display: block">123456789</div>
        </div>
        <v-icon size="18"> mdi-chevron-down </v-icon>
      </v-btn>
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
            style="font-size: 14px; line-height: 16px"
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
      <template v-for="button in headerButtons">
        <v-btn
          color="white"
          :key="button.title"
          v-if="showButton(button)"
          style="font-size: 14px; line-height: 16px"
          @click="clickHeaderButton(button)"
          class="ma-2 secondary--text button"
          elevation="0"
        >
          <v-icon size="16" style="margin-right: 5px">{{
            button.iconName
          }}</v-icon>
          {{ button.title }}
        </v-btn>
      </template>
      <span class="divider"></span>
      <template>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="language-button text-capitalize"
              text
              v-bind="attrs"
              v-on="on"
            >
              {{ currentLanguage }}
              <v-icon size="18"> mdi-chevron-down </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              selectable
              class="language-item"
              v-for="(item, index) in languages"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { SET_MODAL_NAME } from "@/store/mutation-types";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      editDialog: false,
      headerButtons: [
        {
          title: "Экспорт в PDF",
          iconName: "mdi-export-variant",
          name: "exportPdf",
        },
        {
          title: "Редактировать",
          iconName: "mdi-pencil",
          name: "edit-goverment",
        },
        {
          title: "Удалить ГО",
          iconName: "mdi-delete-outline",
          name: "delete-goverment",
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
      languages: [
        {
          name: "kz",
          title: "Каз",
        },
        {
          name: "ru",
          title: "Рус",
        },
        {
          name: "en",
          title: "Англ",
        },
      ],
    };
  },
  components: {
    Badge: () => import("../Badge/Badge.vue"),
  },
  computed: {
    selectedGovOrg() {
      return this.$store.state.homeStore.selectedGoverment;
    },
    currentLanguage() {
      switch (this.$store.getters.GET_CURRENT_LANGUAGE) {
        case "ru":
          return "Рус";
        case "kz":
          return "Каз";
        case "en":
          return "Анг";
      }
    },
  },
  methods: {
    editGovOrg() {
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
    showButton(button): boolean {
      if (!["edit-goverment", "delete-goverment"].includes(button.name))
        return true;
      return (
        this.$route.name !== "home.select-goverment" && this.selectedGovOrg
      );
    },
    clickHeaderButton(button) {
      if (["edit-goverment", "delete-goverment"].includes(button.name)) {
        this.$store.dispatch(SET_MODAL_NAME, button.name);
      }
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

.divider {
  background: #dadada;
  display: inline-block;
  width: 1px;
  position: absolute;
  top: 25px;
  height: 16px;
}

.langugage-button {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #414649;
}
.language-item {
  &:hover {
    cursor: pointer;
  }
}
</style>
