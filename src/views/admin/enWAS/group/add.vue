<template>
    <div class="group public">
        <el-dialog title="新建用户组授权" :visible.sync="addVisible" size="small" custom-class="dialog public" top="10%"
                   @close="handleClose">
            <div class="group-form">
                <el-form :model="addInfo" ref="addInfo" label-width="142px" class="demo-ruleForm" :rules="rules">

                    <el-form-item label="用户组" prop="group_id">
                        <el-select v-model="addInfo.group_id"
                                   class="el_sel" placeholder="组" popper-class="form-user-select">
                            <el-option
                                    v-for="item in group_ids"
                                    :key="item.id"
                                    :label="item.group_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input placeholder="请输入说明" v-model="addInfo.remark" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label='应用设置'>
                        <el-button type="text" @click="setSource('source')" style="margin-left: 20px">设置应用</el-button>
                    </el-form-item>
                    <el-form-item label='可信域设置'>
                        <el-button type="text" @click="setSource('domain')" style="margin-left: 20px">设置可信域</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div  class="foot">
                    <span class="cancle" @click="resetForm('addInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitInfo('addInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <addResource  @onResourceStatus="onResourceStatus" v-if="isAddResourceShow" :cancelResource="cancelResource"/>
        <addTrustDomain  @onDomainStatus="onDomainStatus" v-if="isAddTrustDomainShow" :cancelDomain="cancelDomain"/>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {grouplistForAdd, addAssociation} from "api/enWAS/group";
    import addResource from './addResource.vue'
    import addTrustDomain from './addTrustDomain.vue'

    export default {
        components: {addResource, addTrustDomain},
        data() {
            return {
                rules:{
                    group_id: [
                        {required:'true', message:'请选择用户组', trigger: 'blur'}
                    ]
                },
                isAddResourceShow: false,
                isAddTrustDomainShow: false,
                page:{
                    resource_page:1,
                    black_page:1,
                    page_size:10
                },
                addInfo: {
                    group_id: '',
                    resource_id: [],
                    black_id: [],
                    remark: ''
                },
                group_ids:[],
                blackSelected:[],
                resourceSelected:[],
                addVisible: true,
                cancelResource:[],
                cancelDomain:[]
            }
        },
        created() {
            this.getList();
        },
        methods: {
            onResourceStatus(data){
                this.isAddResourceShow = false;
                this.resourceSelected = data;
                this.cancelResource = data;
                this.getList();
            },
            onDomainStatus(data){
                this.isAddTrustDomainShow = false;
                this.blackSelected = data;
                this.cancelDomain = data;
                this.getList();
            },
            setSource(type){
                if(type == 'source'){
                    this. isAddResourceShow = true;
                } else {
                    this.isAddTrustDomainShow = true;
                }
            },
            handleClose() {
                this.$emit("onChangeStatus");
            },
            //获取没有进行授权的用户组列表
            getList() {
                grouplistForAdd(this.page).then(response => {
                    var data = response.data;
                    if (data && data.count > 0) {
                        this.group_ids = data.items;
                    } else {
                        this.group_ids = [];
                    }

                    if (data && data.black_count > 0) {
                        this.black_ids = data.item;
                    } else {
                        this.black_ids = [];
                    }


                }).catch((e) => {
                    console.log(e);
                })

            },
            submitInfo(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.resourceSelected,'resourceSelected-sub',this.blackSelected)
                        if (this.resourceSelected.length > 0){
                            for (let item of this.resourceSelected) {
                                this.addInfo.resource_id.push({name: item.name, id: item.id});
                            }
                        }else{
                            this.addInfo.resource_id=[]
                        }
                        if (this.blackSelected.length > 0){
                            for (let item of this.blackSelected) {
                                this.addInfo.black_id.push({name: item.name, id: item.id});
                            }
                        }else{
                            this.addInfo.black_id=[]
                        }
                        this.addInfo.resource_id = encodeURI(JSON.stringify(this.addInfo.resource_id));
                        this.addInfo.black_id = encodeURI(JSON.stringify(this.addInfo.black_id));
                        console.log(this.addInfo,'this.addInfo')
                        addAssociation(this.addInfo).then((resp) => {
                            console.log("resp",resp)
                            if(resp.status==1){
                                this.$message({
                                    type:'success',
                                    message:'新建成功！'
                                });
                                this.addVisible = false;
                            }else if(resp.status==-1){
                                this.$message({
                                    type:'warning',
                                    message:resp.msg
                                });
                            }else {
                                this.$message({
                                    type:'warning',
                                    message:'新建失败！'
                                });
                            }
                        }).catch(e => {
                            console.log("新建出错", e);
                        });


                    } else {

                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.addVisible = false;
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
        margin-left: 20px;
    }

    .group .el_sel {
        margin-left: 20px;
    }

    .group .el_text {
        margin-left: 158px;
    }

    .group-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .group-form .el-form-item {
        margin-bottom: 20px;
    }

    .group .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .group-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 165px;
    }


</style>