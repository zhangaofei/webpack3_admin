<style scoped lang="scss">
    .order_pro{
        display: inline-block;
        width: 18px;
        height: 18px;
        background: #f9d06a;
        color: #ffffff;
        border-radius: 50%;
        text-align: center;
        line-height: 18px;
    }
    .order_pro.gray{
        background: #aaaaaa;
    }
    .num_show{
        color: #5a9ae6;
        margin-left: 8px;
    }
</style>
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
                <li class="active">区域分布图</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">区域分布图</h3>
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
                            <div class="row" style="margin-top: 50px">
                                <div style="width: 30%;float: left;margin-top: 50px">
                                    <div v-for="(item,index) in sortData" style="width: 33.33333%;float: left; line-height: 30px;">
                                        <span class="order_pro" :class="index > 2 ? 'gray' : '' ">{{index+1}}</span>
                                        {{item.name}} <span class="num_show">{{ item.value }}</span>
                                    </div>
                                    <div style="clear:both;"></div>
                                </div>
                                <div class='chart' :style="{height:height,width:width}" style="margin: 0 auto;float: right">
                                    <div :class="className" :id="id" style="height:600px;width:100%;"></div>
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
    const echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/map')
    require('echarts/map/js/china')
    require('echarts/map/js/province/anhui')
    require('echarts/map/js/province/aomen')
    require('echarts/map/js/province/beijing')
    require('echarts/map/js/province/chongqing')
    require('echarts/map/js/province/fujian')
    require('echarts/map/js/province/gansu')
    require('echarts/map/js/province/guangdong')
    require('echarts/map/js/province/guangxi')
    require('echarts/map/js/province/guizhou')
    require('echarts/map/js/province/hainan')
    require('echarts/map/js/province/hebei')
    require('echarts/map/js/province/heilongjiang')
    require('echarts/map/js/province/henan')
    require('echarts/map/js/province/hubei')
    require('echarts/map/js/province/hunan')
    require('echarts/map/js/province/jiangsu')
    require('echarts/map/js/province/jiangxi')
    require('echarts/map/js/province/jilin')
    require('echarts/map/js/province/liaoning')
    require('echarts/map/js/province/neimenggu')
    require('echarts/map/js/province/ningxia')
    require('echarts/map/js/province/qinghai')
    require('echarts/map/js/province/shandong')
    require('echarts/map/js/province/shanghai')
    require('echarts/map/js/province/shanxi')
    require('echarts/map/js/province/shanxi1')
    require('echarts/map/js/province/sichuan')
    require('echarts/map/js/province/taiwan')
    require('echarts/map/js/province/tianjin')
    require('echarts/map/js/province/xianggang')
    require('echarts/map/js/province/xinjiang')
    require('echarts/map/js/province/xizang')
    require('echarts/map/js/province/yunnan')
    require('echarts/map/js/province/zhejiang')
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/legend')
    import {timestampFormat,formatDateTime,forTimeVal} from "../../../../utils/dateUtil";
    import {getRegionMap, getServerTime} from 'api/enDNS/cartogram';
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
                default: '70%'
            },
            height: {
                type: String,
                default: '600px'
            }
        },
        data() {
            return {
                chart: null,
                flowList:null,
                nameData:[],
                date:[],
                listQuery: {
                    startTime:'',
                    endTime:''
                },
                provinceData:[],
                sortData:[]
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
                getRegionMap(this.listQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.provinceData = [];
                        for (let key in response.data){
                            this.provinceData.push({name: response.data[key].areaName, value: response.data[key].countNum})
                        }
                        if(this.provinceData.length == 0){
                            this.provinceData = [ { "name": "台湾", "value": 0 }, { "name": "澳门", "value": 0 }, { "name": "香港", "value": 0 }, { "name": "新疆", "value": 0 }, { "name": "宁夏", "value": 0 }, { "name": "青海", "value": 0 }, { "name": "甘肃", "value": 0 }, { "name": "陕西", "value": 0 }, { "name": "西藏", "value": 0 }, { "name": "云南", "value": 0 }, { "name": "贵州", "value": 0 }, { "name": "四川", "value": 0 }, { "name": "重庆", "value": 0 }, { "name": "海南", "value": 0 }, { "name": "广西", "value": 0 }, { "name": "广东", "value": 0 }, { "name": "湖南", "value": 0 }, { "name": "湖北", "value": 0 }, { "name": "河南", "value": 0 }, { "name": "山东", "value": 0 }, { "name": "江西", "value": 0 }, { "name": "福建", "value": 0 }, { "name": "安徽", "value": 0 }, { "name": "浙江", "value": 0 }, { "name": "江苏", "value": 0 }, { "name": "上海", "value": 0 }, { "name": "黑龙江", "value": 0 }, { "name": "吉林", "value": 0 }, { "name": "辽宁", "value": 0 }, { "name": "内蒙古", "value": 0 }, { "name": "山西", "value": 0 }, { "name": "河北", "value": 0 }, { "name": "天津", "value": 0 }, { "name": "北京", "value": 0 } ]
                        }
                        this.sortData = this.provinceData;
                        this.sortData.sort(function (a, b) {
                            if(a.value < b.value) {
                                return 1;
                            } else {
                                return -1;
                            }
                        })
                        this.initChart();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.code.info
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },

            initChart() {
                let $this = this;
                var myChart = echarts.init(document.getElementById(this.id));
                var curIndx = 0;
                var mapType = [
                    'china',
                    // 23个省
                    '广东', '青海', '四川', '海南', '陕西',
                    '甘肃', '云南', '湖南', '湖北', '黑龙江',
                    '贵州', '山东', '江西', '河南', '河北',
                    '山西', '安徽', '福建', '浙江', '江苏',
                    '吉林', '辽宁', '台湾',
                    // 5个自治区
                    '新疆', '广西', '宁夏', '内蒙古', '西藏',
                    // 4个直辖市
                    '北京', '天津', '上海', '重庆',
                    // 2个特别行政区
                    '香港', '澳门'
                ];

                let option = {
                    title: {
//                        text : '全国34个省市自治区',
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: function(param, ticket, callback){
                            let name = param.name; // 得到鼠标指向的省份名称
                            let data = option.series[0].data; // 得到所有省份的数据
                            for (let i = 0; i < data.length; i++) { // 遍历所有省份, 找到鼠标指向的省份的数据
                                if (data[i].name == name) {
                                    return name + '<br>' + '区域分布: ' + data[i].value;
                                    break;
                                }
                            }
                        }
                    },
                    roamController: {
                        show: true,
                        x: 'right',
                        mapTypeControl: {
                            'china': true
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 1000,
                        x:'80%',
                        y:'250',
                        splitNumber: 5,
                        pieces: [
                            {min: 0, max:2000, color: '#d9e2e8'},
                            {min: 2001, max: 5000, color: '#d5f7fc'},
                            {min: 5001, max: 7000, color: '#a0d4f3'},
                            {min: 7001, max: 9000, color: '#6bb2ea'},
                            {min: 9001, max: 12000, color: '#348de0'},
                            {min: 12001, max: 15000, color: '#2656e6'},
                            {min: 15001, color: '#1b47ba'}
                        ],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    series : [
                        {
                            name: '站点断开个数',
                            roam:false,
                            type: 'map',
                            mapType: 'china',
                            selectedMode : 'single',
                            itemStyle:{
                                normal: {
                                    label: {
                                        show: true
                                    },
                                    areaColor:'#ffffff'
                                },
                                emphasis:{label:{show:true}}
                            },
                            data:this.provinceData
                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    }
</script>
