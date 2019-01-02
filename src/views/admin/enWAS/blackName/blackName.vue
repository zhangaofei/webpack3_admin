<template>
    <div>
        <section class="content-header">
            <h1>

                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user-md"></i> EnWAS</a></li>
                <li class="active">可信域</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12" style="">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">可信域</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row">
                                    <div class="dataTables_length inner_head_left">
                                        &nbsp;
                                        <a title="新建" @click="onAdd">
                                            <i class="fa  fa-plus" id="user_group_set_new_add">&nbsp;新建</i>
                                        </a>
                                        &nbsp;
                                        <a  title="批量删除" @click="multipleDelete()">
                                        <i class="fa fa-trash"  id="user_group_set_batch_del"> &nbsp;批量删除</i>
                                        </a>
                                        &nbsp;
                                    </div>
                                    <div class="dataTables_filter inner_head_right"
                                         style="margin-right:82px;float: right">
                                        <input type="text"
                                               class="form-control"
                                               placeholder=""
                                               id="search_content"
                                               v-model="listQuery.name"
                                               @keyup.enter="search($event)">
                                        <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                        <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                <button class="btn btn-primary" type="button" @click="getList()">
                                                    <span>搜索</span>
                                                </button>
                                        </span>
                                    </div>

                            </div>
                            <el-table
                                    ref="multipleTable"
                                    :data="list"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="checkBoxAll">
                                <el-table-column
                                        type="selection"
                                        width="80"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="可信域名称"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                </el-table-column>
                                <el-table-column
                                        label="说明"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{scope.row.describ}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip
                                        width="150"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onHandle(scope.row, 'edit')" style="margin-right:8px"><i
                                                class="fa fa-pencil"></i></a>
                                        <a title="删除" @click="deleteItem(scope.row)" style="margin-right: 8px"><i
                                                class="fa fa-trash"></i></a>
                                        <a title="查看" @click="onHandle(scope.row, 'check')" style="margin-right: 8px"><i
                                                class="fa fa-eye"></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <div class="row" style="margin-top:8px;" id="pages_list">
                                <div class="block" style="margin-right: 2%;float: right">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="listQuery.page"
                                            :page-sizes="[10, 20, 30, 40,50]"
                                            :page-size="listQuery.page_size"
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
        <add @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <update @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <look @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isLookShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import {getBlackName, getDomain, deleteBlackName,checkDeleteBlackName} from 'api/enWAS/whiteList';
    import {objectMerge} from 'utils';
    import update from './update'
    import add from './add'
    import look from './look'


    export default {
        components: {update, add,look},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:113,
                role: '',
                list: null,

                listLoading: true,
                listQuery: {
                    page: 1,
                    page_size: 10,
                    name: '',
                    total: null,//总条数
                },
                currentView: null,
                currentUser: null,
                isEditShow: false,
                isAddShow: false,
                isLookShow: false,
                checkedItems:[]
            }
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            onChangeStatus(){
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
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
                        this.isEditShow = true
                    } else {
                        this.isLookShow = true
                    }
                }
            },

            getList() {
                getBlackName(this.listQuery).then(response => {
                    const data = response.data.items;
                    if (data.page_count > 0) {
                        this.list = data.res;
                        this.listQuery.total = data.page_count;
                    } else {
                        this.list = [];
                        this.listQuery.total = 0;
                    }
                    this.listLoading = false;
                });
            },
            search(){
                if (event.keyCode == 13) {
                    if (this.listQuery.name != null) {
                        this.getList();
                    }
                }
            },

            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getList();
            },

            checkBoxAll(val) {
                this.checkedItems = val;
            },

            multipleDelete(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.checkedItems.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的可信域！'
                        });
                        return;
                    }
                    let id = [];
                    for (let i = 0; i < this.checkedItems.length; i++) {
                        id.push(this.checkedItems[i].id);
                    }
                    checkDeleteBlackName({id: id}).then(response => {
                        if (response.msg == "success") {
                            if (response.data.count > 0) {
                                var arr = response.data.items;
                                var str = arr.join(',');
                                this.$confirm('可信域' + str + '被占用,是否确定删除?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.$confirm('确认删除' + this.checkedItems.length + '项?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        deleteBlackName({id: id}).then(response => {
                                            this.getList()
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
                                        })
                                    }).catch(() => {
                                        this.$message({
                                            type: 'info',
                                            message: '已取消删除'
                                        });
                                    });
                                }).catch(() => {

                                });
                            } else {
                                this.$confirm('确认删除' + this.checkedItems.length + '项?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    deleteBlackName({id: id}).then(response => {
                                        this.getList()
                                        this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                    })
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '已取消删除'
                                    });
                                });
                            }
                        }
                    }).catch(() => {

                    })
                }
            },
            deleteItem(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let id = [];
                    id.push(row.id);
                    checkDeleteBlackName({id: id}).then(response => {
                        if (response.msg == "success") {
                            if (response.data.count > 0) {
                                var arr = response.data.items;
                                var str = arr.join(',');
                                this.$confirm('可信域' + str + '被占用,是否确定删除?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    deleteBlackName({id: id}).then(response => {
                                        this.getList();
                                        this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                    })

                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '已取消删除'
                                    });
                                }).catch(() => {

                                });
                            } else {
                                this.$confirm('确认删除?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    deleteBlackName({id: id}).then(response => {
                                        this.getList();
                                        this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                    })

                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '已取消删除'
                                    });
                                });
                            }
                        }
                    }).catch(() => {

                    });
                }
            }
        }
    }
</script>
<style scoped>
    .dataTables_filter.inner_head_right{
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
