import { Module } from "vuex";
import { SET_TREE, UPDATE_TREE } from './mutation-types';


interface IState {
    tree: null | ITree
}

interface ITree {
    name: string | number,
    children?: Array<ITree>,
    _key?: string
}
const vehicules: ITree = {
  name: 'ГО 1',
  children: [
    {
      name: 'Департамент 1',
      children: [
        {
          name: 'Отдел 1',
          children: []
        },
        {
          name: 'Отдел 2',
          children: []
        }
      ]
    },
    {
      name: 'Департамент 2',
      children: [
        {
          name: 'Отдел 1',
          children: []
        },
        {
          name: 'Отдел 2',
          children: []
        }
      ]
    },
  ]
}
const vehicules1: ITree = {
  name: 'ГО 1',
  children: [
    {
      name: 'Департамент 1',
      children: [
        {
          name: 'Отдел 1',
          children: []
        },
        {
          name: 'Отдел 2',
          children: []
        }
      ]
    },
    {
      name: 'Департамент 2',
      children: [
        {
          name: 'Отдел 1',
          children: []
        },
        {
          name: 'Отдел 2',
          children: []
        }
      ]
    },
  ]
}
const vehicules2: ITree = {
  name: 'ГО 3',
  children: [
    {
      name: 'Департамент 1',
      children: [
        {
          name: 'Отдел 1',
          children: []
        },
        {
          name: 'Отдел 2',
          children: []
        }
      ]
    },
    {
      name: 'Департамент 2',
      children: [
        {
          name: 'Отдел 1',
          children: []
        },
        {
          name: 'Отдел 2',
          children: []
        }
      ]
    },
  ]
}


  function insertNodeIntoTree(node, nodeId, newNode) {
    if (node.name == nodeId) {
        if (newNode) {
            node.children.push(newNode);
        }

    } else if (node.children != null) {
        for (let i = 0; i < node.children.length; i++) {
            insertNodeIntoTree(node.children[i], nodeId, newNode);
        }

    }
}

function deleteNodeFromTree(node, nodeName: string | number) {
  if (node.children != null) {
      for (let i = 0; i < node.children.length; i++) {
          let filtered = node.children.filter(f => f.name == nodeName);
          if (filtered.length !== 0) {
              node.children = node.children.filter(f => f.name != nodeName);
              return;
          }
          deleteNodeFromTree(node.children[i], nodeName);
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
      [SET_TREE](context, id): Promise<any> {
        return new Promise((res, rej) => {
            setTimeout(() => {
              alert(1)
              switch(id){
                case 0:
                  context.commit(SET_TREE, vehicules)                    
                  break
                case 1:
                  context.commit(SET_TREE, vehicules1)
                  break
                case 2:
                  context.commit(SET_TREE, vehicules2)
                  break
              }
              res(vehicules)
            }, 0)
        })
    },
        [UPDATE_TREE](context, {dragEnteredNode, dragTargetNode}) {
          insertNodeIntoTree(vehicules, dragEnteredNode.name, dragTargetNode)
          // deleteNodeFromTree(vehicules, dragTargetNode.name)
        }

    }
}