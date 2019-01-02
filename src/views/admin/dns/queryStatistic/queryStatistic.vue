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
                <li class="active">查询统计图</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">查询统计图</h3>
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
    import {getQueryStatic, getServerTime} from 'api/enDNS/cartogram';
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
                y1flowList:[],
                y2flowList:[],
                y3flowList:[],
                y4flowList:[],
                y5flowList:[],
                y6flowList:[],
                y7flowList:[],
                date:[],
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
                getQueryStatic(this.listQuery).then(resp=>{
                    if (resp.status == 'SUCCESS'){
                        this.flowList=resp.data[0];
                        this.xflowList = [];
                        this.y1flowList = [];
                        this.y2flowList = [];
                        this.y3flowList = [];
                        this.y4flowList = [];
                        this.y5flowList = [];
                        this.y6flowList = [];
                        this.y7flowList = [];
                        for (let i = 0; i < this.flowList.length; i++){
                            this.xflowList.push(this.flowList[i]);
                        }
                        for (let i = 0; i < resp.data[1].length; i++){
                            this.y1flowList.push(resp.data[1][i]);
                        }
                        for (let i = 0; i < resp.data[2].length; i++){
                            this.y2flowList.push(resp.data[2][i]);
                        }
                        for (let i = 0; i < resp.data[3].length; i++){
                            this.y3flowList.push(resp.data[3][i]);
                        }
                        for (let i = 0; i < resp.data[4].length; i++){
                            this.y4flowList.push(resp.data[4][i]);
                        }
                        for (let i = 0; i < resp.data[5].length; i++){
                            this.y5flowList.push(resp.data[5][i]);
                        }
                        for (let i = 0; i < resp.data[6].length; i++){
                            this.y6flowList.push(resp.data[6][i]);
                        }
                        for (let i = 0; i < resp.data[7].length; i++){
                            this.y7flowList.push(resp.data[7][i]);
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
                        text: ''
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['请求失败','正在递归','命中缓存','黑名单','请求错误', '递归成功', '递归失败']
                    },
                    toolbox: {
                        show : false,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore : {show: true},
                            saveAsImage : {show: true}
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
                    series : [
                        {
                            name:'请求失败',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}, color:'#96BFFF'}},
                            data:this.y1flowList
                        },
                        {
                            name:'正在递归',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}, color:'#FF9F7F'}},
                            data:this.y2flowList
                        },
                        {
                            name:'命中缓存',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}, color:'#FFDB5C'}},
                            data:this.y3flowList
                        },
                        {
                            name:'黑名单',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}, color:'#9FE6B8'}},
                            data:this.y4flowList
                        },
                        {
                            name:'请求错误',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}, color:'#67E0E3'}},
                            data:this.y5flowList
                        },
                        {
                            name:'递归成功',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}, color:'#32C5E9'}},
                            data:this.y6flowList
                        },
                        {
                            name:'递归失败',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}, color:'#37A2DA'}},
                            data:this.y7flowList
                        }
                    ]
                })
            }
        }
    }
</script>
