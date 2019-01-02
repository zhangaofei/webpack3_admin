<template>
    <div class="router public">
        <el-dialog
                title="编辑物理接口"
                :visible.sync="editVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentPhy)"
        >
            <el-tabs v-model="activeName2" type="card" @tab-click="chooseTab">
                <el-tab-pane label="基础设置" name="one">
                    <div  class="router-form">
                        <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="142px" class="demo-ruleForm">
                            <el-form-item label="接口名称"  class="el_lab">
                                <el-input v-model="editInfo.device"  class="el_put" placeholder="请输入接口名称" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="接口状态"  class="el_lab">
                                <el-input v-model="editInfo.deviceStatus"  class="el_put" placeholder="请输入接口状态" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="MAC地址" class="el_lab">
                                <el-input v-model="editInfo.hwaddr"  class="el_put" placeholder="请输入MAC地址" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="连接方式" prop="connectType">
                                <el-select v-model="editInfo.connectType" placeholder="连接方式" @change="changeConnectType"   class="el_put">
                                    <el-option label="STATIC" value="static" ></el-option>
                                    <el-option label="DHCP" value="dhcp" ></el-option>
                                </el-select>
                            </el-form-item>
                            <span v-if="editInfo.connectType == 'static'">
                                 <el-form-item label="IP类型" prop="ipType" >
                                    <el-select v-model="editInfo.ipType" placeholder="IP类型"   class="el_sel">
                                        <el-option label="IPv4" value="ipv4" ></el-option>
                                        <el-option label="IPv6" value="ipv6" style="display: none"></el-option>
                                    </el-select>
                                </el-form-item>
                                <span v-if="editInfo.ipType == 'ipv4'">
                                    <el-form-item label="IPv4" prop="" ref="itemIpv4Addr" class="item_mark">
                                        <el-input v-model.trim="editInfo.staticIpv4Addr" @blur="IPCheck(editInfo.staticIpv4Addr)" class="el_put" placeholder="请输入应用参数"></el-input>
                                    </el-form-item>
                                    <el-form-item label="子网掩码" prop="" ref="itemIpv4Netmask" class="item_mark">
                                        <el-input v-model.trim="editInfo.staticIpv4Netmask" @blur="NetmaskCheck(editInfo.staticIpv4Netmask)" class="el_put" placeholder="请输入应用参数"></el-input>
                                    </el-form-item>
                                    <el-form-item label="网关" prop="staticIpv4Gateway">
                                        <el-input v-model="editInfo.staticIpv4Gateway" @blur="GatewayCheck(editInfo.staticIpv4Gateway)" class="el_put" placeholder="请输入应用参数"></el-input>
                                    </el-form-item>
                                </span>
                                <span v-else>
                                    <el-form-item label="IPv6">
                                        <el-input v-model.trim="editInfo.staticIpv6Addr"  class="el_put" placeholder="请输入应用参数"></el-input>
                                    </el-form-item>
                                    <el-form-item label="子网掩码">
                                        <el-input v-model="editInfo.staticIpv6SubnetLength"  class="el_put" placeholder="请输入应用参数"></el-input>
                                    </el-form-item>
                                    <el-form-item label="网关">
                                        <el-input v-model="editInfo.staticIpv6Gateway"  class="el_put" placeholder="请输入应用参数"></el-input>
                                    </el-form-item>
                                </span>
                            </span>
                            <span v-if="editInfo.connectType == 'dhcp'">
                                <el-form-item label="IP类型" prop="ipType">
                                    <el-select v-model="editInfo.ipType" placeholder="IP类型"  class="el_sel" :disabled="true">
                                        <el-option label="IPv4" value="ipv4" ></el-option>
                                        <el-option label="IPv6" value="ipv6" style="display: none"></el-option>
                                    </el-select>
                                </el-form-item>
                                <span v-if="editInfo.ipType == 'ipv4'">
                                    <el-form-item label="IPv4" >
                                        <el-input v-model.trim="editInfo.staticIpv4Addr"  class="el_put" placeholder="     .       .       ." :disabled="true"></el-input>
                                    </el-form-item>
                                    <el-form-item label="子网掩码">
                                        <el-input v-model.trim="editInfo.staticIpv4Netmask"  class="el_put" placeholder="     .       .       ." :disabled="true"></el-input>
                                    </el-form-item>
                                    <el-form-item label="网关">
                                        <el-input v-model.trim="editInfo.staticIpv4Gateway"  class="el_put" placeholder="     .       .       ." :disabled="true"></el-input>
                                    </el-form-item>
                                </span>
                                <span v-else>
                                    <el-form-item label="IPv6">
                                        <el-input v-model.trim="editInfo.staticIpv6Addr"  class="el_put" placeholder="请输入应用参数" :disabled="true"></el-input>
                                    </el-form-item>
                                    <el-form-item label="子网掩码">
                                        <el-input v-model.trim="editInfo.staticIpv6SubnetLength"  class="el_put" placeholder="请输入应用参数" :disabled="true"></el-input>
                                    </el-form-item>
                                    <el-form-item label="网关">
                                        <el-input v-model.trim="editInfo.staticIpv6Gateway"  class="el_put" placeholder="请输入应用参数" :disabled="true"></el-input>
                                    </el-form-item>
                                </span>
                            </span>

                            <el-form-item label="默认网关" v-if="editInfo.staticIpv4Gateway">
                                <el-checkbox-group v-model="editInfo.defaultGateway" style="">
                                    <el-checkbox label="是否为默认网关" ></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="默认网关" v-else>
                                <el-checkbox-group v-model="editInfo.defaultGateway=editInfo.staticIpv4Gateway==''?false:true" style="">
                                    <el-checkbox label="是否为默认网关" :disabled="true"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="高级设置" name="two">
                    <div  class="router-form">
                        <el-form :model="editInfo" :rules="rules2" ref="editInfo" label-width="142px" class="demo-ruleForm" MultipartFile>
                            <span v-if="editInfo.connectType=='adsl'">
                                <el-form-item label="超时时间" prop="adslTimeout"  class="el_lab">
                                    <el-input v-model="editInfo.adslTimeout"  class="el_put" placeholder="请输入超时时间"></el-input>
                                </el-form-item>
                                <el-form-item label="掉线检测"  >
                                    <el-checkbox-group style="margin-left:158px" v-model="editInfo.adslActiveCheck">
                                        <el-checkbox label="启用"></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <div v-if="editInfo.adslActiveCheck==true">
                                    <el-form-item label="握手时间" class="el_lab">
                                        <el-input v-model="editInfo.adslConnInterval"  class="el_put" placeholder="请输入握手时间"></el-input>
                                    </el-form-item>
                                    <el-form-item label="尝试次数" class="el_lab">
                                        <el-input v-model="editInfo.adslConnNumb"  class="el_put" placeholder="请输入尝试次数"></el-input>
                                    </el-form-item>
                                </div>
                                <el-form-item label="MTU" class="el_lab" prop="mtu">
                                    <el-input v-model="editInfo.mtu"  class="el_put" placeholder="请输入应用参数"></el-input>
                                </el-form-item>
                                <el-form-item label="接口速率">
                                    <el-select v-model="editInfo.interfaceRate" placeholder="接口速率"   class="el_put">
                                        <el-option label="10M" value="10" ></el-option>
                                        <el-option label="100M" value="100" ></el-option>
                                        <el-option label="1000M" value="1000" ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="接口模式">
                                    <el-select v-model="editInfo.interfaceMode" placeholder="接口模式"   class="el_put">
                                        <el-option label="全双工" value="full" ></el-option>
                                        <el-option label="半双工" value="half" ></el-option>
                                    </el-select>
                                </el-form-item>
                            </span>
                            <span v-else>
                                <span v-if="editInfo.interfaceMode == 'auto' || editInfo.interfaceMode == '自动侦测'">
                                <el-form-item label="MTU" class="el_lab" prop="mtu" >
                                    <el-input v-model="editInfo.interfaceMode == 'auto' ? 'auto' : editVirNet.mtu"  class="el_put" placeholder="请输入应用参数" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="接口速率" >
                                    <el-select v-model="editInfo.interfaceMode == 'auto' ? 'auto' : editVirNet.interfaceRate" placeholder="接口速率"  class="el_put" :disabled="true">
                                        <el-option label="10M" value="10" ></el-option>
                                        <el-option label="100M" value="100" ></el-option>
                                        <el-option label="1000M" value="1000" ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="接口模式">
                                    <el-select v-model="editInfo.interfaceMode" placeholder="接口模式" @change="ModeChange" class="el_put">
                                        <el-option label="全双工" value="full" ></el-option>
                                        <el-option label="半双工" value="half" ></el-option>
                                        <el-option label="自动侦测" value="auto" ></el-option>
                                    </el-select>
                                </el-form-item>
                                </span>
                                <span v-else>
                                    <el-form-item label="MTU" class="el_lab" prop="mtu" >
                                    <el-input v-model="editInfo.mtu"  class="el_put" placeholder="请输入应用参数"></el-input>
                                </el-form-item>
                                   <span v-if="editInfo.interfaceMode == 'half'">
                                <el-form-item label="接口速率" >
                                    <el-select v-model="editInfo.interfaceRate" placeholder="接口速率"   class="el_put">
                                        <el-option label="10M" value="10" ></el-option>
                                        <el-option label="100M" value="100" ></el-option>
                                        <el-option label="1000M" value="1000" :disabled="true"></el-option>
                                    </el-select>
                                </el-form-item>
                                   </span>
                                <span v-else>
                                    <el-form-item label="接口速率" >
                                    <el-select v-model="editInfo.interfaceRate" placeholder="接口速率" class="el_put">
                                        <el-option label="10M" value="10" ></el-option>
                                        <el-option label="100M" value="100" ></el-option>
                                        <el-option label="1000M" value="1000" ></el-option>
                                    </el-select>
                                     </el-form-item>
                                </span>
                                    <span v-if="editInfo.interfaceRate == '1000' || editInfo.interfaceRate == '1000M'">
                                <el-form-item label="接口模式">
                                    <el-select v-model="editInfo.interfaceMode" placeholder="接口模式" @change="ModeChange" class="el_put">
                                        <el-option label="全双工" value="full" ></el-option>
                                        <el-option label="半双工" value="half" :disabled="true"></el-option>
                                        <el-option label="自动侦测" value="auto" ></el-option>
                                    </el-select>
                                </el-form-item>
                                    </span>
                                    <span v-else>
                                        <el-form-item label="接口模式">
                                    <el-select v-model="editInfo.interfaceMode" placeholder="接口模式" @change="ModeChange" class="el_put">
                                        <el-option label="全双工" value="full" ></el-option>
                                        <el-option label="半双工" value="half" ></el-option>
                                        <el-option label="自动侦测" value="auto" ></el-option>
                                    </el-select>
                                </el-form-item>
                                    </span>
                                    </span>
                            </span>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class='form-footer ' slot="footer" >
                <div  class="foot">
                    <span  @click="resetForm('editInfo')" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitPhysicalForm('editInfo')">
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
    import {editNetInfo} from "../../../../../api/systemSet/new_networkConfig/new_interfaceApi";
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
                    staticIpv4Addr :[
                        {required: true, validator: ips, trigger:'blur'}
                    ],
                    staticIpv4Netmask :[
                        {required: true, validator: netMask, trigger:'blur'}
                    ],
                    staticIpv4Gateway :[
                        {validator: gateway, trigger:'blur'}
                    ],
                    connectType: [
                        {required: true, message: '请输入连接方式', trigger: 'blur'}
                    ],
                    ipType: [
                        {required: true, message: '请输入IP类型', trigger: 'blur'}
                    ]
                },
                rules2:{
                    mtu :[
                        {validator: mturange, trigger:'blur'}
                    ],
                },
                editVirChecked:false,
                physicalList:[],
                virtualList:[],
                netInfoList:[],
                polNames:[],
                editInfo:{
                    id:'',
                    device:'',
                    deviceStatus:'',
                    hwaddr:'',
                    connectType:'',
                    ipType:'',
                    staticIpv4Addr:'',
                    staticIpv4Gateway:'',
                    staticIpv4Netmask:'',
                    staticIpv6Addr:'',
                    staticIpv6Gateway:'',
                    staticIpv6SubnetLength:'',
                    defaultGateway:'',
                    mtu:'',
                    interfaceRate:'',
                    interfaceMode:'',
                    adslUsername:'',
                    adslPwd:'',
                    adslTimeout:'',
                    adslActiveCheck:'',
                    adslConnInterval:'',
                    adslConnNumb:'',
                    virtualInterface:''
                },
                editVisible:true,
                activeName2:'one',
                list: [],
                role: '',
                listLoading: true,
                multipleSelection: [],
                ipCheck:true,
                netCheck:true,
                gatewayCheck:true
            }
        },
        props: {
            currentPhy: Object,
        },
        created(){
            this.doInit(this.currentPhy);
        },
        methods: {
            /*connectType == 'dhcp'时 清除ip和子网掩码校验*/
            changeConnectType(val){
                console.log('changeConnectType',val,this.editInfo.connectType)
                if(this.editInfo.connectType == 'dhcp'){
                    this.editInfo.staticIpv4Addr='';
                    this.editInfo.staticIpv4Netmask='';
                }
            },
            // this.$refs['ageForm'].clearValidate() // 清除年龄的验证
            ModeChange(){
                if(this.editInfo.interfaceMode == 'auto' || this.editInfo.interfaceMode == '自动侦测'){
                    this.editInfo.mtu = 'auto';
                    this.editInfo.interfaceRate = 'auto';
                } else if(this.editInfo.interfaceMode == 'full' || this.editInfo.interfaceMode == '全双工'){
                    this.editInfo.mtu = 1500;
                    this.editInfo.interfaceRate = '1000';
                } else if(this.editInfo.interfaceMode == 'half' || this.editInfo.interfaceMode == '半双工'){
                    this.editInfo.mtu = 1500;
                    this.editInfo.interfaceRate = '100';
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
            if(numArray.length != 4){
                // alert("输入的IP有误");
                this.$message({
                    type: 'warning',
                    message: '输入的IP或子网掩码有误!'
                });
                return;
            }
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
        changeStatus() {
                this.$emit("onChangeStatus")
            },
            handleClose() {
                this.changeStatus();
            },
            doInit(currentPhy){
                let row=currentPhy;
                this.editInfo = {
                    id:row.id,
                    device:row.device,
                    deviceStatus:row.deviceStatus,
                    hwaddr:row.hwaddr,
                    connectType:row.connectType,
                    ipType:row.ipType,
                    staticIpv4Addr:row.staticIpv4Addr,
                    staticIpv4Gateway:row.staticIpv4Gateway,
                    staticIpv4Netmask:row.staticIpv4Netmask,
                    staticIpv6Addr:row.staticIpv6Addr,
                    staticIpv6Gateway:row.staticIpv6Gateway,
                    staticIpv6SubnetLength:row.staticIpv6SubnetLength,
                    defaultGateway:row.defaultGateway,
                    mtu:row.mtu,
                    interfaceRate:row.interfaceRate.toString(),
                    interfaceMode:row.interfaceMode,
                    adslUsername:row.adslUsername,
                    adslPwd:row.adslPwd,
                    adslTimeout:row.adslTimeout,
                    adslActiveCheck:row.adslActiveCheck,
                    adslConnInterval:row.adslConnInterval,
                    adslConnNumb:row.adslConnNumb,
                    virtualInterface:row.virtualInterface
                };

                if(this.editInfo.interfaceMode == '自动侦测' || this.editInfo.interfaceMode == 'auto'){
                    this.editInfo.interfaceRate = 'auto';
                    this.editInfo.mtu = 'auto';
                }
            },
            addition(){
                this.dynamicTags.push(4)
            },
            change(){
                for(let key in this.addInfo){
                    console.log( this.addInfo[key],'key')
                }
            },
            handleUserSizeChange(val) {
                this.phylist.pageSize = val;
                this.getPhysicalInterfaceList()
            },
            handleUserCurrentChange(val) {
                this.phylist.cur_page = val;
                this.getPhysicalInterfaceList()
            },
            resetForm(formName) {
                this.editVisible=false;
                this.$refs[formName].resetFields();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            valided(){
                if(this.editInfo.connectType == 'static'){
                    if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(this.editInfo.staticIpv4Addr) == false){
                        this.$message({
                            type: 'warning',
                            message: '请输入正确的IP地址!'
                        });
                        return false;
                    }else if(this.editInfo.staticIpv4Addr=='0.0.0.0'|| this.editInfo.staticIpv4Addr == '255.255.255.255'){
                        this.$message({
                            type: 'warning',
                            message: '请输入正确的IP地址!'
                        });
                        return false;
                    }
                    if (/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/.test(this.editInfo.staticIpv4Netmask) == false){
                        this.$message({
                            type: 'warning',
                            message: '请输入正确的子网掩码!'
                        });
                        return false;
                    }
                    return true
                }else {
                   return true
                }
            },
            submitPhysicalForm(formName){
                if(this.editInfo.mtu == 'auto'){
                    this.editInfo.mtu = 1500
                }
                if(this.editInfo.interfaceRate == 'auto'){
                    this.editInfo.interfaceRate = '100'
                }
                this.ipCheck = this.IPCheck(this.editInfo.staticIpv4Addr.replace(/\n\r*/g, ''));
                this.netCheck = this.NetmaskCheck(this.editInfo.staticIpv4Netmask.replace(/\n\r*/g, ''));
                this.gatewayCheck = this.GatewayCheck(this.editInfo.staticIpv4Gateway.replace(/\n\r*/g, ''));
                // var result = this.checkip(this.editInfo.staticIpv4Addr, this.editInfo.staticIpv4Netmask);
                // if(this.editInfo.connectType == 'static'){
                    /*if (!this.ipCheck || !this.netCheck ||!this.gatewayCheck){
                        this.$message({
                            type: 'warning',
                            message: '存在不合法数据!'
                        });
                    } else */
                   /* if ( this.checkip(this.editInfo.staticIpv4Addr, this.editInfo.staticIpv4Netmask) == false) {
                        this.$message({
                            type: 'warning',
                            message: '输入的IP地址和子网掩码不匹配!'
                        });
                    } else {*/
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                if(this.valided()){
                                    if(this.editInfo.connectType == 'static'){
                                        if ( this.checkip(this.editInfo.staticIpv4Addr, this.editInfo.staticIpv4Netmask) == false) {
                                            this.$message({
                                                type: 'warning',
                                                message: '输入的IP地址和子网掩码不匹配!'
                                            });
                                        } else {
                                            editNetInfo(this.editInfo).then((resp) =>{
                                                if(resp.status == 'SUCCESS'){
                                                    this.$message({
                                                        type: 'success',
                                                        message: '物理接口编辑成功!'
                                                    });
                                                    this.editVisible = false;
                                                    this.$emit('onChangeStatus');
                                                    this.$refs[formName].resetFields();
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
                                        editNetInfo(this.editInfo).then((resp) =>{
                                            if(resp.status == 'SUCCESS'){
                                                this.$message({
                                                    type: 'success',
                                                    message: '物理接口编辑成功!'
                                                });
                                                this.editVisible = false;
                                                this.$emit('onChangeStatus');
                                                this.$refs[formName].resetFields();
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
                                }
                            } else {
                                console.log('ruleError');
                            }
                        });
                    // }
                // }


            },
            chooseTab(tab, event) {
                console.log(tab, event,'--tab');
            },
        }
    }



   /* else {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                editNetInfo(this.editInfo).then((resp) =>{
                    if(resp.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '物理接口编辑成功!'
                        });
                        this.editVisible = false;
                        this.$emit('onChangeStatus');
                        this.$refs[formName].resetFields();
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
            } else {
                console.log('ruleError');
            }
        });
    }*/
</script>

