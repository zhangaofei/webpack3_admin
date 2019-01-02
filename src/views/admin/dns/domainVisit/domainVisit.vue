<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><i class="fa fa-folder-open"></i>智能DNS</li>
                <li class="active">域名统计</li>
                <li class="active">域名访问统计</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header" style="border: 1px solid transparent;">
                            <h3 class="box-title">域名访问统计</h3>
                        </div>

                        <div class="box-body">
                            <div class="row" style="margin-bottom:8px;">
                            </div>
                            <el-tabs v-model="activeName" type="border-card">
                                <el-tab-pane label="域名统计" name="first">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="box">
                                                <!-- /.box-header -->
                                                <div class="box-body">
                                                    <div class="row" style="margin-top:5px;margin-bottom: 10px">
                                                        <span style="margin-left: 40%">
                                                            TOP
                                                        </span>
                                                        <el-select v-model="domainQuery.range"  placeholder="请选择" class="el_sel_multi"
                                                                   style="height: 40px;width:23%;vertical-align: middle;">
                                                            <el-option label="0-1000" value="0-1000" ></el-option>
                                                            <el-option label="1001-2000" value="1001-2000" ></el-option>
                                                            <el-option label="2001-3000" value="2001-3000" ></el-option>
                                                            <el-option label="3001-4000" value="3001-4000" ></el-option>
                                                        </el-select>
                                                        <el-date-picker
                                                                v-model="date"
                                                                type="daterange"
                                                                size="middle"
                                                                range-separator="至"
                                                                format="yyyy-MM-dd"
                                                                style="height: 40px;vertical-align: middle;width: 23%;margin-left: 5px;margin-right: 5px"
                                                                @change="changeTime(date, 'domain')"
                                                                placeholder="选择日期范围">
                                                        </el-date-picker>
                                                        <el-button size="small"
                                                                   style="width: 7%;height:35px;background-color: #2b7de3"
                                                                   type="primary"
                                                                   @click="getList()">
                                                            查询
                                                        </el-button>
                                                    </div>

                                                    <el-table
                                                            ref="multipleTable"
                                                            :data="domainList"
                                                            :header-cell-style="headerCellStyle"
                                                            border
                                                            tooltip-effect="dark"
                                                            style="width: 100%"
                                                    >
                                                        <el-table-column
                                                                prop="order"
                                                                label="排名"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                prop="domain"
                                                                label="域名"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                prop="count"
                                                                label="次数"
                                                                align="center">
                                                        </el-table-column>
                                                        <el-table-column
                                                                align="center"
                                                                label="详细信息"
                                                                width="150"
                                                                show-overflow-tooltip>
                                                            <template slot-scope="scope">
                                                                <a @click="onCheck(scope.row, 'domain')" title="查看" ><i class="fa fa-eye" ></i></a>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>


                                                    <div class="row" style="margin-top:8px;" >
                                                        <div class="block" style="margin-right: 2%;float: right" >
                                                            <el-pagination
                                                                    @size-change="handleSizeChange1"
                                                                    @current-change="handleCurrentChange1"
                                                                    :current-page="domainQuery.currentPage"
                                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                                    :page-size="domainQuery.pageSize"
                                                                    layout="total, sizes, prev, pager, next, jumper"
                                                                    :total="domainQuery.total">
                                                            </el-pagination>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="来源IP统计" name="second">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="box">
                                                <!-- /.box-header -->
                                                <div class="box-body">
                                                    <div class="row" style="margin-top:5px;margin-bottom: 10px">
                                                        <span style="margin-left: 40%">
                                                            TOP
                                                        </span>
                                                        <el-select v-model="IPQuery.range"  placeholder="请选择" class="el_sel_multi"
                                                                   style="height: 40px;width:23%;vertical-align: middle;">
                                                            <el-option label="0-1000" value="0-1000" ></el-option>
                                                            <el-option label="1001-2000" value="1001-2000" ></el-option>
                                                            <el-option label="2001-3000" value="2001-3000" ></el-option>
                                                            <el-option label="3001-4000" value="3001-4000" ></el-option>
                                                        </el-select>
                                                        <el-date-picker
                                                                v-model="date"
                                                                type="daterange"
                                                                size="middle"
                                                                range-separator="至"
                                                                format="yyyy-MM-dd"
                                                                style="height: 40px;vertical-align: middle;width: 23%;margin-left: 5px;margin-right: 5px"
                                                                @change="changeTime(date, 'IP')"
                                                                placeholder="选择日期范围">
                                                        </el-date-picker>
                                                        <el-button size="small"
                                                                   style="width: 7%;height:35px;background-color: #2b7de3"
                                                                   type="primary"
                                                                   @click="getList()">
                                                            查询
                                                        </el-button>
                                                    </div>

                                                    <el-table
                                                            ref="multipleTable"
                                                            :data="IPList"
                                                            :header-cell-style="headerCellStyle"
                                                            border
                                                            tooltip-effect="dark"
                                                            style="width: 100%"
                                                    >
                                                        <el-table-column
                                                                prop="order"
                                                                label="排名"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                prop="ip"
                                                                label="来源IP"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                prop="count"
                                                                label="次数"
                                                                align="center">
                                                        </el-table-column>

                                                        <el-table-column
                                                                align="center"
                                                                label="详细信息"
                                                                width="150"
                                                                show-overflow-tooltip>
                                                            <template slot-scope="scope">
                                                                <a @click="onCheck(scope.row, 'IP')" title="查看" ><i class="fa fa-eye" ></i></a>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>


                                                    <div class="row" style="margin-top:8px;" >
                                                        <div class="block" style="margin-right: 2%;float: right" >
                                                            <el-pagination
                                                                    @size-change="handleSizeChange2"
                                                                    @current-change="handleCurrentChange2"
                                                                    :current-page="IPQuery.currentPage"
                                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                                    :page-size="IPQuery.pageSize"
                                                                    layout="total, sizes, prev, pager, next, jumper"
                                                                    :total="IPQuery.total">
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
        <domainCheck  @onChangeStatus="onChangeStatus" :currentData="currentData" :startTime="domainQuery.startTime" :endTime="domainQuery.endTime" v-if="domainVisible"/>
        <IPCheck @onChangeStatus="onChangeStatus" :currentData = "currentData" :startTime="IPQuery.startTime" :endTime="IPQuery.endTime" v-if="IPVisible"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import {formatDateTime} from "../../../../utils/dateUtil";
    import domainCheck from './domainCheck.vue'
    import IPCheck from './IPCheck.vue'
    import {getDomainVisitList, getIPVisitList} from 'api/enDNS/domainVisit';
    export default{
        components: {
            domainCheck, IPCheck
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:82,
                activeName:'first',
                domainList:[{count:10}],
                domainQuery:{
                    currentPage:1,
                    pageSize:10,
                    total:10,
                    startTime:'',
                    endTime:'',
                    range:''
                },
                IPQuery:{
                    currentPage:1,
                    pageSize:10,
                    total:10,
                    startTime:'',
                    endTime:'',
                    range:''
                },
                IPList:[{count:10}],
                domainVisible:false,
                IPVisible:false,
                currentData:'',
                date:''
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            changeTime(e, type){
                if(e!=null && e!=''){
                    let dateRange=e;
                    let d1=formatDateTime(dateRange[0]);
                    let d2=formatDateTime(dateRange[1]);
                    if(type == 'domain'){
                        this.domainQuery.startTime = d1;
                        this.domainQuery.endTime = d2;
                    } else {
                        this.IPQuery.startTime = d1;
                        this.IPQuery.endTime = d2;
                    }
                }else{
                    if(type == 'domain'){
                        this.domainQuery.startTime = '';
                        this.domainQuery.endTime = '';
                    } else {
                        this.IPQuery.startTime = '';
                        this.IPQuery.endTime = '';
                    }
                }
            },
            onChangeStatus(){
                this.domainVisible = false;
                this.IPVisible = false;
                this.getList();
            },
            domainCheck(row, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    if(type == 'domain'){
                        this.domainVisible = true;
                    } else {
                        this.IPVisible = true;
                    }
                }
            },

            getList(){
                getDomainVisitList(this.domainQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.domainList = response.data;
                        this.domainQuery.total = response.extend.page.totalHits;
                    }
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
                getIPVisitList(this.IPQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.IPList = response.data;
                        this.IPQuery.total = response.extend.page.totalHits;
                    }
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            },
            handleSizeChange1(val) {
                this.domainQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange1(val) {
                this.domainQuery.currentPage = val;
                this.getList();
            },
            handleSizeChange2(val) {
                this.IPQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange2(val) {
                this.IPQuery.currentPage = val;
                this.getList();
            },
        }
    }
</script>

<style>

    .el-date-editor .el-range-separator {
        padding: 0 5px;
        line-height: 32px;
        width: 9%;
        color: #303133;
    }
    .el-date-editor .el-range__close-icon {
        font-size: 14px;
        color: #c0c4cc;
        width: 8px;
        display: inline-block;
        float: right;
        line-height: 32px;
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
        padding-left: 30px;
        border-color: #DCDFE6;
    }
    .inner_head_right{
        margin-right: 66px;
    }
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
</style>


