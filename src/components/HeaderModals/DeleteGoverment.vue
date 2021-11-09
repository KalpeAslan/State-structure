<template>
  <v-dialog v-model="modalDialogMixin" persistent width="490">
    <v-card class="delete-goverment">
      <v-card-title
        class="text-h5"
        style="font-weight: 500; font-size: 20px; line-height: 24px"
      >
        {{ $t("delete") }} {{ nameOfGa | translate }}
      </v-card-title>
      <v-btn class="close-button" icon text @click="modalDialogMixin = false">
        <v-icon> mdi-close </v-icon>
      </v-btn>
      <v-card-text class="text-subtitle1 description">{{
        $t("infoDelele")
      }}</v-card-text>
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
          {{ $t("cancel") }}
        </v-btn>
        <v-btn
          color="primary"
          style="font-size: 14px; font-weight: normal"
          @click="deleteGa"
        >
          {{ $t("delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { modalsMixin } from "@/mixins/modalsMixin";
import { DELETE_GOVERMENT } from "../../store/mutation-types";
export default {
  mixins: [modalsMixin],
  methods: {
    deleteGa() {
      this.$store.dispatch(DELETE_GOVERMENT);
      this.modalDialogMixin = false;
    },
  },
  computed: {
    nameOfGa() {
      return this.$store.getters.GET_SELECTED_GA;
    },
  },
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
