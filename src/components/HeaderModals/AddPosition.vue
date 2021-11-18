<template>
  <v-row justify="center">
    <v-dialog v-model="modalDialogMixin" width="420px">
      <v-card>
        <v-card-title>
          <span class="text-h5">
            {{ $t("addPosition") }}
          </span>
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
                <div v-for="inputName in positionFormAsArray" :key="inputName">
                  <div class="label">
                    {{ $t(positionForm[inputName].label) }}
                  </div>
                  <v-text-field
                    :rules="[(v) => !!v || $t('fillTheField')]"
                    outlined
                    class="mb-3"
                    hide-details
                    required
                    v-model="positionForm[inputName].value"
                  >
                  </v-text-field>
                </div>
                <v-btn type="submit" color="primary" @click="validate">
                  {{ $t("save") }}
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
import { IPositionNew } from "@/store/interface";
import { IGovermentReq } from "@/store/interfaces";
import { ADD_POSITION, EDIT_GOVERMENT } from "@/store/mutation-types";
import Vue from "vue";
export default Vue.extend({
  name: "add-position-modal",
  mixins: [modalsMixin],
  data() {
    return {
      valid: true,
      positionForm: {
        nameRu: {
          name: "nameRu",
          label: "nameInRus",
          value: null,
        },
        nameKz: {
          name: "nameKz",
          label: "nameInKaz",
          value: null,
        },
        nameEng: {
          name: "nameEng",
          label: "nameInEng",
          value: null,
        },
      },
    };
  },
  computed: {
    goverment(): IGovermentReq {
      return this.$store.getters.GET_SELECTED_GA;
    },
    positionFormAsArray(): string[] {
      return Object.keys(this.positionForm);
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
      if (
        Object.values(this.$refs.form.errorBag).every((errorBag) => !errorBag)
      ) {
        const positionNew: IPositionNew = {
          nameEngShort: this.positionForm.nameEng.value + " short",
          nameRuShort: this.positionForm.nameRu.value + " short",
          nameKzShort: this.positionForm.nameKz.value + " short",
          ddepartmentIinId: this.goverment.id,
          nameEng: this.positionForm.nameEng.value,
          nameRu: this.positionForm.nameRu.value,
          nameKz: this.positionForm.nameKz.value,
        };

        this.$store.dispatch(ADD_POSITION, positionNew).then(() => {
          this.$emit("close-modal");
          this.$destroy();
        });
      }
    },
  },
});
</script>
