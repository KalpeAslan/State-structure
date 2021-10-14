<template>
  <div class="white text-center white--text footer" cols="12">
    <div
      v-if="userType === 'dispatcher'"
      class="dispatcher d-flex justify-space-between align-items-center"
    >
      <v-btn outlined color="primary">Сохранить</v-btn>
      <v-btn color="primary">На согласование</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    userType(): string {
      return this.$store.getters.GET_USER_TYPE;
    },
  },
});
</script>

<style lang="scss" scoped>
.footer {
  padding: 0 353px 0 112px;
  div {
    padding: 8px 0;
  }
}
</style>
