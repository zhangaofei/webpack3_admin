<template>
    <div>
        <section class="content-header">
            <h1>

                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user-md"></i> EnWAS</a></li>
                <li class="active">web应用</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">web应用</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                <el-col :span="15" style="margin-left: 10px;">
                                    &nbsp;
                                    <a class="function_btn_main" title="新建" @click="onAdd">
                                        <i class="fa fa-plus" id="user_group_set_new_add"> 新建</i>
                                    </a>
                                    <a class="function_btn_main" title="批量删除" @click="multipleDelete()">
                                        <i class="fa fa-trash"  id="user_group_set_batch_del"> 批量删除</i>
                                    </a>
                                </el-col>
                                <el-col :span="8" style="margin-right: 16px; float: right;">
                                    <SearchBox
                                            width="60px"
                                            inputBoxId="search_content"
                                            placeholder="请输入关键字"
                                            @search="search"
                                            @onClickSearchButton="getList"></SearchBox>
                                </el-col>
                                <!--<div  class="dataTables_filter inner_head_right">-->
                                    <!--<input type="text"-->
                                           <!--class="form-control"-->
                                           <!--placeholder=""-->
                                           <!--id="search_content"-->
                                           <!--v-model="listQuery.name"-->
                                           <!--@keyup.enter="search($event)">-->
                                    <!--<span class="glyphicon glyphicon-search serch_head_icon"></span>-->
                                    <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                            <!--<button class="btn btn-primary" type="button" @click="getList()" >-->
                                                <!--<span>搜索</span>-->
                                            <!--</button>-->
                                    <!--</span>-->
                                <!--</div>-->
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
                                        label="图标"
                                        align="center"
                                        width="120"
                                >
                                    <template slot-scope="scope"> <img :src="scope.row.iconPath && scope.row.iconPath.indexOf('resource/image') != -1 ? scope.row.iconPath : '/api/admin/'+ scope.row.iconPath"  style="width:40px;border-radius:50%"></template>
                                </el-table-column>
                                <el-table-column
                                        label="应用名称"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.name}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="哈希域名"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <!--{{ // scope.row.url}}-->
                                        <template v-if="scope.row.protocol=='HTTPS'">
                                            {{scope.row.url.substring(6,scope.row.url.indexOf('.'))}}
                                        </template>
                                        <template v-else>
                                            {{ scope.row.url.substring(0,scope.row.url.indexOf('.'))}}
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="协议"
                                        align="center"
                                        width="120"
                                >
                                    <template slot-scope="scope">{{ scope.row.protocol}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="说明"
                                        align="center"
                                        width="120"
                                >
                                    <template slot-scope="scope">{{ scope.row.describ}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip
                                        width="150"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onHandle(scope.row, 'edit')" style="margin-right:8px"><i class="fa fa-pencil" ></i></a>
                                        <a title="删除" @click="deleteItem(scope.row)" style="margin-right: 8px" ><i class="fa fa-trash"></i></a>
                                        <a title="查看" @click="onHandle(scope.row, 'check')" style="margin-right: 8px" ><i class="fa fa-eye"></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <div class="row" style="margin-top:8px;" id="pages_list">
                                <div class="block" style="margin-right: 2%;float: right" >
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
        <add  @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <update  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <look  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isLookShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import {mapGetters} from 'vuex';
    import {getResourceList, addResource, updateResource, deleteResource, checkDeleteResource,newResourceList} from 'api/enWAS/resource';
    import add from './add'
    import update from './update'
    import look from './look'
    import SearchBox from '@/views/components/searchBox.vue';

    export default {
        name: 'adminResource',
        components: {add, update,look, SearchBox},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:26,
                role: '',
                list: null,
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    searchContent: '',
                    total:0
                },
                currentView: null,
                currentData: null,
                isEditShow: false,
                isAddShow: false,
                isLookShow:false,
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

            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                newResourceList(this.listQuery).then(response => {
                    // const data = response.data;
                    // if (data.page_count > 0) {
                    //     this.list = data.res;
                    // } else {
                    //     this.list = [];
                    //     this.listQuery.total = 0;
                    // }
                    // this.listQuery.total = data.page_count;

                    this.list=response.data;
                    this.listQuery.total = response.extend.page.totalHits;
                })
            },
            search(event, keyword){
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                if(event.keyCode==13){
                    if(this.listQuery.searchContent !=null){
                        this.getList();
                    }
                }
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },

            handleEdit(row) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    if (this.currentView == update) {
                        this.$refs.child.show(row)
                    } else {
                        this.currentView = update;
                    }
                }
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
                            message: '请选择要删除的Web应用！'
                        });
                        return;
                    }
                    let id = [];
                    for (let i = 0; i < this.checkedItems.length; i++) {
                        id.push(this.checkedItems[i].id);
                    }
                    checkDeleteResource({id: id}).then(response => {
                        if (response.msg == "success") {
                            if (response.data.count > 0) {
                                var arr = response.data.items;
                                var str = arr.join(',');
                                this.$confirm('应用' + str + '被占用,是否确定删除?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.$confirm('确认删除' + this.checkedItems.length + '项?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        deleteResource({id: id}).then(response => {
                                            this.getList()
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
                                        })
                                    }).catch(() => {

                                    });
                                }).catch(() => {

                                });
                            } else {
                                this.$confirm('确认删除' + this.checkedItems.length + '项?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    deleteResource({id: id}).then(response => {
                                        this.getList()
                                        this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                    })
                                }).catch(() => {

                                });
                            }
                        }
                    }).catch(() => {

                    });
                }
            },
            deleteItem(row) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let id = [];
                    id.push(row.id);
                    checkDeleteResource({id: id}).then(response => {
                        if (response.msg == "success") {
                            if (response.data.count > 0) {
                                var arr = response.data.items;
                                var str = arr.join(',');
                                this.$confirm('应用' + str + '被占用,是否确定删除?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    deleteResource({id: id}).then(response => {
                                        this.getList()
                                        this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                    })
                                }).catch(() => {

                                }).catch(() => {

                                });
                            } else {
                                this.$confirm('确认删除?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    deleteResource({id: id}).then(response => {
                                        this.getList()
                                        this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                    })

                                }).catch(() => {

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
