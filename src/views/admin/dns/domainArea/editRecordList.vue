<template>
    <div class="record public">
        <el-dialog
                title="修改记录设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="admin-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="100px">
                    <el-form-item label="域名" prop="fullDomainName">
                        <el-input v-model="editInfo.fullDomainName" :disabled="true" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="主机记录" prop="recordName">
                        <el-input v-model="editInfo.recordName" placeholder="请输入记录名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="TTL" prop="ttlSec">
                        <el-input v-model="editInfo.ttlSec" placeholder="请输入TTL值" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="记录类型" prop="recordType">
                        <el-select v-model="editInfo.recordType" placeholder="请选择" class="el_sel">
                            <el-option label="A记录" value=1 ></el-option>
                            <el-option label="NS记录" value=2 ></el-option>
                            <el-option label="AAAA记录" value=3 ></el-option>
                            <el-option label="PTR记录" value=4 ></el-option>
                            <el-option label="CNAME记录" value=5 ></el-option>
                            <el-option label="MX记录" value=6 ></el-option>
                            <el-option label="TXT记录" value=7 ></el-option>
                        </el-select>
                    </el-form-item>

                    <span v-if="editInfo.recordType == '6' || editInfo.recordType == 'MX记录'">
                        <el-form-item label="MX优先级" prop="priority">
                        <el-input v-model="editInfo.priority" placeholder="请输入非负整数" class="el_put"></el-input>
                    </el-form-item>
                    </span>
                    <el-form-item label="健康检查方式" prop="">
                        <span v-if="editInfo.recordType == 1 || editInfo.recordType == 'A记录'">
                            <el-select v-model="editInfo.checkMethod" placeholder="请选择" class="el_sel">
                                <el-option label="无" value="NOCHECK" ></el-option>
                                <el-option label="Ping" value="PING" ></el-option>
                                <el-option label="Telnet" value="TELNET" ></el-option>
                            </el-select>
                        </span>
                        <span v-else>
                            <el-select v-model="editInfo.checkMethod" placeholder="请选择" class="el_sel">
                                <el-option label="无" value="NOCHECK" ></el-option>
                                <el-option label="Ping" value="PING" :disabled="true"></el-option>
                                <el-option label="Telnet" value="TELNET" :disabled="true"></el-option>
                            </el-select>
                        </span>
                    </el-form-item>

                    <el-form-item label="记录值" prop="recordValue">
                        <el-input v-model="editInfo.recordValue" placeholder="请输入记录值" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="线路" prop="lineId">
                        <el-select v-model="editInfo.lineId" placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="line in lineNameList"
                                    :key="line.id"
                                    :label="line.chName"
                                    :value="line.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="info" style="background-color: #3484df;margin-left: 130px" @click="onSecurityConfig()">安全设置</el-button>
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

        <securityConfig @onChangeStatus="onChangeStatus" :currentData="editInfo" v-if="isSecurityShow"/>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import securityConfig from "./securityConfig"
    import {updateRecord, getDomainNameList,getLineNameList} from 'api/enDNS/domainAdmin';

    export default{
        components: {securityConfig},
        data(){
            //主机记录
            var validateName = (rule, value, callback) =>
            {
                if (/^[a-zA-Z0-9\u4e00-\u9fa5\.]+$/.test(value) == false) {
                    callback(new Error("记录名只能包含字母、数字、中文和'.'符号"));
                } else {
                    callback();
                }
            };

            var validateSelect = (rule, value, callback) =>
            {
                if (value=='') {
                    callback(new Error("请选择"));
                }
                callback();
            };


            var validateNumber = (rule, value, callback) =>
            {
                if(!value){
                    callback();
                } else if (/^(0|[1-9]\d*)$/.test(value) == false) {
                    callback(new Error("请填写非负整数"));
                } else {
                    callback();
                }
            };

            var validateMX = (rule, value, callback) =>
            {
                if ((this.editInfo.record_type=='MX')&&(/^(0|[1-9]\d*)$/.test(value) == false)) {
                    callback(new Error("请填写非负整数"));
                }
                callback();
            };


            var  validateIpv4= (rule, value, callback) =>
            {
                if(this.editInfo.recordType == 1 || this.editInfo.recordType == 'A记录'){
                    var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                    if (ipReg.test(value)==false){
                        callback(new Error("记录值为A记录值时,记录值请填写正确的IP地址"));
                    } else {
                        callback();
                    }
                } else {
                    if(!value){
                        callback(new Error("请输入记录值"));
                    } else {
                        callback();
                    }
                }
            };

            var  validateMaster= (rule, value, callback) =>
            {
                callback();
            };


            return {

                rules: {
                    recordName: [
                        {required: true, message: '请输入主机记录', trigger: 'blur'}
                    ],
                    dnsDomainName: [
                        {required: true, validator: validateSelect, trigger: 'blur'}
                    ],
                    ttlSec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    recordType: [
                        {required: true, validator: validateSelect, trigger: 'blur'}
                    ],
                    mxRecord: [
                        {required: false, validator: validateMX, trigger: 'blur'}
                    ],
                    recordValue: [
                        {required: true, validator: validateIpv4, trigger: 'blur'}
                    ],
                    lineId: [
                        {required: true,  trigger: 'blur'}
                    ]
                },

                editInfo: {
                    id:'',
                    recordName:'',
                    fullDomainName:'',
                    ttlSec:'',
                    recordType:'',
                    priority:'',
                    checkMethod:'',
                    recordValue:'',
                    lineId:'',
                },
                editVisible: true,
                activeName:'first',
                domainNameList:[],
                lineNameList:[],

                isSecurityShow:false

            };

        },
        created(){
            this.getListForSelect();
            this.doInit(this.currentData);
        },

        props: {
            currentData: Object
        },
        methods: {
            handleClose() {
                this.changeStatus();
            },
            doTest() {
                this.editVisible = true;
            },

            onChangeStatus() {
                this.isSecurityShow = false;
            },

            onSecurityConfig(){
                this.isSecurityShow = true;
            },

            changeStatus(){
                this.$emit("onChangeStatus")
            },

            getListForSelect(){
                getDomainNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.domainNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });

                getLineNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.lineNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });

            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.editInfo.recordType == 'A记录'){
                            this.editInfo.recordType = 1
                        } else if(this.editInfo.recordType == 'AAAA记录'){
                            this.editInfo.recordType = 3
                        } else if(this.editInfo.recordType == 'CNAME记录'){
                            this.editInfo.recordType = 5
                        } else if(this.editInfo.recordType == 'MX记录'){
                            this.editInfo.recordType = 6
                        } else if(this.editInfo.recordType == 'NS记录'){
                            this.editInfo.recordType = 2
                        } else if(this.editInfo.recordType == 'PTR记录'){
                            this.editInfo.recordType = 4
                        } else if(this.editInfo.recordType == 'TXT记录'){
                            this.editInfo.recordType = 7
                        }
                        if(this.editInfo.checkMethod == '无'){
                            this.editInfo.checkMethod = 'NOCHECK';
                        } else if(this.editInfo.checkMethod == 'Ping'){
                            this.editInfo.checkMethod = 'PING'
                        } else if(this.editInfo.checkMethod == 'Telnet'){
                            this.editInfo.checkMethod = 'TELNET'
                        }
                            updateRecord(this.editInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改记录配置成功！'
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
                this.editInfo.fullDomainName = row.fullDomainName;
                this.editInfo.recordName = row.recordName;
                this.editInfo.ttlSec = row.ttlSec;
                this.editInfo.recordType = row.recordType;
                this.editInfo.priority = row.priority;
                this.editInfo.checkMethod = row.checkMethod.toString();
                this.editInfo.recordValue = row.recordValue;
                this.editInfo.lineId = row.lineId;

            },
            resetForm(formName) {
                this.editVisible = false;
                this.$refs['editInfo'].resetFields();
            }

        },
    }
</script>
<style>

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
        ping-top:5px ;
        padding-bottom: 5px;
    }
    .public .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        /* left: 131px; */
        left: 130px;
    }

</style>