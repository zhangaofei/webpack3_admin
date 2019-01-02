<template>
    <div class="admin public">
        <el-dialog
                title="查看系统管理员"
                :visible.sync="lookVisible"
                size="small"
                custom-class="dialog public"
                top="8%"
                @close="handleClose" @open="doInit(currentData)">
            <div  class="admin-form">
                <el-form :model="info" :rules="rules" ref="info" label-width="135px" class="demo-ruleForm" >
                    <el-form-item label="用户名 " prop="userName">
                        <el-input v-model="info.userName" class="el_put" placeholder="请输入用户名" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="用户角色" prop="roleName"  >
                        <el-select v-model="info.roleName"  class="el_sel" placeholder="请输入用户角色" :disabled="true">
                            <el-option label="普通管理员" value="普通管理员" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="status" >
                        <el-select v-model="info.status" class="el_sel"  placeholder="请选择用户策略" :disabled="true">
                            <el-option label="Enabled" value="Enabled" ></el-option>
                            <el-option label="Disabled" value="Disabled"></el-option>
                            <el-option label="Locked" value="Locked"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="权限授权" prop="accessId" class="item_mark">
                        <!--<span class="dot" style="position: absolute;left: -4px;color: red;">*</span>-->
                        <el-select v-model='info.accessId'  class="el_sel"  placeholder="权限授权"  :disabled="isAvailable(info.roleName)||true">
                            <el-option :label="item.name" :value="item.id"  :key="item.id"  v-for="item in arrs" ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model=" info.email" class="el_put" placeholder="请输入邮箱" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="tel">
                        <el-input v-model.number=" info.tel" class="el_put" placeholder="请输入手机号" type="number" :disabled="true"></el-input>
                    </el-form-item>
                    <span v-if="currentData.id == 1">
                        <el-form-item label="登录验证码" prop="tel">
                            <span >密码连续匹配错误</span>
                            <div class="el-input" style="width: 64px; margin-left: 10px; margin-right: 10px">
                                <input class="el-input__inner" style="height: 32px" v-model.number="info.adminErrorNum" :disabled="true">
                            </div>
                            次, 登录时需要输入验证码
                        </el-form-item>
                    </span>
                        <el-form-item label="准入IPMAC"  class="el_lab" style="display: none">
                            <el-checkbox v-model="info.allowIpmac" style="margin-left: 81px" :disabled="true">启用准入IP/MAC绑定登陆</el-checkbox>
                        </el-form-item>

                        <el-form-item label="" prop="ipMac"  v-show="info.allowIpmac" style="display: none">
                            <el-input type="textarea" v-model="info.ipMac" class="el_put el_text" placeholder="请输入准入ipMac" :disabled="true"></el-input>
                        </el-form-item>

                        <div v-show="!info.allowIpmac">
                            <el-form-item label="登录并发数" prop="maxLogonNum">
                                <el-input v-model.number="info.maxLogonNum" class="el_put" placeholder="请输入登录并发数" type="number" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="准入IP" prop="ip">
                                <el-input v-model=" info.ip" type="textarea" class="el_put" placeholder="例:192.168.5.1或192.168.5.1-192.168.5.21或192.168.5.1/21,多行可换行" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item label="准入MAC" prop="mac" style="display: none">
                                <el-input v-model=" info.mac" type="text" class="el_put" placeholder="请输入准入MAC" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" ></div>
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
                    if(/^[A-Za-z0-9~!@#$%^&*()_+{}|:;"',.<>?\/]{6,20}$/.test(value) == false){
                        callback(new Error("请输入6-20位字母、数字、英文符号"));
                    }
                    if (this.info.repassword !== '') {
                        this.$refs.info.validateField('repassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.info.password) {
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
            var name = (rule, value, callback) => {
                if (/^\w{1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    callback();
                }
            }
            ;
            var tel = (rule, value, callback) => {
                if (/^[0-9]{11}$/.test(value)== false) {
                    callback(new Error('请输入11位电话'));
                } else {
                    callback();
                }
            };

            var email = (rule, value, callback) => {
                if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)== false) {
                    callback(new Error('请输入正确邮箱'));
                } else {
                    callback();
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
                    accessId:[
//                        {required: true}
                    ],
                    status: [
                        { required: true, message: '请输入状态', trigger: 'blur' }
                    ],
                },
                rules2:{},
                info:{
                    id:'',
                    accessId:'',
                    userName: '',
                    roleName:'',
                    email: '',
                    tel:'',
                    maxLogonNum:'',
                    adminErrorNum:'',
                    ip: '',
                    mac:'',
                    ipMac: '',
                    status : '',
                    advancedOptions:null,
                    allowIpmac:null
                },
                lookVisible:true,
                arrs:[]
            }
        },
        props: {
            currentData: Object,
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            isAvailable(name){
                if (name=="超级管理员"){
                    this.info.accessId = '超级管理员';
                    return true;
                }
                return false;
            },
            handleClose() {
                this.$emit("onChangeStatus");
            },
            doInit(currentData){
                this.lookVisible = true;
                this.info= currentData;
                this.powerList();
                this.info.accessId=currentData.accessId
                console.log('currentData',currentData)
            },
            powerList() {
                this.arrs = []
                getPower().then(response => {
                    this.arrs=response.data;
                    let accessId = '';
                    let idArr = [];
                    for(let i=0;i<this.arrs.length;i++)
                    {
                        idArr.push(this.arrs[i].id)
                    }
                    if(this.info.accessId == -1||idArr.indexOf(this.info.accessId)==-1)
                    {
                        accessId = ''
                    }
                    else {
                        accessId = this.info.accessId
                    }
                    console.log('accessId',response)
                    this.info.accessId = accessId

                }).catch((e) => {
                    console.log(e);
                })

            },
            submitEditForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        editAdmin(this.info.id,this.info).then((resp)=>{
                            if(resp.status=='SUCCESS'){
                                this.$message({
                                    type:'success',
                                    message:'编辑管理员成功！'
                                });
                                this.lookVisible=false;
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
            resetForm() {
                this.lookVisible=false;
            },

        },
    }
</script>
