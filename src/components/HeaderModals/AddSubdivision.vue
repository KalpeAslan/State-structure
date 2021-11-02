<template>
  <v-row justify="center">
    <v-dialog v-model="modalDialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Добавить Подразделение</span>
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
                  :rules="[(v) => !!v || 'Заполните это поле!']"
                  outlined
                  class="mb-3"
                  hide-details
                  required
                  v-model="subdivision[input.name]"
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
<script>
import { ADD_SUBDIVISION } from "@/store/mutation-types";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      subdivision: {
        governmentAgencyId:
          this.$store.getters.GET_SELECTED_GA.governmentAgencyTableid,
        superiorSubdivisionId: null,
        nameRu: null,
        nameKz: null,
        nameEng: null,
        nameRuShort: "test nameRuShort",
        subdivisionsTableid: Math.round(Math.random() * 45457),
        nameKzShort: "test nameKzShort",
        nameEngShort: "test nameEngShort",
      },
      subdivisionForm: [
        {
          name: "nameRu",
          label: "Наименование на русском",
        },
        {
          name: "nameKz",
          label: "Наименование на казахском",
        },
        {
          name: "nameEng",
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
      if (this.subdivisionForm.every((f) => this.subdivision[f.name])) {
        this.$emit("close-modal");
        this.$store.dispatch(ADD_SUBDIVISION, { ...this.subdivision });
        this.reset();
      }
    },
  },
  computed: {
    modalDialog: {
      set() {
        this.$emit("close-modal");
      },
      get() {
        return this.show;
      },
    },
  },
};
</script>

<style scoped>
.label {
  font-size: 14px;
  line-height: 16px;
  color: #000000;
}
</style>
