<template>
    <div class="vlan-content">
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i>系统管理</a></li>
                <li><a >网络配置</a></li>
                <li class="active">VLAN</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="overflow: hidden;">
                        <div class="box-header vlan-header-title">
                            <h3 class="box-title">VLAN</h3>
                        </div>

                        <div class="box-body">
                            <el-row style="padding: 15px 0 30px">
                                <el-col>
                                    <a class="function_btn_main" @click="newAddValan()" style="display: inline-block;">
                                        <i class="fa fa-plus" > 新建</i>
                                    </a>
                                    <a class="function_btn_main" @click="delAllItem()" style="display: inline-block;">
                                        <i class="fa fa-trash" > 批量删除</i>
                                    </a>
                                </el-col>
                            </el-row>
                            <div content="vlan-table-box">
                                <template>
                                    <el-table
                                            ref="multipleTable"
                                            :data="listData"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange"
                                            >
                                        <el-table-column
                                                type="selection"
                                                align="center"
                                                width="80"
                                                prop="isChoose">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="vlanid"
                                                label="VLAN ID"
                                                >
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="device"
                                                label="接口"
                                                >
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="netip"
                                                label="IP地址"
                                               >
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="netmask"
                                                label="子网掩码"
                                                >
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="id"
                                                label="操作"
                                                width="130"
                                        >
                                            <template slot-scope="scope">
                                                <el-row>
                                                    <el-col :span="6" :offset="4">
                                                        <a @click="viewItem(scope.row)" title="搜索"><i class="fa fa-eye"></i></a>
                                                    </el-col>
                                                    <el-col :span="6">
                                                        <a @click="editItem(scope.row)" title="编辑"><i class="fa fa-pencil"></i></a>
                                                    </el-col>
                                                    <el-col :span="6">
                                                        <a @click="deleteItem(scope.row)" title="删除"><i class="fa fa-trash"></i></a>
                                                    </el-col>
                                                </el-row>
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
                                </template>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <AddVlan
                @sureNewAdds="sureNewAdds"
                @cancleNewVlan="cancleNewVlan"
                :propsA="newUserDevic"
                :propsB="dialogVisible"
                :propsC="newAddForm"
                :vlanid="vlanid"
                :propsD="type"></AddVlan>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import AddVlan from './NewAddVlan';
    import {
        getVlanList,
        getNetInterface,
        addNewVlan,
        deleteVlan,
        delAllVlan,
        editVlan
    } from "../../../../../api/systemSet/networkConfig/vlan";

    export default {
        data () {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:1701,
                type: 'add',
                name: 'vlan',
                dialogVisible: false,
                allData: [],
                listData: [],
                tableData:[],
                vlanid: 0,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total: null
                },
                newAddForm: {
                    vlanid: '',
                    device: '',
                    netip: '',
                    netmask: '',
                    isChoose: false
                },
                newUserDevic:[],
                rules:{
                    vlanid: [
                        { required: true, message: '请输入vlanid', trigger: 'blur' }
                    ],
                    device: [
                        { required: true, message: '请选择接口', trigger: 'blur' }
                    ],
                    netip: [
                        { required: true, message: '请输入ip地址', trigger: 'blur' }
                    ],
                    netmask: [
                        { required: true, message: '请输入子网掩码', trigger: 'blur' }
                    ]
                },
                multipleSelection:[]
            }
        },
        created () {
            this.readOnly = isReadonly(this.pageId);
            this.getVlanTableList();
        },
        components: {
            AddVlan
        },
        methods: {
            getVlanTableList () {
                var that = this;
                getVlanList(this.listQuery).then((res) => {
                    that.$nextTick(()=>{
                        that.listData = res.data;
                        this.listQuery.total = res.data.length;
                    })
                });
                getNetInterface().then((res) => {
                    that.$nextTick(()=>{
                        that.allData = res.data;
                        that.newUserDevic = that.allData.map((item) => {
                            return item.device
                        });
                    });
                })
            },
            newAddValan () {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.newAddForm = {
                        vlanid: '',
                        device: '',
                        netip: '',
                        netmask: '',
                        isChoose: false
                    };
                    this.showNewAdd();
                    this.getVlanTableList();
                }
            },
            showNewAdd () {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.$nextTick(function () {
                        this.type = 'add';
                        this.dialogVisible = true;
                    });
                }
            },
            editItem (row) {
                row = JSON.parse(JSON.stringify(row));
                this.vlanid = parseInt(row.vlanid);
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var that = this;
                    this.showNewAdd();
                    this.$nextTick(function () {
                        that.type = "edit";
                        that.newAddForm = row;
                        that.dialogFormVisible = false;
                    });
                }
            },
            viewItem (row) {
                row = JSON.parse(JSON.stringify(row));
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var that = this;
                    this.showNewAdd();
                    this.$nextTick(function () {
                        that.type = "view";
                        that.newAddForm = row;
                        that.dialogFormVisible = false;
                    });
                }
            },
            deleteItem (row) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var that = this;

                    this.$confirm('此操作后将无法恢复, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteVlan({"id": row.id}).then(function (res) {
                            if (res.status == "SUCCESS") {
                                that.$message({
                                    type: 'info',
                                    message: '删除成功'
                                });
                                that.getVlanTableList();
                            }
                            ;
                        }).catch(function (res) {
                            that.$message({
                                type: 'error',
                                message: res.status
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            delAllItem (row) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var that = this;
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的VLAN！'
                        });
                        return;
                    }
                    ;
                    this.$confirm("确认删除所选项目", "提示", {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var arr = [];
                        arr = that.multipleSelection.map(function (item) {
                            return item.id;
                        });
                        delAllVlan({"ids": arr}).then(function (res) {
                            if (res.status == "SUCCESS") {
                                that.getVlanTableList();
                            }
                        }).catch(function (res) {
                            this.$message({
                                type: 'warning',
                                message: res.status
                            });
                        });
                    }).catch(() => {    // 取消事件
                        console.log("取消删除。")
                        //do nothing
                    })
                }
            },
            handleSizeChange(val) {
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.pageSize = val;
                    that.getVlanTableList();
                });
            },
            handleCurrentChange(val) {
                var that = this;
                this.$nextTick(function() {
                    that.listQuery.currentPage = val;
                    that.getVlanTableList();
                });
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
            },
            sureNewAdds (obj, type) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var that = this;
                    if (type == "add") {
                        this.newAaddVlan(obj);
                    } else if (type == "edit") {
                        this.updateVlan(obj);
                    }
                }
            },
            cancleNewVlan(blen){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.dialogVisible = blen;
                }
                this.getVlanTableList();
            },
            cancleNewAdd (blen) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var that = this;
                    this.$nextTick(function () {
                        that.dialogPvVisible = blen;
                    })
                }
            },
            newAaddVlan (obj) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var that = this;
                    addNewVlan(obj).then(function (res) {
                        if (res.status == "SUCCESS") {
                            that.listData.push(obj);
                            that.dialogVisible = false;
                            that.getVlanTableList();
                            that.$message({
                                type: 'success',
                                message: "新建VLAN成功！"
                            });
                        }
                    }).catch(function (res) {
                        that.$message({
                            type: 'warning',
                            message: res.status
                        });
                    })
                }
            },
            // 修改vlan
            updateVlan (obj) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    var that = this;
                    editVlan(obj).then(function (res) {
                        if (res.status == "SUCCESS") {
                            that.getVlanTableList();
                            that.$nextTick(function () {
                                that.dialogVisible = false;
                            })
                            that.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .vlan-header-title{
        position: relative;
    }

    .fa-plus:before,.fa-trash-o:before{
        margin-right: 5px;
    }
    .dialog-footer{
        height: 60px;
    }
</style>