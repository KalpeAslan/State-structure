import { HttpService } from "./httpService";
export class LogsService {
  constructor(private httpService: HttpService) {}

  getLogs(): Promise<any> {
    return this.httpService.get("/api/v1/get/logs/user");
  }

  getVersionsByGAId(governmentAgencyId: number): Promise<any> {
    return this.httpService.get(
      "/api/v1/get/versions?governmentAgencyId=" + 32
    );
  }

  getVersionObjectByVersionId(versionId: number): Promise<any> {
    return this.httpService.get("/api/v1/get/version?versionControlId=" + 32);
  }
}

export const logsService = new LogsService(new HttpService());
