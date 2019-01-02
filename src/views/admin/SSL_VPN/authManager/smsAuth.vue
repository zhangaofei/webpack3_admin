<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open">用户管理</i></a></li>
                <li><a >认证设置</a></li>
                <li class="active">短信认证</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="height:700px;">
                        <div class="box-header">
                            <h3 class="box-title">短信认证</h3>
                        </div>
                        <div>
                            <div  class="l3net-form">
                                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="170px" class="demo-ruleForm" MultipartFile>
                                    <div style="margin-bottom: 30px;">
                                        <!--<input type="checkbox" v-model="addInfo.sms_if_apply" :disabled="isAvailable1()" style="width: 17px;height: 17px;margin-bottom: 10px">-->
                                        <el-checkbox v-model="addInfo.sms_if_apply" :disabled="isAvailable1()" >{{'启用'}}</el-checkbox>
                                        <!--{{'启用'}}-->
                                    </div>
                                    <el-form-item label="accessKeyId" prop="sms_access_key_id">
                                        <el-input v-model="addInfo.sms_access_key_id" :disabled="isAvailable()" class="el_put" placeholder="请输入accessKeyId" style="width: 400px;"></el-input>
                                    </el-form-item>
                                    <el-form-item label="accessKeySecret" prop="sms_access_key_secret">
                                        <el-input v-model="addInfo.sms_access_key_secret" :disabled="isAvailable()"  class="el_put" placeholder="请输入accessKeySecret" style="width: 400px;"></el-input>
                                    </el-form-item>
                                    <el-form-item label="signName" prop="sms_sign_name">
                                        <el-input v-model="addInfo.sms_sign_name" :disabled="isAvailable()" class="el_put" placeholder="请输入signName" style="width: 400px;"></el-input>
                                    </el-form-item>
                                    <el-form-item label="templateIdCode" prop="sms_template_id_code">
                                        <el-input v-model="addInfo.sms_template_id_code" :disabled="isAvailable()" class="el_put" placeholder="请输入templateIdCode" style="width: 400px;"></el-input>
                                    </el-form-item>
                                    <el-form-item label="templateAuditCode" prop="sms_template_audit_code">
                                        <el-input v-model="addInfo.sms_template_audit_code" :disabled="isAvailable()" class="el_put" placeholder="请输入templateAuditCode" style="width: 400px;"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class='form-footer'
                                 slot="footer"
                                 style="height:50px"
                                 v-if="isShow">
                                <div style="margin-top: 40px;margin-left: 210px">
                                    <el-button
                                            type="primary"
                                            class="primary edit btn_middle"
                                            @click="edit"
                                    >
                                        编辑
                                    </el-button>
                                </div>
                            </div>
                            <div class='form-footer ' slot="footer"  style="height:50px;margin-left: 210px" v-if="!isShow">
                                <div>
                                    <el-button
                                            class="plain cancle"
                                            @click="resetForm('addInfo')" style="margin-right: 10px;">
                                        取消
                                    </el-button>
                                    <el-button
                                            type="primary"
                                            style="padding: 0;"
                                            class="primary confirm btn_middle"
                                            @click="submitForm('addInfo')">
                                        确定
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>
<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from '../../../../store';
    import {getSmsAuthList, editSmsAuditConfig} from "../../../../api/SSL_VPN/new_authManager/smsAuth.js";
    export default{
        components: {

        },
        data(){
            return {
                rules: {
                    sms_if_apply: [
                        {required: true, message: '请输入sms_if_apply',trigger: 'blur'},
                    ],
                    sms_access_key_id: [
                        {required: true, message: '请输入sms_access_key_id', trigger: 'blur'},
                    ],
                    sms_access_key_secret: [
                        {required: true, message: '请输入sms_access_key_secret', trigger: 'blur'},
                    ],
                    sms_sign_name: [
                        {required: true, message: '请输入sms_sign_name', trigger: 'blur'},
                    ],
                    sms_template_id_code: [
                        {required: true, message: '请输入sms_template_id_code', trigger: 'blur'},
                    ],
                    sms_template_audit_code: [
                        {required: true, message: '请输入sms_template_audit_code', trigger: 'blur'},
                    ],
                },
                readOnly:false,
                pageId:87,
                addInfo:{
                    sms_if_apply:'',
                    sms_access_key_id:'',
                    sms_access_key_secret:'',
                    sms_sign_name:'',
                    sms_template_id_code:'',
                    sms_template_audit_code:''
                },
                sourceData:[],
                isShow:true
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        methods: {
            isAvailable(){
                if(this.isShow){
                    return true;
                } else {
                    if(this.addInfo.sms_if_apply == 'no' || this.addInfo.sms_if_apply == false){
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            isAvailable1(){
                return this.isShow;
            },
            getList(){
                getSmsAuthList().then((resp)=>{
                    if(resp.status == 'SUCCESS'){
                        this.sourceData = resp.data;
                        for(let i = 0; i < this.sourceData.length; i++){
                            if(this.sourceData[i]['name'] == 'sms_access_key_id'){
                                this.addInfo.sms_access_key_id = this.sourceData[i]['setting'];
                            } else if(this.sourceData[i]['name'] == 'sms_access_key_secret'){
                                this.addInfo.sms_access_key_secret = this.sourceData[i]['setting'];
                            } else if(this.sourceData[i]['name'] == 'sms_sign_name'){
                                this.addInfo.sms_sign_name = this.sourceData[i]['setting'];
                            } else if(this.sourceData[i]['name'] == 'sms_template_id_code'){
                                this.addInfo.sms_template_id_code = this.sourceData[i]['setting'];
                            } else if(this.sourceData[i]['name'] == 'sms_template_audit_code'){
                                this.addInfo.sms_template_audit_code = this.sourceData[i]['setting'];
                            } else if(this.sourceData[i]['name'] == 'sms_if_apply'){
                                this.addInfo.sms_if_apply = this.sourceData[i]['setting'];
                                if(this.addInfo.sms_if_apply == 'false'){
                                    this.addInfo.sms_if_apply = false
                                } else {
                                    this.addInfo.sms_if_apply = true
                                }
                            }
                        }
                        console.log('addInfo:', this.addInfo);
                    }
                }).catch(err=>{

                });
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addInfo.sms_access_key_id = this.addInfo.sms_access_key_id.replace(/\s/ig,'');
                        this.addInfo.sms_access_key_secret = this.addInfo.sms_access_key_secret.replace(/\s/ig,'');
                        console.log('111111:', this.addInfo.sms_access_key_id, this.addInfo.sms_access_key_secret);
                        for(let i = 0; i < this.sourceData.length; i++){
                            if(this.sourceData[i]['name'] == 'sms_access_key_id'){
                                this.sourceData[i]['setting'] = this.addInfo.sms_access_key_id;
                            } else if(this.sourceData[i]['name'] == 'sms_access_key_secret'){
                                this.sourceData[i]['setting'] = this.addInfo.sms_access_key_secret;
                            } else if(this.sourceData[i]['name'] == 'sms_sign_name'){
                                this.sourceData[i]['setting'] = this.addInfo.sms_sign_name;
                            } else if(this.sourceData[i]['name'] == 'sms_template_id_code'){
                                this.sourceData[i]['setting'] = this.addInfo.sms_template_id_code;
                            } else if(this.sourceData[i]['name'] == 'sms_template_audit_code'){
                                this.sourceData[i]['setting'] = this.addInfo.sms_template_audit_code;
                            } else if(this.sourceData[i]['name'] == 'sms_if_apply'){
                                this.sourceData[i]['setting'] = this.addInfo.sms_if_apply;
                            }
                        }
                        editSmsAuditConfig(this.sourceData).then((resp)=>{
                            if(resp.status == 'SUCCESS'){
                                this.$message({
                                    type:'success',
                                    message:'短信认证设置成功！'
                                });
                                this.isShow = true;
                            } else {
                                this.$message({
                                    type:'warning',
                                    message:resp.code.info
                                });
                            }
                        }).catch(err=>{

                        });
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.isShow = true;
                this.getList()
            },
            edit(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isShow = false;
                }
            }
        }
    }
</script>
<style>
    .l3net-form{
        margin-top: 30px;
        margin-left: 40px;
    }
    .l3net-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 87% !important;
        left: 20px !important;
    }
    .l3net-form .el-form-item__label{
        margin-left: 0 !important;
    }
</style>
<style scoped="scoped" lang="scss">
    /deep/.el-form-item{
        margin-bottom: 30px;
    }
    /deep/.content {
        .el-form-item__label{
            padding: 0 20px 0 0;
        }
    }
</style>