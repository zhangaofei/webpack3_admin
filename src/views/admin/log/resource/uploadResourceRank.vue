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
                                    <el-button size="small" type="primary" style="width: 80px;height:35px">查询</el-button>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div style="width: 100%;min-height: 500px;">

                <div class="log-chart">
                    <barChart :data="barData" :keyName="barName" id="uploadResourceBar"></barChart>
                </div>

                <div class="log-chart log-pie-chart">
                    <pieChart :data="data" :legend="legend" title="上传文件格式占比" id="uploadResourcePie"></pieChart>
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
        props: {
            type: {//表格标题
                type: String,
                default: 'down'
            }
        },

        data(){
            return {

                dataRange:'',
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
