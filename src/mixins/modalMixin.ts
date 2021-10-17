import Vue from "vue";

export function modalMixin(propName: string) {
  return Vue.extend({
    computed: {
      modalDialogMixin: {
        set(val) {
          if (!val) this.$emit("close-modal");
        },
        get() {
          return this[propName];
        },
      },
    },
  });
}
