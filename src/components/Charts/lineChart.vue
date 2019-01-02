<template>
    <div class='enlink-chart' :style="{height:height,width:width}">
        <div class="line_chart1" :class="[className,'line-chart']" :id="id" style="height:100%;width:100%;"></div>
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');

    require('echarts/lib/chart/line');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    export default {
        name: 'lineChart',
        props: {

            title:{//表格标题
                type:String,
                default:'近30天系统日志累计折线图'
            },
            tipName:{
                type:String,
                default:'该点得值是'
            },

            unit:{//y轴的单位
                type:String,
                default:'(条)'
            },

            data:{//表格数据
                type:Array,
            },
            xAxis:{
                type:Array,
            },
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'line-chart3'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '500px'
            }
        },
        data() {
            return {};
        },
        mounted() {
            this.initChart();
        },
        watch: {//深度 watcher
            'xAxis':'initChart'
        },
        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));

                this.chart.setOption({
                    title: {
                        text: this.title,
                      //  subtext: '纯属虚构',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: '#606366',
                            top:10
                        },
                        left: '40%'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
//                        show: true,
                        feature: {
//                            dataZoom: {
//                                yAxisIndex: 'none'
//                            },
//                            dataView: {readOnly: false},
//                            magicType: {type: ['line', 'bar']},
//                            restore: {},
//                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xAxis
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'+this.unit
                        },
                    },
                    series: [
                        {
                            name:this.tipName,
                            type:'line',
                            data:this.data,
                            markPoint: {
                                data: [
//                                    {type: 'max', name: '最大值'},
//                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
//                                    {type: 'average', name: '平均值'}
                                ]
                            },
                            itemStyle: {
                                normal:{
                                    lineStyle:{
                                        color: '#3C8DBC',
                                    }
                                }
                            },
                        }
                    ]
                })
            }
        }
    }
</script>

<style>

    .enlink-chart{
        //background-color: #00a2ae;
        border: solid 1px  #6CA9CD;
    }

    .enlink-chart canvas {
        left: 15px!important;
    }
    .line-chart{
        background-color: yellow;

    }
    .line_chart1>div:nth-child(1){
        width:100% !important;
    }
    .line_chart1>div:nth-child(1) canvas{
        width:100% !important;
    }
</style>
