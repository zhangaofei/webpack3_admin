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
                <li><i class="fa fa-folder-open"></i>智能DNS</li>
                <li class="active">域名管理</li>
                <li class="active">域名导入导出</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">域名导入导出</h3>
                            <div class="box-tools pull-right">
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 21px !important; height: 500px">
                            <div class="row">
                                <div class="export-form">
                                    <el-form label-width="180px">
                                        <el-form-item label="域名导入">
                                            <el-button @click="importAction" type="primary" style="background-color: #2b7de3"><i class="fa fa-download" style="margin-right: 5px;"></i>导入</el-button>
                                        </el-form-item>
                                        <el-form-item label="域名导出">
                                            <el-select v-model="domainExport" placeholder="选择导出文件" class="sel">
                                                <el-option
                                                        v-for="name in domainList"
                                                        :key="name.id"
                                                        :label="name.domainName"
                                                        :value="name.id">
                                                </el-option>
                                            </el-select>
                                            <el-button @click="exportAction(domainExport)" style="margin-left: 20px;background-color: #2b7de3" type="primary"><i class="fa fa-upload" style="margin-right: 5px;"></i>导出</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <el-dialog
                                        title="用户批量导入"
                                        :visible.sync="uploadVisible"
                                        size="small"
                                        :before-close="handleClose"
                                        style="min-width: 600px;"
                                >
                                    <div >
                                        <el-upload
                                                class="upload-demo"
                                                ref="upload"
                                                :file-list= 'fileList'
                                                style="text-align: center"
                                                drag
                                                action="../api/dns/dnsRecord/import"
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {exportDomain,getDomainNameList,downloadModel} from 'api/enDNS/domainAdmin';
    export default {
        components: {},
        data() {
            return {
                domainExport:'',
                domainList:[],
                uploadVisible:false,
                fileList:[],
            }
        },

        computed: {},
        created(){
            this.getDomainList();
        },
        methods: {
            getDomainList(){
                getDomainNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.domainList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            importAction(){
                this.uploadVisible = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })

            },
            //模板下载
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
            uploadSuccess:function(response){
                if(response.status=='SUCCESS'){
                    if(response.extend.failXmlPath!=''&& response.extend.failXmlPath!= null){
                        this.downloadFailXml(response.extend.failXmlPath)
                        this.$message({
                            type:'warning',
                            message:'部分信息导入失败，请查看xml文件'
                        });
                        this.$refs.upload.clearFiles()
                        this.uploadVisible = false

                    }else{
                        this.$refs.upload.clearFiles()
                        this.uploadVisible = false;
                            this.$message({
                                type:'success',
                                message:'域名导入成功'
                            });
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

            },
            handleRemove(file, fileList) {

            },
            submitUpload(){
                this.$refs.upload.submit();
            },
            exportAction(val){
                if (val == null || val == '') {
                    this.$message({
                        type: 'warning',
                        message: '请选择要导出的文件！'
                    });
                } else {
                    exportDomain({domainId: val}).then(resp => {
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

        }
    };
</script>
<style>
    .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 450px;
    }
</style>

