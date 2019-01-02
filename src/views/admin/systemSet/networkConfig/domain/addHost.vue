<template>
    <div class="domain public">
        <el-dialog
                title="新增Hosts规则"
                :visible.sync="addVisible"
                size="small"
                top="10%"
                custom-class="dialog"
                @close="handleClose">
            <div  class="domain-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="142px" class="demo-ruleForm" MultipartFile>
                    <el-form-item label="IP类型">
                        <el-select v-model="addInfo.ipType" placeholder="请输入IP类型"   class="el_put" @change="createChange">
                            <el-option label="IPv4" value="ipv4" >IPv4</el-option>
                            <el-option label="IPv6" value="ipv6" style="display: none">IPv6</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="IPv4地址" prop="ipAddress"  class="el_lab">
                        <el-input v-model="addInfo.ipAddress"  class="el_put" placeholder="请输入IP地址"></el-input>
                    </el-form-item>

                    <el-form-item label="域名"  class="el_lab" prop="domainName">
                        <el-input v-model="addInfo.domainName"  class="el_put" placeholder="请输入域名"></el-input>
                    </el-form-item>
                    <el-form-item label="描述"  class="el_lab">
                        <el-input type="textarea" size="large" v-model="addInfo.hostDesc"  class="el_put" placeholder="请输入描述"></el-input>
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
    import {createHosts} from "../../../../../api/systemSet/new_networkConfig/new_domainApi";
    export default{
        components: {
        },
        data(){
            var ipq = (rule, value, callback) => {
                    if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                        callback(new Error("请输入正确的IP地址"));
                    } else {
                        callback();
                    }
            };
            var domain = (rule, value , callback) => {
                let res = true;
                let arr = value.split('.');
                if(arr.length <= 1 || arr.length == null){
                    res = false;
                } else {
                    for (let i = 0; i < arr.length; i++){
                        if(arr[i].length == 0 || arr[i].length == null){
                            res = false;
                            break;
                        } else {
                            res = true;
                        }
                    }
                }
                if(res == false){
                    callback(new Error("请输入正确的域名地址"));
                } else {
                    callback();
                }
            };
            return {
                isShow:false,
                rules:{
                    ipAddress :[
                        {required: true, validator: ipq, trigger:'blur'}
                    ],
                    domainName:[
                        {required: true, validator: domain, trigger:'blur'}
                    ]
                },
                radio:1,
                pers:[],
                addInfo:{
                    tag:'',
                    ipType:'ipv4',
                    ipAddress:'',
                    hostDesc:'',
                    domainName:''
                },
                addVisible:true,
                activeName:'first',
                activeName2:'one',
                list: [],
                role: '',
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    search_content: "",
                    total:0
                },
                multipleSelection:[],
            }
        },
        methods: {
            handleClose() {
                this.$emit("onChangeStatus");
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        createHosts(this.addInfo).then((resp) => {
                            if (resp.status == "SUCCESS") {
                                this.$message({
                                    type: 'success',
                                    message: '新增host成功!'
                                });
                                this.$emit('onChangeStatus');
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
    .domain .dialog{
        min-width: 830px;
    }
    .domain .el-dialog__header{
        padding-left:5px ;
    }
    .domain .el_put{
        position: relative;
        display: inline-block;
        width: 65% !important;
    }
    .domain .el_sel{
        width: 65% !important;
    }
    .domain .el_text{
        margin-left:158px;
    }

    .domain-form .el-form-item__label {
        float: left;
        min-width:135px ;
        font-size: 15px;
        margin-left: 78px;
    }

    .domain-form .el-form-item {
        margin-bottom: 17px;
    }

    .domain .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .domain-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 100px !important;
    }

</style>
