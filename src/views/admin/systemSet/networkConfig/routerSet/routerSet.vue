<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i>系统管理</a></li>
                <li><a >网络配置</a></li>
                <li class="active">路由设置</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header clude_tab">
                            <h3 class="box-title">路由设置</h3>
                        </div>

                        <div class="box-body">
                            <div class="row" style="margin-bottom:8px;">
                                <div class="col-sm-6">
                                    <div class="dataTables_length" id="example1_length">&nbsp;
                                    </div>
                                </div>
                            </div>
                            <el-tabs v-model="activeName" type="border-card" @tab-click="chooseTab">
                                <el-tab-pane label="静态路由" name="first">
                                    <el-row style="padding: 15px 0 30px">
                                        <el-col>
                                            <a class="function_btn_main" @click="onAddSta" style="display: inline-block;">
                                                <i class="fa fa-plus" > 新建</i>
                                            </a>
                                            <a class="function_btn_main" @click="mulDelStaRouter()" style="display: inline-block;">
                                                <i class="fa fa-trash" > 批量删除</i>
                                            </a>
                                        </el-col>
                                    </el-row>

                                    <el-table
                                            ref="multipleTable"
                                            :data="staList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                        <el-table-column
                                                type="selection"
                                                align="center"
                                                width="80">
                                        </el-table-column>
                                        <el-table-column
                                                prop="destinationAddress"
                                                label="目标地址"
                                                align="center"
                                                show-overflow-tooltip
                                                >
                                        </el-table-column>
                                        <el-table-column
                                                prop="gateway"
                                                align="center"
                                                label="网关"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                prop="netMask"
                                                align="center"
                                                label="子网掩码"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                prop="flags"
                                                align="center"
                                                label="Flags">
                                        </el-table-column>
                                        <el-table-column
                                                prop="metric"
                                                align="center"
                                                label="Metric">
                                        </el-table-column>
                                        <el-table-column
                                                prop="ref"
                                                align="center"
                                                label="Ref">
                                        </el-table-column>
                                        <el-table-column
                                                prop="use"
                                                align="center"
                                                label="Use">
                                        </el-table-column>
                                        <el-table-column
                                                prop="device"
                                                align="center"
                                                label="接口">
                                        </el-table-column>

                                        <el-table-column
                                                label="操作"
                                                align="center"
                                                width="100"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a  title="删除"  @click="sinDelStaRouter(scope.row)"><i class="fa fa-trash"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>


                                    <div class="row" style="margin-top:8px;" id="">
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleStaticSizeChange"
                                                    @current-change="handleStaticCurrentChange"
                                                    :current-page="staticListQuery.cur_page"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="staticListQuery.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="staticListQuery.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="策略路由" name="second">
                                    <el-row style="padding: 15px 0 30px">
                                        <el-col>
                                            <a class="function_btn_main" @click="onAddPol" style="display: inline-block;">
                                                <i class="fa fa-plus" > 新建</i>
                                            </a>
                                            <a class="function_btn_main" @click="mulDelPolRouter()" style="display: inline-block;">
                                                <i class="fa fa-trash" > 批量删除</i>
                                            </a>
                                        </el-col>
                                    </el-row>
                                    <el-table
                                            ref="multipleTable"
                                            :data="polList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                        <el-table-column
                                                type="selection"
                                                align="center"
                                                width="80">
                                        </el-table-column>
                                        <el-table-column
                                                prop="targetAddress"
                                                align="center"
                                                label="源地址"
                                                show-overflow-tooltip
                                                >
                                        </el-table-column>
                                        <el-table-column
                                                prop="gateway"
                                                align="center"
                                                label="网关"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                prop="netMask"
                                                align="center"
                                                label="子网掩码">
                                        </el-table-column>
                                        <el-table-column
                                                prop="device"
                                                align="center"
                                                label="接口"
                                                show-overflow-tooltip>
                                        </el-table-column>

                                        <el-table-column
                                                label="操作"
                                                align="center"
                                                width="150"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a  title="删除"  @click="sinDelPolRouter(scope.row)"><i class="fa fa-trash"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
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
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <addSta  @onChangeStatus="onChangeStatus" v-if="isAddStaShow"/>
        <addPol  @onChangeStatus="onChangeStatus" v-if="isAddPolShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import  addSta from "./addStatic"
    import  addPol from "./addPolicy"
    import {notifyFault} from "utils/notify"
    import {
        delPolRoutes, delStaRoutes,
        getPolRoutesList,
        getStaRoutesList
    } from "../../../../../api/systemSet/new_networkConfig/new_routerApi";


    export default{
        components: {
            addSta ,
            addPol
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:15,
                radio:1,
                rules:{},
                isShow:false,
                hide:true,
                box:[],
                addStaRouter:{
                    radio:1,
                    ipType:'ipv4',
                    staticRouteList:[
                        { destinationAddress:'',netMask:'',gateway:'', metric:'', device:''}
                    ]
                },
                activeName:'first',
                activeName2:'one',
                activeName3:'three',
                staList: [],
                polList: [],
                polNames:[],//储存device名
                role: '',
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    total:0
                },
                staticListQuery:{
                    cur_page: 1,
                    pageSize: 10,
                    total:0
                },
                currentView: null,
                currentUser: null,
                multipleSelection: [],
                isAddStaShow:false,
                isAddPolShow:false
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        methods: {
            onChangeStatus(){
                this.isAddStaShow = false;
                this.isAddPolShow = false;
                this.getList()

            },
            onAddSta(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isAddStaShow = true;
                }
            },
            onAddPol(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isAddPolShow = true;
                }
            },

