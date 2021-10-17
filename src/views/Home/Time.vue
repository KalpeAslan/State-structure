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
            {{ selectedTempPosition.nameRu }}
          </span>
        </div>
        <v-divider />
        <div class="position_desc">
          <span class="position_desc_type"> Сотрудник </span>
          <span v-if="selectedTempPositionEmployee">
            {{ selectedTempPositionEmployee }}
          </span>
        </div>
        <v-form ref="form">
          <div>
            <div class="label">Дата окончания работы сотрудника</div>
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
                  v-model="newEmployeeForm.recruitmentDate"
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
                v-model="newEmployeeForm.recruitmentDate"
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
            <div class="label">Сотрудник для временного назначения</div>
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
            <div class="label">Дата окончания работы временного сотрудника</div>
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
                  v-model="newEmployeeForm.positionRemovalDate"
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
                v-model="newEmployeeForm.positionRemovalDate"
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
import { homeService } from "@/services/homeService";
import { employees } from "@/store/dump";
import { IEmployeeReq } from "@/store/interfaces";
import { SET_EMPLOYIES } from "@/store/mutation-types";
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
        userId: null, //Long
        positionId: null, //Long
        recruitmentDate: null, //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
        positionRemovalDate: null, //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
        supervisorId: null, //Long
      } as IEmployeeReq,
      selectedEmployee: null,
    };
  },

  computed: {
    selectedTempPosition() {
      console.log(this.$store.state.homeStore.tempPosition);
      return this.$store.state.homeStore.tempPosition;
    },
    selectedTempPositionEmployee() {
      const tempPosition = this.$store.state.homeStore.tempPosition;
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
      if (
        this.newEmployeeForm.recruitmentDate &&
        this.newEmployeeForm.positionRemovalDate
      ) {
        this.newEmployeeForm.userId = this.selectedTempPosition.userId;
        this.newEmployeeForm.positionId = this.selectedTempPosition.positionId;
        this.newEmployeeForm.positionId =
          this.selectedTempPosition.supervisorId;
        homeService
          .postNewEmployee(this.newEmployeeForm)
          .then(() => this.reset());
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

function employies(SET_EMPLOYIES: string, employies: any) { throw new
Error("Function not implemented."); }
