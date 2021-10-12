import { DELETE_NODE, INSERT_NODE_TO_TREE, UPDATE_TREE } from '@/store/mutation-types';
import Vue from 'vue'
import {ITree} from '../store/treeStore'

export default Vue.extend({
    data() {
        return  {
          dragEnteredNode:  null
        }
    },
    methods: {
        insertToNode(selectedNode: ITree, newNode = {}) {
            newNode = {
              children: [],
              name: "TestNode1",
              id: this.getRandomId,
              _key: this.getRandomId,
            };
            this.$store.dispatch(INSERT_NODE_TO_TREE, {
              selectedNode,
              newNode,
            });
          },
          deleteNode(selectedNode: ITree){
              this.$store.dispatch(DELETE_NODE, selectedNode)
          },
          dragEnter(node) {
            if(node){
              this.dragEnteredNode = node
            }
          },
          dragEnd(node) {
            if (this.dragEnteredNode.id !== node.id) {
              this.$store.dispatch(UPDATE_TREE, {
                dragEnteredNode: this.dragEnteredNode,
                dragTargetNode: node,
              });
            }
          },
    }
})