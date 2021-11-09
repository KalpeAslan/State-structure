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
                <div class="label">{{ input.label }}</div>
                <v-text-field
                  :rules="[(v) => !!v || $t('fillTheField')]"
                  outlined
                  class="mb-3"
                  hide-details
                  required
                  v-model="subdivision[input.name]"
                >
                </v-text-field>
              </div>
              <v-btn type="submit" color="primary" @click="validate">
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
  name: "add-subdivision-modal",
  mixins: [modalsMixin],
  data() {
    return {
      valid: true,
      subdivision: {
        nameRus: null,
        nameKaz: null,
        nameEng: null,
      },
      subdivisionForm: [
        {
          name: "nameRus",
          label: "nameInRus",
        },
        {
          name: "nameKaz",
          label: "nameInKaz",
        },
        {
          name: "nameEng",
          label: "nameInEng",
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
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      if (this.subdivisionForm.every((f) => this.subdivision[f.name])) {
        const subdivisionForm: ISubdivisonReq = {
          ...this.subdivision,
          nameRusShort: this.subdivision.nameRus + " short",
          nameKazShort: this.subdivision.nameKaz + " short",
          nameEngShort: this.subdivision.nameEng + " short",
          department: null,
          governmentAgencyId:
            this.$store.getters.GET_SELECTED_GA.governmentAgencyTableid,
        };
        this.$store.dispatch(ADD_SUBDIVISION, subdivisionForm).then(() => {
          this.reset();
          this.$emit("close-modal");
        });
      }
    },
  },
});
</script>
