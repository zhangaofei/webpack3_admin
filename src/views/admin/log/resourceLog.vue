<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i> 日志中心</a></li>
                <li><a >日志管理</a></li>
                <li class="active">资源日志</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12" style="margin-right:0">
                    <div class="box">
                        <div class="box-header" style="">
                            <h3 class="box-title" id="user_set_box_title"
                                style="float:left;font-size:18px;color: #4A4D4F;">
                                资源日志
                            </h3>
                        </div>
                        <div class="lob_main">
                            <el-row class="list_headers">
                                <el-col class="list_headers_title" :span="2">
                                    <h4>时间</h4>
                                </el-col>
                                <el-col class="info_input" :span="4">
                                    <el-date-picker
                                            v-model="query.date"
                                            type="date"
                                            placeholder="选择日期"
                                            :picker-options="datePickerOptions"
                                            style="width: 100%;">
                                    </el-date-picker>
                                </el-col>
                                <el-col :offset="1" :span="2" style="width: 150px;">
                                    <el-time-picker
                                            v-model="query.startTime"
                                            :picker-options="{
                                                start: '00:00',
                                                step: '00:30',
                                                end: '23:59'
                                            }"
                                            style="width: 100%;"
                                            placeholder="选择时间">
                                    </el-time-picker>
                                </el-col>
                                <el-col style="text-align: center; line-height: 40px; width: 30px;">
                                    <span>-</span>
                                </el-col>
                                <el-col :span="2" style="width: 150px;">
                                    <el-time-picker
                                            v-model="query.endTime"
                                            :picker-options="{
                                                start: query.startTime,
                                                step: '00:30',
                                                end: '23:59'
                                            }"
                                            style="width: 100%;"
                                            placeholder="选择时间">
                                    </el-time-picker>
                                </el-col>
                            </el-row>
                            <el-row class="list_headers">
                                <el-col class="list_headers_title" :span="2">
                                    <h4>用户信息</h4>
                                </el-col>
                                <el-col class="info_input" :span="5">
                                    <el-input clearable v-model="query.userInfo" placeholder="用户信息"></el-input>
                                </el-col>
                                <el-col class="list_headers_title" :span="2">
                                    <h4>通道方式</h4>
                                </el-col>
                                <el-col class="info_input" :span="5">
                                    <el-select clearable v-model="query.appType" placeholder="通道方式" style="width: 100%;">
                                        <el-option v-for="(item,index) in appType" :key="index" :value="item" :label="item"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row class="list_headers">
                                <!--<el-col class="list_headers_title" :span="2">-->
                                    <!--<h4>操作</h4>-->
                                <!--</el-col>-->
                                <!--<el-col class="info_input" :span="5">-->
                                    <!--<el-input clearable v-model="query.operationMethod" placeholder="输入操作"></el-input>-->
                                <!--</el-col>-->
                                <el-col class="list_headers_title" :span="2">
                                    <h4>源IP</h4>
                                </el-col>
                                <el-col class="info_input" :span="5">
                                    <el-input clearable v-model="query.remoteIp" placeholder="输入源iP"></el-input>
                                </el-col>
                                <el-col class="list_headers_title" :span="2">
                                    <h4>信息</h4>
                                </el-col>
                                <el-col class="info_input" :span="5">
                                    <el-input clearable v-model="query.logInfo" placeholder="输入信息"></el-input>
                                </el-col>
                            </el-row>
                            <el-row class="list_headers">
                                <el-col class="list_headers_title" :span="2">
                                    <span>&nbsp;</span>
                                </el-col>
                                <el-col class="info_input" :span="20">
                                    <el-button class="primary confirm" type="primary" @click="getResourceLogList">查询</el-button>
                                    <el-button class="primary confirm" @click="generateLog" type="primary" style="margin-left: 30px;">生成文件</el-button>
                                </el-col>
                            </el-row>
                            <template>
                                <!--<el-table-->
                                        <!--:data="tableData"-->
                                        <!--border-->
                                        <!--:row-style="rowStyle"-->
                                        <!--style="width: 100%"-->
                                        <!--header-row-class-name="header_row_class">-->
                                <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%"
                                        header-row-class-name="header_row_class">
                                    <el-table-column
                                            prop="log_time"
                                            fixed="left"
                                            show-overflow-tooltip
                                            header-align="center"
                                            align="center"
                                            label="日期"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="search_user_info"
                                            label="用户信息"
                                            show-overflow-tooltip
                                            header-align="center"
                                            align="center"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="app_type"
                                            show-overflow-tooltip
                                            header-align="center"
                                            align="center"
                                            label="通道方式"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="remote_ip"
                                            show-overflow-tooltip
                                            header-align="center"
                                            align="center"
                                            label="源IP"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="upward_flow"
                                            show-overflow-tooltip
                                            header-align="center"
                                            align="center"
                                            label="上行流量"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="downward_flow"
                                            show-overflow-tooltip
                                            header-align="center"
                                            align="center"
                                            label="下行流量"
                                            width="180">
                                    </el-table-column>
                                    <!--<el-table-column-->
                                    <!--prop="operation_method"-->
                                    <!--show-overflow-tooltip-->
                                    <!--header-align="center"-->
                                    <!--align="center"-->
                                    <!--label="操作"-->
                                    <!--width="180">-->
                                    <!--</el-table-column>-->
                                    <el-table-column
                                            prop="search_messages"
                                            show-overflow-tooltip
                                            header-align="center"
                                            min-width="280"
                                            label="信息">
                                    </el-table-column>
                                </el-table>
                            </template>
                            <div class="paging_main">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="query.current_page"
                                        :page-sizes="[10, 20, 30, 50]"
                                        :page-size="query.page_size"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="query.total">
                                </el-pagination>
                            </div>
                            <GenerateLog :visibleDialog="visibleDialog" :dataJson="dataJson" :type="logType"></GenerateLog>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import {fetch} from 'utils/fetch';
    import GenerateLog from './generateLog.vue'
    import moment from 'moment'

    export default {
        components: {
            GenerateLog
        },
        data() {
            let date = moment().format("YYYY-MM-DD");
            let year = moment().format("YYYY");
            let mouth = moment().format("MM");
            let day = moment().format("DD");
            let startTime = new Date(year, parseInt(mouth)-1, day, "00", "00", "00");
            let endTime = new Date(year, parseInt(mouth)-1, day, "23", "59", "59");
            return {
                timeValue: '',
                userInfo: '',
                tableData: [],
                appType: [],
                logType: 'user',
                dataJson: {
                    "pageIndex": 1,
                    "pageSize": 10,
                    "date" : date,
                    "startTime": startTime,
                    "endTime": endTime,
                    "userInfo": "",
                    "authCenter": "",
                    "remoteIp": "",
                    "operationMethod": "",
                    "logInfo": "",
                    "rightName": "",
                    "logLevel": "",
                    "appType": "",
                    "fileName" : ""
                },
                query: {
                    current_page: 1,
                    page_size: 10,
                    date : date,
                    startTime: startTime,
                    endTime: endTime,
                    userInfo: "",
                    authCenter: "",
                    remoteIp: "",
                    operationMethod: "",
                    logInfo: "",
                    rightName: "",
                    logLevel: "",
                    appType: "",
                    total: 0
                },
                visibleDialog: false,
                datePickerOptions: {
                    disabledDate (time) {
                        let limitTime = (new Date()) - 24*60*60*1000;
                        return time.getTime() > new Date();
                    }
                }
            }
        },
        computed: {},
        created() {
            this.getResourceLogList();
            this.getAppTypeList();
        },
        watch: {//深度 watcher

        },
        methods: {
            getAppTypeList () {
                // 获取通道下拉列表
                let startTime = moment(this.query.startTime).format("HH:mm:ss");
                let endTime = moment(this.query.endTime).format("HH:mm:ss");
                let date = moment(this.query.date).format("YYYY-MM-DD");
                fetch({
                    url: '/es-management/api/search/res/options/app_type',
                    method: 'post',
                    body: {
                        "pageIndex": this.query.current_page,
                        "pageSize": this.query.page_size,
                        "date" : date,
                        "startTime": startTime,
                        "endTime": endTime,
                        "userInfo": this.query.userInfo,
                        "authCenter": this.query.authCenter,
                        "remoteIp": this.query.remoteIp,
                        "operationMethod": this.query.operationMethod,
                        "logInfo": this.query.logInfo,
                        "rightName": this.query.rightName,
                        "logLevel": this.query.logLevel,
                        "appType": this.query.appType
                    }
                }).then(res => {
                    if(res.code == 200) {
                        this.appType = res.data;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch(error => this.$message.error(error));
            },
            getResourceLogList (ev, flag) {
                if (!this.query.date) return this.$message.error('日期不能为空!');
                if (!this.query.startTime) return this.$message.error('起始时间不能为空!');
                if (!this.query.endTime) return this.$message.error('结束时间不能为空!');
                let startTime = moment(this.query.startTime).format("HH:mm:ss");
                let endTime = moment(this.query.endTime).format("HH:mm:ss");
                let date = moment(this.query.date).format("YYYY-MM-DD");
                this.getAppTypeList();
                fetch({
                    url: '/es-management/api/search/res/list',
                    method: 'post',
                    body: {
                        "pageIndex": this.query.current_page,
                        "pageSize": this.query.page_size,
                        "date" : date,
                        "startTime": startTime,
                        "endTime": endTime,
                        "userInfo": this.query.userInfo,
                        "authCenter": this.query.authCenter,
                        "remoteIp": this.query.remoteIp,
                        "operationMethod": this.query.operationMethod,
                        "logInfo": this.query.logInfo,
                        "rightName": this.query.rightName,
                        "logLevel": this.query.logLevel,
                        "appType": this.query.appType
                    }
                }).then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data.data.map(item => {
                            let upward_flow = (parseFloat(item.upward_flow)/1024/1024).toFixed(4);
                            let downward_flow = (item.downward_flow/1024/1024).toFixed(4);
                            let operation_method = '--';
                            this.$set(item, 'operation_method', operation_method);
                            this.$set(item, 'upward_flow', upward_flow +" M");
                            this.$set(item, 'downward_flow', downward_flow +" M");
                            return item;
                        });
                        this.query.total = res.data.total;

                        // 生成文件
                        if (flag) {
                            if(this.tableData.length == 0) return this.$message.error('没有日志数据,无法生成日志文件');
                            let startTime = moment(this.query.startTime).format("HH:mm:ss");
                            let endTime = moment(this.query.endTime).format("HH:mm:ss");
                            let date = moment(this.query.date).format("YYYY-MM-DD");
                            this.visibleDialog = true;
                            this.logType = 'resource';
                            this.dataJson = {
                                "pageIndex": this.query.current_page,
                                "pageSize": this.query.page_size,
                                "date" : date,
                                "startTime": startTime,
                                "endTime": endTime,
                                "userInfo": this.query.userInfo,
                                "authCenter": this.query.authCenter,
                                "remoteIp": this.query.remoteIp,
                                "operationMethod": this.query.operationMethod,
                                "logInfo": this.query.logInfo,
                                "rightName": this.query.rightName,
                                "logLevel": this.query.logLevel,
                                "appType": this.query.appType,
                                "fileName": ""
                            };
                        }
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(error => this.$message.error(error));
            },
            rowStyle (row, index) {
                if(row.row.log_level == 'INFO') {
                    return {color: '#909399'}
                } else if (row.row.log_level == 'WARNING') {
                    return {color: '#E6A23C'}
                } else if (row.row.log_level == 'ERROR') {
                    return {color: '#f04550'}
                } else if (row.row.log_level == 'SUCCESS') {
                    return {color: '#6bc24e'}
                };
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.query.page_size = val;
                this.getResourceLogList();
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.query.current_page = val;
                this.getResourceLogList();
            },
            generateLog () {
                this.getResourceLogList('event', true);
            }
        }
    }
</script>
<style scoped lang="scss">
    .lob_main{
        padding: 30px 40px;
        .list_headers{
            margin-bottom: 30px;
            .list_headers_title{
                text-align: right;
                h4{font-size: 16px;}
            }
            .info_input{
                margin-left: 20px;
            }
        }
        .list_headers:last-child{
            margin-bottom: 0;
        }
    }
    /deep/ .el-table .header_row_class{
        th{
            background-color: #eef1f6;
            border-color: #e1e7eb;
            height: 60px;
        }
    }
    .paging_main{
        padding: 20px 0 0;
        text-align: right;
    }
    /deep/ .el-table--enable-row-transition .el-table__body td{height: 60px;}
    /deep/.el-table .el-table__body-wrapper{
        /*table的横向滚动条*/
        overflow-x: auto!important;
    }
    /deep/ .el-table .el-table__fixed, .el-table .el-table__fixed-right{
        overflow: hidden;
    }
</style>