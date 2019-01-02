<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><i class="fa fa-folder-open"></i>智能DNS</li>
                <li class="active">域名管理</li>
                <li class="active">递归管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=" border-top-color: #6cbaf5 !important;">
                        <div class="box-header clude_tab">
                            <h3 class="box-title" id="res_rdp_title">递归管理</h3>
                            <a @click="saveDomain()" style="float: right;margin-top: 17px;margin-right: 50px">
                                <img src="../../../../assets/addIcon/保存.png"  style="width: 18px;height: 18px;margin-right: 10px">保存设置
                            </a>
                        </div>
                        <!-- /.box-header -->

                        <div class="box-body">
                            <div class="row" style="margin-bottom:8px;">
                            </div>
                            <el-tabs v-model="activeName" type="border-card">
                                <el-tab-pane label="递归服务器列表" name="first">

                                    <div class="row" style="margin-top: 20px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="server_table">
                                                &nbsp;
                                                <a title="新建" @click="onAdd('server')">
                                                    <i class="fa  fa-plus">新建</i>
                                                </a>
                                                &nbsp;

                                                <a  title="批量删除" @click="onMultiDelete('server')">
                                                    <i class="fa fa-trash" > 批量删除</i>
                                                </a>
                                                &nbsp;

                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="server_filter" class="dataTables_filter" style="margin-right: 53px;float: right">
                                                <input type="text"
                                                       class="form-control"
                                                       placeholder="请输入递归服务器名称"
                                                       id="searchContent_server"
                                                       v-model="listQuery_server.searchContent"
                                                       @keyup.enter="search($event)"
                                                />
                                                <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                                <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                    <button class="btn btn-primary" type="button" @click="getServerList()" >
                                                        <span>搜索</span>
                                                    </button>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="serverList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="checkBoxAll_server">

                                        <el-table-column
                                                type="selection"
                                                width="50"
                                                align="center"
                                        >
                                        </el-table-column>

                                        <el-table-column
                                                prop="serverName"
                                                align="center"
                                                label="名称">
                                        </el-table-column>

                                        <el-table-column
                                                prop="serverIp"
                                                align="center"
                                                show-overflow-tooltip
                                                label="地址">
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="130"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a @click="onEdit(scope.row, 'server')" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                <a @click="onDelete(scope.row,'server')" title="删除" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                            </template>
                                        </el-table-column>

                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange_server"
                                                    @current-change="handleCurrentChange_server"
                                                    :current-page="listQuery_server.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_server.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total_server">
                                            </el-pagination>
                                        </div>
                                    </div>

                                </el-tab-pane>
                                <el-tab-pane label="递归规则列表" name="second">
                                    <!-- 表单搜索框部分 -->

                                    <div class="row" style="margin-top: 20px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="rule_table">
                                                &nbsp;
                                                <a title="新建" @click="onAdd('rule')">
                                                    <i class="fa  fa-plus">新建</i>
                                                </a>
                                                &nbsp;
                                                <a  title="批量删除" @click="onMultiDelete('rule')">
                                                    <i class="fa fa-trash" > 批量删除</i>
                                                </a>
                                                &nbsp;
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="rule_filter" class="dataTables_filter" style="margin-right: 53px;float: right">
                                                <input type="text"
                                                       class="form-control"
                                                       placeholder="请输入递归规则"
                                                       id="searchContent_rule"
                                                       v-model="listQuery_rule.searchContent"
                                                       @keyup.enter="search($event)"
                                                />
                                                <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                                <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                    <button class="btn btn-primary" type="button" @click="getRuleList()" >
                                                        <span>搜索</span>
                                                    </button>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="ruleList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="checkBoxAll_rule">
                                        <el-table-column
                                                type="selection"
                                                width="50"
                                                align="center"
                                        >
                                        </el-table-column>

                                        <el-table-column
                                                prop="strategyName"
                                                align="center"
                                                label="策略名称">
                                        </el-table-column>

                                        <el-table-column
                                                prop="outIp"
                                                align="center"
                                                show-overflow-tooltip
                                                label="出口地址">
                                        </el-table-column>

                                        <el-table-column
                                                prop="lineCHName"
                                                align="center"
                                                label="线路">
                                        </el-table-column>

                                        <el-table-column
                                                prop="domainName"
                                                align="center"
                                                show-overflow-tooltip
                                                label="域名">
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="130"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a @click="onUpRule(scope.row.id, true)" title="上移"><i class="fa fa-arrow-circle-o-up" style="font-size: 18px"></i></a>
                                                <a @click="onUpRule(scope.row.id, false)" title="下移"><i class="fa fa-arrow-circle-o-down" style="font-size: 18px"></i></a>
                                                <a @click="onEdit(scope.row, 'rule')" title="修改"><i class="fa fa-pencil" style="font-size: 15px"></i></a>
                                                <a @click="onDelete(scope.row,'rule')" title="删除"><i class="fa fa-trash" style="font-size: 15px"></i></a>
                                            </template>
                                        </el-table-column>


                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange_rule"
                                                    @current-change="handleCurrentChange_rule"
                                                    :current-page="listQuery_rule.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_rule.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total_rule">
                                            </el-pagination>
                                        </div>
                                    </div>

                                </el-tab-pane>
                            </el-tabs>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <addServer  @onChangeStatus="onChangeStatus" v-if="isAddShow_server"/>
        <editServer @onChangeStatus="onChangeStatus" :currentData="currentData_server" v-if="isEditShow_server"/>

        <addRule  @onChangeStatus="onChangeStatus" v-if="isAddShow_rule"/>
        <editRule @onChangeStatus="onChangeStatus" :currentData="currentData_rule" v-if="isEditShow_rule"/>

    </div>
