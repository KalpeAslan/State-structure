import { Module } from "vuex";
import { IEmployee, IPosition, IRole, IStateTreeStore, ITree } from "./interfaces";
import { SET_TREE, UPDATE_TREE, INSERT_NODE_TO_TREE, DELETE_NODE, SET_UNLOCK, DELETE_POSITION_FROM_NODE, SET_DRAG_TREE, INSERT_POSITION_TO_NODE } from './mutation-types';


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
                      title: ''
                    },
                    {
                      name: 'Сотрудник 2',
                      id: 1548487,
                      title: ''
                    }
                  ],
                  positionRole: {
                    name: 'Role 1',
                    id: 877878,
                    title:'3e'
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

function insertPositionItem(node: ITree, nodeId: string | number, positionItem){
  console.log(node)
  if (node.id == nodeId) {
    console.log('WORK')
    node.children.forEach(nodeChild => {
      nodeChild.positionChildren.push(positionItem)
    })
  } else if (node.children != null) {
      for (let i = 0; i < node.children.length; i++) {
          insertNodeIntoTree(node.children[i], nodeId, positionItem);
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
                  return false
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
              node.children = node.children.map(f => {
                if(f.id === nodeId){
                  f.positionChildren = f.positionChildren.filter(positionChild => {
                    return positionChild.id !== positionId
                  })
                }
                return f
              });
              return;
          }
          deletePositionFromNode(node.children[i], nodeId, positionId);
      }
  }

}

function getTreeDetpth(node: ITree): number{
  return 1 + (node.children ? Math.max(...node.children.map(getTreeDetpth)) : 0)
}

function getNodeById(node: ITree, id){
  const reduce = [].reduce;
  function runner(result, node){
      if(result || !node) return result;
      return node.id == id && node ||
          runner(null, node.children) ||
          reduce.call(Object(node), runner, result); 
  }
  return runner(null, node);
}

export const treeStore: Module<IStateTreeStore, any> =  {
    state: {
        tree: null,
        unlock: false,
        dragTargetNode: null
    },
    mutations: {
        [SET_TREE](state, tree: ITree): void {
            state.tree = tree
        },
        [SET_UNLOCK](state, unlock: boolean){
          state.unlock = unlock
        },
        [SET_DRAG_TREE](state, tree){
          state.dragTargetNode = tree
        },
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
          console.log(dragTargetNode.name)
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
        
        [SET_DRAG_TREE](context, tree: ITree | null){
          context.commit(SET_DRAG_TREE, tree)
        },
        [INSERT_POSITION_TO_NODE](context, {selectedNode, position}){
          console.log(selectedNode.name)
          console.log(selectedNode.id)
          insertPositionItem(context.state.tree, selectedNode.id, position)
        },
        [DELETE_POSITION_FROM_NODE](context, {selectedNode, positionChild}){
          deletePositionFromNode(context.state.tree, selectedNode.id, positionChild.id)
        },
    },
    getters: {
      GET_UNLOCK(state){
        return state.unlock
      },
      GET_DEPTH(state){
        return state.tree ? getTreeDetpth(state.tree) : 0
      },
      GET_DRAG_TREE(state){
        return state.dragTargetNode
      },
      GET_NODE_BY_ID: (state) => (id) => {
        return getNodeById(state.tree, id)
      }
    }
}