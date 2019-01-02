<template>
    <div class="cache public">
        <el-dialog
                title="修改缓存设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="admin-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="180px">
                    <el-form-item label="递归策略" prop="strategyid">
                        <el-select v-model="editInfo.strategyid" placeholder="请选择递归策略" class="el_sel">
                            <el-option
                                    v-for="name in recursionRuleNameList"
                                    :key="name.id"
                                    :label="name.strategyName"
                                    :value="name.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="域名" prop="domainName">
                        <el-input v-model="editInfo.domainName" placeholder="请输入域名" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="TTL" prop="ttl">
                        <el-input v-model="editInfo.ttl" placeholder="请输入TTL值" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="记录类型" prop="recordType">
                        <el-select v-model="editInfo.recordType" placeholder="请选择" class="el_sel_short">
                            <el-option label="A记录" value="A" ></el-option>
                            <el-option label="AAAA记录" value="AAAA" ></el-option>
                            <el-option label="CNAME记录" value="CNAME" ></el-option>
                            <el-option label="MX记录" value="MX" ></el-option>
                            <el-option label="NS记录" value="NS" ></el-option>
                            <el-option label="PTR记录" value="PTR" ></el-option>
                            <el-option label="TXT记录" value="TXT" ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="记录值" prop="recordValue">
                        <el-input v-model="editInfo.recordValue" placeholder="请填写" class="el_put"></el-input>
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
    import {getDomainNameList} from 'api/enDNS/domainAdmin';
    import {updateCache} from 'api/enDNS/cache';
    import {getRuleNameList} from 'api/enDNS/recursion';

    export default{
        data(){

            var validateValue = (rule, value, callback) =>
            {
                if (/^[a-zA-Z0-9\u4e00-\u9fa5\.]+$/.test(value) == false) {
                    callback(new Error("域名只能包含字母、数字、中文和'.'符号"));
                }
                callback();
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



            return {

                rules: {
                    strategyid: [
                        {required: true, validator: validateSelect, trigger: 'blur'}
                    ],
                    domainName: [
                        {required: true, validator: validateValue, trigger: 'blur'}
                    ],
                    ttl: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    recordType: [
                        {required: true, validator: validateSelect, trigger: 'blur'}
                    ],
                    recordValue: [
                        {required: true, message:'请输入记录值', trigger: 'blur'}
                    ],


                },

                editInfo: {
                    id:'',
                    strategyid:'',
                    domainName:'',
                    ttl:'',
                    recordType:'',
                    recordValue:'',
                },
                editVisible: true,
                activeName:'first',
                domainNameList:[],
                recursionRuleNameList:[]
            };
        },
        created(){
            this.getListForSelect();
            this.doInit(this.currentData);
        },

        props: {
            currentData: Object,
            strId: Object
        },
        methods: {
            handleClose() {
                this.changeStatus();
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

                getRuleNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.recursionRuleNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });

            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            updateCache(this.editInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改缓存配置成功！'
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
                this.editInfo.strategyid = row.strategyid;
                this.editInfo.domainName = row.domainName;
                this.editInfo.ttl = row.ttl;
                this.editInfo.recordType = row.recordType;
                this.editInfo.recordValue = row.recordValue;
                this.editInfo.id = row.id;

            },
            resetForm(formName) {
                this.editVisible = false;
                this.$refs['editInfo'].resetFields();
            }

        },
    }
</script>
<style>

    .cache .el_put {
        position: relative;
        width: 60% !important;
        margin-left: 20px;
    }


    .cache .el_sel {
        width: 60% !important;
        margin-left: 20px;
    }

    .cache .el_sel_domain {
        width: 60% !important;
        margin-left: 20px;
    }

    .cache .el_sel_short {
        width: 60% !important;
        margin-left: 20px;
    }



    .form-user-select{
        /*min-width: 488px!important;*/
        /*width: 488px!important;*/
    }
    .router-form .el-select{
        /*width:488px;*/
    }
    .route_put{
        padding-top:5px ;
        padding-bottom: 5px;
    }


</style>