<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-folder-open"></i>计费管理</a></li>
                <li class="active">套餐报表</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header" style="border: 1px solid transparent;">
                            <h3 class="box-title">套餐报表</h3>
                        </div>

                        <div class="box-body">
                            <div class="row">
                            </div>
                            <el-tabs v-model="activeName" type="border-card">
                                <el-tab-pane label="总体报表" name="first">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="box">
                                                    <!-- /.box-header -->
                                                    <div class="box-body">
                                                        <!-- 表单搜索框部分 -->
                                                        <div class="row" style="margin-top: 20px;">
                                                            <el-button @click="totalDownload('query')" type="primary" class="primary confirm" style="width: 140px;margin-left: 17px">查询并导出报表</el-button>
                                                            <el-button @click="totalDownload('all')" type="primary" class="primary confirm" style="width: 140px;">导出所有报表</el-button>

                                                            <el-button type="primary" @click="searchTable" class="primary confirm right" style="margin-right: 16px;">搜索</el-button>
                                                            <el-col :span="6" style="float: right;">
                                                                <el-date-picker
                                                                        v-model="date1"
                                                                        type="daterange"
                                                                        size="middle"
                                                                        range-separator="至"
                                                                        format="yyyy-MM-dd"
                                                                        style="height: 36px;margin-bottom:30px;vertical-align: middle; width: 100%;"
                                                                        placeholder="选择日期范围">
                                                                </el-date-picker>
                                                            </el-col>
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
                                                                    prop="openNum"
                                                                    label="开通套餐数"
                                                                    align="center">
                                                            </el-table-column>

                                                            <el-table-column
                                                                    prop="closeNum"
                                                                    label="关闭套餐数"
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
                                <el-tab-pane label="套餐报表" name="second">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="box">
                                                    <!-- /.box-header -->
                                                    <div class="box-body">
                                                        <!-- 表单搜索框部分 -->
                                                        <div class="row" style="margin-bottom:30px;margin-top: 20px;">
                                                            <!--<div class="col-sm-6">-->
                                                                <el-button @click="packageDownload('query')" type="primary" class="primary confirm" style="width: 140px;margin-left: 17px">查询并导出报表</el-button>
                                                                <el-button @click="packageDownload('all')" type="primary" class="primary confirm" style="width: 140px;">导出所有报表</el-button>
                                                                <el-col :span="8" style="margin-right: 16px; float: right;">
                                                                    <SearchBox
                                                                            width="60px"
                                                                            searchBoxId="example11"
                                                                            inputBoxId="search_content1"
                                                                            placeholder="请输入关键字"
                                                                            @search="search"
                                                                            @onClickSearchButton="getList"></SearchBox>
                                                                </el-col>
                                                                <!--<div id="example11" class="dataTables_filter"-->
                                                                     <!--style="margin-right:52px;float: right;">-->
                                                                    <!--<input type="text"-->
                                                                           <!--class="form-control"-->
                                                                           <!--placeholder="请输入套餐名称"-->
                                                                           <!--id="search_content1"-->
                                                                           <!--v-model="packageQuery.searchContent"-->
                                                                           <!--@keyup.enter="search($event)">-->
                                                                    <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                                                        <!--<button class="btn btn-primary" type="button" @click="getList()" >-->
                                                                            <!--<span class="glyphicon glyphicon-search" ></span>-->
                                                                        <!--</button>-->
                                                                    <!--</span>-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                        </div>

                                                        <el-table
                                                                ref="multipleTable"
                                                                :data="packageList"
                                                                :header-cell-style="headerCellStyle"
                                                                border
                                                                tooltip-effect="dark"
                                                                style="width: 100%"
                                                        >
                                                            <el-table-column
                                                                    prop="name"
                                                                    label="套餐名称"
                                                                    align="center">
                                                            </el-table-column>

                                                            <el-table-column
                                                                    prop="circle"
                                                                    label="套餐价格"
                                                                    align="center">
                                                            </el-table-column>

                                                            <el-table-column
                                                                    prop="openNum"
                                                                    label="开通套餐数"
                                                                    align="center">
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="closeNum"
                                                                    label="关闭套餐数"
                                                                    align="center">
                                                            </el-table-column>
                                                            <el-table-column
                                                                    align="center"
                                                                    label="操作"
                                                                    width="150"
                                                                    show-overflow-tooltip>
                                                                <template slot-scope="scope">
                                                                    <a @click="onCheck(scope.row, 'package')">查看明细</a>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>


                                                        <div class="row" style="margin-top:8px;" >
                                                            <div class="block" style="margin-right: 2%;float: right" >
                                                                <el-pagination
                                                                        @size-change="handleSizeChange2"
                                                                        @current-change="handleCurrentChange2"
                                                                        :current-page="packageQuery.currentPage"
                                                                        :page-sizes="[10, 20, 30, 40,50]"
                                                                        :page-size="packageQuery.pageSize"
                                                                        layout="total, sizes, prev, pager, next, jumper"
                                                                        :total="packageQuery.total">
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
        <check  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="check1Visible"/>
        <packageCheck @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="check2Visible"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import {allReport, packageReport, downloadAllPackageReport, downloadPackageReport} from "../../../../../api/SSL_VPN/accountManager/packageConfig";
    import check from './check.vue'
    import packageCheck from './packageCheck.vue'
    import MultipleCondition from 'components/mutipleCondition/MutipleCondition.vue';
    import {formatDateTime} from "../../../../../utils/dateUtil";
    import SearchBox from '@/views/components/searchBox.vue';
    import moment from 'moment';
    export default{
        components: {
            MultipleCondition,
            check,
            packageCheck,
            SearchBox
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:82,
                activeName:'first',
                totalQuery:{
                    currentPage:1,
                    pageSize:10,
                    total:10,
                    startDay:'',
                    endDay:'',
                    searchContent:''
                },
                packageQuery:{
                    currentPage:1,
                    pageSize:10,
                    total:10,
                    startDay:'',
                    endDay:'',
                    searchContent:''
                },
                totalList:[],
                packageList:[],
                check1Visible:false,
                check2Visible:false,
                currentData:'',
                date1:'',
                date2:''
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            searchTable () {
                if(this.date1 == '') return this.$message.warning('请选择日期范围');
                this.totalQuery.startDay = moment(this.date1[0]).format("YYYY-MM-DD");
                this.totalQuery.endDay = moment(this.date1[1]).format("YYYY-MM-DD");
                this.getList();
            },
            search(event, keyword){
                console.log('search',this.packageQuery.searchContent)
                this.packageQuery.searchContent = keyword != undefined ? keyword : this.packageQuery.searchContent;
                if(event.keyCode==13){
                    if(this.packageQuery.searchContent!=null){
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
                        if(this.date1 == '') return this.$message.warning('请选择日期范围');
                        this.totalQuery.startDay = moment(this.date1[0]).format("YYYY-MM-DD");
                        this.totalQuery.endDay = moment(this.date1[1]).format("YYYY-MM-DD");
                        downloadAllPackageReport({
                            startDay: this.totalQuery.startDay,
                            endDay: this.totalQuery.endDay,
                            searchContent: this.totalQuery.searchContent
                        }).then(resp => {
                            let str = '../api/admin/charging/package/userPackage/report/all/download?startDay=' + this.totalQuery.startDay + '&endDay=' + this.totalQuery.endDay + '&searchContent=' + this.totalQuery.searchContent;
                            location.href = str;
                        }).catch((e) => {
                            console.log(e)
                        });
                    } else if(type == 'all'){
                        downloadAllPackageReport({startDay: '', endDay: ''}).then(resp => {
                            location.href = '../api/admin/charging/package/userPackage/report/all/download?startDay=&endDay=';
                        }).catch((e) => {
                            console.log(e)
                        });
                    }
                }
            },

            packageDownload(type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'query'){
                        this.packageQuery.searchContent = keyword != undefined ? keyword : this.packageQuery.searchContent;
                        downloadPackageReport({
                            startDay: this.packageQuery.startDay,
                            endDay: this.packageQuery.endDay,
                            searchContent: this.packageQuery.searchContent
                        }).then(resp => {
                            location.href = '../api/admin/charging/package/userPackage/report/category/download?startDay=' + this.packageQuery.startDay + '&endDay=' +
                                this.packageQuery.endDay + '&searchContent=' + this.packageQuery.searchContent;
                        }).catch((e) => {
                            console.log(e)
                        });
                    } else if(type == 'all'){
                        downloadPackageReport({startDay: '', endDay: ''}).then(resp => {
                            location.href = '../api/admin/charging/package/userPackage/report/category/download?startDay=&endDay=';
                        }).catch((e) => {
                            console.log(e)
                        });
                    }
                }
            },

            changeTime(e){
                if(e!=null && e!=''){
                    let dateRange=e;
                    let d1=formatDateTime(dateRange[0]);
                    let d2=formatDateTime(dateRange[1]);
                    this.totalQuery.startDay = d1;
                    this.totalQuery.endDay = d2;
                }else{
                    this.totalQuery.startDay = '';
                    this.totalQuery.endDay = '';
                }

                this.getList();
            },
            onChangeStatus(){
                this.check1Visible = false;
                this.check2Visible = false;
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
                        this.check1Visible = true;
                    } else {
                        this.check2Visible = true;
                    }

                }
            },

            getList(keyword){
                this.packageQuery.searchContent = keyword != undefined ? keyword : this.packageQuery.searchContent;
                allReport(this.totalQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.totalList = response.data;
                        this.totalQuery.total = response.extend.page.totalHits;
                    }
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
                packageReport(this.packageQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.packageList = response.data;
                        for (let i = 0; i < this.packageList.length; i++){
                            if(this.packageList[i].unit == '月'){
                                if(this.packageList[i].value == 0 || this.packageList[i].value == 1){
                                    this.packageList[i].circle = this.packageList[i].price + '元' + '/' + this.packageList[i].unit;
                                } else {
                                    this.packageList[i].circle = this.packageList[i].price + '元' + '/' + this.packageList[i].value + '个' + this.packageList[i].unit;
                                }
                            } else {
                                if(this.packageList[i].value == 0 || this.packageList[i].value == 1){
                                    this.packageList[i].circle = this.packageList[i].price + '元' + '/' + this.packageList[i].unit;
                                } else {
                                    this.packageList[i].circle = this.packageList[i].price + '元' + '/' + this.packageList[i].value + this.packageList[i].unit;
                                }
                            }
                        }
                        this.packageQuery.total = response.extend.page.totalHits;
                    }
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
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
                this.packageQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange2(val) {
                this.packageQuery.currentPage = val;
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
</style>


