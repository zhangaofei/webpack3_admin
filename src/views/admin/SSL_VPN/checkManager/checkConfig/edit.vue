<template>
    <div class=" public">
        <el-dialog
                title="编辑-审核规则"
                :visible.sync="addVisible"
                custom-class="dialog"
                top="5%"
                size="small"
                @close="handleClose"
                @open="doInit(currentData)"
        >
            <div class="user-form">
                <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="审核规则名称" prop="auditName">
                        <el-input placeholder="请输入审核规则名称" v-model="userInfo.auditName" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="规则说明">
                        <el-input placeholder="请输入规则说明" v-model="userInfo.auditRemark" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="适用用户组" prop="groupId">
                        <el-select v-model="userInfo.groupId"  placeholder="请选择关联组" popper-class="form-user-select" class="el_sel">
                            <el-option v-for="item in groupList"
                                       :label="item.groupName"
                                       :value="item.id"
                                       v-bind:key="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="审核方式" prop="auditType">
                        <el-select v-model="userInfo.auditType"  placeholder="请选择审核方式" popper-class="form-user-select" class="el_sel">
                            <el-option label="自动审核" value="auto"></el-option>
                            <el-option label="人工审核" value="hand"></el-option>
                        </el-select>
                    </el-form-item>

                    <template v-if="userInfo.auditType == 'auto' || userInfo.auditType == '自动审核'">
                        <el-form-item label="审核规则" prop="auditRule">
                        <el-select v-model="userInfo.auditRule" @change="action()"  placeholder="请选择用户状态" popper-class="form-user-select" class="el_sel">
                            <el-option label="全部通过" value="all"></el-option>
                            <el-option label="全部不通过" value="allNo"></el-option>
                            <el-option label="根据规则匹配通过" value="rule"></el-option>
                        </el-select>
                        </el-form-item>
                            <template v-if="userInfo.auditRule == 'rule' || userInfo.auditRule == '根据规则匹配通过'">
                                <el-form-item label="" prop="">
                                <el-table
                                        ref="multipleTable"
                                        :data="userInfo.list"
                                        :header-cell-style="headerCellStyle"
                                        border
                                        tooltip-effect="dark"
                                        header-row-class-name="reset_table_head"
                                        style="max-height: 206px;overflow-y: auto;"
                                        @selection-change="handleSelectionChange">
                                    <el-table-column
                                            label-class-name="user_mandatory"
                                            align="center"
                                        label="证件类型">
                                        <template slot-scope="scope">
                                            <el-select class="txt_ellipsis" v-model="scope.row.paperType" placeholder="请输入证件类型">
                                                <el-option label="工号" value="jobId"></el-option>
                                                <el-option label="学号" value="studentId"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label-class-name="user_mandatory"
                                            align="center"
                                            label="匹配规则">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.matchRule" placeholder="请输入匹配规则" class="txt_ellipsis external_value"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="操作" align="center">
                                        <template slot-scope="scope">
                                            <el-button
                                                    size="small"
                                                    class="btn_none_bg"
                                                    @click="domainAdd()"> <img src="../../../../../assets/addIcon/add.png">
                                            </el-button>
                                            <span v-if="userInfo.list.length != 1">
                                                <el-button
                                                        size="small"
                                                        class="btn_none_bg"
                                                        @click="domainDel(scope.$index,scope.row)"><img src="../../../../../assets/addIcon/del.png">
                                                </el-button>
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                </el-form-item>
                        </template>
                    </template>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span @click="resetForm('userInfo')" class="cancle btn_middle">
                        取消
                    </span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitForm('userInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {groupAllList} from "../../../../../api/SSL_VPN/user_new/groupApi";
    import {editCheckConfig, getGroup} from "../../../../../api/SSL_VPN/checkManager/checkConfig";
    export default{
        components: {

        },
        data(){
            var name = (rule, value, callback) => {
                if(/^[\u4E00-\u9FA5A-Za-z0-9!#$^&()*_]{1,199}$/.test(value) == false){
                    callback(new Error("请输入数字、英文、中文、特殊符号(除@和%)、下划线"));
                }else {
                    callback();
                }
            };
            var group = (rule, value, callback) =>{
                let str = value.toString();
                if(str = '' || str == undefined || str == null){
                    callback(new Error(请选择适用用户组))
                } else {
                    callback();
                }
            };
            var rule = (rule, value, callback) =>{
                let str = value.toString();
                if(str = '' || str == undefined || str == null){
                    callback(new Error(请选择审核规则))
                } else {
                    callback();
                }
            }
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                 },

                rules: {
                    auditName: [
                        {required: true, validator: name, trigger: 'blur'}
                    ],
                    groupId: [
                        {required: true, validator: group, trigger: 'blur'}
                    ],
                    auditType: [
                        {required: true, message: '请输入审核方式', trigger: 'blur'}
                    ],
                    auditRule: [
                        {required: true, validator: rule, trigger: 'blur'}
                    ],
                },
                userInfo: {
                    id:'',
                    auditName:'',
                    auditRemark:'',
                    groupId:'',
                    auditType:'',
                    auditRule:'',
                    list:[]
                },
                addVisible:true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    total:0,
                    searchContent:null
                },
                groupList:[],
                multipleSelection:[],
                pass:true
            }
        },
        created(){
            this.getGroupList();
            this.doInit(this.currentData)
        },
        props: {
            currentData: Object,
        },
        methods: {
            doInit(currentData){
                let newArray = [];
                if (this.currentData.list == null){
                    newArray = []
                } else {
                    for (let item of this.currentData.list){
                        if(item.paperType == 'jobId'){
                            item.paperType = '工号'
                        } else if(item.matchRule == 'studentId'){
                            item.matchRule = '学号'
                        }
                        newArray.push({paperType: item.paperType, matchRule: item.matchRule});
                    }
                }
                this.userInfo = {
                    id:this.currentData.id,
                    auditName:this.currentData.auditName,
                    auditRemark:this.currentData.auditRemark,
                    groupId:this.currentData.groupId,
                    auditType:this.currentData.auditType,
                    auditRule:this.currentData.auditRule,
                    list:newArray
                }
            },
            action(){
               if(this.userInfo.list.length == 0){
                   this.userInfo.list.push({
                       paperType: '',
                       matchRule: ''
                   })
               }
            },
            domainAdd() {
                this.userInfo.list.push({
                    paperType: '',
                    matchRule: ''
                })
            },
            domainDel(index,row){
                this.userInfo.list.splice(index,1)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClose() {
                this.changeStatus();
            },
            doTest() {
                this.addVisible = true
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            resetForm(formName) {
                this.addVisible=false;
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                if(this.userInfo.groupId == ''){
                    this.$message({
                        type: 'warning',
                        message: '请选择适用用户组!'
                    });
                } else if(this.userInfo.auditRule == '' && (this.userInfo.auditType == 'auto' || this.userInfo.auditType == '自动审核')){
                    this.$message({
                        type: 'warning',
                        message: '请选择审核规则!'
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if (this.userInfo.auditType == '自动审核') {
                                this.userInfo.auditType = 'auto'
                            } else if (this.userInfo.auditType == '人工审核') {
                                this.userInfo.auditType = 'hand'
                                this.userInfo.auditRule = ''
                                this.userInfo.list = []
                            }
                            if (this.userInfo.auditRule == '全部通过') {
                                this.userInfo.auditRule = 'all'
                                this.userInfo.list = [];
                            } else if (this.userInfo.auditRule == '全部不通过') {
                                this.userInfo.auditRule = 'allNo'
                                this.userInfo.list = []
                            } else if (this.userInfo.auditRule == '根据规则匹配通过') {
                                this.userInfo.auditRule = 'rule'
                            }
                            for (let i = 0; i < this.userInfo.list.length; i++) {
                                if (this.userInfo.list[i].paperType == '工号') {
                                    this.userInfo.list[i].paperType = 'jobId'
                                } else if (this.userInfo.list[i].paperType == '学号') {
                                    this.userInfo.list[i].paperType = 'studentId'
                                }
                            }
                            if (this.userInfo.auditType == 'hand') {
                                this.userInfo.auditRule = ''
                                this.userInfo.list = []
                            }
                            if (this.userInfo.auditRule == 'all' || this.userInfo.auditRule == 'allNo') {
                                this.userInfo.list = [];
                            }
                            if (this.userInfo.auditRule == 'rule') {
                                for (let i = 0; i < this.userInfo.list.length; i++) {
                                    if (this.userInfo.list[i].paperType == '' || this.userInfo.list[i].matchRule == '') {
                                        this.$message({
                                            type: 'warning',
                                            message: '证件类型或匹配规则不能为空!'
                                        });
                                        this.pass = false;
                                        break;
                                    } else {
                                        this.pass = true;
                                    }
                                }
                            } else {
                                this.pass = true;
                            }
                            if (this.pass == true) {
                                editCheckConfig(this.userInfo).then(resp => {
                                    if (resp.status == 'SUCCESS') {
                                        this.$message({
                                            type: 'success',
                                            message: '编辑成功！'
                                        });
                                        this.addVisible = false;
                                        this.$emit('onChangeStatus');
                                        this.$refs[formName].resetFields();
                                    } else {
                                        this.$message({
                                            type: 'warning',
                                            message: resp.code.info
                                        });
                                    }
                                }).catch(error => {
                                    console.log(error)
                                });
                            }
                        } else {
                            return false;
                        }
                    });
                }
            },
            getGroupList() {
                this.groupList = [];
                getGroup({id:this.currentData.id}).then(response => {
                    this.groupList = response.data;
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            },
        }
    }

</script>
<style >

    /* 设置弹出框大小*/
    /*.el-dialog--tiny {*/
        /*width: 25%;*/
    /*}*/
    /*.user-set  .dialog{*/
        /*min-width: 830px;*/
    /*}*/
    /*.user-set  .el-dialog__header{*/
        /*padding-left:5px ;*/
    /*}*/
    /*.user-set  .el_put{*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 65% !important;*/
        /*margin-left: 20px;*/
    /*}*/
    /*.user-set  .el_sel{*/
        /*width: 65% !important;*/
        /*margin-left: 20px;*/
    /*}*/

    .el-upload-dragger{
        margin-top: -2px!important;
        margin-left: 10px!important;
        width: 400px!important;
    }
    /*.user-form .el_box{*/
        /*margin-left: 158px;*/
    /*}*/

    /*.user-form .el-form-item__content .el-input .el-input__inner {*/
        /*!*width: 488px;*!*/
    /*}*/

    /*.user-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width:135px ;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
    /*}*/

    /*.user-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.user-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 4px;*/
        /*position: absolute;*/
        /*top: 87% !important;*/
        /*left: 159px !important;*/
    /*}*/
</style>

