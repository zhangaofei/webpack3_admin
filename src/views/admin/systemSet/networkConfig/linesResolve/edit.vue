<template>
    <div class="lines">
        <el-dialog
                title="修改智能线路解析"
                :visible.sync="infoVisible"
                custom-class="public dialog"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="lines-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="90px" class="demo-ruleForm">
                    <el-form-item label="运营商" prop="isp">
                        <el-select v-model="editInfo.isp" class="el_sel">
                            <el-option
                                    v-for="item in ispList"
                                    :key="item.v"
                                    :label="item.label"
                                    :value="item.v"
                                    :disabled="isIsp(item.v)">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地址" prop="netip">
                        <el-input v-model="editInfo.netip" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="state">
                        <el-select v-model="editInfo.state" class="el_sel" @change="chanState(editInfo.state)">
                            <el-option
                                    v-for="item in statusList"
                                    :key="item.val"
                                    :label="item.label"
                                    :value="item.val"
                                    >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo')">
                        取消
                    </span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitForm('editInfo')">
                        确定
                    </el-button>
                </div>
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
            let ip = (rule, value, callback) => {
//                if (/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]):\d{0,5}$/.test(value) == false){
                if (/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/.test(value) == false){
                    callback(new Error("请输入合法的地址"));
                }  else {
                    callback();
                }
            };
            return {
                rules: {
                    isp :[
                        {required:true,message:'请输入运营商名称'}
                    ],
                    netip:[
                        {required:true, validator: ip,trigger:'blur'}
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
                infoVisible: true,
                multipleSelection: [],
                ispList:[{
                    v: 1,
                    label: '默认线路'
                }, {
                    v: 2,
                    label: '教育网'
                },{
                    v: 3,
                    label: '电信'
                }, {
                    v: 4,
                    label: '移动'
                }, {
                    v: 5,
                    label: '联通'
                }],
                ispVal:0,
                statusList:[{
                    val: 0,
                    label: '停用'
                },{
                    val: 1,
                    label: '启用'
                },
                ]
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
                this.infoVisible = false
            },
            resetForm(formName) {
                this.infoVisible = false;
                this.$refs[formName].resetFields();
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

                this.infoVisible = true;
                let state = null;
                let isp = null;
                this.editInfo=currentData;
                this.ispVal=currentData.isp;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        smartLinkEdit(this.editInfo).then((resp) => {
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功！'
                                });
                                this.infoVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '编辑失败!'
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
        /*left: 235px;*/
    /*}*/

</style>