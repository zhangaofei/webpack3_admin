<template>
    <div class="snat public">
        <el-dialog
                title="新建源地址转换设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose">
            <div class="snat-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="116px" class="snat-form">
                    <el-form-item label="名称"  class="item_mark">
                        <el-input v-model.trim="addInfo.name" placeholder="请输入源地址转换名称" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="源地址类型" class="item_mark" >
                        <el-select v-model.trim="addInfo.sourceIpType" placeholder="请选择源地址类型" class="el_sel">
                            <!--<el-option label="自定义" value="1" ></el-option>-->
                            <!--<el-option label="预定义ip" value="0" ></el-option>-->
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <span v-if="addInfo.sourceIpType=='1'">
                        <el-form-item label="源地址" prop="" class="item_mark">
                            <el-input v-model.trim="addInfo.fillSip"  placeholder="请输入ipv4地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else-if="addInfo.sourceIpType=='0'">
                        <el-form-item label="源地址" class="item_mark">
                            <!--<span class="dot" style="position: absolute;right: 104%;color: red;">*</span>-->
                            <el-select v-model.trim="addInfo.chooseSip" placeholder="请选择源地址" class="el_sel">
                                    <el-option
                                            v-for="ip in ipList"
                                            :key="ip.id"
                                            :label="ip.name"
                                            :value="ip.id">
                                    </el-option>
                                </el-select>
                       </el-form-item>
                    </span>
                    <span v-else-if="addInfo.sourceIpType=='2'">
                        <el-form-item label="源地址" class="item_mark">
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

                    <el-form-item label="目的地址类型"  class="item_mark">
                        <el-select v-model.trim="addInfo.desIpType" placeholder="请选择目的地址类型" class="el_sel">
                            <!--<el-option label="自定义" value="1" ></el-option>-->
                            <!--<el-option label="预定义ip" value="0" ></el-option>-->
                            <!--<el-option label="预定义ip组" value="2" ></el-option>-->
                            <el-option
                                    v-for="item in optionsDes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <span v-if="addInfo.desIpType=='1'">
                        <el-form-item label="目的地址" prop="" class="item_mark">
                            <el-input v-model.trim="addInfo.fillDip"  prop="dip" placeholder="请输入ipv4地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else-if="addInfo.desIpType=='0'">
                        <el-form-item label="目的地址" class="item_mark">
                            <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
                            <el-select v-model.trim="addInfo.chooseDip" placeholder="请选择目的地址" class="el_sel">
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
                    <span v-else-if="addInfo.desIpType=='2'">
                        <el-form-item label="目的地址" class="item_mark">
                            <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
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

                    <el-form-item label="流出接口" prop="" class="item_mark">
                        <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
                        <el-select v-model.trim="addInfo.oEth"  placeholder="请选择流出接口" class="el_sel">
                            <el-option label="任何" value="all" ></el-option>
                            <el-option
                                    v-for="eth in ethNames"
                                    :key="eth"
                                    :label="eth"
                                    :value="eth">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="源服务" class="item_mark" >
                        <!--<span class="dot" style="position: absolute;right: 104%;color: red;">*</span>-->
                        <el-select v-model.trim="addInfo.src_service"  placeholder="请选择源服务" class="el_sel">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                                <span style = "float:left">{{s.name}}</span>
                                <span style = "float:right">{{s.protocal}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="目的服务"  class="item_mark">
                        <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
                        <el-select v-model.trim="addInfo.des_service"  placeholder="请选择目的服务" class="el_sel">

                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                                <span style = "float:left">{{s.name}}</span>
                                <span style = "float:right">{{s.protocal}}</span>
                            </el-option>
                            <el-option label="任何" value="0" ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="动作" prop="" >
                        <el-radio-group v-model.trim="addInfo.action"  class="el_put">
                            <el-radio label="t">源地址转换</el-radio>
                            <el-radio label="m">地址伪装</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <span v-if="addInfo.action=='t'">
                        <el-form-item label="地址转换为" prop="" class="item_mark">
                         <el-input v-model.trim="addInfo.tran_ip"  placeholder="请输入ip地址，端口号用 : 分隔" class="el_put"></el-input>
                        </el-form-item>
                    </span>


                    <el-form-item label="状态" prop=""   >
                        <el-radio-group v-model.trim="addInfo.state"  class="el_put">
                            <el-radio label="on">启用</el-radio>
                            <el-radio label="off">停止</el-radio>
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
                            class="primary confirm btn_middle"
                            type="primary"
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
    import {addSnat, isNameExist} from "api/firewall/snat";
    import {getIpListSelect} from "api/firewall/ip";
    import {getIpGroupListSelect} from "api/firewall/ipGroup";
    import {getServiceListSelect} from "api/firewall/service";
    import {getAllNetNameList} from "../../../../api/systemSet/new_networkConfig/new_routerApi";
//    import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";
    export default{
        data(){
            var validateName = (rule, value, callback) =>
            {
                if (/^(\w){1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                }
            };

            var validateIp = (rule, value, callback) =>
            {
                var reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
                var numReg = /^-?\d+$/;
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
                    } else if((numReg.test(ip[1])==false)||(ip[1]<0||ip[1]>32)){
                        callback(new Error("请输入正确的掩码范围值"));
                    }else {
                        callback();
                    }
                }

            };


            var validateIpTran = (rule, value, callback) =>
            {
                var reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
                var numReg = /^-?\d+$/;

                if (value.indexOf(":")<0){
                    if (reg.test(value) == false) {
                        callback(new Error("请输入正确的ipv4地址"));
                    }
                }else {
                    var ip = value.split(":");
                    if (reg.test(ip[0]) == false) {
                        callback(new Error("请输入正确的ipv4地址"));
                    } else {
                        if(ip[1].indexOf("-")>-1){
                            var v = ip[1].split("-");
                            if ((numReg.test(v[0]) == false) || (numReg.test(v[1]) == false)||(v[0]>=v[1])||
                                (v[0] < 0 || v[1] > 655535)) {
                                callback(new Error("请输入正确的端口值范围"));
                            }
                        }else {
                            if ((numReg.test(ip[1]) == false) || (ip[1] < 0 || ip[1] > 655535)) {
                                callback(new Error("请输入正确的端口值"));
                            }
                        }

                    }
                }
                callback();

            };



            return {
                rules: {
                    tran_ip: [
                        {required: true, validator: validateIpTran, trigger: 'blur'}
                    ]

                },
                addInfo: {
                    name: '',
                    sourceIpType:'1',
                    fillSip:'',
                    chooseSip:'',
                    chooseSipGroup:'',
                    desIpType:'1',
                    fillDip:'',
                    chooseDip:'',
                    chooseDipGroup:'',
                    oEth:'',
                    src_service:'',
                    des_service:'',
                    tran_ip:'',
                    action:'t',
                    state:'off',
                },
                addVisible: true,

                serviceList:[],
                ethNames:[],
                ipgList:[],
                ipList:[],
                options: [{
                    value: '1',
                    label: '自定义'
                }, {
                    value: '0',
                    label: '预定义ip'
                }],
                optionsDes: [{
                    value: '1',
                    label: '自定义'
                }, {
                    value: '0',
                    label: '预定义ip'
                }],
            }
        },
        created(){
            this.setListForSelect();
        },
        methods: {

            setListForSelect(){

                getIpGroupListSelect().then((resp)=>{
                    this.ipgList = resp.data;
                }).catch(e => {});

                getIpListSelect().then((resp)=>{
                    this.ipList = resp.data;
                }).catch(e => {});

                getServiceListSelect().then((resp)=>{
                    this.serviceList = resp.data;
                }).catch(e => {});

                //获取接口名称
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

            validate() {

                var ip1 = this.addInfo.fillSip;
                var ip2 = this.addInfo.fillDip;
                var ip3 = this.addInfo.tran_ip;
                var reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
                var numReg = /^-?\d+$/;
                if (/^(\w){1,20}$/.test(this.addInfo.name) == false) {
                    this.$message({
                        type: 'warning',
                        message: '名称请输入1-20位字母、数字、下划线！'
                    });
                    return false;
                }
                if (this.addInfo.sourceIpType=='1'){
                    /*if (ip1.indexOf("/")<0){
                        if (reg.test(ip1) == false) {
                            this.$message({type: 'warning', message: '请输入正确的ipv4地址-源地址'});
                            return false;
                        }
                        if ('0.0.0.0'==ip1){
                            this.$message({type: 'warning', message: '源地址-0.0.0.0 不允许被配置'});
                            return false;
                        }
                    }else {
                        var ip = ip1.split("/");
                        if ('0.0.0.0/0'==ip1){
                            this.$message({type: 'warning', message: '源地址-0.0.0.0/0 不允许被配置'});
                            return false;
                        }

                        if ('0.0.0.0/0.0.0.0'==ip1){
                            this.$message({type: 'warning', message: '源地址-0.0.0.0/0.0.0.0 不允许被配置'});
                            return false;
                        }

                        if (reg.test(ip[0]) == false) {
                            this.$message({type: 'warning', message: '请输入正确的ipv4地址-源地址'});
                            return false;
                        } else if((numReg.test(ip[1])==false)||(ip[1]<0||ip[1]>32)){
                            this.$message({type: 'warning', message: '请输入正确的掩码范围值-源地址'});
                            return false;
                        }
                    }*/
                    if(!this.addInfo.fillSip){
                        this.$message({
                            type: 'warning',
                            message: '源地址不能为空！'
                        });
                        return false;
                    }
                }else if(this.addInfo.sourceIpType=='0'){
                    if(!this.addInfo.chooseSip){
                        this.$message({
                            type: 'warning',
                            message: '源地址不能为空！'
                        });
                        return false;
                    }
                }else {
                    if(!this.addInfo.chooseSipGroup){
                        this.$message({
                            type: 'warning',
                            message: '源地址不能为空！'
                        });
                        return false;
                    }
                }


                if (this.addInfo.desIpType=='1'){
                   /* if (ip2.indexOf("/")<0){
                        if (reg.test(ip2) == false) {
                            this.$message({type: 'warning', message: '请输入正确的ipv4地址-目的地址'});
                            return false;
                        }
                    }else {
                        var ip = ip2.split("/");
                        if (reg.test(ip[0]) == false) {
                            this.$message({type: 'warning', message: '请输入正确的ipv4地址-目的地址'});
                            return false;
                        } else if((numReg.test(ip[1])==false)||(ip[1]<0||ip[1]>32)){
                            this.$message({type: 'warning', message: '请输入正确的掩码范围值-目的地址'});
                            return false;
                        }
                    }*/
                    if(!this.addInfo.fillDip){
                        this.$message({
                            type: 'warning',
                            message: '目的地址不能为空！'
                        });
                        return false;
                    }
                }else if(this.addInfo.desIpType=='0'){
                    if(!this.addInfo.chooseDip){
                        this.$message({
                            type: 'warning',
                            message: '目的地址不能为空！'
                        });
                        return false;
                    }
                }else {
                    if(!this.addInfo.chooseDipGroup){
                        this.$message({
                            type: 'warning',
                            message: '目的地址不能为空！'
                        });
                        return false;
                    }
                }
                if(this.addInfo.oEth==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择流出接口！'
                    });
                    return false;
                }

                if(this.addInfo.src_service==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择源服务！'
                    });
                    return false;
                }

                if(this.addInfo.des_service==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择目的服务！'
                    });
                    return false;
                }

                if(this.addInfo.action==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择动作！'
                    });
                    return false;
                }

                // if(this.addInfo.action=='t'&& /^(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])$|(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(ip3)==false){
                if(this.addInfo.action=='t'&&!this.addInfo.tran_ip){
                    this.$message({
                        type: 'warning',
                        // message: '请输入正确的ip地址-地址转换！'
                        message: '地址转换为不能空！'
                    });
                    return false;
                }
                if(this.addInfo.state==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择状态！'
                    });
                    return false;
                }

                var spid = this.addInfo.src_service;
                var dpid = this.addInfo.des_service;

                if(spid!='0'&&dpid!='0'&&this.getProtocalByServiceId(spid)!=this.getProtocalByServiceId(dpid)){
                    this.$message({type: 'warning', message: '源服务与目的服务的协议必须相同'});
                    return false;
                }
                return true;
            },

            getProtocalByServiceId(id){
                for(let item of this.serviceList){
                    if (item.id == id){
                        return item.protocal;
                    }
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        if (this.validate()) {
                            var newdto = {
                                name: this.addInfo.name,
                                srcIpType: this.addInfo.sourceIpType,
                                srcIp: this.addInfo.fillSip,
                                srcId: this.addInfo.chooseSip,
                                srcIdg: this.addInfo.chooseSipGroup,
                                desIpType: this.addInfo.desIpType,
                                desIp: this.addInfo.fillDip,
                                desId: this.addInfo.chooseDip,
                                desIdg: this.addInfo.chooseDipGroup,
                                srcServiceId:this.addInfo.src_service,
                                desServiceId: this.addInfo.des_service,
                                ethOut: this.addInfo.oEth,
                                tranIp: this.addInfo.tran_ip,
                                action: this.addInfo.action,
                                state: this.addInfo.state,
                                sort:0,
                            };

                            addSnat(newdto).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '新建源地址转换配置成功！'
                                    });
                                    this.addVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs[formName].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.code.info
                                    });
                                }
                            }).catch(e => {
                                console.log("新建出错", e);
                            });

                        }


                    } else {

                        return false;
                    }
                });
            },
            resetForm(formName) {
                console.log(formName, '------');
                this.addVisible = false;
                this.$refs[formName].resetFields();
            },

        },
    }
</script>
<style>

    /*.el-dialog--tiny {*/
        /*width: 25%;*/
    /*}*/

    /*!* 设置弹出框大小*!*/
    /*.snat .dialog {*/
        /*min-width: 830px;*/
    /*}*/

    /*.snat .el-dialog__header {*/
        /*padding-left: 5px;*/
    /*}*/

    /*.snat .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 65% !important;*/
        /*margin-left: 20px;*/
    /*}*/

    /*.snat .el_sel {*/
        /*width: 65% !important;*/
        /*margin-left: 20px;*/
    /*}*/

    /*.snat .el_text {*/
        /*margin-left: 158px;*/
    /*}*/

    /*.snat-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width: 135px;*/
        /*font-size: 15px;*/
        /*margin-left: 5%;*/
    /*}*/

    /*.snat-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.snat .el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.snat-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 165px;*/
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