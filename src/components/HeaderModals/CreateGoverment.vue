<template>
  <v-row justify="center">
    <v-dialog v-model="show" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Добавить ГО</span>
        </v-card-title>
        <v-card-text style="padding: 0 12px 0px">
          <v-container>
            <template>
              <v-form ref="form" lazy-validation>
                <div v-for="input in editForm" :key="input.title">
                  <div class="text-subtitle1">{{ input.title }}</div>
                  <v-text-field
                    :placeholder="input.title"
                    outlined
                    class="mb-3"
                    hide-details
                    v-model="selectedToCreateGovOrg[input.name]"
                  >
                  </v-text-field>
                </div>
              </v-form>
            </template>
          </v-container>
        </v-card-text>
        <v-card-actions style="padding: 0 24px 36px">
          <v-btn style="text-transform: capitalize; font-weight: 400" color="primary" @click="show = false">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["visible"],
  data() {
    return {
      editForm: [
        {
          title: "БИН",
          name: "bin",
        },
        {
          title: "Наименование на русском",
          name: "name",
        },
        {
          title: "Наименование на казахском",
          name: "nameKz",
        },
        {
          title: "Наименование на английском",
          name: "nameEn",
        },
      ],
    };
  },
  computed: {
    selectedToCreateGovOrg() {
      return {
        name: "",
        nameEn: "",
        nameKz: "",
        bin: "",
      };
    },
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
};
</script>
