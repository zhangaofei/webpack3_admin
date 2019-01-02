<template>
    <div>
        <section class="content-header">
            <h1>

                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user-md"></i> EnWAS</a></li>
                <li class="active">规则库</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12" style="">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">规则库</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="margin-top: 20px">
                                <!--<div>-->
                                <div class="dataTables_length" style="float:left;margin-left:10px;line-height: 34px;margin-top: -15px;" >
                                    &nbsp;
                                    <a title="新建" @click="onAdd">
                                        <i class="fa  fa-plus">&nbsp;新建</i>
                                    </a>
                                    <a  title="批量删除" @click="multipleDelete()" style="margin-left: 10px">
                                        <i class="fa fa-trash"> 批量删除</i>
                                    </a>
                                    <a title="更新规则库设置" @click="addRule" style="margin-left: 10px">
                                        <i class="fa  fa-plus">更新规则库设置</i>
                                    </a>
                                    <br>
                                    <a>&nbsp;&nbsp;规则库更新状态: 自动更新</a>
                                    <a style="margin-left: 10px; margin-right: 10px" @click="onRefresh">
                                        <i class="fa  fa-refresh" id="user_group_set_new_update"></i>
                                    </a>
                                    <a>在某时刻已更新规则库内容</a>
                                </div>
                                <!--<div style="margin-top: 20px; margin-left: 10px; font-size: 13px;display: inline-block">-->
                                    <!--<a>规则库更新状态: 自动更新</a>-->
                                    <!--<a style="margin-left: 10px; margin-right: 10px" @click="onRefresh">-->
                                        <!--<i class="fa  fa-refresh" id="user_group_set_new_update"></i>-->
                                    <!--</a>-->
                                    <!--<a>在某时刻已更新规则库内容</a>-->
                                <!--</div>-->
                            <!--</div>-->
                            <div  class="dataTables_filter" style="float: right;margin-right: 66px">
                                <input type="text"
                                       class="form-control"
                                       placeholder=""
                                       id="search_content"
                                       v-model="listQuery.search_content"
                                       @keyup.enter="search($event)">
                                <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                    <button class="btn btn-primary" type="button" @click="getList()" >
                                        <span>搜索</span>
                                    </button>
                                </span>
                                <!--<el-button class="filter-item" type="primary" @click="resetFilter">重置</el-button>-->

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
                                        width="80"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="名称"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                </el-table-column>
                                <el-table-column
                                        label="状态"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        {{ scope.row.ruleStatus =='0'? '启用':'禁用' }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="资源类型"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.typeid }}</template>
                                </el-table-column>
                                <el-table-column
                                        label="修改时间"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.time }}</template>
                                </el-table-column>
                                <el-table-column
                                        label="说明"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.describ }}</template>
                                </el-table-column>

                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip
                                        width="170"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onEdit(scope.row)" style="margin-right:8px"><i class="fa fa-pencil" ></i></a>
                                        <a title="删除" @click="deleteItem(scope.row)" style="margin-right: 8px" ><i class="fa fa-trash"></i></a>
                                        <a title="查看" @click="onLook(scope.row)" style="margin-right: 8px" ><i class="fa fa-eye"></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <div class="row" style="margin-top:8px;" id="pages_list">
                                <div class="block" style="margin-right: 2%;float: right" >
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="listQuery.page"
                                            :page-sizes="[10, 20, 30, 40,50]"
                                            :page-size="listQuery.page_size"
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
        <add  @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <update  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <look  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isLookShow"/>
        <ruleBank @onChangeStatus="onChangeStatus" v-if="isRuleBankShow"/>
        <refreshRule @onChangeStatus="onChangeStatus" v-if="isRefreshShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import {mapGetters} from 'vuex';
    import {getRuleList, addRule, updateRule, deleteRule} from 'api/enWAS/rule';
    import add from './add'
    import update from './update'
    import look from './look'
    import ruleBank from './ruleBank'
    import refreshRule from './refreshRule.vue'

    export default {
        name: 'adminRule',
        components: {add, update,look, ruleBank, refreshRule},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:114,
                role: '',
                list: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    page_size: 10,
                    name: '',
                    total: 0,
                },
                currentView: null,
                currentData: null,
                isEditShow: false,
                isAddShow: false,
                isLookShow: false,
                isRuleBankShow: false,
                isRefreshShow: false,
                checkedItems:[]
            }
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        methods: {
            onChangeStatus(){
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.isRuleBankShow = false;
                this.isRefreshShow = false;
                this.getList();
            },
            onAdd(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isAddShow = true;
                }
            },
            onEdit(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    this.isEditShow = true
                }
            },
            onLook(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    this.isLookShow = true
                }
            },
            addRule(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isRuleBankShow = true;
                }
            },
            onRefresh(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isRefreshShow = true;
                }
            },
            getList() {
                getRuleList(this.listQuery).then(response => {
                    console.log(response,'response')
                    const data = response.data.items;
                    if (data.page_count > 0) {
                        this.list = data.res;
                        this.listQuery.total = data.page_count;
                    } else {
                        this.list = [];
                        this.listQuery.total = 0;
                    }
                    this.listLoading = false;
                })
            },
            resetFilter() {
                console.log('resetFilter')
                this.listQuery = {
                    page: 1,
                    page_size: 10,
                    name: ''
                }
                this.getList();
            },
            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getList();
            },
            search(){
                if(event.keyCode==13){
                    if(this.listQuery.search_content!=null){
                        this.getList();
                    }
                }
            },
            handleFilter() {
                this.getList();
            },
            checkBoxAll(val) {
                this.checkedItems = val;
            },
            multipleDelete(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.checkedItems.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的规则！'
                        });
                        return;
                    }
                    this.$confirm('确认删除' + this.checkedItems.length + '项?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let id = [];
                        for (let i = 0; i < this.checkedItems.length; i++) {
                            id.push(this.checkedItems[i].id);
                        }
                        deleteRule({id: id}).then(response => {
                            this.getList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
                    }).catch(() => {

                    });
                }
            },
            deleteItem(row) {
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
                        let id = [];
                        id.push(row.id);
                        deleteRule({id: id}).then(response => {
                            this.getList();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })

                    }).catch(() => {

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
