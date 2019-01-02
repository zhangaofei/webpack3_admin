<template>
    <div>
        <div>
            <!------------------------------------------------------>
            <div style="width: 100%;min-height: 500px;">

                <div class="log-chart" style="height: 520px">
                    <div >
                        <span style=" background-color: transparent" class="rank-top">
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
                    <div style=";height: 500px" >
                        <barChart :data="barData" :keyName="barName" id="userFlowBar"></barChart>
                    </div>

                </div>

                <div class="log-chart log-pie-chart" style="height: 520px">
                    <pieChart :data="pieData" :legend="legend" title="用户组流量占比" id="userFlowPie"></pieChart>
                </div>

            </div>

        </div>
    </div>
</template>


<script>

    import pieChart from 'components/Charts/pieChart';
    import barChart from 'components/Charts/barChart';
    import {trafficPie, trafficRank, userLoginRank} from "../../../../api/log/logApi";

    export default{
        components: {
            pieChart,
            barChart
        },
        data(){
            return {
                topValue:10,
                dataRange:'',
                timeCondition:{
                    "type": "DATE",
                    "conditionName": "date",
                    "gteValue": "2000-06-05",
                    "lteValue": "2087-06-25",
                    "timeZone": "+08:00"
                },
                barData:[],
                barName:[],

                pieData:[],
                legend: [],

                listLoading: true,
            }
        },
        computed:{

        },
        created(){
            this.search();
        },
        watch: {//深度 watcher
            "topValue":"getUserTrafficRank"
        },
        methods: {
            search(){
                console.log("查询得到的时间：",this.dateRange);

//                let date1=formatDate(this.dateRange[0]);
//
//                let date2=formatDate(this.dateRange[2]);

                //  console.log("转换后的日期：",date1,date2);


                if(this.dateRange!=null&&this.dateRange!=''){
                    this.timeCondition.gteValue=this.dateRange[0];
                    this.timeCondition.lteValue=this.dateRange[1];
                }

                this.getUserTrafficRank();
                this.getUserTrafficPie();

            },

            //获取用户流量排行的直方图数据
            getUserTrafficRank(){
                trafficRank("user",this.topValue,this.timeCondition).then(resp=>{
                    //console.log("获取用户流量排行的数据：",resp);
                    let name=[];
                    let data=[];
                    for(let item in resp.data){
                        name.push(item);
                        data.push(resp.data[item])
                    }

//                    console.log("获取的用户流量用户：",name);
//                    console.log("获取的用户流量数据：",data);
                    this.barName=name;
                    this.barData=data;
                }).catch(err=>{
                    console.log("获取用户流量排行的数据出错：",err)
                });
            },

            //获取用户组流量占比
            getUserTrafficPie(){
                trafficPie("user",this.timeCondition).then(resp=>{
//                    console.log("获取用户组流量占比：",resp)
                    let legend=[];
                    let data=[];
                    for(let item in resp.data){
                        legend.push(item);
                        data.push({
                            value:resp.data[item],
                            name:item
                        })
                    }
                    this.legend=legend;
                    this.pieData=data;

                }).catch(err=>{
                    console.log("获取用户登陆终端的类型占比数据出错：",err)
                })
            }
        }
    }

</script>


<style>

    .log-chart,pie-chart{
        height: 490px;
        width: 48%;
        float:left;
        border: solid #6CA9CD 0.2px;
    }

    .log-pie-chart{
        margin-left: 30px;
    }

</style>

