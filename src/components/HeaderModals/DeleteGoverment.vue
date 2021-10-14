<template>
  <v-dialog v-model="show" persistent max-width="420">
    <v-card>
      <v-card-title class="text-h5" style="padding: 36px 24px 8px">Удалить «Название ГО» ?</v-card-title>
      <v-card-text style="border-bottom: 1px solid #dadada; color: #414649"
        >Информация о государственном органе, штатной структуре будет удалена безвозвратно без возможности
        восстановления.</v-card-text
      >
      <v-card-actions style="display: flex; justify-content: space-between">
        <v-btn
          style="text-transform: capitalize; font-weight: 400"
          class="ma-2"
          outlined
          color="#2F80ED"
          @click="show = false"
        >
          Отмена
        </v-btn>
        <v-btn style="text-transform: capitalize; font-weight: 400" depressed color="primary" @click="show = false">
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["visible"],
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
};
</script>
