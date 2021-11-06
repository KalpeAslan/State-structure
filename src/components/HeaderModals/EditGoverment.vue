<template>
  <v-row justify="center">
    <v-dialog v-model="modalDialogMixin" width="420px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Редактировать ГО</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <template>
              <v-form
                @submit.prevent="submit"
                ref="form"
                lazy-validation
                v-model="valid"
              >
                <div v-for="input in govermentForm" :key="input.name">
                  <div class="label">{{ input.label }}</div>
                  <v-text-field
                    :rules="[(v) => !!v || 'Заполните это поле!']"
                    outlined
                    class="mb-3"
                    hide-details
                    required
                    v-model="goverment[input.name]"
                  >
                  </v-text-field>
                </div>
                <v-btn type="submit" color="primary" @click="validate">
                  Сохранить
                </v-btn>
              </v-form>
            </template>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { modalsMixin } from "@/mixins/modalsMixin";
import { IGovermentReq } from "@/store/interfaces";
import { EDIT_GOVERMENT } from "@/store/mutation-types";
import Vue from "vue";
export default Vue.extend({
  mixins: [modalsMixin],
  data() {
    return {
      valid: true,
      govermentForm: [
        {
          name: "iin",
          label: "БИН",
        },
        {
          name: "nameRus",
          label: "Наименование на русском",
        },
        {
          name: "nameKaz",
          label: "Наименование на казахском",
        },
        {
          name: "nameEng",
          label: "Наименование на английском",
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
      if (this.govermentForm.every((f) => this.goverment[f.name])) {
        this.$emit("close-modal");
        const goverment = { ...this.goverment };
        goverment.status = this.$store.getters.tree.status;
        delete goverment.statusObject;
        goverment.iin = +goverment.iin;
        this.$store.dispatch(EDIT_GOVERMENT, goverment);
      }
    },
  },
});
</script>
