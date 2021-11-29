<template>
  <v-row justify="center">
    <v-dialog v-model="modalDialogMixin" width="420px" persistent>
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
          >
            {{ $t("ncaLayerClosed") }}
          </span>
        </v-card-title>
        <v-btn class="close-button" icon text @click="modalDialogMixin = false">
          <v-icon> mdi-close </v-icon>
        </v-btn>
        <v-card-text>
          <template>
            <div class="text-subtitle1">
              {{ ncaLayerText.installOrTurnOnNcaLayer | translate }}
              <a href="https://pki.gov.kz/ncalayer/">
                {{ ncaLayerText.followLink | translate }}
              </a>
              {{ ncaLayerText.tryAgain | translate }}
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
            {{ $t("close") }}
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
import { generateTranslateForms } from "@/utils/generateTranslateForms";
import Vue from "vue";
export default Vue.extend({
  name: "nca-layer-modal",
  mixins: [modalsMixin],
  data() {
    return {
      valid: true,
      isError: false,
      comment: null,
      ncaLayerText: {
        installOrTurnOnNcaLayer: {
          nameRu: "Запустите NCALayer на компьютере или",
          nameKz: "Компьютерде NCALayer іске қосыңыз немесе",
          nameEng: "Run NCALayer on your computer or",
        },
        followLink: generateTranslateForms(
          "перейдите по ссылке на установки программы",
          "бағдарламаны орнату сілтемесіне өтіңіз",
          "follow the link to install the program"
        ),
        tryAgain: generateTranslateForms(
          "и попробуйте повторить операцию",
          "операцияны қайталауға тырысыңыз",
          "and try to repeat the operation"
        ),
      },
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
