<template>
    <div class="datasync public">
        <el-dialog
                title="修改数据同步设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose"  @open="doInit(currentData)">
            <div class="datasync-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="180px" class="datasync-form">
                    <el-form-item label="服务号 " prop="serviceId">
                        <el-input v-model="editInfo.serviceId" placeholder="请输入服务号,大于0的整数" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="同步服务器地址 " prop="serverAddr">
                        <el-input v-model="editInfo.serverAddr" placeholder="请输出ipv4地址如x.x.x.x" class="el_put"></el-input>
                        <el-checkbox v-model="editInfo.ifLocal" style="margin-left: 10px">是否为本机</el-checkbox>
                    </el-form-item>

                    <el-form-item label="端口" prop="port">
                        <el-input v-model="editInfo.port" placeholder="请输入1-65535范围内整数" class="el_put"></el-input>
                    </el-form-item>


                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo')">
                        取消
                    </span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
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
    import {updateDataSync, isNameExist} from "api/s2sVPN/dataSync";
    export default{
        components: {},
        data(){
            var validatePort = (rule, value, callback) =>
            {
                var reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
                if (reg.test(value) == false||value==0) {
                    callback(new Error("请输入1-65535范围内数字"));
                } else {
                    callback();
                }
            };

            var validateServerAddr = (rule, value, callback) => {

                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                if (ipReg.test(value) == false){
                    callback(new Error("ipv4地址格式错误"));
                }
                callback();

            };

            var validateServiceId = (rule, value, callback) => {
                if (/^[1-8]{1,}$/.test(value)==false){
                    callback(new Error("服务号必须为1-8之间的正整数"));
                }else{
                    if (this.preName != value) {
                        isNameExist({serverNum:value}).then((resp) => {
                            if (!resp.data) {
                                callback(new Error("该服务号已存在"));
                            }
                            callback();
                        }).catch(e => {
                        });
                    }else {
                        callback();
                    }
                }
            };

            return {
                rules: {
                    serviceId: [
                        {required: true, validator: validateServiceId, trigger: 'blur'}
                    ],
                    serverAddr: [
                        {required: true, validator: validateServerAddr, trigger: 'blur'}
                    ],
                    port: [
                        {required: true, validator: validatePort, trigger: 'blur'}
                    ],
                },
                editInfo: {
                    serviceId: '',
                    serverAddr:'',
                    port:'',
                    ifLocal:''
                },
                editVisible: true,
                id:'',
                preName:'',
            }
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
            doTest() {
                this.editVisible = true;
            },
            submitForm(formName) {
                if(this.editInfo.ifLocal == true){
                    this.editInfo.ifLocal = 1
                } else if(this.editInfo.ifLocal == false){
                    this.editInfo.ifLocal = 0
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var newdto={
                            id:this.id,
                            serverNum: this.editInfo.serviceId,
                            syncIpAddr:this.editInfo.serverAddr,
                            port:this.editInfo.port,
                            ifLocal:this.editInfo.ifLocal
                        };

                        this.$emit("editDataSync",newdto);
                        this.$emit('onChangeStatus');
                        this.$refs[formName].resetFields();

                    } else {

                        return false;
                    }
                });
            },

            doInit(currentData){
                let row = currentData;
                if(row.ifLocal == 1){
                    this.editInfo.ifLocal = true;
                } else if(row.ifLocal == 0){
                    this.editInfo.ifLocal = false;
                }
                this.editInfo.serviceId = row.serverNum;
                this.preName = row.serverNum;
                this.id = row.id;

                this.editInfo.serverAddr = row.syncIpAddr;
                this.editInfo.port = row.port;

            },
            resetForm(formName) {
                this.editVisible = false;
                this.$refs[formName].resetFields();
            },

        },
    }
</script>
<style>

    .datasync-form .el_put {
        position: relative;
        display: inline-block;
        width: 65% !important;
        margin-left: 20px;
    }

    .datasync-form .el_sel {
        width: 65% !important;
        margin-left: 20px;
    }

    .datasync-form .el_text {
        margin-left: 158px;
    }

    .datasync-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .datasync-form .el-form-item {
        margin-bottom: 17px;
    }

    .datasync-form .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .datasync-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 100px;
    }


</style>