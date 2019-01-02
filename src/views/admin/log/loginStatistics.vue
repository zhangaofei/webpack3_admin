<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i> 日志中心</a></li>
                <li><a>日志管理</a></li>
                <li class="active">登录统计</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=";padding-left: 16px">
                        <div class="box-header" style="height:82px">
                            <h3 class="box-title" id="user_set_box_title"
                                style="margin-left:5px;float:left;font-size:18px;color: #4A4D4F;">
                                登录统计
                            </h3>
                        </div>
                        <div class="log-tab">
                            <el-tabs type="border-card">
                                <el-tab-pane label="用户登录排行">
                                    <div>
                                        <div class="row" style="margin-bottom:8px;">
                                            <div class="logForm">
                                                <div style="float:left;margin-left: 20px">
                                                    <div class="block0">
                                                        <label>
                                                            <el-date-picker v-model="value6" type="daterange"
                                                                            size="small"
                                                                            style="margin-left: 0px;height: 35px;"
                                                                            placeholder="选择日期范围">
                                                            </el-date-picker>
                                                            <span style="margin-left: 30px">
                                                                <el-button size="small"
                                                                           style="width: 80px;height:35px;background-color: #3C8DBC">查询</el-button>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="width: 100%;min-height: 500px;">
                                            <div class="log-chart" style="height: 520px; width:48%;">
                                                <div>
                                                    <span style="" class="rank-top">
                                                        用户登录排行榜
                                                    </span>
                                                    <span class="rank-top" style="margin-left: 5px;padding: 0px">
                                                          <el-select v-model="topValue" placeholder="请选择">
                                                              <el-option key="1" label="10" value="10"></el-option>
                                                              <el-option key="2" label="20" value="20"></el-option>
                                                          </el-select>
                                                    </span>
                                                </div>
                                                <div style="height: 500px;">
                                                    <barChart :data="barData" :keyName="barName"></barChart>
                                                </div>
                                            </div>
                                            <div class="log-chart log-pie-chart" style="height: 520px; width: 48%">
                                                <pieChart :data="data" :legend="legend"></pieChart>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="用户登录统计">
                                    <div>
                                        <div class="row" style="margin-bottom:8px;">
                                            <div class="logForm">
                                                <div class="row" style="width:100%">
                                                    <!-- 添加筛选条件组价-->
                                                    <div style="margin-left: -5px">
                                                        <multipleConditionChoose conditionType="loginLog">
                                                        </multipleConditionChoose>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="row">
                                            <el-table
                                                    ref="multipleTable"
                                                    :data="tableData"
                                                    :header-cell-style="headerCellStyle"
                                                    border
                                                    tooltip-effect="dark"
                                                    style="width: 100%"
                                                    @selection-change="handleSelectionChange">
                                                <el-table-column
                                                        type="selection"
                                                        align="center"
                                                        width="80">
                                                </el-table-column>
                                                <el-table-column
                                                        align="center"
                                                        label="用户名"
                                                        show-overflow-tooltip>
                                                    <template slot-scope="scope">{{ scope.row.userName }}</template>
                                                </el-table-column>
                                                <el-table-column
                                                        align="center"
                                                        prop="userGroup"
                                                        label="用户组"
                                                        show-overflow-tooltip>
                                                </el-table-column>

                                                <el-table-column
                                                        align="center"
                                                        prop="loginCount"
                                                        label="登录次数"
                                                        show-overflow-tooltip>
                                                </el-table-column>
                                                <el-table-column
                                                        align="center"
                                                        prop="firstLoginDate"
                                                        label="第一次登录时间"
                                                        show-overflow-tooltip>
                                                </el-table-column>
                                                <el-table-column
                                                        align="center"
                                                        prop="lastLoginDate"
                                                        label="最后一次登录时间"
                                                        show-overflow-tooltip>
                                                </el-table-column>

                                                <el-table-column
                                                        align="center"
                                                        label="操作"
                                                        width="80"
                                                        show-overflow-tooltip>
                                                    <template slot-scope="scope">
                                                        <a href="javascript:void(0)"
                                                           style="color: #5096C1" @click="showDetail(scope.row)">
                                                            详细
                                                        </a>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                            <div class="row" style="margin-top:8px;">
                                                <div class="block" style="margin-right: 2%;float: right">
                                                    <el-pagination
                                                            @size-change="handleSizeChange"
                                                            @current-change="handleCurrentChange"
                                                            :current-page="logQuery.currentPage"
                                                            :page-sizes="[10, 20, 30,40,50]"
                                                            :page-size="logQuery.pageSize"
                                                            layout="total, sizes, prev, pager, next, jumper"
                                                            :total="logQuery.total">
                                                    </el-pagination>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
                <!----以下是详情部分----->
                <div class="log-detail">
                    <div class="login-detail-dialog">
                        <el-dialog title="用户登录统计明细" v-model="detailVisible">
                            <div>
                                <el-table :data="detailData">
                                    <el-table-column property="loginTime" label="登录时间"></el-table-column>
                                    <el-table-column property="logoutTime" label="登出时间"></el-table-column>
                                    <el-table-column property="ip" label="登录ip"></el-table-column>
                                    <el-table-column property="hardCode" label="登录硬件特征码"></el-table-column>
                                    <el-table-column property="terminal" label="终端类型"></el-table-column>
                                </el-table>
                            </div>
                            <div class='form-footer' slot="footer">
                                <div class='footer-btn' style="float: right;margin-right: 120px">
                                    <el-button type="primary" style="" @click="submitAddForm('groupForm')">确定
                                    </el-button>
                                </div>
                            </div>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import pieChart from 'components/Charts/pieChart';
    import barChart from 'components/Charts/barChart';
    import {formatDateTime} from "../../../utils/dateUtil";
    import multipleConditionChoose from 'components/mutipleCondition/MutipleConditionChoose.vue';
    import {userLoginGroupStatics} from "../../../api/log/logApi";
    import {getLevelName} from "../../../utils/levelUtil";

    export default {
        components: {
            multipleConditionChoose,
            pieChart, barChart
        },
        data() {
            return {
                headerCellStyle: {
                    backgroundColor: '#eef1f6'
                },
                topValue: 10,
                barData: [10, 52, 200, 334, 390, 330, 520],
                barName: ['用户A', '用户B', '用户C', '用户D', '用户E', '用户F', '用户G'],
                tableData: [],
                multipleSelection: [],
                condition: {
                    "preciseConditions": {},
                    "ambiguousConditions": {},
                    "rangeConditionList": [],
                    "sortConditions": {},
                    "currentPage": 1,
                    "pageSize": 30
                },
                detailVisible: false,
                detailData: [],
                logQuery: {
                    currentPage: 1,
                    pageSize: 20,
                    total: 0
                },
                optionValue: 1,
                value6: '',
                data: [
                    {value: 335, name: 'IOS'},
                    {value: 310, name: 'Android'},
                    {value: 234, name: 'macOS'},
                    {value: 135, name: 'Win Client'},
                    {value: 135, name: 'Win Web'},
                    {value: 148, name: 'Other'}
                ],
                legend: ['IOS', 'Android', 'macOS', 'Win Client', 'Win Web', 'Other'],
                unit: true,
                logForm: {
                    thirdPartyServer: 1,
                    type: 'date',
                    day: 10,
                    num: 10
                },
                checked: false,
                checkedId: [],
                list: [],
                total: 0,
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 20,
                    total: 0,
                    isAdmin: '',
                    display_name: '',
                    phone: '',
                    name: '',
                    searchContent: null
                },
                groupList: [],
                currentView: '',
                currentUser: ''
            }
        },
        computed: {},
        created() {
            this.getList();
        },
        watch: {//深度 watcher
            'logForm.type': 'typeChange'
        },
        methods: {
            transformLevel(level) {
                return getLevelName(level);
            },
            transformDate(date) {
                return formatDateTime(date);
            },
            getList() {
                userLoginGroupStatics(this.condition).then(resp => {
                    this.listQuery.total = resp.extend.total;
                    this.tableData = resp.data;
                }).catch(err => {

                })
            },
            search(condition) {
                console.log("调用了负组件，给到父组件中的查询条件：", condition);
            },
            search1(condition) {
                console.log("给到父组件中的查询条件：", condition);
                this.condition = condition;
                this.condition.currentPage = this.listQuery.currentPage;
                this.condition.pageSize = this.listQuery.pageSize;
                this.getList();
            },
            showDetail(row) {
                console.log("打开详情的弹窗：   ", this.detailVisible);
                this.detailVisible = true;
                console.log("确认打开详情的弹窗：   ", row);
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.resourceQuery.pageSize = val;
                if ((this.listQuery.total / this.listQuery.pageSize) < this.listQuery.currentPage) {
                    this.listQuery.currentPage = 1;
                }
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.resourceQuery.currentPage = val;
                this.getList();
            }
        }
    }
