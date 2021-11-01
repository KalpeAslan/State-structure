<template>
  <v-row justify="center">
    <v-dialog v-model="modalDialogMixin" width="420px">
      <v-card>
        <v-card-title>
          <span
            class="text-h5"
            style="
              font-weight: 500;
              font-size: 20px !important;
              line-height: 24px;
              word-break: normal;
            "
            >Невозможно подключиться к NCALayer. Программа не запущена
            или не установлена</span
          >
        </v-card-title>
        <v-btn class="close-button" icon text @click="modalDialogMixin = false">
          <v-icon> mdi-close </v-icon>
        </v-btn>
        <v-card-text>
          <template>
            <div class="text-subtitle1">
              Запустите NCALayer на компьютере или
              <a href="https://pki.gov.kz/ncalayer/"
                >перейдите по ссылке на установки программы</a
              >
              и попробуйте повторить операцию
            </div>
          </template>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            class="primary"
            style="font-size: 14px !important; line-height: 16px"
            @click="modalDialogMixin = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { modalsMixin } from "@/mixins/modalsMixin";
import { IGovermentReq } from "@/store/interfaces";
import { SEND_TO_REJECT } from "@/store/mutation-types";
import Vue from "vue";
export default Vue.extend({
  name: "nca-layer-modal",
  mixins: [modalsMixin],
  data() {
    return {
      valid: true,
      isError: false,
      comment: null,
    };
  },
  computed: {
    goverment(): IGovermentReq {
      return this.$store.getters.GET_SELECTED_GA;
    },
  },
  watch: {
    comment(val) {
      this.isError = !!val;
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      if (!this.comment) return (this.isError = true);
      this.$emit("close-modal");
      this.$store.dispatch(SEND_TO_REJECT);
    },
  },
});
</script>

<style lang="scss" scoped>
.close-button {
  position: absolute;
  right: 11px;
  top: 11px;
}
</style>
