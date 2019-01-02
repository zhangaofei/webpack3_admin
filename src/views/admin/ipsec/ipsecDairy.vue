<template>

    <div>
        <div class="content-header">

            <h1>

                <small>

                </small>
            </h1>
            <ol class="breadcrumb " style="left:12px">
                <li><a ><i class="fa fa-gears"></i> Ipsec</a></li>
                <li class="active">ipsec日志</li>
            </ol>
        </div>
        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">ipsec日志</h3>
                        </div>
                        <!-- /.box-header  -->
                        <div class="box-body" style="padding-bottom: 21px !important">
                            <div class="box-tools pull-right" style="margin: 20px 16px 30px 0;">

                                <el-date-picker
                                        v-model="value4"
                                        type="daterange"
                                        :picker-options="pickerOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        align="right"
                                        style="margin-right: 10px;">
                                </el-date-picker>

                                <button class="btn btn-primary" type="button" @click="searchLog()" >
                                    <span>搜索</span>
                                </button>

                            </div>
                            <div class="row">
                                <div class="con_yj_infos">
                                    <!--
                                    <div v-for="item in this.log" :key="item" class="text item">
                                        {{item}}
                                    </div>
                                    -->
                                    <el-input type="textarea" :rows="28"  class="text item"
                                            v-model="this.log">
                                    </el-input>


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

    import {getIpsecDairy} from 'api/ipsec/ipsec';


    export default {
        components: {},
        data() {
            return {
                readOnly:false,
                pageId:68,
                log:'',

                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value4:[],
            }
        },
        created() {

        },
        methods: {

            searchLog() {

                if (this.value4 == "") {
                    this.$message({
                        type: 'warning',
                        message: '请选择日期范围！'
                    });
                } else {
                    var a = this.value4[0].toString().split(" ");
                    var b = this.value4[1].toString().split(" ");
                    var begin = a[1] + " " + a[2] + " " + a[4];
                    var end = b[1] + " " + b[2] + " " + "23:59:59";

                    var dto = {
                        begin: begin,
                        end: end
                    }
                    getIpsecDairy(dto).then((resp) => {
                        if (resp.status == 'SUCCESS') {
                            this.log = resp.data;

                            console.log(this.log);
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '获取日志信息失败！'
                            });
                        }
                    }).catch(e => {
                        console.log("获取日志出错", e);
                    });
                }
            }
        }
    }
</script>
<style>


    .con_yj_infos{
        line-height: 35px;
        padding-top: 9px;
    }

    .con_yj_infos02 td{
        height: 34px;
    }


    .con_yj_tb img{
        width:168px;
        border:0;

    }
    .con_yj_tb>span{
        position: absolute;
        /* top: 4px; */
        left:41px;
        color: #fff;
        font-size: 23px;

    }

    .con_yj_infos02 input{
        background-color: #eff0f3;
        border: 1px solid #dcdcdc;
        height: 28px;
        width: 100%;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding-left: 30px;
        padding-right: 30px;
    }



</style>
<style scoped>
    .btn-primary{
        width: 80px;
        height: 35px;
        padding: 0;
        margin: 0;
        align: center;
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
</style>
