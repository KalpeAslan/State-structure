<template>
  <v-row justify="center">
    <v-dialog v-model="modalDialogMixin" max-width="400px">
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
import { IGovermentReq } from "@/store/interfaces";
import { ADD_GOVERMENT } from "@/store/mutation-types";
import {modalMixin} from '../../mixins/modalMixin'
import Vue from "vue";
export default Vue.extend({
  props: {
    modalDialog: {
      type: Boolean,
      default: false,
    },
  },
  mixins:[modalMixin('modalDialog')],
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
      } as IGovermentReq,
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
        this.$emit('close-modal')
        this.goverment.nameEngShort = "Test Value"
        this.goverment.nameRuShort = "Test Value"
        this.goverment.nameKzShort = "Test Value"
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

function modalMixin(): import("vue").VueConstructor<Vue>|import("vue").ComponentOptions<Vue, import("vue/types/options").DefaultData<Vue>, import("vue/types/options").DefaultMethods<Vue>, import("vue/types/options").DefaultComputed, import("vue/types/options").PropsDefinition<...>, import("vue/types/options").DefaultProps> {
  throw new Error("Function not implemented.");
}

function modalMixin(props: any): import("vue").VueConstructor<Vue>|import("vue").ComponentOptions<Vue, import("vue/types/options").DefaultData<Vue>, import("vue/types/options").DefaultMethods<Vue>, import("vue/types/options").DefaultComputed, import("vue/types/options").PropsDefinition<...>, import("vue/types/options").DefaultProps> {
  throw new Error("Function not implemented.");
}
