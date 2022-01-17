<template>
  <v-container class="auth-container">
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="validate"
    >
      <div class="text-h4 mg-2">
        {{$t('enterToSystem')}}
      </div>
      <v-text-field
          v-model="login"
          :rules="computeRule"
          :label="$t('login')"
          required
      ></v-text-field>

      <v-text-field
          v-model="password"
          :rules="computeRule"
          :label="$t('password')"
          required
          type="password"
      ></v-text-field>

      <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4"
          @click="validate"
      >
        {{$t('enter')}}
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
  computed: {
    computeRule(){
      return [v => !!v || this.$t('fillTheField')]
    },
    currentLanguage() {
      return this.$store.getters.GET_CURRENT_LANGUAGE
    }
  },
  watch:{
    currentLanguage(){
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped lang="scss">
.auth-container {
  width: 50%;
  @media only screen and (max-width: 600px) {
    width: 80%;
  }
}
</style>