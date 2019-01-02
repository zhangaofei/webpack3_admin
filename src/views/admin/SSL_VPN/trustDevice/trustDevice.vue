<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i> 用户配置</a></li>
                <li><a >用户管理</a></li>
                <li class="active">全局可信设备</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">全局可信设备</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row">
                                <div class="dataTables_length inner_head_left">
                                    &nbsp;
                                    <a  title="新建"
                                        @click="onAdd()">
                                        <i class="fa  fa-plus" > &nbsp; 新建</i>
                                    </a>
                                    &nbsp;
                                    <a @click="onMultiDel()" title="批量删除">
                                        <i class="fa fa-trash">
                                            &nbsp; 批量删除
                                        </i>
                                    </a>
                                    &nbsp;
                                    <a @click="available()"
                                       title="批量导入">
                                        <i class="fa fa-download" >
                                            &nbsp; 批量导入
                                        </i>
                                    </a>
                                    &nbsp;
                                    <a title="批量导出"
                                       @click="download(items)"
                                    >
                                        <i class="fa fa-upload" id="user_set_batch_export">
                                            &nbsp; 批量导出
                                        </i>
                                    </a>
                                </div>

                                <div id="example1_filter" class="dataTables_filter inner_head_right">
                                    <input type="text"
                                           class="form-control"
                                           placeholder="输入关键字"
                                           id="search_content"
                                           v-model="listQuery.searchContent"
                                           @keyup.enter="search($event)"
                                    />
                                    <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                    <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                        <button class="btn btn-primary" type="button" @click="getList()">
                                            <span>搜索</span>
                                        </button>
                                    </span>
                                </div>
                            </div>


                            <el-dialog
                                    title="全局可信设备批量导入"
                                    :visible.sync="uploadVisible"
                                    size="small"
                                    :before-close="handleClose"
                            >
                                <div >
                                    <el-upload
                                            class="upload-demo"
                                            ref="upload"
                                            :file-list= 'fileList'
                                            style="text-align: center"
                                            drag
                                            action="../api/admin/overallSignature/import"
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
                                                size="small" type="primary" class="primary confirm"
                                                @click="downloadModel">
                                            模板下载
                                        </el-button>
                                        <el-button
                                                class="primary confirm"
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
                                >
                                </el-table-column>
                                <el-table-column label="设备类型" align="center">
                                    <template slot-scope="scope">{{ scope.row.termType }}</template>
                                </el-table-column>

                                <el-table-column  label="硬件特征码" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.hdName}}
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        prop="remark"
                                        label="描述"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        label="操作"
                                        width="150"
                                        align="center"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onEdit(scope.row)"><i class="fa fa-pencil" ></i></a>
                                        &nbsp;
                                        <a title="删除" @click="onSingleDel(scope.row.id)"><i class="fa fa-trash"></i></a>&nbsp;

                                        <a @click="handleLook(scope.row)" title="查看" ><i class="fa fa-eye" ></i></a>&nbsp;
                                    </template>
                                </el-table-column>
                            </el-table>

                            <!---------------------------------------------->

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
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "store/index";
    import add from './add'
    import edit from './edit'
    import check from './check'
    import {getCerServerByKey} from "../../../../utils/certificateServerMap";
    import {getDeviceList,getDeviceDelete,downloadModel,downOption} from "api/SSL_VPN/trustDevice/trustDevice";
    import {groupAllList} from "api/SSL_VPN/user_new/groupApi";
    import {allUserStragetyList} from "api/new_strategy";

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

                uploadVisible:false,
                lookVisible:false,
                dialogTableVisible:false,

                role: '',
                list: [],
                total: 0,
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0,
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
                items:null
            }
        },
        computed:{

        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        methods: {
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
            available(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.uploadVisible = true;
                }
            },
            onChangeStatus(){
                this.isEditShow = false;
                this.isAddShow = false;
                this.isUpdatePwdShow = false;
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
            onEdit(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    this.isEditShow = true;
                }
            },
            handleLook(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    this.isLookShow = true;
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
            resetForm() {
                this.lookVisible=false;
            },
            download(val){
                console.log(val,'val_dowm')
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (val == null || val == '') {
                        this.$message({
                            type: 'warning',
                            message: '请选择导出的内容！'
                        });
                    } else {
                        val = val.substring(0, val.length - 1);
                        console.log('val:', val);
                        downOption({ids: val}).then(resp => {
                            console.log(resp, 'down_ok77')
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '导出成功！'
                                });
                                location.href = '../api/admin/' + resp.extend.xmlPath;
                            }
//                        else{
//                            this.$message({
//                                type: 'warning',
////                                message: resp.status
//                            });
//                        }
                        }).catch((e) => {
                            console.log(e)
                        });
                    }
                }
            },
            search(event){
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
                        console.log(deleteDTO,'ids')
                        this.delete(deleteDTO);
                    }).catch((err) => {    // 取消事件
                        console.log("删除出现问题：", err);
                        console.log("取消删除。")
                        //do nothing
                    });
                }
            },


            handleLook(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    this.isCheckShow = true;
                }
            },

            delete(deleteDTO){
                getDeviceDelete(deleteDTO).then((resp) => {
                    if (resp.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                        this.multipleSelection = [];
                        this.getList();
                    } else {

                    }
                }).catch(e => {
                    console.log("删除用户发生错误:", e);
                    this.$message({
                        type: 'warning',
                        message: '网络或者服务器故障！'
                    });
                })
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
                    }).catch(() => {    // 取消事件
                        console.log("取消删除。")
                    });
                }
            },

            getList() {
                this.listLoading = true;
                this.list = [];
                getDeviceList(this.listQuery)
                    .then(response => {
                        const data = response.data;
                        console.log(data,'data')
                        this.list = data;
                        this.listQuery.total = response.extend.page.totalHits;
                        this.listLoading = false;
                    }).catch((e) => {
                    console.log(e)
                });

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.listQuery.currentPage = val;
                this.getList();
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val,'选择')
                let arrs=[];
                for(let i in val){
                    arrs.push(val[i].id)
                }
                this.items= arrs.join(',')
                console.log(this.items,'down55')
            }
        }
    }

</script>


<style >
    .el-upload-dragger{
        margin-top: -2px!important;
        margin-left: 10px!important;
        width: 400px!important;
    }

    .user-form .el_box{
        margin-left: 158px;
    }

    .user-form .el-form-item__label {
        float: left;
        min-width:135px ;
        font-size: 15px;
        margin-left: 78px;
    }

    .user-form .el-form-item {
        margin-bottom: 17px;
    }

    .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .user-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 306px;
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

