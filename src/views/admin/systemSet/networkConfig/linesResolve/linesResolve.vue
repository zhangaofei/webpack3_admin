<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a><i class="fa fa-folder-open"></i>系统管理</a></li>
                <li><a>网络配置</a></li>
                <li class="active">智能线路解析</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">智能线路解析</h3>
                        </div>
                        <div class="box-body">
                            <el-row style="padding: 20px 0 30px">
                                <el-col>
                                    <a class="function_btn_main" @click="onAdd(linesList)" style="display: inline-block;">
                                        <i class="fa fa-plus" > 新建</i>
                                    </a>
                                    <a class="function_btn_main" @click="multipleDelete()" style="display: inline-block;">
                                        <i class="fa fa-trash" > 批量删除</i>
                                    </a>
                                </el-col>
                            </el-row>
                            <el-table
                                    ref="multipleTable"
                                    :data="linesList"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange"
                                    >
                                <el-table-column
                                        type="selection"
                                        width="80"
                                        align="center"
                                        :selectable="isAvailable"
                                >
                                </el-table-column>
                                <el-table-column
                                        width=""
                                        label="运营商"
                                        align="center">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.isp==1">
                                            默认线路
                                        </div>
                                        <div v-if="scope.row.isp==2">
                                            教育网
                                        </div>
                                        <div v-if="scope.row.isp==3">
                                            电信
                                        </div>
                                        <div v-if="scope.row.isp==4">
                                            移动
                                        </div>
                                        <div v-if="scope.row.isp==5">
                                            联通
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="netip"
                                        align="center"
                                        label="地址">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        label="状态">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.state==0">
                                            停用
                                        </div>
                                        <div v-if="scope.row.state==1">
                                            启用
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        align="center"
                                        width="130"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <a  @click="onEdit(scope.row, 'edit')" style="margin-right:8px"><i class="fa fa-pencil"></i></a>
                                        <a  @click="onEdit(scope.row, 'check')"><i class="fa fa-eye"></i></a>&nbsp;&nbsp;
                                        <a  @click="singleDelete(scope.row)" style="margin-right: 8px" v-if="scope.row.isp==1?false:true"><i class="fa fa-trash"></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <add @onChangeStatus="onChangeStatus" :addData="linesList"   v-if="isAddShow"/>
        <edit @onChangeStatus="onChangeStatus" :currentData="currentData" :editData ="linesList" v-if="isEditShow"/>
        <look @onChangeStatus="onChangeStatus" :currentData="currentData" :editData ="linesList" v-if="isLookShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import  edit from "./edit"
    import  add from "./add"
    import  look from "./look"
    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
    import {getSmartLinkList, setSmartLink,smartLinkDel} from "../../../../../api/systemSet/new_networkConfig/linesResolve";


    export default{
        components: {
            add,
            edit,
            look
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:144,
                isShow: false,
                rules: {},
                linesList: [],
                listLoading: true,
                listQuery: {
                    page_size: 10,
                    page: 1// 总条数
                },
                currentData: null,
                multipleSelection: [],
                isAddShow:false,
                isEditShow: false,
                isLookShow:false
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        methods: {
            onChangeStatus(){
                this.isAddShow = false;
                this.isEditShow = false;
                this.isLookShow = false;
                this.getList()
            },
            onAdd(){
                this.isAddShow = true;
            },
            onEdit(row, type){
                if(type == 'edit'){
                    this.isEditShow = true;
                } else {
                    this.isLookShow = true;
                }
                this.currentData = row;
            },
            isAvailable(row){
                if (row.isp==1){
                    return false;
                }
                return true;
            },

            singleDelete(row){
                let arrId=[];
                arrId.push(row.id);
                this.delete(arrId);
            },
            multipleDelete(){
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择要删除的智能线路解析！'
                    });
                    return;
                }
                let idArr = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    let row = this.multipleSelection[i];
                    idArr.push(row.id);
                }
                this.delete(idArr);
            },
            delete(id) {
                let information = "确认删除?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    smartLinkDel({id:id}).then((resp)=> {
                        if (resp.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功！'
                            });
                            this.multipleSelection = [];
                            this.getList();
                        } else {

                        }
                    }).catch((err)=> {
                        console.log("删除发生错误:", err);
                    });
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleStop(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let state = '';
                    if (row.state == 'Y') {
                        state = 'N'
                    }
                    if (row.state == 'N') {
                        state = 'Y'
                    }
                    setSmartLink({id: row.id, netip: row.netip, state: state}).then((resp) => {
                        this.getList();
                    })
                }
            },
            getList() {
                getSmartLinkList(this.listQuery).then((resp)=> {
                    this.linesList = resp.data.res;
                }).catch(err=> {

                });
            }
        }
    }
</script>
<style>
    a {
        color: #3493E0;
    }
</style>