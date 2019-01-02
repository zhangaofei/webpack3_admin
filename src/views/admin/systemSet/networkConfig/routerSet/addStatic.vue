<template>
    <div class="router public private">
        <el-dialog
                title="新建-静态路由"
                :visible.sync="addStaVisible"
                custom-class="rou_dialog"
                size="small"
                top="10%"
                @close="handleClose">
            <div  class="router-form" style="">
                <el-form :model="Radios" :rules="rules" ref="Radios" label-width="" class="demo-ruleForm" MultipartFile>
                    <el-table
                            ref="multipleTable"
                            :data="addStaRouter"
                            :header-cell-style="headerCellStyle"
                            border
                            tooltip-effect="dark"
                            style="width: 100%;max-height: 206px;overflow-y: scroll"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                label="目标地址"
                                align="center"
                        >
                            <template slot-scope="scope">
                                    <el-input v-model="scope.row.destinationAddress" @blur="ips(scope.row.destinationAddress)"  placeholder="目标地址" class="route_put ips"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="子网掩码"
                                align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.netMask"   placeholder="子网掩码" class="route_put netMasks" @blur="netMasks(scope.row.netMask)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="网关"
                                align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.gateway"   placeholder="网关" @blur="gateways(scope.row.gateway)" class="route_put gateways"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="Metric"
                                align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.metric"   placeholder="Metric" class="route_put metrics" @blur="metrics(scope.row.metric)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="接口"
                                align="center"
                                width="140"
                        >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.device" placeholder="接口"  style="width:104px" class="route_put">
                                    <el-option :label="polName" :value="polName" :key="polName" v-for="polName in polNames"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作" align="center" style="text-align: center" width="160">
                            <template slot-scope="scope">
                                <el-button
                                        size="small"
                                        class="btn_none_bg"
                                        @click="StaRouterAdd()"> <img src="../../../../../assets/addIcon/add.png">
                                </el-button>
                                <span v-if="addStaRouter.length != 1">
                                                <el-button
                                                        size="small"
                                                        class="btn_none_bg"
                                                        @click="StaRouterDel(scope.$index,scope.row)"><img src="../../../../../assets/addIcon/del.png">
                                            </el-button>
                                            </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('Radios')">
                        取消
                    </span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitStaRoute('Radios')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {notifyFault} from "utils/notify"
    import {addStaRoutes, getAllNetNameList} from "../../../../../api/systemSet/new_networkConfig/new_routerApi";
    export default{
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                Radios: {radio: 'ipv4'},
                isShow: false,
                hide: true,
                box: [],
                addStaRouter: [],
                addStaVisible: true,
                activeName: 'first',
                activeName2: 'one',
                activeName3: 'three',
                staList: [],
                polList: [],
                polNames: [],//储存device名
                currentData: null,
                multipleSelection: [],
                rules: {

                }
            }
        },
        created(){
            this.addStaRouter.push({
                ipType:this.Radios.radio,
                destinationAddress: '',
                netMask: '',
                gateway: '',
                metric: '',
                device: '',
            })
//                获取接口名称
            getAllNetNameList().then((resp)=>{
                this.polNames=resp.data
                console.log(resp,'NetName')

            }).catch(err=>{

            });
        },
        methods: {
            checkip(ip,netmak)
            {
                var ip1 = this.praseIpToBinary(ip);
                var ip2 = this.praseIpToBinary(netmak);
                var curArr = [ip1,ip2];
                var rs1 = this.binaryOr(ip1);
                var rs2 = this.binaryOr(ip2);
                var s = this.checkIpandNetmak(rs1,rs2);

                var q1=s[0]^s[1];
                var q2=s[0]^s[2];
                if(q1=="0"||q2==s[2]||q2=="0"||q1==s[2]){
                    //	alert("IP地址不合法");
                    return false;
                }else{
                    //	alert("IP地址合法");
                    return true;
                }
            },

            /* IP地址转换为二进制字符串 */
            /* 例如：172.16.4.235 --> 10101100000100000000010011101011 */
            praseIpToBinary(ipAddress){
                var numArray = ipAddress.split(".");
//                if(numArray.length != 4){
//                    alert("输入的IP有误");
//                    return;
//                }
                var returnIpStr = "";
                for (var i = 0; i < 4; i++) {
                    var curr_num = numArray[i];
                    var number_Bin = parseInt(curr_num);
                    number_Bin = number_Bin.toString(2);
                    var iCount = 8-number_Bin.length;
                    for (var j = 0; j < iCount; j++) {
                        number_Bin = "0"+number_Bin;
                    }
                    returnIpStr += number_Bin;
                }
                return returnIpStr;
            },
            //拆分字符串的每一位
            binaryOr(arr){
                var len1 = arr.length;
                var len2 = 0;
                var arrItem = "";
                var resultArr = new Array(len1);
                arrItem = arr;
                len2 = arrItem.length;
                for(var j = 0; j < len2; j++){
                    resultArr[j] =arrItem[j];
                }

                return resultArr;
            },
            //判断IP地址是否合法
            checkIpandNetmak(ip1,netmak){
                var n=0;
                var m=0;
                for(var i = 0; i < netmak.length; i++){
                    if(netmak[i]==0){
                        n=31-i;
                        m=i;
                        break;
                    }
                }
                var s='';
                var s1='';
                var s2='';
                for(var i = m; i < ip1.length; i++){
                    s=s+ip1[i];
                    s1=s1+'0';
                    s2=s2+'1';
                }
                var ss=[s,s1,s2];
                return ss;
            },
            ips(val){
                console.log($('.ips input').val(),'---==777')
                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(val)== false) {
                    this.$message({
                        type:'warning',
                        message:'请输入合法IP！'
                    })
                    return false;
                }else{
                    return true;
                }
            },
            netMasks(val){
                console.log($('.netMasks input').val(),'---==778')
                if (/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/.test(val)== false) {
                    this.$message({
                        type:'warning',
                        message:'请输入合法子网掩码！'
                    });
                    return false;
                } else{
                    return true;
                }
            },
            gateways(val){
                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(val)== false) {
                    this.$message({
                        type:'warning',
                        message:'请输入合法网关！'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            metrics(val){
                console.log($('.metrics input').val(),'---==779')
                if (/^[0-9]{1,4}$/.test(val)== false) {//0-9999
                    this.$message({
                        type:'warning',
                        message:'请输入合法Metric！'
                    })
                    return false;
                }else{
                    return true;
                }
            },
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addStaVisible = false
            },
//            ---------------静态路由本地 删除-增加 --------
            StaRouterAdd(){
                this.addStaRouter.push({
                    ipType:this.Radios.radio,
                    destinationAddress: '',
                    netMask: '',
                    gateway: '',
                    metric: '',
                    device: '',
                })
            },

            StaRouterDel(index,row){
                this.addStaRouter.splice(index,1)
            },

            resetForm(formName) {
                this.addStaVisible=false;
                this.$refs[formName].resetFields();
            },
            submitStaRoute(formName) {
                if(this.addStaRouter.length==0)
                {
                    this.$message({
                        type:'warning',
                        message:'请先新增一条静态路由!'
                    });
                }else
                {
                    if((this.metrics($('.metrics input').val()) && this.ips($('.ips input').val()) && this.netMasks($('.netMasks input').val()) && this.gateways($('.gateways input').val())) == false){
                        console.log(this.ips($('.ips input').val())||this.metrics($('.metrics input').val())||this.netMasks($('.netMasks input').val())||this.gateways($('.gateways input').val()),'foo2')
                        this.$message({
                            type:'warning',
                            message:'格式有错误!'
                        });
                    }else{
                        addStaRoutes(this.addStaRouter).then((resp)=>{
                            console.log(resp,'resp');
                            if(resp.extend.failCount <= 0){
                                this.$message({
                                    type:'success',
                                    message:'新建成功！'
                                });
                                this.addStaVisible=false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            }else{
                                if(resp.extend.tips&&resp.extend.tips.length>0){
                                    this.$message({
                                        type:'warning',
                                        message:resp.extend.tips[0]
                                    });
                                }else {
                                    this.$message({
                                        type:'warning',
                                        message:'新建失败!'
                                    });
                                }
                                var arr = [];
                                for (let i = 0; i < resp.extend.errorRow.length; i++){
                                    arr.push(this.addStaRouter[i]);
                                }
                                this.addStaRouter = arr;
                            }
                        }).catch(e=>{
                            console.log("新建出错",e);
                        });
                    }
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            chooseTab(tab, event) {
                console.log(tab, event);
            },
        }
    }
</script>
<style  scoped>
    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    /*.router .el-dialog--small {*/
        /*width: 1000px!important;*/
        /*height:780px!important;*/
    /*}*/
    /*.router  .el-dialog__title {*/
        /*!*line-height: 1;*!*/
        /*margin-left: 52px;*/
    /*}*/
    /*.el-dialog__footer {*/
        /*background-color: #E7E7E7;*/
        /*border-top: 1px solid #E7E7E7;*/
        /*height: 100px;*/
        /*border-bottom-right-radius: 4px;*/
        /*border-bottom-left-radius: 4px;*/
    /*}*/
    /*.router-form{*/
        /*margin-left:90px;*/
    /*}*/
    /*.router-form .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 490px!important;*/
        /*margin-left: 96px;*/
    /*}*/


    /*.router-form .user-select{*/
    /*flaot:left;*/
    /*margin-left: 305px;*/
    /*}*/

    /*.router-form .el-form-item__content .el-input .el-input__inner {*/
    /*width: 488px;*/
    /*}*/
    .router-form  .el_port>.el-input__inner{
        /*width: 350px;*/
    }

    /*.router-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width:135px ;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
    /*}*/


    /*.router-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.router-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 4px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 306px;*/
    /*}*/


    /*.form-user-select{*/
        /*min-width: 488px!important;*/
        /*width: 488px!important;*/
    /*}*/
    /*.router-form .el-select{*/
        /*!*width:488px;*!*/
    /*}*/
    /*.route_put{*/
        /*padding-top:5px ;*/
        /*padding-bottom: 5px;*/
    /*}*/

</style>
<style>
    /*.router .rou_dialog{*/
        /*min-width:950px;*/
    /*}*/
</style>