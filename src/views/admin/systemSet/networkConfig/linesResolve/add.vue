<template>
    <div class="lines">
        <el-dialog
                title="新建智能线路解析"
                :visible.sync="addVisible"
                custom-class="public dialog"
                top="10%"
                @close="handleClose">
            <div class="lines-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="90px" class="demo-ruleForm">
                    <el-form-item label="运营商" prop="isp">
                        <el-select v-model="addInfo.isp" class="el_sel">
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
                        <el-input v-model="addInfo.netip" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="state">
                        <el-select v-model="stateVal" class="el_sel">
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
                    <span class="cancle btn_middle"  @click="resetForm('addInfo')">
                        取消
                    </span>
                    <el-button
                            class="primary btn_middle confirm"
                            type="primary"
                            @click="submitForm('addInfo')">
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
    import {smartLinkAdd} from "../../../../../api/systemSet/new_networkConfig/linesResolve";
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
//                        {required:true}
                    ]
                },
                addInfo: {
                    isp: null,
                    netip: null,
                    state: null
                },
                addVisible: true,
                multipleSelection: [],
                list:[],
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
                statusList:[{
                    val: 0,
                    label: '停用'
                },{
                    val: 1,
                    label: '启用'
                }],
                stateVal:0
            }
        },
        props: {
            addData: Array
        },
        created(){

        },
        methods: {
            handleClose() {
                this.changeStatus();
            },
            isIsp(val){
                for(let i=0; i<this.addData.length;i++){
                  if(this.addData[i].isp==val){
                      return true
                  }
                }
                return false
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.addInfo.state=this.stateVal;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        smartLinkAdd(this.addInfo).then((resp) => {
                            console.log(resp, 'resp', this.addInfo);
                            if (resp.status ==1) {
                                this.$message({
                                    type: 'success',
                                    message: '新建成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: resp.msg
                                });

                            }
                        }).catch(e => {
                            console.log("新建出错", e);
                        })
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>
<style>
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