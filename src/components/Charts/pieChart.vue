<template>
    <div class='pie' :style="{height:height,width:width}">
        <div :class="[className]" :id="id" style="height: 490px;width: 506px;margin-left: 0;"></div>
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');

    export default {
        name: 'pieChart',
        props: {
            title:{//表格标题
                type:String,
                default:'终端系统占比'
            },
            tipName:{
                type:String,
                default:'占比'
            },

            legend:{//表格数据
                type:Array,
            },

            data:{//表格数据
                type:Array,
            },
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'pie-chart'
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
            return {

            };
        },
        created(){

        },
        mounted() {
            this.initChart();
        },
        watch: {//深度 watcher
            'data':'initChart'
        },
        methods: {
            initChart() {
                let colorArr = [
                    [
                        '#afd6dd','#75abd0','#99d2dd','#88b0bb','#1bb2d8',
                        '#1790cf','#3484df','#038cc4','#1c7099','#3c5abc',
                        '#1790cf','#3484df','#038cc4','#1c7099','#3c5abc'
                    ],
                    [
                        '#68a54a','#a9cba2','#bfd3b7','#759c6a','#8abb6f',
                        '#397b29','#86b372','#a9cba2','#68a54a','#408829',
                        '#397b29','#86b372','#a9cba2','#68a54a','#408829',
                    ]
                ];
                let color = this.id == 'downloadResourcePie' || this.id == 'accessResourcePie' ? colorArr[1] : colorArr[0];
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    title : {
                        text:this.title,
                        x:'center',
                        textStyle:{

                        },
                        padding:[30,5,5,5]
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right:'5%',
                        top: '70%',
                        bottom:'0',
                        align: 'right',
                        data: this.data
                    },
                    series : [
                        {
                            name: this.tipName,
                            type: 'pie',
                            radius : '55%',
                            center: ['46%', '50%'],
                            sort : 'ascending',
                            startAngle: 30,
                            data: this.data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 2)'
                                },
                                normal: {
                                    color: function(params) {
                                        return color[params.dataIndex]
                                    },
                                }
                            },
                            zlevel: 2
                        },
                        {
                            name: this.tipName,
                            type: 'pie',
                            radius : ['62%', '63%'],
                            center: ['46%', '50%'],
                            sort : 'ascending',
                            data: this.data,
                            startAngle: 30,
                            itemStyle: {
                                normal: {
                                    color: '#f5f5f5',
                                    label : {
                                        show : false
                                    },
                                    labelLine : {
                                        show : false
                                    }
                                }
                            },
                            silent: false,
                            markPoint: {
                                label : {
                                    show : false
                                },
                                silent: false,
                            },
                            markArea: {
                                label : {
                                    show : false
                                },
                                silent: false,
                            },
                            markLine: {
                                label : {
                                    show : false
                                },
                                silent: false,
                            },
                            label : {
                                show : false
                            },
                            legendHoverLink: false,
                            hoverAnimation: false
                        }
                    ]
                })
            }
        }
    }
</script>

<style>

    .enlink-chart{
        border: solid 1px  #6CA9CD;
    }
    .enlink-chart canvas{
        left: 15px!important;
    }

    .pie{

    }

</style>
