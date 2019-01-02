<template>
    <div class="public">
        <el-dialog
                title="修改客户端用户"
                :visible.sync="editVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="user-form user_form">
                <el-tabs v-model="activeName" type="border-card" >
                    <el-tab-pane label="基础设置" name="first">
                        <el-form :model="editUser" :rules="rules" ref="editUser" label-width="100px" class="demo-ruleForm" :disabled="false">
                            <el-form-item label="用户名" prop="userName" >
                                <el-input v-model="editUser.userName"  class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="密码" prop="password" v-if="false">
                                <el-input v-model.trim="editUser.password" type='password' class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="确认密码" prop="repassword" v-if="false">
                                <el-input v-model.trim="editUser.repassword"  type='password' class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="用户全名" prop="fullName" >
                                <el-input v-model.trim="editUser.fullName" class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="关联组" prop="createAdministrator" >
                                <el-select v-model="editUser.groupId"   placeholder="请选择关联组" popper-class="form-user-select" class="el_sel">
                                    <el-option v-for="item in groupList"
                                               :label="item.groupName"
                                               :value="item.id"
                                               v-bind:key="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="证件号" prop="code" class="form_item">
                                <el-select v-model="editUser.auditType" placeholder="证件类型" class="el_sel half_sel" style="">
                                    <el-option label="工号" value="jobId"></el-option>
                                    <el-option label="学号" value="studentId"></el-option>
                                </el-select>
                                <el-input v-model.trim="editUser.code" style="" class="half_put" placeholder="请输入证件号"></el-input>
                            </el-form-item>

                            <el-form-item label="用户状态" prop="status" >
                                <el-select v-model="editUser.status"   placeholder="请选择用户状态" popper-class="form-user-select" class="el_sel">
                                    <el-option label="Enabled" value="Enabled"></el-option>
                                    <el-option label="Disabled" value="Disabled"></el-option>
                                    <el-option label="Locked" value="Locked" :disabled="true"></el-option>
                                    <el-option label="过期" :disabled="true" value="过期"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="editUser.email" class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="手机" prop="tel" >
                                <el-input v-model.number="editUser.tel" class="el_put"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="Token序列号" prop="">-->
                            <!--<el-input v-model="editUser.tokenSerialNum" placeholder="请输入Token序列号" class="el_put"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="唯一密钥" prop="">-->
                            <!--<el-input v-model="editUser.secretKey" placeholder="请输入唯一密钥" class="el_put"></el-input>-->
                            <!--</el-form-item>-->

                            <!--<el-form-item label="硬件特征码" prop="hardwareFeatureCode" v-if="true">-->
                            <!--<el-input v-model="editUser.hardwareFeatureCode" placeholder="请输入硬件特征码" class="el_put"></el-input>-->
                            <!--</el-form-item>-->


                            <el-form-item label="用户策略" prop="rule" >
                                <el-select v-model="editUser.ruleId"   placeholder="请选择用户策略" popper-class="form-user-select" class="el_sel">
                                    <el-option v-for="strategy in userStrategy" :key="strategy.id" :label="strategy.name" :value="strategy.id"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="" prop="tel" style="display: none">
                                <div class="el_box">
                                    <el-checkbox v-model="editUser.isSyncGroupRule">是否与用户所在用户组的策略保持一致</el-checkbox>
                                </div>
                            </el-form-item>

                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="安全设置" name="second">
                        <el-form :model="editUser2" :rules="rules" ref="editUser2" label-width="106px" class="demo-ruleForm">

                            <el-form-item label="Token序列号" prop="">
                                <el-input v-model="editUser2.tokenSerialNum" placeholder="请输入Token序列号" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="唯一密钥" prop="">
                                <el-input v-model="editUser2.secretKey" placeholder="请输入唯一密钥" class="el_put"></el-input>
                            </el-form-item>

                            <!--<el-form-item label="硬件特征码" prop="hardwareFeatureCode" v-if="false">-->
                                <!--<el-input v-model="editUser2.hardwareFeatureCode" placeholder="请输入硬件特征码" class="el_put"></el-input>-->
                            <!--</el-form-item>-->

                            <el-form-item label="硬件特征码" prop="" v-for="(items,index) in editUser2.signatureList" :key="index" v-if="false">

                                <el-select v-model="editUser2.signatureList[index].termType" placeholder="请选择" clearable  style="width: 24%;margin-left: 20px">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input v-model="items.hdName" placeholder="请输入硬件特征码" class="code_put" style="width: 38%;margin-left: 2%"></el-input>
                                <span @click="add"><img :src="addImg" alt="" style="cursor: pointer"></span>
                                <span @click="del(index)" v-if="editUser2.signatureList.length>1"><img :src="delImg" alt="" style="cursor: pointer"></span>
                            </el-form-item>

                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editUser')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="editUserForm('editUser')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {deepCopy} from "utils/ObjectCopy";
    import {notifyFault} from "utils/notify";
    import {getCerServerByKey} from "utils/certificateServerMap";
    import {groupAllList} from "../../../../../api/SSL_VPN/user_new/groupApi";
    import {allUserStragetyList} from "../../../../../api/new_strategy";
    import {updateClientUser} from "../../../../../api/SSL_VPN/user_new/userApi";

    export default{
        components: {
        },
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(/\s+$/.test(value) == true){
                        callback(new Error("密码不能包含空格"));
                    } else if(/[\u4e00-\u9fa5]{0,}/.test(value) == true){
                        callback(new Error("请输入除中文以外的字符"));
                    }else {
                        if (this.editUser.password_r !== '') {
                            this.$refs.editUser.validateField('password_r');
                        }
                        callback();
                    }
                }
            };
            var name = (rule, value, callback) => {
                if(/^[\u4E00-\u9FA5A-Za-z0-9_]{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位中文、字母、数字、下划线"));
                }else {
                    callback();
                }
            };
            var fullname = (rule, value, callback) => {
                if(!value){
                    callback();
                }else{
                    if(/^[\u4E00-\u9FA5A-Za-z0-9~!@#$%^&*()_+{}[]|:;"',.<>?\/]{1,20}$/.test(value) == false){
                        callback(new Error("请输入1-20位字母、数字、英文符号"));
                    }else {
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
                    if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) == false) {
                        callback(new Error('请输入正确的邮箱'));
                    } else {
                        callback();
                    }
                }
            };
            var code = (rule, value, callback) => {
                if (!value){
                    callback();
                } else {
                    if(/[\u4E00-\u9FA5]/.test(value) == true){
                        callback(new Error("证件号不能为中文"));
                    }else {
                        callback();
                    }
                }
            };
            return {
                rules: {
                    userName: [
                        { required: true,validator: name, trigger: 'blur' },
                    ],
                    fulllName: [
                        { validator: fullname, trigger: 'blur' },
                    ],

                    password: [
                        {required: true,validator: validatePass, trigger: 'blur' }
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
                    hardwareFeatureCode: [
                        {validator: code,trigger: 'blur' }
                    ],
                    code: [
                        {validator: code,trigger: 'blur' }
                    ],
                },
                addImg:require('@/assets/addIcon/add.png'),
                delImg:require('@/assets/addIcon/del.png'),
                editUser:{
                    id:'',
                    ruleId:'',
                    groupId:'',
                    userName:'',
                    password:'',
                    password_r:'',
                    fullName:'',
                    tel:'',
                    email:'',
                    isSyncGroupRule:false,
                    status:'',
                    auditType:'',
                    code:'',
                },
                editUser2:{
                    hardwareFeatureCode:'',
                    tokenSerialNum:'',
                    secretKey:'',
                    signatureList:[
                        {
                            termType:'',
                            hdName:'',
                        }
                    ]  
                },
                options: [{
                    value: 'All',
                    label: 'All'
                },{
                    value: 'Windows',
                    label: 'Windows'
                }, {
                    value: 'MacOS',
                    label: 'MacOS'
                }, {
                    value: 'Android',
                    label: 'Android'
                }, {
                    value: 'iPhone',
                    label: 'iPhone'
                }, {
                    value: 'iPad',
                    label: 'iPad'
                }],
                editVisible:true,
                groupList:[],
                userStrategy:[],
                activeName:'first',
            }
        },
        props: {
            currentData: Object,
        },
        created(){
            this.getGroupList();
            this.getUserStrategy();
            this.doInit(this.currentData)

        },
        methods: {
            add(){
                this.editUser2.signatureList.push(
                    {
                        termType:'',
                        hdName:'',
                    }
                )
            },
            del(index){
                if(this.editUser2.signatureList.length>1){
                    this.editUser2.signatureList.splice(index,1)
                }

            },

            handleClose() {
                this.$emit("onChangeStatus");
            },
            doInit(currentData){
                this.editUser=currentData;
                this.editUser2=currentData;
                this.editUser.auditType = currentData.auditType.toString();
                if(currentData.ruleId ==-1 )
                {
                    this.editUser.ruleId=''
                }
                if(currentData.groupId==-1)
                {
                    this.editUser.groupId=''
                }
                if(currentData.signatureList.length==0){
                    this.editUser2.signatureList.push(
                            {
                                termType:'',
                                hdName:'',
                            }
                    )
                }

                this.editVisible = true;
                if(currentData.isSyncGroupRule==1){
                    this.editUser.isSyncGroupRule=true;
                }else {
                    this.editUser.isSyncGroupRule=false;
                }
            },
            getUserStrategy(){
                allUserStragetyList().then(resp=>{
                    if(resp.status=='SUCCESS'){
                        this.userStrategy=resp.data;
                    }
                }).catch(err=>{

                })
            },

            resetForm(formName) {
                this.editVisible=false;
                this.$refs[formName].resetFields();
            },
            editUserForm(formName){
                this.$refs.editUser.validate((valid) => {
                    if (valid) {
                        this.$refs.editUser2.validate((valid) => {
                            if (valid) {
                                if(this.editUser.isSyncGroupRule){
                                    this.editUser.isSyncGroupRule=1;
                                }else {
                                    this.editUser.isSyncGroupRule=0;
                                }
                                let editUser3=Object.assign(this.editUser,this.editUser2);
                                updateClientUser(editUser3).then((resp)=>{
                                    if(resp.status=="SUCCESS"){
                                        this.$message({
                                            type:'success',
                                            message:'编辑用户成功！'
                                        });

                                        this.$emit('onChangeStatus');
                                        this.$refs.editUser.resetFields();
                                        this.$refs.editUser2.resetFields();
                                        this.addVisible=false;

                                    }else {
                                        this.$message({
                                            type:'warning',
                                            message:resp.code.info
                                        });
                                    }
                                }).catch((e)=>{
                                    console.log("编辑用户出错：",e);
                                });
                            }else {
                                return false;
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            getGroupList() {
                this.groupList = [];
                groupAllList(this.listQuery).then(response => {
                    this.groupList = response.data;
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            }
        }
    }

</script>
