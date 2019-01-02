<template>
    <div>
        <section class="content-header content_header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb ol_left" style="left: 12px">
                <!--<li><a><i class="fa fa-user"></i> SSL VPN</a></li>-->
                <li><a>首页</a></li>
            </ol>
        </section>
        <section class="content content_main">
            <div class="row">
                <!--<div class="col-xs-12" style="background:#ECF0F5">-->
                <div class="col-md-12" style="background:#ECF0F5">
                    <div class="box box_home" style="">
                        <div class="top" style="overflow:hidden;">
                            <el-row :gutter="10" style="">
                                <el-col :span="4">
                                    <div class="grid-content left_content">
                                        <img src="../../../../assets/home/line_people.png" alt="" class="left_img">
                                        <div class="left_mid">
                                            <span class="spa_one">{{onlinePerson}}</span><br>
                                            <span class="spa_two">在线人数</span>
                                        </div>

                                        <div class="left_bottom pointer" @click="toOnline">
                                            <span>查看更多</span>
                                            <img src="../../../../assets/home/more.svg" alt="">
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content left_content">
                                        <img src="../../../../assets/home/home_flow.png" alt="" class="left_img">
                                        <div class="left_mid" id="left_mid">
                                            <span class="spa_one roman">{{netSpeed}}</span><br>
                                            <span class="spa_two">网络速率{{speed}}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content left_content">
                                        <img src="../../../../assets/home/device_status.png" alt="" class="left_img">
                                        <div class="left_mid mid_status">
                                            <span>设备状态:已激活</span><br>
                                            <span v-if="Number(dataInfo.cpu)<30&&Number(dataInfo.mem)<30&& Number(dataInfo.hdd)<30">运行状态：优</span>
                                            <span v-else-if="Number(dataInfo.cpu)>70|| Number(dataInfo.mem)>70|| Number(dataInfo.hdd)>70">运行状态：差</span>
                                            <span v-else>运行状态：良</span>
                                            <span style="display: inherit">
                                                <!--运行时间:1天5时36分28秒-->
                                                <el-tooltip placement="top" effect="light">
                                                    <div slot="content"> 运行时间：{{runTime}}</div>
                                                    <div class="list_tooltip">运行时间：{{runTime}}</div>
                                                </el-tooltip>
                                            </span>
                                        </div>

                                        <div class="left_bottom pointer" @click="toSeriaNum">
                                            <span>查看更多</span>
                                            <img src="../../../../assets/home/more.svg" alt="">
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content right_content">
                                        <div class="circle_type">
                                            <el-progress class="cir_demo"  type="circle" :percentage=Number(dataInfo.cpu)
                                                         :stroke-width="10"></el-progress>
                                            <span class="spa">CPU</span>
                                        </div>
                                       <div class="circle_type">
                                           <el-progress class="cir_demo" type="circle" :percentage=Number(dataInfo.mem)
                                                        :stroke-width="10"></el-progress>
                                           <span class="spa">内存</span>
                                       </div>
                                        <div class="circle_type">
                                            <el-progress class="cir_demo" type="circle" :percentage=Number(dataInfo.hdd)
                                                         :stroke-width="10"></el-progress>
                                            <span class="spa">HDD</span>
                                        </div>


                                    </div>
                                </el-col>
                            </el-row >
                        </div>
                        <div class="mid">
                            <el-row :gutter="10">
                                <el-col :span="8">
                                    <div class="grid-content ">
                                        <el-select v-model="userLoginVal" placeholder="" @change="optionChange(userLoginVal,'userLogin')" class="sel_opt">
                                            <el-option v-for="item in userLoginOptions"
                                                       :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <div class="option_right">
                                            <el-button size="mini" type="primary" class="home_btn" @click="thisToday('userLogin')"
                                                       :class="{active:actBtn_userLoginDay}">近日</el-button>
                                            <el-button size="mini" type="primary" class="home_btn" @click="thisMonth('userLogin')"
                                                       :class="{active:actBtn_userLoginMonth}">本月</el-button>
                                            <el-button size="mini" type="primary" class="home_btn" @click="thisYear('userLogin')"
                                                       :class="{active:actBtn_userLoginYear}">今年</el-button>
                                        </div>

                                        <hr class="hr_border">
                                        <p class="p_text">用户登录总量</p>
                                        <p class="p_val roman">{{userLoginPage.totalCount}}</p>
                                        <el-table
                                                :data="userLoginList"
                                                style="width: 100%">
                                            <el-table-column
                                                    prop=""
                                                    tooltip-effect="dark"
                                                    show-overflow-tooltip
                                                    width="">
                                                <template slot-scope="scope">{{ scope.row.topRankingKey}}</template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="topRankingValue"
                                                    tooltip-effect="dark"
                                                    show-overflow-tooltip
                                                    width=""
                                            >
                                            </el-table-column>
                                        </el-table>
                                        <div class="row" style="margin-top:8px;" >
                                            <div class="block" style="margin-right: 2%;float: right" >
                                                <el-pagination
                                                        @size-change="resAccessSize"
                                                        @current-change="userLoginCurpage"
                                                        :current-page="userLoginPage.pageIndex"
                                                        :page-sizes="[5, 10, 20, 30, 40,50]"
                                                        :page-size="5"
                                                        small
                                                        layout="total, prev, pager, next"
                                                        :total="userLoginPage.total">
                                                </el-pagination>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content ">
                                        <el-select v-model="userAccessVal" placeholder="" @change="optionChange(userAccessVal,'userAccess')" class="sel_opt">
                                            <el-option v-for="item in userAccessOptions"
                                                       :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <div class="option_right">
                                            <el-button size="mini" type="primary" class="home_btn" @click="thisToday('userAccess')"
                                                       :class="{active:actBtn_userAccessDay}">近日</el-button>
                                            <el-button size="mini" type="primary" class="home_btn" @click="thisMonth('userAccess')"
                                                       :class="{active:actBtn_userAccessMonth}">本月</el-button>
                                            <el-button size="mini" type="primary" class="home_btn" @click="thisYear('userAccess')"
                                                       :class="{active:actBtn_userAccessYear}">今年</el-button>
                                        </div>

                                        <hr class="hr_border">
                                        <p class="p_text">用户访问总量</p>
                                        <p class="p_val roman" >{{userAccessPage.totalCount}}</p>
                                        <el-table
                                                :data="userAccessList"
                                                style="width: 100%">
                                            <el-table-column
                                                    prop=""
                                                    tooltip-effect="dark"
                                                    show-overflow-tooltip
                                                    width="">
                                                <template slot-scope="scope">{{ scope.row.topRankingKey}}</template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="topRankingValue"
                                                    tooltip-effect="dark"
                                                    show-overflow-tooltip
                                                    width=""
                                            >
                                            </el-table-column>
                                        </el-table>
                                        <div class="row" style="margin-top:8px;" >
                                            <div class="block" style="margin-right: 2%;float: right" >
                                                <!--('resAccess')-->
                                                <el-pagination
                                                        @size-change="resAccessSize"
                                                        @current-change="userAccessCurpage"
                                                        :current-page="userAccessPage.pageIndex"
                                                        :page-sizes="[5, 10, 20, 30, 40,50]"
                                                        :page-size="5"
                                                        small
                                                        layout="total, prev, pager, next"
                                                        :total="userAccessPage.total">
                                                </el-pagination>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="grid-content ">
                                        <el-select v-model="resAccessVal" placeholder="" @change="optionChange(resAccessVal,'resAccess')" class="sel_opt">
                                            <el-option v-for="item in resAccessOptions"
                                                       :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <div class="option_right">
                                            <el-button size="mini" type="primary" class="home_btn" @click="thisToday('resAccess')"
                                                       :class="{active:actBtn_resAccessDay}">近日</el-button>
                                            <el-button size="mini" type="primary" class="home_btn" @click="thisMonth('resAccess')"
                                                       :class="{active:actBtn_resAccessMonth}">本月</el-button>
                                            <el-button size="mini" type="primary" class="home_btn" @click="thisYear('resAccess')"
                                                       :class="{active:actBtn_resAccessYear}">今年</el-button>
                                        </div>

                                        <hr class="hr_border">
                                        <p class="p_text">应用访问总量</p>
                                        <p class="p_val roman" >{{resAccessPage.totalCount}}</p>
                                        <el-table
                                                :data="resAccessList"
                                                style="width: 100%">
                                            <el-table-column
                                                    prop=""
                                                    tooltip-effect="dark"
                                                    show-overflow-tooltip
                                                    width="">
                                                <template slot-scope="scope">{{ scope.row.topRankingKey}}</template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="topRankingValue"
                                                    tooltip-effect="dark"
                                                    show-overflow-tooltip
                                                    width=""
                                            >
                                            </el-table-column>
                                        </el-table>
                                        <div class="row" style="margin-top:8px;" >
                                            <div class="block" style="margin-right: 2%;float: right" >
                                                <el-pagination
                                                        @size-change="resAccessSize"
                                                        @current-change="resAccessCurpage"
                                                        :current-page="resAccessPage.pageIndex"
                                                        :page-sizes="[5, 10, 20, 30, 40,50]"
                                                        :page-size="5"
                                                        small
                                                        layout="total, prev, pager, next"
                                                        :total="resAccessPage.total">
                                                </el-pagination>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="bottom" style="overflow: hidden">
                            <homeFlow height='100%' width='100%'></homeFlow>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    //    import userFlowRank from "./userFlowHomeData"
    import homeFlow from "components/Charts/homeFlow.vue"
    import {getCpu, getMem, getHdd, getback} from "../../../../api/home/homePage";
    import {
        userLoginRank, trafficRank, trafficRank_r, resourceVisitRank, getOnlinePerson, getLoginCount, getLoginFlow,
        getResTotalCount, getAppFlow, getFlowList, getNetspeed, homeTrafficRank, appTrafficTop, loginTopCount,
        getTopRank
    } from "../../../../api/log/logApi";
    import {formatDate, formatDateTime, flowmat, flowmatVal, flowmatVal2} from "../../../../utils/dateUtil";
    import {getRunTime} from "../../../../api/systemSet/sysConfig/seriaNum";

    export default {
        components: {
            homeFlow
        },
        data() {
            return {

                actBtn_userLoginDay: false,
                actBtn_userLoginMonth: true,
                actBtn_userLoginYear: true,
                actBtn_userAccessDay: false,
                actBtn_userAccessMonth: true,
                actBtn_userAccessYear: true,

                actBtn_resAccessDay: false,
                actBtn_resAccessMonth: true,
                actBtn_resAccessYear: true,
                userLoginOptions: [
                    {
                        value: 5,
                        label: '用户登录榜 TOP5'
                    },
                    {
                        value: 10,
                        label: '用户登录榜 TOP10'
                    },
                    {
                        value: 20,
                        label: '用户登录榜 TOP20'
                    },
                    {
                        value: 50,
                        label: '用户登录榜 TOP50'
                    },
                    {
                        value: 100,
                        label: '用户登录榜 TOP100'
                    },
                ],
                userAccessOptions: [
                    {
                        value: 5,
                        label: '用户访问榜 TOP5'
                    },
                    {
                        value: 10,
                        label: '用户访问榜 TOP10'
                    },
                    {
                        value: 20,
                        label: '用户访问榜 TOP20'
                    },
                    {
                        value: 50,
                        label: '用户访问榜 TOP50'
                    },
                    {
                        value: 100,
                        label: '用户访问榜 TOP100'
                    },
                ],
                resAccessOptions: [
                 {
                    value: 5,
                    label: '应用访问榜 TOP5'
                }, {
                    value: 10,
                    label: '应用访问榜 TOP10'
                },{
                    value: 20,
                    label: '应用访问榜 TOP20'
                },{
                    value: 50,
                    label: '应用访问榜 TOP50'
                },{
                        value: 100,
                        label: '应用访问榜 TOP100'
                    },],
                userLoginVal: 5,
                userAccessVal: 5,
                resAccessVal:5,
                
                dataInfo: {
                    cpu: '',
                    mem: '',
                    hdd: ''
                },
                timeCondition: {
                    "type": "DATE",
                    "conditionName": "date",
                    "gteValue": "",
                    "lteValue": "",
                    'userName': ""
                },
                dateRange: [],
                barData: [],
                barName: [],
//                *****************
                userlist: [],
                userFlowInteger: [],
                userFlowyAxis: [],
                userFlowlist: [],
                data: [],
                barName2: [],//有边的
                data2: [],
                runTime: null,//运行时间
                status: '优',
//                ********************
                onlinePerson: null,
                totalLogin: null,
                resCount: 0,
                userFlow: null,
                flowSize: null,//流量单位
                userFlow_r: null,
                flowSize_r: null,//流量单位
                flowList: null,
                netSpeed: null,
                speed: null,//速度单位
                count_flow: true,
                visited: true,
                params: '',
                /*=====test*/
                tableData: [],
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0,
                    // searchContent:null
                },
                userLoginList:[],
                userAccessList:[],
                resAccessList:[],
                userLoginPage:{
                    pageIndex:1,
                    pageSize:5,
                    total:0,
                    totalCount:0,
                    countTopic: "user-login",
                    countType: "day",
                    cycle: formatDateTime(new Date((new Date()).setDate((new Date()).getDate()-1))),
                    // cycle: formatDateTime(new Date(),true),//ture 表示不含日，false含日
                },
                userAccessPage:{
                    pageIndex:1,
                    pageSize:5,
                    total:0,
                    totalCount:0,
                    countTopic: "user-access",
                    countType: "day",
                    cycle: formatDateTime(new Date((new Date()).setDate((new Date()).getDate()-1))),
                    // cycle: formatDateTime(new Date(),true),//ture 表示不含日，false含日
                },
                resAccessPage:{
                    pageIndex:1,
                    pageSize:5,
                    total:0,
                    totalCount:0,
                    countTopic: "res-access",
                    countType: "day",
                    cycle: formatDateTime(new Date((new Date()).setDate((new Date()).getDate()-1))),//ture 表示不含日(y-m)，false含日y-m-d

                },
            }
        },
        computed: {},
        created() {
            this.getCpu();
            this.getMem();
            this.getHdd();
            this.getRunTime();
            this.getList();
            // this.getuserData();
            this.getUserLoginList();
            this.getUserAccessList();
            this.getResAccessList();
        },
        mounted() {
            this.getStatus();
            // var date = new Date();//获取当前时间
            // date.setDate(date.getDate()-1);//设置天数 -1 天
            // console.log('设置天数',(new Date()).setDate((new Date()).getDate()-1))
        },
        filters: {
            format_test(val) {
                return flowmatVal(val)
            }
        },
        methods: {
            resAccessSize(val) {

            },
            userLoginCurpage(val) {
                this.userLoginPage.pageIndex= val;
                this.getUserLoginList();
            },
            userAccessCurpage(val) {
                this.userAccessPage.pageIndex= val;
                this.getUserAccessList();
            },
            resAccessCurpage(val) {
                this.resAccessPage.pageIndex= val;
                this.getResAccessList();
            },
            /*=================*/
            toOnline() {
                this.$router.push({path: '/admin/onlineUsers'});//跳转到在线人数
            },
            toSeriaNum() {
                this.$router.push({path: '/admin/seriaNum'});
            },
            getStatus() {
                if (Number(this.dataInfo.cpu) && Number(this.dataInfo.mem) && Number(this.dataInfo.hdd) < 30) {
                    this.status = '优'
                } else if (Number(this.dataInfo.cpu) || Number(this.dataInfo.mem) || Number(this.dataInfo.hdd) > 70) {
                    this.status = '差'
                } else {
                    this.status = '良'
                }
            },
            getList() {
                getOnlinePerson().then(resp => {
                    if (resp.status == 'SUCCESS') {
                        this.onlinePerson = resp.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
                getNetspeed().then(resp => {
                    if (resp.status == 'SUCCESS') {
                        let dat = resp.data.netUsage;
                        if (dat.lastIndexOf('Kbps') != -1) {
                            this.netSpeed = dat.substring(0, dat.lastIndexOf('Kbps'));
                            this.speed = dat.substring(dat.lastIndexOf('Kbps'))
                        } else {
                            this.netSpeed = dat.substring(0, dat.lastIndexOf('Mbps'));
                            this.speed = dat.substring(dat.lastIndexOf('Mbps'))
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            getUserLoginList(){
                console.log('userLoginVal',this.userLoginVal);
                getTopRank(this.userLoginPage,this.userLoginVal).then(resp => {
                    if (resp.code == '200') {
                        this.userLoginList=resp.data.list;
                        this.userLoginPage.total=resp.data.total;
                        this.userLoginPage.totalCount=resp.data.totalCount;
                    }else {
                        this.$message({
                            type: 'warning',
                            message: resp.data.message
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
           getUserAccessList(){
               getTopRank(this.userAccessPage,this.userAccessVal).then(resp => {
                   if (resp.code == '200') {
                       this.userAccessList=resp.data.list;
                       this.userAccessPage.total=resp.data.total;
                       this.userAccessPage.totalCount=resp.data.totalCount;
                   }else {
                       this.$message({
                           type: 'warning',
                           message: resp.data.message
                       });
                   }
               }).catch((e) => {
                   console.log(e)
               });
           },
           getResAccessList(){
                getTopRank(this.resAccessPage,this.resAccessVal).then(resp => {
                    if (resp.code == '200') {
                        this.resAccessList=resp.data.list;
                        this.resAccessPage.total=resp.data.total;
                        this.resAccessPage.totalCount=resp.data.totalCount;
                    }else {
                        this.$message({
                            type: 'warning',
                            message: resp.data.message
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            getRunTime() {
                getRunTime().then(response => {
                    if (response.status == 'SUCCESS') {
                        this.runTime = response.data.runTime;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            thisToday(param) {
                /**********************颜色变化*/
                if(param=='userLogin'){
                    this.actBtn_userLoginDay = false;
                    this.actBtn_userLoginMonth = true;
                    this.actBtn_userLoginYear = true;
                    this.userLoginPage.countType='day';
                    this.userLoginPage.cycle=formatDateTime(new Date((new Date()).setDate((new Date()).getDate()-1)));
                    this.getUserLoginList();
                }else if(param=='userAccess'){
                    this.actBtn_userAccessDay = false;
                    this.actBtn_userAccessMonth = true;
                    this.actBtn_userAccessYear = true;
                    this.userAccessPage.countType='day';
                    this.userAccessPage.cycle=formatDateTime(new Date((new Date()).setDate((new Date()).getDate()-1)));
                    this.getUserAccessList();
                }else {
                    this.actBtn_resAccessDay = false;
                    this.actBtn_resAccessMonth = true;
                    this.actBtn_resAccessYear = true;
                    this.resAccessPage.countType='day';
                    this.resAccessPage.cycle=formatDateTime(new Date((new Date()).setDate((new Date()).getDate()-1)));
                    this.getResAccessList();
                }
            },
            thisMonth(param) {
                console.log('param',param,param=='userLogin')
                if(param=='userLogin'){
                    this.actBtn_userLoginDay = true;
                    this.actBtn_userLoginMonth = false;
                    this.actBtn_userLoginYear = true;
                    this.userLoginPage.countType='month';
                    this.userLoginPage.cycle=formatDateTime(new Date((new Date()).setDate((new Date()).getDate()-1)),true);
                    this.getUserLoginList();
                    console.log('param2',this.actBtn_userLoginMonth)
                }else if(param=='userAccess'){
                    this.actBtn_userAccessDay = true;
                    this.actBtn_userAccessMonth = false;
                    this.actBtn_userAccessYear = true;
                    this.userAccessPage.countType='month';
                    this.userAccessPage.cycle=formatDateTime(new Date((new Date()).setDate((new Date()).getDate()-1)),true);
                    this.getUserAccessList();
                }else {
                    this.actBtn_resAccessDay = true;
                    this.actBtn_resAccessMonth = false;
                    this.actBtn_resAccessYear = true;
                    this.resAccessPage.countType='month';
                    this.resAccessPage.cycle=formatDateTime(new Date((new Date()).setDate((new Date()).getDate()-1)),true);
                    this.getResAccessList();
                }
            },
            thisYear(param) {
                if(param=='userLogin'){
                    this.actBtn_userLoginDay = true;
                    this.actBtn_userLoginMonth = true;
                    this.actBtn_userLoginYear = false;
                    this.userLoginPage.countType='year';
                    // this.userLoginPage.cycle=formatDateTime(new Date(),true);
                    this.userLoginPage.cycle=(new Date((new Date()).setDate((new Date()).getDate()-1))).getFullYear();
                    this.getUserLoginList();
                }else if(param=='userAccess'){
                    this.actBtn_userAccessDay = true;
                    this.actBtn_userAccessMonth = true;
                    this.actBtn_userAccessYear = false;
                    this.userAccessPage.countType='year';
                    this.userAccessPage.cycle=(new Date((new Date()).setDate((new Date()).getDate()-1))).getFullYear();
                    this.getUserAccessList();
                }else {
                    this.actBtn_resAccessDay = true;
                    this.actBtn_resAccessMonth = true;
                    this.actBtn_resAccessYear = false;
                    this.resAccessPage.countType='year';
                    this.resAccessPage.cycle=(new Date((new Date()).setDate((new Date()).getDate()-1))).getFullYear();
                    this.getResAccessList();
                }
            },
            optionChange(val,type) {
                // console.log('type',val,type)
                if(type=='userLogin'){
                    // console.log('val======',val,this.userLoginVal)
                    this.userLoginVal=val;
                    this.getUserLoginList();
                }else if(type=='userAccess'){
                    this.getUserAccessList();
                }else {
                    this.getResAccessList();
                }
            },
            getCpu() {
                getCpu().then(response => {
                    if (response.status == 'SUCCESS') {
                        this.dataInfo.cpu = response.data.cpu;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            getMem() {
                getMem().then(response => {
                    if (response.status == 'SUCCESS') {
                        this.dataInfo.mem = response.data.mem;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            getHdd() {
                getHdd().then(response => {
                    if (response.status == 'SUCCESS') {
                        this.dataInfo.hdd = response.data.hdd;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            }
        }
    };
</script>
<style>
    .roman {
        /*罗马字体*/
        font-family: 'Times New Roman';
        /*color: #3c3c3c;*/
        /*font-size: 30px*/
    }

    .p_1 .el-select input {
        border: none !important;
    }

    /*控制圆形高度*/
    .li_4 .div_1 .cir_demo .el-progress-circle {
        width: 118px !important;
    }

    .li_4 .div_1 .cir_demo .el-progress__text {
        font-family: 'Times New Roman';
    }

    .cir_demo svg > path {
        /*stroke: red;*/
        /*color: #000;*/
    }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            margin: 0;
        }
    }
    .home_btn {
        box-shadow: 2px 2px 2px rgba(0, 4, 0, 0.2);
        -moz-box-shadow:2px 2px 2px rgba(0, 4, 0, 0.2);
        -webkit-box-shadow:2px 2px 2px rgba(0, 0, 0, 0.2);
    }

    /*.content {*/
    .box {
        background-color: #ECF0F5;
        /*min-width:1232px;*/
        border: none;
    }

    /*}*/
</style>

<style rel="stylesheet/scss" lang="scss">
    @media (min-width: 1401px) and (max-width: 1845px) {
        .content {
            .box {
                /*.top {
                    #ul_left {
                        height: 135px;
                        background: #ECF0F5;
                        width: 50%;
                        li {
                            float: left;
                            background-color: #fff;
                            !*margin-right: 1%;*!
                            height: 137px;
                            box-shadow: 0 0 12px lightgrey;
                            -moz-box-shadow: 0 0 12px lightgrey;
                            -webkit-box-shadow: 0 0 12px lightgrey;
                        }
                        .li_1 {
                            min-width: 168px;
                            position: relative;
                            display: inline-block;
                            width: 30%;
                            line-height: 83px;
                            padding: 7px;
                            !*margin-right:10px;*!
                            img {
                                margin-top: -14px;
                                width: 36px;
                            }
                            .p1 {
                                display: inline-block;
                                padding-left: 10px;
                                span:nth-of-type(1) {
                                    position: absolute;
                                    top: -2px;
                                    font-size: 21px;
                                    display: inline-block;
                                    width: 73px
                                }
                                span:nth-of-type(2) {
                                    position: relative;
                                    top: 13px;
                                    color: #9a9a9a;
                                    font-size: 12px;
                                }
                            }
                            .p2 {
                                position: absolute;
                                right: 4px;
                                bottom: 45px;
                                height: 0;
                                cursor: pointer;
                                color: #9a9a9a;
                                font-size: 12px;
                                .img_1 {
                                    width: 15px;
                                    margin-top: -2px;
                                    margin-left: 3px;
                                }
                            }
                        }
                        .li_2 {
                            min-width: 175px;
                            position: relative;
                            display: inline-block;
                            width: 30%;
                            line-height: 83px;
                            padding: 10px;
                            !*margin-right:10px;*!
                            img {
                                margin-top: -14px;
                                width: 36px;
                            }
                            .p1 {
                                display: inline-block;
                                padding-left: 22px;
                                span:nth-of-type(1) {
                                    position: absolute;
                                    top: 1px;
                                    left: 72px;
                                    font-size: 21px;
                                }
                                span:nth-of-type(2) {
                                    position: relative;
                                    top: 15px;
                                    !*left:0;*!
                                    color: #9a9a9a;
                                    font-size: 12px;
                                }
                            }
                            .p2 {
                                position: absolute;
                                right: 4px;
                                bottom: 4px;
                                height: 42px;
                                color: #9a9a9a;
                                font-size: 12px;
                                .img_1 {
                                    width: 15px;
                                    margin-top: -2px;
                                    margin-left: 7px;
                                }
                            }
                        }
                        .li_3 {
                            min-width: 199px;
                            position: relative;
                            display: inline-block;
                            width: 38%;
                            height: 137px;
                            line-height: 83px;
                            padding: 10px;
                            !*margin-right:10px;*!
                            img {
                                margin-top: -14px;
                                width: 36px;
                            }
                            .p1 {
                                display: inline-block;
                                padding-left: 22px;
                                font-size: 12px;

                                .sp_1 {
                                    position: relative;
                                    top: -98px;
                                    left: 33px;
                                }
                                .sp_2 {
                                    position: relative;
                                    top: -80px;
                                    left: -53px;
                                }
                                .sp_3 {
                                    position: relative;
                                    top: -145px;
                                    left: 33px;
                                    display: inline-block;
                                    min-width: 100px;
                                }
                            }
                            .p2 {
                                position: absolute;
                                right: 4px;
                                bottom: 45px;
                                height: 0;
                                cursor: pointer;
                                color: #9a9a9a;
                                font-size: 12px;
                                .img_1 {
                                    width: 15px;
                                    margin-top: -2px;
                                    margin-left: 7px;
                                }
                            }
                        }
                    }
                    #ul_right {
                        .li_4 {
                            height: 137px;
                            float: right;
                            margin: 0;
                            !*width:40%;*!
                            !*width: calc(46% - 67px);*!
                            padding-top: 9px;
                            text-align: center;
                            div {
                                display: inline-block;
                                text-align: center;
                            }
                            .div_1 {
                                display: inline-block;
                                width: 30%;
                                .sp_1 {
                                    position: relative;
                                    top: -67px;
                                    left: -82px;
                                }
                                .sp_2 {
                                    position: relative;
                                    top: -67px;
                                    left: -82px;
                                }
                                .sp_3 {
                                    position: relative;
                                    top: -67px;
                                    left: -82px;
                                }
                            }
                        }
                    }
                }*/
                .mid {
                    margin-top: 20px;
                    background: #ECF0F5;
                    overflow: hidden;
                    width: 100%;
                    .mid_left {
                        box-shadow: 0 0 12px lightgrey;
                        -moz-box-shadow: 0 0 12px lightgrey;
                        -webkit-box-shadow: 0 0 12px lightgrey;
                        background: #fff;
                        float: left;
                        height: 440px;
                        width: 49%;
                        padding: 20px;
                        .p_1 {
                            border-bottom: 1px solid lightgrey;
                            padding-bottom: 10px;
                        }
                        .p_2 {
                            font-size: 12px;
                            text-align: center;
                            margin: 0;
                            .sp_1 {
                                position: relative;
                                margin-left: 9px;

                            }
                            .sp_2 {
                                position: relative;
                                left: 19px
                            }
                        }
                        .p_3 {
                            position: relative;
                            text-align: center;
                            span {
                                font-size: 30px;
                            }
                            .sp_1 {
                                color: dodgerblue;
                                display: inline-block;
                                width: 56px;
                                position: relative;
                            }
                            .sp_2 {
                                color: green;
                                display: inline-block;
                                width: 90px;
                            }
                            .sp_3 {
                                position: absolute;
                                right: 0;
                                .el-button {
                                    background: #5ba2e4;
                                    padding: 5px 6px;
                                    font-size: 12px;
                                }
                                .active {
                                    background: #fff !important;
                                    color: #5ba2e4 !important;
                                }
                            }
                        }
                        .tab {
                            width: 100%;
                            tr {
                                border-bottom: 1px solid lightgrey;
                                height: 40px;
                                line-height: 40px;
                            }
                            tr:last-child {
                                border: none;
                            }
                            th {
                                text-align: center;
                            }
                            td {
                                text-align: center;
                            }
                            .th_left {
                                float: left;
                            }
                            .th_right {
                                float: right;
                            }
                            .td_left {
                                float: left;
                                width: 20%;
                            }
                            .td_right {
                                float: right;
                                width: 31%;
                            }

                        }
                    }
                    .mid_right {

                        box-shadow: 0 0 12px lightgrey;
                        -moz-box-shadow: 0 0 12px lightgrey;
                        -webkit-box-shadow: 0 0 12px lightgrey;
                        background: #fff;
                        float: right;
                        height: 450px;
                        width: 50%;
                        padding: 20px;
                        .p_1 {
                            border-bottom: 1px solid lightgrey;
                            padding-bottom: 10px;
                        }
                        .p_2 {
                            font-size: 14px;
                            text-align: center;
                            margin: 0;
                            .sp_1 {
                                position: relative;
                                margin-left: 0;
                                font-size: 12px;

                            }
                            .sp_2 {
                                position: relative;
                                left: 19px;
                                font-size: 12px;
                            }
                        }
                        .p_3 {
                            position: relative;
                            text-align: center;
                            span {
                                font-size: 30px;
                            }
                            .sp_1 {
                                color: dodgerblue;
                                display: inline-block;
                                width: 88px;
                                position: relative;
                                font-size: 21px;
                            }
                            .sp_2 {
                                color: green;
                                display: inline-block;
                                width: 90px;
                                font-size: 21px;
                            }
                            .sp_3 {
                                position: absolute;
                                right: 0;
                                .el-button {
                                    background: #5ba2e4;
                                    padding: 5px 6px;
                                    font-size: 12px;

                                }
                                .active {
                                    background: #fff;
                                    color: #5ba2e4;
                                }
                            }
                        }
                        .p_4 {
                            text-align: center;
                            border-bottom: 1px solid lightgrey;
                            height: 40px;
                            line-height: 40px;
                            margin: 0;
                            .sp_1 {
                                float: left;
                            }
                        }
                        .div_1 {
                            line-height: 30px;
                            padding: 13px 0;
                            /*border-bottom: 1px solid lightgrey;*/
                            .el-progress {
                                margin-left: 110px;
                                .el-progress-bar__outer {
                                    border-radius: 0 !important;
                                    .el-progress-bar__inner {
                                        border-radius: 0 !important;
                                    }
                                }
                            }
                            .sp_1 {
                                float: left;
                                margin-right: 10px;
                                line-height: 14px;
                                position: absolute;
                            }
                            .sp_tooltip {
                                width: 100px;
                                display: inline-block;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }

                }
            }
        }
    }

    @media screen and (max-width: 1400px) {
        .box {
            .top {
                #ul_left {
                    height: 135px;
                    background: #ECF0F5;
                    width: 50%;
                    li {
                        float: left;
                        background-color: #fff;
                        /*margin-right: 1%;*/
                        height: 137px;
                        box-shadow: 0 0 12px lightgrey;
                        -moz-box-shadow: 0 0 12px lightgrey;
                        -webkit-box-shadow: 0 0 12px lightgrey;
                    }
                    .li_1 {
                        min-width: 168px;
                        position: relative;
                        display: inline-block;
                        width: 30%;
                        line-height: 83px;
                        padding: 7px;
                        /*margin-right:10px;*/
                        img {
                            margin-top: -14px;
                            width: 36px;
                        }
                        .p1 {
                            display: inline-block;
                            padding-left: 10px;
                            span:nth-of-type(1) {
                                position: absolute;
                                top: -2px;
                                font-size: 21px;
                                display: inline-block;
                                width: 73px
                            }
                            span:nth-of-type(2) {
                                position: relative;
                                top: 13px;
                                color: #9a9a9a;
                                font-size: 12px;
                            }
                        }
                        .p2 {
                            position: absolute;
                            right: 4px;
                            bottom: 45px;
                            height: 0;
                            cursor: pointer;
                            color: #9a9a9a;
                            font-size: 12px;
                            .img_1 {
                                width: 15px;
                                margin-top: -2px;
                                margin-left: 3px;
                            }
                        }
                    }
                    .li_2 {
                        min-width: 175px;
                        position: relative;
                        display: inline-block;
                        width: 30%;
                        line-height: 83px;
                        padding: 10px;
                        /*margin-right:10px;*/
                        img {
                            margin-top: -14px;
                            width: 36px;
                        }
                        .p1 {
                            display: inline-block;
                            padding-left: 22px;
                            span:nth-of-type(1) {
                                position: absolute;
                                top: 1px;
                                left: 72px;
                                font-size: 21px;
                            }
                            span:nth-of-type(2) {
                                position: relative;
                                top: 15px;
                                /*left:0;*/
                                color: #9a9a9a;
                                font-size: 12px;
                            }
                        }
                        .p2 {
                            position: absolute;
                            right: 4px;
                            bottom: 4px;
                            height: 42px;
                            color: #9a9a9a;
                            font-size: 12px;
                            .img_1 {
                                width: 15px;
                                margin-top: -2px;
                                margin-left: 7px;
                            }
                        }
                    }
                    .li_3 {
                        min-width: 199px;
                        position: relative;
                        display: inline-block;
                        width: 36%;
                        height: 137px;
                        line-height: 83px;
                        padding: 10px;
                        /*margin-right:10px;*/
                        img {
                            margin-top: -14px;
                            width: 36px;
                        }
                        .p1 {
                            display: inline-block;
                            padding-left: 22px;
                            font-size: 12px;

                            .sp_1 {
                                position: relative;
                                top: -98px;
                                left: 33px;
                            }
                            .sp_2 {
                                position: relative;
                                top: -80px;
                                left: -66px;
                            }
                            .sp_3 {
                                position: relative;
                                top: -145px;
                                left: 33px;
                                display: inline-block;
                                min-width: 100px;
                                margin-left: -40px;
                                .list_tooltip {
                                    width: 100px;
                                    display: inline-block;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }
                        .p2 {
                            position: absolute;
                            right: 4px;
                            bottom: 45px;
                            height: 0;
                            cursor: pointer;
                            color: #9a9a9a;
                            font-size: 12px;
                            .img_1 {
                                width: 15px;
                                margin-top: -2px;
                                margin-left: 7px;
                            }
                        }
                    }
                }
            }
            .mid {
                margin-top: 10px;
                background: #ECF0F5;
                overflow: hidden;
                width: 100%;
                .mid_left {
                    box-shadow: 0 0 12px lightgrey;
                    -moz-box-shadow: 0 0 12px lightgrey;
                    -webkit-box-shadow: 0 0 12px lightgrey;
                    background: #fff;
                    float: left;
                    height: 450px;
                    width: 49%;
                    padding: 20px;
                    .p_1 {
                        border-bottom: 1px solid lightgrey;
                        padding-bottom: 10px;
                    }
                    .p_2 {
                        font-size: 12px;
                        text-align: center;
                        margin: 0;
                        .sp_1 {
                            position: relative;
                            margin-left: 9px;

                        }
                        .sp_2 {
                            position: relative;
                            left: 19px
                        }
                    }
                    .p_3 {
                        position: relative;
                        text-align: center;
                        span {
                            font-size: 30px;
                        }
                        .sp_1 {
                            color: dodgerblue;
                            display: inline-block;
                            width: 56px;
                            position: relative;
                        }
                        .sp_2 {
                            color: green;
                            display: inline-block;
                            width: 90px;
                        }
                        .sp_3 {
                            position: absolute;
                            right: 0;
                            .el-button {
                                background: #5ba2e4;
                                padding: 5px 6px;
                                font-size: 12px;
                            }
                            .active {
                                background: #fff;
                                color: #5ba2e4;
                            }
                        }
                    }
                    .tab {
                        width: 100%;
                        tr {
                            border-bottom: 1px solid lightgrey;
                            height: 40px;
                            line-height: 40px;
                        }
                        tr:last-child {
                            border: none;
                        }
                        th {
                            text-align: center;
                        }
                        td {
                            text-align: center;
                        }
                        .th_left {
                            float: left;
                        }
                        .th_right {
                            float: right;
                        }
                        .td_left {
                            float: left;
                            width: 20%;
                        }
                        .td_right {
                            float: right;
                            width: 31%;
                        }
                    }
                }
                .mid_right {
                    box-shadow: 0 0 12px lightgrey;
                    -moz-box-shadow: 0 0 12px lightgrey;
                    -webkit-box-shadow: 0 0 12px lightgrey;
                    background: #fff;
                    float: right;
                    height: 450px;
                    width: 50%;
                    padding: 20px;
                    .p_1 {
                        border-bottom: 1px solid lightgrey;
                        padding-bottom: 10px;
                    }
                    .p_2 {
                        font-size: 14px;
                        text-align: center;
                        margin: 0;
                        .sp_1 {
                            position: relative;
                            margin-left: 0;

                        }
                        .sp_2 {
                            position: relative;
                            left: 19px
                        }
                    }
                    .p_3 {
                        position: relative;
                        text-align: center;
                        span {
                            font-size: 30px;
                        }
                        .sp_1 {
                            color: dodgerblue;
                            display: inline-block;
                            width: 88px;
                            position: relative;
                            font-size: 12px;
                        }
                        .sp_2 {
                            color: green;
                            display: inline-block;
                            width: 90px;
                            font-size: 12px;
                        }
                        .sp_3 {
                            position: absolute;
                            right: 0;
                            .el-button {
                                background: #5ba2e4;
                                padding: 5px 6px;
                                font-size: 12px;

                            }
                            .active {
                                background: #fff;
                                color: #5ba2e4;
                            }
                        }
                    }
                    .p_4 {
                        text-align: center;
                        border-bottom: 1px solid lightgrey;
                        height: 40px;
                        line-height: 40px;
                        margin: 0;
                        .sp_1 {
                            float: left;
                        }
                    }
                    .div_1 {
                        line-height: 30px;
                        padding: 13px 0;
                        /*border-bottom: 1px solid lightgrey;*/
                        .el-progress {
                            margin-left: 110px;
                            .el-progress-bar__outer {
                                border-radius: 0 !important;
                                .el-progress-bar__inner {
                                    border-radius: 0 !important;
                                }
                            }
                        }
                        .sp_1 {
                            float: left;
                            margin-right: 10px;
                            line-height: 14px;
                            position: absolute;
                        }
                        .sp_tooltip {
                            width: 100px;
                            display: inline-block;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }

            }
        }
    }
</style>
<style lang="scss">
   /*new css*/
    .top{
        .el-row{

            /*margin-top: 160px;*/

            .grid-content {
                box-shadow: 0 2px 4px rgba(0,0,0,0.08);
                -moz-box-shadow: 0 2px 4px rgba(0,0,0,0.08);
                -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.08);
                background: #fff;
                min-height: 50px;
                height: 138px;
                padding: 7px;
            }
            .left_content{
                position: relative;
                overflow: hidden;
                padding: 43px 5px;
                .left_img{
                    float: left;
                    /*width: 35px;*/
                }
                .left_mid{
                    float: left;
                    padding-left: 11px;
                    margin-top: -4px;
                    span{
                        font-size: 12px;
                    }
                    span.spa_one{
                        font-size: 27px;
                        /*font-weight: bold;*/
                        color: #3c3c3c;
                        font-family: 'Times New Roman';

                    }
                    span.spa_two{
                        font-size: 13px;
                        color: #9a9a9a;
                    }

                }
                div.mid_status{
                    margin-top: 0;
                }
                .left_bottom{
                    position: absolute;
                    bottom: 7px;
                    right: 5px;
                    font-size: 12px;
                    color: #9a9a9a;
                    span{
                        vertical-align: middle;
                    }
                    img{
                        vertical-align: middle;
                        width: 15px;
                    }
                }
            }
            .right_content{
                .circle_type{
                    display: inline-block;
                    text-align: center;
                    width: 32.5%;
                    position: relative;
                    span.spa{
                        position: absolute;
                        transform: translate(-50%,-145%);
                        -ms-transform:translate(-50%,-145%);
                        -webkit-transform:translate(-50%,-145%);
                        -moz-transform:translate(-50%,-145%);
                        left: 50%;
                        top: 50%;
                    }

                }
            }

        }
    }
    .mid{
        margin-top: 10px;
        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
            .el-col {
                /*border-radius: 4px;*/
            }
            .grid-content {
                box-shadow: 0 2px 4px rgba(0,0,0,0.08);
                -moz-box-shadow: 0 2px 4px rgba(0,0,0,0.08);
                -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.08);
                border-radius: 4px;
                min-height: 36px;
                height: 451px;
                background-color: #fff;
                padding: 13px;
                .hr_border{
                    margin-top: 10px;
                    margin-bottom: 10px;
                }

                .sel_opt{
                    max-width: 150px;
                    padding: 5px;
                    input{
                        border: none;
                        padding-left: 0;
                        background: transparent;
                    }
                    .el-input__inner{
                        font-size: 12px;
                    }
                }
                .option_right{
                    float: right;
                    line-height: 4;
                    margin-right: 7px;
                    button.el-button:first-child{
                        margin-left: 0;
                    }
                    button.el-button + button.el-button{
                        margin-left: 7px;
                    }
                    .active {
                        background: #fff !important;
                        color: #5ba2e4 !important;
                    }
                    .el-button--primary{
                        padding: 6px 16px;

                    }
                    .el-button--mini{
                        background: #5ba2e4;
                    }
                }
                .el-table__header-wrapper{
                    display: none;
                }
                .el-table__row td:last-child{
                    text-align: right;
                }
                .p_text{
                   /*font-weight: bold;*/
                    font-size: 16px;
                    margin-bottom: 0;
                    margin-left: 4px;
                }
                .p_val{
                    font-size: 28px;
                    color: #8fca68;
                    /*font-weight: bold;*/
                    margin-left: 4px;
                }
            }

        }
    }
    .bottom {
        box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        -moz-box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        width: 100%;
        background: #fff;
        margin-top: 10px;
        padding-top: 10px;
    }
    @media screen and (max-width: 1659px){
        /*.top .el-row .left_content .left_mid span.spa_one*/
            .top{
                .left_img{
                    width: 35px;
                }
                .left_mid{
                    span.spa_one{
                        font-size: 22px !important;
                    }
                }
            }
    }
    @media screen and (max-width: 1583px){
        .top{
            .el-row{
                .left_mid{
                    span:nth-of-type(3) .list_tooltip{
                        width: 117px;
                        display: inline-block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
        .mid{
            .el-row{
                .el-pagination span:not([class*=suffix]){
                    min-width: 28px !important;
                }
                .el-pagination__total{
                    margin-right: 0 !important;
                }
                .grid-content  .option_right{
                    margin-right:0;
                    .el-button--primary{
                        padding: 6px 5px !important;
                        margin-left: 26px;
                        span{
                            font-size: 14px!important;
                        }
                    }
                }
            }
        }
    }
</style>

