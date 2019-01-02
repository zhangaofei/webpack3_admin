<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user"></i> 日志中心</a></li>
                <li><a>日志管理</a></li>
                <li class="active">日志下载</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=";padding-left: 0px">
                        <div class="box-header">
                            <h3 class="box-title" id="user_set_box_title"
                                style="float:left;font-size:18px;color: #4A4D4F;">
                                日志下载
                            </h3>
                        </div>
                        <div class="box-body">
                            <el-row>
                                <el-col :span="12">
                                    <a class="function_btn_main" @click.stop="handleRefreshList">
                                        <i class="fa fa-repeat"></i>
                                        <span class="function_btn">刷新</span>
                                    </a>
                                    <a class="function_btn_main" v-if="true" @click.stop="batchDowload">
                                        <i class="fa fa-download"></i>
                                        <span class="function_btn">下载</span>
                                    </a>
                                    <a class="function_btn_main" @click.stop="batchDeleteLog">
                                        <i class="fa fa-trash"></i>
                                        <span class="function_btn">批量删除</span>
                                    </a>
                                </el-col>
                                <el-col :span="8" :offset="4">
                                    <SearchBox
                                            placeholder="请输入关键字查询"
                                            @search="search"
                                            @onClickSearchButton="getLogDowloadList"></SearchBox>
                                    <!--<div id="line_filter" class="dataTables_filter" style="margin-right: 53px;float: right">-->
                                        <!--<input type="text"-->
                                               <!--class="form-control"-->
                                               <!--placeholder="请输入线路名称"-->
                                               <!--id="searchContent_line"-->
                                               <!--v-model="query.keyword"-->
                                               <!--@keyup.enter="search($event)"-->
                                        <!--/>-->
                                        <!--<span class="glyphicon glyphicon-search serch_head_icon"></span>-->
                                        <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                            <!--<button class="btn btn-primary" type="button" @click="getLogDowloadList()" >-->
                                                <!--<span>搜索</span>-->
                                            <!--</button>-->
                                        <!--</span>-->
                                    <!--</div>-->
                                </el-col>
                                <!--<el-col :span="6" :offset="6" class="search">-->
                                    <!--<el-input clearable v-model="query.keyword" @keyup.enter="getLogDowloadList" placeholder="输入关键字">-->
                                        <!--<i slot="prefix" class="fa fa-search search_icon" flex="main:center cross:center"></i>-->
                                        <!--<el-button slot="append" type="primary" class="search_btn" @click.stop="getLogDowloadList">搜索</el-button>-->
                                    <!--</el-input>-->
                                <!--</el-col>-->
                            </el-row>
                            <el-row class="table_row">
                                <el-col>
                                    <el-table
                                            :data="tableData"
                                            border
                                            header-row-class-name="header_row_class"
                                            @selection-change="handleSelectionChange"
                                            style="width: 100%">
                                        <el-table-column
                                                type="selection"
                                                :selectable="selectable"
                                                header-align="center"
                                                align="center"
                                                disabled
                                                width="55">
                                        </el-table-column>
                                        <el-table-column
                                                prop="file_name"
                                                show-overflow-tooltip
                                                header-align="center"
                                                align="center"
                                                label="文件名"
                                                width="280">
                                        </el-table-column>
                                        <el-table-column
                                                prop="createdAt"
                                                label="生成时间"
                                                show-overflow-tooltip
                                                header-align="center"
                                                align="center"
                                                min-width="280">
                                        </el-table-column>
                                        <el-table-column
                                                prop="state"
                                                show-overflow-tooltip
                                                header-align="center"
                                                align="center"
                                                label="状态"
                                                min-width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="address"
                                                header-align="center"
                                                align="center"
                                                label="操作"
                                                width="180">
                                            <template slot-scope="scope">
                                                <el-button
                                                        @click="downloadRow(scope.$index, scope.row)"
                                                        type="text"
                                                        :disabled="scope.row.percent != 100"
                                                        size="small">
                                                    <i class="fa fa-download"></i>
                                                </el-button>
                                                <el-button
                                                        @click="deleteRow(scope.$index, scope.row)"
                                                        type="text"
                                                        size="small"
                                                        style="margin-left: 10px;">
                                                    <i class="fa fa-trash"></i>
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {fetch} from 'utils/fetch';
    import moment from "moment";

    import SearchBox from '@/views/components/searchBox.vue';

    export default {
        data() {
            return {
                tableData: [
                    {
                        name: '测试',
                        time: '2017-12-12',
                        state: '停止'
                    }
                ],
                serchkey: '',
                query: {
                    current_page: 1,
                    page_size: 10,
                    terms: {},
                    keyword: '',
                    fuzziness: {},
                    total: 0
                },
                multipleSelection: []
            }
        },
        components: { SearchBox },
        created () {
            this.getLogDowloadList();
        },
        methods: {
            search(event, keyword){
                this.query.keyword = keyword != undefined ? keyword : this.query.keyword;
                if( event.keyCode==13 ){
                    this.getLogDowloadList();
                }
            },
            // 获取下载列表
            getLogDowloadList (keyword) {
                this.query.keyword = keyword != undefined ? keyword : this.query.keyword;
                fetch({
                    url: '/es-management/api/logDownload/list',
                    method: 'post',
                    body: {
                        "pageIndex": this.query.current_page,
                        "pageSize": this.query.page_size,
                        "terms": this.query.terms,
                        "keyword": this.query.keyword,
                        "fuzziness" : this.query.fuzziness
                    }
                }).then(res => {
                    if (res.code == 200) {
                        let data = res.data;
                        this.tableData = data.data.map(item => {
                            let state = item.percent == 100 ? '已生成' : '正在生成（'+item.percent+'%）';
                            let createdAt = (item['create_at'] && item['create_at'] == '') ? '' : moment(item['create_at']).format("YYYY-MM-DD HH:mm:ss");

                            this.$set(item, 'state', state);
                            this.$set(item, 'createdAt', createdAt);
                            return item;
                        });
                        this.query.total = data.total;
                    } else {
                        //this.$message.error(res.message);
                    }
                }).catch(error => {
                    this.$message.error(error.status)
                })
            },
            selectable (row, index) {
                if (row.percent == 100) {
                    return true;
                } else {
                    return false;
                }
            },
            // 批量下载日志
            batchDowload () {
                if(this.multipleSelection.length == 0) return this.$message.error("请选择要下载的日志！");
                let ids = this.multipleSelection.map(item => item.id);
                this.dowloadLog(ids);
            },
            // 批量删除日志
            batchDeleteLog () {
                if(this.multipleSelection.length == 0) return this.$message.error("请选择要删除的日志！");
                let ids = this.multipleSelection.map(item => item.id);
                this.deleteLog(ids);
            },
            // 日志下载 接口调用
            dowloadLog (ids) {
                this.$confirm('确定下载日志?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch({
                        url: '/es-management/api/logDownload/download',
                        method: 'post',
                        body: { ids: ids }
                    }).then(res => {
                        if(res.code == 200) {
                            let url_arr = res.data.map(item => {
                                item = item.replace(/^(\/usr\/local\/)/, '/');
                                item = item.replace(/([\/\/]+)/g, '/');
                                return item;
                            });
                            let triggerDelay = 100;
                            let removeDelay = 1000;
                            url_arr.forEach(function(item,index){
                                _createIFrame(item, index * triggerDelay, removeDelay);
                            })
                            function _createIFrame(url, triggerDelay, removeDelay) {
                                //动态添加iframe，设置src，然后删除
                                setTimeout(function() {
                                    var frame = $('<iframe style="display: none;" class="multi-download"></iframe>');
                                    frame.attr('src', url);
                                    $(document.body).after(frame);
                                    setTimeout(function() {
                                        frame.remove();
                                    }, removeDelay);
                                }, triggerDelay);
                            }
                        } else {
                            this.$message({ type: 'error', message: res.message });
                        }
                    }).catch(error => {
                        this.$message({ type: 'error', message: error });
                    })
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消下载' });
                });
            },
            // 日志删除 接口调用
            deleteLog (ids) {
                this.$confirm('确定永久删除日志?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch({
                        url: '/es-management/api/logDownload/deleteBatch',
                        method: 'post',
                        body: { ids: ids }
                    }).then(res => {
                        if(res.code == 200) {
                            this.getLogDowloadList();
                            this.$message({ type: 'success', message: '删除成功!' });
                        } else {
                            this.$message({ type: 'error', message: res.message });
                        }
                    }).catch(error => {
                        this.$message({ type: 'error', message: error });
                    })
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' });
                });
            },
            // 单条日志下载
            downloadRow (index, row) {
                let ids = [];
                    ids.push(row.id);
                this.dowloadLog(ids);
            },
            // 单条日志删除
            deleteRow (index, row) {
                let ids = [];
                    ids.push(row.id);
                this.deleteLog(ids);
            },
            // 多选数据收集
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            // 改变每页条数
            handleSizeChange(val) {
                this.query.page_size = val;
                this.getLogDowloadList();
            },
            // 改变当前页页码
            handleCurrentChange(val) {
                this.query.current_page = val;
                this.getLogDowloadList();
            },
            // 刷新列表
            handleRefreshList () {
                this.query.current_page = 1;
                this.getLogDowloadList();
            }
        }
    }
