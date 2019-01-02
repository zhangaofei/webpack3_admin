<template>
    <div class="router public">
        <el-dialog
                title="新建-桥接模式"
                :visible.sync="addBridgeVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="基础设置" name="1">
                    <div  class=" bridge_form">
                        <el-form :model="addBrigeObj" :rules="rules" ref="addBrigeObj" label-width="95px" class="demo-ruleForm" MultipartFile>
                            <el-form-item label="接口名称"  prop="device"  class="el_lab">
                                <el-input v-model="addBrigeObj.device"  class="el_put" placeholder="接口名称"></el-input>
                            </el-form-item>
                            <el-form-item label="桥接接口" prop="slaverDevicesArr"  class="el_lab">
                                <el-checkbox-group v-model="addBrigeObj.slaverDevicesArr" style="" >
                                    <el-checkbox :label="polName.device" :key="polName.device" style="" v-for="(polName,index) in polNames">{{polName.device}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="接口状态" prop="deviceStatus"  class="el_lab">
                                <el-input v-model="addBrigeObj.deviceStatus"  class="el_put" placeholder="接口状态" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="MAC地址" prop="hwaddr"  >
                                <el-input v-model="addBrigeObj.hwaddr"  class="el_put" placeholder="MAC地址" :disabled="true"></el-input>
                            </el-form-item>
                            <!--<span v-if="addBrigeObj.connectType=='static'">-->
                                <el-form-item label="IP类型" prop="ipType">
                                    <el-select v-model="addBrigeObj.ipType" placeholder="IP类型" class="el_put">
                                        <el-option label="ipv4" value="ipv4" ></el-option>
                                        <!--<el-option label="ipv6" value="ipv6" style="display: none"></el-option>-->
                                    </el-select>
                                </el-form-item>
                                <!--<span v-if="addBrigeObj.ipType=='ipv4' || addBrigeObj.ipType == ''">-->
                                    <el-form-item label="ipv4" prop="staticIpv4Addr">
                                        <el-input v-model="addBrigeObj.staticIpv4Addr"  class="el_put" placeholder="ipv4"></el-input>
                                    </el-form-item>
                                    <el-form-item label="子网掩码"  prop="staticIpv4Netmask">
                                        <el-input v-model="addBrigeObj.staticIpv4Netmask"  class="el_put" placeholder="子网掩码"></el-input>
                                    </el-form-item>
                                    <el-form-item label="网关"  prop="">
                                        <el-input v-model="addBrigeObj.staticIpv4Gateway"  class="el_put" placeholder="网关"></el-input>
                                    </el-form-item>
                                <!--</span>-->
                            <!--</span>-->
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span @click="resetForm('addBrigeObj')" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitBridge('addBrigeObj')">
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
    import {addVirtaulNet, getPhyNetNameList,getBridgeAdd} from "../../../../../api/systemSet/new_networkConfig/new_interfaceApi";

    export default{
        components: {

        },
        data(){
            var ips = (rule, value, callback) => {
                if(!value){
                    callback();
                } else if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                    callback(new Error("请输入正确的IP地址"));
                } else if(value == '0.0.0.0' || value == '255.255.255.255'){
                    callback(new Error("请输入正确的IP地址"));
                } else {
                    callback();
                }
            };
            var netMask = (rule, value, callback) => {
                if(!value){
                    callback();
                } else if (/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/.test(value) == false){
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
            var inter = (rule, value, callback) =>
            {
                console.log('value:', value.length);
                    if(value.length == 0 || value.length == null) {
                        callback(new Error("请输入桥接接口"));
                    } else {
                        callback();
                    }
            };
            return {
                rules:{
                    device:[
                        {required: true, validator: name, trigger:'blur'}
                    ],
                    slaverDevicesArr:[
                        {required:true, validator: inter, trigger:'blur'}
                    ],
                    staticIpv4Addr :[
                        { validator: ips, trigger:'blur'}
                    ],
                    staticIpv4Netmask :[
                        {validator: netMask, trigger:'blur'}
                    ],
                    staticIpv4Gateway :[
                        {required: true,validator: gateway, trigger:'blur'}
                    ],
                    mtu :[
                        {validator: mturange, trigger:'blur'}
                    ],
                    connectType: [
                        {required: true, message: '请输入连接方式', trigger: 'blur'}
                    ],
                    ipType: [
                        {required: true, message: '请输入IP类型', trigger: 'blur'}
                    ]
                },
                virtualList:[],
                netInfoList:[],
                polNames:[],
                addBrigeObj:{
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
                    mtu:1500,
                    interfaceRate:'',
                    interfaceMode:'',
                    virtualInterface:2
                },
                addBridgeVisible:true,
                activeName:'1',
                multipleSelection: [],
            }
        },
        created(){
            this.getNetName()
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
            handleClose() {
                this.$emit("onChangeStatus");
            },

            getNetName(){
                getPhyNetNameList().then((resp)=>{
                    this.polNames=resp.data
                }).catch(err=>{

                });
            },
            resetForm(formName) {
                this.addBridgeVisible=false;
                this.activeName3='1';
                this.$refs[formName].resetFields();
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            submitBridge(formName){
                var result = true;
                if(this.addBrigeObj.staticIpv4Addr != '' || this.addBrigeObj.staticIpv4Netmask != ''){
                     result = this.checkip(this.addBrigeObj.staticIpv4Addr, this.addBrigeObj.staticIpv4Netmask);
                }
                if (result == false && this.addBrigeObj.connectType == 'static'){
                    this.$message({
                        type: 'warning',
                        message: '输入的IP地址和子网掩码不匹配!'
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.addBrigeObj.slaverDevices = this.addBrigeObj.slaverDevicesArr.join(';')
                            console.log('新增的slaverDevice:',this.addBrigeObj.slaverDevices)
                            getBridgeAdd(this.addBrigeObj)
                                    .then((resp) =>{
                                        console.log(resp,'resp--bridge',this.addBrigeObj)
                                        if(resp.status == 'SUCCESS'){
                                            this.getNetName();
                                            this.$message({
                                                type: 'success',
                                                message: '虚拟接口新建成功!'
                                            });
                                            this.$emit('onChangeStatus');
                                            this.$refs[formName].resetFields();
                                            this.addBridgeVisible = false;
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
    /*.router-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width:135px ;*/
        /*font-size: 15px;*/
        /*margin-left: 78px;*/
    /*}*/
    /*.router-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0;*/
        /*position: absolute;*/
        /*top: 90%;*/
        /*left: 100px;*/
    /*}*/
</style>
