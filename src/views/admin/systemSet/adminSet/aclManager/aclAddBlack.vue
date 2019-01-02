<template>
    <div class="web">
        <el-dialog title="新建黑名单" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog" top="10%">
            <el-form :model="info" label-width="142px"  class="web-form"
                     ref="info" :rules="rules">
                <el-form-item label="IP" prop="ip">
                    <el-input  v-model="info.ip" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-input v-model="blackType" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop = "status">
                    <el-select v-model="info.status" placeholder="状态" class="el_put" >
                        <el-option label="Enable" value="1" ></el-option>
                        <el-option label="Disable" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop ="remark">
                    <el-input v-model="info.remark" class="el_put"></el-input>
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
    import {aclAdd} from "../../../../../api/systemSet/adminSet/aclManager";
    export default {
        components: {},
        data() {
            var ips = (rule, value, callback) => {
                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                    callback(new Error("请输入正确的IP地址"));
                } else if(value == '0.0.0.0' || value == '255.255.255.255'){
                    callback(new Error("请输入正确的IP地址"));
                } else {
                    callback();
                }
            };
            return {
                addVisible: true,
                info:{
                    ip:'',
                    type:'1',
                    status:'',
                    remark:''
                },
                rules:{
                    ip:[{required: true, validator: ips, trigger: 'blur'}],
                    status:[{required: true, message: '请选择状态', trigger: 'blur'}],
                    remark:[{message: '请输入备注', trigger: 'blur'}]

                },
                blackType:"黑名单"
            }
        },
        created() {

        },
        methods: {
//            createChange(){
//                console.log("status:",this.info.status)
//                if(this.info.status == 'Enable')
//                {
//                    this.info.status = '1'
//
//                }
//                if(this.info.status == 'Disable')
//                {
//                    this.info.status = '0'
//                }
//            },
            handleClose() {
                this.changeStatus();
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            submitInfo(formName){
                this.$refs.info.validate((valid) => {
                    if (valid) {
                        aclAdd(this.info).then((resp) => {
                            if (resp.status == 1){
                                this.$message({
                                    type: 'success',
                                    message: '新建成功！'
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
                                message: '新建失败！'
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
