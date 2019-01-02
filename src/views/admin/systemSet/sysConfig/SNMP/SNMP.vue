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
                <li class="active">SNMP</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">SNMP</h3>
                            <div class="box-tools pull-right">
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 21px !important">
                            <div class="row">
                                <div class="snmp_box form_out" v-if="isEdit">
                                    <el-form labe-position="right" :model="ruleForm" :rules="rules" ref="ruleForm"
                                             label-width="118px" class="demo-ruleForm mail_form">
                                        <el-form-item label="" prop="" style="margin-left:0">
                                            <el-checkbox v-model="ruleForm.state" style="margin-left:-114px" :disabled="true">启动SNMP v1/v2
                                            </el-checkbox>
                                        </el-form-item>
                                        <el-form-item label="团体名称" prop="readOnly" class="form_item user_mandatory">
                                            <el-input v-model="ruleForm.readOnly"
                                                      class=""
                                                      :disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="允许访问的地址" class="form_item">
                                            <el-radio-group class="" v-model="snmp_public"  style="width: 300px;">
                                                <el-radio :label="true" :disabled="true">任意地址</el-radio>
                                                <el-radio :label="false" :disabled="true">指定地址/子网</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="" prop="" class="form_item">
                                            <el-input type="textarea" v-model="ruleForm.text" :placeholder="address"
                                                      :autosize="{ minRows: 3, maxRows: 8}"
                                                      :disabled="true"
                                            ></el-input>
                                        </el-form-item>
                                        <el-form-item label="" prop="" class="form_item form_item_btn">
                                            <el-button type="primary" @click="available" class="primary edit" >编辑</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>

                                <div class="snmp_box form_out" v-if="!isEdit">
                                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                                             label-width="118px" class="demo-ruleForm mail_form">
                                        <el-form-item label="" prop="" style="margin-left:0">
                                            <el-checkbox v-model="ruleForm.state" style="margin-left:-114px">启动SNMP v1/v2
                                            </el-checkbox>
                                        </el-form-item>
                                        <el-form-item label="团体名称" prop="readOnly" class="form_item">
                                            <el-input v-model="ruleForm.readOnly" class="pub_val "
                                                      :disabled="!ruleForm.state"></el-input>
                                        </el-form-item>
                                        <el-form-item label="允许访问的地址" class="form_item">
                                            <el-radio-group class="" v-model="snmp_public"  style="width: 300px;">
                                                <el-radio :label="true" :disabled="!ruleForm.state">任意地址</el-radio>
                                                <el-radio :label="false" :disabled="!ruleForm.state">指定地址/子网</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <!--//身份认证-->
                                        <el-form-item label="" prop="" class="form_item">
                                            <span v-if="snmp_public==true">
                                                <el-input type="textarea"   class="el_put " :placeholder="address"
                                                          :autosize="{ minRows: 3, maxRows: 8}"
                                                          :disabled="(ruleForm.state && snmp_public)"
                                                ></el-input>
                                            </span>
                                            <span v-else>
                                                <el-input type="textarea" v-model="ruleForm.text" class="el_text" :placeholder="address"
                                                          :autosize="{ minRows: 3, maxRows: 8}"
                                                          :disabled="(ruleForm.state && snmp_public) "
                                                          style=""
                                                ></el-input>
                                            </span>
                                        </el-form-item>
                                        <el-form-item label="" prop="" class="form_item form_item_btn" style="">
                                            <el-button plain @click="resetForm('ruleForm')" class="plain cancle">
                                                取消
                                            </el-button>
                                            <el-button type="primary" @click="save" class="primary confirm">保存</el-button>
                                        </el-form-item>
                                    </el-form>

                            </div>
                                <el-dialog
                                        title="提示"
                                        :visible.sync="dialogVisible"
                                        size="tiny"
                                        custom-class="snmp_dialog"
                                >
                                    <p>取消：不保存任何数据。</p><br>
                                    <p>稍后手动重启：保存数据；不重启相关服务和设备。</p><br>
                                    <p> 确定：保存数据，重启相关服务和设备</p>
                                    <span slot="footer" class="dialog-footer"  style="height:50px;">
                                            <el-button class="primary cancle" type="primary" @click="resetFormSave('ruleForm')">取 消</el-button>
                                            <el-button class="primary confirm" type="primary" @click="submitFormPause('ruleForm')" style="padding: 0 15px; width: auto;">稍后手动重启</el-button>
                                            <el-button class="primary confirm" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                                    </span>
                                </el-dialog>
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
    import {getSnmp, getSnmpPut} from "../../../../../api/systemSet/sysConfig/SNMP";
    import { getRestart, getRestartServer} from "../../../../../api/sysMaintain/sysOperation";

    export default {
        components: {},
        data() {
            var rea = (rule, value, callback) => {
                if(/^[A-Za-z0-9]{1,99}$/.test(value) == false){
                    callback(new Error('请输入数字、英文'));
                } else {
                    callback();
                }
            };
            return {
                pageId:143,
                readOnly:false,
                rules:{
                     readOnly:[
                         {  required: true,validator: rea, trigger: 'blur' },
                     ]
                },
                dialogVisible:false,
                serverChecked: false,
                isShow: true,
                isEdit:true,
                ruleForm: {
                    state: null,
                    readOnly: '',
                    text: '',
                },
                snmp_public:false,
                address:'示例:192.168.1.1、192.168.1.0/255.255.255.0、192.168.1.0/24多个用换行符隔开'
            }
        },

        computed: {},
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList()
        },
        methods: {
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

            resetForm(formName){
                this.isEdit=true;
                this.dialogVisible=false;
                this.getList();
                this.$refs[formName].resetFields();
            },
            resetFormSave(formName){
                this.dialogVisible=false;
                this.getList();
                this.$refs[formName].resetFields();
            },
            getList() {
                getSnmp().then((resp)=> {
                    if (resp.data.snmp.state == 'N') {
                        this.ruleForm.state = false;
                    } else {
                        this.ruleForm.state = true;
                    }

                    this.ruleForm.readOnly = resp.data.snmp.readOnly;
                    this.snmp_public = resp.data.snmp_public;
                    var textVal='';
                    for(let i=0;i<resp.data.snmpips.length;i++){
                       textVal+=resp.data.snmpips[i].ip+'\n'
                    }
                    this.ruleForm.text=textVal.substring(0,textVal.lastIndexOf('\n'))
                    console.log(resp, 'resp-getSnmp',this.ruleForm.text)
                }).catch(err=> {

                });
            },
            save(){
                console.log('text:',this.ruleForm.text)
                let pub_val=document.querySelector('.pub_val input').value;
                if(this.ruleForm.state==true){
                    if(/^[A-Za-z0-9]{1,}$/.test(this.ruleForm.readOnly) == false){
                        this.$message({
                            type: 'warning',
                            message: '请输入数字、字母的名称！'
                        });
                        return
                    }
                    if($('.el_text textarea').val()==''){
                    // if(this.ruleForm.text==''){
                        this.$message({
                            type: 'warning',
                            message: '请输入指定地址!'
                        });
                        return
                    }else if($('.el_text textarea').val().indexOf('-')) {
                        this.$message({
                            type: 'warning',
                            message: '指定地址不能包含 -'
                        });
                        return
                    }
                }else {

                }
                this.dialogVisible=true;
            },
            submitFormPause(formName) {
                var ips = null;
                let state = null;
                if (this.ruleForm.state == true) {
                    state = 'Y'
                } else {
                    state = 'N'
                }

                if((this.ruleForm.state && this.snmp_public) || !this.ruleForm.state){//此条件条件为真
                    console.log((this.ruleForm.state && this.snmp_public) || !this.ruleForm.state,'radio11')
                    console.log((this.ruleForm.state && this.snmp_public),'radio22')
                    ips=null;
                }else {
                    ips = this.ruleForm.text.split("\n");
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
//                        if(this.radio==2){
                                getSnmpPut({
                                    state: state,
                                    readOnly: this.ruleForm.readOnly,
                                    ips: ips
                                }).then((resp) => {
                                    console.log(resp, 'resp');
                                    if (resp.status = 'SUCCESS') {
                                        this.$message({
                                            type: 'success',
                                            message: '保存成功！'
                                        });
                                        this.getList();
                                        this.isEdit=true;
                                        this.dialogVisible=false;
                                        console.log(this.dialogVisible,'dialogVisible')
                                    } else {
                                        this.$message({
                                            type: 'warning',
                                            message: '保存失败!'
                                        });
                                    }
                                }).catch(e => {
                                    console.log("保存出错", e);
                                })
//                        }
//                        else {
//                            getSnmpPut({
//                                state: state,
//                                readOnly: this.ruleForm.readOnly,
//                                ips: ips
//                            }).then((resp) => {
//                                console.log(resp, 'resp');
//                                if (resp.status = 'SUCCESS') {
//                                    this.$message({
//                                        type: 'success',
//                                        message: '保存成功！'
//                                    });
////                                this.$refs[formName].resetFields();
//                                    this.getList();
//                                    this.isEdit=true;
//                                    this.dialogVisible=false;
//                                } else {
//                                    this.$message({
//                                        type: 'warning',
//                                        message: '保存失败!'
//                                    });
//                                }
//                            }).catch(e => {
//                                console.log("保存出错", e);
//                            })
//                        }
                    } else {
                        return false;
                    }
                });
            },
            submitForm(formName) {
                var ips = null;
                let state = null;
                if (this.ruleForm.state == true) {
                    state = 'Y'
                } else {
                    state = 'N'
                }
                if((this.ruleForm.state && this.snmp_public) || !this.ruleForm.state){//此条件条件为真
                    console.log((this.ruleForm.state && this.snmp_public) || !this.ruleForm.state,'radio11')
                    console.log((this.ruleForm.state && this.snmp_public),'radio22')
                    ips=null;
                }else {
                    ips = this.ruleForm.text.split("\n");
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        getSnmpPut({
                            state: state,
                            readOnly: this.ruleForm.readOnly,
                            ips: ips
                        }).then((resp) => {
                            console.log(resp, 'resp');
                            if (resp.status = 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功！'
                                });
                                this.getList();
                                this.isEdit=true;
                                this.dialogVisible=false;
                                getRestartServer().then((resp)=> {//重启服务
                                    console.log(resp, 'resp-getRestartServer')
                                }).catch(err=> {

                                })
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '保存失败!'
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

    .snmp_box {
        margin: 0 20px;
        padding: 10px 0px;
        .el-form-item__label {
            text-align: left;
        }
        .form_item{
            margin-left: 50px;
        }
        .form_item_btn{
            margin-top: 37px;
        }
    }
</style>
<style>
    .snmp_box .mail_form .el-form-item__content {
        width: 25%;
    }

    .snmp_box .mail_form .el_btn {
        position: relative;
        top: -36px;
        left: 110%;
    }
    /*************************************/
    /* 设置弹出框大小*/
    .el-dialog--tiny {
        width: 25%;
    }
    .snmp_dialog .el-dialog__title{
        margin-left: 12px;
    }
    .snmp_dialog .el-dialog__header {
        padding-left: 5px;
    }

    .snmp_dialog .el-dialog__body {
        padding: 30px 20px;
    }
    .snmp_dialog .el-dialog__footer{
        height: 59px;
    }
    .reset_item_width.el-radio-group{
        width: 300px;
    }
</style>
