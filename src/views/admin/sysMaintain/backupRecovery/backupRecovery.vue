<template>
    <div>
        <div class="content-header">
            <h1>
                <!--系统配置-->
                <small>
                    <!--序列号管理-->
                </small>
            </h1>
            <ol class="breadcrumb " style="left:12px">
                <li><a ><i class="fa fa-gears"></i>系统维护</a></li>
                <li class="active">备份与恢复</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">备份与恢复</h3>
                            <div class="box-tools pull-right">
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 40px; padding-top: 20px;">
                            <div class="row">
                                <div class="mail_box">
                                    <p class="set_margin_bottom20" style="font-size: 16px;">备份</p>
                                    <el-row style="margin-bottom: 20px;">
                                        <el-col>
                                            <span style="display: inline-block; height: 42px; line-height: 42px; margin-right: 20px; font-size: 16px;">将所有CASB的配置文件备份至本地服务器</span>
                                            <el-button type="primary" @click="showDialog('backup')" size="small"
                                                       class="primary"
                                                       style="width: 140px;">备份到服务器
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                    <div class="list_title set_margin_bottom20">服务器备份文件列表</div>
                                    <el-table
                                            :data="tableData"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            stripe>
                                        <el-table-column
                                                prop="filename"
                                                label="文件名"
                                                align="center"
                                                >
                                        </el-table-column>
                                        <el-table-column
                                                prop="remarks"
                                                label="备份时间"
                                                align="center"
                                                >
                                        </el-table-column>
                                        <el-table-column
                                                prop="remarks"
                                                align="center"
                                                width="150"
                                                label="操作">
                                            <template slot-scope="scope">
                                                <a title="删除" @click="singleDelete(scope.row)"
                                                   style="margin-right: 8px"><i class="fa fa-trash reset_icon_size" aria-hidden="true"></i></a>
                                                <a title="下载" @click="dowloadBackup(scope.row)"
                                                   style="margin-right:8px"><i class="fa fa-arrow-circle-o-down reset_icon_size" aria-hidden="true"></i></a>
                                                <a title="恢复" @click="restoreBackup(scope.row)"><i class="fa fa-refresh reset_icon_size" aria-hidden="true"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="foot">
                                        <el-row class="set_margin_bottom20">
                                            <el-col>
                                                <p style="margin: 0; padding: 0; font-size: 16px;">恢复</p>
                                            </el-col>
                                        </el-row>
                                        <el-row class="flex_center_v set_margin_bottom20" style="padding: 0;">
                                            <el-col :span="4" class="uploadIcon flex_center_v set_margin_right20" style="padding: 0;width:auto;">
                                                <span class="span" style="">选择本地配置文件</span>
                                            </el-col>
                                            <el-col :span="7" class="flex_center_v"  style="padding: 0; margin: 0;padding-right: 20px;">
                                                <el-input :disabled="true" v-model="filename" placeholder="选择文件"></el-input>
                                            </el-col>
                                            <el-col class="flex_center_v" :span="6" style="padding: 0; margin: 0;">
                                                <el-upload
                                                        class="upload-demo"
                                                        ref="upload"
                                                        action="/api/admin/restoreandbackup/importRestore"
                                                        :show-file-list="false"
                                                        :on-preview="handlePreview"
                                                        :auto-upload="false"
                                                        :on-remove="handleRemove"
                                                        :on-change="handlFileChange"
                                                        :on-success="onSuccess">
                                                    <el-button slot="trigger" size="small" type="success" class="success">浏览</el-button>
                                                </el-upload>
                                            </el-col>
                                        </el-row>
                                        <div>
                                            <el-button type="danger" @click="showDialog('restore')" size="small"
                                                       class="danger confirm">
                                                &nbsp;开始恢复&nbsp;</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackupConfirm
                @backupToServer="backupToServer"
                @cancleNewVlan="cancleNewVlan"
                @fileData="fileData"
                :propsA="isBackupSuccess"
                :propsB="dialogVisible"
                :propsC="type"
                :propsD="file"></BackupConfirm>
    </div>
