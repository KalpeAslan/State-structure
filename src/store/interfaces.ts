
export interface IStateTreeStore {
    tree: null | ITree,
    unlock: boolean,
    dragTargetNode: null | ITree
}

export interface ITree {
    name: string | number,
    children?: Array<ITree>,
    _key?: string,
    id: string | number,
    type?: string,
    positionChildren?: IEmployee[] | IRole[],
    positionRole?: IRole
}

export interface IRole {
  name: string,
  id: number | string
}



export interface IStateHomeStore {
    selectedGovOrg: Object,
    positions: Array<IPosition>,
    tempPosition: null | IPosition,
    mode: string,
    goverments: IGoverment[],
    selectedGoverment: IGoverment | null,
    roles: IRole[],
    employies: IEmployee[]
}
export interface IPosition {
    name: String,
    id: number | string,
    role?: string,
    type?: string,
    employeeDate?: string,
    tempEmployee?: string,
    endTempEmployeeDate?: string,
    comment?: string,
}

export interface IGoverment {
    bin: string | number,
    name: string,
    nameKz?: string,
    nameEn?: string,
    state?: string
}

export interface IRole {
    title: string,
    id: string | number,
}

export interface IEmployee{
    title: string,
    id: number
}
