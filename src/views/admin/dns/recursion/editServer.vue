<template>
    <div class="server public">
        <el-dialog
                title="修改递归服务器设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="server-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="100px">
                    <el-form-item label="名称" prop="serverName">
                        <el-input v-model="editInfo.serverName" placeholder="请输入递归服务器名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="IP" prop="serverIp">
                        <el-input v-model="editInfo.serverIp" placeholder="请输入递归服务器IP" class="el_put"></el-input>
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
    import {updateServer} from 'api/enDNS/recursion';

    export default{
        data(){

            var validateName = (rule, value, callback) =>
            {
                if (/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value) == false) {
                    callback(new Error("递归服务器名只能包含字母、数字、中文"));
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
                    serverName: [
                        {required: true, message:'请输入递归服务器名称', trigger: 'blur'}
                    ],

                    serverIp: [
                        {required: true, validator: validateIp, trigger: 'blur'}
                    ]


                },
                editInfo: {
                    serverName:'',
                    serverIp:'',
                    serverId:''
                },
                editVisible: true,

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
                            updateServer(this.editInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改递归服务器成功！'
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
                this.editInfo.serverName = row.serverName;
                this.editInfo.serverIp = row.serverIp;
                this.editInfo.serverId = row.serverId

            },
            resetForm(formName) {
                this.editVisible = false;
                this.$refs['editInfo'].resetFields();
            }

        },
    }
</script>
<style>
    .server-form .el-form-item__error {
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
        width: 60% !important;
        margin-left: 20px;
    }


    .el_sel {
        width: 60% !important;
        margin-left: 20px;
    }

    .el_sel_domain {
        width: 60% !important;
        margin-left: 20px;
    }

    .el_sel_short {
        width: 60% !important;
        margin-left: 20px;
    }



    .form-user-select{
        min-width: 488px!important;
        width: 488px!important;
    }
    .router-form .el-select{
        /*width:488px;*/
    }
    .route_put{
        padding-top:5px ;
        padding-bottom: 5px;
    }


</style>