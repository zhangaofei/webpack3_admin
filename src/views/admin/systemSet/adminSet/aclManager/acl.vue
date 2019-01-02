<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i> 系统设置</a></li>
                <li><a >管理员设置</a></li>
                <li class="active">ACL管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=" border-top-color: #6cbaf5 !important;">
                        <div class="box-header">
                            <h3 class="box-title">ACL管理</h3>
                        </div>
                        <div class="box-body">
                            <div class="row" style="margin-bottom:8px;">
                            </div>
                            <el-tabs v-model="activeName" type="border-card" @tab-click="chooseTab">
                                <el-tab-pane label="白名单" name="first">
                                    <a title="新建" @click="onAdd()" style="    width: 71px;padding: 10px; display: inline-block;">
                                        <i class="fa  fa-plus" >&nbsp;新建</i>
                                    </a>
                                    <el-table
                                            ref="multipleTable"
                                            :data="whiteList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                        <el-table-column
                                                label="IP"
                                                align="center"
                                                prop="ip">
                                        </el-table-column>
                                        <el-table-column
                                                prop="type"
                                                align="center"
                                                label="类型"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="status"
                                                align="center"
                                                label="状态">
                                        </el-table-column>
                                        <el-table-column
                                                prop="remark"
                                                align="center"
                                                label="备注">
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a @click="onEditAcl(scope.row)" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                <a title="删除" @click="singleDelete(scope.row)" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- page start -->
                                    <div class="row" style="margin-top:8px;">
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="whitePage.page"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="whitePage.page_size"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="whitePage.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <!-- page end -->
                                </el-tab-pane>
                                <el-tab-pane label="黑名单" name="second">
                                    <a title="新建" @click="onAddBlack()" style="    width: 71px;padding: 10px; display: inline-block;">
                                        <i class="fa  fa-plus" >&nbsp;新建</i>
                                    </a>
                                    <el-table
                                            ref="multipleTable"
                                            :data="blackList"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                        <el-table-column
                                                label="IP"
                                                align="center"
                                                prop="ip">
                                        </el-table-column>
                                        <el-table-column
                                                prop="type"
                                                align="center"
                                                label="类型"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="status"
                                                align="center"
                                                label="状态">
                                        </el-table-column>
                                        <el-table-column
                                                prop="remark"
                                                align="center"
                                                label="备注">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a @click="onEditAcl(scope.row)" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                <a title="删除" @click="singleDelete(scope.row)" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- page start -->
                                    <div class="row" style="margin-top:8px;" id="pages_list">
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="whitePage.page"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="whitePage.page_size"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="whitePage.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <!-- page end -->
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <aclAdd  @onChangeStatus="onChangeStatus" v-if="isAddAclShow"/>
        <aclAddBlack @onChangeStatus="onChangeStatus" v-if="isAddAclBlackShow"/>
        <aclUpdate  @onChangeStatus="onChangeStatus" :currentAcl="currentAcl" v-if="isEditAclShow"/>
        <!--<addBridge  @onChangeStatus="onChangeStatus" v-if="isaddBridgeShow"/>-->
        <!--<editBridge  @onChangeStatus="onChangeStatus" :currentVir="currentVir" v-if="iseditBridgeShow"/>-->
    </div>
</template>

