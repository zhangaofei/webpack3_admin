<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-folder-open"></i> EnSSL</a></li>
                <li class="active">L3-Net应用</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">L3-Net应用</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->
                            <div class="row" style="padding: 20px 0 30px;">
                                <el-col :span="15" style="margin-left: 10px;">
                                    &nbsp;
                                    <a class="function_btn_main" title="新建" @click="onAdd('add')">
                                        <i class="fa  fa-plus" id="user_group_set_new_add"> 新建</i>
                                    </a>
                                    <a class="function_btn_main" title="批量删除" @click="multipleDelete()">
                                        <i class="fa fa-trash"  id="user_group_set_batch_del"> 批量删除</i>
                                    </a>
                                    <a class="function_btn_main" title="虚拟网络" @click="onAdd('virtual')">
                                        <i class="fa fa-life-ring"  id="user_group_set"> 虚拟网络</i>
                                    </a>
                                </el-col>
                                <el-col :span="8" style="margin-right: 16px; float: right;">
                                    <SearchBox
                                            width="60px"
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
                                           <!--@keyup.enter="search($event)"-->
                                    <!--/>-->
                                    <!--<span class="glyphicon glyphicon-search serch_head_icon"></span>-->
                                    <!--<span class="input-group-btn"  style="float: right;position: relative;top:-34px">-->
                                            <!--<button class="btn btn-primary" type="button" @click="getList()" >-->
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
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="80"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="应用图标"
                                        width="150"
                                        align="center"
                                >

                                    <template slot-scope="scope"> <img :src="scope.row.iconPath && scope.row.iconPath.indexOf('resource/image') != -1 ? scope.row.iconPath : '/api/admin/'+ scope.row.iconPath"  style="width:40px;border-radius:50%"></template>

                                </el-table-column>

                                <el-table-column
                                        prop="appName"
                                        label="应用名称"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="appType"
                                        label="应用类型"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="remark"
                                        label="说明"
                                        align="center"
                                        show-overflow-tooltip>
                                </el-table-column>

                                <el-table-column
                                        label="操作"
                                        width="150"
                                        align="center"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a @click="onHandle(scope.row, 'edit')" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                        <a title="删除" @click="singleDelete(scope.row)" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                        <a @click="onHandle(scope.row, 'check')" title="查看" ><i class="fa fa-eye" ></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- page start -->
                            <div class="row" style="margin-top:8px;" id="pages_list">
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
                            <!-- page end -->

                        </div>
                    </div>
                </div>
            </div>

        </section>
        <add  @onChangeStatus="onChangeStatus" v-if="isAddShow"/>
        <edit  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
        <check @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isCheckShow"/>
        <virtualNet @onChangeStatus="onChangeStatus" v-if="isVirtualShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import add from "./add"
    import edit from "./edit"
    import check from "./check"
    import virtualNet from './virtualNet.vue'
    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
    import {delL3Net, getL3NetList, getPolicies} from "../../../../../api/SSL_VPN/new_resourceManager/new_L3Net";
    import SearchBox from '@/views/components/searchBox.vue';
    export default{
        components: {
            add,
            edit,
            check,
            virtualNet,
            SearchBox
        },
        computed: {},
        data(){
            let comBase = (rule, value, callback) => {
                if(/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位字母、数字、字符、下划线"));
                }else {
                    callback();
                }
            };
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:25,
                rules: {
                    appName: [
                        { validator: comBase, trigger: 'blur' }
                    ]
                },
                lookInfo:{
                    appName: '',
                    appType: 'FN',
                    appParams: '',
                    programPath: '',
                    remark: '',
                    iconFile: '',
                    iconPath: '',
                    appsPoliciesJson:[
                        {protocol:'TCP', ip:'', port:''}
                    ],
                    policiesStr:'',
                    radio:1
                },
                editVisible:false,
                lookVisible:false,
                list: [],
                role: '',
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    searchContent: "",
                    total:0
                },
                currentData: null,
                multipleSelection: [],
                isAddShow:false,
                isEditShow:false,
                isCheckShow:false,
                isVirtualShow:false
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
                this.isVirtualShow = false;
                this.getList();
            },
            onAdd(type) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'add'){
                        this.isAddShow = true;
                    } else {
                        this.isVirtualShow = true;
                    }
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
                this.userQuery.currentPage = val;
                this.getList();
            },
            getPolicies(id) {
                getPolicies(id).then((resp)=>{
                    if(resp.status=='SUCCESS'){
                        let arr = resp.data;
                        let str='';
                        let protocol='';
                        let ip='';
                        let port='';
                        for(let i=0;i<arr.length;i++){
                            protocol=arr[i].protocol;
                            ip=arr[i].ip;
                            port=arr[i].port;
                            str+=protocol+':'+ip+':'+port+';'
                        }
                        this.lookInfo.policiesStr = str;
                    }
                }).catch(e=>{
                    console.log("新建auth出错",e);
                });
            },

            search(event, keyword){
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                if(event.keyCode==13){
                    console.log("你按了回车键，搜索的内容是： "+this.listQuery.searchContent);
                    if(this.listQuery.searchContent!=null){
                        this.getList();
                    }
                }
            },
            getList(keyword) {
                this.listQuery.searchContent = keyword != undefined ? keyword : this.listQuery.searchContent;
                getL3NetList(this.listQuery.cur_page,this.listQuery.pageSize,this.listQuery.searchContent).then((resp)=>{
                    this.list=resp.data;
                    this.listQuery.total=resp.extend.page.totalHits

                }).catch(err=>{

                });
            },
            singleDelete(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.deleteNet(row.id);
                }
            },

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
                            message: '请选择要删除的L3-net！'
                        });
                        return;
                    }
                    var newArr = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {

                        newArr.push(this.multipleSelection[i].id)
                    }
                    let id = newArr.join(',')
                    this.deleteNet(id);
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteNet(id) {
                let information="确认删除?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                delL3Net(id).then((resp)=>{
                    console.log(resp,'delete-resp')
                    if(resp.status=="SUCCESS"){
                        this.$message({
                            type:'success',
                            message:'删除成功！'
                        });
                        this.multipleSelection=[];
                        this.getList();
                    }else {
                        this.$message({
                            type:'warning',
                            message:resp.code.info
                        });
                    }
                }).catch((err)=>{
                    console.log("删除发生错误:",err);
                    notifyFault();
                });
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize=val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.cur_page=val;
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