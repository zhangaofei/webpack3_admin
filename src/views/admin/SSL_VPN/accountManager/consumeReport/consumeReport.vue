<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i>计费管理</a></li>
                <li class="active">收支报表</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header"  style="border: 1px solid transparent;">
                            <h3 class="box-title">收支报表</h3>
                        </div>
                        <div class="box-body">
                            <el-tabs type="border-card" v-model="activeName">
                                <el-tab-pane label="总体报表" name="first">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="box">
                                                <!-- /.box-header -->
                                                <div class="box-body">
                                                    <!-- 表单搜索框部分 -->
                                                    <div style="padding: 20px 0px 30px;">
                                                        <div style="margin-bottom:8px;margin-left: 0;display: inline-block;">
                                                            <el-button @click="totalDownload('query')" type="primary" class="primary confirm" style="width: 140px;">查询并导出报表</el-button>
                                                            <el-button @click="totalDownload('all')" type="primary" class="primary confirm" style="width: 140px;">导出所有报表</el-button>
                                                        </div>
                                                        <el-col :span="6" style="float:right;">
                                                            <el-date-picker
                                                                    v-model="date1"
                                                                    type="daterange"
                                                                    size="middle"
                                                                    range-separator="至"
                                                                    format="yyyy-MM-dd"
                                                                    style="height:36px; width: 100%;"
                                                                    @change="changeTime(date1, 'total')"
                                                                    placeholder="选择日期范围">
                                                            </el-date-picker>
                                                        </el-col>
                                                    </div>
                                                    <div>
                                                        <div style="margin-bottom: 15px;">历史合计</div>
                                                        <div flex="main:justify">
                                                            <el-input v-model="chargeNum" :disabled="true" style=" width: 18%;float: left; margin-right: 20px; margin-bottom: 15px">
                                                            </el-input>
                                                            <el-input v-model="refundNum" :disabled="true" style="width: 18%;float: left;margin-right: 20px;margin-bottom: 15px">
                                                            </el-input>
                                                            <el-input v-model="chargeMoney" :disabled="true" style="width: 18%;float: left;margin-right: 20px;margin-bottom: 15px">
                                                            </el-input>
                                                            <el-input v-model="refundMoney" :disabled="true" style="width: 18%;float: left;margin-right: 20px;margin-bottom: 15px">
                                                            </el-input>
                                                            <el-input v-model="total" :disabled="true" style="width: 18%;margin-bottom: 15px">
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                    <el-table
                                                            ref="multipleTable"
                                                            :data="totalList"
                                                            :header-cell-style="headerCellStyle"
                                                            border
                                                            tooltip-effect="dark"
                                                            style="width: 100%"
                                                    >
                                                        <el-table-column
                                                                prop="createDay"
                                                                label="操作时间"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                prop="chargeNum"
                                                                label="充值笔数"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                prop="chargeMoney"
                                                                label="充值金额"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="refundNum"
                                                                label="退费笔数"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="refundMoney"
                                                                label="退费金额"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="total"
                                                                label="合计金额"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                align="center"
                                                                label="操作"
                                                                width="150"
                                                                show-overflow-tooltip>
                                                            <template slot-scope="scope">
                                                                <a @click="onCheck(scope.row, 'total')">查看明细</a>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>


                                                    <div class="row" style="margin-top:8px;" >
                                                        <div class="block" style="margin-right: 2%;float: right" >
                                                            <el-pagination
                                                                    @size-change="handleSizeChange1"
                                                                    @current-change="handleCurrentChange1"
                                                                    :current-page="totalQuery.currentPage"
                                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                                    :page-size="totalQuery.pageSize"
                                                                    layout="total, sizes, prev, pager, next, jumper"
                                                                    :total="totalQuery.total">
                                                            </el-pagination>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="管理员报表" name="second">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="box">
                                                <!-- /.box-header -->
                                                <div class="box-body">
                                                    <!-- 表单搜索框部分 -->
                                                    <el-row style="padding: 20px 0 30px;">
                                                        <el-col :span="8">
                                                            <el-button  @click="adminDownload('query')" type="primary" class="primary confirm" style="width: 140px;">查询并导出报表</el-button>
                                                            <el-button  @click="adminDownload('all')" type="primary" class="primary confirm" style="width: 140px;">导出所有报表</el-button>
                                                        </el-col>
                                                        <el-col :span="8" style="float: right;">
                                                            <SearchBox
                                                                    width="60px"
                                                                    inputBoxId="search_content11"
                                                                    placeholder="请输入操作管理员"
                                                                    @search="search"
                                                                    index="1-1"
                                                                    @onClickSearchButton="getList"></SearchBox>
                                                        </el-col>
                                                        <el-col :span="6" style="float: right; margin-right: 20px;">
                                                            <el-date-picker
                                                                    style="height:38px; width: 100%;"
                                                                    v-model="date2"
                                                                    type="daterange"
                                                                    size="middle"
                                                                    range-separator="至"
                                                                    format="yyyy-MM-dd"
                                                                    @change="changeTime(date2, 'admin')"
                                                                    placeholder="选择日期范围">
                                                            </el-date-picker>
                                                        </el-col>
                                                    </el-row>
                                                    <el-table
                                                            ref="multipleTable"
                                                            :data="adminList"
                                                            :header-cell-style="headerCellStyle"
                                                            border
                                                            tooltip-effect="dark"
                                                            style="width: 100%;">
                                                        <el-table-column
                                                                prop="createDay"
                                                                label="操作时间"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                prop="userName"
                                                                label="操作管理员"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                prop="chargeNum"
                                                                label="充值笔数"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="chargeMoney"
                                                                label="充值金额"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="refundNum"
                                                                label="退费笔数"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="refundMoney"
                                                                label="退费金额"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="total"
                                                                label="合计金额"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                align="center"
                                                                label="操作"
                                                                width="150"
                                                                show-overflow-tooltip>
                                                            <template slot-scope="scope">
                                                                <a @click="onCheck(scope.row, 'admin')">查看明细</a>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>

                                                    <div class="row" style="margin-top:8px;" >
                                                        <div class="block" style="margin-right: 2%;float: right" >
                                                            <el-pagination
                                                                    @size-change="handleSizeChange2"
                                                                    @current-change="handleCurrentChange2"
                                                                    :current-page="adminQuery.currentPage"
                                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                                    :page-size="adminQuery.pageSize"
                                                                    layout="total, sizes, prev, pager, next, jumper"
                                                                    :total="adminQuery.total">
                                                            </el-pagination>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="交易方式报表" name="third">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="box">
                                                <!-- /.box-header -->
                                                <div class="box-body">
                                                    <!-- 表单搜索框部分 -->
                                                    <el-row style="padding: 20px 0 30px;">
                                                        <el-col :span="8">
                                                            <el-button  @click="chargewayDownload('query')" type="primary" class="primary confirm" style="width: 140px;">查询并导出报表</el-button>
                                                            <el-button  @click="chargewayDownload('all')" type="primary" class="primary confirm" style="width: 140px;">导出所有报表</el-button>
                                                        </el-col>

                                                        <el-col :span="8" style="float: right;">
                                                            <SearchBox
                                                                    width="60px"
                                                                    searchBoxId="example1111"
                                                                    inputBoxId="search_content111"
                                                                    placeholder="请输入交易方式"
                                                                    index="1-2"
                                                                    @search="search"
                                                                    @onClickSearchButton="getList"></SearchBox>
                                                        </el-col>

                                                        <el-col :span="6" style="float: right; margin-right: 20px;">
                                                            <el-date-picker
                                                                    style="float:left;height:38px; width: 100%;"
                                                                    v-model="date3"
                                                                    type="daterange"
                                                                    size="middle"
                                                                    range-separator="至"
                                                                    format="yyyy-MM-dd"
                                                                    @change="changeTime(date3, 'charge')"
                                                                    placeholder="选择日期范围">
                                                            </el-date-picker>
                                                        </el-col>

                                                        <!--<div class="" style="float: right;margin-left: 0">-->
                                                            <!--<div id="example1111" class="dataTables_filter" style="float:right;margin-right:-10px;">-->
                                                                <!--<input type="text"-->
                                                                       <!--class="form-control"-->
                                                                       <!--placeholder="请输入交易方式"-->
                                                                       <!--id="search_content111"-->
                                                                       <!--style="float:left;margin-left:20px;max-width: 70%"-->
                                                                       <!--v-model="chargeQuery.searchContent"-->
                                                                       <!--@keyup.enter="search(chargeQuery.searchContent)">-->
                                                                <!--<span class="input-group-btn" style="float: left;max-width: 20%">-->
                                                                    <!--<button class="btn btn-primary" type="button" @click="getList()" >-->
                                                                        <!--<span class="glyphicon glyphicon-search" ></span>-->
                                                                    <!--</button>-->
                                                                <!--</span>-->
                                                            <!--</div>-->
                                                        <!--</div>-->
                                                    </el-row>

                                                    <el-table
                                                            ref="multipleTable"
                                                            :data="chargeList"
                                                            :header-cell-style="headerCellStyle"
                                                            border
                                                            tooltip-effect="dark"
                                                            style="width: 100%">
                                                        <el-table-column
                                                                prop="createDay"
                                                                label="操作时间"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                prop="chargeWay"
                                                                label="交易方式"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                prop="chargeNum"
                                                                label="充值笔数"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="chargeMoney"
                                                                label="充值金额"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="refundNum"
                                                                label="退费笔数"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="refundMoney"
                                                                label="退费金额"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                prop="total"
                                                                label="合计金额"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                align="center"
                                                                label="操作"
                                                                width="150"
                                                                show-overflow-tooltip>
                                                            <template slot-scope="scope">
                                                                <a @click="onCheck(scope.row, 'charge')">查看明细</a>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>

                                                    <div class="row" style="margin-top:8px;" >
                                                        <div class="block" style="margin-right: 2%;float: right" >
                                                            <el-pagination
                                                                    @size-change="handleSizeChange3"
                                                                    @current-change="handleCurrentChange3"
                                                                    :current-page="chargeQuery.currentPage"
                                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                                    :page-size="chargeQuery.pageSize"
                                                                    layout="total, sizes, prev, pager, next, jumper"
                                                                    :total="chargeQuery.total">
                                                            </el-pagination>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <check @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="checkVisible"/>
        <adminCheck @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="adminVisible"/>
        <consumeCheck @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="consumeVisible"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import {getTotalChargeReport, getChargewayReport, getAdminChargeReport, historyTotal, totalReportDownload, adminReportDownload, chargewayReportDownload} from "../../../../../api/SSL_VPN/accountManager/income";
    import MultipleCondition from 'components/mutipleCondition/MutipleCondition.vue';
    import check from './check.vue'
    import adminCheck from './adminCheck.vue'
    import consumeCheck from './consumeCheck.vue'
    import {formatDateTime} from "../../../../../utils/dateUtil";
    import SearchBox from '@/views/components/searchBox.vue';
    export default{
        components: {
            MultipleCondition,
            check,
            adminCheck,
            consumeCheck,
            SearchBox
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:84,
                activeName:'first',
                totalList:[],
                adminList:[],
                chargeList:[],
                historyList:[],
                totalQuery: {
                    currentPage:1,
                    pageSize:10,
                    total:10,
                    startDay:'',
                    endDay:'',
                    searchContent:''
                },
                adminQuery:{
                    currentPage:1,
                    pageSize:10,
                    total:10,
                    startDay:'',
                    endDay:'',
                    searchContent:''
                },
                chargeQuery:{
                    currentPage:1,
                    pageSize:10,
                    total:10,
                    startDay:'',
                    endDay:'',
                    searchContent:''
                },
                checkVisible:false,
                adminVisible:false,
                consumeVisible:false,
                currentData: '',
                date1:'',
                date2:'',
                date3:'',
                chargeNum:'',
                chargeMoney:'',
                refundNum:'',
                refundMoney:'',
                total:''
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            search(event, keyword, index){
                if(index && index == '1-1'){
                    this.adminQuery.searchContent = keyword != undefined ? keyword : this.adminQuery.searchContent;
                } else if (index && index == '1-2') {
                    this.chargeQuery.searchContent = keyword != undefined ? keyword : this.chargeQuery.searchContent;
                }
                if(event.keyCode==13){
                    if(this.adminQuery.searchContent != null){
                        this.getList();
                    }
                }
            },
            totalDownload(type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'query'){
                        totalReportDownload({
                            startDay: this.totalQuery.startDay,
                            endDay: this.totalQuery.endDay,
                            searchContent: this.totalQuery.searchContent
                        }).then(resp => {
                            let str = '../api/admin/charging/report/normal/download?startDay=' + this.totalQuery.startDay + '&endDay=' + this.totalQuery.endDay + '&searchContent=' + this.totalQuery.searchContent;
                            location.href = str;
                        }).catch((e) => {
                            console.log(e)
                        });
                    } else if(type == 'all'){
                        totalReportDownload({startDay: '', endDay: ''}).then(resp => {
                            location.href = '../api/admin/charging/report/normal/download?startDay=&endDay=';
                        }).catch((e) => {
                            console.log(e)
                        });
                    }
                }
            },

            adminDownload(type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'query'){
                        adminReportDownload({
                            startDay: this.adminQuery.startDay,
                            endDay: this.adminQuery.endDay,
                            searchContent: this.adminQuery.searchContent
                        }).then(resp => {
                            let str = '../api/admin/charging/report/admin/download?startDay=' + this.adminQuery.startDay + '&endDay=' + this.adminQuery.endDay + '&searchContent=' + this.adminQuery.searchContent;
                            location.href = str;
                        }).catch((e) => {
                            console.log(e)
                        });
                    } else if(type == 'all'){
                        adminReportDownload({startDay: '', endDay: ''}).then(resp => {
                            location.href = '../api/admin/charging/report/admin/download?startDay=&endDay=';
                        }).catch((e) => {
                            console.log(e)
                        });
                    }
                }
            },

            chargewayDownload(type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'query'){
                        chargewayReportDownload({
                            startDay: this.chargeQuery.startDay,
                            endDay: this.chargeQuery.endDay,
                            searchContent: this.chargeQuery.searchContent
                        }).then(resp => {
                            let str = '../api/admin/charging/report/chargeWay/download?startDay=' + this.chargeQuery.startDay + '&endDay=' + this.chargeQuery.endDay + '&searchContent=' + this.chargeQuery.searchContent;
                            location.href = str;
                        }).catch((e) => {
                            console.log(e)
                        });
                    } else if(type == 'all'){
                        chargewayReportDownload({startDay: '', endDay: ''}).then(resp => {
                            location.href = '../api/admin/charging/report/chargeWay/download?startDay=&endDay=';
                        }).catch((e) => {
                            console.log(e)
                        });
                    }
                }
            },

            getList(keyword, index){
                if(index && index == '1-1'){
                    this.adminQuery.searchContent = keyword != undefined ? keyword : this.adminQuery.searchContent;
                } else if (index && index == '1-2') {
                    this.chargeQuery.searchContent = keyword != undefined ? keyword : this.chargeQuery.searchContent;
                }
                getTotalChargeReport(this.totalQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.totalList = response.data;
                        this.totalQuery.total = response.extend.page.totalHits;
                    }
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
                this.getChargeWayList();
                getAdminChargeReport(this.adminQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.adminList = response.data;
                        this.adminQuery.total = response.extend.page.totalHits;
                    }
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
                historyTotal({startDay:this.totalQuery.startDay, endDay:this.totalQuery.endDay}).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.historyList.push(response.data);
                        this.chargeNum = '充值笔数:  ' + this.historyList[0].chargeNum + '笔';
                        this.refundNum = '退费笔数:  ' + this.historyList[0].refundNum + '笔';
                        this.chargeMoney = '充值金额:  ' + this.historyList[0].chargeMoney + '元';
                        this.refundMoney = '退费金额:  ' + this.historyList[0].refundMoney + '元';
                        this.total = '合计金额:  ' + this.historyList[0].total + '元';
                    }
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            },

            getChargeWayList(){
                console.log(" 查询条件：",this.chargeQuery)
                getChargewayReport(this.chargeQuery).then(response => {
                if (response.status == 'SUCCESS'){
                    for(let i = 0; i < response.data.length; i++){
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
                    this.chargeList = response.data;
                    this.chargeQuery.total = response.extend.page.totalHits;
                }
            }).catch((e) => {
                console.log("获取组数据发生错误：",e)
            });

            },
            changeTime(e, type){
                if(e != '' && e != null){
                    let dateRange=e;
                    let d1=formatDateTime(dateRange[0]);
                    let d2=formatDateTime(dateRange[1]);
                    if(type == 'total'){
                        this.totalQuery.startDay = d1;
                        this.totalQuery.endDay = d2;
                    } else if(type == 'admin'){
                        this.adminQuery.startDay = d1;
                        this.adminQuery.endDay = d2;
                    } else {
                        this.chargeQuery.startDay = d1;
                        this.chargeQuery.endDay = d2;
                    }
                } else {
                    if(type == 'total'){
                        this.totalQuery.startDay = '';
                        this.totalQuery.endDay = '';
                    } else if(type == 'admin'){
                        this.adminQuery.startDay = '';
                        this.adminQuery.endDay = '';
                    } else {
                        this.chargeQuery.startDay = '';
                        this.chargeQuery.endDay = '';
                    }
                }
                if(type == 'total' || type == 'admin'){
                    this.getList();
                } else if(type == 'charge'){
                    this.getChargeWayList();
                }
            },

            onChangeStatus(){
                this.checkVisible = false;
                this.adminVisible = false;
                this.consumeVisible = false;
                this.getList();
            },
            onCheck(row, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    if(type == 'total'){
                        this.checkVisible = true;
                    } else if(type == 'admin'){
                        this.adminVisible = true;
                    } else {
                        this.consumeVisible = true;
                    }
                }
            },

            handleSizeChange1(val) {
                this.totalQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange1(val) {
                this.totalQuery.currentPage = val;
                this.getList();
            },
            handleSizeChange2(val) {
                this.adminQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange2(val) {
                this.adminQuery.currentPage = val;
                this.getList();
            },
            handleSizeChange3(val) {
                this.chargeQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange3(val) {
                this.chargeQuery.currentPage = val;
                this.getList();
            }
        }
    }
</script>

<style>
    
</style>


