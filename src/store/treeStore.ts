import { treeService } from "@/services/treeService";
import { Module } from "vuex";
import { tree } from "./dump";
import Vue from "vue";
import {
  IEmployeeReq,
  IPosition,
  IStateTreeStore,
  ISubdivisonReq,
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
} from "./mutation-types";

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

function traverse(tree: ITree | any) {
  if (!(tree.subdivisions || tree.positions || tree.employees)) {
    return;
  }

  tree.key = Math.round(Math.random() * 4451454121454);
  if (tree.entityType === "position") {
    tree.employeeReplacement = tree.employeeReplacement
      ? tree.employeeReplacement
      : null;
    return;
  }
  const children = JSON.parse(
    JSON.stringify(
      tree.subdivisions
        ? tree.subdivisions
        : tree.positions
        ? tree.positions
        : tree.employees
    )
  );
  if (tree.subdivisions) {
    delete tree.subdivisions;
  } else if (tree.employees) {
    delete tree.employees;
  }
  tree.hidden = false;
  tree.children = children;
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

function isChildOfNode(_node: ITree, childKey: number): boolean {
  let res: boolean = false;
  function _isChildOfNode(node) {
    if (node.key === childKey) {
      res = true;
      return;
    }
    if (node.children) {
      node.children.map((child) => _isChildOfNode(child));
    } else {
      _isChildOfNode(node.children);
    }
  }
  _isChildOfNode(_node);
  return res;
}

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
      _getParentId(tree.children);
    }
  }
  _getParentId(_tree);
  return parentId;
}

