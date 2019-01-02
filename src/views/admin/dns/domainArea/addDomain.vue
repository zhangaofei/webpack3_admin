<template>
    <div class="domain public">
        <el-dialog
                title="新建域名设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose">
            <div class="domain-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="180px">
                    <el-form-item label="域名" prop="domainName">
                        <el-input v-model="addInfo.domainName" placeholder="请输入域名" class="el_put"></el-input>
                        <el-select v-model="addInfo.suffix" placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="suffix in domainSuffixList"
                                    :key="suffix"
                                    :label="suffix"
                                    :value="suffix">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="智能解析" prop="">
                        <el-radio-group v-model="addInfo.parseType"  class="el_put_1">
                            <el-radio label="1">开启</el-radio>
                            <el-radio label="2">关闭</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="高级设置" prop="">
                        <el-radio-group v-model="addInfo.furtherConfig"  class="el_put_1">
                            <el-radio label="true">开启</el-radio>
                            <el-radio label="false">关闭</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <span v-if="addInfo.furtherConfig=='true'">

                        <el-form-item label="刷新时间(秒)" prop="freshSec">
                            <el-input  v-model="addInfo.freshSec" class="el_put_2" placeholder="请输入数字"></el-input>
                        </el-form-item>
                         <el-form-item label="重试时间(秒)" prop="retrySec">
                            <el-input  v-model="addInfo.retrySec" class="el_put_2" placeholder="请输入数字"></el-input>
                        </el-form-item>
                         <el-form-item label="过期时间(秒)" prop="timeOutSec">
                            <el-input  v-model="addInfo.timeOutSec" class="el_put_2" placeholder="请输入数字"></el-input>
                        </el-form-item>
                         <el-form-item label="最小TTL(秒)" prop="minTtlSec">
                            <el-input  v-model="addInfo.minTtlSec" class="el_put_2" placeholder="请输入数字"></el-input>
                        </el-form-item>
                         <el-form-item label="全局TTL(秒)" prop="globalTtlSec">
                            <el-input  v-model="addInfo.globalTtlSec" class="el_put_2" placeholder="请输入数字"></el-input>
                        </el-form-item>

                        <el-form-item label="NS记录1" prop="nsRecordType1">
                            <el-input  v-model="addInfo.nsRecordType1" class="el_put_2" placeholder="如 NS.XXX.com"></el-input>
                        </el-form-item>
                         <el-form-item label="NS记录2" prop="nsRecordType2">
                            <el-input  v-model="addInfo.nsRecordType2" class="el_put_2" placeholder="如 NS.XXX.com"></el-input>
                        </el-form-item>
                        <el-form-item label="转发服务器" prop="transpondServers">
                            <el-select v-model="addInfo.transpondType" placeholder="请选择" class="el_sel_transmit">
                                 <el-option label="开启转发" value="1" ></el-option>
                                 <el-option label="关闭转发" value="2" ></el-option>
                                 <el-option label="强制转发" value="3" ></el-option>
                                 <el-option label="第一次转发" value="4" ></el-option>
                            </el-select>
                            <el-input type="textarea" autosize  v-model="addInfo.transpondServers" class="el_put_3" placeholder="请输入ip地址 如 1.1.1.1"></el-input>
                        </el-form-item>
                        <el-form-item label="域名别名" prop="">
                            <el-select v-model="addInfo.byname" placeholder="请选择" class="el_sel_byname">
                                 <el-option
                                         v-for="name in bynameList"
                                         :key="name"
                                         :label="name"
                                         :value="name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </span>


                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle" @click="resetForm('addInfo')">取消</span>
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
    import {addDomain, getBynameList} from 'api/enDNS/domainAdmin';

    export default{
        components: {
        },
        data(){

            var validateName = (rule, value, callback) =>
            {
                if (/^[a-zA-Z0-9\u4e00-\u9fa5\.]+$/.test(value) == false) {
                    callback(new Error("域名只能包含字母、数字、中文和'.'符号"));
                } else {
                        callback();
                }
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

            var validateNS = (rule, value, callback) =>
            {
                if(!value){
                    callback();
                } else if (/^[a-zA-Z0-9\u4e00-\u9fa5\.]+$/.test(value) == false) {
                    callback(new Error("NS记录只能包含字母、数字、中文和'.'符号"));
                } else if(this.addInfo.nsRecordType1 == this.addInfo.nsRecordType2){
                        callback(new Error("两条NS记录不可相同"));
                } else {
                    callback();
                }
            };

            var  validateTransmitServer = (rule, value, callback) =>
            {
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                if (value.length<1){
                    callback(new Error("请至少填写一条IP地址"));
                }else {
                    var valueList = value.split("\n");
                    for (var i = 0; i < valueList.length; i++) {
                        var valueItem = valueList[i];
                        if (valueItem.length>15||valueItem.indexOf(",")>-1){
                            callback(new Error("地址之间请回车换行分隔,请检测输入是否合法"));
                        }else {
                            if (ipReg.test(valueItem)==false){
                                callback(new Error("IP地址不正确"));
                            }

                        }
                    }
                    callback();
                }
            };


            return {

                rules: {
                    domainName: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],
                    freshSec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    retrySec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    timeOutSec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    minTtlSec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    globalTtlSec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    nsRecordType1: [
                        {required: false, validator: validateNS, trigger: 'blur'}
                    ],
                    nsRecordType2: [
                        {required: false, validator: validateNS, trigger: 'blur'}
                    ],

                    transpondServers: [
                        {required: false, validator: validateTransmitServer, trigger: 'blur'}
                    ],


                },

                addInfo: {
                    domainName:'',
                    suffix:'.com',
                    parseType:'2',

                    freshSec:'',
                    retrySec:'',
                    timeOutSec:'',
                    minTtlSec:'',
                    globalTtlSec:'',
                    nsRecordType1:'',
                    nsRecordType2:'',
                    transpondType:'',
                    transpondServers:'',
                    byname:'',
                    furtherConfig:'false',
                },
                addVisible: true,
                domainSuffixList:['.com','.cn','.net','.org','.edu','.top','.gov','.mil','.biz','.name','.info','.mobi','.pro','.travel','.museum','.int','.aero','.post','.rec','.asia','.中国','.公司','.网络','.网址','.信息','.公益'],
                activeName:'first',

                bynameList:[],

            };

        },
        created(){
            getBynameList();
        },
        methods: {

            handleClose() {
                this.$emit("onChangeStatus");
            },
            getBynameList(){
                getBynameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.bynameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });

            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            addDomain(this.addInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '新建域名配置成功！'
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
    .domain-form .el_put {
        position: relative;
        width: 45% !important;
        margin-left: 20px;
    }
    .domain-form .el_put_1 {
        position: relative;
        width: 35% !important;
        margin-left: 20px;
    }
    .domain-form .el_put_2 {
         position: relative;
         width: 61% !important;
         margin-left: 20px;
     }
    .domain-form .el_put_3 {
        position: relative;
        width: 40% !important;
        margin-left: 5px;
    }
    .domain-form .el_check {
        width: 80% !important;
        margin-left: 20px;
    }

    .domain-form .el_sel {
        width: 15% !important;
        margin-left: 0px;
    }

    .domain-form .el_sel_transmit {
        width: 20% !important;
        margin-left: 20px;
    }

    .domain-form .el_sel_byname {
        width: 61% !important;
        margin-left: 20px;
    }

    .domain-form .el_text {
        margin-left: 158px;
    }

    .domain-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .domain-form .el-form-item {
        margin-bottom: 20px;
    }

    .domain-form .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .domain-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 100px;
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