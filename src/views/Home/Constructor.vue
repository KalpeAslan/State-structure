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
          @click="addGoverment()"
          color="primary"
          class="mb-2 d-inline-block"
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
            Добавить
          </div>
        </v-btn>
      </div>
      <v-text-field
        outlined
        label="Поиск"
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
            Добавить
          </div>
        </v-btn>
      </div>
      <v-text-field
        outlined
        label="Поиск"
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
    <AddGoverment
      :modalDialog="modalDialog"
      @close-modal="modalDialog = false"
    />
  </div>
</template>

<script lang="ts">
import treeMixin from "@/mixins/treeMixin";
import { IPosition } from "@/store/interfaces";
import SidebarTree from "../../components/sidebarTree/SidebarTree.vue";
import {
  ADD_POSITION,
  DELETE_POSITION,
  INSERT_NODE_TO_TREE,
  SET_POSITIONS,
} from "../../store/mutation-types";
import Vue from "vue";
import { position } from "@/store/dump";

export default Vue.extend({
  data() {
    return {
      dotButtonItems: [
        {
          title: "Удалить",
          iconName: "mdi-delete-outline",
        },
      ],
      positionsInput: "",
      modalDialog: false,
    };
  },
  mixins: [treeMixin],
  watch: {
    positionsInput(val) {},
  },
  components: {
    SidebarTree: SidebarTree,
    AddGoverment: () =>
      import("../../components/HeaderModals/AddGoverment.vue"),
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
  },
  methods: {
    addGoverment() {
      this.modalDialog = true;
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
      const _position = { ...position };
      _position.id = Math.round(Math.random() * 1515021);
      this.$store.dispatch(ADD_POSITION, _position);
    },
    deletePostition(position) {
      this.$store.dispatch(DELETE_POSITION, position);
    },
  },
  async beforeCreate() {
    await this.$store.dispatch(SET_POSITIONS);
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
