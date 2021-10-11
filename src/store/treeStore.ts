import { Module } from "vuex";
import { SET_TREE, UPDATE_TREE, INSERT_NODE_TO_TREE } from './mutation-types';


interface IState {
    tree: null | ITree
}

interface ITree {
    name: string | number,
    children?: Array<ITree>,
    _key?: string,
    id: string | number
}
const vehicules: ITree = {
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
            {
              "name": 3,
               id: 2581022,

              "children": [
                {
                  "name": 4,
                  id: 5548878545,
                  "children": []
                },
                {
                  "name": 5,
                  id: 5153012,
                  "children": []
                }
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

  
export const treeStore: Module<IState, any> =  {
    state: {
        tree: null
    },
    mutations: {
        [SET_TREE](state, tree: ITree): void {
            state.tree = tree
        },
        
    },
    actions: {
        [SET_TREE](context, treeId): Promise<any> {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    let tree
                    console.log(treeId)
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
                    res(vehicules)
                }, 0)
            })
        },
        [UPDATE_TREE](context, {dragEnteredNode, dragTargetNode}) {
          insertNodeIntoTree(vehicules, dragEnteredNode.id, dragTargetNode)
          deleteNodeFromTree(vehicules, dragTargetNode.id)
        },
        [INSERT_NODE_TO_TREE](context, {selectedNode, newNode}){
          insertNodeIntoTree(vehicules, selectedNode.id, newNode)
          console.log(vehicules)
        }

    }
}