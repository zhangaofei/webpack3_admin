<template>
    <div class="web">
        <el-dialog title="新建API" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog" top="10%">
            <el-form :model="info" label-width="142px"  class="web-form"
                     ref="info" :rules="rules">
                <el-form-item label="名称" prop="name">
                    <el-input  v-model="info.name" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="URI" prop="puri">
                    <el-input v-model="info.puri" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="upstream" prop="upstream">
                    <el-input v-model="info.upstream" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="host">
                    <el-input v-model="info.host" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="info.status" placeholder="状态" class="el_put">
                        <el-option label="启用" value="1" ></el-option>
                        <el-option label=" 不启用" value="0" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否需要认证" prop="needAuth">
                    <el-select v-model="info.needAuth" placeholder="是否需要认证" class="el_put">
                        <el-option label="是" value="1" ></el-option>
                        <el-option label="否" value="0" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="方法">
                    <el-input v-model="info.Methods" class="el_put"></el-input>
                </el-form-item>
            </el-form>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div style="margin-top: 20px;margin-right: 151px;">
                    <el-button
                            @click="resetForm('info')" style="margin-right: 40px;background-color: #fff">
                        取消
                    </el-button>
                    <el-button
                            type="primary"
                            @click="submitInfo('info')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {addApi} from "../../../../../api/systemSet/adminSet/interface";
    export default {
        components: {},
        data() {
            return {
                addVisible: true,
                info:{
                    name:'',
                    puri:'',
                    status:'',
                    upstream:'',
                    needAuth:'',
                    host:'',
                    Methods:''
                },
                rules:{
                    name:[{required: true, message: '请输入名称', trigger: 'blur'}],
                    puri:[{required: true, message: '请输入URI', trigger: 'blur'}],
                    status:[{required: true, message: '请选择状态', trigger: 'blur'}],
                    upstream:[{required: true, message: '请输入upstream', trigger: 'blur'}],
                    needAuth:[{required: true, message: '请选择是否需要认证方式', trigger: 'blur'}]
                }
            }
        },
        created() {

        },
        methods: {
            handleClose() {
                this.changeStatus();
            },
            doTest() {
                this.addVisible = true;
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            submitInfo(formName){
                this.$refs.info.validate((valid) => {
                    if (valid) {
                        addApi(this.info).then((resp) => {
                            if (resp.status == 1){
                                this.$message({
                                    type: 'success',
                                    message: '新建api成功！'
                                });
                                this.$emit('onChangeStatus');
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: resp.msg
                                });
                            }
                        }).catch((err) => {
                            this.$message({
                                type: 'warning',
                                message: '新建api失败！' + codeMessage(err)
                            });
                        });
                    }
                });
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>

    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .web .dialog {
        min-width: 830px;
    }

    .web .el-dialog__header {
        padding-left: 5px;
    }

    .web .el_put {
        position: relative;
        display: inline-block;
        margin-left: 80px;
    }

    .web .el_sel {
        margin-left: 80px;
    }

    .web .el_text {
        margin-left: 158px;
    }

    .web-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .web-form .el-form-item {
        margin-bottom: 20px;
    }

    .web .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .web-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 165px;
    }


</style>
