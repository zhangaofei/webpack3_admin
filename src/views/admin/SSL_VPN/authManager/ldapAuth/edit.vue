<template>
    <div class="ldap public">
        <el-dialog
                title="修改LDAP认证"
                :visible.sync="editVisible"
                custom-class="dialog public"
                size="small"
                top="5%"
                @close="handleClose" @open="doInit(currentData)"
        >
            <div style="" class="ldap-form">
                <el-form :model="authEditItem" :rules="rules" ref="authEditItem" label-width="129px" class="lineForm">
                    <el-form-item label="认证名称" prop="authName">
                        <el-input v-model="authEditItem.authName" placeholder="认证名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="LDAP服务器" prop="authHostOrIp">
                        <el-input v-model="authEditItem.authHostOrIp" placeholder="LDAP服务器" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="端口号" prop="authPort">
                        <el-input v-model="authEditItem.authPort" placeholder="端口号" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="BASE DN" prop="authBaseDn">
                        <el-input v-model="authEditItem.authBaseDn" placeholder="BASE DN" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="服务器管理账号" prop="authDomainName">
                        <el-input v-model="authEditItem.authDomainName" placeholder="服务器管理账号"  class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="服务器管理口令" prop="authPassword">
                        <el-input v-model="authEditItem.authPassword" placeholder="服务器管理口令" type="password" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="ID 字段名" prop="authUserSetDTO.idField">
                        <el-input v-model="authEditItem.authUserSetDTO.idField" placeholder="ID 字段名" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="用户全名字段名" prop="authUserSetDTO.fullName">
                        <el-input v-model="authEditItem.authUserSetDTO.fullName" placeholder="用户全名字段名" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="手机字段名" prop="authUserSetDTO.phone">
                        <el-input v-model="authEditItem.authUserSetDTO.phone" placeholder="手机字段名" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱字段名" prop="authUserSetDTO.email">
                        <el-input v-model="authEditItem.authUserSetDTO.email" placeholder="邮箱字段名" class="el_put"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span @click="resetForm('authEditItem')" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitEditForm('authEditItem')">
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
    import {editAuths} from "../../../../../api/SSL_VPN/new_authManager/new_auth";
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
                    callback(new Error("请输入合法的服务器地址"));
                } else if(value == '0.0.0.0' || value == '255.255.255.255'){
                    callback(new Error("请输入合法的服务器地址"));
                } else {
                    callback();
                }
            };
            return {
                rules: {
                    authName: [
                        {  required: true,validator: name, trigger: 'blur'}
                    ],
                    authPort: [
                        {required: true, validator: port, trigger: 'blur'}
                    ],
                    authBaseDn: [
                        {required: true, message:'BASE DN不能为空',trigger: 'blur'}
                    ],
                    authDomainName:[
                        {required: true, message:'服务器管理账号不能为空',trigger: 'blur'}
                    ],
                    authPassword:[
                        {required: true, message:'服务器管理口令不能为空',trigger: 'blur'}
                    ],
                    authHostOrIp:[
                        {required: true, validator: ips, trigger: 'blur'}
                    ],
                    'authUserSetDTO.idField':[
                        {required: true,message:'ID字段名不能为空',trigger: 'blur'}
                    ],
                },
                authEditItem:{
                    id:'',
                    authName: "",
                    authType: "10",
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
                    authUserSetDTO:{
                        idField:'',
                        tableName:'',
                        userName:'',
                        password:'',
                        fullName:'',
                        email:'',
                        phone:''
                    },
                    authIsEnabled: 0
                },
                editVisible:true,
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
                this.authEditItem=currentData;
            },
            submitEditForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        editAuths(this.authEditItem).then((resp)=>{
                            if(resp.status=='SUCCESS'){
                                this.$message({
                                    type:'success',
                                    message:'更新LDAP认证成功！'
                                });
                            this.editVisible=false;
                            this.$emit('onChangeStatus');
                            this.$refs[formName].resetFields();
                        }else{
                                this.$message({
                                    type:'warning',
                                    message:resp.code.info
                                });
                        }
                    }).catch(e=>{
                            console.log("更新auth出错",e);
                        });
                    } else {

                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.editVisible=false;
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    .lineForm .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0;
        position: absolute;
        top: 100%;
        left: 130px;
    }
</style>