<template>
    <ul class="tree-ul">
      <li v-for='item in nodeData' v-show="item.visible" :class="[(item.children && item.children.length > 0) ? '':'leaf']">
        <i v-if="item.children && item.children.length > 0"
           @click.stop='handleNodeExpand(item)'
           :class="[item.open? 'tree-open':'tree-close','icon']">
        </i>
        <div class="inputCheck"
           :class="{notAllNodes:item.nodeSelectNotAll}"
           :style="{width:inputWidth+'px', height:inputWidth+'px'}"
           @click="walkCheckBox(item)" >
        <el-checkbox  class="check"
            v-if="options.showCheckbox && options.halfCheckedStatus  &&  !item.nodeSelectNotAll"
            v-model='item.checked'
           @change="handlecheckedChange(item)" />
        </div>
        <span
           @click="handleNode(item)"
          :class="{'node-selected':(item.checked && !options.showCheckbox) || item.searched }">
           {{item.label}}
        </span>

        <span v-if="item.rank==1" style="float: right;width:80px" :class="item.rank==1? 'r-1':(item.rank==2?'r-2':'r-3')">
          <span >

            <el-checkbox v-model="item.checked">只读</el-checkbox>
          </span>
        </span>

        <span v-else style="float: right;width:80px" :class="item.rank==1? 'r-1':(item.rank==2?'r-2':'r-3')">
          <span class="tree-none">--</span>
        </span>

        <tree-node v-if="item.children && item.children.length > 0"
          :options="options"
          @handlecheckedChange="handlecheckedChange"
          v-show='item.open'
          :tree-data="item.children">
        </tree-node>
      </li>
    </ul>
</template>

<script>
    // import ElCheckbox from "../../../node_modules/element-ui/packages/checkbox/src/checkbox";
export default {
    // components: {ElCheckbox},
    name: 'treeNode',
  props: {
    treeData: [Array],
    options: [Object]
  },
  data () {
    return {
      nodeData: []
    }
  },
  created () {
    const parent = this.$parent
    if (parent.isTree) {
      this.tree = parent
    } else {
      this.tree = parent.tree
    }

    const tree = this.tree
    if (!tree) {
      console.warn('找不到树节点')
    }
    this.nodeData = (this.treeData || []).slice(0)
  },
  computed:{
    inputWidth: function(){
      if(this.checkFirfox()){
        return 15
      }
      return 15
    }
  },
  watch: {
    treeData: function(data){
      this.nodeData = (data || []).slice(0)
    }
  },
  methods: {
    checkFirfox(){
      let u = navigator.userAgent
        if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1){
          return true
        }
        return false
    },
    walkCheckBox(node){
      if(node.nodeSelectNotAll){
        node.checked = !node.checked
        this.handlecheckedChange(node)
      }
    },
    handleNodeExpand (node) {
      node.open = !node.open
    },
    handlecheckedChange (node) {
      this.$emit('handlecheckedChange', node)
    },
    handleNode (node) {
      if (this.tree.store.last) {
        if (this.tree.store.last.id === node.id) {
          this.tree.store.last.checked = !this.tree.store.last.checked
        } else {
          this.tree.store.last.checked = false
          node.checked = true
          this.tree.store.last = node
        }
      } else {
        this.tree.store.last = node
        node.checked = true
      }
      this.tree.$emit('node-click', node)
    }
  }
}
</script>
<style >

  .tree-ul .el-checkbox__inner::after{
    width: 6px;
    height: 8px;
    left: 3px;
  }

  .tree-ul .el-checkbox__inner{
    width: 15px;
    height: 15px;
  }


  .tree-ul .r-1 .el-checkbox__label{
    margin-top:-2px;
  }

  .halo-tree li span{
    padding: 0px!important;
    top:-1px;
  }


  .checkbox-inner{
    /*background-color: #20a0ff;*/
    /*border-color: #0190fe;*/
  }

  .tree-none{
    width: 60px;
    float: left;
    margin-left: 20px; ;
  }

  .tree-ul{
    font-size: 15px;
  }

  .r-1{
    margin-right: 20px;
  }

  .r-2{
    margin-right: 15px;
  }

  .r-3{
    margin-right: 10px;
  }


  li:hover {
    cursor: pointer;
  }

  .icon{
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
   }
   
  .halo-tree {
    font-size: 14px;
    min-height: 20px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  
  .node-selected {
    background-color:#ddd
  }
  
  .halo-tree li {
    margin: 0;
    padding: 5px 5px 5px 0;
    position: relative;
    list-style: none;
  }
  
  .halo-tree li > span,
  .halo-tree li > i,
  .halo-tree li > a {
    line-height: 20px;
    vertical-align: middle;
  }
  
  .halo-tree ul ul li:hover {
    background: rgba(0, 0, 0, .035)
  }
  
  .halo-tree li:after,
  .halo-tree li:before {
    content: '';
    left: -8px;
    position: absolute;
    right: auto;
    border-width: 1px
  }
  
  .halo-tree li:before {
    border-left: 1px dashed #999;
    bottom: 50px;
    height: 100%;
    top: -8px;
    width: 1px;
  }
  
  .halo-tree li:after {
    border-top: 1px dashed #999;
    height: 20px;
    top: 17px;
    width: 12px
  }
  
  .halo-tree li span {
    display: inline-block;
    padding: 3px 3px;
    text-decoration: none;
    border-radius: 3px;
  }
  
  .halo-tree li:last-child::before {
    height: 26px
  }
  
  .halo-tree > ul {
    padding-left: 0
  }
  
  .halo-tree ul ul {
    padding-left: 15px;
    padding-top: 10px;
  }
  
  .halo-tree li.leaf {
    padding-left: 19px;
  }
  
  .halo-tree li.leaf:after {
    content: '';
    left: -8px;
    position: absolute;
    right: auto;
    border-width: 1px;
    border-top: 1px dashed #999;
    height: 20px;
    top: 17px;
    width: 24px;
  }
  
  .check {
    display: inline-block;
    position: relative;
    top: 4px;
  }
  
  .halo-tree .icon {
    margin-right: 0;
  }

  .tree-close{
  width:15px;
  height:15px;
  background-image: url("../../assets/tree/icon_open.png");
}

.tree-open{
  width:15px;
  height:15px;
  background-image: url("../../assets/tree/icon_close.png");
}
.search{
  width:14px;
  height:14px;
  background-image: url("../../assets/tree/icon_open.png");
}
/*.check.notAllNodes{
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  width: 13px;
}*/
.inputCheck{
  display: inline-block;
  position: relative;
}
.inputCheck .notAllNodes:before{
  content: "";
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate3d(-30%,-5%,0);
  /*background-image: url("/../../assets/half.png");*/
  background-image: url("../../assets/tree/icon_choose_half.png");
}
</style>