<template>
    <div class="web public">
        <el-dialog
                :title="dialogVisible ? '使用图标库':'新建环境变量配置'"
                :visible.sync="addVisible"
                @close="handleClose(dialogVisible)"
                size="small"
                custom-class="dialog public"
                top="10%">
            <el-form v-show="!dialogVisible" :rules="rules" :model="info" label-width="142px" class="config-form"
                     ref="info">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="info.name" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="系统参数" prop="value">
                    <el-input v-model="info.value" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="">
                    <el-input v-model="info.remark" class="el_put"></el-input>
                </el-form-item>
            </el-form>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('info',dialogVisible)">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitInfo('info',dialogVisible)">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {addSystemConfigList} from  'api/enWAS/systemConfig';

    export default {
        name: 'admin_resource_add',
        components: {

        },
        data() {
            return {
                rules: {
                    value: [
                        {required: true, message:'请输入系统参数', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message:'请输入名称', trigger: 'blur'}]
                },
                addVisible: true,
                info: {
                    name: '',
                    value:'',
                    remark:''
                },
                dialogVisible: false,
            }
        },
        created() {

        },
        methods: {
            handleClose(blen) {
                if (blen) {
                    this.dialogVisible = false
                    this.addVisible = true;
                    return;
                }else{
                    this.changeStatus();
                }
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            submitInfo(formName, blen){
                this.$refs.info.validate((valid) => {
                    if (valid) {
                        addSystemConfigList(this.info).then(resp => {
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '新建成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: resp.msg
                                });
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    }
                });
            },
            resetForm(formName, blen) {
                if(blen){
                    this.dialogVisible = false;
                    this.addVisible = true;
                    return;
                }else{
                    this.addVisible = false;
                    this.$refs[formName].resetFields();
                }
            }
        }
    }
</script>

<style>
    .upload_icon_content .choose_icon {
        margin-left: 20px;
        padding: 8px 20px;
    }
    .view_icon_content{
        margin-left: 20px;
    }
    .icon_choosed{
        width: 72px;
        height: 72px;
    }
    .config-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        /* left: 131px; */
        left: 100px;
    }
    .config-form .el_put {
        position: relative;
        display: inline-block;
        width: 65%;
        margin-left: 20px;
    }
</style>