<script>
    import aclAdd from './aclAdd.vue'
    import aclUpdate from './aclUpdate.vue'
    import aclAddBlack from './aclAddBlack.vue'
    import {notifyFault} from "utils/notify"
    import {mapGetters} from 'vuex'
    import {delVirNet, getNetList,bridgeDel} from "../../../../../api/systemSet/new_networkConfig/new_interfaceApi";
    import {aclDel, aclList} from "../../../../../api/systemSet/adminSet/aclManager";

    export default{
        components: {
            aclAdd,
            aclUpdate,
            aclAddBlack,
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                rules:{},
                whiteList:[],
                activeName:'first',
                activeName2:'one',
                activeName3:'1',
                list: [],
                blackList:[],
                whitePage: {
                    page: 1,
                    page_size: 10,
                    search_content:0,
                    type: 0,
                },
                currentAcl: null,
                multipleSelection: [],
                isEditAclShow: false,
                isAddAclShow: false,
                isAddAclBlackShow:false

            }
        },
        created(){
            this.getWhiteList();
            this.getBlackList()
        },
        methods: {
            onChangeStatus(){
                this.isAddAclShow = false;
                this.isEditAclShow = false;
                this.isAddAclBlackShow = false;
                this.getWhiteList();
                this.getBlackList()
            },
            onAdd(){
                this.isAddAclShow = true;
            },
            onAddBlack(){
                this.isAddAclBlackShow = true;
            },
            onEditAcl(row){
                this.currentAcl = row;
                console.log("选中的row:",this.currentAcl)
                this.isEditAclShow = true;
            },
            getWhiteList(){
                aclList(this.whitePage.page,this.whitePage.page_size,this.whitePage.search_content,this.whitePage.type).then((resp)=>{
                    if (resp.status == 1){
                        this.whiteList = resp.data.items;
                        for (let i = 0; i < this.whiteList.length; i++){
                            if(this.whiteList[i].type == 0)
                            {
                                this.whiteList[i].type = '白名单';
                            }
                            else if (this.whiteList[i].type ==1)
                            {
                                this.whiteList[i].type = '黑名单';
                            }
                            if(this.whiteList[i].status == 0)
                            {
                                this.whiteList[i].status = 'Disable';
                            }
                            else if(this.whiteList[i].status == 1)
                            {
                                this.whiteList[i].status = 'Enable';
                            }
                        }
                        this.whitePage.total=resp.data.count;
                    }
                }).catch(err=>{

                });
            },
            getBlackList(){
                aclList(this.whitePage.page,this.whitePage.page_size,this.whitePage.search_content,this.type = 1).then((resp)=>{
                    if (resp.status == 1){
                        this.blackList= resp.data.items;
                        for (let i = 0; i < this.blackList.length; i++){
                            if(this.blackList[i].type == 0)
                            {
                                this.blackList[i].type = '白名单';
                            }
                            else if (this.blackList[i].type ==1)
                            {
                                this.blackList[i].type = '黑名单';
                            }
                            if(this.blackList[i].status == 0)
                            {
                                this.blackList[i].status = 'Disable';
                            }
                            else if(this.blackList[i].status == 1)
                            {
                                this.blackList[i].status = 'Enable';
                            }
                        }
                        this.whitePage.total=resp.data.count;
                    }
                }).catch(err=>{

                });
            },
            singleDelete(row){
                console.log("删除ID",row)
                this.deleteACL(row.id);

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            deleteACL(id) {
                let information="确认删除此名单?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let idArr = [];
                    idArr.push(id);
                    console.log("删除字典",id)
                    aclDel({id:idArr}).then((resp)=>{
                    if(resp.status == 1){
                        this.$message({
                            type:'success',
                            message:'删除成功！'
                        });
                        this.multipleSelection=[];
                        this.getWhiteList();
                        this.getBlackList();

                    }else {

                    }
                })
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.whitePage.page_size=val;
                this.getWhiteList();
                this.getBlackList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.whitePage.page=val;
                this.getWhiteList();
                this.getBlackList();
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                        .then(_ => {
                            done();
                        })
                        .catch(_ => {});
            },
            chooseTab(tab, event) {
                console.log(tab, event,'--tab');
            },
        }
    }
</script>
<style>
    /* 设置弹出框大小*/
    /*.router .dialog{*/
        /*min-width: 830px;*/
    /*}*/
    /*.router .el-dialog__header{*/
        /*padding-left:5px ;*/
    /*}*/
    /*.router  .el-dialog__title {*/
        /*margin-left: 50px;*/
    /*}*/
    /*.router .el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/
    .router-form .el-form-item__label {
        /*float: left;*/
        /*min-width:135px ;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
    }
    </style>
<style  scoped>
    .el-dialog--tiny {
        width: 25%;
    }
    .router .el_put{
        position: relative;
        display: inline-block;
        margin-left: 80px;
    }
    .router .el_sel{
        margin-left: 80px;
    }

    .router .el-dialog__footer {
        background-color: #E7E7E7;
        border-top: 1px solid #E7E7E7;
        height: 100px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    .router-form .el-form-item {
        margin-bottom: 20px;
    }

    .router-form .el-form-item__error {
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0;*/
        /*position: absolute;*/
        /*top: 91%;*/
        /*left: 200px;*/
    }
    /*-----------------*/
    .el-dialog__footer {
        background-color: #E7E7E7;
        border-top: 1px solid #E7E7E7;
        height: 100px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }
</style>
<style scoped>
</style>

