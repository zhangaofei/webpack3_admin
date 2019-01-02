<template>
    <div>
        <section class="content-header">
            <h1>

                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user-md"></i>负载均衡</a></li>
                <li><a >配置</a></li>
                <li class="active">服务器池</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12" style="">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">服务器池</h3>
                        </div>
                        <div class="box-body">
                            <div class="row">
                                <div class="dataTables_length inner_head_left">
                                    &nbsp;
                                    <span>
                                            <a title="" @click="onAdd">
                                                <i class="fa  fa-plus"> &nbsp;新建</i>
                                            </a>
                                            &nbsp;
                                            <!--<a title="批量删除" @click="multipleDelete()">-->
                                                <!--<i class="fa fa-trash-o">&nbsp; 批量删除</i>-->
                                            <!--</a>-->
                                        </span>&nbsp;
                                </div>
                                <div id="example1_filter" class="dataTables_filter inner_head_right"
                                     style="">
                                    <input type="text"
                                           class="form-control"
                                           placeholder=""
                                           v-model="listQuery.search"
                                           @keyup.enter="search($event)">
                                    <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                    <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                <button class="btn btn-primary" type="button" @click="getList()">
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
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="80"
                                        align="center"
                                        :selectable="isAvailable"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="名称"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                </el-table-column>
                                <el-table-column
                                        prop="balance"
                                        label="负载均衡算法"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        width="200"
                                        prop="option"
                                        label="健康检查"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="sessionMaintainUse"
                                        label="会话保持"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip
                                        width="150"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <!--角色判断-->
                                        <a title="" @click="onEdit(scope.$index,scope.row)" style="margin-right:8px"><i
                                                class="fa fa-pencil" :disabled="true"></i></a>
                                        <a title="" @click="singleDelete(scope.row)" style="margin-right: 8px"><i
                                                class="fa fa-trash-o"></i></a>

                                        <a title="" @click="onLook(scope.row)"><i class="fa fa-eye"></i></a>

                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <div class="row" style="margin-top:8px;" id="pages_list">
                                <div class="block" style="margin-right: 2%;float: right">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="listQuery.page"
                                            :page-sizes="[10, 20, 30, 40,50]"
                                            :page-size="listQuery.size"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="listQuery.total">
                                    </el-pagination>
                                </div>
                            </div>
                            <!-- page end -->
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <add @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <edit @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <look @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isLookShow"/>
    </div>
</template>


<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import store from "../../../../../store/index";
    import {codeMessage} from "../../../../../utils/codes";
    import {notifyFault} from "../../../../../utils/notify";
    import {mapGetters} from 'vuex'
    import add from './add'
    import edit from './edit'
    import look from './look'
    import {deleteAdmin, getAdminList, getPower} from "../../../../../api/systemSet/new_adminSet/new_sysAdmin";
    import {getServerpoolList,serverpoolDel} from '@/api/loadBalance/servePool'
    export default {
        components: {
            add,
            edit,
            look
        },
        data() {

            let tel = (rule, value, callback) => {
                if (/^(13|14|15|18|17)[0-9]{9}$/.test(value) == false) {
                    callback(new Error('请输入11位电话'));
                } else {
                    callback();
                }
            };
            return {
                headerCellStyle: {
                    backgroundColor: '#eef1f6'
                },
                currentView: null,
                currentData: null,
                checkListPort: [],
                isShow: false,
                isShowSub: false,
                rules: {

                },
                lookVisible: false,
                list: [],
                arrs: [],
                role: '',
                listLoading: true,
                listQuery: {
                    page: 1,
                    size: 10,
                    total: 0,
                    search:''

                },
                multipleSelection: [],
                isEditShow: false,
                isAddShow: false,
                isPswShow: false,
                isLookShow: false,
                readOnly: false,
                pageId: 11
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'roleName'
            ])
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
            this.powerList();
        },
        methods: {
            isAvailable(row) {
                if (row.roleName == '超级管理员') {
                    return false;
                }
                return true;
            },
            onChangeStatus() {
                this.isPswShow = false;
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.getList();
            },
            powerList() {
                console.log("kkkk---")
                getPower().then(response => {
                    this.arrs = response.data
                    console.log(this.arrs, 'power')
                }).catch((e) => {
                    console.log(e);
                })

            },
            onAdd() {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isAddShow = true;
                }
            },
            onEdit(index, row) {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    this.isEditShow = true
                    console.log(row, 'edit_row')
                }
            },
            onLook(row) {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    this.isLookShow = true
                }
            },
            onModPsw(index, row) {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isPswShow = true;
                    this.currentData = row;
                }
            },
            getList() {
                getServerpoolList(this.listQuery).then((resp) => {
                    this.list = resp.data;
                    this.listQuery.total=resp.count;
                    console.log(resp, 'list----')
                    // this.listQuery.total = resp.extend.page.totalHits

                }).catch(err => {

                });
            },
            resetForm() {
                this.lookVisible = false;
            },
            show() {
                this.dialogVisible = true;
            },
            onUpdate() {
                this.getList()
            },
            search(event) {
                if (event.keyCode == 13) {
                    console.log("你按了回车键，搜索的内容是： " + this.listQuery.search);
                    if (this.listQuery.search != null) {
                        this.getList();
                    }
                }
            },
            singleDelete(row) {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.delete(row.id);
                }
            },
            multipleDelete() {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的服务器池！'
                        });
                        return;
                    }
                    let idArr = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        let row = this.multipleSelection[i];
                        idArr.push(row.id);
                    }
                    let id = idArr.join(',')
                    console.log("删除的id:", id);
                    this.delete(id);
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val,'val_select')
            },

            delete(id) {
                let information = "确认删除?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    serverpoolDel({id:id}).then((resp) => {
                        if (resp.success == true) {
                            this.$message({
                                type: 'success',
                                message: '删除成功！'
                            });
                            this.multipleSelection = [];
                            this.getList();
                        } else {

                        }
                    }).catch((err) => {
                        console.log("删除发生错误:", err);
                    });
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });

            },

            handleSizeChange(val) {
                this.listQuery.size = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getList();
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        }
    }
</script>

<style scoped>
    .dataTables_filter.inner_head_right {
        position: relative;
        height: 34px;
        margin-bottom: 30px;
    }

    .btn-primary {
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

    .serch_head_icon {
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

    .form-control {
        padding-left: 30px;
        border-color: #DCDFE6;
    }

    .inner_head_right {
        margin-right: 66px;
    }
</style>
