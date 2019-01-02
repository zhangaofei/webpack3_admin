<template>
    <div class="dnat public">
        <el-dialog
                title="新建目的地址转换设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose">
            <div class="dnat-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="116px" class="dnat-form">
                    <el-form-item label="名称 " prop="" class="item_mark">
                        <!--<span class="dot" style="position: absolute;right: 101%;color: red;">*</span>-->
                        <el-input v-model.trim="addInfo.name" placeholder="请输入名称" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="源地址类型"  class="item_mark">
                        <!--<span class="dot" style="position: absolute;right: 109%;color: red;">*</span>-->
                        <el-select v-model.trim="addInfo.sourceIpType" placeholder="请选择源地址类型" class="el_sel">
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
                            <!--<span class="" style="position: absolute;right: 104%;color: red;">*</span>-->
                            <el-input v-model.trim="addInfo.fillSip"  placeholder="请输入源地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else-if="addInfo.sourceIpType=='0'">
                        <el-form-item label="源地址"  class="item_mark">
                            <!--<span class="dot" style="position: absolute;right: 104%;color: red;">*</span>-->
                            <el-select v-model.trim="addInfo.chooseSip" placeholder="请选择源地址" class="el_sel">
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
                   <!-- <span v-else-if="addInfo.sourceIpType=='2'">
                        <el-form-item label="源地址"  class="el_put item_mark">
                             <span class="dot" style="position: absolute;right: 104%;color: red;">*</span>
                            <el-select v-model.trim="addInfo.chooseSipGroup" placeholder="请选择源地址" class="el_put">
                                <el-option
                                        v-for="ipg in ipgList"
                                        :key="ipg.id"
                                        :label="ipg.name"
                                        :value="ipg.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </span>-->


                    <el-form-item label="内部地址类型" class="item_mark">
                        <!--<span class="dot" style="position: absolute;right: 111%;color: red;">*</span>-->
                        <el-select v-model.trim="addInfo.innerIpType" placeholder="请选择内部地址类型" class="el_sel">
                            <!--<el-option label="自定义" value="1" ></el-option>-->
                            <!--<el-option label="预定义ip" value="0" ></el-option>-->
                            <!-- <el-option label="预定义ip组" value="2" ></el-option>-->
                            <el-option
                                    v-for="item in optionsInner"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <span v-if="addInfo.innerIpType=='1'">
                        <el-form-item label="内部地址" prop="" class="item_mark" >
                            <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
                            <el-input v-model.trim="addInfo.fillInnerIp"  prop="dip" placeholder="请输入内部地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else-if="addInfo.innerIpType=='0'">
                        <el-form-item label="内部地址" class="item_mark">
                            <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
                            <el-select v-model.trim="addInfo.chooseInnerIp" placeholder="请选择内部地址" class="el_sel">
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
                   <!-- <span v-else-if="addInfo.innerIpType=='2'">
                        <el-form-item label="内部地址" class="item_mark">
                            &lt;!&ndash;<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>&ndash;&gt;
                            <el-select v-model.trim="addInfo.chooseInnerIpGroup" placeholder="请选择内部地址" class="el_put">
                                <el-option
                                        v-for="ipg in ipgList"
                                        :key="ipg.id"
                                        :label="ipg.name"
                                        :value="ipg.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </span>-->

                    <el-form-item label="公开地址类型"  class="item_mark">
                        <!--<span class="dot" style="position: absolute;right: 111%;color: red;">*</span>-->
                        <el-select v-model.trim="addInfo.pubIpType" placeholder="请选择公开地址类型" class="el_sel">
                            <!--<el-option label="自定义" value="1" ></el-option>-->
                            <!--<el-option label="预定义ip" value="0" ></el-option>-->
                            <!--<el-option label="预定义ip组" value="2" ></el-option>-->
                            <el-option
                                    v-for="item in optionsPub"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <span v-if="addInfo.pubIpType=='1'">
                        <el-form-item label="公开地址" prop=""  class="item_mark">
                            <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
                            <el-input v-model.trim="addInfo.fillPubIp"  prop="dip" placeholder="请输入公开地址" class="el_put"></el-input>
                        </el-form-item>
                    </span>
                    <span v-else-if="addInfo.pubIpType=='0'">
                        <el-form-item label="公开地址" class="item_mark" >
                            <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
                            <el-select v-model.trim="addInfo.choosePubIp" placeholder="请选择公开地址" class="el_sel">
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
                    <!--<span v-else-if="addInfo.pubIpType=='2'">
                        <el-form-item label="公开地址"  class="item_mark">
                            &lt;!&ndash;<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>&ndash;&gt;
                            <el-select v-model.trim="addInfo.choosePubIpGroup"  placeholder="请选择公开地址" class="el_sel">
                                <el-option
                                        v-for="ipg in ipgList"
                                        :key="ipg.id"
                                        :label="ipg.name"
                                        :value="ipg.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </span>-->

                    <el-form-item label="流入接口" prop="" class="item_mark">
                        <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
                        <el-select v-model.trim="addInfo.iEth"  placeholder="请选择流入接口" class="el_sel">
                            <el-option label="任何" value="all" ></el-option>
                            <el-option
                                    v-for="eth in ethNames"
                                    :key="eth"
                                    :label="eth"
                                    :value="eth">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="对外服务" prop="" class="item_mark">
                        <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
                        <el-select v-model.trim="addInfo.out_service"  placeholder="请选择对外服务" class="el_sel">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="对内服务" prop="" class="item_mark">
                        <!--<span class="dot" style="position: absolute;right: 106%;color: red;">*</span>-->
                        <el-select v-model.trim="addInfo.in_service"  placeholder="请选择对内服务" class="el_sel">
                            <el-option label="任何" value="0" ></el-option>
                            <el-option
                                    v-for="s in serviceList"
                                    :key="s.id"
                                    :label="s.name"
                                    :value="s.id">
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="状态" prop=""    >
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
    import {addDnat, isNameExist} from "api/firewall/dnat";
    import {getIpListSelect} from "api/firewall/ip";
    import {getIpGroupListSelect} from "api/firewall/ipGroup";
    import {getServiceListSelect} from "api/firewall/service";
    import {getAllNetNameList} from "../../../../api/systemSet/new_networkConfig/new_routerApi";
    export default{

        data(){
            var validateName = (rule, value, callback) =>
            {
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
            

            return {
                rules: {
                    name: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],
                    fillSip: [
                        {required: true, validator: validateIp, trigger: 'blur'}
                    ],
                    fillInnerIp: [
                        {required: true, validator: validateIp, trigger: 'blur'}
                    ],

                },
                addInfo: {
                    name: '',
                    sourceIpType:'1',
                    fillSip:'',
                    chooseSip:'',
                    chooseSipGroup:'',
                    innerIpType:'1',
                    fillInnerIp:'',
                    chooseInnerIp:'',
                    chooseInnerIpGroup:'',
                    pubIpType:'1',
                    fillPubIp:'',
                    choosePubIp:'',
                    choosePubIpGroup:'',
                    iEth:'',
                    out_service:'',
                    in_service:'',
                    action:'t',
                    state:'off',
                },
                addVisible: true,

                serviceList:[],
                ethNames:[],
                ipgList:[],
                ipList:[],
                ipv4List:[],
                options: [{
                    value: '1',
                    label: '自定义'
                }, {
                    value: '0',
                    label: '预定义ip'
                }],
                optionsPub: [{
                    value: '1',
                    label: '自定义'
                }, {
                    value: '0',
                    label: '预定义ip'
                }],
                optionsInner: [{
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

            validate() {

                if (/^(\w){1,20}$/.test(this.addInfo.name) == false) {
                    this.$message({
                        type: 'warning',
                        message: '名称请输入1-20位字母、数字、下划线！'
                    });
                    return false;
                }

                if(this.addInfo.sourceIpType=='1'){
                    /*let reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
                    let numReg = /^-?\d+$/;
                    let value=this.addInfo.fillSip;
                    if (value.indexOf("/")<0){
                        if (reg.test(value) == false) {
                            this.$message({
                                type: 'warning',
                                message: '请输入正确的ipv4地址！'
                            });
                            return false;
                        }
                    }else {
                        let ip = value.split("/");
                        if (reg.test(ip[0]) == false) {
                            this.$message({
                                type: 'warning',
                                message: '请输入正确的ipv4地址！'
                            });
                        } else if((numReg.test(ip[1])==false)||(ip[1]<0||ip[1]>32)){
                            this.$message({
                                type: 'warning',
                                message: '请输入正确的掩码范围值！'
                            });
                        }else {

                        }
                    }*/
                    if(this.addInfo.fillSip==''){
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


                if(this.addInfo.pubIpType==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择公开地址类型！'
                    });
                    return false;
                }



                var ip1 = this.addInfo.fillSip;
                var ip2 = this.addInfo.fillInnerIp;
                var ip3 = this.addInfo.fillPubIp;
                var reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
                var numReg = /^-?\d+$/;
                if (this.addInfo.innerIpType=='1'){
                   /* if (ip2.indexOf("/")<0){
                        if (reg.test(ip2) == false) {
                            this.$message({type: 'warning', message: '内部地址请输入正确的ipv4地址'});
                            return false;
                        }
                    }else {
                        var ip = ip2.split("/");
                        if (reg.test(ip[0]) == false) {
                            this.$message({type: 'warning', message: '内部地址请输入正确的ipv4地址'});
                            return false;
                        } else if((numReg.test(ip[1])==false)||(ip[1]<0||ip[1]>32)){
                            this.$message({type: 'warning', message: '内部地址请输入正确的掩码范围值'});
                            return false;
                        }
                    }*/
                    if(!this.addInfo.fillInnerIp){
                        this.$message({
                            type: 'warning',
                            message: '内部地址不能为空！'
                        });
                        return false;
                    }
                }else if(this.addInfo.innerIpType=='0'){
                    if(!this.addInfo.chooseInnerIp){
                        this.$message({
                            type: 'warning',
                            message: '内部地址不能为空！'
                        });
                        return false;
                    }
                }else {
                    if(!this.addInfo.chooseInnerIpGroup){
                        this.$message({
                            type: 'warning',
                            message: '内部地址不能为空！'
                        });
                        return false;
                    }
                }

                if (this.addInfo.pubIpType=='1'){
                  /*  if (ip3.indexOf("/")<0){
                        if (reg.test(ip3) == false) {
                            this.$message({type: 'warning', message: '公开地址请输入正确的ipv4地址'});
                            return false;
                        }
                    }else {
                        var ip = ip3.split("/");
                        if (reg.test(ip[0]) == false) {
                            this.$message({type: 'warning', message: '公开地址请输入正确的ipv4地址'});
                            return false;
                        } else if((numReg.test(ip[1])==false)||(ip[1]<0||ip[1]>32)){
                            this.$message({type: 'warning', message: '公开地址请输入正确的掩码范围值'});
                            return false;
                        }
                    }*/
                    if(!this.addInfo.fillPubIp){
                        this.$message({
                            type: 'warning',
                            message: '公开地址不能为空！'
                        });
                        return false;
                    }
                }else if(this.addInfo.pubIpType=='0'){
                    if(!this.addInfo.choosePubIp){
                        this.$message({
                            type: 'warning',
                            message: '公开地址不能为空！'
                        });
                        return false;
                    }
                }else {
                    if(!this.addInfo.choosePubIpGroup){
                        this.$message({
                            type: 'warning',
                            message: '公开地址不能为空！'
                        });
                        return false;
                    }
                }

                if(this.addInfo.iEth==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择流入接口！'
                    });
                    return false;
                }

                if(this.addInfo.out_service==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择对外服务！'
                    });
                    return false;
                }

                if(this.addInfo.in_service==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择对内服务！'
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


                if(this.addInfo.state==''){
                    this.$message({
                        type: 'warning',
                        message: '请选择状态！'
                    });
                    return false;
                }
                return true;
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
                                innerIpType: this.addInfo.innerIpType,
                                innerIp: this.addInfo.fillInnerIp,
                                innerId: this.addInfo.chooseInnerIp,
                                innerIdg: this.addInfo.chooseInnerIpGroup,
                                pubIpType: this.addInfo.pubIpType,
                                pubIp: this.addInfo.fillPubIp,
                                pubId: this.addInfo.choosePubIp,
                                pubIdg: this.addInfo.choosePubIpGroup,
                                outServiceId:this.addInfo.out_service,
                                inServiceId: this.addInfo.in_service,
                                ethIn: this.addInfo.iEth,
                                action: this.addInfo.action,
                                state: this.addInfo.state,
                                sort:0,
                            };

                            addDnat(newdto).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '新建目的地址转换配置成功！'
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
