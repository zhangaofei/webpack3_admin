<template>
    <div class="user-set public">
        <el-dialog
                title="查看客户端用户"
                :visible.sync="lookVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="user-form user_form">
                <el-tabs v-model="activeName" type="border-card" >
                    <el-tab-pane label="基础设置" name="first">
                        <el-form :model="editUser" :rules="rules" ref="editUser" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名" prop="userName" >
                                <el-input v-model="editUser.userName" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="用户全名" prop="fullName">
                                <el-input v-model="editUser.fullName" class="el_put" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item label="关联组" prop="createAdministrator" >
                                <el-select v-model="editUser.groupId"   popper-class="form-user-select" class="el_sel" :disabled="true">
                                    <el-option v-for="item in groupList"
                                               :label="item.groupName"
                                               :value="item.id"
                                               v-bind:key="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="证件号">
                                <el-select v-model="editUser.auditType" placeholder="证件类型" class="el_sel half_sel" style="" :disabled="true">
                                    <el-option label="工号" value="工号"></el-option>
                                    <el-option label="学号" value="学号"></el-option>
                                </el-select>
                                <el-input v-model="editUser.code" style="" :disabled="true" class="half_put" placeholder="请输入证件号"></el-input>
                            </el-form-item>

                            <el-form-item label="用户状态" prop="status" >
                                <el-select v-model="editUser.status"    popper-class="form-user-select" class="el_sel" :disabled="true">
                                    <el-option label="Enabled" value="Enabled">Enabled</el-option>
                                    <el-option label="Disabled" value="Disabled">Disabled</el-option>
                                    <el-option label="Locked" value="Locked" :disabled="true">Locked</el-option>
                                    <el-option label="过期" :disabled="true" value="过期"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="邮箱" prop="email" >
                                <el-input v-model="editUser.email" class="el_put" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item label="手机" prop="tel" >
                                <el-input v-model="editUser.tel" class="el_put" :disabled="true"></el-input>
                            </el-form-item>

                            <!--<el-form-item label="硬件特征码" prop="">-->
                                <!--<el-input v-model="editUser.hardwareFeatureCode" placeholder="请输入硬件特征码" class="el_put" :disabled="true"></el-input>-->
                            <!--</el-form-item>-->

                            <!--<el-form-item label="Token序列号" prop="tel">-->
                                <!--<el-input v-model="editUser.tokenSerialNum" placeholder="请输入Token序列号" class="el_put" :disabled="true"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="唯一密钥" prop="">-->
                                <!--<el-input v-model="editUser.secretKey" placeholder="请输入唯一密钥" class="el_put" :disabled="true"></el-input>-->
                            <!--</el-form-item>-->
                            <el-form-item label="用户策略" prop="rule" >
                                <el-select v-model="editUser.ruleId"  popper-class="form-user-select" class="el_sel" :disabled="true">
                                    <el-option v-for="strategy in userStrategy" :key="strategy.id" :label="strategy.name" :value="strategy.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="" prop="isSyncGroupRule" style="display: none">
                                <div class="el_box">
                                    <el-checkbox v-model="editUser.isSyncGroupRule">是否与用户所在用户组的策略保持一致</el-checkbox>
                                </div>
                            </el-form-item>

                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="安全设置" name="second">
                        <el-form :model="editUser" :rules="rules" ref="editUser" label-width="106px" class="demo-ruleForm" >
                            <el-form-item label="Token序列号" prop="">
                                <el-input v-model="editUser.tokenSerialNum" placeholder="请输入Token序列号" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="唯一密钥" prop="">
                                <el-input v-model="editUser.secretKey" placeholder="请输入唯一密钥" class="el_put" :disabled="true"></el-input>
                            </el-form-item>


                            <el-form-item label="硬件特征码" prop="" v-for="(items,index) in editUser.signatureList" :key="index" v-if="false">

                                <el-select v-model="editUser.signatureList[index].termType" placeholder="请选择" style="width: 24%;margin-left: 20px" :disabled="true">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input v-model="items.hdName" placeholder="请输入硬件特征码" class="code_put" style="width: 38%;margin-left: 2%" :disabled="true"></el-input>
                                <!--<span @click="add"><img :src="addImg" alt="" style="cursor: pointer"></span>-->
                                <!--<span @click="del(index)"><img :src="delImg" alt="" style="cursor: pointer"></span>-->

                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>

            </div>
            <div class='form-footer ' slot="footer"  ></div>
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
                    if(/^[A-Za-z0-9~!@#$%^&*()_+{}[]|:;"',.<>?\/]{1,20}$/.test(value) == false){
                        callback(new Error("请输入6-20位字母、数字、下划线"));
                    }
                    callback();
                }
            };
            var name = (rule, value, callback) => {
                if(/^[A-Za-z0-9~!@#$%^&*()_+{}[]|:;"',.<>?\/]{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位字母、数字、英文符号"));
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
                    if (value.length== 11) {
                        callback(new Error('请输入手机号'));
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
                        callback(new Error('请输正确输入邮箱'));
                    } else {
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
                    ]
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
                lookVisible:true,
                groupList:[],
                userStrategy:[],
                activeName:'first',
            }
        },
        props: {
            currentData: Object,
        },
        created(){
            this.doInit(this.currentData);
            this.getGroupList();
            this.getUserStrategy();
        },
        methods: {
            changeStatus() {
                this.$emit("onChangeStatus")
            },
            handleClose() {
                this.changeStatus();
                this.lookVisible=false;
            },
            doInit(currentData){
                this.editUser=currentData;
                if(currentData.ruleId ==-1 )
                {
                    this.editUser.ruleId=''
                }
                if(currentData.groupId==-1)
                {
                    this.editUser.groupId=''
                }
                if(currentData.signatureList.length==0){
                    this.editUser.signatureList.push(
                            {
                                termType:'',
                                hdName:'',
                            }
                    )
                }
                this.lookVisible = true;
                if(currentData.isSyncGroupRule==1){
                    this.editUser.isSyncGroupRule=true;
                }else {
                    this.editUser.isSyncGroupRule=false;
                }
                if(currentData.auditType == 'jobId'){
                    this.editUser.auditType = '工号'
                } else if(currentData.auditType == 'studentId'){
                    this.editUser.auditType = '学号'
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

