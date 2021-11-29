<template>
  <v-container>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="login"
          :rules="[v => !!v || $t('fillTheField')]"
          :label="$t('login')"
          required
      ></v-text-field>

      <v-text-field
          v-model="password"
          :rules="[v => !!v || $t('fillTheField')]"
          :label="$t('password')"
          required
      ></v-text-field>

      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
      >
        Validate
      </v-btn>
    </v-form>
  </v-container>
</template>
<script>
import {SET_LOGGINED, SET_USER_TYPE} from "../../store/mutation-types";

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
export default {
  data: () => ({
    valid: true,
    login: '',
    password: '',
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
      if(!this.login || !this.password) return;
      if(this.auth(this.login, this.password)){
        this.$store.dispatch(SET_USER_TYPE, this.login)
        this.$store.dispatch(SET_LOGGINED, this.login)
        this.$router.push({
          name: 'home.select-goverment'
        })
      } else {
        this.$notify({
          group: 'alert',
          text: this.$t('errorAuth'),
          type: 'danger'
        })
      }
    },
    auth(login, password) {
      return users.some(
          (user) => user.login === login && user.password === password
      );
    },
  },
}
</script>