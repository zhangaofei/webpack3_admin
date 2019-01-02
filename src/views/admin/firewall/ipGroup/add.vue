<template>
    <div class="ipgroup public">
        <el-dialog
                title="新建IP组设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose">
            <div class="ipgroup-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="105px" class="ipgroup-form">
                    <el-form-item label="IP组名称 " prop="name">
                        <el-input v-model="addInfo.name" placeholder="请输入IP组名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="引用IP地址" prop="selected_address">
                        <el-select v-model="addInfo.selected_address" multiple collapse-tags placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="ip in ipList"
                                    :key="ip"
                                    :label="ip"
                                    :value="ip">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="自定义IP地址" prop="defined_address">
                        <el-input type="textarea" :autosize="{minRows: 5}" :rows="2" v-model="addInfo.defined_address" class="el_put" :placeholder="'请输入IP地址\r\n多行输入按回车换行,可输入:\r\nipv4地址如:1.1.1.1\r\nIpv4地址段如:1.1.1.1-2.2.2.2\r\n子网掩码形式如:1.1.1.1/24或1.1.1.1/255.255.255.0'"></el-input>
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
    import {addIpGroup, isNameExist} from "api/firewall/ipGroup";
    import {getIpList} from "api/firewall/ip";
    export default{
        components: {},
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

            var validateAddress = (rule, value, callback) => {
                var ip = "";
                var ip2 = "";
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
               // var maskReg = /^(254|252|248|240|224|192|128|0)\\.0\\.0\\.0|255\\.(254|252|248|240|224|192|128|0)\\.0\\.0|255\\.255\\.(254|252|248|240|224|192|128|0)\\.0|255\\.255\\.255\\.(254|252|248|240|224|192|128|0)$/;
                var numReg = /^-?\d+$/;
                var masks = ["128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0",
                    "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0", "255.255.0.0",
                    "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0",
                    "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248",
                    "255.255.255.252", "255.255.255.254", "255.255.255.255"];

                if (value.length < 1 && this.addInfo.selected_address.length < 1) {
                    callback(new Error("请至少自定义或引用一条ip地址"))
                } else if(value.length>1){
                    var valueList = value.split("\n");
                for (var i = 0; i < valueList.length; i++) {
                    var valueItem = valueList[i];
                    if (valueItem.length>32||valueItem.indexOf(",")>-1){
                        callback(new Error("地址之间请回车换行分隔"));
                    }else {
                    if (valueItem.indexOf("-") * valueItem.indexOf("/") > 0) {
                        if (ipReg.test(valueItem) == false) {
                            callback(new Error("请填入正确的ipv4地址,地址段请用'-'分隔;子网掩码请用'/'分隔"));
                           // callback(new Error(value));
                        }
                    } else {
                        if (valueItem.indexOf("-") > 0) {
                            var array = valueItem.split("-");
                            ip = array[0];
                            ip2 = array[1];
                            if (ipReg.test(ip) == false) {
                                console.log("ip" + ip);
                                callback(new Error("起始ip不合法，请检查输入"));
                            } else if (ipReg.test(ip2) == false) {
                                console.log("ip2" + ip2);
                                callback(new Error("结束ip不合法，请检查输入"));
                            }
                        } else {
                            var array = valueItem.split("/");
                            ip = array[0];
                            ip2 = array[1];
                            if (ipReg.test(ip) == false) {
                                callback(new Error("ip不合法，请检查输入"));
                            } else if (ip2.indexOf(".") > 0) { //全写
                                if (masks.indexOf(ip2) < 0) {
                                    callback(new Error("掩码全写不合法，请检查输入"));
                                }
                            } else {//简写
                                if ((numReg.test(ip2) == false) || (ip2 < 0 || ip2 > 32)) {
                                    callback(new Error("掩码简写不合法，请检查输入"));
                                }
                            }
                        }
                    }
                }
                }
                callback();
            }else {
                    callback();
                }

            };
            return {
                rules: {
                    name: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],
                    defined_address: [
                        {required: false, validator: validateAddress, trigger: 'blur'}
                    ],
                },
                addInfo: {
                    name: '',
                    defined_address:'',
                    selected_address:''
                },
                addVisible: true,
                ipList: []
            }
        },
        created(){
            this.getIpAddrList();
        },
        methods: {
            handleClose() {
                this.changeStatus();
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var newIp={
                            name: this.addInfo.name,
                            addArray:''
                        };
                        var defineList = this.addInfo.defined_address.split("\n");
                        newIp.addArray = this.addInfo.selected_address.concat(defineList);

                        addIpGroup(newIp).then((resp)=> {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '新建ip组成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type:'warning',
                                    message:'新建ip组失败！'
                                });
                            }
                        }).catch(e=> {
                            console.log("新建出错", e);
                        });


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

            getIpAddrList(){
                getIpList().then((resp)=>{
                    for (var i=0;i<resp.data.length;i++){
                        var ipdto = resp.data[i];
                        if(ipdto.rangeMask=='0'){
                            this.ipList.push(ipdto.ip+'-'+ipdto.ipEnd);
                        }else if (ipdto.rangeMask=='1'){
                            this.ipList.push(ipdto.ip+'/'+ipdto.ethNum);
                        }else {
                            this.ipList.push(ipdto.ip);
                        }

                    }

                }).catch(err=>{

                });
            },
        },
    }
</script>
