<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员1 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user-md"></i>系统设置</a></li>
                <li><a >管理员设置</a></li>
                <li class="active">API管理</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12" style="">
                    <div class="box" style=" border-top-color: #6cbaf5 !important;">
                        <div class="box-header">
                            <h3 class="box-title">API设置</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="margin-bottom:8px;">
                                <div class="col-sm-6">
                                    <div class="dataTables_length" id="example1_length">
                                        &nbsp;
                                        <a title="新建" @click="onAdd">
                                            <i class="fa  fa-plus" id="user_group_set_new_add">&nbsp;新建</i>
                                        </a>
                                        &nbsp;
                                        <a  title="批量删除" @click="multipleDelete()">
                                            <i class="fa fa-trash"  id="user_group_set_batch_del"> 批量删除</i>
                                        </a>
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div id="example1_filter" class="dataTables_filter" style="margin-right:82px;float: right">
                                        <input type="text"
                                               class="form-control"
                                               placeholder=""
                                               id="search_content"
                                               v-model="listQuery.name"
                                               @keyup.enter="search($event)">
                                        <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                <button class="btn btn-primary" type="button" @click="getList()" >
                                                    <span class="glyphicon glyphicon-search" ></span>
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
                                    @selection-change="checkBoxAll"
                            >
                                <el-table-column
                                        type="selection"
                                        width="80"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="名称"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.name}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="URI"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.uri}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="upstream"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.upstream}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="host"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.host}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="请求方式"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.Methods}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="创建时间"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.createtime}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip
                                        width="150"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onEdit(scope.row)" style="margin-right:8px"><i class="fa fa-pencil" ></i></a>
                                        <a title="删除" @click="deleteItem(scope.row)" style="margin-right: 8px" ><i class="fa fa-trash"></i></a>
                                        <a title="查看" @click="onLook(scope.row)" style="margin-right: 8px" ><i class="fa fa-eye"></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <!--<div class="row" style="margin-top:8px;" id="pages_list">-->
                                <!--<div class="block" style="margin-right: 2%;float: right" >-->
                                    <!--<el-pagination-->
                                            <!--@size-change="handleSizeChange"-->
                                            <!--@current-change="handleCurrentChange"-->
                                            <!--:current-page="listQuery.page"-->
                                            <!--:page-sizes="[10, 20, 30, 40,50]"-->
                                            <!--:page-size="listQuery.page_size"-->
                                            <!--layout="total, sizes, prev, pager, next, jumper"-->
                                            <!--:total="listQuery.total">-->
                                    <!--</el-pagination>-->
                                <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <add  @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <update  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <check  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isLookShow"/>
    </div>
</template>

<script>
    import {getApiList, deleteApi} from "../../../../../api/systemSet/adminSet/interface";
    import {formatDate, formatDateTime} from "../../../../../utils/dateUtil";
    import add from './add'
    import update from './update'
    import check from './check'
    export default{
        components:{add, update, check},
        data(){
            return{
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                listQuery: {
                    cur_page: 1,
                    page_size: 10,
                    search_content: null,
                    total: 1
                },
                list: [],
                isLookShow: false,
                isEditShow: false,
                isAddShow: false,
                currentData: null,
                checkedItems:''
            }
        },
        created() {
            this.getList();
        },
        methods:{
            onChangeStatus() {
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.getList();
            },
            getList(){
                getApiList().then((resp) => {
                    if (resp.status == 1){
                        this.list = resp.data.items;
                        for (let i = 0; i < this.list.length; i++){
                            var createDate = new Date(this.list[i].createtime * 1000);
                            this.list[i].createtime = createDate.getFullYear() + '-' + (createDate.getMonth() + 1) + '-' + (createDate.getDate())
                        }
                    }
                }).catch((err) => {

                });
            },
            onAdd(){
                this.isAddShow=true;
            },
            onEdit(row){
                this.currentData = row;
                this.isEditShow=true
            },
            onLook(row){
                this.currentData = row;
                this.isLookShow=true
            },
            checkBoxAll(val){
                this.checkedItems = val;
            },
            deleteItem(row){
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let id = [];
                    id.push(row.id);
                    deleteApi({id:id}).then(response => {
                        if (response.status == 1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getList()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: response.msg
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });
            },
            multipleDelete() {
                if (this.checkedItems.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择要删除的API设置！'
                    });
                    return;
                }
                this.$confirm('确认删除' + this.checkedItems.length + '项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let id = [];
                    for(let i = 0; i < this.checkedItems.length; i++){
                        id.push(this.checkedItems[i].id);
                    }
                    deleteApi({id:id}).then(response => {
                        if (response.status == 1){
                            this.getList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: response.msg
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });
            },
            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.cur_page = val;
                this.getList();
            },
        }
    }
</script>