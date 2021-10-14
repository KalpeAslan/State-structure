import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class HttpService {
  http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: process.env.API_BASE_URL,
    });
  }

  get(url: string, options?: AxiosRequestConfig): Promise<any> {
    return this.http.get(url, options).then((res) => res.data);
  }

  post(url: string, data, options?: AxiosRequestConfig): Promise<any> {
    return this.http.post(url, data, options).then((res) => res.data);
  }

  put(url: string, data, options?: AxiosRequestConfig): Promise<any> {
    return this.http.put(url, data, options).then((res) => res.data);
  }
}
