<template>

    <div>
        <div class="content-header">
            <h1>
                <!--系统配置-->
                <small>
                    <!--序列号管理-->
                </small>
            </h1>
            <ol class="breadcrumb " style="left:12px">
                <li><a ><i class="fa fa-gears"></i>系统管理</a></li>
                <li><a >系统设置</a></li>
                <li class="active">序列号管理</li>
            </ol>
        </div>
        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">序列号管理</h3>
                            <!--硬件信息-->
                        </div>
                        <div class="box-body padding_table table_content" style="">
                           <p style="font-size: 16px; margin-bottom: 20px;">硬件信息</p>
                            <div class="row" style="border-bottom: 1px solid lightgrey;">
                                <div class="con_yj_infos" style="margin-left: 44px;margin-bottom: 44px;">
                                    <table border="1" width="100%;">
                                        <tr>
                                            <td class="con_td01" width="190px" id="t_name">名称</td>
                                            <td class="con_td02" id="c_name">{{currentInfo.companyName}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_yj_id">硬件ID</td>
                                            <td class="con_td02" id="c_yj_id">{{currentInfo.hardwareId}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_start_time">授权开始日期</td>
                                            <td class="con_td02" id="c_start_time">{{currentInfo.notBefore}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_end_time">授权结束日期</td>
                                            <td class="con_td02" id="c_end_time">{{currentInfo.notAfter}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_pc_bf_num">PC并发连接数</td>
                                            <td class="con_td02" id="c_pc_bf_num">{{currentInfo.pcConnectNum}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_yd_bf_num">终端并发连接数</td>
                                            <td class="con_td02" id="c_yd_bf_num">{{currentInfo.smartTerminalNum}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_runtime">运行时间</td>
                                            <td class="con_td02" id="c_runtime">{{runTime}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                           <p style="margin: 30px 0;font-size: 16px">模块序列号</p>
                            <div class="row">
                                <div class="">
                                    <el-row>
                                        <el-col :span="16">
                                            <ul border="0" v-if="false" style="margin-left: 40px" class="bottom_ul">
                                                <li class="tr">
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Main==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">主序列号</span>
                                                    <el-input  v-model="MainlicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activeMain" class="primary confirm">{{moduleStatus.Main ? '重新激活' : '激活'}}</el-button>
                                                </li>
                                                <li >
                                                    <!--<td >-->
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Pc==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">PC端模块</span>
                                                    <el-input  v-model="PcLicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activePc" class="primary confirm">{{moduleStatus.Pc ? '重新激活' : '激活'}}</el-button>
                                                    <!--</td>-->
                                                </li>
                                                <li >
                                                    <!--<td >-->
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Mobile==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">移动端模块</span>
                                                    <el-input  v-model="MobileLicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activeMobile" class="primary confirm">{{moduleStatus.Mobile ? '重新激活' : '激活'}}</el-button>
                                                    <!--</td>-->
                                                </li>
                                                <li >
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Charg==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">计费模块</span>
                                                    <el-input  v-model="ChargLicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activeCharg" class="primary confirm">{{moduleStatus.Charg ? '重新激活' : '激活'}}</el-button>
                                                </li>
                                                <li >
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Enwas==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">Enwas模块</span>
                                                    <el-input  v-model="EnwasLicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activeEnwas" class="primary confirm">{{moduleStatus.Enwas ? '重新激活' : '激活'}}</el-button>
                                                </li>
                                                <li >
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Enssl==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">Enssl模块</span>
                                                    <el-input  v-model="EnsslLicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activeEnssl" class="primary confirm">{{moduleStatus.Enssl ? '重新激活' : '激活'}}</el-button>
                                                </li>
                                                <!--<li >-->
                                                <li >
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Ens2s==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">Ens2s模块</span>
                                                    <el-input  v-model="Ens2sLicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activeEns2s" class="primary confirm">{{moduleStatus.Ens2s ? '重新激活' : '激活'}}</el-button>
                                                </li>
                                                <li >
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Ipsec==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">Ipsec模块</span>
                                                    <el-input  v-model="IpsecLicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activeIpsec" class="primary confirm">{{moduleStatus.Ipsec ? '重新激活' : '激活'}}</el-button>
                                                </li>
                                                <li >
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Dns==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">智能DNS模块</span>
                                                    <el-input  v-model="DnsLicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activeDns" class="primary confirm">{{moduleStatus.Dns ? '重新激活' : '激活'}}</el-button>
                                                </li>
                                                <li >
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Firewall==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">防火墙模块</span>
                                                    <el-input  v-model="FirewallLicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activeFirewall" class="primary confirm">{{moduleStatus.Firewall ? '重新激活' : '激活'}}</el-button>
                                                </li>
                                                <li >
                                                    <span class="sp_green sp_crile " v-if="moduleStatus.Log==true"></span>
                                                    <span class="sp_red sp_crile " v-else></span>
                                                    <span class="sp_text">日志模块</span>
                                                    <el-input  v-model="LogLicenseQuery.sysLicense" style="width: 45%;"></el-input>
                                                    <el-button type="primary" @click="activeLog" class="primary confirm">{{moduleStatus.Log ? '重新激活' : '激活'}}</el-button>
                                                </li>
                                            </ul>
                                            <div style="margin-left: 45px;"  v-if="true">
                                                <span>激活序列号 &nbsp;</span>
                                                <el-input  style="width: 65%; margin: 0 15px 0 8px;" v-model="publicenseQuery.sysLicense"></el-input>&nbsp;
                                                <el-button type="primary" @click="activePub" class="primary">{{moduleStatus.All ? '重新激活' : '激活'}}</el-button>
                                                <div class="div_rank">
                                                    <ul class="ul_rank">
                                                        <li>
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Main==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">主序列号</span>
                                                        </li>
                                                        <li >
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Pc==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">PC端模块</span>
                                                        </li>
                                                        <li >
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Mobile==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">移动端模块</span>
                                                        </li>
                                                        <li>
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Charg==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">计费模块</span>
                                                        </li>
                                                        <li>
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Enwas==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">Enwas模块</span>
                                                        </li>
                                                        <li>
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Enssl==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">Enssl模块</span>
                                                        </li>
                                                        <li v-if="false">
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Ens2s==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">Ens2s模块</span>
                                                        </li>

                                                        <li v-if="false">
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Ipsec==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">Ipsec模块</span>
                                                        </li>
                                                        <li v-if="false">
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Dns==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">智能DNS模块</span>
                                                        </li>
                                                        <li>
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Firewall==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">防火墙模块</span>
                                                        </li>
                                                        <li>
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Log==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">日志模块</span>
                                                        </li>
                                                        <li v-if="false">
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Haproxy==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">负载均衡</span>
                                                        </li>
                                                        <li>
                                                            <span class="sp_green sp_crile " v-if="moduleStatus.Terminal==true"></span>
                                                            <span class="sp_red sp_crile " v-else></span>
                                                            <span class="sp_text">Web终端</span>
                                                        </li>
                                                        <!--Haproxy-->
                                                    </ul>
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="tips_content">
                                                <p>
                                                    <span class="sp_green sp_crile"></span>
                                                    已激活
                                                </p>
                                                <p>
                                                    <span class="sp_red sp_crile"></span>
                                                    未激活
                                                </p>
                                                <p style="margin-top: 30px;">说明:</p>
                                                <p style="margin-top: 20px;">激活主序列号后，才能激活模块序列号</p>
                                                <p style="margin-top: 20px;">模块序列号的有效期与主序列号保持一致</p>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--down model  -->
        </div>

    </div>
</template>

<script>

    import {getHardWareID, getLicInfo, getModuleStatus, updateLicense, getRunTime} from "../../../../../api/systemSet/sysConfig/seriaNum";
    import store from "../../../../../store/index";
    import permissionRoutes from 'store/permission';
    import {isReadonly} from "../../../../../utils/permissionUtil";
    export default {
        components: {},
        data() {
            return{
                pageId:8,
                readOnly:false,
                moduleStatus:{},
                publicenseQuery: {
                    sysModule: 'All',
                    sysLicense: ''
                },
                MainlicenseQuery: {
                    sysModule: 'Main',
                    sysLicense: ''
                },
                SSLlicenseQuery:{
                    sysModule:'SSL',
                    sysLicense:''
                },
                PcLicenseQuery:{
                    sysModule:'Pc',
                    sysLicense:''
                },
                MobileLicenseQuery:{
                    sysModule:'Mobile',
                    sysLicense:''
                },
                EnsslLicenseQuery:{
                    sysModule:'Enssl',
                    sysLicense:''
                },
                EnwasLicenseQuery:{
                    sysModule:'Enwas',
                    sysLicense:''
                },
                ChargLicenseQuery:{
                    sysModule:'Charg',
                    sysLicense:''
                },
                LogLicenseQuery:{
                    sysModule:'Log',
                    sysLicense:''
                },
                Ens2sLicenseQuery:{
                    sysModule:'Ens2s',
                    sysLicense:''
                },

                IpsecLicenseQuery:{
                    sysModule:'Ipsec',
                    sysLicense:''
                },
                DnsLicenseQuery:{
                    sysModule:'Dns',
                    sysLicense:''
                },
                FirewallLicenseQuery:{
                    sysModule:'Firewall',
                    sysLicense:''
                },
                /**/
                HaproxyLicenseQuery:{
                    sysModule:'Haproxy',
                    sysLicense:''
                },
                TerminalLicenseQuery:{
                    sysModule:'Terminal',
                    sysLicense:''
                },

                currentInfo: {
                    companyName:'',
                    hardwareId:'',
                    notBefore:'',
                    notAfter:'',
                    pcConnectNum:'',
                    smartTerminalNum:''
                },
                runTime:''
            }
        },

        created() {
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly111:', this.readOnly);
           this.getLicInfo();
           this.getHardWareID();
           this.getRunTime();

           this.getStatus()
        },
        methods: {
            getRunTime(){
                getRunTime().then(response=>{
                    if (response.status == 'SUCCESS'){
                        this.runTime = response.data.runTime;
                    }
                }).catch((e) =>{
                    console.log(e)
                });
            },
            getHardWareID()
            {
                getHardWareID().then(response=>{
                    if(response.status == 'SUCCESS'){
                        const data=response.extend;
                        this.currentInfo.hardwareId =data.HWID
                    }
                }).catch((e) =>{
                    console.log(e)
                    });
            },
            getLicInfo()
            {
                var module = 'All'
                getLicInfo(module).then(response=>{
                    if (response.status == 'SUCCESS'){
                        const data=response.data;
                        console.log("序列号返回数据：",data)
                        if(data!= null)
                        {
                            this.currentInfo=data;
                            let startDate = new Date(data.notBefore)
                            let endDate = new Date(data.notAfter)

                            this.currentInfo.notBefore = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + (startDate.getDate())
                            this.currentInfo.notAfter = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + (endDate.getDate())
                            console.log(startDate,startDate,'startDate',this.currentInfo.notBefore,this.currentInfo.notAfter )
                        }

                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            activePub(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.publicenseQuery.sysLicense = this.publicenseQuery.sysLicense.replace(/\s+/g, "");
                    this.publicenseQuery.sysModule='All';
                    updateLicense(this.publicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活主序列号成功！'
                            });
                            this.$store.dispatch('approveLicense', 'All');
                            this.getLicInfo();
                            this.getStatus();
                        }
                        else {
//                        this.$message({
//                            type:'warning',
//                            message:'激活主序列号失败!'
//                        });
                            this.$store.dispatch('approveLicense', 'All');
                            this.getLicInfo();
                            this.getStatus();

                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activeMain() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.MainlicenseQuery.sysLicense = this.MainlicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.MainlicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活主序列号成功！'
                            });
                            this.$store.dispatch('approveLicense', 'Main');
                            this.getLicInfo();
                            this.getStatus();
                        }
                        else {
//                        this.$message({
//                            type:'warning',
//                            message:'激活主序列号失败!'
//                        });
                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activeSSL() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.SSLLicenseQuery.sysLicense = this.SSLLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.SSLLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活SSL序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'SSL');
                            this.getStatus();
                        } else {
//                        this.$message({
//                            type:'warning',
//                            message:'请先激活主序列号!'
//                        });
                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activePc() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.PcLicenseQuery.sysLicense = this.PcLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.PcLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活Pc序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'Pc');
                            this.getStatus()
                        } else {
//
                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activeMobile() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.MobileLicenseQuery.sysLicense = this.MobileLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.MobileLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活Mobile序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'Mobile');
                            this.getStatus()
                        } else {
//
                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activeEnssl() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.EnsslLicenseQuery.sysLicense = this.EnsslLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.EnsslLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活Enssl序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'Enssl');
                            this.getStatus()
                        } else {
//
                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activeEnwas() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.EnwasLicenseQuery.sysLicense = this.EnwasLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.EnwasLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活Enwas序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'Enwas');
                            this.getStatus()
                        } else {
//
                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activeCharg() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.ChargLicenseQuery.sysLicense = this.ChargLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.ChargLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活Charg序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'Charg');
                            this.getStatus()
                        } else {

                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activeLog() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.LogLicenseQuery.sysLicense = this.LogLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.LogLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活Log序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'Log');
                            this.getStatus()
                        } else {

                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activeEns2s() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.Ens2sLicenseQuery.sysLicense = this.Ens2sLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.Ens2sLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活Ens2s序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'Ens2s');
                            this.getStatus()
                        } else {

                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
//           ***********************
            activeIpsec() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.IpsecLicenseQuery.sysLicense = this.IpsecLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.IpsecLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活Ipsec序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'Ipsec');
                            this.getStatus()
                        } else {

                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activeDns() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.DnsLicenseQuery.sysLicense = this.DnsLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.DnsLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活DNS序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'Dns');
                            this.getStatus()
                        } else {

                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },
            activeFirewall() {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.FirewallLicenseQuery.sysLicense = this.FirewallLicenseQuery.sysLicense.replace(/\s+/g, "")
                    updateLicense(this.FirewallLicenseQuery).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '激活防火墙序列号成功!'
                            });
                            this.$store.dispatch('approveLicense', 'Firewall');
                            this.getStatus()
                        } else {

                        }
                    }).catch((e) => {
                        console.log(e)
                    });
                }
            },

            getStatus(){
                getModuleStatus().then(response => {

                    if (response.status == 'SUCCESS') {
                        this.$store.dispatch('approveLicense', 'Main', response.data.Main);
                        this.$store.dispatch('approveLicense', 'SSL', response.data.SSL);
                        console.log('SSL:', store.getters.SSL)
                        console.log('Main:', store.getters.Main)

                        this.$store.dispatch('checkLicense');
                        this.moduleStatus=response.data;
                        console.log(response,'response',this.moduleStatus)

                    }
                }).catch((e) => {
                    console.log(e)
                });
            }
        }
    }
