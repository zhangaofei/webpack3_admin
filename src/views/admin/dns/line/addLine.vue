<template>
    <div class="line public">
        <el-dialog
                title="新建线路设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose">
            <div class="line-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px">
                    <el-form-item label="线路名称" prop="chName">
                        <el-input v-model="addInfo.chName" placeholder="请输入线路名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="">
                        <el-input v-model="addInfo.description" placeholder="请输入描述" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="递归" prop="subCycle">
                        <el-radio-group v-model="addInfo.subCycle" style="margin-left: 20px">
                            <el-radio label="1">启用</el-radio>
                            <el-radio label="0">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="黑名单" prop="onBlackList">
                        <el-radio-group v-model="addInfo.onBlackList" style="margin-left: 20px">
                            <el-radio label="true">启用</el-radio>
                            <el-radio label="false">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="线路状态" prop="isStop">
                        <el-radio-group v-model="addInfo.isStop" style="margin-left: 20px">
                            <el-radio label="false">启用</el-radio>
                            <el-radio label="true">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>

                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle" @click="resetForm('addInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary btn_middle confirm"
                            @click="submitForm('addInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {addLine} from 'api/enDNS/line';

    export default{
        data(){

            var validateName = (rule, value, callback) =>
            {
                if (/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value) == false) {
                    callback(new Error("线路名只能包含字母、数字、中文"));
                } else {
                        callback();
                }
            };

            return {

                rules: {
                    chName: [
                        {required: true, message:'请输入线路名称', trigger: 'blur'}
                    ]
                },

                addInfo: {
                    chName:'',
                    description:'',
                    subCycle:'1',
                    onBlackList:'true',
                    isStop:'false'
                },
                addVisible: true
            };

        },
        created(){

        },
        methods: {


            handleClose() {
                this.changeStatus();
            },

            changeStatus(){
                this.$emit("onChangeStatus")
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            addLine(this.addInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '新建线路成功！'
                                    });
                                    this.addVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs['addInfo'].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.code.info
                                    });
                                }
                            }).catch(e => {
                                console.log("新建出错", e);
                            });
                    } else {

                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs['addInfo'].resetFields();
            }

        },
    }
</script>
<style>
    .line-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 130px;
    }


    .el_put {
        position: relative;
        width: 55% !important;
        margin-left: 20px;
    }
</style>