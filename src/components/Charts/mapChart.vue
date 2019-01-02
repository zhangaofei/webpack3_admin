<template>
    <div class='map' :style="{height:height,width:width}">
        <div :class="[className]" :id="id" style="height: 1000px;width:1000px;margin-top: 50px;"></div>
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/map');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');

    export default {
        name: 'mapChart',
        props: {
            title:{//表格标题
                type:String,
                default:'地图'
            },
            tipName:{
                type:String,
                default:'占比'
            },

            legend:{//表格数据
                type:Array,
            },

            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'map-chart'
            },
            width: {
                type: String,
                default: '1000px'
            },
            height: {
                type: String,
                default: '1000px'
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
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                        tooltip : {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            x:'60px',
                            y:'500px',
                            data:['离线','正常']
                        },
                        dataRange: {
                            min: 0,
                            max: 2500,
                            x: 'left',
                            y: '500px',
                            text:['高','低'],           // 文本，默认为数值文本
                            calculable : true
                        },
                        toolbox: {
//                            show: true,
//                            orient : 'vertical',
//                            x: 'right',
//                            y: 'center',
//                            feature : {
//                                mark : {show: true},
//                                dataView : {show: true, readOnly: false},
//                                restore : {show: true},
//                                saveAsImage : {show: true}
//                            }
                        },
                        roamController: {
                            show: true,
                            x: 'center',
                            y:'center',
                            mapTypeControl: {
                                'china': true
                            }
                        },
                        series : [
                            {
                                name: '离线',
                                type: 'map',
                                mapType: 'china',
                                roam: false,
                                selectedMode : 'single',
                                itemStyle:{
                                    normal:{label:{show:true}},
                                    emphasis:{label:{show:true}}
                                },
                                data:[
                                    {name: '北京',value: Math.round(Math.random()*1000)},
                                    {name: '天津',value: Math.round(Math.random()*1000)},
                                    {name: '上海',value: Math.round(Math.random()*1000)},
                                    {name: '重庆',value: Math.round(Math.random()*1000)},
                                    {name: '河北',value: Math.round(Math.random()*1000)},
                                    {name: '河南',value: Math.round(Math.random()*1000)},
                                    {name: '云南',value: Math.round(Math.random()*1000)},
                                    {name: '辽宁',value: Math.round(Math.random()*1000)},
                                    {name: '黑龙江',value: Math.round(Math.random()*1000)},
                                    {name: '湖南',value: Math.round(Math.random()*1000)},
                                    {name: '安徽',value: Math.round(Math.random()*1000)},
                                    {name: '山东',value: Math.round(Math.random()*1000)},
                                    {name: '新疆',value: Math.round(Math.random()*1000)},
                                    {name: '江苏',value: Math.round(Math.random()*1000)},
                                    {name: '浙江',value: Math.round(Math.random()*1000)},
                                    {name: '江西',value: Math.round(Math.random()*1000)},
                                    {name: '湖北',value: Math.round(Math.random()*1000)},
                                    {name: '广西',value: Math.round(Math.random()*1000)},
                                    {name: '甘肃',value: Math.round(Math.random()*1000)},
                                    {name: '山西',value: Math.round(Math.random()*1000)},
                                    {name: '内蒙古',value: Math.round(Math.random()*1000)},
                                    {name: '陕西',value: Math.round(Math.random()*1000)},
                                    {name: '吉林',value: Math.round(Math.random()*1000)},
                                    {name: '福建',value: Math.round(Math.random()*1000)},
                                    {name: '贵州',value: Math.round(Math.random()*1000)},
                                    {name: '广东',value: Math.round(Math.random()*1000)},
                                    {name: '青海',value: Math.round(Math.random()*1000)},
                                    {name: '西藏',value: Math.round(Math.random()*1000)},
                                    {name: '四川',value: Math.round(Math.random()*1000)},
                                    {name: '宁夏',value: Math.round(Math.random()*1000)},
                                    {name: '海南',value: Math.round(Math.random()*1000)},
                                    {name: '台湾',value: Math.round(Math.random()*1000)},
                                    {name: '香港',value: Math.round(Math.random()*1000)},
                                    {name: '澳门',value: Math.round(Math.random()*1000)}
                                ]
                            },
                            {
                                name: '正常',
                                type: 'map',
                                mapType: 'china',
                                itemStyle:{
                                    normal:{label:{show:true}},
                                    emphasis:{label:{show:true}}
                                },
                                data:[
                                    {name: '北京',value: Math.round(Math.random()*1000)},
                                    {name: '天津',value: Math.round(Math.random()*1000)},
                                    {name: '上海',value: Math.round(Math.random()*1000)},
                                    {name: '重庆',value: Math.round(Math.random()*1000)},
                                    {name: '河北',value: Math.round(Math.random()*1000)},
                                    {name: '安徽',value: Math.round(Math.random()*1000)},
                                    {name: '新疆',value: Math.round(Math.random()*1000)},
                                    {name: '浙江',value: Math.round(Math.random()*1000)},
                                    {name: '江西',value: Math.round(Math.random()*1000)},
                                    {name: '山西',value: Math.round(Math.random()*1000)},
                                    {name: '内蒙古',value: Math.round(Math.random()*1000)},
                                    {name: '吉林',value: Math.round(Math.random()*1000)},
                                    {name: '福建',value: Math.round(Math.random()*1000)},
                                    {name: '广东',value: Math.round(Math.random()*1000)},
                                    {name: '西藏',value: Math.round(Math.random()*1000)},
                                    {name: '四川',value: Math.round(Math.random()*1000)},
                                    {name: '宁夏',value: Math.round(Math.random()*1000)},
                                    {name: '香港',value: Math.round(Math.random()*1000)},
                                    {name: '澳门',value: Math.round(Math.random()*1000)}
                                ]
                            }
                        ]
                });
            }
        }
    }
</script>
