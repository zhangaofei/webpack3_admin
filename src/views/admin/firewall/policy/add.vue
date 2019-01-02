<template>
    <div class="policy public">
        <el-dialog
                title="新建策略设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose">
            <div class="policy-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="116px" class="policy-form">

                    <el-form-item label="策略名称 " prop="name" >
                        <el-input v-model.trim="addInfo.name" placeholder="请输入策略名称" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="源地址类型"  required >
                        <el-select v-model.trim="addInfo.sourceIpType" placeholder="请选择源地址类型" class="el_sel">
                            <el-option
                                    v-for="item in sourceIpOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                    </el-form-item>

                    <span v-if="addInfo.sourceIpType=='1'">
                        <el-form-item label="源地址"  required>
                            <el-input v-model.trim="addInfo.fillSip"  placeholder="请输入ipv4地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else-if="addInfo.sourceIpType=='0'">
                        <el-form-item label="源地址"  required >
                            <el-select v-model.trim="addInfo.chooseSip" placeholder="请选择源地址" class="el_sel">

                                <el-option
                                        v-for="ip in ipList"
                                        :key="ip.id"
                                        :label="ip.name"
                                        :value="ip.id">
                                </el-option>
                                <el-option label="任何" value="0" ></el-option>
                            </el-select>
                        </el-form-item>
                    </span>

                    <span v-else>
                        <el-form-item label="源地址"  required >
                            <el-select v-model.trim="addInfo.chooseSipGroup" placeholder="请选择源地址" class="el_put">
                                <el-option
                                        v-for="ipg in ipgList"
                                        :key="ipg.id"
                                        :label="ipg.name"
                                        :value="ipg.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </span>


                    <el-form-item label="目的地址类型"  required >
                            <el-select v-model.trim="addInfo.desIpType" @change="typeChange" placeholder="请选择目的地址类型" class="el_sel">
                                <el-option
                                        v-for="item in desIpOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>

                        <span v-if="addInfo.desIpType=='1'">
                            <el-form-item label="目的地址"  prop="dip" >
                                <el-input v-model.trim="addInfo.fillDip"  placeholder="请输入ip地址" class="el_put"></el-input>
                            </el-form-item>
                        </span>
                        <span v-else-if="addInfo.desIpType=='0'">
                            <el-form-item label="目的地址"  required >
                            <el-select v-model.trim="addInfo.chooseDip" @change="valueChange(addInfo.chooseDip)" placeholder="请选择目的地址" class="el_sel">
                                    <el-option
                                            v-for="ip in ipList"
                                            :key="ip.id"
                                            :label="ip.name"
                                            :value="ip.id">
                                    </el-option>
                                 <el-option label="任何" value="0" ></el-option>
                                </el-select>
                            </el-form-item>
                        </span>

                        <span v-else>
                            <el-form-item label="目的地址"  required >
                            <el-select v-model.trim="addInfo.chooseDipGroup"  placeholder="请选择目的地址" class="el_sel">
                                    <el-option
                                            v-for="ipg in ipgList"
                                            :key="ipg.id"
                                            :label="ipg.name"
                                            :value="ipg.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </span>

                    <el-form-item label="源接口"  required>
                    <el-select v-model.trim="addInfo.sEth"  placeholder="请选择源接口" class="el_sel">
                        <el-option label="任何" value="all" ></el-option>
                        <el-option
                                v-for="eth in ethNames"
                                :key="eth"
                                :label="eth"
                                :value="eth">
                        </el-option>
                    </el-select>
                </el-form-item>

                    <el-form-item label="目的接口" prop="" class="item_mark">
                        <el-select v-model.trim="addInfo.dEth" placeholder="请选择目的接口" class="el_sel">
                            <el-option label="任何" value="all" ></el-option>
                            <el-option
                                    v-for="eth in ethNames"
                                    :key="eth"
                                    :label="eth"
                                    :value="eth">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务"  required >
                        <el-select v-model.trim="addInfo.service"  placeholder="请选择服务" class="el_sel">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间策略"  required >
                        <el-select v-model.trim="addInfo.time" placeholder="请选择时间策略" class="el_put">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="time in timeList"
                                    :key="time.id"
                                    :label="time.name"
                                    :value="time.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="动作"  required >
                    <el-radio-group v-model="addInfo.action"  class="el_put">
                        <el-radio :label="1">放行</el-radio>
                        <el-radio :label="0">阻断</el-radio>
                    </el-radio-group>
                </el-form-item>

                    <el-form-item label="状态"    required >
                        <el-radio-group v-model="addInfo.state"  class="el_put">
                            <el-radio :label="1">启用</el-radio>
                            <el-radio :label="0">停止</el-radio>
                        </el-radio-group>
                    </el-form-item>

                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo')">
                        取消
                    </span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitForm('addInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {addPolicy, isNameExist,isDesipExist} from "api/firewall/policy";
    import {getTimeListSelect} from "api/firewall/fwTime";
    import {getIpListSelect} from "api/firewall/ip";
    import {getIpGroupListSelect} from "api/firewall/ipGroup";
    import {getServiceListSelect} from "api/firewall/service";
    import {getAllNetNameList} from "../../../../api/systemSet/new_networkConfig/new_routerApi";
    export default{
        components: {},
        data(){
            var validateName = (rule, value, callback) => {
                if (/^(\w){1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    isNameExist({name:value}).then((resp)=> {
                        if (resp.data.exist == true) {
                            callback(new Error("该名称已存在"));
                        }
                        callback();
                    }).catch(e=> {});

                }
            };

            var validateIp = (rule, value, callback) =>
            {
                var reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
                var numReg = /^-?\d+$/;
                var masks = ["128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0",
                    "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0", "255.255.0.0",
                    "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0",
                    "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248",
                    "255.255.255.252", "255.255.255.254", "255.255.255.255"];

                if (value.indexOf("/")<0){
                    if (reg.test(value) == false) {
                        callback(new Error("请输入正确的ipv4地址"));
                    }
                }else {
                    var ip = value.split("/");
                    if (reg.test(ip[0]) == false) {
                        callback(new Error("请输入正确的ipv4地址"));
                    } else {
                        if (masks.indexOf(ip[1]) < 0) {
                            if ((numReg.test(ip[1]) == false) || (ip[1] < 0 || ip[1] > 32)) {
                                callback(new Error("请输入正确的掩码范围值"));
                            }
                        }
                    }
                }
                callback();
            };

            var validateDeth=(rule,value,callback)=>{
                value = this.addInfo.dEth;

                if (value!='all') {
                    var value = "";
                    if (this.addInfo.desIpType == '0') {
                        value = this.chooseIP;
                    } else if (this.addInfo.desIpType == '1') {
                        value = this.addInfo.fillDip;
                    }

                    if (value.length != '' && value != 0) {
                        isDesipExist({ip:value}).then((resp) => {
                            if (resp.data.exist == true) {
                                callback(new Error('目的地址配置为本机端口下地址时,流出端口只能为"任何"！'));
                            }else {
                                callback();
                            }
                        }).catch(e => {
                        });
                    } else {
                        callback();
                    }
                }else {
                    callback();
                }
            };

            return {
                rules: {
                    name: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],

                    dEth: [
                        {required: true, validator: validateDeth, trigger: 'blur'}
                    ],




                },
                addInfo: {
                    name: '',
                    sourceIpType:'0',
                    fillSip:'',
                    chooseSip:'',
                    chooseSipGroup:'',
                    desIpType:'0',
                    fillDip:'',
                    chooseDip:'',
                    chooseDipGroup:'',
                    sEth:'',
                    dEth:'',
                    service:'',
                    time:'',
                    action:0,
                    state:0,
                },
                chooseIP:'',
                sourceIpOption: [{
                    value: '0',
                    label: '预定义ip'
                }, {
                    value: '1',
                    label: '自定义'
                }, {
                    value: '2',
                    label: '预定义ip组'
                }],
                desIpOption: [{
                    value: '0',
                    label: '预定义ip'
                }, {
                    value: '1',
                    label: '自定义'
                }, {
                    value: '2',
                    label: '预定义ip组'
                }],

                addVisible: true,

                timeList:[],
                serviceList:[],
                ethNames:[],
                ipgList:[],
                ipList:[]
            }
        },
        created(){
            this.setListForSelect();
        },
        methods: {
            valueChange(id){
                if(id == 0){
                    this.chooseIP = 0
                } else {
                    for (let i = 0; i < this.ipList.length; i++){
                        if(id == this.ipList[i].id){
                            this.chooseIP = this.ipList[i].ip;
                            break;
                        }
                    }
                }
            },
            typeChange(){
                this.addInfo.fillDip = '';
                this.addInfo.chooseDip = '';
                this.addInfo.chooseDipGroup = '';
            },
            setListForSelect(){
                getTimeListSelect().then((resp) => {
                   this.timeList = resp.data;
                }).catch(e => {});

                getIpGroupListSelect().then((resp)=>{
                    this.ipgList = resp.data;
                }).catch(e => {});

                getIpListSelect().then((resp)=>{
                    this.ipList = resp.data;
                    // this.ipList = [];
                }).catch(e => {});

                getServiceListSelect().then((resp)=>{
                    this.serviceList = resp.data;
                }).catch(e => {});

                //        获取接口名称
                getAllNetNameList().then((resp)=>{
                    this.ethNames=resp.data;
                }).catch(err=>{});
            },
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },

            changeStatus(){
                this.$emit("onChangeStatus")
            },

            validated() {
                let ip1 = this.addInfo.fillSip;
                let ip2 = this.addInfo.fillDip;
                let reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
                let numReg = /^-?\d+$/;
                let masks = ["128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0",
                    "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0", "255.255.0.0",
                    "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0",
                    "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248",
                    "255.255.255.252", "255.255.255.254", "255.255.255.255"];
                if(this.addInfo.sourceIpType=='0'){
                    if(this.addInfo.chooseSip==''||this.addInfo.chooseSip==null){
                        this.$message({
                            type: 'warning',
                            message: '源地址不能为空!'
                        });
                        return false;
                    }

                }else if(this.addInfo.sourceIpType=='1'){
                    /*if (ip1.indexOf("/")<0){
                        if (reg.test(ip1)==false){
                            this.$message({
                                type: 'warning',
                                message: '源地址请输入正确的ipv4地址！'
                            });
                            return false;
                        }
                    }else {
                        let mask = ip1.split("/")[1];
                        if (masks.indexOf(mask)<0){
                            if (numReg.test(mask)==false||mask>32||mask<1){
                                this.$message({
                                    type: 'warning',
                                    message: '源地址请输入正确的掩码！'
                                });
                                return false;
                            }

                        }
                    }*/
                    if(this.addInfo.fillSip==''||this.addInfo.fillSip==null){
                        this.$message({
                            type: 'warning',
                            message: '源地址不能为空!'
                        });
                        return false;
                    }
                } else{
                    if(this.addInfo.chooseSipGroup==''||this.addInfo.chooseSipGroup==null){
                        this.$message({
                            type: 'warning',
                            message: '请选择源地址类型！'
                        });
                        return false;
                    }
                }

                if(this.addInfo.desIpType=='0'){
                    if(!this.addInfo.chooseDip){
                        this.$message({
                            type: 'warning',
                            message: '目的地址不能为空！'
                        });
                        return false;
                    }

                }else if(this.addInfo.desIpType=='1'){
                    /*if (ip2.indexOf("/")<0){
                        if (reg.test(ip2)==false){
                            this.$message({
                                type: 'warning',
                                message: '请输入正确的ipv4地址！'
                            });
                            return false;
                        }
                    }else {
                        let mask = ip1.split("/")[1];
                        if (masks.indexOf(mask)<0){
                            if (numReg.test(mask)==false||mask>32||mask<1){
                                this.$message({
                                    type: 'warning',
                                    message: '请输入正确的掩码！'
                                });
                                return false;
                            }

                        }
                    }*/
                    if(!this.addInfo.fillDip){
                        this.$message({
                            type: 'warning',
                            message: '目的地址不能为空！'
                        });
                        return false;
                    }
                } else{
                    if(this.addInfo.chooseDipGroup==''||this.addInfo.chooseDipGroup==null){
                        this.$message({
                            type: 'warning',
                            message: '目的地址不能为空！'
                        });
                        return false;
                    }
                }

                if(this.addInfo.sEth==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择源接口！'
                    });
                    return false;
                }

                if(this.addInfo.dEth==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择目的接口！'
                    });
                    return false;
                }

                if(this.addInfo.service==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择服务！'
                    });
                    return false;
                }

                if(this.addInfo.time==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择时间！'
                    });
                    return false;
                }

                return true;
            },
            submitForm(formName) {
                 this.$refs[formName].validate((valid) => {
                     if (valid) {
                        if (this.validated()) {
                            var newdto = {
                                name: this.addInfo.name,
                                sourceIpType: this.addInfo.sourceIpType,
                                sourceIp: this.addInfo.fillSip,
                                sourceId: this.addInfo.chooseSip,
                                sourceIdg: this.addInfo.chooseSipGroup,
                                desIpType: this.addInfo.desIpType,
                                desIp: this.addInfo.fillDip,
                                desId: this.addInfo.chooseDip,
                                desIdg: this.addInfo.chooseDipGroup,
                                desServiceId: this.addInfo.service,
                                time: this.addInfo.time,
                                sourceEth: this.addInfo.sEth,
                                desEth: this.addInfo.dEth,
                                action: this.addInfo.action.toString(),
                                state: this.addInfo.state.toString(),
                                sort:0,
                            };
                            console.log(newdto,'newdto')
                            addPolicy(newdto).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '新建策略配置成功！'
                                    });
                                    this.addVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs[formName].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '新建策略配置失败！'
                                    });
                                }
                            }).catch(e => {
                                console.log("新建出错", e);
                            });

                        }
                     }
                     else {

                         return false;
                     }
                 });
            },
            resetForm(formName) {
                console.log(formName, '------');
                this.addVisible = false;
                this.$refs[formName].resetFields();
            }

        },
    }
</script>
<style>

    /*.el-dialog--tiny {*/
        /*width: 25%;*/
    /*}*/

    /*!* 设置弹出框大小*!*/
    /*.policy .dialog {*/
        /*min-width: 830px;*/
    /*}*/

    /*.policy .el-dialog__header {*/
        /*padding-left: 5px;*/
    /*}*/

    /*.policy .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 65% !important;*/
        /*margin-left: 20px;*/
    /*}*/

    /*.policy .el_sel {*/
        /*width: 65% !important;*/
        /*margin-left: 20px;*/
    /*}*/

    /*.policy .el_text {*/
        /*margin-left: 158px;*/
    /*}*/

    /*.policy-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width: 135px;*/
        /*font-size: 15px;*/
        /*margin-left: 5%;*/
    /*}*/

    /*.policy-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.policy .el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.policy-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 60px;*/
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