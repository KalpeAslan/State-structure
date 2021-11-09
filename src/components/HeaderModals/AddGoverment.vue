<template>
  <v-row justify="center">
    <v-dialog v-model="modalDialogMixin" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-h5">
            {{ $t("addGovermentAgency") }}
          </span>
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
                <div class="label">{{ $t(formLabels[inputName]) }}</div>
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
    nameRus: {
      required,
    },
    nameKaz: {
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

  form = {
    iin: null,
    nameRus: null,
    nameKaz: null,
    nameEng: null,
  };
  formLabels = {
    iin: "bin",
    nameRus: "nameInRus",
    nameKaz: "nameInKaz",
    nameEng: "nameInEng",
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
      const goverment: IGovermentReq = {
        nameEngShort: this.form.nameEng + 7784,
        nameRusShort: this.form.nameRus + 545,
        nameKazShort: this.form.nameKaz + 547,
        ...this.form,
      };
      this.$store.dispatch(ADD_GOVERMENT, goverment);
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
