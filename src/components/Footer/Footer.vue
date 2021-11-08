<template>
  <div class="white text-center footer">
    <div
      v-if="userType === 'dispatcher'"
      class="d-flex justify-space-between align-items-center"
    >
      <v-btn outlined color="primary" @click="handleButton('save')">{{
        $t(computeButtonText(false))
      }}</v-btn>
      <v-btn color="primary" @click="sendToApple">{{
        $t(computeButtonText())
      }}</v-btn>
    </div>
    <div
      v-else-if="userType === 'departmentBoss' || userType === 'departmentHead'"
      class="d-flex justify-space-between align-items-center"
    >
      <v-btn
        class="error"
        color="primary"
        @click="handleButton('returnForRevision')"
        >{{ $t(computeButtonText(false)) }}</v-btn
      >
      <v-btn
        :disabled="(userType === 'departmentHead' && !isWebSocketOpen) || false"
        class="success"
        @click="sendToApple"
        >{{ $t(computeButtonText()) }}</v-btn
      >
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
import { mapGetters } from "vuex";
const userTypes = ["dispatcher", "departmentBoss", "departmentHead", "admin"];
export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userType: "GET_USER_TYPE",
      isWebSocketOpen: "isWebSocketOpen",
    }),
  },
  methods: {
    handleButton(type: string) {
      if (type === "returnForRevision") {
        return this.$store.dispatch(SET_MODAL_NAME, "return-for-revesion");
      } else if (type === "save") {
        return this.$notify({
          group: "alert",
          text: "Успешно сохранено",
          type: "success",
        });
      }
      this.$store.dispatch(SEND_TO_REJECT);
    },
    sendToApple() {
      this.$store.dispatch(SEND_TO_APPLY);
    },
    computeButtonText(isApply = true): string {
      const dispatcher = isApply ? "sendToApply" : "save";
      const departmentBoss = isApply ? "apply" : "returnForRevision";
      const departmentHead = isApply ? "sa" : "returnForRevision";
      switch (this.userType) {
        case "dispatcher":
          return dispatcher;
        case "departmentBoss":
          return departmentBoss;
        case "departmentHead":
          return departmentHead;
      }
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
  z-index: 1;
  div {
    padding: 8px 0;
  }
}
</style>
