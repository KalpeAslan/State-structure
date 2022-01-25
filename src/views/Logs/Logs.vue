<template>
  <v-container class="logs">
    <div class="d-flex mb-7">
      <v-btn style="padding-left: 0" elevation="0" @click="$router.go(-1)">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <h2>
        {{ $t("historyActions") }}
      </h2>
    </div>
    <v-data-table
      v-if="!isLoading"
      :headers="headers"
      :items="logs"
      item-key="date"
      class="elevation-0 dark-secondary"
      style="background: inherit !important"
      :footer-props="{
        'items-per-page-text': 'Строк на странице',
        pageText: '{0} из {1}',
      }"
    >
      <template v-slot:top>
        <div style="position: relative">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            @input="searchChange"
            :label="$t('search')"
            outlined
          ></v-text-field>
          <v-btn
            @click="toggleFilter"
            icon
            absolute
            style="right: 25px; top: 5px; z-index: 2"
          >
            <v-icon :color="isShowFilter ? 'primary' : ''">
              mdi-filter-menu-outline
            </v-icon>
          </v-btn>
        </div>
        <form v-if="isShowFilter" class="d-flex justify-space-between">
          <template v-for="formInput in formBody">
            <template v-if="formInput.type === 'date'">
              <v-menu
                :key="formInput.name"
                :ref="formInput.name"
                v-model="formInput.showMenu"
                :close-on-content-click="false"
                :return-value.sync="formInput.menuValue"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div class="d-flex flex-column">
                    <div v-if="formInput.label" class="filter-lable">
                      {{ formInput.label | translate }}
                    </div>
                    <v-text-field
                      v-model="filterForm[formInput.name]"
                      append-icon="mdi-calendar"
                      readonly
                      outlined
                      :error-messages="isError(formInput)"
                      v-bind="attrs"
                      v-on="on"
                      dense
                      class="filter-input__date"
                      :style="{
                        marginTop: !formInput.label ? '16px' : 0,
                      }"
                      height="44"
                      placeholder="ДД/ММ/ГГГГ"
                    ></v-text-field>
                  </div>
                </template>
                <v-date-picker
                  locale="ru"
                  :min="formInput.name === 'dateEnd' ? dateStart() : ''"
                  v-model="filterForm[formInput.name]"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="formInput.showMenu = false"
                  >
                    {{$t('cancel')}}
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="saveDate(formInput.name, formInput.menuValue)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </template>
            <div :key="formInput.name" v-else>
              <div v-if="formInput.label" class="filter-lable">
                {{ formInput.label | translate }}
              </div>
              <v-select
                height="44"
                outlined
                :error-messages="isError(formInput)"
                v-model="filterForm[formInput.name]"
                class="filter-input__select"
                :style="{
                  marginTop: !formInput.label ? '16px' : 0,
                }"
                :items="formInput.options"
              />
            </div>
          </template>
          <v-btn
            color="primary"
            width="123"
            large
            @click="submitFilter"
            style="
              font-weight: normal;
              font-size: 14px;
              line-height: 16px;
              margin-right: 20px;
              margin-top: 16px;
            "
          >
            {{$t('implement')}}
          </v-btn>
          <v-btn
            color="primary"
            width="123"
            style="
              font-weight: normal;
              font-size: 14px;
              line-height: 16px;
              margin-top: 16px;
            "
            large
            @click="resetFilter"
            outlined
          >
            {{$t('reset')}}
          </v-btn>
        </form>
      </template>
      <template v-slot:no-results> FUCK UPI </template>
    </v-data-table>
    <div v-else class="d-flex justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>
<script lang="ts">
import { ILog } from "@/store/interface";
import { SET_LOGS } from "@/store/mutation-types";
import Vue from "vue";
import { required } from "vuelidate/lib/validators";
import moment from "moment";

const $t = (wordObj) => Vue.filter("translate")(wordObj);

const headers = [
  {
    text: $t({
      nameRu: "Дата",
      nameEng: "Date",
      nameKz: "Мезгіл",
    }),
    align: "start",
    value: "dateTime",
  },
  {
    text: $t({
      nameRu: "Пользователь",
      nameEng: "User",
      nameKz: "Қолданушы",
    }),
    value: "username",
  },
  {
    text: $t({
      nameRu: "Должность",
      nameEng: "Position",
      nameKz: "Лауазым",
    }),
    value: "position",
  },
  {
    text: $t({
      nameRu: "Действие",
      nameEng: "Action",
      nameKz: "Іс",
    }),
    value: "action",
  },
  {
    text: Vue.filter("translate")({
      nameRu: "Комментарий",
      nameEng: "Comment",
      nameKz: "Пікір",
    }),
    value: "comment",
  },
];

