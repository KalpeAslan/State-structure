import { HttpService } from "./httpService";

export class TreeService {
  constructor(private httpService: HttpService) {}

  connectEmployeeWithUser(employeeId: number, userId: number) {
    return this.httpService.get("/api/v1/connect/employee/with/user", {
      params: {
        employeeId,
        userId,
      },
    });
  }

  connectEmployeeWithPosition(employeeId: number, positionId: number) {
    return this.httpService.get(" GET /api/v1/connect/employee/with/position", {
      params: {
        employeeId,
        positionId,
      },
    });
  }

  connectPositionWithGovermentAgency() {}
}
