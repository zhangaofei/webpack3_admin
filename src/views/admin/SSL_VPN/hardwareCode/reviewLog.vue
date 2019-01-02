<template>
    <div>
        <section class="content-header">
            <h1>

                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user-md"></i> 用户配置 </a></li>
                <li><a >硬件特征管理</a></li>
                <li class="active">审核日志</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12" style="">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">审核日志</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row">
                                <div class="dataTables_length inner_head_left" >


                                </div>
                                <div id="example1_filter" class="dataTables_filter inner_head_right">
                                    <div class="block right_datetime" v-if="true">
                                        <el-date-picker
                                                v-model="value1"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                @change="changeTime">
                                        </el-date-picker>
                                    </div>
                                    <div class="right_search">
                                        <input type="text"
                                               class="form-control"
                                               placeholder=""
                                               v-model="listQuery.searchContent"
                                               @keyup.enter="search($event)">
                                        <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                        <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                        <button class="btn btn-primary" type="button" @click="getList()">
                                            <span>搜索</span>
                                        </button>
                                    </span>
                                    </div>
                                </div>

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
                                        type="selection"
                                        width="80"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="用户名"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.userName }}</template>
                                </el-table-column>
                                <el-table-column
                                        prop="groupName"
                                        label="用户组"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="termType"
                                        label="用户终端"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="hdSignature"
                                        label="硬件特征码"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="applyType"
                                        label="修改方式"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="auditType"
                                        label="审核方式"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="auditStatus"
                                        label="审核状态"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="auditAdmin"
                                        label="审核管理员"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="auditTime"
                                        label="审核时间"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <div class="row" style="margin-top:8px;" id="pages_list">
                                <div class="block" style="margin-right: 2%;float: right">
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
                            <!-- page end -->
                        </div>
                    </div>
                </div>
            </div>

        </section>

    </div>
</template>


<script>
    import {formatDateTime} from "../../../../utils/dateUtil";
    import {isReadonly} from "@/utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "@/store/index";
    import {codeMessage} from "@/utils/codes";
    import {notifyFault} from "@/utils/notify";
    import {mapGetters} from 'vuex'
    import {hardwareCommon} from "@/api/SSL_VPN/hardwareCode/hardwareCommon";
    export default{
        components: {

        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                currentView: null,
                currentData: null,
                checkListPort: [],
                isShow: false,
                isShowSub: false,

                lookVisible: false,
                list: [],
                arrs: [],
                role: '',
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0,
                    searchContent:'',
                    gteValue:'',
                    lteValue:'',
                    flag:2,//用于获取审核日志
                },
                multipleSelection: [],
                isEditShow: false,
                isAddShow: false,
                isPswShow: false,
                isLookShow:false,
                readOnly:false,
                pageId:11,
                value1: '',
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'roleName'
            ])
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        methods: {
            getList() {
                hardwareCommon(this.listQuery).then((resp)=> {
                    this.list = resp.data;
                    console.log(resp, 'list----')
                    this.listQuery.total = resp.extend.page.totalHits

                }).catch(err=> {

                });
            },
            resetForm() {
                this.lookVisible = false;
            },
            search(event){
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },


            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.listQuery.currentPage = val;
                this.getList();
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        }
    }
</script>

<style scoped>
    .dataTables_filter.inner_head_right{
        position: relative;
        height: 34px;
        margin-bottom: 30px;
    }
    .dataTables_length.inner_head_left {
        float: left;
        margin-top: 20px;
        margin-left: 1.4%;
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
        padding-left: 30px;
        border-color: #DCDFE6;
    }
    .inner_head_right{
        margin-right: 5.7%;
    }
</style>
