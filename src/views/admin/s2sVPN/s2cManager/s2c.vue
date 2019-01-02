<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i> EnS2S</a></li>
                <li class="active">节点设备管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header clude_tab">
                            <h3 class="box-title">节点设备管理</h3>
                        </div>
                        <div class="box-body">
                            <el-tabs type="border-card" v-model="activeName">
                                <el-tab-pane label="设备节点可视化" name="first">
                                    <div class="hello">
                                        <div id="map" style="width:900px;height:900px;margin: 0 auto;"></div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="设备节点列表" name="second">
                                    <!-- 表单搜索框部分 -->
                                    <div class="row" style="margin-bottom:2px;margin-top: 8px">
                                        <div class="col-sm-6">
                                            <div id="example1_filter" class="dataTables_filter" style="margin-right:-450px;float:right;">
                                                <input type="text"
                                                    class="form-control"
                                                    placeholder=""
                                                    id="search_content"
                                                    v-model="listQuery.searchContent"
                                                    @keyup.enter="search($event)"
                                                />
                                                <span class="glyphicon glyphicon-search serch_head_icon"></span>
                                                <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                                                    <button class="btn btn-primary" type="button" @click="getList()" >
                                                        <span>搜索</span>
                                                    </button>
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    <el-table
                                            ref="multipleTable"
                                            :data="s2cList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                        <el-table-column
                                                prop="deviceName"
                                                align="center"
                                                label="设备名"
                                                show-overflow-tooltip
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="serverName"
                                                align="center"
                                                label="服务器名称"
                                                show-overflow-tooltip>
                                        </el-table-column>

                                        <el-table-column
                                                prop="accessStatus"
                                                align="center"
                                                label="准入状态"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="连接状态"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.connectStatus == 'off' || scope.row.connectStatus == '已断开'">
                                                    <div><img src="../../../../assets/addIcon/断开.png" alt="图片找不到了" style="width: 18px;height: 18px;border-radius: 50%">  未连接</div>
                                                </span>
                                            <span v-else>
                                                    <div><img src="../../../../assets/addIcon/连通.png" alt="图片找不到了" style="width: 18px;height: 18px;border-radius: 50%">  已连接</div>
                                                </span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                prop="connectLength"
                                                align="center"
                                                label="连接时长"
                                                show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                                prop="sessionTraffic"
                                                align="center"
                                                label="会话流量(MB)"
                                                show-overflow-tooltip
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="sessionRate"
                                                align="center"
                                                label="当前流速(kb/s)"
                                                show-overflow-tooltip
                                        >
                                        </el-table-column>

                                        <el-table-column
                                                label="操作"
                                                align="center"
                                                width="70"
                                        >
                                            <template slot-scope="scope">
                                                <a @click="operateAction(scope.row)" title="修改">
                                                    <i class="el-icon-edit"></i>
                                                </a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="listQuery.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="listQuery.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                            <!-- page start -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <edit  @onChangeStatus="onChangeStatus" :currentData="currentData" v-if="isEditShow"/>
    </div>
</template>
<script>
    import store from "../../../../store/index";
    import permissionRoutes from 'store/permission';
    import {isReadonly} from "../../../../utils/permissionUtil";
    import {VisualS2c, getCityMessage} from 'api/s2sVPN/s2s';
    import edit from './edit'
    import {getS2cList} from 'api/s2sVPN/s2s';
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
    export default{
        name: 'HelloWorld',
        components:{
            edit
        },
        data(){
            return{
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:73,
                activeName:'first',
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0,
                    searchContent:''
                },
                isEditShow: false,
                currentData: null,
                s2cList:[],
                sourceData:[],
                provinceData:[],
                cityData:[],
                messageData:[],
                keyData:[],
                serverId:''
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
        },
        mounted() {
            this.getProvinceS2c();
            this.getCityMessage();
        },
        methods: {
            onChangeStatus(){
                this.isEditShow = false;
                this.getList();
            },
            operateAction(row){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
//                    if(row.serverId == this.serverId){
                        this.currentData = row;
                        this.isEditShow = true;
//                    } else {
//                        this.$message({
//                            type: 'warning',
//                            message: '1222!'
//                        });
//                    }
                }
            },
            getList(){
                getS2cList(this.listQuery).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.s2cList = response.data;
                        for (let i = 0; i < this.s2cList.length; i++){
                            if(this.s2cList[i].connectStatus == 'on'){
                                this.s2cList[i].connectStatus = '已连接'
                            } else if(this.s2cList[i].connectStatus == 'off'){
                                this.s2cList[i].connectStatus = '已断开'
                            }
                            if(this.s2cList[i].accessStatus == 'Y'){
                                this.s2cList[i].accessStatus = '允许准入'
                            } else if(this.s2cList[i].accessStatus == 'N'){
                                this.s2cList[i].accessStatus = '禁止准入'
                            }
                            if(this.s2cList[i].noAccessType == 0){
                                this.s2cList[i].noAccessType = '永久禁止准入'
                            } else if(this.s2cList[i].noAccessType == 1){
                                this.s2cList[i].noAccessType = '自定义禁止准入时间'
                            }
                            if(this.s2cList[i].connectLength == null || this.s2cList[i].connectLength == ''){
                                this.s2cList[i].connectLength = '-'
                            }
                            if(this.s2cList[i].sessionTraffic == null || this.s2cList[i].sessionTraffic == ''){
                                this.s2cList[i].sessionTraffic = '-'
                            }
                            if(this.s2cList[i].sessionRate == null || this.s2cList[i].sessionRate == ''){
                                this.s2cList[i].sessionRate = '-'
                            }
                        }
                        this.listQuery.total = response.extend.page.totalHits;
                        this.listQuery.currentPage = response.extend.page.currentPage;
                        this.listQuery.pageSize = response.extend.page.pageSize;
                        this.serverId = response.extend.serverId;
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
            handleSelectionChange(val){
                console.log(val)
            },
            handleSizeChange(val){
                this.listQuery.pageSize = val;
                this.getList()
            },
            handleCurrentChange(val){
                this.listQuery.currentPage = val;
                this.getList()
            },
            search(event){
                if(event.keyCode==13){
                    this.getList();
                }
            },
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
                        console.log('sourceData:', this.sourceData);
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
                        console.log('sourceData1:', this.sourceData);
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
</script>
<style scoped>
    .dataTables_filter{
        position: relative;
        height: 34px;
        margin-bottom: 30px;
    }
    .btn-primary{
        background-color: #3493E0;
        border-color: #1f80e6;
    }
    .btn-primary:hover {
        background-color: #3493E0;
        border-color: #409EFF;
    }
    a {
        color: #3493E0;
    }
    .serch_head_icon{
        display: block;
        width: 30px;
        height: 100%;
        line-height: 34px;
        text-align: center;
        vertical-align: middle;
        position: absolute;
        left: 0;
        top: 0;
        color: #C0C4CC;
    }

    .form-control{
        padding-left: 30px;
        border-color: #DCDFE6;
    }
    .inner_head_right{
        margin-right: 66px;
    }
</style>