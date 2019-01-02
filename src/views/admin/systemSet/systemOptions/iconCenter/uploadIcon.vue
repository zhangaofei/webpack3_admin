<template>
    <div class="uploadDialog public">
        <el-dialog title="上传图标"
                   v-loading="loading"
                   element-loading-text="图片上传中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)"
                   :visible.sync="visibleDialog"
                   @close="closeDialog">
            <el-row :gutter="20" class="flex_center_v">

                <el-col :span="4" class="flex_right_h">
                    <span>路径</span>
                </el-col>

                <el-col :span="12">
                    <div style="border: 1px solid #d3dce6; padding: 5px 10px; min-height: 36px;">
                        <p v-for="item in changeAfterList" style="margin-bottom: 0;">{{ item.name }}</p>
                    </div>
                </el-col>
                <el-col :span="2">
                    <el-upload
                            ref="upload"
                            action="/api/enwas/admin/upload/img"
                            :auto-upload="false"
                            :multiple="true"
                            :show-file-list="false"
                            :on-change="changeFile"
                            :before-upload="beforeUpload"
                            :file-list="filelist3"
                            :on-success="onSuccess"
                            :on-error="onError"
                            :limit="10"
                            :on-exceed="onExceed"
                    >
                        <el-button slot="trigger" class="success confirm" size="small" @click="clearFile" type="success">浏览</el-button>
                    </el-upload>
                </el-col>
            </el-row>

            <el-row>

            </el-row>
            <el-row class="set_margin_top20">
                <el-col :span="14" :offset="4">
                    <p class="text_justify">选择png格式的图标文件，单个文件建议96px * 96px,服务器会自动切图。注意单个图标文件大小限制在1M以内</p>
                </el-col>
            </el-row>
            <div class="foot" slot="footer">
                <span class="cancle btn_middle" @click="closeDialog">取消</span>
                <el-button class="primary btn_middle confirm" @click="confirmUpload" type="primary">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            dialogStatus: Boolean
        },
        name: '',
        data() {
            return {
                visibleDialog: false,
                changeAfterList: [],
                filelist3: [],
                loading: false,
                uploadErr: false,
                count: 0
            }
        },
        watch: {
            dialogStatus (nVal, oVal) {
                if(nVal) {
                    this.visibleDialog = nVal;
                }
            },
            filelist3 (nVal, oVal) {
            	if(nVal) {
            		this.filelist3 = this.arrayUnique(this.filelist3, "name");
                }
            }
        },
        methods: {
	        clearFile () {
		        this.$refs.upload.clearFiles();
            },
            changeFile (file, files) {
            	files = this.arrayUnique(files, "name");
            	this.$nextTick( () => {
		            this.changeAfterList = files;
	            })
            },
            closeDialog() {
            	this.changeAfterList = [];
	            this.$refs.upload.clearFiles();
                this.$nextTick( () => {
	                this.changeAfterList
                    this.visibleDialog = false;
                    this.$emit("closeDialogs");
                });
            },
            onSuccess(response, file, fileList) {
                if(this.count > 0) { this.count--; };
                if (String.trim(response) == "success" && !this.count) {
                    setTimeout(()=>{
      	                this.$emit('getIconList');
      	                this.closeDialog();
      	                this.$refs.upload.clearFiles();
                        this.loading = false;
    	                this.$message({
    		                type: 'success',
    		                message: '图标上传成功!'
    	                });
                    }, 2000);

                } else if(String.trim(response) != "success") {
                    this.count = 0;
                    this.$emit('getIconList');
                    this.closeDialog();
                    this.$message.error('文件：'+file.name+',' + response);
                    this.loading = false;
                };
            },
            beforeUpload(file) {
                const isJPG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 1;

                if (!isJPG) {
                    this.$message.error('请选择 PNG 格式的图标文件!');
                    this.loading = false;
                    this.changeAfterList = [];
                    this.$refs.upload.clearFiles();
                } else if (!isLt2M) {
                    this.$message.error('图片：'+ file.name +'，大小超过1MB!');
                    this.loading = false;
                    this.changeAfterList = [];
                    this.$refs.upload.clearFiles();
                };

                return isJPG && isLt2M;
            },
            confirmUpload() {
	            this.count = this.changeAfterList.length;
                if (this.changeAfterList.length == 0) {
                    return this.$message({
                        type: 'error',
                        message: '请选择文件'
                    });
                }
                this.loading = true;
                this.$refs.upload.submit();
            },
            arrayUnique (arr, name) {
                  var hash = {};
                  return arr.reduce(function (item, next) {
                    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
                    return item;
                  }, []);
            },
            onExceed (file, fileList) {
                if(file.length > 10) {
                    this.$message.error('每次上传不能超过10张，请重新选择！');
                }
            },
            onError () {
                this.loading = false;
            }
        }
    }
</script>

<style scoped>
    .public .upload-demo button{
        width: 100px;
        padding: 0;
        margin: 0;
        line-height: 33px;
    }
</style>
