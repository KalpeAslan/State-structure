import { Module } from "vuex";
import { IPosition } from "./homeStore";
import { SET_TREE, UPDATE_TREE, INSERT_NODE_TO_TREE, DELETE_NODE, SET_UNLOCK, DELETE_POSITION_CHILD } from './mutation-types';


interface IState {
    tree: null | ITree,
    unlock: boolean
}

export interface ITree {
    name: string | number,
    children?: Array<ITree>,
    _key?: string,
    id: string | number,
    type?: string,
    positionChildren?: IPosition[],
    positionRole?: IRole
}

interface IRole {
  name: string,
  id: number | string
}

const vehicules: ITree = 
    {
      id: 54545,
      name: "Название ГО :",
      children: [
        {
          id: 4848,
          name: "Департамент 1 :",
          children: [
            {
              id: 3534657,
              name: "Отдел 1 :",
              type: 'division',
              children: []
            },
            {
              id: 564811,
              name: "Отдел 2 :",
              type: 'division',
              children: [
                {
                  id: 5454112,
                  type: 'position',
                  name: "Должность 1",
                  positionChildren:  [
                    {
                      name: 'Сотрудник 1',
                      id: 44778487,
                    },
                    {
                      name: 'Сотрудник 2',
                      id: 1548487,
                    }
                  ],
                  positionRole: {
                    name: 'Role 1',
                    id: 877878
                  }
                },
                {
                  id: 2151,
                  type: 'position',
                  name: "Должность 2",
                },
              ],
            },
          ],
        },
        {
          name: 'Departament 2',
          children: [],
          id: 545454,
        }
      ],
    }
const vehicules1: ITree = {
  "name": 'Test 1',
  id: 54545,
  "children": [
    {
      "name": 1,
      id: 44584545,
      "children": [
        {
          "name": 2,
          id: 546515145,
          "children": [
            {
              "name": 3,
               id: 2581022,
              "children": [
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'NewNode',
      id: 7775,
      children: [
        {
          id: 21423534,
          name: 'newNode1',
          type: 'division',
          children: []
        },
        {
          name: 'newNode2',
          type: 'division',
          id: 120224,
          children: []
        }
      ]
    }
  ]
}

const vehicules2: ITree = {
  "name": 0,
  id: 54545,
  "children": [
    {
      "name": 1,
      id: 44584545,
      "children": [
        {
          "name": 2,
          id: 546515145,
          "children": [
          ]
        }
      ]
    },
    {
      name: 'NewNode',
      id: 7775,
      children: [
        {
          id: 21423534,
          name: 'newNode1',
          children: []
        },
        {
          name: 'newNode2',
          id: 120224,
          children: []
        }
      ]
    }
  ]
}

  function insertNodeIntoTree(node, nodeId: string | number, newNode: ITree) {
    if (node.id == nodeId) {
      newNode._key = node.id
      if(!node.children){
        node.children = []
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
          let filtered = node.children.filter(f => f.id == nodeId);
          if (filtered.length !== 0) {
              node.children = node.children.filter(f => {
                if(f.id === nodeId){
                  return !!f._key
                }
                return true
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
          let filtered = node.children.filter(f => f.id == nodeId);
          if (filtered.length !== 0) {
              node.children = node.children.filter(f => {
                if(f.id === nodeId){
                  f.positionChildren = f.positionChildren.filter(positionChild => {
                    console.log(positionChild.id !== positionId)
                    return positionChild.id !== positionId
                  })
                }
                return true
              });
              return;
          }
          deletePositionFromNode(node.children[i], nodeId, positionId);
      }
  }

}


  
export const treeStore: Module<IState, any> =  {
    state: {
        tree: null,
        unlock: false
    },
    mutations: {
        [SET_TREE](state, tree: ITree): void {
            state.tree = tree
        },
        [SET_UNLOCK](state, unlock: boolean){
          state.unlock = unlock
        }
    },
    actions: {
        [SET_TREE](context, treeId): Promise<any> {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    let tree
                    switch(treeId) {
                      case 0:
                        tree = vehicules
                        break
                      case 1:
                        tree = vehicules1
                        break
                      case 2:
                        tree = vehicules2
                        break
                    }
                    context.commit(SET_TREE, tree)
                    res(tree)
                }, 0)
            })
        },
        [UPDATE_TREE](context, {dragEnteredNode, dragTargetNode}) {
          insertNodeIntoTree(context.state.tree, dragEnteredNode.id, dragTargetNode)
          deleteNodeFromTree(context.state.tree, dragTargetNode.id)
        },
        [INSERT_NODE_TO_TREE](context, {selectedNode, newNode}){
          insertNodeIntoTree(context.state.tree, selectedNode.id, newNode)
        },
        [DELETE_NODE](context, selectedNode: ITree){
          deleteNodeFromTree(context.state.tree, selectedNode.id)
        },
        [SET_UNLOCK](context, unlock: boolean){
          context.commit(SET_UNLOCK, unlock)
        },
        [DELETE_POSITION_CHILD](context, {selectedNode, positionChild}){
          console.log(positionChild)
          console.log(selectedNode)
          deletePositionFromNode(context.state.tree, selectedNode.id, positionChild.id)
        }
    },
    getters: {
      GET_UNLOCK(state){
        return state.unlock
      }
    }
}