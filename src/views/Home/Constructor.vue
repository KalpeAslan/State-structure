<template>
  <div class="nav-constructor">
    <v-navigation-drawer
      width="353"
      permanent
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="header d-flex justify-space-between">
        <div class="text-h6 d-inline-block">Штатная структура</div>
        <v-btn
          color="primary"
          class="mb-2 d-inline-block"
          outlined
          width="97"
          max-width="97"
          variant="outlined"
        >
          <v-icon size="14"> mdi-plus-thick </v-icon>
          <div class="text-caption">Добавить</div>
        </v-btn>
      </div>
      <v-text-field
        outlined
        label="Prepend inner"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-treeview :items="items"></v-treeview>
    </v-navigation-drawer>
    <v-divider></v-divider>

    <v-navigation-drawer
      width="353"
      permanent
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="header d-flex justify-space-between">
        <div class="text-h6 d-inline-block">Должности</div>
        <v-btn
          color="primary"
          class="mb-2 d-inline-block"
          outlined
          width="97"
          max-width="97"
          variant="outlined"
        >
          <v-icon size="14"> mdi-plus-thick </v-icon>
          <div class="text-caption">Добавить</div>
        </v-btn>
      </div>
      <v-text-field
        outlined
        label="Prepend inner"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>

      <v-list dense>
        <v-list-item
          v-for="item in list"
          :key="item.value"
          class="justify-space-between"
        >
          {{ item.title }}
          <v-btn icon style="flex: none" v-on="on" v-bind="attrs">
            <v-icon> mdi-dots-horizontal </v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 5,
          name: "Название ГО :",
          children: [
            {
              id: 6,
              name: "Департамент 1 :",
              children: [
                {
                  id: 7,
                  name: "Отдел 1 :",
                  children: [
                    {
                      id: 9,
                      name: "Должность 1",
                    },
                    {
                      id: 10,
                      name: "Должность 2",
                    },
                  ],
                },
                {
                  id: 11,
                  name: "Отдел 2 :",
                  children: [
                    {
                      id: 12,
                      name: "Должность 1",
                    },
                    {
                      id: 13,
                      name: "Должность 2",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      list: [
        {
          title: "Должность 0",
          value: 0,
        },
        {
          title: "Должность 1",
          value: 1,
        },
        {
          title: "Должность 2",
          value: 3,
        },
        {
          title: "Должность 3",
          value: 4,
        },
        {
          title: "Должность 4",
          value: 5,
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
    height: 50% !important;
  }
}
</style>
