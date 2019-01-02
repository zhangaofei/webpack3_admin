<template>
    <div class="snat public">
        <el-dialog
                title="修改源地址转换设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose"  @open="doInit(currentData)">
            <div class="snat-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="116px" class="snat-form">

                    <el-form-item label="名称 " prop="" class="item_mark">
                        <!--<span class="dot" style="position: absolute;right: 101%;color: red;">*</span>-->
                        <el-input v-model.trim="editInfo.name" placeholder="请输入源地址转换名称" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="源地址类型" class="item_mark"  >
                        <!--<span class="dot" style="position: absolute;right: 109%;color: red;">*</span>-->
                        <el-select v-model.trim="editInfo.sourceIpType" placeholder="请选择源地址类型" class="el_sel">
                            <el-option label="自定义" value="1" ></el-option>
                            <el-option label="预定义ip" value="0" ></el-option>
                            <!--<el-option label="预定义ip组" value="2" ></el-option>-->
                        </el-select>
                    </el-form-item>

                    <span v-if="editInfo.sourceIpType=='1'">
                        <el-form-item label="源地址" prop=""  class="item_mark">
                            <el-input v-model.trim="editInfo.fillSip"  placeholder="请输入ipv4地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else-if="editInfo.sourceIpType=='0'">
                       <el-form-item label="源地址" class="item_mark">
                           <!--<span class="dot" style="position: absolute;right: 104%;color: red;">*</span>-->
                            <el-select v-model.trim="editInfo.chooseSip" placeholder="请选择源地址" class="el_sel">
                                    <el-option
                                            v-for="ip in ipList"
                                            :key="ip.id"
                                            :label="ip.name"
                                            :value="ip.id">
                                    </el-option>
                                </el-select>
                       </el-form-item>
                    </span>
                    <span v-else-if="editInfo.sourceIpType=='2'">
                             <el-form-item label="源地址" class="item_mark">
                            <el-select v-model.trim="editInfo.chooseSipGroup" placeholder="请选择源地址" class="el_put">
                                    <el-option
                                            v-for="ipg in ipgList"
                                            :key="ipg.id"
                                            :label="ipg.name"
                                            :value="ipg.id">
                                    </el-option>
                                </el-select>
                             </el-form-item>
                    </span>


                    <el-form-item label="目的地址类型"   class="item_mark">
                        <el-select v-model.trim="editInfo.desIpType" placeholder="请选择目的地址类型" class="el_sel">
                            <el-option label="自定义" value="1" ></el-option>
                            <el-option label="预定义ip" value="0" ></el-option>
                            <!-- <el-option label="预定义ip组" value="2" ></el-option>-->
                        </el-select>
                    </el-form-item>

                    <span v-if="editInfo.desIpType=='1'">
                             <el-form-item label="目的地址" prop="" class="item_mark">
                           <el-input v-model.trim="editInfo.fillDip"  prop="dip" placeholder="请输入ipv4地址" class="el_put"></el-input>
                             </el-form-item>
                    </span>
                    <span v-else-if="editInfo.desIpType=='0'">
                        <el-form-item label="目的地址"  class="item_mark">
                            <el-select v-model.trim="editInfo.chooseDip" placeholder="请选择目的地址" class="el_sel">
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
                    <span v-else-if="editInfo.desIpType=='2'">
                        <el-form-item label="目的地址"  class="item_mark">
                            <el-select v-model.trim="editInfo.chooseDipGroup"  placeholder="请选择目的地址" class="el_sel">
                                <el-option
                                        v-for="ipg in ipgList"
                                        :key="ipg.id"
                                        :label="ipg.name"
                                        :value="ipg.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </span>

                    <el-form-item label="流出接口" prop=""  class="item_mark">
                        <el-select v-model.trim="editInfo.oEth"  placeholder="请选择流出接口" class="el_sel">
                            <el-option label="任何" value="all" ></el-option>
                            <el-option
                                    v-for="eth in ethNames"
                                    :key="eth"
                                    :label="eth"
                                    :value="eth">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="源服务" prop="service" class="item_mark">
                        <el-select v-model.trim="editInfo.src_service"  placeholder="请选择源服务" class="el_sel">
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

                    <el-form-item label="目的服务" prop="service" class="item_mark">
                        <el-select v-model.trim="editInfo.des_service"  placeholder="请选择目的服务" class="el_sel">
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

                    <el-form-item label="动作" prop="" >
                        <el-radio-group v-model.trim="editInfo.action"  class="el_put">
                            <el-radio label="t">源地址转换</el-radio>
                            <el-radio label="m">地址伪装</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <span v-if="editInfo.action=='t'">
                        <el-form-item label="地址转换为" prop="" class="item_mark">
                         <el-input v-model.trim="editInfo.tran_ip"  placeholder="请输入ip地址，端口号用 : 分隔" class="el_put"></el-input>
                        </el-form-item>
                    </span>

                    <el-form-item label="状态" prop=""  >
                        <el-radio-group v-model.trim="editInfo.state"  class="el_put">
                            <el-radio label="on">启用</el-radio>
                            <el-radio label="off">停止</el-radio>
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
                            class="primary confirm btn_middle"
                            type="primary"
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
    import {isNameExist, updateSnat} from "api/firewall/snat";
    import {getIpListSelect} from "api/firewall/ip";
    import {getIpGroupListSelect} from "api/firewall/ipGroup";
    import {getServiceListSelect} from "api/firewall/service";
    import {getAllNetNameList} from "../../../../api/systemSet/new_networkConfig/new_routerApi";
    //    import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";
    export default{
//        components: {ElFormItem},
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
                if ((value=='0.0.0.0')||(value=='0.0.0.0/0')||(value=='0.0.0.0/0.0.0.0')){
                    callback(new Error("该规则不允许被配置"));
                }

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
                    name: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],
                    fillSip: [
                        {required: true, validator: validateIp, trigger: 'blur'}
                    ],
                    fillDip: [
                        {required: true, validator: validateIp, trigger: 'blur'}
                    ],
                    tran_ip: [
                        {required: true, validator: validateIpTran, trigger: 'blur'}
                    ]

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
                    oEth:'',
                    src_service:'',
                    des_service:'',
                    tran_ip:'',
                    action:'t',
                    state:'on',
                },
                editVisible: true,

                serviceList:[],
                ethNames:[],
                ipgList:[],
                ipList:[],

                id:'',
                preName:'',
                sort:''
            }
        },
        created(){
            this.setListForSelect();
            this.doInit(this.currentData)
        },

        props: {
            currentData: Object
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

            validate() {
                
                var ip1 = this.editInfo.fillSip;
                var ip2 = this.editInfo.fillDip;
                var ip3 = this.editInfo.tran_ip;
                var reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
                var numReg = /^-?\d+$/;
                if (/^(\w){1,20}$/.test(this.editInfo.name) == false) {
                    this.$message({
                        type: 'warning',
                        message: '名称请输入1-20位字母、数字、下划线！'
                    });
                    return false;
                }
                if (this.editInfo.sourceIpType == '1') {
                    /*if (ip1.indexOf("/") < 0) {
                        if (reg.test(ip1) == false) {
                            this.$message({type: 'warning', message: '请输入正确的ipv4地址-源地址'});
                            return false;
                        }

                        if ('0.0.0.0'==ip1){
                            this.$message({type: 'warning', message: '源地址不可为 0.0.0.0'});
                            return false;
                        }
                    } else {
                        var ip = ip1.split("/");

                        if ('0.0.0.0/0'==ip1){
                            this.$message({type: 'warning', message: '源地址不可为 0.0.0.0/0'});
                            return false;
                        }

                        if ('0.0.0.0/0.0.0.0'==ip1){
                            this.$message({type: 'warning', message: '源地址不可为 0.0.0.0/0.0.0.0'});
                            return false;
                        }

                        if (reg.test(ip[0]) == false) {
                            this.$message({type: 'warning', message: '请输入正确的ipv4地址-源地址'});
                            return false;
                        } else if ((numReg.test(ip[1]) == false) || (ip[1] < 0 || ip[1] > 32)) {
                            this.$message({type: 'warning', message: '请输入正确的掩码范围值-源地址'});
                            return false;
                        }
                    }*/
                    if(!this.editInfo.fillSip){
                        this.$message({
                            type: 'warning',
                            message: '源地址地址不能为空！'
                        });
                        return false;
                    }
                }else if(this.editInfo.sourceIpType=='0'){
                    if(!this.editInfo.chooseSip){
                        this.$message({
                            type: 'warning',
                            message: '源地址地址不能为空！'
                        });
                        return false;
                    }
                }else {
                    if(!this.editInfo.chooseSipGroup){
                        this.$message({
                            type: 'warning',
                            message: '源地址不能为空！'
                        });
                        return false;
                    }
                }

                    if (this.editInfo.desIpType == '1') {
                        /*if (ip2.indexOf("/") < 0) {
                            if (reg.test(ip2) == false) {
                                this.$message({type: 'warning', message: '请输入正确的ipv4地址-目的地址'});
                                return false;
                            }
                        } else {
                            var ip = ip2.split("/");
                            if (reg.test(ip[0]) == false) {
                                this.$message({type: 'warning', message: '请输入正确的ipv4地址-目的地址'});
                                return false;
                            } else if ((numReg.test(ip[1]) == false) || (ip[1] < 0 || ip[1] > 32)) {
                                this.$message({type: 'warning', message: '请输入正确的掩码范围值-目的地址'});
                                return false;
                            }
                        }*/
                        if(!this.editInfo.fillDip){
                            this.$message({
                                type: 'warning',
                                message: '目的地址不能为空！'
                            });
                            return false;
                        } 
                    }else if(this.editInfo.desIpType=='0'){
                        if(!this.editInfo.chooseDip){
                            this.$message({
                                type: 'warning',
                                message: '目的地址不能为空！'
                            });
                            return false;
                        }
                    }else {
                        if(!this.editInfo.chooseDipGroup){
                            this.$message({
                                type: 'warning',
                                message: '目的地址不能为空！'
                            });
                            return false;
                        }
                    }

                if(this.editInfo.oEth==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择流出接口！'
                    });
                    return false;
                }

                if(this.editInfo.src_service==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择源服务！'
                    });
                    return false;
                }

                if(this.editInfo.des_service==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择目的服务！'
                    });
                    return false;
                }

                if(this.editInfo.action==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择动作！'
                    });
                    return false;
                }
                // if(this.editInfo.action=='t'&& /^(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])$|(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(ip3)==false){
                if(this.editInfo.action=='t'&&!this.editInfo.tran_ip){
                    this.$message({
                        type: 'warning',
                        message: '地址转换为不能空！'
                    });
                    return false;
                }

                if(this.editInfo.state==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择状态！'
                    });
                    return false;
                }

                    var spid = this.editInfo.src_service;
                    var dpid = this.editInfo.des_service;

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
                                id:this.id,
                                name: this.editInfo.name,
                                srcIpType: this.editInfo.sourceIpType,
                                srcIp: this.editInfo.fillSip,
                                srcId: this.editInfo.chooseSip,
                                srcIdg: this.editInfo.chooseSipGroup,
                                desIpType: this.editInfo.desIpType,
                                desIp: this.editInfo.fillDip,
                                desId: this.editInfo.chooseDip,
                                desIdg: this.editInfo.chooseDipGroup,
                                srcServiceId:this.editInfo.src_service,
                                desServiceId: this.editInfo.des_service,
                                ethOut: this.editInfo.oEth,
                                tranIp: this.editInfo.tran_ip,
                                action: this.editInfo.action,
                                state: this.editInfo.state,
                                sort:this.sort,
                            };

                            updateSnat(newdto).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改源地址转换配置成功！'
                                    });
                                    this.editVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs[formName].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message:  resp.code.info
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

                //console.log(currentData);
                let row = this.currentData;
                this.editInfo.name = row.name;
                this.preName = row.name;

                this.id = row.id;
                this.sort = row.sort;
                this.editInfo.sourceIpType = row.srcIpType;
                this.editInfo.fillSip = row.srcIp;
                this.editInfo.chooseSipGroup=row.srcIdg;
                this.editInfo.desIpType=row.desIpType;
                this.editInfo.fillDip=row.desIp;
                this.editInfo.chooseDipGroup=row.desIdg;
                this.editInfo.oEth = row.ethOut;
                this.editInfo.tran_ip = row.tranIp;
                this.editInfo.action = row.action;
                this.editInfo.state=row.state;


                if (row.srcId==0){
                    this.editInfo.chooseSip='0';
                }else {
                    this.editInfo.chooseSip=row.srcId;
                }

                if (row.desId==0){
                    this.editInfo.chooseDip='0';
                }else {
                    this.editInfo.chooseDip=row.desId;
                }

                if (row.desServiceId==0){
                    this.editInfo.des_service='0';
                }else {
                    this.editInfo.des_service=row.desServiceId;
                }
                if (row.srcServiceId==0){
                    this.editInfo.src_service='0';
                }else {
                    this.editInfo.src_service=row.srcServiceId;
                }

                console.log(this.editInfo);
            },

            resetForm(formName) {
                console.log(formName, '------');
                this.editVisible = false;
                this.$refs[formName].resetFields();
            },

        },
    }
</script>
<style>


</style>