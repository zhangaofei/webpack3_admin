<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i> ipsec配置</a></li>
                <li class="active">ipsec设置</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">ipsec设置</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row">
                                    <div class="dataTables_length inner_head_left">
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
                                    <div  class="dataTables_filter inner_head_right" style="height: 34px; margin: 20px 53px 30px 0;">
                                        <input type="text"
                                               class="form-control"
                                               placeholder="请输入ipsec名称"
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
                                        label="链接名称">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="模式">
                                    <template slot-scope="scope">
                                        {{scope.row.authType=="secret"?"预共享密钥":"证书"}}
                                    </template>
                                </el-table-column>

                                <el-table-column  align="center" label="状态" width="150">
                                    <template slot-scope="scope">
                                    <span v-if="scope.row.connection_state==true">
                                        <div><img src="../../../assets/addIcon/连通.png" style="width: 18px;height: 18px;border-radius: 50%"></div>
                                    </span>
                                        <span v-else>
                                            <div><img src="../../../assets/addIcon/断开.png" style="width: 18px;height: 18px;border-radius: 50%"></div>
                                        </span>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="动作">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.connection_state==true">
                                        <a @click="onPause(scope.row.name)" title="停止">停止</a>
                                        </span>
                                        <span v-else>
                                        <a @click="onRun(scope.row.name)" title="启动">启动</a>
                                        </span>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="操作"
                                        width="150"
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
    import {isReadonly} from "../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../store/index";
    import add from "./add"
    import edit from "./edit"
    import check from "./check"
    import {mapGetters} from 'vuex';
    import {getIpsecList, deleteIpsec,setIpsecStatus} from 'api/ipsec/ipsec';
    export default {
        components: {add, edit,check},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:67,
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
            onChangeStatus() {
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.getList();
            },
            onAdd() {if(this.readOnly == true){
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
            onPause(name){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let dto = {
                        name: name,
                        state: "off"
                    };

                    setIpsecStatus(dto).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '停止隧道成功!'
                            });
                            this.getList();
                        }
                    }).catch();
                }

            },
            onRun(name){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let dto = {
                        name: name,
                        state: "on"
                    };
                    setIpsecStatus(dto).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '启动隧道成功!'
                            });
                            this.getList();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '启动隧道失败!'
                            });
                            this.getList();
                        }
                    }).catch(() => {
                    });
                }
            },
            getList() {
                getIpsecList(this.listQuery).then(response => {
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
                        deleteIpsec(fwtimeDto).then(response => {
                            if (response.status == 'SUCCESS') {
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
                    }).catch(() => {    // 取消事件

                    });
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
                            type: 'info',
                            message: '请选择要删除的ipsec设置！'
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
                        deleteIpsec(fwtimeDto).then(response => {
                            if (response.status == 'SUCCESS') {
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
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
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
    .input-group-btn:last-child>.btn, .input-group-btn:last-child>.btn-group {
        z-index: 2;
        margin-left: -14px;
    }
</style>