<template>
    <div class="ad public">
        <el-dialog
                title="修改AD认证"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose" @open="doInit(currentData)"
        >
            <div style="" class="ad-form">
                <el-form :model="authEditItem" :rules="rules" ref="authEditItem" label-width="130px" class="demo-ruleForm">
                    <el-form-item label="认证名称" prop="authName">
                        <el-input v-model="authEditItem.authName" placeholder="认证名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="AD服务器" prop="ipstr">
                        <el-input v-model="authEditItem.ipstr" placeholder="AD服务器" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="备用服务器" prop="authSpareHostOrIp" v-if="false">
                        <el-input v-model="authEditItem.authSpareHostOrIp" placeholder="备用服务器" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="域名" prop="authDomainName">
                        <el-input v-model="authEditItem.authDomainName" placeholder="域名" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="BASE DN" prop="authBaseDn">
                        <el-input v-model="authEditItem.authBaseDn" placeholder="BASE DN" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="服务器管理账号" prop="authUserName">
                        <el-input v-model="authEditItem.authUserName" placeholder="服务器管理账号" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="服务器管理口令" prop="authPassword">
                        <el-input v-model="authEditItem.authPassword" placeholder="服务器管理口令" type="password" class="el_put"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
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
            let ips = (rule, value, callback) => {
                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                    callback(new Error("请输入合法的服务器地址"));
                } else if(value == '0.0.0.0' || value == '255.255.255.255'){
                    callback(new Error("请输入合法的服务器地址"));
                } else {
                    callback();
                }
            };
            let ip = (rule, value, callback) => {
                if(!value){
                    callback();
                } else {
                    if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                        callback(new Error("请输入合法的服务器地址"));
                    } else if(value == '0.0.0.0' || value == '255.255.255.255'){
                        callback(new Error("请输入合法的服务器地址"));
                    } else {
                        callback();
                    }
                }
            };
            return {
                rules: {
                    authName: [
                        {required: true,message:'认证名不能为空',trigger: 'blur'}
                    ],
                    authDomainName:[
                        {required: true,message:'域名不能为空', trigger: 'blur' }
                    ],
                    authBaseDn:[
                        {required: true,message:'BASE DN不能为空', trigger: 'blur' }
                    ],
                    authUserName:[
                        {required: true,message:'服务器管理账号不能为空', trigger: 'blur' }
                    ],
                    authPassword:[
                        {required: true,message:'服务器管理口令不能为空', trigger: 'blur' }
                    ],
                    ipstr:[
                        {required: true, validator: ips, trigger: 'blur'}
                    ],
                    authSpareHostOrIp:[
                        {validator: ip, trigger: 'blur'}
                    ]
                },
                authEditItem:{
                    id:'',
                    authName: "",
                    authType: "12",
                    authHostOrIp: "",
                    ipstr:'',
                    authSpareHostOrIp: "",
                    authDomainName: "",
                    authBaseDn: "",
                    authUserName: "",
                    authPassword: "",
                },
                editVisible:true,
                type:'12'
            }
        },
        props: {
            currentData: Object
        },
        created(){
            this.doInit(this.currentData);
        },
        methods: {
            handleClose() {
                this.$emit("onChangeStatus");
            },
            doInit(Data){
                this.authEditItem=Data;
                this.authEditItem.ipstr = Data.authHostOrIp;
            },
            submitEditForm(formName){
                let str = 'ldap://' + this.authEditItem.ipstr + ':389';
                this.authEditItem.authHostOrIp = str;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        editAuths(this.authEditItem).then((resp)=>{
                            if(resp.status=='SUCCESS'){
                                this.$message({
                                    type:'success',
                                    message:'更新AD认证成功！'
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
    .db-auth .el-table td, .el-table th{
        padding: 3px 0!important;
    }
    .db-auth  .el-table_1_column_13{
        padding:0 17px!important;
    }
</style>
