<template>
    <div class='bar-chart' :style="{height:height,width:width}">
        <div :class="className" :id="id" style="height:360px;width:90%;margin:0 auto;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import {getFlowList} from "../../api/log/logApi";
    import {flowmat} from "../../utils/dateUtil";

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
                default: '500px'
            },
            height: {
                type: String,
                default: '500px'
            }
        },
        data() {
            return {
                chart: {},
                xAxisData: [],
                yAxisInData: [],
                yAxisOutData: []
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
        created() {
            this.getList();
        },
        methods: {
            getList() {
                getFlowList().then(resp => {
                    console.log('resp_flow',resp);
                    if (resp.code == '200') {
                        // this.xAxisData = ["2018-08-29 00:00:00",]
                        // this.yAxisInData = [10]
                        // this.yAxisOutData = [10]
                        // this.yAxisInData = resp.data.yAxisIn
                        // this.yAxisOutData = resp.data.yAxisOut
                        for(let item of resp.data){
                            this.xAxisData.push(item.dateTime);
                            this.yAxisInData.push((item.inBytes/1000).toFixed(1));
                            this.yAxisOutData.push((item.outBytes/1000).toFixed(1));

                        }
                        this.initChart();
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    backgroundColor: '#fff',
                    title: {
                        text: '网卡流量 (KB/s) ',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: '#000'
                        },
                        left: '6%'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    legend: {
                        icon: 'rect',
                        itemWidth: 14,
                        itemHeight: 5,
                        itemGap: 13,
                        data: ['上行流量', '下行流量'],
                        right: '4%',
                        textStyle: {
                            fontSize: 12,
                            color: '#000'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#57617B',
                                type: 'dashed',
                                opacity: 0.1
                            }
                        },
                        data: this.xAxisData
                    }],
                    yAxis: [{
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#57617B',
                                type: 'dashed',
                                opacity: 0.1
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 12
                            },
                            formatter: '{value} KB/s'
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#57617B',
                                type: 'dashed',
                                opacity: 0.1
                                // color: 'black'
                            }
                        }
                    }],
                    series: [
                        {
                        name: '上行流量',// 带时间的小弹框名称
                        type: 'line',
                        smooth: true,
                        cursor: 'pointer',
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#E6F4DD'
                                }, {
                                    offset: 0.8,
                                    color: '#E6F4DD'
                                }], false),
                                shadowColor: '#E6F4DD',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'green',
                                type: 'solid'
                            }
                        },
                        label: {
                            formatter: '{b}: {c} KB/s'
                        },
                        data: this.yAxisInData
                    }, {
                        name: '下行流量',
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#FFFFFF'
                                }, {
                                    offset: 0.8,
                                    color: '#FFFFFF'
                                }], false),
                                shadowColor: '#99ccff',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#58a2e4',
                                type: 'solid'
                            }
                        },
                        label: {
                            formatter: '{b}: {c} KB/s'
                        },
                        data: this.yAxisOutData
                    }]
                })
            }
        }
    }
</script>
