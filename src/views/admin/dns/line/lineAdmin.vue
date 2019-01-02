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
                <li class="active">线路管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=" border-top-color: #6cbaf5 !important;">
                        <div class="box-header clude_tab">
                            <h3 class="box-title" id="res_rdp_title">线路管理</h3>
                        </div>
                        <!-- /.box-header -->

                        <div class="box-body">
                            <div class="row" style="margin-top: 20px;">
                            </div>
                            <el-tabs v-model="activeName" type="border-card">
                                <el-tab-pane label="线路列表" name="first">

                                    <div class="row" style="margin-bottom:8px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="line_table">
                                                &nbsp;
                                                <a title="新建" @click="onAdd('line')">
                                                    <i class="fa  fa-plus">新建</i>
                                                </a>
                                                &nbsp;

                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="line_filter" class="dataTables_filter" style="margin-right: 53px;float: right">
                                                <input type="text"
                                                       class="form-control"
                                                       placeholder="请输入线路名称"
                                                       id="searchContent_line"
                                                       v-model="listQuery_line.searchContent"
                                                       @keyup.enter="search($event)"
                                                />
                                                <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                                <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                    <button class="btn btn-primary" type="button" @click="getLineList()" >
                                                        <span>搜索</span>
                                                    </button>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="lineList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%">

                                        <el-table-column
                                                prop="chName"
                                                align="center"
                                                label="线路名称">
                                        </el-table-column>

                                        <el-table-column
                                                prop="description"
                                                show-overflow-tooltip
                                                align="center"
                                                label="描述">
                                        </el-table-column>

                                        <el-table-column
                                                prop="ipCount"
                                                align="center"
                                                label="线路内IP数量">
                                        </el-table-column>

                                        <el-table-column
                                                prop=""
                                                align="center"
                                                label="状态">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isStop==false"><a>启用</a></span>
                                                <span v-else><a>停用</a></span>
                                            </template>
                                        </el-table-column>


                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="180"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isUserDefine == true">
                                                    <a @click="onUpLine(scope.row, true, 'line')" title="上移"><i class="fa fa-arrow-circle-o-up" style="font-size: 18px"></i></a>
                                                    <a @click="onUpLine(scope.row, false, 'line')" title="下移"><i class="fa fa-arrow-circle-o-down" style="font-size: 18px"></i></a>
                                                    <span v-if="scope.row.isStop==true">
                                                    <a @click="onPauseLine(scope.row.id, false)" ><i class="fa fa-play-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <span v-else>
                                                    <a @click="onPauseLine(scope.row.id, true)" ><i class="fa fa-pause-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                    <a @click="onEdit(scope.row, 'line')" title="修改"><i class="fa fa-pencil" style="font-size: 15px"></i></a>
                                                    <a @click="onDelete(scope.row, 'line')" title="删除"><i class="fa fa-trash" style="font-size: 15px"></i></a>
                                                    <span v-if="scope.row.ipCount != 0">
                                                        <!--<a @click="onClean(scope.row)" title="清空" style="margin-right: 8px"><i class="fa fa-times-circle-o"></i></a>-->
                                                        <a @click="onClean(scope.row)" title="清空"><img src="../../../../assets/addIcon/清空.png" style="width: 13px;height: 16px;margin-bottom: 5px"></a>
                                                    </span>
                                                </span>

                                                <span v-if="!scope.row.isDefault && !scope.row.isUserDefine">
                                                    <a @click="onUpLine(scope.row, true)" title="上移"><i class="fa fa-arrow-circle-o-up" style="font-size: 18px"></i></a>
                                                    <a @click="onUpLine(scope.row, false)" title="下移"><i class="fa fa-arrow-circle-o-down" style="font-size: 18px"></i></a>
                                                </span>
                                            </template>
                                        </el-table-column>

                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange_line"
                                                    @current-change="handleCurrentChange_line"
                                                    :current-page="listQuery_line.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_line.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total_line">
                                            </el-pagination>
                                        </div>
                                    </div>

                                </el-tab-pane>
                                <el-tab-pane label="地址列表" name="second">
                                    <!-- 表单搜索框部分 -->

                                    <div class="row" style="margin-top: 20px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="address_table">
                                                &nbsp;
                                                <a title="新建" @click="onAdd('address')">
                                                    <i class="fa  fa-plus">新建</i>
                                                </a>
                                                &nbsp;
                                                <a  title="批量删除" @click="onMultiDelete()">
                                                    <i class="fa fa-trash" > 批量删除</i>
                                                </a>
                                                &nbsp;
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="address_filter" class="dataTables_filter" style="margin-right: 53px;float: right">
                                                <input type="text"
                                                       class="form-control"
                                                       placeholder="请输入地址"
                                                       id="searchContent_address"
                                                       v-model="listQuery_address.searchContent"
                                                       @keyup.enter="search($event)"
                                                />
                                                <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                                <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                <button class="btn btn-primary" type="button" @click="getAddressList()" >
                                                    <span>搜索</span>
                                                </button>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="addressList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="checkBoxAll_address">
                                        <el-table-column
                                                type="selection"
                                                width="50"
                                                align="center"
                                        >
                                        </el-table-column>

                                        <el-table-column
                                                prop="lineCHName"
                                                align="center"
                                                label="线路名称">
                                        </el-table-column>

                                        <el-table-column
                                                prop="IPPhrase"
                                                align="center"
                                                show-overflow-tooltip
                                                label="IP地址段">
                                        </el-table-column>

                                        <el-table-column
                                                prop="areaName"
                                                align="center"
                                                label="区域">
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
                                                prop="description"
                                                align="center"
                                                show-overflow-tooltip
                                                label="描述">
                                        </el-table-column>


                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="130"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isStop==true">
                                                    <a @click="onPauseAddress(scope.row.id, false, 'address')"><i class="fa fa-play-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <span v-else>
                                                    <a @click="onPauseAddress(scope.row.id, true, 'address')"><i class="fa fa-pause-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <span v-if="scope.row.isShield == true">
                                                    <a @click="onBan_address(scope.row)" title="禁用"><i class="fa fa-ban" style="font-size: 18px"></i></a>
                                                </span>
                                                <span  v-else>
                                                    <a @click="onBan_address(scope.row)" title="使用"><i class="fa fa-check-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <a @click="onEdit(scope.row, 'address')" title="修改"><i class="fa fa-pencil" style="font-size: 15px"></i></a>
                                                <a @click="onDelete(scope.row,'address')" title="删除"><i class="fa fa-trash" style="font-size: 15px"></i></a>

                                            </template>
                                        </el-table-column>


                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange_address"
                                                    @current-change="handleCurrentChange_address"
                                                    :current-page="listQuery_address.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_address.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total_address">
                                            </el-pagination>
                                        </div>
                                    </div>

                                </el-tab-pane>
                                <el-tab-pane label="地址池列表" name="third">
                                    <div class="row" style="margin-top: 20px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="pool_table">
                                                &nbsp;
                                                <a title="新建" @click="onAdd('pool')">
                                                    <i class="fa  fa-plus">新建</i>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div id="pool_filter" class="dataTables_filter" style="margin-right: 53px;float: right">
                                                <input type="text"
                                                       class="form-control"
                                                       placeholder="请输入地址"
                                                       id="searchContent_pool"
                                                       v-model="listQuery_pool.searchContent"
                                                       @keyup.enter="search($event)"
                                                />
                                                <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                                <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                <button class="btn btn-primary" type="button" @click="getPoolList()" >
                                                    <span>搜索</span>
                                                </button>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="poolList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            >
                                        <el-table-column
                                                prop="chName"
                                                align="center"
                                                label="线路池名"
                                                width="180"
                                        >
                                        </el-table-column>

                                        <el-table-column
                                                prop="cludeLine"
                                                align="center"
                                                label="包括线路"
                                                show-overflow-tooltip>
                                        </el-table-column>

                                        <el-table-column
                                                prop="remarks"
                                                align="center"
                                                width="180"
                                                show-overflow-tooltip
                                                label="描述">
                                        </el-table-column>


                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="130"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a @click="onEdit(scope.row, 'pool')" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                <a @click="onDelete(scope.row,'pool')" title="删除" style="margin-right: 8px"><i class="fa fa-trash"></i></a>

                                            </template>
                                        </el-table-column>


                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange_pool"
                                                    @current-change="handleCurrentChange_pool"
                                                    :current-page="listQuery_pool.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_pool.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total_pool">
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

        <addLine  @onChangeStatus="onChangeStatus" v-if="isAddShow_line"/>
        <editLine @onChangeStatus="onChangeStatus" :currentData="currentData_line" v-if="isEditShow_line"/>

        <addAddress  @onChangeStatus="onChangeStatus" v-if="isAddShow_address"/>
        <editAddress @onChangeStatus="onChangeStatus" :currentData="currentData_address" v-if="isEditShow_address"/>

        <addPool  @onChangeStatus="onChangeStatus" v-if="isAddShow_pool"/>
        <editPool @onChangeStatus="onChangeStatus" :currentData="currentData_pool" v-if="isEditShow_pool"/>

    </div>
