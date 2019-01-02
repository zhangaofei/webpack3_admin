<template>
    <div class="public">
        <el-dialog
                :title="type == 'add' ? '新建-应用库' : type=='edit' ? '编辑-应用库': '查看-应用库'"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <div class="dialog_body">
                <el-form :model="dataJson" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="应用名称" prop="app_name">
                        <el-input :disabled="type=='view'" v-model="dataJson.app_name" placeholder="填写应用名称"></el-input>
                    </el-form-item>
                    <el-form-item label="说明" prop="description">
                        <el-input :disabled="type=='view'" v-model.trim="dataJson.description" placeholder="填写描述说明"></el-input>
                    </el-form-item>
                    <el-form-item label="应用URL" prop="url">
                        <el-input :disabled="type=='view'" type="textarea" placeholder="一行填写一个URL地址，不同URL地址用换行符区分" v-model.trim="dataJson.url"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="foot">
                    <span class="cancle" @click="handleClose">取 消</span>
                    <el-button class="primary confirm btn_middle" v-if="type!='view'" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {fetch} from 'utils/fetch';

    export default {
        name: "appLibraryInfo",
        props: {
            dataJson: Object,
            visibleDialog: Boolean,
            type: String
        },
        data () {
            return {
                dialogVisible:false,
                rules: {
                    app_name: [
                        { required: true, message: '请输入应用名称', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请输入应用URL', trigger: 'blur' }
                    ]
                }
            }
        },
        watch: {
            visibleDialog (n, o) {
                if(n) this.dialogVisible = n;
            }
        },
        methods: {
            handleClose () {
                this.dialogVisible = false;
                this.$parent.visibleDialog = false;
                this.$refs['ruleForm'].resetFields();
            },
            submitForm(formName) {
                let app_urls = this.dataJson.url.replace(/[\r\n]+/g, ',').split(",");
                let json = null;
                this.$set(this.dataJson, 'app_urls', )
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.type == 'add') {
                            json = {
                                app_name: this.dataJson.app_name,
                                description: this.dataJson.description,
                                app_urls: app_urls
                            }
                        } else if (this.type == 'edit') {
                            json = {
                                id: this.dataJson.id,
                                app_name: this.dataJson.app_name,
                                description: this.dataJson.description,
                                app_urls: app_urls,
                                create_at: this.dataJson.create_at
                            }
                        }
                        fetch({
                            url: '/es-management/api/appLibrary/add',
                            method: 'post',
                            body: json
                        }).then(res => {
                            if(res.code == 200) {
                                this.$message.success('创建应用库成功！');
                                this.$parent.getAppLibraryList();
                                this.handleClose();
                            } else {
                                this.$message.error(res.message);
                            };
                        }).catch(error => this.$message.error(error));
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .dialog_body{
        text-align: center;
        .content_center{
            display: inline-block;
            .content_title{
                margin-right: 20px;
                label{
                    font-size: 16px;
                    font-weight: 400;
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                }
            }
            .content_main{
                p{
                    margin-top: 20px;
                    margin-bottom: 0;
                }
            }
        }
    }
    /deep/.el-form .el-form-item__label{padding: 0 20px 0 0;}
    .public .el-form .el-form-item .el-input, .public .el-form .el-form-item .el-textarea{
        max-width: none;
    }
</style>