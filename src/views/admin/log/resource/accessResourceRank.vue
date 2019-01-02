<template>
    <div>
        <div>
            <div class="row" style="margin-bottom:8px;">
                <div class="logForm">
                    <div style="float:left;margin-left: 20px">
                        <div class="block0">
                            <!--<label>-->
                                <!--<el-date-picker-->
                                        <!--v-model="dateRange"-->
                                        <!--type="daterange"-->
                                        <!--size="small"-->
                                        <!--style="margin-left: 0px;height: 35px;"-->
                                        <!--placeholder="选择日期范围">-->
                                <!--</el-date-picker>-->
                                <!--<span style="margin-left: 30px;vertical-align: top;">-->
                                    <!--<el-button size="small"-->
                                               <!--style="width: 80px;height:35px;vertical-align: middle"-->
                                               <!--type="primary"-->
                                               <!--@click="resetTime()">-->
                                        <!--查询-->
                                    <!--</el-button>-->
                                <!--</span>-->
                            <!--</label>-->
                            <!--=======================-->
                            <label style="margin-left: 0px; margin-right: 0px">开始时间</label>
                            <el-date-picker
                                    v-model="objDate.valStar"
                                    @change="changeStartTime"
                                    type="date"
                                    format="yyyy-MM-dd "
                                    placeholder="选择日期"
                            >
                            </el-date-picker>
                            <label style="margin-left: 10px; margin-right: 0px">结束时间</label>
                            <el-date-picker
                                    v-model="objDate.valEnd"
                                    @change="changeEndTime"
                                    type="date"

                                    placeholder="选择日期"
                            >
                            </el-date-picker>
                            <span style="margin-left: 30px">
                            <el-button size="small"
                                       style="width: 80px;height:35px"
                                       type="primary"
                                       @click="resetTime()">
                                查询
                            </el-button>
                        </span>
                        </div>
                    </div>
                </div>
            </div>

            <div style="width: 100%;min-height: 500px;">

                <div class="log-chart" style="height: 520px;width:40%;min-width: 524px;">
                    <div>
                        <span style="" class="rank-top">
                            访问资源排行榜
                        </span>
                        <span class="rank-top" style="margin-left: 5px;padding: 0px">
                            <el-select v-model="topValue" placeholder="请选择">
                                <el-option
                                        key="1"
                                        label="5"
                                        value="5">
                                </el-option>

                                <el-option
                                        key="2"
                                        label="10"
                                        value="10">
                                </el-option>

                            </el-select>
                        </span>
                    </div>
                    <div style="height: 500px">
                        <barChart :data="barData" :keyName="barName" id="accessResourceBar"></barChart>
                    </div>

                </div>

                <div class="log-chart log-pie-chart" style="height: 520px;width:40%;min-width: 490px">
                    <pieChart :data="pieData" :legend="legend" title="访问应用类型占比" id="accessResourcePie"></pieChart>
                </div>

            </div>

        </div>
    </div>
</template>


<script>

    import pieChart from 'components/Charts/pieChart';
    import barChart from 'components/Charts/barChart';
    import {accessApplicationPie, resourceVisitRank, linkTrafficRank} from "../../../../api/log/logApi";
    import {formatDateTime} from "../../../../utils/dateUtil";

    export default {
        components: {
            pieChart,
            barChart
        },
        data() {
            return {
                type: "all",
                dateRange: [],
                topValue: 10,
                timeCondition: {
                    "type": "DATE",
                    "conditionName": "date",
                    "gteValue": "2000-06-05",
                    "lteValue": "2080-06-25"
                },
                barData: [],
                barName: [],
                pieData: [],
                legend: [],
                objDate:{
                    valStar:'',
                    valEnd:''
                }
            }
        },
        computed: {},
        created() {
            let date = new Date();
            date.setDate(date.getDate() - 90);
            // this.dateRange.push(date);
            // this.dateRange.push(new Date());
            /*=========*/
            this.objDate.valStar=date;
            this.objDate.valEnd=new Date();
            this.setTimeCondition();
            this.search();
        },
        watch: {//深度 watcher
            "topValue": "getAccessResourceRank"
        },
        methods: {
            changeStartTime(e){
                console.log('endtime_start:',e,e>this.objDate.valEnd)
                if (e > this.objDate.valEnd && this.objDate.valEnd != ''){
                    this.objDate.valStar = '';
                } else {
                    this.objDate.valStar = e
                }
            },
            changeEndTime(e){
                console.log('endtime:',e)
                if (e < this.objDate.valStar){
                    this.objDate.valEnd = '';
                } else {
                    this.objDate.valEnd = e
                }
            },
            search() {
                this.getAccessResourceRank();
                this.getAccessResourcePie();
            },
            setTimeCondition() {
                // if (this.dateRange.length > 0) {
                //     let d1 = formatDateTime(this.dateRange[0]);
                //     let d2 = formatDateTime(this.dateRange[1]);
                //     this.timeCondition.gteValue = d1;
                //     this.timeCondition.lteValue = d2;
                // }
                if(this.objDate.valStar&&this.objDate.valEnd){
                    this.timeCondition.gteValue = formatDateTime(this.objDate.valStar);
                    this.timeCondition.lteValue = formatDateTime(this.objDate.valEnd);
                }
            },
            resetTime() {
                this.setTimeCondition();
                if(this.objDate.valStar&&this.objDate.valEnd){
                    this.search();
                }else {
                    this.$message({
                        type: 'warning',
                        message: '请选择起始和结束日期！'
                    });
                }
            },
            //获取访问资源排行的直方图数据
            getAccessResourceRank() {
                linkTrafficRank(this.type, this.topValue, this.timeCondition).then(resp => {
                    console.log("获取登陆排行的数据：", resp);
                    this.barName = resp.data.xAxis.reverse();

                    var _data = [];
                    resp.data.yAxis.map(x => {
                        _data.push(parseFloat(x/1024/1024/1024).toFixed(2))
                    })

                    this.barData = _data.reverse();
                }).catch(err => {
                    console.log("获取登陆排行的数据出错：", err)
                });
            },
            //获取访问资源类型占比的
            getAccessResourcePie() {
                accessApplicationPie(this.timeCondition).then(resp => {
                    let legend = [];
                    let data = [];
                    for (let item in resp.data) {
                        legend.push(item);
                        data.push({
                            value: resp.data[item],
                            name: item
                        })
                    }
                    this.legend = legend;
                    this.pieData = data;
                }).catch(err => {
                    console.log("获取用户登陆终端的类型占比数据出错：", err)
                })
            }
        }
    }
</script>
<style>
    .log-chart, .pie-chart {
        height: 490px;
        width: 48%;
        float: left;
        border: solid #6CA9CD 0.2px;
    }

    .log-pie-chart {
        margin-left: 30px;
    }
</style>