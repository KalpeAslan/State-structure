import { SET_LOADING } from "./../store/mutation-types";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Vue from "vue";
import store from "@/store";

export class HttpService {
  http: AxiosInstance;
  httpServer: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: "http://95.179.167.161:8081",
    });
    this.httpServer = axios.create({
      baseURL: "http://87.255.215.174",
    });
  }

  get(url: string, options?: AxiosRequestConfig): Promise<any> {
    return this.http.get(url, options).then((res) => res.data);
  }

  post(url: string, data, options?: AxiosRequestConfig): Promise<any> {
    if (options && "params" in options) {
      options.params.userId = 484894;
    } else {
      options = {
        params: {
          userId: 6484546,
        },
      };
    }
    store.dispatch(SET_LOADING, true);
    return this.http
      .post(url, data, options)
      .then((res) => res.data)
      .catch(() => {})
      .finally(() => {
        store.dispatch(SET_LOADING, false);
      });
  }

  put(url: string, data, options?: AxiosRequestConfig): Promise<any> {
    options.params.userId = 484;
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

  postToServer(
    url: string,
    body = {},
    options?: AxiosRequestConfig
  ): Promise<any> {
    return this.httpServer.post(url, body, options).then((res) => res.data);
  }
}
