import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Vue from "vue";

export class HttpService {
  http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: "http://45.147.177.151:8081",
    });
  }

  get(url: string, options?: AxiosRequestConfig): Promise<any> {
    return this.http.get(url, options).then((res) => res.data);
  }

  post(url: string, data, options?: AxiosRequestConfig): Promise<any> {
    return this.http
      .post(url, data, options)
      .then((res) => res.data)
      .catch(() => {
        Vue.notify({
          group: "alert",
          text: "Что то пошло не так, попробуйте позже",
          type: "danger",
        });
      });
  }

  put(url: string, data, options?: AxiosRequestConfig): Promise<any> {
    return this.http
      .put(url, data, options)
      .then((res) => res.data)
      .catch(() => {
        Vue.notify({
          group: "alert",
          text: "Что то пошло не так, попробуйте позже",
          type: "danger",
        });
      });
  }
}
