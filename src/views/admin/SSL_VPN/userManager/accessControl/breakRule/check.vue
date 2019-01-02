<template>
    <div class="user-set public">
        <el-dialog
                title="查看拦截规则"
                :visible.sync="lookVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @close="handleClose"
        >
            <div class="user-form user_form">

                <el-form :model="ruleInfo" :rules="rules" ref="ruleInfo" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="开启" prop="" >
                        <el-checkbox v-model="ruleInfo.filter_rule.enable" :disabled="true">开启</el-checkbox>
                    </el-form-item>

                    <el-form-item label="名称" prop="" class="item_mark">
                        <el-select v-model="ruleInfo.basics_rule_name" :disabled="true"   placeholder="名称" popper-class="form-user-select" class="el_sel">
                            <el-option v-for="item in ruleNames"
                                       :label="item.name"
                                       :value="item.name"
                                       :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="执行动作" prop="" >
                        <el-select v-model="ruleInfo.filter_rule.action" :disabled="true"   placeholder="执行动作" popper-class="form-user-select" class="el_sel">
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
                    
                </div>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import {addAclBasicRule,getBreakRuleName,editBreakRule} from "@/api/SSL_VPN/accessControl/accessControl";
    import {groupAllList} from "@/api/SSL_VPN/user_new/groupApi";
    export default{
        data(){
            return {
                rules: {

                },
                ruleNames:[],
                ruleInfo: {
                    id:'',
                    basics_rule_name:'',
                    filter_rule:{
                        enable:false,
                        action:'accept',
                    },
                    describ:''
                },
                lookVisible:true,
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
        props:['currentData'],
        created(){
            console.log('this.currentData',this.currentData,this.ruleInfo.ruleList)
            /*if(this.currentData.ruleList&&this.currentData.ruleList!=null){
                this.ruleInfo=this.currentData;
                this.ruleInfo.rule=JSON.parse(this.currentData.rule);
                this.ruleInfo.ruleList=JSON.parse(this.currentData.ruleList);
            }*/
            this.ruleInfo=this.currentData;
            this.ruleInfo.filter_rule=JSON.parse(this.currentData.filter_rule);
            console.log('currentData',this.currentData)
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
                this.lookVisible = false
            }
        }
    }
</script>