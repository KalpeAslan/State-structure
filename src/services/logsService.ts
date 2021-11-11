import { HttpService } from "./httpService";
export class LogsService {
  constructor(private httpService: HttpService) {}

  getLogs(): Promise<any> {
    return this.httpService.get("/api/v1/get/logs/user");
  }
}

export const logsService = new LogsService(new HttpService());
