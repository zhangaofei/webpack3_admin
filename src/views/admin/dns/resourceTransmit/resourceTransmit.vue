<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><i class="fa fa-folder-open"></i>智能DNS</li>
                <li class="active">域名管理</li>
                <li class="active">资源转发</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=" border-top-color: #6cbaf5 !important;">
                        <div class="box-header clude_tab">
                            <h3 class="box-title" id="res_rdp_title">资源转发</h3>
                        </div>
                        <!-- /.box-header -->

                        <div class="box-body">
                            <div class="row" style="margin-top: 20px;">
                            </div>
                            <el-collapse v-model="activeNames">
                                <el-collapse-item title="资源转发" name="1">
                                    <el-table
                                            ref="multipleTable"
                                            :data="addDomain"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 90%; float: left"
                                            >
                                        <el-table-column
                                                label="待转发域名"
                                                align="center"
                                        >
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.name"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="目标服务器"
                                                align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.url"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="目标端口"
                                                align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.prot"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="链接协议"
                                                align="center"
                                        >
                                            <template slot-scope="scope">
                                                <el-select v-model="scope.row.protocol">
                                                    <el-option label="http" value="http" ></el-option>
                                                    <el-option label="https" value="https" ></el-option>
                                                </el-select>
                                            </template>
                                        </el-table-column>

                                        <!--<el-table-column-->
                                                <!--label="操作" style="text-align: center" width="160" align="center">-->
                                            <!--<template slot-scope="scope">-->
                                                <!--<el-button-->
                                                        <!--size="small"-->
                                                        <!--align="center"-->
                                                        <!--style="border: none;"-->
                                                        <!--@click="onAddRecord()">添加-->
                                                <!--</el-button>-->
                                            <!--</template>-->
                                        <!--</el-table-column>-->
                                    </el-table>
                                    <el-button
                                            align="center"
                                            type="primary"
                                            style="margin-top: 67px;margin-left: 18px;background-color: #2b7de3"
                                            @click="onAddRecord()">确定
                                    </el-button>

                                </el-collapse-item>
                                <el-collapse-item title="资源转发列表" name="2">
                                    <el-table
                                            ref="multipleTable"
                                            :data="resourceList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%">

                                        <el-table-column
                                                prop="name"
                                                align="center"
                                                label="待转发域名">
                                        </el-table-column>

                                        <el-table-column
                                                prop="url"
                                                align="center"
                                                label="目标服务器">
                                        </el-table-column>

                                        <el-table-column
                                                prop="prot"
                                                align="center"
                                                label="目标端口">
                                        </el-table-column>


                                        <el-table-column
                                                prop="protocol"
                                                align="center"
                                                label="链接协议">
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a @click="onDelete(scope.row)" title="删除" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="listQuery_domain.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_domain.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="total_domain">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item title="监听设备" name="3">
                                    <el-table
                                            ref="multipleTable"
                                            :data="deviceList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%">

                                        <el-table-column
                                                prop="device"
                                                align="center"
                                                label="接口">
                                        </el-table-column>

                                        <el-table-column
                                                prop="ip"
                                                align="center"
                                                label="监听地址">
                                        </el-table-column>

                                        <el-table-column
                                                prop="prot"
                                                align="center"
                                                label="监听端口">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.prot" placeholder="请输入监听端口"></el-input>
                                            </template>
                                        </el-table-column>


                                        <el-table-column
                                                prop="status"
                                                align="center"
                                                label="状态">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.status==true"><a>启用</a></span>
                                                <span v-else><a>停用</a></span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                        align="center"
                                        label="操作"
                                        show-overflow-tooltip>
                                        <template slot-scope="scope">
                                        <span v-if="scope.row.status==false">
                                        <a @click="onPauseDevice(scope.row, true)" title="停止"><i class="fa fa-play-circle-o" style="font-size: 18px"></i></a>
                                        </span>
                                        <span v-else>
                                        <a @click="onPauseDevice(scope.row, false)" title="启动"><i class="fa fa-pause-circle-o" style="font-size: 18px"></i></a>
                                        </span>
                                        </template>
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {addResourceTransmit, getResourceTransmit, getMonitorDevice,changeDeviceStatus,deleteResourceTransmit} from 'api/enDNS/resourceTransmit';
    export default{
        components: {},
        data(){
            return {
                headerCellStyle: {
                    backgroundColor: '#eef1f6'
                },
                rules: {},
                addDomain: [],
                add_domain:{
                    name:'',
                    url: '',
                    prot: '',
                    protocol: ''
                },
                resourceList: [],
                deviceList:[],
                deviceQuery:{
                    currentPage: 1,
                    pageSize: 10
                },
                listQuery_domain: {
                    currentPage: 1,
                    pageSize: 10
                },
                total_domain: 0,
                activeNames: ['1', '2', '3'],
            }
        },
        created(){
            this.getDomainList();
            this.getDeviceList();
            this.addDomain.push({
                name:'',
                url: '',
                prot: '',
                protocol: ''
            })
        },

        methods: {
            onDelete(data){
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let list = [];
                    list.push(data.id);
                    let fwtimeDto = {
                        ids:list.join(',')
                    }
                    deleteResourceTransmit(fwtimeDto).then(response => {
                            if (response.status == 'SUCCESS'){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getDomainList();
                            } else {
                                this.$message({
                                    type:'warning',
                                    message: response.code.info
                                });
                            }
                        });
                }).catch(() => {    // 取消事件
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getDomainList(){
                getResourceTransmit(this.listQuery_domain).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.resourceList = response.data;
                        this.total_domain = response.extend.page.totalHits;
                        this.listQuery_domain.currentPage = response.extend.page.currentPage;
                        this.listQuery_domain.pageSize = response.extend.page.pageSize;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            getDeviceList(){
                getMonitorDevice(this.deviceQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.deviceList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            handleSizeChange(val) {
                this.listQuery_domain.pageSize = val;
                this.getRecordList();
            },
            handleCurrentChange(val) {
                this.listQuery_domain.currentPage = val;
                this.getRecordList();
            },
            onPauseDevice(row, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let Dto = {
                        id: row.id,
                        device: row.device,
                        ip: row.ip,
                        prot: row.prot,
                        status:type
                    }
                    if (type == true) {
                        changeDeviceStatus(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '开启成功!'
                                });
                                this.getDeviceList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        });
                    } else if (type == false) {
                        changeDeviceStatus(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '关闭成功!'
                                });
                                this.getDeviceList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        });
                    }
                }
            },
            validated(){
                if(this.addDomain[0].name==''){
                    this.$message({
                        type: 'warning',
                        message: '待转发域名不能为空！'
                    });
                    return false
                }
                if(this.addDomain[0].url==''){
                    this.$message({
                        type: 'warning',
                        message: '目标服务器不能为空！'
                    });
                    return false
                }
                if(this.addDomain[0].prot==''){
                    this.$message({
                        type: 'warning',
                        message: '目标端口不能为空！'
                    });
                    return false
                }
                if(this.addDomain[0].protocol==''){
                    this.$message({
                        type: 'warning',
                        message: '链接协议不能为空！'
                    });
                    return false
                }
                return true

            },
            onAddRecord(formName) {
                if(this.validated()){
                    this.add_domain.name = this.addDomain[0].name;
                    this.add_domain.url = this.addDomain[0].url;
                    this.add_domain.prot = this.addDomain[0].prot;
                    this.add_domain.protocol = this.addDomain[0].protocol;
                    addResourceTransmit(this.add_domain).then((resp) => {
                        if (resp.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '添加资源转发成功！'
                            });
                            this.getDomainList();
                            this.addDomain = [];
                            this.addDomain.push({
                                domainName:'',
                                server: '',
                                prot: '',
                                protocol: ''
                            })
                        } else {
                            this.$message({
                                type: 'warning',
                                message: resp.code.info
                            });
                        }
                    }).catch(e => {
                        console.log("新建出错", e);
                    });
                }

            }
        }
    }
</script>
<style>

</style>