<template>
    <div class="l3net-auth public">
        <el-dialog
                title="设置-虚拟网络"
                :visible.sync="addVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose">
            <div  class="l3net-form">
                <el-form :model="addInfo" ref="addInfo" label-width="142px" :rules="rules" class="demo-ruleForm" MultipartFile>
                    <el-form-item label="地址池" prop="net" class="el_lab">
                        <el-input v-model="addInfo.net" class="el_put" placeholder="例1.1.0.0/255.255.0.0"></el-input>
                    </el-form-item>
                    <el-form-item label="网关" prop="gateway"  class="el_lab">
                        <el-input v-model="addInfo.gateway"  class="el_put" placeholder="格式: x.x.x.x, 多个时用 ; 隔开"></el-input>
                    </el-form-item>
                    <el-form-item label="DNS" prop="dns" class="el_lab">
                        <el-input v-model="addInfo.dns" class="el_put" placeholder="格式: x.x.x.x, 多个时用 ; 隔开"></el-input>
                    </el-form-item>
                    <el-form-item label="WINS" prop=""  class="el_lab">
                        <el-input v-model="addInfo.wins" class="el_put" placeholder="请输入WINS"></el-input>
                    </el-form-item>
                    <el-form-item label="sufix" prop=""  class="el_lab">
                        <el-input v-model="addInfo.suffix" class="el_put" placeholder="请输入sufix"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div   class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo',dialogVisible)">取消</span>
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
    import {getSystemConfig, editSystemConfig} from "../../../../../api/SSL_VPN/new_resourceManager/new_L3Net";
    export default{
        components: {

        },
        data(){
            var ips = (rule, value, callback) => {
                let arr = value.split(';');
                let res = true;
                for (let i = 0; i < arr.length; i++){
                    if(!arr[i]){
                        res = true;
                    } else if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(arr[i]) == false){
                        res = false;
                    } else {
                        res = true
                    }
                }
                if (res == false){
                    callback(new Error("请输入正确的DNS"));
                } else {
                    callback();
                }
            };
            var net = (rule, value, callback) => {
                let arr = value.split(';');
                let res = true;
                for (let i = 0; i < arr.length; i++){
                    if(!arr[i]){
                        res = true;
                    } else if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(arr[i]) == false){
                        res = false;
                    } else {
                        res = true
                    }
                }
                if (res == false){
                    callback(new Error("请输入正确的网关"));
                } else {
                    callback();
                }
            };
            var ip = (rule, value, callback) => {
                let arr = value.split('/');
                let str1 = arr[0];
                let str2 = arr[1];
                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(str1) == false){
                    callback(new Error("请输入正确的IP地址"));
                } else if(/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(str2) == false){
                    callback(new Error("请输入正确的子网掩码"));
                } else {
                    callback();
                }
            };
            return {
                rules:{
                    net :[
                        {required: true, validator: ip, trigger:'blur'}
                    ],
                    dns :[
                        { validator: ips, trigger:'blur'}
                    ],
                    gateway:[
                        { validator: net, trigger:'blur'}
                    ]
                },
                addInfo:{
                    net: '',
                    gateway: '',
                    dns: '',
                    wins: '',
                    suffix: ''
                },
                sourceData:[],
                addVisible:true
            }
        },
        created(){
            this.getList();
        },
        methods: {
            getList(){
                getSystemConfig().then((resp)=>{
                    if(resp.status == 'SUCCESS'){
                        this.sourceData = resp.data;
                        for(let i = 0; i < this.sourceData.length; i++){
                            if(this.sourceData[i]['name'] == 'vfn_net'){
                                this.addInfo.net = this.sourceData[i]['setting'];
                            } else if(this.sourceData[i]['name'] == 'vfn_gateway'){
                                this.addInfo.gateway = this.sourceData[i]['setting'];
                            } else if(this.sourceData[i]['name'] == 'vfn_dns'){
                                this.addInfo.dns = this.sourceData[i]['setting'];
                            } else if(this.sourceData[i]['name'] == 'vfn_wins'){
                                this.addInfo.wins = this.sourceData[i]['setting'];
                            } else if(this.sourceData[i]['name'] == 'vfn_dn_suffix'){
                                this.addInfo.suffix = this.sourceData[i]['setting'];
                            }
                        }
                    }
                }).catch(err=>{

                });
            },
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            submitForm(formName){
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            for(let i = 0; i < this.sourceData.length; i++){
                                if(this.sourceData[i]['name'] == 'vfn_net'){
                                    this.sourceData[i]['setting'] = this.addInfo.net;
                                } else if(this.sourceData[i]['name'] == 'vfn_gateway'){
                                    this.sourceData[i]['setting'] = this.addInfo.gateway;
                                } else if(this.sourceData[i]['name'] == 'vfn_dns'){
                                    this.sourceData[i]['setting'] = this.addInfo.dns;
                                } else if(this.sourceData[i]['name'] == 'vfn_wins'){
                                    this.sourceData[i]['setting'] = this.addInfo.wins;
                                } else if(this.sourceData[i]['name'] == 'vfn_dn_suffix'){
                                    this.sourceData[i]['setting'] = this.addInfo.suffix;
                                }
                            }
                            editSystemConfig(this.sourceData).then((resp)=>{
                                if(resp.status == 'SUCCESS'){
                                    this.$message({
                                        type:'success',
                                        message:'虚拟网络设置成功！'
                                    });
                                } else {
                                    this.$message({
                                        type:'warning',
                                        message:resp.code.info
                                    });
                                }
                            }).catch(err=>{

                            });
                            this.changeStatus();
                        }
                    });
                },
            resetForm(formName) {
                this.changeStatus();
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

