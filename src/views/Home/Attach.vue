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
        label="Prepend inner"
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
        label="Prepend inner"
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
export default {
  data() {
    return {
      employes: [
        {
          title: "Сотрудник 0",
          value: 0,
        },
        {
          title: "Сотрудник 1",
          value: 1,
        },
        {
          title: "Сотрудник 2",
          value: 3,
        },
        {
          title: "Сотрудник 3",
          value: 4,
        },
        {
          title: "Сотрудник 4",
          value: 5,
        },
      ],
      roles: [
        {
          title: "Роль 1",
          value: 0,
        },
        {
          title: "Роль 1",
          value: 0,
        },
        {
          title: "Роль 1",
          value: 0,
        },
        {
          title: "Роль 1",
          value: 0,
        },
      ],
    };
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
