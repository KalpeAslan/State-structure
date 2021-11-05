import { HttpService } from "./httpService";
export class SystemService {
  constructor(private httpService: HttpService) {}

  redirectToMain(): void {
    const state: string = "sd";
    const url = `http://87.255.215.174/auth/oauth/authorize?client_id=portalttk&response_type=code&state=${state}&redirect_uri=${window.location.href}`;
    // window.open();
  }

  validateCode(code: string): Promise<any> {
    return this.httpService.postToServer("/auth/oauth/token", {
      code,
    });
  }
}
