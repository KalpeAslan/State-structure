import {
  INewGovData,
  INewSubdivisionData,
  INewEmployeeData,
  IReplaceEmployeeData,
  IconnectEmployeeWithUser,
  IconnectEmployeeWithPosition,
  IconnectPositionWithGovernmentAgency,
  IconnectPositionWithSubdivision,
  IconnectSubdivisionWithSuperiorSubdivision,
  IconnectSubdivisionWithGovernmentAgency,
} from "@/ts/interfaces/apiInterfaces";
import { instance } from "./axios.instance";

export const govCreateAPI = {
  createNewGov: async (newGovData: INewGovData) => {
    try {
      return await instance.post(`/api/v1/new/governmentAgency`, newGovData);
    } catch (error: any) {
      throw error;
    }
  },

  createNewSubdivision: async (newSubdivisionData: INewSubdivisionData) => {
    try {
      return await instance.post(`/api/v1/new/subdivision`, newSubdivisionData);
    } catch (error: any) {
      throw error;
    }
  },

  createNewPosition: async (newPositionData: INewSubdivisionData) => {
    try {
      return await instance.post(`/api/v1/new/position`, newPositionData);
    } catch (error: any) {
      throw error;
    }
  },

  createNewEmployee: async (newEmployeeData: INewEmployeeData) => {
    try {
      return await instance.post(`/api/v1/new/employee`, newEmployeeData);
    } catch (error: any) {
      throw error;
    }
  },

  replaceEmployee: async (newEmployeeData: IReplaceEmployeeData) => {
    try {
      return await instance.post(`/api/v1/new/employee`, newEmployeeData);
    } catch (error: any) {
      throw error;
    }
  },
};

export const govChangingAPI = {
  connectEmployeeWithUser: async (data: IconnectEmployeeWithUser) => {
    try {
      return await instance.get(
        `/api/v1/connect/employee/with/user?employeeId=${data.employeeId}&userId=${data.userId}`
      );
    } catch (error: any) {
      throw error;
    }
  },

  connectEmployeeWithPosition: async (data: IconnectEmployeeWithPosition) => {
    try {
      return await instance.get(
        `/api/v1/connect/employee/with/position?employeeId=${data.employeeId}&positionId=${data.positionId}`
      );
    } catch (error: any) {
      throw error;
    }
  },

  connectPositionWithGovernmentAgency: async (data: IconnectPositionWithGovernmentAgency) => {
    try {
      return await instance.get(
        `/api/v1/connect/position/with/governmentAgency?positionId=${data.positionId}&governmentAgencyId=${data.governmentAgencyId}`
      );
    } catch (error: any) {
      throw error;
    }
  },

  connectPositionWithSubdivision: async (data: IconnectPositionWithSubdivision) => {
    try {
      return await instance.get(
        `/api/v1/connect/position/with/subdivision?positionId=${data.positionId}&subdivisionId=${data.subdivisionId}`
      );
    } catch (error: any) {
      throw error;
    }
  },

  connectSubdivisionWithSuperiorSubdivision: async (data: IconnectSubdivisionWithSuperiorSubdivision) => {
    try {
      return await instance.get(
        `/api/v1/connect/subdivision/with/superiorSubdivision?subdivisionId=${data.subdivisionId}&superiorSubdivisionId=${data.superiorSubdivisionId}`
      );
    } catch (error: any) {
      throw error;
    }
  },

  connectSubdivisionWithGovernmentAgency: async (data: IconnectSubdivisionWithGovernmentAgency) => {
    try {
      return await instance.get(
        `/api/v1/connect/subdivision/with/governmentAgency?subdivisionId=${data.subdivisionId}&governmentAgencyId=${data.governmentAgencyId}`
      );
    } catch (error: any) {
      throw error;
    }
  },
};

export const govTreeApi = {
  governmentAgencyTree: async (governmentAgencyId: number) => {
    try {
      return await instance.get(`/api/v1/get/governmentAgency?governmentAgencyId=${governmentAgencyId}`);
    } catch (error: any) {
      throw error;
    }
  },
};
