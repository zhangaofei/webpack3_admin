<template>
    <div class="blacklist public">
        <el-dialog
                title="修改黑名单设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="black-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="100px">
                    <el-form-item label="黑名单名称" prop="listName">
                        <el-input v-model="editInfo.listName" placeholder="请输入黑名单名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="">
                        <el-input v-model="editInfo.description" placeholder="请输入描述" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="起始IP" prop="ipField1">
                        <el-input v-model="editInfo.ipField1" placeholder="请输入ipv4地址" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="结束IP" prop="ipField2">
                        <el-input v-model="editInfo.ipField2" placeholder="请输入ipv4地址" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="状态" prop="isStop">
                        <el-radio-group v-model="editInfo.isStop">
                            <el-radio :label=false>启用</el-radio>
                            <el-radio :label=true>停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle" @click="resetForm('editInfo')">取消</span>
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
    import {addBlacklist, updateBlacklist} from 'api/enDNS/region';

    export default{
        data(){
            //黑名单名称
            var validateName = (rule, value, callback) =>
            {
                if (/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value) == false) {
                    callback(new Error("黑名单名只能包含字母、数字、中文"));
                } else {
                            callback();
                }
            };

            var validateIp = (rule, value, callback) =>
            {
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                if (ipReg.test(value)==false){
                    callback(new Error("IP地址不正确"));
                }
                callback();
            };


            return {

                rules: {
                    listName: [
                        {required: true, message:'请输入黑名单名称', trigger: 'blur'}
                    ],
                    ipField1: [
                        {required: true, validator: validateIp, trigger: 'blur'}
                    ],
                    ipField2: [
                        {required: true, validator: validateIp, trigger: 'blur'}
                    ]
                },

                editInfo: {
                    listName:'',
                    description:'',
                    ipField1:'',
                    ipField1:'',
                    isStop:'',
                    id:''
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
                this.$emit("onChangeStatus");
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            updateBlacklist(this.editInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改黑名单成功！'
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
                this.editInfo.listName = row.listName;
                this.editInfo.description = row.description;
                this.editInfo.ipField1 = row.ipField1;
                this.editInfo.ipField2 = row.ipField2;
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
    .black-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 132px;
    }


    .el_put {
        position: relative;
        width: 55% !important;
        margin-left: 20px;
    }

</style>