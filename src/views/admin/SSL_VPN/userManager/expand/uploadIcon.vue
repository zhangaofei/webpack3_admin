<template>
    <div class="uploadDialog public">
        <el-dialog title="上传图片"
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

                <el-col :span="14">
                    <div style="border: 1px solid #d3dce6; padding: 5px 10px; min-height: 36px;">
                        <p v-for="item in changeAfterList" style="margin-bottom: 0;">{{ item.name }}</p>
                    </div>
                </el-col>
                <el-col :span="4">
                    <!--action="/api/enwas/admin/upload/img?type="+''+type-->
                    <el-upload
                            ref="upload"
                            :action="action"
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
                        <el-button slot="trigger" size="small" @click="clearFile" type="success" class="success confirm">浏览</el-button>
                    </el-upload>
                </el-col>
            </el-row>

            <el-row>

            </el-row>
            <el-row class="set_margin_top20">
                <el-col :span="16" :offset="4">
                    <p class="text_justify">注意文件大小限制在1M以内</p>
                    <!--选择png格式的图标文件，单个文件建议96px * 96px,服务器会自动切图。-->
                </el-col>
            </el-row>
            <div class="foot" slot="footer">
                <span class="cancle btn_middle" @click="closeDialog">取消</span>
                <el-button class="primary confirm btn_middle" @click="confirmUpload" type="primary">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        // props: {
        //     dialogStatus: Boolean,
        //     typeNum:Number
        // },
        name: '',
        data() {
            return {
                visibleDialog: true,
	              changeAfterList: [],
	              filelist3: [],
                loading: false,
                uploadErr: false,
                type:'',
                action:''
            }
        },
        watch: {
            // dialogStatus (nVal, oVal) {
            //     if(nVal) {
            //         this.visibleDialog = nVal;
            //     }
            // },
	          filelist3 (nVal, oVal) {
            	if(nVal) {
            		this.filelist3 = this.arrayUnique(this.filelist3, "name");
                }
            }
        },
        props:['dialogStatus','typeNum'],

        created(){
            this.action="/api/enwas/admin/upload/img?type="+this.typeNum;
        },
        methods: {
	        clearFile () {
		        this.$refs.upload.clearFiles();
            },
            changeFile (file, files) {
                console.log('changeFile',file,files)
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
                if (String.trim(response) == "success") {
                  setTimeout(()=>{
                      this.loading = false;
      	              this.$emit('getList');
      	              this.closeDialog();
      	              this.$refs.upload.clearFiles();

    	                this.$message({
    		                type: 'success',
    		                message: '图片或logo上传成功!'
    	                });
                  }, 3000);
                } else {
                  this.loading = false;
                  this.$refs.upload.clearFiles();
	                this.$message({
		                type: 'error',
		                message: file.name +' 已存在，请重新选择！'
	                });
                };
            },
            beforeUpload(file) {
	            // console.log('beforeUpload',file)
                const isJPG = (file.type === 'image/png'||file.type === 'image/jpg'||file.type === 'image/jpeg');
                const isLt2M = file.size / 1024 / 1024 < 1;
                // console.log('file',file)
                if (!isJPG) {
                    this.$message.error('请选择 PNG 或者JPG格式的图标文件!');
                }
                if (!isLt2M) {
                    this.$message.error('图标文件'+ file.name +'大小超过 1MB!');
                };
                this.loading = false;
                return isJPG && isLt2M;
          },
          confirmUpload() {
              // console.log('confirmUpload',this.changeAfterList)
          // ||this.changeAfterList[0].name.indexOf('png')==-1||this.changeAfterList[0].name.indexOf('jpg')==-1
	       //      console.log('changeAfterList',this.changeAfterList,this.changeAfterList[0].name.indexOf('png')==-1,this.changeAfterList[0].name.indexOf('jpg')==-1)
              if (this.changeAfterList.length == 0) {
                  this.$message({
                    type: 'error',
                    message: '请选择正确格式的文件'
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
              this.$message.error('每次上传不能超过1张，请重新选择！');
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
