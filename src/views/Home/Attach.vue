<template>
  <div class="nav-constructor">
    <v-navigation-drawer
      width="353"
      height="50%"
      permanent
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="header d-flex justify-space-between">
        <div
          class="text-h6 d-inline-block"
          style="
            font-weight: 500;
            font-size: 16px !important;
            line-height: 24px;
            margin-bottom: 10px;
          "
        >
          {{ $t("employees") }}
        </div>
      </div>
      <v-text-field
        outlined
        v-model="inputEmployies"
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-list-item
        draggable
        @dragstart="dragStart($event, employe)"
        @dragend="dragEnd"
        v-for="employe in employes"
        :key="employe.value"
      >
        <v-list-item-content>
          <span style="font-size: 14px"> {{ employe.user.name }}</span>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-divider></v-divider>
    <v-navigation-drawer
      width="353"
      permanent
      height="50%"
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="header d-flex justify-space-between">
        <div
          class="text-h6 d-inline-block"
          style="
            font-weight: 500;
            font-size: 16px !important;
            line-height: 24px;
            margin-bottom: 10px;
          "
        >
          {{ $t("roles") }}
        </div>
      </div>
      <v-text-field
        outlined
        label="Поиск"
        v-model="inputRoles"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-list-item
        v-for="role in roles"
        :key="role.value"
        draggable
        @dragstart="dragStart($event, role)"
        @dragend="dragEnd"
      >
        <v-list-item-content>
          <span style="font-size: 14px">
            {{ role.roleId }}
          </span>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import treeMixin from "@/mixins/treeMixin";
import { employees } from "@/store/dump";
import { SET_EMPLOYIES, SET_ROLES } from "@/store/mutation-types";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      inputRoles: null,
      inputEmployies: null,
    };
  },
  created() {
    this.$store.dispatch(SET_EMPLOYIES, employees);
    this.$store.dispatch(SET_ROLES);
  },
  computed: {
    roles() {
      return this.$store.getters.GET_ATTACH_ITEMS(this.inputRoles, "roles");
    },
    employes() {
      return this.$store.getters.GET_ATTACH_ITEMS(
        this.inputEmployies,
        "employes"
      );
    },
  },
  mixins: [treeMixin],
});
</script>

<style lang="scss" scoped>
.nav-constructor {
  height: 100%;
}
</style>
