<template>
    <div>
        <div class="content-header">
            <h1>
                <!--系统配置-->
                <small>
                    <!--序列号管理-->
                </small>
            </h1>
            <ol class="breadcrumb " style="left:12px">
                <li><a ><i class="fa fa-gears"></i>系统管理</a></li>
                <li><a >系统设置</a></li>
                <li class="active">Syslog</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">Syslog</h3>
                            <div class="box-tools pull-right">
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 21px !important">
                            <div class="row">
                                <div class="sys_box form_out" v-if="isEdit">
                                    <el-form :model="ruleForm"   :rules="rules" ref="ruleForm" label-width="116px" class="demo-ruleForm mail_form">
                                        <el-form-item label="" prop="" style="margin-left:-114px">
                                            <el-checkbox v-model="ruleForm.enable" :disabled="true">启动Syslog</el-checkbox>
                                        </el-form-item>
                                        <el-form-item label="服务器名称" prop="sysServerName" class="form_item item_mark">
                                            <el-input class="" type="" v-model="ruleForm.sysServerName"  :disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="地址" prop="sysLogIp" class="form_item item_mark">
                                            <el-input  class="" v-model="ruleForm.sysLogIp" :disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="端口" prop="port" class="form_item item_mark" style="margin-bottom: 60px">
                                            <el-input v-model="ruleForm.port" class="" :disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="" prop="" class="form_item">
                                            <el-button class="primary edit" type="primary" @click="available" >编辑</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <div class="sys_box form_out" v-if="!isEdit">
                                    <el-form :model="ruleForm"   :rules="rules" ref="ruleForm" label-width="116px" class="demo-ruleForm mail_form">
                                        <el-form-item label="" prop="" style="margin-left:-114px">
                                            <el-checkbox v-model="ruleForm.enable">启动Syslog</el-checkbox>
                                        </el-form-item>
                                        <el-form-item label="服务器名称" prop="sysServerName" class="form_item item_mark">
                                            <el-input type="" class="" v-model="ruleForm.sysServerName" :disabled="!ruleForm.enable" @blur="serverNameFun(ruleForm.sysServerName)"></el-input>
                                        </el-form-item>
                                        <el-form-item label="地址" prop="sysLogIp" class="form_item item_mark">
                                            <el-input class=""  v-model="ruleForm.sysLogIp" :disabled="!ruleForm.enable" @blur="logIpFun(ruleForm.sysLogIp)"></el-input>
                                        </el-form-item>
                                        <el-form-item label="端口" prop="port" class="form_item item_mark" style="margin-bottom: 60px">
                                            <el-input class="" v-model="ruleForm.port" :disabled="!ruleForm.enable" @blur="portFun(ruleForm.port)"></el-input>
                                        </el-form-item>
                                        <el-form-item  class="form_item reset_item_width" >
                                            <el-button class="plain cancle" @click="resetForm('ruleForm')" style="">取消</el-button>
                                            <el-button class="primary confirm" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from "../../../../../store/index";
    import permissionRoutes from 'store/permission';
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import {getSyslogList, saveSyslogList} from "../../../../../api/systemSet/sysConfig/syslog";
    export default {
        components: {},
        data() {
            return {
                pageId:142,
                readOnly:false,
                rulemail:{},
                rules:{},
                isEdit:true,
                ruleForm: {
                    enable:null,
                    port: null,
                    sysLogIp: null,
                    sysServerName: null
                },
                emailVisible:false,
            }
        },
        computed: {},
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        methods: {
            serverNameFun(value){
                if(/^[\u4e00-\u9fa5A-Za-z0-9_]{1,20}$/.test(value) == false){
                    return false
                }else {
                    return true
                }
            },
            logIpFun(value){
                if (/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/.test(value) == false){
                    return false
                }else {
                    return true
                }
            },
            portFun(value){
                if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value) == false) {
                    return false
                }else {
                    return true
                }
            },
            available(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isEdit=!this.isEdit
                }
            },
            getList() {
                getSyslogList().then((resp)=> {
                    console.log(this.ruleForm,'submit')
                    this.ruleForm=resp.data;
                }).catch(err=> {

                });
            },
            submitForm(formName) {
                let nameCheckd=this.serverNameFun(this.ruleForm.sysServerName);
                let ipcheckd=this.logIpFun(this.ruleForm.sysLogIp);
                let portcheckd=this.portFun(this.ruleForm.port);
                if (this.ruleForm.enable==true) {
                    if(!nameCheckd){
                        this.$message({
                            type: 'warning',
                            message: '请输入汉字、数字、字母、及下划线的服务器名称!'
                        });
                        return
                    }
                    if(!ipcheckd){
                        this.$message({
                            type: 'warning',
                            message: '请输入合法地址!'
                        });
                        return
                    }
                    if(!portcheckd){
                        this.$message({
                            type: 'warning',
                            message: '请输入1-65535之间的端口!'
                        });
                        return
                    }
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            saveSyslogList(this.ruleForm).then((resp) => {
                                console.log(resp, 'resp');
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功!'
                                    });
                                    this.isEdit=!this.isEdit;
                                    this.getList();

                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message:resp.code.info
                                    });
                                }
                            }).catch(e => {
                                console.log("保存出错", e);
                            })
                        } else {
                            return false;
                        }
                    });

                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            saveSyslogList(this.ruleForm).then((resp) => {
                                console.log(resp, 'resp');
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功!'
                                    });
                                    this.isEdit=!this.isEdit;
                                    this.getList();

                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message:resp.code.info
                                    });
                                }
                            }).catch(e => {
                                console.log("保存出错", e);
                            })
                        } else {
                            return false;
                        }
                    });
                }
            },
            resetForm(formName) {
                this.isEdit=!this.isEdit;
                this.emailVisible=false;
                this.$refs[formName].resetFields();
                this.getList();
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            padding: 0;
            margin: 0;
        }
    }

    .sys_box {
        margin: 0 20px;
        /*background: #f5f5f5;*/
        padding: 10px 5px;
        /*border:1px solid lightgrey;*/
        .el-form-item__label{
            /*text-align: left;*/
        }
        .form_item{
            margin-left: 50px;
        }
        .time_ul {
            padding: 30px;
            border: 1px solid lightgrey;
            li {
                border-bottom: 1px solid lightgrey;
                margin-top: 20px;
                div {
                    margin-bottom: 15px;
                    span {
                        font-size: 16px;
                        margin-right: 20px;
                        width: 100px;
                        display: inline-block;
                    }

                }
            }
        }

    }
</style>
<style lang="scss">
    .sys_box .mail_form .el-form-item__content{
        width:25%;
    }
    .sys_box .mail_form .el_btn{
        float:right;
        padding: 0;
        color: #fff;
        border-radius: 1px;
    }
    /*************************************/

    .sys_box .mail_form .reset_item_width .el-form-item__content{
        width: auto;
    }
    /*.sys_box{*/
        /*.el-form{*/
            /*.el-form-item{*/
                /*margin-bottom: 40px;*/
                /*.el-input {*/
                    /*width: 230px;*/
                /*}*/
            /*}*/
        /*}*/
    /*}*/
</style>
