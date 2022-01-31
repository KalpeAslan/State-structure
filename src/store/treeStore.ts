import moment from "moment";
import { treeService } from "@/services/treeService";
import { Module } from "vuex";
import Vue from "vue";
import {
  IEmployeeChange,
  IEmployeeReq,
  IPosition,
  IStateTreeStore,
  ITree,
} from "./interfaces";
import {
  SET_TREE,
  UPDATE_TREE,
  INSERT_NODE_TO_TREE,
  DELETE_NODE,
  SET_UNLOCK,
  SET_DRAG_TREE,
  INSERT_POSITION_TO_NODE,
  DELETE_EMPLOYEE,
  DELETE_ROLE,
  SET_PLUS_SELECTED_NODE,
  ADD_SUBDIVISION,
  DELETE_ROLE_FROM_TREE,
  RELOAD_TREE,
  CHANGE_SUBDIVISION,
  SET_TEMP_POSITION,
  SET_EMPLOYEE_REPLACEMENT,
  CHANGE_POSITION,
  SET_TREE_SAFE,
  SET_LOADING,
  ADD_EMPLOYEE,
  SET_TEMP_EMPLOYEE_FOR_REPLACEMENT,
  DELETE_POSITION_FROM_NODE,
  SET_GA_STATE,
} from "./mutation-types";
import {
  IEmployeeNew,
  IEmployeeReplacementNew,
  IPositionChange,
  ISubdivisonChange,
} from "./interface";

function insertNodeIntoTree(node, nodeKey: string | number, newNode: ITree) {
  if (node.key == nodeKey) {
    newNode._key = node.key;
    if (!node.children) {
      node.children = [];
    }
    node.children.push(newNode);
  } else if (node.children != null) {
    for (let i = 0; i < node.children.length; i++) {
      insertNodeIntoTree(node.children[i], nodeKey, newNode);
    }
  }
}

function deleteNodeFromTree(node, nodeKey) {
  if (node.children != null) {
    for (let i = 0; i < node.children.length; i++) {
      let filtered = node.children.filter((f) => f.key == nodeKey);
      if (filtered.length !== 0) {
        node.children = node.children.filter((f) => {
          if (f.key === nodeKey) {
            return false;
          }
          return true;
        });
        return;
      }
      deleteNodeFromTree(node.children[i], nodeKey);
    }
  }
}

function getTreeDetpth(node: ITree): number {
  return (
    1 + (node.children ? Math.max(...node.children.map(getTreeDetpth)) : 0)
  );
}

function getNodeById(node: ITree, key): ITree {
  const reduce = [].reduce;
  function runner(result, node) {
    if (result || !node) return result;
    return (
      (node.key == key && node) ||
      runner(null, node.children) ||
      reduce.call(Object(node), runner, result)
    );
  }
  return runner(null, node);
}

export function traverse(tree: ITree | any) {
  if (!("subdivisions" in tree || "positions" in tree || "employees" in tree)) {
    return;
  }

  tree.key = Math.round(Math.random() * 4451454121454);
  if (tree.entityType === "position") {
    tree.employees = Array.isArray(tree.employees)
      ? tree.employees
          .filter((child) => child.statusId !== 322)
          .map((child) => {
            child.employeeState = "currentEmployee";
            // child.employeeReplacement = {
            //   employeeReplacementTableid: 1,
            //   replacementEmployee: 12,
            //   substituteEmployee: 2,
            //   startDate: "2021-12-22T15:56:09.639+00:00",
            //   endDate: "2022-10-22T15:56:09.639+00:00",
            //   substitutionBasisRu: "string",
            //   substitutionBasisKz: "string",
            //   user: {
            //     username: "Lol",
            //   },
            // };
            if (child.employeeReplacement) {
              if (new Date(child.employeeReplacement.startDate) <= new Date()) {
                child.employeeState = "replacementEmployee";
              } else if (
                new Date(child.employeeReplacement.endDate) <= new Date()
              ) {
                delete child.employeeReplacement;
              }
            }
            return child;
          })
      : tree.employees;
    return;
  }

  let children = [];

  if (tree.subdivisions || tree.positions || tree.employees) {
    children = JSON.parse(
      JSON.stringify(
        tree.subdivisions
          ? tree.subdivisions
          : tree.positions
          ? tree.positions
          : tree.employees
      )
    );
  }
  if (tree.subdivisions) {
    delete tree.subdivisions;
  }
  if (tree.employees) {
    delete tree.employees;
  }
  if (tree.positions) {
    tree.positions.forEach((position) => {
      const isIncludesPosition = children.some(
        (child) => child.id === position.id
      );
      if (!isIncludesPosition) children.push(position);
    });
  }

  tree.hidden = false;
  tree.children = children.filter((child) => child.statusId !== 322);

  if (children.length) {
    children.map((child) => traverse(child));
  } else {
    traverse(tree.children);
  }
}

