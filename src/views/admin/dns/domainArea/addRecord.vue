<template>
    <div class="record public">
        <el-dialog
                title="新建记录设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose">
            <div class="admin-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px">
                    <el-form-item label="主机记录" prop="recordName">
                        <el-input v-model="addInfo.recordName" placeholder="请输入记录名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="域名" prop="dnsDomainName">
                        <el-select v-model="addInfo.domainId" placeholder="请选择" class="el_sel_domain">
                            <el-option
                                    v-for="name in domainNameList"
                                    :key="name.id"
                                    :label="name.fullDomainName"
                                    :value="name.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="TTL" prop="ttlSec">
                        <el-input v-model="addInfo.ttlSec" placeholder="请输入TTL值" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="记录类型" prop="recordType">
                        <el-select v-model="addInfo.recordType" placeholder="请选择" class="el_sel">
                            <el-option label="A记录" value=1 ></el-option>
                            <el-option label="NS记录" value=2 ></el-option>
                            <el-option label="AAAA记录" value=3 ></el-option>
                            <el-option label="PTR记录" value=4 ></el-option>
                            <el-option label="CNAME记录" value=5 ></el-option>
                            <el-option label="MX记录" value=6 ></el-option>
                            <el-option label="TXT记录" value=7 ></el-option>
                        </el-select>
                    </el-form-item>

                    <span v-if="addInfo.recordType=='6'">
                        <el-form-item label="MX记录" prop="mxRecord">
                        <el-input v-model="addInfo.mxRecord" placeholder="请输入非负整数" class="el_put"></el-input>
                    </el-form-item>
                    </span>

                    <el-form-item label="健康检查方式" prop="">
                        <span v-if="addInfo.recordType == 1 || addInfo.recordType == 'A记录'">
                            <el-select v-model="addInfo.checkMethod" placeholder="请选择" class="el_sel">
                                <el-option label="无" value="NOCHECK" ></el-option>
                                <el-option label="Ping" value="PING" ></el-option>
                                <el-option label="Telnet" value="TELNET" ></el-option>
                            </el-select>
                        </span>
                        <span v-else>
                            <el-select v-model="addInfo.checkMethod" placeholder="请选择" class="el_sel">
                                <el-option label="无" value="NOCHECK" ></el-option>
                                <el-option label="Ping" value="PING" :disabled="true"></el-option>
                                <el-option label="Telnet" value="TELNET" :disabled="true"></el-option>
                            </el-select>
                        </span>
                    </el-form-item>

                    <el-form-item label="记录值" prop="recordValue">
                        <el-input v-model="addInfo.recordValue" placeholder="请输入记录值" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="线路" prop="lineId">
                        <el-select v-model="addInfo.lineId" placeholder="请选择" @change="valueChange(addInfo.lineId)" class="el_sel">
                            <el-option
                                    v-for="line in lineNameList"
                                    :key="line.id"
                                    :label="line.chName"
                                    :value="line.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
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
    import {addRecord, getDomainNameList,getLineNameList} from 'api/enDNS/domainAdmin';
    import {getPoolListAll} from 'api/enDNS/line';
    export default{
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
                if ((this.addInfo.record_type=='MX')&&(/^(0|[1-9]\d*)$/.test(value) == false)) {
                    callback(new Error("请填写非负整数"));
                }
                callback();
            };

            //记录值
            var  validateIpv4= (rule, value, callback) =>
            {
                if(this.addInfo.recordType == 1){
                    var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                    if (ipReg.test(value)==false){
                        callback(new Error("记录类型为A记录时,记录值请填写正确的IP地址"));
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
                        {required: true, trigger: 'blur'}
                    ]
                },

                addInfo: {
                    mxRecord:'',
                    recordName:'',
                    domainId:'',
                    ttlSec:'',
                    recordType:'',
                    priority:'',
                    checkMethod:'',
                    recordValue:'',
                    lineId:0,
                    lineIds:[0]
                },
                addVisible: true,
                activeName:'first',
                domainNameList:[],
                lineNameList:[],
                lineList:[],
                poolList:[]
            };
        },
        created(){
            this.getListForSelect();
        },
        methods: {
            valueChange(data){
                this.addInfo.lineIds = [];
                for (let i = 0; i < this.lineList.length; i++){
                    if(data == this.lineList[i].id){
                        this.addInfo.lineIds.push(data);
                        break;
                    }
                }
                for (let i = 0; i < this.poolList.length; i++){
                    if(data == this.poolList[i].id){
                        this.addInfo.lineIds = this.poolList[i].lineIds;
                        break;
                    }
                }
            },

            handleClose() {
                this.$emit("onChangeStatus");
            },

            getListForSelect(){
                getDomainNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.domainNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
                this.lineNameList = [];
                getLineNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.lineList = response.data;
                        for (let i = 0; i < response.data.length; i++){
                            this.lineNameList.push(response.data[i]);
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                });
                getPoolListAll().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.poolList = response.data;
                        for (let i = 0; i < response.data.length; i++){
                            this.lineNameList.push(response.data[i]);
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            addRecord(this.addInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '新建记录配置成功！'
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