const formBody = [
  {
    type: "date",
    label: {
      nameRu: "Период",
      nameEng: "Period",
      nameKz: "Период",
    },
    name: "dateStart",
    showMenu: null,
    menuValue: null,
  },
  {
    type: "date",
    name: "dateEnd",
    showMenu: null,
    menuValue: null,
  },
  {
    type: "select",
    label: {
      nameRu: "Должность",
      nameEng: "Position",
      nameKz: "Лауазым",
    },
    name: "position",
    options: [
      {
        value: "all",
        text: Vue.filter("translate")({
          nameRu: "Все",
          nameEng: "All",
          nameKz: "Барлығын",
        }),
      },
    ],
  },
  {
    type: "select",
    label: { nameRu: "Действия", nameEng: "action", nameKz: "Істер" },
    name: "action",
    options: [
      {
        value: "all",
        text: Vue.filter("translate")({
          nameRu: "Все",
          nameEng: "All",
          nameKz: "Барлығын",
        }),
      },
    ],
  },
];

const filterForm = {
  dateStart: "",
  dateEnd: "",
  position: {
    value: "all",
    text: Vue.filter("translate")({
      nameRu: "Все",
      nameEng: "All",
      nameKz: "Барлығын",
    }),
  },
  action: {
    value: "all",
    text: Vue.filter("translate")({
      nameRu: "Все",
      nameEng: "All",
      nameKz: "Барлығын",
    }),
  },
};

export default Vue.extend({
  data() {
    return {
      isTableLoading: false,
      search: "",
      isShowFilter: false,
      isLoading: false,
      formBody,
      filterForm,
      headers,
      logs: [],
    };
  },
  validations: {
    filterForm: {
      dateStart: {
        required,
      },
      dateEnd: {
        required,
      },
      position: {
        required,
      },
      action: {
        required,
      },
    },
  },
  methods: {
    searchChange() {
      const val = this.search;
      if (!val) this.logs = this.$store.getters.logs;
      this.logs = this.logs.filter(
        ({ dateTime, admin, action, comment }: ILog) => {
          return (
            dateTime.includes(val) ||
            admin.toString().includes(val) ||
            action.includes(val) ||
            (comment && comment.includes(val))
          );
        }
      );
    },

    submitFilter(): void {
      this.$v.$touch();

      if (!this.$v.$error) {
        const { dateStart, dateEnd, action } = this.filterForm;
        console.log(new Date(dateStart))
        console.log(new Date(dateEnd))
        this.logs = this.logs.filter((log: ILog) => {
          if (log.action === action.value || action.value === "all") {
            const dateTime = moment(log.dateTime.split(' ')[0], 'DD/MM/YYYY')
            console.log(new Date(dateTime))
            console.log(new Date(dateStart) >= new Date(dateTime) &&
                new Date(dateEnd) <= new Date(dateTime))
            return (
              new Date(dateStart).setHours(0,0,0,0) <= new Date(dateTime).setHours(0,0,0,0) &&
              new Date(dateEnd).setHours(0,0,0,0) >= new Date(dateTime).setHours(0,0,0,0)
            );
          }
          return false;
        });
      }
    },
    resetFilter(): void {
      this.logs = this.$store.getters.logs;
      this.$v.$reset();
      Object.keys(this.filterForm).forEach((formInput) => {
        this.filterForm[formInput] = null;
      });
    },
    saveDate(formInputName: string, formInputMenuValue): void {
      this.$refs[formInputName][0].save(formInputMenuValue);
    },
    dateStart(): string {
      if (
        !this.$v.filterForm.dateStart ||
        this.$v.filterForm.dateStart.$model === ""
      )
        return "";
      return new Date(this.$v.filterForm.dateStart.$model)
        .toISOString()
        .slice(0, 10);
    },
    toggleFilter(): void {
      this.isShowFilter = !this.isShowFilter;
    },
    isError(formInput): string[] {
      const errors = [];
      this.$v.filterForm[formInput.name].$error &&
        errors.push(this.$t("fillTheField"));
      return errors;
    },
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch(SET_LOGS);
    this.isLoading = false;
    this.logs = this.$store.getters.logs;
  },
});
</script>

<style lang="scss" scoped>
.logs {
  height: 100%;
  padding: 60px 135px 0 135px;
  background: #f7f7f8;
  table {
    border: none;
  }
  .filter-input__date {
    width: 170px;
    max-width: 170px;
    margin-right: 20px;
  }
  .filter-input__select {
    width: 190px;
    max-width: 190px;
    margin-right: 20px;
  }

  .filter-lable {
    font-weight: normal;
    color: #000000;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
