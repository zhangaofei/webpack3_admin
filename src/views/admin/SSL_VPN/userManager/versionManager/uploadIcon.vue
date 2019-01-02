<template>
    <div class="uploadDialog public">
        <el-dialog title="上传图片"
                   v-loading="loading"
                   element-loading-text="图片上传中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)"
                   :visible.sync="visibleDialog"
                   custom-class="dialog public"
                   @close="closeDialog">
            <el-row :gutter="20" class="flex_center_v">

               <!-- <el-col :span="4" class="flex_right_h">
                    <span>名称</span>
                </el-col>-->

              <!--  <el-col :span="14">
                    <div style="border: 1px solid #d3dce6; padding: 5px 10px; min-height: 36px;">
                        <p v-for="item in changeAfterList" style="margin-bottom: 0;">{{ item.name }}</p>
                    </div>
                </el-col>-->
                <el-col :span="4">
                    <!--action="/api/enwas/admin/upload/img?type="+''+type-->



                </el-col>
            </el-row>

            <el-row class="set_margin_top20">
                <el-col :span="16" :offset="4">
                    <!--<p class="text_justify">注意文件大小限制在1M以内</p>-->
                    <!--选择png格式的图标文件，单个文件建议96px * 96px,服务器会自动切图。-->
                </el-col>
            </el-row>
            <el-form :model="form"  ref="form" label-width="106px" class="demo-ruleForm">
                <el-form-item label="名称" prop="">
                    <el-upload
                            ref="upload"
                            :action="UploadUrl()"
                            :auto-upload="false"
                            :multiple="true"
                            :show-file-list="false"
                            :on-change="changeFile"
                            :before-upload="beforeUpload"
                            :file-list="filelist3"
                            :on-success="onSuccess"
                            :on-error="onError"
                            :limit="1"
                            :on-exceed="onExceed"
                    >
                        <el-button slot="trigger" size="small" @click="clearFile" type="success" class="success confirm">浏览</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="版本" prop="">
                    <el-input v-model="form.version"  placeholder="版本"></el-input>
                </el-form-item>
                <el-form-item label="是否强制升级" prop="">
                    <!--<el-input v-model="form.force"  placeholder="是否强制升级" ></el-input>-->
                    <el-select v-model="form.force" placeholder="是否强制升级" class="el_sel">
                        <el-option
                                v-for="item in forceList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="">
                    <el-input v-model="form.remark"  placeholder="描述" ></el-input>
                </el-form-item>
            </el-form>
            <div class="foot" slot="footer">
                <span class="cancle btn_middle" @click="closeDialog">取消</span>
                <el-button class="primary confirm btn_middle" @click="confirmUpload" type="primary">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {


            return {
                visibleDialog: true,
                changeAfterList: [],
                filelist3: [],
                loading: false,
                uploadErr: false,
                type:'',
                form:{
                    version:0,
                    force:0,
                    remark:''
                },
                forceList: [
                    {
                        value: 0,
                        label: '否'
                    }, {
                        value: 1,
                        label: '是'
                    }
                ]
            }
        },
        watch: {
	          filelist3 (nVal, oVal) {
            	if(nVal) {
            		this.filelist3 = this.arrayUnique(this.filelist3, "name");
                }
            }
        },
        created(){

        },
        methods: {
            UploadUrl(){
                return `/api/enwas/admin/upload/package?type=0&version=${this.form.version}&force=${this.form.force}&remark=${this.form.remark}`;
            },
	        clearFile () {
		        this.$refs.upload.clearFiles();
            },
            changeFile (file, files) {
                // console.log('files',files)
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
                if (response.msg == "success") {
                  setTimeout(()=>{
                      this.loading = false;
      	              this.$emit('getList');
      	              this.closeDialog();
      	              this.$refs.upload.clearFiles();
    	                this.$message({
    		                type: 'success',
    		                message: '应用上传成功!'
    	                });
                  }, 3000);
                } else {
                  this.loading = false;
                  this.$refs.upload.clearFiles();
	                this.$message({
		                type: 'warning',
		                message: response.msg
	                });
                };
            },
            beforeUpload(file) {
                const isApp = (file.type === 'application/x-msdownload');
                console.log('file',file)
                if (!isApp) {
                    this.$message.error('请选择exe文件!');
                }
                this.loading = false;
                return isApp ;
          },
          confirmUpload() {
              if (this.changeAfterList.length == 0) {
                  this.$message({
                    type: 'warning',
                    message: '请上传应用！'
                  });
                  return;
              }
              this.loading = false;
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
            if(file.length > 1) {
                this.$message.warning('每次只能上传一个应用！');
                return
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
