<template>
    <div class="router public">
        <el-dialog
                title="新建-链路聚合"
                :visible.sync="addVirnetVisible"
                custom-class="dialog public"
                top="10%"
                @close="handleClose">
            <el-tabs
                    v-model="activeName3"
                    type="border-card"
                    class="newAddDialog reset_validate_offset"
            >
                <el-tab-pane label="基础设置" name="1">
                    <div  class="router-form">
                        <el-form
                                :model="addVirNet"
                                :rules="rules"
                                label-width="110px"
                                ref="addVirNet"
                                MultipartFile>
                            <el-form-item label="接口名称" prop="device" class="el_lab">
                                <el-input v-model="addVirNet.device" class="el_put" placeholder="接口名称"></el-input>
                            </el-form-item>

                            <el-form-item label="汇聚接口" prop="slaverDevices" class="el_lab">
                                <el-select v-model="addVirNet.slaverDevicesArr" multiple placeholder="请选择" class="el_put">
                                    <el-option
                                            v-for="polName in polNames"
                                            :key="polName.device"
                                            :label="polName.device"
                                            :value="polName.device">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="连接方式" prop="connectType">
                                <el-select v-model="addVirNet.connectType" placeholder="连接方式" class="el_put">
                                    <el-option label="static" value="static" ></el-option>
                                    <el-option label="dhcp" value="dhcp" ></el-option>
                                </el-select>
                            </el-form-item>

                            <span v-if="addVirNet.connectType=='static'">
                                <el-form-item label="IP类型" prop="ipType">
                                    <el-select v-model="addVirNet.ipType" placeholder="IP类型" class="el_put">
                                        <el-option label="ipv4" value="ipv4" ></el-option>
                                        <el-option label="ipv6" value="ipv6" style="display: none"></el-option>
                                    </el-select>
                                </el-form-item>
                                <span v-if="addVirNet.ipType=='ipv4' || addVirNet.ipType == ''">
                                    <el-form-item label="ipv4" prop="staticIpv4Addr">
                                        <el-input v-model="addVirNet.staticIpv4Addr" @blur="IPCheck(addVirNet.staticIpv4Addr)" class="el_put" placeholder="ipv4"></el-input>
                                    </el-form-item>
                                    <el-form-item label="子网掩码"  prop="staticIpv4Netmask">
                                        <el-input v-model="addVirNet.staticIpv4Netmask" @blur="NetmaskCheck(addVirNet.staticIpv4Netmask)" class="el_put" placeholder="子网掩码"></el-input>
                                    </el-form-item>
                                    <el-form-item label="网关"  prop="staticIpv4Gateway">
                                        <el-input v-model="addVirNet.staticIpv4Gateway" @blur="GatewayCheck(addVirNet.staticIpv4Gateway)" class="el_put" placeholder="网关"></el-input>
                                    </el-form-item>
                                </span>
                                <span v-else>
                                    <el-form-item label="IPv6">
                                        <el-input v-model="addVirNet.staticIpv6Addr"  class="el_put" placeholder="IPv6"></el-input>
                                    </el-form-item>
                                    <el-form-item label="子网前缀长度"  prop="staticIpv6SubnetLength">
                                        <el-input v-model="addVirNet.staticIpv6SubnetLength"  class="el_put" placeholder="子网前缀长度"></el-input>
                                    </el-form-item>

                                    <el-form-item label="网关"  prop="staticIpv6Gateway">
                                        <el-input v-model="addVirNet.staticIpv6Gateway"  class="el_put" placeholder="网关"></el-input>
                                    </el-form-item>
                                </span>
                            </span>
                            <span v-else>
                                <el-form-item label="ipv4">
                                    <el-input v-model="addVirNet.staticIpv4Addr"  class="el_put" placeholder="     .       .       ." :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="子网掩码">
                                    <el-input v-model="addVirNet.staticIpv4Netmask"  class="el_put" placeholder="     .       .       ." :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="网关">
                                    <el-input v-model="addVirNet.staticIpv4Gateway"  class="el_put" placeholder="     .       .       ." :disabled="true"></el-input>
                                </el-form-item>
                            </span>
                            <el-form-item label="默认网关"   class="el_lab" v-if="addVirNet.staticIpv4Gateway">
                                <el-checkbox-group v-model="addVirNet.defaultGateway" >
                                    <el-checkbox label="是否为默认网关" ></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="默认网关"   class="el_lab" v-else>
                                <el-checkbox-group v-model="addVirNet.defaultGateway=addVirNet.staticIpv4Gateway==''?false:true" style="">
                                    <el-checkbox label="是否为默认网关" style="" :disabled="true"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="高级设置" name="2">
                    <div  class="router-form">
                        <el-form
                                :model="addVirNet"
                                :rules="rules"
                                ref="addVirNet"
                                label-width="110px"
                                class="demo-ruleForm"
                                MultipartFile>
                             <span v-if="addVirNet.interfaceMode=='auto' || addVirNet.interfaceMode == '自动侦测'">
                            <el-form-item label="MTU" prop="mtu"  class="el_lab">
                                <el-input v-model="addVirNet.mtu"  class="el_put" placeholder="接口名称" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="接口速率" prop="">
                                <el-select v-model="addVirNet.interfaceRate" placeholder="接口速率"   class="el_sel" :disabled="true">
                                    <el-option label="10M" value="10" ></el-option>
                                    <el-option label="100M" value="100" ></el-option>
                                    <el-option label="1000M" value="1000" ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="接口模式" prop=" interfaceMode">
                                <el-select v-model="addVirNet.interfaceMode" placeholder="接口模式" @change="ModeChange"  class="el_sel">
                                    <el-option label="全双工" value="full" ></el-option>
                                    <el-option label="半双工" value="half" ></el-option>
                                    <el-option label="自动侦测" value="auto" ></el-option>
                                </el-select>
                            </el-form-item>
                             </span>
                            <span v-else>
                                      <el-form-item label="MTU" prop="mtu"  class="el_lab">
                                <el-input v-model="addVirNet.mtu"  class="el_put" placeholder="接口名称"></el-input>
                            </el-form-item>
                                <span v-if="addVirNet.interfaceMode == 'half'">
                                    <el-form-item label="接口速率" prop="interfaceRate">
                                <el-select v-model="addVirNet.interfaceRate" placeholder="接口速率" class="el_sel">
                                    <el-option label="10M" value="10" ></el-option>
                                    <el-option label="100M" value="100" ></el-option>
                                    <el-option label="1000M" value="1000" :disabled="true" ></el-option>
                                </el-select>
                             </el-form-item>
                                </span>
                                <span v-else>
                                    <el-form-item label="接口速率" prop="interfaceRate">
                                <el-select v-model="addVirNet.interfaceRate" placeholder="接口速率" class="el_sel">
                                    <el-option label="10M" value="10" ></el-option>
                                    <el-option label="100M" value="100" ></el-option>
                                    <el-option label="1000M" value="1000" ></el-option>
                                </el-select>
                             </el-form-item>
                                </span>
                                <span v-if="addVirNet.interfaceRate == '1000' || addVirNet.interfaceRate == '1000M'">
                                       <el-form-item label="接口模式" prop=" interfaceMode">
                                <el-select v-model="addVirNet.interfaceMode" placeholder="接口模式" @change="ModeChange"  class="el_sel">
                                    <el-option label="全双工" value="full" ></el-option>
                                    <el-option label="半双工" value="half" :disabled="true"></el-option>
                                    <el-option label="自动侦测" value="auto" ></el-option>
                                </el-select>
                            </el-form-item>
                                </span>
                                <span v-else>
                                        <el-form-item label="接口模式" prop=" interfaceMode">
                                <el-select v-model="addVirNet.interfaceMode" placeholder="接口模式" @change="ModeChange"  class="el_sel">
                                    <el-option label="全双工" value="full" ></el-option>
                                    <el-option label="半双工" value="half" ></el-option>
                                    <el-option label="自动侦测" value="auto" ></el-option>
                                </el-select>
                            </el-form-item>
                                </span>
                            </span>
                            <span v-if="addVirNet.connectType=='adsl'">
                                <el-form-item label="超时时间" prop="adslTimeout"  class="el_lab">
                                    <el-input v-model="addVirNet.adslTimeout"  class="el_put" placeholder="超时时间"></el-input>
                                </el-form-item>
                                <el-form-item label="掉线检测">
                                    <el-checkbox-group v-model="addVirNet.adslActiveCheck" style="margin-left:158px">
                                        <el-checkbox label="启用"  ></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <div v-if="addVirNet.adslActiveCheck==true">
                                    <el-form-item label="握手时间" prop="adslConnInterval"  class="el_lab">
                                        <el-input v-model="addVirNet.adslConnInterval"  class="el_put" placeholder="握手时间"></el-input>
                                    </el-form-item>
                                    <el-form-item label="尝试次数" prop="adslConnNumb"  class="el_lab">
                                        <el-input v-model="addVirNet.adslConnNumb"  class="el_put" placeholder="尝试次数"></el-input>
                                    </el-form-item>
                                </div>
                            </span>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addVirNet')">
                        取消
                    </span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitVirnet('addVirNet')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
    import {mapGetters} from 'vuex'
    import {addVirtaulNet, getPhyNetNameList} from "../../../../../api/systemSet/new_networkConfig/new_interfaceApi";

    export default{
        components: {
        },
        data(){
            var ips = (rule, value, callback) => {
                    if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                        callback(new Error("请输入正确的IP地址"));
                    } else if(value == '0.0.0.0' || value == '255.255.255.255'){
                        callback(new Error("请输入正确的IP地址"));
                    } else {
                        callback();
                    }
            };
            var netMask = (rule, value, callback) => {
                    if (/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/.test(value) == false){
                        callback(new Error("请输入正确的子网掩码"));
                    } else {
                        callback();
                    }
            };
            var gateway = (rule, value, callback) => {
                if (!value){
                    callback();
                }  else {
                    if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                        callback(new Error("请输入正确的网关"));
                    } else {
                        callback();
                    }
                }
            };
            var name = (rule, value, callback) =>
            {
                if (/^[A-Za-z0-9]{1,20}$/.test(value) == false) {
                    callback(new Error("请输入英文、数字"));
                } else {
                    callback();
                }
            };
            var mturange = (rule, value, callback) =>
            {
                if(!value){
                    callback();
                } else {
                    if(/^[1-9]{1}\d{0,5}$/.test(value) == false) {
                        callback(new Error("请输入1~999999之间的数字"));
                    } else {
                        callback();
                    }
                }
            };
            return {
                    rules:{
                        device:[
                            {required: true, validator: name, trigger:'blur'}
                        ],
                        slaverDevices:[
                            {required:true, trigger:'blur'}
                        ],
                        staticIpv4Addr :[
                            {required: true, validator: ips, trigger:'blur'}
                        ],
                        staticIpv4Netmask :[
                            {required: true, validator: netMask, trigger:'blur'}
                        ],
                        staticIpv4Gateway :[
                            {validator: gateway, trigger:'blur'}
                        ],
                        mtu :[
                            {validator: mturange, trigger:'blur'}
                        ],
                        connectType: [
                            {required: true, message: '请输入连接方式', trigger: 'blur'}
                        ]
                    },
                editVirChecked:false,
                phylist:[],
                physicalList:[],
                virtualList:[],
                netInfoList:[],
                polNames:[],
                addVirNet:{
                    isCreateMode:true,
                    slaverDevicesArr:[],
                    slaverDevices:'',
                        device:'',
                        connectType:'static',
                        ipType:'ipv4',
                        staticIpv4Addr:'',
                        staticIpv4Netmask:'',
                        staticIpv4Gateway:'',
                        staticIpv6Addr:'',
                        staticIpv6SubnetLength:'',
                        staticIpv6Gateway:'',
                        staticIpv6FirstDns:'',
                        staticIpv6SecondDns:'',
                        defaultGateway: '',
                        adslUsername:'',
                        adslPwd:'',
                        adslTimeout:'',
                        adslActiveCheck:'',
                        adslConnInterval:'',
                        adslConnNumb:'',
                        mtu:'auto',
                        interfaceRate:'auto',
                        interfaceMode:'auto',
                        virtualInterface:1
                },
                addVirnetVisible:true,
                activeName:'first',
                activeName2:'one',
                activeName3:'1',
                multipleSelection: [],
                ipCheck:true,
                netCheck:true,
                gatewayCheck:true
            }
        },
        created(){
            this.getNetName()
        },
        methods: {
            ModeChange(){
                if(this.addVirNet.interfaceMode == 'auto' || this.addVirNet.interfaceMode == '自动侦测'){
                    this.addVirNet.mtu = 'auto';
                    this.addVirNet.interfaceRate = 'auto';
                } else if(this.addVirNet.interfaceMode == 'full' || this.addVirNet.interfaceMode == '全双工'){
                    this.addVirNet.mtu = 1500;
                    this.addVirNet.interfaceRate = '1000M';
                } else if(this.addVirNet.interfaceMode == 'half' || this.addVirNet.interfaceMode == '半双工'){
                    this.addVirNet.mtu = 1500;
                    this.addVirNet.interfaceRate = '100M';
                }
            },
            IPCheck(value){
                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                    return false;
                } else if(value == '0.0.0.0' || value == '255.255.255.255'){
                    return false;
                } else {
                    return true;
                }
            },
            NetmaskCheck(value){
                if (/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/.test(value) == false){
                    return false;
                } else {
                    return true;
                }
            },
            GatewayCheck(value){
                if (!value){
                    return true;
                }  else {
                    if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                        return false;
                    } else {
                        return true;
                    }
                }
            },
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
                //alert(s^s1);
                //alert(s^s2);
                /*var q1=s^s1;
                 var q2=s^s2;
                 if(q1=="0"||q2==s2||q2=="0"||q1==s2){
                 alert("IP地址不合法");
                 }else{
                 alert("IP地址合法");
                 }*/
                var ss=[s,s1,s2];
                return ss;
            },
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
            },
            getNetName(){
                getPhyNetNameList().then((resp)=>{
                    this.polNames=resp.data
                    console.log(resp,'getPhyNetNameList')

                }).catch(err=>{

                });
            },
