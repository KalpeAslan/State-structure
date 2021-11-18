<template>
  <v-row justify="center">
    <v-dialog v-model="modalDialogMixin" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ $t("addSubdivision") }} </span>
        </v-card-title>
        <v-container>
          <template>
            <v-form
              @submit.prevent="submit"
              ref="form"
              lazy-validation
              v-model="valid"
            >
              <div v-for="input in subdivisionForm" :key="input.name">
                <div class="label">{{ $t(input.label) }}</div>
                <v-text-field
                  :rules="[
                    (v) => validator(input, v),
                    (v) => validator(input, v),
                  ]"
                  outlined
                  class="mb-3"
                  :hide-details="!input.hasError"
                  required
                  v-model="subdivision[input.name]"
                >
                </v-text-field>
              </div>
              <v-btn type="submit" color="primary">
                {{ $t("save") }}
              </v-btn>
            </v-form>
          </template>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { modalsMixin } from "@/mixins/modalsMixin";
import { IGovermentReq, ISubdivisonReq } from "@/store/interfaces";
import { ADD_SUBDIVISION, EDIT_GOVERMENT } from "@/store/mutation-types";
import Vue from "vue";

export default Vue.extend({
  mixins: [modalsMixin],
  data() {
    //
    return {
      valid: true,
      isFormDirty: false,
      subdivision: {
        nameRus: null,
        nameKaz: null,
        nameEng: null,
      },
      subdivisionForm: [
        {
          name: "nameRus",
          label: "nameInRus",
          hasError: false,
        },
        {
          name: "nameKaz",
          label: "nameInKaz",
          hasError: false,
        },
        {
          name: "nameEng",
          label: "nameInEng",
          hasError: false,
        },
      ],
    };
  },
  computed: {
    goverment(): IGovermentReq {
      const goverment = this.$store.getters.GET_SELECTED_GA;
      return { ...goverment };
    },
  },
  methods: {
    submit() {
      this.isFormDirty = true;
      this.validate();
      if (this.subdivisionForm.every((f) => !f.hasError)) {
        const subdivisionForm: ISubdivisonReq = {
          ...this.subdivision,
          nameRusShort: this.subdivision.nameRus + " short",
          nameKazShort: this.subdivision.nameKaz + " short",
          nameEngShort: this.subdivision.nameEng + " short",
          department: null,
          governmentAgencyId: this.$store.getters.GET_SELECTED_GA.id,
        };
        this.$store.dispatch(ADD_SUBDIVISION, subdivisionForm).then(() => {
          this.reset();
          this.$emit("close-modal");
        });
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    validator(input, value: string | null) {
      if (!this.isFormDirty) return true;
      if (!value) {
        return this.setError(input, "fill");
      }
      if (input.name === "nameEng") {
        if (
          Object.entries(this.subdivision).some(
            ([subdivisionKey, subdivisionValue]) =>
              subdivisionKey !== "nameEng" && subdivisionValue !== value
          )
        ) {
          input.hasError = false;
          return true;
        } else {
          return this.setError(input, "nameEngMustBeUnique");
        }
      }
      input.hasError = false;
      return true;
    },
    setError(input, errorType: string): string {
      input.hasError = true;
      return this.$t(
        errorType !== "fill" ? "nameEngMustBeUnique" : "fillTheField"
      );
    },
  },
});
</script>
