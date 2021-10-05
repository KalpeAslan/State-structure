<template>
  <v-app-bar elevation="0" app absolute color="white" max-height="56px">
    <div class="header-content_left">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="$router.push('/home/select-goverment')"
            color="white"
            elevation="0"
            v-bind="attrs"
            v-on="on"
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: self-start;
              "
            >
              Наименование ГО
              <div class="text-caption" style="display: block">123456789</div>
            </div>
            <v-icon size="18"> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <Badge>Создан диспетчером</Badge>
    </div>
    <v-spacer></v-spacer>
    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="white"
            elevation="0"
            v-bind="attrs"
            v-on="on"
            class="secondary--text button"
          >
            <v-icon size="16" style="margin-right: 5px"> mdi-history </v-icon>
            История
            <v-icon size="18"> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in historyItems" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-for="button in headerButtons"
        :key="button.title"
        color="white"
        class="ma-2 secondary--text button"
        elevation="0"
      >
        <v-icon size="16" style="margin-right: 5px">{{
          button.iconName
        }}</v-icon>
        {{ button.title }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      headerButtons: [
        {
          title: "Экспорт в PDF",
          iconName: "mdi-export-variant",
        },
        {
          title: "Редактировать",
          iconName: "mdi-pencil",
        },
        {
          title: "Удалить ГО",
          iconName: "mdi-delete-outline",
        },
      ],
      historyItems: [
        {
          title: "История действий",
          value: "history-actions",
        },
        {
          title: "История версий",
          value: "history-versions",
        },
      ],
    };
  },
  components: {
    Badge: () => import("../Badge/Badge.vue"),
  },
});
</script>

<style lang="scss" scoped>
.header-content_left {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.button {
  font-size: 14px;
  line-height: 16px;
  padding: 0 6px;
  font-weight: 400;
}
</style>
