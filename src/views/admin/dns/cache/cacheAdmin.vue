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
                <li class="active">缓存管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=" border-top-color: #6cbaf5 !important;">
                        <div class="box-header">
                            <h3 class="box-title" id="res_rdp_title">缓存管理</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="margin-top: 20px;">
                                <div class="col-sm-5">
                                    <div class="dataTables_length" id="example1_length">
                                        &nbsp;
                                        <a title="新建" @click="onAdd()">
                                            <i class="fa  fa-plus">新建</i>
                                        </a>
                                        &nbsp;
                                        <a  title="批量删除" @click="onMultiDelete()">
                                            <i class="fa fa-trash" > 批量删除</i>
                                        </a>
                                        &nbsp;
                                    </div>
                                </div>

                                <div class="col-sm-4">
                                    <div class="dataTables_length" id="example2_length" style="margin-right:0px;float: right">
                                        &nbsp;
                                        <el-select v-model="listQuery.strategyid" placeholder="请选择递归策略" @change="changeValue" class="cache_sel">
                                            <el-option
                                                    v-for="name in recursionRuleNameList"
                                                    :key="name.id"
                                                    :label="name.strategyName"
                                                    :value="name.id">
                                            </el-option>
                                        </el-select>
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div id="example1_filter" class="dataTables_filter" style="margin-right: 53px;float: right">

                                        <input type="text"
                                               class="form-control"
                                               placeholder="请输入关键字"
                                               id="searchContent"
                                               v-model="listQuery.searchContent"
                                               @keyup.enter="search($event)"
                                        />
                                        <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                        <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                <button class="btn btn-primary" type="button" @click="getList()" >
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
                                    @selection-change="checkBoxAll">
                                <el-table-column
                                        type="selection"
                                        width="50"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="domainName"
                                        align="center"
                                        show-overflow-tooltip
                                        label="域名">
                                </el-table-column>

                                <el-table-column
                                        prop="recordType"
                                        align="center"
                                        label="记录类型">
                                </el-table-column>

                                <el-table-column
                                        prop="ttl"
                                        align="center"
                                        label="TTL(秒)">
                                </el-table-column>

                                <el-table-column
                                        prop="recordValue"
                                        align="center"
                                        label="记录值">
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="操作"
                                        width="130"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a @click="onEdit(scope.row)" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                        <a @click="onDelete(scope.row)" title="删除" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
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
    </div>
</template>
<script>
    import add from "./add"
    import edit from "./edit"
    import {mapGetters} from 'vuex';
    import {getCacheList, deleteCache} from 'api/enDNS/cache';
    import {getRuleNameList} from 'api/enDNS/recursion';
    export default {
        components: {add, edit},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                list:[],
                total: 0,
                listLoading: true,
                currentView: null,
                currentData: null,
                listQuery:{
                    strategyid:'',
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                checkAll: false,// 对应全选框是否选中
                checkedItems:[],// 被选中的ID列表
                isEditShow: false,
                isAddShow: false,
                recursionRuleNameList:[]
            }
        },
        created() {
            this.getList();
            this.getListForSelect();
        },
        methods: {
            onChangeStatus() {
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.getList();
            },
            onAdd() {
                this.isAddShow = true;
            },
            onEdit(row) {
                this.currentData = row;
                this.isEditShow = true;
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },

            getListForSelect(){
                getRuleNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.recursionRuleNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });

            },
            changeValue(){
                this.getList();
            },
            getList() {
                getCacheList(this.listQuery).then(response => {
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
            delete(param){
                deleteCache(param).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList();
                    } else {
                        this.$message({
                            type:'warning',
                            message:response.code.info
                        });
                    }
                })
            },
            onDelete(data) {
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
                    this.delete(fwtimeDto);
                }).catch(() => {    // 取消事件
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },


            onMultiDelete() {
                if (this.checkedItems.length == 0) { // 如果没有一项被选中则弹窗提示
                    this.$message({
                        type: 'info',
                        message: '请选择要删除的缓存管理！'
                    });
                    return;
                }
                this.$confirm('确认删除' + this.checkedItems.length + '项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let newArr=[];
                    for(let i=0;i<this.checkedItems.length;i++){
                        let row = this.checkedItems[i];
                        newArr.push(row.id);
                    }
                    let fwtimeDto={
                        ids:newArr.join(',')
                    }
                    this.delete(fwtimeDto);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }

</script>
<style>
    .search{
        background-color: #3598dc;
    }
    .cache_sel {
        width: 87% !important;
        margin-right: 20px;
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