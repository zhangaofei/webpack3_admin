<template>
    <div class="s2s-set public">
        <el-dialog
                title="编辑s2s配置"
                :visible.sync="addVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @close="handleClose"
                @open="doInit(currentData)"
        >
            <div class="s2s-form">
                <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="142px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="serverName">
                        <el-input v-model="userInfo.serverName" placeholder="请输入内容" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="接口" prop="device" >
                        <el-select  v-model="userInfo.device" placeholder="请选择接口" popper-class="form-user-select" class="el_sel">
                            <el-option v-for="item in interfaceList"
                                       :label="item"
                                       :value="item"
                                       v-bind:key="item">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="认证密钥" prop="authKey">
                        <el-input v-model="userInfo.authKey" placeholder="请输入密钥" class="el_put" type="password"></el-input>
                    </el-form-item>

                    <el-form-item label="本地子网" prop="localSubnet" >
                        <el-input type="textarea" v-model="userInfo.localSubnet" placeholder="示例:192.168.5.0/255.255.255.0或192.168.5.1-192.168.5.255或192.168.5.0/24,多行可换行" class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('userInfo')">
                        取消
                    </span>
                    <el-button class="primary confirm btn_middle"
                            type="primary"
                            @click="submitForm('userInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {edits2s, getInterfaceList} from 'api/s2sVPN/s2s';
    export default{
        components: {
        },
        data(){
            return {
                rules: {
                    serverName: [
                        {required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    device: [
                        {required: true, message: '请选择接口', trigger: 'blur' }
                    ],
                    localSubnet: [
                        {required: true, message: '请输入本地子网', trigger: 'blur' }
                    ],
                },
                userInfo: {
                    id:'',
                    serverName:'',
                    device:'',
                    localSubnet:'',
                    authKey:''
                },
                addVisible:true,
                interfaceList:[],
            }
        },
        created(){
            this.doInit(this.currentData);
            this.getInterfaceList();
        },
        props: {
            currentData: Object
        },
        methods: {
            doInit(currentData){
                this.userInfo = {
                    id:this.currentData.id,
                    serverName:this.currentData.serverName,
                    device:this.currentData.device,
                    localSubnet:this.currentData.localSubnet,
                    authKey:this.currentData.authKey
                }
                let dataArray = this.userInfo.localSubnet.split(';');
                let subnet = '';
                for (let item of dataArray) {
                    subnet += item + '\n';
                }
                this.userInfo.localSubnet = subnet.substring(0, subnet.length - 1);
            },
            handleClose() {
                this.changeStatus();
            },
            doTest() {
                this.addVisible = true
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            resetForm(formName) {
                this.changeStatus();
            },
            getInterfaceList(){
                getInterfaceList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.interfaceList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let dataArray = this.userInfo.localSubnet.split('\n');
                        let subnet = '';
                        for (let item of dataArray) {
                            subnet += item + ';';
                        }
                        this.userInfo.localSubnet = subnet.substring(0, subnet.length - 1);
                        edits2s(this.userInfo).then(response => {
                            if (response.status == 'SUCCESS'){
                                this.$message({
                                    type: 'success',
                                    message: '编辑s2s配置成功！'
                                });
                                this.changeStatus();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.code.info
                                });
                            }
                        }).catch((e) => {
                            console.log(e)
                        });
                    }
                });
            }
        }
    }

</script>
<style >

    .s2s-set  .el_put{
        position: relative;
        display: inline-block;
        width: 65% !important;
        margin-left: 20px;
    }
    .s2s-set  .el_sel{
        width: 65% !important;
        margin-left: 20px;
    }
    .s2s-set  .el_sel .el-put{

    }
    .el-upload-dragger{
        margin-top: -2px!important;
        margin-left: 10px!important;
        width: 400px!important;
    }
    .s2s-form .el_box{
        margin-left: 158px;
    }

    .s2s-form .el-form-item__content .el-input .el-input__inner {
        /*width: 488px;*/
    }

    .s2s-form .el-form-item__label {
        float: left;
        min-width:135px ;
        font-size: 15px;
        margin-left: 78px;
    }

    .s2s-form .el-form-item {
        margin-bottom: 17px;
    }

    .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .s2s-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 6px;
        position: absolute;
        top: 87% !important;
        left: 100px !important;
    }
</style>

