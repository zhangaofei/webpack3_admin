<template>
    <div class="group-form public">
        <el-dialog
                title="编辑用户组"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="5%"
                @close="handleClose" @open="doInit(currentData)"
        >
            <div>
                <el-form :model="groupForm" :rules="rules" ref="groupForm" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="用户组名称" prop="groupName">
                        <el-input v-model="groupForm.groupName" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="说明" prop="remark">
                        <el-input v-model="groupForm.remark" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="用户组状态" prop="status" >
                        <el-select v-model="groupForm.status"   placeholder="请选择用户组状态" popper-class="form-user-select" class="el_sel">
                            <el-option label="Enabled" value="Enabled">Enabled</el-option>
                            <el-option label="Disabled" value="Disabled">Disabled</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="认证方式" prop="checkedAuthType">
                        <div class="auth-type">
                            <div class="row pre-scrollable" style="width: 100%">
                                <div class="group-form-check-group">
                                    <el-checkbox-group v-model="groupForm.checkedAuthType">
                                        <el-checkbox v-for="item in authTypeList"
                                                     :label="item.authName"
                                                     :key="item.id"
                                                     name="checkedAuthType"
                                                     :checked="isChecked(item)"
                                                     :disabled="!isAvailable(item)"
                                                     @change="changeAction(item)"
                                                     style="float: left;width: 80%; margin-left: 15px">
                                            <span style="display: inline-block; width: 100px">{{item.authName}}</span>
                                            <el-button v-if="isLocalAuth(item)" type="text" @click="setUser()">设置关联用户</el-button>
                                            <el-button v-if="isLocalOAuth(item)" type="text" @click="setGroup(item)" :disabled="oauthAvailabel(item)">设置扩展组</el-button>
                                            <span v-if="!isAvailable(item)">该认证方式已经和{{item.groupName}}用户组绑定</span>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="设置关联接口" v-if="false">
                        <el-button type="text" @click="setInterface()" style="margin-left: 20px">设置关联接口</el-button>
                    </el-form-item>

                    <el-form-item label="用户组策略" prop="ruleId">
                        <el-select v-model.number="groupForm.ruleId" placeholder="请选择用户组策略" popper-class="form-user-select" class="el_sel">
                            <el-option v-for="(strategy,index) in userStrategy" :key="index" :label="strategy.name" :value="strategy.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <div class='form-footer ' slot="footer" >
                <div class="foot">
                    <span  @click="resetFrom()" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitEdit('groupForm')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <sourced  @onSourceStatus="onSourceStatus" v-if="isSourceShow" :groupId="groupId" :authId="authId" :cancelSource="cancelSource" :sourceCk="sourceCk"/>
        <editUsers  @onUsersStatus="onUsersStatus"  v-if="isUsersShow" :groupId="groupId" :cancelUsers="cancelUsers" :userCk="userCk"/>
        <editInterfaceSet @onInterfaceStatus="onInterfaceStatus" v-if="isInterfaceShow" :groupId="groupId" :cancelInterface="cancelInterface" :interfaceCk="interfaceCk"/>
    </div>
