<template>
    <div>
        <el-alert v-if="isError" title="" type="error" show-icon>
            {{ errorMessages }}
        </el-alert>
        <div class="row" style="margin: 30px;">
            <el-date-picker v-model="searchCondition.logDate" type="date" placeholder="选择日期"></el-date-picker>
            <el-tag>
                日志级别：
                <el-select v-model="searchCondition.extConditons.logLevel" size="mini" clearable
                           popper-class="log-select" placeholder="请选择日志级别">
                    <el-option v-for="ll in logLevelMap" :value="ll.id" :key="ll.id" :label="ll.name"></el-option>
                </el-select>
            </el-tag>
            <el-button size="small" style="width: 80px;height:32px; padding: 0;" type="primary" @click="logsDataGet()">
                查询
            </el-button>
        </div>
        <div class="row" style="margin: 30px;">
            <el-table :data="pagers.data" style="width: 100%" border height="550">
                <el-table-column prop="logLevel" label="日志级别" width="80"></el-table-column>
                <el-table-column prop="dateTime" label="时间" width="160"></el-table-column>
                <el-table-column prop="cpu" label="cpu" width="50"></el-table-column>
                <el-table-column prop="memory" label="内存" width="85"></el-table-column>
                <el-table-column prop="disk" label="硬盘" width="60"></el-table-column>
                <el-table-column prop="temperature" label="温度" width="85"></el-table-column>
                <el-table-column prop="fan" label="风扇" width="160"></el-table-column>
                <el-table-column prop="overloadWarning" label="过载警告" width="160"></el-table-column>
                <el-table-column prop="systemMsg" label="系统信息" width="200"></el-table-column>
                <el-table-column prop="operateType" label="操作类型" width="200"></el-table-column>
                <el-table-column prop="serverStatus" label="服务器状态" width="150"></el-table-column>
                <el-table-column prop="processStatus" label="进程状态"></el-table-column>
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
                logLevelMap: [
                    {id: "Info", name: "INFO"},
                    {id: "Error", name: "ERROR"},
                    {id: "WARNING", name: "WARNING"}
                ],
                searchCondition: {
                    logDate: new Date(),
                    extConditons: {
                        logLevel: ""
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
                        url: '/eslocal/api/system/get',
                        method: 'post',
                        body: sCondition
                    }).then(resp => {
                        this.pagers = resp.data;
                    }).catch(err => {
                        console.log(err);
                    });
                }
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