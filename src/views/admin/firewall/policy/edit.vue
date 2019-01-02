<template>
    <div class="policy public">
        <el-dialog
                title="修改策略设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose"  @open="doInit(currentData)">
            <div class="policy-form-edit">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="116px" class="policy-form-edit">

                    <el-form-item label="策略名称 " prop="name">
                        <el-input v-model.trim="editInfo.name"  class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="源地址类型"  required>
                        <el-select v-model.trim="editInfo.sourceIpType"  placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="item in sourceIpOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                        <span v-if="editInfo.sourceIpType=='1'">
                            <el-form-item label="源地址"  required>
                                <el-input v-model.trim="editInfo.fillSip"  placeholder="请输入ipv4地址" class="el_put"></el-input>
                            </el-form-item>
                        </span>
                        <span v-else-if="editInfo.sourceIpType=='0'">
                            <el-form-item label="源地址"  required >
                                <el-select v-model.trim="editInfo.chooseSip"  class="el_sel">
                                    <el-option label="任何" value="0" ></el-option>
                                    <el-option
                                            v-for="ip in ipList"
                                            :key="ip.id"
                                            :label="ip.name"
                                            :value="ip.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </span>

                        <span v-else>
                            <el-form-item label="源地址"  required >
                                <el-select v-model.trim="editInfo.chooseSipGroup"  class="el_put">
                                    <el-option
                                            v-for="ipg in ipgList"
                                            :key="ipg.id"
                                            :label="ipg.name"
                                            :value="ipg.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </span>

                    <el-form-item label="目的地址类型" required>
                        <el-select v-model.trim="editInfo.desIpType" @change="typeChange" class="el_sel">
                            <el-option label="自定义" value="1" ></el-option>
                            <el-option label="预定义ip" value="0" ></el-option>
                            <el-option label="预定义ip组" value="2" ></el-option>
                        </el-select>
                    </el-form-item>
                    <span v-if="editInfo.desIpType=='1'">
                        <el-form-item label="目的地址"  prop="" required >
                            <el-input v-model.trim="editInfo.fillDip"   placeholder="请输入ip地址"  class="el_put"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else-if="editInfo.desIpType=='0'">
                        <el-form-item label="目的地址"  prop="" required >
                            <el-select v-model.trim="editInfo.chooseDip" @change="valueChange(editInfo.chooseDip)" placeholder="请选择" class="el_sel">
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
                        <el-form-item label="目的地址"  prop="dip" required >
                            <el-select v-model.trim="editInfo.chooseDipGroup" placeholder="请选择" class="el_sel">
                                <el-option
                                        v-for="ipg in ipgList"
                                        :key="ipg.id"
                                        :label="ipg.name"
                                        :value="ipg.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </span>
                    <!--</el-form-item>-->

                    <el-form-item label="源接口" required>
                        <el-select v-model.trim="editInfo.sEth"  placeholder="请选择" class="el_sel">
                            <el-option label="任何" value="all" ></el-option>
                            <el-option
                                    v-for="eth in ethNames"
                                    :key="eth"
                                    :label="eth"
                                    :value="eth">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="目的接口"  prop="" class="item_mark">
                        <el-select v-model.trim="editInfo.dEth" placeholder="请选择" class="el_sel">
                            <el-option label="任何" value="all" ></el-option>
                            <el-option
                                    v-for="eth in ethNames"
                                    :key="eth"
                                    :label="eth"
                                    :value="eth">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务" required>
                        <el-select v-model.trim="editInfo.service"  placeholder="请选择" class="el_sel">
                            <el-option label="任何" value="0"></el-option>
                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间策略" required>
                        <el-select v-model.trim="editInfo.time" placeholder="请选择" class="el_put">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="time in timeList"
                                    :key="time.id"
                                    :label="time.name"
                                    :value="time.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="动作" required>
                        <el-radio-group v-model="editInfo.action"  class="el_put">
                            <el-radio label="1">放行</el-radio>
                            <el-radio label="0">阻断</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="状态" required>
                        <el-radio-group v-model="editInfo.state"  class="el_put">
                            <el-radio label="1">启用</el-radio>
                            <el-radio label="0">停止</el-radio>
                        </el-radio-group>
                    </el-form-item>

                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo')">
                        取消
                    </span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitForm('editInfo')">
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
    import {updatePolicy, isNameExist,isDesipExist} from "api/firewall/policy";
    import {getTimeListSelect} from "api/firewall/fwTime";
    import {getIpListSelect} from "api/firewall/ip";
    import {getIpGroupListSelect} from "api/firewall/ipGroup";
    import {getServiceListSelect} from "api/firewall/service";
    import {getAllNetNameList} from "../../../../api/systemSet/new_networkConfig/new_routerApi";
    export default{
        components: {},
        data(){
            var validateName = (rule, value, callback) =>
            {
                if (/^(\w){1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    if (this.preName != value) {
                    isNameExist({name:value}).then((resp)=> {
                        if (resp.data.exist == true) {
                            callback(new Error("该名称已存在"));
                        }
                        callback();
                    }).catch(e=> {});
                    }else {
                        callback();
                    }

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
                    } else {
                        callback();
                    }
                }else {
                    var ip = value.split("/");
                    if (reg.test(ip[0]) == false) {
                        callback(new Error("请输入正确的ipv4地址"));
                    } else {
                        if (masks.indexOf(ip[1]) > -1) {
                            callback();
                        } else {
                            if ((numReg.test(ip[1]) == false) || (ip[1] < 0 || ip[1] > 32)) {
                                callback(new Error("请输入正确的掩码范围值"));
                            } else {
                                callback();
                            }
                        }
                    }
                }
            };

            var validateDeth=(rule,value,callback)=>{
                value = this.editInfo.dEth;
                if (value!='all') {
                    var value = "";
                    if (this.editInfo.desIpType == '0') {
                        value = this.chooseIP;
                    } else if (this.editInfo.desIpType == '1') {
                        value = this.editInfo.fillDip;
                    }
                    console.log('value:', value);
                    if (value != '' && value != 0) {
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
                }else{
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
                editInfo: {
                    name: '',
                    sourceIpType:'',
                    fillSip:'',
                    chooseSip:'',
                    chooseSipGroup:'',
                    desIpType:'',
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
                editVisible: true,

                timeList:[],
                serviceList:[],
                ethNames:[],
                ipgList:[],
                ipList:[],

                sort:'',

                id:'',
                preName:'',
                judge:false
            }
        },
        created(){
            this.setListForSelect();
            this.doInit(this.currentData);
        },

        props: {
            currentData: Object
        },
        methods: {
            valueChange(id){
                console.log('id___:', id);
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
                this.editInfo.fillDip = '';
                this.editInfo.chooseDip = '';
                this.editInfo.chooseDipGroup = '';
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
                    this.valueChange(this.editInfo.chooseDip);
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
            doTest() {
                this.editVisible = true;
                console.log('doTest-admin', this.editVisible)
            },

            changeStatus(){
                this.$emit("onChangeStatus")
            },

            validated() {
                let ip1 = this.editInfo.fillSip;
                let ip2 = this.editInfo.fillDip;
                let reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
                let numReg = /^-?\d+$/;
                let masks = ["128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0",
                    "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0", "255.255.0.0",
                    "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0",
                    "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248",
                    "255.255.255.252", "255.255.255.254", "255.255.255.255"];
                if(this.editInfo.sourceIpType=='0'){
                    if(!this.editInfo.chooseSip){
                        this.$message({
                            type: 'warning',
                            message: '源地址不能为空!'
                        });
                        return false;
                    }
                }else if(this.editInfo.sourceIpType=='1'){
                    /*if (ip1.indexOf("/")<0){
                        if (reg.test(ip1)==false){
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
                    if(!this.editInfo.fillSip){
                        this.$message({
                            type: 'warning',
                            message: '源地址不能为空!'
                        });
                        return false;
                    }
                } else{
                    if(this.editInfo.chooseSipGroup==''||this.editInfo.chooseSipGroup==null){
                        this.$message({
                            type: 'warning',
                            message: '源地址不能为空！'
                        });
                        return false;
                    }
                }

                if(this.editInfo.desIpType=='0'){
                    if(!this.editInfo.chooseDip){
                        this.$message({
                            type: 'warning',
                            message: '目的地址不能为空！'
                        });
                        return false;
                    }
                }else if(this.editInfo.desIpType=='1'){
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
                    if(!this.editInfo.fillDip){
                        this.$message({
                            type: 'warning',
                            message: '目的地址不能为空！'
                        });
                        return false;
                    }
                } else{
                    if(this.editInfo.chooseDipGroup==''){
                        this.$message({
                            type: 'warning',
                            message: '目的地址不能为空！'
                        });
                        return false;
                    }
                }

                if(this.editInfo.sEth==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择源接口！'
                    });
                    return false;
                }

                if(this.editInfo.dEth==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择目的接口！'
                    });
                    return false;
                }

                if(this.editInfo.service==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择服务！'
                    });
                    return false;
                }

                if(this.editInfo.time==''){
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
                                    id: this.id,
                                    name: this.editInfo.name,
                                    sourceIpType: this.editInfo.sourceIpType,
                                    sourceIp: this.editInfo.fillSip,
                                    sourceId: this.editInfo.chooseSip,
                                    sourceIdg: this.editInfo.chooseSipGroup,
                                    desIpType: this.editInfo.desIpType,
                                    desIp: this.editInfo.fillDip,
                                    desId: this.editInfo.chooseDip,
                                    desIdg: this.editInfo.chooseDipGroup,
                                    desServiceId: this.editInfo.service,
                                    time: this.editInfo.time,
                                    sourceEth: this.editInfo.sEth,
                                    desEth: this.editInfo.dEth,
                                    action: this.editInfo.action.toString(),
                                    state: this.editInfo.state.toString(),
                                    sort: this.sort,
                                };

                                updatePolicy(newdto).then((resp) => {
                                    if (resp.status == 'SUCCESS') {
                                        this.$message({
                                            type: 'success',
                                            message: '修改策略配置成功！'
                                        });
                                        this.editVisible = false;
                                        this.$emit('onChangeStatus');
                                        this.$refs[formName].resetFields();
                                    } else {
                                        this.$message({
                                            type: 'warning',
                                            message: '修改策略配置失败！' + codeMessage(resp.code)
                                        });
                                    }
                                }).catch(e => {
                                    console.log("修改出错", e);
                                });
                        }
                    } else {

                        return false;
                    }
                });
            },


            doInit(currentData){

                console.log(currentData,'currentData');
                let row = this.currentData;
                this.editInfo.name = row.name;
                this.preName = row.name;
                this.id = row.id;
                this.editInfo.sourceIpType = row.sourceIpType;
                this.editInfo.fillSip = row.sourceIp;

                this.editInfo.chooseSipGroup=row.sourceIdg;
                this.editInfo.desIpType=row.desIpType;
                this.editInfo.fillDip=row.desIp;

                this.editInfo.chooseDipGroup=row.desIdg;
                this.editInfo.sEth=row.sourceEth;
                this.editInfo.dEth=row.desEth;

                if (row.sourceId==0){
                    this.editInfo.chooseSip='0';
                }else {
                    this.editInfo.chooseSip=row.sourceId;
                }

                if (row.desId==0){
                    this.editInfo.chooseDip='0';
                }else {
                    this.editInfo.chooseDip=row.desId;
                }

                if (row.desServiceId==0){
                    this.editInfo.service='0';
                }else {
                    this.editInfo.service=row.desServiceId;
                }
                if (row.time==0){
                    this.editInfo.time='0';
                }else {
                    this.editInfo.time=row.time;
                }
                this.editInfo.action=row.action;
                this.editInfo.state=row.state;
                this.sort = row.sort;
            },


            resetForm(formName) {
                console.log(formName, '------');
                this.editVisible = false;
                this.$refs[formName].resetFields();
            }

        },
    }
</script>
<style>


</style>