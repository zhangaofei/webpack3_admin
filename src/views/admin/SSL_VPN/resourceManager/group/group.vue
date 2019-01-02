<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left: 12px;">
                <li><a><i class="fa fa-user">EnSSL</i></a></li>
                <li class="active">用户组授权</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" >用户组授权</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="margin-top: 30px">
                            <el-table
                                    ref="multipleTable"
                                    :data="list"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    >
                                <el-table-column
                                        prop="groupName"
                                        align="center"
                                        label="用户组">
                                </el-table-column>

                                <el-table-column
                                        prop="remark"
                                        align="center"
                                        label="说明"
                                        >
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="操作"
                                        >
                                    <template slot-scope="scope">
                                        <a @click="onHandle(scope.row, 'edit')" style="margin-right: 30px">应用设置</a>
                                        <a @click="onHandle(scope.row, 'check')">查看</a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <div class="row" style="margin-top:8px;" id="pages_list">
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

                            <!-- page end -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <edit  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <check @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="isCheckShow"/>
    </div>
</template>
<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import edit from './edit'
    import check from './check'
    import {groupList} from 'api/SSL_VPN/userManager/new-groupSet';
    export default{
        components:{
            edit,
            check
        },
        data(){
            return{
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:75,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0,
                    searchContent:''
                },
                list:[],
                isEditShow: false,
                isCheckShow: false,
                currentData: null,
                multipleSelection:[]
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            onChangeStatus(){
                this.isEditShow = false;
                this.isCheckShow = false;
                this.getList();
            },
            onHandle(row, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    if(type == 'edit'){
                        this.isEditShow = true;
                    } else {
                        this.isCheckShow = true;
                    }
                }
            },

            getList(){
                groupList(this.listQuery).then(response => {
                    this.list = response.data;
                    this.listQuery.total = response.extend.page.totalHits;
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e);
                });
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
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