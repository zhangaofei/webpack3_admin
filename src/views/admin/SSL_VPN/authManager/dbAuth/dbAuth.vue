<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i> 用户管理</a></li>
                <li><a >认证设置</a></li>
                <li class="active">DB认证</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">DB认证</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                <el-col :span="15" style="margin-left: 10px;">
                                    &nbsp;
                                    <a class="function_btn_main" title="新建" @click="onAdd">
                                        <i class="fa fa-plus" > 新建</i>
                                    </a>
                                    <a class="function_btn_main" title="批量删除" @click="multipleDelete()">
                                        <i class="fa fa-trash" > 批量删除</i>
                                    </a>
                                    &nbsp;
                                </el-col>
                                <el-col :span="8" style="margin-right: 16px; float: right;">
                                    <SearchBox
                                            width="60px"
                                            inputBoxId="search_content"
                                            placeholder="请输入关键字"
                                            @search="search"
                                            @onClickSearchButton="getList"></SearchBox>
                                </el-col>
                                <!--<div class="dataTables_filter inner_head_right">-->
                                    <!--<input type="text"-->
                                           <!--class="form-control"-->
                                           <!--placeholder=""-->
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
                            <!-- ./ -->

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
                                        label="认证名称"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.authName }}</template>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="数据库类型"
                                >
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.authType=='01'">Mysql</span>
                                        <span v-else-if="scope.row.authType=='02'">Oracle</span>
                                        <span v-else>Sql server</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="authHostOrIp"
                                        align="center"
                                        label="IP"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        width="100"
                                        prop="authPort"
                                        align="center"
                                        label="端口"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="authDatabaseName"
                                        label="数据库名称"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="authEncoding"
                                        label="数据库编码"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="authUserSetDTO.tableName"
                                        label="数据表名"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="操作"
                                        width="100"
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
        <edit  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <check @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isCheckShow"></check>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from '../../../../../store';
    import add from "./add"
    import edit from "./edit"
    import check from "./check"
    import {codeMessage} from "../../../../../utils/codes"
    import {notifyFault} from "../../../../../utils/notify"
    import {mapGetters} from 'vuex'
    import {authList, delAuths} from "../../../../../api/SSL_VPN/new_authManager/new_auth";
    import SearchBox from '@/views/components/searchBox.vue';
    export default{
        components: {
            add,
            edit,
            check,
            SearchBox
        },
        computed: {
            ...mapGetters([
                'appRoles'
            ])
        },
        data(){
            let comBase = (rule, value, callback) => {
                if(/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位字母、数字、字符、下划线"));
                }else {
                    callback();
                }
            };
            let port = (rule, value, callback) => {
                if(/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
                                .test(value) == false){
                    callback(new Error("请输入合法端口！"));
                }else {
                    callback();
                }
            };
            let ip = (rule, value, callback) => {
                if(/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/
                                .test(value) == false){
                    callback(new Error("请输入合法IP！"));
                }else {
                    callback();
                }
            };
            let psw = (rule, value, callback) => {
                if(/^(\w){1,10}$/.test(value) == false){
                    callback(new Error("请输入1-10位字母、数字、下划线"));
                }else {
                    callback();
                }
            };
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:28,
                checkPort:false,
                rules: {
                    authName: [
                        {  required: true,validator: comBase, trigger: 'blur' }
                    ],
                    authHostOrIp: [
                        { validator: ip, trigger: 'blur' }
                    ],
                    authPort: [
                        { validator: port, trigger: 'blur' }
                    ],
                    authDatabaseName: [
                        { validator: comBase, trigger: 'blur' }
                    ],
                    authUserName: [
                        { validator: comBase, trigger: 'blur' }
                    ],
                    authPassword: [
                        { validator: psw, trigger: 'blur' }

                    ],
                    "authUserSetDTO.tableName": [
                        { validator: comBase, trigger: 'blur',required: true }
                    ],
                    "authUserSetDTO.userName":[
                        { required: true, message: '请输入数据表名', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度至少一个字符', trigger: 'blur' }
                    ],
                    "authUserSetDTO.password":[
                        { required: true, message: '请输入数据表名', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度至少一个字符', trigger: 'blur' }
                    ],
                    "authUserSetDTO.fullName":[
                        { required: true, message: '请输入数据表名', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度至少一个字符', trigger: 'blur' }
                    ],

                },
                lookInfo:{
                    authName:'',
                    authType: '',
                    authHostOrIp: '',
                    authPort: null,
                    authDatabaseName: '',
                    authEncoding:'',
                    authUserName:'',
                    authUserSetDTO:{
                        tableName:'',
                        userName:'',
                        password:'',
                        fullName:'',
                        email:'',
                        phone:''
                    }
                },
                lookVisible:false,
                activeName:'first',

                list: [],
                role: '',
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    searchContent: "",
                    type_str:'01,02,03',
                    total:0
                },
                currentData: null,
                multipleSelection: [],
                isEditShow: false,
                isAddShow: false,
                isCheckShow:false
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            onChangeStatus() {
                this.isEditShow = false;
                this.isAddShow = false;
                this.isCheckShow = false;
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
                        this.isCheckShow = true;
                    }
                }
            },

            search(event, keyword){
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                if(event.keyCode==13){
                    if(this.listQuery.searchContent!=null){
                        this.getList();
                    }
                }
            },
            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                authList(this.listQuery.currentPage,
                    this.listQuery.pageSize,
                    this.listQuery.type_str,
                    this.listQuery.searchContent
                    ).then((resp)=>{
                    this.list=resp.data;
                    this.listQuery.total=resp.extend.page.totalHits
                }).catch(err=>{

                });
            },

            singleDelete(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.delete(row.id);
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
                            message: '请选择要删除的认证！'
                        });
                        return;
                    }

                    let idArr = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        let row = this.multipleSelection[i];
                        idArr.push(row.id);
                    }
                    let id = idArr.join(',')
                    this.delete(id);
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            delete(id) {
                let information="确认删除?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                delAuths(id).then((resp)=>{
                    if(resp.status=="SUCCESS"){
                    this.$message({
                        type:'success',
                        message:'删除认证成功！'
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
                notifyFault();
            });
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize=val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage=val;
                this.getList();
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
<style lang="scss">
    .public{
        .el-form{
            .clearblock{
                .el-form-item__content{
                    font-size: 0;
                }
            }
            .put_left{
                width: 64%;
                padding-right: 20px;
            }
            .put_right{
                width: 36%;
            }
        }
    }
</style>
