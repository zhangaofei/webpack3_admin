<template>
    <div class="admin public">
        <el-dialog
                title="新建系统管理员"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog public"
                top="8%"
                @close="handleClose">
            <div class="admin-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="135px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="addInfo.userName" placeholder="请输入用户名" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="用户角色" prop="roleName">
                        <el-input v-model="addInfo.roleName" :disabled="true" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="addInfo.status" class="el_sel" placeholder="请选择状态"
                                   popper-class="form-user-select">
                            <el-option label="Enabled" value="Enabled"></el-option>
                            <el-option label="Disabled" value="Disabled"></el-option>
                            <el-option label="Locked" value="Locked" :disabled="true"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="权限授权" prop="accessId" class="item_mark">
                        <!--<span class="dot" style="position: absolute;left: -4px;color: red;">*</span>-->
                        <el-select v-model='addInfo.accessId' class="el_sel" placeholder="请选择权限授权"
                                   popper-class="form-user-select">
                            <el-option :label="item.name" :value="item.id" :key="item.id"
                                       v-for="item in arrs"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input v-model="addInfo.password" class="el_put" placeholder="请输入密码"
                                  type="password"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="repassword">
                        <el-input v-model="addInfo.repassword" type="password" class="el_put"
                                  placeholder="请确认密码"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addInfo.email" class="el_put" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="tel">
                        <el-input v-model.number="addInfo.tel" class="el_put" placeholder="请输入手机号"></el-input>
                    </el-form-item>

                        <el-form-item label="准入IPMAC" class="el_lab" style="display: none">
                            <el-checkbox v-model="addInfo.allowIpmac" style="margin-left: 81px">启用准入IP/MAC绑定登陆</el-checkbox>
                        </el-form-item>
                        <el-form-item label="" prop="ipMac" v-show="addInfo.allowIpmac" style="display: none">
                            <el-input type="textarea" v-model="addInfo.ipMac" class="el_put el_text"
                                      placeholder="请输入准入ipMac"></el-input>
                        </el-form-item>
                        <div v-show="!addInfo.allowIpmac">
                            <el-form-item label="登录并发数" prop="maxLogonNum">
                                <el-input v-model="addInfo.maxLogonNum" class="el_put" placeholder="请输入登录并发数"></el-input>
                            </el-form-item>
                            <el-form-item label="准入IP" prop="ip">
                                <el-input v-model="addInfo.ip" type="textarea" class="el_put"
                                          placeholder="例:192.168.5.1或192.168.5.1-192.168.5.21或192.168.5.1/21,多行可换行"></el-input>
                            </el-form-item>
                            <el-form-item label="准入MAC" prop="mac" style="display: none">
                                <el-input v-model="addInfo.mac" type="text" class="el_put"
                                          placeholder="请输入准入MAC"></el-input>
                            </el-form-item>
                        </div>

                </el-form>
            </div>
            <div class='form-footer ' slot="footer" >
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo')">取消</span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitForm('addInfo')">
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
    import {addAdmin, getPower} from "../../../../../api/systemSet/new_adminSet/new_sysAdmin";
    export default{
        components: {},
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(/^[^\u4e00-\u9fa5]+$/.test(value) == false){
                        callback(new Error("请输入除中文以外的字符"));
                    } else {
                        if (this.addInfo.repassword !== '') {
                            this.$refs.addInfo.validateField('repassword');
                        }
                        callback();
                    }
                }
            };
            var validatePass2 = (rule, value, callback) =>
            {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addInfo.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var name = (rule, value, callback) => {
                        if (/^\w{1,20}$/.test(value) == false) {
                            callback(new Error("请输入1-20位字母、数字、下划线"));
                        } else {
                            callback();
                        }
                    }
                ;
                var maxLoginNum = (rule, value, callback) => {
                    if (!value) {
                        callback();
                    } else {
                        if (/^[1-9]{1}\d{0,5}$/.test(value) == false) {
                            callback(new Error("请输入1~999999之间的数字"));
                        } else {
                            callback();
                        }
                    }
                };
                var ipMac = (rule, value, callback) => {
                    if (!value) {
                        callback();
                    } else {
                        if (/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))\/[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(value) == false) {
                            callback(new Error("请输入正确的IP和MAC地址"));
                        } else {
                            callback();
                        }
                    }
                };
            var tel = (rule, value, callback) => {
                if (!value){
                    callback();
                } else {
                    if (/^[0-9]{11,11}$/.test(value) == false) {
                        callback(new Error('请输入正确手机号'));
                    } else {
                        callback();
                    }
                }
            };
                var email = (rule, value, callback) => {
                    if (!value) {
                        callback();
                    } else {
                        if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) == false) {
                            callback(new Error('请输入正确邮箱'));
                        } else {
                            callback();
                        }
                    }

                };
                var Mac = (rule, value, callback) => {
                    if (!value) {
                        callback();
                    } else {
                        if (/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(value) == false) {
                            callback(new Error("请输入正确的MAC地址"));
                        } else {
                            callback();
                        }
                    }
                };
                var ip = (rule, val, callback) => {
                    if (!val) {
                        callback();
                    } else {
                        let regIp   = /^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$/;
                        let regMask = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/;
                        let flag = true;
                        let str = '';

                        let valArr = val.replace(/(\r+|\n+)/g,",").split(',');
                        for (let i = 0; i < valArr.length; i++) {
                            if (valArr[i].indexOf('/') != -1) {
                                let newArr = valArr[i].split('/');
                                if(newArr.length > 2) {
                                    str = valArr[i] + '的格式有误，请重新填写'
                                    flag = false;
                                } else
                                if ( !regIp.test(newArr[0]) ) {
                                    str = newArr[0] + '格式有误，请重新填写'
                                    flag = false;
                                } else
                                if (newArr[1].split('.').length != 1 && newArr[1].split('.').length != 4) {
                                    str = newArr[1] + '格式有误，请重新填写'
                                    flag = false;
                                } else

                                if (newArr[1].split('.').length == 1 && (newArr[1] > 255 || newArr[1] < 0) ) {
                                    str = newArr[1] + '超出范围，请重新填写'
                                    flag = false;
                                } else

                                if (newArr[1].split('.').length == 4 && !regMask.test(newArr[1]) ) {
                                    str = newArr[1] + '格式有误，请重新填写'
                                    flag = false;
                                };

                            } else if (valArr[i].indexOf('-') != -1) {
                                let newArr = valArr[i].split('-');
                                if(newArr.length > 2) {
                                    str = valArr[i] + '的格式有误，请重新填写'
                                    flag = false;
                                } else
                                if ( !regIp.test(newArr[0]) || !regIp.test(newArr[1]) ) {
                                    str = valArr[i] + '格式有误，请重新填写'
                                    flag = false;
                                } else

                                if ( newArr[0].split('.')[0] != newArr[1].split('.')[0]
                                    || newArr[0].split('.')[1] != newArr[1].split('.')[1]
                                    || newArr[0].split('.')[2] != newArr[1].split('.')[2] ) {
                                    str = valArr[i] + '必须处于同一网段，请重新填写'
                                    flag = false;
                                } else
                                if ( parseInt(newArr[0].split('.')[3]) > parseInt(newArr[1].split('.')[3]) ) {
                                    str = valArr[i] + '前网段必须小于后网段，请重新填写'
                                    flag = false;
                                };

                            } else {
                                if( !regIp.test(valArr[i]) ){
                                    str = valArr[i] + '格式不合法，请重新填写'
                                    flag = false;
                                }
                            }
                        }
                        if( !flag ) {
                            callback(new Error(str));
                        }else{
                            callback();
                        }
                    }
                };
                return {
                    checkListPort: [],
                    isShow: false,
                    isShowSub: false,
                    val: '',
                    rules: {
                        userName: [
                            {required: true, validator: name, trigger: 'blur'},
                            {min: 1, max: 20, message: '请输入1-20位字母、数字、字符', trigger: 'blur'}
                        ],
                        password: [
                            {required: true, validator: validatePass, trigger: 'blur'},
//                        { min: 1, max: 20, message: '请输入1-20位字母、数字、字符', trigger: 'blur' }
                        ],
                        repassword: [
                            {required: true, validator: validatePass2, trigger: 'blur'}
                        ],
                        roleName: [
                            {required: true, message: '请输入用户角色', trigger: 'change'}
                        ],
//                        accessId: [
//                            {required: true,message: '必须选择权限'}
//                        ],
                        email: [
                            {validator: email, trigger: 'blur'}
                        ],

                        tel: [
                            {validator: tel, trigger: 'blur'}
                        ],
                        status: [
                            {required: true, message: '请输入状态', trigger: 'blur'}
                        ],
                        maxLogonNum: [
                            {validator: maxLoginNum, trigger: 'blur'}
                        ],
                        ipMac: [
                            {validator: ipMac, trigger: 'blur'}
                        ],
                        mac: [
                            {validator: Mac, trigger: 'blur'}
                        ],
                        ip: [
                            {validator: ip, trigger: 'blur'}
                        ]
                    },
                    addInfo: {
                        accessId: '',
                        userName: '',
                        password: '',
                        repassword: '',
                        roleName: '普通管理员',
                        email: '',
                        tel: '',
                        maxLogonNum: 1,
                        ip: '',
                        mac: '',
                        ipMac: '',
                        status: 'Enabled',
                        advancedOptions: false,
                        allowIpmac: false
                    },
                    pswInfo: {
                        id: '',
                        password: '',
                        conpassword: ''
                    },
                    isExistUser: {
                        administratorId: '',
                        userName: ''
                    },
                    dialogVisible: false,
                    addVisible: true,
                    arrs: []
                }
        },
        created(){
            this.powerList()
        },
        methods: {
            handleClose() {
                this.$emit("onChangeStatus");
            },

            powerList() {
                getPower().then(response => {
                    this.arrs = response.data;
                    this.addInfo.accessId=response.data[0].id; //权限初始值
                }).catch((e) => {
                    console.log(e);
                })

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addAdmin(this.addInfo).then((resp)=> {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '新建管理员成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type:'warning',
                                    message:resp.code.info
                                });
                            }
                        }).catch(e=> {
                            console.log("新建出错", e);
                        });

                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
