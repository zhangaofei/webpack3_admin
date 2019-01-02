<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i> 防火墙</a></li>
                <li class="active">源地址转换</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" >
                        <div class="box-header">
                            <h3 class="box-title" id="res_rdp_title">源地址转换</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                <el-col :span="15" style="margin-left: 10px;" id="example1_length">
                                    &nbsp;
                                    <a class="function_btn_main" title="新建" @click="onAdd()">
                                        <i class="fa  fa-plus"> 新建</i>
                                    </a>
                                    <a class="function_btn_main" title="批量删除" @click="onMultiDelete()">
                                        <i class="fa fa-trash" > 批量删除</i>
                                    </a>
                                    <a class="function_btn_main" title="上移" @click="onUp()">
                                        <i class="fa fa-arrow-up" > 上移</i>
                                    </a>
                                    <a class="function_btn_main" title="下移" @click="onDown()">
                                        <i class="fa fa-arrow-down" > 下移</i>
                                    </a>
                                </el-col>
                                <el-col :span="8" style="margin-right: 16px; float: right;">
                                    <SearchBox
                                            width="60px"
                                            searchBoxId="example1_filter"
                                            inputBoxId="searchContent"
                                            placeholder="请输入关键字"
                                            @search="search"
                                            @onClickSearchButton="getList"></SearchBox>
                                </el-col>
                                <!--<div class="col-sm-6">-->
                                    <!--<div id="example1_filter" class="dataTables_filter" style="margin-right:53px;float: right">-->
                                        <!--<input type="text"-->
                                               <!--class="form-control"-->
                                               <!--placeholder="请输入关键字"-->
                                               <!--id="searchContent"-->
                                               <!--v-model="listQuery.searchContent"-->
                                               <!--@keyup.enter="search($event)"-->
                                        <!--/>-->
                                        <!--<span class="glyphicon glyphicon-search serch_head_icon"></span>-->
                                        <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                                <!--<button class="btn btn-primary" type="button" @click="getList()" >-->
                                                    <!--<span>搜索</span>-->
                                                <!--</button>-->
                                        <!--</span>-->
                                    <!--</div>-->

                                <!--</div>-->
                            </div>
                            <el-table
                                    ref="multipleTable"
                                    :data="list"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="checkBoxAll">
                                <el-table-column
                                        type="selection"
                                        width="50"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        align="center"
                                        label="名称">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="源地址"
                                        :formatter="sipFormatter">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="目的地址"
                                        :formatter="dipFormatter">
                                </el-table-column>
                                <el-table-column
                                        prop="srcServiceInfo.name"
                                        align="center"
                                        label="源服务"
                                        >
                                </el-table-column>
                                <el-table-column
                                        prop="desServiceInfo.name"
                                        align="center"
                                        label="目的服务"
                                        >
                                </el-table-column>
                                <el-table-column
                                        prop="ethOut"
                                        align="center"
                                        label="流出接口"
                                        >
                                    <template slot-scope="scope">
                                        {{scope.row.ethOut=="all"?"任何":scope.row.ethOut}}
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        prop="tranIp"
                                        align="center"
                                        label="源地址转换为">
                                    <template slot-scope="scope">
                                        {{scope.row.tranIp==null?"":scope.row.tranIp}}
                                    </template>
                                </el-table-column>
                                <el-table-column  align="center" label="状态" width="80">
                                    <template slot-scope="scope">
                                    <span v-if="scope.row.state=='on'">
                                        <div><img src="../../../../assets/addIcon/连通.png" style="width: 18px;height: 18px;border-radius: 50%"></div>
                                    </span>
                                        <span v-else>
                                            <div><img src="../../../../assets/addIcon/断开.png" style="width: 18px;height: 18px;border-radius: 50%"></div>
                                        </span>
                                    </template>
                                </el-table-column>


                                <el-table-column
                                        align="center"
                                        label="操作"
                                        width="130"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a @click="onEdit(scope.row)" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                        <a @click="onDelete(scope.row)" title="删除" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                        <a @click="onCheck(scope.row)" title="查看" ><i class="fa fa-eye" ></i></a>
                                    </template>
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
                                            :total="total">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <add  @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <edit @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <check @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isLookShow"/>
    </div>
