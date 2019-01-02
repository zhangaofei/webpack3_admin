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
                <li class="active">区域管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=" border-top-color: #6cbaf5 !important;">
                        <div class="box-header clude_tab">
                            <h3 class="box-title" id="res_rdp_title">区域管理</h3>
                        </div>
                        <!-- /.box-header -->

                        <div class="box-body">
                            <div class="row" style="margin-bottom:8px;">
                            </div>
                            <el-tabs v-model="activeName" type="border-card">
                                <el-tab-pane label="区域列表" name="first">

                                    <div class="row" style="margin-top: 20px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="region_table">
                                                &nbsp;
                                                <a title="新建" @click="onAdd('region')">
                                                    <i class="fa  fa-plus">新建</i>
                                                </a>
                                                &nbsp;
                                                <a  title="批量删除" @click="onMultiDelete('region')">
                                                    <i class="fa fa-trash" > 批量删除</i>
                                                </a>
                                                &nbsp;

                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="region_filter" class="dataTables_filter" style="margin-right: 53px;float: right">
                                                <input type="text"
                                                       class="form-control"
                                                       placeholder="请输入区域名称"
                                                       id="searchContent_region"
                                                       v-model="listQuery_region.searchContent"
                                                       @keyup.enter="search($event)"
                                                />
                                                <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                                <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                    <button class="btn btn-primary" type="button" @click="getRegionList()" >
                                                        <span>搜索</span>
                                                    </button>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="regionList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="checkBoxAll_region">
                                        <el-table-column
                                                type="selection"
                                                width="50"
                                                align="center"
                                                :selectable = "isAvailable"
                                        >
                                        </el-table-column>

                                        <el-table-column
                                                prop="name"
                                                align="center"
                                                label="区域名称">
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="130"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isUserDefine == true">
                                                    <a @click="onEdit(scope.row, 'region')" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                    <a @click="onDelete(scope.row,'region')" title="删除" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                                </span>
                                            </template>
                                        </el-table-column>

                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange_region"
                                                    @current-change="handleCurrentChange_region"
                                                    :current-page="listQuery_region.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_region.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total_region">
                                            </el-pagination>
                                        </div>
                                    </div>

                                </el-tab-pane>
                                <el-tab-pane label="黑名单列表" name="second">
                                    <!-- 表单搜索框部分 -->

                                    <div class="row" style="margin-top: 20px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="blacklist_table">
                                                &nbsp;
                                                <a title="新建" @click="onAdd('blacklist')">
                                                    <i class="fa  fa-plus">新建</i>
                                                </a>
                                                &nbsp;
                                                <a  title="批量删除" @click="onMultiDelete('blacklist')">
                                                    <i class="fa fa-trash" > 批量删除</i>
                                                </a>
                                                &nbsp;
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="blacklist_filter" class="dataTables_filter" style="margin-right: 53px;float: right">
                                                <input type="text"
                                                       class="form-control"
                                                       placeholder="请输入区域"
                                                       id="searchContent_blacklist"
                                                       v-model="listQuery_blacklist.searchContent"
                                                       @keyup.enter="search($event)"
                                                />
                                                <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                                <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                    <button class="btn btn-primary" type="button" @click="getBlacklistList()" >
                                                        <span>搜索</span>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="blackList"
                                            border
                                            :header-cell-style="headerCellStyle"
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="checkBoxAll_blacklist">
                                        <el-table-column
                                                type="selection"
                                                width="50"
                                                align="center"
                                        >
                                        </el-table-column>

                                        <el-table-column
                                                prop="listName"
                                                align="center"
                                                label="名称">
                                        </el-table-column>

                                        <el-table-column
                                                prop="IPPhrase"
                                                align="center"
                                                label="IP地址">
                                        </el-table-column>

                                        <el-table-column
                                                prop="description"
                                                align="center"
                                                label="描述">
                                        </el-table-column>

                                        <el-table-column
                                                prop="isStop"
                                                align="center"
                                                label="状态">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isStop==true"><a>停用</a></span>
                                                <span v-else><a>启用</a></span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="130"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isStop==true">
                                                    <a @click="onPauseBlackList(scope.row.id, false)"><i class="fa fa-play-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <span v-else>
                                                    <a @click="onPauseBlackList(scope.row.id, true)"><i class="fa fa-pause-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <a @click="onEdit(scope.row, 'blacklist')" title="修改"><i class="fa fa-pencil" style="font-size: 15px"></i></a>
                                                <a @click="onDelete(scope.row,'blacklist')" title="删除"><i class="fa fa-trash" style="font-size: 15px"></i></a>

                                            </template>
                                        </el-table-column>


                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange_blacklist"
                                                    @current-change="handleCurrentChange_blacklist"
                                                    :current-page="listQuery_blacklist.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_blacklist.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total_blacklist">
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

        <newRegion  @onChangeStatus="onChangeStatus" v-if="isAddShow_region"/>
        <editRegion @onChangeStatus="onChangeStatus" :currentData="currentData_region" v-if="isEditShow_region"/>

        <addBlacklist  @onChangeStatus="onChangeStatus" v-if="isAddShow_blacklist"/>
        <editBlacklist @onChangeStatus="onChangeStatus" :currentData="currentData_blacklist" v-if="isEditShow_blacklist"/>

    </div>
