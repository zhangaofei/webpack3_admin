<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员1 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user-md"></i>系统管理</a></li>
                <li><a >管理员设置</a></li>
                <li class="active">权限管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" id="sys_p_title">权限管理</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                <el-col :span="15" style="margin-left: 10px;">
                                    &nbsp;<span v-if="roleName=='超级管理员'">
                                    <a class="function_btn_main" href="javascript:void(0);" @click="onAdd"><i class="fa  fa-plus" id="sys_p_new_add"> </i> 新建</a>

                                    <a class="function_btn_main" @click="multipleDelete()"><i class="fa fa-trash" id="sys_p_batch_del"> 批量删除 </i></a>
                                </span>
                                </el-col>
                                <el-col :span="8" style="margin-right: 16px; float: right;">
                                    <SearchBox
                                            width="60px"
                                            searchBoxId="example1_filter"
                                            inputBoxId="search_content"
                                            placeholder="请输入关键字"
                                            @search="search"
                                            @onClickSearchButton="getList"></SearchBox>
                                </el-col>
                                <!--<div id="example1_filter " class="dataTables_filter inner_head_right">-->
                                    <!--<input type="text"-->
                                           <!--class="form-control"-->
                                           <!--placeholder=""-->
                                           <!--id="search_content"-->
                                           <!--@keyup.enter="search($event)"-->
                                           <!--v-model="listQuery.search_content"-->
                                    <!--/>-->
                                    <!--<span class="glyphicon glyphicon-search serch_head_icon"></span>-->
                                    <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                        <!--<button class="btn btn-primary" type="button" @click="getList()">-->
                                            <!--<span>搜索</span>-->
                                        <!--</button>-->
                                    <!--</span>-->

                                <!--</div>-->
                            </div>

                            <div>
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
                                            :selectable="isAvailable"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            label="权限名"
                                            align="center"
                                    >
                                        <template slot-scope="scope">{{ scope.row.name }}</template>
                                    </el-table-column>

                                    <el-table-column
                                            prop="remark"
                                            label="权限说明"
                                            align="center"
                                            show-overflow-tooltip>
                                    </el-table-column>

                                    <el-table-column
                                            label="操作"
                                            show-overflow-tooltip
                                            width="150"
                                            align="center"
                                    >
                                        <template slot-scope="scope">
                                            <span v-if="roleName=='超级管理员'">
                                                <a @click="onEdit(scope.row, 'edit')" title=""><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                <a @click="singleDelete(scope.row)" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                                <a @click="onEdit(scope.row, 'check')" title=""><i class="fa fa-eye" style="margin-right: 8px" :disabled="true"></i></a>
                                            </span>
                                            <span v-else>
                                                <el-button type="text" @click="onEdit(scope.row, 'edit')" :disabled="true" class="btn_color" ><i class="fa fa-pencil"></i></el-button>
                                                <el-button type="text" @click="singleDelete(scope.row)" :disabled="true" class="btn_color" style="margin-right: 8px"><i class="fa fa-trash"></i></el-button>
                                                <a @click="onEdit(scope.row, 'check')" title=""><i class="fa fa-eye" style="margin-right: 8px" :disabled="true"></i></a>
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <!-- page start -->
                                <div class="row" style="margin-top:8px;" id="pages_list">
                                    <div class="block" style="margin-right: 2%;float: right">
                                        <el-pagination
                                                @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange"
                                                :current-page="listQuery.cur_page"
                                                :page-sizes="[10, 20, 30, 40,50]"
                                                :page-size="listQuery.page_size"
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
            </div>
        </section>
        <add  @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <edit  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <look  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isLookShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import {codeMessage} from "../../../../../utils/codes";
    import {notifyFault} from "../../../../../utils/notify";
    import {mapGetters} from 'vuex';
    import add from './add'
    import edit from './edit'
    import look from './look'
    import {delPower, powerList} from "../../../../../api/systemSet/new_adminSet/new_powerManager";
    import SearchBox from '@/views/components/searchBox.vue';

    let id = 1000;
    export default {
        components: {add, edit,look, SearchBox},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:12,
                isEditShow: false,
                isAddShow: false,
                isLookShow:false,
                activeName: 'first',
                role: '',
                list: [],
                total: null,
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    page_size: 10,
                    search_content: null,
                    total: 0
                },
                currentView: null,
                currentData: null,

                multipleSelection: [],
                options: {
                    showCheckbox: true,
                    halfCheckedStatus: true,//控制父框是否需要半钩状态
                    search: {
                        useInitial: true,
                        useEnglish: false,
                        customFilter: null
                    }
                }
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'roleName'
            ])
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            this.getList();

        },

        methods: {
            isAvailable(row){
                if (row.id=="1"){
                    return false;
                }
                return true;
            },
            onChangeStatus() {
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow =false;
                this.getList();
            },
            onAdd() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isAddShow = true;
                }
            },
            onEdit(row, type) {
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
                        this.isLookShow = true;
                    }
                }
            },

            search(event, keyword) {
                this.listQuery.search_content = keyword != undefined ? keyword : this.listQuery.search_content;
                if (event.keyCode == 13) {
                    if (this.listQuery.search_content != null) {
                        this.getList();
                    }
                }
            },
            getList(keyword) {
                this.listQuery.search_content = keyword != undefined ? keyword : this.listQuery.search_content;
                powerList(this.listQuery.cur_page,
                    this.listQuery.page_size,
                    this.listQuery.search_content).then((resp) => {
                    this.list = resp.data;
                    this.listQuery.total = resp.extend.page.totalHits;

                }).catch((err) => {
                    this.$message({
                        type: 'warning',
                        message: '网络或服务器故障！'
                    });
                });
            },
            singleDelete(item) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.$confirm('确认删除所选的权限?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let id = item.id;
                        this.delete(id);
                    }).catch(() => {
                    });
                }
            },
            multipleDelete() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的权限！'
                        });
                        return;
                    }

                    this.$confirm('确认删除所选的多个权限?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var newArr = [];
                        for (let i = 0; i < this.multipleSelection.length; i++) {

                            newArr.push(this.multipleSelection[i].id)
                        }
                        let id = newArr.join(',')
                        this.delete(id);

                    }).catch(() => {
                    });
                }
            },
            delete(id) {
                delPower(id).then((resp) => {
                    if (resp.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.multipleSelection = [];
                        this.getList();
                    } else {
                    }
                }).catch((err) => {
                    console.log("删除权限出错：" + err);
                    notifyFault();
                     });

            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.cur_page = val;
                this.getList();
            }
        }
    }
</script>
<style>
    .btn_color{
        background-color: transparent;
    }
</style>
<style scoped lang="scss">
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
<style lang="scss">
    /*add edit密码校验类*/
    .power_psw_check{
        .common_psw{
            display: none;
            width: 250px;
            position: absolute;
            color: red;
            margin-top: -13px;
            font-size: 12px;
        }
        .common_psw_min{
            left: -50px;
        }
        .common_psw_max{
            left: 45px;
        }

    }
</style>


