import { AxiosRequestConfig } from "axios";
import {
  IEmployee,
  IEmployeeReplacementReq,
  IEmployeeReq,
  IPositionReq,
} from "./../store/interfaces";
import { IGovermentReq, ISubdivisonReq } from "@/store/interfaces";
import { HttpService } from "./httpService";
import Vue from "vue";

export class HomeService {
  constructor(private httpService: HttpService) {}

  getGovermentAgencyTree(id: number) {
    return this.httpService.get(
      "/api/v1/get/governmentAgencyFull?governmentAgencyId=" + id
    );
  }

  postNewGovermentAgence(data: IGovermentReq) {
    return this.httpService
      .post("/api/v1/new/governmentAgency", data)
      .then(() => {
        Vue.notify({
          group: "alert",
          text: "Государственный орган добавлен",
          type: "success",
        });
      });
  }

  postNewSudivision(data: ISubdivisonReq) {
    return this.httpService.post("/api/v1/new/subdivision", data).then(() => {
      Vue.notify({
        group: "alert",
        text: "Подразделение добавлено",
        type: "success",
      });
    });
  }

  postNewPosition(data: IPositionReq) {
    return this.httpService.post("/api/v1/new/position", data);
  }

  postNewEmployee(data: IEmployeeReq) {
    return this.httpService.post("/api/v1/new/employee", data);
  }
  postNewEmployeeReplacement(data: IEmployeeReplacementReq) {
    return this.httpService
      .post("/api/v1/new/employeeReplacement", data)
      .then(() => {
        Vue.notify({
          group: "alert",
          text: "Временный сотрудник назначен",
          type: "success",
        });
      });
  }

  getAllGovermentAgencies(options?: AxiosRequestConfig): Promise<any> {
    return this.httpService.get("/api/v1/get/all/GovernmentAgencies", options);
  }

  getPositions() {
    return new Promise((res) => {
      setTimeout(() => {
        res([
          {
            name: "Должность 0",
            id: 0,
            type: "position",
            children: [],
          },
          {
            name: "Должность 1",
            id: 1,
            type: "position",
            children: [],
          },
          {
            name: "Должность 2",
            id: 3,
            children: [],

            type: "position",
          },
          {
            name: "Должность 3",
            id: 4,
            children: [],

            type: "position",
          },
          {
            name: "Должность 4",
            id: 5,
            children: [],

            type: "position",
          },
        ]);
      }, 500);
    });
  }

  changeGovermentAgency(goverment: IGovermentReq): Promise<any> {
    return this.httpService.post("/api/v1/change/governmentAgency", goverment);
  }
}

export const homeService = new HomeService(new HttpService());

// bin: "123456789999"
// nameEn: "dsgdf"
// nameEngShort: "Test Value"
// nameKz: "dsgdf"
// nameKzShort: "Test Value"
// nameRu: "dsgdf"
// nameRuShort: "Test Value"

// bin //12-digit bumber
//  nameRu //String
//  nameKz //String
//  nameEng //String
//  nameRuShort //String
//  nameKzShort //String
//  nameEngShort //String
