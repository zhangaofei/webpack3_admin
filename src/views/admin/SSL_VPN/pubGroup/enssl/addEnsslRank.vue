<template>
    <div class="admin public">
        <el-dialog title="选择应用关联组排序" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <el-table
                    ref="multipleTable"
                    :data="selectedList"
                    :header-cell-style="headerCellStyle"
                    border
                    tooltip-effect="dark"
                    style="width: 100%;max-height: 450px;overflow-y: auto"
                    row-key="id"
                    fit highlight-current-row
                    class="sort_tab"
                    >
                <el-table-column
                        prop="appName"
                        label="应用名"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="appType"
                        label="应用类型"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="说明"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        label="排序"
                        align="center"
                >
                    <template slot-scope="scope">
                        <span @click="shiftTop(scope.row,scope.$index,selectedList)" v-if="scope.$index==0?false:true"><i class="el-icon-sort-up sort_icon" ></i></span>&nbsp;&nbsp;
                        <span  @click="shifBottom(scope.row,scope.$index,selectedList)" v-if="scope.$index==selectedList.length-1?false:true"><i class="el-icon-sort-down sort_icon"></i></span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="row" style="margin-top:8px;" id="pages_list" v-if="false">
                <div class="block" style="margin-right: 2%;float: right"  v-if="false">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="listQuery.currentPage"
                            :page-sizes="[10]"
                            :page-size="listQuery.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="listQuery.total">
                    </el-pagination>
                </div>
            </div>
            <div class='form-footer ' slot="footer" >
                <div class="foot">
                    <span class="canle" @click="sourceReset">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="sourceSet">
                        保存
                    </el-button>

                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {grouplistForAdd,listForEdit,modifyAssociation} from "api/enWAS/group";
    import {getAllAppsList, getSelectedAppsList, updateAppsForGroup} from "api/SSL_VPN/new_resourceManager/group";
    import Sortable from 'sortablejs'
    export default {

        components: {},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                labelPosition: 'left',
                addVisible: true,
                resourceList:[],
                listQuery: {
                    currentPage:1,
                    pageSize:10,
                    total:10
                },
                allSelectedResource:[],
                cancelSelected:[],
                /**/
                selectedList:[],
                newSelectedList:[],
                sortable:null,
                oldList:[],
                newList:[]
            }
        },
        props:['cancelEnssl','objData'],
        created() {
            this.getList();
            this.allSelectedResource = [];

        },
        methods: {
            shiftTop(row,index,list){

                let temp;
                let [...arrList]=list;
                temp=arrList[index-1];
                arrList[index]=temp;
                arrList[index-1]=list[index];
                this.selectedList=arrList;
                this.newSelectedList=arrList;
            },
            shifBottom(row,index,list){
                let temp;
                let [...arrList]=list;
                temp=arrList[index+1];
                arrList[index]=temp;
                arrList[index+1]=list[index];
                this.selectedList=arrList;
                this.newSelectedList=arrList;
            },
            getList(){

                /*获取关联的用户组的应用 数组*/
                getSelectedAppsList({groupId:this.objData.group_id}).then(response => {
                    this.selectedList = response.data;
                    /*拖动*/
                    this.oldList = this.selectedList.map(v => v.id)
                    this.newList = this.oldList.slice();
                    this.$nextTick(() => {
                        this.setSort()
                    })

                }).catch((e) => {
                    console.log(e);
                })
            },
            setSort() {
                const el = document.querySelectorAll('.sort_tab  table  tbody')[0]
                this.sortable = Sortable.create(el, {
                    ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
                    setData: function(dataTransfer) {
                        dataTransfer.setData('Text', '')
                        // to avoid Firefox bug
                        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
                    },
                    onEnd: evt => {
                        const targetRow = this.selectedList.splice(evt.oldIndex, 1)[0]
                        this.selectedList.splice(evt.newIndex, 0, targetRow)

                        // for show the changes, you can delete in you code
                        const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
                        this.newList.splice(evt.newIndex, 0, tempIndex)
                    }
                })
            },
            handleClose() {
                this.$emit("onEnsslRankStatus", this.cancelSelected);
            },
            doTest() {
                this.addVisible = true;
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },
            sourceReset(formName) {
                this.addVisible = false;
                this.$emit("onEnsslRankStatus", this.cancelSelected);
            },
            sourceSet(formName) {
                updateAppsForGroup(this.objData.group_id, this.selectedList).then(response => {
                    this.addVisible = false;
                    this.$message({
                        type: 'success',
                        message: '排序成功!'
                    });
                    this.$emit("onEnsslRankStatus",this.selectedList);
                }).catch((e) => {
                    console.log(e);
                })
            }
        }
    }
</script>
<style>

    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .admin .dialog {
        min-width: 830px;
    }

    .admin .el-dialog__header {
        padding-left: 5px;
    }

    .admin .el_put {
        position: relative;
        display: inline-block;
        /*width: 65% !important;*/
        margin-left: 80px;
    }

    .admin .el_sel {
        /*width: 65% !important;*/
        margin-left: 80px;
    }

    .admin .el_text {
        margin-left: 158px;
    }

    .admin-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .admin-form .el-form-item {
        margin-bottom: 17px;
    }

    .admin .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .admin-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 165px;
    }


</style>
