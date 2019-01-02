<template>
    <div class="tab-inner-div">
        <div class="row" style="margin-bottom:8px;">
            <div class="logForm">
                <div class="row" style="width:100%">
                    <!-- 添加筛选条件组价-->
                    <div style="margin-left: -5px">
                        <multipleConditionChoose conditionType="userLog"></multipleConditionChoose>
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
                        width="80">
                </el-table-column>
                <el-table-column
                        width="150"
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
                        width="150"
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
        <!----以下是详情部分----->
        <div class="log-detail">
            <div class="login-detail-dialog">
                <el-dialog title="用户登录统计明细" top="8%" :visible.sync="detailVisible" width="60%">
                    <div>
                        <div class="detail-head-info">
                            <span class="tag" style="margin-left: 0px">
                                用户组：{{row.userGroup}}
                            </span>

                            <span class="tag">
                                用户名：{{row.userName}}
                            </span>
                        </div>
                        <div class="detail-table">
                            <el-table :data="detailData">
                                <el-table-column property="logTimeStamp" label="登录时间"></el-table-column>
                                <!--<el-table-column property="logoutTime" label="登出时间" ></el-table-column>-->
                                <el-table-column property="ipAddress" label="登录ip"></el-table-column>
                                <el-table-column property="macAddress" label="登录硬件特征码"></el-table-column>
                                <el-table-column property="deviceType" label="终端类型"></el-table-column>
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
                    <div class='form-footer' slot="footer">
                        <div class='footer-btn' style="float: right;margin-right: 0px">
                            <el-button
                                    type="primary"
                                    style=""
                                    @click="detailVisible=false;">
                                关闭
                            </el-button>
                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import multipleConditionChoose from '../../../../components/mutipleCondition/MutipleConditionChoose.vue';
    import {userLoginDetails, userLoginGroupStatics} from "../../../../api/log/logApi";
    import {getLevelName} from "../../../../utils/levelUtil";
    import {formatDateTime} from "../../../../utils/dateUtil";

    export default {
        components: {
            multipleConditionChoose,
        },
        data() {
            return {
                headerCellStyle: {
                    backgroundColor: '#eef1f6'
                },
                readOnly: false,
                pageId: 42,
                topValue: 10,
                tableData: [],
                multipleSelection: [],
                condition: {
                    preciseConditions: {},
                    ambiguousConditions: {},
                    rangeConditionList: [],
                    sortConditions: {},
                    currentPage: 1,
                    pageSize: 10
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
                detailVisible: false,
                detailData: [],
                optionValue: 1,
                checked: false,
                checkedId: [],
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                },
                detailQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
                row: {},
                isIp: false
            }
        },
        computed: {},
        created() {
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        watch: {},
        methods: {
            transformLevel(level) {
                return getLevelName(level);
            },
            transformDate(date) {
                return formatDateTime(date);
            },
            getList() {
                this.condition.currentPage = this.listQuery.currentPage;
                this.condition.pageSize = this.listQuery.pageSize;
                userLoginGroupStatics(this.condition).then(resp => {
                    this.listQuery.total = resp.data.totalHits;
                    this.tableData = resp.data.pageDatas;
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
                userLoginDetails(this.detailCondition).then(resp => {
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
                    let group = [];
                    name.push(row.userName);
                    group.push(row.userGroup);
                    let preciseConditions = {};
                    preciseConditions['userName.keyword'] = name;
                    preciseConditions['userGroup.keyword'] = group;
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
                this.listQuery.pageSize = val;
                if ((this.listQuery.total / this.listQuery.pageSize) < this.listQuery.currentPage) {
                    this.listQuery.currentPage = 1;
                }
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },
            handleDetailSizeChange(val) {
                this.detailQuery.pageSize = val;
                if ((this.detailQuery.total / this.detailQuery.pageSize) < this.detailQuery.currentPage) {
                    this.detailQuery.currentPage = 1;
                }
                this.getDetailList();
            },
            handleDetailCurrentChange(val) {
                this.detailQuery.currentPage = val;
                this.getDetailList();
            }
        }
    }
</script>
<style>
    .login-detail-dialog .el-dialog--small {
        width: 900px !important;
    }

    .login-detail-dialog .el-dialog {
        min-width: 720px !important;
    }

    .login-detail-dialog .el-dialog__title {
        margin-left: 3px;
    }
</style>