</script>

<style scoped lang="scss">
    .box-body{
        padding-top: 30px;
        padding-bottom: 30px;
    }
    .search{
        .search_icon{
            height: 100%;
            width: 24px;
        }
        .search_btn{
            background: #3484df;
            color: #ffffff;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            //border: 1px solid #409eff;
        }
    }
    .table_row{
        margin-top: 30px;
    }
    /deep/ .el-table .header_row_class{
        th{
            background-color: #eef1f6;
            border-color: #e1e7eb;
        }
    }
    .paging_main{
        padding: 20px 0 0;
        text-align: right;
    }

    /* 搜索按钮样式start */
    .dataTables_filter{
        position: relative;
        height: 34px;
        margin-bottom: 30px;
    }
    .btn-primary{
        background-color: #3493E0;
        border-color: #1f80e6;
    }
    .btn-primary:hover {
        background-color: #3493E0;
        border-color: #409EFF;
    }
    a {
        color: #3493E0;
    }
    .serch_head_icon{
        display: block;
        width: 30px;
        height: 100%;
        line-height: 34px;
        text-align: center;
        vertical-align: middle;
        position: absolute;
        left: 0;
        top: 0;
        color: #C0C4CC;
    }
    .form-control{
        padding: 6px 0 6px 30px;
    }
    /* 搜索按钮样式end */
</style>