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

interface IStatus {
  status: number;
  statusObject: {
    id: number;
    nameKaz: string;
    nameRus: string;
    value: string | number | null;
    code: null | number;
  };
}

export interface ISubdivisonChange extends IBaseNames {
  bin: number; //Long, government agency id. Nice naming.
  department?: number; //Long, supe
  id: number;
  status: number;
}

//Goverment Agencies
export type TStatuses = 315 | 316 | 317 | 318 | 319 | 320 | 321 | 322;

/**
 * START
 * /api/v1/get/governmentAgency
 */

type TddepartmentIinDto = IBaseNames &
  IStatus & {
    id: number;
    iin: string | number;
  };

type TBaseEntity = IBaseNames & {
  status: number;
  id: number;
};

type TdepartmentDto = TBaseEntity & {
  bin: number;
  department: number;
  employees: [];
};

type TpositionsDto = TBaseEntity & {
  ddepartmentIinId: number;
  departmentId: number;
  role: number;
};

type TEmployeeDto = {
  id: number;
  user: number;
  position: number;
  ddepartmentIinId: number;
  departmentId: number;
  recruitmentDate: string;
  positionRemovalDate: string | null;
  createDate: string;
  status: number;
  statusObject: null;
  fl: any;
  ul: any;
  managers: any;
};

export type TGovermentAgencyRaw = {
  ddepartmentIinDto: TddepartmentIinDto;
  departmentDto: TdepartmentDto[];
  positionsDto: TpositionsDto[];
  employeeDto: TEmployeeDto[];
  employeeReplacementDto: [];
};

type TPositionDtoObject = TpositionsDto & {
  employees: TEmployeeDto[];
};
export type TDepartamentDtoObject = IBaseNames & {
  positions: TPositionDtoObject;
};
export type TGovermentAgencyObject = TDepartamentDtoObject[];

/**
 * END
 */

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
  positionRemovalDate: string | null; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
}

export interface IEmployeeNew extends IEmployeeBase {
  position; //Long, position id
  ddepartmentIinId; //Long, government agency id
}

export interface IEmployeeGet extends IEmployeeBase, IStatus {
  key?: number | string;
  entityType?: "employee";
  employeesTableid: number;
  positions: number | null;
  governmentAgency: number;
  subdivisions: number | null;
}

export interface IEmployeeReplacementNew {
  substituteUser: number; //Long, employee that temporarly holds office
  replacementEmployee: number; //Long, employee that temporarly left this position
  startDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  endDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  substitutionBasisRu: string; //String
  substitutionBasisKz: string; //String
}

//User

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  key?: string | number;
  entityType?: "user";
}

/**
 * Logs
 * Begin
 */

interface ILogBase {
  id: number;
  admin: number;
  dateTime: string;
  adminObject: IUser;
}

export interface ILogGet extends ILogBase {
  action: string; //JSON
}
export interface ILog extends ILogBase {
  action: string;
  comment: string;
}

export interface IVersion {
  id: number;
  user: number;
  status: number;
  date: string;
  ddepartmentIin: number;
  ddepartmentIinTree: null | string;
  admin: IUser;
}

/**
 * Logs
 * End
 */
