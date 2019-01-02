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
                <li class="active">时间与同步</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">时间与同步</h3>
                            <div class="box-tools pull-right">

                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 21px !important">
                            <div class="row">
                                <div class="time_box" style="padding: 30px">
                                    <div class="time_form">
                                        <el-form
                                                :model="timeForm"
                                                :rules="rules"
                                                ref="timeForm"
                                                label-width="142px"
                                                label-position="right"
                                                class="demo-ruleForm">
                                            <el-form-item label="服务器时区" prop="timeVal">
                                                    <el-select v-model="timeVal" :disabled="available()" class="el_sel" style="width:100%;min-width: 516px">
                                                        <el-option
                                                                v-for="item in options"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                            </el-form-item>
                                            <el-form-item label="服务器时间" prop="format" class="item_content">

                                                    <el-input v-model="timeForm.format" :disabled="true" class="el_put" style="min-width: 318px;margin-right: 20px"></el-input>

                                                    <el-button type="primary" class="primary" @click="update()" style="width: 175px;">获取并同步本地时间
                                                    </el-button>

                                            </el-form-item>

                                            <el-form-item label="NTP时间同步"  class="item_content">
                                                    <el-checkbox :disabled="available()" v-model="ntpChecked" @change="NTPchange">自动与时间服务同步</el-checkbox>
                                            </el-form-item>
                                            <el-form-item label="时间服务器" prop="ntpServer" class="item_content">
                                                    <el-select v-model="ntpServer"class="el_sel" :disabled="available1()" style="margin-left: 0 !important;min-width: 300px">

                                                        <el-option
                                                                v-for="item in items"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                <el-button type="primary" size="small" @click="nowNtpSync()" style="vertical-align: middle;padding: 10px 9px;" :disabled="!ntpChecked" v-if="false">立即同步
                                                </el-button>
                                                    <span v-if="lastTime==''?false:true" style="padding-left:20px">最后一次同步时间成功，在{{lastTime}}</span>
                                            </el-form-item>
                                        </el-form>
                                        <div class='form-footer ' slot="footer">
                                            <div style="margin-top: 20px;margin-left: 134px;">
                                                        <el-button
                                                                @click="cancle()"
                                                                class="plain cancle"
                                                                style="margin-left: 8px;">
                                                            取消
                                                        </el-button>
                                                        <el-button
                                                                class="primary confirm"
                                                                type="primary"
                                                                @click="save">
                                                            确定
                                                        </el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="public">
                                        <el-dialog
                                                title="提示"
                                                :visible.sync="dialogVisible"
                                                size="tiny"
                                        >
                                            <div  class="dialog_tip">
                                                <p  class="p1"><img src="../../../../../assets/addIcon/warning.png" alt=""></p>
                                                <h3><b>该操作需要执行重启！</b></h3>
                                                <!--<p>取消：不保存任何数据。</p><br>-->
                                                <p class="p2"><b>手动重启：保存数据；不重启相关服务,可能导致不能读取管理员日志。</b></p>
                                                <p class="p2"> <b>确定：保存数据 ，立即重启相关服务。</b></p>
                                            </div>
                                            <span slot="footer" class="dialog-footer">
                                                <div class="foot">
                                                    <el-button class="primary cancle btn_middle" @click="cancle" v-if="false">取 消</el-button>
                                                    <el-button type="primary" class="primary confirm btn_middle" @click="confirmNtpSyncPause()">手动重启</el-button>
                                                    <el-button type="primary" class="primary confirm btn_middle" @click="confirmNtpSync()">确 定</el-button>
                                                </div>
                                            </span>
                                        </el-dialog>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import {getServerTime, updateTime,nowSyncTime,syncTime,onlyGetNowtime} from '../../../../../api/systemSet/sysConfig/timeSync'
    import{forTimeVal} from '../../../../../utils/dateUtil'
    //    forTime
    export default {
        components: {},
        data() {
            return {
                pageId:140,
                readOnly:false,
                rules: {},
                zaf:'time.nist.gov',
                dialogVisible:false,
                lastTime:null,
                ntpChecked: null,
                isShow:true,
                restartNow:false,
                options: [{
                    value: 'Pacific/Midway',
                    label: 'GMT-11:00 中途岛'
                }, {
                    value: 'US/Hawaii',
                    label: 'GMT-10:00 夏威夷'
                }, {
                    value: 'US/Alaska',
                    label: 'GMT-09:00 阿拉斯加'
                }, {
                    value: 'America/Whitehorse',
                    label: 'GMT-08:00 太平洋时间（美国和加拿大）'
                }, {
                    value: 'America/Dawson_Creek',
                    label: 'GMT-07:00 山地时间（美国和加拿大)'
                }, {
                    value: 'America/Winnipeg',
                    label: 'GMT-06:00 中美洲，墨西哥，中部时间（美国和加拿大)'
                }, {
                    value: 'America/Iqaluit',
                    label: 'GMT-05:00 东部时间（美国和加拿大)'
                }, {
                    value: 'America/Glace_Bay',
                    label: 'GMT-04:00 圣地亚哥，大西洋时间（美国和加拿大)'
                }, {
                    value: 'America/Buenos_Aires',
                    label: 'GMT-03:00 巴西利亚，布宜诺斯艾利斯，格陵兰'
                }, {
                    value: 'Atlantic/South_Georgia',
                    label: 'GMT-02:00 南乔治亚岛'
                }, {
                    value: 'Atlantic/Cape_Verde',
                    label: 'GMT-01:00 福得角群岛'
                }, {
                    value: 'Europe/London',
                    label: 'GMT-00:00 格林威治标准时间'
                }, {
                    value: 'Europe/Paris',
                    label: 'GMT+01:00 阿姆斯特丹，柏林，罗马，斯德哥尔摩，巴黎，马德里，中非西部'
                }, {
                    value: 'Europe/Athens',
                    label: 'GMT+02:00 开罗，基辅，安曼，雅典，伊斯坦布尔，耶路撒冷'
                }, {
                    value: 'Europe/Moscow',
                    label: 'GMT+03:00 巴格达，科威特，莫斯科'
                }, {
                    value: 'Asia/Muscat',
                    label: 'GMT+04:00 阿布扎比，马斯喀特'
                }, {
                    value: 'Asia/Karachi',
                    label: 'GMT+05:00 伊斯兰堡，卡拉奇'
                }, {
                    value: 'Asia/Thimphu',
                    label: 'GMT+06:00 孟加拉，西伯利亚，不丹'
                }, {
                    value: 'Asia/Bangkok',
                    label: 'GMT+07:00 曼谷，河内，雅加达'
                }, {
                    value: 'Asia/Shanghai',
                    label: 'GMT+08:00 北京，重庆，香港，乌鲁木齐，新加坡，台北'
                }, {
                    value: 'Asia/Tokyo',
                    label: 'GMT+09:00 大阪，东京，汉城'
                }, {
                    value: 'Australia/Lindeman',
                    label: 'GMT+10:00 关岛，昆士兰，悉尼'
                }, {
                    value: 'Pacific/Guadalcanal',
                    label: 'GMT+11:00 所罗门群岛'
                }, {
                    value: 'Pacific/Funafuti',
                    label: 'GMT+12:00 斐济，图瓦卢，惠灵顿'
                }],
                timeVal: 'Asia/Shanghai',
                items: [{
                    value: 'time.nist.gov',
                    label: 'time.nist.gov'
                },{
                    value: 'time-nw.nist.gov',
                    label: 'time-nw.nist.gov'
                },{
                    value: 'time-a.nist.gov',
                    label: 'time-a.nist.gov'
                },{
                    value: 'time-b.nist.gov',
                    label: 'time-b.nist.gov'
                },{
                    value: 'asia.pool.ntp.org',
                    label: 'asia.pool.ntp.org'
                }],
                ntpServer:'time.nist.gov',
                timeForm: {
                    format: 'yyyy-MM-dd HH:mm:ss',
                    usertime: '',
                    timezone: '',
//                    ntpServer:'time.nist.gov',//时间服务器
                    ntpstate:'Y',//状态Y/N

                }

            }
        },
        computed: {},
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly222:', this.readOnly);
            this.getList()
            console.log(this.timeVal,'timeVal===',this.ntpServer)
        },
        methods: {
            save(){
                if(this.ntpChecked==true){
                    if(this.ntpServer==''||this.ntpServer==null){
                        this.$message({
                            type: 'warning',
                            message: '本地时间同步不能为空！'
                        })
                    }else {
                        this.dialogVisible=true;
                    }
                }else {
                    this.dialogVisible=true;
                }

            },
            available(){
                return this.readOnly;
            },
            available1(){
                if(this.readOnly == true){
                    return true
                } else {
                    return !this.ntpChecked
                }
            },
            NTPchange(){
                if(this.ntpChecked){
//                    this.isShow=false;
                    this.timeForm.ntpstate='Y';
                    console.log(this.ntpChecked)
                }else{
//                    this.isShow=true;
                    this.timeForm.ntpstate='N';
                }
            },
            getList(){
                let timeOffset=null;
                this.timeForm.format='yyyy-MM-dd HH:mm:ss';//每次都以刷新或点击获取本地时间 重新传递参数格式
                getServerTime({format: this.timeForm.format}).then((resp)=> {

                    this.timeForm.format = resp.data.nowtime;
                    console.log(resp, 'getServerTime111',this.timeForm);
                    timeOffset=resp.data.timezoneRawOffset;
                    if(timeOffset==-12){
                        this.timeVal='Pacific/Wallis'
                    }else if(timeOffset==-11){
                        this.timeVal='Pacific/Midway'
                    }else if(timeOffset==-10){
                        this.timeVal='US/Hawaii'
                    }else if(timeOffset==-9){
                        this.timeVal='US/Alaska'
                    }else if(timeOffset==-8){
                        this.timeVal='America/Whitehorse'
                    }else if(timeOffset==-7){
                        this.timeVal='America/Dawson_Creek'
                    }else if(timeOffset==-6){
                        this.timeVal='America/Winnipeg'
                    }else if(timeOffset==-5){
                        this.timeVal='America/Iqaluit'
                    }else if(timeOffset==-4){
                        this.timeVal='America/Glace_Bay'
                    }else if(timeOffset==-3){
                        this.timeVal='America/Buenos_Aires'
                    }else if(timeOffset==-2){
                        this.timeVal='Atlantic/South_Georgia'
                    }else if(timeOffset==-1){
                        this.timeVal='Atlantic/Cape_Verde'
                    }else if(timeOffset==0){
                        this.timeVal='Europe/London'
                    }else if(timeOffset==1){
                        this.timeVal='Europe/Paris'
                    }else if(timeOffset==2){
                        this.timeVal='Europe/Athens'
                    }else if(timeOffset==3){
                        this.timeVal='Europe/Moscow'
                    }else if(timeOffset==4){
                        this.timeVal='Asia/Muscat'
                    }else if(timeOffset==5){
                        this.timeVal='Asia/Karachi'
                    }else if(timeOffset==6){
                        this.timeVal='Asia/Thimphu'
                    }else if(timeOffset==7){
                        this.timeVal='Asia/Bangkok'
                    }else if(timeOffset==8){
                        this.timeVal='Asia/Shanghai'
                    }else if(timeOffset==9){
                        this.timeVal='Asia/Tokyo'
                    }else if(timeOffset==10){
                        this.timeVal='Australia/Lindeman'
                    }else if(timeOffset==11){
                        this.timeVal='Pacific/Guadalcanal'
                    }else if(timeOffset==12){
                        this.timeVal='Pacific/Funafuti'
                    }else {
                        return;
                    }
                    this.ntpServer= resp.data.ntpServer;
                    this.lastTime=resp.data.timelog;
//                    this.lastTime=forTimeVal(new Date(resp.data.timelog));
//                    console.log(this.lastTime,forTimeVal(this.lastTime),'lastTime2233');
                    if(resp.data.ntpstate=='Y'){
                        this.ntpChecked=true;
                    }else {
                        this.ntpChecked=false
                    }
                    console.log(resp.data.timezoneid,resp.data.nowtime,'zaf')
                }).catch(err=> {

                });
            },
            onlyUpdateNowtime(){
//                this.timeForm.format='yyyy-MM-dd HH:mm:ss';//每次都以刷新或点击获取本地时间 重新传递参数格式
                onlyGetNowtime({format: 'yyyy-MM-dd HH:mm:ss'}).then((resp)=> {

                    this.timeForm.format = resp.data.nowtime;
                    console.log(resp, 'getServerTime111',this.timeForm);

                }).catch(err=> {

                });
            },
            update(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    let y = new Date().getFullYear();
                    let M = new Date().getMonth() + 1;
                    let d = new Date().getDate();
                    let h = new Date().getHours();
                    let m = new Date().getMinutes();
                    let s = new Date().getSeconds();
                    this.timeForm.usertime = y + ':' + M + ':' + d + ':' + h + ':' + m + ':' + s;
                    console.log(this.timeForm.format,'update-update11',this.timeVal)
                    updateTime({usertime: this.timeForm.usertime}).then((resp)=> {
                        if (resp.status == 'SUCCESS'){
                            this.$message({
                                type: 'success',
                                message: '获取并同步本地时间成功!'
                            });
                            this.onlyUpdateNowtime();
                        }
                    }).catch(err=> {

                    });
                }
            },
            nowNtpSync(){
                console.log(this.ntpServer,this.timeForm.ntpstate)
                nowSyncTime({ntpServer: this.ntpServer}).then((resp)=> {
                    if (resp.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '立即同步成功!'
                        });
                        this.getList();
                    }
                }).catch(err=> {

                });
            },
            confirmNtpSyncPause(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    console.log(this.ntpServer, this.timeForm.ntpstate)
                    syncTime({
                        ntpServer: this.ntpServer,
                        ntpstate: this.timeForm.ntpstate,
                        timezone: this.timeVal,
                        restartNow:false
                    }).then((resp) => {
                        if (resp.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '时间同步成功!'
                            });
                            this.getList();
                            this.dialogVisible=false
                        }
                    }).catch(err => {

                    });
                }
            },
            confirmNtpSync(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    console.log(this.ntpServer, this.timeForm.ntpstate)
                    syncTime({
                        ntpServer: this.ntpServer,
                        ntpstate: this.timeForm.ntpstate,
                        timezone: this.timeVal,
                        restartNow:true
                    }).then((resp) => {
                        if (resp.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '时间同步成功!'
                            });
                            this.getList();
                            this.dialogVisible=false
                        }
                    }).catch(err => {

                    });
                }
            },
            cancle(){//取消
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.getList();
                    this.dialogVisible=false;
//                this.ntpChecked=false;
                }
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            /*padding: 0;*/
            margin: 0;
        }
    }

    .time_box {
        margin: 0 20px;
        /*background: #f5f5f5;*/
        .time_ul {
            padding: 30px;
            border: 1px solid lightgrey;
            li {
                border-bottom: 1px solid lightgrey;
                margin-top: 20px;
                div {
                    margin-bottom: 15px;
                    span {
                        font-size: 16px;
                        margin-right: 20px;
                        width: 100px;
                        display: inline-block;
                    }

                }
            }
        }

    }
</style>
<style>

    .time_form .el-scrollbar .el-select-dropdown__list{
        padding:6px 10px !important ;
    }
    .time_form .el_put {
        position: relative;
        display: inline-block;
        width: 22% !important;
        vertical-align: middle;
    }
    .reset_item_margin .el-input,
    .reset_item_margin .el-checkbox{
        margin-left: 20px;
    }

    .time_form .el_sel {
        width: 22% !important;
        vertical-align: middle;
    }
</style>
<style rel="stylesheet/scss" lang="scss" >
    .dialog_tip{
        margin-left: 130px;
        h3{
            font-size: 20px;
            padding: 0;
            margin: 0;
            margin-bottom: 20px;
        }
        .p1{
            margin-left: -60px;
            float:left;
            width: 36px;
            height: 36px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .p2{
            font-size: 14px;
        }
    }
</style>
<style scoped>
    .time_form .el-select-dropdown__list{
        padding:6px 10px !important;
    }
</style>