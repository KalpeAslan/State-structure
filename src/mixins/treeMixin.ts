import { ITree } from './../store/interfaces';
import { SET_DRAG_TREE, INSERT_POSITION_TO_NODE } from './../store/mutation-types';
import { DELETE_NODE, INSERT_NODE_TO_TREE, UPDATE_TREE } from '@/store/mutation-types';
import Vue from 'vue'

export default Vue.extend({
    data() {
        return  {
          dragEnteredNode:  null
        }
    },
    methods: {
        insertToNode(selectedNode: ITree, newNode = {}) {
          const randomId = Math.round(Math.random() * 45450)
            newNode = {
              children: [],
              name: "TestNode1",
              id: randomId,
              _key: randomId,
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
          dragEnd($event, node) {
            if (this.dragEnteredNode.id !== this.getDragTree) {
              this.$store.dispatch(UPDATE_TREE, {
                dragEnteredNode: this.dragEnteredNode,
                dragTargetNode: node,
              });
              this.$store.dispatch(SET_DRAG_TREE, null)
            }
          },
          dragStart($event: DragEvent, node){
            $event.dataTransfer.setData('nodeId', node.id)
          },
          onDrop($event: DragEvent, node: ITree){
            let type = ''
            if($event.dataTransfer.getData('employeeId')){
              this.$store.dispatch(INSERT_POSITION_TO_NODE, {
                selectedNode: node,
                position: this.$store.getters.GET_EMPLOYEE_BY_ID(+$event.dataTransfer.getData('employeeId'))
              })
            } else if($event.dataTransfer.getData('nodeId')){
              this.$store.dispatch(UPDATE_TREE, {
                dragEnteredNode: node,
                dragTargetNode: this.$store.getters.GET_NODE_BY_ID($event.dataTransfer.getData('nodeId'))
              })
            } else if($event.dataTransfer.getData('roleId')){
              this.$store.dispatch(INSERT_POSITION_TO_NODE, {
                selectedNode: node,
                position: this.$store.getters.GET_ROLE_BY_ID(+$event.dataTransfer.getData('roleId'))
              })
            }
            
          }
    },
    computed:{
      getDragTree(){
        return this.$store.getters.GET_DRAG_TREE
      }
    }
})