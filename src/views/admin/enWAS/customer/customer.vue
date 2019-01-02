<template>
    <div>
        <section class="content-header">
            <h1>

                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user-md"></i> EnWAS</a></li>
                <li class="active">客户</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12" style="">
                    <div class="box" style=" border-top-color: #6cbaf5 !important;">
                        <div class="box-header">
                            <h3 class="box-title">客户</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="margin-bottom:8px;">
                                <div class="col-sm-6">
                                    <div class="dataTables_length" id="example1_length">
                                        &nbsp;
                                        <a title="新建" @click="onAdd">
                                            <i class="fa  fa-plus" id="user_group_set_new_add">&nbsp;新建</i>
                                        </a>
                                        &nbsp;
                                        <!--<a  title="批量删除" @click="multipleDelete()">-->
                                        <!--<i class="fa fa-trash-o"  id="user_group_set_batch_del"> 批量删除</i>-->
                                        <!--</a>-->
                                        &nbsp;
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div id="example1_filter" class="dataTables_filter" style="margin-right:82px;float: right">
                                        <input type="text"
                                               class="form-control"
                                               placeholder=""
                                               id="search_content"
                                               v-model="listQuery.search_content"
                                               @keyup.enter="search($event)">
                                        <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                <button class="btn btn-primary" type="button" @click="getList()" >
                                                    <span class="glyphicon glyphicon-search" ></span>
                                                </button>
                                        </span>
                                        <!--<el-button class="filter-item" type="primary" @click="resetFilter">重置</el-button>-->

                                    </div>

                                </div>
                            </div>
                            <el-table
                                    ref="multipleTable"
                                    :data="list"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        label="名称"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip
                                        width="150"
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
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {getCustomer, addCustomer, updateCustomer, deleteCustomer} from  'api/enWAS/customer';
    import add from './add'
    import update from './update'
    import look from './look'

    export default {
        components: {add, update,look},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                role: '',
                list: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    page_size: 10,
                    name: '',
                    total: null,
                },
                currentView: null,
                currentData: null,
                defaultSysConfig:[{}],
                isEditShow: false,
                isAddShow: false,
                isLookShow: false,
            }
        },
        created() {
            this.getList();
        },
        methods: {
            onChangeStatus(){
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.getList();
            },
            onAdd(){
                this.isAddShow=true;
            },
            onEdit(row){
                this.currentData = row;
                this.isEditShow=true
            },
            onLook(row){
                this.currentData = row;
                this.isLookShow=true
            },
            getList() {
                getCustomer(this.listQuery).then(response => {
                    const data = response.data.items;

                    if(data.page_count > 0){
                        this.list = data.res;
                    }else{
                        this.list = []
                    }
                    this.listQuery.total = data.page_count;
                    this.listLoading = false;
                })
            },
            search(){
                if(event.keyCode==13){
                    if(this.listQuery.search_content!=null){
                        this.getList();
                    }
                }
            },
            resetFilter() {
                console.log('resetFilter')
                this.listQuery = {
                    page: 1,
                    page_size: 20,
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
            handleFilter() {
                this.getList();
            },
            deleteItem(row){
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCustomer(row).then(response => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })

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

