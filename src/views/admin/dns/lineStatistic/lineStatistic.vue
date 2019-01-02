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
                <li><i class="fa fa-folder-open"></i>智能DNS</li>
                <li class="active">域名统计</li>
                <li class="active">线路统计图</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">线路统计图</h3>
                            <div class="box-tools pull-right">
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 21px !important; height: 700px">
                            <div style="float:left;margin-left: 20px">
                                <div class="block0">
                                    <label>
                                        <el-date-picker
                                                v-model="date"
                                                type="datetimerange"
                                                size="middle"
                                                range-separator="至"
                                                style="margin-left: 0px;height: 35px;"
                                                @change="changeTime"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                        </el-date-picker>
                                        <span style="margin-left: 30px">
                                    <el-button size="small"
                                               style="width: 80px;height:35px;background-color: #2b7de3"
                                               type="primary"
                                               @click="getList()">
                                        查询
                                    </el-button>
                                </span>
                                    </label>
                                </div>
                            </div>
                            <div class="row" style="margin-top: 100px">
                                <div class='chart' :style="{height:height,width:width}" style="margin: 0 auto;">
                                    <div :class="className" :id="id" style="height:550px;width:100%;"></div>
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
    import echarts from 'echarts';
    import {timestampFormat,formatDateTime,forTimeVal} from "../../../../utils/dateUtil";
    import {getLineStatic, getServerTime} from 'api/enDNS/cartogram';
    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'flowchart'
            },
            width: {
                type: String,
                default: '1000px'
            },
            height: {
                type: String,
                default: '650px'
            }
        },
        data() {
            return {
                chart: null,
                flowList:null,
                xflowList:[],
                yflowList:[],
                dataflowList:[],
                date:[],
                listQuery: {
                    startTime:'',
                    endTime:''
                },
                series:[],
                colors:['#96BFFF', '#FF9F7F', '#FFDB5C', '#9FE6B8', '#67E0E3', '#32C5E9', '#37A2DA',"#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA"]
            };
        },
        mounted() {
            this.initChart();
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null;
        },
        created(){
            this.getServerTime();
        },
        methods: {
            changeTime(e){
                if(e!=null && e!=''){
                    let dateRange=e;
                    let d1=forTimeVal(dateRange[0]);
                    let d2=forTimeVal(dateRange[1]);
                    this.listQuery.startTime = d1;
                    this.listQuery.endTime = d2;
                }else{
                    this.listQuery.startTime = '';
                    this.listQuery.endTime = '';
                }
            },
            getServerTime(){
                getServerTime().then(resp=>{
                    if (resp.status == 'SUCCESS'){
                        this.listQuery.endTime = resp.data;
                        this.listQuery.startTime = this.strMinusTime(this.listQuery.endTime, 1);
                        this.date = [];
                        this.date.push(this.listQuery.startTime);
                        this.date.push(this.strMinusTime(this.listQuery.endTime, 0));
                        this.listQuery.startTime = forTimeVal(this.listQuery.startTime);
                        this.getList();
                    }
                }).catch((e) =>{
                    console.log(e)
                });
            },
            strMinusTime(str, n) {
                var strArray = str.split(' ');
                var year = strArray[0].split('-')[0];
                var month = strArray[0].split('-')[1];
                var date = strArray[0].split('-')[2];
                var hour = strArray[1].split(':')[0];
                var minute = strArray[1].split(':')[1];
                var second = strArray[1].split(':')[2];
                var tmp = new Date();
                tmp.setFullYear(year);
                tmp.setMonth(parseInt(month - 1));
                tmp.setDate(date);
                tmp.setHours(hour);
                tmp.setMinutes(minute);
                tmp.setSeconds(second);
                return new Date(tmp.getTime() - n * 60 * 60 * 1000);
            },
            getList(){
                getLineStatic(this.listQuery).then(resp=>{
                    if (resp.status == 'SUCCESS'){
                        this.flowList=resp.data[0];
                        this.xflowList = [];
                        this.yflowList = [];
                        this.dataflowList = [];
                        this.series = [];
                        for (let i = 0; i < this.flowList.length; i++){
                            this.xflowList.push(this.flowList[i]);
                        }
                        for (let i = 0; i < resp.data[1].length; i++){
                            this.yflowList.push(resp.data[1][i].name);
                            this.dataflowList.push(resp.data[1][i].data);
                        }
                        for (let i = 0; i < this.yflowList.length; i++){
                            var info = {
                                name:'',
                                type:'line',
                                smooth:true,
                                itemStyle: {normal: {areaStyle: {type: 'default'}, color:''}},
                                data:[]
                            }
                            this.series.push(info);
                        }
                        for (let i = 0; i < this.series.length; i++){
                            this.series[i].name = this.yflowList[i];
                            this.series[i].itemStyle.normal.color = this.colors[i];
                            this.series[i].data = this.dataflowList[i];
                        }
                        this.initChart();
                    }
                }).catch((e) =>{
                    console.log(e)
                });
            },
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));

                this.chart.setOption({
                    title : {
                        text: '',
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:this.yflowList
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: false},
                            dataView : {show: false, readOnly: false},
                            magicType : {show: false, type: ['line', 'bar', 'stack', 'tiled']},
                            restore : {show: false},
                            saveAsImage : {show: false}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.xflowList
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : this.series
                })
            }
        }
    }
</script>
