<template>
    <div class="group public">
        <el-dialog title="编辑用户组授权" :visible.sync="editVisible" size="small" custom-class="dialog public" top="10%"
                   @close="handleClose" @open="doInit(currentData)">
            <div class="group-form">
                <el-form :model="editInfo" ref="editInfo" label-width="142px" class="demo-ruleForm" :rules="rules">
                    <el-form-item label="用户组" prop="group_name">
                        <el-input placeholder="请输入用户组" v-model="group_name" :disabled="true" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input placeholder="请输入说明" v-model="editInfo.remark" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label='应用设置'>
                        <el-button type="text" @click="setSource()" style="margin-left: 20px">设置应用</el-button>
                    </el-form-item>
                    <el-form-item label='可信域设置'>
                        <el-button type="text" @click="setTrustDomain()" style="margin-left: 20px">设置可信域</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitInfo('editInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <editResource  @onResourceStatus="onResourceStatus" v-if="isAddResourceShow" :id="id" :cancelResource="cancelResource" :subClick="subClick"/>
        <editTrustDomain  @onDomainStatus="onDomainStatus" v-if="isAddTrustDomainShow" :id="id" :cancelDomain="cancelDomain" :domainClick="domainClick"/>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {grouplistForAdd, modifyAssociation, listForEdit} from "api/enWAS/group";
    import editResource from './editResource.vue'
    import editTrustDomain from './editTrustDomain.vue'

    export default {
        components: {editResource, editTrustDomain},
        data() {
            var name = (rule, value, callback) => {
                    callback();
            };
            return{
                rules:{
                    group_name: [
                        {required:'true', validator: name, trigger: 'blur'}
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
                editInfo: {
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
                editVisible: true,
                id:'',
                resourceClick:false,
                blackClick:false,
                subClick:false,
                domainClick:false,
                cancelResource:[],
                cancelDomain:[]
            }
        },
        props:['currentData'],
        created() {
            this.getResourceSelectedList();
            this.getBlackSelectedList();
            this.doInit(this.currentData)
        },
        methods: {
            doInit(data){
                this.editVisible = true;
                this.group_name = data.group_name;
                this.editInfo.group_id = data.id;
                this.editInfo.remark = data.remark;
                this.id = data.id;
            },
            onResourceStatus(data, subClick){
                this. isAddResourceShow = false;
                this.resourceSelected = data;
                this.cancelResource = data;
                this.subClick = subClick;
            },
            onDomainStatus(data, domainClick){
                this.isAddTrustDomainShow = false;
                this.blackSelected = data;
                this.cancelDomain = data;
                this.domainClick = domainClick;
                console.log('222blackSelected:', this.blackSelected);
            },
            setSource(data){
                this.resourceClick = true;
                this.isAddResourceShow = true;
            },
            setTrustDomain(data){
                this.blackClick = true;
                this.isAddTrustDomainShow = true;
            },
            handleClose() {
                this.changeStatus();
            },

            changeStatus() {
                this.$emit("onChangeStatus")
            },
            //后台获取所有被关联的资源
            getResourceSelectedList(){
                listForEdit({group_id:this.currentData.id}).then(response => {
                    let resource_id = response.data.items[0].resource_id;
                    this.resourceSelectedList = JSON.parse(decodeURI(resource_id));
                }).catch((e) => {
                    console.log(e);
                })
            },
            //后台获取所有被关联的信用域
            getBlackSelectedList(){
                listForEdit({group_id:this.currentData.id}).then(response => {
                    let black_id = response.data.items2[0].black_id;
                    this.blackSelectedList = JSON.parse(decodeURI(black_id));
                }).catch((e) => {
                    console.log(e);
                })
            },
            submitInfo(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.resourceClick){
                            if (this.resourceSelected.length > 0){
                                for (let item of this.resourceSelected) {
                                    this.editInfo.resource_id.push({name: item.name, id: item.id});
                                }
                            }
                        } else {
                            if (this.resourceSelectedList.length > 0){
                                for (let item of this.resourceSelectedList) {
                                    this.editInfo.resource_id.push({name: item.name, id: item.id});
                                }
                            }
                        }
                        if (this.blackClick){
                            if(this.blackSelected.length > 0){
                                for (let item of this.blackSelected) {
                                    this.editInfo.black_id.push({name: item.name, id: item.id});
                                }
                            }
                        } else {
                            if(this.blackSelectedList.length > 0){
                                for (let item of this.blackSelectedList) {
                                    this.editInfo.black_id.push({name: item.name, id: item.id});
                                }
                            }
                        }
                        this.editInfo.resource_id = encodeURI(JSON.stringify(this.editInfo.resource_id));
                        this.editInfo.black_id = encodeURI(JSON.stringify(this.editInfo.black_id));
                        modifyAssociation(this.editInfo).then((resp) => {
                            if(resp.status==1){
                                this.$message({
                                    type:'success',
                                    message:'编辑成功！'
                                });
                                this.editVisible = false;
                            }else if(resp.status==-1){
                                this.$message({
                                    type:'warning',
                                    message:resp.msg
                                });
                            }else {
                                this.$message({
                                    type:'warning',
                                    message:'编辑失败！'
                                });
                            }
                        }).catch(e => {
                            console.log("编辑出错", e);
                        });


                    } else {

                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.editVisible = false;
                this.$refs[formName].resetFields();
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
    .group .dialog {
        min-width: 830px;
    }

    .group .el-dialog__header {
        padding-left: 5px;
    }

    .group .el_put {
        position: relative;
        display: inline-block;
        /*width: 65% !important;*/
        margin-left: 20px;
    }

    .group .el_sel {
        /*width: 65% !important;*/
        margin-left: 20px;
    }

    .group .el_text {
        margin-left: 158px;
    }

    .group .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .group .el-form-item {
        margin-bottom: 20px;
    }

    .group .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .group .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 165px;
    }


</style>