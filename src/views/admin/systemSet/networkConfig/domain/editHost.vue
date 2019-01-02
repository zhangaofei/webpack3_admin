<template>
    <div class="domain public">
        <el-dialog
                title="编辑Hosts规则"
                :visible.sync="editVisible"
                custom-class="dialog"
                size="small"
                top="10%"
                @close="handleClose"
                @open="doInit(currentData)">
            <div  class="domain-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="142px" class="demo-ruleForm" MultipartFile>
                    <el-form-item label="IP类型" prop="">
                        <el-select v-model="editInfo.ipType" placeholder="请输入IP类型"   class="el_put">
                            <el-option label="IPv4" value="ipv4" ></el-option>
                            <el-option label="IPv6" value="ipv6" style="display: none"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="IPv4地址" prop="ipAddress"  class="el_lab">
                        <el-input v-model="editInfo.ipAddress"  class="el_put" placeholder="请输入IP地址"></el-input>
                    </el-form-item>

                    <el-form-item label="域名" prop="domainName"  class="el_lab">
                        <el-input v-model="editInfo.domainName"  class="el_put" placeholder="请输入域名"></el-input>
                    </el-form-item>
                    <el-form-item label="描述"  class="el_lab">
                        <el-input type="textarea" size="large" v-model="editInfo.hostDesc"  class="el_put" placeholder="请输入描述"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo')">
                        取消
                    </span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="editSubmit('editInfo')">
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
    import {editHosts} from "../../../../../api/systemSet/new_networkConfig/new_domainApi";
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
                        {required:true, validator: ipq, trigger:'blur'}
                    ],
                    domainName:[
                        {required:true, validator: domain, trigger:'blur'}
                    ]
                },
                radio:1,
                pers:[],
                editInfo:{
                    id:'',
                    ipType:'',
                    ipAddress:'',
                    hostDesc:'',
                    domainName:''
                },
                editVisible:true,
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
        props: {
            currentData: Object,
        },
        created(){
            this.doInit(this.currentData);
        },
        methods: {

            handleClose() {
                this.$emit("onChangeStatus");
            },
            doInit(currentData){
                this.editVisible = true;
                this.editInfo={
                    id:currentData.id,
                    ipType:currentData.ipType,
                    ipAddress:currentData.ipAddress,
                    hostDesc:currentData.hostDesc,
                    domainName:currentData.domainName
                }
            },
            editSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        editHosts(this.editInfo).then((resp) => {
                            if (resp.status == "SUCCESS") {
                                this.$message({
                                    type: 'success',
                                    message: '编辑host成功!'

                                });
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                                this.editVisible = false;
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: resp.code.info
                                });
                            }
                        }).catch(err => {

                        });

                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.editVisible=false;

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
        margin-left: 20px;
    }
    .domain .el_sel{
        width: 65% !important;
        margin-left: 20px;
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