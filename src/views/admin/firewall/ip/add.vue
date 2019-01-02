<template>
    <div class="ip public">
        <el-dialog
                title="新建IP设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose">
            <div class="ip-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="94px" class="ip-form">
                    <el-form-item label="IP名称 " prop="name">
                        <el-input v-model="addInfo.name" placeholder="请输入ip名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="IP地址" prop="address">
                        <el-input v-model="addInfo.address" class="el_put" placeholder="请输入ip地址"></el-input>
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
    import {addIp, isNameExist} from "api/firewall/ip";
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

            var validateAddress = (rule, value, callback) =>
            {
                var ip="";
                var ip2 ="";
                var ipReg =/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                var numReg = /^-?\d+$/;
                var masks = ["128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0",
                    "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0", "255.255.0.0",
                    "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0",
                    "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248",
                    "255.255.255.252", "255.255.255.254", "255.255.255.255"];

                if(value.indexOf("-")*value.indexOf("/")>0){
                    if (ipReg.test(value)==false){
                        callback(new Error("请填入正确的ipv4地址,地址段请用'-'分隔;子网掩码请用'/'分隔"));
                    }else {
                        callback();
                    }
                }else {
                    if (value.indexOf("-")>0){
                        var array = value.split("-");
                        ip = array[0];
                        ip2=array[1];
                        if (ipReg.test(ip) == false){
                            console.log("ip" + ip);
                            callback(new Error("起始ip不合法，请检查输入"));
                        }else if (ipReg.test(ip2) == false){
                            console.log("ip2" + ip2);
                            callback(new Error("结束ip不合法，请检查输入"));
                        }else {
                            callback();
                        }
                    }else{
                        var array = value.split("/");
                        ip = array[0];
                        ip2=array[1];
                        if (ipReg.test(ip) == false ){
                            callback(new Error("ip不合法，请检查输入"));
                        }else if(ip2.indexOf(".")>0){ //全写
                            if (masks.indexOf(ip2)<0){
                                callback(new Error("掩码全写不合法，请检查输入"));
                            }else {
                                callback();
                            }
                        }else {//简写
                            if ((numReg.test(ip2)==false)||(ip2<0||ip2>32)){
                                callback(new Error("掩码简写不合法，请检查输入"));
                            }else {
                                callback();
                            }
                        }
                    }
                }
            };
            return {
                rules: {
                    name: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],
                    address: [
                        {required: true, validator: validateAddress, trigger: 'blur'}
                    ],
                },
                addInfo: {
                    name: '',
                    address:''
                },
                addVisible: true,
                arrs: []
            }
        },
        created(){

        },
        methods: {
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("addInfo", this.addInfo)
                        var newIp={
                                name: this.addInfo.name,
                                rangeMask: '',
                                ip: '',
                                ipEnd: '',
                                ethNum: ''
                        };
                        if (this.addInfo.address.indexOf("-")>0){
                            newIp.rangeMask=0;
                            var array = this.addInfo.address.split("-");
                            newIp.ip=array[0];
                            newIp.ipEnd=array[1];
                        }else if (this.addInfo.address.indexOf("/")>0){
                            newIp.rangeMask=1;
                            var array = this.addInfo.address.split("/");
                            newIp.ip=array[0];
                            newIp.ethNum=array[1];
                        }else {
                            newIp.rangeMask=2;
                            newIp.ip=this.addInfo.address;
                        }
                        addIp(newIp).then((resp)=> {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '新建ip成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type:'warning',
                                    message:'新建ip失败！'
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
        },
    }
</script>
<style>


</style>