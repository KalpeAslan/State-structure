import store from "@/store";
import { ISignXml } from "@/store/interface";
import { SET_WEBSOCKET_STATE } from "@/store/mutation-types";
import json2xml from "json2xml";
import { xml2json } from "xml2json-light";
import { HttpService } from "./httpService";

class NcaLayerService {
  private webSocketUrl: string = "wss://127.0.0.1:13579/";
  private webSocket: WebSocket;
  async init(): Promise<any> {
    return await this.create();
  }

  close() {
    this.webSocket.close();
  }

  constructor(private httpSerivce: HttpService) {
    this.httpSerivce = httpSerivce;
  }

  private create(): Promise<any> {
    return new Promise((resolve: any) => {
      this.webSocket = new WebSocket(this.webSocketUrl);
      this.webSocket.onmessage = this.onMessage.bind(this);
      this.webSocket.onclose = this.onClose.bind(this);
      this.webSocket.onerror = this.onError.bind(this);
      this.webSocket.onopen = (e) => {
        this.onOpen(e);
        resolve("opened");
      };
    });
  }

  private onOpen(event) {
    console.log(event);
    store.dispatch(SET_WEBSOCKET_STATE, "opened");
  }

  private onMessage(event) {
    const result = JSON.parse(event.data);
    console.log(event.data);
    if (result.responseObject) {
      const blob = new Blob([result.responseObject], { type: "text/xml" });
      const xmlFile = new File([blob], "test.xml", { type: "text/xml" });
      const formData = new FormData();
      formData.append("xmlFile", xmlFile);
      this.verifyXmlDocument(result.responseObject);
      store.dispatch(SET_WEBSOCKET_STATE, "signed");
    }
  }

  private onClose(event) {
    console.log(event);
    store.dispatch(SET_WEBSOCKET_STATE, "close");
  }

  private onError(event) {
    console.log(event);
    store.dispatch(SET_WEBSOCKET_STATE, "error");
  }

  sign() {
    const storageName = "PKCS12";
    const xmlToSign = `<?xml version="1.0" encoding="UTF-8" ?><root><Test>testValue</Test><Test1>23</Test1></root>`;
    const keyType = "SIGNATURE";
    const signXml: ISignXml = {
      module: "kz.gov.pki.knca.commonUtils",
      method: "signXml",
      args: [storageName, keyType, xmlToSign, "", ""],
    };
    return this.webSocket.send(JSON.stringify(signXml));
  }

  get getXmlDocument(): string {
    const tempJson = {
      history: "История",
      historyActions: "История действий",
      historyVersions: "История версий",
      exportPdf: "Экспорт в PDF",
      edit: "Редактировать",
      delete: "Удалить",
      constructor: "Конструктор",
    };
    const xmlDocument = json2xml(tempJson);
    console.log(xmlDocument);
    console.log(xml2json(xmlDocument));
    return xmlDocument;
  }

  verifyXmlDocument(xmlDocument: string): Promise<any> {
    return this.httpSerivce.post("/api/v1/get/verifiy-document", xmlDocument, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
export const ncaLayerService = new NcaLayerService(new HttpService());
