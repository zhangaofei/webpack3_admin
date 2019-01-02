<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i> 防火墙</a></li>
                <li class="active">服务设置</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header clude_tab">
                            <h3 class="box-title" id="res_rdp_title">服务设置</h3>
                        </div>
                        <!-- /.box-header -->

                        <div class="box-body">
                            <div class="row" style="margin-top:20px;">
                            </div>
                            <el-tabs v-model="activeName" type="border-card" @tab-click="chooseTab">
                                <el-tab-pane label="基础服务" name="first">
                                        <!-- 表单搜索框部分 -->

                                        <el-table
                                                ref="multipleTable"
                                                :data="basiclist"
                                                :header-cell-style="headerCellStyle"
                                                border
                                                tooltip-effect="dark"
                                                style="width: 100%">

                                            <el-table-column
                                                    prop="name"
                                                    align="center"
                                                    label="服务名称">
                                            </el-table-column>
                                            <el-table-column
                                                    align="center"
                                                    label="协议"
                                                    :formatter="protocalFormatter">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="ports"
                                                    align="center"
                                                    label="端口">
                                            </el-table-column>

                                        </el-table>
                                        <div class="row" style="margin-top:8px;" >
                                            <div class="block" style="margin-right: 2%;float: right" >
                                                <el-pagination
                                                        @size-change="handleSizeChangeBasic"
                                                        @current-change="handleCurrentChangeBasic"
                                                        :current-page="listQuery1.currentPage"
                                                        :page-sizes="[10, 20, 30, 40,50]"
                                                        :page-size="listQuery1.pageSize"
                                                        layout="total, sizes, prev, pager, next, jumper"
                                                        :total="total1">
                                                </el-pagination>
                                            </div>
                                        </div>

                                </el-tab-pane>
                                <el-tab-pane label="自定义服务" name="second">
                                        <!-- 表单搜索框部分 -->
                                        <div class="row" style="padding: 20px 0 30px;">
                                            <el-col :span="15" style="margin-left: 10px;" id="example1_length">
                                                &nbsp;
                                                <a class="function_btn_main" title="新建" @click="onAdd()">
                                                    <i class="fa  fa-plus"> 新建</i>
                                                </a>
                                                <a class="function_btn_main" title="批量删除" @click="onMultiDelete()">
                                                    <i class="fa fa-trash" > 批量删除</i>
                                                </a>
                                            </el-col>
                                            <el-col :span="8" style="margin-right: 16px; float: right;">
                                                <SearchBox
                                                        width="60px"
                                                        searchBoxId="example2_filter"
                                                        inputBoxId="searchContent2"
                                                        placeholder="请输入关键字"
                                                        @search="search"
                                                        @onClickSearchButton="getDefineList"></SearchBox>
                                            </el-col>
                                            <!--<div class="col-sm-6">-->
                                                <!--<div id="example2_filter" class="dataTables_filter" style="margin-right:53px;float: right">-->
                                                    <!--<input type="text"-->
                                                           <!--class="form-control"-->
                                                           <!--placeholder="请输入关键字"-->
                                                           <!--id="searchContent2"-->
                                                           <!--v-model="listQuery2.searchContent"-->
                                                           <!--@keyup.enter="search($event)"-->
                                                    <!--/>-->
                                                    <!--<span class="glyphicon glyphicon-search serch_head_icon"></span>-->
                                                    <!--<span class="input-group-btn" style="float: right;position: relative;top:-34px">-->
                                                        <!--<button class="btn btn-primary" type="button" @click="getDefineList()" >-->
                                                            <!--<span>搜索</span>-->
                                                        <!--</button>-->
                                                    <!--</span>-->
                                                <!--</div>-->

                                            <!--</div>-->
                                        </div>


                                    <el-table
                                            ref="multipleTable"
                                            :data="definelist"
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
                                                prop="name"
                                                align="center"
                                                label="服务名称">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="协议"
                                                :formatter="protocalFormatter">
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                show-overflow-tooltip
                                                label="端口">
                                            <template  slot-scope="scope">
                                                <span v-for="port in scope.row.portArray">{{port}}<br/></span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                width="130"
                                                label="操作"
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
                                                    @size-change="handleSizeChangeDefine"
                                                    @current-change="handleCurrentChangeDefine"
                                                    :current-page="listQuery2.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery2.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total2">
                                            </el-pagination>
                                        </div>
                                    </div>

                                </el-tab-pane>
                            </el-tabs>
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
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import add from "./add"
    import edit from "./edit"
    import check from './check'
    import {mapGetters} from 'vuex';
    import SearchBox from '@/views/components/searchBox.vue';
    import {getServiceListBasic, getServiceListDefine,deleteService} from 'api/firewall/service';
    export default {
        components: {add, edit, check, SearchBox},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:60,
                basiclist:[],
                definelist:[],
                total1: null,
                total2:null,
                listLoading1: true,
                listLoading2: true,
                currentView: null,
                currentData: null,
                listQuery1:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                listQuery2:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                checkAll: false,// 对应全选框是否选中
                checkedItems:[],// 被选中的ID列表
                isEditShow: false,
                isAddShow: false,
                isLookShow:false,
                activeName:'first',
            }
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getDefineList();
            this.getBasicList();
        },
        methods: {
            search(event, keyword){
                this.listQuery2.searchContent = keyword != undefined ? keyword : this.listQuery2.searchContent;
                if (event.keyCode == 13) {
                    if (this.listQuery2.searchContent != null) {
                        this.getDefineList();
                    }
                }
            },
            onChangeStatus() {
                this.isEditShow = false;
                this.isAddShow = false;
                this.isLookShow = false;
                this.getDefineList();
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
            handleSizeChangeBasic(val) {
                console.log(`每页 ${val} 条`);
                this.listQuery1.pageSize = val;
                this.getBasicList();
            },
            handleCurrentChangeBasic(val) {
                console.log(`当前页: ${val}`);
                this.listQuery1.currentPage = val;
                this.getBasicList();
            },

            handleSizeChangeDefine(val) {
                console.log(`每页 ${val} 条`);
                this.listQuery2.pageSize = val;
                this.getDefineList();
            },
            handleCurrentChangeDefine(val) {
                console.log(`当前页: ${val}`);
                this.listQuery2.currentPage = val;
                this.getDefineList();
            },
            getBasicList() {
                getServiceListBasic(this.listQuery1).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.basiclist = response.data;
                        this.total1 = response.extend.page.totalHits;
                        this.listQuery1.currentPage = response.extend.page.currentPage;

                    }
                }).catch((e) => {
                    console.log(e)
                });

            },
            getDefineList(keyword) {
                this.listQuery2.searchContent = keyword != undefined ? keyword : this.listQuery2.searchContent;
                getServiceListDefine(this.listQuery2).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.definelist = response.data;
                        this.total2 = response.extend.page.totalHits;
                        this.listQuery2.currentPage = response.extend.page.currentPage;

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

            chooseTab(tab, event) {
                console.log(tab, event,'--tab');
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
                        deleteService(fwtimeDto).then(response => {
                            if (response.status == 'SUCCESS') {
                                if (response.data.indexOf("-") > -1) {
                                    var name = response.data.split("-")[1];
                                    this.$message({
                                        type: 'warning',
                                        message: '不可删除! 名称为 ' + name + " 的服务设置已被引用"
                                    });
                                } else {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.getDefineList();
                                }

                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '删除失败!'
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
                            type: 'warning',
                            message: '请选择要删除自定义服务！'
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
                        deleteService(fwtimeDto).then(response => {
                            if (response.status == 'SUCCESS') {
                                if (response.data.indexOf("-") > -1) {
                                    var name = response.data.split("-")[1];
                                    this.$message({
                                        type: 'warning',
                                        message: '不可删除! 名称为 ' + name + " 的服务设置已被引用"
                                    });
                                } else {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.getDefineList();
                                }

                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '删除失败!'
                                });
                            }
                        })
                    }).catch(() => {

                    });
                }
            },

            protocalFormatter(row, column) {

                var show = "";

                if (row.protocal=="all"){
                    show = "tcp/udp";
                }else {
                    show = row.protocal;
                }
                return show;

            },
    /*
            portFormatter(row, column) {

                var show = "";

                var list = row.protocals;

                for (var i=0;i<list.length-1;i++){

                    var portlist = list[i].portList;

                    for (var j=0;j<portlist.length-1;j++){
                        show = show + portlist[j].begin+"-"+portlist[j].end+" ";
                    }
                    show = show + portlist[portlist.length-1].begin+"-"+portlist[portlist.length-1].end+" ／ ";
                }

                var last = list[list.length-1].portList;
                for (var k=0;k<last.length-1;k++){
                    show = show + last[k].begin+"-"+last[k].end+" ";
                }
                show = show + last[last.length-1].begin+"-"+last[last.length-1].end;

                return show;
            }
            */

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
</style>