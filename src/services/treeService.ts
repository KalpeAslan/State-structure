import { HomeService, homeService } from "./homeService";
import { HttpService } from "./httpService";
import store from "@/store";

class TreeService {
  constructor(
    private httpService: HttpService,
    public homeService: HomeService
  ) {}

  private get governmentAgencyId(): number {
    return store.getters.GET_SELECTED_GA;
  }

  connectEmployeeWithUser(employeeId: number, userId: number) {
    return this.httpService.get("/api/v1/connect/employee/with/user", {
      params: {
        employeeId,
        userId,
        governmentAgencyId: this.governmentAgencyId,
      },
    });
  }

  connectEmployeeWithPosition(employeeId: number, positionId: number) {
    return this.httpService.get("/api/v1/connect/employee/with/position", {
      params: {
        employeeId,
        positionId,
        governmentAgencyId: this.governmentAgencyId,
      },
    });
  }

  connectPositionWithGovermentAgency(
    positionId: number,
    governmentAgencyId: number
  ) {
    return this.httpService.get(
      "/api/v1/connect/position/with/governmentAgency",
      {
        params: {
          positionId,
          governmentAgencyId,
        },
      }
    );
  }

  connectPositionWithSubdivision(
    subdivisionId: number,
    superiorSubdivisionId: number
  ) {
    return this.httpService.get(
      "/api/v1/connect/position/with/subdivision?positionId=500&subdivisionId=500",
      {
        params: {
          subdivisionId,
          superiorSubdivisionId,
          governmentAgencyId: this.governmentAgencyId,
        },
      }
    );
  }

  connectSubdivisionWithSuperiorSubdivision(
    subdivisionId: number,
    governmentAgencyId: number
  ) {
    return this.httpService.get(
      "/api/v1/connect/subdivision/with/superiorSubdivision?subdivisionId=123&superiorSubdivisionId=123",
      {
        params: {
          subdivisionId,
          governmentAgencyId,
        },
      }
    );
  }

  connectSubdivisionWithGovermentAgency(
    subdivisionId: number,
    governmentAgencyId: number
  ) {
    return this.httpService.get(
      "/api/v1/connect/subdivision/with/governmentAgency?subdivisionId=123&governmentAgencyId=123",
      {
        params: {
          subdivisionId,
          governmentAgencyId,
        },
      }
    );
  }
}

export const treeService = new TreeService(new HttpService(), homeService);