</template>
<script>
    import addServer from "./addServer"
    import editServer from "./editServer"
    import addRule from "./addRule"
    import editRule from "./editRule"
    import {mapGetters} from 'vuex';
    import {restartRedns} from 'api/enDNS/domainAdmin';
    import {getRuleList,getServerList,deleteRule,deleteServer,setRulePriority,upOrDown} from 'api/enDNS/recursion';
    export default {
        components: {addServer,editServer,addRule,editRule},
        data() {


            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                serverList:[],
                total_server:0,
                listLoading_server: true,
                currentView_server: null,
                currentData_server: null,
                listQuery_server:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                checkAll_server: false,// 对应全选框是否选中
                checkedItems_server:[],// 被选中的ID列表
                isEditShow_server: false,
                isAddShow_server: false,

                ruleList:[],
                total_rule:0,
                listLoading_rule: true,
                currentView_rule: null,
                currentData_rule: null,
                listQuery_rule:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                checkAll_rule: false,// 对应全选框是否选中
                checkedItems_rule:[],// 被选中的ID列表
                isEditShow_rule: false,
                isAddShow_rule: false,

                activeName:'first',
                tobedefined:'',

            }
        },

        created() {
            this.getServerList();
            this.getRuleList();
        },
        methods: {
            saveDomain(){
                this.$confirm('是否保存DNS设置?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    restartRedns().then(response => {
                        if (response.status == 'SUCCESS'){
                            this.$message({
                                type: 'success',
                                message: '保存设置成功!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: response.code.info
                            });
                        }
                    }).catch((e) => {
                        console.log(e)
                    });

                }).catch(() => {    // 取消事件
                    this.$message({
                        type: 'info',
                        message: '已取消保存'
                    });
                });
            },

            onChangeStatus() {
                this.isEditShow_rule = false;
                this.isAddShow_rule = false;
                this.isEditShow_server = false;
                this.isAddShow_server = false;
                this.getServerList();
                this.getRuleList();
            },

            handleSizeChange_server(val) {
                this.listQuery_server.pageSize = val;
                this.getServerList();
            },
            handleCurrentChange_server(val) {
                this.listQuery_server.currentPage = val;
                this.getServerList();
            },
            handleSizeChange_rule(val) {
                this.listQuery_rule.pageSize = val;
                this.getRuleList();
            },
            handleCurrentChange_rule(val) {
                this.listQuery_rule.currentPage = val;
                this.getRuleList();
            },

            onAdd(type) {
                if(type == 'rule'){
                    this.isAddShow_rule = true;
                } else {
                    this.isAddShow_server = true;
                }
            },
            onEdit(row, type) {
                if(type == 'rule'){
                    this.currentData_rule = row;
                    this.isEditShow_rule = true;
                } else {
                    this.currentData_server = row;
                    this.isEditShow_server = true;
                }
            },
            checkBoxAll_server(val) {
                this.checkedItems_server = val;
            },
            checkBoxAll_rule(val) {
                this.checkedItems_rule = val;
            },

            getServerList() {
                getServerList(this.listQuery_server).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.serverList = response.data;
                        this.total_server = response.extend.page.totalHits;
                        this.listQuery_server.currentPage = response.extend.page.currentPage;

                    }
                }).catch((e) => {
                    console.log(e)
                });

                this.checkAll_server = false;// 每次加载数据都清空所有复选框
                this.checkedItems_server = [];

            },

            getRuleList() {
                getRuleList(this.listQuery_rule).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.ruleList = response.data;
                        console.log('ruleList:', this.ruleList);
                        this.total_rule = response.extend.page.totalHits;
                        this.listQuery_rule.currentPage = response.extend.page.currentPage;

                    }
                }).catch((e) => {
                    console.log(e)
                });

                this.checkAll_rule = false;// 每次加载数据都清空所有复选框
                this.checkedItems_rule = [];

            },
            deleteRule(param){
                deleteRule(param).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getRuleList();
                    } else {
                        this.$message({
                            type:'warning',
                            message: response.code.info
                        });
                    }
                });
            },
            deleteServer(param){
                deleteServer(param).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getServerList();
                    } else {
                        this.$message({
                            type:'warning',
                            message: response.code.info
                        });
                    }
                });
            },
            onDelete(data,type) {
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let list = [];
                    if(type == 'server'){
                        list.push(data.serverId);
                    } else {
                        list.push(data.id);
                    }
                    let fwtimeDto = {
                        ids:list.join(',')
                    }
                    if (type=='server'){
                        this.deleteServer(fwtimeDto);
                    }else if (type=='rule'){
                        this.deleteRule(fwtimeDto);
                    }

                }).catch(() => {    // 取消事件
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },


            onMultiDelete(type) {
                var checkedItems;
                if (type=='rule'){
                    checkedItems = this.checkedItems_rule;
                }else {
                    checkedItems = this.checkedItems_server;
                }
                if (checkedItems.length == 0){
                    this.$message({
                        type: 'info',
                        message: '请选择要删除的递归管理！'
                    });
                    return;
                }

                this.$confirm('确认删除' + checkedItems.length + '项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let newArr=[];
                    for(let i=0;i<checkedItems.length;i++){
                        let row = checkedItems[i];
                        if(type == 'server'){
                            newArr.push(row.serverId);
                        } else {
                            newArr.push(row.id);
                        }
                    }
                    let dto={
                        ids:newArr.join(',')
                    }
                    if (type=='server'){
                        this.deleteServer(dto);
                    }else if (type=='rule'){
                        this.deleteRule(dto);
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            onUpRule(id, result){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var dto = {
                        id: id,
                        isUp: result
                    };
                    var messageInfo;
                    var failInfo;
                    if(result){
                        messageInfo = '上移成功!'
                        failInfo = '上移失败!'
                    } else {
                        messageInfo = '下移成功!'
                        failInfo = '下移失败!'
                    }
                    upOrDown(dto).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: messageInfo
                            });
                            this.getRuleList();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: response.code.info
                            });
                        }
                    });
                }
            }
        }
    }

</script>

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
        margin-right: 66px;
    }
</style>