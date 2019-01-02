<template>
    <div class="user-set public">
        <el-dialog
                title="查看匹配规则"
                :visible.sync="lookVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @close="handleClose"
        >
            <div class="user-form user_form">

                <el-form :model="ruleInfo" :rules="rules" ref="ruleInfo" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="name" class="item_mark">
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
                                        <el-select v-model.trim="scope.row.type" placeholder="规则类型" :disabled="true">
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
                                        <el-select v-model.trim="scope.row.regOption" placeholder="操作符" :disabled="true">
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
                                <el-table-column label="值" align="center" :disabled="true">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.regVal" placeholder="值" :disabled="true"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  >

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
                rules:{},
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
                lookVisible:true,
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
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.lookVisible = false
            },
        }
    }
</script>

