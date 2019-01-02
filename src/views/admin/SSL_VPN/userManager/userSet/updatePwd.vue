<template>

    <div class="user-updatePwd public">

        <el-dialog
                title="修改密码"
                :visible.sync="updateVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentData)"
        >
            <div class="password-form user_form">
                <el-form :model="updatePwdForm"  :rules="rulesMod" ref="updatePwdForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名">
                        <el-input v-model="updatePwdForm.userName"  class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input v-model.trim="updatePwdForm.password"  class="el_put" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="conpassword" >
                        <el-input v-model.trim="updatePwdForm.conpassword"  type='password' class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('updatePwdForm')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitForm('updatePwdForm')">
                        确定
                    </el-button>
                </div>
            </div>

        </el-dialog>

    </div>
</template>
<script>
    import {updatePwd} from "../../../../../api/SSL_VPN/user_new/userApi";
    export default{
        data(){
            var modPass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {

                    if(/\s+$/.test(value) == true){
                        callback(new Error("密码不能包含空格"));
                    } else if(/[\u4e00-\u9fa5]/.test(value) == true){
                        callback(new Error("请输入除中文以外的字符"));
                    }else {
                        if (this.updatePwdForm.conpassword !== '') {
                            this.$refs.updatePwdForm.validateField('conpassword');
                        }
                        callback();
                    }
                }
            };
            var modPass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.updatePwdForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
//            var userName = (rule, value, callback) => {
//                if (/^(\w){1,20}$/.test(value) == false) {
//                    callback(new Error("请输入1-20位字母、数字、下划线"));
//                } else {
//                    callback();
//                }
//            };
            return {
                rulesMod: {
                    password: [
                        {required: true,validator: modPass1, trigger: 'blur'}
                    ],
                    conpassword: [
                        {required: true,validator: modPass2, trigger: 'blur'}
                    ],
//                    userName:[
//                        {validator:userName, trigger:'blur'}
//                    ]

                },
                updatePwdForm:{
                    userName:'',
                    password: '',
                    conpassword: '',
                    id:''
                },
                updateVisible :true

            }
        },
        props: {
            currentData: Object
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            doInit(currentData){
                this.updatePwdForm=currentData;
                this.updateVisible = true;
            },
            resetForm(formName) {
                this.updateVisible=false;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            updatePwd({id: this.updatePwdForm.id, password: this.updatePwdForm.conpassword}).then((resp)=>

                            {
                                if (resp.status == "SUCCESS") {
                                    this.$message({
                                        type: 'success',
                                        message: '修改密码成功！'
                                    });
                                    this.updateVisible = false;
                                    this.$emit('onChangeStatus');
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.code.info
                                    });
                                }
                            }).catch(e => {
                                this.$message({
                                    type: 'warning',
                                    message: '网络或者服务器故障！'
                                });
                            })

                    }

                });
            },
            handleClose() {
                this.$emit("onChangeStatus");
            }
        }
    }



</script>
<style >
    /*.password-form .el_box{*/
        /*margin-left: 158px;*/
    /*}*/

    /*.password-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width:135px ;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
    /*}*/

    /*.password-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.password-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 100px;*/
    /*}*/

    /*.user_tab{*/
        /*margin-left: 30px;*/
        /*width:95%;*/
    /*}*/
    /*.user_tab tr{*/
        /*height:50px*/
    /*}*/
    /*.user_tab tr td{*/
        /*vertical-align:middle;*/
        /*border-bottom:1px solid lightgrey;*/
    /*}*/
    /*.user_tab tr .user_tab_td1{*/
        /*width:20%*/
    /*}*/
    /*.user_tab tr .user_tab_td2{*/
        /*width:80%;*/
    /*}*/


</style>