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
                <li><a><i class="fa fa-gears"></i>系统维护</a></li>
                <li class="active">实用工具</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">实用工具</h3>
                            <div class="box-tools pull-right">
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-top: 20px; padding-bottom: 20px;">
                            <div class="row">
                                <div class="tool__box">
                                    <el-form :model="toolForm" :rules="rules"
                                             label-position="right"
                                             ref="toolForm"
                                             label-width="92px" class="demo-toolForm mail_form">
                                        <el-form-item label="命令" prop="commandType">
                                            <el-select class="set_margin_left20" :disabled="available()" v-model="toolForm.commandType" placeholder="请选择...">
                                                <el-option label="arp" value="arp"></el-option>
                                                <el-option label="ifconfig" value="ifconfig"></el-option>
                                                <el-option label="ping" value="ping"></el-option>
                                                <!--<el-option label="telnet" value="telnet"></el-option>-->
                                                <!--<el-option label="route" value="route"></el-option>-->
                                                <el-option label="traceroute" value="traceroute"></el-option>
                                                <el-option label="nslookup" value="nslookup"></el-option>
                                                <!--<el-option label="tcpdump" value="tcpdump"></el-option>-->
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="内容" prop="commandValue">
                                            <el-input class="set_margin_left20" :disabled="available()||toolForm.commandType=='ifconfig'" v-model="toolForm.commandValue"></el-input>
                                        </el-form-item>
                                        <el-form-item label="" prop="">
                                            <el-col class="set_margin_left20">
                                                <el-button type="primary" @click="submitForm('toolForm')" class="primary confirm" size="small">执行</el-button>
                                            </el-col>
                                            <el-col class="set_margin_left20" style="margin-top: 20px;">
                                                <el-input type="textarea" v-model="toolForm.text" class="text" :autosize="{ minRows: 5, maxRows: 10}"
                                                          :disabled="isShow" placeholder=""></el-input>
                                            </el-col>
                                        </el-form-item>

                                    </el-form>
                                    <!---->
                                    <iframe name="myiframe" id="myrame" src="https://192.168.63.174/casbs_terminal/#/client/NQBjAG15c3Fs" frameborder="0" align="left" width="100%" height="100%" scrolling="no" v-if="false">
                                    </iframe>

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
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import {getPracticalTool} from '../../../../api/sysMaintain/practicalTool'
    export default {
        components: {},
        data() {
            return {
                readOnly:false,
                pageId:153,
                isShow: true,
                rules: {},
                toolForm: {
                    commandType: 'ping',
                    commandValue: '',
                    text:''//储存返回的数据
                }
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
                return this.readOnly;
            },
            resetForm(formName) {
                this.emailVisible = false;
                this.$refs[formName].resetFields();
            },
            getList(){
//                getPracticalTool().then((resp)=> {
//                    console.log(resp, 'list----tool');
////                    this.toolForm = resp.data;
//
//                }).catch(err=> {
//
//                });
            },
            submitForm(formName) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            console.log(this.toolForm, '192.168.1.1')
                            getPracticalTool(this.toolForm).then((resp) => {
                                console.log(resp, 'put-resp', this.toolForm);
                                this.toolForm.text = resp.data
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '执行成功！'
                                    });
//                                this.getList();
                                } else {
                                }
                            }).catch(e => {
                                console.log("执行出错", e);
                            });
                        } else {
                            return false;
                        }
                    })
                }
            },
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .tool__box {
        margin: 0 20px;
        padding: 30px;
        .el-form-item__label {
            text-align: left;
        }
    }
    /deep/.content .reset_margin_title_right label.el-form-item__label,
    /deep/ .content label.el-form-item__label{
        padding: 0;
    }
</style>
<style>

    .tool__box .mail_form .el-form-item__content {
        width: 35%;
    }

    .tool__box .mail_form .el_btn {
        position: relative;
        top: -36px;
        left: 110%;
    }

    /*************************************/
    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .mail .dialog {
        min-width: 830px;
    }

    .mail .el-dialog__header {
        padding-left: 5px;
    }

    .mail .el_put {
        position: relative;
        display: inline-block;
        width: 50% !important;
        margin-left: 80px;
    }

    .mail .el_sel {
        width: 65% !important;
        margin-left: 80px;
    }

    .mail .el_text {
        margin-left: 158px;
    }

    .mail-form .el-form-item__label {
        float: left;
        min-width: 102px;
        font-size: 15px;
        margin-left: 78px;
    }

    .mail-form .el-form-item {
        margin-bottom: 17px;
    }

    .mail .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .mail-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0;
        position: absolute;
        top: 100%;
        left: 165px;
    }

    .text {
        font-size: 14px;
    }
</style>
