<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i> EnS2S</a></li>
                <li class="active">数据同步管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header clude_tab">
                            <h3 class="box-title" id="res_rdp_title">数据同步设置</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <!-- 表单搜索框部分 -->

                            <el-tabs v-model="activeName" type="border-card" @tab-click="chooseTab">
                                <el-tab-pane label="数据同步状态" name="first">

                                    <div class="row" style="margin-bottom:8px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="refresh_button">
                                                <a><i class="fa">数据同步状态: {{this.if_run=='true'?"启动":"停止"}}</i></a>
                                                <a title="刷新" @click="onRefresh()" style="margin-left: 20px;">
                                                    <i class="fa fa-refresh" aria-hidden="true"> 刷新</i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="list_state"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%">

                                        <el-table-column
                                                prop="serverNum"
                                                align="center"
                                                label="服务号">
                                        </el-table-column>

                                        <el-table-column
                                                prop="syncIpAddr"
                                                align="center"
                                                label="同步服务器地址">
                                        </el-table-column>

                                        <el-table-column
                                                prop="port"
                                                align="center"
                                                label="端口">
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="状态">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.status == 'off'">
                                                    <div><img src="../../../../assets/addIcon/断开.png" alt="图片找不到了" style="width: 18px;height: 18px;border-radius: 50%">  节点故障</div>
                                                </span>
                                                <span v-else>
                                                    <div><img src="../../../../assets/addIcon/连通.png" alt="图片找不到了" style="width: 18px;height: 18px;border-radius: 50%">  节点正常</div>
                                                </span>
                                            </template>
                                        </el-table-column>
                                    </el-table>

                                </el-tab-pane>
                                <el-tab-pane label="数据同步设置" name="second">
                                    <!-- 表单搜索框部分 -->


                                    <el-dialog
                                            title="提示"
                                            :visible.sync="dialogVisible"
                                            width="40%">
                                        <span>需要启动数据同步服务吗？</span>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="onRestart">立即重启</el-button>
                                            <el-button type="primary" @click="onDelay">稍后手动重启</el-button>
                                             <el-button @click="dialogVisible = false" style="margin-right: 15px;">取消</el-button>
                                        </span>
                                    </el-dialog>
                                    <el-row>
                                        <el-col style="padding: 10px 0; border-bottom: 1px solid #DCDFE6; font-size: 16px;">数据同步设置</el-col>
                                    </el-row>
                                    <div class="row" style="margin-bottom:8px; margin-top: 10px;">
                                        <div class="col-sm-12">
                                            <div class="dataTables_length" id="example1_length">

                                                <a title="数据同步服务"> 数据同步服务：
                                                    <el-radio-group :disabled="!if_edit" v-model="if_run"  class="el_put">
                                                        <el-radio label='true'>开启</el-radio>
                                                        <el-radio label='false'>关闭</el-radio>
                                                    </el-radio-group>
                                                    <!--<el-button size="small"
                                                               @click="refresh()" style="margin-right: 40px;background-color: #fff">
                                                        重置
                                                    </el-button>-->
                                                </a>

                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <el-col style="padding: 10px 0; border-bottom: 1px solid #DCDFE6; font-size: 16px;">数据同步设置</el-col>
                                        </div>

                                        <div class="col-sm-12">
                                            <div id="example1_filter" class="dataTables_filter" style="margin-top: 10px;">
                                                 <span>
                                                    <a title="新建数据同步服务器" @click="onAdd()">
                                                        <i class="fa fa-plus"> 新建数据同步服务器</i>
                                                    </a>
                                                &nbsp;
                                                    <a  title="批量删除" @click="onMultiDelete()">
                                                        <i class="fa fa-trash" > 批量删除</i>
                                                    </a>
                                                </span>
                                            </div>

                                        </div>

                                    </div>
                                    <el-table
                                            ref="multipleTable"
                                            :data="list"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="checkBoxAll">
                                        <el-table-column
                                                type="selection"
                                                width="50"
                                                align="center"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="serverNum"
                                                align="center"
                                                label="服务号">
                                        </el-table-column>
                                        <el-table-column
                                                prop="syncIpAddr"
                                                align="center"
                                                label="同步服务器地址">
                                        </el-table-column>
                                        <el-table-column
                                                prop="port"
                                                align="center"
                                                label="端口">
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span v-if="if_run=='true'">
                                                <a @click="onEdit(scope.row)" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                <a @click="onDelete(scope.row)" title="删除" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                                    </span>
                                            </template>
                                        </el-table-column>
                                    </el-table>

                                    <el-row>
                                        <el-col style="margin: 10px 0;">
                                            <el-button
                                                    size="small"
                                                    @click="checkAction()"
                                                    type="primary"
                                                    class="btn_edit"
                                                    >
                                                {{if_edit ? '保存' : '编辑'}}
                                            </el-button>
                                        </el-col>
                                    </el-row>



                                </el-tab-pane>
                            </el-tabs>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <add  @onChangeStatus="onChangeStatus" @addDataSync="addDataSync" v-if="isAddShow"/>
        <edit @onChangeStatus="onChangeStatus" @editDataSync="editDataSync":currentData="currentData" v-if="isEditShow"/>
    </div>
