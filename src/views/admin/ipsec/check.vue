<template>
    <div class="ipsec public">
        <el-dialog
                title="ipsec隧道信息"
                :visible.sync="checkVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose"  @open="doInit(currentData)">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="border-top-color: #4392bf !important;">
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 21px !important">
                            <div class="row">
                                <div class="con_yj_infos">
                                    <table border="0" width="100%;">
                                        <tr>
                                            <td class="con_td01" id="t_name">链接名称:</td>
                                            <td class="con_td02" id="c_name">{{this.info.name}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_state">隧道状态:</td>
                                            <td class="con_td02" id="c_state">{{this.info.state==true?"正常":"停止"}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_local_addr">本地地址:</td>
                                            <td class="con_td02" id="c_local_addr">{{this.info.localAddr}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_remote_addr">远程地址:</td>
                                            <td class="con_td02" id="c_remote_addr">{{this.info.remoteAddr}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_alg">加密算法组:</td>
                                            <td class="con_td02" id="c_alg">{{this.info.alg}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_establish_time">隧道建立时间:</td>
                                            <td class="con_td02" id="c_establish_time">{{this.info.establish}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_keep_time">隧道持续时间：</td>
                                            <td class="con_td02" id="c_keep_time">{{this.info.keep}}</td>
                                        </tr>
                                        <tr>
                                            <td class="con_td01" id="t_reason">隧道建立失败原因：</td>
                                            <td class="con_td02" id="c_reason">{{this.info.state==true?"":this.info.reason}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div class='form-footer ' slot="footer"  ></div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {getIpsecInfo} from "api/ipsec/ipsec";
    import {getAllNetNameList} from "../../../api/systemSet/new_networkConfig/new_routerApi";
    export default{

        data(){
            return {

                info: {
                    name:'',
                    state:'',
                    localAddr:'',
                    remoteAddr:'',
                    alg:'',
                    establish:'',
                    keep:'',
                    reason:'',

                },
                checkVisible: true,
                activeName:'first',
            }
        },

        props: {
            currentData: Object
        },

        created(){
            this.doInit(this.currentData)
        },
        methods: {


            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            doTest() {
                this.checkVisible = true;
                console.log('doTest-admin', this.checkVisible)
            },

            changeStatus(){
                this.$emit("onChangeStatus")
            },




            doInit(currentData){
                var newdto = {id:currentData.id};

                getIpsecInfo(newdto).then((resp) => {
                    if (resp.status == 'SUCCESS') {
                        var data = resp.data;

                        this.info.name = data.name;
                        this.info.state = data.connection_state;
                        if (data.localInterface=='any'){
                            this.info.localAddr = "任何";
                        }else if (data.localInterface=='default'){
                            this.info.localAddr = "默认";
                        }else {
                            this.info.localAddr = data.localInterface;
                        }

                        if (data.remoteAddr=='any'){
                            this.info.remoteAddr = "任何";
                        }else {
                            this.info.remoteAddr = data.remoteAddr;
                        }
                        this.info.alg = this.doEsp(data.encryptionAlgIpsec,data.authAlgIpsec);
                        this.info.establish = data.establish_time;
                        this.info.keep = data.duration;
                        this.info.reason = data.reason;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '获取隧道详情失败！'
                        });
                    }
                }).catch(e => {
                    console.log("修改出错", e);
                });


            },

            doEsp(encryption,auth) {

                var esp = "";
                var encryption_alg = encryption.split(",");
                var auth_alg = auth.split(",");
                for (let i of encryption_alg) {
                    for (let j of auth_alg) {
                        esp = esp + i + "-" + j + ",";
                    }
                }
                esp = esp.substring(0, esp.length - 1);
                return esp;
            }


        },
    }
</script>
<style>
    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .ipsec .dialog {
        min-width: 830px;
    }

    .ipsec .el-dialog__header {
        pediting-left: 5px;
    }
    .con_yj_infos{
        line-height: 35px;
        padding-top: 9px;
    }

    .con_td01{
         padding-left: 63px;
         width: 23%;
     }
    .con_td02{
        /* padding-left: 155px; */
        width: 50%;
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
</style>