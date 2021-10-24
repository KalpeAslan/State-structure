<template>
  <div class="white text-center footer">
    <div
      v-if="userType === 'dispatcher'"
      class="d-flex justify-space-between align-items-center"
    >
      <v-btn outlined color="primary" @click="handleButton('save')">{{
        $t("save")
      }}</v-btn>
      <v-btn color="primary" @click="sendToApple">На согласование</v-btn>
    </div>
    <div
      v-else-if="userType === 'departmentBoss'"
      class="d-flex justify-space-between align-items-center"
    >
      <v-btn
        class="error"
        color="primary"
        @click="handleButton('returnForRevision')"
        >{{ $t("returnForRevision") }}</v-btn
      >
      <v-btn class="success" @click="sendToApple">{{ $t("apply") }}</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import {
  SEND_TO_APPLY,
  SEND_TO_REJECT,
  SET_MODAL_NAME,
} from "@/store/mutation-types";
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
  methods: {
    save() {
      console.log(this.$store.getters.GET_IS_UPDATED);
    },
    handleButton(type: string) {
      if (type === "returnForRevision") {
        return this.$store.dispatch(SET_MODAL_NAME, "return-for-revesion");
      }
      this.$store.dispatch(SEND_TO_REJECT);
    },
    sendToApple() {
      this.$store.dispatch(SEND_TO_APPLY);
    },
  },
});
</script>

<style lang="scss" scoped>
.footer {
  padding: 0 353px 0 112px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 12;
  div {
    padding: 8px 0;
  }
}
</style>
