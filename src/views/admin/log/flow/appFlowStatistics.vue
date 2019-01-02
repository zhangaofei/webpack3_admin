<template>
    <div>
        <div class="tab-inner-div">
            <div class="row" style="margin-bottom:8px;">
                <div class="logForm">
                    <div class="row" style="width:100%">
                        <!-- 添加筛选条件组价-->
                        <div style="margin-left: -5px">
                            <multipleConditionChoose conditionType="appFlowStatisticLog"></multipleConditionChoose>
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
                            align="center"
                            type="selection"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            align="left"
                            prop="resourceName"
                            width="200"
                            label="资源名"
                            show-overflow-tooltip>
                        <!--<template scope="scope">{{ scope.row.resourceName }}</template>-->
                    </el-table-column>
                    <el-table-column
                            align="left"
                            prop="uri"
                            label="URL/IP"
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
                            align="center"
                            width="200"
                            prop="firstVisitDate"
                            label="首次访问时间"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="200"
                            prop="lastVisitDate"
                            label="最后一次访问时间"
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
                    <div class="block" style="margin-right: 2%;float: right">
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

        </div>


        <!----以下是详情部分----->
        <div class="log-detail public">
            <div class="user-flow-detail-dialog">
                <el-dialog title="应用资源流量统计明细"
                           top="8%"
                           custom-class="dialog public"
                           style="min-width: 993px"
                           :visible.sync="detailVisible">
                    <div>
                        <div class="detail-head-info">
                            <span class="tag" style="margin-left: 0px">
                                资源名：{{row.resourceName}}
                            </span>

                            <span class="tag">
                                URL/IP：{{row.uri}}
                            </span>

                        </div>
                        <div class="detail-table">
                            <el-table :data="detailData">
                                <el-table-column property="userName" label="用户名"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column property="userGroup" label="用户组"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column property="uplinkTraffic" label="上行流量(MB)"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column property="downlinkTraffic" label="下行流量(MB)"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column property="logTimeStamp" label="首次访问时间"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column property="logTimeStamp" label="最后一次访问时间"
                                                 show-overflow-tooltip></el-table-column>
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

                    <div class='form-footer ' slot="footer" style="height:50px;">
                        <div style="margin-top: 20px;margin-right: 5%">
                            <!--<el-button-->
                            <!--type="primary"-->
                            <!--@click="detailVisible=false;">-->
                            <!--关闭-->
                            <!--</el-button>-->
                        </div>
                    </div>
                </el-dialog>
            </div>

        </div>


    </div>
</template>


<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import multipleConditionChoose from 'components/mutipleCondition/MutipleConditionChoose.vue';
    import {trafficDetails, trafficGroupStatics, logList} from "../../../../api/log/logApi";
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
                pageId: 44,
                tableData: [],
                multipleSelection: [],
                detailVisible: false,
                detailData: [],
                optionValue: 1,
                value6: '',
                checked: false,
                checkedId: [],
                condition: {
                    "preciseConditions": {},
                    "ambiguousConditions": {},
                    "rangeConditionList": [],
                    "sortConditions": {},
                    "currentPage": 1,
                    "pageSize": 10
                },
                list: [],
                total: 0,
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                    searchContent: null
                },
                detailQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
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
                            "lteValue": "2050-07-25",
                            "timeZone": "+08:00"
                        }
                    ],
                    sortConditions: {},
                    currentPage: 1,
                    pageSize: 10
                },
                row: {},
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
                            totalDownloadTraffic: this.formatFlow(item.totalDownloadTraffic),
                            totalTraffic: this.formatFlow(item.totalTraffic),
                            totalUploadTraffic: this.formatFlow(item.totalUploadTraffic),
                            resourceName: item.name,
                            uri: item.name2 == 'null' ? '' : item.name2
                        }
                    });
                }).catch(err => {

                })
            },

            search(condition) {
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
                if (this.isIp) {
                    this.detailCondition.ambiguousConditions.ipAddress = this.condition.ambiguousConditions.ipAddress;
                } else {
                    this.detailCondition.ambiguousConditions = {}
                }
                this.detailCondition.currentPage = this.detailQuery.currentPage;
                this.detailCondition.pageSize = this.detailQuery.pageSize;
                // trafficDetails("resource", this.detailCondition).then(resp => {
                //     this.detailData = resp.data.pageDatas.map(item => {
                //         return {
                //             firstVisitDate: item.firstVisitDate,
                //             lastVisitDate: item.lastVisitDate,
                //             totalDownloadTraffic: this.formatFlow(item.totalDownloadTraffic),
                //             totalTraffic: this.formatFlow(item.totalTraffic),
                //             totalUploadTraffic: this.formatFlow(item.totalUploadTraffic),
                //             userGroup: item.userGroup,
                //             userName: item.userName
                //         }
                //     });
                //     this.detailQuery.total = resp.data.totalHits
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
                    uri.push(row.uri);
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
</style>
