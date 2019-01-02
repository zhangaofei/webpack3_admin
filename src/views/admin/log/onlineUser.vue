<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i> 实时监控</a></li>
                <li><a >用户监控</a></li>
                <li class="active">在线用户</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">

            <div class="row" >
                <div class="col-md-12" >
                    <div class="box" style=";padding-left: 16px">
                        <div class="box-header" style="height:82px">
                            <h3 class="box-title" id="user_set_box_title"
                                style="margin-left:5px;float:left;font-size:18px;color: #4A4D4F;">
                                在线用户
                            </h3>
                        </div>
                        <div class="log-tab">
                            <div class="row">
                                <div class="row" style="margin-bottom:8px;">
                                    <div class="logForm">
                                        <div class="row" style="width:100%">
                                            <!-- 添加筛选条件组价-->
                                            <div style="margin-left: 40px">
                                                <multipleConditionChoose :options="options"></multipleConditionChoose>
                                            </div>
                                        </div>

                                        <div class="row box" style="margin-left: 45px;margin-top:5px;width: 95%;background-color: yellow">
                                            <el-table
                                                    ref="multipleTable"
                                                    :data="tableData"
                                                    :header-cell-style="headerCellStyle"
                                                    border
                                                    tooltip-effect="dark"
                                                    style="width: 100%"
                                                    @selection-change="handleSelectionChange">
                                                <el-table-column
                                                        type="selection"
                                                        width="55">
                                                </el-table-column>

                                                <el-table-column
                                                        label="用户名"
                                                        show-overflow-tooltip>
                                                    <template slot-scope="scope">{{ scope.row.userName }}</template>
                                                </el-table-column>
                                                <el-table-column
                                                        prop="group"
                                                        label="用户组"
                                                        show-overflow-tooltip>
                                                </el-table-column>

                                                <el-table-column
                                                        prop="fullName"
                                                        label="用户全名"
                                                        show-overflow-tooltip>
                                                </el-table-column>

                                                <el-table-column
                                                        prop="userAuth"
                                                        label="用户权限"
                                                        show-overflow-tooltip>
                                                </el-table-column>

                                                <el-table-column
                                                        prop="loginTime"
                                                        label="登录时间"
                                                        show-overflow-tooltip>
                                                </el-table-column>

                                                <el-table-column
                                                        prop="loginIp"
                                                        label="登录IP"
                                                        show-overflow-tooltip>
                                                </el-table-column>


                                                <el-table-column
                                                        prop="loginConditionCode"
                                                        label="登录特征码"
                                                        show-overflow-tooltip>
                                                </el-table-column>

                                                <el-table-column
                                                        label="操作"
                                                        show-overflow-tooltip>
                                                    <template slot-scope="scope">
                                                        <a href="javascript:void(0)" style="color: #5096C1">详细</a>
                                                        <a href="javascript:void(0)" style="color: #5096C1">删除</a>
                                                    </template>
                                                </el-table-column>

                                            </el-table>

                                        </div>


                                        <div class="row" style="margin-top:8px;" >
                                            <div class="block" style="margin-right: 2%;float: right" >
                                                <el-pagination
                                                        @size-change="handleSizeChange"
                                                        @current-change="handleCurrentChange"
                                                        :current-page="listQuery.currentPage"
                                                        :page-sizes="[10, 20, 30,40,50]"
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


                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>

    import {codeMessage} from "../../../utils/codes";
    import {deepCopy} from "../../../utils/ObjectCopy";
    import {notifyFault} from "../../../utils/notify";
    import multipleConditionChoose from 'components/mutipleCondition/MutipleConditionChoose.vue';

    export default{
        components: {
            multipleConditionChoose
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                tableData:[{
                    userName:'猴子',
                    group:'花果山',
                    fullName:'孙猴子',
                    userAuth:'管理员',
                    loginTime:'2017/01/01 12:00:00',
                    loginIp:'127.0.0.1',
                    loginConditionCode:'asdads',//登陆特征码
                },{
                    userName:'猪肥宅',
                    group:'高老庄',
                    fullName:'猪天蓬',
                    userAuth:'管理员',
                    loginTime:'2016/01/01 12:00:00',
                    loginIp:'192.168.5.16',
                    loginConditionCode:'asdads',//登陆特征码
                }],
                multipleSelection: [],

                detailVisible:false,
                detailData:[],

                optionValue:'',
                dateRange:'',
                options: [{
                    value: '1',
                    label: '日期',
                    checked:true,
                    value:''
                }, {
                    value: '2',
                    label: '级别',
                    checked:false,
                    value:[]
                }, {
                    value: '3',
                    label: '用户名',
                    checked:false,
                    value:''
                },{
                    value: '4',
                    label: '用户组',
                    checked:false,
                    value:[]
                },{
                    value: '5',
                    label: '认证服务器',
                    checked:false,
                    value:[]
                }],

                checked:false,
                checkedId: [],

                list: [],
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 20,
                    total:2,
                    searchContent:null
                },
            }
        },
        computed:{

        },
        created(){

        },
        watch: {//深度 watcher

        },
        methods: {

            showDetail(){
                console.log("打开详情的弹窗：   ",this.detailVisible);
                this.detailVisible=true;

                console.log("确认打开详情的弹窗：   ",this.detailVisible);
            },

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.listQuery.pageSize=val;
                if((this.listQuery.total/this.listQuery.pageSize)<this.listQuery.currentPage){
                    this.listQuery.currentPage=1;
                }
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.listQuery.currentPage=val;
                this.getList();
            }


        }
    }

</script>


<style>

    .user-log-info .el-select>.el-input{
        margin-left: 41px;
    }

    .log-select{
        min-width: 200px;
        width: 200px;
        background-color: #3C8DBC;
        float:left;
        margin-left: 0;
    }

</style>
