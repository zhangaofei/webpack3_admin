<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i>计费管理</a></li>
                <li class="active">套餐设置</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" id="user_set_box_title">套餐设置</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="height: 70px">
                                    <div class="dataTables_length inner_head_left" >
                                        &nbsp;
                                        <a class="function_btn_main" title="新建"
                                            @click="onAdd()">
                                            <i class="fa  fa-plus" > 新建</i>
                                        </a>
                                        <a class="function_btn_main" @click="onMultiDel()" title="批量删除">
                                            <i class="fa fa-trash">
                                             批量删除
                                            </i>
                                        </a>
                                    </div>
                            </div>
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
                                        width="80"
                                        align="center"
                                        :selectable = "isAvailable"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="套餐名称"
                                        align="center">
                                </el-table-column>

                                <el-table-column
                                        prop="price"
                                        label="套餐金额"
                                        align="center">
                                </el-table-column>

                                <el-table-column
                                        prop="circle"
                                        label="套餐周期"
                                        align="center">
                                </el-table-column>

                                <el-table-column
                                        label="操作"
                                        width="150"
                                        align="center"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onEdit(scope.row, 'edit')"><i class="fa fa-pencil" ></i></a>
                                        &nbsp;<span v-if="scope.row.original == false">
                                            <a title="删除" @click="onSingleDel(scope.row.id)"><i class="fa fa-trash"></i></a>&nbsp;
                                        </span>
                                        <a @click="onEdit(scope.row, 'check')" title="查看" ><i class="fa fa-eye" ></i></a>&nbsp;
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
        <edit  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <check @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="isCheckShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import add from './add'
    import edit from './edit'
    import check from './check'
    import {getPackageList, deletePackage} from "../../../../../api/SSL_VPN/accountManager/packageConfig";
    export default{
        components: {
            add,
            edit,
            check
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:80,
                list: [],
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0,
                    searchContent:''
                },
                currentData: null,
                multipleSelection:[],
                isEditShow: false,
                isAddShow: false,
                isCheckShow: false
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        methods: {
            isAvailable(row){
                if (row.original == false){
                    return 1;
                } else {
                    return 0;
                }
            },
            onChangeStatus(){
                this.isEditShow = false;
                this.isAddShow = false;
                this.isCheckShow = false;
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
            onEdit(row, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    if(type == 'edit'){
                        this.isEditShow = true;
                    } else {
                        this.isCheckShow = true;
                    }
                }
            },

            onMultiDel(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的套餐！'
                        });
                        return;
                    }
                    this.$confirm('确认删除' + this.multipleSelection.length + '项?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let id = [];
                        for (let i = 0; i < this.multipleSelection.length; i++) {
                            let row = this.multipleSelection[i];
                            id.push(row.id);
                        }
                        let deleteDTO = {
                            ids: id.join(',')
                        }
                        this.delete(deleteDTO);
                    }).catch((err) => {
                        console.log("取消删除。")
                    });
                }
            },
            onSingleDel(id){
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
                        let deleteDTO = {
                            ids: id
                        }
                        this.delete(deleteDTO);
                    }).catch(() => {
                        console.log("取消删除。")
                    });
                }
            },
            delete(param){
                deletePackage(param).then((resp) => {
                    if (resp.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '删除套餐成功！'
                        });
                        this.multipleSelection = [];
                        this.getList();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: resp.code.info
                        });
                    }
                }).catch(e => {
                    this.$message({
                        type: 'warning',
                        message: '网络或者服务器故障！'
                    });
                })
            },
            getList() {
                getPackageList(this.listQuery).then(response => {
                    if(response.status == 'SUCCESS'){
                        this.list = response.data;
                        for (let i = 0; i < this.list.length; i++){
                            if(this.list[i].unit == '月'){
                                this.list[i].circle = this.list[i].value + '个' + this.list[i].unit;
                            } else {
                                this.list[i].circle = this.list[i].value + this.list[i].unit;
                            }
                        }
                        this.listQuery.currentPage = response.extend.page.currentPage;
                        this.listQuery.pageSize = response.extend.page.pageSize;
                        this.listQuery.total = response.extend.page.totalHits;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.code.info
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }

</script>


<style >
    a {
        color: #3493E0;
    }
    .money_unit{
        font-size: 16px;
    }
</style>

