<template>
  <v-row justify="center">
    <v-dialog v-model="show" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Добавить ГО</span>
        </v-card-title>
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
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { IGoverment } from "@/store/interfaces";
import { ADD_GOVERMENT } from "@/store/mutation-types";
import Vue from "vue";
export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      goverment: {
        bin: null,
        nameRu: null,
        nameKz: null,
        nameEn: null,
        nameRuShort: null,
        nameKzShort: null,
        nameEngShort: null,
      } as IGoverment,
      govermentForm: [
        {
          name: "bin",
          label: "БИН",
        },
        {
          name: "nameRu",
          label: "Наименование на русском",
        },
        {
          name: "nameKz",
          label: "Наименование на казахском",
        },
        {
          name: "nameEn",
          label: "Наименование на английском",
        },
      ],
    };
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
        this.show = false;
        this.$store.dispatch(ADD_GOVERMENT, this.goverment);
      }
    },
  },
});
</script>

<style scoped>
.label {
  font-size: 14px;
  line-height: 16px;
  color: #000000;
}
</style>
