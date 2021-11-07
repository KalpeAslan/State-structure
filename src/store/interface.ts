// Home Store

//ncaLayer
export interface ISignXml {
  module: string;
  method: "signXml";
  args: string[];
}

export type TWebSocketState =
  | null
  | "open"
  | "onOpen"
  | "opened"
  | "signed"
  | "close"
  | "closed"
  | "error";

//Entities
interface IBaseNames {
  nameRus: string; //String
  nameKaz: string; //String
  nameEng: string; //String
  nameRusShort: string; //String
  nameKazShort: string; //String
  nameEngShort: string; //String
}

interface IBaseNamesShort {
  nameRu: string; //String
  nameKz: string; //String
  nameEng: string; //String
  nameRuShort: string; //String
  nameKzShort: string; //String
  nameEngShort: string;
}

export interface ISubdivisonChange extends IBaseNames {
  id: number; //Long
  bin: number; //Long, government agency id. Nice naming.
  department?: number; //Long, supe
  status: number; //Long, status id
}

//Goverment Agencies
export type TStatuses = 315 | 316 | 317 | 318 | 319 | 320 | 321 | 322;

//Positions
export interface IPositionNew extends IBaseNamesShort {
  ddepartmentIinId: number; //Long, government agency id
}

export interface IPositionChange extends IPositionNew {
  role?: number; //Long, role id
  status: number; //Long, status id
  departmentId?: number; //Long, subdivision id
  governmentAgencyId?: number;
  id: number; //Long
}

// Employee

interface IEmployeeBase {
  user: number; //Long, user id
  recruitmentDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  positionRemovalDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
}

export interface IEmployeeNew extends IEmployeeBase {
  position; //Long, position id
  ddepartmentIinId; //Long, government agency id
}

export interface IEmployeeGet extends IEmployeeBase {
  key?: number | string;
  entityType?: "employee";
  employeesTableid: number;
  positions: number | null;
  governmentAgency: number;
  subdivisions: number | null;
  status: number;
  statusObject: {
    id: number;
    nameKaz: string;
    nameRus: string;
    value: string | number | null;
    code: null | number;
  };
}
