<template>
    <div class="resolve public">
        <el-dialog
                title="新建内网域名解析"
                :visible.sync="addVisible"
                size="small"
                top="10%"
                custom-class="dialog"
                @close="handleClose">
            <div  class="resolve-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="70px" class="demo-ruleForm" MultipartFile>
                    <el-form-item label="名称"  class="el_lab" prop="name">
                        <el-input v-model="addInfo.name"  class="el_put" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="域名" prop="domainName"  class="el_lab">
                        <el-input v-model="addInfo.domainName"  class="el_put" placeholder="请输入域名"></el-input>
                    </el-form-item>
                    <el-form-item label="说明"  class="el_lab" prop="">
                        <el-input type="" v-model="addInfo.remark"  class="el_put" placeholder="请输入说明"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo')">
                        取消
                    </span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitForm('addInfo')" >
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "../../../../../utils/codes";
    import {notifyFault} from "../../../../../utils/notify"
    import {mapGetters} from 'vuex'
    import {innerDomainAdd} from "../../../../../api/systemSet/new_networkConfig/new_domainApi";
    export default{
        components: {
        },
        computed:{

        },
        data(){
            let name = (rule, value, callback) => {
                if(/^[\u4E00-\u9FA5A-Za-z0-9_]{1,100}$/.test(value) == false){
                    callback(new Error("请输入中文、英文、数字、下划线"));
                }else {
                    callback();
                }
            };
            let ip = (rule, value, callback) => {
                let res = true;
                let fes = true;
                if(value == '*'){
                    res = true;
                } else {
                    let arr = value.split('.');
                    if(arr.length <= 1 || arr.length == null){
                        res = false;
                    } else {
                        for (let i = 0; i < arr.length; i++){
                            if(arr[i].length == 0 || arr[i].length == null || fes == false){
                                res = false;
                                break;
                            } else {
                                for (let j = 0; j < arr[i].length; j++){
                                    if(arr[i][j] == '*' && arr[i].length == 1){
                                        console.log('4422');
                                        res = true
                                    } else if(arr[i][j] == '*' && arr[i].length != 1 ){
                                        console.log('4444444');
                                        res = false;
                                        fes = false;
                                        break;
                                    } else {
                                        console.log('444334');
                                        res = true;
                                    }
                                }
                            }
                        }
                    }
                }
                if(res == false){
                    callback(new Error("请输入域名或*号通配符"));
                } else {
                    callback();
                }
            };
            return {
                rules:{
                    name :[
                        {required:true,validator: name, trigger:'blur'}
                    ],
                    domainName :[
                        {required:true,validator: ip, trigger:'blur'}
                    ]
                },
                addInfo:{
                    name:'',
                    remark:'',
                    domainName:'',
                    type:0
                },
                addVisible:true,
                list: [],
                multipleSelection:[],
            }
        },
        methods: {
            handleClose() {
                this.$emit("onChangeResolve");
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        innerDomainAdd(this.addInfo).then((resp) => {
                            if (resp.status == "SUCCESS") {
                                this.$message({
                                    type: 'success',
                                    message: '新增成功!'
                                });
                                this.$emit('onChangeResolve');
                                this.$refs[formName].resetFields();
                                this.addVisible = false;
                            }
                            else {
                                this.$message({
                                    type: 'warning',
                                    message: resp.code.info
                                });
                            }
                        })

                    }else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$emit('onChangeResolve');
                this.$refs[formName].resetFields();
                this.addVisible=false;

            },
            createChange(){
                if(this.addInfo.ipType == 'ipv4')
                {
                    this.addInfo.tag = 'ipv4'
                }
                if(this.addInfo.ipType == 'ipv6')
                {
                    this.addInfo.tag = 'ipv6'
                }
            }
        }
    }
</script>
<style >

    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
  /*  .resolve .dialog{
        min-width: 830px;
    }
    .resolve .el-dialog__header{
        padding-left:5px ;
    }
    .resolve .el_put{
        position: relative;
        display: inline-block;
        width: 65% !important;
        margin-left: 20px;
    }
    .resolve .el_sel{
        width: 65% !important;
        margin-left: 20px;
    }
    .resolve .el_text{
        margin-left:158px;
    }

    .resolve-form .el-form-item__label {
        float: left;
        min-width:135px ;
        font-size: 15px;
        margin-left: 78px;
    }

    .resolve-form .el-form-item {
        margin-bottom: 17px;
    }

    .resolve .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .resolve-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 100px!important;
    }*/

</style>
