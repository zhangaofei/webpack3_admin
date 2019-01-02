<template>
    <div class=" public">
        <el-dialog
                title="新建客户端用户"
                :visible.sync="addVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @close="handleClose"
        >
            <div class="user-form user_form">
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="基础设置" name="first">
                        <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名" prop="userName" >
                                <el-input v-model.trim="userInfo.userName"  class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="密码" prop="password" >
                                <el-input v-model.trim="userInfo.password" type='password' class="el_put" @change="psw(userInfo.password)"></el-input>
                            </el-form-item>

                            <el-form-item label="确认密码" prop="repassword" >
                                <el-input v-model.trim="userInfo.repassword"  type='password' class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="用户全名" prop="fullName" >
                                <el-input v-model="userInfo.fullName" class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="关联组" prop="createAdministrator" >
                                <el-select v-model="userInfo.groupId"   placeholder="请选择关联组" popper-class="form-user-select" class="el_sel">
                                    <el-option v-for="item in groupList"
                                               :label="item.groupName"
                                               :value="item.id"
                                               v-bind:key="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="证件号" class="form_item"  prop="code">
                                <el-select v-model="userInfo.auditType" placeholder="证件类型" class="el_sel half_sel" style="">
                                    <el-option label="工号" value="jobId"></el-option>
                                    <el-option label="学号" value="studentId"></el-option>
                                </el-select>
                                <el-input v-model="userInfo.code" style="" class="half_put" placeholder="请输入证件号"></el-input>
                            </el-form-item>

                            <el-form-item label="用户状态" prop="status" >
                                <el-select v-model="userInfo.status"   placeholder="请选择用户状态" popper-class="form-user-select" class="el_sel">
                                    <el-option label="Enabled" value="Enabled"></el-option>
                                    <el-option label="Disabled" value="Disabled"></el-option>
                                    <el-option label="Locked" value="Locked" :disabled="true"></el-option>
                                    <el-option label="过期" :disabled="true" value="过期"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="userInfo.email" class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="手机" prop="tel" >
                                <el-input v-model.number="userInfo.tel" class="el_put"></el-input>
                            </el-form-item>

                            <!--<el-form-item label="Token序列号" prop="">-->
                            <!--<el-input v-model="userInfo.tokenSerialNum" placeholder="请输入Token序列号" class="el_put"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="唯一密钥" prop="">-->
                            <!--<el-input v-model="userInfo.secretKey" placeholder="请输入唯一密钥" class="el_put"></el-input>-->
                            <!--</el-form-item>-->
                            <!--&lt;!&ndash;之前的&ndash;&gt;-->
                            <!--<el-form-item label="硬件特征码" prop="hardwareFeatureCode" v-if="true">-->
                            <!--<el-input v-model="userInfo.hardwareFeatureCode" placeholder="请输入硬件特征码" class="el_put"></el-input>-->
                            <!--</el-form-item>-->

                            <el-form-item label="用户策略" prop="rule" >
                                <el-select v-model="userInfo.ruleId"   placeholder="请选择用户策略" popper-class="form-user-select" class="el_sel">
                                    <el-option v-for="strategy in userStrategy" :key="strategy.id" :label="strategy.name" :value="strategy.id"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="" prop="tel" style="display: none">
                                <div class="el_box">
                                    <el-checkbox v-model="userInfo.isSyncGroupRule">是否与用户所在用户组的策略保持一致</el-checkbox>
                                </div>
                            </el-form-item>

                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="安全设置" name="second">
                        <el-form :model="userInfo2" :rules="rules" ref="userInfo2" label-width="106px" class="demo-ruleForm">

                            <el-form-item label="Token序列号" prop="">
                                <el-input v-model="userInfo2.tokenSerialNum" placeholder="请输入Token序列号" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="唯一密钥" prop="">
                                <el-input v-model="userInfo2.secretKey" placeholder="请输入唯一密钥" class="el_put"></el-input>
                            </el-form-item>
                            <!--之前的-->
                            <!--<el-form-item label="硬件特征码" prop="hardwareFeatureCode" v-if="false">-->
                                <!--<el-input v-model="userInfo.hardwareFeatureCode" placeholder="请输入硬件特征码" class="el_put"></el-input>-->
                            <!--</el-form-item>-->
                            <el-form-item label="硬件特征码" prop="" v-for="(items,index) in userInfo2.signatureList" :key="index" v-if="false">

                                <el-select v-model="userInfo2.signatureList[index].termType" ref="termType" placeholder="请选择" clearable  style="width: 24%;margin-left: 20px">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input v-model="items.hdName" ref="hdName" placeholder="请输入硬件特征码" class="code_put" style="width: 38%;margin-left: 2%"></el-input>
                                <span @click="add"><img :src="addImg" alt="" style="cursor: pointer"></span>
                                <span @click="del(index)" v-if="userInfo2.signatureList.length>1"><img :src="delImg" alt="" style="cursor: pointer"></span>
                            </el-form-item>

                        </el-form>
                    </el-tab-pane>
                </el-tabs>

            </div>
            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle" @click="resetForm('userInfo')">取消</span>
                    <el-button type="primary" class="primary confirm btn_middle" @click="submitForm('userInfo')">
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
    import {addClientUser} from "../../../../../api/SSL_VPN/user_new/userApi";
    import {allUserStragetyList} from "../../../../../api/new_strategy";
    import {groupAllList} from "../../../../../api/SSL_VPN/user_new/groupApi";

    export default{
        components: {

        },
        data(){
            var validatePass = (rule, value, callback) => {
                if (value=='') {
                    callback(new Error('请输入密码'));
                } else {
                    if(/\s+$/.test(value) == true){
                        callback(new Error("密码不能包含空格"));
                    } else if(/[\u4e00-\u9fa5]/.test(value) == true){
                        callback(new Error("请输入除中文以外的字符"));
                    }else {
                        if (this.userInfo.repassword !== '') {
                            this.$refs.userInfo.validateField('repassword');
                        }
                        callback();
                    }
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.userInfo.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
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
                    if(/^[\u4E00-\u9FA5A-Za-z0-9~!@#$%^&*()_+{}|:;"',.<>?\/]{1,20}$/.test(value) == false){
                        callback(new Error("请输入1-20位字母、数字、中文、英文符号"));
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
                    repassword: [
                        {required: true,validator: validatePass2, trigger: 'blur' }
                    ],
                    email: [
                        {validator: email,trigger: 'blur' }
                    ],
                    tel: [
                        {validator:tel, trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请输入状态', trigger: 'blur'}
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
                userInfo: {
                    ruleId:'',
                    groupId:'',
                    userName:'',
                    password:'',
                    repassword:'',
                    fullName:'',
                    tel:'',
                    email:'',
                    isSyncGroupRule:false,
                    status:'Enabled',
                    auditType:'',
                    code:'',

                },
                userInfo2:{
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
                addVisible:true,
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    total:0,
                    isAdmin: '',
                    display_name: '',
                    phone: '',
                    name: '',
                    searchContent:null
                },
                groupList:[],
                userStrategy:[],
                activeName:'first',
            }
        },

        created(){
            this.getGroupList();
            this.getUserStrategy();
        },
        methods: {
            psw(val){
              console.log('val',val,typeof (val),val.indexOf(''))
            },
            add(){
                this.userInfo2.signatureList.push(
                    {
                        termType:'',
                        hdName:'',
                    }
                )
            },
            del(index){
                if(this.userInfo2.signatureList.length>1){
                    this.userInfo2.signatureList.splice(index,1)
                }

            },
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
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
                this.addVisible=false;
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs.userInfo.validate((valid) => {
                    if (valid) {
                        this.$refs.userInfo2.validate((valid) => {
                            if (valid) {
                                if(this.userInfo.isSyncGroupRule){
                                    this.userInfo.isSyncGroupRule=1;
                                }else {
                                    this.userInfo.isSyncGroupRule=0;
                                }
                                let userInfo3=Object.assign(this.userInfo,this.userInfo2);
                                addClientUser(userInfo3).then((resp)=>{
                                    if(resp.status=="SUCCESS"){
                                        this.$message({
                                            type:'success',
                                            message:'新建用户成功！'
                                        });

                                        this.$emit('onChangeStatus');
                                        this.$refs.userInfo.resetFields();
                                        this.$refs.userInfo2.resetFields();
                                        this.addVisible=false;

                                    }else {
                                        this.$message({
                                            type:'warning',
                                            message:resp.code.info
                                        });
                                    }
                                }).catch((e)=>{
                                    console.log("新建用户出错：",e);
                                });
                            }else {
                                return false;
                            }
                        })
                    } else {
                        return false;
                    }
                })
            },
            getGroupList() {
                this.listLoading = true;
                this.groupList = [];
                groupAllList(this.listQuery).then(response => {
                    const data = response.data;
                    this.groupList = data;
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            }
        }
    }

</script>

<style>
    /*.user-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 100px;*/
    /*}*/
</style>
