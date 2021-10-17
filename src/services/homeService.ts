import { AxiosRequestConfig } from "axios";
import {
  IEmployee,
  IEmployeeReplacementReq,
  IEmployeeReq,
  IPositionReq,
} from "./../store/interfaces";
import { IGovermentReq, ISubdivisonReq } from "@/store/interfaces";
import { HttpService } from "./httpService";

class HomeService {
  constructor(private httpService: HttpService) {}

  postNewGovermentAgence(data: IGovermentReq) {
    return this.httpService.post("/api/v1/new/governmentAgencyFull", {
      bin: 123456789012,
      nameRu: "nameRu",
      nameKz: "nameKz",
      nameEng: "nameEng",
      nameRuShort: "nameRuShort",
      nameKzShort: "nameKzShort",
      nameEngShort: "nameEngShort",
    });
  }

  postNewSudivision(data: ISubdivisonReq) {
    return this.httpService.post("/api/v1/new/subdivision", data);
  }

  postNewPosition(data: IPositionReq) {
    return this.httpService.post("/api/v1/new/position", data);
  }

  postNewEmployee(data: IEmployeeReq) {
    return this.httpService.post("/api/v1/new/employee", data);
  }
  postNewEmployeeReplacement(data: IEmployeeReplacementReq) {
    return this.httpService.post("/api/v1/new/employeeReplacement", data);
  }

  getAllGovermentAgencies(options?: AxiosRequestConfig): Promise<any> {
    return this.httpService.get("/api/v1/get/all/GovernmentAgencies/", options);
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
}

export const homeService = new HomeService(new HttpService());
