<template>
    <div class="user-set public">
        <el-dialog
                title="编辑匹配规则"
                :visible.sync="editVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @close="handleClose"
        >
            <div class="user-form user_form">

                <el-form :model="ruleInfo" :rules="rules" ref="ruleInfo" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="name" >
                        <el-input v-model.trim="ruleInfo.name"  class="el_put" placeholder="名称" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="匹配规则" prop="" >
                        <div style="max-height: 250px;overflow-y: auto">
                            <el-table
                                    :data="ruleInfo.ruleList"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    style=""
                                    cell-class-name="reset_input_width">
                                <el-table-column label="规则类型" align="center">
                                    <template slot-scope="scope">
                                        <el-select v-model.trim="scope.row.type"  placeholder="规则类型">
                                            <template v-if="scope.row.regOption!='='&&scope.row.regOption!=''">
                                                <el-option
                                                        v-for="item in  ruleOtherTypes"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </template>
                                            <template v-else>
                                                <el-option
                                                        v-for="item in ruleTypes"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </template>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作符" align="center" width="120">
                                    <template slot-scope="scope">
                                        <el-select v-model.trim="scope.row.regOption" placeholder="操作符">
                                            <template v-if="scope.row.type=='GroupID'||scope.row.type=='UserName'">
                                                <el-option
                                                        v-for="item in optionOnlyEqual"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                >
                                                </el-option>
                                            </template>
                                            <template v-else>
                                                <el-option
                                                        v-for="item in optionRegexs"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                >
                                                </el-option>
                                            </template>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="值" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.regVal" placeholder="值"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" width="140">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="small"
                                                class="btn_none_bg"
                                                @click="add()">
                                            <img src="../../../../../../assets/addIcon/add.png">
                                        </el-button>
                                        <span v-if="ruleInfo.ruleList.length != 1">
                                                <el-button
                                                        size="small"
                                                        class="btn_none_bg"
                                                        @click="del(scope.$index,scope.row)">
                                                <img src="../../../../../../assets/addIcon/del.png">
                                            </el-button>
                                            </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
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
    import {editAclBasicRule} from "@/api/SSL_VPN/accessControl/accessControl";
    import {groupAllList} from "@/api/SSL_VPN/user_new/groupApi";
    export default{
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                rules: {
                    name:[
                        { required: true,message:'名称不能为空', trigger: 'blur' },
                    ]
                },
                ruleInfo: {
                    id:'',
                    name:'',
                    rule:{},
                    ruleList:[
                        {
                            type:'URI',
                            regOption:'≈',
                            regVal:'',
                        },
                    ]
                },
                editVisible:true,
                ruleTypes:[
                    {
                        label:'URI',
                        value:'URI',
                    },
                    {
                        label:'Host',
                        value:'Host',
                    },
                    {
                        label:'Referer',
                        value:'Referer',
                    },
                    {
                        label:'UserAgent',
                        value:'UserAgent',
                    },
                    {
                        label:'GroupID',
                        value:'GroupID',
                    },
                    {
                        label:'UserName',
                        value:'UserName',
                    }, {
                        label:'IP',
                        value:'IP',
                    },
                ],
                ruleOtherTypes:[
                    {
                        label:'URI',
                        value:'URI',
                    },
                    {
                        label:'Host',
                        value:'Host',
                    },
                    {
                        label:'Referer',
                        value:'Referer',
                    },
                    {
                        label:'UserAgent',
                        value:'UserAgent',
                    },
                    {
                        label:'IP',
                        value:'IP',
                    }
                ],
                optionRegexs:[
                    {
                        label:'Equal [=]',
                        value:'='
                    },
                    {
                        label:'Not Equal [!=]',
                        value:'!='
                    },
                    {
                        label:'Match RegEx[≈]',
                        value:'≈'
                    },
                    {
                        label:'Not Match RegEx[!≈]',
                        value:'!≈'
                    }
                ],
                optionOnlyEqual:[
                    {
                        label:'Equal [=]',
                        value:'='
                    }
                ],
            }
        },
        props:['currentData'],
        created(){
            if(this.currentData.ruleList&&this.currentData.ruleList!=null){
                this.ruleInfo=this.currentData;
                this.ruleInfo.rule=JSON.parse(this.currentData.rule);
                this.ruleInfo.ruleList=JSON.parse(this.currentData.ruleList);
            }
        },
        methods: {
            add(){
                this.ruleInfo.ruleList.push(
                    {
                        type:'URI',
                        regOption:'≈',
                        regVal:'',
                    }
                )
            },
            del(index,row){
                this.ruleInfo.ruleList.splice(index,1)
            },
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.editVisible = false
            },
            resetForm(formName) {
                this.editVisible=false;
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                //每次存储前先清空数据
                this.ruleInfo.rule={};
                this.$refs.ruleInfo.validate((valid) => {
                    if (valid) {
                        let sortArr=[];
                        for(let i=0;i<this.ruleInfo.ruleList.length;i++){
                            sortArr.push(this.ruleInfo.ruleList[i].type);
                            if(!this.ruleInfo.ruleList[i].type){
                                this.$message({
                                    type:'warning',
                                    message:'规则类型不能空！'
                                });
                                return
                            }
                            if(!this.ruleInfo.ruleList[i].regOption){
                                this.$message({
                                    type:'warning',
                                    message:'规则操作符不能空！'
                                });
                                return
                            }
                            if(!this.ruleInfo.ruleList[i].regVal){
                                this.$message({
                                    type:'warning',
                                    message:'规则值不能空！'
                                });
                                return
                            }
                        }
                        for(let i=0;i<sortArr.sort().length-1;i++){
                            if(sortArr.sort()[i]==sortArr.sort()[i+1]){
                                this.$message({
                                    type:'warning',
                                    message:'规则类型不能重复！'
                                });
                                return
                            }
                        }
                        for(let item of this.ruleInfo.ruleList){
                            this.ruleInfo.rule[item.type]={operator:item.regOption,value:item.regVal};
                        }

                        editAclBasicRule(this.ruleInfo).then((resp)=>{
                            if(resp.status==1){
                                this.$message({
                                    type:'success',
                                    message:'编辑成功！'
                                });
                                this.$emit('onChangeStatus');
                                this.$refs.ruleInfo.resetFields();
                                this.editVisible=false;
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

