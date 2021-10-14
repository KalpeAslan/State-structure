export interface INewGovData {
  bin: number;
  nameRu: string;
  nameKz: string;
  nameEng: string;
  nameRuShort: string;
  nameKzShort: string;
  nameEngShort: string;
}

export interface INewSubdivisionData {
  governmentAgencyId: number | null; //Either governmentAgencyId or superiorSubdivisionId must be. And another must be null.
  superiorSubdivisionId: number | null; //Either governmentAgencyId or superiorSubdivisionId must be. And another must be null.
  bin: number;
  nameRu: string;
  nameKz: string;
  nameEng: string;
  nameRuShort: string;
  nameKzShort: string;
  nameEngShort: string;
}

export interface INewPositionData {
  superiorPositionId: number;
  roleId: number;
  governmentAgencyId: number | null; // The position can't belong to government agency and subdivision at the same time. So either governmentAgencyId or subdivisionId must be null.
  subdivisionId: number | null; // The position can't belong to government agency and subdivision at the same time. So either governmentAgencyId or subdivisionId must be null.
  nameRu: string;
  nameKz: string;
  nameEng: string;
  nameRuShort: string;
  nameKzShort: string;
  nameEngShort: string;
}

export interface INewEmployeeData {
  userId: number;
  positionId: number;
  recruitmentDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  positionRemovalDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  supervisorId: number;
}

export interface IReplaceEmployeeData {
  replacementEmployeeId: number;
  substituteEmployeeId: number;
  startDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  endDate: string; //Date pattern = "yyyy-MM-dd'T'HH:mm:ss"
  substitutionBasisRu: string;
  substitutionBasisKz: string;
}

export interface IconnectEmployeeWithUser {
  employeeId: number;
  userId: number;
}

export interface IconnectEmployeeWithPosition {
  employeeId: number;
  positionId: number;
}

export interface IconnectPositionWithGovernmentAgency {
  governmentAgencyId: number;
  positionId: number;
}

export interface IconnectPositionWithSubdivision {
  positionId: number;
  subdivisionId: number;
}

export interface IconnectSubdivisionWithSuperiorSubdivision {
  subdivisionId: number;
  superiorSubdivisionId: number;
}

export interface IconnectSubdivisionWithGovernmentAgency {
  subdivisionId: number;
  governmentAgencyId: number;
}
