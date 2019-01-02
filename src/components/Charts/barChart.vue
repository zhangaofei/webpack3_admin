<template>
    <div class='bar-chart' :style="{height:height,width:width}">
        <div :class="[className]" :id="id" style="height:490px;width:490px;"></div>
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');

    export default {
//        name: 'barChart',
        props: {
            title: {
                // 表格标题
                type: String,
                default: '近30天系统日志累计折线图'
            },
            tipName: {
                type: String,
                default: '该点的值是'
            },
            unit: {
                // y轴的单位
                type: String,
                default: '(条)'
            },
            data: {
                // 柱状图对应的数据
                type: Array
            },
            keyName: {
                // 每一个柱状对应的名称
                type: Array
            },
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'bar-chart'
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
        created() {

        },
        mounted() {
            this.initChart();
        },
        watch: {
            // 深度 watcher
            'data': 'initChart'
        },
        methods: {
            initChart() {
                let that = this;
                let colorArr = [
                    [
                        '#afd6dd', '#75abd0', '#99d2dd', '#88b0bb', '#1bb2d8',
                        '#1790cf', '#3484df', '#038cc4', '#1c7099', '#3c5abc',
                        '#1790cf', '#3484df', '#038cc4', '#1c7099', '#3c5abc'
                    ],
                    [
                        '#68a54a', '#a9cba2', '#bfd3b7', '#759c6a', '#8abb6f',
                        '#397b29', '#86b372', '#a9cba2', '#68a54a', '#408829',
                        '#397b29', '#86b372', '#a9cba2', '#68a54a', '#408829',
                    ]
                ];
                let color = this.id == 'downloadResourceBar' || this.id == 'accessResourceBar' ? colorArr[1] : colorArr[0];
                let deg = this.id == 'bar-chart' ? 20 : 20;
                // 在数组中取最大值
                let maxData = this.data.map(item => {
                    return Math.max.apply(null, this.data);
                });
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    grid: {
                        top: '5px',
                        left: '3%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    yAxis: [
                        // {
                        //     type : 'category',
                        //     data : this.keyName,
                        //    // data : ['11111','2'],
                        //     axisTick: {
                        //         alignWithLabel: true
                        //     },
                        //     splitLine: {
                        //         show: false
                        //     }
                        // }

                        {
                            show: true,
                            type: 'category',
                            data: this.keyName,
                            axisLabel: {
                                interval: 0,
                                formatter: function (val) {
                                    let strs = val.split(''); //字符串数组
                                    let str = '';
                                    for (let i = 0, s; s = strs[i++];) { //遍历字符串数组
                                        str += s;
                                        if (!(i % 15)) str += '\n';
                                    }
                                    return str
                                }

                            }
                        }
                    ],
                    xAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                rotate: deg,
                                align: 'right',
                                formatter: function (value) {
                                    //debugger
                                    if (that.id == "bar-chart") {
                                        return value;
                                    } else {
                                        return value + ' GB';
                                    }
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                alignWithLabel: false
                            },
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barMaxWidth: 40,
                            data: this.data,
                            // data:['100','200'],
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        return color[params.dataIndex]
                                    },
                                    barGap: '20px',
//                                    label: {
//                                        show: true,
//                                        position: 'top',
//                                        formatter: '{b}\n{c}B'
//                                    }
                                }
                            },
                            barCategoryGap: '40%',
                            zlevel: 10,
                            tooltip: {
                                show: true,
                                formatter: function (value) {
                                    //debugger
                                    if (that.id == "bar-chart") {
                                        return value.seriesName + ':<p>' + value.name + ' ' + value.value + '</p>';
                                    } else {
                                        return value.seriesName + ':<p>' + value.name + ' ' + value.value + 'GB</p>';
                                    }
                                }
                            }
                        },
                        {
                            type: 'bar',
                            barMaxWidth: 40,
                            barGap: '-100%',
                            data: maxData,
                            itemStyle: {
                                normal: {
                                    color: '#f5f5f5'
                                }
                            },
                            tooltip: {
                                show: false
                            }
                        }
                    ]
                });
                window.onresize = this.chart.resize;
            }
        }
    }
</script>
<style>
    .enlink-chart {
        border: solid 1px #6CA9CD;
    }

    .enlink-chart canvas {
        left: 15px !important;
    }

    .pie {

    }

    .chart {
        float: left;
        margin-left: 10px;
        margin-right: 10px;
    }

</style>
