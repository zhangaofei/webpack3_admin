<template>
    <div class="user-set public">
        <el-dialog
                title="新建拦截规则"
                :visible.sync="addVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @close="handleClose"
        >
            <div class="user-form user_form">

                <el-form :model="ruleInfo" :rules="rules" ref="ruleInfo" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="开启" prop="" >
                        <el-checkbox v-model.trim="ruleInfo.filter_rule.enable">开启</el-checkbox>
                    </el-form-item>

                    <el-form-item label="名称" prop="" >
                        <!--matchRules-->
                        <el-select v-model.trim="ruleInfo.basics_rule_name"   placeholder="名称" popper-class="form-user-select" class="el_sel">
                            <el-option v-for="item in ruleNames"
                                       :label="item.name"
                                       :value="item.name"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="执行动作" prop="" >
                        <el-select v-model.trim="ruleInfo.filter_rule.action"   placeholder="执行动作" popper-class="form-user-select" class="el_sel">
                            <el-option v-for="item in actions"
                                       :label="item.label"
                                       :value="item.value"
                                       :key="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle" @click="resetForm('ruleInfo')">取消</span>
                    <el-button type="primary" class="primary confirm btn_middle" @click="submitForm('ruleInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import {addAclBasicRule,getBreakRuleName,addBreakRule} from "@/api/SSL_VPN/accessControl/accessControl";
    import {groupAllList} from "@/api/SSL_VPN/user_new/groupApi";
    export default{
        data(){
            return {
                rules: {
                    basics_rule_name:[
                        { required: true,message:'名称不能为空', trigger: 'blur' },
                    ]
                },
                ruleNames:[],
                ruleInfo: {
                    basics_rule_name:'',
                    filter_rule:{
                        enable:false,
                        action:'accept',
                    },
                    describ:''
                },
                addVisible:true,
                actions:[
                    {
                        label:'accept',
                        value:'accept',
                    },
                    {
                        label:'block',
                        value:'block',
                    }
                ]
            }
        },
        created(){
            this.getList();
        },
        methods: {
            getList(){
                getBreakRuleName().then((resp)=>{
                    if(resp.status==1){
                       this.ruleNames=resp.data
                    }else {
                        this.$message({
                            type:'warning',
                            message:''
                        });
                    }
                })
            },
            handleClose() {
                this.changeStatus();
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
                this.$refs.ruleInfo.validate((valid) => {
                    if (valid) {
                        addBreakRule(this.ruleInfo).then((resp)=>{
                            if(resp.status==1){
                                this.$message({
                                    type:'success',
                                    message:'添加成功！'
                                });
                                this.$emit('onChangeStatus');
                                this.$refs.ruleInfo.resetFields();
                                this.addVisible=false;
                            }else {
                                this.$message({
                                    type:'warning',
                                    message:resp.msg
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>

