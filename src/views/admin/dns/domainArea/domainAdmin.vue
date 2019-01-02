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
                <li class="active">域名管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=" border-top-color: #6cbaf5 !important;">
                        <div class="box-header clude_tab">
                            <h3 class="box-title" id="res_rdp_title">域名管理</h3>
                            <a @click="saveDomain()" style="float: right;margin-top: 17px;margin-right: 50px">
                                <img src="../../../../assets/addIcon/保存.png"  style="width: 18px;height: 18px;margin-right: 10px">保存设置
                            </a>
                        </div>
                        <!-- /.box-header -->

                        <div class="box-body">
                            <div class="row" style="margin-top: 20px;">
                            </div>
                            <el-tabs v-model="activeName" type="border-card" @tab-click="chooseTab">
                                <el-tab-pane label="域名列表" name="first">

                                    <div class="row" style="margin-top: 20px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="domain_table">
                                                &nbsp;
                                                <a title="新建" @click="onAdd('domain')">
                                                    <i class="fa  fa-plus" style="font-size: 16px">新建</i>
                                                </a>
                                                &nbsp;
                                                <a  title="批量删除" @click="onMultiDelete('domain')">
                                                    <i class="fa fa-trash" style="font-size: 16px"> 批量删除</i>
                                                </a>

                                                <a  title="开启智能解析" style="padding-left: 10px" @click="onTurnAutoAnalyze(1, true)">
                                                    <i class="fa fa-check-circle-o" style="font-size: 16px"> 开启智能解析</i>
                                                </a>

                                                <a  title="关闭智能解析" style="padding-left: 10px" @click="onTurnAutoAnalyze(2, false)">
                                                    <i class="fa fa-times-circle-o" style="font-size: 16px"> 关闭智能解析</i>
                                                </a>
                                                &nbsp;
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="domain_filter" class="dataTables_filter" style="margin-right: 53px;float: right">
                                                <input type="text"
                                                       class="form-control"
                                                       placeholder="请输入域名"
                                                       id="searchContent_domain"
                                                       v-model="listQuery_domain.searchContent"
                                                       @keyup.enter="search($event)"
                                                />
                                                <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                                <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                    <button class="btn btn-primary" type="button" @click="getDomainList()" >
                                                        <span>搜索</span>
                                                    </button>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="domainList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="checkBoxAll_domain">
                                        <el-table-column
                                                type="selection"
                                                width="50"
                                                align="center"
                                        >
                                        </el-table-column>

                                        <el-table-column
                                                prop="fullDomainName"
                                                align="center"
                                                show-overflow-tooltip
                                                label="域名">
                                        </el-table-column>

                                        <el-table-column
                                                prop="openRecord"
                                                align="center"
                                                show-overflow-tooltip
                                                label="启用记录">
                                        </el-table-column>

                                        <el-table-column
                                                prop="isStop"
                                                align="center"
                                                label="域名状态">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isStop==true"><a>停用</a></span>
                                                <span v-else><a>启用</a></span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                prop="parseType"
                                                align="center"
                                                label="解析方式">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.parseType==1"><a>智能解析</a></span>
                                                <span v-else><a>非智能解析</a></span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="130"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isStop==true">
                                                    <a @click="onPauseDomain(scope.row.id, false)"><i class="fa fa-play-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <span v-else>
                                                    <a @click="onPauseDomain(scope.row.id, true)"><i class="fa fa-pause-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <a @click="onEdit(scope.row, 'domain')" title="修改"><i class="fa fa-pencil" style="font-size: 15px"></i></a>
                                                <a @click="onDelete(scope.row,'domain')" title="删除" style="margin-right: 8px"><i class="fa fa-trash" style="font-size: 15px"></i></a>
                                            </template>
                                        </el-table-column>
                                        
                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange_domain"
                                                    @current-change="handleCurrentChange_domain"
                                                    :current-page="listQuery_domain.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_domain.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total_domain">
                                            </el-pagination>
                                        </div>
                                    </div>

                                </el-tab-pane>
                                <el-tab-pane label="记录列表" name="second">
                                    <!-- 表单搜索框部分 -->

                                    <div class="query-form">
                                        <el-form :model="listQuery_record" ref="listQuery_record" label-width="180px">

                                            <el-form-item label="关键字" prop="searchContent">
                                                <el-input  v-model="listQuery_record.searchContent" class="el_put" placeholder="请输入查询关键字"></el-input>
                                            </el-form-item>

                                            <el-form-item label="域名" prop="domainName">
                                                <el-select v-model="listQuery_record.fullDomainName" placeholder="请选择" class="el_sel">
                                                    <el-option
                                                            v-for="name in domainNameList"
                                                            :key="name.fullDomainName"
                                                            :label="name.fullDomainName"
                                                            :value="name.fullDomainName">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>

                                            <el-form-item label="记录类型" prop="typeList">

                                                <el-select v-model="listQuery_record1.typeList" multiple placeholder="请选择" class="el_sel">
                                                    <el-option label="A记录" value="A" ></el-option>
                                                    <el-option label="AAAA记录" value="AAAA" ></el-option>
                                                    <el-option label="CNAME记录" value="CNAME" ></el-option>
                                                    <el-option label="MX记录" value="MX" ></el-option>
                                                    <el-option label="NS记录" value="NS" ></el-option>
                                                    <el-option label="PTR记录" value="PTR" ></el-option>
                                                    <el-option label="TXT记录" value="TXT" ></el-option>
                                                </el-select>
                                                <a>(可多选)</a>

                                            </el-form-item>

                                            <el-form-item label="线路范围" prop="lineList">
                                                <el-select v-model="listQuery_record1.lineList" multiple placeholder="请选择" class="el_sel">
                                                    <el-option
                                                            v-for="line in lineNameList"
                                                            :key="line.chName"
                                                            :label="line.chName"
                                                            :value="line.chName">
                                                    </el-option>
                                                </el-select>
                                                <a>(可多选)</a>
                                            </el-form-item>
                                        </el-form>

                                        <div class='form-footer' slot="footer" style="height:50px;">
                                            <div style="margin-top: 10px;margin-left: 200px;">
                                                <el-button size="small" style="background-color: #2b7de2;color: #ffffff;" @click="query('listQuery_record, listQuery_record1')">查询</el-button>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="row" style="margin-bottom:8px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="record_table">
                                                &nbsp;
                                                <a title="新建" @click="onAdd('record')">
                                                    <i class="fa  fa-plus">新建</i>
                                                </a>
                                                &nbsp;
                                                <a  title="批量删除" @click="onMultiDelete('record')">
                                                    <i class="fa fa-trash" > 批量删除</i>
                                                </a>
                                                &nbsp;
                                            </div>
                                        </div>

                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="cordList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="checkBoxAll_record">
                                        <el-table-column
                                                type="selection"
                                                width="50"
                                                align="center"
                                        >
                                        </el-table-column>

                                        <el-table-column
                                                prop="recordName"
                                                align="center"
                                                show-overflow-tooltip
                                                label="主机记录">
                                        </el-table-column>

                                        <el-table-column
                                                prop="fullDomainName"
                                                align="center"
                                                show-overflow-tooltip
                                                label="域名">
                                        </el-table-column>

                                        <el-table-column
                                                prop="ttlSec"
                                                align="center"
                                                label="TTL">
                                        </el-table-column>

                                        <el-table-column
                                                prop="recordType"
                                                align="center"
                                                label="类型">
                                        </el-table-column>

                                        <el-table-column
                                                prop="priority"
                                                align="center"
                                                label="MX优先级">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.priority=='mx'">{{scope.row.priority}}</span>
                                                <span v-else>无</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                prop="recordValue"
                                                align="center"
                                                show-overflow-tooltip
                                                label="记录值">
                                        </el-table-column>

                                        <el-table-column
                                                prop="dnsLineChName"
                                                align="center"
                                                label="线路">
                                        </el-table-column>

                                        <el-table-column
                                                prop="checkMethod"
                                                align="center"
                                                label="检查方式">
                                        </el-table-column>

                                        <el-table-column
                                                prop="status"
                                                align="center"
                                                label="状态">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.status==0"><a>启用</a></span>
                                                <span v-else-if="scope.row.status==1"><a>停用</a></span>
                                                <span v-else><a>检测中</a></span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="130"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isStop==true">
                                                    <a @click="onPauseRecord(scope.row.id, false)"><i class="fa fa-play-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <span v-else>
                                                    <a @click="onPauseRecord(scope.row.id, true)"><i class="fa fa-pause-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <a @click="onEdit(scope.row, 'record')" title="修改"><i class="fa fa-pencil" style="font-size: 15px"></i></a>
                                                <a @click="onDelete(scope.row,'record')" title="删除" style="margin-right: 8px"><i class="fa fa-trash" style="font-size: 15px"></i></a>

                                            </template>
                                        </el-table-column>


                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange_record"
                                                    @current-change="handleCurrentChange_record"
                                                    :current-page="listQuery_record.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_record.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total_record">
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

        <addDomain  @onChangeStatus="onChangeStatus" v-if="isAddShow_domain"/>

        <addRecord  @onChangeStatus="onChangeStatus" v-if="isAddShow_record"/>
        <editRecordList @onChangeStatus="onChangeStatus" :currentData="currentData_record" v-if="isEditShow_record"/>

    </div>
