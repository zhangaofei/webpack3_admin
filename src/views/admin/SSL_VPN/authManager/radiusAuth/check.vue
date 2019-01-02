<template>
    <div class="radius public">
        <el-dialog
                title="查看RADIUS认证"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose" @open="doInit(currentData)"
        >
            <div style="" class="radius-form">
                <el-form :model="authEditItem" :rules="rules" ref="authEditItem" label-width="130px" class="demo-ruleForm">
                    <el-form-item label="认证名称" prop="authName">
                        <el-input v-model="authEditItem.authName" placeholder="认证名称" class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="RADIUS服务器" prop="authHostOrIp">
                        <el-input v-model="authEditItem.authHostOrIp" placeholder="RADIUS服务器" class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="端口号" prop="authPort">
                        <el-input v-model="authEditItem.authPort" placeholder="端口号" class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="预共享密钥" prop="authSharedSecret">
                        <el-input v-model="authEditItem.authSharedSecret" placeholder="预共享密钥" type="password" class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="认证算法" prop="authAlgorithm">
                        <el-select v-model="authEditItem.authAlgorithm" placeholder="认证算法" popper-class="form-auth-select" class="el_sel" :disabled="true">
                            <el-option label="PAP" value="PAP"></el-option>
                            <el-option label="CHAP" value="CHAP"></el-option>
                            <el-option label="MSCHAPv1" value="MSCHAPv1"></el-option>
                            <el-option label="MSCHAPv2" value="MSCHAPv2"></el-option>
                            <el-option label="EAPMD5" value="EAPMD5"></el-option>
                            <el-option label="EAPMSCHAPv2" value="EAPMSCHAPv2"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
            </div>
            <div class='form-footer foot' slot="footer" >
                <!--<span @click="handleClose" class="canle">返回</span>-->
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {editAuths} from "../../../../../api/SSL_VPN/new_authManager/new_auth";
    export default{
        components: {
        },
        data(){
            let port = (rule, value, callback) => {
                if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value) == false) {
                    callback(new Error('请输入1-65535之间的数字'));
                } else {
                    callback();
                }
            };
            let ips = (rule, value, callback) => {
                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                    callback(new Error("请输入正确的服务器地址"));
                } else if(value == '0.0.0.0' || value == '255.255.255.255'){
                    callback(new Error("请输入正确的服务器地址"));
                } else {
                    callback();
                }
            };
            return {
                rules: {
                    authName: [
                        {required: true, message:'认证名不能为空', trigger: 'blur'}
                    ],
                    authPort: [
                        {required: true, validator: port, trigger: 'blur'}
                    ],
                    authSharedSecret:[
                        {required: true, message:'预共享密钥不能为空', trigger: 'blur'}
                    ],
                    authAlgorithm:[
                        {required: true,message:'认证算法不能为空', trigger: 'blur'}
                    ],
                    authHostOrIp:[
                        {required: true, validator: ips, trigger: 'change'}
                    ]
                },
                authEditItem:{
                    id:'',
                    authName: "",
                    authType: "",
                    authHostOrIp: "",
                    authSpareHostOrIp: "",
                    authPort: '',
                    authDomainName: "",
                    authSharedSecret: "",
                    authAlgorithm: "",
                    authBaseDn: "",
                    authDatabaseName: "",
                    authEncoding: "",
                    authUserName: "",
                    authPassword: "",
                    authUserSetDTO: null,
                    authIsEnabled: 0
                },
                editVisible:true,
                type:'11'
            }
        },
        props: {
            currentData: Object
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            handleClose() {
                this.$emit("onChangeStatus");
            },
            doInit(currentData){
                this.authEditItem=currentData
            }
        }

    }
</script>

