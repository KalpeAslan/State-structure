<template>
  <div :class="['badge', state]">
    <span>{{ stateText }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    state: {
      type: String,
      default: "created",
      validator: (prop: string): boolean => {
        return [
          "created",
          "onApproval",
          "aproved",
          "notAproved",
          "onClaim",
          "claimed",
          "notClaimed",
        ].includes(prop);
      },
    },
  },
  computed: {
    stateText(): string {
      switch (this.state) {
        case "created":
          return "Создан диспетчером";
        case "onApproval":
          return "На согласовании";
        case "aproved":
          return "Согласован";
        case "notAproved":
          return "Не согласован";
        case "onClaim":
          return "На согласовании";
        case "claimed":
          return "Утвержден";
        case "notClaimed":
          return "Не утвержден";
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
