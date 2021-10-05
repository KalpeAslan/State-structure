<template>
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
    <v-list dense>
      <v-list-item v-for="(govOrg, index) in govOrgs" :key="index">
        <v-list-item-content class="d-flex justify-space-between badge">
          {{ govOrg.name }}
          <Badge :state="govOrg.state" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      govOrgs: [
        {
          name: "Наименование ГО",
          state: "created",
        },
        {
          name: "Наименование ГО",
          state: "created",
        },
        {
          name: "Наименование ГО",
          state: "created",
        },
        {
          name: "Наименование ГО",
          state: "onApproval",
        },
        {
          name: "Наименование ГО",
          state: "aproved",
        },
        {
          name: "Наименование ГО",
          state: "notAproved",
        },
        {
          name: "Наименование ГО",
          state: "onClaim",
        },
        {
          name: "Наименование ГО",
          state: "claimed",
        },
        {
          name: "Наименование ГО",
          state: "notClaimed",
        },
      ],
    };
  },
  components: {
    Badge: () => import("../../components/Badge/Badge.vue"),
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
.badge {
  font-size: 12px;
}
</style>
