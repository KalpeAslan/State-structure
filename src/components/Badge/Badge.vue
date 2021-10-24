<template>
  <div :class="['badge', className]">
    <span>{{ stateText }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    state: {
      type: Number,
      default: 1,
      validator: (prop: number): boolean => {
        return [...Array(8).keys()].map((i) => i + 1).includes(prop);
      },
    },
  },
  data: () => ({
    className: null,
  }),
  computed: {
    stateText(): string {
      switch (this.state) {
        case 1:
          this.className = "created";
          return "Создан диспетчером";
        case 2:
          this.className = "onApproval";
          return "На согласовании";
        case 3:
          this.className = "aproved";
          return "Согласован";
        case 4:
          this.className = "notAproved";
          return "Не согласован";
        case 5:
          this.className = "onClaim";
          return "На Утверждении";
        case 6:
          this.className = "claimed";
          return "Утвержден";
        case 7:
          this.className = "notClaimed";
          return "Не утвержден";
        case 8:
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
