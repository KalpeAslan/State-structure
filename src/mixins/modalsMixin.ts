import Vue from "vue";

export const modalsMixin = Vue.extend({
  computed: {
    modalDialogMixin: {
      set(val) {
        if (!val) this.$emit("close-modal");
      },
      get() {
        return true;
      },
    },
  },
});