</template>
<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import add from "./add"
    import edit from "./edit"
    import check from "./check"
    import {mapGetters} from 'vuex';
    import {getSnatList, deleteSnat,sortSnat} from 'api/firewall/snat';
    import SearchBox from '@/views/components/searchBox.vue';
    export default {
        components: {add, edit,check, SearchBox},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:63,
                list:[],
                total: null,
                listLoading: true,
                currentView: null,
                currentData: null,
                listQuery:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                checkAll: false,// 对应全选框是否选中
                checkedItems:[],// 被选中的ID列表
                isEditShow: false,
                isAddShow: false,
                isLookShow:false,
            }
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        methods: {
            search(event, keyword){
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                if (event.keyCode == 13) {
                    if (this.listQuery.searchContent != null) {
                        this.getList();
                    }
                }
            },
            onChangeStatus() {
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.getList();
            },
            onAdd() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isAddShow = true;
                }
            },
            onEdit(row) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    this.isEditShow = true;
                }
            },
            onCheck(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    this.isLookShow = true;
                }
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
            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                getSnatList(this.listQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.list = response.data;
                        this.total = response.extend.page.totalHits;
                        this.listQuery.currentPage = response.extend.page.currentPage;

                    }
                }).catch((e) => {
                    console.log(e)
                });
                this.checkAll = false;// 每次加载数据都清空所有复选框
                this.checkedItems = [];
            },
            checkBoxAll(val) {
                this.checkedItems = val;
            },
            onDelete(data) {
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
                        deleteSnat(fwtimeDto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getList();
                            } else {
//                            this.$message({
//                                type:'warning',
//                                message:'删除失败!'+codeMessage(response.code)
//                            });
                            }
                        })
                    }).catch(() => {    // 取消事件

                    });
                }
            },

            onUp(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.checkedItems.length == 0) { // 如果没有一项被选中则弹窗提示
                        this.$message({
                            type: 'warning',
                            message: '请选择要上移的源地址转换！'
                        });
                        return;
                    } else if (this.checkedItems.length > 1) { //不允许多选
                        this.$message({
                            type: 'warning',
                            message: '移动操作不可多选'
                        });
                        return;
                    } else {
                        let row = this.checkedItems[0];
                        var rowIndex = this.list.indexOf(row);
                        if (row.state == '0') {
                            this.$message({
                                type: 'warning',
                                message: '停用状态源地址转换不可更改优先级'
                            });
                            return;
                        } else {
                            var dto = {
                                id: row.id,
                                direction: "up"
                            };
                            sortSnat(dto).then(response => {
                                if (response.status == 'SUCCESS') {
                                    if (response.data == "up-already") {
                                        this.$message({
                                            type: 'warning',
                                            message: '当前源地址转换已经置顶!'
                                        });
                                    } else if (response.data == "down-already") {
                                        this.$message({
                                            type: 'warning',
                                            message: '当前源地址转换已经置底!'
                                        });
                                    } else {
                                        this.$message({
                                            type: 'success',
                                            message: '更改优先级成功!'
                                        });
                                        this.getList();
                                    }

                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '更改优先级失败'
                                    });
                                }
                            });

                        }
                    }
                }
            },
            onDown(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.checkedItems.length == 0) { // 如果没有一项被选中则弹窗提示
                        this.$message({
                            type: 'warning',
                            message: '请选择要下移的源地址转换！'
                        });
                        return;
                    } else if (this.checkedItems.length > 1) { //不允许多选
                        this.$message({
                            type: 'warning',
                            message: '移动操作不可多选'
                        });
                        return;
                    } else {
                        let row = this.checkedItems[0];
                        var rowIndex = this.list.indexOf(row);
                        if (row.state == '0') {
                            this.$message({
                                type: 'warning',
                                message: '停用状态源地址转换不可更改优先级'
                            });
                            return;
                        } else {
                            sortSnat({id: row.id, direction: "down"}).then(response => {
                                if (response.status == 'SUCCESS') {
                                    if (response.data == "up-already") {
                                        this.$message({
                                            type: 'warning',
                                            message: '当前源地址转换已经置顶!'
                                        });
                                    } else if (response.data == "down-already") {
                                        this.$message({
                                            type: 'warning',
                                            message: '当前源地址转换已经置底!'
                                        });
                                    } else {
                                        this.$message({
                                            type: 'success',
                                            message: '更改优先级成功!'
                                        });
                                        this.getList();
                                    }

                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '更改优先级失败'
                                    });
                                }
                            });

                        }
                    }
                }
            },
            onMultiDelete() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.checkedItems.length == 0) { // 如果没有一项被选中则弹窗提示
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的源地址转换！'
                        });
                        return;
                    }
                    this.$confirm('确认删除' + this.checkedItems.length + '项?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let newArr = [];
                        for (let i = 0; i < this.checkedItems.length; i++) {
                            let row = this.checkedItems[i];
                            newArr.push(row.id);
                        }
                        let fwtimeDto = {
                            ids: newArr.join(',')
                        }
                        deleteSnat(fwtimeDto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getList();
                            } else {
//                            this.$message({
//                                type:'warning',
//                                message:'删除失败!' +codeMessage(response.code)
//                            });
                            }
                        })
                    }).catch(() => {

                    });
                }
            },

            sipFormatter(row, column) {


                if(row.srcIpType=="1"){//自定义
                    return row.srcIp;
                }else {//预定义
                    if (row.srcIpType=="0"){
                        return row.srcIpInfo.name;
                    }else {
                        return row.srcIpgInfo.name;
                    }
                }


            },

            dipFormatter(row, column) {

                if(row.desIpType=="1"){//自定义
                    return row.desIp;
                }else {//预定义
                    if (row.desIpType=="0"){
                        return row.desIpInfo.name;
                    }else {
                        return row.desIpgInfo.name;
                    }
                }


            }

        }
    }

</script>
<style>
    .search{
        background-color: #3598dc;
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