</script>
<style scoped lang="scss">
    ul{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .bottom_ul li{
        height: 70px;
    }
    /*.sp_crile{*/
        /*width: 24px;*/
        /*height: 24px;*/
        /*display: inline-block;*/
        /*vertical-align: middle;*/
        /*border-radius: 50%;*/
        /*margin-right: 15px;*/
    /*}*/
    .sp_red{
        background: red;
        background: url('../../../../../assets/addIcon/serial_disabled.png');
        width: 28px;
        height: 28px;
        display: inline-block;
        vertical-align: middle;
    }
    .sp_green{
        background: green;
        background: url('../../../../../assets/addIcon/serial_enabled.png');
        width: 28px;
        height: 28px;
        display: inline-block;
        vertical-align: middle;
    }

    .sp_text{
        margin-right: 15px;
        display: inline-block;
        width: 100px;
    }
    .btn_save{
        /*margin-left: 15px;*/
        /*width: 150px;*/
    }
    /****************************/

    .con_yj_infos{
        line-height: 35px;
        padding-top: 9px;
    }
    .con_yj_infos02{
        /* line-height: 18px; */
        padding-top: 15px;
    }
    .con_yj_infos02 td{
        height: 34px;
    }

    .con_td01{
        padding-left: 63px;
        width: 23%;
    }
    .con_td02{
        /* padding-left: 155px; */
        width: 50%;
    }
    .con_yj_tb img{
        width:168px;
        border:0;

    }
    .con_yj_tb>span{
        position: absolute;
        /* top: 4px; */
        left:41px;
        color: #fff;
        font-size: 23px;

    }
    .con_yj_infos02 input{
        /*background-color: #eff0f3;*/
        border: 1px solid #dcdcdc;
        height: 28px;
        width: 100%;
    }
    
    table{
        border: 1px solid #e1e7E8;
        color: #73778c;
        font-size: 14px;
        table-layout:fixed;
    }
    table > tr .con_td01:nth-of-type(2n+1){
        /*background-color: #eef1f6;*/
        text-align: center;
        padding-left: 0;
        border-left: 0;
        width: 190px;
        height: 60px;
    }

    table > tr .con_td02:nth-of-type(2n){
        text-align: center;
        height: 60px;
    }

    table > tr:nth-of-type(2n+1) .con_td01 {
        background-color: #eef1f6;
    }

    .box-body.padding_table{
        padding-left: 80px;
        padding-right: 80px;
    }
    .box-body.padding_table .row{
        padding-left: 0px;
        padding-right: 0px;
    }
    .tips_content {
        padding: 20px 30px;
        margin-top: -10px;
        font-size: 14px;
        color: #666a80
    }

    .box-body{
        padding: 30px;
    }

</style>
<style lang="scss">
    .div_rank{
        margin-left: 90px;
        .ul_rank{
            overflow: hidden;
            li{
                float: left;
                width: 29%;
                line-height: 50px;
            }
        }
    }
</style>
