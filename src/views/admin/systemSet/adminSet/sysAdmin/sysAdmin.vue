<template>
    <div>
        <section class="content-header">
            <h1>

                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user-md"></i>系统管理</a></li>
                <li><a >管理员设置</a></li>
                <li class="active">系统管理员</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12" style="">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">系统管理员</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                    <el-col :span="15" style="margin-left: 10px;">
                                        &nbsp;
                                        <span v-if="name=='admin'">
                                            <a class="function_btn_main" title="" @click="onAdd">
                                                <i class="fa fa-plus" > 新建</i>
                                            </a>
                                            <a class="function_btn_main" title="批量删除" @click="multipleDelete()">
                                                <i class="fa fa-trash" > 批量删除</i>
                                            </a>
                                        </span>&nbsp;
                                    </el-col>

                                    <el-col :span="8" style="margin-right: 16px; float: right;">
                                        <SearchBox
                                                width="60px"
                                                searchBoxId="example1_filter"
                                                placeholder="请输入关键字"
                                                @search="search"
                                                @onClickSearchButton="getList"></SearchBox>
                                        <!--<input type="text"-->
                                               <!--class="form-control"-->
                                               <!--placeholder="请输入关键字"-->
                                               <!--v-model="listQuery.search_content"-->
                                               <!--@keyup.enter="search($event)">-->
                                        <!--<span class="glyphicon glyphicon-search serch_head_icon"></span>-->
                                        <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                                <!--<button class="btn btn-primary" type="button" @click="getList()">-->
                                                    <!--<span>搜索</span>-->
                                                <!--</button>-->
                                        <!--</span>-->
                                    </el-col>
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
                                        :selectable="isAvailable"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="用户名"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.userName }}</template>
                                </el-table-column>
                                <el-table-column
                                        prop="roleName"
                                        label="用户角色"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        width="200"
                                        prop="email"
                                        label="邮件"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="tel"
                                        label="手机"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="ip"
                                        label="准入IP"
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
                                        <!--角色判断-->
                                        <span v-if="roleName=='超级管理员'">
                                            <a title="" @click="onEdit(scope.row, 'edit')"
                                               style="margin-right:8px"><i class="fa fa-pencil" :disabled="true"></i></a>
                                            <span v-if="scope.row.roleName=='超级管理员'?false:true">
                                                <a title="" @click="singleDelete(scope.row)" style="margin-right: 8px"><i
                                                        class="fa fa-trash"></i></a>
                                            </span>
                                            <a title="" @click="onEdit(scope.row, 'mod')"
                                               style="margin-right:8px"><i class="fa fa-lock"></i></a>
                                            <a title="" @click="onEdit(scope.row, 'check')"><i class="fa fa-eye"></i></a>
                                        </span>

                                        <span v-else>
                                            <span v-if="scope.row.userName==name">
                                                <a title="" @click="onEdit(scope.row, 'edit')"
                                                   style="margin-right:8px"><i class="fa fa-pencil"></i></a>
                                                <span v-if="scope.row.roleName=='超级管理员'?false:true">
                                                    <a title="" @click="singleDelete(scope.row)" style="margin-right: 8px"><i
                                                            class="fa fa-trash"></i></a>
                                                </span>
                                                <a title="" @click="onEdit(scope.row,'mod')"
                                                   style="margin-right:8px"><i class="fa fa-lock"></i></a>
                                                <el-button type="text" @click="onEdit(scope.row, 'check')" class="btn_color"><i class="fa fa-eye"></i></el-button>
                                            </span>
                                            <span v-else="">
                                                <span v-show="true">
                                                    <el-button type="text"  @click="onEdit(scope.row, 'edit')" :disabled="true" class="btn_color" style="">
                                                        <i class="fa fa-pencil"></i></el-button>
                                                    <span v-if="scope.row.roleName=='超级管理员'?false:true" style="margin-right: 8px;">
                                                        <el-button type="text"  @click="singleDelete(scope.row)" :disabled="true" class="btn_color"><i class="fa fa-trash"></i></el-button>
                                                    </span>
                                                    <el-button type="text"  @click="onEdit(scope.row, 'mod')" :disabled="true" class="btn_color" style="margin-right: 5px;"><i class="fa fa-lock"></i></el-button>
                                                    <el-button type="text" @click="onEdit(scope.row, 'check')"  class="btn_color" style="margin-left: 0;"><i class="fa fa-eye"></i></el-button>
                                                </span>
                                            </span>

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

        </section>
        <add @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <edit @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <look @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isLookShow"/>
        <modPsw @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isPswShow"/>
    </div>
