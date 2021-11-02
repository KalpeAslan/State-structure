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
              <div v-for="inputName in formAsArray" :key="inputName">
                <div class="label">{{ formLabels[inputName] }}</div>
                <v-text-field
                  @input="$v.form[inputName].$reset()"
                  :error-messages="
                    inputName === 'iin'
                      ? iinErrors
                      : computeNamesError(inputName)
                  "
                  outlined
                  :hide-details="!$v.form.iin.$error"
                  class="mb-3"
                  required
                  v-model="form[inputName]"
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
import { ADD_GOVERMENT } from "@/store/mutation-types";
import { modalMixin } from "../../mixins/modalMixin";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import Component from "vue-class-component";
import Vue from "vue";
import { IGovermentReq } from "@/store/interfaces";
const validations = {
  form: {
    iin: {
      required,
      maxLength: maxLength(12),
      minLength: minLength(12),
    },
    nameRu: {
      required,
    },
    nameKz: {
      required,
    },
    nameEng: {
      required,
    },
  },
};

@Component({
  name: "add-goverment-modal",
  mixins: [modalMixin("modalDialog")],
  props: {
    modalDialog: {
      default: false,
      type: Boolean,
    },
  },
  validations: validations,
})
export default class AddGoverment extends Vue {
  //data
  valid: boolean = true;
  goverment: IGovermentReq = {
    iin: null,
    nameRu: null,
    nameKz: null,
    nameEng: null,
    nameRuShort: null,
    nameKzShort: null,
    nameEngShort: null,
  };

  form = {
    iin: null,
    nameRu: null,
    nameKz: null,
    nameEng: null,
  };
  formLabels = {
    iin: "БИН",
    nameRu: "Наименование на русском",
    nameKz: "Наименование на казахском",
    nameEng: "Наименование на английском",
  };
  formAsArray: string[] = Object.keys(this.form);

  //computed
  get iinErrors(): string[] {
    const errors: string[] = [];
    if (!this.$v.form.iin.$dirty) return errors;
    if (!this.$v.form.iin.required) {
      errors.push("Поле обязательно для заполнения");
    }
    if (!this.$v.form.iin.maxLength || !this.$v.form.iin.minLength)
      errors.push("Длина ИИН должна быть 12 символов");
    return errors;
  }

  //methods
  validate(): void {
    this.$refs.form.validate();
  }
  reset(): void {
    this.$refs.form.reset();
  }
  submit(): void {
    this.$v.form.$touch();
    if (!this.$v.$error) {
      this.$emit("close-modal");
      this.goverment = { ...this.goverment, ...this.form };
      console.log(this.goverment);
      this.goverment.nameEngShort = "Test ValueEng";
      this.goverment.nameRuShort = "Test ValueRu";
      this.goverment.nameKzShort = "Test ValueKz";
      this.$store.dispatch(ADD_GOVERMENT, this.goverment);
    }
  }
  computeNamesError(nameLang: string): string[] {
    const errors = [];
    const field = this.$v.form[nameLang];
    if (!field.$dirty) return errors;
    !field.required && errors.push("Заполните это поле!");
    return errors;
  }

  $refs!: {
    form: HTMLFormElement;
  };
}
</script>

<style scoped>
.label {
  font-size: 14px;
  line-height: 16px;
  color: #000000;
}
</style>
