<template>
    <div class="ipgroup public">
        <el-dialog
                title="查看IP组设置"
                :visible.sync="lookVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="ipgroup-form">
                <el-form :model="info"  ref="info" label-width="105px" class="ipgroup-form" :rules="rules">
                    <el-form-item label="IP组名称 " prop="name">
                        <el-input v-model="info.name" :disabled="true" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="引用IP地址" prop="selected_address">
                        <el-select v-model="info.selected_address" multiple collapse-tags class="el_sel">
                            <el-option
                                    :disabled="true"
                                    v-for="ip in ipList"
                                    :key="ip"
                                    :label="ip"
                                    :value="ip">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="自定义IP地址" prop="defined_address">
                        <el-input type="textarea" :rows="2"  v-model="info.defined_address" class="el_put" :disabled="true"></el-input>
                    </el-form-item>


                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class='foot' >
                    <el-button style="border-color: #D1D1D1;"
                               class="reset_sure"
                               @click="resetForm()" v-if="false">
                        关闭
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {getIpList} from "api/firewall/ip";
    export default{
        components: {},
        data(){
            return {
                rules: {
                    name: [
                        {required: true,trigger: 'blur'}
                    ],
                },
                info: {
                    name: '',
                    defined_address:"",
                    selected_address:[]
                },
                lookVisible: true,
                id:'',
                ipList:[],
                addList:[]
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

            doInit(currentData){

                let row = this.currentData;
                this.info.name = row.name;
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


                    console.log(this.ipList+"ipList");
                    for (var i=0;i<this.addList.length;i++){
                        if(this.ipList.toString().indexOf(this.addList[i].toString())>-1){
                            this.info.selected_address.push(this.addList[i]);
                        }else {
                            if (this.info.defined_address.length<1){
                                this.info.defined_address = this.info.defined_address + this.addList[i];
                            }else {
                                this.info.defined_address = this.info.defined_address + "\n"+ this.addList[i];
                            }
                        }

                    }

                }).catch(err=>{

                });



            },
            resetForm(formName) {
                console.log(formName, '------');
                this.lookVisible = false;
                this.$refs[formName].resetFields();
            },

            getIpAddrList(){
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
                }).catch(err=>{

                });


            },

        },
    }
</script>
