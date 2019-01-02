<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i>用户管理</a></li>
                <li><a >审核设置</a></li>
                <li class="active">审核设置</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" id="user_set_box_title">审核设置</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="margin-bottom:8px;">
                                <div class="col-sm-6">
                                    <div class="dataTables_length set_margin_top10 set_margin_bottom10" id="example1_length">
                                        &nbsp;
                                        <a class="function_btn_main" title="新建"
                                            @click="onAdd()">
                                            <i class="fa  fa-plus" > 新建</i>
                                        </a>
                                        <a class="function_btn_main" @click="onMultiDel()" title="批量删除">
                                            <i class="fa fa-trash">
                                              批量删除
                                            </i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <el-table
                                    ref="multipleTable"
                                    :data="list"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="80"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="auditName"
                                        label="审核名称"
                                        align="center">
                                </el-table-column>

                                <el-table-column
                                        prop="groupName"
                                        label="适用用户组"
                                        align="center">
                                </el-table-column>

                                <el-table-column
                                        prop="auditType"
                                        label="审核方式"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="auditRemark"
                                        align="center"
                                        label="说明">
                                </el-table-column>

                                <el-table-column
                                        label="操作"
                                        width="150"
                                        align="center"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onEdit(scope.row, 'edit')"><i class="fa fa-pencil" ></i></a>
                                        &nbsp;
                                        <a title="删除" @click="onSingleDel(scope.row.id)"><i class="fa fa-trash"></i></a>&nbsp;

                                        <a @click="onEdit(scope.row, 'check')" title="查看" ><i class="fa fa-eye" ></i></a>&nbsp;
                                    </template>
                                </el-table-column>
                            </el-table>


                            <div class="row" style="margin-top:8px;" >
                                <div class="block" style="margin-right: 2%;float: right" >
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="listQuery.currentPage"
                                            :page-sizes="[10, 20, 30, 40,50]"
                                            :page-size="listQuery.pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="listQuery.total">
                                    </el-pagination>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>

        <add  @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <edit  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <check @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="isCheckShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import add from './add'
    import edit from './edit'
    import check from './check'
    import {getCheckConfigList,deleteCheckConfig} from "../../../../../api/SSL_VPN/checkManager/checkConfig";
    export default{
        components: {
            add,
            edit,
            check
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:76,
                list: [],
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0
                },
                currentData: null,
                multipleSelection:[],
                isEditShow: false,
                isAddShow: false,
                isCheckShow: false
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            onChangeStatus(){
                this.isEditShow = false;
                this.isAddShow = false;
                this.isCheckShow = false;
                this.getList();
            },
            onAdd(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isAddShow = true;
                }
            },
            onEdit(row, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    if(type == 'edit'){
                        this.isEditShow = true;
                    } else {
                        this.isCheckShow = true;
                    }
                }
            },
            delete(id){
                deleteCheckConfig(id).then((resp) => {
                    if (resp.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '删除审核设置成功！'
                        });
                        this.multipleSelection = [];
                        this.getList();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: resp.code.info
                        });
                    }
                }).catch(e => {
                    this.$message({
                        type: 'warning',
                        message: '网络或者服务器故障！'
                    });
                })
            },
            onMultiDel(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的审核设置！'
                        });
                        return;
                    }

                    this.$confirm('确认删除' + this.multipleSelection.length + '项?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let id = [];
                        for (let i = 0; i < this.multipleSelection.length; i++) {
                            let row = this.multipleSelection[i];
                            id.push(row.id);
                        }
                        let deleteDTO = {
                            ids: id.join(',')
                        }
                        this.delete(deleteDTO);
                    }).catch((err) => {
                        console.log("取消删除。")
                    });
                }
            },
            onSingleDel(id){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.$confirm('确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let deleteDTO = {
                            ids: id
                        }
                        this.delete(deleteDTO);
                    }).catch(() => {
                        console.log("取消删除。")
                    });
                }
            },

            getList() {
                getCheckConfigList(this.listQuery).then(response => {
                    if(response.status == 'SUCCESS'){
                        this.list = response.data;
                        for (let i = 0; i < this.list.length; i++){
                            if(this.list[i].auditType == 'auto'){
                                this.list[i].auditType = '自动审核'
                            } else if(this.list[i].auditType == 'hand'){
                                this.list[i].auditType = '人工审核'
                            }
                            if(this.list[i].auditRule == 'all'){
                                this.list[i].auditRule = '全部通过'
                            } else if(this.list[i].auditRule == 'allNo'){
                                this.list[i].auditRule = '全部不通过'
                            } else if(this.list[i].auditRule == 'rule'){
                                this.list[i].auditRule = '根据规则匹配通过'
                            }
                        }
                        this.listQuery.currentPage = response.extend.page.currentPage;
                        this.listQuery.pageSize = response.extend.page.pageSize;
                        this.listQuery.total = response.extend.page.totalHits;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.code.info
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }

</script>


<style >
    a {
        color: #3493E0;
    }
    /* 设置弹出框大小*/

</style>

