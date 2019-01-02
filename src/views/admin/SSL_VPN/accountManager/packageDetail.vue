<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user"></i>计费管理</a></li>
                <li class="active">套餐明细</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" id="user_set_box_title">套餐明细</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                <!--<div id="example1_filter" class="dataTables_filter" style="margin-right:50px;float: right;margin-left: 20px">-->
                                    <!--<input type="text"-->
                                           <!--class="form-control"-->
                                           <!--placeholder=""-->
                                           <!--id="search_content"-->
                                           <!--v-model="listQuery.searchContent"-->
                                           <!--@keyup.enter="search($event)">-->
                                    <!--<span class="glyphicon glyphicon-search serch_head_icon"></span>-->
                                    <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                            <!--<button class="btn btn-primary" type="button" @click="getList()" >-->
                                                <!--<span>搜索</span>-->
                                            <!--</button>-->
                                    <!--</span>-->
                                <!--</div>-->
                                <el-col :span="8" style="margin-right: 16px; float: right;">
                                    <SearchBox
                                            width="60px"
                                            searchBoxId="example1_filter"
                                            inputBoxId="search_content"
                                            placeholder="请输入关键字"
                                            @search="search"
                                            @onClickSearchButton="getList"></SearchBox>
                                </el-col>
                                <el-col :span="6" style="margin-right: 20px; float: right;">
                                    <el-date-picker
                                            v-model="date"
                                            type="daterange"
                                            size="middle"
                                            range-separator="至"
                                            format="yyyy-MM-dd"
                                            style="margin-left: 0px;vertical-align: middle;float:right; width: 100%; height: 38px;border-radius: 1px;"
                                            @change="changeTime"
                                            placeholder="选择日期范围">
                                    </el-date-picker>
                                </el-col>

                            </div>


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
                                        prop="packageName"
                                        align="center"
                                        label="套餐类型">
                                </el-table-column>
                                <el-table-column
                                        prop="price"
                                        align="center"
                                        label="套餐金额">
                                </el-table-column>
                                <el-table-column
                                        prop="circle"
                                        align="center"
                                        label="时间/流量">
                                </el-table-column>
                                <el-table-column
                                        prop="money"
                                        align="center"
                                        label="金额(元)">
                                </el-table-column>
                                <el-table-column
                                        prop="managerName"
                                        align="center"
                                        label="操作员">
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
    import {PackageDetail} from "../../../../api/SSL_VPN/accountManager/packageConfig";
    import multipleConditionChoose from 'components/mutipleCondition/MutipleConditionChoose.vue';
    import SearchBox from '@/views/components/searchBox.vue';
    export default{
        components: {
            multipleConditionChoose,SearchBox
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:83,
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
                currentData: null,
                multipleSelection:[],
                isEditShow: false,
                isAddShow: false,
                isCheckShow: false,
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
//                let value = e;
//                this.listQuery.startDay = value.split('至')[0];
//                this.listQuery.endDay = value.split('至')[1];
                this.getList();
            },
            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                PackageDetail(this.listQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.list = response.data;
                        for (let i = 0; i < response.data.length; i++){
                            if(response.data[i].type == 1){
                                response.data[i].type = '开通套餐';
                            } else if(response.data[i].type == 2) {
                                response.data[i].type = '关闭套餐';
                            }
                        }
                        for (let i = 0; i < this.list.length; i++){
                            let date = new Date(this.list[i].createTime)
                            this.list[i].createTime = formatDateTime(date);
                            if(this.list[i].packageUnit == '月'){
                                this.list[i].circle = this.list[i].packageValue + '个' + this.list[i].packageUnit;
                            } else {
                                this.list[i].circle = this.list[i].packageValue + this.list[i].packageUnit;
                            }
                            if(this.list[i].packageUnit == '月'){
                                if(this.list[i].packageValue == 0 || this.list[i].packageValue == 1){
                                    this.list[i].price = this.list[i].packagePrice + '元' + '/' + this.list[i].packageUnit;
                                } else {
                                    this.list[i].price = this.list[i].packagePrice + '元' + '/' + this.list[i].packageValue + '个' + this.list[i].packageUnit;
                                }
                            } else {
                                if(this.list[i].packageValue == 0 || this.list[i].packageValue == 1){
                                    this.list[i].price = this.list[i].packagePrice + '元' + '/' + this.list[i].packageUnit;
                                } else {
                                    this.list[i].price = this.list[i].packagePrice + '元' + '/' + this.list[i].packageValue + this.list[i].packageUnit;
                                }
                            }
                        }
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
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
        width: 260px;
    }
</style>
<style scoped>
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
</style>

