<template>
    <div class="admin public">
        <el-dialog
                title="系统管理员密码修改"
                :visible.sync="pswVisible"
                size="small"
                custom-class="dialog public"
                top="8%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="admin-form">
                <el-form :model="pswInfo" :rules="rulesMod" ref="pswInfo" label-width="135px" class="demo-ruleForm">
                    <el-form-item label="新密码" prop="password">
                        <el-input v-model="pswInfo.password" class="el_put" placeholder="请输入新密码" type="password"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="conpassword">
                        <el-input v-model="pswInfo.conpassword" type="password" class="el_put" placeholder="请确认新密码"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" >
                <div class="foot">
                    <span class="cancle" @click="resetForm('pswInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitModPsw('pswInfo')">
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
    import {modAdminPsw} from "../../../../../api/systemSet/new_adminSet/new_sysAdmin";

    export default {
        components: {},
        data() {
            var modPass1 = (rule, value, callback) =>
            {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(/^[^\u4e00-\u9fa5]+$/.test(value) == false){
                        callback(new Error("请输入除中文以外的字符"));
                    } else {
                        callback();
                    }
                }
            };
            var modPass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.pswInfo.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                checkListPort: [],
                isShow: false,
                isShowSub: false,
                rulesMod: {
                    password: [
                        {required: true,validator: modPass1, trigger: 'blur' },
                        { min: 1, max: 20, message: '请输入1-20位字母、数字、字符', trigger: 'blur' }
                    ],
                    conpassword: [
                        {required: true,validator: modPass2, trigger: 'blur'}
                    ],
                },
                pswInfo: {
                    id: '',
                    password: '',
                    conpassword: ''
                },
                pswVisible: true,
                arrs: []
            }
        },
        props: {
            currentData: Object,
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            handleClose() {
                this.$emit("onChangeStatus");
            },
            doInit(currentData) {
                this.pswVisible = true;
                this.pswInfo.id = currentData.id;
            },
            submitModPsw(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        modAdminPsw({id: this.pswInfo.id, password: this.pswInfo.conpassword}).then((resp) => {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '密码修改成功！'
                                });

                                this.pswVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {

                            }
                        }).catch(e => {
                            console.log("密码修改出错", e);
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.pswVisible = false;
                this.$refs[formName].resetFields();
            }

        }

    }
</script>
