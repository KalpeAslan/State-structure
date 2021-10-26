import { IPositionReq, ISubdivisonReq } from "./../store/interfaces";
import { HomeService, homeService } from "./homeService";
import { HttpService } from "./httpService";
import store from "@/store";

class TreeService {
  constructor(
    private httpService: HttpService,
    public homeService: HomeService
  ) {}

  //IPositionReq
  changePosition(position) {
    return this.httpService.post("/api/v1/change/position", position);
  }

  changeSubdivision(subdivision: ISubdivisonReq) {
    return this.httpService.post("/api/v1/change/subdivision", subdivision);
  }
}

export const treeService = new TreeService(new HttpService(), homeService);
