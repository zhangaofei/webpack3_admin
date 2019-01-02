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
                <li class="active">邮箱服务器</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header ">
                            <h3 class="box-title">邮箱服务器</h3>
                            <div class="box-tools pull-right">
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 21px !important">
                            <div class="row">
                                <div class="mail_box form_out">
                                    <div v-if="isEdit">
                                        <el-form
                                                :model="ruleForm"
                                                :rules="rules"
                                                ref="ruleForm"
                                                label-width="210px"
                                                class="demo-ruleForm mail_form"
                                        >
                                            <el-form-item label="" style="margin-left:-206px">
                                                <el-checkbox :disabled="true" v-model="ruleForm.enableMailServer">启动邮件服务器
                                                </el-checkbox>
                                            </el-form-item>
                                        </el-form>
                                        <el-form
                                                :model="ruleForm"
                                                :rules="rules"
                                                ref="ruleForm"
                                                label-width="210px"
                                                class="demo-ruleForm mail_form"
                                        >
                                            <div :disabled="ruleForm.enableMailServer">
                                                <el-form-item label="发送邮箱服务器地址(SMTP)" prop="" class="item_mark">
                                                    <el-input type="" v-model="ruleForm.mailServerAddress" placehold="请输入如smtp.qq.com的地址" class="el_put"
                                                              :disabled="true"></el-input>
                                                </el-form-item>
                                                <el-form-item label="端口号" prop="" class="item_mark">
                                                    <el-input v-model.number="ruleForm.serverPort" placehold="请输0-6553的端口号" class="el_put"
                                                              :disabled="true"
                                                    ></el-input>
                                                </el-form-item>
                                                <el-form-item label="身份验证" prop="identityAuth">
                                                    <!--@change="identity-->
                                                    <el-checkbox :disabled="true" v-model="ruleForm.identityAuth" style="">发送身份证需要服务器验证
                                                    </el-checkbox>
                                                </el-form-item>
                                                <el-form-item label="用户名" prop="">
                                                    <el-input v-model="ruleForm.userName" @blur="smtpName(ruleForm.userName)" class="el_put"
                                                              :disabled="true"></el-input>
                                                </el-form-item>
                                                <el-form-item label="密码" prop="" >
                                                    <el-input v-model="ruleForm.password" type="password" @blur="smtpPsw(ruleForm.password)" class="el_put"
                                                              :disabled="true"></el-input>
                                                </el-form-item>
                                                <el-form-item label="发信邮箱" prop="" class="item_mark">
                                                    <el-input v-model="ruleForm.senderAddress" placehold="请输合法邮箱" class="el_put"
                                                              :disabled="true"></el-input>
                                                    <el-button class="primary" type="primary" @click="sendAction" :disabled="true" style="margin-left: 20px">发送测试
                                                    </el-button>
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-button type="primary" @click="available" class="primary edit" style="">编辑</el-button>
                                                </el-form-item>
                                            </div>
                                        </el-form>
                                    </div>
                                    <div v-if="!isEdit">
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                                                 label-width="210px" class="demo-ruleForm mail_form">
                                            <el-form-item label="" style="margin-left:-206px" >
                                                <el-checkbox  v-model="ruleForm.enableMailServer">启动邮件服务器
                                                </el-checkbox>
                                            </el-form-item>
                                        </el-form>
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                                                 label-width="210px" class="demo-ruleForm mail_form">
                                            <div :disabled="ruleForm.enableMailServer">
                                                <el-form-item label="发送邮箱服务器地址(SMTP)" prop="mailServerAddress" class="item_mark">
                                                    <el-input type="" v-model="ruleForm.mailServerAddress" class="el_put" placehold="请输入如smtp.qq.com的地址" @blur="ServerAddress(ruleForm.mailServerAddress)"
                                                               :disabled="!ruleForm.enableMailServer"    ></el-input>
                                                </el-form-item>
                                                <el-form-item label="端口号" prop="" class="item_mark">
                                                    <el-input v-model.number="ruleForm.serverPort" class="el_put" placehold="请输0-65535的端口号" blur="serverPortFun(ruleForm.serverPort)"
                                                                :disabled="!ruleForm.enableMailServer" ></el-input>
                                                </el-form-item>
                                                <el-form-item label="身份验证" prop="">
                                                    <!--@change="identity-->
                                                    <el-checkbox  v-model="ruleForm.identityAuth" :disabled="!ruleForm.enableMailServer" style="">发送身份证需要服务器验证
                                                    </el-checkbox>
                                                </el-form-item>
                                                <el-form-item label="用户名" prop="">
                                                    <el-input v-model="ruleForm.userName" @blur="smtpName(ruleForm.userName)" class="el_put"
                                                              :disabled="!(ruleForm.identityAuth && ruleForm.enableMailServer)"></el-input>
                                                </el-form-item>
                                                <el-form-item label="密码" prop="" >
                                                    <el-input v-model="ruleForm.password" type="password" @blur="smtpPsw(ruleForm.password)" class="el_put"
                                                              :disabled="!(ruleForm.identityAuth && ruleForm.enableMailServer)"></el-input>
                                                </el-form-item>
                                                <el-form-item label="发信邮箱" prop="" class="item_mark">
                                                    <el-input v-model="ruleForm.senderAddress" placehold="请输合法邮箱" @blur="sendAddress(ruleForm.senderAddress)"
                                                              class="el_put" :disabled="!ruleForm.enableMailServer"></el-input>
                                                    <el-button type="primary" @click="sendAction" :disabled="!ruleForm.enableMailServer" style="margin-left: 20px"
                                                               class="el_btn primary">发送测试
                                                    </el-button>
                                                </el-form-item>
                                                <el-form-item style="">
                                                    <el-button @click="cancle" class="plain cancle">
                                                        取消
                                                    </el-button>
                                                    <el-button type="primary" @click="submitForm('ruleForm')" class="primary confirm">保存</el-button>
                                                </el-form-item>
                                            </div>
                                        </el-form>
                                    </div>

                                    <!--*******************发送email弹框*************************-->
                                    <div class="mail public">
                                        <el-dialog
                                                title="发送测试"
                                                :visible.sync="emailVisible"
                                                size="small"
                                                custom-class="dialog public"
                                                top="10%"
                                                >
                                            <div class="mail-form">
                                                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2"
                                                         label-width="122px" class="demo-ruleForm">
                                                    <el-form-item label="接受邮箱地址" prop="testMailAddress"
                                                                  class="item_content">
                                                        <el-input v-model="ruleForm2.testMailAddress" class="el_put"
                                                                  placeholder="请输入接受邮箱地址"></el-input>
                                                    </el-form-item>
                                                </el-form>
                                            </div>
                                            <div class='form-footer ' slot="footer">
                                                <div  class="foot">
                                                    <span class="primary btn_middle cancle" @click="resetForm('ruleForm2')">取消</span>
                                                    <el-button
                                                            type="primary"
                                                            class="btn_middle primary confirm"
                                                            @click="submitForm2('ruleForm2')">
                                                        确定
                                                    </el-button>
                                                </div>
                                            </div>
                                        </el-dialog>
                                    </div>
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
    import {getMailList, putMailList, postMailList} from "../../../../../api/systemSet/sysConfig/mailServer";
    export default {
        components: {},
        data() {
            let mailAddr = (rule, value, callback) => {
                if (/^(smtp)\.([a-z0-9]+)\.([a-z0-9]{2,5})$/.test(value) == false) {
                    callback(new Error('请输入正确的邮箱'));
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
            let sendMail = (rule, value, callback) => {
                    if (/^[a-z0-9d]+([_][a-z0-9d]+)*@([a-z0-9d]+[-.])+[a-zd]{2,5}$/.test(value) == false) {
                        callback(new Error('请输入smtp.xx.com格式的地址'));
                    } else {
                        callback();
                    }
            };
            let receiveAddr = (rule, value, callback) => {
                if (/^[a-z0-9d]+([_][a-z0-9d]+)*@([a-z0-9d]+[-.])+[a-zd]{2,5}$/.test(value) == false) {
                    callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            };
            let name = (rule, value, callback) => {
                if(!value){
                    callback();
                }else{
                    if (/^[a-z0-9d]+([_][a-z0-9d]+)*@([a-z0-9d]+[-.])+[a-zd]{2,5}$/.test(value) == false) {
                        callback(new Error('请输入正确的邮箱'));
                    } else {
                        callback();
                    }
                }

            };
            let psw = (rule, value, callback) => {
                if(!value){
                    callback();
                }else{
                    if (/^[A-Za-z0-9~!@#$%^&*()-_]{1,20}$/.test(value) == false) {
                        callback(new Error('请输入1-20位之间数字、字母、英文符号'));
                    } else {
                        callback();
                    }
                }

            };
            return {
                rules: {

                },
                rules2:{
                    testMailAddress: [
                        {required: true,validator: receiveAddr, trigger: 'blur'},
                    ],
                },
                isEdit:true,
                isShow: true,
                emailVisible: false,
                ruleForm: {
                    enableMailServer: '',
                    mailServerAddress: '',
                    serverPort: '',
                    identityAuth: '',
                    userName: '',
                    password: '',
                    senderAddress: '',
                },
                ruleForm2: {
                    enableMailServer: '',
                    mailServerAddress: '',
                    serverPort: '',
                    identityAuth: '',
                    userName: '',
                    password: '',
                    senderAddress: '',
                    testMailAddress: ''
                },
                pageId:141,
                readOnly:false,
            }
        },
        computed: {},
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList()
        },
        methods: {
            ServerAddress(value){

                if (/^(smtp)\.([-+.]\w+)*\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) == false) {
                    return false
                }else {
                    return true
                }
            },
            serverPortFun(value){
                if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value) == false) {
                    return false
                }else {
                    return true
                }
            },
            smtpName(value){
                if (/^[a-z0-9d]+([_][a-z0-9d]+)*@([a-z0-9d]+[-.])+[a-zd]*$/.test(value) == false) {
                    return false
                }else {
                    return true
                }
            },
            smtpPsw(value){
                if (value==''||value==null) {
                    return false
                }else {
                    return true
                }
            },
            sendAddress(value){
                if (/^[a-z0-9d]+([_][a-z0-9d]+)*@([a-z0-9d]+[-.])+[a-zd]*$/.test(value) == false) {
                    return false
                }else {
                    return true
                }
            },
            sendAction(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.emailVisible=!this.emailVisible
                }
            },
            resetForm(formName) {
                this.emailVisible = false;
                this.$refs[formName].resetFields();
            },
            getList(){
                getMailList().then((resp)=> {
                    console.log(resp, 'list----mail');
                    this.ruleForm = resp.data;
                    this.ruleForm2 = resp.data;
                }).catch(err=> {

                });
            },
            identity(){
                if (this.ruleForm.enableMailServer && this.ruleForm.identityAuth) {
                    this.isShow = false
                } else {
                    this.isShow = true
                }
            },
            available(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isEdit=false
                }
            },
            cancle(){ //取消
                this.getList();
                this.isEdit=true;
            },
            submitForm(formName) {
                let ServerAddressCheckd=this.ServerAddress(this.ruleForm.mailServerAddress);
                let serverPortFuncheckd=this.serverPortFun(this.ruleForm.serverPort);
                let smtpNamecheckd=this.smtpName(this.ruleForm.userName);
                let smtpPswcheckd=this.smtpPsw(this.ruleForm.password);
                let sendAddresscheckd=this.sendAddress(this.ruleForm.senderAddress);

                if(this.ruleForm.enableMailServer==true){
                    if(!ServerAddressCheckd){
                        this.$message({
                            type: 'warning',
                            message: '请输入正确的smtp地址!'
                        });
                        return
                    }
                    if(!serverPortFuncheckd){
                        this.$message({
                            type: 'warning',
                            message: '请输入1-65535之间的数字!'
                        });
                        return
                    }
                    if(!sendAddresscheckd){
                        this.$message({
                            type: 'warning',
                            message: '请输入正确的发信邮箱!'
                        });
                        return
                    }
                    if(this.ruleForm.identityAuth==true){
                        if(!smtpNamecheckd){
                            this.$message({
                                type: 'warning',
                                message: '请输入邮箱格式的用户名!'
                            });
                            return
                        }
                        if(!smtpPswcheckd){
                            this.$message({
                                type: 'warning',
                                message: '密码不能为空!'
                            });
                            return
                        }
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                putMailList(this.ruleForm).then((resp) => {
                                    console.log(resp, 'put-resp', this.ruleForm);
                                    if (resp.status == 'SUCCESS') {
                                        this.$message({
                                            type: 'success',
                                            message: '保存成功！'
                                        });
                                        this.isEdit=true;
                                    } else {
                                    }
                                }).catch(e => {
                                    console.log("保存出错", e);
                                });
                            } else {
                                return false;
                            }
                        })
                    }else {
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                putMailList(this.ruleForm).then((resp) => {
                                    console.log(resp, 'put-resp', this.ruleForm);
                                    if (resp.status == 'SUCCESS') {
                                        this.$message({
                                            type: 'success',
                                            message: '保存成功！'
                                        });
                                        this.isEdit=true;
                                    } else {
                                    }
                                }).catch(e => {
                                    console.log("保存出错", e);
                                });
                            } else {
                                return false;
                            }
                        })
                    }
                }else {
                    putMailList(this.ruleForm).then((resp) => {
                        console.log(resp, 'put-resp', this.ruleForm);
                        if (resp.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '保存成功！'
                            });
                            this.isEdit=true;
                        } else {
                        }
                    }).catch(e => {
                        console.log("保存出错", e);
                    });
                }
                if(this.ruleForm.identityAuth==true){
                    if(this.ruleForm.userName==''||this.ruleForm.userName==null){
                        this.$message({
                            type: 'warning',
                            message: '请输入用户名!'
                        });
                        return
                    }
                    if(this.ruleForm.password==''||this.ruleForm.password==null){
                        this.$message({
                            type: 'warning',
                            message: '请输入密码!'
                        });
                        return
                    }
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            putMailList(this.ruleForm).then((resp) => {
                                console.log(resp, 'put-resp', this.ruleForm);
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功！'
                                    });
                                    this.isEdit=true;
                                } else {
                                }
                            }).catch(e => {
                                console.log("保存出错", e);
                            });
                        } else {
                            return false;
                        }
                    })
                }else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            putMailList(this.ruleForm).then((resp) => {
                                console.log(resp, 'put-resp', this.ruleForm);
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功！'
                                    });
                                    this.isEdit=true;
                                } else {
                                }
                            }).catch(e => {
                                console.log("保存出错", e);
                            });
                        } else {
                            return false;
                        }
                    })
                }
            },
            submitForm2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        postMailList(this.ruleForm2).then((resp)=> {
                            console.log(resp, 'put-resp')
                            console.log(this.ruleForm2, 'post')
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '发送测试成功！'
                                });
                                this.$refs[formName].resetFields();
                                this.emailVisible = false;
                            } else {
                            }
                        }).catch(e=> {
                            console.log("发送测试出错", e);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleClose(done) {

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

    .mail_box {
        margin: 0 20px;
        padding: 10px 5px;
        .el-form-item__label {
            text-align: left;
        }
    }

    .public .item_content {
        margin-bottom: 0;
    }
</style>
<style lang="scss">
    .mail_box .el-form-item__label {
        text-align: right;
    }
    .mail_box .mail_form .reset_item_width .el-form-item__content {
        width: auto;
    }

    .mail_box .mail_form .el-form-item__content {
        /*width: 25%;*/
        /*float: left;*/
        /*margin-left: 20px !important;*/
    }

    .mail_box .mail_form .el_btn {
        position: relative;
    }

    /*.mail_box .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 380px;*/
        /*margin-left: 20px;*/
    /*}*/

    /*.mail_box .el_sel {*/
        /*width: 65% !important;*/
        /*margin-left: 80px;*/
    /*}*/

    /*.mail .el_text {*/
        /*margin-left: 158px;*/
    /*}*/

    /*.mail-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width: 118px;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
    /*}*/

    /*.item_mark .el-form-item__label:before{*/
        /*content: '*';*/
        /*color: #f56c6c;*/
        /*margin-right: 4px;*/
    /*}*/

</style>
