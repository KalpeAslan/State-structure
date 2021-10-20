<template>
  <v-dialog v-model="modalDialogMixin" persistent width="490">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
    </template>
    <v-card class="delete-goverment">
      <v-card-title
        class="text-h5"
        style="font-weight: 500; font-size: 20px; line-height: 24px"
      >
        Удалить "Название ГО"
      </v-card-title>
      <v-btn class="close-button" icon text @click="modalDialogMixin = false">
        <v-icon> mdi-close </v-icon>
      </v-btn>
      <v-card-text class="text-subtitle1 description"
        >Информация о государственном органе, штатной структуре будет удалена
        безвозвратно без возможности восстановления</v-card-text
      >
      <v-divider />
      <v-card-actions class="d-flex justify-space-between">
        <v-spacer></v-spacer>
        <v-btn
          absolute
          color="primary"
          style="font-size: 14px; font-weight: normal"
          outlined
          @click="modalDialogMixin = false"
        >
          Отмена
        </v-btn>
        <v-btn
          color="primary"
          style="font-size: 14px; font-weight: normal"
          @click="modalDialogMixin = false"
        >
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { modalsMixin } from "@/mixins/modalsMixin";
export default {
  mixins: [modalsMixin],
};
</script>
<style lang="scss" scoped>
.delete-goverment {
  position: relative;
  padding-top: 16px;

  .description {
    width: 392px;
  }
  .close-button {
    position: absolute;
    right: 11px;
    top: 11px;
  }
}
</style>
