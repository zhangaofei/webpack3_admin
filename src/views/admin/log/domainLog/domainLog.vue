<template>
    <div>
        <section class="content-header">
            <h1>
                <small></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i>日志中心</a></li>
                <li><a >日志管理</a></li>
                <li class="active">域名日志</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">域名日志</h3>
                        </div>
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                <el-col :span="15" style="margin-left: 10px;">
                                    &nbsp;
                                    <a class="function_btn_main" title="新建"
                                       @click="onAdd('add')">
                                        <i class="fa  fa-plus" > 新建</i>
                                    </a>
                                    <a class="function_btn_main" @click="onMultiDel()" title="批量删除">
                                        <i class="fa fa-trash"> 批量删除</i>
                                    </a>
                                </el-col>

                                <el-col :span="8" style="margin-right: 16px; float: right;" v-if="false">
                                    <SearchBox
                                            width="60px"
                                            searchBoxId="example1_filter"
                                            inputBoxId="search_content"
                                            placeholder="请输入关键字"
                                            @search="search"
                                            @onClickSearchButton="getList"></SearchBox>
                                </el-col>
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
                                <el-table-column label="主域名" align="center">
                                    <template slot-scope="scope">{{ scope.row.host }}</template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        width="150"
                                        align="center"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onEdit(scope.row, 'edit')"><i class="fa fa-pencil" ></i></a>
                                        &nbsp;
                                        <a title="删除" @click="onSingleDel(scope.row.id)"><i class="fa fa-trash"></i></a>&nbsp;

                                        <a @click="onEdit(scope.row, 'check')" title="查看" ><i class="fa fa-eye" ></i></a>&nbsp;
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="row" style="margin-top:8px;" >
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
        <edit  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <check @onChangeStatus="onChangeStatus" :currentData = "currentData" v-if="isCheckShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "@/utils/permissionUtil";
    import add from './add'
    import edit from './edit'
    import check from './check.vue'
    import SearchBox from '@/views/components/searchBox.vue';
    import {domainLogList,domainLogDelete} from "@/api/log/logApi";

    export default{
        components: {
            add,
            edit,
            check,
            SearchBox
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:48,
                fileList:[],
                rules: {
                    userName: [
                        { required: true, message: '请输入用户组名称', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'change' }
                    ]

                },
                role: '',
                list: [],
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    page_size: 10,
                    total:0,
                    searchContent:null
                },
                groupList:[],
                userStrategy:[],
                currentData: null,
                multipleSelection:[],
                isEditShow: false,
                isAddShow: false,
                isUpdatePwdShow:false,
                isCheckShow: false,
                uploadVisible:false,
                items:null
            }
        },
        computed:{

        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            onChangeStatus(){
                this.isEditShow = false;
                this.isAddShow = false;
                this.isUpdatePwdShow = false;
                this.isCheckShow = false;
                this.getList();
            },
            onAdd(type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'add'){
                        this.isAddShow = true;
                    } else {
                        this.uploadVisible = true;
                    }
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
                    } else if(type == 'check'){
                        this.isCheckShow = true;
                    } else {
                        this.isUpdatePwdShow = true;
                    }
                }
            },
            search(event, keyword){
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                if (event.keyCode == 13) {
                    if (this.listQuery.searchContent != null) {
                        this.getList();
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
                            message: '请选择要删除的用户！'
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
                            id.push(this.multipleSelection[i].id);
                        }
                        let deleteDTO = {
                            id: id
                        };
                        this.delete(deleteDTO);
                    }).catch((err) => {    // 取消事件

                    });
                }
            },

            delete(deleteDTO){
                domainLogDelete(deleteDTO).then((resp) => {
                    if (resp.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                        this.getList();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: resp.msg
                        });
                    }
                })
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
                            id: [id]
                        };
                        this.delete(deleteDTO);
                    }).catch(() => {    // 取消事件
                        console.log("取消删除。")
                    });
                }
            },
            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                this.listLoading = true;
                this.list = [];
                domainLogList(this.listQuery).then(resp => {
                    this.list = resp.data.items.res;
                    this.listQuery.total = resp.data.items.page_count;
                }).catch((e) => {
                    console.log(e)
                });

            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.cur_page = val;
                this.getList();
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                let arrs=[];
                for(let i in val){
                    arrs.push(val[i].id)
                }
                this.items= arrs.join(',')
            }
        }
    }

</script>


<style>
    .el-upload-dragger{
        margin-top: -2px!important;
        margin-left: 10px!important;
        width: 400px!important;
    }

    .minWidth600{
        min-width: 600px;
    }

</style>
<style scoped="scoped" lang="scss">
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
    .el-upload-dragger{
        margin-left: 0;
    }

</style>
<style lang="scss">
    .public{
        .user_form{
            .el-form{
                .form_item{
                    .el-form-item__content{
                        font-size: 0;//清除inline-block的空隙
                        -webkit-text-size-adjust:none;
                        .half_sel{
                            width:36%;;padding-right:20px
                        }
                        .half_put{
                            width: 64%
                        }
                    }

                }

            }
        }

    }
</style>

