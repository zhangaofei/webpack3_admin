<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left: 12px;">
                <li><a ><i class="fa fa-user"></i>用户管理</a></li>
                <li><a >用户设置</a></li>
                <li class="active">用户组设置</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" id="user_group_set_box_title">用户组设置</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">

                                <el-col :span="15" style="margin-left: 10px;">
                                    &nbsp;
                                    <a class="function_btn_main" title="新建" @click="onAdd">
                                        <i class="fa  fa-plus" > 新建</i>
                                    </a>
                                    <a class="function_btn_main" title="批量删除" @click="multipleDelete()">
                                        <i class="fa fa-trash"> 批量删除</i>
                                    </a>

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

                                <!--<div id="example1_filter" class="dataTables_filter inner_head_right">-->

                                    <!--<input type="text"-->
                                           <!--class="form-control"-->
                                           <!--placeholder="输入关键字"-->
                                           <!--id="search_content"-->
                                           <!--v-model="listQuery.searchContent"-->
                                           <!--@keyup.enter="search($event)"-->
                                    <!--/>-->
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
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        align="center"
                                        width="80"
                                        :selectable="isAvailable"
                                >
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="用户组名称">
                                    <template slot-scope="scope">{{ scope.row.groupName }}</template>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="用户组策略"
                                        show-overflow-tooltip>

                                    <template slot-scope="scope">
                                        {{scope.row.ruleName}}
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        prop="remark"
                                        label="说明"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        prop="status"
                                        label="用户组状态"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="操作"
                                        width="150"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a @click="onEdit(scope.row, 'edit')" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                        <a title="删除" @click="singleDelete(scope.row)" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                        <a @click="onEdit(scope.row, 'check')" title="查看" ><i class="fa fa-eye" ></i></a>
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
        <edit  @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="isEditShow"/>
        <check  @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="isCheckShow"/>
    </div>
</template>
<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from '../../../../../store';
    import add  from "./add";
    import edit  from "./edit"
    import check from "./check"
    import {delGroup, groupList, mainAuthTypeList} from 'api/SSL_VPN/userManager/new-groupSet';
    import {codeMessage} from "../../../../../utils/codes";
    import {notifyFault} from "../../../../../utils/notify";
    import SearchBox from '@/views/components/searchBox.vue';
    export default{
        components: {
            add,
            edit,
            check,
            SearchBox
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:20,
                addclose:'',
                editclose:'',
                assistant:false,
                authTypeList:[],
                checkedAuthType:[],
                groupForm:{
                    checkedAuthType:[],
                    group_name:'',
                    remark:'',
                    status:'',
                    is_default:false,
                    main_auth_list:[],
                    aux_auth_list:[],
                    ids:[],
                    createAdministrator:1,
                },
                lookInfo:{
                    groupName: "",
                    ruleId: "",
                    remark:'',
                },
                baseConfigure:{
                    groupName:'',
                    remark:'',
                    createAdministrator:'1',
                    ruleId:'1'
                },

                lookVisible: false,
                list: [],
                role: '',
                total: null,
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    searchContent: null,
                    total:0
                },
                currentView: null,
                currentData: null,
                multipleSelection: [],
                isAddShow:false,
                isEditShow:false,
                isCheckShow:false
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            isAvailable(row){
                if (row.groupName=='third_group'){
                    return false;
                }
                return true;
            },
            onChangeStatus(){
                this.isAddShow = false;
                this.isEditShow = false;
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
                    if(type == 'edit'){
                        this.isEditShow = true;
                    } else {
                        this.isCheckShow = true;
                    }
                    this.currentData = row;
                }
            },
            findItem(value,key,list){
                let res=[];
                for(let item of list){
                    for(let v of value){
                        if(item[key]==v){
                            res.push({
                                authType:item.authsType,
                                authId:item.id,
                                authName:item.authsName
                            });
                        }
                    }
                }
                return res;
            },

            test(){
                let list=this.findItem(this.groupForm.checkedAuthType,"authsName",this.authTypeList);
            },
            handleUserSizeChange(val) {
                this.userQuery.pageSize = val;
                this.getUserList();
            },
            handleUserCurrentChange(val) {
                this.userQuery.currentPage = val;
                this.getUserList();
            },

            handleAppSizeChange(val) {
                this.resourceQuery.pageSize = val;
                this.getResourceList();
            },
            handleAppCurrentChange(val) {
                this.resourceQuery.currentPage = val;
                this.getResourceList();
            },

            search(event, keyword){
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                if(event.keyCode==13){
                    this.getList();
                }
            },
            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                this.listLoading = true;
                groupList(this.listQuery).then(response => {

                    const data = response.data;
                    this.list = data;
                    this.listQuery.total = response.extend.page.totalHits;
                    this.listLoading = false;
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e);
                    // notifyFault();
                });
            },

            singleDelete(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let list = [];
                    list.push(
                        row.id
                    );
                    let groupDto = {
                        ids: list.join(',')
                    }
                    this.delete(groupDto);
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
                            message: '请选择要删除的用户组！'
                        });
                        return;
                    }
                    let list = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        let row = this.multipleSelection[i];
                        list.push(
                            row.id
                        );
                    }
                    let groupDto = {
                        ids: list.join(',')
                    }
                    this.delete(groupDto);
                }
            },
            delete(groupDto) {
                this.$confirm('确认删除用户组?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delGroup(groupDto).then((resp)=>{
                        if(resp.status=="SUCCESS"){
                            this.$message({
                                type:'success',
                                message:'删除用户组成功！'
                            });
                            this.multipleSelection=[];
                            this.getList();
                        }else {
                            this.$message({
                                type:'warning',
                                message:resp.code.info
                            });
                        }
                    }).catch((err)=>{
                        console.log("删除用户发生错误:",err);
                        // notifyFault();
                    });
                }).catch(e=>{

                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize=val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage=val;
                this.getList();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }

        }
    }
</script>
<style lang="scss">
    .group-form .el-scrollbar{
        width: 510px;
    }

    .group-form .el-select-dropdown__wrap .el-scrollbar__wrap{
        width: 510px;
    }

    .group-form .el-select-dropdown{
        min-width: 510px  ;
        width: 510px ;
    }

    .group-form .el-select-dropdown__item{
        width: 510px;
    }

    .group-form .el-checkbox__inner{
        height: 18px;
        width: 18px;
    }

    .group-form .el-form-item__error {
        left: 50px;
    }

    .group-form .el-checkbox{
        margin-top: 0;
        height: 26px!important;
    }

    .group-form-check-group{
        margin-left: 0;
        float: left;
        margin-top: 10px
    }

    .group-form-check-group label{
        width:46%;
    }

    .group-form-check-group label:first-child{
        width:46%!important;
        margin-left: 15px!important;
    }
    .group-form-check-group label {
        height: 28px;
    }
    .group-select{
        min-width: 510px!important;
        width: 510px!important;
    }
    .el-form{
        .el-form-item{
            .auth-type{
                width: 100%;
                border:solid 1px #e1e3eb;
                height: 240px;
                .pre-scrollable{
                    margin-left: 5px;
                    width: 100%;
                    height: 100%;
                    overflow-y: scroll;
                }
            }
        }
    }
</style>
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