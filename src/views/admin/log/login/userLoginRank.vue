<template>
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
                            <!--<span style="margin-left: 30px">-->
                                <!--<el-button size="small"-->
                                           <!--style="width: 80px;height:35px"-->
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
                <div class="clearfixed set_margin_top10">
                    <span style="" class="rank-top">
                        用户登录排行榜
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
                <div style="height: 500px;width: 48%">
                    <barChart :data="barData" :keyName="barName"></barChart>
                </div>

            </div>
            <div class="log-chart log-pie-chart" style="height: 520px;width:40%;min-width: 490px">
                <pieChart :data="pieData" :legend="legend"></pieChart>
            </div>

        </div>
    </div>
</template>
<script>
    import pieChart from 'components/Charts/pieChart';
    import barChart from 'components/Charts/barChart';
    import {userLoginRank, userLoginTerminalPie} from "../../../../api/log/logApi";
    import {formatDate, formatDateTime} from "../../../../utils/dateUtil";

    export default {
        components: {
            pieChart, barChart
        },
        data() {
            return {
                topValue: 10,
                barData: [],
                barName: [],
                timeCondition: {
                    "type": "DATE",
                    "conditionName": "date",
                    "gteValue": "2017-06-05",
                    "lteValue": "2017-06-25"
                },
                optionValue: 1,
                dateRange: [],
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
            // this.dateRange.push(date);//90天前的时间
            // this.dateRange.push(new Date());//当前时间
            /*=========*/
            this.objDate.valStar=date;
            this.objDate.valEnd=new Date();
            this.setTimeCondition();
            this.search();
        },
        watch: {
            "topValue": "getUserLoginRank"
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
                this.getUserLoginRank();
                this.getUserLoginTerminalPie();
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
            //获取登陆排行的直方图数据
            getUserLoginRank() {
                userLoginRank(this.topValue, '', this.timeCondition).then(resp => {
                    this.barName = resp.data.xAxis.reverse();
                    this.barData = resp.data.yAxis.reverse();
                }).catch(err => {
                    console.log("获取登陆排行的数据出错：", err)
                });
            },
            //获取用户登陆终端的类型占比的
            getUserLoginTerminalPie() {
                userLoginTerminalPie(this.timeCondition).then(resp => {
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
        height: 530px;
        width: 48%;
        float: left;
        border: solid #6CA9CD 0.2px;
    }

    .log-pie-chart {
        margin-left: 30px;
    }
</style>

