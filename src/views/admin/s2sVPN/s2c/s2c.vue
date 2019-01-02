<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i> EnS2S</a></li>
                <li class="active">s2c管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header clude_tab">
                            <h3 class="box-title" id="res_rdp_title">s2c管理</h3>
                        </div>
                        <!-- /.box-header -->

                        <div class="box-body">
                            <div class="row" style="margin-bottom:8px;">
                            </div>
                            <el-tabs v-model="activeName" type="border-card" @tab-click="chooseTab">
                                <el-tab-pane label="s2c状态" name="first">

                                    <div class="row" style="margin-bottom:8px;">
                                        <div class="col-sm-6">
                                            <div class="dataTables_length" id="refresh_button">
                                                &nbsp;
                                                <a><i>s2c服务状态: {{this.editInfo.if_run=='true'?"启动":"停止"}}</i></a>
                                                &nbsp;
                                                &nbsp;<a title="刷新" @click="onRefresh()">
                                                    <i class="fa fa-refresh" aria-hidden="true">刷新</i>
                                                </a>
                                                &nbsp;
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 表单搜索框部分 -->

                                    <el-table
                                            ref="multipleTable"
                                            :data="list"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%">

                                        <el-table-column
                                                prop="deviceName"
                                                align="center"
                                                label="设备名称">
                                        </el-table-column>

                                        <el-table-column
                                                prop="oneServerIp"
                                                align="center"
                                                label="服务器IP">
                                        </el-table-column>

                                        <el-table-column
                                                prop="serverName"
                                                align="center"
                                                label="服务器名称">
                                        </el-table-column>

                                        <el-table-column
                                                prop="connectStatus"
                                                align="center"
                                                label="连接状态">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.connectStatus=='off'">
                                                    <div><img src="../../../../assets/addIcon/断开.png" alt="图片找不到了" style="width: 18px;height: 18px">  未连接</div>
                                                </span>
                                                <span v-else>
                                                    <!--<a><i class="fa fa-check"></i>已连接</a>-->
                                                    <div><img src="../../../../assets/addIcon/连通.png" alt="图片找不到了" style="width: 18px;height: 18px">  已连接</div>
                                                </span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                prop="connectLength"
                                                align="center"
                                                label="连接时长">
                                        </el-table-column>

                                        <el-table-column
                                                prop="sessionTraffic"
                                                align="center"
                                                label="会话流量(MB)">
                                        </el-table-column>

                                        <el-table-column
                                                prop="sessionRate"
                                                align="center"
                                                label="当前流速(kb/s)">
                                        </el-table-column>

                                    </el-table>

                                </el-tab-pane>
                                <el-tab-pane label="s2c设置" name="second">
                                    <!-- 表单搜索框部分 -->

                                    <div class="s2c-config">
                                        <el-form
                                                :model="editInfo"
                                                :rules="rules"
                                                ref="editInfo"
                                                label-width="120px">
                                            <el-form-item label="s2c设置 " prop="if_run">
                                                <el-col :span="10" class="s2c">
                                                    <el-radio-group :disabled="!isEdit" v-model="editInfo.if_run" style="margin-left: 20px"  class="s2c-config">
                                                        <el-radio label=true>开启</el-radio>
                                                        <el-radio label=false>关闭</el-radio>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-form-item>

                                            <span>

                                                <el-form-item label="设备名称" prop="device_name">
                                                    <el-col :span="10" class="s2c">
                                                        <el-input  v-model="editInfo.device_name" class="el_put" :disabled="editInfo.if_run=='false' || !isEdit" placeholder="请输入"></el-input>
                                                    </el-col>
                                                </el-form-item>

                                                <el-form-item label="连接服务器" prop="server_address">
                                                    <el-col :span="10" class="s2c">
                                                        <el-input type="textarea" autosize v-model="editInfo.server_address" :disabled="editInfo.if_run=='false' || !isEdit" class="el_put" placeholder="请输入带端口号的ip地址,回车换行,如192.168.1.1:4441"></el-input>
                                                    </el-col>
                                                </el-form-item>

                                                <el-form-item label="认证密钥" prop="authKey">
                                                     <el-col :span="10">
                                                        <el-input v-model="editInfo.authKey" style="width: 100%; margin-left: 20px" :disabled="editInfo.if_run=='false' || !isEdit" placeholder="请输入密钥" class="el_put" type="password"></el-input>
                                                     </el-col>
                                                </el-form-item>

                                                <el-form-item label="客户端接口" prop="client_net">
                                                    <el-col :span="10" class="s2c">
                                                        <el-select v-model="editInfo.client_net" style="width: 100%; margin-left: 20px" :disabled="editInfo.if_run=='false' || !isEdit" placeholder="请选择" class="el_sel">
                                                            <el-option
                                                                    v-for="eth in ethList"
                                                                    :key="eth"
                                                                    :label="eth"
                                                                    :value="eth">
                                                            </el-option>
                                                        </el-select>
                                                    </el-col>
                                                </el-form-item>

                                                <el-form-item label="子网地址" prop="subnet_address">
                                                    <el-col :span="10" class="s2c">
                                                        <el-input type="textarea" autosize v-model="editInfo.subnet_address" :disabled="editInfo.if_run=='false' || !isEdit" class="el_put" placeholder="请输入ip地址或ip段,回车换行,可输入ipv4地址如1.1.1.1,Ipv4地址段如1.1.1.1-1.1.1.9,子网掩码形式如1.1.1.1/24或1.1.1.1/255.255.255.0"></el-input>
                                                    </el-col>
                                                </el-form-item>

                                            </span>


                                        </el-form>

                                        <div class='form-footer' slot="footer" style="height:50px;">
                                            <div style="margin-top: 40px;margin-left: 140px;">
                                                <el-button plain
                                                        class="plain cancle"
                                                        v-show="isEdit"
                                                        @click="resetForm('editInfo')">
                                                    重置
                                                </el-button>
                                                <el-button
                                                        class="primary confirm"
                                                        v-show="isEdit"
                                                        type="primary"
                                                        @click="saveForm('editInfo')">
                                                    确定
                                                </el-button>
                                                <el-button type="primary" class="btn_edit" @click="isEdit = !isEdit" v-show="!isEdit" style="margin-left: 0">编辑</el-button>
                                            </div>
                                        </div>
                                    </div>

                                </el-tab-pane>
                            </el-tabs>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import store from "../../../../store/index";
    import permissionRoutes from 'store/permission';
    import {isReadonly} from "../../../../utils/permissionUtil";
    import {mapGetters} from 'vuex';
    import {gets2cStateList,edits2c,gets2cConfig, resetInterface, closeInterface} from 'api/s2sVPN/s2c';
    import {getAllNetNameList} from "../../../../api/systemSet/new_networkConfig/new_routerApi";
    export default {
        components: {},
        data() {

            var validateIfRun = (rule, value, callback) =>
            {
                callback();
            };

            var validateSubnetAddress = (rule, value, callback) => {
                var ip = "";
                var ip2 = "";
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                var numReg = /^-?\d+$/;
                var masks = ["128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0",
                    "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0", "255.255.0.0",
                    "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0",
                    "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248",
                    "255.255.255.252", "255.255.255.254", "255.255.255.255"];

                if (value.length < 1) {
                    callback(new Error("请至少填写一条ipv4地址"));
                } else {
                    var valueList = value.split("\n");
                    for (var i = 0; i < valueList.length; i++) {
                        var valueItem = valueList[i];
                        if (valueItem.length>32||valueItem.indexOf(",")>-1||valueItem.indexOf(";")>-1){
                            callback(new Error("地址之间请回车换行分隔"));
                        }else {
                            if (valueItem.indexOf("-") * valueItem.indexOf("/") > 0) {
                                if (ipReg.test(valueItem) == false) {
                                    callback(new Error("请填入正确的ipv4地址,地址段请用'-'分隔;子网掩码请用'/'分隔"));
                                }
                            } else {
                                if (valueItem.indexOf("-") > 0) {
                                    var array = valueItem.split("-");
                                    ip = array[0];
                                    ip2 = array[1];
                                    if (ipReg.test(ip) == false) {
                                        callback(new Error("起始ip不合法，请检查输入"));
                                    } else if (ipReg.test(ip2) == false) {
                                        callback(new Error("结束ip不合法，请检查输入"));
                                    }
                                } else {
                                    var array = valueItem.split("/");
                                    ip = array[0];
                                    ip2 = array[1];
                                    if (ipReg.test(ip) == false) {
                                        callback(new Error("ip不合法，请检查输入"));
                                    } else if (ip2.indexOf(".") > 0) { //全写
                                        if (masks.indexOf(ip2) < 0) {
                                            callback(new Error("掩码全写不合法，请检查输入"));
                                        }
                                    } else {//简写
                                        if ((numReg.test(ip2) == false) || (ip2 < 0 || ip2 > 32)) {
                                            callback(new Error("掩码简写不合法，请检查输入"));
                                        }
                                    }
                                }
                            }
                        }
                    }
                    callback();
                }

            };


            var validateDeviceName = (rule, value, callback) =>{
                if (this.editInfo.if_run=='true'&&this.editInfo.device_name.length<1){
                    callback(new Error("请填写设备名"));
                }else {
                    callback();
                }
            };
            var validateClientNet = (rule, value, callback) =>{
                if (this.editInfo.if_run==true&&this.editInfo.client_net.length<1){
                    callback(new Error("请选择客户端接口"));
                }else {
                    callback();
                }
            };

            var validateServerAddress = (rule, value, callback) =>{

                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                var portReg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
                var ip = "";
                var port = "";
                if (this.editInfo.server_address.length<1){
                    callback(new Error("请至少填写一条带端口号的ipv4地址"));
                }else {
                    var valueList = value.split("\n");
                    for (var i = 0; i < valueList.length; i++) {
                        var valueItem = valueList[i];
                        if (valueItem.length>22||valueItem.indexOf(",")>-1){
                            callback(new Error("地址之间请回车换行分隔,请检测输入是否合法"));
                        }else {
                            if (valueItem.indexOf(":")>0){
                                ip = valueItem.split(":")[0];
                                port = valueItem.split(":")[1];
                                console.log(ip +"  "+port+"  item");
                                if (ipReg.test(ip)==false){
                                    callback(new Error("ipv4地址不正确"));
                                }else if (portReg.test(port)==false||port==0){
                                    callback(new Error("端口号不正确"));
                                }
                            }else {
                                callback(new Error("请输入带端口号的ipv4地址，如1.1.1.1:442"));
                            }
                        }
                    }
                    callback();
                }
            };

            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:88,
                list:[],
                listLoading: true,
                currentView: null,
                currentData: null,
                listQuery:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
             
                activeName:'first',
                ethList:[],
                editInfo:{
                    if_run:false,
                    device_name:"",
                    client_net:"",
                    server_address:"",
                    subnet_address:"",
                    authKey:''

                },
                 submitInfo:{
                    if_run:"",
                     device_name:"",
                    client_net:"",
                    server_address:[],
                    subnet_address:[],
                     authKey:''
                },

                rules: {
                    if_run: [
                        {required: true, validator: validateIfRun, trigger: 'blur'}
                    ],
                    device_name: [
                        {required: true, validator: validateDeviceName, trigger: 'blur'}
                    ],
                    server_address: [
                        {required: false, validator: validateServerAddress, trigger: 'blur'}
                    ],
                    subnet_address: [
                        {required: false, validator: validateSubnetAddress, trigger: 'blur'}
                    ],
                    client_net: [
                        {required: false, validator: validateClientNet, trigger: 'blur'}
                    ],
                },
                isEdit: false
            }
        },

        route: {
            deactivated() {
                this.$confirm('您正在编辑状态，内容尚未保存，确定前往其他页面吗?', '提示', {
                    confirmButtonText: '仍要前往',
                    cancelButtonText: '留在当前页面',
                    type: 'warning'
                }).then(() => {
                    return true;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '页面跳转失败'
                    });
                    return false;
                });

            }
        },
        created() {
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getStateList();
            this.setS2cConfigInfo();
            this.getClientEthList();
        },
        methods: {
            onRefresh() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.getStateList();
                }
            },

            getClientEthList(){
                getAllNetNameList().then((resp)=>{
                    this.ethList=resp.data;
                }).catch(err=>{});

            },

            saveForm(formName) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    console.log('if_run:', typeof (this.editInfo.if_run));
                    if(this.editInfo.if_run == 'false'){
                        closeInterface().then((resp)=>{
                            if(resp.status == 'SUCCESS'){
                                this.$message({
                                    type: 'success',
                                    message: '关闭成功!'
                                });
                            }
                        }).catch(err=>{});
                    } else {
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                console.log("editInfo", this.editInfo)

                                this.submitInfo.ifApply = this.editInfo.if_run;
                                this.submitInfo.deviceName = this.editInfo.device_name;
                                this.submitInfo.clientDevice = this.editInfo.client_net;
                                this.submitInfo.serverIp = this.editInfo.server_address.split("\n");
                                this.submitInfo.ipMask = this.editInfo.subnet_address.split("\n");
                                this.submitInfo.authKey = this.editInfo.authKey
                                //保存判定

                                edits2c(this.submitInfo).then((resp) => {
                                    if (resp.status == 'SUCCESS') {
                                        this.$message({
                                            type: 'success',
                                            message: '保存s2c设置成功！'
                                        });
                                        this.$emit('onChangeStatus');
                                        this.setS2cConfigInfo();
                                        this.getStateList();
                                    } else {
                                        this.$message({
                                            type: 'warning',
                                            message: '保存s2c设置失败！' + codeMessage(resp.code)
                                        });
                                    }
                                }).catch(e => {
                                    console.log("保存出错", e);
                                });
                            } else {
                                return false;
                            }
                        });
                    }
                }
            },

            onCancel(formName){
                this.dialogVisible = false;
                //暂时设定为 点击取消按钮后 页面上保留已填写内容
            },

            resetForm(formName) {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    resetInterface().then((resp)=>{
                        if(resp.status == 'SUCCESS'){
                            this.$message({
                                type: 'success',
                                message: '重置成功!'
                            });
                        }
                    }).catch(err=>{});
                    this.$refs[formName].resetFields();
                }
            },

            getStateList() {
                gets2cStateList(this.listQuery).then(res => {
                    if (res.status == 'SUCCESS'){
                        this.list = res.data;
                        for (let i = 0; i < this.list.length; i++){
                            if(this.list[i].serverName == null || this.list[i].serverName == ''){
                                this.list[i].serverName = '-'
                            }
                            if(this.list[i].connectLength == null || this.list[i].connectLength == ''){
                                this.list[i].connectLength = '-'
                            }
                            if(this.list[i].sessionTraffic == null || this.list[i].sessionTraffic == ''){
                                this.list[i].sessionTraffic = '-'
                            }
                            if(this.list[i].sessionRate == null || this.list[i].sessionRate == ''){
                                this.list[i].sessionRate = '-'
                            }
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                });

            },

            setS2cConfigInfo(){

                gets2cConfig().then(response => {
                    if (response.status == 'SUCCESS'){
                        var data = response.data;
                        this.editInfo.device_name = data.deviceName;
                        this.editInfo.authKey = data.authKey;
                        this.editInfo.if_run = data.ifApply;
                        this.editInfo.client_net = data.clientDevice;
                        this.editInfo.server_address = data.serverIp.join("\n");
                        this.editInfo.subnet_address= data.ipMask.join("\n");

                    }else {
                        this.$message({
                            type:'warning',
                            message:'获取s2c配置失败'
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                });

            },

            chooseTab(tab, event) {
                this.isEdit = false;
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
    /* 设置弹出框大小*/
    .dialog {
        min-width: 830px;
    }
    .s2c  .el_put{
        margin-left: 20px;
    }
    .s2c  .el_sel{
        margin-left: 20px;
    }

    .el-dialog__header {
        padding-left: 5px;
    }

    .el_text {
        margin-left: 158px;
    }

    .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .s2c-config .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 20px;
    }
</style>