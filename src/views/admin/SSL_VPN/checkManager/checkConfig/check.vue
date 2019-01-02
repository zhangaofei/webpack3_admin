<template>
    <div class=" public">
        <el-dialog
                title="查看-审核规则"
                :visible.sync="addVisible"
                custom-class="dialog"
                top="5%"
                size="small"
                @close="handleClose"
                @open="doInit(currentData)"
        >
            <div class="user-form">
                <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="审核规则名称" class="user_mandatory">
                        <el-input v-model="userInfo.auditName" :disabled="true" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="规则说明">
                        <el-input v-model="userInfo.auditRemark" :disabled="true" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="适用用户组" prop="groupId" class="user_mandatory">
                        <el-select v-model="userInfo.groupId" :disabled="true"  placeholder="请选择关联组" popper-class="form-user-select" class="el_sel">
                            <el-option v-for="item in groupList"
                                       :label="item.groupName"
                                       :value="item.id"
                                       v-bind:key="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="审核方式" prop="auditType" class="user_mandatory">
                        <el-select v-model="userInfo.auditType" :disabled="true"  placeholder="请选择审核方式" popper-class="form-user-select" class="el_sel">
                            <el-option label="自动审核" value="auto"></el-option>
                            <el-option label="人工审核" value="hand"></el-option>
                        </el-select>
                    </el-form-item>

                    <template v-if="userInfo.auditType == 'auto' || userInfo.auditType == '自动审核'">
                        <el-form-item label="审核规则" prop="auditRule" class="user_mandatory">
                        <el-select v-model="userInfo.auditRule" :disabled="true"  placeholder="请选择用户状态" popper-class="form-user-select" class="el_sel">
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
                                        >
                                <el-table-column
                                        label-class-name="user_mandatory"
                                        align="center"
                                        label="证件类型">
                                        <template slot-scope="scope">
                                            <el-select class="txt_ellipsis" v-model="scope.row.paperType" :disabled="true" placeholder="请输入证件类型">
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
                                        <el-input v-model="scope.row.matchRule" :disabled="true" placeholder="请输入匹配规则" class="txt_ellipsis external_value"></el-input>
                                        </template>
                                </el-table-column>
                                </el-table>
                                </el-form-item>
                        </template>
                    </template>
                </el-form>
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
            return {
                rules: {
                    auditName: [
                        {required: true,  trigger: 'blur'}
                    ],
                    groupId: [
                        {required: true,  trigger: 'blur'}
                    ],
                    auditType: [
                        {required: true,  trigger: 'blur'}
                    ],
                    auditRule: [
                        {required: true,  trigger: 'blur'}
                    ],
                },
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
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
                multipleSelection:[]
            }
        },
        created(){
            this.doInit(this.currentData);
            this.getGroupList();
        },
        props: {
            currentData: Object,
        },
        methods: {
            getGroupList() {
                this.groupList = [];
                getGroup({id:this.currentData.id}).then(response => {
                    this.groupList = response.data;
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            },
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
            handleClose() {
                this.changeStatus();
            },
            doTest() {
                this.addVisible = true
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            }
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

