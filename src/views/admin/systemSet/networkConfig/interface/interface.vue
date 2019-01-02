<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i>系统管理</a></li>
                <li><a >网络配置</a></li>
                <li class="active">接口设置</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header clude_tab">
                            <h3 class="box-title">接口设置</h3>
                        </div>
                        <div class="box-body">
                            <div class="row" style="margin-bottom:8px;">
                            </div>
                            <el-tabs v-model="activeName" type="border-card">
                                <el-tab-pane label="物理接口" name="first">
                                    <el-table
                                            ref="multipleTable"
                                            :data="physicalList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                        <el-table-column
                                                label="状态"
                                                width="80"
                                                align="center"
                                                prop="deviceStatus">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.deviceStatus=='down'">
                                                <img src="../../../../../assets/addIcon/icon_off.png" alt="图片找不到了">
                                                </div>
                                                <div v-else>
                                                    <img src="../../../../../assets/addIcon/icon_on.png" alt="图片找不到了">
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="device"
                                                label="接口名称"
                                                align="center"
                                                >
                                        </el-table-column>
                                        <el-table-column
                                                width="100"
                                                prop="deviceStatus"
                                                align="center"
                                                label="接口状态">
                                        </el-table-column>
                                        <el-table-column
                                                width="100"
                                                prop="connectType"
                                                align="center"
                                                label="连接方式">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="IP">
                                            <template slot-scope="scope">
                                                {{scope.row.ipType=="ipv4"?scope.row.staticIpv4Addr:scope.row.staticIpv6Addr}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="子网掩码">
                                            <template slot-scope="scope">
                                                {{scope.row.ipType=="ipv4"?
                                                scope.row.staticIpv4Netmask:scope.row.staticIpv6SubnetLength}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="staticIpv4Gateway"
                                                label="网关">
                                            <template slot-scope="scope">
                                                {{scope.row.ipType=="ipv4"?
                                                scope.row.staticIpv4Gateway:scope.row.staticIpv6Gateway}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="defaultGateway"
                                                label="默认网关"
                                                width="100"
                                                align="center"
                                        >
                                            <template slot-scope="scope">
                                                {{scope.row.defaultGateway==true?
                                                '是':'否'}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="操作"
                                                width="100"
                                                align="center"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a  title="编辑" @click="onEdit(scope.row, 'Phy')" style="margin-right: 8px"><i class="fa fa-pencil"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- page start -->
                                    <div class="row" style="margin-top:8px;" id="">
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleUserSizeChange"
                                                    @current-change="handleUserCurrentChange"
                                                    :current-page="phylist.cur_page"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="phylist.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="phylist.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <!-- page end -->
                                </el-tab-pane>
                                <el-tab-pane label="链路聚合" name="second">
                                    <el-row style="padding: 15px 0 30px">
                                        <el-col>
                                            <a class="function_btn_main" title="新建" @click="onAdd('virtual')" style="display: inline-block;">
                                                <i class="fa fa-plus" > 新建</i>
                                            </a>
                                            <a class="function_btn_main" title="新建" @click="delAll(multipleSelection)" style="display: inline-block;">
                                                <i class="fa fa-trash" > 批量删除</i>
                                            </a>
                                        </el-col>
                                    </el-row>
                                    <el-table
                                            ref="multipleTable"
                                            :data="virtualList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                        <el-table-column
                                                type="selection"
                                                width="55"
                                                align="center">
                                        </el-table-column>
                                        <el-table-column
                                                label="状态"
                                                width="80"
                                                align="center"
                                                prop="deviceStatus">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.deviceStatus == 'down'">
                                                    <img src="../../../../../assets/addIcon/icon_off.png" alt="down">
                                                </div>
                                                <div v-else>
                                                    <img src="../../../../../assets/addIcon/icon_on.png" alt="up">
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="device"
                                                align="center"
                                                label="接口名称"
                                                >
                                        </el-table-column>
                                        <el-table-column
                                                width="100"
                                                prop="deviceStatus"
                                                align="center"
                                                label="接口状态">
                                        </el-table-column>
                                        <el-table-column
                                                width="100"
                                                prop="connectType"
                                                align="center"
                                                label="连接方式">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="IP">
                                            <template slot-scope="scope">
                                                {{scope.row.ipType=="ipv4"?scope.row.staticIpv4Addr:scope.row.staticIpv6Addr}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="子网掩码">
                                            <template slot-scope="scope">
                                                {{scope.row.ipType=="ipv4"?
                                                scope.row.staticIpv4Netmask:scope.row.staticIpv6SubnetLength}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="staticIpv4Gateway"
                                                label="网关">
                                            <template slot-scope="scope">
                                                {{scope.row.ipType=="ipv4"?
                                                scope.row.staticIpv4Gateway:scope.row.staticIpv6Gateway}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="defaultGateway"
                                                label="默认网关"
                                                width="100"
                                        >
                                            <template slot-scope="scope">{{scope.row.defaultGateway?'是':'否'}}</template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="80"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a @click="onEdit(scope.row, 'Vir')" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                <a title="删除" @click="singleDelete(scope.row, 'vir')" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- page start -->
                                    <div class="row" style="margin-top:8px;">
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="virlist.cur_page"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="virlist.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="virlist.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <!-- page end -->
                                </el-tab-pane>
                                <el-tab-pane label="桥接模式" name="third">
                                    <el-row style="padding: 15px 0 30px">
                                        <el-col>
                                            <a class="function_btn_main" @click="onAdd('bridge')" style="display: inline-block;">
                                                <i class="fa fa-plus" > 新建</i>
                                            </a>
                                            <a class="function_btn_main" @click="delAll(multipleSelection)" style="display: inline-block;">
                                                <i class="fa fa-trash" > 批量删除</i>
                                            </a>
                                        </el-col>
                                    </el-row>
                                    <el-table
                                            ref="multipleTable"
                                            :data="bridgeList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                        <el-table-column
                                                type="selection"
                                                width="55"
                                                align="center">
                                        </el-table-column>
                                        <el-table-column
                                                label="状态"
                                                width="80"
                                                align="center"
                                                prop="deviceStatus">
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.deviceStatus == 'down'">
                                                    <img src="../../../../../assets/addIcon/icon_off.png" alt="down">
                                                </div>
                                                <div v-else>
                                                    <img src="../../../../../assets/addIcon/icon_on.png" alt="up">
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="device"
                                                align="center"
                                                label="接口名称"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="deviceStatus"
                                                align="center"
                                                width="80"
                                                label="接口状态">
                                        </el-table-column>
                                        <el-table-column
                                                prop="staticIpv4Addr"
                                                align="center"
                                                label="IP">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="子网掩码">
                                            <template slot-scope="scope">
                                                {{scope.row.ipType=="ipv4"?
                                                scope.row.staticIpv4Netmask:scope.row.staticIpv6SubnetLength}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="staticIpv4Gateway"
                                                label="网关">
                                            <template slot-scope="scope">
                                                {{scope.row.ipType=="ipv4"?
                                                scope.row.staticIpv4Gateway:scope.row.staticIpv6Gateway}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="defaultGateway"
                                                label="默认网关"
                                        >
                                            <template slot-scope="scope">{{scope.row.defaultGateway?'是':'否'}}</template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                width="80"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a @click="onEdit(scope.row, 'Bridge')" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                <a title="删除" @click="singleDelete(scope.row, 'bridge')" style="margin-right: 8px"><i class="fa fa-trash"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- page start -->
                                    <div class="row" style="margin-top:8px;" id="pages_list">
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="virlist.cur_page"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="virlist.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="virlist.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <!-- page end -->
                                </el-tab-pane>
                                <!--暂时隐藏（龚艳提）-->
                                <el-tab-pane label="4G" v-if="false" name="four">
                                    <p></p>
                                    <el-select v-model="dataFor4g.select.value" placeholder="请选择">
                                        <el-option
                                                v-for="item in dataFor4g.select.options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button @click.stop="start4gNet()" type="primary" icon="fa fa-play-circle" style="margin-left: 6px;"> 启动</el-button>
                                    <el-button @click.stop="info4gNet()" type="success" icon="el-icon-view"> 查看</el-button>
                                    <el-button @click.stop="stop4gNet()" type="danger" icon="fa fa-pause-circle"> 停止</el-button>
                                    <el-row style="margin: 15px 0">
                                        <el-col :span="20">
                                            <el-checkbox label="是否启用动态域名" v-model="dataFor4g.isStart" name="type"></el-checkbox>
                                        </el-col>
                                        <el-col :span="4" v-show="dataFor4g.isStart">
                                            <el-button type="primary" @click.stop="bindDns()" plain size="mini">绑定</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-form v-show="dataFor4g.isStart" ref="form" :model="dataFor4g" label-width="120px">

                                        <el-row>
                                            <el-col :span="6">
                                                <el-form-item label="id：">
                                                    <el-input v-model="dataFor4g.id"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="记录值：">
                                                    <el-input v-model="dataFor4g.recodeValue"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="服务器地址：">
                                                    <el-input v-model="dataFor4g.serverAddr"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>

                                    <div class="content_4g_view">
                                        <pre>{{ dataFor4g.infoView }}</pre>
                                    </div>
                                    <!-- page end -->
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <phyEdit  @onChangeStatus="onChangeStatus" :currentPhy="currentPhy" v-if="isEditPhyShow"/>
        <virAdd  @onChangeStatus="onChangeStatus" v-if="isAddVirShow"/>
        <virEdit  @onChangeStatus="onChangeStatus" :currentVir="currentVir" v-if="isEditVirShow"/>
        <addBridge  @onChangeStatus="onChangeStatus" v-if="isaddBridgeShow"/>
        <editBridge  @onChangeStatus="onChangeStatus" :currentVir="currentVir" v-if="iseditBridgeShow"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import phyEdit from './phyEdit'
    import virAdd from './virAdd'
    import virEdit from './virEdit'
    import addBridge from './addBridge'
    import editBridge from './editBridge'
    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
    import {mapGetters} from 'vuex'
    import {
    	delVirNet,
        getNetList,
        getBridgeList,
        bridgeDel,
	    start4gNet,
	    stop4gNet,
	    info4gNet,
	    bindDns
    } from "../../../../../api/systemSet/new_networkConfig/new_interfaceApi";

    export default{
        components: {
            phyEdit,
            virAdd,
            virEdit,
            addBridge,
            editBridge
        },
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:14,
                rules:{},
                editVirChecked:false,
                physicalList:[],
                virtualList:[],
                netInfoList:[],
                polNames:[],
                activeName:'first',
                activeName2:'one',
                activeName3:'1',
                list: [],
                bridgeList:[],
                role: '',
                listLoading: true,
                phylist: {
                    cur_page: 1,
                    pageSize: 10,
                    isVirtaulNet: false,
                    total:0
                },
                virlist: {
                    cur_page: 1,
                    pageSize: 10,
                    isVirtaulNet: true,
                    total:0
                },
                bridgelist: {
                    cur_page: 1,
                    pageSize: 10,
                    total:0
                },
                currentVir: null,
                currentPhy:null,
                multipleSelection: [],
                multipleSelectionLL: [],
                isEditPhyShow: false,
                isEditVirShow: false,
                isAddVirShow: false,
                isaddBridgeShow:false,
                iseditBridgeShow:false,
                dataFor4g: {
                	select: {
		                value: '0',
		                options: [
			                {
				                label: '移动',
				                value: '0'
			                },
			                {
				                label: '联通',
				                value: '1'
			                },
			                {
				                label: '电信',
				                value: '2'
			                }
		                ]
                    },
                    infoView: '点击查看，可显示相关信息！',
	                isStart: false,
	                serverAddr: '',
	                recodeValue: '',
	                id: ''
                }
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getPhysicalInterfaceList();
            this.getVirtaulInterfaceList();
            this.getList()
        },
        methods: {
            onChangeStatus(){
                this.isEditPhyShow = false;
                this.isAddVirShow = false;
                this.isEditVirShow = false;
                this.isaddBridgeShow=false;
                this.iseditBridgeShow = false;
                this.getPhysicalInterfaceList();
                this.getVirtaulInterfaceList();
                this.getList()
            },
            onAdd(type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'virtual'){
                        this.isAddVirShow = true;
                    } else {
                        this.isaddBridgeShow = true;
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
                    if(type == 'Phy'){
                        if (row.masterDevice != null && row.masterDevice.length != '') {
                            this.$message({
                                type: 'warning',
                                message: '当前网卡已被聚合！'
                            });
                        }
                        else {
                            this.isEditPhyShow = true;
                            this.currentPhy = row;
                        }
                    } else if(type == 'Vir'){
                        this.currentVir = row;
                        this.isEditVirShow = true;
                    } else {
                        this.currentVir = row;
                        this.iseditBridgeShow = true;
                    }
                }
            },

            getPhysicalInterfaceList() {
                getNetList(this.phylist.cur_page,this.phylist.pageSize,this.phylist.isVirtaulNet).then((resp)=>{
                    if(resp.status == 'SUCCESS') {
                        this.physicalList = resp.data;
                        for (let i = 0; i < this.physicalList.length; i++){
                            this.physicalList[i].deviceStatus = this.physicalList[i].deviceStatus.toLowerCase();
                        }
                        this.phylist.total=resp.extend.page.totalHits
                    }
                }).catch(err=>{

                });
            },
            getVirtaulInterfaceList(){
                getNetList(this.virlist.cur_page,this.virlist.pageSize,this.virlist.isVirtaulNet).then((resp)=>{
                    if (resp.status == 'SUCCESS'){
                        this.virtualList = resp.data;
                        for (let i = 0; i < this.virtualList.length; i++){
                            this.virtualList[i].deviceStatus = this.virtualList[i].deviceStatus.toLowerCase();
                        }
                        this.virlist.total=resp.extend.page.totalHits;
                    }
                }).catch(err=>{

                });
            },
            getList(){
                getBridgeList(this.bridgelist).then((resp)=>{
                    if (resp.status == 'SUCCESS'){
                        this.bridgeList=resp.data
                        for (let i = 0; i < this.bridgeList.length; i++){
                            this.bridgeList[i].deviceStatus = this.bridgeList[i].deviceStatus.toLowerCase();
                        }
                        this.bridgeList.total=resp.extend.page.totalHits;
                    }
                }).catch(err=>{

                });
            },
            addition(){
                this.dynamicTags.push(4)
            },
            change(){
               for(let key in this.addInfo){
               }
            },
//------------------------------------------------------------------
            handleUserSizeChange(val) {
                this.phylist.pageSize = val;
                this.getPhysicalInterfaceList()
            },
            handleUserCurrentChange(val) {
                this.phylist.cur_page = val;
                this.getPhysicalInterfaceList()
            },
            resetForm(formName) {
                this.addVirnetVisible=false;
                this.editVirnetVisible=false;
                this.activeName3='1';
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            handleSelectionChangeLL (val) {
                this.multipleSelectionLL = val;
            },
            deleteNet(id) {
                let information="确认删除此链路聚合?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delVirNet(id).then((resp)=>{
                        console.log(resp,'delete-resp')
                        if(resp.status=="SUCCESS"){
                            this.$message({
                                type:'success',
                                message:'删除成功！'
                            });
                            this.multipleSelection=[];
                            this.getVirtaulInterfaceList();
                            this.getPhysicalInterfaceList();
                        }else {

                        }
                    }).catch((err)=>{
                        console.log("删除发生错误:",err);
                        notifyFault();
                    });
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });
            },
            delAll (row) {
                let id = row.map(item => {
                    return item.id;
                });
                if (row.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择要删除的接口设置!'
                    });
                    return;
                }
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.delBridge(id);
                }
            },

            singleDelete(row, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'vir'){
                        this.deleteNet(row.id);
                    } else {
                        let id = [];
                        id.push(row.id);
                        this.delBridge(id);
                    }
                }
            },
            delBridge(id) {
                let information="删除会重启网络服务,请确认后刷新页面或等待响应";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let option = {
                        ids: id.join(',')
                    };
                    bridgeDel(option).then((resp)=>{
                        console.log(resp,'delete-resp-bridge')
                        if(resp.status=="SUCCESS"){
                            this.$message({
                                type:'success',
                                message:'删除成功！'
                            });
                            this.multipleSelection=[];
                            this.getVirtaulInterfaceList();
                            this.getPhysicalInterfaceList();
                            this.getList()
                        }else {

                        }
                    }).catch((err)=>{
                        console.log("删除发生错误:",err);
                        notifyFault();
                    });
                }).catch((err) => {    // 取消事件

                });
            },
            handleSizeChange(val) {
                this.virlist.pageSize=val;
                this.getVirtaulInterfaceList();
            },
            handleCurrentChange(val) {
                this.virlist.cur_page=val;
                this.getVirtaulInterfaceList();
            },

	        start4gNet () {
		        start4gNet({type: this.dataFor4g.select.value}).then(res => {
		        	if(res.status == 'SUCCESS') {
				        this.$message({
					        type: 'success',
					        message: '启动4g网络成功!'
				        });
                    }
                });
            },

	        info4gNet () {
		        info4gNet().then(res => {
			        if(res.status == 'SUCCESS') {
			        	this.dataFor4g.infoView = res.extend.info;
				        this.dataFor4g.id = res.extend.ddns.id;
				        this.dataFor4g.recodeValue = res.extend.ddns.name;
				        this.dataFor4g.serverAddr = res.extend.ddns.ipAddress;
				        this.dataFor4g.isStart = res.extend.ddns.bind;
				        this.dataFor4g.select.value = res.extend.type.replace(/[\r\n]*/g, '');
                    };
		        });
            },
	        bindDns () {
            	var obj = {
		            id: this.dataFor4g.id,
		            name: this.dataFor4g.recodeValue,
		            ipAddress: this.dataFor4g.serverAddr,
		            bind: this.dataFor4g.isStart
	            }
		        bindDns(obj).then(res => {
			        if(res.status == 'SUCCESS') {
				        this.$message({
					        type: 'success',
					        message: '绑定成功!'
				        });
			        }
		        });
            }
        }
    }
</script>
<style>
    a {
        color: #3493E0;
    }
    .content_4g_view {
        padding: 20px 10px;
        margin-top: 20px;
        border: 1px solid #c0c4cc;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
    }
    .content_4g_view p{
        margin: 0;
        padding: 0;
    }
</style>
<style lang="scss">
    .public{
        .bridge_form{
            .el-form{
                .el-checkbox-group{
                    .el-checkbox+.el-checkbox{
                        margin-left: 0;
                    }
                    .el-checkbox{
                        padding-right: 20px;
                    }
                }
            }
        }
    }
</style>


