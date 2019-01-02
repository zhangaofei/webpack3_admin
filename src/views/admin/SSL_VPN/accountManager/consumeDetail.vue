<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user"></i>计费管理</a></li>
                <li class="active">收支明细</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">收支明细</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <el-row style="padding: 20px 0 30px;">
                                <el-col :span="8" style="margin-right: 16px; float: right;">
                                    <SearchBox
                                        width="60px"
                                        searchBoxId="example1_filter"
                                        inputBoxId="search_content"
                                        placeholder="请输入关键字"
                                        @search="search"
                                        @onClickSearchButton="getList"></SearchBox>
                                </el-col>
                                <el-col :span="6" style="float: right; margin-right: 20px;">
                                    <el-date-picker
                                        v-model="date"
                                        type="daterange"
                                        size="middle"
                                        range-separator="至"
                                        format="yyyy-MM-dd"
                                        style="height: 38px;vertical-align: middle; width: 100%;"
                                        @change="changeTime"
                                        placeholder="选择日期范围">
                                    </el-date-picker>
                                </el-col>
                                <!--<div id="example1_filter" class="dataTables_filter" style="float: right">-->
                                    <!--<input type="text"-->
                                           <!--class="form-control"-->
                                           <!--placeholder=""-->
                                           <!--id="search_content"-->
                                           <!--v-model="listQuery.searchContent"-->
                                           <!--@keyup.enter="search($event)">-->
                                    <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                            <!--<button class="btn btn-primary" type="button" @click="getList()" >-->
                                                <!--<span class="glyphicon glyphicon-search" ></span>-->
                                            <!--</button>-->
                                    <!--</span>-->
                                <!--</div>-->
                            </el-row>

                            <el-table
                                    ref="multipleTable"
                                    :data="list"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        prop="createTime"
                                        label="操作时间"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="userName"
                                        label="用户名"
                                        align="center">
                                </el-table-column>

                                <el-table-column
                                        prop="userFullName"
                                        label="用户全名"
                                        align="center">
                                </el-table-column>

                                <el-table-column
                                        prop="groupName"
                                        label="用户组"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="type"
                                        align="center"
                                        label="动作">
                                </el-table-column>
                                <el-table-column
                                        prop="money"
                                        align="center"
                                        label="充值金额">
                                </el-table-column>
                                <el-table-column
                                        prop="chargeWay"
                                        align="center"
                                        label="交易方式">
                                </el-table-column>
                                <el-table-column
                                        prop="managerName"
                                        align="center"
                                        label="操作管理员">
                                </el-table-column>
                            </el-table>


                            <div class="row" style="margin-top:8px;" >
                                <div class="block" style="margin-right: 2%;float: right" >
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="listQuery.currentPage"
                                            :page-sizes="[10, 20, 30, 40,50]"
                                            :page-size="listQuery.pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="listQuery.total">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {formatDateTime} from "../../../../utils/dateUtil";
    import {chargeDetail} from "../../../../api/SSL_VPN/accountManager/income";
    import multipleConditionChoose from 'components/mutipleCondition/MutipleConditionChoose.vue';
    import SearchBox from '@/views/components/searchBox.vue';
    export default{
        components: {
            multipleConditionChoose,
            SearchBox
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:85,
                list: [

                ],
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0,
                    searchContent:'',
                    startDay:'',
                    endDay:''
                },
                multipleSelection:[],
                date:''
            }
        },
        created(){
            this.getList();
        },
        methods: {
            search(event, keyword){
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                if(event.keyCode==13){
                    if(this.listQuery.searchContent!=null){
                        this.getList();
                    }
                }
            },
            changeTime(e){
                if(e!=null && e!=''){
                    let dateRange=e;
                    let d1=formatDateTime(dateRange[0]);
                    let d2=formatDateTime(dateRange[1]);
                    this.listQuery.startDay = d1;
                    this.listQuery.endDay = d2;
                }else{
                    this.listQuery.startDay = '';
                    this.listQuery.endDay = '';
                }
                this.getList();
            },
            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                chargeDetail(this.listQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        for (let i = 0; i < response.data.length; i++){
                            let date = new Date(response.data[i].createTime)
                            response.data[i].createTime = formatDateTime(date);
                            if(response.data[i].type == 1){
                                response.data[i].type = '充值';
                            } else if(response.data[i].type == -1) {
                                response.data[i].type = '退款';
                            }
                            if(response.data[i].chargeWay == 1){
                                response.data[i].chargeWay = '现金';
                            } else if(response.data[i].chargeWay == 2){
                                response.data[i].chargeWay = '微信';
                            } else if(response.data[i].chargeWay == 3){
                                response.data[i].chargeWay = '支付宝';
                            } else if(response.data[i].chargeWay == 4){
                                response.data[i].chargeWay = '校园卡';
                            } else {
                                response.data[i].chargeWay = '银行转账';
                            }
                        }
                        this.list = response.data;
                        this.listQuery.total = response.extend.page.totalHits;
                    }
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }

</script>


<style >

    el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
        width: 250px;
    }
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

