<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i>用户管理</a></li>
                <li><a >审核设置</a></li>
                <li class="active">审核日志</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" id="user_set_box_title">审核日志</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <el-row :gutter="30" style="padding: 20px 0 30px;">

                                <el-col :span="8" style="float: right;">
                                    <SearchBox
                                            width="60px"
                                            searchBoxId="example1_filter"
                                            inputBoxId="search_content"
                                            placeholder="请输入关键字"
                                            @search="search"
                                            @onClickSearchButton="getList"></SearchBox>
                                </el-col>
                                <el-col :span="6" :offset="9" style="float: right; padding: 0 5px;">
                                    <el-date-picker
                                            v-model="date"
                                            type="daterange"
                                            size="small"
                                            range-separator="至"
                                            format="yyyy-MM-dd"
                                            style="height: 36px;vertical-align: middle;width: 100%;"
                                            @change="changeTime"
                                            placeholder="选择日期范围">
                                    </el-date-picker>
                                </el-col>
                                <!--<el-col :span="5">-->
                                    <!--<div>-->
                                        <!--<div id="example1_filter" class="dataTables_filter">-->
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
                                    <!--</div>-->
                                <!--</el-col>-->
                            </el-row>


                            <el-table
                                    ref="multipleTable"
                                    :data="list"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    >
                                <el-table-column
                                        prop="userName"
                                        label="用户名"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        prop="fullName"
                                        label="用户全名"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        prop="groupName"
                                        label="用户组"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="auditType"
                                        align="center"
                                        label="证件类型"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="code"
                                        align="center"
                                        label="证件号"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="email"
                                        align="center"
                                        label="邮箱"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="tel"
                                        align="center"
                                        label="电话"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        prop="auditState"
                                        align="center"
                                        label="审核状态"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="auditAdmin"
                                        align="center"
                                        width="110"
                                        label="审核管理员"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="auditTime"
                                        align="center"
                                        label="审核时间"
                                        show-overflow-tooltip>
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
    import {getAuditList} from "../../../../api/SSL_VPN/checkManager/checkConfig";
    import multipleConditionChoose from 'components/mutipleCondition/MutipleConditionChoose.vue';
    import SearchBox from '@/views/components/searchBox.vue';
    export default{
        components: {
            multipleConditionChoose, SearchBox
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:78,
                list: [

                ],
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0,
                    searchContent:'',
                    gteValue:'',
                    lteValue:'',
                    type:'afterAudit'
                },
                currentData: null,
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
                if(null != e && '' != e){
                    let dateRange=e;
                    let d1=formatDateTime(dateRange[0]);
                    let d2=formatDateTime(dateRange[1]);
                    this.listQuery.gteValue = d1;
                    this.listQuery.lteValue = d2;
                } else {
                    this.listQuery.gteValue = '';
                    this.listQuery.lteValue = '';
                }
                this.getList();
            },
            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                getAuditList(this.listQuery).then(response => {
                    if(response.status == 'SUCCESS'){
                        this.list = response.data
                        for (let i = 0; i < this.list.length; i++){
                            if(this.list[i].auditType == 'jobId'){
                                this.list[i].auditType = '工号'
                            } else if(this.list[i].auditType == 'studentId'){
                                this.list[i].auditType = '学号'
                            }
                        }
                        this.listQuery.currentPage = response.extend.page.currentPage;
                        this.listQuery.pageSize = response.extend.page.pageSize;
                        this.listQuery.total = response.extend.page.totalHits;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.code.info
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
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

