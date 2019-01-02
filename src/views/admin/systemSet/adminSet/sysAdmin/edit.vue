<template>
    <div class="admin public">
        <el-dialog
                title="编辑系统管理员"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="8%"
                @close="handleClose" @open="doInit(currentData)">
            <div  class="admin-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="135px" class="demo-ruleForm" >
                    <el-form-item label="用户名 " prop="userName">
                        <el-input v-model="editInfo.userName" class="el_put" placeholder="请输入用户名" :disabled="isAvailable(editInfo.roleName)"></el-input>
                    </el-form-item>

                    <el-form-item label="用户角色" prop="roleName">
                        <el-input v-model="editInfo.roleName" class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="状态" prop="status" >
                        <el-select v-model="editInfo.status" class="el_sel"  placeholder="请选择用户状态" :disabled="isAvailable(editInfo.roleName)">
                            <el-option label="Enabled" value="Enabled" ></el-option>
                            <el-option label="Disabled" value="Disabled"></el-option>
                            <el-option label="Locked" value="Locked" :disabled="true"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="权限授权" prop="accessId" class="item_mark">
                        <!--<span class="dot" style="position: absolute;left: -4px;color: red;">*</span>-->
                        <el-select v-model='editInfo.accessId'  class="el_sel"  placeholder="权限授权" :disabled="isAvailable(editInfo.roleName)" >
                            <el-option :label="item.name" :value="item.id"  :key="item.id"  v-for="item in arrs" ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model=" editInfo.email" class="el_put" placeholder="请输入邮箱"></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="tel">
                        <el-input v-model.number=" editInfo.tel" class="el_put" placeholder="请输入手机号"></el-input>
                    </el-form-item>

                    <span v-if="currentData.id == 1">
                        <el-form-item label="登录验证码" prop="tel">
                            <span style="">密码连续匹配错误</span>
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="editInfo.adminErrorNum"
                                       @blur="passwordLocked" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')">
                                <div class="el-form__error" id="passwordNumErrMsg" style="display: none;width: 250px">请输入0-9999之间的整数</div>
                            </div>
                            次, 登录时需要输入验证码
                        </el-form-item>
                    </span>

                        <el-form-item label="准入IPMAC"  class="el_lab" style="display: none">
                            <el-checkbox v-model="editInfo.allowIpmac" style="margin-left: 81px">启用准入IP/MAC绑定登陆</el-checkbox>
                        </el-form-item>

                        <el-form-item label="" prop="ipMac"  v-show="editInfo.allowIpmac" style="display: none">
                            <el-input type="textarea" v-model="editInfo.ipMac" class="el_put el_text" placeholder="请输入准入ipMac" ></el-input>
                        </el-form-item>
                        <div v-show="!editInfo.allowIpmac">
                            <el-form-item label="登录并发数" prop="maxLogonNum">
                                <el-input v-model="editInfo.maxLogonNum" class="el_put" placeholder="请输入登录并发数" :disabled="isAvailable(editInfo.roleName)"></el-input>
                            </el-form-item>
                            <el-form-item label="准入IP" prop="ip">
                                <el-input v-model=" editInfo.ip" type="textarea" class="el_put" placeholder="例:192.168.5.1或192.168.5.1-192.168.5.21或192.168.5.1/21,多行可换行"></el-input>
                            </el-form-item>

                            <el-form-item label="准入MAC" prop="mac" style="display: none">
                                <el-input v-model=" editInfo.mac" type="text" class="el_put" placeholder="请输入准入MAC"></el-input>
                            </el-form-item>
                        </div>
                </el-form>
            </div>
            <div class='form-footer' slot="footer"  >
                <div  style="margin-right: 60px; line-height: 66px;" class="foot">
                    <span @click="resetForm('editInfo')" class="cancle btn_middle">取消</span>
                    <el-button type="primary" class="primary confirm btn_middle" @click="submitEditForm('editInfo')">
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
    import {editAdmin, getPower} from "../../../../../api/systemSet/new_adminSet/new_sysAdmin";
    export default{
        components: {
        },
        data(){
            var validatePass = (rule, value, callback) => {

                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(/^[^\u4e00-\u9fa5]+$}/.test(value) == false){
                        callback(new Error("请输入除中文以外的字符"));
                    } else {
                        if (this.editInfo.repassword !== '') {
                            this.$refs.editInfo.validateField('repassword');
                        }
                        callback();
                    }
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.editInfo.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var modPass1 = (rule, value, callback) => {

                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(/^(\w){6,20}$/.test(value) == false){
                        callback(new Error("请输入6-20位字母、数字、下划线"));
                    }
                    if (this.pswInfo.conpassword !== '') {
                        this.$refs.pswInfo.validateField('conpassword');
                    }
                    callback();
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
            var name = (rule, value, callback) =>
            {
                if(/^\w{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                }
                else {
                    callback();
                }
            };
            var ipMac = (rule, value, callback) => {
                if (!value){
                    callback();
                } else {
                    if (/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))\/[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(value) == false) {
                        callback(new Error("请输入正确的IP和MAC地址"));
                    } else {
                        callback();
                    }
                }
            };
            var Mac = (rule, value, callback) => {
              if (!value){
                  callback();
              }  else {
                  if (/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(value) == false){
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

            var maxLogonNum = (rule, value, callback) => {
                if (!value && value != 0) {
                    callback();
                } else {
                    if (/^[1-9]{1}\d{0,5}$/.test(value) == false) {
                        callback(new Error("请输入1~999999之间的数字"));
                    }  else {
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
                if (!value){
                    callback();
                } else {
                    if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)== false) {
                        callback(new Error('请输入正确邮箱'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                checkListPort:[],
                isShow:false,
                isShowSub:false,
                rules: {
                    userName: [
                        {required: true, validator: name, trigger: 'blur'},
                        { min: 1, max: 20, message: '请输入1-20位字母、数字、字符', trigger: 'blur' }
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur' },
                        { min: 1, max: 20, message: '请输入1-20位字母、数字、字符', trigger: 'blur' }
                    ],
                    repassword: [
                        {validator: validatePass2, trigger: 'blur' }
                    ],
                    roleName: [
                        { required: true, message: '请输入用户角色', trigger: 'change' }
                    ],
                    email: [
                        {validator: email,trigger: 'blur' }
                    ],
                    tel: [
                        {validator:tel, trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请输入状态', trigger: 'blur' }
                    ],
                    ipMac:[
                        {validator: ipMac, trigger:'blur'}
                    ],
                    mac:[
                        {validator: Mac, trigger:'blur'}
                    ],
                    ip :[
                        {validator: ip, trigger:'blur'}
                    ],
                    maxLogonNum: [
                        {validator: maxLogonNum, trigger: 'blur'}
                    ]
                },
                rules2:{},
                editInfo:{
                    id:'',
                    accessId:'',
                    userName: '',
                    roleName:'',
                    email: '',
                    tel:'',
                    maxLogonNum:'',
                    ip: '',
                    mac:'',
                    ipMac: '',
                    status : '',
                    advancedOptions:null,
                    allowIpmac:null,
                    adminErrorNum:''
                },
                editVisible:true,
                arrs:[]
            }
        },
        props: {
            currentData: Object
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            passwordLocked(e){
                let value = e.target.value;
                if (value < 0 || value > 9999 || /^([1-9]\d*|[0]{1,1})$/.test(e.target.value) == false) {
                    $('#passwordNumErrMsg').show();
                } else {
                    $('#passwordNumErrMsg').hide();
                }
            },

            handleClose() {
                this.$emit("onChangeStatus");
            },
            doInit(currentData){
                this.editVisible = true;
                this.editInfo= currentData;
                this.powerList();
                console.log('currentData',currentData)

            },
            powerList() {
                this.arrs = [];
                getPower().then(response => {
                    this.arrs=response.data
                    let accessId = '';
                    var idArr = [];
                    for(let i=0;i<this.arrs.length;i++)
                    {
                        idArr.push(this.arrs[i].id)
                    }
                    console.log("可用权限列表：",idArr)
                    if(this.editInfo.accessId == -1||idArr.indexOf(this.editInfo.accessId)==-1)
                    {
                        accessId = ''
                    }
                    else {
                        accessId = this.editInfo.accessId
                    }
                    console.log('accessId_edit',response)
                    this.editInfo.accessId = accessId
                }).catch((e) => {
                    console.log(e);
                })

            },
            isAvailable(name){
                if (name=="超级管理员"){
                    this.editInfo.accessId = '超级管理员';
                    return true;
                }
                return false;
            },

            submitEditForm(formName){
                console.log("editInfo:",this.editInfo);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.editInfo.accessId == '超级管理员'){
                            this.editInfo.accessId = -1;
                        }
                        editAdmin(this.editInfo.id,this.editInfo).then((resp)=>{
                                    console.log(resp,'resp');
                                    if(resp.status=='SUCCESS'){
                                        this.$message({
                                            type:'success',
                                            message:'编辑管理员成功！'
                                        });
                                        this.editVisible=false;
                                        this.powerList();
                                        this.$emit('update')
                                    }else{
                                        this.$message({
                                            type:'warning',
                                            message:resp.code.info
                                        });
                                    }
                                }).catch(e=>{
                                    console.log("编辑出错",e);
                                });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.editVisible=false;
                this.$refs[formName].resetFields();
            },

        },
    }
</script>
<style >

</style>