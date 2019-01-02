<template>
    <div class="group-form public">
        <el-dialog
                title="查看用户组"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog public"
                top="5%"
                @close="handleClose" @open="doInit(currentData)"
        >
            <div>
                <el-form :model="groupForm" :rules="rules" ref="groupForm" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="用户组名称" prop="groupName">
                        <el-input v-model="groupForm.groupName" class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="说明">
                        <el-input v-model="groupForm.remark" class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="用户组状态" prop="status" >
                        <el-select v-model="groupForm.status"  placeholder="请选择用户组状态"  popper-class="form-user-select" class="el_sel" :disabled="true">
                            <el-option label="Enabled" value="Enabled">Enabled</el-option>
                            <el-option label="Disabled" value="Disabled">Disabled</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="认证方式" prop="checkedAuthType">
                        <div class="auth-type">
                            <div class="row pre-scrollable" style="width: 100%">
                                <div class="group-form-check-group">
                                    <el-button type="text" style="margin-left: 15px" @click="setUser()">查看关联用户</el-button>
                                    <el-button type="text" style="margin-left: 15px" @click="setExternal()">查看扩展组</el-button>
                                    <el-checkbox-group v-model="groupForm.checkedAuthType">
                                        <el-checkbox v-for="item in selectedAuthTypeList"
                                                     :label="item.authName"
                                                     :key="item.id"
                                                     :disabled="true"
                                                     name="checkedAuthType"
                                                     style="float: left;width: 80%; margin-left: 15px">
                                        </el-checkbox>

                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                    </el-form-item>


                    <el-form-item label="设置关联接口" v-if="false">
                        <el-button type="text" @click="setInterface()" style="margin-left: 20px">查看关联接口</el-button>
                    </el-form-item>

                    <el-form-item label="用户组策略" prop="ruleId">
                        <el-select v-model.number="groupForm.ruleId"   placeholder="请选择用户组策略" popper-class="group-select" class="el_sel" :disabled="true">
                            <el-option v-for="strategy in userStrategy" :label="strategy.name" :value="strategy.id" :key="strategy.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" >

            </div>
        </el-dialog>

        <checkSource  @onSourceStatus="onSourceStatus" v-if="isSourceShow" :groupId="groupId"/>
        <checkUsers  @onUsersStatus="onUsersStatus"  v-if="isUsersShow" :groupId="groupId"/>
        <checkInterfaceSet @onInterfaceStatus="onInterfaceStatus" v-if="isInterfaceShow" :groupId="groupId"/>
    </div>
</template>
<script>
    import {groupMainAuthTypeList, allUserStragetyList, groupClientIncludeUserList, groupIncludeAppList} from 'api/SSL_VPN/userManager/new-groupSet';
    import checkUsers from './checkUsers.vue';
    import checkSource from './checkSource.vue'
    import checkInterfaceSet from './checkInterfaceSet.vue'
    export default{
        components: {checkUsers, checkSource, checkInterfaceSet},
        data(){
            return {
                rules: {
                    groupName: [
                        {required: true, message: '请输入用户组名称', trigger: 'blur'},
                    ],
                    ruleId: [
                        {required: true, type: 'number', message: '请选择用户组策略', trigger: 'change'}
                    ],
                    checkedAuthType: [
                        {type: 'array', required: true, message: '请至少选择一个认证方式', trigger: 'change'}
                    ],
                    status: [
                        {required: true, message: '请选择用户组状态', trigger: 'blur'}
                    ]
                },
                localChecked:'',
                currentView:null,
                assistant:false,
                authTypeList:[],
                checkedAuthType:[],
                groupId:null,
                groupForm:{
                    checkedAuthType:[],
                    groupName:'',
                    remark:'',
                    status:'',
                    authIds:[],
                    aux_auth_list:[],
                    userIds:[],
                    ruleId:'',
                    resourceIds:[]
                },

                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                lookInfo:{
                    groupName: "",
                    ruleId: "",
                    remark:'',
                },

                addVisible: true,
                lookVisible: false,
                list: [],
                selectedAuthTypeList:[],
                multipleUserSelection: [],
                multipleResourceSelection: [],
                userStrategy:[],
                userList:[],
                resourceList:[],
                isSourceShow:false,
                isUsersShow:false,
                isInterfaceShow: false
            }
        },
        props:['currentData'],
        created(){
            this.doInit(this.currentData);
            this.getUserStrategy();
            this.getMainAuthTypeList();
        },
        methods: {
            handleClose() {
                this.$emit("onChangeStatus")
            },
            doInit(currentData){
                let row=currentData
                if(row.id ==-1)
                {
                    this.groupId ='';
                    this.groupForm.id='';
                }
                else
                {
                    this.groupId = row.id;
                    this.groupForm.id=row.id;
                }
                console.log(this.groupId,'this.groupId')
                this.editVisible = true;
                this.groupForm.checkedAuthType=[];
                this.groupForm.groupName=row.groupName;
                this.groupForm.remark=row.remark;
                this.groupForm.status = row.status;
                this.groupForm.authIds=[];
                this.groupForm.aux_auth_list=[];
                if(row.ruleId == -1)
                {
                    this.groupForm.ruleId ='';
                }
                else {
                    this.groupForm.ruleId=row.ruleId;
                }

                this.groupForm.resourceIds=[];
            },
            onSourceStatus(data){
                this.isSourceShow = false;
            },
            onUsersStatus(data){
                this.isUsersShow = false;
            },
            onInterfaceStatus(data){
                this.isInterfaceShow = false;
            },
            setSource(){
                this.isSourceShow = true;
                this.resourceClick = true;
            },
            setUser(){
                this.userClick = true;
                this.isUsersShow = true;
            },
            setExternal(){
                this.isSourceShow = true;
            },
            setInterface(){
                this.isInterfaceShow = true;
            },
            getUserStrategy(){
                console.log("获取用户策略：");
                allUserStragetyList().then(resp=>{
                    console.log("获取用户策略返回的数据：",resp);
                    if(resp.status=='SUCCESS'){
                        this.userStrategy=resp.data;
                    }
                }).catch(err=>{

                })
            },

            getMainAuthTypeList(){
                groupMainAuthTypeList(this.currentData.id).then(resp=>{
                    this.authTypeList= resp.data;
                    this.authTypeList.sort(function (a,b) {
                        return a.id-b.id
                    });
                    console.log(this.authTypeList,'check=====')
                    for(let i =0;i<resp.data.length;i++){
                        // this.authTypeList.push(resp.data[i]);
                        // console.log('belong:', resp.data[i].belong);
                        if (resp.data[i].belong){
                            this.selectedAuthTypeList.push(resp.data[i]);
                        }
                    }

                }).catch(err=>{

                });
            },
            resetFrom(){
                this.addVisible = false;
            }
        }
    }
</script>
<style>

</style>

