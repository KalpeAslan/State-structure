<template>
  <div :class="['badge', className]">
    <span>{{ $t(stateText) }}</span>
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
          return "created";
        case 316:
          this.className = "onApproval";
          return "onApproval";
        case 317:
          this.className = "aproved";
          return "aproved";
        case 318:
          this.className = "notAproved";
          return "notAproved";
        case 319:
          this.className = "onClaim";
          return "onClaim";
        case 320:
          this.className = "claimed";
          return "claimed";
        case 321:
          this.className = "notClaimed";
          return "Не утвержден";
        case 322:
          return "deleted";
        default:
          this.className = "created";
          return "created";
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
