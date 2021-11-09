<template>
  <v-row justify="center">
    <v-dialog v-model="modalDialogMixin" width="420px">
      <v-card>
        <v-card-title>
          <span class="text-h5">
            {{ $t("sendToRevesion") }}
          </span>
        </v-card-title>
        <v-card-text>
          <template>
            <v-form
              @submit.prevent="submit"
              ref="form"
              lazy-validation
              v-model="valid"
            >
              <div class="label" style="color: black">
                {{ $t("indicateTheReason") }}
              </div>
              <v-textarea
                solo
                name="input-7-4"
                v-model="comment"
                hide-details
                height="160"
              ></v-textarea>

              <v-btn
                type="submit"
                style="margin-top: 26px"
                color="primary"
                @click="validate"
              >
                {{ $t("save") }}
              </v-btn>
            </v-form>
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { modalsMixin } from "@/mixins/modalsMixin";
import { IGovermentReq } from "@/store/interfaces";
import { EDIT_GOVERMENT, SEND_TO_REJECT } from "@/store/mutation-types";
import Vue from "vue";
export default Vue.extend({
  name: "return-for-revesion",
  mixins: [modalsMixin],
  data() {
    return {
      valid: true,
      comment: null,
    };
  },
  computed: {
    goverment(): IGovermentReq {
      return this.$store.getters.GET_SELECTED_GA;
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
      this.$emit("close-modal");
      this.$store.dispatch(SEND_TO_REJECT);
    },
  },
});
</script>