</template>
<script>
    import store from "../../../../store/index";
    import permissionRoutes from 'store/permission';
    import {isReadonly} from "../../../../utils/permissionUtil";
    import add from "./add"
    import edit from "./edit"
    import {mapGetters} from 'vuex';
    import {getDataSyncList, saveSyncList,closeSync,restartSync} from 'api/s2sVPN/dataSync';
    export default {
            components: {
            add, edit},
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:87,
                list:[],
                listLoading: true,
                currentView: null,
                currentData: null,

                checkAll: false,// 对应全选框是否选中
                checkedItems:[],// 被选中的ID列表
                isEditShow: false,
                isAddShow: false,

                activeName:'first',
                if_run:'false',
                if_edit: false,

                list_state:[],
                dialogVisible:false,
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
            },
            onAdd() {

                if (!this.if_edit) {
                    this.$message({
                        type: 'warning',
                        message: '请点击编辑，再新增数据同步!'
                    });
                    return
                }
                if (this.if_run == "false") {
                    this.$message({
                        type: 'warning',
                        message: '请点击启用后，再新增数据同步!'
                    });
                    return
                }
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

            getList() {
                getDataSyncList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.list = response.data;
                        this.list_state = response.data;
                        this.if_run = response.extend.sync_if_apply;
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
            checkAction() {
                if( !this.if_edit ){
                    this.if_edit = true
                    return
                }
                if (this.readOnly==true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                }else {
                    if (this.if_run == "false") {
                        this.$confirm('确认停用?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.if_run = val;
                            closeSync().then(response => {
                                if (response.status == 'SUCCESS'){
                                    this.$message({
                                        type: 'warning',
                                        message: '停用数据同步服务成功!'
                                    });
                                }else {
                                    this.$message({
                                        type: 'warning',
                                        message: '停用数据同步服务失败!'
                                    });
                                }
                            }).catch((e) => {
                                console.log(e)
                            });
                            this.if_edit = false;
                        });
                    } else {
                        this.dialogVisible=true;
                    }
                }

            },

            refresh(){
                this.getList();
            },

            onRestart(){
                saveSyncList(this.list).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '新建数据同步设置成功!'
                        });

                        restartSync().then(response => {
                            if (response.status == 'SUCCESS'){
                                this.$message({
                                    type: 'success',
                                    message: '重启数据同步服务成功!'
                                });

                            }else {
                                this.$message({
                                    type: 'warning',
                                    message: '重启数据同步服务失败!'
                                });
                            }
                        }).catch((e) => {
                            console.log(e)
                        });

                    }else {
                        this.$message({
                            type: 'warning',
                            message: '新建数据同步设置失败!'
                        });
                    }

                    this.if_edit = false;
                    this.dialogVisible=false;
                }).catch((e) => {
                    console.log(e)
                });
            },

            onDelay(){

                saveSyncList(this.list).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '新建数据同步设置成功!'
                        });

                    }else {
                        this.$message({
                            type: 'warning',
                            message: '新建数据同步设置失败!'
                        });
                    }
                    this.if_edit = false;
                    this.dialogVisible=false;
                }).catch((e) => {
                    console.log(e)
                });
            },
            onRefresh() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.getList();
                }
            },

            editDataSync(msg){
                this.removeById(msg.serverNum);
                this.list.push(msg);
            },

            addDataSync(msg){
                this.list.push(msg);
            },

            removeById(serverNum){
                for(var i=0; i<this.list.length; i++) {
                    if(this.list[i].serverNum == serverNum) {
                        this.list.splice(i, 1);
                        break;
                    }
                }
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
                        this.removeById(data.serverNum);
                    }).catch(() => {    // 取消事件
                        this.$message({
                            type: 'warning',
                            message: '已取消删除'
                        });
                    });
                }
            },


            onMultiDelete() {
                if (!this.if_edit) {
                    this.$message({
                        type: 'warning',
                        message: '请点击编辑，再进行批量删除!'
                    });
                    return
                }
                if (this.if_run == "false") {
                    this.$message({
                        type: 'warning',
                        message: '请点击启用，再进行批量删除!'
                    });
                    return
                }
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.checkedItems.length == 0) { // 如果没有一项被选中则弹窗提示
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的数据同步！'
                        });
                        return;
                    }
                    this.$confirm('确认删除' + this.checkedItems.length + '项?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let row = "";
                        for (let i = 0; i < this.checkedItems.length; i++) {
                            row = this.checkedItems[i];
                            this.removeById(row.serverNum);
                        }

                    }).catch(() => {
                        this.$message({
                            type: 'warning',
                            message: '已取消删除'
                        });
                    });
                }
            },

            chooseTab(tab, event) {
                this.if_edit = false;
            }


        }
    }

</script>
<style>
    .search{
        background-color: #3493E0;
    }
    a {
        color: #3493E0;
    }
    .el_put {
        position: relative;
        display: inline-block;
        margin-left: 0px;
    }
</style>