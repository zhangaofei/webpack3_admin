
<template>
    <div class="group-form public">
        <el-dialog
                title="新建用户组"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog public"
                top="5%"
                @close="handleClose"
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
                            <el-option label="Enabled" value="Enabled"></el-option>
                            <el-option label="Disabled" value="Disabled"></el-option>
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
                                            <!--该认证方式已经和radius用户组绑定-->
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
                        <el-select v-model.number="groupForm.ruleId"   placeholder="请选择用户组策略" popper-class="form-user-select" class="el_sel">
                            <el-option v-for="(strategy,index) in userStrategy" :key="index" :label="strategy.name" :value="strategy.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  >
                <div class="foot">
                    <span @click="resetForm('groupForm')" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary btn_middle confirm"
                            @click="submitAddForm('groupForm')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <sourced  @onSourceStatus="onSourceStatus" v-if="isSourceShow" :authId="authId" :cancelSource="cancelSource"/>
        <users  @onUsersStatus="onUsersStatus"  v-if="isUsersShow" :cancelUsers="cancelUsers"/>
        <interfaceSet @onInterfaceStatus="onInterfaceStatus" v-if="isInterfaceShow" :cancelInterface="cancelInterface"/>
    </div>
</template>
<script>
    import {addGroup, mainAuthTypeList, allUserStragetyList} from 'api/SSL_VPN/userManager/new-groupSet';
    import {codeMessage} from "../../../../../utils/codes";
    import {notifyFault} from "../../../../../utils/notify";
    import users from './users.vue';
    import sourced from './source.vue'
    import interfaceSet from './interfaceSet.vue'
    export default{
        components: {users, sourced, interfaceSet},
        data(){
            return {
                oauthmark:[],//用于存放被勾选的OAUTH认证
                authId:'',
                assistant:false,
                authTypeList:[],
                groupForm:{
                    checkedAuthType:[],
                    groupName:'',
                    remark:'',
                    status:'',
                    authIds:[],
                    aux_auth_list:[],
                    userIds:[],
                    ruleId:'',
                    appList:[],
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
                        { required: true, message: '请输入用户组名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度至少一个字符', trigger: 'blur' }
                    ],
                    ruleId: [
                        { required: true, type:'number', message: '请选择用户组策略', trigger: 'change' }
                    ],
                    checkedAuthType: [
                        { type: 'array', required: true, message: '请选择一个认证方式', trigger: 'change' }
                    ],
                    status: [
                        {required: true, message: '请选择用户组状态', trigger: 'blur'}
                    ]
                },
                addVisible: true,
                multipleUserSelection: [],
                userStrategy:[],
                isSourceShow:false,
                isUsersShow:false,
                isInterfaceShow:false,
                oauthChecked:false,
                checkId:'',
                allSelectedApi:[],
                cancelUsers:[],
                cancelSource:[],
                cancelInterface:[]
            }
        },
        created(){
            this.getUserStrategy();
            this.getMainAuthTypeList();
            this.groupForm.status ="Enabled";
            this.groupForm.ruleId ="默认策略";
        },
        methods: {
            //用于实现OAUTH认证和扩展组之间的同步
            changeAction(item){
                console.log('changeAction',item)
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
            handleClose() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            onSourceStatus(data){
                this.isSourceShow = false;
                if (this.groupForm.enwasAssociationExtIds.length > 0){
                    for (let i = 0; i < this.groupForm.enwasAssociationExtIds.length; i++){
                        if (this.authId == this.groupForm.enwasAssociationExtIds[i].oauthId){
                            this.groupForm.enwasAssociationExtIds.splice(i, 1);
                            i--;
                            break;
                        }
                    }
                }
                let ids = [];
                for (let i = 0; i < data.length; i++){
                    ids.push({external_id: data[i].external_id})
                }
                this.groupForm.enwasAssociationExtIds.push(
                    {
                        oauthId:this.authId,
                        oauthExtParaIds:ids
                    }
                )
                this.cancelSource = this.groupForm.enwasAssociationExtIds;
            },
            onUsersStatus(data){
                this.isUsersShow = false;
                this.multipleUserSelection = data;
                this.cancelUsers = data;
            },
            onInterfaceStatus(data){
                this.isInterfaceShow = false;
                this.allSelectedApi = data;
                this.cancelInterface = data;
            },
            //设置扩展组
            setGroup(item){
                this.isSourceShow = true;
                this.authId = item.id;
                sourced.methods.doAddSource();
            },
            //设置关联用户
            setUser(){
                this.isUsersShow = true;
                users.methods.doAddUsers();
            },
            //设置关联接口
            setInterface(){
                this.isInterfaceShow = true;
                interfaceSet.methods.doAddInterface();
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
            isLocalOAuth(item){
                if(item.authType == '13'){
                    return true;
                }
                return false;
            },
            isChecked(item) {
                if ((item.available && item.belong == true)) {
                    return true;
                } else {
                    return false;
                }
            },
            resetForm(formName) {
                this.addVisible=false;
                this.$refs[formName].resetFields();
            },
            findItem(value,key,list){
                let res = [];
                for (let item of list) {
                    for (let v of value) {
                        console.log('value',item[key],v)
                        if (item[key] == v) {
                            if (item.authType == 13){
                                this.oauthmark.push(item.id);//存放oauth认证的id
                                break;
                            } else {
                                res.push(item.id);
                            }
                        }
                    }
                }
                console.log('findItem:',res,this.oauthmark)
                return res;
            },

            getUserStrategy(){

                allUserStragetyList().then(resp=>{
                    if(resp.status=='SUCCESS'){
                        this.userStrategy=resp.data;
                        console.log("userStrategy：",this.userStrategy);
                    }
                }).catch(err=>{

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
            submitAddForm(formName){
                if(this.groupForm.ruleId=="默认策略")
                {
                    this.groupForm.ruleId= 1;
                }
                else
                {
                    console.log("其他的GROUPID",this.groupForm.ruleId)
                }
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        let ids = [];
                        for (let item of this.multipleUserSelection) {
                            ids.push(item.id);
                        }
                        let apiIds = [];
                        for (let item of this.allSelectedApi){
                            apiIds.push(item.id);
                        }
                        this.groupForm.authIds = this.findItem(this.groupForm.checkedAuthType, "authName", this.authTypeList);
                        this.checkAction();
                        this.oauthCheckAction();
                        let group = {
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
                        let localId = 0;
                        var flag = false;
                        for (let id of group.authIds){
                            if (id == localId) {
                                flag = true;
                                break;
                            }
                        }
//                        if (flag){
//                            this.localChecked = true;
//                        }
//
//                        if (this.localChecked && this.multipleUserSelection.length == 0) {
//                            this.$message({
//                                type: 'warning',
//                                message: '请选择需要关联的用户!'
//                            });
//                        } else {
                        addGroup(group).then(resp => {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '新建用户组成功！'
                                });
                                this.addVisible = false;
                                this.$refs[formName].resetFields();
                                this.$emit('onChangeStatus');

                            } else {
                                    this.$message({
                                        type: 'warning',
                                        message:  resp.code.info
                                    });
                            }
                        }).catch(err => {

                        });
//                        }
                    }
                })
            },
            getMainAuthTypeList(){
                mainAuthTypeList().then(resp=>{
                    // this.authTypeList= new Array;
                    this.authTypeList= resp.data;
                    this.authTypeList.sort(function (a,b) {
                        return a.id-b.id
                    });
                    // for(let i =0;i<resp.data.length;i++){
                    //     this.authTypeList.push(resp.data[i]);
                    // }
                }).catch(err=>{

                });
            }
        }
    }
</script>
<style>
    .auth-type{
        /*border: solid 1px #D3D3D3;*/
        /*float:left;*/
        /*margin-left: 20px;*/
        /*width: 65%;*/
    }
    .demo-ruleForm .el-form-item__error {
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 100px;*/
    }
</style>
