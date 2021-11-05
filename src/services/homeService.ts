import { AxiosRequestConfig } from "axios";
import { word, parser } from "@saikksub/the-office";
import {
  IEmployee,
  IEmployeeChange,
  IEmployeeReq,
  IPositionReq,
} from "./../store/interfaces";
import { IGovermentReq, ISubdivisonReq } from "@/store/interfaces";
import { HttpService } from "./httpService";
import Vue from "vue";
import { IPositionNew } from "@/store/interface";

export class HomeService {
  constructor(private httpService: HttpService) {}

  getGovermentAgencyTree(id: number) {
    return this.httpService.get(
      "/api/v1/get/governmentAgencyFull?governmentAgencyId=" + id
    );
  }

  getRoles() {
    return this.httpService.get("/api/v1/get/roles");
  }

  getEmployees(gaId: number): Promise<any> {
    return this.httpService.get(
      "/api/v1/get/employees?governmentAgencyId=" + gaId
    );
  }

  getPositions(governmentAgencyId: number): Promise<any> {
    return this.httpService.get(
      "/api/v1/get/positions?governmentAgencyId=" + governmentAgencyId
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
    return this.httpService
      .post("/api/v1/new/subdivision", data)
      .then((data) => {
        Vue.notify({
          group: "alert",
          text: "Подразделение добавлено",
          type: "success",
        });
        return data.id;
      });
  }

  postNewPosition(data: IPositionNew) {
    return this.httpService.post("/api/v1/new/position", data);
  }

  postNewEmployee(data: IEmployeeReq) {
    return this.httpService.post("/api/v1/new/employee", data);
  }
  postNewEmployeeReplacement(data: IEmployeeReq) {
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

  changeGovermentAgency(goverment: IGovermentReq): Promise<any> {
    return this.httpService.post("/api/v1/change/governmentAgency", goverment);
  }

  changeEmployee(data: IEmployeeChange) {
    return this.httpService.post("/api/v1/change/employee", data).then(() => {
      Vue.notify({
        group: "alert",
        text: "Временный сотрудник назначен",
        type: "success",
      });
    });
  }

  getDocument(govermentAgencyId: number) {
    return this.httpService
      .get("/api/v1/get/document?govermentAgencyId=" + govermentAgencyId)
      .then((data: string) => {
        const fileReader: FileReader = new FileReader();
        const blob = new Blob([data], { type: "text/plain" });
        fileReader.readAsDataURL(blob);
        fileReader.onload = () => {
          const base64: any = fileReader.result;
          word(base64.substr(23, base64.length)).then((data) => {
            const { doc, properties } = data;
            const { core, app } = properties;
            console.log(core, app);

            const html = parser.createHtml(data);
            console.log(html);
          });
        };
      });
  }
}

export const homeService = new HomeService(new HttpService());
