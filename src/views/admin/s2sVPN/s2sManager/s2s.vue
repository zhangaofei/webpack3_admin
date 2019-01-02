<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left: 12px;">
                <li><a ><i class="fa fa-user"></i> EnS2S</a></li>
                <li class="active">s2s设置</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" id="user_group_set_box_title">s2s设置</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="margin-top: 20px;">
                                <div class="col-sm-6">
                                    <div class="dataTables_length" id="example1_length">
                                        &nbsp;
                                        <a title="新建" @click="onAdd">
                                            <i class="fa  fa-plus" id="user_group_set_new_add">新建</i>
                                        </a>
                                        &nbsp;
                                        <a  title="批量删除" @click="multipleDelete()">
                                            <i class="fa fa-trash"  id="user_group_set_batch_del"> 批量删除</i>
                                        </a>

                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div id="example1_filter" class="dataTables_filter" style="margin-right:53px;float:right;">

                                        <input type="text"
                                               class="form-control"
                                               placeholder=""
                                               id="search_content"
                                               v-model="listQuery.searchContent"
                                               @keyup.enter="search($event)"
                                        />
                                        <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                        <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                <button class="btn btn-primary" type="button" @click="getList()" >
                                                    <span>搜索</span>
                                                </button>
                                        </span>
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
                                        align="center"
                                        width="80"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="serverName"
                                        align="center"
                                        label="名称">
                                </el-table-column>

                                <el-table-column
                                        prop="device"
                                        align="center"
                                        label="接口"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        prop="localSubnet"
                                        label="本地子网"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="操作"
                                        width="150"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a @click="onHandle(scope.row, 'edit')" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                        <a title="删除" @click="singleDelete(scope.row.id)" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                        <a @click="onHandle(scope.row, 'check')" title="查看" ><i class="fa fa-eye" ></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <div class="row" style="margin-top:8px;" id="pages_list">
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

                            <!-- page end -->
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
    import store from "../../../../store/index";
    import permissionRoutes from 'store/permission';
    import {isReadonly} from "../../../../utils/permissionUtil";
    import add from './add'
    import edit from './edit'
    import check from './check'
    import {gets2sList,deletes2s} from 'api/s2sVPN/s2s';
    export default{
        components:{
            add,
            edit,
            check
        },
        data(){
            return{
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:71,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0,
                    searchContent:''
                },
                list:[],
                isEditShow: false,
                isAddShow: false,
                isCheckShow: false,
                currentData: null,
                multipleSelection:[]
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
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
            onHandle(row, type){
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
            getList(){
                gets2sList(this.listQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.list = response.data;
                        this.listQuery.total = response.extend.page.totalHits;
                        this.listQuery.currentPage = response.extend.page.currentPage;
                        this.listQuery.pageSize = response.extend.page.pageSize;
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
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },
            search(event){
                if(event.keyCode==13){
                    this.getList();
                }
            },
            delete(param){
                deletes2s(param).then((resp) => {
                    if (resp.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '删除s2s配置成功！'
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
            singleDelete(id){
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
            multipleDelete(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的s2s配置！'
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
            }
        }
    }
</script>
<style scoped>
    .dataTables_filter{
        position: relative;
        height: 34px;
        margin-bottom: 30px;
    }
    .btn-primary{
        background-color: #3493E0;
        border-color: #1f80e6;
    }
    .btn-primary:hover {
        background-color: #3493E0;
        border-color: #409EFF;
    }
    a {
        color: #3493E0;
    }
    .serch_head_icon{
        display: block;
        width: 30px;
        height: 100%;
        line-height: 34px;
        text-align: center;
        vertical-align: middle;
        position: absolute;
        left: 0;
        top: 0;
        color: #C0C4CC;
    }

    .form-control{
        padding-left: 30px;
        border-color: #DCDFE6;
    }
    .inner_head_right{
        margin-right: 66px;
    }
</style>