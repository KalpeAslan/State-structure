<template>
  <v-navigation-drawer
    style="height: 100%"
    width="353"
    permanent
    class="pt-5 px-5 nav-constructor_item"
  >
    <div style="padding-right: 15px">
      <div class="d-flex align-items-center">
        <div
          class="text-h6 d-inline-block ml-4"
          style="font-size: 16px !important; line-height: 24px"
        >
          Временно назначить на должность
        </div>
      </div>
      <template v-if="selectedTempPosition">
        <div class="position_desc mt-7">
          <span class="position_desc_type">Должность</span>
          <span>
            {{ selectedTempPosition.name }}
          </span>
        </div>
        <v-divider />
        <div class="position_desc">
          <span class="position_desc_type"> Сотрудник </span>
          <span>
            {{ selectedTempPosition.employee }}
          </span>
        </div>
        <v-form ref="form" v-model="validate">
          <div>
            <div class="label">Дата окончания работы сотрудника</div>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="selectedTempPosition.endTempEmployeeDate"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  dense
                  :rules="dateEndTempEmployeeDateRules"
                  placeholder="ДД/ММ/ГГГГ"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="ru"
                v-model="selectedTempPosition.endTempEmployeeDate"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Отменить
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <v-divider />
          <div>
            <div class="label">Сотрудник для временного назначения</div>
            <v-select
              outlined
              dense
              :rules="selectTempEmployeeRules"
              :items="selectedTempPosition.employees"
              label="Выбрать"
            ></v-select>
          </div>
          <div>
            <div class="label">Дата окончания работы сотрудника</div>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="selectedTempPosition.endEmployeeDate"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  dense
                  height="42"
                  :rules="selectedTempPosition.dateEndEmployeeDateRules"
                  placeholder="ДД/ММ/ГГГГ"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="ru"
                v-model="selectedTempPosition.endEmployeeDate"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Отменить
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <div>
            <div class="label">Основания для назначения</div>
            <v-textarea
              solo
              name="input-7-4"
              outlined
              label="Комментарии"
            ></v-textarea>
          </div>
          <v-btn color="primary" @click="validate" style="width: 100%">
            Сохранить
          </v-btn>
        </v-form>
      </template>
      <template v-else>
        <div class="position_desc">
          <span class="position_desc_type">Должность</span>
          <span> Не выбрана </span>
        </div>
      </template>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      dialog: false as boolean,
      date: null,
      menu: false,
      dateEndEmployeeDateRules: [
        (v) => !!v || "Поле окончания даты обязательна",
      ],
      dateEndTempEmployeeDateRules: [
        (v) => !!v || "Поле окончания даты временного обязательна",
      ],
      selectTempEmployeeRules: [
        (v) => !!v || "Поле временного сотрудника обязательно",
      ],
    };
  },

  computed: {
    selectedTempPosition() {
      // return this.$store.state.homeStore.tempPosition;
      return {
        name: "Dolzhnost",
        id: 54684678,
        endEmployeeDate: null,
        tempEmployee: "",
        endTempEmployeeDate: null,
        comment: "",
        employee: "Sotrudnik 1",
        employees: ["Sotrudnik1", "Sotrudnik2"],
      };
    },
  },
  components: {
    Badge: () => import("../../components/Badge/Badge.vue"),
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
});
</script>
<style lang="scss" scoped>
.nav-constructor {
  height: 100%;
  .nav-constructor_item {
    height: 50%;
  }
}
.badge {
  font-size: 12px;
}

.v-card {
  .v-card__text {
    padding-bottom: 0 !important;
  }
  .v-text-field__details {
    display: none !important;
  }
}

.position_desc {
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
  .position_desc_type {
    font-size: 14px;
    line-height: 16px;
    color: #828282;
  }
}

.label {
  font-size: 14px;
  line-height: 16px;
  color: #000000;
}

.v-navigation-drawer__content {
  padding-right: 16px;
}
</style>
