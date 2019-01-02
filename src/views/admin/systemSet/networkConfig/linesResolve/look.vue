<template>
    <div class="lines">
        <el-dialog
                title="查看智能线路解析"
                :visible.sync="lookVisible"
                custom-class="public dialog"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="lines-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="90px" class="demo-ruleForm">
                    <el-form-item label="运营商" prop="isp">
                        <el-select v-model="editInfo.isp" class="el_sel" :disabled="true">
                            <el-option
                                    v-for="item in ispList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    v-if="!isIsp(item.value)"

                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地址" prop="netip">
                        <el-input v-model="editInfo.netip" class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="state">
                        <el-select v-model="editInfo.state" class="el_sel" :disabled="true"></el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
    import {smartLinkEdit} from "../../../../../api/systemSet/new_networkConfig/linesResolve";
    export default{
        data(){
            return {
                rules: {
                    isp :[
                        {required:true}
                    ],
                    netip:[
                        {required:true}
                    ],
                    state:[
                        {required:true}
                    ]
                },
                editInfo: {
                    id: '',
                    isp: null,
                    netip: '',
                    state: null
                },
                lookVisible: true,
                multipleSelection: [],
                ispList:[{
                    value: 1,
                    label: '默认线路'
                }, {
                    value: 2,
                    label: '教育网'
                },{
                    value: 3,
                    label: '电信'
                }, {
                    value: 4,
                    label: '移动'
                }, {
                    value: 5,
                    label: '联通'
                }]
            }
        },

        props: {
            currentData: Object,
            editData:Array
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.lookVisible = false
            },

            isIsp(val){
                for(let i=0; i<this.editData.length;i++){
                    console.log(this.editData[i].isp,'isp_isp')
                    if(this.editData[i].isp==val){
                        return true
                    }
                }
                return false
            },
            doInit(currentData){
                console.log(currentData,'funval_currentData')
                this.lookVisible = true;
                let state = null;
                let isp = null;
                if (currentData.state == 1) {
                    state = '启用'
                } else {
                    state = '停用'
                }
                if (currentData.isp == 1) {
                    isp = '默认线路'
                } else if(currentData.isp == 2) {
                    isp = '教育网'
                }else if(currentData.isp == 3) {
                    isp = '电信'
                }else if(currentData.isp == 4) {
                    isp = '移动'
                }else {
                    isp = '联通'
                }
                this.editInfo = {
                    id: currentData.id,
                    isp: isp,
                    netip: currentData.netip,
                    state: state
                }
            },
            submitForm(formName) {
                let isp=null;
                let state=null;
                let editInfo={};
                if (this.editInfo.state == '启用') {
                    state = 1
                }
                if (this.editInfo.state == '停用') {
                    state = 0
                }

                if (this.editInfo.isp =='默认线路') {
                    isp = 1
                } else if(this.editInfo.isp =='教育网') {
                    isp = 2
                }else if(this.editInfo.isp == '电信') {
                    isp = 3
                }else if(this.editInfo.isp == '移动') {
                    isp = 4
                }else {
                    isp = 5
                }
                editInfo = {
                    id: this.editInfo.id,
                    isp: isp,
                    netip: this.editInfo.netip,
                    state: state
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        smartLinkEdit(this.editInfo).then((resp) => {
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功！'
                                });
                                this.lookVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message:resp.code.info
                                });
                            }
                        }).catch(e => {
                            console.log("编辑出错", e);
                        })
                    } else {
                        return false;
                    }
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>
<style>
    /*.el-dialog--tiny {*/
        /*width: 25%;*/
    /*}*/

    /*!* 设置弹出框大小*!*/

    /*.lines .el-dialog__header {*/
        /*padding-left: 5px;*/
    /*}*/

    /*.lines .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 65% !important;*/
    /*}*/

    /*.lines .el_sel {*/
        /*width: 65% !important;*/
    /*}*/

    /*.lines .el_text {*/
        /*margin-left: 158px;*/
    /*}*/

    /*.lines-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width: 135px;*/
        /*font-size: 15px;*/
        /*margin-left: 0px;*/
    /*}*/

    /*.lines-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.lines .el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.lines-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 165px;*/
    /*}*/

</style>