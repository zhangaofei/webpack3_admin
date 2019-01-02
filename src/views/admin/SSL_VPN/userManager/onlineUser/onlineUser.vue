<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i>用户管理</a></li>
                <li><a >用户设置</a></li>
                <li class="active">在线用户</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">在线用户</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                <el-col :span="15" style="margin-left: 10px;">
                                    <a class="function_btn_main" title="批量删除" @click="multipleDelete()">
                                        <i class="fa fa-trash"> 批量删除</i>
                                    </a>
                                </el-col>
                                <el-col :span="8" style="margin-right: 16px; float: right;">
                                    <SearchBox
                                            width="60px"
                                            searchBoxId="example1_filter"
                                            inputBoxId="search_content"
                                            placeholder="请输入关键字"
                                            @search="search"
                                            @onClickSearchButton="getList"></SearchBox>
                                </el-col>
                                <!--<div class="dataTables_filter inner_head_right">-->
                                    <!--<input type="text"-->
                                           <!--class="form-control"-->
                                           <!--placeholder="输入关键字"-->
                                           <!--id="search_content"-->
                                           <!--v-model="listQuery.search_content"-->
                                           <!--@keyup.enter="search($event)"-->
                                    <!--/>-->
                                    <!--<span class="glyphicon glyphicon-search serch_head_icon"></span>-->
                                    <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                            <!--<button class="btn btn-primary" type="button" @click="getList()" >-->
                                                <!--<span>搜索</span>-->
                                            <!--</button>-->
                                    <!--</span>-->
                                <!--</div>-->
                            </div>
                            <!-- ./ -->

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
                                        align="center"
                                        width="80"
                                        :selectable="selectables"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="用户名"
                                        align="center"
                                        prop="userName"
                                        show-overflow-tooltip
                                >
                                    <!--<template scope="scope">{{ scope.row.userName }}</template>-->
                                </el-table-column>
                                <el-table-column
                                        prop="groupName"
                                        align="center"
                                        label="用户组"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="fullName"
                                        align="center"
                                        label="用户角色名"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        width="200"
                                        prop="createTime"
                                        label="登录时间"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        width="200"
                                        prop="loginIp"
                                        label="登录IP"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        prop="hardwareCode"
                                        label="登录特征码"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        label="操作"
                                        align="center"
                                        width="100"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a title="删除"
                                           @click="singleDelete(scope.row)"
                                           style="margin-right: 8px"
                                           :style="{
                                               color: scope.row.userName == 'admin' ? '#D3DCE6' : '',
                                               cursor: scope.row.userName == 'admin' ? 'default' : 'pointer'}">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <div class="row" style="margin-top:8px;" id="pages_list">
                                <div class="block" style="margin-right: 2%;float: right" >
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="listQuery.cur_page"
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
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from '../../../../../store';
    import {getOnlineUser, removeOnlineUser} from "../../../../../api/SSL_VPN/user_new/userApi";
    import SearchBox from '@/views/components/searchBox.vue';
    export default{
        components: {
            SearchBox
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                isAdmin: false,
                readOnly:false,
                pageId:21,
                list: [],
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    search_content: null,
                    total:0
                },
                multipleSelection: [],
                type:'11'
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        methods: {
            search(event, keyword){
                this.listQuery.search_content = keyword != undefined ? keyword : this.listQuery.search_content;
                if(event.keyCode==13){
                    if(this.listQuery.search_content!=null){
                        this.getList();
                    }
                }
            },
            selectables (row) {
                return row.userName != 'admin' ? true: false;
            },
            getList(keyword) {
                this.listQuery.search_content = keyword != undefined ? keyword : this.listQuery.search_content;
                getOnlineUser(this.listQuery.cur_page,this.listQuery.pageSize,this.listQuery.search_content).then((resp)=>{
                    this.list=resp.data;
                    this.listQuery.total=resp.extend.page.totalHits
                }).catch(err=>{
                    console.log("获取在线用户出错：",err)
                });
            },
            singleDelete(row){
                // 超级用户直接返回，不进行删除操作
                if (row.userName == 'admin')  return;

                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let isContainsCurrentLoginUser = false;
                    //现在的sessionID返回的数据变成spring：session：admin:sessionId
                    var index = row.sessionId.lastIndexOf(':')
                    let subSessionId = row.sessionId.substring(index + 1, row.sessionId.length)
                    if (subSessionId == store.getters.token) {
                        isContainsCurrentLoginUser = true;
                        console.log("包含当前登录的用户---------------------->")
                    }
                    if (row.fullName != '超级管理员') {
                        console.log("删除的不是超级管理员：", isContainsCurrentLoginUser)
                        this.delete(row.sessionId, isContainsCurrentLoginUser);
                    }
                    else {
                        this.$message({
                            type: 'warning',
                            message: '不能删除超级管理员！'
                        });
                    }
                }
            },

            multipleDelete(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的用户！'
                        });
                        return;
                    }
                    let list = [];
                    let isContainsCurrentLoginUser = false;
                    for (let row of this.multipleSelection) {
                        if (row.fullName != "超级管理员") {
                            list.push(row.sessionId);
                        }
                        var index = row.sessionId.lastIndexOf(':')
                        let subSessionId = row.sessionId.substring(index + 1, row.sessionId.length)
                        if (subSessionId == store.getters.token) {
                            isContainsCurrentLoginUser = true;
                            console.log("包含当前登录的用户---------------------->")
                        }
                    }
                    let sessionID = list.join(',');
                    this.delete(sessionID, isContainsCurrentLoginUser);
                }

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            delete(sessionID,isContainsCurrentLoginUser) {
                let information="确认删除";
                if(isContainsCurrentLoginUser){
                    information="要删除的用户包含当前登录的用户，删除之后会强制退出!"
                }
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeOnlineUser(sessionID).then(resp=>{
                        if(resp.status=='SUCCESS'){
                            this.$message({
                                type:'success',
                                message:'删除在线用户成功！'
                            });
                            if(isContainsCurrentLoginUser){
//                                this.$store.dispatch('LogOut').then(resp=>{
//                                    this.$router.push({path: '/'});
//                                }).catch(err=>{
//                                    this.$router.push({path: '/'});
//                                })
                            }
                            this.getList();
                        }else{
//                            this.$message({
//                                type:'warning',
//                                message:'删除在线用户失败！'
//                            })
                        }
                    }).catch(err=>{
                        console.log("删除在线用户失败：",err);
                    })
                }).catch(() => {    // 取消事件
                    //do nothing
                });


            },
            handleSizeChange(val) {
                this.listQuery.pageSize=val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.cur_page=val;
                this.getList();
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