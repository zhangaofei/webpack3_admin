<template>
    <div class="rule public">
        <el-dialog
                title="修改递归规则列表"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="rule-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="100px">
                    <el-form-item label="规则名称" prop="strategyName">
                        <el-input v-model="editInfo.strategyName" placeholder="请输入规则名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="递归服务器" prop="serverIds">
                        <el-select v-model="editInfo.serverIds" multiple placeholder="请选择" class="el_sel_long">
                            <el-option
                                    v-for="name in serverNameList"
                                    :key="name.serverId"
                                    :label="name.serverName"
                                    :value="name.serverId">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="出口地址" prop="outIp">
                        <el-select v-model="editInfo.outIp" placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="ip in ethAddressList"
                                    :key="ip.ip"
                                    :label="ip.ip"
                                    :value="ip.ip">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="线路" prop="lineId">
                        <el-select v-model="editInfo.lineId" placeholder="请选择" class="el_sel_short">
                            <el-option
                                    v-for="line in lineNameList"
                                    :key="line.id"
                                    :label="line.chName"
                                    :value="line.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="域名" prop="domainName">
                        <el-input v-model="editInfo.domainName" placeholder="请输入域名" class="el_put"></el-input>
                        <!--<el-select v-model="editInfo.domainName" placeholder="请选择" class="el_sel">-->
                            <!--<el-option-->
                                    <!--v-for="domain in domainNameList"-->
                                    <!--:key="domain.domainName"-->
                                    <!--:label="domain.domainName"-->
                                    <!--:value="domain.domainName">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
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
    import {updateRule, getServerNameList,getEthAddressList,getDnsDomainServerForPull} from 'api/enDNS/recursion';
    import {getLineNameList} from 'api/enDNS/line';
    import {getDomainNameList} from 'api/enDNS/domainAdmin';
    export default{
        data(){
            //规则名称
            var validateName = (rule, value, callback) =>
            {
                if (/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value) == false) {
                    callback(new Error("递归服务器名只能包含字母、数字、中文"));
                } else {
                            callback();
                }
            };
            var validateName1 = (rule, value, callback) =>
            {
                if(!value){
                    callback();
                } else if (/^[a-zA-Z0-9\u4e00-\u9fa5\.]+$/.test(value) == false) {
                    callback(new Error("域名只能包含字母、数字、中文和'.'符号"));
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



            return {

                rules: {
                    strategyName: [
                        {required: true, message:'请输入规则名称', trigger: 'blur'}
                    ],

                    serverIds: [
                        {required: true, validator: validateSelect, trigger: 'blur'}
                    ],
                    outIp: [
                        {required: true, validator: validateSelect, trigger: 'blur'}
                    ],
                    lineId: [
                        {required: true, trigger: 'blur'}
                    ],
                    domainName: [
                        {required: false, validator: validateName1, trigger: 'blur'}
                    ]
                },

                editInfo: {
                    id:'',
                    strategyName:'',
                    serverIds:[],
                    outIp:'',
                    lineId:'',
                    domainName:''
                },
                editVisible: true,
                serverNameList:[],
                ethAddressList:[],
                lineNameList:[],
                domainNameList:[]
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

                getLineNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.lineNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });

                getDnsDomainServerForPull().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.serverNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });

                getEthAddressList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.ethAddressList = [];
                        for (let i = 0; i < response.data.length; i++){
                            if(response.data[i].ip != ''){
                                this.ethAddressList.push(response.data[i]);
                            }
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                });

            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            updateRule(this.editInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改递归规则成功！'
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
                this.editInfo.strategyName = row.strategyName;
                this.editInfo.serverIds = row.serverIds;
                this.editInfo.outIp = row.outIp;
                this.editInfo.lineId = row.lineId;
                this.editInfo.domainName = row.domainName;
                this.editInfo.id = row.id
                console.log('editInfo:', this.editInfo, currentData);
            },
            resetForm(formName) {
                this.editVisible = false;
                this.$refs['editInfo'].resetFields();
            }

        },
    }
</script>
<style>
    .rule-form .el-form-item__error {
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


    .el_sel_short {
        width: 60% !important;
        margin-left: 20px;
    }

    .el_sel {
        width: 60% !important;
        margin-left: 20px;
    }

    .el_sel_long {
        width: 60% !important;
        margin-left: 20px;
    }

    .el_sel_short {
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