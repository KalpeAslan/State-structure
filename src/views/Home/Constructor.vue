<template>
  <div class="nav-constructor">
    <v-navigation-drawer
      width="353"
      permanent
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="header d-flex justify-space-between">
        <div
          class="text-h6 d-inline-block"
          style="
            font-weight: 500;
            font-size: 16px !important;
            line-height: 24px;
            margin-bottom: 10px;
          "
        >
          {{ $t("stateStructure") }}
        </div>
        <v-btn
          @click="addSubdivision"
          color="primary"
          class="mb-2 d-inline-block"
          v-if="isEditable"
          outlined
          width="97"
          max-width="97"
          variant="outlined"
        >
          <v-icon size="14"> mdi-plus-thick </v-icon>
          <div
            class="text-caption"
            style="font-style: normal; font-weight: normal; line-height: 16px"
          >
            {{ $t("add") }}
          </div>
        </v-btn>
      </div>
      <v-text-field
        outlined
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <SidebarTree :nodes="[tree]"></SidebarTree>
    </v-navigation-drawer>
    <v-divider></v-divider>

    <v-navigation-drawer
      width="353"
      permanent
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="header d-flex justify-space-between">
        <div
          class="text-h6 d-inline-block"
          style="
            font-weight: 500;
            font-size: 16px !important;
            line-height: 24px;
            margin-bottom: 10px;
          "
        >
          {{ $t("positions") }}
        </div>
        <v-btn
          color="primary"
          class="mb-2 d-inline-block"
          outlined
          v-if="isEditable"
          width="97"
          @click="addPosition()"
          max-width="97"
          variant="outlined"
        >
          <v-icon size="14"> mdi-plus-thick </v-icon>
          <div
            class="text-caption"
            style="font-style: normal; font-weight: normal; line-height: 16px"
          >
            {{ $t("add") }}
          </div>
        </v-btn>
      </div>
      <v-text-field
        outlined
        :label="$t('search')"
        hide-details
        v-model="positionsInput"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>

      <v-list dense>
        <v-list-item
          v-for="position in positions"
          :key="position.id"
          draggable
          @dragstart="dragStart($event, position)"
          @dragend="dragEnd"
          class="justify-space-between"
        >
          <span style="font-size: 14px">{{ position | translate }}</span>

          <template>
            <div
              class="text-center"
              style="flex: none; right: 20px; position: absolute"
            >
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon> mdi-dots-horizontal </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    selectable
                    @click="deletePostition(position)"
                    class="d-flex justify-space-between"
                    v-for="(item, index) in dotButtonItems"
                    :key="index"
                  >
                    <span style="font-size: 14px">
                      {{ item.title }}
                    </span>
                    <v-icon>
                      {{ item.iconName }}
                    </v-icon>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import treeMixin from "@/mixins/treeMixin";
import { IPosition } from "@/store/interfaces";
import {
  DELETE_POSITION,
  INSERT_NODE_TO_TREE,
  SET_MODAL_NAME,
  SET_POSITIONS,
} from "../../store/mutation-types";
import Vue from "vue";
export default Vue.extend({
  data(): any {
    return {
      dotButtonItems: [
        {
          title: "Удалить",
          iconName: "mdi-delete-outline",
        },
      ],
      positionsInput: "",
      showAddSubdivison: false,
    };
  },
  mixins: [treeMixin],
  components: {
    SidebarTree: () => import("../../components/sidebarTree/SidebarTree.vue"),
  },
  computed: {
    tree() {
      return !this.$store.state.treeStore.tree
        ? []
        : this.$store.state.treeStore.tree;
    },
    positions(): IPosition[] {
      if (this.positionsInput !== "") {
        return this.$store.getters.GET_FILTERED_POSITIONS(this.positionsInput);
      }
      return this.$store.state.homeStore.positions;
    },
    isEditable(): boolean {
      return this.$store.getters.isEditable;
    },
  },
  methods: {
    addSubdivision() {
      if (!this.isLoading) {
        this.$store.dispatch(SET_MODAL_NAME, "add-subdivision-modal");
      }
    },
    addChild() {
      const newNode = {
        children: [],
        id: Math.round(Math.random() * 1000),
        name: "Департамент",
      };
      this.$store.dispatch(INSERT_NODE_TO_TREE, {
        selectedNode: this.$store.state.treeStore.tree,
        newNode,
      });
    },
    addPosition() {
      this.$store.dispatch(SET_MODAL_NAME, "add-position-modal");
    },
    deletePostition(position) {
      this.$store.dispatch(DELETE_POSITION, position);
    },
  },
  async beforeCreate() {
    await this.$store.dispatch(SET_POSITIONS, this.$route.params.id);
  },
});
</script>

<style lang="scss" scoped>
.nav-constructor {
  height: 100%;
  .nav-constructor_item {
    height: 50% !important;
  }
}
</style>
