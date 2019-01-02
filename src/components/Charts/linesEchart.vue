<template>
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts';

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
                chart: null
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

        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));

                var category = [];
                var dottedBase = +new Date();
                var lineData = [];
                var barData = [];

                for (var i = 0; i < 20; i++) {
                    var date = new Date(dottedBase += 1000 * 3600 * 24);
                    category.push([
                        // date.getFullYear(),
                        date.getMonth() + 1,
                        date.getDate()
                    ].join('-'));
                    var b = (Math.random() * 200).toFixed(0);
                    // var d = Math.random() * 200;
                    // barData.push(b)
                    lineData.push(b);
                }

                this.chart.setOption({
                    backgroundColor: '#FCFCFC',
                    tooltip: {
                        // trigger: 'axis',
                        axisPointer: {
                            // type: 'shadow',
                            label: {
                                // show: true,
                                // backgroundColor: '#333'
                            }
                        }
                    },
                    legend: {
                        data: ['line'],
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    xAxis: {
                        data: category,
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    yAxis: {
                        splitLine: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    series: [{
                        name: 'line111',
                        type: 'line',
                        smooth: true,
                        // showAllSymbol: true,
                        // symbol: 'emptyCircle',
                        symbolSize: 15,
                        data: lineData
                    }
                    ]
                })
            }
        }
    }
</script>
