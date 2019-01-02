<template>
    <div class="radius public">
        <el-dialog
                title="新建RADIUS认证"
                :visible.sync="addVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose"
        >
            <div style="" class="radius-form">
                <el-form :model="authAddItem" :rules="rules" ref="authAddItem" label-width="130px" class="radius-ruleForm">
                    <el-form-item label="认证名称" prop="authName">
                        <el-input v-model="authAddItem.authName" placeholder="认证名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="RADIUS服务器" prop="authHostOrIp">
                        <el-input v-model="authAddItem.authHostOrIp" placeholder="RADIUS服务器" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="端口号" prop="authPort">
                        <el-input v-model="authAddItem.authPort" placeholder="端口号" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="预共享密钥" prop="authSharedSecret">
                        <el-input v-model="authAddItem.authSharedSecret" placeholder="预共享密钥" type="password" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="认证算法" prop="authAlgorithm">
                        <el-select v-model="authAddItem.authAlgorithm" placeholder="认证算法" popper-class="form-auth-select" class="el_sel">
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
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span @click="resetForm('authAddItem')" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitForm('authAddItem')">
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
    import {addAuths} from "../../../../../api/SSL_VPN/new_authManager/new_auth";
    export default{
        components: {
        },
        data(){
            let name = (rule, value, callback) => {
                value = value.replace(/\s+/g,'')
                if (value.length == 0) {
                    callback(new Error('认证名称不能为空'));
                } else {
                    callback();
                }
            };
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
                         {required: true, validator: name, trigger: 'blur'}
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
                authAddItem:{
                    authName: "",
                    authType: "11",
                    authHostOrIp: "",
                    authSpareHostOrIp: "",
                    authPort: '',
                    authDomainName: "",
                    authSharedSecret: "",
                    authAlgorithm: "CHAP",
                    authBaseDn: "",
                    authDatabaseName: "",
                    authEncoding: "",
                    authUserName: "",
                    authPassword: "",
                    authUserSetDTO: null,
                    authIsEnabled: 1
                },
                type:'11',
                addVisible:true
            }
        },
        methods: {
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addAuths(this.authAddItem).then((resp)=>{
                            if(resp.status=='SUCCESS'){
                                this.$message({
                                    type:'success',
                                    message:'新建radius认证成功！'
                                });
                                this.addVisible=false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            }else{
                                this.$message({
                                    type:'warning',
                                    message:resp.code.info
                                });
                            }
                        }).catch(e=>{
                            console.log("新建auth出错",e);
                        });
                    } else {

                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.addVisible=false;
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
    .radius-ruleForm .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0;
        position: absolute;
        top: 100%;
        left: 130px;
    }
</style>