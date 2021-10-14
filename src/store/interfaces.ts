export interface IStateTreeStore {
  tree: null | ITree;
  unlock: boolean;
  dragTargetNode: null | ITree;
  plusSelectedNode: ITree | null;
}

export interface ITree {
  subdivisions?: Array<ITree>;
  children?: ITree[];
  _key?: string;
  id: number;
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
}

export interface IStateHomeStore {
  selectedGovOrg: Object;
  positions: Array<IPosition>;
  tempPosition: null | IPosition;
  mode: string;
  goverments: IGoverment[];
  selectedGoverment: IGoverment | null;
  roles: IRole[];
  employies: IEmployee[];
}

export interface IPosition {
  nameRu: string;
  id: number | string;
  employees: IEmployeeNode[];
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
  children?: IEmployeeNode[];
}
export interface IGoverment {
  bin: string | number;
  nameRu: string;
  nameKz: string;
  nameEn: string;
  nameRuShort: string;
  nameKzShort: string;
  nameEngShort: string;
}

export interface IEmployeeNode {
  id: number;
  governmentAgencyId: null | number;
  subdivisionId: number;
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

export interface IEmployee {
  name: string;
  id: number;
  type?: string;
}

export interface ISubdivisonReq {
  governmentAgencyId: number | null; //Long
  superiorSubdivisionId: number | null; //Long
  nameRu: string | null; //String
  nameKz: string | null; //String
  nameEng: string | null; //String
  nameRuShort: string | null; //String
  nameKzShort: string | null; //String
  nameEngShort: string | null; //String
}
export interface IEmployeeReq {
  userId: number; //Long
  positionId: number; //Long
  recruitmentDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  positionRemovalDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  supervisorId: number; //Long
}

export interface IPositionReq {
  superiorPositionId: number; //Long
  roleId: number; //Long
  governmentAgencyId: number; //Long
  subdivisionId: number; //Long
  nameRu: string; //String
  nameKz: string; //String
  nameEng: string; //String
  nameRuShort: string; //String
  nameKzShort: string; //String
  nameEngShort: string; //String
}

export interface IEmployeeReplacementReq {
  replacementEmployeeId: number; //Long
  substituteEmployeeId: number; //Long
  startDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  endDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  substitutionBasisRu: string; //String
  substitutionBasisKz: string; //String
}
