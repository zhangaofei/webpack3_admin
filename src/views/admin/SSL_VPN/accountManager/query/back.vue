<template>
    <div class="back public">
        <el-dialog title="退费" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <div style="margin-bottom: 30px; line-height: 1;">
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
            <div class="row" style="margin-top:30px;margin-left: 0px;margin-right: 0px" id="pages_list">
                <el-tabs type="border-card" v-model="activeName">
                    <el-tab-pane label="退费选项" name="first">
                        <div style="margin-left: 65px;margin-top: 50px" v-show="topUpState">
                            退费数额
                            <el-input v-model="payInfo.money" @blur="checkMoney" style="width: 200px;margin-left: 30px;margin-right: 15px"></el-input>
                            元
                        </div>
                        <div style="margin-left: 65px;margin-top: 30px" v-show="topUpState">
                            退费方式
                            <el-radio-group v-model="payInfo.chargeWay" style="margin-left: 30px">
                                <el-radio :label=1><img class="pay_icon_img" src="../../../../../assets/accountManager/mony.png" alt="现金支付">现金支付</el-radio>
                                <el-radio :label=2><img class="pay_icon_img" src="../../../../../assets/accountManager/wx.png" alt="微信支付">微信支付</el-radio>
                                <el-radio :label=3><img class="pay_icon_img" src="../../../../../assets/accountManager/zfb.png" alt="支付宝">支付宝</el-radio>
                                <el-radio :label=4><img class="pay_icon_img" src="../../../../../assets/accountManager/school.png" alt="校园卡">校园卡</el-radio>
                            </el-radio-group>
                        </div>
                        <div v-show="topUpState">
                            <el-button @click="backAction" type="primary" style="margin-left: 155px;margin-top: 30px" class="primary confirm">确认退费</el-button>
                        </div>
                        <div style="margin-top: 30px; text-align: center;" v-show="!topUpState">
                            <div class="success" v-if="success01">
                                <img src="../../../../../assets/accountManager/success01.png" style="vertical-align: top; border: none;" alt="退费成功">
                                <p style="margin-top: 30px; font-size: 26px; letter-spacing: 2px;">退费成功</p>
                            </div>
                            <div class="fail" v-if="fail01">
                                <img src="../../../../../assets/accountManager/fail01.png" style="vertical-align: top; border: none;" alt="退费失败">
                                <p style="margin-top: 30px; font-size: 26px; letter-spacing: 2px;">退费失败</p>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="关闭套餐选项" name="second">
                        <el-table
                                ref="multipleTable"
                                :data="closeList"
                                :header-cell-style="headerCellStyle"
                                border
                                tooltip-effect="dark"
                                style="width: 100%"
                        >
                            <el-table-column
                                    prop="packageName"
                                    label="套餐名称"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="state"
                                    label="状态"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="circle"
                                    label="套餐金额"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="sumContent"
                                    label="总套餐"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="120px"
                                    prop="usedContent"
                                    label="已用时间/流量"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="120px"
                                    prop="remainContent"
                                    label="剩余时间/流量"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <a @click="closeAction(scope.row)">关闭剩余套餐</a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class='form-footer ' slot="footer">
                <div class='form-footer ' slot="footer" style="height:50px;" v-show="!topUpState">
                    <div  class="foot">
                        <el-button class="primary confirm btn_middle" @click.stop="handleClose" type="primary">确定</el-button>
                    </div>
                </div>
                <!--<div style="margin-top: 20px;margin-right: 50px;">-->
                    <!--<el-button-->
                            <!--type="primary"-->
                            <!--@click="sourceReset" style="margin-right: 40px;">-->
                        <!--关闭-->
                    <!--</el-button>-->
                <!--</div>-->
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {formatDateTime} from "../../../../../utils/dateUtil";
    import {getAccountInfo, payOrBackMoney, getCloseList, ClosePackage} from "../../../../../api/SSL_VPN/accountManager/query";
    export default {
        components: {

        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                res:true,
                activeName:'first',
                addVisible: true,
                resourceList:[],
                closeList:[],
                success01: true,
                fail01: false,
                topUpState: true,
                payInfo:{
                    userName:'',
                    chargeWay:1,
                    type:-1,
                    money:''
                },
                listQuery:{
                    userId:'',
                    currentPage:'1',
                    pageSize:'10',
                    total:''
                }
            }
        },
        props:['currentData'],
        created() {
            this.getList();
        },
        methods: {
            checkMoney(e){
                if(/^\+?[1-9]\d*$/.test(e.target.value) == false){
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
                        this.listQuery.userId = resp.data.userId;
                        this.getCloseList();
                    } else {
                        this.$message({
                            type:'warning',
                            message:resp.code.info
                        });
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            getCloseList(){
                getCloseList(this.listQuery).then(resp => {
                    if (resp.status == 'SUCCESS') {
                        this.closeList = resp.data;
                        for (let i = 0; i < this.closeList.length; i++){
                            if(this.closeList[i].state == 0){
                                this.closeList[i].state = '未使用'
                            } else if(this.closeList[i].state == 1){
                                this.closeList[i].state = '正在使用'
                            }
                            if(this.closeList[i].packageUnit == '月'){
                                if(this.closeList[i].packageValue == 0 || this.closeList[i].packageValue == 1){
                                    this.closeList[i].circle = this.closeList[i].packagePrice + '元' + '/' + this.closeList[i].packageUnit;
                                } else {
                                    this.closeList[i].circle = this.closeList[i].packagePrice + '元' + '/' + this.closeList[i].packageValue + '个' + this.closeList[i].packageUnit;
                                }
                            } else {
                                if(this.closeList[i].packageValue == 0 || this.closeList[i].packageValue == 1){
                                    this.closeList[i].circle = this.closeList[i].packagePrice + '元' + '/' + this.closeList[i].packageUnit;
                                } else {
                                    this.closeList[i].circle = this.closeList[i].packagePrice + '元' + '/' + this.closeList[i].packageValue + this.closeList[i].packageUnit;
                                }
                            }
                        }
                    } else {
                        this.$message({
                            type:'warning',
                            message:resp.code.info
                        });
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            closeAction(data){
                ClosePackage({userPackageId: data.id}).then(resp => {
                    if (resp.status == 'SUCCESS') {
                        this.$message({
                            type: 'success',
                            message: '套餐关闭成功！'
                        });
                        this.getList();
                        this.getCloseList();
                    } else {
                        this.$message({
                            type:'warning',
                            message:resp.code.info
                        });
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            backAction(){
                if(this.res == false){
                    this.$message({
                        type: 'warning',
                        message: '请输入正确的退费金额！'
                    });
                    this.payInfo.money = '';
                } else {
                    this.payInfo.userName = this.currentData;
                    payOrBackMoney(this.payInfo).then(resp => {
                        if (resp.status == 'SUCCESS') {
                            this.topUpState = false;
                            this.success01 = true;
                            this.fail01 = false;
                            this.$message({
                                type: 'success',
                                message: '退费成功！'
                            });
                            this.getList();
                            this.getCloseList();
                        } else {
                            this.topUpState = false;
                            this.success01 = false;
                            this.fail01 = true;
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
<style scoped>
    .back .el-dialog__body {
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
<style scoped lang="scss">
    .pay_icon_img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
        border: none;
        margin-right: 10px;
        margin-top: -2px;
    }
</style>

