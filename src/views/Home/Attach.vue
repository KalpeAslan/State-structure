<template>
  <div style="nav-constructor">
    <v-navigation-drawer
      width="353"
      permanent
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="header d-flex justify-space-between">
        <div class="text-h6 d-inline-block">Роли</div>
      </div>
      <v-text-field
        outlined
        v-model="inputEmployies"
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-list-item v-for="employe in employes" :key="employe.value">
        <v-list-item-content>
          <v-list-item-title>{{ employe.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-divider></v-divider>
    <v-navigation-drawer
      width="353"
      permanent
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="header d-flex justify-space-between">
        <div class="text-h6 d-inline-block">Сотрудники</div>
      </div>
      <v-text-field
        outlined
        label="Поиск"
        v-model="inputRoles"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-list-item v-for="role in roles" :key="role.value">
        <v-list-item-content>
          <v-list-item-title>{{ role.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { SET_EMPLOYIES, SET_ROLES } from "@/store/mutation-types";
export default {
  data() {
    return {
      inputRoles: null,
      inputEmployies: null,
    };
  },
  beforeCreate() {
    this.$store.dispatch(SET_EMPLOYIES, [
      {
        title: "Сотрудник 0",
        id: 0,
      },
      {
        title: "Сотрудник 1",
        id: 1,
      },
      {
        title: "Сотрудник 2",
        id: 3,
      },
      {
        title: "Сотрудник 3",
        id: 4,
      },
      {
        title: "Сотрудник 4",
        id: 5,
      },
    ]);
    this.$store.dispatch(SET_ROLES, [
      {
        title: "Роль 78",
        id: 0,
      },
      {
        title: "Роль 1",
        id: 0,
      },
      {
        title: "Роль 1",
        id: 0,
      },
      {
        title: "Роль 1",
        id: 0,
      },
    ]);
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
};
</script>

<style lang="scss" scoped>
.nav-constructor {
  height: 100%;
  .nav-constructor_item {
    height: 50%;
  }
}
</style>