function deletePositionParentByPositionId(tree: any, positionId) {
  if (tree.children != null) {
    for (let i = 0; i < tree.children.length; i++) {
      tree.children = tree.children.filter((f) => {
        if (f.key === positionId) {
          return false;
        }
        return f.nodeKey != positionId;
      });
      if (!tree.children.length) return;
      deletePositionParentByPositionId(tree.children[i], positionId);
    }
  }
}

function deletePositionById(tree: ITree, positionId: number) {
  if (tree.children) {
    tree.children = tree.children.filter((child) => {
      if (child.entityType === "position" && child.id === positionId) {
        return false;
      }
      return true;
    });
    tree.children.forEach((child) => {
      if (child) deletePositionById(child, positionId);
    });
  }
}

const isChildOfNode = (node: ITree, childKey: number): boolean =>
  node.children.some((child) => child.key === childKey);

function getParentId(_tree: ITree, childKey) {
  let parentId;
  function _getParentId(tree) {
    if (tree.children) {
      const isFindParent = tree.children.some((node) => node.key === childKey);
      if (isFindParent) {
        parentId = tree;
        return;
      }
      tree.children.map((node) => _getParentId(node));
    } else {
      if (tree.children) {
        _getParentId(tree.children);
      }
    }
  }
  _getParentId(_tree);
  return parentId;
}

function setEmployeeToPosition(
  tree,
  selectedPositionKey: number | string,
  employee,
  type: "temp" | "current"
) {
  if (tree.key === selectedPositionKey) {
    if (type === "temp") {
      tree.employees[0].employeeReplacement = { ...employee };
      console.log(tree);
    } else {
      tree.employees = [employee];
    }
  } else if (tree.children) {
    tree.children.forEach((node) =>
      setEmployeeToPosition(node, selectedPositionKey, employee, type)
    );
  }
}

