<template>
  <div v-if="selectedModalName">
    <edit-goverment
      v-if="selectedModalName === 'edit-goverment'"
      @close-modal="closeModal"
    />
    <delete-goverment
      v-else-if="selectedModalName === 'delete-goverment'"
      @close-modal="closeModal"
    />
    <return-for-revesion
      v-else-if="selectedModalName === 'return-for-revesion'"
      @close-modal="closeModal"
    />
  </div>
</template>

<script>
import { SET_MODAL_NAME } from "@/store/mutation-types";
export default {
  computed: {
    selectedModalName() {
      return this.$store.getters.SELECTED_MODAL;
    },
  },
  components: {
    EditGoverment: () => import("../HeaderModals/EditGoverment.vue"),
    DeleteGoverment: () => import("../HeaderModals/DeleteGoverment.vue"),
    ReturnForRevesion: () => import("../HeaderModals/ReturnForRevesion.vue"),
  },
  methods: {
    closeModal() {
      this.$store.dispatch(SET_MODAL_NAME, null);
    },
  },
};
</script>