</template>


<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import {codeMessage} from "../../../../../utils/codes";
    import {notifyFault} from "../../../../../utils/notify";
    import {mapGetters} from 'vuex'
    import add from './add'
    import edit from './edit'
    import modPsw from './modPsw'
    import look from './look'
    import {deleteAdmin, getAdminList, getPower} from "../../../../../api/systemSet/new_adminSet/new_sysAdmin";
    import SearchBox from '@/views/components/searchBox.vue';
    export default{
        components: {
            add,
            edit,
            modPsw,
            look,
            SearchBox
        },
        data(){
            var validatePass = (rule, value, callback) => {

                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (/^(\w){6,20}$/.test(value) == false) {
                        callback(new Error("请输入6-20位字母、数字、下划线"));
                    }
                    if (this.addInfo.repassword !== '') {
                        this.$refs.addInfo.validateField('repassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addInfo.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var modPass1 = (rule, value, callback) => {

                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (/^(\w){6,20}$/.test(value) == false) {
                        callback(new Error("请输入6-20位字母、数字、下划线"));
                    }
                    if (this.pswInfo.conpassword !== '') {
                        this.$refs.pswInfo.validateField('conpassword');
                    }
                    callback();
                }
            };
            var modPass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.pswInfo.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var name = (rule, value, callback) => {
                if (/^[\u4e00-\u9fa5]{0,10}/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    callback();
                }
            };
            var tel = (rule, value, callback) => {
                if (/^(13|14|15|18|17)[0-9]{9}$/.test(value)== false) {
                    callback(new Error('请输入11位电话'));
                } else {
                    callback();
                }
            };

            var email = (rule, value, callback) => {
                if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value) == false) {
                    callback(new Error('请输正确输入邮箱'));
                } else {
                    callback();
                }
            };
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                currentView: null,
                currentData: null,
                checkListPort: [],
                isShow: false,
                isShowSub: false,
                rules: {
                    userName: [
                        {validator: name, trigger: 'blur'},
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    repassword: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    roleName: [
                        {required: true, message: '请输入用户角色', trigger: 'change'}
                    ],
                    email: [
                        {validator: email, trigger: 'blur'}
                    ],

                    tel: [
                        {validator: tel, trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请输入状态', trigger: 'blur'}
                    ],
                },

                rulesMod: {
                    password: [
                        {validator: modPass1, trigger: 'blur'}
                    ],
                    conpassword: [
                        {validator: modPass2, trigger: 'blur'}
                    ],
                },
                lookVisible: false,
                list: [],
                arrs: [],
                role: '',
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    page_size: 10,
                    search_content: "",
                    total:0
                },
                multipleSelection: [],
                isEditShow: false,
                isAddShow: false,
                isPswShow: false,
                isLookShow:false,
                readOnly:false,
                pageId:11
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'roleName'
            ])
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
            this.powerList();
        },
        methods: {
            // zaf(val,val2){
            //   console.log('val',val)
            // },
            isAvailable(row){
                if (row.roleName=='超级管理员'){
                    return false;
                }
                return true;
            },
            onChangeStatus(){
                this.isPswShow = false;
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.getList();
            },
            powerList() {
                getPower().then(response => {
                    this.arrs = response.data
                }).catch((e) => {
                    console.log(e);
                })

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
                    console.log('row_rw',row)
                    if(type == 'edit'){
                        this.isEditShow = true
                    } else if(type == 'check'){
                        this.isLookShow = true
                    } else {
                        this.isPswShow = true;
                    }
                }
            },

            getList(keyword) {
                this.listQuery.search_content = keyword != undefined ? keyword : this.listQuery.search_content;
                getAdminList(this.listQuery.cur_page, this.listQuery.page_size, this.listQuery.search_content).then((resp)=> {
                    this.list = resp.data;
                    this.listQuery.total = resp.extend.page.totalHits
                }).catch(err=> {

                });
            },

            search(event, keyword){
                this.listQuery.search_content = keyword != undefined ? keyword : this.listQuery.search_content;
                if (event.keyCode == 13) {
                    if (this.listQuery.search_content != null) {
                        this.getList();
                    }
                }
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
                            message: '请选择要删除的管理员！'
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
                let information = "确认删除此管理员?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteAdmin(id).then((resp)=> {
                        if (resp.status == "SUCCESS") {
                            this.$message({
                                type: 'success',
                                message: '删除成功！'
                            });
                            this.multipleSelection = [];
                            this.getList();
                        } else {

                        }
                    }).catch((err)=> {
                        console.log("删除用户发生错误:", err);
                    });
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });

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