</template>
<script>
    import {editGroup, groupMainAuthTypeList, allUserStragetyList, getEnvasOauthList} from 'api/SSL_VPN/userManager/new-groupSet';
    import {codeMessage} from "../../../../../utils/codes";
    import editUsers from './editUsers.vue';
    import sourced from './editSource.vue'
    import editInterfaceSet from './editInterfaceSet.vue'

    export default {
        components: {editUsers, sourced, editInterfaceSet},
        data() {
            return {
                oauthmark:[],
                authCheck:false,
                setGroupCheck:false,
                query:{
                    groupId:'',
                    authId:0
                },
                authId:'',
                userClick: false,
                localChecked: '',
                assistant: false,
                authTypeList: [],
                checkedAuthType: [],
                groupId: null,
                groupForm: {
                    checkedAuthType: [],
                    groupName: '',
                    remark: '',
                    status:'',
                    authIds: [],
                    aux_auth_list: [],
                    ruleId: '',
                    resourceIds: [],
                    enwasAssociationExtIds:[],
                    apiGatewayList:[]
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
                rules: {
                    groupName: [
                        {required: true, message: '请输入用户组名称', trigger: 'blur'},
                        {min: 1, max: 100, message: '长度至少一个字符', trigger: 'blur'}
                    ],
                    ruleId: [
                        {required: true, type: 'number', message: '请选择用户组策略', trigger: 'change'}
                    ],
                    checkedAuthType: [
                        {type: 'array', required: true, message: '请选择一个认证方式', trigger: 'change'}
                    ],
                    status: [
                        {required: true, message: '请选择用户组状态', trigger: 'blur'}
                    ]
                },
                editVisible: true,
                selectedAuthTypeList: [],
                multipleUserSelection: [],
                userStrategy: [],
                userList: [],
                resourceList: [],
                isSourceShow:false,
                isUsersShow:false,
                isInterfaceShow: false,
                selectedAuthList:[],
                oauthChecked:false,
                checkId:'',
                allSelectedApi:[],
                apiClick:false,
                cancelUsers:[],
                cancelSource:[],
                cancelInterface:[],
                userCk:false,
                interfaceCk:false,
                sourceCk:false
            }
        },
        props: {
            currentData: Object,
        },
        created() {
            this.getUserStrategy();
            this.getMainAuthTypeList();
            this.getAuthList();
            if(this.currentData.id== -1)
            {
                this.groupId ='';
            }
            else
            {
                this.groupId =this.currentData.id;
            }
            this.addVisible = true;
            this.groupForm = {
                checkedAuthType: [],
                id: this.currentData.id,
                groupName: this.currentData.groupName,
                remark: this.currentData.remark,
                status: this.currentData.status,
                authIds: [],
                aux_auth_list: [],
                ruleId: this.currentData.ruleId,
                resourceIds: [],
                enwasAssociationExtIds:[]
            };
            if(this.currentData.ruleId == -1 )
            {
                this.groupForm.ruleId =''
            }
            if(this.currentData.id== -1)
            {
                this.groupForm.id= '';
            }


        },
        methods: {
            //用于实现OAUTH认证和扩展组之间的同步
            changeAction(item){
                console.log('checkedAuthType',this.groupForm.checkedAuthType)
                this.checkId = item.id;
                if (this.groupForm.checkedAuthType.length > 0){
                    for (let i = 0; i < this.groupForm.checkedAuthType.length; i++){
                        console.log(this.groupForm.checkedAuthType[i],'==')
                        if (item.authName == this.groupForm.checkedAuthType[i] && item.authType == 13){
                            this.oauthChecked = true;
                        } else {
                            this.oauthChecked = false;
                        }
                    }
                }
                else {
                    this.oauthChecked = false;
                }
            },
            //用于实现OAUTH认证和扩展组之间的同步
            oauthAvailabel(item){
                if (item.id == this.checkId){
                    if(this.oauthChecked){
                        return false;
                    } else {
                        return true;
                    }
                }
                if (this.groupForm.checkedAuthType.length == 0){
                    return true;
                } else {
                    for (var i = 0; i < this.groupForm.checkedAuthType.length; i++){
                        if (item.authName == this.groupForm.checkedAuthType[i]){
                            return false;
                        }
                    }
                    return true;
                }
            },
            getAuthList(){
                this.query.groupId = this.currentData.id;
                getEnvasOauthList(this.query).then(resp=>{
                        this.selectedAuthList = resp.data.nowUsedAuthList;//接收后台返回的所有被关联的选项
                }).catch(err=>{
                    console.log("获取用户组资源发生错误：",err);
                })
            },
            isLocalOAuth(item){
                if(item.authType == '13'){
                    return true;
                }
                return false;
            },
            handleClose() {
                this.$emit("onChangeStatus")
            },
            doInit(currentData){
                let row=currentData
                console.log("选中的用户组：",row)
                this.editVisible = true;
                this.groupForm.checkedAuthType=[];
                this.groupForm.groupName=row.groupName;
                this.groupForm.remark=row.remark;
                this.groupForm.authIds=[];
                this.groupForm.aux_auth_list=[];
                if(row.ruleId == -1 )
                {
                    this.groupForm.ruleId =''
                }
                else {
                    this.groupForm.ruleId =row.ruleId;
                }
                if(row.id== -1)
                {
                    this.groupId ='';
                }
                else
                {
                    this.groupId =row.id;
                    this.groupForm.id=row.id;
                }
                //this.groupId = row.id;
                //this.groupForm.ruleId=row.ruleId;
                this.groupForm.resourceIds=[];
                this.groupForm.enwasAssociationExtIds = []
            },
            onSourceStatus(data, sourceCk){
                this.sourceCk = sourceCk;
                this.cancelSource = data;
                this.isSourceShow = false;
                if (!this.authCheck){
                    this.authCheck = true;
                    this.groupForm.enwasAssociationExtIds = this.groupForm.enwasAssociationExtIds.concat(data);
                }
                if (this.groupForm.enwasAssociationExtIds.length > 0){
                    for (let i = 0; i < this.groupForm.enwasAssociationExtIds.length; i++){
                        if (this.authId == this.groupForm.enwasAssociationExtIds[i].oauthId){
                            this.groupForm.enwasAssociationExtIds.splice(i, 1);
                            i--;
                            break;
                        }
                    }
                }
                for (let i = 0; i < data.length; i++){
                    if (this.authId == data[i].oauthId){
                        this.groupForm.enwasAssociationExtIds.push(data[i]);
                    }
                }
            },
            onUsersStatus(data, userCk){
                this.isUsersShow = false;
                this.multipleUserSelection = data;
                this.userCk= userCk;
                this.cancelUsers = data;
            },
            onInterfaceStatus(data, interfaceCk){
                this.isInterfaceShow = false;
                this.allSelectedApi = data;
                this.cancelInterface = data;
                this.interfaceCk = interfaceCk;
            },
            isAvailable(item){
                return item.available;
            },
            isLocalAuth(item){
                if (item.authName == '本地认证') {
                    return true
                }
                return false
            },
            isChecked(item) {
                if (item.available && item.belong == true) {
                    return true
                }
                return false
            },
            show(val) {
                console.log('show check:', val);
                this.authTypeList = []
                this.getMainAuthTypeList();
                this.getUserStrategy();
                this.groupForm = {
                    id: val.id,
                    checkedAuthType: [],
                    groupName: val.groupName,
                    remark: val.remark,
                    status: val.status,
                    is_default: false,
                    authIds: [],
                    aux_auth_list: [],
                    ruleId: val.ruleId,
                    resourceIds: []
                }
                this.addVisible = true;
                this.groupId = val.id;
            },
            resetFrom(){
                this.editVisible = false;
                this.authTypeList = [];
            },
            //点击设置扩展组按钮事件
            setGroup(item){
                this.setGroupCheck = true;
                this.isSourceShow = true;
                this.authId = item.id;
                sourced.methods.doSource();//调用editSource.vue的方法
            },
            //设置关联用户
            setUser(){
                this.userClick = true;
                this.isUsersShow = true;
            },
            //设置关联接口
            setInterface(){
                this.isInterfaceShow = true;
                this.apiClick = true;
            },
            log() {
                let msg = '';
                for (let arg of arguments) {
                    msg += JSON.stringify(arg);
                }
            },
            findItem(value, key, list) {
                console.log('list:', list);
                let res = [];
                for (let item of list) {
                    for (let v of value) {
                        if (item[key] == v) {
                            if (item.authType == 13){
                                this.oauthmark.push(item.id);
                                break;
                            } else {
                                res.push(item.id);
                            }
                        }
                    }
                }
                console.log('oauthmark, length:', this.oauthmark, this.oauthmark.length);
                return res;
            },

            getUserStrategy() {
                allUserStragetyList().then(resp => {
                    if (resp.status == 'SUCCESS') {
                        this.userStrategy = resp.data;

                    }
                }).catch(err => {

                })
            },
            //当只勾选OAUTH认证,没有选择扩展组的情况下
            checkAction(){
                if (this.groupForm.enwasAssociationExtIds == null){
                    this.groupForm.enwasAssociationExtIds = [];
                }
                if(this.oauthmark.length > 0) {
                    for (let i = 0; i < this.oauthmark.length; i++) {
                        if (this.groupForm.enwasAssociationExtIds.length > 0){
                            for (let j = 0; j < this.groupForm.enwasAssociationExtIds.length; j++) {
                                var res = false;
                                if (this.oauthmark[i] == this.groupForm.enwasAssociationExtIds[j].oauthId) {
                                    res = false;
                                    break;
                                } else {
                                    res = true;
                                }
                            }
                            if (res){
                                this.groupForm.enwasAssociationExtIds.push(
                                    {
                                        oauthId: this.oauthmark[i],
                                        oauthExtParaIds: []
                                    }
                                )
                            }
                        } else {
                            this.groupForm.enwasAssociationExtIds.push(
                                {
                                    oauthId: this.oauthmark[i],
                                    oauthExtParaIds: []
                                }
                            )
                        }
                    }
                }
            },
            //当只勾线扩展组,没有选择认证方式的情况下
            oauthCheckAction(){
                if(this.groupForm.enwasAssociationExtIds == null){

                } else {
                    if (this.groupForm.enwasAssociationExtIds.length > 0){
                        for (let i = 0; i < this.groupForm.enwasAssociationExtIds.length; i++){
                            var res = true;
                            for (let j = 0; j < this.oauthmark.length; j++){
                                if (this.oauthmark[j] == this.groupForm.enwasAssociationExtIds[i].oauthId){
                                    res = false;
                                    break;
                                } else {
                                    res = true;
                                }
                            }
                            if (res){
                                this.groupForm.enwasAssociationExtIds.splice(i, 1);
                                i--;
                            }
                        }
                    }
                }
            },
            submitEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        let ids;
                        if (this.userClick) {
                            ids = [];
                            for (let item of this.multipleUserSelection) {
                                ids.push(item.id);
                            }
                        } else {
                            ids = null;
                        }
                        let apiIds;
                        if (this.apiClick) {
                            apiIds = [];
                            for (let item of this.allSelectedApi) {
                                apiIds.push(item.id);
                            }
                        } else {
                            apiIds = null;
                        }
                        if (!this.setGroupCheck) {
                            this.groupForm.enwasAssociationExtIds = this.selectedAuthList;
                        }

                        this.groupForm.authIds = this.findItem(this.groupForm.checkedAuthType, "authName", this.authTypeList);
                        this.checkAction();
                        this.oauthCheckAction();
                        let group = {
                            "id": this.currentData.id,
                            "ruleId": this.groupForm.ruleId,
                            "groupName": this.groupForm.groupName,
                            "remark": this.groupForm.remark,
                            "status": this.groupForm.status,
                            "authIds": this.groupForm.authIds,
                            "aux_auth_list": [],//暂时没有用到，则设置为空
                            "appList": null,
                            "userIds": ids,
                            "enwasAssociationExtIds": this.groupForm.enwasAssociationExtIds,
                            'apiGatewayList': apiIds
                        }
//                        console.log("要新建的数据：", group);
//                        console.log("localChecked：", this.localChecked);
//                        console.log("selectedUsers：", this.multipleUserSelection);
                        let localId = 0;
//                        var flag = false;
//                        for (let id of group.authIds){
//                            if (id == localId) {
//                                flag = true;
//                                break;
//                            }
//                        }
//                        if (flag){
//                            this.localChecked = true;
//                        }
//                        if (this.localChecked && this.multipleUserSelection.length == 0) {
//                            this.$message({
//                                type: 'warning',
//                                message: '请选择需要关联的用户!'
//                            });
//                        } else {
                        editGroup(group).then(resp => {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '编辑用户组成功！'
                                });
                                this.editVisible = false;
                                this.$refs[formName].resetFields();
//                                this.$emit('update')
                                this.$emit('onChangeStatus');
                                this.authTypeList = []

                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: resp.code.info
                                });
                            }
                        }).catch(err => {

                        });
                    }
                })
            },
            getMainAuthTypeList() {
                groupMainAuthTypeList(this.currentData.id).then(resp => {
                    this.authTypeList= resp.data;
                    this.authTypeList.sort(function (a,b) {
                        return a.id-b.id
                    });
                    for (let i = 0; i < resp.data.length; i++) {
                        if (resp.data[i].belong) {
                            this.selectedAuthTypeList.push(i);
                        }
                    }
                }).catch(err => {

                });
            }
        }
    }
</script>
<style>
    .auth-type{
        /*border: solid 1px #D3D3D3;*/
        /*float:left;*/
        /*margin-left: 19px;*/
        /*width: 65%;*/
    }
</style>
