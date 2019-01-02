<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-user"></i> 日志中心</a></li>
                <li><a >日志管理</a></li>
                <li class="active">日志设置</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">

            <div class="row" >
                <div class="col-md-12" >
                    <div class="box" style=";padding-left: 16px">
                        <div class="box-header" style="height:82px">
                            <h3 class="box-title" id="user_set_box_title"
                                style="margin-left:30px;float:left;font-size:18px;color: #4A4D4F;">
                                日志设置
                            </h3>
                        </div>
                        <!--<div class="box-header"-->
                             <!--style="background-color:#eeeeee;height:62px;box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);">-->
                            <!--<div class='title' style="">日志设置规则</div>-->
                        <!--</div>-->
                        <!-- /.box-header -->
                        <div class="box-body" style="">

                            <div class="row" style="margin-bottom:8px;">

                                <!-----------------------------------------展示配置---------------------------------------------->
                                <div class="logForm" v-if="config">
                                    <div style="float:left;margin-left: 40px; width: 100%">
                                        <div class="config-item">
                                            <label>
                                                <strong>*</strong>写入第三方服务器
                                                <span class="log-config" style="margin-left: 60px">
                                                    <span v-if="setting.writeIn3rdDataBase">开启</span>
                                                    <span v-else="">关闭</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div class="config-item">
                                            <label>
                                                <strong>*</strong>日志保留类型
                                                <span v-if="setting.type=='COUNT'">
                                                    <span  style="margin-left: 88px">保留数量</span>
                                                </span>
                                                <span v-else>
                                                    <span  style="margin-left: 88px">保留时间</span>
                                                </span>

                                            </label>
                                        </div>


                                        <div class="config-item"  v-if="setting.type=='COUNT'">
                                            <label>
                                                <strong>*</strong>日志保留总数
                                                <span class="log-config">
                                                    <span style="margin-left: 27px">{{setting.value}}</span>
                                                    <span>条</span>
                                                </span>
                                            </label>
                                        </div>


                                        <div class="config-item" v-else>
                                            <label>
                                                <strong>*</strong>日志保留截止日期
                                                <span class="log-config">
                                                    <!--<span style="margin-left: 0px">截止</span>-->
                                                    <span >{{setting.value}}</span>
                                                </span>
                                            </label>
                                        </div>




                                    </div>
                                </div>

                                <!------------------------------------------------------------------------------------------>


                                <!---------------------------------------------编辑配置-------------------------------------->
                                <div class="logForm" v-else="config">
                                    <div style="float:left;margin-left: 40px;width: 100%">
                                        <div>
                                            <label>
                                                <strong>*</strong>写入第三方服务器
                                                <span class="log-config" style="margin-left: 30px">
                                                    <el-radio-group v-model="writeIn3rdDataBase">
                                                        <el-radio class="radio"
                                                                  :label="1">
                                                            开启
                                                        </el-radio>
                                                        <el-radio class="radio"
                                                                  :label="2"
                                                                  style="margin-left: 82px"
                                                        >
                                                            关闭
                                                        </el-radio>
                                                    </el-radio-group>
                                                </span>
                                            </label>
                                        </div>

                                        <div>
                                            <label>
                                                <strong>*</strong>日志保留类型
                                                <span class="log-config">
                                                    <el-radio-group v-model="type">
                                                        <el-radio class="radio"
                                                                  :label="1">
                                                            保留时间
                                                        </el-radio>
                                                        <el-radio class="radio"
                                                                  :label="2"
                                                                  style="margin-left: 52px">
                                                            保留数量
                                                        </el-radio>
                                                    </el-radio-group>
                                                </span>
                                            </label>
                                        </div>

                                        <div v-if="unit">
                                            <label>
                                                <strong>*</strong>日志保留时间
                                                <span class="log-config">
                                                  <!--<input v-model="setting.num" style="width: 216px;height: 32px;"/>-->
                                                    <!--<span style="margin-left: 8px">天</span>-->
                                                      <el-date-picker
                                                              v-model="date"
                                                              type="date"
                                                              placeholder="选择日期">
                                                    </el-date-picker>
                                                </span>
                                            </label>
                                        </div>

                                        <div v-else>
                                            <label>
                                                <strong>*</strong>日志保留总数
                                                <span class="log-config">
                                                    <input v-model="setting.value" style="width: 216px;height: 32px;"/>
                                                    <span style="margin-left: 8px">条</span>
                                                </span>
                                            </label>
                                        </div>


                                    </div>
                                </div>
                                <!------------------------------------------------------------------------------------------------->


                            </div>
                            <!--*********************************echart****************-->
                            <div class="row" style="height: 400px;width:88%;margin-left: 0px;">
                                <!--<lineChart height='100%'-->
                                           <!--width='95%'-->
                                           <!--:data="data"-->
                                           <!--:xAxis="xAxis"-->
                                           <!--title="近30天系统日志累计折线图"-->
                                           <!--tipName="系统日志累计"-->
                                           <!--unit="条"/>-->
                                <linesEchart height='100%' width='100%' style="background: #fff"></linesEchart>
                            </div>

                            <!----------------------------确认启动编辑按钮-------------------------------->
                            <div class='form-footer'
                                 slot="footer"
                                 style="height:50px;float: left;margin-left: 28px;margin-bottom: 20px"
                                 v-if="config">
                                <div class='footer-btn' style="">
                                    <el-button
                                            type="primary"
                                            style="background-color: #D5905D;border: #D5905D;height:40px;width:100px"
                                            @click="config=false;"
                                    >
                                        编辑
                                    </el-button>
                                </div>
                            </div>
                            <!----------------------------确认启动编辑按钮-------------------------------->

                            <!--------------------------------提交编辑配置表单的按钮------------------------>
                            <div class='form-footer'
                                 slot="footer"
                                 style="height:50px;float: left;margin-left: 18px;margin-bottom: 20px"
                                 v-else="">
                                <div class='footer-btn' style="">
                                    <el-button
                                            type="primary"
                                            style=""
                                            @click="modifySetting()"
                                    >
                                        确定
                                    </el-button>
                                    <el-button style="margin-right: 30px!important;background-color: #D3D3D3"
                                               @click="config=true;">
                                        取消
                                    </el-button>
                                </div>
                            </div>
                            <!--------------------------------------------------------------------->

                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>

    import {codeMessage} from "../../../utils/codes";
    import {deepCopy} from "../../../utils/ObjectCopy";
    import {notifyFault} from "../../../utils/notify";

    import lineChart from 'components/Charts/lineChart';
    import pieChart from 'components/Charts/pieChart';
    import {formatDateTime, totalDays} from "../../../utils/dateUtil";
    import {getLogSetting, recentMonthStatics, resetSetting} from "../../../api/log/logApi";
    // import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
    import linesEchart from 'components/Charts/linesEchart'

    export default{
        components: {
            // ElButton,
            lineChart,pieChart,
            linesEchart//
        },
        data(){
            return {
                config:true,
                xAxis:[],
                data:[],
                unit:true,
                checked:false,
                checkedId: [],
                writeIn3rdDataBase:1,
                date:'',
                type:1,
                setting:{
                    value: 100,
                    writeIn3rdDataBase: true,
                    type: "DATE"
                }
            }
        },
        computed:{

        },
        created(){
            this.initLogSetting();
            this.lastThirtyDaysData();
        },
        watch: {//深度 watcher
            'type':'typeChange',
            'writeIn3rdDataBase':'writeIn3rdDataBaseChange',
            'date':'dateChange'

        },
        methods: {

            dateChange(){
                if(this.date!=null&&this.date!=''){
                    this.setting.value=formatDateTime(this.date)
                }
            },

            writeIn3rdDataBaseChange(){
                if(this.writeIn3rdDataBase==1){
                    this.setting.writeIn3rdDataBase=true;
                }else{
                    this.setting.writeIn3rdDataBase=false;
                }
            },

            typeChange(){
                if(this.type==1){
                    this.unit=true;
                    this.setting.type='DATE';
                    let date=new Date();
                    date.setDate(date.getDay()-90);
                    this.date=date;

                }else {
                    this.setting.type='COUNT';
                    this.unit=false;
                    this.setting.value=100000;
                }
            },

            modifySetting(){
                this.setting.value = this.setting.value.toString();
                resetSetting(this.setting).then(resp=>{
                    if(resp.status=='SUCCESS'){
                        this.$message({
                            type:'success',
                            message:'修改日志配置成功！'
                        });
                        this.config=true;
                    }else{
                        this.$message({
                            type:'warning',
                            message:'修改日志配置失败！'
                        });
                    }
                }).catch(err=>{
                    this.$message.error(err)
                });
            },

            //获取日志设置
            initLogSetting(){
                getLogSetting().then(resp=>{
                    this.setting=resp.extend;
                    if(this.setting.writeIn3rdDataBase=true){
                        this.writeIn3rdDataBase=1;
                    }else {
                        this.writeIn3rdDataBase=2;
                    }

                    if(this.setting.type=='DATE'){
                        this.type=1;
                    }else {
                        this.type=2;
                    }
                }).catch(err=>{

                });
            },

            lastThirtyDaysData(){
                recentMonthStatics().then(resp=>{
                    let statisticData=resp.data;
                    for (let item in statisticData){
                        this.xAxis.push(item);
                        this.data.push(statisticData[item]);
                    }

                }).catch(err=>{
                    console.log("请求最近30天的日志者陷入数据出错：",err)
                })
            },

        }
    }

</script>


<style>

    .title{
        margin: 0 auto;
        width: 200px;
        vertical-align: middle;
        height:62px;
        font-size: 20px;
        color: #606366;
        line-height:40px;
        height:40px;
    }

    .logForm .el-form-item__label {
        float: left;
        min-width:135px ;
        font-size: 15px;
        margin-left: 50px;
    }

    .user-log-info .el-input {
        position: relative;
        display: inline-block;
        width: 200px;
        margin-left: 96px;
    }

    .log-config{
        width: 200px;
        margin-left: 60px;
    }
    strong{
        color: red;
    }

    .config-item{
        margin-bottom: 10px;
    }

</style>

