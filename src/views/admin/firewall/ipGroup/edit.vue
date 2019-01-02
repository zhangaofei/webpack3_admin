<template>
    <div class="ipgroup public">
        <el-dialog
                title="修改IP组设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="ipgroup-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="105px" class="ipgroup-form">
                    <el-form-item label="IP组名称 " prop="name">
                        <el-input v-model="editInfo.name"  class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="引用IP地址" prop="selected_address">
                        <el-select v-model="editInfo.selected_address" multiple collapse-tags  class="el_sel">
                            <el-option
                                    v-for="ip in ipList"
                                    :key="ip"
                                    :label="ip"
                                    :value="ip">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="自定义IP地址" prop="defined_address">
                        <el-input type="textarea" :rows="2" v-model="editInfo.defined_address"
                                  placeholder="请输入ip地址,回车换行,可输入ipv4地址如1.1.1.1,Ipv4地址段如1.1.1.1-2.2.2.2,子网掩码形式如1.1.1.1/24或1.1.1.1/255.255.255.0" class="el_put"></el-input>
                    </el-form-item>


                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div class="foot">
                    <span class="cancle" @click="resetForm('editInfo')">
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
    import {updateIpGroup, isNameExist} from "api/firewall/ipGroup";
    import {getIpList} from "api/firewall/ip";
    export default{
        components: {},
        data(){
            var validateName = (rule, value, callback) =>
            {
                if (/^(\w){1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    if (this.preName != value) {

                    isNameExist({name: value}).then((resp) => {
                        if (resp.data.exist == true) {
                            callback(new Error("该名称已存在"));
                        }
                        callback();
                    }).catch(e => {
                    });
                }else {
                        callback();
                    }
                }
            };

            var validateAddress = (rule, value, callback) => {
                var ip = "";
                var ip2 = "";
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                //var maskReg = /^(254|252|248|240|224|192|128|0)\\.0\\.0\\.0|255\\.(254|252|248|240|224|192|128|0)\\.0\\.0|255\\.255\\.(254|252|248|240|224|192|128|0)\\.0|255\\.255\\.255\\.(254|252|248|240|224|192|128|0)$/;
                var numReg = /^-?\d+$/;
                var masks = ["128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0",
                    "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0", "255.255.0.0",
                    "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0",
                    "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248",
                    "255.255.255.252", "255.255.255.254", "255.255.255.255"];
                if (value.length < 1 && this.editInfo.selected_address.length < 1) {
                    callback(new Error("请至少自定义或引用一条ip地址"))
                }else if(value.length>1){
                    var valueList = value.split("\n");
                    for (var i = 0; i < valueList.length; i++) {
                        var valueItem = valueList[i];
                        if (valueItem.length>32||valueItem.indexOf(",")>-1){
                            callback(new Error("地址之间请回车换行分隔"));
                        }else {
                        if (valueItem.indexOf("-") <0 && valueItem.indexOf("/") < 0) {
                            if (ipReg.test(valueItem)==false){
                                callback(new Error("请填入正确的ipv4地址,地址段请用'-'分隔;子网掩码请用'/'分隔"));

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
                                } else if(ip2.indexOf(".")>0){ //全写
                                    if (masks.indexOf(ip2)<0){
                                        callback(new Error("掩码全写不合法，请检查输入"));
                                    }
                                }else {//简写
                                    if ((numReg.test(ip2)==false)||(ip2<0||ip2>32)){
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
                editInfo: {
                    name: '',
                    defined_address:'',
                    selected_address:[]
                },
                editVisible: true,
                id:'',
                ipList:[],
                addList:[],
                preName:''
            }
        },

        props: {
            currentData: Object
        },
        created(){
            this.doInit(this.currentData)
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
                        console.log("editInfo", this.editInfo)
                        var newIp={
                            id:this.id,
                            name: this.editInfo.name,
                            addArray:[]
                        };
                        var defineList = this.editInfo.defined_address.split("\n");
                        newIp.addArray = this.editInfo.selected_address.concat(defineList);

                        updateIpGroup(newIp).then((resp)=> {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '修改ip组成功！'
                                });
                                this.editVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type:'warning',
                                    message:'修改ip组失败！'
                                });
                            }
                        }).catch(e=> {
                            console.log("修改出错", e);
                        });


                    } else {

                        return false;
                    }
                });
            },

            doInit(currentData){

                let row = this.currentData;
                this.editInfo.name = row.name;
                this.preName = row.name;
                this.id = row.id;
                this.addList = row.addArray;

                getIpList().then((resp)=>{
                    for (var i=0;i<resp.data.length;i++){
                        var ipdto = resp.data[i];
                        if(ipdto.rangeMask=='0'){
                            this.ipList.push(ipdto.ip+'-'+ipdto.ipEnd);
                        }else if(ipdto.rangeMask=='1'){
                            this.ipList.push(ipdto.ip+'/'+ipdto.ethNum);
                        }else {
                            this.ipList.push(ipdto.ip);
                        }
                    }

                    for (var i=0;i<this.addList.length;i++){
                        if(this.ipList.toString().indexOf(this.addList[i].toString())>-1){
                            this.editInfo.selected_address.push(this.addList[i]);
                        }else {
                            if (this.editInfo.defined_address.length<1){
                                this.editInfo.defined_address = this.editInfo.defined_address + this.addList[i];
                            }else {
                                this.editInfo.defined_address = this.editInfo.defined_address + "\n"+ this.addList[i] ;
                            }


                        }

                    }

                }).catch(err=>{

                });

            },

            resetForm(formName) {
                console.log(formName, '------');
                this.editVisible = false;
                this.$refs[formName].resetFields();
            },


        },
    }
</script>
