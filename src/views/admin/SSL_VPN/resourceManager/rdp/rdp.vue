<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-folder-open"> EnSSL</i></a></li>
                <li class="active">RDP应用</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">RDP应用</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row">
                                    <div class="dataTables_length inner_head_left" >
                                        &nbsp;
                                        <a title="新建" @click="onAdd()">
                                            <i class="fa  fa-plus">&nbsp;新建</i>
                                        </a>
                                        &nbsp;
                                        <a title="批量删除" @click="multipleDelete()">
                                            <i class="fa fa-trash">&nbsp;批量删除</i>
                                        </a>
                                        &nbsp;
                                    </div>
                                    <div class="dataTables_filter inner_head_right" >
                                        <input type="text"
                                               class="form-control"
                                               placeholder=""
                                               id="search_content"
                                               v-model="listQuery.search_content"
                                               @keyup.enter="search($event)"
                                        />
                                        <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                        <span class="input-group-btn"  style="float: right;position: relative;top:-34px">
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
                                >
                                </el-table-column>
                                <el-table-column
                                        label="应用图标"
                                        align="center"
                                        width="120"
                                >

                                    <template slot-scope="scope">
                                        <img :src="scope.row.iconPath && scope.row.iconPath.indexOf('resource/image') != -1 ? scope.row.iconPath : '/api/admin/'+ scope.row.iconPath"
                                             style="width:40px;border-radius:50%">
                                    </template>


                                </el-table-column>

                                <el-table-column
                                        prop="appName"
                                        label="应用名称"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="hostOrIp"
                                        label="应用服务器地址"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        width="140"
                                        align="center"
                                        prop="port"
                                        label="应用服务器端口"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="remark"
                                        label="说明"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="操作"
                                        width="150"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a @click="onHandle(scope.row, 'edit')" title="修改"><i class="fa fa-pencil"
                                                                                                  style="margin-right: 8px"></i></a>
                                        <a @click="onHandle(scope.row, 'check')" title="查看" style="margin-right: 8px"><i class="fa fa-eye"></i></a>
                                        <a title="删除" @click="singleDelete(scope.row)"><i
                                                class="fa fa-trash"></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="row" style="margin-top:8px;" id="pages_list">
                                <div class="block" style="margin-right: 2%;float: right">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="listQuery.cur_page"
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
            <add  @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
            <edit  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
            <check  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isCheckShow"/>
        </section>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import add from "./add"
    import edit from "./edit"
    import check from "./check"
    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
    import {deleteRdp, getRdpList} from "../../../../../api/SSL_VPN/new_resourceManager/new_rdp";
    export default{
        components: {
            "add":add,
            "edit":edit,
            "check":check
        },
        computed: {},
        data(){
            let name = (rule, value, callback) => {
                if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、字符、下划线"));
                } else {
                    callback();
                }
            };
            let ip = (rule, value, callback) => {
                if (/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/
                                .test(value) == false) {
                    callback(new Error("请输入合法IP"));
                } else {
                    callback();
                }
            };
            let port = (rule, value, callback) => {
                if (/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
                                .test(value) == false) {
                    callback(new Error("请输入正确端口"));
                } else {
                    callback();
                }
            };
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                rules: {
                    appName: [
                        {validator: name, trigger: 'blur'}
                    ],
                    hostOrIp: [
                        {validator: ip, trigger: 'blur'}
                    ],
                    port: [
                        {validator: port, trigger: 'blur'}
                    ],
                    userName: [
                        {validator: name, trigger: 'blur'}
                    ],
                    programName: [
                        {validator: name, trigger: 'blur'}
                    ],
                },
                readOnly:false,
                pageId:23,
                selectArr: [],
                lookInfo: {
                    id: '',
                    type: '',
                    appName: '',
                    hostOrIp: '',
                    port: '',
                    userName: '',
                    password: '',
                    programPath: '',
                    programName: '',
                    domain: '',
                    width: '',
                    height: '',
                    iconFile: '',
                    iconPath: ''
                },
                checkVisible: false,
                list: [],
                role: '',
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    search_content: "",
                    total: 0
                },
                currentData: {},
                multipleSelection: [],
                isAddShow:false,
                isEditShow:false,
                isCheckShow:false
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            onChangeStatus() {
                this.isEditShow = false;
                this.isAddShow = false;
                this.isCheckShow = false;
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
            onHandle(row, type) {
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
            handleUserSizeChange(val) {
                this.userQuery.pageSize = val;
                this.getList();
            },
            handleUserCurrentChange(val) {
                this.userQuery.cur_page = val;
                this.getList();
            },

            search(event){
                if (event.keyCode == 13) {
                    if (this.listQuery.search_content != null) {
                        this.getList();
                    }
                }
            },
            getList() {
                getRdpList(this.listQuery.cur_page,this.listQuery.pageSize,this.listQuery.search_content).then((resp) => {
                    this.list = resp.data;
                    this.listQuery.total = resp.extend.page.totalHits

                }).catch(err => {

                });
            },
//           -----------删除 -----
            singleDelete(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.delete(row.id);
                }

            },
//            批量------删除
            multipleDelete(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的rdp！'
                        });
                        return;
                    }
                    let newArr = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        newArr.push(this.multipleSelection[i].id)
                    }
                    let id = newArr.join(',')
                    this.delete(id);
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delete(id) {
                let information="确认删除?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                deleteRdp(id).then((resp) => {
                    if (resp.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                        this.multipleSelection = [];
                        this.getList();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: resp.code.info
                        });
                    }
                }).catch((err) => {
                    console.log("删除发生错误:", err);
                    notifyFault();
                });
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.cur_page = val;
                this.getList();
            }
        }
    }
</script>


<style scoped>
    .dataTables_filter.inner_head_right{
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
