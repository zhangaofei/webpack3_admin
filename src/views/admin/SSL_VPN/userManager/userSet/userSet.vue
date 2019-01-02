<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i>用户管理</a></li>
                <li><a >用户设置</a></li>
                <li class="active">用户设置</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">用户设置</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                    <el-col :span="15" style="margin-left: 10px;">
                                        &nbsp;
                                        <a class="function_btn_main" title="新建"
                                            @click="onAdd('add')">
                                            <i class="fa  fa-plus" > 新建</i>
                                        </a>
                                        <a class="function_btn_main" @click="onMultiDel()" title="批量删除">
                                            <i class="fa fa-trash"> 批量删除</i>
                                        </a>
                                        <a class="function_btn_main" @click="onAdd('import')"
                                           title="用户批量导入">
                                            <i class="fa fa-download" > 用户批量导入
                                            </i>
                                        </a>
                                        <a class="function_btn_main" title="用户批量导出"
                                           @click="download(items)"
                                        >
                                            <i class="fa fa-upload" id="user_set_batch_export"> 用户批量导出
                                            </i>
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
                                        <!--<button class="btn btn-primary" type="button" @click="getList()">-->
                                            <!--<span>搜索</span>-->
                                        <!--</button>-->
                                    <!--</span>-->
                                <!--</div>-->
                            </div>


                            <el-dialog
                                title="用户批量导入"
                                :visible.sync="uploadVisible"
                                size="small"
                                :before-close="handleClose"
                                custom-class="custom_dialog_class public minWidth600"
                                style="min-width: 600px;"
                            >
                                <div >
                                    <el-upload
                                            class="upload-demo"
                                            ref="upload"
                                            :file-list= 'fileList'
                                            style="text-align: center"
                                            drag
                                            action="../api/admin/user/import"
                                            :multiple="false"
                                            :limit="1"
                                            name="file"
                                            :with-credentials="true"
                                            :on-success="uploadSuccess"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :auto-upload="false"
                                            accept="excel">
                                        <i class="el-icon-upload"></i>
                                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                        <div style="margin-bottom: 5px" class="el-upload__tip" slot="tip">只能上传xls或xlsx格式的文件</div>

                                    </el-upload>

                                </div>

                                <div class='form-footer ' slot="footer" >
                                    <div class="foot">
                                        <el-button
                                        size="small" type="primary" class="primary confirm btn_middle"
                                        @click="downloadModel">
                                        模板下载
                                        </el-button>
                                        <el-button
                                                class="primary confirm btn_middle"
                                                type="primary"
                                                style="width:140px!important;"
                                                @click="submitUpload">
                                            上传到服务器
                                        </el-button>
                                    </div>
                                </div>
                            </el-dialog>
                            <!------------------------------------------------------------------------------------------->
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
                                <el-table-column label="用户名" align="center">
                                    <template slot-scope="scope">{{ scope.row.userName }}</template>
                                </el-table-column>

                                <el-table-column  label="用户组" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.groupName!=null? scope.row.groupName:"-" }}
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        prop="fullName"
                                        label="用户全名"
                                        align="center"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{ scope.row.fullName!=''? scope.row.fullName:"-" }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="status"
                                        align="center"
                                        label="用户状态"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        label="认证服务器"
                                        align="center"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{ getCerServerName(scope.row.authType)}}
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="操作"
                                        width="150"
                                        align="center"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onEdit(scope.row, 'edit')"><i class="fa fa-pencil" ></i></a>
                                        &nbsp;
                                        <a title="删除" @click="onSingleDel(scope.row.id,scope.row.userName)"><i class="fa fa-trash"></i></a>&nbsp;

                                        <a @click="onEdit(scope.row, 'check')" title="查看" ><i class="fa fa-eye" ></i></a>&nbsp;

                                        <a @click="onEdit(scope.row, 'pwd')" title = "修改密码"><i class ="fa fa-lock"></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <!---------------------------------------------->

                            <div class="row" style="margin-top:8px;" >
                                <div class="block" style="margin-right: 2%;float: right" >
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="listQuery.cur_page"
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
        <updatePwd @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="isUpdatePwdShow"/>
        <check @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="isCheckShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import add from './add'
    import edit from './edit'
    import check from './check.vue'
    import updatePwd from './updatePwd'
    import {codeMessage} from "../../../../../utils/codes";
    import {deepCopy} from "utils/ObjectCopy";
    import {notifyFault} from "../../../../../utils/notify";
    import {getCerServerByKey} from "../../../../../utils/certificateServerMap";
    import {delClientUser, userList,downOption, downloadModel} from "../../../../../api/SSL_VPN/user_new/userApi";
    import {groupAllList} from "../../../../../api/SSL_VPN/user_new/groupApi";
    import {allUserStragetyList} from "../../../../../api/new_strategy";
    import SearchBox from '@/views/components/searchBox.vue';

    export default{
        components: {
            add,
            edit,
            updatePwd,
            check,
            SearchBox
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:19,
                 fileList:[],
                rules: {
                    userName: [
                        { required: true, message: '请输入用户组名称', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'change' }
                    ]

                },

                lookInfo:{
                    groupName:'',
                    ruleName:'',
                    ruleId:'',
                    groupId:'',
                    userName:'',
                    fullName:'',
                    tel:'',
                    email:'',
                    isSyncGroupRule:false,
                    status:'Enabled',
                },
                role: '',
                list: [],
                total: 0,
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    total:0,
                    isAdmin: '',
                    display_name: '',
                    phone: '',
                    name: '',
                    searchContent:null
                },
                groupList:[],
                userStrategy:[],
                currentData: null,
                multipleSelection:[],
                isEditShow: false,
                isAddShow: false,
                isUpdatePwdShow:false,
                isCheckShow: false,
                uploadVisible:false,
                items:null
            }
        },
        computed:{

        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
            this.getGroupList();
        },
        methods: {
            isAvailable(row){
                if (row.userName=='third_user'){
                    return false;
                }
                return true;
            },
            downloadModel(){
                downloadModel().then(resp => {
                    if (resp.status == 'SUCCESS') {
                        location.href = '../api/admin/' + resp.extend.xmlPath;
                        this.$message({
                            type: 'success',
                            message: '模板下载成功！'
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            onChangeStatus(){
                this.isEditShow = false;
                this.isAddShow = false;
                this.isUpdatePwdShow = false;
                this.isCheckShow = false;
                this.getList();
            },
            onAdd(type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'add'){
                        this.isAddShow = true;
                    } else {
                        this.uploadVisible = true;
                    }
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
                    } else if(type == 'check'){
                        this.isCheckShow = true;
                    } else {
                        this.isUpdatePwdShow = true;
                    }
                }
            },
            getCerServerName(key){
                return getCerServerByKey(key);
            },
            getUserStrategy(){
                allUserStragetyList().then(resp=>{
                    if(resp.status=='SUCCESS'){
                        this.userStrategy=resp.data;
                    }
                }).catch(err=>{

                })
            },

            uploadSuccess:function(response){
                if(response.status=='SUCCESS'){
                    if(response.extend.failXmlPath!=''&& response.extend.failXmlPath!= null){
                     this.downloadFailXml(response.extend.failXmlPath)
                        this.$message({
                            type:'warning',
                            message:'部分信息导入失败，请查看xml文件'
                        });
                        this.getList();
                        this.$refs.upload.clearFiles()
                     this.uploadVisible = false

                    }else{
                        this.getList();
                        this.$refs.upload.clearFiles()
                        this.uploadVisible = false
                    }

                }else{
                    this.$message({
                        type:'warning',
                        message:response.code.info
                    });
                    this.getList();
                    this.$refs.upload.clearFiles()
                    this.uploadVisible = false
                }
            },
            downloadFailXml(url){
                let dUrl = '/api/admin/'+url
                location.href= dUrl
            },
            uploadError:function(err){
                this.$message({
                    type:'warning',
                    message:'文件上传失败'
                });
            },

            handlePreview(file) {
                console.log('file:', file);
            },
            handleRemove(file, fileList) {

            },
            submitUpload(){
                this.$refs.upload.submit();
            },

            download(val){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (val == null || val == '') {
                        this.$message({
                            type: 'warning',
                            message: '请选择导出内容！'
                        });
                    } else {
                        val = val.substring(0, val.length - 1);
                        downOption({ids: val}).then(resp => {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '导出成功！'
                                });
                                location.href = '../api/admin/' + resp.extend.xmlPath;
                            }
                        else{
                            this.$message({
                                type: 'warning',
                                message: resp.code.info
                            });
                        }
                        }).catch((e) => {
                            console.log(e)
                        });
                    }
                }
            },
            search(event, keyword){
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                if (event.keyCode == 13) {
                    if (this.listQuery.searchContent != null) {
                        this.getList();
                    }
                }
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
                            message: '请选择要删除的用户！'
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
                    }).catch((err) => {    // 取消事件

                    });
                }
            },

            delete(deleteDTO){
                delClientUser(deleteDTO).then((resp) => {
                    if (resp.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '删除用户成功！'
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
                    console.log("删除用户发生错误:", e);
                    this.$message({
                        type: 'warning',
                        message: '网络或者服务器故障！'
                    });
                })
            },

            onSingleDel(id, name){
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
                    }).catch(() => {    // 取消事件
                        console.log("取消删除。")
                    });
                }
            },
            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                this.listLoading = true;
                this.list = [];
                userList(this.listQuery.cur_page,
                        this.listQuery.pageSize,
                        this.listQuery.searchContent)
                        .then(response => {
                            const data = response.data;
                            this.list = data;
                            this.listQuery.total = response.extend.page.totalHits;
                            this.listLoading = false;
                        }).catch((e) => {
                    console.log(e)
                });

            },
            getGroupList() {
                this.listLoading = true;
                this.groupList = [];
                groupAllList(this.listQuery).then(response => {
                    const data = response.data;
                    this.groupList = data;
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.cur_page = val;
                this.getList();
            },
            handleClose() {
                this.$confirm('确认关闭？')
                        .then(_ => {
                            done();
                        })

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                let arrs=[];
                for(let i in val){
                    arrs.push(val[i].id)
                }
                this.items= arrs.join(',')
            }
        }
    }

</script>


<style>
    .el-upload-dragger{
        margin-top: -2px!important;
        margin-left: 10px!important;
        width: 400px!important;
    }

    .minWidth600{
        min-width: 600px;
    }

</style>
<style scoped="scoped" lang="scss">
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
    .el-upload-dragger{
        margin-left: 0;
    }

</style>
<style lang="scss">
    .public{
        .user_form{
            .el-form{
                .form_item{
                    .el-form-item__content{
                        font-size: 0;//清除inline-block的空隙
                        -webkit-text-size-adjust:none;
                        .half_sel{
                            width:36%;;padding-right:20px
                        }
                        .half_put{
                            width: 64%
                        }
                    }

                }

            }
        }

    }
</style>

