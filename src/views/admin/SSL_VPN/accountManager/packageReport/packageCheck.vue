<template>
    <div class="admin public">
        <el-dialog title="套餐报表明细":visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog" top="10%">
            <div style="margin-bottom: 10px">
                <el-input v-model="name" style="width: 190px; float: left" :disabled="true"></el-input>
                <el-input v-model="price" style="width: 200px;padding-left: 10px" :disabled="true"></el-input>
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
                        prop="type"
                        label="动作"
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
                        prop="packagePrice"
                        label="金额(元)"
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
    import {formatDateTime} from "../../../../../utils/dateUtil";
    import {packageReportDetail} from "../../../../../api/SSL_VPN/accountManager/packageConfig";
    export default {
        components: {

        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                addVisible: true,
                resourceList:[],
                listQuery: {
                    currentPage:1,
                    pageSize:10,
                    total:10,
                    packageId:''
                },
                name:'',
                price:''
            }
        },
        props:['currentData'],
        created() {
            console.log('data:', this.currentData);
            this.getList();
            this.name = '套餐名称:  ' + this.currentData.name;
            this.price = '套餐价格:  ' + this.currentData.circle;
        },
        methods: {
            search(event){
                if(event.keyCode==13){
                    this.getList();
                }
            },
            getList(){
                this.listQuery.packageId = this.currentData.packageId;
                packageReportDetail(this.listQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.resourceList = response.data;
                        for (let i = 0; i < response.data.length; i++){
                            if(response.data[i].type == 1){
                                response.data[i].type = '开通套餐';
                            } else if(response.data[i].type == 2) {
                                response.data[i].type = '关闭套餐';
                            }
                            let date = new Date(response.data[i].createTime)
                            response.data[i].createTime = formatDateTime(date);
                        }
                        for (let i = 0; i < this.resourceList.length; i++){
                            if(this.resourceList[i].packageUnit == '月'){
                                this.resourceList[i].circle = this.resourceList[i].packageValue * this.resourceList[i].num + '个' + this.resourceList[i].packageUnit;
                            } else {
                                this.resourceList[i].circle = this.resourceList[i].packageValue * this.resourceList[i].num + this.resourceList[i].packageUnit;
                            }
                        }
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
        /*width: 65% !important;*/
        margin-left: 20px;
    }

    .admin .el_sel {
        /*width: 65% !important;*/
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
