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
          {{ $t("tempAppoint") }}
        </div>
      </div>
      <template v-if="selectedTempPosition">
        <div class="position_desc mt-7">
          <span class="position_desc_type">
            {{ $t("position") }}
          </span>
          <span>
            {{ selectedTempPosition | translate }}
          </span>
        </div>
        <v-divider />
        <div class="position_desc">
          <span class="position_desc_type"> {{ $t("employee") }} </span>
          <span v-if="selectedTempPositionEmployee">
            {{ selectedTempPositionEmployee }}
          </span>
        </div>
        <v-form ref="form">
          <div>
            <div class="label">
              {{ $t("endDateOfEmployee") }}
            </div>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :return-value.sync="date1"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="newEmployeeForm.startDate"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  dense
                  height="42"
                  :rules="dateEndEmployeeDateRules"
                  placeholder="ДД/ММ/ГГГГ"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="ru"
                v-model="newEmployeeForm.startDate"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">
                  Отменить
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(date1)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <v-divider />
          <div>
            <div class="label">
              {{ $t("tempAppointEmployee") }}
            </div>
            <v-select
              outlined
              dense
              :rules="selectTempEmployeeRules"
              :items="employies"
              v-model="selectedEmployee"
              label="Выбрать"
            ></v-select>
          </div>
          <div>
            <div class="label">
              {{ $t("endDateOfTempEmployee") }}
            </div>
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
                  v-model="newEmployeeForm.endDate"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  dense
                  height="42"
                  :rules="dateEndTempEmployeeDateRules"
                  placeholder="ДД/ММ/ГГГГ"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="ru"
                v-model="newEmployeeForm.endDate"
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
            <div class="label">
              {{ $t("groundsForAppoindEmployee") }}
            </div>
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
          <span class="position_desc_type">
            {{ $t("position") }}
          </span>
          <span> {{ $t("notSelected") }} </span>
        </div>
      </template>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { homeService } from "@/services/homeService";
import { employees } from "@/store/dump";
import { IEmployeeReq } from "@/store/interfaces";
import {
  SET_EMPLOYEE_REPLACEMENT,
  SET_EMPLOYIES,
  SET_TEMP_POSITION,
} from "@/store/mutation-types";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      dialog: false as boolean,
      date: null,
      date1: null,
      menu: false,
      menu1: false,
      dateEndEmployeeDateRules: [
        (v) => !!v || "Поле окончания даты обязательна",
      ],
      dateEndTempEmployeeDateRules: [
        (v) => !!v || "Поле окончания даты временного обязательна",
      ],
      selectTempEmployeeRules: [
        (v) => !!v || "Поле временного сотрудника обязательно",
      ],
      newEmployeeForm: {
        replacementEmployeeId: null, //Long, employee that temporarly holds office
        substituteEmployeeId: null, //Long, employee that temporarly left this position
        startDate: null, //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
        endDate: null, //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
        substitutionBasisRu: null, //String
        substitutionBasisKz: null, //String
      } as IEmployeeReq,
      selectedEmployee: null,
    };
  },

  computed: {
    selectedTempPosition() {
      return this.$store.getters.tempPosition;
    },
    selectedTempPositionEmployee() {
      const tempPosition = this.selectedTempPosition;
      return tempPosition.employees && tempPosition.employees[0].user.name;
    },
    employies() {
      return this.$store.getters.GET_EMPLOYIES
        ? this.$store.getters.GET_EMPLOYIES.map((employee) => {
            return {
              text: employee.user.name,
              value: employee.id,
            };
          })
        : [];
    },
  },
  components: {
    Badge: () => import("../../components/Badge/Badge.vue"),
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.newEmployeeForm.startDate && this.newEmployeeForm.endDate) {
        this.newEmployeeForm.replacementEmployeeId =
          this.selectedTempPosition.employees[0].id;
        this.newEmployeeForm.substituteEmployeeId = this.selectedEmployee;
        this.newEmployeeForm.substitutionBasisKz = "Test Name Kz";
        this.newEmployeeForm.substitutionBasisRu = "Test Name Ru";
        this.$store
          .dispatch(SET_EMPLOYEE_REPLACEMENT, {
            ...this.newEmployeeForm,
          })
          .then(() => {
            this.$refs.form.reset();
            this.$store.dispatch(SET_TEMP_POSITION, null);
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  beforeCreate() {
    this.$store.dispatch(SET_EMPLOYIES, employees);
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
