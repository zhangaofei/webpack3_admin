<template>
    <div class="admin public tab_scroll">
        <el-dialog
                title="查看服务器池"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public tab_scroll"
                top="8%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="admin-form tab_scroll_div">

                <el-tabs type="card" v-model="activeName">
                    <el-tab-pane label="基本" name="first">
                        <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="142px"
                                 class="demo-ruleForm">
                            <el-form-item label="名称" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.name" placeholder="名称" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="负载均衡算法" prop="">
                                <el-select v-model="editInfo.balance" class="el_sel" placeholder="负载均衡算法" :disabled="true">
                                    <el-option
                                            v-for="item in balances"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="Hash类型" prop="" v-if="editInfo.balance=='SRCHASH'||editInfo.balance=='HDRHASH'||editInfo.balance=='URI'">
                                <span style="color: red;position: absolute;left: -10px;">*</span>
                                <el-select v-model="editInfo.hashType" class="el_sel" placeholder="Hash类型" :disabled="true">
                                    <el-option label="mapbased" value="mapbased"></el-option>
                                    <el-option label="consistent" value="consistent"></el-option>
                                </el-select>
                            </el-form-item>
                            <template v-if="editInfo.balance=='URI'">
                                <el-form-item label="Uri部分深度" prop="">
                                    <span style="color: red;position: absolute;left: -25px;">*</span>
                                    <el-input v-model="editInfo.uriDepth" placeholder="Uri部分深度" class="el_put" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="Uri部分长度" prop="">
                                    <span style="color: red;position: absolute;left: -25px;">*</span>
                                    <el-input v-model="editInfo.uriLen" placeholder="Uri部分长度" class="el_put" :disabled="true"></el-input>
                                </el-form-item>
                            </template>


                            <el-form-item label="头部" prop="" v-if="editInfo.balance=='HDRHASH'">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.hdrName" placeholder="头部" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="选择" prop=""  v-if="false">
                                <el-input v-model="editInfo.serverNodeIds"  placeholder="选择" class="el_put" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item label="健康检查方法" prop="">
                                <span style="color: red;position: absolute;left: -32px;">*</span>
                                <el-select v-model="editInfo.status" class="el_sel" placeholder="健康检查方法" :disabled="true">
                                    <el-option
                                            v-for="item in statusList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="虚拟主机" prop="">
                                <el-input v-model="editInfo.virtualHost" placeholder="虚拟主机" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="间隔" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.timeoutCheck" placeholder="间隔" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="连接端口" prop="">
                                <span style="color: red;position: absolute;left: -3px;">*</span>
                                <el-input v-model="editInfo.connectPort" placeholder="连接端口" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="绑定IP地址" prop="">
                                <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                <!--<el-select v-model='editInfo.bindIpAddr' class="el_sel" placeholder="绑定IP地址" :disabled="true">-->
                                    <!--<el-option label="0.0.0.0" value="0.0.0.0"></el-option>-->
                                    <!--<el-option label="eth4:192.168.20.28" value="192.168.20.28"></el-option>-->
                                <!--</el-select>-->
                                <el-select v-model="editInfo.ipAddr" class="el_sel" placeholder="">
                                    <el-option
                                            v-for="item in ipAddrOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>

                            </el-form-item>
                            <!--细节-->
                            <template v-if="editInfo.option=='SSLGET'||editInfo.option=='HTTPGET' ">
                                <el-form-item label="Url" prop="" >
                                    <span class="dot" style="position: absolute;left: 35px;color: red;">*</span>
                                    <el-input v-model="editInfo.checkUri" placeholder="Url" class="el_put" :disabled="true"></el-input>
                                </el-form-item>
                            </template>
                            <template v-if="editInfo.option=='SMTPCHECK'">
                                <el-form-item label="HELO Name" prop="">
                                    <span class="dot" style="position: absolute;left: -33px;color: red;">*</span>
                                    <el-input v-model="editInfo.smtpHeloName" placeholder="HELO Name"
                                              class="el_put"></el-input>
                                </el-form-item>
                                <el-form-item label="连接IP地址" prop="">
                                    <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                    <el-input v-model="editInfo.smtpConnIp" placeholder="连接IP地址"
                                              class="el_put"></el-input>
                                </el-form-item>
                            </template>
                        </el-form>

                        <div style="">
                            <el-table
                                    :data="tableDataLeft"
                                    style="width: 40%;float: left;margin-left:100px;overflow-y: auto"
                                    height="172"
                                    border
                                    tooltip-effect="dark"
                                    :selectable="false"
                                    @selection-change="handleSelectionChangeLeft" v-if="true">
                                <el-table-column
                                        type="selection"
                                        :selectable="checkSelectable"
                                        fixed
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
                                        width="120">
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
                                        :selectable="checkSelectable"
                                        fixed
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
                                        width="120">
                                </el-table-column>
                            </el-table>
                        </div>
                        <!--</el-form-item>-->
                    </el-tab-pane>
                    <el-tab-pane label="超时" name="second">
                        <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="0px" class="demo-ruleForm">
                            <el-form-item label="连接超时(ms)" prop="">
                                <span style="color: red;position: absolute;left: 97px;">*</span>
                                <el-input v-model="editInfo.timeoutConnect" placeholder="连接超时" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="队列超时(ms)" prop="">
                                <span style="color: red;position: absolute;left: 98px;">*</span>
                                <el-input v-model="editInfo.timeoutQueue" placeholder="连接超时" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="服务器超时(ms)" prop="">
                                <span style="color: red;position: absolute;left: 84px;">*</span>
                                <el-input v-model="editInfo.timeoutServer" placeholder="服务器超时" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <template v-if="!((editInfo.balance=='SRCHASH'||editInfo.balance=='HDRHASH')&&editInfo.hashType=='consistent')">
                        <el-tab-pane label="会话保持" name="third">

                            <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="142px"
                                     class="demo-ruleForm">
                                <el-form-item label="启动" prop="">
                                    <el-checkbox v-model="editInfo.sessionMaintainUse" class="checbox_20" :disabled="true">启用</el-checkbox>
                                </el-form-item>
                                <template v-if="Boolean(editInfo.sessionMaintainUse)==true">
                                    <!--回话保持-->
                                    <el-form-item label="类型" prop="">
                                    <span class="checbox_20">
                                        <el-radio v-model="editInfo.mode" label="tcp" :disabled="true">tcp</el-radio>
                                        <el-radio v-model="editInfo.mode" label="http" :disabled="true">http</el-radio>
                                    </span>

                                    </el-form-item>
                                    <template v-if="editInfo.mode=='tcp'">
                                        <el-form-item label="过期时间(ms)" prop="">
                                            <span class="dot" style="position: absolute;left: -37px;color: red;">*</span>
                                            <el-input v-model="editInfo.tcpExpiration" placeholder="过期时间(ms)" class="el_put" :disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="源码地址掩码" prop="">
                                            <el-input v-model="editInfo.tcpIpAddr" placeholder="源码地址掩码" class="el_put" :disabled="true"></el-input>
                                        </el-form-item>
                                    </template>

                                    <template v-else>

                                        <el-form-item label="持久化方法" prop="">
                                            <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                            <el-select v-model='editInfo.sessionMaintainMethod' class="el_sel" placeholder="绑定IP地址" :disabled="true">
                                                <el-option label="HTTP Header(Cookie)" value="HTTP-Header"></el-option>
                                                <el-option label="HTTP Body(Cookie)" value="HTTP-Body"></el-option>
                                                <el-option label="HTTPS (Cookie)" value="HTTPS"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <!--第七层 http header-->
                                        <template v-if="editInfo.sessionMaintainMethod=='HTTP-Header'">
                                            <el-form-item label="Cookie名称" prop="">
                                                <el-input v-model="editInfo.cookieName" placeholder="服务器超时" class="el_put" :disabled="true"></el-input>
                                            </el-form-item>
                                            <el-form-item label="Cookie方法" prop="">
                                                <span class="dot" style="position: absolute;left: -25px;color: red;">*</span>
                                                <el-select v-model='editInfo.cookieMethod' class="el_sel" placeholder="绑定IP地址" :disabled="true">
                                                    <el-option label="INSERT" value="insert"></el-option>
                                                    <el-option label="REWRITE" value="rewrite"></el-option>
                                                    <el-option label="PREFIX" value="prefix"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </template>

                                        <template v-if="editInfo.sessionMaintainMethod=='HTTP-Header'&&editInfo.cookieMethod=='insert'">
                                            <el-form-item label="透明" prop="">
                                                <span class="dot" style="position: absolute;left: 28px;color: red;">*</span>
                                                <el-select v-model='editInfo.cookieIndirect' class="el_sel" placeholder="透明" :disabled="true">
                                                    <el-option label="TRUE" value="TRUE"></el-option>
                                                    <el-option label="FALSE" value="FALSE"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="不用缓存" prop="">
                                                <span class="dot" style="position: absolute;left: -2px;color: red;">*</span>
                                                <el-select v-model='editInfo.cookieNocache' class="el_sel" placeholder="不用缓存" :disabled="true">
                                                    <el-option label="TRUE" value="TRUE"></el-option>
                                                    <el-option label="FALSE" value="FALSE"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="仅Post" prop="">
                                                <span class="dot" style="position: absolute;left: 10px;color: red;">*</span>
                                                <el-select v-model='editInfo.cookiePostOnly' class="el_sel" placeholder="仅Post" :disabled="true">
                                                    <el-option label="TRUE" value="TRUE"></el-option>
                                                    <el-option label="FALSE" value="FALSE"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="域" prop="">
                                                <el-input v-model="editInfo.cookieArea" placeholder="域" class="el_put" :disabled="true"></el-input>
                                            </el-form-item>
                                        </template>

                                        <!--http body-->
                                        <template v-if="editInfo.sessionMaintainMethod=='HTTP-Body'">
                                            <el-form-item label="正则表达式" prop="">
                                                <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                                <el-input v-model="editInfo.regexExp" placeholder="正则表达式" class="el_put" :disabled="true"></el-input>
                                            </el-form-item>
                                            <el-form-item label="子表达索引" prop="">
                                                <span class="dot" style="position: absolute;left: -18px;color: red;">*</span>
                                                <el-input v-model="editInfo.regexIndex" placeholder="子表达索引" class="el_put" :disabled="true"></el-input>
                                            </el-form-item>
                                            <el-form-item label="等待长度" prop="">
                                                <span class="dot" style="position: absolute;left: -4px;color: red;">*</span>
                                                <el-input v-model="editInfo.regexWaitLength" placeholder="等待长度" class="el_put" :disabled="true"></el-input>
                                            </el-form-item>
                                            <el-form-item label="超时(ms)" prop="">
                                                <el-input v-model="editInfo.regexTimeout" placeholder="超时(ms)" class="el_put" :disabled="true"></el-input>
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
                    <!--<span class="canle" @click="resetForm('editInfo')">取消</span>-->
                    <!--<el-button-->
                            <!--class="btn_save"-->
                            <!--type="primary"-->
                            <!--@click="submitForm('editInfo')">-->
                        <!--确定-->
                    <!--</el-button>-->
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    // import {addAdmin, getPower} from "../../../../../api/systemSet/new_adminSet/new_sysAdmin";
    import {serverpoolEdit, selectServerNodeUnused, selectServerNodeUsed} from '@/api/loadBalance/servePool'
    import {getServernodeListNopage} from '@/api/loadBalance/serverNode'
    import {toStrings,toBoolean} from 'utils/dateUtil'

    export default {
        components: {},
        data() {
            return {
                tableDataRight: [],
                tableDataLeft: [],
                checkListPort: [],
                isShow: false,
                isShowSub: false,
                val: '',
                rules: {},
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
                editInfo: {
                    id: '',
                    name: '',
                    balance: '',
                    hashType: '',
                    uriDepth: 0,
                    uriLen: 0,
                    hdrName: '',
                    serverNodeIds: '',
                    option: '',
                    virtualHost: '',
                    timeoutCheck: '',
                    connectPort: '',
                    bindIpAddr: '',
                    checkUri: '',
                    smtpHeloName: '',
                    smtpConnIp: '',
                    timeoutConnect: 0,
                    timeoutQueue: 0,
                    timeoutServer: 0,
                    sessionMaintainUse: true,
                    mode: '',
                    sessionMaintainMethod: '',
                    cookieName: '',
                    cookieMethod: '',
                    cookieIndirect: '',
                    cookieNocache: '',
                    cookiePostOnly: '',
                    cookieArea: '',
                    regexExp: '',
                    regexIndex: '',
                    regexWaitLength: '',
                    regexTimeout: '',
                    tcpExpiration: 0,
                    tcpIpAddr: ''
                },
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
                statusList: [
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
                        label: 'SMTPCHECKn'
                    }
                ],
                multipleSelectionRight: [],
                multipleSelectionLeft: [],
                arrIndex: [],
                dialogVisible: false,
                editVisible: true,
            }
        },
        props: {
            currentData: Object,
        },
        created() {
            this.doInit(this.currentData);
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
            doInit(currentData) {
                this.editInfo = currentData;
                this.sessionMaintainUse=toBoolean(this.editInfo.sessionMaintainUse);
                console.log('editInfo:', this.editInfo)
                this.editVisible = true;
                selectServerNodeUnused({ids: this.editInfo.serverNodeIds}).then(response => {
                    this.tableDataRight = response.data;
                    console.log(this.tableDataRight, 'tableDataRight')
                }).catch((e) => {
                    console.log(e);
                });
                selectServerNodeUsed({ids: this.editInfo.serverNodeIds}).then(response => {
                    this.tableDataLeft = response.data;
                    console.log(this.tableDataLeft, 'tableDataLeft')
                }).catch((e) => {
                    console.log(e);
                });
            },
            checkSelectable(){
                return false
            },
            getList() {
                // getServernodeListNopage().then(response => {
                //     this.tableDataRight = response.data;
                //     console.log(this.tableDataRight, 'tableDataRight')
                // }).catch((e) => {
                //     console.log(e);
                // })
            },
            toRight() {
                let rightId = []; //取补集id
                // let arr3=[];
                for (let i = 0; i < this.multipleSelectionLeft.length; i++) {
                    this.tableDataRight.push(this.multipleSelectionLeft[i]);
                    // rightId.push(this.tableDataLeft[i].id);

                }
                //取补集
                for (let i = 0; i < this.tableDataLeft.length; i++) {
                    if(this.multipleSelectionLeft.includes(this.tableDataLeft[i])){

                    }else {
                        rightId.push(this.tableDataLeft[i].id)
                    }
                }

                //本地删除移走的 行
                for (let i = this.multipleSelectionLeft.length - 1; i >= 0; i--) {
                    this.tableDataLeft.splice(this.tableDataLeft.indexOf(this.multipleSelectionLeft[i]), 1);
                }
                this.editInfo.serverNodeIds = rightId.join(',');
                console.log('rightId:',rightId,'===', this.editInfo.serverNodeIds)
            },
            toLeft() {
                let leftId = [];
                // leftId.push(this.editInfo.serverNodeIds.split(','));
                // console.log('leftId2:',leftId)
                for (let i = 0; i < this.multipleSelectionRight.length; i++) {
                    this.tableDataLeft.push(this.multipleSelectionRight[i]);
                    leftId.push(this.multipleSelectionRight[i].id)
                }
                //本地左边删除移走的 行
                for (let i = this.multipleSelectionRight.length - 1; i >= 0; i--) {
                    this.tableDataRight.splice(this.tableDataRight.indexOf(this.multipleSelectionRight[i]), 1);
                }
                this.editInfo.serverNodeIds = leftId.join(',')+','+this.editInfo.serverNodeIds;
                console.log(this.editInfo.serverNodeIds, 'node',leftId);
            },
            validate(){
                //基本
                if (this.editInfo.name == '') {
                    this.$message({
                        type: 'warning',
                        message: '名称不能为空！'
                    });
                    return false
                }
                if(this.editInfo.balance=='URI'){

                    if (/^\d+$/.test(this.editInfo.uriDepth) == false) {
                        this.$message({
                            type: 'warning',
                            message: 'Uri部分深度为数字！'
                        });
                        return false
                    }
                    if (/^\d+$/.test(this.editInfo.uriDepth) == false) {
                        this.$message({
                            type: 'warning',
                            message: 'Uri部分长度为数字！'
                        });
                        return false
                    }
                }
                if ((this.editInfo.balance=='HDRHASH'&& /^\d+$/.test(this.editInfo.hdrName))==false) {
                    this.$message({
                        type: 'warning',
                        message: '头部不能为空！'
                    });
                    return false
                }


                if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.editInfo.connectPort) == false) {
                    this.$message({
                        type: 'warning',
                        message: '端口为1-65535之间的数字！'
                    });
                    return false
                }

                if (this.editInfo.bindIpAddr == ''||this.editInfo.bindIpAddr == null) {
                    this.$message({
                        type: 'warning',
                        message: '绑定IP地址不能为空！'
                    });
                    return false
                }
                // ********超时***********
                console.log('timeoutConnect:',this.editInfo.timeoutConnect,/^[0-9]+$/.test(this.editInfo.timeoutConnect))
                if (/^\d+$/.test(this.editInfo.timeoutConnect)==false) {
                    this.$message({
                        type: 'warning',
                        message: '连接超时为数字！'
                    });
                    return false
                }
                if (/^\d+$/.test(this.editInfo.timeoutQueue)==false) {
                    this.$message({
                        type: 'warning',
                        message: '队列超时为数字！'
                    });
                    return false
                }
                if (/^\d+$/.test(this.editInfo.timeoutServer)==false) {
                    this.$message({
                        type: 'warning',
                        message: '服务器超时为数字！'
                    });
                    return false
                }
                // ********回话保持***********
                console.log('tcpExpiration:',/^\d+$/.test(this.editInfo.tcpExpiration))
                if (this.editInfo.sessionMaintainUse == true) {
                    if (this.editInfo.mode == 'tcp') {
                        if (/^\d+$/.test(this.editInfo.tcpExpiration)==false) {
                            this.$message({
                                type: 'warning',
                                message: '过期时间为数字！'
                            });
                            return false
                        }
                    }

                    if (this.editInfo.mode == 'http'&&this.editInfo.sessionMaintainMethod=='HTTP-Body') {

                        if (this.editInfo.regexExp=='') {
                            this.$message({
                                type: 'warning',
                                message: '正则表达式不能为空！'
                            });
                            return false
                        }
                        if (this.editInfo.regexIndex=='') {
                            this.$message({
                                type: 'warning',
                                message: '子表达式索引不能为空！'
                            });
                            return false
                        }
                        if (/^\d+$/.test(this.editInfo.regexWaitLength)==false) {
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
                    serverpoolEdit(this.editInfo).then((resp) => {
                        if (resp.success == true) {
                            this.$message({
                                type: 'success',
                                message: '修改成功！'
                            });
                            this.editVisible = false;
                            this.$emit('onChangeStatus');
                            this.$refs[formName].resetFields();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: resp.code.editInfo
                            });
                        }
                    }).catch(e => {
                        console.log("修改出错", e);
                    });
                }
            },
            resetForm(formName) {
                console.log(formName, '------');
                this.editVisible = false;
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
