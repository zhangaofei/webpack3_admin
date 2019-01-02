<template>
    <div>
        <section class="content-header">
            <h1>

                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-user-md"></i> web终端</a></li>
                <li class="active">web终端</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">web终端</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                <el-col :span="15" style="margin-left: 10px;">
                                    &nbsp;
                                    <a class="function_btn_main" title="新建" @click="onAdd">
                                        <i class="fa  fa-plus" id="user_group_set_new_add"> 新建</i>
                                    </a>
                                    <a class="function_btn_main" title="批量删除" @click="onMultiDel()">
                                        <i class="fa fa-trash-o" id="user_group_set_batch_del"> 批量删除</i>
                                    </a>
                                </el-col>
                                <el-col :span="8" style="margin-right: 16px; float: right;">
                                    <SearchBox
                                            width="60px"
                                            searchBoxId="example1_filter"
                                            inputBoxId="search_content"
                                            placeholder="请输入关键字"
                                            @search="search"
                                            @onClickSearchButton="getList"></SearchBox>
                                </el-col>
                                <!--<div class="dataTables_filter inner_head_right">-->
                                    <!--<input type="text"-->
                                           <!--class="form-control"-->
                                           <!--placeholder=""-->
                                           <!--id="search_content"-->
                                           <!--v-model="listQuery.searchContent"-->
                                           <!--@keyup.enter="search($event)">-->
                                    <!--<span class="glyphicon glyphicon-search serch_head_icon"></span>-->
                                    <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                        <!--<button class="btn btn-primary" type="button" @click="getList()">-->
                                            <!--<span>搜索</span>-->
                                        <!--</button>-->
                                    <!--</span>-->
                                <!--</div>-->
                            </div>
                            <el-table
                                    ref="multipleTable"
                                    :data="list"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="checkBoxAll"
                            >
                                <el-table-column
                                        type="selection"
                                        width="80"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="图标"
                                        align="center"
                                        width="120"
                                >
                                    <template slot-scope="scope">
                                        <img
                                            :src="scope.row.iconPath && scope.row.iconPath.indexOf('resource/image') != -1 ? scope.row.iconPath : '/api/admin/'+ scope.row.iconPath"
                                            style="width:40px;border-radius:50%"></template>
                                </el-table-column>
                                <el-table-column
                                        label="名称"
                                        align="center"
                                        width="100"
                                        show-overflow-tooltip
                                >
                                    <template slot-scope="scope">{{ scope.row.name}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="方法"
                                        align="center"
                                        width="120"
                                        show-overflow-tooltip
                                >
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.addType==0">协定添加</span>
                                        <span v-if="scope.row.addType==1">自主添加</span>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="协议"
                                        align="center"
                                        width=""
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">{{ scope.row.protocol}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="地址"
                                        align="center"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{ scope.row.ipAddr.replace(new RegExp('\n','gm'),';')}}
                                        <span></span>

                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="端口"
                                        align="center"
                                        width="100"
                                        show-overflow-tooltip
                                >
                                    <template slot-scope="scope">{{ scope.row.port}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip
                                        width="150"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onHandle(scope.row, 'edit')" style="margin-right:8px"><i
                                                class="fa fa-pencil"></i></a>
                                        <a title="删除" @click="onSingleDel(scope.row.id)" style="margin-right: 8px"><i
                                                class="fa fa-trash-o"></i></a>
                                        <a title="查看" @click="onHandle(scope.row, 'check')" style="margin-right: 8px"><i
                                                class="fa fa-eye"></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <div class="row" style="margin-top:8px;" id="pages_list">
                                <div class="block" style="margin-right: 2%;float: right">
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
        <add @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <edit  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <look  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isLookShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import {getWebendList,getDelWebend} from 'api/webTerminal/webTerminal';
    import add from './add'
    import edit from './edit'
    import look from './look'
    import SearchBox from '@/views/components/searchBox.vue';

    export default {
        name: 'adminResource',
        components: {
            add,
            edit,
            look,
            SearchBox
        },
        data() {
            return {
                headerCellStyle: {
                    backgroundColor: '#eef1f6'
                },
                readOnly: false,
                pageId: 242,
                role: '',
                list: [],
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0,
                    searchContent:''
                },
                currentView: null,
                currentData: null,
                isEditShow: false,
                isAddShow: false,
                isLookShow: false,
                checkedItems: []
            }
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            onChangeStatus() {
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.getList();
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
            onHandle(row, type) {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    if (type == 'edit') {
                        this.isEditShow = true
                    } else {
                        this.isLookShow = true
                    }
                }
            },

            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                getWebendList(this.listQuery).then(resp => {
                    this.list = resp.data;
                    this.listQuery.total = resp.extend.page.totalHits;
                    this.listLoading = false;
                })
            },
            search(event, keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                if (event.keyCode == 13) {
                    if (this.listQuery.searchContent != null) {
                        this.getList();
                    }
                }
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },

            handleEdit(row) {
                if (this.readOnly == true) {
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.currentData = row;
                    if (this.currentView == update) {
                        this.$refs.child.show(row)
                    } else {
                        this.currentView = update;
                    }
                }
            },
            checkBoxAll(val) {
                this.checkedItems = val;
            },
            onMultiDel(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.checkedItems.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的web终端！'
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
                            let row = this.checkedItems[i];
                            id.push(row.id);
                        }
                        let deleteDTO = {
                            ids: id.join(',')
                        }
                        this.delete(deleteDTO);
                    }).catch((err) => {    // 取消事件

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
                    }).catch(() => {    // 取消事件
                        console.log("取消删除。")
                    });
                }
            },

            delete(deleteDTO){
                getDelWebend(deleteDTO).then((resp) => {
                    if (resp.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                        this.checkedItems = [];
                        this.getList();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: resp.code.info
                        });
                    }
                }).catch(e => {
                    console.log("删除用户发生错误:", e);
                    this.$message({
                        type: 'warning',
                        message: '网络或者服务器故障！'
                    });
                })
            },
          
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
