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
                <li><a ><i class="fa fa-gears"></i> 系统维护</a></li>
                <li class="active">系统健康报告</li>
            </ol>
        </div>
        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">系统健康报告</h3>
                            <!--硬件信息-->
                        </div>
                        <div class="box-body padding_table" style="padding-bottom: 21px !important; padding-left: 60px !important; padding-right: 100px !important;">
                            <div class="row">
                                <div flex="main:justify cross:center" style="padding-top: 20px;">
                                    <p style="margin:0; line-height: 1; font-size: 16px;">报告信息</p>
                                    <div class="example_circle">
                                        <span class="sp_green sp_crile" style="display: inline-block;"></span>
                                        <span style="margin-right: 20px;">正常</span>
                                        <span class="sp_red sp_crile" style="display: inline-block;"></span>
                                        <span>异常</span>
                                    </div>
                                </div>
                                <div class="div_report" style="margin-left: 44px;margin-bottom: 44px;">
                                    <table border="1" width="100%;">
                                        <tr>
                                            <th>名称</th>
                                            <th>状态</th>
                                        </tr>
                                        <tr v-for="(val,key) in objs">
                                            <td>{{key}}</td>
                                            <td>
                                                <span class="sp_green sp_crile " v-if="val=='OK'"></span>
                                                <span class="sp_red sp_crile " v-else></span>
                                            </td>
                                        </tr>
                                    </table>
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
    import {getHeathList} from "../../../../api/sysMaintain/syshealthReport";
    export default {
        data(){
            return{
                objs:{}
            }
        },
        created(){
            this.getList();
        },
        methods:{
            getList(){
                getHeathList({defaultVlaue:'0'}).then(resp=>{
                    if(resp.status=='SUCCESS'){
                        this.objs=resp.data;
                        for(let key in this.objs){
                           console.log(key,this.objs[key],'key')
                        }


            }
                }).catch(err=>{

                })
            },
        }
    }
</script>

<style lang="scss">

    .div_report{
        margin-top: 30px;
        table{
            border: 1px solid #DCDFE6;
            width: 100%;
            tr{
                line-height: 59px;
                text-align: center;
                th{
                    text-align: center;
                }
                td{
                    color: #73778c;
                }
                td:nth-of-type(2n+1){
                    width: 30%;
                }
                td:nth-of-type(2n){
                    /*width: 30%;*/
                }
            }
            tr:nth-of-type(2n+1){
                background-color: #eef1f6;
                td:nth-of-type(2),th:nth-of-type(2){
                    background-color: #FCFCFC;
                }
            }
            tr:nth-of-type(2n){
                background-color: #FCFCFC;
            }
        }
    }


    /*table > tr .con_td01{*/
        /*background-color: #eef1f6;*/
        /*text-align: center;*/
        /*padding-left: 0;*/
        /*border-left: 0;*/
    /*}*/

    /*table > tr .con_td02{*/
        /*text-align: center;*/

    /*}*/


    /*table > tr:nth-of-type(2n) td.con_td01{*/
        /*background-color: #FCFCFC;*/
        /*width: 30%;*/
    /*}*/
</style>
<style scoped lang="scss">
    table tr .sp_red,.example_circle .sp_red{
        background: red;
        background: url('../../../../assets/addIcon/serial_disabled.png');
        width: 28px;
        height: 28px;
        display: inline-block;
        vertical-align: middle;
    }
    table tr .sp_green,.example_circle .sp_green{
        background: green;
        background: url('../../../../assets/addIcon/serial_enabled.png');
        width: 28px;
        height: 28px;
        display: inline-block;
        vertical-align: middle;
    }
</style>