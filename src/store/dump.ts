import { IEmployee, IGoverment, IPosition } from "./interfaces";
import { ITree } from "@/store/interfaces";
import { IEmployeeGet } from "./interface";

export const employeesGet: IEmployeeGet[] = [
  {
    employeesTableid: 1,
    user: 2,
    positions: 1,
    governmentAgency: 58,
    subdivisions: 1,
    recruitmentDate: "2021-10-22T15:55:13.470+00:00",
    positionRemovalDate: "2021-10-22T15:55:13.470+00:00",
    status: 314,
    statusObject: {
      id: 314,
      nameKaz: "name_kaz",
      nameRus: "name_rus",
      value: null,
      code: null,
    },
  },
];

export const roles = [
  {
    roleId: 1234546,
    entityType: "role",
    id: 0,
    name: "string",
    nameKaz: "string",
    nameRus: "string",
    removed: false,
  },
  {
    roleId: 787845345,
    entityType: "role",
    id: 0,
    name: "string",
    nameKaz: "string",
    nameRus: "string",
    removed: false,
  },
  {
    roleId: 456656,
    entityType: "role",
    id: 0,
    name: "string",
    nameKaz: "string",
    nameRus: "string",
    removed: true,
  },
];

export const governmentAgencies: IGoverment[] = [
  {
    id: 1,
    iin: "string",
    nameEng: "string",
    nameEngShort: "string",
    nameKaz: "string",
    nameKazShort: "string",
    nameRus: "testValue front",
    nameRusShort: "string",
    status: null,
    statusObject: {
      id: 1,
      nameKaz: "kaz_Черновик",
      nameRus: "Черновик",
      value: null,
      code: {
        code: 2,
        description: "заявка",
        id: 1,
      },
    },
  },
  {
    id: 1,
    iin: "string",
    nameEng: "string",
    nameEngShort: "string",
    nameKaz: "string",
    nameKazShort: "string",
    nameRus: "Test value front",
    nameRusShort: "string",
    status: 1,
    statusObject: {
      id: 1,
      nameKaz: "kaz_Черновик",
      nameRus: "Черновик",
      value: null,
      code: {
        code: 1,
        description: "заявка",
        id: 1,
      },
    },
  },
  {
    id: 1,
    iin: "string",
    nameEng: "string",
    nameEngShort: "string",
    nameKaz: "string",
    nameKazShort: "string",
    nameRus: "Value front",
    nameRusShort: "string",
    status: 1,
    statusObject: {
      id: 1,
      nameKaz: "kaz_Черновик",
      nameRus: "Черновик",
      value: null,
      code: {
        code: 5,
        description: "заявка",
        id: 1,
      },
    },
  },
];
