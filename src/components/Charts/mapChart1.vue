<template>
    <div class="hello">
        <!--<h1>{{ msg }}</h1>-->
        <!--<h2>Essential Links</h2>-->
        <!--<ul>-->
        <!--<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>-->
        <!--<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>-->
        <!--<li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>-->
        <!--<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>-->
        <!--<br>-->
        <!--<li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>-->
        <!--</ul>-->
        <!--<h2>Ecosystem</h2>-->
        <!--<ul>-->
        <!--<li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>-->
        <!--<li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>-->
        <!--<li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>-->
        <!--<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>-->
        <!--</ul>-->
        <div id="map" style="width:900px;height:900px;margin: 0 auto;"></div>
    </div>
</template>

<script>
    import {VisualS2c, getCityMessage} from 'api/s2sVPN/s2s';
    // 引入 ECharts 主模块
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
    export default {
        name: 'HelloWorld',
        data() {
            return {
                sourceData:[],
                provinceData:[],
                cityData:[],
                messageData:[],
                keyData:[]
            }
        },
        mounted() {
            this.getProvinceS2c();
            this.getCityMessage();
        },
        methods: {
            getProvinceS2c(){
                VisualS2c({type:'province'}).then(response => {
                    if (response.status == 'SUCCESS'){
                        for (let key in response['data']) {
                            this.provinceData.push({name: key, value: response['data'][key]});
                        }
                        this.getCityS2c();
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
            getCityS2c(){
                VisualS2c({type:'city'}).then(response => {
                    if (response.status == 'SUCCESS'){
                        for (let key in response['data']) {
                            this.cityData.push({name: key, value: response['data'][key]});
                        }
                        this.sourceData = this.provinceData.concat(this.cityData);
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
            getCityMessage(){
                getCityMessage().then(response => {
                    if (response.status == 'SUCCESS'){
                        for (let key in response['data']) {
                            this.keyData.push(key);
                            var data = response['data'][key];
                            var str = '';
                            for (let i = 0; i < data.length; i++){
                                if(data[i]['connectStatus'] == 'off'){
                                    data[i]['connectStatus'] = '断开'
                                } else {
                                    data[i]['connectStatus'] = '连接'
                                }
                                str += '设备名称:' + data[i]['deviceName'] + ',' + '连接状态:' + data[i]['connectStatus'] + '<br>'
                            }
                            this.messageData.push(str);
                        }
                        console.log('messageData:', this.messageData);
                        this.sourceData = this.provinceData.concat(this.cityData);
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
                var myChart = echarts.init(document.getElementById('map'));
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
                myChart.on('click', function (param){
                    var len = mapType.length;
                    var mt = mapType[curIndx % len];
                    if (mt == 'china') {
                        for (var i in mapType) {
                            if (mapType[i] == param.name) {
                                curIndx = i;
                                mt = mapType[i]
                                break;
                            }
                        }
                        option.tooltip.formatter = function(param, ticket, callback){
                            let name = param.name; // 得到鼠标指向的省份名称
//                            let data = option.series[0].data; // 得到所有省份的数据
                            let data = $this.keyData; // 得到所有省份的数据
                            for (let i = 0; i < data.length; i++) { // 遍历所有省份, 找到鼠标指向的省份的数据
                                if (data[i] == name) {
                                    return $this.messageData[i];
                                    break;
                                }
                            }
                            return name + ': 无站点'
                        };
                    } else {
                        curIndx = 0;
                        mt = 'china';
//                        option.tooltip.formatter = '滚轮切换或点击进入该省<br/>{b}';
                        option.tooltip.formatter = function(param, ticket, callback){
                            let name = param.name; // 得到鼠标指向的省份名称
                            let data = option.series[0].data; // 得到所有省份的数据
                            for (let i = 0; i < data.length; i++) { // 遍历所有省份, 找到鼠标指向的省份的数据
                                if (data[i].name == name) {
                                    return name + '站点断开个数: ' + data[i].value;
                                    break;
                                }
                            }
                            return name + ': 无站点'
                        };
                    }
                    option.series[0].mapType = mt;
//                    option.title.subtext = mt + ' （滚轮或点击切换）';
                    myChart.setOption(option, true);
                });
                let option = {
                    title: {
//                        text : '全国34个省市自治区',
//                        subtext : 'china （滚轮或点击切换）'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: function(param, ticket, callback){
                            let name = param.name; // 得到鼠标指向的省份名称
                            let data = option.series[0].data; // 得到所有省份的数据
                            for (let i = 0; i < data.length; i++) { // 遍历所有省份, 找到鼠标指向的省份的数据
                                if (data[i].name == name) {
                                    return name + '站点断开个数: ' + data[i].value;
                                    break;
                                }
                            }
                            return name + ': 无站点'
                        }
                    },
//                    legend: {
//                        orient: 'vertical',
//                        x:'right',
//                        data:['']
//                    },
//                    dataRange: {
//                        min: 0,
//                        max: 6,
//                        color:['#1473da','#348de0','#6bb2ea','#a0d4f3','#d5f7fc','#d9e2e8','#ffffff'],
//                        text:['高','低'],
//                        calculable : true
//                    },
                    visualMap: {
                        min: 0,
                        max: 1000,
                        x:'0',
                        y:'500',
                        splitNumber: 5,
                        pieces: [
                            {value: 0, color: '#d9e2e8'},
                            {min: 1, max: 3, color: '#d5f7fc'},
                            {min: 4, max: 10, color: '#a0d4f3'},
                            {min: 10, max: 20, color: '#6bb2ea'},
                            {min: 20, max: 50, color: '#348de0'},
                            {min: 50, color: '#1473da'},
                        ],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    series : [
                        {
                            name: '站点断开个数',
                            roam:true,
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
                            data:this.sourceData
                        },
                    ]
                };
                myChart.setOption(option);
            }
        }
    }
    //                            data:[
    //                                {name: '广东',value: 0},
    //                                {name: '青海',value: 0},
    //                                {name: '四川',value: 2},
    //                                {name: '海南',value: 7},
    //                                {name: '陕西',value: 17},
    //                                {name: '甘肃',value: 45},
    //                                {name: '云南',value: 78},
    //                                {name: '湖南',value: 7},
    //                                {name: '湖北',value: Math.round(Math.random()*1000)},
    //                                {name: '黑龙江',value: Math.round(Math.random()*1000)},
    //                                {name: '贵州',value: Math.round(Math.random()*1000)},
    //                                {name: '山东',value: Math.round(Math.random()*1000)},
    //                                {name: '江西',value: Math.round(Math.random()*1000)},
    //                                {name: '河南',value: Math.round(Math.random()*1000)},
    //                                {name: '河北',value: Math.round(Math.random()*1000)},
    //                                {name: '山西',value: Math.round(Math.random()*1000)},
    //                                {name: '安徽',value: Math.round(Math.random()*1000)},
    //                                {name: '福建',value: Math.round(Math.random()*1000)},
    //                                {name: '浙江',value: Math.round(Math.random()*1000)},
    //                                {name: '江苏',value: Math.round(Math.random()*1000)},
    //                                {name: '吉林',value: Math.round(Math.random()*1000)},
    //                                {name: '辽宁',value: Math.round(Math.random()*1000)},
    //                                {name: '台湾',value: Math.round(Math.random()*1000)},
    //                                {name: '新疆',value: Math.round(Math.random()*1000)},
    //                                {name: '广西',value: Math.round(Math.random()*1000)},
    //                                {name: '宁夏',value: Math.round(Math.random()*1000)},
    //                                {name: '内蒙古',value: Math.round(Math.random()*1000)},
    //                                {name: '西藏',value: Math.round(Math.random()*1000)},
    //                                {name: '北京',value: Math.round(Math.random()*1000)},
    //                                {name: '天津',value: Math.round(Math.random()*1000)},
    //                                {name: '上海',value: Math.round(Math.random()*1000)},
    //                                {name: '重庆',value: Math.round(Math.random()*1000)},
    //                                {name: '香港',value: Math.round(Math.random()*1000)},
    //                                {name: '澳门',value: Math.round(Math.random()*1000)},
    //                                {name: '重庆市',value: Math.round(Math.random()*1000)},
    //                                {name: '北京市',value: Math.round(Math.random()*1000)},
    //                                {name: '天津市',value: Math.round(Math.random()*1000)},
    //                                {name: '上海市',value: Math.round(Math.random()*1000)},
    //                                {name: '香港',value: Math.round(Math.random()*1000)},
    //                                {name: '澳门',value: Math.round(Math.random()*1000)},
    //                            ]
    //                        {name: '巴音郭楞蒙古自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '和田地区',value: Math.round(Math.random()*1000)},
    //                        {name: '哈密地区',value: Math.round(Math.random()*1000)},
    //                        {name: '阿克苏地区',value: Math.round(Math.random()*1000)},
    //                        {name: '阿勒泰地区',value: Math.round(Math.random()*1000)},
    //                        {name: '喀什地区',value: Math.round(Math.random()*1000)},
    //                        {name: '塔城地区',value: Math.round(Math.random()*1000)},
    //                        {name: '昌吉回族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '克孜勒苏柯尔克孜自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '吐鲁番地区',value: Math.round(Math.random()*1000)},
    //                        {name: '伊犁哈萨克自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '博尔塔拉蒙古自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '乌鲁木齐市',value: Math.round(Math.random()*1000)},
    //                        {name: '克拉玛依市',value: Math.round(Math.random()*1000)},
    //                        {name: '阿拉尔市',value: Math.round(Math.random()*1000)},
    //                        {name: '图木舒克市',value: Math.round(Math.random()*1000)},
    //                        {name: '五家渠市',value: Math.round(Math.random()*1000)},
    //                        {name: '石河子市',value: Math.round(Math.random()*1000)},
    //                        {name: '那曲地区',value: Math.round(Math.random()*1000)},
    //                        {name: '阿里地区',value: Math.round(Math.random()*1000)},
    //                        {name: '日喀则地区',value: Math.round(Math.random()*1000)},
    //                        {name: '林芝地区',value: Math.round(Math.random()*1000)},
    //                        {name: '昌都地区',value: Math.round(Math.random()*1000)},
    //                        {name: '山南地区',value: Math.round(Math.random()*1000)},
    //                        {name: '拉萨市',value: Math.round(Math.random()*1000)},
    //                        {name: '呼伦贝尔市',value: Math.round(Math.random()*1000)},
    //                        {name: '阿拉善盟',value: Math.round(Math.random()*1000)},
    //                        {name: '锡林郭勒盟',value: Math.round(Math.random()*1000)},
    //                        {name: '鄂尔多斯市',value: Math.round(Math.random()*1000)},
    //                        {name: '赤峰市',value: Math.round(Math.random()*1000)},
    //                        {name: '巴彦淖尔市',value: Math.round(Math.random()*1000)},
    //                        {name: '通辽市',value: Math.round(Math.random()*1000)},
    //                        {name: '乌兰察布市',value: Math.round(Math.random()*1000)},
    //                        {name: '兴安盟',value: Math.round(Math.random()*1000)},
    //                        {name: '包头市',value: Math.round(Math.random()*1000)},
    //                        {name: '呼和浩特市',value: Math.round(Math.random()*1000)},
    //                        {name: '乌海市',value: Math.round(Math.random()*1000)},
    //                        {name: '海西蒙古族藏族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '玉树藏族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '果洛藏族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '海南藏族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '海北藏族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '黄南藏族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '海东地区',value: Math.round(Math.random()*1000)},
    //                        {name: '西宁市',value: Math.round(Math.random()*1000)},
    //                        {name: '甘孜藏族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '阿坝藏族羌族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '凉山彝族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '绵阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '达州市',value: Math.round(Math.random()*1000)},
    //                        {name: '广元市',value: Math.round(Math.random()*1000)},
    //                        {name: '雅安市',value: Math.round(Math.random()*1000)},
    //                        {name: '宜宾市',value: Math.round(Math.random()*1000)},
    //                        {name: '乐山市',value: Math.round(Math.random()*1000)},
    //                        {name: '南充市',value: Math.round(Math.random()*1000)},
    //                        {name: '巴中市',value: Math.round(Math.random()*1000)},
    //                        {name: '泸州市',value: Math.round(Math.random()*1000)},
    //                        {name: '成都市',value: Math.round(Math.random()*1000)},
    //                        {name: '资阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '攀枝花市',value: Math.round(Math.random()*1000)},
    //                        {name: '眉山市',value: Math.round(Math.random()*1000)},
    //                        {name: '广安市',value: Math.round(Math.random()*1000)},
    //                        {name: '德阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '内江市',value: Math.round(Math.random()*1000)},
    //                        {name: '遂宁市',value: Math.round(Math.random()*1000)},
    //                        {name: '自贡市',value: Math.round(Math.random()*1000)},
    //                        {name: '黑河市',value: Math.round(Math.random()*1000)},
    //                        {name: '大兴安岭地区',value: Math.round(Math.random()*1000)},
    //                        {name: '哈尔滨市',value: Math.round(Math.random()*1000)},
    //                        {name: '齐齐哈尔市',value: Math.round(Math.random()*1000)},
    //                        {name: '牡丹江市',value: Math.round(Math.random()*1000)},
    //                        {name: '绥化市',value: Math.round(Math.random()*1000)},
    //                        {name: '伊春市',value: Math.round(Math.random()*1000)},
    //                        {name: '佳木斯市',value: Math.round(Math.random()*1000)},
    //                        {name: '鸡西市',value: Math.round(Math.random()*1000)},
    //                        {name: '双鸭山市',value: Math.round(Math.random()*1000)},
    //                        {name: '大庆市',value: Math.round(Math.random()*1000)},
    //                        {name: '鹤岗市',value: Math.round(Math.random()*1000)},
    //                        {name: '七台河市',value: Math.round(Math.random()*1000)},
    //                        {name: '酒泉市',value: Math.round(Math.random()*1000)},
    //                        {name: '张掖市',value: Math.round(Math.random()*1000)},
    //                        {name: '甘南藏族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '武威市',value: Math.round(Math.random()*1000)},
    //                        {name: '陇南市',value: Math.round(Math.random()*1000)},
    //                        {name: '庆阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '白银市',value: Math.round(Math.random()*1000)},
    //                        {name: '定西市',value: Math.round(Math.random()*1000)},
    //                        {name: '天水市',value: Math.round(Math.random()*1000)},
    //                        {name: '兰州市',value: Math.round(Math.random()*1000)},
    //                        {name: '平凉市',value: Math.round(Math.random()*1000)},
    //                        {name: '临夏回族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '金昌市',value: Math.round(Math.random()*1000)},
    //                        {name: '嘉峪关市',value: Math.round(Math.random()*1000)},
    //                        {name: '普洱市',value: Math.round(Math.random()*1000)},
    //                        {name: '红河哈尼族彝族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '文山壮族苗族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '曲靖市',value: Math.round(Math.random()*1000)},
    //                        {name: '楚雄彝族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '大理白族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '临沧市',value: Math.round(Math.random()*1000)},
    //                        {name: '迪庆藏族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '昭通市',value: Math.round(Math.random()*1000)},
    //                        {name: '昆明市',value: Math.round(Math.random()*1000)},
    //                        {name: '丽江市',value: Math.round(Math.random()*1000)},
    //                        {name: '西双版纳傣族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '保山市',value: Math.round(Math.random()*1000)},
    //                        {name: '玉溪市',value: Math.round(Math.random()*1000)},
    //                        {name: '怒江傈僳族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '德宏傣族景颇族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '百色市',value: Math.round(Math.random()*1000)},
    //                        {name: '河池市',value: Math.round(Math.random()*1000)},
    //                        {name: '桂林市',value: Math.round(Math.random()*1000)},
    //                        {name: '南宁市',value: Math.round(Math.random()*1000)},
    //                        {name: '柳州市',value: Math.round(Math.random()*1000)},
    //                        {name: '崇左市',value: Math.round(Math.random()*1000)},
    //                        {name: '来宾市',value: Math.round(Math.random()*1000)},
    //                        {name: '玉林市',value: Math.round(Math.random()*1000)},
    //                        {name: '梧州市',value: Math.round(Math.random()*1000)},
    //                        {name: '贺州市',value: Math.round(Math.random()*1000)},
    //                        {name: '钦州市',value: Math.round(Math.random()*1000)},
    //                        {name: '贵港市',value: Math.round(Math.random()*1000)},
    //                        {name: '防城港市',value: Math.round(Math.random()*1000)},
    //                        {name: '北海市',value: Math.round(Math.random()*1000)},
    //                        {name: '怀化市',value: Math.round(Math.random()*1000)},
    //                        {name: '永州市',value: Math.round(Math.random()*1000)},
    //                        {name: '邵阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '郴州市',value: Math.round(Math.random()*1000)},
    //                        {name: '常德市',value: Math.round(Math.random()*1000)},
    //                        {name: '湘西土家族苗族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '衡阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '岳阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '益阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '长沙市',value: Math.round(Math.random()*1000)},
    //                        {name: '株洲市',value: Math.round(Math.random()*1000)},
    //                        {name: '张家界市',value: Math.round(Math.random()*1000)},
    //                        {name: '娄底市',value: Math.round(Math.random()*1000)},
    //                        {name: '湘潭市',value: Math.round(Math.random()*1000)},
    //                        {name: '榆林市',value: Math.round(Math.random()*1000)},
    //                        {name: '延安市',value: Math.round(Math.random()*1000)},
    //                        {name: '汉中市',value: Math.round(Math.random()*1000)},
    //                        {name: '安康市',value: Math.round(Math.random()*1000)},
    //                        {name: '商洛市',value: Math.round(Math.random()*1000)},
    //                        {name: '宝鸡市',value: Math.round(Math.random()*1000)},
    //                        {name: '渭南市',value: Math.round(Math.random()*1000)},
    //                        {name: '咸阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '西安市',value: Math.round(Math.random()*1000)},
    //                        {name: '铜川市',value: Math.round(Math.random()*1000)},
    //                        {name: '清远市',value: Math.round(Math.random()*1000)},
    //                        {name: '韶关市',value: Math.round(Math.random()*1000)},
    //                        {name: '湛江市',value: Math.round(Math.random()*1000)},
    //                        {name: '梅州市',value: Math.round(Math.random()*1000)},
    //                        {name: '河源市',value: Math.round(Math.random()*1000)},
    //                        {name: '肇庆市',value: Math.round(Math.random()*1000)},
    //                        {name: '惠州市',value: Math.round(Math.random()*1000)},
    //                        {name: '茂名市',value: Math.round(Math.random()*1000)},
    //                        {name: '江门市',value: Math.round(Math.random()*1000)},
    //                        {name: '阳江市',value: Math.round(Math.random()*1000)},
    //                        {name: '云浮市',value: Math.round(Math.random()*1000)},
    //                        {name: '广州市',value: Math.round(Math.random()*1000)},
    //                        {name: '汕尾市',value: Math.round(Math.random()*1000)},
    //                        {name: '揭阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '珠海市',value: Math.round(Math.random()*1000)},
    //                        {name: '佛山市',value: Math.round(Math.random()*1000)},
    //                        {name: '潮州市',value: Math.round(Math.random()*1000)},
    //                        {name: '汕头市',value: Math.round(Math.random()*1000)},
    //                        {name: '深圳市',value: Math.round(Math.random()*1000)},
    //                        {name: '东莞市',value: Math.round(Math.random()*1000)},
    //                        {name: '中山市',value: Math.round(Math.random()*1000)},
    //                        {name: '延边朝鲜族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '吉林市',value: Math.round(Math.random()*1000)},
    //                        {name: '白城市',value: Math.round(Math.random()*1000)},
    //                        {name: '松原市',value: Math.round(Math.random()*1000)},
    //                        {name: '长春市',value: Math.round(Math.random()*1000)},
    //                        {name: '白山市',value: Math.round(Math.random()*1000)},
    //                        {name: '通化市',value: Math.round(Math.random()*1000)},
    //                        {name: '四平市',value: Math.round(Math.random()*1000)},
    //                        {name: '辽源市',value: Math.round(Math.random()*1000)},
    //                        {name: '承德市',value: Math.round(Math.random()*1000)},
    //                        {name: '张家口市',value: Math.round(Math.random()*1000)},
    //                        {name: '保定市',value: Math.round(Math.random()*1000)},
    //                        {name: '唐山市',value: Math.round(Math.random()*1000)},
    //                        {name: '沧州市',value: Math.round(Math.random()*1000)},
    //                        {name: '石家庄市',value: Math.round(Math.random()*1000)},
    //                        {name: '邢台市',value: Math.round(Math.random()*1000)},
    //                        {name: '邯郸市',value: Math.round(Math.random()*1000)},
    //                        {name: '秦皇岛市',value: Math.round(Math.random()*1000)},
    //                        {name: '衡水市',value: Math.round(Math.random()*1000)},
    //                        {name: '廊坊市',value: Math.round(Math.random()*1000)},
    //                        {name: '恩施土家族苗族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '十堰市',value: Math.round(Math.random()*1000)},
    //                        {name: '宜昌市',value: Math.round(Math.random()*1000)},
    //                        {name: '襄樊市',value: Math.round(Math.random()*1000)},
    //                        {name: '黄冈市',value: Math.round(Math.random()*1000)},
    //                        {name: '荆州市',value: Math.round(Math.random()*1000)},
    //                        {name: '荆门市',value: Math.round(Math.random()*1000)},
    //                        {name: '咸宁市',value: Math.round(Math.random()*1000)},
    //                        {name: '随州市',value: Math.round(Math.random()*1000)},
    //                        {name: '孝感市',value: Math.round(Math.random()*1000)},
    //                        {name: '武汉市',value: Math.round(Math.random()*1000)},
    //                        {name: '黄石市',value: Math.round(Math.random()*1000)},
    //                        {name: '神农架林区',value: Math.round(Math.random()*1000)},
    //                        {name: '天门市',value: Math.round(Math.random()*1000)},
    //                        {name: '仙桃市',value: Math.round(Math.random()*1000)},
    //                        {name: '潜江市',value: Math.round(Math.random()*1000)},
    //                        {name: '鄂州市',value: Math.round(Math.random()*1000)},
    //                        {name: '遵义市',value: Math.round(Math.random()*1000)},
    //                        {name: '黔东南苗族侗族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '毕节地区',value: Math.round(Math.random()*1000)},
    //                        {name: '黔南布依族苗族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '铜仁地区',value: Math.round(Math.random()*1000)},
    //                        {name: '黔西南布依族苗族自治州',value: Math.round(Math.random()*1000)},
    //                        {name: '六盘水市',value: Math.round(Math.random()*1000)},
    //                        {name: '安顺市',value: Math.round(Math.random()*1000)},
    //                        {name: '贵阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '烟台市',value: Math.round(Math.random()*1000)},
    //                        {name: '临沂市',value: Math.round(Math.random()*1000)},
    //                        {name: '潍坊市',value: Math.round(Math.random()*1000)},
    //                        {name: '青岛市',value: Math.round(Math.random()*1000)},
    //                        {name: '菏泽市',value: Math.round(Math.random()*1000)},
    //                        {name: '济宁市',value: Math.round(Math.random()*1000)},
    //                        {name: '德州市',value: Math.round(Math.random()*1000)},
    //                        {name: '滨州市',value: Math.round(Math.random()*1000)},
    //                        {name: '聊城市',value: Math.round(Math.random()*1000)},
    //                        {name: '东营市',value: Math.round(Math.random()*1000)},
    //                        {name: '济南市',value: Math.round(Math.random()*1000)},
    //                        {name: '泰安市',value: Math.round(Math.random()*1000)},
    //                        {name: '威海市',value: Math.round(Math.random()*1000)},
    //                        {name: '日照市',value: Math.round(Math.random()*1000)},
    //                        {name: '淄博市',value: Math.round(Math.random()*1000)},
    //                        {name: '枣庄市',value: Math.round(Math.random()*1000)},
    //                        {name: '莱芜市',value: Math.round(Math.random()*1000)},
    //                        {name: '赣州市',value: Math.round(Math.random()*1000)},
    //                        {name: '吉安市',value: Math.round(Math.random()*1000)},
    //                        {name: '上饶市',value: Math.round(Math.random()*1000)},
    //                        {name: '九江市',value: Math.round(Math.random()*1000)},
    //                        {name: '抚州市',value: Math.round(Math.random()*1000)},
    //                        {name: '宜春市',value: Math.round(Math.random()*1000)},
    //                        {name: '南昌市',value: Math.round(Math.random()*1000)},
    //                        {name: '景德镇市',value: Math.round(Math.random()*1000)},
    //                        {name: '萍乡市',value: Math.round(Math.random()*1000)},
    //                        {name: '鹰潭市',value: Math.round(Math.random()*1000)},
    //                        {name: '新余市',value: Math.round(Math.random()*1000)},
    //                        {name: '南阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '信阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '洛阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '驻马店市',value: Math.round(Math.random()*1000)},
    //                        {name: '周口市',value: Math.round(Math.random()*1000)},
    //                        {name: '商丘市',value: Math.round(Math.random()*1000)},
    //                        {name: '三门峡市',value: Math.round(Math.random()*1000)},
    //                        {name: '新乡市',value: Math.round(Math.random()*1000)},
    //                        {name: '平顶山市',value: Math.round(Math.random()*1000)},
    //                        {name: '郑州市',value: Math.round(Math.random()*1000)},
    //                        {name: '安阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '开封市',value: Math.round(Math.random()*1000)},
    //                        {name: '焦作市',value: Math.round(Math.random()*1000)},
    //                        {name: '许昌市',value: Math.round(Math.random()*1000)},
    //                        {name: '濮阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '漯河市',value: Math.round(Math.random()*1000)},
    //                        {name: '鹤壁市',value: Math.round(Math.random()*1000)},
    //                        {name: '大连市',value: Math.round(Math.random()*1000)},
    //                        {name: '朝阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '丹东市',value: Math.round(Math.random()*1000)},
    //                        {name: '铁岭市',value: Math.round(Math.random()*1000)},
    //                        {name: '沈阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '抚顺市',value: Math.round(Math.random()*1000)},
    //                        {name: '葫芦岛市',value: Math.round(Math.random()*1000)},
    //                        {name: '阜新市',value: Math.round(Math.random()*1000)},
    //                        {name: '锦州市',value: Math.round(Math.random()*1000)},
    //                        {name: '鞍山市',value: Math.round(Math.random()*1000)},
    //                        {name: '本溪市',value: Math.round(Math.random()*1000)},
    //                        {name: '营口市',value: Math.round(Math.random()*1000)},
    //                        {name: '辽阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '盘锦市',value: Math.round(Math.random()*1000)},
    //                        {name: '忻州市',value: Math.round(Math.random()*1000)},
    //                        {name: '吕梁市',value: Math.round(Math.random()*1000)},
    //                        {name: '临汾市',value: Math.round(Math.random()*1000)},
    //                        {name: '晋中市',value: Math.round(Math.random()*1000)},
    //                        {name: '运城市',value: Math.round(Math.random()*1000)},
    //                        {name: '大同市',value: Math.round(Math.random()*1000)},
    //                        {name: '长治市',value: Math.round(Math.random()*1000)},
    //                        {name: '朔州市',value: Math.round(Math.random()*1000)},
    //                        {name: '晋城市',value: Math.round(Math.random()*1000)},
    //                        {name: '太原市',value: Math.round(Math.random()*1000)},
    //                        {name: '阳泉市',value: Math.round(Math.random()*1000)},
    //                        {name: '六安市',value: Math.round(Math.random()*1000)},
    //                        {name: '安庆市',value: Math.round(Math.random()*1000)},
    //                        {name: '滁州市',value: Math.round(Math.random()*1000)},
    //                        {name: '宣城市',value: Math.round(Math.random()*1000)},
    //                        {name: '阜阳市',value: Math.round(Math.random()*1000)},
    //                        {name: '宿州市',value: Math.round(Math.random()*1000)},
    //                        {name: '黄山市',value: Math.round(Math.random()*1000)},
    //                        {name: '巢湖市',value: Math.round(Math.random()*1000)},
    //                        {name: '亳州市',value: Math.round(Math.random()*1000)},
    //                        {name: '池州市',value: Math.round(Math.random()*1000)},
    //                        {name: '合肥市',value: Math.round(Math.random()*1000)},
    //                        {name: '蚌埠市',value: Math.round(Math.random()*1000)},
    //                        {name: '芜湖市',value: Math.round(Math.random()*1000)},
    //                        {name: '淮北市',value: Math.round(Math.random()*1000)},
    //                        {name: '淮南市',value: Math.round(Math.random()*1000)},
    //                        {name: '马鞍山市',value: Math.round(Math.random()*1000)},
    //                        {name: '铜陵市',value: Math.round(Math.random()*1000)},
    //                        {name: '南平市',value: Math.round(Math.random()*1000)},
    //                        {name: '三明市',value: Math.round(Math.random()*1000)},
    //                        {name: '龙岩市',value: Math.round(Math.random()*1000)},
    //                        {name: '宁德市',value: Math.round(Math.random()*1000)},
    //                        {name: '福州市',value: Math.round(Math.random()*1000)},
    //                        {name: '漳州市',value: Math.round(Math.random()*1000)},
    //                        {name: '泉州市',value: Math.round(Math.random()*1000)},
    //                        {name: '莆田市',value: Math.round(Math.random()*1000)},
    //                        {name: '厦门市',value: Math.round(Math.random()*1000)},
    //                        {name: '丽水市',value: Math.round(Math.random()*1000)},
    //                        {name: '杭州市',value: Math.round(Math.random()*1000)},
    //                        {name: '温州市',value: Math.round(Math.random()*1000)},
    //                        {name: '宁波市',value: Math.round(Math.random()*1000)},
    //                        {name: '舟山市',value: Math.round(Math.random()*1000)},
    //                        {name: '台州市',value: Math.round(Math.random()*1000)},
    //                        {name: '金华市',value: Math.round(Math.random()*1000)},
    //                        {name: '衢州市',value: Math.round(Math.random()*1000)},
    //                        {name: '绍兴市',value: Math.round(Math.random()*1000)},
    //                        {name: '嘉兴市',value: Math.round(Math.random()*1000)},
    //                        {name: '湖州市',value: Math.round(Math.random()*1000)},
    //                        {name: '盐城市',value: Math.round(Math.random()*1000)},
    //                        {name: '徐州市',value: Math.round(Math.random()*1000)},
    //                        {name: '南通市',value: Math.round(Math.random()*1000)},
    //                        {name: '淮安市',value: Math.round(Math.random()*1000)},
    //                        {name: '苏州市',value: Math.round(Math.random()*1000)},
    //                        {name: '宿迁市',value: Math.round(Math.random()*1000)},
    //                        {name: '连云港市',value: Math.round(Math.random()*1000)},
    //                        {name: '扬州市',value: Math.round(Math.random()*1000)},
    //                        {name: '南京市',value: Math.round(Math.random()*1000)},
    //                        {name: '泰州市',value: Math.round(Math.random()*1000)},
    //                        {name: '无锡市',value: Math.round(Math.random()*1000)},
    //                        {name: '常州市',value: Math.round(Math.random()*1000)},
    //                        {name: '镇江市',value: Math.round(Math.random()*1000)},
    //                        {name: '吴忠市',value: Math.round(Math.random()*1000)},
    //                        {name: '中卫市',value: Math.round(Math.random()*1000)},
    //                        {name: '固原市',value: Math.round(Math.random()*1000)},
    //                        {name: '银川市',value: Math.round(Math.random()*1000)},
    //                        {name: '石嘴山市',value: Math.round(Math.random()*1000)},
    //                        {name: '儋州市',value: Math.round(Math.random()*1000)},
    //                        {name: '文昌市',value: Math.round(Math.random()*1000)},
    //                        {name: '乐东黎族自治县',value: Math.round(Math.random()*1000)},
    //                        {name: '三亚市',value: Math.round(Math.random()*1000)},
    //                        {name: '琼中黎族苗族自治县',value: Math.round(Math.random()*1000)},
    //                        {name: '东方市',value: Math.round(Math.random()*1000)},
    //                        {name: '海口市',value: Math.round(Math.random()*1000)},
    //                        {name: '万宁市',value: Math.round(Math.random()*1000)},
    //                        {name: '澄迈县',value: Math.round(Math.random()*1000)},
    //                        {name: '白沙黎族自治县',value: Math.round(Math.random()*1000)},
    //                        {name: '琼海市',value: Math.round(Math.random()*1000)},
    //                        {name: '昌江黎族自治县',value: Math.round(Math.random()*1000)},
    //                        {name: '临高县',value: Math.round(Math.random()*1000)},
    //                        {name: '陵水黎族自治县',value: Math.round(Math.random()*1000)},
    //                        {name: '屯昌县',value: Math.round(Math.random()*1000)},
    //                        {name: '定安县',value: Math.round(Math.random()*1000)},
    //                        {name: '保亭黎族苗族自治县',value: Math.round(Math.random()*1000)},
    //                        {name: '五指山市',value: Math.round(Math.random()*1000)}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>