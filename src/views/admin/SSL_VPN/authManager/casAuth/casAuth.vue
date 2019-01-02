<template>
    <div>
        <section class="content-header">
            <h1>

                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user-md"></i>用户管理</a></li>
                <li><a >认证设置</a></li>
                <li class="active">cas认证</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">cas认证</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row">
                                <div class="dataTables_length inner_head_left">
                                    &nbsp;
                                    <a title="新建" @click="onAdd" v-if="false">
                                        <i class="fa  fa-plus" id="user_group_set_new_add">&nbsp;新建</i>
                                    </a>
                                    &nbsp;
                                    <a  title="批量删除" @click="multipleDelete()" v-if="false">
                                        <i class="fa fa-trash"  id="user_group_set_batch_del"> &nbsp;批量删除</i>
                                    </a>
                                    &nbsp;
                                </div>
                                <div id="example1_filter" class="dataTables_filter inner_head_right" v-if="false">
                                    <input type="text"
                                           class="form-control"
                                           placeholder=""
                                           id="search_content"
                                           v-model="listQuery.name"
                                           @keyup.enter="search($event)">
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
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="80"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="cas相关key"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name=='cas_server'">cas server地址</span>
                                        <span v-else-if="scope.row.name=='cas_login'">cas协议登录uri</span>
                                        <span v-else-if="scope.row.name=='cas_service_validate'">cas协议获取用户信息uri</span>
                                        <span v-else-if="scope.row.name=='oauth_authorization'">oauth协议登录的uri</span>
                                        <span v-else-if="scope.row.name=='oauth_access_token'">oauth协议获取访问令牌的uri</span>
                                        <span v-else-if="scope.row.name=='oauth_profile'">oauth协议获取用户信息的uri</span>
                                        <span v-else-if="scope.row.name=='APP_KEY'">oauth2.0认证client_id</span>
                                        <span v-else>oauth2.0认证密钥</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="cas相关值"
                                        align="center"
                                >
                                    <template slot-scope="scope">{{ scope.row.value }}</template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip
                                        width="150"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <a title="修改" @click="onEdit(scope.row, 'edit')" style="margin-right:8px"><i class="fa fa-pencil" ></i></a>
                                        <a title="查看" @click="onEdit(scope.row, 'check')" style="margin-right: 8px" ><i class="fa fa-eye"></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <update  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <look  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isLookShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "@/utils/permissionUtil";
    import  {getCasAuthList,EditCasAuth} from '@/api/SSL_VPN/authManager/auth'
    import {deleteConfig} from 'api/enWAS/config';
    import update from './edit'
    import look from './look'
    export default {
        components: {
            update,
            look
        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:117,
                list: [],
                isEditShow: false,
                isLookShow:false,
                currentData: null,
                checkedItems:[]
            }
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            onChangeStatus(){
                this.isEditShow = false;
                this.isLookShow = false;
                this.getList();
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
                        this.isEditShow = true
                    } else {
                        this.isLookShow = true
                    }
                }
            },
            getList() {
                getCasAuthList().then(resp => {
                    if(resp.data.items.length>0){
                        this.list =resp.data.items
                    }
                })
            },
            search(){
                if(event.keyCode==13){
                    if(this.listQuery.name!=null){
                        this.getList();
                    }
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.checkedItems = val;
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
