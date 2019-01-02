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
                <li class="active">域名统计图</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">域名统计图</h3>
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
    import {getDomainStatic, getServerTime} from 'api/enDNS/cartogram';
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
                xflowList:[],
                yflowList:[],
                date:'',
                listQuery: {
                    startTime:'',
                    endTime:''
                }
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
                getDomainStatic(this.listQuery).then(resp=>{
                    if (resp.status == 'SUCCESS'){
                        this.xflowList = [];
                        this.yflowList = [];
                        for(let i = 0; i < resp.data.length; i++){
                            this.xflowList.push(resp.data[i].name);
                            this.yflowList.push(resp.data[i].data);
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
                    title: {
                        text: ''
                    },
                    xAxis: {
                        type: 'category',
                        data: this.xflowList,
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                width: 3
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontWeight: 'bold'
                            }
                        },
                        offset: 1
                    },
                    yAxis: {
                        name: '',
                        nameLocation: 'middle',
                        nameGap: 45,
                        nameTextStyle: {
                            fontWeight: 'bold',
                            fontSize: 15
                        },
                        axisTick: {
                            show: false
                        },
                        nameRotate: 0,
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                width: 3
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontWeight: 'bold'
                            },
                            formatter: '{value}'
                        },
                    },
                    series: [{
                        type: 'bar',
                        data: this.yflowList,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                        '#96BFFF', '#FF9F7F', '#FFDB5C',
                                        '#9FE6B8', '#67E0E3', '#32C5E9',
                                        '#37A2DA',"#fb7293", "#E062AE",
                                        "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA"];
//                                    [
//                                        '#c23531', '#2f4554', '#61a0a8',
//                                        '#d48265', '#91c7ae', '#749f83',
//                                        '#ca8622', '#bda29a', '#6e7074',
//                                        '#546570', '#c4ccd3','#00acee',
//                                    '#52cdd5',
//                                        '#79d9f1',
//                                        '#a7e7ff',
//                                        '#c8efff'
//                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        barMaxWidth: '40px',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: '{c}次'
                            }
                        }
                    }],
                    tooltip: {
                        trigger: 'item',
                        formatter: '得分:{c0}次'
                    }
                })
            }
        }
    }
</script>
