<template>
    <div class="subQuery public">
        <el-dialog title="查询" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
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
                    <el-tab-pane label="套餐明细" name="first">
                        <el-table
                                ref="multipleTable"
                                :data="packageList"
                                :header-cell-style="headerCellStyle"
                                border
                                tooltip-effect="dark"
                                style="width: 100%"
                        >
                            <el-table-column
                                    prop="type"
                                    label="操作"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="packageName"
                                    label="套餐类型"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="套餐金额"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="circle"
                                    label="时间/流量"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="money"
                                    label="支付金额(元)"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="managerName"
                                    label="操作员"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="createTime"
                                    label="操作时间"
                                    align="center"
                            >
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="充值退费明细" name="second">
                        <el-table
                                ref="multipleTable"
                                :data="chargeList"
                                :header-cell-style="headerCellStyle"
                                border
                                tooltip-effect="dark"
                                style="width: 100%"
                        >
                            <el-table-column
                                    prop="type"
                                    label="操作类型"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="money"
                                    label="充值金额(元)"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="chargeWay"
                                    label="交易方式"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="managerName"
                                    label="操作管理员"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="createTime"
                                    label="操作时间"
                                    align="center"
                            >
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class='form-footer ' slot="footer" ></div>
        </el-dialog>
    </div>
</template>

<script>
    import {formatDateTime} from "../../../../../utils/dateUtil";
    import {getAccountInfo, payOrBackDetail, queryPackageDetail} from "../../../../../api/SSL_VPN/accountManager/query";
    export default {
        components: {

        },

        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                activeName:'first',
                addVisible: true,
                resourceList:[],
                packageList:[],
                chargeList:[],
                detailInfo:{
                    userId:'',
                    currentPage:'',
                    pageSize:''
                },
                packageInfo:{
                    userId:'',
                    currentPage:'',
                    pageSize:''
                }
            }
        },
        props:['currentData'],
        created() {
            this.getList();
        },
        methods: {
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
                        this.resourceList.push(resp.data);
                        this.detailInfo.userId = resp.data.userId;
                        this.packageInfo.userId = resp.data.userId;
                        this.getPayOrBackDetail();
                        this.getPackageDetail();
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
            getPayOrBackDetail(){
                payOrBackDetail(this.detailInfo).then(resp => {
                    if (resp.status == 'SUCCESS') {
                       for (let i = 0; i < resp.data.length; i++){
                            let date = new Date(resp.data[i].createTime)
                            resp.data[i].createTime = formatDateTime(date);
                        }
                        for(let i = 0; i < resp.data.length; i++){
                           if(resp.data[i].type == 1){
                               resp.data[i].type = '充值'
                           } else if(resp.data[i].type == -1){
                               resp.data[i].type = '退费'
                           }
                            if(resp.data[i].chargeWay == 1){
                                resp.data[i].chargeWay = '现金';
                            } else if(resp.data[i].chargeWay == 2){
                                resp.data[i].chargeWay = '微信';
                            } else if(resp.data[i].chargeWay == 3){
                                resp.data[i].chargeWay = '支付宝';
                            } else if(resp.data[i].chargeWay == 4){
                                resp.data[i].chargeWay = '校园卡';
                            } else {
                                resp.data[i].chargeWay = '银行转账';
                            }
                        }
                        this.chargeList = resp.data;
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
            getPackageDetail(){
                queryPackageDetail(this.packageInfo).then(resp => {
                    if (resp.status == 'SUCCESS') {
                        for (let i = 0; i < resp.data.length; i++){
                            let date = new Date(resp.data[i].createTime)
                            resp.data[i].createTime = formatDateTime(date);
                        }
                        this.packageList = resp.data;
                        for (let i = 0; i < this.packageList.length; i++){
                            if(this.packageList[i].type == 1){
                                this.packageList[i].type = '开通套餐'
                            } else if(this.packageList[i].type == 2){
                                this.packageList[i].type = '关闭套餐'
                            }
                            if(this.packageList[i].packageUnit == '月'){
                                this.packageList[i].circle = this.packageList[i].num * this.packageList[i].packageValue + '个' + this.packageList[i].packageUnit;
                            } else {
                                this.packageList[i].circle = this.packageList[i].num * this.packageList[i].packageValue + this.packageList[i].packageUnit;
                            }
                            if(this.packageList[i].packageUnit == '月'){
                                if(this.packageList[i].packageValue == 0 || this.packageList[i].packageValue == 1){
                                    this.packageList[i].price = this.packageList[i].packagePrice + '元' + '/' + this.packageList[i].packageUnit;
                                } else {
                                    this.packageList[i].price = this.packageList[i].packagePrice + '元' + '/' + this.packageList[i].packageValue + '个' + this.packageList[i].packageUnit;
                                }
                            } else {
                                if(this.packageList[i].packageValue == 0 || this.packageList[i].packageValue == 1){
                                    this.packageList[i].price = this.packageList[i].packagePrice + '元' + '/' + this.packageList[i].packageUnit;
                                } else {
                                    this.packageList[i].price = this.packageList[i].packagePrice + '元' + '/' + this.packageList[i].packageValue + this.packageList[i].packageUnit;
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
<style>
    .subQuery .el-dialog__body{
        padding: 60px 45px;
    }
</style>

