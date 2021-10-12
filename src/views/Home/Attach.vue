<template>
  <div style="nav-constructor">
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
        v-model="inputEmployies"
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-list-item
        draggable
        @dragstart="dragStart($event, employe)"
        v-for="employe in employes"
        :key="employe.value"
      >
        <v-list-item-content>
          <v-list-item-title>{{ employe.name }}</v-list-item-title>
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
        <div class="text-h6 d-inline-block">Роли</div>
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
      >
        <v-list-item-content>
          <v-list-item-title>{{ role.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import { IEmployee } from "@/store/interfaces";
import { SET_EMPLOYIES, SET_ROLES } from "@/store/mutation-types";
import Vue from "vue";

const tempEmployee: IEmployee[] = [
  {
    name: "Сотрудник 0",
    id: 0,
    type: "employee",
  },
  {
    name: "Сотрудник 1",
    id: 1,
    type: "employee",
  },
  {
    name: "Сотрудник 2",
    id: 3,
    type: "employee",
  },
  {
    name: "Сотрудник 3",
    id: 4,
    type: "employee",
  },
  {
    name: "Сотрудник 4",
    id: 5,
    type: "employee",
  },
];

export default Vue.extend({
  data() {
    return {
      inputRoles: null,
      inputEmployies: null,
    };
  },
  beforeCreate() {
    this.$store.dispatch(SET_EMPLOYIES, tempEmployee);
    this.$store.dispatch(SET_ROLES, [
      {
        name: "Роль 78",
        id: 0,
      },
      {
        name: "Роль 1",
        id: 1,
      },
      {
        name: "Роль 1",
        id: 2,
      },
      {
        name: "Роль 1",
        id: 3,
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
  methods: {
    dragStart($event: DragEvent, item) {
      if (item.type === "employee") {
        $event.dataTransfer.setData("employeeId", item.id.toString());
      } else {
        $event.dataTransfer.setData("roleId", item.id.toString());
      }
      $event.dataTransfer.dropEffect = "move";
      $event.dataTransfer.effectAllowed = "move";
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
</style>
