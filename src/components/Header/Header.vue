<template>
  <v-app-bar
    style="z-index: 10"
    elevation="0"
    app
    absolute
    color="white"
    max-height="56px"
  >
    <div class="header-content_left">
      <v-menu  v-if="isShowMenuButton" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              text
              elevation="0"
              v-bind="attrs"
              v-on="on"
          >
            <span v-if="selectedGovOrg" class="header-content_left__selected-government">
              {{selectedGovOrg | translate}}
            </span>
            <span v-else>
              {{ $t("selectGA") }}
            </span>
            <v-icon size="18"> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list flat>
          <v-list-item

              v-for="(item, index) in menuButtons"
              :key="index"
          >
            <v-list-item-title class="hover" @click="selectMenuButton(index)">{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <Badge v-if="selectedGovOrg" :state="selectedGovState"
      >Создан диспетчером</Badge
      >
    </div>
    <v-spacer></v-spacer>
    <div>
      <v-menu v-if="selectedGovOrg" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              elevation="0"
              v-bind="attrs"
              v-on="on"
              text
              style="font-size: 14px; line-height: 16px"
              class="secondary--text button text-capitalize"
          >
            <v-icon size="16" style="margin-right: 5px"> mdi-history </v-icon>
            {{ $t("history") }}
            <v-icon size="18"> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <router-link
              v-for="(item, index) in historyItems"
              :key="index"
              :to="{
              name: item.routeName
            }"
              style="text-decoration: none"
          >
            <v-list-item>
              <v-list-item-title @click="handleHistoryClick(item.routeName)">{{ $t(item.title) }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list>
      </v-menu>

      <template>
        <!-- <template v-if="isEditable"> -->
        <template v-for="button in headerButtons">
          <v-btn
            text
            :key="button.title"
            v-if="showButton(button)"
            style="font-size: 14px; line-height: 16px"
            @click="clickHeaderButton(button)"
            class="ma-2 secondary--text button text-capitalize"
            elevation="0"
          >
            <v-icon size="16" style="margin-right: 5px">{{
              button.iconName
            }}</v-icon>
            {{ $t(button.title) }}
          </v-btn>
        </template>
      </template>
      <span class="divider"></span>
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
            @click="selectLanguage(item.name)"
            v-for="(item, index) in languages"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { documentBuilder } from "@/services/DocumentBuilder";
import { homeService } from "@/services/homeService";
import { language } from "@/store/interfaces";
import {
  SET_LANGUAGE,
  SET_MODAL_NAME,
  SET_USER_TYPE,
} from "@/store/mutation-types";
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  data() {
    return {
      editDialog: false,
      headerButtons: [
        {
          title: "exportPdf",
          iconName: "mdi-export-variant",
          name: "exportPdf",
        },
        {
          title: "edit",
          iconName: "mdi-pencil",
          name: "edit-goverment",
        },
        {
          title: "delete",
          iconName: "mdi-delete-outline",
          name: "delete-goverment",
        },
      ],
      historyItems: [
        {
          title: "historyActions",
          routeName: "Logs",
        },
        {
          title: "historyVersions",
          routeName: "versions-history.id",
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
      roles: [
        {
          text: "dispatcher",
          value: "dispatcher",
        },
        {
          text: "departmentBoss",
          value: "departmentBoss",
        },
        {
          text: "departmentHead",
          value: "departmentHead",
        },
        {
          text: "admin",
          value: "admin",
        },
      ],
    };
  },
  components: {
    Badge: () => import("../Badge/Badge.vue"),
  },
  computed: {
    ...mapGetters({
      selectedGovOrg: "GET_SELECTED_GA",
      selectedGovState: "gaState",
      userType: "userType",
      isEditable: "isEditable",
      gaId: "GET_GA_ID",
      lang: 'GET_CURRENT_LANGUAGE'
    }),
    menuButtons(){
      return [
        {
          name: this.selectedGovOrg ? Vue.filter('translate')(this.selectedGovOrg) : this.$t("selectGA") ,
        },
        {
          name: this.$t('exit')
        }
      ]
    },
    currentLanguage() {
      switch (this.$store.getters.GET_CURRENT_LANGUAGE) {
        case "ru":
          return "Рус";
        case "kz":
          return "Қаз";
        case "en":
          return "Eng";
      }
    },
    selectedRole: {
      get() {
        return this.$store.getters.GET_USER_TYPE;
      },
      set(value) {
        this.$store.dispatch(SET_USER_TYPE, value);
      },
    },
    isShowDefaultButton(): boolean {
      if (this.selectedGovState !== 315) return false;
      if (this.userType !== "dispatcher") return false;
    },
    isShowMenuButton():boolean {
      return this.$route.name !== 'auth'
    }
  },
  methods: {
    selectLanguage(languageName: language) {
      this.$store.dispatch(SET_LANGUAGE, languageName);
    },
    handleHistoryClick(routeName: string) {
      // alert('hellow')
      this.$router.push({
        name: routeName,
      })
    },
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
      if (button.name === "exportPdf") {
        return !!this.gaId;
      }
      // if (!["edit-goverment", "delete-goverment"].includes(button.name))
      //   return true;
      return (
        this.$route.name !== "home.select-goverment" && this.selectedGovOrg
      );
    },
    async clickHeaderButton(button) {
      if (["edit-goverment", "delete-goverment"].includes(button.name)) {
        this.$store.dispatch(SET_MODAL_NAME, button.name);
      }
      if (button.name === "exportPdf") {
        await homeService.getGovermentAgencyRaw(this.gaId).then((gaRaw) => {
          documentBuilder.makePdf(gaRaw, this.lang);
        });
      }
    },
    selectMenuButton(index){
      if(index === 0){
        this.$router.push({
          name: 'home.select-goverment'
        })
      } else {
        this.$store.dispatch('exit')
        this.$router.push({
          name: 'auth'
        })
      }
    }
  },
});
</script>

<style lang="scss" scoped>
.header-content_left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-content_left__selected-government {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.button {
  font-size: 14px;
  line-height: 16px;
  padding: 0 6px;
  font-weight: 400;
}

.hover {
  &:hover{
    cursor: pointer;
  }
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
