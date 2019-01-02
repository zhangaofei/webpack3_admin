<template>
    <div class="ip public">
        <el-dialog
                title="查看IP设置"
                :visible.sync="lookVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="ip-form">
                <el-form :model="info" ref="info" label-width="94px" class="ip-form" :rules="rules">
                    <el-form-item label="IP名称 " prop="name">
                        <el-input v-model="info.name" :disabled="true" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="IP地址" prop="address">
                        <el-input v-model="info.address" class="el_put" :disabled="true"></el-input>
                    </el-form-item>


                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  style="height:50px;" >
                <div class='foot' >
                    <el-button style="border-color: #D1D1D1;" class="reset_sure" v-if="false"
                               @click="resetForm()">
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
    import {checkIp} from "api/firewall/ip";
    export default{
        components: {},
        data(){
            return {
                rules: {
                    name: [
                        {required: true, trigger: 'blur'}
                    ],
                    address: [
                        {required: true, trigger: 'blur'}
                    ],
                },
                info: {
                    name: '',
                    address:''
                },
                id:'',
                lookVisible: true
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
                if (row.rangeMask=='0'){
                    this.info.address = row.ip+'-'+row.ipEnd;
                }else if (row.rangeMask=='1'){
                    this.info.address = row.ip+'/'+row.ethNum;
                }else {
                    this.info.address = row.ip;
                }
            },



            resetForm(formName) {
                console.log(formName, '------');
                this.lookVisible = false;
                this.$refs[formName].resetFields();
            },
        },
    }
</script>
<style>

</style>