<template>
    <div class="admin public">
        <el-dialog title="查看用户组授权" :visible.sync="addVisible" size="small" custom-class="dialog public" top="10%"
                   @close="handleClose" @open="doInit(currentData)">
            <div class="admin-form">
                <el-form :model="addInfo" ref="addInfo" label-width="142px" class="demo-ruleForm" :rules="rules">
                    <el-form-item label="用户组" prop="group_name">
                        <el-input placeholder="请输入用户组" v-model="group_name" :disabled="true" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input placeholder="请输入说明" v-model="addInfo.remark" class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label='应用设置'>
                        <el-button type="text" @click="setSource()" style="margin-left: 20px">查看应用</el-button>
                    </el-form-item>
                    <el-form-item label='可信域设置'>
                        <el-button type="text" @click="setTrustDomain()" style="margin-left: 20px">查看可信域</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"></div>
        </el-dialog>
        <lookResource  @onResourceStatus="onResourceStatus" v-if="isAddResourceShow" :id="id"/>
        <lookTrustDomain  @onDomainStatus="onDomainStatus" v-if="isAddTrustDomainShow" :id="id"/>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import lookResource from './lookResource.vue'
    import lookTrustDomain from './lookTrustDomain.vue'

    export default {
        components: {lookResource, lookTrustDomain},
        data() {
            return {
                rules:{
                    group_name: [
                        {required:'true', trigger: 'blur'}
                    ]
                },
                isAddResourceShow: false,
                isAddTrustDomainShow: false,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    searchContent: null,
                    total:0
                },
                addInfo: {
                    group_id: '',
                    resource_id: [],
                    black_id: [],
                    remark:''
                },
                group_name:'',
                blackSelected:[],
                resourceSelected:[],
                blackSelectedList:[],
                resourceSelectedList:[],
                addVisible: true,
                id:''
            }
        },
        props:['currentData'],
        created() {
            this.group_name = this.currentData.group_name;
            this.addInfo.group_id = this.currentData.id;
            this.addInfo.remark = this.currentData.remark;
            this.id = this.currentData.id;
            this.doInit(this.currentData)
        },
        methods: {
            doInit(data){
                this.addVisible = true;
                this.group_name = data.group_name;
                this.addInfo.group_id =data.id;
                this.addInfo.remark = data.remark;
                this.id = data.id;
            },
            onResourceStatus(data){
                this. isAddResourceShow = false;
                this.resourceSelected = data;
            },
            onDomainStatus(data){
                this.isAddTrustDomainShow = false;
                this.blackSelected = data;
            },
            setSource(data){
                this. isAddResourceShow = true;
                //this.currentData = data;
            },
            setTrustDomain(data){
                this.isAddTrustDomainShow = true;
                //this.currentData = data;
            },
            handleClose() {
                this.changeStatus();
            },
            show() {
                this.addVisible = true;
            },
            changeStatus() {
                this.$emit("onChangeStatus")
            },
            resetForm() {
                this.addVisible = false;
            },
        },
    }
</script>
<style>

    .el-dialog--tiny {
        width: 25%;
    }
    .el-button--text {
        background: transparent !important
    }

    /* 设置弹出框大小*/
    .admin .dialog {
        min-width: 830px;
    }

    .admin .el-dialog__header {
        padding-left: 5px;
    }

    .admin .el_put {
        position: relative;
        display: inline-block;
        margin-left: 20px;
    }

    .admin .el_sel {
        margin-left: 20px;
    }

    .admin .el_text {
        margin-left: 158px;
    }

    .admin-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .admin-form .el-form-item {
        margin-bottom: 20px;
    }

    .admin .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .admin-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 165px;
    }


</style>