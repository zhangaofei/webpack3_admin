<template>
    <div>
        <div>
            <div class="row" style="margin-bottom:8px;">
                <div class="logForm">
                    <div style="float:left;margin-left: 20px">
                        <div class="block0">
                            <label>
                                <el-date-picker
                                        v-model="dataRange"
                                        type="daterange"
                                        size="small"
                                        style="margin-left: 0px;height: 35px;"
                                        placeholder="选择日期范围">
                                </el-date-picker>
                                <span style="margin-left: 30px">
                                    <el-button size="small" type="primary" style="width: 80px;height:35px;">查询</el-button>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div style="width: 100%;min-height: 500px;">

                <div class="log-chart" style="height: 520px">
                    <div >
                        <span style="" class="rank-top">
                            用户登录排行榜
                        </span>
                        <span class="rank-top" style="margin-left: 5px;padding: 0px">
                            <el-select v-model="value" placeholder="请选择">
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
                        <barChart :data="barData" :keyName="barName" id="downloadResourceBar"></barChart>
                    </div>

                </div>

                <div class="log-chart log-pie-chart" style="height: 520px">
                    <pieChart :data="data" :legend="legend" title="下载文件格式占比" id="downloadResourcePie"></pieChart>
                </div>

            </div>

        </div>
    </div>
</template>


<script>

    import pieChart from 'components/Charts/pieChart';
    import barChart from 'components/Charts/barChart';

    export default{
        components: {
            pieChart,
            barChart
        },
        data(){
            return {
                dataRange:[],
                barData:[],
                barName:[],
                data:[],
                legend:[],
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 20,
                    total:0,
                    isAdmin: '',
                    display_name: '',
                    phone: '',
                    name: '',
                    searchContent:null
                },
                groupList:[],
                currentView:'',
                currentUser:''
            }
        },
        computed:{

        },
        created(){

        },
        watch: {//深度 watcher
        },
        methods: {

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

