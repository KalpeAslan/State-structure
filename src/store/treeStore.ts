import { treeService } from "@/services/treeService";
import { Module } from "vuex";
import { tree, tree1, tree2 } from "./dump";
import {
  IEmployee,
  IPosition,
  IRole,
  IStateTreeStore,
  ITree,
} from "./interfaces";
import {
  SET_TREE,
  UPDATE_TREE,
  INSERT_NODE_TO_TREE,
  DELETE_NODE,
  SET_UNLOCK,
  DELETE_POSITION_FROM_NODE,
  SET_DRAG_TREE,
  INSERT_POSITION_TO_NODE,
  DELETE_EMPLOYEE,
  DELETE_ROLE,
  SET_PLUS_SELECTED_NODE,
  ADD_SUBDIVISION,
} from "./mutation-types";

function insertNodeIntoTree(node, nodeId: string | number, newNode: ITree) {
  if (node.id == nodeId) {
    newNode._key = node.id;
    if (!node.children) {
      node.children = [];
    }
    node.children.push(newNode);
  } else if (node.children != null) {
    for (let i = 0; i < node.children.length; i++) {
      insertNodeIntoTree(node.children[i], nodeId, newNode);
    }
  }
}

function deleteNodeFromTree(node, nodeId) {
  if (node.children != null) {
    for (let i = 0; i < node.children.length; i++) {
      let filtered = node.children.filter((f) => f.id == nodeId);
      if (filtered.length !== 0) {
        node.children = node.children.filter((f) => {
          if (f.id === nodeId) {
            return false;
          }
          return true;
        });
        return;
      }
      deleteNodeFromTree(node.children[i], nodeId);
    }
  }
}

function deletePositionFromNode(node, nodeId, positionId) {
  if (node.children != null) {
    for (let i = 0; i < node.children.length; i++) {
      let filtered = node.children.filter((f) => f.id == nodeId);
      if (filtered.length !== 0) {
        node.children = node.children.map((f) => {
          if (f.id === nodeId) {
            f.positionChildren = f.positionChildren.filter((positionChild) => {
              return positionChild.id !== positionId;
            });
          }
          return f;
        });
        return;
      }
      deletePositionFromNode(node.children[i], nodeId, positionId);
    }
  }
}

function getTreeDetpth(node: ITree): number {
  return (
    1 + (node.children ? Math.max(...node.children.map(getTreeDetpth)) : 0)
  );
}

function getNodeById(node: ITree, id): ITree {
  const reduce = [].reduce;
  function runner(result, node) {
    if (result || !node) return result;
    return (
      (node.id == id && node) ||
      runner(null, node.children) ||
      reduce.call(Object(node), runner, result)
    );
  }
  return runner(null, node);
}

function insertPositionItem(
  node: ITree,
  nodeId: string | number,
  positionItem
) {
  if (node.children != null) {
    for (let i = 0; i < node.children.length; i++) {
      if (node.children.length !== 0) {
        node.children.map((f) => {
          if (f.id === nodeId) {
            f.positions = f.positions ? f.positions : [];
            f.positions.push(positionItem);
          } else {
            insertPositionItem(f, nodeId, positionItem);
          }
          return f;
        });
        return;
      }
      insertPositionItem(node.children[i], nodeId, positionItem);
    }
  }
}

function traverse(tree: ITree | any) {
  if (!(tree.subdivisions || tree.positions || tree.employees)) {
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
  } else if (tree.positions) {
    delete tree.positions;
  } else if (tree.employees) {
    delete tree.employees;
  }
  tree.children = children;
  tree.id = Math.round(Math.random() * 4451454121454);
  if (children.length) {
    children.map((child) => traverse(child));
  } else {
    traverse(tree.children);
  }
}

