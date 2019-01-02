<template>
    <div class="s2s-set public">
        <el-dialog
                title="查看设备详情"
                :visible.sync="addVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @close="handleClose"
                @open="doInit(currentData)"
        >
            <div class="s2s-form">
                <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="设备名称">
                        <el-input v-model="userInfo.deviceName" class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="设备标识">
                        <el-input v-model="userInfo.deviceId" class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="连接状态">
                        <el-input v-model="userInfo.connectStatus" class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="准入状态">
                        <el-select placeholder="请选择准入状态" v-model="userInfo.accessStatus"  popper-class="form-user-select" class="el_sel">
                            <el-option label="允许准入" value="Y" ></el-option>
                            <el-option label="禁止准入" value="N" ></el-option>
                        </el-select>
                    </el-form-item>
                    <span v-if="userInfo.accessStatus == 'N' || userInfo.accessStatus == '禁止准入'">
                        <el-form-item label="禁止准入">
                        <el-select placeholder="请选择禁止准入状态" v-model="userInfo.noAccessType"  popper-class="form-user-select" class="el_sel">
                            <el-option label="永久禁止准入" value="0" ></el-option>
                            <el-option label="自定义禁止准入时间" value="1" ></el-option>
                        </el-select>
                    </el-form-item>
                        <span v-if="userInfo.noAccessType == 1 || userInfo.noAccessType == '自定义禁止准入时间'">
                            <el-form-item label="自定义截止时间" prop="" >
                        <el-date-picker
                                v-model="userInfo.noAccessTime"
                                type="datetime"
                                style="margin-left: 20px;"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                        </span>
                    </span>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle"
                            @click="resetForm('userInfo')">
                        取消
                    </span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitForm('userInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {editS2c} from 'api/s2sVPN/s2s';
    import {forTimeVal} from "../../../../utils/dateUtil";
    export default{
        components:{

        },
        data(){
            return{
                addVisible:true,
                endDate:'',
                endTime:'',
                rules: {

                },
                userInfo: {
                    id:'',
                    deviceName:'',
                    deviceId:'',
                    connectStatus:'',
                    accessStatus:'',
                    noAccessType:'',
                    noAccessTime:'',
                    serverId:''
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
            }
        },
        created(){
            this.doInit(this.currentData);
        },
        props: {
            currentData: Object
        },
        methods: {
            doInit(currentData){
                this.userInfo = {
                    id:this.currentData.id,
                    deviceName:this.currentData.deviceName,
                    deviceId:this.currentData.deviceId,
                    connectStatus:this.currentData.connectStatus,
                    accessStatus:this.currentData.accessStatus,
                    noAccessType:this.currentData.noAccessType,
                    noAccessTime:this.currentData.noAccessTime,
                    serverId:this.currentData.serverId
                }
            },
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            resetForm(formName) {
                this.changeStatus();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.userInfo.connectStatus == '已连接'){
                            this.userInfo.connectStatus = 'on'
                        } else if(this.userInfo.connectStatus == '已断开'){
                            this.userInfo.connectStatus = 'off'
                        }
                        if(this.userInfo.accessStatus == '允许准入'){
                            this.userInfo.accessStatus = 'Y'
                        } else if(this.userInfo.accessStatus == '禁止准入'){
                            this.userInfo.accessStatus = 'N'
                        }
                        if(this.userInfo.noAccessType == '永久禁止准入'){
                            this.userInfo.noAccessType = 0
                        } else if(this.userInfo.noAccessType == '自定义禁止准入时间'){
                            this.userInfo.noAccessType = 1
                        }
                        if(this.userInfo.accessStatus == 'Y'){
                            this.userInfo.noAccessType = '';
                            this.userInfo.noAccessTime = '';
                        }
                        if(this.userInfo.noAccessType == 0){
                            this.userInfo.noAccessTime = '';
                        }
                        editS2c(this.userInfo).then(response => {
                            if (response.status == 'SUCCESS'){
                                this.$message({
                                    type: 'success',
                                    message: '编辑s2c配置成功！'
                                });
                                this.changeStatus();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        }).catch((e) => {
                            console.log(e)
                        });
                    }
                });
            },
        }
    }
</script>
<style >
    .s2s-set  .el_put{
        position: relative;
        display: inline-block;
        width: 65% !important;
        margin-left: 20px;
    }
    .s2s-set  .el_sel{
        width: 65% !important;
        margin-left: 20px;
    }
    .s2s-set  .el_sel .el-put{

    }
    .el-upload-dragger{
        margin-top: -2px!important;
        margin-left: 10px!important;
        width: 400px!important;
    }
    .s2s-form .el_box{
        margin-left: 158px;
    }

    .s2s-form .el-form-item__content .el-input .el-input__inner {
        /*width: 488px;*/
    }

    .s2s-form .el-form-item__label {
        float: left;
        min-width:135px ;
        font-size: 15px;
        margin-left: 78px;
    }

    .s2s-form .el-form-item {
        margin-bottom: 17px;
    }

    .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .s2s-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 87% !important;
        left: 159px !important;
    }
</style>