//------------------------------------------------------------------
            resetForm(formName) {
                this.addVirnetVisible=false;
                this.activeName3='1';
                this.$refs[formName].resetFields();
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            valided(){
                if(/^[A-Za-z0-9]{1,20}$/.test(this.addVirNet.device) == false){
                    this.$message({
                        type: 'warning',
                        message: '接口名称只能输入英文、数字！'
                    });
                    return false
                }
                return true
            },
            submitVirnet(formName){
                if(this.addVirNet.mtu == 'auto'){
                    this.addVirNet.mtu = 1500
                }
                if(this.addVirNet.interfaceRate =='10M')
                {
                    this.addVirNet.interfaceRate = '10'
                }
                else if(this.addVirNet.interfaceRate =='100M')
                {
                    this.addVirNet.interfaceRate ='100'
                }
                else if(this.addVirNet.interfaceRate =='1000M')
                {
                    this.addVirNet.interfaceRate ='1000'
                }else if(this.addVirNet.interfaceRate =='auto'){
                    this.addVirNet.interfaceRate ='100'
                }
                this.ipCheck = this.IPCheck(this.addVirNet.staticIpv4Addr);
                this.netCheck = this.NetmaskCheck(this.addVirNet.staticIpv4Netmask);
                this.gatewayCheck = this.GatewayCheck(this.addVirNet.staticIpv4Gateway);
                var result = this.checkip(this.addVirNet.staticIpv4Addr, this.addVirNet.staticIpv4Netmask);
                if ( (!this.ipCheck || !this.netCheck || !this.gatewayCheck) && this.addVirNet.connectType != 'dhcp' ){
                    this.$message({
                        type: 'warning',
                        message: '数据填写不正确，请重新填写!'
                    });
                } else if (result == false && this.addVirNet.connectType == 'static'){
                    this.$message({
                        type: 'warning',
                        message: '输入的IP地址和子网掩码不匹配!'
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if(this.valided()){
                                if(this.addVirNet.interfaceRate == '100M'){
                                    this.addVirNet.interfaceRate = 100;
                                }
                                if(this.addVirNet.interfaceMode == '全双工'){
                                    this.addVirNet.interfaceMode = 'full'
                                }
                                this.addVirNet.slaverDevices = this.addVirNet.slaverDevicesArr.join(';')
                                console.log('新增的slaverDevice:',this.addVirNet.slaverDevices)
                                addVirtaulNet(this.addVirNet).then((resp) =>{
                                    console.log(resp,'resp')
                                    if(resp.status == 'SUCCESS'){
                                        this.getNetName();
                                        this.$message({
                                            type: 'success',
                                            message: '虚拟接口新建成功!'
                                        });
                                        this.$emit('onChangeStatus');
                                        this.$refs[formName].resetFields();
                                        this.addVirnetVisible = false;
                                    }else {
                                        if (resp.code == 'MSG_B0367'){
                                            this.$message({
                                                type: 'warning',
                                                message: '当前网卡已被聚合,不允许被修改!'
                                            });
                                        }else {
                                            this.$message({
                                                type: 'warning',
                                                message: resp.code.info
                                            });
                                        }
                                    }
                                }).catch(err=>{

                                });
                            }

                        }else {
                            return false;
                        }
                    });
                }
            }
        }
    }
</script>
<style>
.public .reset_validate_offset .el-form-item__error{
    margin-left: 130px;
}

</style>