</template>
<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import addDomain from "./addDomain"
    import addRecord from "./addRecord"
    import editRecordList from "./editRecordList.vue"
    import {mapGetters} from 'vuex';
    import {getLineNameList} from 'api/enDNS/line';
    import {getRecordListForAll,getDomainList,getDomainNameList,deleteRecord,deleteDomain,setAutoAnalyzeStatus,queryRecord,setDomainStatus,setRecordStatus,stopAnalyze,stopRecordAnalyze,restartRedns} from 'api/enDNS/domainAdmin';
    export default {
        components: {addDomain,addRecord,editRecordList},
        data() {


            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                domainList:[],
                total_domain:0,
                listLoading_domain: true,
                currentView_domain: null,
                currentData_domain: null,
                listQuery_domain:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                checkAll_domain: false,// 对应全选框是否选中
                checkedItems_domain:[],// 被选中的ID列表
                isAddShow_domain: false,

                recordList:[],
                cordList:[],
                total_record:0,
                listLoading_record: true,
                currentView_record: null,
                currentData_record: null,
                listQuery_record:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:"",
                    fullDomainName:''
                },
                listQuery_record1:{
                    typeList:[],
                    lineList:[]
                },
                checkAll_record: false,// 对应全选框是否选中
                checkedItems_record:[],// 被选中的ID列表
                isEditShow_record: false,
                isAddShow_record: false,

                activeName:'first',
                domainNameList:[],
                lineList:[],
                lineNameList:[]
            }
        },
        
        created() {
            this.readOnly = isReadonly(this.pageId);
            this.getDomainList();
            this.getRecordList();
            this.getDomainNameList();
            this.getLineNameList();
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
            getLineNameList(){
                getLineNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.lineNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });

            },
            getDomainNameList(){
                getDomainNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.domainNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            handleClose() {
                this.changeStatus();
            },
            onChangeStatus() {
                this.isEditShow_record = false;
                this.isAddShow_record = false;
                this.isAddShow_domain = false;
                this.getDomainList();
                this.getRecordList();
            },

            handleSizeChange_domain(val) {
                this.listQuery_domain.pageSize = val;
                this.getDomainList();
            },
            handleCurrentChange_domain(val) {
                this.listQuery_domain.currentPage = val;
                this.getDomainList();
            },
            handleSizeChange_record(val) {
                this.listQuery_record.pageSize = val;
                this.getRecordList();
            },
            handleCurrentChange_record(val) {
                this.listQuery_record.currentPage = val;
                this.getRecordList();
            },

            onAdd(type) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'record'){
                        this.isAddShow_record = true;
                    } else {
                        this.isAddShow_domain = true;
                    }
                }
            },
            onEdit(row, type) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'record'){
                        this.currentData_record = row;
                        this.isEditShow_record = true;
                    } else {
                        delete window.sessionStorage.domanid;
                        window.sessionStorage.domanid = row.id;
                        this.currentData_domain = row;
                        this.$router.push({path: '/admin/quicklyAddRecord'});
                        console.log('currentData_domain',this.currentData_domain,type)
                    }
                }
            },
            checkBoxAll_domain(val) {
                this.checkedItems_domain = val;
            },
            checkBoxAll_record(val) {
                this.checkedItems_record = val;
            },

            getDomainList() {
                getDomainList(this.listQuery_domain).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.domainList = response.data;
                        console.log('domainList:', this.domainList);
                        this.total_domain = response.extend.page.totalHits;
                        this.listQuery_domain.currentPage = response.extend.page.currentPage;
                    }
                }).catch((e) => {
                    console.log(e)
                });

                this.checkAll_domain = false;// 每次加载数据都清空所有复选框
                this.checkedItems_domain = [];

            },

            getRecordList() {
                getRecordListForAll(this.listQuery_record, this.listQuery_record1).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.cordList = response.data;
                        for(let i = 0; i < this.cordList.length; i++){
                            if(this.cordList[i].recordType == 1){
                                this.cordList[i].recordType = 'A记录'
                            } else if(this.cordList[i].recordType == 2){
                                this.cordList[i].recordType = 'NS记录'
                            } else if(this.cordList[i].recordType == 3){
                                this.cordList[i].recordType = 'AAAA记录'
                            } else if(this.cordList[i].recordType == 4){
                                this.cordList[i].recordType = 'PTR记录'
                            } else if(this.cordList[i].recordType == 5){
                                this.cordList[i].recordType = 'CNAME记录'
                            } else if(this.cordList[i].recordType == 6){
                                this.cordList[i].recordType = 'MX记录'
                            } else if(this.cordList[i].recordType == 7){
                                this.cordList[i].recordType = 'TXT记录'
                            }
                            if(this.cordList[i].checkMethod == 'NOCHECK'){
                                this.cordList[i].checkMethod = '无'
                            } else if(this.cordList[i].checkMethod == 'PING'){
                                this.cordList[i].checkMethod = 'Ping'
                            } else if(this.cordList[i].checkMethod == 'TELNET'){
                                this.cordList[i].checkMethod = 'Telnet'
                            }
                        }
                        this.total_record = response.extend.page.totalHits;
                        this.listQuery_record.currentPage = response.extend.page.currentPage;
                    }
                }).catch((e) => {
                    console.log(e)
                });

                this.checkAll_record = false;// 每次加载数据都清空所有复选框
                this.checkedItems_record = [];

            },
            deleteDomain(param){
                deleteDomain(param).then(response => {
                    if (response.status == 'SUCCESS') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getDomainList();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.code.info
                        });
                    }
                });
            },
            deleteRecord(param){
                deleteRecord(param).then(response => {
                    if (response.status == 'SUCCESS') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getRecordList();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.code.info
                        });
                    }
                });
            },
            onDelete(data,type) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.$confirm('确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let list = [];
                        list.push(data.id);
                        let fwtimeDto = {
                            ids: list.join(',')
                        }
                        if (type == 'domain') {
                            this.deleteDomain(fwtimeDto);
                        } else if (type == 'record') {
                            this.deleteRecord(fwtimeDto);
                        }
                    }).catch(() => {    // 取消事件
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },


            onMultiDelete(type) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var checkedItems;
                    if (type == 'record') {
                        checkedItems = this.checkedItems_record;
                    } else {
                        checkedItems = this.checkedItems_domain;
                    }
                    if (checkedItems.length == 0) {
                        this.$message({
                            type: 'info',
                            message: '请选择要删除的域名管理！'
                        });
                        return;
                    }

                    this.$confirm('确认删除' + checkedItems.length + '项?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let newArr = [];
                        for (let i = 0; i < checkedItems.length; i++) {
                            let row = checkedItems[i];
                            newArr.push(row.id);
                        }
                        let dto = {
                            ids: newArr.join(',')
                        }
                        if (type == 'domain') {
                            this.deleteDomain(dto);
                        } else if (type == 'record') {
                            this.deleteRecord(dto);
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },

            chooseTab(tab, event) {
                console.log(tab, event,'--tab');
            },


            onTurnAutoAnalyze(param, bool){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.checkedItems_domain.length == 0) {
                        this.$message({
                            type: 'info',
                            message: '请选择要删除的域名！'
                        });
                        return;
                    }
                    var newArr = [];
                    for (let i = 0; i < this.checkedItems_domain.length; i++) {

                        newArr.push(this.checkedItems_domain[i].id)
                    }
                    let id = newArr.join(',')
                    let dto = {
                        ids: id,
                        parseType: param
                    };

                    setAutoAnalyzeStatus(dto).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: (bool ? '开启' : '关闭') + '智能解析成功!'
                            });
                                this.getDomainList();
                                this.getRecordList();
                        } else {
                            this.$message({
                                type: 'error',
                                message: (bool ? '开启' : '关闭') + '智能解析失败!'
                            });
                        }
                    }).catch(() => {

                    });
                }
            },

            query(formName) {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.getRecordList();
                }
            },

            onPauseDomain(id, type){
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
                            stopAnalyze(Dto).then(response => {
                                if (response.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '关闭成功!'
                                    });
                                    this.getDomainList();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '关闭失败!'
                                    });
                                }
                            });
                        } else if (type == false) {
                            stopAnalyze(Dto).then(response => {
                                if (response.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '开启成功!'
                                    });
                                    this.getDomainList();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '开启失败!'
                                    });
                                }
                            });
                        }
                }
            },
            onPauseRecord(id, type){
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
                        stopRecordAnalyze(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '关闭成功!'
                                });
                                this.getRecordList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '关闭失败!'
                                });
                            }
                        });
                    } else if (type == false) {
                        stopRecordAnalyze(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '开启成功!'
                                });
                                this.getRecordList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '开启失败!'
                                });
                            }
                        });
                    }
                }
            }
        }
    }

</script>
<style>


</style>
<style scoped>
    .query-form .el_put {
        position: relative;
        display: inline-block;
        width: 40%!important; ;
        margin-left: 20px;
    }

    .query-form .el_sel {
        width: 40%!important; ;
        margin-left: 20px;
    }
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