</template>
<script>
    import newRegion from "./newRegion"
    import editRegion from "./editRegion"
    import addBlacklist from "./addBlacklist"
    import editBlacklist from "./editBlacklist"
    import {mapGetters} from 'vuex';
    import {getBlacklistList,getRegionList,deleteBlacklist,deleteRegion,setBlacklistStatus,stopBlackListAnalyze} from 'api/enDNS/region';
    export default {
        components: {newRegion,editRegion,addBlacklist,editBlacklist},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                regionList:[],
                total_region:0,
                listLoading_region: true,
                currentView_region: null,
                currentData_region: null,
                listQuery_region:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                checkAll_region: false,// 对应全选框是否选中
                checkedItems_region:[],// 被选中的ID列表
                isEditShow_region: false,
                isAddShow_region: false,

                blackList:[],
                total_blacklist:0,
                listLoading_blacklist: true,
                currentView_blacklist: null,
                currentData_blacklist: null,
                listQuery_blacklist:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                checkAll_blacklist: false,// 对应全选框是否选中
                checkedItems_blacklist:[],// 被选中的ID列表
                isEditShow_blacklist: false,
                isAddShow_blacklist: false,

                activeName:'first',
                tobedefined:'',

            }
        },

        created() {
            this.getRegionList();
            this.getBlacklistList();
        },
        methods: {
            isAvailable(row){
                if (row.isUserDefine == true){
                    return 1;
                } else {
                    return 0;
                }
            },

            onChangeStatus() {
                this.isEditShow_blacklist = false;
                this.isAddShow_blacklist = false;
                this.isEditShow_region = false;
                this.isAddShow_region = false;
                this.getRegionList();
                this.getBlacklistList();
            },

            handleSizeChange_region(val) {
                this.listQuery_region.pageSize = val;
                this.getRegionList();
            },
            handleCurrentChange_region(val) {
                this.listQuery_region.currentPage = val;
                this.getRegionList();
            },
            handleSizeChange_blacklist(val) {
                this.listQuery_blacklist.pageSize = val;
                this.getBlacklistList();
            },
            handleCurrentChange_blacklist(val) {
                this.listQuery_blacklist.currentPage = val;
                this.getBlacklistList();
            },

            onAdd(type) {
                if(type == 'blacklist'){
                    this.isAddShow_blacklist = true;
                } else {
                    this.isAddShow_region = true;
                }

            },
            onEdit(row, type) {
                if(type == 'blacklist'){
                    this.currentData_blacklist = row;
                    this.isEditShow_blacklist = true;
                } else {
                    this.currentData_region = row;
                    this.isEditShow_region = true;
                }
            },
            checkBoxAll_region(val) {
                this.checkedItems_region = val;
            },
            checkBoxAll_blacklist(val) {
                this.checkedItems_blacklist = val;
            },

            getRegionList() {
                getRegionList(this.listQuery_region).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.regionList = response.data;
                        this.total_region = response.extend.page.totalHits;
                        this.listQuery_region.currentPage = response.extend.page.currentPage;

                    }
                }).catch((e) => {
                    console.log(e)
                });

                this.checkAll_region = false;// 每次加载数据都清空所有复选框
                this.checkedItems_region = [];

            },

            getBlacklistList() {
                getBlacklistList(this.listQuery_blacklist).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.blackList = response.data;
                        for (let i = 0; i < response.data.length; i++){
                            this.blackList[i].IPPhrase = response.data[i].ipField1 + '-' + response.data[i].ipField2;
                        }
                        this.total_blacklist = response.extend.page.totalHits;
                        this.listQuery_blacklist.currentPage = response.extend.page.currentPage;
                    }
                }).catch((e) => {
                    console.log(e)
                });

                this.checkAll_blacklist = false;// 每次加载数据都清空所有复选框
                this.checkedItems_blacklist = [];

            },
            deleteRegion(param){
                deleteRegion(param).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getRegionList();
                    } else {
                        this.$message({
                            type:'warning',
                            message: response.code.info
                        });
                    }
                });
            },
            deleteBlacklist(param){
                deleteBlacklist(param).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getBlacklistList();
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
                    list.push(data.id);
                    let fwtimeDto = {
                        ids:list.join(',')
                    }
                    if (type=='region'){
                        this.deleteRegion(fwtimeDto);
                    }else if (type=='blacklist'){
                        this.deleteBlacklist(fwtimeDto);
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
                if (type=='blacklist'){
                    checkedItems = this.checkedItems_blacklist;
                }else {
                    checkedItems = this.checkedItems_region;
                }
                if (checkedItems.length == 0){
                    this.$message({
                        type: 'info',
                        message: '请选择要删除的区域管理！'
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
                        newArr.push(row.id);
                    }
                    let dto={
                        ids:newArr.join(',')
                    }
                    if (type=='region'){
                        this.deleteRegion(dto);
                    }else if (type=='blacklist'){
                        this.deleteBlacklist(dto);
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            onPauseBlackList(id, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let Dto = {
                        id: id,
                        isStop:type
                    }
                    if (type == true) {
                        stopBlackListAnalyze(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '关闭成功!'
                                });
                                this.getBlacklistList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        });
                    } else if (type == false) {
                        stopBlackListAnalyze(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '开启成功!'
                                });
                                this.getBlacklistList();
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