//-------------------iptype 选择-----------------------------------------------
            radioIpRol(){
                if(this.addRolRouter.radio==1){
                    this.addRolRouter.ipType="ipv4"
                }
                if(this.addRolRouter.radio==2){
                    this.addRolRouter.ipType="ipv6"
                }
            },
            handleStaticSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.staticListQuery.pageSize = val;
                this.getList();
            },
            handleStaticCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.staticListQuery.cur_page = val;
                this.getList();
            },
            resetForm(formName) {
                this.addStaVisible=false;
                this.editStaVisible=false;
                this.addPolVisible=false;
                this.editPolVisible=false;
              this.$refs[formName].resetFields();
            },

            getList() {
                console.log("进入getList")
                getStaRoutesList(this.staticListQuery.cur_page,this.staticListQuery.pageSize).then((resp)=>{
                    this.staList=resp.data;
                    for (let i = 0; i < this.staList.length; i++){
                        this.staList[i].flags = this.staList[i].flags.toLowerCase();
                    }
                    this.staticListQuery.total=resp.extend.page.totalHits
                }).catch(err=>{

                });

                getPolRoutesList(this.listQuery.cur_page,this.listQuery.pageSize).then((resp)=>{
                    this.polList=resp.data;
                    this.listQuery.total=resp.extend.page.totalHits
                    console.log(resp.data,'pol--')

                }).catch(err=>{

                });
            },
//            -------------删除--------------
            sinDelStaRouter(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let sinArr = []
                    sinArr.push(row)
                    this.delStaRouter(sinArr);
                }
            },
            mulDelStaRouter(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的静态路由！'
                        });
                        return;
                    }
                    this.delStaRouter(this.multipleSelection);
                }
            },
            sinDelPolRouter(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.delPolRouter(row.id);
                }
            },
            mulDelPolRouter(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的策略路由！'
                        });
                        return;
                    }

                    var newArr = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {

                        newArr.push(this.multipleSelection[i].id)
                    }
                    let id = newArr.join(',')
                    this.delPolRouter(id);
                }

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delStaRouter(app) {
                console.log(app,'app')
                let information="确认删除此静态路由?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                delStaRoutes(app).then((resp)=>{
                    console.log(resp,'delete-resp')
                    if(resp.status=="SUCCESS"){
                        this.$message({
                            type:'success',
                            message:'删除成功！'
                        });
                        this.multipleSelection=[];
                        this.getList();
                    }else {
//                        this.$message({
//                            type:'warning',
//                            message:'操作失败！'+codeMessage(resp.code)
//                        });
                    }
                }).catch((err)=>{
                    console.log("删除发生错误:",err);
                    notifyFault();
                });
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });
            },
            delPolRouter(id) {
                let information="确认删除此策略路由?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                delPolRoutes(id).then((resp)=>{
                    if(resp.status=="SUCCESS"){
                        this.$message({
                            type:'success',
                            message:'删除成功！'
                        });
                        this.multipleSelection=[];
                        this.getList();
                    }else {
//                        this.$message({
//                            type:'warning',
//                            message:'操作失败！'+codeMessage(resp.code)
//                        });
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
                console.log(`每页 ${val} 条`);
                this.listQuery.pageSize=val;
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.listQuery.cur_page=val;
                this.getList();
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                        .then(_ => {
                            done();
                        })
                        .catch(_ => {});
            },
            chooseTab(tab, event) {
                console.log(tab, event);
            },
        }
    }
</script>
<style  scoped>
    a {
        color: #3493E0;
    }
    /*.el-dialog--tiny {*/
        /*width: 25%;*/
    /*}*/

    /* 设置弹出框大小*/
    /*.router .el-dialog--small {*/
        /*width: 1000px!important;*/
        /*height:780px!important;*/
    /*}*/
    /*.router  .el-dialog__title {*/
        /*!*line-height: 1;*!*/
        /*margin-left: 52px;*/
    /*}*/
    /*.el-dialog__footer {*/
        /*background-color: #E7E7E7;*/
        /*border-top: 1px solid #E7E7E7;*/
        /*height: 100px;*/
        /*border-bottom-right-radius: 4px;*/
        /*border-bottom-left-radius: 4px;*/
    /*}*/
    /*.router-form{*/
        /*margin-left:90px;*/
    /*}*/
    /*.router-form .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 490px!important;*/
        /*margin-left: 96px;*/
    /*}*/


    /*.router-form .user-select{*/
    /*flaot:left;*/
    /*margin-left: 305px;*/
    /*}*/

    /*.router-form .el-form-item__content .el-input .el-input__inner {*/
    /*width: 488px;*/
    /*}*/
    .router-form  .el_port>.el-input__inner{
        /*width: 350px;*/
    }

    /*.router-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width:135px ;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
    /*}*/


    /*.router-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.router-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 4px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 306px;*/
    /*}*/


    /*.form-user-select{*/
        /*min-width: 488px!important;*/
        /*width: 488px!important;*/
    /*}*/
    /*.router-form .el-select{*/
        /*width:488px;*/
    /*}*/
    /*.route_put{*/
        /*padding-top:5px ;*/
        /*padding-bottom: 5px;*/
    /*}*/

</style>
<style>
    /*.router .rou_dialog{*/
        /*min-width:950px;*/
    /*}*/
</style>