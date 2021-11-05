<template>
  <div :class="['badge', className]">
    <span>{{ stateText }}</span>
  </div>
</template>

<script lang="ts">
import { TStatuses } from "@/store/interface";
import Vue from "vue";
export default Vue.extend({
  props: {
    state: {
      type: Number,
      default: 315,
    },
  },
  data: () => ({
    className: null,
  }),
  computed: {
    stateText(): string {
      switch (this.state) {
        case 315:
          this.className = "created";
          return "Создан диспетчером";
        case 316:
          this.className = "onApproval";
          return "На согласовании";
        case 317:
          this.className = "aproved";
          return "Согласован";
        case 318:
          this.className = "notAproved";
          return "Не согласован";
        case 319:
          this.className = "onClaim";
          return "На Утверждении";
        case 320:
          this.className = "claimed";
          return "Утвержден";
        case 321:
          this.className = "notClaimed";
          return "Не утвержден";
        case 312:
          return "Удален";
        default:
          return "Создан диспетчером";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@mixin badge-default {
  background: #f7f7f8;
  border: 1px solid #dadada;
}

@mixin badge-waiting {
  @include badge-default;
  color: $primary;
}
.badge {
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px 8px;
  flex: none;
  text-align: center;
  font-size: 12px;
}

.created {
  @include badge-default;
}

.onApproval {
  @include badge-waiting;
}
.onClaim {
  @include badge-waiting;
}

.notAproved {
  @include badge-default;
  color: $danger;
}
.notClaimed {
  color: white;
  background: $danger;
}

.claimed {
  color: white;
  background: $success;
}
.aproved {
  @include badge-default;
  color: $success;
}
</style>
