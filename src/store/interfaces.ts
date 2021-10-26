export interface IStateTreeStore {
  tree: null | ITree;
  oldTree: null | ITree;
  unlock: boolean;
  dragTargetNode: null | ITree;
  plusSelectedNode: ITree | null;
  isUpdated: boolean;
  tempPosition: null | IPosition;
}

export interface ITree {
  subdivisions?: Array<ITree>;
  children?: ITree[];
  _key?: string;
  key?: number | string;
  id: number;
  hidden?: boolean;
  employees?: IEmployee[];
  bin?: string | number;
  entityType: string;
  positions?: Array<IPosition>;
  governmentAgencyId?: null | number;
  superiorSubdivisionId?: null | number;
  nameRu: string;
  nameKz?: string;
  nameEng?: string;
  nameRuShort?: string;
  nameKzShort?: string;
  nameEngShort?: string;
  statusId: number;
  status: {
    id: number;
    name: string;
  };
}

export interface IRole {
  name: string;
  id: number | string;
  key: number | string;
  nameKaz: string;
  nameRus: string;
  removed: boolean;
}

export interface IStateHomeStore {
  positions: Array<IPosition>;
  mode: string;
  goverments: IGoverment[];
  selectedGoverment: IGoverment | null;
  roles: IRole[];
  employies: IEmployee[];
  subdivisionUnderGovernmentAgency: boolean;
  gaState: number;
}

export interface IPosition {
  nameRu: string;
  key?: number | string;
  id: number | string;
  hidden?: boolean;
  employees: IEmployee[];
  employeeReplacement?: IEmployeeReq;
  superiorPosition: null | number;
  subdivisionId: null | number;
  roleId: null | number;
  governmentAgencyId: null | number;
  superiorSubdivisionId?: number;
  statusId: number;
  nameKz?: string;
  nameEng?: string;
  nameRuShort?: string;
  nameKzShort?: string;
  nameEngShort?: string;
  status: {
    id: number;
    name: string;
  };
  entityType: string;
  //Children array for Employees and roles
  children?: IEmployee[];
}

export interface IGoverment {
  id: number;
  bin: string;
  nameEng: string;
  key?: number | string;
  nameEngShort: string;
  nameKz: string;
  nameKzShort: string;
  nameRu: string;
  nameRuShort: string;
  status: {
    id: number;
    nameKaz: string;
    nameRus: string;
    value: null | string;
    code: {
      code: number;
      description: string;
      id: number;
    };
  };
}

export interface IGovermentReq {
  bin: string | number;
  nameRu: string;
  nameKz: string;
  nameEng: string;
  nameRuShort: string;
  nameKzShort: string;
  nameEngShort: string;
  status?: number;
  id?: number;
}
export interface IEmployee {
  id: number;
  governmentAgencyId: null | number;
  subdivisionId: number;
  key?: number | string;
  recruitmentDate?: string | number;
  positionRemovalDate?: string;
  status: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
  };
  positionId: null | number;
  supervisorId: null | number;
  statusId: null | number;
  entityType: string;

  userId: null | number;
}

export interface ISubdivisonReq {
  governmentAgencyId: number | null; //Long
  superiorSubdivisionId?: number | null; //Long
  nameRu: string | null; //String
  nameKz: string | null; //String
  nameEng: string | null; //String
  nameRuShort: string | null; //String
  nameKzShort: string | null; //String
  nameEngShort: string | null; //String
  subdivisionUnderGovernmentAgency?: boolean;
  id?: number;
  status?: number;
}
export interface IEmployeeReq {
  replacementEmployeeId: number; //Long, employee that temporarly holds office
  substituteEmployeeId: number; //Long, employee that temporarly left this position
  startDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  endDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  substitutionBasisRu: string; //String
  substitutionBasisKz: string; //String
}

export interface IEmployeeChange {
  id; //Long
  user; //Long, user id
  positions; //Long, position id
  governmentAgency; //Long, government agency id
  recruitmentDate; //Date, pattern = "yyyy-MM-dd'T'HH:mm:ss"
  positionRemovalDate; //Date, pattern = "yyyy-MM-dd'T'HH:mm:ss"
  status; //Long, status id
}

export interface IPositionReq {
  superiorPositionId: number; //Long
  roleId: number; //Long
  governmentAgency: number; //Long
  subdivisionId: number; //Long
  nameRu: string; //String
  nameKz: string; //String
  nameEng: string; //String
  nameRuShort: string; //String
  nameKzShort: string; //String
  nameEngShort: string; //String
  id?: number | string;
  subdivisions?: number;
  role?: number;
  status?: number;
}

export interface IStateGlobalStore {
  selectedModalName: string | null;
}

export type language = "ru" | "kz" | "en";
export type userTypes =
  | "dispatcher"
  | "departmentBoss"
  | "departmentHead"
  | "admin";
export interface IStateSystemStore {
  currentLanguage: language;
  userType: userTypes;
}
