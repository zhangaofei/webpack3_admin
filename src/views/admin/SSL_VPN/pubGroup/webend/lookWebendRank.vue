<template>
    <div class="admin public">
        <el-dialog title="查看应用关联组排序" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <el-table
                    ref="multipleTable"
                    :data="selectedList"
                    :header-cell-style="headerCellStyle"
                    border
                    tooltip-effect="dark"
                    style="width: 100%;max-height: 450px;overflow-y: auto"
                    row-key="id"    fit highlight-current-row
                    @selection-change="handleSelectionChange">
                <el-table-column
                        label="应用名"
                        align="center"
                >
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column
                        label="添加方法"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <span v-if="scope.row.addType==0">协定添加</span>
                        <span v-else>自主添加</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="protocol"
                        label="协议类型"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        label="排序"
                        align="center"
                        v-if="false"
                >
                    <template slot-scope="scope">
                        <span  @click="shiftTop(scope.row,scope.$index,selectedList)" v-if="scope.$index==0?false:true"><i class="el-icon-sort-up sort_icon"></i></span>&nbsp;&nbsp;
                        <span  @click="shifBottom(scope.row,scope.$index,selectedList)" v-if="scope.$index==selectedList.length-1?false:true"><i class="el-icon-sort-down sort_icon"></i></span>
                    </template>

                </el-table-column>
            </el-table>
            <div class="row" style="margin-top:8px;" id="pages_list">
                <div class="block" style="margin-right: 2%;float: right" >
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="listQuery.resource_page"
                            :page-sizes="[10]"
                            :page-size="listQuery.page_size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="listQuery.total">
                    </el-pagination>
                </div>
            </div>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <!--<span class="canle"  @click="sourceReset">取消</span>-->
                    <!--<el-button-->
                            <!--type="primary"-->
                            <!--class="btn_save"-->
                            <!--@click="sourceSet">-->
                        <!--保存-->
                    <!--</el-button>-->

                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {grouplistForAdd, listForEdit} from "api/enWAS/group";
    import {getAllAppsList, getSelectedAppsList, updateAppsForGroup} from "api/SSL_VPN/new_resourceManager/group";
    import {getWebendList,getTerminalByGroup,getTerminalByGroupNoPage, updateTerminals} from "api/webTerminal/webTerminal";
    import Sortable from 'sortablejs'
    export default {

        components: {},
        computed: {
            ...mapGetters([
                'appRoles'
            ])
        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                labelPosition: 'left',
                addVisible: true,
                resourceList:[],
                listQuery: {
                    resource_page:1,
                    black_page:1,
                    page_size:10,
                    total:10
                },
                group_id: '',
                cancelArr:[],
                Click:false,
                topShow:false,
                bottomShow:false,
                /**/
                selectedList:[],
                newSelectedList:[],
                sortable:null,
                oldList:[],
                newList:[]
            }
        },
        props:['id','cancelResource', 'subClick'],
        created() {
            this.getSelectedList();
            this.selectedList = [];
        },
        methods: {
            // shiftTop(row,index,list){
            //
            //     let temp;
            //     let [...arrList]=list;
            //     temp=arrList[index-1];
            //     arrList[index]=temp;
            //     arrList[index-1]=list[index];
            //     this.selectedList=arrList;
            //     this.newSelectedList=arrList;
            // },
            // shifBottom(row,index,list){
            //     let temp;
            //     let [...arrList]=list;
            //     temp=arrList[index+1];
            //     arrList[index]=temp;
            //     arrList[index+1]=list[index];
            //     this.selectedList=arrList;
            //     this.newSelectedList=arrList;
            // },
            getSelectedList(){
                getTerminalByGroupNoPage({groupId:this.id}).then(response => {
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
                const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
                this.sortable = Sortable.create(el, {
                    ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
                    setData: function(dataTransfer) {
                        dataTransfer.setData('Text', '')
                    },
                    onEnd: evt => {
                        console.log('onEnd')
                        const targetRow = this.selectedList.splice(evt.oldIndex, 1)[0]
                        this.selectedList.splice(evt.newIndex, 0, targetRow)

                        // for show the changes, you can delete in you code
                        const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
                        this.newList.splice(evt.newIndex, 0, tempIndex)
                    }
                })
                console.log('setData00',this.sortable)
            },
            handleClose() {
                this.$emit("onWebendRankStatus", this.cancelArr, this.Click);
            },
            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.resource_page = val;
                this.getList();
            },
            handleSelectionChange(val){
                for (let i = 0; i < this.resourceList.length; i++){
                    for (let j = 0; j < this.selectedList.length; j++){
                        if (this.resourceList[i].id == this.selectedList[j].id){
                            this.selectedList.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
                for (let i = 0; i < val.length; i++){
                    this.selectedList.push(val[i]);
                }
            },
            sourceReset(formName) {
                this.addVisible = false;
                this.$emit("onWebendRankStatus", this.cancelArr, this.Click);
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
        width: 65% !important;
        margin-left: 20px;
    }

    .admin .el_sel {
        width: 65% !important;
        margin-left: 20px;
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