export const treeStore: Module<IStateTreeStore, any> = {
  state: {
    tree: null,
    unlock: false,
    dragTargetNode: null,
    plusSelectedNode: null,
  },
  mutations: {
    [SET_TREE](state, tree: ITree): void {
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
  },
  actions: {
    [SET_TREE](context, treeId): Promise<any> {
      return new Promise((res, rej) => {
        setTimeout(() => {
          let _tree;
          switch (treeId) {
            case 0:
              _tree = tree1;
              break;
            case 1:
              _tree = tree1;
              break;
            case 2:
              _tree = tree2;
              break;
          }
          context.commit(SET_TREE, _tree);
          res(_tree);
        }, 0);
      });
    },
    [UPDATE_TREE](context, { dragEnteredNode, dragTargetNode }) {
      if (
        dragEnteredNode.entityType === "governmentAgency" &&
        dragTargetNode.entityType === "subdivision"
      ) {
        context.state.tree.children.push(dragTargetNode);
        treeService.connectSubdivisionWithGovermentAgency(
          dragTargetNode.id,
          dragEnteredNode.id
        );
        return deleteNodeFromTree(context.state.tree, dragTargetNode.id);
      }

      if (
        dragEnteredNode.entityType === "governmentAgency" &&
        dragTargetNode.entityType === "position"
      ) {
        treeService.connectPositionWithGovermentAgency(
          dragTargetNode.id,
          dragEnteredNode.id
        );
        context.state.tree.children.push(dragTargetNode);
      }

      //Привязка сотрудника к должности
      if (
        dragEnteredNode.entityType === "position" &&
        dragTargetNode.entityType === "employee"
      ) {
        treeService.connectEmployeeWithPosition(
          dragTargetNode.id,
          dragEnteredNode.id
        );
        dragEnteredNode.children.push(
          context.getters.GET_EMPLOYEE_BY_ID(dragTargetNode.id)
        );
        return context.dispatch(
          DELETE_EMPLOYEE,
          context.getters.GET_EMPLOYEE_BY_ID(dragTargetNode.id)
        );
      }

      if (
        dragEnteredNode.entityType === "subdivision" &&
        dragTargetNode.entityType === "subdivision"
      ) {
        treeService.connectSubdivisionWithSuperiorSubdivision(
          dragTargetNode.id,
          dragEnteredNode.id
        );
        insertNodeIntoTree(
          context.state.tree,
          dragEnteredNode.id,
          dragTargetNode
        );
        return deleteNodeFromTree(context.state.tree, dragTargetNode.id);
      }

      if (
        dragEnteredNode.entityType === "position" &&
        dragTargetNode.entityType === "role"
      ) {
        return context.dispatch(INSERT_POSITION_TO_NODE, {
          selectedNode: dragEnteredNode,
          position: dragTargetNode,
        });
      }
      // Привязка должности к отделу
      if (
        dragEnteredNode.entityType === "subdivision" &&
        dragTargetNode.entityType === "position"
      ) {
        insertNodeIntoTree(
          context.state.tree,
          dragEnteredNode.id,
          dragTargetNode
        );
        dragEnteredNode.children.push(dragEnteredNode);
      }
    },
    [INSERT_NODE_TO_TREE](context, { selectedNode, newNode }) {
      insertNodeIntoTree(context.state.tree, selectedNode.id, newNode);
    },
    [DELETE_NODE](context, selectedNode: ITree) {
      deleteNodeFromTree(context.state.tree, selectedNode.id);
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
    [DELETE_POSITION_FROM_NODE](context, { selectedNode, positionChild }) {
      selectedNode.children = selectedNode.children.filter(
        (position) => position.id !== positionChild.id
      );
    },
    ["DELETE_DRAG_TREE"](ctx) {
      ctx.commit("DELETE_DRAG_TREE");
    },
    [ADD_SUBDIVISION](ctx, subdivision: ITree) {
      subdivision.children = [];
      subdivision.id = Math.round(Math.random() * 566565);
      subdivision.entityType = "subdivision";
      getNodeById(ctx.state.tree, ctx.state.plusSelectedNode.id).children.push(
        subdivision
      );
      // this.commit(SET_PLUS_SELECTED_NODE, null);
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
    GET_NODE_BY_ID: (state) => (id) => {
      return getNodeById(state.tree, id);
    },
  },
};
