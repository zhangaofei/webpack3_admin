<template>
    <div>
        <div>
            <div class="row" style="margin-bottom:8px;">
                <div class="logForm">


                    <div class="row" style="width:100%">
                        <!-- 添加筛选条件组价-->
                        <div style="margin-left: 15px">
                            <multipleConditionChoose conditionType="resourceStatisticLog"></multipleConditionChoose>
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
                        style="width: 96%;margin-left: 20px;margin-right: 20px"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            align="center"
                            type="selection"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            width="200"
                            align="left"
                            prop="resourceName"
                            label="资源名"
                            show-overflow-tooltip>
                        <!--<template scope="scope">{{ scope.row.resourceName }}</template>-->
                    </el-table-column>
                    <el-table-column
                            align="left"
                            prop="uri"
                            label="URL地址"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            width="150"
                            align="center"
                            prop="totalTraffic"
                            label="访问流量(MB)"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            width="150"
                            align="center"
                            prop="visitCount"
                            label="访问次数"
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                            align="center"
                            width="200"
                            prop="lastVisitDate"
                            label="访问时间"
                            show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                            align="center"
                            label="操作"
                            width="100"
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
                    <div class="block" style="margin-right: 3%;float: right">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="listQuery.currentPage"
                                :page-sizes="[10, 20, 30,40,50]"
                                :page-size="listQuery.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="listQuery.total">
                        </el-pagination>
                    </div>
                </div>

            </div>


            <!----以下是详情部分----->
            <div class="log-detail public">
                <div class="login-detail-dialog">
                    <el-dialog title="用户登录统计明细"
                               top="5%"
                               :visible.sync="detailVisible">
                        <div>
                            <div class="detail-head-info">
                                <el-tooltip class="item" placement="top-start">
                                    <div slot="content">{{row.resourceName}}</div>
                                    <el-button class="tool_tip">资源名：{{row.resourceName}}</el-button>
                                    <!--<span class="" style="margin-left: 0px;border: 1px solid #3C8DBC;">-->
                                    <!--资源名：{{row.resourceName}}-->
                                    <!--</span>-->
                                </el-tooltip>
                                <br>
                                <el-tooltip class="item" placement="top-start">
                                    <div slot="content">{{row.uri}}</div>
                                    <el-button class="tool_tip">URL地址：{{row.uri}}</el-button>
                                </el-tooltip>

                                <!--<span class="tag">-->
                                <!--URL地址：{{row.uri}}-->
                                <!--</span>-->

                            </div>
                            <div class="detail-table">
                                <el-table :data="detailData">
                                    <el-table-column property="userName" label="用户名"></el-table-column>
                                    <el-table-column property="userGroup" label="用户组"></el-table-column>
                                    <el-table-column property="logTimeStamp" label="访问时间"></el-table-column>
                                    <el-table-column property="uplinkTraffic" label="上行流量(B)"></el-table-column>
                                    <el-table-column property="downlinkTraffic" label="下行流量(B)"></el-table-column>
                                    <!--<el-table-column property="deviceType" label="内容"></el-table-column>-->
                                </el-table>
                            </div>
                            <div class="row" style="margin-top:8px;">
                                <div class="block" style="margin-right: 2%;float: right">
                                    <el-pagination
                                            @size-change="handleDetailSizeChange"
                                            @current-change="handleDetailCurrentChange"
                                            :current-page="detailQuery.currentPage"
                                            :page-sizes="[10, 20, 30,40]"
                                            :page-size="detailQuery.pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="detailQuery.total">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>

                        <!--<div class='form-footer' slot="footer">-->
                        <!--<div class='footer-btn' style="float: right;margin-right: 0px">-->
                        <!--<el-button-->
                        <!--type="primary"-->
                        <!--style=""-->
                        <!--@click="detailVisible=false;"-->
                        <!--&gt;-->
                        <!--关闭-->
                        <!--</el-button>-->
                        <!--</div>-->
                        <!--</div>-->
                        <div class='form-footer ' slot="footer">
                            <div class="foot">
                                <span class="cancle btn_middle" @click="detailVisible=false">关闭</span>
                            </div>
                        </div>

                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import multipleConditionChoose from 'components/mutipleCondition/MutipleConditionChoose.vue';
    import {
        logList,
        resourceVisitDetails,
        resourceVisitGroupStatics,
        trafficGroupStatics
    } from "../../../../api/log/logApi";
    import {formatDateTime} from "../../../../utils/dateUtil";
    import {getLevelName} from "../../../../utils/levelUtil";

    export default {
        name: 'userFlowStatistics',
        components: {
            multipleConditionChoose
        },
        data() {
            return {
                headerCellStyle: {
                    backgroundColor: '#eef1f6'
                },
                readOnly: false,
                pageId: 43,
                dateRange: '',
                tableData: [],
                multipleSelection: [],
                detailVisible: false,
                detailData: [],
                logQuery: {
                    currentPage: 1,
                    pageSize: 20,
                    total: 0
                },
                optionValue: 1,
                value6: '',
                condition: {
                    "preciseConditions": {},
                    "ambiguousConditions": {},
                    "rangeConditionList": [],
                    "sortConditions": {},
                    "currentPage": 1,
                    "pageSize": 10
                },
                detailCondition: {
                    preciseConditions: {
                        "userName.keyword": ["XiaoMing"],
                        "userGroup.keyword": ["MingGroup"]
                    },
                    ambiguousConditions: {},
                    rangeConditionList: [
                        {
                            "type": "DATE",
                            "conditionName": "date",
                            "gteValue": "2000-06-01",
                            "lteValue": "2097-07-25",
                            "timeZone": "+08:00"
                        }
                    ],
                    sortConditions: {},
                    currentPage: 1,
                    pageSize: 10
                },
                row: {
                    resourceName: '',
                    uri: ''
                },
                detailQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
                checked: false,
                checkedId: [],
                list: [],
                total: 0,
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                    searchContent: null
                },
                groupList: [],
                isIp: false
            }
        },
        computed: {},
        created() {
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        watch: {//深度 watcher
        },
        methods: {
            formatFlow(val) {
                return (val * 100000000 / 1024 / 1024 / 100000000).toFixed(5);
            },
            transformLevel(level) {
                return getLevelName(level);
            },
            transformDate(date) {
                return formatDateTime(date);
            },
            getList() {
                this.condition.currentPage = this.listQuery.currentPage;
                this.condition.pageSize = this.listQuery.pageSize;
                trafficGroupStatics("resource", this.condition).then(resp => {
                    this.listQuery.total = resp.data.totalHits;
                    this.tableData = resp.data.pageDatas.map(item => {
                        return {
                            firstVisitDate: item.firstVisitDate,
                            lastVisitDate: item.lastVisitDate,
                            visitCount: item.visitCount,
                            totalDownloadTraffic: this.formatFlow(item.totalDownloadTraffic),
                            totalTraffic: this.formatFlow(item.totalTraffic),
                            totalUploadTraffic: this.formatFlow(item.totalUploadTraffic),
                            resourceName: item.name,
                            uri: item.name2 == 'null' ? '/' : item.name2
                        }
                    });
                }).catch(err => {

                })
            },
            search(condition) {
                console.log("给到父组件中的查询条件：", condition);
                this.condition = condition;
                if (this.condition.ambiguousConditions.ipAddress && this.condition.ambiguousConditions.ipAddress != '') {
                    this.isIp = true;
                }
                this.getList();
            },
            ipSearch(blen) {
                this.isIp = blen;
            },
            getDetailList() {
                this.detailCondition.currentPage = this.detailQuery.currentPage;
                this.detailCondition.pageSize = this.detailQuery.pageSize;
                // resourceVisitDetails(this.detailCondition).then(resp => {
                //     this.detailData = resp.data;
                //     this.detailQuery.total = resp.extend.page.totalHits;
                // }).catch(err => {
                //     console.log("获取详情数据出错：", err)
                // })
                logList("resLog", this.detailCondition).then(resp => {
                    this.detailData = resp.data.pageDatas;
                    this.detailQuery.total = resp.data.totalHits;
                }).catch(err => {
                    console.log("获取详情数据出错：", err)
                })
            },
            showDetail(row) {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.detailVisible = true;
                    this.row = row;
                    let name = [];
                    let uri = [];
                    name.push(row.resourceName);
                    uri.push(row.uri == "/" ? "" : row.uri);
                    let preciseConditions = {};
                    preciseConditions['resourceName.keyword'] = name;
                    preciseConditions['uri.keyword'] = uri;
                    this.detailCondition.preciseConditions = preciseConditions;
                    this.detailCondition.rangeConditionList = this.condition.rangeConditionList;
                    this.getDetailList();
                }
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
                this.listQuery.pageSize = val;
                if ((this.listQuery.total / this.listQuery.pageSize) < this.listQuery.currentPage) {
                    this.listQuery.currentPage = 1;
                }
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.listQuery.currentPage = val;
                this.getList();
            },

            handleDetailSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.detailQuery.pageSize = val;
                if ((this.detailQuery.total / this.detailQuery.pageSize) < this.detailQuery.currentPage) {
                    this.detailQuery.currentPage = 1;
                }
                this.getDetailList();
            },
            handleDetailCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.detailQuery.currentPage = val;
                this.getDetailList();
            }
        }
    }
</script>
<style>

    .user-log .el-select {
        min-width: 200px;
        width: 200px;
    }

    .login-detail-dialog .el-dialog--small {
        width: 1000px !important;
    }

    .login-detail-dialog .el-dialog {
        min-width: 720px !important;
    }

    .user-log .el-select > .el-input {
        margin-left: 15px;
    }

    .tool_tip {
        width: 400px;
        margin-left: 0;
        overflow: hidden;
        margin-bottom: 5px;
    }

</style>
