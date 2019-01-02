<template>
    <div class="admin public">
        <el-dialog title="收支报表明细" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog" top="10%">
            <div style="margin-bottom: 10px">
                <el-input v-model="time" style="width: 180px; float: left" :disabled="true"></el-input>
                <el-input v-model="chargeMoney" style="width: 180px;margin-left: 14px" :disabled="true"></el-input>
                <el-input v-model="refundMoney" style="width: 180px;margin-left: 10px" :disabled="true"></el-input>
                <el-input v-model="total" style="width: 180px;margin-left: 10px" :disabled="true"></el-input>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="sourceList"
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
                        prop="type"
                        label="动作"
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
            </el-table>
            <div class="row" style="margin-top:8px;" id="pages_list">
                <div class="block" style="margin-right: 2%;float: right" >
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="listQuery.currentPage"
                            :page-sizes="[10]"
                            :page-size="listQuery.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="listQuery.total">
                    </el-pagination>
                </div>
            </div>

            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="canle" @click="sourceReset">关闭</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {TotalReportDetail} from "../../../../../api/SSL_VPN/accountManager/income";
    export default {
        components: {

        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                addVisible: true,
                sourceList:[],
                listQuery:{
                    currentPage:'1',
                    pageSize:'10',
                    total:'',
                    day:''
                },
                time:'',
                chargeMoney:'',
                refundMoney:'',
                total:''
            }
        },
        props:['currentData'],
        created() {
            this.getList();
            this.time = '操作时间:  ' + this.currentData.createDay;
            this.chargeMoney = '充值金额:  ' + this.currentData.chargeMoney
            this.refundMoney = '退费金额:  ' + this.currentData.refundMoney;
            this.total = '合计金额:  ' + this.currentData.total;
        },
        methods: {
            search(event){
                if(event.keyCode==13){
                    this.getList();
                }
            },
            getList(){
                this.listQuery.day = this.currentData.createDay;
                TotalReportDetail(this.listQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        for (let i = 0; i < response.data.length; i++){
                            if(response.data[i].type == 1){
                                response.data[i].type = '充值';
                            } else if(response.data[i].type == -1) {
                                response.data[i].type = '退款';
                            }
                            if(response.data[i].chargeWay == 1){
                                response.data[i].chargeWay = '现金';
                            } else if(response.data[i].chargeWay == 2){
                                response.data[i].chargeWay = '微信';
                            } else if(response.data[i].chargeWay == 3){
                                response.data[i].chargeWay = '支付宝';
                            } else if(response.data[i].chargeWay == 4){
                                response.data[i].chargeWay = '校园卡';
                            } else {
                                response.data[i].chargeWay = '银行转账';
                            }
                        }
                        this.sourceList = response.data;
                        console.log('list:', this.sourceList);
                        this.listQuery.total = response.extend.page.totalHits;
                    }
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
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
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            }
        }
    }
</script>
<style>

    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .admin .dialog {
        min-width: 830px;
    }

    .admin .el-dialog__header {
        padding-left: 5px;
    }

    .admin .el_put {
        position: relative;
        display: inline-block;
        margin-left: 20px;
    }

    .admin .el_sel {
        margin-left: 20px;
    }

    .admin .el_text {
        margin-left: 158px;
    }

    .admin-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .admin-form .el-form-item {
        margin-bottom: 17px;
    }

    .admin .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .admin-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 165px;
    }
</style>
