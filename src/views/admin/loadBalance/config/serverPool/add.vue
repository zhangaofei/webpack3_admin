<template>
    <div class="admin public tab_scroll">
        <el-dialog
                title="新增服务器池"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog public tab_scroll"
                top="8%"
                @close="handleClose">
            <div class="admin-form tab_scroll_div">

                <el-tabs type="card" v-model="activeName">
                    <el-tab-pane label="基本" name="first">
                        <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="142px"
                                 class="demo-ruleForm">
                            <el-form-item label="名称" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="addInfo.name" placeholder="名称" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="负载均衡算法" prop="">
                                <el-select v-model="addInfo.balance" class="el_sel" placeholder="负载均衡算法">
                                    <el-option
                                            v-for="item in balances"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="Hash类型" prop="" v-if="addInfo.balance=='SRCHASH'||addInfo.balance=='HDRHASH'||addInfo.balance=='URI'">
                                <span style="color: red;position: absolute;left: -10px;">*</span>
                                <el-select v-model="addInfo.hashType" class="el_sel" placeholder="Hash类型">
                                    <el-option label="mapbased" value="mapbased"></el-option>
                                    <el-option label="consistent" value="consistent"></el-option>
                                </el-select>
                            </el-form-item>
                            <template v-if="addInfo.balance=='URI'">
                                <el-form-item label="Uri部分深度" prop="">
                                    <span style="color: red;position: absolute;left: -25px;">*</span>
                                    <el-input v-model="addInfo.uriDepth" placeholder="Uri部分深度" class="el_put"></el-input>
                                </el-form-item>
                                <el-form-item label="Uri部分长度" prop="">
                                    <span style="color: red;position: absolute;left: -25px;">*</span>
                                    <el-input v-model="addInfo.uriLen" placeholder="Uri部分长度" class="el_put"></el-input>
                                </el-form-item>
                            </template>


                            <el-form-item label="头部" prop="" v-if="addInfo.balance=='HDRHASH'">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="addInfo.hdrName" placeholder="头部" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="选择" prop=""  v-if="false">
                                <el-input v-model="addInfo.serverNodeIds" :disabled="true" placeholder="选择" class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="健康检查方法" prop="">
                                <span style="color: red;position: absolute;left: -32px;">*</span>
                                <el-select v-model="addInfo.option" class="el_sel" placeholder="健康检查方法">
                                    <el-option
                                            v-for="item in optionList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="虚拟主机" prop="">
                                <el-input v-model="addInfo.virtualHost" placeholder="虚拟主机" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="间隔" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="addInfo.timeoutCheck" placeholder="间隔" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="连接端口" prop="">
                                <span style="color: red;position: absolute;left: -3px;">*</span>
                                <el-input v-model="addInfo.connectPort" placeholder="连接端口" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="绑定IP地址" prop="">
                                <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                <!--<el-select v-model='addInfo.bindIpAddr' class="el_sel" placeholder="绑定IP地址">-->
                                    <!--<el-option label="0.0.0.0" value="0.0.0.0"></el-option>-->
                                    <!--<el-option label="eth4:192.168.20.28" value="192.168.20.28"></el-option>-->
                                <!--</el-select>-->

                                <el-select v-model="addInfo.bindIpAddr" class="el_sel" placeholder="">
                                    <el-option
                                            v-for="item in ipAddrOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!--细节-->
                            <el-form-item label="Url" prop="" v-if="addInfo.option=='SSLGET'||addInfo.option=='HTTPGET' ">
                                <span class="dot" style="position: absolute;left: 35px;color: red;">*</span>
                                <el-input v-model="addInfo.checkUri" placeholder="Url" class="el_put"></el-input>
                            </el-form-item>
                            <template v-if="addInfo.option=='SMTPCHECK'">
                                <el-form-item label="HELO Name" prop="">
                                    <span class="dot" style="position: absolute;left: -33px;color: red;">*</span>
                                    <el-input v-model="addInfo.smtpHeloName" placeholder="HELO Name"
                                              class="el_put"></el-input>
                                </el-form-item>
                                <el-form-item label="连接IP地址" prop="">
                                    <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                    <el-input v-model="addInfo.smtpConnIp" placeholder="连接IP地址"
                                              class="el_put"></el-input>
                                </el-form-item>
                            </template>
                            <el-form-item label="穿梭" prop="" v-if="false">
                                <el-button
                                        class="primary confirm"
                                        type="primary"
                                        icon="el-icon-arrow-left"
                                        @click="toLeft()">
                                </el-button>
                                <el-button
                                        class="primary confirm"
                                        type="primary"
                                        icon="el-icon-arrow-right"
                                        @click="toRight()">
                                </el-button>
                            </el-form-item>
                        </el-form>

                        <div style="">
                            <el-table
                                    :data="tableDataLeft"
                                    style="width: 40%;float: left;margin-left:100px;overflow-y: auto"
                                    height="172"
                                    border
                                    tooltip-effect="dark"
                                    @selection-change="handleSelectionChangeLeft" v-if="true">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="当前选择"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="ipAddr"
                                        label="IP地址"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="port"
                                        label="端口"
                                        align="center"
                                        width="100">
                                </el-table-column>
                            </el-table>
                        <span style="float: left;margin:auto 5px;font-size: 25px;line-height: 3">
                            <i class="el-icon-caret-left" style="cursor: pointer" @click="toLeft()"></i><br>
                            <i class="el-icon-caret-right" style="cursor: pointer" @click="toRight()"></i>
                        </span>
                        <!--</div>-->

                        <!--style="width: 40%;float: right"-->
                        <!--float: left;-->
                        <!--<div>-->

                            <el-table
                                    :data="tableDataRight"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 40%;"
                                    height="172"
                                    @selection-change="handleSelectionChangeRight" v-if="true">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="服务器列表"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="ipAddr"
                                        label="IP地址"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="port"
                                        label="端口"
                                        width="100">
                                </el-table-column>
                            </el-table>
                        </div>
                        <!--</el-form-item>-->
                    </el-tab-pane>
                    <el-tab-pane label="超时" name="second">
                        <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="0px" class="demo-ruleForm">
                            <el-form-item label="连接超时(ms)" prop="">
                                <span style="color: red;position: absolute;left: 97px;">*</span>
                                <el-input v-model="addInfo.timeoutConnect" placeholder="连接超时" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="队列超时(ms)" prop="">
                                <span style="color: red;position: absolute;left: 98px;">*</span>
                                <el-input v-model="addInfo.timeoutQueue" placeholder="连接超时" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="服务器超时(ms)" prop="">
                                <span style="color: red;position: absolute;left: 84px;">*</span>
                                <el-input v-model="addInfo.timeoutServer" placeholder="服务器超时" class="el_put"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <template v-if="!((addInfo.balance=='SRCHASH'||addInfo.balance=='HDRHASH')&&addInfo.hashType=='consistent')">
                        <el-tab-pane label="会话保持" name="third">

                            <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="142px"
                                     class="demo-ruleForm">
                                <el-form-item label="启动" prop="">
                                    <el-checkbox v-model="sessionMaintainUse" class="checbox_20">启用</el-checkbox>
                                </el-form-item>
                                <template v-if="sessionMaintainUse==true">
                                    <!--回话保持-->
                                    <el-form-item label="类型" prop="">
                                    <span class="checbox_20">
                                        <el-radio v-model="addInfo.mode" label="tcp">tcp</el-radio>
                                        <el-radio v-model="addInfo.mode" label="http">http</el-radio>
                                    </span>

                                    </el-form-item>
                                    <template v-if="addInfo.mode=='tcp'">
                                        <el-form-item label="过期时间(ms)" prop="">
                                            <span class="dot" style="position: absolute;left: -37px;color: red;">*</span>
                                            <el-input v-model="addInfo.tcpExpiration" placeholder="过期时间(ms)" class="el_put"></el-input>
                                        </el-form-item>
                                        <el-form-item label="源码地址掩码" prop="">
                                            <el-input v-model="addInfo.tcpIpAddr" placeholder="源码地址掩码" class="el_put"></el-input>
                                        </el-form-item>
                                    </template>

                                    <template v-else>

                                        <el-form-item label="持久化方法" prop="">
                                            <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                            <el-select v-model='addInfo.sessionMaintainMethod' class="el_sel" placeholder="绑定IP地址">
                                                <el-option label="HTTP Header(Cookie)" value="HTTP-Header"></el-option>
                                                <el-option label="HTTP Body(Cookie)" value="HTTP-Body"></el-option>
                                                <el-option label="HTTPS (Cookie)" value="HTTPS"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <!--第七层 http header-->
                                        <template v-if="addInfo.sessionMaintainMethod=='HTTP-Header'">
                                            <el-form-item label="Cookie名称" prop="">
                                                <el-input v-model="addInfo.cookieName" placeholder="服务器超时" class="el_put"></el-input>
                                            </el-form-item>
                                            <el-form-item label="Cookie方法" prop="">
                                                <span class="dot" style="position: absolute;left: -25px;color: red;">*</span>
                                                <el-select v-model='addInfo.cookieMethod' class="el_sel" placeholder="绑定IP地址">
                                                    <el-option label="INSERT" value="insert"></el-option>
                                                    <el-option label="REWRITE" value="rewrite"></el-option>
                                                    <el-option label="PREFIX" value="prefix"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </template>

                                        <template v-if="addInfo.sessionMaintainMethod=='HTTP-Header'&&addInfo.cookieMethod=='insert'">
                                            <el-form-item label="透明" prop="">
                                                <span class="dot" style="position: absolute;left: 28px;color: red;">*</span>
                                                <el-select v-model='addInfo.cookieIndirect' class="el_sel" placeholder="透明">
                                                    <el-option label="TRUE" value="TRUE"></el-option>
                                                    <el-option label="FALSE" value="FALSE"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="不用缓存" prop="">
                                                <span class="dot" style="position: absolute;left: -2px;color: red;">*</span>
                                                <el-select v-model='addInfo.cookieNocache' class="el_sel" placeholder="不用缓存">
                                                    <el-option label="TRUE" value="TRUE"></el-option>
                                                    <el-option label="FALSE" value="FALSE"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="仅Post" prop="">
                                                <span class="dot" style="position: absolute;left: 10px;color: red;">*</span>
                                                <el-select v-model='addInfo.cookiePostOnly' class="el_sel" placeholder="仅Post">
                                                    <el-option label="TRUE" value="TRUE"></el-option>
                                                    <el-option label="FALSE" value="FALSE"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="域" prop="">
                                                <el-input v-model="addInfo.cookieArea" placeholder="域" class="el_put"></el-input>
                                            </el-form-item>
                                        </template>

                                        <!--http body-->
                                        <template v-if="addInfo.sessionMaintainMethod=='HTTP-Body'">
                                            <el-form-item label="正则表达式" prop="">
                                                <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                                <el-input v-model="addInfo.regexExp" placeholder="正则表达式" class="el_put"></el-input>
                                            </el-form-item>
                                            <el-form-item label="子表达索引" prop="">
                                                <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                                <el-input v-model="addInfo.regexIndex" placeholder="子表达索引" class="el_put"></el-input>
                                                <!--<el-select v-model='addInfo.regexIndex' class="el_sel" placeholder="子表达索引">-->
                                                    <!--<el-option label="INSERT" value="INSERT"></el-option>-->
                                                <!--</el-select>-->
                                            </el-form-item>
                                            <el-form-item label="等待长度" prop="">
                                                <span class="dot" style="position: absolute;left: -4px;color: red;">*</span>
                                                <el-input v-model="addInfo.regexWaitLength" placeholder="等待长度" class="el_put"></el-input>
                                            </el-form-item>
                                            <el-form-item label="超时(ms)" prop="">
                                                <el-input v-model="addInfo.regexTimeout" placeholder="超时(ms)" class="el_put"></el-input>
                                            </el-form-item>
                                        </template>

                                    </template>
                                </template>
                            </el-form>
                        </el-tab-pane>
                    </template>

                </el-tabs>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo')">取消</span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitForm('addInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {uniqeByKeys} from "utils/dateUtil";
    import {toStrings,toBoolean} from 'utils/dateUtil'
    import {serverpoolAdd, selectServerNode} from '@/api/loadBalance/servePool'
    import {getServernodeListNopage} from '@/api/loadBalance/serverNode'

    export default {
        components: {},
        data() {

            return {
                rules: {},
                tableDataRight: [],
                tableDataLeft: [],
                checkListPort: [],
                isShow: false,
                isShowSub: false,
                val: '',
                activeName: 'first',
                ipAddrOptions:[
                    {
                        label:"0.0.0.0",
                        value:"0.0.0.0",
                    },
                    {
                        label:window.location.hostname,
                        value:window.location.hostname,
                    }
                ],
                addInfo: {
                    name: '',
                    balance: 'WRR',
                    hashType: 'mapbased',
                    uriDepth: 0,
                    uriLen: 0,
                    option: 'TCPCHECK',
                    hdrName: '',
                    serverNodeIds: '',
                    // option: '',
                    virtualHost: '',
                    timeoutCheck: 5000,
                    connectPort: '',
                    bindIpAddr: '',
                    checkUri: '',
                    smtpHeloName: '',
                    smtpConnIp: '',
                    timeoutConnect: 1000,
                    timeoutQueue: 1000,
                    timeoutServer: 1000,
                    sessionMaintainUse: true,//string
                    mode: 'tcp',
                    sessionMaintainMethod: 'HTTP-Header',
                    cookieName: '',
                    cookieMethod: 'insert',
                    cookieIndirect: 'TRUE',
                    cookieNocache: 'TRUE',
                    cookiePostOnly: 'TRUE',
                    cookieArea: '',
                    regexExp: '',
                    regexIndex: '',
                    regexWaitLength: '',
                    regexTimeout: '',
                    tcpExpiration: 0,
                    tcpIpAddr: ''
                },
                sessionMaintainUse:'',
                balances: [
                    {
                        value: 'WRR',
                        label: 'WRR:Weighted Round Robin'
                    }, {
                        value: 'RR',
                        label: 'RR:Round Robin'
                    }, {
                        value: 'WLC',
                        label: 'WLC:Weighted Least Connection'
                    }, {
                        value: 'LC',
                        label: 'LC:Least Connection'
                    }, {
                        value: 'SRCHASH',
                        label: 'SRCHASH:Source Hash'
                    }, {
                        value: 'URI',
                        label: 'URI:Uri Hash'
                    }, {
                        value: 'HDRHASH',
                        label: 'HDRHASH:HTTP Header Hash'
                    }],
                optionList: [
                    {
                        value: 'TCPCHECK',
                        label: 'TCPCHECK'
                    }, {
                        value: 'HTTPGET',
                        label: 'HTTPGET'
                    }, {
                        value: 'SSLGET',
                        label: 'SSLGET'
                    }, {
                        value: 'SMTPCHECK',
                        label: 'SMTPCHECK'
                    }
                ],
                multipleSelectionLeft: [],
                multipleSelectionRight: [],
                arrIndex: [],
                dialogVisible: false,
                addVisible: true,
            }
        },
        created() {
            this.getList();
        },
        methods: {
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
            },
            getList() {
                getServernodeListNopage().then(response => {
                    this.tableDataRight = response.data;
                    console.log(this.tableDataRight, 'tableDataRight')
                }).catch((e) => {
                    console.log(e);
                })
            },
            toRight() {
                let rightId = [];
                for (let i = 0; i < this.multipleSelectionLeft.length; i++) {
                    this.tableDataRight.push(this.multipleSelectionLeft[i]);
                    rightId.push(this.tableDataLeft[i].id)
                }
                //本地右边删除移走的 行
                for (let i = this.multipleSelectionLeft.length - 1; i >= 0; i--) {
                    this.tableDataLeft.splice(this.tableDataLeft.indexOf(this.multipleSelectionLeft[i]), 1);
                }
                this.addInfo.serverNodeIds = rightId.join(',');

            },
            toLeft() {
                let leftId = [];
                for (let i = 0; i < this.multipleSelectionRight.length; i++) {
                    this.tableDataLeft.push(this.multipleSelectionRight[i]);
                    leftId.push(this.tableDataLeft[i].id)
                }
                //本地左边删除移走的 行
                for (let i = this.multipleSelectionRight.length - 1; i >= 0; i--) {
                    this.tableDataRight.splice(this.tableDataRight.indexOf(this.multipleSelectionRight[i]), 1);
                }
                this.addInfo.serverNodeIds = leftId.join(',');
                console.log(this.addInfo.serverNodeIds, 'node');
            },
            validate(){
                //基本
                if (this.addInfo.name == '') {
                    this.$message({
                        type: 'warning',
                        message: '名称不能为空！'
                    });
                    return false
                }
                if(this.addInfo.balance=='URI'){

                    if (/^\d+$/.test(this.addInfo.uriDepth) == false) {
                        this.$message({
                            type: 'warning',
                            message: 'Uri部分深度为数字！'
                        });
                        return false
                    }
                    if (/^\d+$/.test(this.addInfo.uriDepth) == false) {
                        this.$message({
                            type: 'warning',
                            message: 'Uri部分长度为数字！'
                        });
                        return false
                    }
                }
                if ((this.addInfo.balance=='HDRHASH')) {
                    if(/^\d+$/.test(this.addInfo.hdrName)==false){
                        this.$message({
                            type: 'warning',
                            message: '头部不能为空！'
                        });
                        return false
                    }
                }

                if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.addInfo.connectPort) == false) {
                    this.$message({
                        type: 'warning',
                        message: '端口为1-65535之间的数字！'
                    });
                    return false
                }

                if (this.addInfo.bindIpAddr == ''||this.addInfo.bindIpAddr == null) {
                    this.$message({
                        type: 'warning',
                        message: '绑定IP地址不能为空！'
                    });
                    return false
                }
                if(this.addInfo.option == 'HTTPGET'||this.addInfo.option == 'SSLGET'){
                    if (this.addInfo.checkUri == '') {
                        this.$message({
                            type: 'warning',
                            message: 'Url不能为空！'
                        });
                        return false
                    }
                }
                if(this.addInfo.option == 'SMTPCHECK'){
                    if (this.addInfo.smtpHeloName == '') {
                        this.$message({
                            type: 'warning',
                            message: '连接IP地址不能为空！'
                        });
                        return false
                    }
                    if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(this.addInfo.ipAddr) == false){
                        this.$message({
                            type: 'warning',
                            message: '请输入正确的IP地址！'
                        });
                        return false
                    }

                }
                if (this.addInfo.serverNodeIds == '') {
                    this.$message({
                        type: 'warning',
                        message: '当前选择至少有一个节点！'
                    });
                    return false
                }
                
                // ********超时***********
                console.log('timeoutConnect:',this.addInfo.timeoutConnect,/^[0-9]+$/.test(this.addInfo.timeoutConnect))
                if (/^\d+$/.test(this.addInfo.timeoutConnect)==false) {
                    this.$message({
                        type: 'warning',
                        message: '连接超时为数字！'
                    });
                    return false
                }
                if (/^\d+$/.test(this.addInfo.timeoutQueue)==false) {
                    this.$message({
                        type: 'warning',
                        message: '队列超时为数字！'
                    });
                    return false
                }
                if (/^\d+$/.test(this.addInfo.timeoutServer)==false) {
                    this.$message({
                        type: 'warning',
                        message: '服务器超时为数字！'
                    });
                    return false
                }
                // ********回话保持***********
                console.log('tcpExpiration:',/^\d+$/.test(this.addInfo.tcpExpiration))
                if (this.sessionMaintainUse == true) {
                    if (this.addInfo.mode == 'tcp') {
                        if (/^\d+$/.test(this.addInfo.tcpExpiration)==false) {
                            this.$message({
                                type: 'warning',
                                message: '过期时间为数字！'
                            });
                            return false
                        }
                    }

                    if (this.addInfo.mode == 'http'&&this.addInfo.sessionMaintainMethod=='HTTP-Body') {

                        if (this.addInfo.regexExp=='') {
                            this.$message({
                                type: 'warning',
                                message: '正则表达式不能为空！'
                            });
                            return false
                        }
                        if (this.addInfo.regexIndex=='') {
                            this.$message({
                                type: 'warning',
                                message: '子表达式索引不能为空！'
                            });
                            return false
                        }
                        if (/^\d+$/.test(this.addInfo.regexWaitLength)==false) {
                            this.$message({
                                type: 'warning',
                                message: '子表达式索引为数字！'
                            });
                            return false
                        }
                    }
                }
                return true
            },
            submitForm(formName) {

                if (this.validate()) {

                    this.addInfo.sessionMaintainUse=toStrings(this.sessionMaintainUse);
                    serverpoolAdd(this.addInfo).then((resp) => {
                        if (resp.success == true) {
                            this.$message({
                                type: 'success',
                                message: '新建成功！'
                            });
                            this.addVisible = false;
                            this.$emit('onChangeStatus');
                            this.$refs[formName].resetFields();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: resp.code.addInfo
                            });
                        }
                    }).catch(e => {
                        console.log("新建出错", e);
                    });

                }

            },
            resetForm(formName) {
                console.log(formName, '------');
                this.addVisible = false;
                this.$refs[formName].resetFields();
            },
            validatorRange(val, regIp, regMask) {

            },
            handleSelectionChangeLeft(val) {
                this.multipleSelectionLeft = val;
                console.log('val1:', val)
            },
            handleSelectionChangeRight(val) {
                this.multipleSelectionRight = val;
                console.log('val2:', val)
            },
        }
    }
</script>
<style lang="scss">
    .checbox_20 {
        margin-left: 20px;
    }
</style>
<style >
    .tab_scroll .tab_scroll_div .el-table__body-wrapper{
        overflow-x: auto !important;
    }
</style>
