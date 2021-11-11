<template>
  <v-container class="px-15 py-15 dark-secondary">
    <div class="d-flex">
      <v-btn
        class="mr-2"
        style="background: white"
        elevation="0"
        @click="$router.go(-1)"
      >
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <h2>История действий</h2>
    </div>
    <v-data-table
      v-if="!isLoading"
      :headers="headers"
      :items="logs"
      item-key="date"
      class="elevation-0 dark-secondary"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      :footer-props="{
        'items-per-page-text': 'Строк на странице',
        pageText: '{0} из {1}',
      }"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          append-icon="mdi-filter-menu-outline"
          label="Поиск"
          class="mx-4"
        ></v-text-field>
      </template>
      <template>
        <tr>
          <td></td>
          <td>
            <v-text-field
              v-model="user"
              outlined
              type="number"
              label="Less than"
              @click="filterToggle()"
            ></v-text-field>
          </td>
          <td colspan="4"></td>
        </tr>
      </template>
    </v-data-table>
    <div v-else class="d-flex justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>
<script lang="ts">
import { SET_LOGS } from "@/store/mutation-types";
import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  data() {
    return {
      search: "",
      user: "",
      isLoading: false,
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Дата",
          align: "start",
          value: "dateTime",
        },
        {
          text: "Пользователь",
          value: "username",
        },
        { text: "Должность", value: "position" },
        { text: "Действия", value: "action" },
        { text: "Комментарий", value: "comment" },
      ];
    },
    ...mapGetters(["logs"]),
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
    filterToggle() {},
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch(SET_LOGS);
    this.isLoading = false;
  },
});
</script>

<style lang="scss" scoped>
.dark-secondary {
  background: $dark-secondary;
}
table {
  border: none;
}
</style>
