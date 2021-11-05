import { IEmployeeNew } from "./../store/interface";
import { HomeService, homeService } from "./homeService";
import { HttpService } from "./httpService";
import { IPositionChange, ISubdivisonChange } from "@/store/interface";

class TreeService {
  constructor(
    private httpService: HttpService,
    public homeService: HomeService
  ) {}

  //IPositionReq
  changePosition(position: IPositionChange) {
    return this.httpService.post("/api/v1/change/position", position);
  }

  changeSubdivision(subdivision: ISubdivisonChange) {
    return this.httpService.post("/api/v1/change/subdivision", subdivision);
  }

  newEmployee(employee: IEmployeeNew) {
    return this.httpService.post("/api/v1/new/employee", employee);
  }
}

export const treeService = new TreeService(new HttpService(), homeService);