</template>
<script>
    import addLine from "./addLine"
    import editLine from "./editLine"
    import addAddress from "./addAddress"
    import editAddress from "./editAddress"
    import addPool from './addPool.vue'
    import editPool from './editPool.vue'
    import {mapGetters} from 'vuex';
    import {getAddressList,getLineList,deleteAddress,deleteLine,setLineStatus,setAddressShieldStatus,setLinePriority,stopLineAnalyze,stopLineStatus,getPoolList,deletePool,upOrDown,cleanIpCount} from 'api/enDNS/line';
    export default {
        components: {addLine,editLine,addAddress,editAddress,addPool,editPool},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                lineList:[],
                total_line:0,
                listLoading_line: true,
                currentView_line: null,
                currentData_line: null,
                listQuery_line:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                checkAll_line: false,// 对应全选框是否选中
                isEditShow_line: false,
                isAddShow_line: false,

                addressList:[],
                total_address:0,
                listLoading_address: true,
                currentView_address: null,
                currentData_address: null,
                listQuery_address:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                checkAll_address: false,// 对应全选框是否选中
                checkedItems_address:[],// 被选中的ID列表
                isEditShow_address: false,
                isAddShow_address: false,

                listQuery_pool:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                poolList:[],
                total_pool:0,
                currentView_pool: null,
                currentData_pool: null,
                checkAll_pool: false,// 对应全选框是否选中
                isEditShow_pool: false,
                isAddShow_pool: false,

                activeName:'first',
            }
        },

        created() {
            this.getLineList();
            this.getAddressList();
            this.getPoolList();
        },
        methods: {
            handleClose() {
                this.changeStatus();
            },
            onChangeStatus() {
                this.isEditShow_address = false;
                this.isAddShow_address = false;
                this.isEditShow_line = false;
                this.isAddShow_line = false;
                this.isEditShow_pool = false;
                this.isAddShow_pool = false;
                this.getLineList();
                this.getAddressList();
                this.getPoolList();
            },

            handleSizeChange_line(val) {
                this.listQuery_line.pageSize = val;
                this.getLineList();
            },
            handleCurrentChange_line(val) {
                this.listQuery_line.currentPage = val;
                this.getLineList();
            },
            handleSizeChange_address(val) {
                this.listQuery_address.pageSize = val;
                this.getAddressList();
            },
            handleCurrentChange_address(val) {
                this.listQuery_address.currentPage = val;
                this.getAddressList();
            },
            handleSizeChange_pool(val) {
                this.listQuery_pool.pageSize = val;
                this.getPoolList();
            },
            handleCurrentChange_pool(val) {
                this.listQuery_pool.currentPage = val;
                this.getPoolList();
            },
            onAdd(type) {
                if(type == 'address'){
                    this.isAddShow_address = true;
                } else if(type == 'line'){
                    this.isAddShow_line = true;
                } else {
                    this.isAddShow_pool = true;
                }
            },
            onEdit(row, type) {
                if(type == 'address'){
                    this.currentData_address = row;
                    this.isEditShow_address = true;
                } else if(type == 'line'){
                    this.currentData_line = row;
                    this.isEditShow_line = true;
                } else {
                    this.currentData_pool = row;
                    this.isEditShow_pool = true;
                }
            },

            checkBoxAll_address(val) {
                this.checkedItems_address = val;
            },

            getLineList() {
                getLineList(this.listQuery_line).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.lineList = response.data;
                        this.total_line = response.extend.page.totalHits;
                        this.listQuery_line.currentPage = response.extend.page.currentPage;

                    }
                }).catch((e) => {
                    console.log(e)
                });

                this.checkAll_line = false;// 每次加载数据都清空所有复选框

            },

            getAddressList() {
                getAddressList(this.listQuery_address).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.addressList = response.data;
                        for (let i = 0; i < response.data.length; i++){
                            this.addressList[i].IPPhrase = response.data[i].ipField1 + '-' + response.data[i].ipField2;
                        }
                        this.total_address = response.extend.page.totalHits;
                        this.listQuery_address.currentPage = response.extend.page.currentPage;

                    }
                }).catch((e) => {
                    console.log(e)
                });

                this.checkAll_address = false;// 每次加载数据都清空所有复选框
                this.checkedItems_address = [];

            },
            getPoolList(){
                getPoolList(this.listQuery_pool).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.poolList = response.data;
                        for (let i = 0; i < this.poolList.length; i++){
                            let nameList = []
                            for (let j = 0; j < this.poolList[i].lineList.length; j++){
                                nameList.push(this.poolList[i].lineList[j].chName);
                            }
                            this.poolList[i].cludeLine =  nameList.join('\n')
                            console.log('cludeLine:', this.poolList[i].cludeLine);
                        }

                        this.total_pool = response.extend.page.totalHits;
                        this.listQuery_pool.currentPage = response.extend.page.currentPage;

                    }
                }).catch((e) => {
                    console.log(e)
                });

                this.checkAll_pool = false;// 每次加载数据都清空所有复选框
            },
            deleteAddress(param){
                deleteAddress(param).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getAddressList();
                    } else {
                        this.$message({
                            type:'warning',
                            message: response.code.info
                        });
                    }
                });
            },
            deleteLine(param){
                deleteLine(param).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getLineList();
                    } else {
                        this.$message({
                            type:'warning',
                            message: response.code.info
                        });
                    }
                });
            },
            deletePool(param){
                deletePool(param).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getPoolList();
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
                    if (type=='line'){
                        this.deleteLine(fwtimeDto);
                    }else if (type=='address'){
                        this.deleteAddress(fwtimeDto);
                    } else if(type == 'pool'){
                        this.deletePool(fwtimeDto);
                    }
                }).catch(() => {    // 取消事件
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },


            onMultiDelete() {
                var checkedItems;
                checkedItems = this.checkedItems_address;
                if (checkedItems.length == 0){
                    this.$message({
                        type: 'info',
                        message: '请选择要删除的线路管理！'
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
                        this.deleteAddress(dto);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            onBanAddress(id){
                var dto = {id:id,status:'ban'};
                this.changeAddressStatus(dto,'禁用');
            },

            changeAddressStatus(dto,action){
                setAddressStatus(dto).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: action+'成功!'
                        });
                        this.getAddressList();
                    } else {
                        this.$message({
                            type:'warning',
                            message: response.code.info
                        });
                    }
                });
            },

            changeLineStatus(dto,action){
                setLineStatus(dto).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: action+'成功!'
                        });
                        this.getLineList();
                    } else {
                        this.$message({
                            type:'warning',
                            message: response.code.info
                        });
                    }
                });
            },
            onClean(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    cleanIpCount({id: row.id}).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '清除成功!'
                            });
                            this.getLineList();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: response.code.info
                            });
                        }
                    });
                }
            },
            onUpLine(row, result){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var dto = {
                        id: row.id,
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
                            this.getLineList();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: response.code.info
                            });
                        }
                    });
                }
            },
            onPauseLine(id, type){
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
                        stopLineStatus(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '关闭成功!'
                                });
                                this.getLineList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        });
                    } else if (type == false) {
                        stopLineStatus(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '开启成功!'
                                });
                                this.getLineList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        });
                    }
                }
            },
            onPauseAddress(id, type){
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
                        stopLineAnalyze(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '关闭成功!'
                                });
                                this.getLineList();
                                this.getAddressList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        });
                    } else if (type == false) {
                        stopLineAnalyze(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '开启成功!'
                                });
                                this.getAddressList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        });
                    }
                }
            },
            onBan_address(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let Dto = {
                        id: row.id,
                        isShield:!row.isShield
                    }
                    var messageInfo;
                    var failInfo;
                    if(row.isShield){
                        messageInfo = '屏蔽关闭成功!'
                        failInfo = '屏蔽关闭失败!'
                    } else {
                        messageInfo = '屏蔽开启成功!'
                        failInfo = '屏蔽开启失败!'
                    }
                        setAddressShieldStatus(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: messageInfo
                                });
                                this.getAddressList();
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