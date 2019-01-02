<template>
    <div>
        <section class="content-header">
            <h1>

                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user-md"></i> 系统管理</a></li>
                <li class="active">系统设置</li>
                <li class="active">系统参数配置</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">系统参数配置</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row">
                                <el-col :span="15" class="dataTables_length inner_head_left">
                                    &nbsp;
                                    <a title="新建" @click="onAdd" v-if="false">
                                        <i class="fa  fa-plus" id="user_group_set_new_add">&nbsp;&nbsp;新建</i>
                                    </a>
                                    &nbsp;
                                    <a  title="批量删除" @click="multipleDelete()" v-if="false">
                                        <i class="fa fa-trash-o"  id="user_group_set_batch_del">&nbsp;批量删除</i>
                                    </a>
                                    &nbsp;
                                </el-col>
                                <el-col :span="8" style="text-align: right; margin: 20px 16px 30px 0; float: right;">
                                    <SearchBox
                                            width="60px"
                                            inputBoxId="search_content"
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
                                    v-loading="loadingServer"
                                    element-loading-text="服务重启中"
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.8)"
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
                                    <template slot-scope="scope">
                                        <!--{{ scope.row.name}}-->
                                        <span v-if="scope.row.name=='update'">更新</span>
                                        <span v-else-if="scope.row.name=='hash_name'">泛域名</span>
                                        <span v-else-if="scope.row.name=='login_name'">https登录域名</span>
                                        <span v-else-if="scope.row.name=='http_login_name'">http登录域名</span>
                                        <span v-else-if="scope.row.name=='smart_link_support'">链路解析</span>
                                        <span v-else-if="scope.row.name=='certficate'">证书</span>
                                        <span v-else>{{scope.row.name}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="系统参数"
                                        align="center"
                                >
                                    <template slot-scope="scope">

                                        <span v-if="scope.row.value=='1'">开启</span>
                                        <span v-else-if="scope.row.value=='0'">关闭</span>
                                        <span v-else>{{ scope.row.value}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="描述"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.remark}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip
                                        width="150"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onHandle(scope.row, 'edit')" style="margin-right:8px"><i class="fa fa-pencil" ></i></a>
                                        <span v-if="scope.row.canDelete == '1'">
                                            <a title="删除" @click="deleteItem(scope.row)" style="margin-right: 8px" ><i class="fa fa-trash-o"></i></a>
                                        </span>
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
                            <div class="el_dialog">
                                <el-dialog
                                        :title="certificateType == 'edit' ? '编辑证书':'查看证书'"
                                        :visible.sync="certificateDialog"
                                        @close="handleCloseCertificate()"
                                        size="small"
                                        custom-class="dialog public"
                                        top="10%">
                                    <el-form :model="certificateInfo" :rules="certificateRules" label-width="142px" class="config-form" ref="info">
                                        <el-form-item v-if="certificateType == 'edit'" label="证书">
                                            <el-row>
                                                <el-col :span="15">
                                                    <el-input readonly placeholder="请选择证书文件" v-model="certificateFileName"></el-input>
                                                </el-col>
                                                <el-col :span="8" :offset="1">
                                                    <el-upload
                                                            class="upload-demo"
                                                            ref="uploadCertificate"
                                                            :data="{type: 'cert'}"
                                                            action="/api/admin/cert/import"
                                                            :before-upload="handleBeUpCertificate"
                                                            :show-file-list="false"
                                                            :on-change="onChangeCertificate"
                                                            accept="pem"
                                                            :file-list="certificateFileList"
                                                            :on-success="certificateOnSuccess"
                                                            :auto-upload="false">
                                                        <el-button :disabled="certificateType=='check'" slot="trigger" size="small" class="success" type="success">浏览</el-button>
                                                    </el-upload>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                        <el-form-item v-if="certificateType == 'edit'" label="秘钥">
                                            <el-row>
                                                <el-col :span="15">
                                                    <el-input readonly placeholder="请选择秘钥文件" v-model="secretKeyFileName"></el-input>
                                                </el-col>
                                                <el-col :span="8" :offset="1">
                                                    <el-upload
                                                            class="upload-demo"
                                                            ref="upload"
                                                            action="/api/admin/cert/import"
                                                            :data="{type: 'key'}"
                                                            :before-upload="handleBeUpSecretKey"
                                                            :show-file-list="false"
                                                            :on-change="onChangeSecretKey"
                                                            :on-success="secretOnSuccess"
                                                            accept="pem"
                                                            :file-list="secretFileList"
                                                            :auto-upload="false">
                                                        <el-button :disabled="certificateType=='check'" slot="trigger" size="small" class="success" type="success">浏览</el-button>
                                                    </el-upload>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                        <el-form-item v-if="certificateType == 'edit'" label="密码">
                                            <el-row>
                                                <el-col :span="15">
                                                    <el-input placeholder="请输入密码" v-model="password"></el-input>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                        <el-form-item label="" v-if="certificateType==''" style="margin-bottom: 0;">
                                            <div>只能上传pem文件，且不超过1024kb</div>
                                        </el-form-item>
                                        <el-form-item label="过期时间" v-if="certificateType == 'add'">
                                            <span>{{certificateRow.time || '暂无'}}</span>
                                        </el-form-item>
                                        <el-form-item label="证书详情" v-if="certificateType == 'check'">
                                            <pre>{{certificateRow.value}}</pre>
                                        </el-form-item>
                                    </el-form>
                                    <div class='form-footer ' slot="footer">
                                        <div  class="foot">
                                            <span class="cancle btn_middle" @click="handleCloseCertificate">取消</span>
                                            <el-button
                                                    type="primary"
                                                    v-show="certificateType == 'edit'"
                                                    class="primary confirm btn_middle"
                                                    @click="submitCertificateInfo('info')">
                                                确定
                                            </el-button>
                                        </div>
                                    </div>
                                </el-dialog>
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
    import {isReadonly} from "@/utils/permissionUtil";
    import {getSystemConfigList,deleteSystemConfigList} from 'api/enWAS/systemConfig';
    import {getRestartServer} from "@/api/sysMaintain/sysOperation";
    import add from './add'
    import update from './update'
    import look from './look'
    import SearchBox from '@/views/components/searchBox.vue';
    import { fetch } from 'utils/fetch';

    export default {
        name: 'adminResource',
        components: {add, update,look, SearchBox},
        data() {
            return {
                password: '',
                secretFileList: [],
                certificateFileList: [],
                secretKeyFile: [],
                certificateFile: [],
                secretKeyFileName: '',
                certificateFileName: '',
                certificateDialog: false,
                certificateType: '',
                certificateRules: {
                    name: [
                        {required: true, message: '请输入证书泛域名', trigger: 'blur'}
                    ]
                },
                certificateInfo: {
                    lastTime: '2035-12-29',
                    details: '测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据'
                },
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:119,
                list: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    page_size: 10,
                    name: '',
                    total:0
                },
                currentView: null,
                currentData: null,
                isEditShow: false,
                isAddShow: false,
                isLookShow:false,
                checkedItems:[],
                certStatus: '',
                secretStatus: '',
                certificateRow: null,
                loadingServer: false
            }
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            handleCloseCertificate () {
                this.certificateDialog = false;
            },
            certificateOnSuccess (response, file, fileList) {
                this.certStatus = response;
                console.log(response, file, fileList);
                if(response.status.toLowerCase() == 'success') {
                    this.$refs.upload.submit();
                }
            },
            secretOnSuccess (response, file, fileList) {
                console.log(response, file, fileList);
                if(response.status.toLowerCase() == 'success') {
                    let formData = new FormData();
                    formData.append('password', this.password)
                    fetch({
                        method: 'post',
                        url: '/api/admin/cert/submit',
                        body: formData
                    }).then(res => {
                        if(res.status.toLowerCase() == 'success') {
                            this.$message.success('上传证书成功');
                            let value = '证书密码是：'+res.extend['password'] + ' \r\n证书开始时间：'+res.extend['start-time'] + ' \r\n证书结束时间：'+res.extend['end-time'];
                            this.$set(this.certificateRow, 'time', '过期时间：' + res.extend['end-time']);
                            this.$set(this.certificateRow, 'value', value);
                            this.updateCertificate(this.certificateRow);
                            this.certificateDialog = false;
                        } else {
                            this.$message.error(res.code.info);
                        };
                        this.secretKeyFileName = '';
                        this.certificateFileName = '';
                        this.password = '';
                    }).catch(err => {
                        this.$message.error('上传证书失败');
                    })
                }
            },
            updateCertificate (row) {
                if(!this.certificateRow) return this.$message.error('暂无证书数据');
                fetch({
                    url: '/api/enwas/system/modify',
                    method: 'post',
                    body: {
                        id: row.id,
                        name: row.name,
                        remark: row.remark,
                        value: row.value,
                        time: row.time
                    }
                }).then(res => {
                    this.loadingServer = true;
                    getRestartServer({timeout: 3000}).then(res => {
                        this.loadingServer = false;
                        this.$message.success("服务重启成功！")
                        this.getList();
                    }).catch(err => {
                        this.loadingServer = false;
                        this.getList();
                        this.$message.warning("服务正则重启，您可以手动刷新页面！")
                    });
                    console.log('证书更新成功');
                }).catch(error => {this.$message.error(error)});
            },
            submitCertificateInfo () {
                this.$refs.uploadCertificate.submit();
            },
            handleBeUpSecretKey (file) {
                let fileType = file.name.indexOf('.pem') != -1 ? true : false;
                let fileSize = file.size / 1024 / 1024 <= 1 ? true : false;
                if (!fileType) {
                    this.secretKeyFileName = '';
                    this.$message.error('秘钥文件必须是pem文件, 请重新选择！');
                } else if (!fileSize) {
                    this.secretKeyFileName = '';
                    this.$message.error('秘钥文件超过1024kb, 请重新选择！');
                };
                return fileType && fileSize;
            },
            handleBeUpCertificate (file) {
                let fileType = file.name.indexOf('.pem') != -1 ? true : false;
                let fileSize = file.size / 1024 / 1024 <= 1 ? true : false;
                if (!fileType) {
                    this.certificateFileName = '';
                    this.$message.error('证书文件必须是pem文件, 请重新选择！');
                } else if (!fileSize) {
                    this.certificateFileName = '';
                    this.$message.error('证书文件超过1024kb, 请重新选择！');
                };
                return fileType && fileSize;
            },
            onChangeSecretKey (file, fileList) {
                this.secretKeyFileName = file.name;
            },
            onChangeCertificate (file, fileList) {
                this.certificateFileName = file.name;
            },
            onChangeStatus(){
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.getList();
            },
            onAdd(){
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isAddShow = true;
                }
            },
            onHandle(row, type){
                if(row.name == 'certficate') {
                    this.certificateRow = row;
                    this.certificateDialog = true;
                    this.certificateType = type;
                    return;
                }
                if (this.readOnly == true) {
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
                this.listQuery.name = keyword != undefined ? keyword : this.listQuery.name;
                getSystemConfigList(this.listQuery).then(response => {
                    const data = response.data.items;
                    if (data.page_count > 0) {
                        this.list = data.res;
                    } else {
                        this.list = [];
                        this.listQuery.total = 0;
                    }
                    this.listQuery.total = data.page_count;
                })
            },
            search(event, keyword){
                this.listQuery.name = keyword != undefined ? keyword : this.listQuery.name;
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
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.checkedItems.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的系统参数配置！'
                        });
                        return;
                    }
                    let id = [];
                    for (let i = 0; i < this.checkedItems.length; i++) {
                        id.push(this.checkedItems[i].id);
                    }
                    this.$confirm('确认删除' + this.checkedItems.length + '项?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteSystemConfigList({id: id}).then(response => {
                            this.getList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'warning',
                            message: '已取消删除'
                        });
                    });
                }
            },
            deleteItem(row) {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let id = [];
                    id.push(row.id);
                    this.$confirm('确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteSystemConfigList({id: id}).then(response => {
                            this.getList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'warning',
                            message: '已取消删除'
                        });
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
