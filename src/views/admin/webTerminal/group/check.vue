<template>
    <div class="admin public">
        <el-dialog title="查看应用" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <div style="float:left;">
                <el-input v-model="groupName" style="width: 170px; float: left" :disabled="true"></el-input>
                <el-input v-model="remark" style="width: 180px;padding-left: 10px" :disabled="true"></el-input>
            </div>
                <div id="example1_filter" class="dataTables_filter" style="margin-right:37px;float:right;">
                    <input type="text"
                           class="form-control"
                           placeholder=""
                           id="search_content"
                           v-model="listQuery.searchContent"
                           @keyup.enter="search($event)"/>
                    <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                        <button class="btn btn-primary" type="button" @click="getList()" >
                            <span class="glyphicon glyphicon-search" ></span>
                        </button>
                    </span>
                </div>

            <el-table
                    ref="multipleTable"
                    :data="resourceList"
                    :header-cell-style="headerCellStyle"
                    border
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="应用名"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="protocol"
                        label="应用类型"
                        align="center"
                >
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="remark"-->
                        <!--label="说明"-->
                        <!--align="center"-->
                <!--&gt;-->
                <!--</el-table-column>-->
            </el-table>
            <div class="row" style="margin-top:8px;" id="pages_list">
                <div class="block" style="margin-right: 2%;float: right" >
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
            <div class='form-footer ' slot="footer"></div>
        </el-dialog>
    </div>
</template>

<script>
    import {getSelectedApps} from "api/SSL_VPN/new_resourceManager/group";
    import {getWebendList,getTerminalByGroup} from "api/webTerminal/webTerminal";
    export default {

        components: {},
        computed: {

        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                addVisible: true,
                resourceList:[],
                appsList:[],
                listQuery: {
                    searchContent:'',
                    currentPage:1,
                    pageSize:10,
                    total:10,
                    groupId:''
                },
                groupId: '',
                selectedList:[]
            }
        },
        props:['currentData'],
        created() {
            this.getList();
            this.groupName = '用户组:  ' + this.currentData.groupName;
            this.remark = '说明:  ' + this.currentData.remark;
        },
        methods: {
            search(event){
                if(event.keyCode==13){
                    this.getList();
                }
            },
            getList(){
                this.listQuery.groupId = this.currentData.id;
                getTerminalByGroup(this.listQuery).then(response => {
                    this.resourceList = response.data;
                    this.listQuery.total = response.extend.page.totalHits;
                }).catch((e) => {
                    console.log(e);
                })
            },
            handleClose() {
                this.$emit("onChangeStatus");
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
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
            sourceSet(formName) {
                    this.addVisible = false;
                    this.$emit("onChangeStatus");
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
        margin-left: 20px;
    }

    .admin .el_sel {
        /*width: 65% !important;*/
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
