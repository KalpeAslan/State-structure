<template>
  <v-row justify="center">
    <v-dialog v-model="modalDialogMixin" max-width="400px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5"> Авторизация </span>
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
                <div class="label">{{ $t(input.label) }}</div>
                <v-text-field
                  :rules="[(v) => !!v || 'Заполните поле!']"
                  outlined
                  class="mb-3"
                  :hide-details="!input.hasError"
                  required
                  v-model="input.value"
                >
                </v-text-field>
              </div>
              <v-btn type="submit" color="primary">
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
import { SET_USER_TYPE } from "@/store/mutation-types";
import Vue from "vue";

const users = [
  {
    login: "dispatcher",
    password: "root",
  },
  {
    login: "departmentBoss",
    password: "root",
  },
  {
    login: "departmentHead",
    password: "root",
  },
  {
    login: "admin",
    password: "root",
  },
];

export default Vue.extend({
  mixins: [modalsMixin],
  data() {
    //
    return {
      valid: true,
      isFormDirty: false,
      subdivisionForm: [
        {
          name: "login",
          label: "Логин",
          hasError: false,
          value: "",
        },
        {
          name: "password",
          label: "Пароль",
          hasError: false,
          value: "",
        },
      ],
    };
  },
  methods: {
    submit() {
      this.isFormDirty = true;
      this.validate();
      const login = this.subdivisionForm[0].value;
      const password = this.subdivisionForm[1].value;
      if (
        this.subdivisionForm.every((f) => !!f.value) &&
        this.auth(login, password)
      ) {
        this.$store.dispatch(SET_USER_TYPE, login);
        this.$emit("close-modal");
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    auth(login: string, password: string): boolean {
      return users.some(
        (user) => user.login === login && user.password === password
      );
    },
  },
});
</script>