</script>
<style>
    .user-log .el-select {
        min-width: 200px;
        width: 200px;
    }

    .user-log .el-select > .el-input {
        margin-left: 15px;
    }

    .log-select {
        min-width: 200px;
        width: 200px;
        /*background-color: #3C8DBC;*/
        float: left;
        margin-left: 0;
    }

    .log-chart, pie-chart {
        height: 530px;
        width: 48%;
        float: left;
        border: solid #6CA9CD 0.2px;
    }

    .log-pie-chart {
        margin-left: 30px;
    }

    .title {
        margin: 0 auto;
        width: 200px;
        vertical-align: middle;
        height: 62px;
        font-size: 20px;
        color: #606366;
        line-height: 40px;
        height: 40px;
    }

    .logForm .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 50px;
    }

    .user-log-info .el-input {
        position: relative;
        display: inline-block;
        width: 200px;
        margin-left: 96px;
    }

    .log-config {
        width: 200px;
        margin-left: 60px;
    }

    strong {
        color: red;
    }

    .log-tab .el-tabs__item {
        padding: 10px 16px;
        height: 60px;
        font-size: 20px;
        color: #A5AAAF;
    }

    .log-tab .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        background-color: #fff;
        color: #3C8DBC;
        border-right-color: #d1dbe5;
        border-left-color: #d1dbe5;
    }

</style>