<template>
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts';
    import {getTotalUsers} from "../../api/home/homePage";
    import {timestampFormat} from "../../utils/dateUtil";
    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '200px'
            }
        },
        data() {
            return {
                chart: null,
                xData:[],
                yData:[],
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
            this.getTotalUers();
        },
        methods: {
            getTotalUers(){
                getTotalUsers().then(resp=>{
                    for (let data of resp.data.items){
                        this.xData.push(timestampFormat('hh:mm', data.time * 1000));
                        this.yData.push(data.num);
                    }
                    console.log('yData:', this.yData);
                    console.log('xDat:', this.xData);
                    this.initChart();
                }).catch(err=>{
                    console.log("获取登陆排行的数据出错：",err)
                });
            },
            initChart() {
               this.chart = echarts.init(document.getElementById(this.id));

//        const data = [320, 182, 191, 234, 190, 200, 100];
//        const markLineData = [];
//        for (var i = 1; i < data.length; i++) {
//          markLineData.push([{
//            xAxis: i - 1,
//            yAxis: data[i - 1],
//            value: (data[i] + data[i - 1]).toFixed(2)
//          }, {
//            xAxis: i,
//            yAxis: data[i]
//          }]);
//        }
                this.chart.setOption({
                    title: {
                        text: '用户并发数'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['用户并发数', '', '', '', '']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '用户并发',
//                            color:'black',
                            type: 'line',
                            stack: '总量',
                            data: this.yData
//                            data: [1,2,1,23,43,33,2,13,2,23]
                        }
                    ]
                })
            }
        }
    }
</script>
