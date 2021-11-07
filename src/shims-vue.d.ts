declare module "*.vue" {
  import Vue from "vue";
  interface Vue {
    notify: any;
  }
  export default Vue;
}

declare module "vue-i18n";