</template>
<script>
    import BackupConfirm from "./backupConfirm";
    import {
        getBackupListData,
        backupToServerData,
        deleteRecovery,
        downloadBackupFile,
        restoreBackupFile,
        dowloadFile
    } from "../../../../api/sysMaintain/backupRecovery";

    export default {
        components: {BackupConfirm},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#fafafa'
                },
                type: '',
                file: {
                    files: null
                },
                fileList: [],
                isBackupSuccess: false,
                rules: {},
                dialogVisible: false,
                rulesEmail: {},
                sysChecked: false,
                userChecked: false,
                applyChecked: false,
                tipVisible: false,
                backupVisible: false,
                filename: '',
                filetype: '',
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    name: ''
                },
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    total: 1
                },
                tableData: [],
                isContinu: false
            }
        },
        computed: {
        },
        mounted(){
            this.getBackList();
        },
        methods: {
            handlePreview () {},
            handleRemove () {},
            resetForm(formName) {
                this.backupVisible = false;
                this.tipVisible = false;
                this.$refs[formName].resetFields();
            },
            handleSizeChange (val) {
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.pageSize = val;
                    that.getBackList();
                });
            },
            handleCurrentChange (val) {
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.cur_page = val;
                    that.getBackList();
                });
            },
            showDialog (type) {
                if (type == 'restore' && this.filename == '') {
                    this.$message({
                        message: '请先选择文件进行恢复',
                        type: 'error'
                    });
                    return false;
                }
                if (type == 'restore' && !/\.tar\.gz$/.test(this.filename)) {
                    this.$message({
                        message: '请选择.tar.gz文件进行恢复',
                        type: 'error'
                    });
                    return false;
                }
                if (this.listQuery.total >= 20 && type == 'backup') {
                    this.$message({
                        message: '备份文件已经达到20条，请删除其他备份文件后在进行备份',
                        type: 'warning'
                    });
                    return false;
                }
                this.type = type;
                this.dialogVisible = true;
            },
            backupToServer (mark) {
                if(mark){
                    this.getBackList();
                }
                return;
            },
            getBackList () { // 列表请求函数
                var that = this;
                getBackupListData().then(function (res) {
                    if(res.status == "SUCCESS"){
                        that.tableData = res.data.map(item => {
                            return {
                                id: item.id,
                                creatTime: new Date(item.creatTime).toLocaleDateString().split("/").map(item => { return item = parseInt(item) < 10 ? ("0"+item) : item}).join("/") + " " + new Date(item.creatTime).toTimeString().slice(0, 8),
                                filename: item.filename.slice(0, 8) + "_" + item.filename.slice(8),
                                remarks: item.remarks
                            }
                        });
                        that.listQuery.total = res.data.length;
                    }
                }).catch( res => {
                    this.$message({
                        type: 'error',
                        message: res.status
                    })
                })
            },
            cancleNewVlan (blen) {
                this.dialogVisible = blen;
            },
            singleDelete (row) { // 单个删除入口

                this.$confirm('删除后有可能丢失数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteList(row);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            deleteList (row) { // 单个删除

                deleteRecovery({id: row.id}).then( (res) => {
                    if(res.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getBackList();
                    };
                }).catch( (res) => {
                    this.$message({
                        type: 'error',
                        message: res.status
                    });
                })
            },
            dowloadBackup (row) { // 单个下载
                let name = row.filename.replace(/_/g,'') + '.tar.gz'

                downloadBackupFile({name: name}).then( res => {
                    if(res.status == 1){
                        window.location.href = /*'/api/admin/' + */res.data;
                        this.getBackList();
                    }
                }).catch( res => {
                    this.$message({
                        type: 'error',
                        message: res.status
                    });
                });

            },
            restoreBackup (row) { // 单个 恢复
                this.$confirm('恢复后有可能造成服务器停止运行，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    restoreBackupFile({id: row.id}).then( res => {
                        if(res.status == "SUCCESS"){
                            this.$message({
                                type: 'success',
                                message: '恢复成功!'
                            });
                            this.getBackList();
                        }
                    }).catch( res => {
                        this.$message({
                            type: 'error',
                            message: res.status
                        });
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消恢复操作'
                    });
                });
            },
            handlFileChange (file, filelist) {
                this.file.files = filelist;
                this.filename = file.name;
                this.filetype = file.type;
            },
            onSuccess (res) {
                if (String.trim(res).toLowerCase() == "success") {
                    this.getBackList();
                }
            },
            fileData () {
                this.$refs.upload.submit();
            },
            beforeUpload(file) {
                const isJPG = file.type === 'application/x-gzip';
                const isLt2M = 10*file.size / 1024 / 1024 < 20;

                if (!isJPG) {
                    this.$message.error('上传文件只能是压缩文件');
                }
                if (!isLt2M) {
                    this.$message.error('上传文件不能超过 20MB!');
                }
                return isJPG && isLt2M;
            },
        },
        components:{
            BackupConfirm
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .mail-form p {
        margin-left: 35px;
        font-size: 18px;
    }
    .mail_box {
        margin: 0 20px;
        .el-form-item__label {
            text-align: left;
        }
        .foot {
            margin-top: 40px;
            div {
                .span {
                    font-size: 15px;
                }
            }
        }
    }
</style>
<style scoped>
    .mail_box .el-form-item__label {
        text-align: left;
    }

    .mail_box .mail_form .el-form-item__content{
        width:100%;
    }
    .mail_box .mail_form .el_btn {
        position: relative;
        top: -36px;
        left: 110%;
    }
    .upload_file_box {
        position: relative;
        display: inline-block;
    }
    .upload_file{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        opacity: 0;
    }

    /*************************************/
    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .mail .dialog {
        min-width: 830px;
    }

    .mail .el-dialog__header {
        padding-left: 5px;
    }

    .mail .el_put {
        position: relative;
        display: inline-block;
        width: 50% !important;
        margin-left: 80px;
    }

    .mail .el_sel {
        width: 65% !important;
        margin-left: 80px;
    }

    .mail .el_text {
        margin-left: 158px;
    }

    .mail-form .el-form-item__label {
        float: left;
        min-width: 102px;
        font-size: 15px;
        margin-left: 78px;
    }

    .mail-form .el-form-item {
        margin-bottom: 17px;
    }

    .mail .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .mail-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0;
        position: absolute;
        top: 100%;
        left: 165px;
    }
    .el-input{
        padding: 0;
        margin: 0;
    }
    .browse_file{
        background: #13aE66;
    }
    .reset_icon_size{
        font-size: 18px;
    }
    .list_title{
        font-size: 16px;
    }
</style>
