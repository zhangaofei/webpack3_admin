<template>
    <div>
        <el-alert v-if="isError" title="" type="error" show-icon>
            {{ errorMessages }}
        </el-alert>
        <div class="row" style="margin: 20px;">
            <el-date-picker v-model="searchCondition.logDate" v-on:change="initUserGroups"
                            type="date" placeholder="选择日期"></el-date-picker>
            <el-tag>
                日志级别：
                <el-select v-model="searchCondition.extConditons.logLevel" size="mini" clearable
                           popper-class="log-select" placeholder="请选择日志级别">
                    <el-option v-for="ll in logLevelMap" :value="ll.id" :key="ll.id" :label="ll.name"></el-option>
                </el-select>
            </el-tag>
            <el-tag>
                用户名：<input v-model="searchCondition.extConditons.userName" class="tag-input"/>
            </el-tag>
            <el-tag>
                用户组：
                <el-select v-model="searchCondition.extConditons.userGroup" size="mini" clearable
                           popper-class="log-select" placeholder="请选择用户组">
                    <el-option v-for="ug in userGroupMap" :value="ug" :key="ug" :label="ug"></el-option>
                </el-select>
            </el-tag>
            <el-tag>
                操作结果：
                <el-select v-model="searchCondition.extConditons.logInfo" size="mini" clearable
                           popper-class="log-select" placeholder="请选择操作结果">
                    <el-option v-for="info in logInfoMap" :value="info.id" :key="info.id"
                               :label="info.name"></el-option>
                </el-select>
            </el-tag>
            <el-button size="small" style="width: 80px;height:32px; padding: 0;" type="primary" @click="logsDataGet()">
                查询
            </el-button>
        </div>
        <div class="row" style="margin: 20px;">
            <el-table :data="pagers.data" style="width: 100%" height="550" border>
                <el-table-column prop="logLevel" label="日志级别" width="100"></el-table-column>
                <el-table-column prop="timestamp" label="时间" width="200"></el-table-column>
                <el-table-column prop="operation" label="操作类型" width="200"></el-table-column>
                <el-table-column prop="userName" label="用户名" width="100"></el-table-column>
                <el-table-column prop="userGroup" label="用户组" width="100"></el-table-column>
                <el-table-column prop="userAuth" label="用户权限" width="100"></el-table-column>
                <el-table-column prop="ipAddress" label="IP地址" width="150"></el-table-column>
                <el-table-column prop="macAddress" label="Mac地址" width="320"></el-table-column>
                <el-table-column prop="logInfo" label="操作结果"></el-table-column>
            </el-table>
        </div>
        <div class="row" style="margin: 20px; float: right;">
            <el-pagination
                    background
                    @size-change="pageSizecEvent"
                    @current-change="currentPagecEvent"
                    :current-page="pagers.currentPage"
                    :page-size="pagers.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagers.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {fetch} from 'utils/fetch';

    export default {
        data() {
            return {
                userGroupMap: [],
                logLevelMap: [
                    {id: "INFO", name: "INFO"},
                    {id: "ERROR", name: "ERROR"},
                    {id: "WARNING", name: "WARNING"}
                ],
                logInfoMap: [
                    {id: "成功", name: "成功"},
                    {id: "失败", name: "失败"}
                ],
                searchCondition: {
                    logDate: new Date(),
                    extConditons: {
                        userName: "",
                        userGroup: "",
                        logLevel: "",
                        logInfo: ""
                    },
                    currentPage: 1,
                    pageSize: 10
                },
                pagers: {
                    total: 0,
                    pageSize: 10,
                    currentPage: 1,
                    data: []
                },
                isError: false,
                errorMessages: ""
            }
        },
        watch: {
            // 如果 `question` 发生改变，这个函数就会运行
            searchCondition: function (_new, _old) {
                this.initUserGroups();
            }
        },
        methods: {
            // 查询管理员日志数据
            logsDataGet() {
                const sCondition = this.searchCondition;
                if (!sCondition.logDate) {
                    this.isError = true;
                    this.errorMessages = "日期不能为空！";
                } else {
                    this.isError = false;
                }
                // 校验：如果有错误提示，则不进行查询
                if (!this.isError) {
                    fetch({
                        url: '/eslocal/api/admin/get',
                        method: 'post',
                        body: sCondition
                    }).then(resp => {
                        this.pagers = resp.data
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            // 初始化用户组数据
            initUserGroups() {
                const sCondition = this.searchCondition;
                // 去掉过滤条件，下拉列表中的结果默认查询日志文件中所有数据。
                sCondition.extConditons = {};
                fetch({
                    url: '/eslocal/api/admin/userGroup/get',
                    method: 'post',
                    body: sCondition
                }).then(resp => {
                    this.userGroupMap = resp.data;
                }).catch(err => {
                    console.log(err);
                });
            },
            pageSizecEvent(val) {
                this.pagers.pageSize = val;
                if ((this.pagers.total / this.pagers.pageSize) < this.pagers.currentPage) {
                    this.pagers.currentPage = 1;
                }
                this.searchCondition.pageSize = this.pagers.pageSize;
                this.searchCondition.currentPage = this.pagers.currentPage;
                this.logsDataGet();
            },
            currentPagecEvent(val) {
                this.pagers.currentPage = val;
                this.searchCondition.currentPage = this.pagers.currentPage;
                this.logsDataGet();
            }
        },
        created() {
            // 初始化用户组
            this.initUserGroups()
            this.logsDataGet()
        }
    }
</script>

<style>
    .tag-input {
        color: black;
        background-color: #fff;
        border: none;
        zoom: 1;
        outline: medium;
        /*//以上三条样式去边框，使得输入框与父元素看起来融为一体*/
    }

    .el-tag {
        height: 39px;
        line-height: 39px;
        margin-left: 6px;
        color: #3C8DBC;
        background-color: #fff;
        border: 1px solid #3C8DBC;
    }

    .log-select {
        min-width: 200px;
        width: 200px;
        color: black;
        background-color: #fff;
        border: none;
        float: left;
    }
</style>