<template>
  <div class="nav-constructor">
    <v-navigation-drawer
      width="353"
      permanent
      class="pt-5 px-5 nav-constructor_item"
    >
      <div class="header d-flex justify-space-between">
        <div class="text-h6 d-inline-block">Штатная структура</div>
        <v-btn
          @click="addChild()"
          color="primary"
          class="mb-2 d-inline-block"
          outlined
          width="97"
          max-width="97"
          variant="outlined"
        >
          <v-icon size="14"> mdi-plus-thick </v-icon>
          <div class="text-caption">Добавить</div>
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
        <div class="text-h6 d-inline-block">Должности</div>
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
          <div class="text-caption">Добавить</div>
        </v-btn>
      </div>
      <v-text-field
        outlined
        label="Поиск"
        v-model="positionsInput"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>

      <v-list dense>
        <v-list-item
          v-for="position in positions"
          :key="position.id"
          draggable
          @dragend="dragEnd(position)"
          @dragenter="dragEnter(position)"
          class="justify-space-between"
        >
          <span>{{ position.name }}</span>

          <template>
            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon style="flex: none" v-bind="attrs" v-on="on">
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
                    {{ item.title }}
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

<script>
import treeMixin from "@/mixins/treeMixin";
import sidebarTree from "../../components/sidebarTree/SidebarTree";
import {
  ADD_POSITION,
  DELETE_POSITION,
  INSERT_NODE_TO_TREE,
  SET_POSITIONS,
} from "../../store/mutation-types";

export default {
  data() {
    return {
      dotButtonItems: [
        {
          title: "Удалить",
          iconName: "mdi-delete-outline",
        },
      ],
      positionsInput: "",
    };
  },
  mixins: [treeMixin],
  watch: {
    positionsInput(val) {},
  },
  components: {
    SidebarTree: sidebarTree,
  },
  computed: {
    tree() {
      return !this.$store.state.treeStore.tree
        ? []
        : this.$store.state.treeStore.tree;
    },
    positions() {
      if (this.positionsInput !== "") {
        return this.$store.getters.GET_FILTERED_POSITIONS(this.positionsInput);
      }
      return this.$store.state.homeStore.positions;
    },
  },
  methods: {
    addChild() {
      const newNode = {
        children: [],
        id: Math.round(Math.random(545545) * 1000),
        name: "Департамент",
      };
      this.$store.dispatch(INSERT_NODE_TO_TREE, {
        selectedNode: this.$store.state.treeStore.tree,
        newNode,
      });
    },
    addPosition() {
      const random = Math.round(Math.random(3435) * 11554);
      const position = {
        name: "TestPosition" + random,
        id: random,
      };
      this.$store.dispatch(ADD_POSITION, position);
    },
    deletePostition(position) {
      this.$store.dispatch(DELETE_POSITION, position);
    },
  },
  async beforeCreate() {
    await this.$store.dispatch(SET_POSITIONS);
  },
};
</script>

<style lang="scss" scoped>
.nav-constructor {
  height: 100%;
  .nav-constructor_item {
    height: 50% !important;
  }
}
</style>
