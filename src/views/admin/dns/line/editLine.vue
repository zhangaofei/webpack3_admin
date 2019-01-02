<template>
    <div class="line public">
        <el-dialog
                title="修改线路设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="line-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="100px">
                    <el-form-item label="线路名称" prop="chName">
                        <el-input v-model="editInfo.chName" placeholder="请输入线路名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="">
                        <el-input v-model="editInfo.description" placeholder="请输入描述" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="递归" prop="subCycle">
                        <el-radio-group v-model="editInfo.subCycle" style="margin-left: 20px">
                            <el-radio :label="1">启用</el-radio>
                            <el-radio :label="0">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="黑名单" prop="onBlackList">
                        <el-radio-group v-model="editInfo.onBlackList" style="margin-left: 20px">
                            <el-radio :label="true">启用</el-radio>
                            <el-radio :label="false">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="线路状态" prop="isStop">
                        <el-radio-group v-model="editInfo.isStop" style="margin-left: 20px">
                            <el-radio :label="false">启用</el-radio>
                            <el-radio :label="true">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>

                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitForm('editInfo')">
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
    import {updateLine} from 'api/enDNS/line';

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
                editInfo: {
                    id:'',
                    chName:'',
                    description:'',
                    subCycle:1,
                    onBlackList:true,
                    isStop:true
                },
                editVisible: true
            };

        },
        created(){
            this.doInit(this.currentData);
        },
        props: {
            currentData: Object
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
                        updateLine(this.editInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改线路成功！'
                                    });
                                    this.editVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs['editInfo'].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.code.info
                                    });
                                }
                            }).catch(e => {
                                console.log("修改出错", e);
                            });
                    } else {
                        return false;
                    }
                });
            },

            doInit(currentData){
                let row = currentData;
                this.editInfo.id = row.id;
                this.editInfo.chName = row.chName;
                this.editInfo.description = row.description;
                this.editInfo.subCycle = row.subCycle;
                this.editInfo.onBlackList = row.onBlackList;
                this.editInfo.isStop = row.isStop;

            },
            resetForm(formName) {
                this.editVisible = false;
                this.$refs['editInfo'].resetFields();
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