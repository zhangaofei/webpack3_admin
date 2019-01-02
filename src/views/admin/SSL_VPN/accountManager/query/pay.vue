<template>
    <div class="pay public">
        <el-dialog title="充值" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <div style="margin-bottom: 30px;line-height: 1;">
               用户信息
            </div>
            <el-table
                    ref="multipleTable"
                    :data="resourceList"
                    :header-cell-style="headerCellStyle"
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
            >
                <el-table-column
                        prop="userName"
                        label="用户名"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="groupName"
                        label="用户组"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="auditType"
                        label="证件类型"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="code"
                        label="证件号"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="validityTime"
                        label="账号有效期"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="remainFlow"
                        label="账号流量"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="remainMoney"
                        label="账号金额"
                        align="center"
                >
                </el-table-column>
            </el-table>
            <div class="row" style="margin-top:40px;" id="pages_list">
                <div style="margin-left: 13px; line-height: 1;">充值选项</div>
                <div style="margin-left: 65px;margin-top: 30px" v-show="topUpState">
                    充值数额
                    <el-input v-model="payInfo.money" @blur="checkMoney" style="width: 200px;margin-left: 20px;margin-right: 15px"></el-input>
                    元
                </div>
                <div style="margin-left: 65px;margin-top: 30px" v-show="topUpState">
                    充值方式
                    <el-radio-group v-model="payInfo.chargeWay" style="margin-left: 20px">
                        <el-radio :label=1><img class="pay_icon_img" src="../../../../../assets/accountManager/mony.png" alt="现金支付">现金支付</el-radio>
                        <el-radio :label=2><img class="pay_icon_img" src="../../../../../assets/accountManager/wx.png" alt="微信支付">微信支付</el-radio>
                        <el-radio :label=3><img class="pay_icon_img" src="../../../../../assets/accountManager/zfb.png" alt="支付宝">支付宝</el-radio>
                        <el-radio :label=4><img class="pay_icon_img" src="../../../../../assets/accountManager/school.png" alt="校园卡">校园卡</el-radio>
                    </el-radio-group>
                </div>
                <div v-show="topUpState">
                    <el-button @click="payAction" type="primary" style="margin-left: 66px;margin-top: 70px" class="primary confirm" :disabled="payOnce">确认充值</el-button>
                </div>
                <div style="margin-top: 30px; text-align: center;" v-show="!topUpState">
                    <div class="success" v-if="success01">
                        <img src="../../../../../assets/accountManager/success01.png" style="vertical-align: top; border: none;" alt="充值成功">
                        <p style="margin-top: 30px; font-size: 26px; letter-spacing: 2px;">充值成功</p>
                    </div>
                    <div class="fail" v-if="fail01">
                        <img src="../../../../../assets/accountManager/fail01.png" style="vertical-align: top; border: none;" alt="充值失败">
                        <p style="margin-top: 30px; font-size: 26px; letter-spacing: 2px;">充值失败</p>
                    </div>
                </div>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;" v-show="!topUpState">
                <div  class="foot">
                    <el-button class="primary confirm btn_middle" @click.stop="handleClose" type="primary">确定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {formatDateTime} from "../../../../../utils/dateUtil";
    import {getAccountInfo, payOrBackMoney} from "../../../../../api/SSL_VPN/accountManager/query";
    export default {
        components: {

        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                res:true,
                radio2:'',
                addVisible: true,
                resourceList:[],
                payInfo:{
                    userName:'',
                    chargeWay:1,
                    type:1,
                    money:''
                },
                success01: true,
                fail01: false,
                topUpState: true,
                payOnce:false,//初始可点击
            }
        },
        props:['currentData'],
        created() {
            this.getList();
        },
        methods: {
            checkMoney(e){
                if(/^(\+?[1-9]\d{0,2}|\+?1000)$/.test(e.target.value) == false){
                    this.res = false;
                } else {
                    this.res = true;
                }
            },
            search(event){
                if(event.keyCode==13){
                    this.getList();
                }
            },
            getList(){
                getAccountInfo({userName:this.currentData}).then(resp => {
                    if (resp.status == 'SUCCESS') {
                        let date = new Date(resp.data.validityTime)
                        resp.data.validityTime = formatDateTime(date);
                        if (resp.data.auditType == 'studentId'){
                            resp.data.auditType = '学号';
                        } else if(resp.data.auditType == 'jobId'){
                            resp.data.auditType = '工号';
                        }
                        this.resourceList = [];
                        this.resourceList.push(resp.data);
                    } else {
//                        this.$message({
//                            type:'warning',
//                            message:resp.code.info
//                        });
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            payAction(){
                if(this.res == false){
                    this.$message({
                        type: 'warning',
                        message: '请输入正确的充值金额！'
                    });
                    this.topUpState = false;
                    this.success01 = false;
                    this.fail01 = true;
                    this.payInfo.money = '';
                } else {
                    this.payOnce=true;
                    this.payInfo.userName = this.currentData;
                    payOrBackMoney(this.payInfo).then(resp => {
                        if (resp.status == 'SUCCESS') {
                            this.topUpState = false;
                            this.success01 = true;
                            this.fail01 = false;
                            this.getList();
                            this.payOnce=false;
                        } else {
                            this.topUpState = false;
                            this.success01 = false;
                            this.fail01 = true;
                            this.payOnce=false;
                            if(resp.code && !resp.code.info) return;
                            this.$message({
                                type:'warning',
                                message:resp.code.info
                            });
                        }
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            handleClose() {
                this.topUpState = true;
                this.success01 = true;
                this.fail01 = false;
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            sourceReset(formName) {
                this.changeStatus();
            }
        }
    }
</script>
<style scoped lang="scss">
    /deep/.pay .el-dialog__body {
        padding: 60px 45px;
    }
    .pay_icon_img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
        border: none;
        margin-right: 10px;
        margin-top: -2px;
    }
</style>