function setTempEmployeeToPosition(
  tree,
  selectedPositionKey: number | string,
  tempEmployee: IEmployeeReq
) {
  if (tree.key === selectedPositionKey) {
    tree.employeeReplacement = tempEmployee;
    return;
  } else if (tree.children) {
    tree.children.forEach((node) =>
      setTempEmployeeToPosition(node, selectedPositionKey, tempEmployee)
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
  },
  mutations: {
    [SET_TREE](state, tree1: ITree | null): void {
      state.oldTree = JSON.parse(JSON.stringify(tree));
      if (tree1 === null) return (state.tree = null);

      const _tree = JSON.parse(JSON.stringify(tree));
      traverse(_tree);
      state.tree = _tree;
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
  },
  actions: {
    async [SET_TREE](context, treeId): Promise<any> {
      if (treeId === null) return context.commit(SET_TREE, null);

      context.commit(SET_TREE, tree);

      // await treeService.homeService
      //   .getGovermentAgencyTree(treeId)
      //   .then((tree) => {
      //     context.commit(SET_TREE, tree);
      //   });
    },
    [UPDATE_TREE](context, { dragEnteredNode, dragTargetNode }) {
      if (
        !["position", "employee", "role"].includes(dragTargetNode.entityType)
      ) {
        // if (
        //   dragEnteredNode.key === dragTargetNode.key ||
        //   isChildOfNode(dragEnteredNode, dragTargetNode.key)
        // ) {
        //   return;
        // }
      }

      context.state.isUpdated = true;
      if (
        dragEnteredNode.entityType === "governmentAgency" &&
        dragTargetNode.entityType === "subdivision"
      ) {
        deleteNodeFromTree(context.state.tree, dragTargetNode.key);

        const subdivisionReq: ISubdivisonReq = {
          subdivisionsTableid: dragTargetNode.subdivisionsTableid,
          governmentAgencyId: dragTargetNode.governmentAgencyId,
          nameEng: dragTargetNode.nameEng,
          nameEngShort: dragTargetNode.nameEngShort,
          nameKz: dragTargetNode.nameKz,
          nameKzShort: dragTargetNode.nameKzShort,
          nameRu: dragTargetNode.nameRu,
          nameRuShort: dragTargetNode.nameRuShort,
          status: 1,
          superiorSubdivisionId: null,
        };
        treeService.changeSubdivision(subdivisionReq);
        return context.state.tree.children.push(dragTargetNode);
      }
      if (
        dragEnteredNode.entityType === "governmentAgency" &&
        dragTargetNode.entityType === "position"
      ) {
        const {
          positionsTableid,
          governmentAgency,
          nameRu,
          nameEng,
          nameKz,
          nameKzShort,
          nameRuShort,
          nameEngShort,
          roleId,
          status,
        } = dragTargetNode;
        treeService.changePosition({
          positionsTableid,
          governmentAgency,
          nameRu,
          nameEng,
          nameKz,
          nameKzShort,
          nameRuShort,
          nameEngShort,
          subdivisions: null,
          role: roleId,
          status: status.id,
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
        dragTargetNode.entityType === "employee"
      ) {
        //Проверка на существующих сотрудников должности
        // если сотрудник уже есть вывести предупреждение
        if (!dragEnteredNode.roleId)
          return Vue.notify({
            group: "alert",
            text: "Добавьте роль к должности!",
            type: "danger",
          });
        if (dragEnteredNode.employees.length >= 1)
          return Vue.notify({
            group: "alert",
            text: "У должности может быть только 1 сотрудник",
            type: "danger",
          });

        const {
          employeesTableid,
          user,
          positionId,
          governmentAgency,
          recruitmentDate,
          positionRemovalDate,
          status,
        } = dragTargetNode;
        treeService.homeService.changeEmployee({
          employeesTableid,
          user: user.id,
          positions: positionId,
          governmentAgency,
          recruitmentDate,
          positionRemovalDate,
          status: status.id,
        });
        dragEnteredNode.employees.push(
          context.getters.GET_EMPLOYEE_BY_ID(dragTargetNode.key)
        );
        return context.dispatch(
          DELETE_EMPLOYEE,
          context.getters.GET_EMPLOYEE_BY_ID(dragTargetNode.key)
        );
      }

      if (
        dragEnteredNode.entityType === "subdivision" &&
        dragTargetNode.entityType === "subdivision"
      ) {
        const subdivisionReq: ISubdivisonReq = {
          subdivisionsTableid: dragTargetNode.subdivisionsTableid,
          governmentAgencyId: dragTargetNode.governmentAgencyId,
          nameEng: dragTargetNode.nameEng,
          nameEngShort: dragTargetNode.nameEngShort,
          nameKz: dragTargetNode.nameKz,
          nameKzShort: dragTargetNode.nameKzShort,
          nameRu: dragTargetNode.nameRu,
          nameRuShort: dragTargetNode.nameRuShort,
          superiorSubdivisionId: dragEnteredNode.subdivisionsTableid,
          status: 1,
        };
        treeService.changeSubdivision(subdivisionReq);

        deleteNodeFromTree(context.state.tree, dragTargetNode.key);
        return insertNodeIntoTree(
          context.state.tree,
          dragEnteredNode.key,
          dragTargetNode
        );
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

        const {
          positionsTableid,
          governmentAgency,
          nameRu,
          nameEng,
          nameKz,
          nameKzShort,
          nameRuShort,
          nameEngShort,
          subdivisionId,
          status,
        } = dragEnteredNode;
        treeService.changePosition({
          positionsTableid,
          governmentAgency,
          nameRu,
          nameEng,
          nameKz,
          nameKzShort,
          nameRuShort,
          nameEngShort,
          subdivisions: subdivisionId,
          role: dragTargetNode.roleId,
          status: status.id,
        });
        return (dragEnteredNode.roleId = dragTargetNode.roleId);
      }
      // Привязка должности к отделу
      if (
        dragEnteredNode.entityType === "subdivision" &&
        dragTargetNode.entityType === "position"
      ) {
        //         positionsTableid //Long
        //  governmentAgency //Long, government agency id
        //  nameRu //String
        //  nameKz //String
        //  nameEng //String
        //  nameRuShort //String
        //  nameKzShort //String
        //  nameEngShort //String
        //  subdivisions //Long, subdivision id
        //  role //Long, role id
        //  status //Long, status id
        const {
          positionsTableid,
          governmentAgency,
          nameRu,
          nameEng,
          nameKz,
          nameKzShort,
          nameRuShort,
          nameEngShort,
          subdivisionId,
          roleId,
          status,
        } = dragTargetNode;
        treeService.changePosition({
          positionsTableid,
          governmentAgency,
          nameRu,
          nameEng,
          nameKz,
          nameKzShort,
          nameRuShort,
          nameEngShort,
          subdivisions: subdivisionId,
          role: roleId,
          status: status.id,
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
    [DELETE_NODE](context, { selectedNode, parentId }) {
      if (selectedNode.entityType === "subdivision") {
        context.dispatch(CHANGE_SUBDIVISION, {
          subdivision: selectedNode,
          isDelete: true,
          parentId,
        });
      }
      deleteNodeFromTree(context.state.tree, selectedNode.key);
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
        status,
        key,
      } = positionChild;
      selectedNode.employees = selectedNode.employees.filter(
        (position) => position.key !== key
      ); //Long //Long, user id //Long, position id //Long, government agency id //Date, pattern = "yyyy-MM-dd'T'HH:mm:ss" //Date, pattern = "yyyy-MM-dd'T'HH:mm:ss" //Long, status id
      treeService.homeService.changeEmployee({
        employeesTableid,
        user: user.id,
        positions: positionId,
        governmentAgency,
        recruitmentDate,
        positionRemovalDate,
        status: 8,
      });
    },
    ["DELETE_DRAG_TREE"](ctx) {
      ctx.commit("DELETE_DRAG_TREE");
    },
    [ADD_SUBDIVISION](ctx, subdivision) {
      ctx.state.isUpdated = true;
      const subdivisionForm = { ...subdivision };
      if (ctx.state.plusSelectedNode.entityType === "governmentAgency") {
        subdivisionForm.subdivisionUnderGovernmentAgency = false;
      }

      subdivisionForm.superiorSubdivisionId =
        ctx.state.plusSelectedNode.entityType === "subdividion"
          ? ctx.state.plusSelectedNode.subdivisionsTableid
          : ctx.state.plusSelectedNode.governmentAgencyTableid;
      treeService.homeService.postNewSudivision(subdivisionForm);

      subdivision.children = [];
      subdivision.key = Math.round(Math.random() * 566565);
      subdivision.entityType = "subdivision";
      getNodeById(ctx.state.tree, ctx.state.plusSelectedNode.key).children.push(
        subdivision
      );
      // this.commit(SET_PLUS_SELECTED_NODE, null);
    },
    [DELETE_ROLE_FROM_TREE](ctx, selectedNode) {
      selectedNode.roleId = null;
    },
    [CHANGE_SUBDIVISION](ctx, { subdivision, isDelete, parentId }) {
      const subdivisionReq = {
        id: subdivision.subdivisionsTableid,
        governmentAgencyId: subdivision.governmentAgencyId,
        nameEng: subdivision.nameEng,
        nameEngShort: subdivision.nameEngShort,
        nameKz: subdivision.nameKz,
        nameKzShort: subdivision.nameKzShort,
        nameRu: subdivision.nameRu,
        nameRuShort: subdivision.nameRuShort,
        superiorSubdivisionId: parentId.subdivisionsTableid,
        status: isDelete ? 8 : 1,
      };
      treeService.changeSubdivision(subdivisionReq);
    },
    [RELOAD_TREE](ctx) {
      ctx.commit(
        SET_TREE,
        ctx.state.plusSelectedNode.entityType === "subdividion"
          ? ctx.state.plusSelectedNode.subdivisionsTableid
          : ctx.state.plusSelectedNode.governmentAgencyTableid
      );
    },
    async [SET_EMPLOYEE_REPLACEMENT](ctx, employee: IEmployeeReq) {
      setTempEmployeeToPosition(
        ctx.state.tree,
        ctx.state.tempPosition.key,
        employee
      );
      await treeService.homeService.postNewEmployeeReplacement(employee);
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
  },
};
