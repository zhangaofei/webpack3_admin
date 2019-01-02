<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><i class="fa fa-folder-open"></i>域名管理</li>
                <li class="active">快速添加记录</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style=" border-top-color: #6cbaf5 !important;">
                        <div class="box-header clude_tab">
                            <h3 class="box-title" id="res_rdp_title">快速添加记录</h3>
                            <a @click="saveDomain()" style="float: right;margin-top: 17px;margin-right: 50px">
                                <img src="../../../../assets/addIcon/保存.png"  style="width: 18px;height: 18px;margin-right: 10px">保存设置
                            </a>
                        </div>
                        <!-- /.box-header -->

                        <div class="box-body">
                            <div class="row" style="margin-top: 20px;">
                            </div>
                            <el-collapse v-model="activeNames">
                                <el-collapse-item  name="1">
                                    <template slot="title">当前域名</template>

                                    <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="180px" class="quickly_form">
                                        <el-form-item label="域名" prop="fullDomainName">
                                            <el-input v-model="fullDomainName" :disabled="true" class="el_put"></el-input>
                                            <el-checkbox v-model="editInfo.parseType">智能解析</el-checkbox>
                                            <el-checkbox v-model="editInfo.isReverse">自动创建反解析</el-checkbox>
                                        </el-form-item>

                                        <el-form-item label="高级设置" prop="">
                                            <el-radio-group v-model="editInfo.furtherConfig"  class="el_put_1" style="margin-left: 20px">
                                                <el-radio :label='true'>开启</el-radio>
                                                <el-radio :label='false'>关闭</el-radio>
                                            </el-radio-group>
                                        </el-form-item>

                                        <span v-if="editInfo.furtherConfig == true">

                        <el-form-item label="刷新时间(秒)" prop="freshSec">
                            <el-input  v-model="editInfo.freshSec" class="el_put" placeholder="请输入数字"></el-input>
                        </el-form-item>
                         <el-form-item label="重试时间(秒)" prop="retrySec">
                            <el-input  v-model="editInfo.retrySec" class="el_put" placeholder="请输入数字"></el-input>
                        </el-form-item>
                         <el-form-item label="过期时间(秒)" prop="timeOutSec">
                            <el-input  v-model="editInfo.timeOutSec" class="el_put" placeholder="请输入数字"></el-input>
                        </el-form-item>
                         <el-form-item label="最小TTL(秒)" prop="minTtlSec">
                            <el-input  v-model="editInfo.minTtlSec" class="el_put" placeholder="请输入数字"></el-input>
                        </el-form-item>
                         <el-form-item label="全局TTL(秒)" prop="globalTtlSec">
                            <el-input  v-model="editInfo.globalTtlSec" class="el_put" placeholder="请输入数字"></el-input>
                        </el-form-item>

                        <el-form-item label="NS记录1" prop="nsRecordType1">
                            <el-input  v-model="editInfo.nsRecordType1" class="el_put" placeholder="如 NS.XXX.com"></el-input>
                        </el-form-item>
                         <el-form-item label="NS记录2" prop="nsRecordType2">
                            <el-input  v-model="editInfo.nsRecordType2" class="el_put" placeholder="如 NS.XXX.com"></el-input>
                        </el-form-item>
                        <el-form-item label="转发服务器" prop="transpondServers">
                            <el-select v-model="editInfo.transpondType" placeholder="请选择" class="el_sel_transmit" style="margin-left: 20px">
                                 <el-option label="开启转发" value="1" ></el-option>
                                 <el-option label="关闭转发" value="2" ></el-option>
                                 <el-option label="强制转发" value="3" ></el-option>
                                 <el-option label="第一次转发" value="4" ></el-option>
                            </el-select>
                            <el-input type="textarea" autosize v-model="editInfo.transpondServers" class="el_put_2" placeholder="请输入ip地址 如 1.1.1.1"></el-input>
                        </el-form-item>
                        <el-form-item label="域名别名" prop="">
                            <el-select v-model="editInfo.byname" placeholder="请选择" class="el_sel_byname" style="margin-left: 20px">
                                 <el-option
                                         v-for="name in bynameList"
                                         :key="name"
                                         :label="name"
                                         :value="name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </span>
                                        <el-form-item label="按钮" class="resetLabel">
                                            <el-button
                                                    @click="resetForm('editInfo')" style="margin-right: 40px;margin-left: 20px">
                                                重置
                                            </el-button>
                                            <el-button
                                                    style="background-color: #2b7de2;color: #ffffff;"
                                                    @click="onEditDomain('editInfo')">
                                                确定
                                            </el-button>
                                        </el-form-item>
                                    </el-form>



                                </el-collapse-item>
                                <el-collapse-item title="添加记录" name="2" >
                                    <el-table
                                            v-if="activeNames.includes('2')"
                                            ref="multipleTable"
                                            :data="addStaRouter"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 90%; float: left"
                                            >
                                        <el-table-column
                                                label-class-name="user_mandatory"
                                                label="主机记录"
                                                align="center"
                                        >
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.recordName" class="route_put ips"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="TTL值"
                                                align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.ttlSec" class="route_put netMasks"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label-class-name="user_mandatory"
                                                label="记录类型"
                                                width="140"
                                                align="center"
                                        >
                                            <template slot-scope="scope">
                                                <el-select v-model="scope.row.recordType" placeholder="请选择" class="type_sel">
                                                    <el-option label="A记录" value=1 ></el-option>
                                                    <el-option label="NS记录" value=2 ></el-option>
                                                    <el-option label="AAAA记录" value=3 ></el-option>
                                                    <el-option label="PTR记录" value=4 ></el-option>
                                                    <el-option label="CNAME记录" value=5 ></el-option>
                                                    <el-option label="MX记录" value=6 ></el-option>
                                                    <el-option label="TXT记录" value=7 ></el-option>
                                                </el-select>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="MX优先级"
                                                align="center">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.recordType == 6">
                                                    <el-input v-model="scope.row.priority" class="route_put gateways"></el-input>
                                                </span>
                                                <span v-else>
                                                    <el-input v-model="scope.row.priority" class="route_put gateways" :disabled="true"></el-input>
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label-class-name="user_mandatory"
                                                label="记录值"
                                                align="center">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.recordValue" class="route_put metrics"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label-class-name="user_mandatory"
                                                label="线路"
                                                width="140"
                                                align="center"
                                        >
                                            <template slot-scope="scope">
                                                <el-select v-model="scope.row.lineId" @change="valueChange(scope.row.lineId)"  placeholder="请选择" class="type_sel">
                                                    <el-option
                                                            v-for="line in lineNameList"
                                                            :key="line.id"
                                                            :label="line.chName"
                                                            :value="line.id">
                                                    </el-option>
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
                                            style="background-color: #2b7de2;color: #ffffff;margin-top: 67px;margin-left: 18px"
                                            @click="onAddRecord()">确定
                                    </el-button>
                                </el-collapse-item>
                                <el-collapse-item title="记录列表" name="3">
                                    <el-table
                                            ref="multipleTable"
                                            :data="recordList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%">

                                        <el-table-column
                                                prop="recordName"
                                                align="center"
                                                show-overflow-tooltip
                                                label="主机记录">
                                        </el-table-column>

                                        <el-table-column
                                                prop="ttlSec"
                                                align="center"
                                                label="TTL值">
                                        </el-table-column>

                                        <el-table-column
                                                prop="recordType"
                                                align="center"
                                                label="类型">
                                        </el-table-column>


                                        <el-table-column
                                                prop="priority"
                                                align="center"
                                                label="MX优先级">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.recordType=='6' || scope.row.recordType=='MX记录'">{{scope.row.priority}}</span>
                                                <span v-else>无</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                prop="recordValue"
                                                align="center"
                                                show-overflow-tooltip
                                                label="记录值">
                                        </el-table-column>

                                        <el-table-column
                                                prop="dnsLineChName"
                                                align="center"
                                                label="线路">
                                        </el-table-column>

                                        <el-table-column
                                                prop="checkMethod"
                                                align="center"
                                                label="检查方式">
                                        </el-table-column>

                                        <el-table-column
                                                prop="isStop"
                                                align="center"
                                                label="状态">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.status==0"><a>启用</a></span>
                                                <span v-else-if="scope.row.status==1"><a>停用</a></span>
                                                <span v-else><a>检测中</a></span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isStop==true">
                                                    <a @click="onPauseRecord(scope.row.id, false)"><i class="fa fa-play-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <span v-else>
                                                    <a @click="onPauseRecord(scope.row.id, true)"><i class="fa fa-pause-circle-o" style="font-size: 18px"></i></a>
                                                </span>
                                                <a @click="onEdit_record(scope.row)" title="修改"><i class="fa fa-pencil" style="font-size: 15px"></i></a>
                                                <a @click="onDelete(scope.row)" title="删除" style="margin-right: 8px"><i class="fa fa-trash-o" style="font-size: 15px"></i></a>
                                            </template>
                                        </el-table-column>


                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="listQuery_record.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery_record.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total = "total_record">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                            <editRecordList @onChangeStatus="onChangeStatus" :currentData="currentData_record" v-if="isEditRecordList"/>
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
    import editRecordList from './editRecordList.vue'
    import {getDomainList,updateDomain, deleteRecord,getBynameList,getLineNameList,setDomainStatus,setRecordStatus,addRecord,getRecordList,stopRecordAnalyze,restartRedns} from 'api/enDNS/domainAdmin';
    import {getPoolListAll} from 'api/enDNS/line';
    export default{
        components: {editRecordList},
        data(){
            var validateName = (rule, value, callback) =>
            {
                if (/^[a-zA-Z0-9\u4e00-\u9fa5\.]+$/.test(value) == false) {
                    callback(new Error("域名只能包含字母、数字、中文和'.'符号"));
                } else {
                    callback();
                }
            };

            var validateNumber = (rule, value, callback) =>
            {
                if(!value){
                    callback();
                } else if (/^(0|[1-9]\d*)$/.test(value) == false) {
                    callback(new Error("请填写非负整数"));
                } else {
                    callback();
                }
            };

            var validateNS = (rule, value, callback) =>
            {
                if(!value){
                    callback();
                } else if (/^[a-zA-Z0-9\u4e00-\u9fa5\.]+$/.test(value) == false) {
                    callback(new Error("NS记录只能包含字母、数字、中文和'.'符号"));
                } else if(this.addInfo.nsRecordType1 == this.addInfo.nsRecordType2){
                    callback(new Error("两条NS记录不可相同"));
                } else {
                    callback();
                }
            };

            var  validateTransmitServer = (rule, value, callback) =>
            {
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                if (value.length<1){
                    callback(new Error("请至少填写一条IP地址"));
                }else {
                    var valueList = value.split("\n");
                    for (var i = 0; i < valueList.length; i++) {
                        var valueItem = valueList[i];
                        if (valueItem.length>15||valueItem.indexOf(",")>-1){
                            callback(new Error("地址之间请回车换行分隔,请检测输入是否合法"));
                        }else {
                            if (ipReg.test(valueItem)==false){
                                callback(new Error("IP地址不正确"));
                            }

                        }
                    }
                    callback();
                }
            };

            var validateSelect = (rule, value, callback) =>
            {
                if (value=='') {
                    callback(new Error("请选择"));
                }
                callback();
            };

            var validateMX = (rule, value, callback) =>
            {
                if ((this.add_record.record_type=='MX')&&(/^(0|[1-9]\d*)$/.test(value) == false)) {
                    callback(new Error("请填写非负整数"));
                }
                callback();
            };


            var  validateIpv4= (rule, value, callback) =>
            {
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                if (ipReg.test(value)==false){
                    callback(new Error("IP地址不正确"));
                }
            };

            var  validateMaster= (rule, value, callback) =>
            {
                callback();
            };


            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                rules: {
                    fullDomainName: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],
                    freshSec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    retrySec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    timeOutSec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    minTtlSec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    globalTtlSec: [
                        {required: false, validator: validateNumber, trigger: 'blur'}
                    ],
                    nsRecordType1: [
                        {required: false, validator: validateNS, trigger: 'blur'}
                    ],
                    nsRecordType2: [
                        {required: false, validator: validateNS, trigger: 'blur'}
                    ],

                    transpondServers: [
                        {required: false, validator: validateTransmitServer, trigger: 'blur'}
                    ]
                },

                editInfo: {
                    id:'',
                    parseType:'',
                    isReverse:'',
                    furtherConfig:'',
                    freshSec:'',
                    retrySec:'',
                    timeOutSec:'',
                    minTtlSec:'',
                    globalTtlSec:'',
                    nsRecordType1:'',
                    nsRecordType2:'',
                    transpondServers:'',
                    transpondType:''
                },
                bynameList:[],
                fullDomainName:'',
                add_record:{
                    domainId:'',
                    recordName:'',
                    ttlSec: '',
                    recordType: '',
                    priority: '',
                    recordValue: '',
                    lineId: '',
                    lineIds:[]
                },

                listQuery_domain:{
                    currentPage: 1,
                    pageSize: 1000,//此处应该为无穷大；避免编辑遍历数据带不过来
                    searchContent:""
                },
                listQuery_record:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:"",
                    domainId:''
                },
                recordList:[],
                total_record: 0,
                currentData_record:'',

                editVisible: true,
                activeNames: ['1'],
                isEditRecordList:false,
                recordId:'',
                currentData:'',
                lineNameList:[],
                lineList:[],
                poolList:[],
                addStaRouter:[]
            };

        },
        created(){
            //获取域名管理界面点击某一项的id
            //this.recordId = this.$store.getters.getDomanId;
            this.recordId = window.sessionStorage.domanid;
            this.getDomainList();
            this.addStaRouter.push({
                recordName:'',
                ttlSec: '',
                recordType: '',
                priority: '',
                recordValue: '',
                lineId: 0,
                lineIds:[0]
            })
            this.getListForSelect();
            console.log('recordId',this.recordId)
            // this.getLineNameList();
        },

        methods: {
            validate(){
                if(!this.add_record.recordName){
                    this.$message({
                        type: 'warning',
                        message: '请输入主机记录'
                    });
                    return false
                }
                if(/^(0|[1-9]\d*)$/.test(this.add_record.ttlSec) == false && this.add_record.ttlSec){
                    this.$message({
                        type: 'warning',
                        message: 'TTL值请输入非负整数!'
                    });
                    return false
                }
                if(!this.add_record.recordType){
                    this.$message({
                        type: 'warning',
                        message: '请选择记录类型'
                    });
                    return false
                }
                if(this.add_record.recordType == 1 && this.add_record.recordValue){
                    var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                    if (ipReg.test(this.add_record.recordValue)==false){
                        this.$message({
                            type: 'warning',
                            message: '记录类型为A记录时,记录值请填写正确的IP地址'
                        });
                        return false
                    } else {
                        return true;
                    }
                } else if(!this.add_record.recordValue) {
                    this.$message({
                        type: 'warning',
                        message: '请输入记录值'
                    });
                    return false
                }
                if(this.add_record.recordType == 6 && this.add_record.priority){
                    if(/^(0|[1-9]\d*)$/.test(this.add_record.priority) == false){
                        this.$message({
                            type: 'warning',
                            message: 'MX优先级请输入非负整数'
                        });
                        return false
                    }
                }
                return true;
            },
            valueChange(data){
                this.addStaRouter[0].lineIds = [];
                for (let i = 0; i < this.lineList.length; i++){
                    if(data == this.lineList[i].id){
                        this.addStaRouter[0].lineIds.push(data);
                        break;
                    }
                }
                for (let i = 0; i < this.poolList.length; i++){
                    if(data == this.poolList[i].id){
                        this.addStaRouter[0].lineIds = this.poolList[i].lineIds;
                        break;
                    }
                }
            },
            saveDomain(){
                this.$confirm('是否保存DNS设置?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    restartRedns().then(response => {
                        if (response.status == 'SUCCESS'){
                            this.$message({
                                type: 'success',
                                message: '保存设置成功!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: response.code.info
                            });
                        }
                    }).catch((e) => {
                        console.log(e)
                    });

                }).catch(() => {    // 取消事件
                    this.$message({
                        type: 'info',
                        message: '已取消保存'
                    });
                });
            },
            getRecordList() {
                getRecordList(this.listQuery_record).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.recordList = response.data;
                        for(let i = 0; i < this.recordList.length; i++){
                            if(this.recordList[i].recordType == 1){
                                this.recordList[i].recordType = 'A记录'
                            } else if(this.recordList[i].recordType == 2){
                                this.recordList[i].recordType = 'NS记录'
                            } else if(this.recordList[i].recordType == 3){
                                this.recordList[i].recordType = 'AAAA记录'
                            } else if(this.recordList[i].recordType == 4){
                                this.recordList[i].recordType = 'PTR记录'
                            } else if(this.recordList[i].recordType == 5){
                                this.recordList[i].recordType = 'CNAME记录'
                            } else if(this.recordList[i].recordType == 6){
                                this.recordList[i].recordType = 'MX记录'
                            } else if(this.recordList[i].recordType == 7){
                                this.recordList[i].recordType = 'TXT记录'
                            }
                            if(this.recordList[i].checkMethod == 'NOCHECK'){
                                this.recordList[i].checkMethod = '无'
                            } else if(this.recordList[i].checkMethod == 'PING'){
                                this.recordList[i].checkMethod = 'Ping'
                            } else if(this.recordList[i].checkMethod == 'TELNET'){
                                this.recordList[i].checkMethod = 'Telnet'
                            }
                        }
                        this.total_record = response.extend.page.totalHits;
                        this.listQuery_record.currentPage = response.extend.page.currentPage;
                    }
                }).catch((e) => {
                    console.log(e)
                });

                this.checkAll_record = false;// 每次加载数据都清空所有复选框
                this.checkedItems_record = [];

            },

            getDomainList(){
                getDomainList(this.listQuery_domain).then(response => {
                    if (response.status == 'SUCCESS'){
                        console.log('response',response.data)
                        for (let i = 0; i < response.data.length; i++){
                            if(response.data[i].id == this.recordId){
                                this.currentData = response.data[i];
                                this.doInit(this.currentData);
                                this.getRecordList();
                                break;
                            }
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            handleClose() {
                this.$emit("onChangeStatus");
            },

            onChangeStatus() {
                this.isEditRecordList = false;
            },

            handleSizeChange(val) {
                this.listQuery_record.pageSize = val;
                this.getRecordList();
            },
            handleCurrentChange(val) {
                this.listQuery_record.currentPage = val;
                this.getRecordList();
            },
            onEdit_record(row){
                this.currentData_record = row;
                this.isEditRecordList = true;
            },

            getListForSelect(){
                getBynameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.bynameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
                this.lineNameList = [];
                getLineNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.lineList = response.data;
                        for (let i = 0; i < response.data.length; i++){
                            this.lineNameList.push(response.data[i]);
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                });
                getPoolListAll().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.poolList = response.data;
                        for (let i = 0; i < response.data.length; i++){
                            this.lineNameList.push(response.data[i]);
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },

            onEditDomain(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.editInfo.parseType == true){
                            this.editInfo.parseType = 1
                        } else if(this.editInfo.parseType == false){
                            this.editInfo.parseType = 2
                        }
                        updateDomain(this.editInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改域名配置成功！'
                                    });
                                    this.editVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs['editInfo'].resetFields();
                                    this.getDomainList();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.code.info
                                    });
                                }
                            }).catch(e => {
                                console.log("修改出错", e);
                            });
                    } else {

                        return false;
                    }
                });
            },

            onAddRecord(formName) {
                this.add_record.recordName = this.addStaRouter[0].recordName;
                this.add_record.ttlSec = this.addStaRouter[0].ttlSec;
                this.add_record.recordType = this.addStaRouter[0].recordType;
                this.add_record.priority = this.addStaRouter[0].priority;
                this.add_record.recordValue = this.addStaRouter[0].recordValue;
                this.add_record.lineId = this.addStaRouter[0].lineId;
                this.add_record.lineIds = this.addStaRouter[0].lineIds;
                if(this.validate()){
                    addRecord(this.add_record).then((resp) => {
                        if (resp.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '新建记录配置成功！'
                            });
                            this.getRecordList();
                            this.addStaRouter = [];
                            this.addStaRouter.push({
                                recordName:'',
                                ttlSec: '',
                                recordType: '',
                                priority: '',
                                recordValue: '',
                                lineId: 0,
                                lineIds:[0]
                            })
                            this.addVisible = false;
                            this.$emit('onChangeStatus');
                            this.$refs['addInfo'].resetFields();
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
            },

            doInit(currentData){
                //域名基本信息
                console.log('currentData',currentData)
                let row = currentData;
                this.add_record.domainId = row.id;
                this.listQuery_record.domainId = row.id;
                this.editInfo.id = row.id;
                this.fullDomainName = row.fullDomainName;
                this.editInfo.parseType = row.parseType;
                this.editInfo.isReverse = row.isReverse;
                this.editInfo.furtherConfig = row.furtherConfig;
                this.editInfo.freshSec = row.freshSec;
                this.editInfo.retrySec = row.retrySec;
                this.editInfo.timeOutSec = row.timeOutSec;
                this.editInfo.minTtlSec = row.minTtlSec;
                this.editInfo.globalTtlSec = row.globalTtlSec;
                this.editInfo.nsRecordType1 = row.nsRecordType1;
                this.editInfo.nsRecordType2 = row.nsRecordType2;
                this.editInfo.transpondServers = row.transpondServers;
                if(row.transpondType != null){
                    this.editInfo.transpondType = row.transpondType.toString();
                }
                if(this.editInfo.parseType == 1){
                    this.editInfo.parseType = true;
                } else if(this.editInfo.parseType == 2){
                    this.editInfo.parseType = false;
                }
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs[formName].resetFields();
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
                        let list = [];
                        list.push(data.id);
                        let fwtimeDto = {
                            ids: list.join(',')
                        }
                            deleteRecord(fwtimeDto).then(response => {
                                if (response.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.getRecordList();
                                } else {
                                    this.$message({
                                        type: 'warning',
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
                }
            },
            onPauseRecord(id, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let Dto = {
                        id: id,
                        isStop:type
                    }
                    if (type == true) {
                        stopRecordAnalyze(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '关闭成功!'
                                });
                                this.getRecordList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        });
                    } else if (type == false) {
                        stopRecordAnalyze(Dto).then(response => {
                            if (response.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '开启成功!'
                                });
                                this.getRecordList();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        });
                    }
                }
            }

        }
    }
</script>
<style>

    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .domain .dialog {
        min-width: 930px;
    }

    .domain .el-dialog__header {
        ping-left: 5px;
    }


    .quickly_form .el_put {
        position: relative;
        width: 60% !important;
        margin-left: 20px;
    }
    .quickly_form .el_put_2 {
        position: relative;
        width: 39% !important;
        margin-left: 5px;
    }
    .quickly_form .el_sel_transmit {
        width: 20% !important;
        margin-left: 20px;
    }

    .quickly_form .el_sel_byname {
        width: 60% !important;
        margin-left: 20px;
    }
    .type_sel {
        width: 100%;
    }
    .quickly_form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 20px;
    }
    .resetLabel .el-form-item__label {
        color: #ffffff;
    }

</style>