export const treeStore: Module<IStateTreeStore, any> = {
  state: {
    tree: null,
    oldTree: null,
    unlock: false,
    dragTargetNode: null,
    plusSelectedNode: null,
    isUpdated: false,
    tempPosition: null,
    tempEmployeeForReplacement: null,
  },
  mutations: {
    [SET_TREE](state, tree: ITree | null): void {
      state.oldTree = JSON.parse(JSON.stringify(tree));
      if (tree === null) return (state.tree = null);
      const _tree = JSON.parse(JSON.stringify(tree));
      traverse(_tree);
      state.tree = _tree;
    },
    [SET_TREE_SAFE](state, tree: ITree): void {
      //Перезаписывает дерево, не трогая ключи
      state.tree = tree;
    },
    [SET_UNLOCK](state, unlock: boolean) {
      state.unlock = unlock;
    },
    [SET_DRAG_TREE](state, tree) {
      state.dragTargetNode = tree;
    },
    ["DELETE_DRAG_TREE"](state) {
      state.dragTargetNode = null;
    },
    [SET_PLUS_SELECTED_NODE](ctx, selectedNode) {
      ctx.plusSelectedNode = selectedNode;
    },
    [SET_TEMP_POSITION](context, tempPosition) {
      context.tempPosition = tempPosition;
    },
    [SET_TEMP_EMPLOYEE_FOR_REPLACEMENT](ctx, employee) {
      ctx.tempEmployeeForReplacement = employee;
    },
  },
  actions: {
    async [SET_TREE](context, treeId): Promise<any> {
      if (treeId === null) return context.commit(SET_TREE, null);
      context.commit(SET_LOADING, true);
      await treeService.homeService
        .getGovermentAgencyTree(treeId)
        .then((tree) => {
          context.commit(SET_GA_STATE, tree.status || 315);
          context.commit(SET_LOADING, false);
          context.commit(SET_TREE, tree);
        })
        .catch(() => {
          context.commit(SET_LOADING, false);
        });
    },
    [UPDATE_TREE](context, { dragEnteredNode, dragTargetNode }) {
      if (dragEnteredNode.key === dragTargetNode.key) return;

      //Если в должность кидают неправильные типы
      if (
        dragEnteredNode.entityType === "position" &&
        !["user", "role"].includes(dragTargetNode.entityType)
      )
        return;
      if (
        "children" in dragEnteredNode &&
        isChildOfNode(dragEnteredNode, dragTargetNode.key)
      ) {
        return;
      }

      context.state.isUpdated = true;
      if (
        dragEnteredNode.entityType === "governmentAgency" &&
        dragTargetNode.entityType === "subdivision"
      ) {
        deleteNodeFromTree(context.state.tree, dragTargetNode.key);
        context.dispatch(CHANGE_SUBDIVISION, {
          subdivision: dragTargetNode,
          isDelete: false,
          parent: dragEnteredNode,
        });
        return context.state.tree.children.push(dragTargetNode);
      }
      if (
        dragEnteredNode.entityType === "governmentAgency" &&
        dragTargetNode.entityType === "position"
      ) {
        context.dispatch(CHANGE_POSITION, {
          position: dragTargetNode,
          isDelete: false,
          parent: dragEnteredNode,
        });
        deletePositionParentByPositionId(
          context.state.tree,
          dragTargetNode.key
        );
        context.state.tree.children.push({ ...dragTargetNode });

        dragTargetNode = JSON.parse(JSON.stringify(dragTargetNode));
        dragTargetNode.key = Math.round(Math.random() * 545155);
      }

      //Привязка сотрудника к должности
      if (
        dragEnteredNode.entityType === "position" &&
        dragTargetNode.entityType === "user"
      ) {
        //Проверка на существующих сотрудников должности
        // если сотрудник уже есть вывести предупреждение
        if (!dragEnteredNode.roleId)
          return Vue.notify({
            group: "alert",
            text: "Добавьте роль к должности!",
            type: "danger",
          });
        if (dragEnteredNode.employees && dragEnteredNode.employees.length >= 1)
          return Vue.notify({
            group: "alert",
            text: "У должности может быть только 1 сотрудник",
            type: "danger",
          });
        const employeeNewForm: IEmployeeNew = {
          user: dragTargetNode.id,
          position: dragEnteredNode.id,
          ddepartmentIinId: context.getters.GET_GA_ID,
          recruitmentDate: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
          positionRemovalDate: null,
        };
        treeService.newEmployee(employeeNewForm).then((employee) => {
          setEmployeeToPosition(
            context.getters.tree,
            dragEnteredNode.key,
            employee.newEmployee,
            "current"
          );
        });
      }

      if (
        dragEnteredNode.entityType === "subdivision" &&
        dragTargetNode.entityType === "subdivision"
      ) {
        const subdivision: ISubdivisonChange = JSON.parse(
          JSON.stringify(dragTargetNode)
        );
        subdivision.department = dragEnteredNode.id;
        context
          .dispatch(CHANGE_SUBDIVISION, {
            subdivision,
            isDelete: false,
            parent: dragEnteredNode,
          })
          .then(() => {
            deleteNodeFromTree(context.state.tree, dragTargetNode.key);
            insertNodeIntoTree(
              context.state.tree,
              dragEnteredNode.key,
              dragTargetNode
            );
          });
      }

      if (
        dragEnteredNode.entityType === "position" &&
        dragTargetNode.entityType === "role"
      ) {
        if (dragEnteredNode.roleId)
          return Vue.notify({
            group: "alert",
            text: "У должности может быть только 1 роль",
            type: "danger",
          });

        const position = {
          ...dragEnteredNode,
          roleObject: dragTargetNode,
          roleId: dragTargetNode.id,
        };

        const parentSubdivision = getParentId(
          context.getters.tree,
          dragEnteredNode.key
        );
        if (parentSubdivision.children) {
          Vue.set(
            parentSubdivision,
            "children",
            parentSubdivision.children.map((child) =>
              child.id === position.id ? position : child
            )
          );
        } else {
          Vue.set(parentSubdivision, "children", [position]);
        }

        context.dispatch(CHANGE_POSITION, {
          position: position,
          isDelete: false,
          parent: parentSubdivision,
        });
      }
      // Привязка должности к отделу
      if (
        dragEnteredNode.entityType === "subdivision" &&
        dragTargetNode.entityType === "position"
      ) {
        context.dispatch(CHANGE_POSITION, {
          position: dragTargetNode,
          isDelete: false,
          parent: dragEnteredNode,
        });

        deletePositionParentByPositionId(
          context.state.tree,
          dragTargetNode.key
        );
        dragTargetNode = JSON.parse(JSON.stringify(dragTargetNode));
        dragTargetNode.key = Math.round(Math.random() * 545155);
        insertNodeIntoTree(
          context.state.tree,
          dragEnteredNode.key,
          dragTargetNode
        );
      }
    },
    [INSERT_NODE_TO_TREE](context, { selectedNode, newNode }) {
      insertNodeIntoTree(context.state.tree, selectedNode.key, newNode);
    },
    async [DELETE_NODE](context, selectedNode: ITree) {
      let mutationType: string;
      const form: any = {
        isDelete: true,
        parent: getParentId(context.getters.tree, selectedNode.key),
      };
      switch (selectedNode.entityType) {
        case "subdivision":
          form.subdivision = selectedNode;
          mutationType = CHANGE_SUBDIVISION;
          break;
        case "position":
          form.position = selectedNode;
          mutationType = CHANGE_POSITION;
          break;
      }
      context.dispatch(mutationType, form).then(() => {
        deleteNodeFromTree(context.state.tree, selectedNode.key);
      });
    },
    [SET_UNLOCK](context, unlock: boolean) {
      context.commit(SET_UNLOCK, unlock);
    },

    [SET_DRAG_TREE](context, tree: ITree | null) {
      context.commit(SET_DRAG_TREE, tree);
    },
    [INSERT_POSITION_TO_NODE](context, { selectedNode, position }) {
      if (position.entityType === "employee") {
        selectedNode.children.push(position);
      }
      if (position.entityType === "employee") {
        context.dispatch(DELETE_EMPLOYEE, position);
      } else {
        context.dispatch(DELETE_ROLE, position);
      }
    },
    [DELETE_EMPLOYEE](context, { selectedNode, positionChild }) {
      const {
        employeesTableid,
        user,
        positionId,
        governmentAgency,
        recruitmentDate,
        positionRemovalDate,
        key,
        id,
      } = positionChild;
      selectedNode.employees = selectedNode.employees.filter(
        (position) => position.key !== key
      ); //Long //Long, user id //Long, position id //Long, government agency id //Date, pattern = "yyyy-MM-dd'T'HH:mm:ss" //Date, pattern = "yyyy-MM-dd'T'HH:mm:ss" //Long, status id
      treeService.homeService.changeEmployee({
        id,
        employeesTableid,
        user: user.id,
        position: positionId,
        governmentAgency,
        recruitmentDate: moment(recruitmentDate).format(
          "YYYY-MM-DD[T]HH:mm:ss"
        ),
        positionRemovalDate: positionRemovalDate
          ? moment(positionRemovalDate).format("YYYY-MM-DD[T]HH:mm:ss")
          : null,
        status: 322,
        ddepartmentIinId: context.getters.GET_GA_ID,
        departmentId: getParentId(context.getters.tree, selectedNode.key).id,
      });
    },
    ["DELETE_DRAG_TREE"](ctx) {
      ctx.commit("DELETE_DRAG_TREE");
    },
    [DELETE_POSITION_FROM_NODE](ctx, positionId: number) {
      const treeCopy = JSON.parse(JSON.stringify(ctx.state.tree));
      deletePositionById(treeCopy, positionId);
      ctx.commit(SET_TREE_SAFE, treeCopy);
    },
    async [ADD_SUBDIVISION](ctx, subdivision) {
      const subdivisionForm = { ...subdivision };
      if (
        ctx.state.plusSelectedNode &&
        ctx.state.plusSelectedNode.entityType === "subdivision"
      ) {
        subdivisionForm.department = +ctx.state.plusSelectedNode.id;
        delete subdivisionForm.governmentAgencyId;
      } else {
        delete subdivisionForm.department;
        subdivisionForm.governmentAgencyId = +ctx.getters.GET_GA_ID;
      }
      subdivisionForm.bin = ctx.getters.GET_SELECTED_GA.id;
      return await treeService.homeService
        .postNewSudivision(subdivisionForm)
        .then((id) => {
          subdivision.id = id;
          subdivision.children = [];
          subdivision.key = Math.round(Math.random() * 566565);
          subdivision.entityType = "subdivision";
          if (ctx.state.plusSelectedNode) {
            getNodeById(
              ctx.state.tree,
              ctx.state.plusSelectedNode.key
            ).children.push(subdivision);
          } else {
            getNodeById(ctx.state.tree, ctx.state.tree.key).children.push(
              subdivision
            );
          }

          ctx.state.isUpdated = true;
        });
    },
    [DELETE_ROLE_FROM_TREE](ctx, selectedNode) {
      selectedNode.roleId = null;
      ctx.dispatch(CHANGE_POSITION, {
        position: selectedNode,
        isDelete: false,
        parent: getParentId(ctx.getters.tree, selectedNode.key),
      });
    },
    async [ADD_EMPLOYEE](ctx, { userId, positionId }) {
      const employeeNewForm: IEmployeeNew = {
        user: userId,
        position: positionId,
        ddepartmentIinId: ctx.getters.GET_GA_ID,
        recruitmentDate: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
        positionRemovalDate: null,
      };
      await treeService.newEmployee(employeeNewForm);
    },
    async [CHANGE_SUBDIVISION](ctx, { subdivision, isDelete, parent }) {
      const {
        nameRu,
        nameRus,
        nameKz,
        nameKaz,
        nameEng,
        nameRuShort,
        nameRusShort,
        nameKzShort,
        nameKazShort,
        nameEngShort,
      } = subdivision;
      const subdivisionChange: ISubdivisonChange = {
        id: +subdivision.id,
        bin: ctx.getters.GET_GA_ID,
        nameEng,
        nameEngShort,
        nameRus: nameRu || nameRus,
        nameKaz: nameKz || nameKaz,
        nameRusShort: nameRuShort || nameRusShort,
        nameKazShort: nameKzShort || nameKazShort,
        status: isDelete ? 322 : 315,
      };
      if (parent.entityType === "subdivision") {
        subdivisionChange.department = +parent.id;
      }
      await treeService.changeSubdivision(subdivisionChange);
    },
    async [CHANGE_POSITION](ctx, { position, isDelete, parent }) {
      const {
        nameRu,
        nameKz,
        nameEng,
        nameRuShort,
        nameKzShort,
        nameEngShort,
        id,
        roleId,
      } = position;
      const positionChange: IPositionChange = {
        nameRu,
        nameKz,
        nameRuShort,
        nameKzShort,
        nameEng,
        nameEngShort,
        status: isDelete ? 322 : 315,
        id,
        ddepartmentIinId: ctx.getters.GET_GA_ID,
      };
      if (roleId || roleId === null) {
        positionChange.role = roleId;
      }
      if (parent.entityType === "subdivision") {
        positionChange.departmentId = +parent.id;
      } else if (parent.entityType === "govermentAgency") {
        positionChange.governmentAgencyId = parent.id;
      }
      return await treeService.changePosition(positionChange);
    },
    async [RELOAD_TREE](ctx) {
      await ctx.dispatch(SET_TREE, ctx.getters.tree.id);
    },
    async [SET_EMPLOYEE_REPLACEMENT](ctx, newEmployeeForm) {
      await treeService.homeService.postNewEmployeeReplacement(newEmployeeForm);
      const employeeReplacement: any = { ...newEmployeeForm };
      employeeReplacement.substituteUserObject = ctx.getters.users.filter(
        (user) => user.id === newEmployeeForm.substituteUser
      )[0];
      setEmployeeToPosition(
        ctx.state.tree,
        ctx.state.tempPosition.key,
        employeeReplacement,
        "temp"
      );
      console.log(ctx.state.tree);
    },
    [SET_TEMP_POSITION](context, position: IPosition | null) {
      context.commit(SET_TEMP_POSITION, position);
    },
  },
  getters: {
    GET_UNLOCK(state) {
      return state.unlock;
    },
    GET_DEPTH(state) {
      return state.tree ? getTreeDetpth(state.tree) : 0;
    },
    GET_DRAG_TREE(state) {
      return state.dragTargetNode;
    },
    GET_NODE_BY_ID: (state) => (key) => {
      return getNodeById(state.tree, key);
    },
    GET_PLUS_SELECTED_NODE(state) {
      return state.plusSelectedNode;
    },
    GET_DIFFERENCE_BTW_TREE(state): boolean {
      const currentTree = JSON.parse(JSON.stringify(state.tree));
      return (
        JSON.stringify(state.oldTree) ===
        JSON.stringify(JSON.parse(JSON.stringify(currentTree)))
      );
    },
    GET_IS_UPDATED(state) {
      return state.isUpdated;
    },
    tree(state) {
      return state.tree;
    },
    tempPosition(state) {
      return state.tempPosition;
    },
    isEditableTree(state, getters, rootState, rootGetters): boolean {
      return (
        (rootGetters.GET_USER_TYPE === "dispatcher" &&
          rootGetters.gaState === 315) ||
        rootGetters.gaState === 318
      );
    },
  },
};
