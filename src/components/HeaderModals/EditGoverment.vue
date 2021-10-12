<template>
  <v-row v-if="false" justify="center">
    <v-dialog v-model="editDialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Редактировать ГО</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <template>
              <v-form ref="form" lazy-validation>
                <div v-for="input in editForm" :key="input.title">
                  <div class="text-subtitle1">{{ input.title }}</div>
                  <v-text-field
                    :placeholder="selectedToEditGovOrg[input.name]"
                    outlined
                    class="mb-3"
                    hide-details
                    v-model="selectedToEditGovOrg[input.name]"
                  >
                  </v-text-field>
                </div>
              </v-form>
            </template>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="editDialog = false"> Сохранить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
