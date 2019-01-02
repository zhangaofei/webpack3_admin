<template>
    <div class="OAuth public">
        <el-dialog title="编辑OAuth认证2"  :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
                    <el-form :model="info" label-width="182px" ref="info" :rules="rules" class="OAuth-form">
                        <el-form-item label="OAUTH认证名称" prop="name">
                            <el-input v-model="info.name" @blur="nameCheck(info.name)" class="el_put" placeholder="请输入关键字"></el-input>
                        </el-form-item>

                        <el-form-item label="OAUTH_URL_AUTH" prop="value.OAUTH_URL_AUTH">
                            <el-input  class="el_put" v-model="info.value.OAUTH_URL_AUTH" @blur="urlauthCheck(info.value.OAUTH_URL_AUTH)" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="OAUTH_URL_TOKEN" prop="value.OAUTH_URL_TOKEN">
                            <el-input  class="el_put" v-model="info.value.OAUTH_URL_TOKEN" @blur="tokenCheck(info.value.OAUTH_URL_TOKEN)" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="OAUTH_URL_PROFILE" prop="value.OAUTH_URL_PROFILE">
                            <el-input  class="el_put" v-model="info.value.OAUTH_URL_PROFILE" @blur="profileCheck(info.value.OAUTH_URL_PROFILE)" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="APP_KEY" prop="value.APP_KEY">
                            <el-input  class="el_put" v-model="info.value.APP_KEY" @blur="keyCheck(info.value.APP_KEY)" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="APP_SECRET" prop="value.APP_SECRET">
                            <el-input  class="el_put" v-model="info.value.APP_SECRET" @blur="secretCheck(info.value.APP_SECRET)" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="text" @click="testAction()" style="margin-left: 17%">连接测试</el-button>
                        </el-form-item>
                    </el-form>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span @click="resetForm('info')" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitInfo('info')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {updateConfig, checkConfig} from 'api/enWAS/config';

    export default {
        components: {},
        props: {
            currentData: Object,
        },
        data() {
            var name = (rule, value, callback) => {
                if(/^[\u4E00-\u9FA5A-Za-z0-9_]{1,99}$/.test(value) == false){
                    callback(new Error("请输入字母、数字、中文、下划线"));
                }else {
                    callback();
                }
            };
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                nameArr:[],
                primaryArr:[],
                rules: {
                    name: [
                        {required: true, message:'OAUTH认证名称不能为空', trigger: 'blur'}
                    ],
                    keyword: [
                        {required: true, message:'OAUTH_URL_AUTH不能为空',trigger: 'blur'}
                    ],
                    'value.OAUTH_URL_AUTH': [
                        {required: true, message: 'OAUTH_URL_AUTH不能为空', trigger: 'blur'}
                    ],
                    'value.OAUTH_URL_TOKEN': [
                        {required: true, message: 'OAUTH_URL_TOKEN不能为空', trigger: 'blur'}
                    ],
                    'value.OAUTH_URL_PROFILE': [
                        {required: true, message: 'OAUTH_URL_PROFILE不能为空', trigger: 'blur'}
                    ],
                    'value.APP_KEY': [
                        {required: true, message: 'APP_KEY不能为空', trigger: 'blur'}
                    ],

                    'value.APP_SECRET': [
                        {required: true, message: 'APP_SECRET不能为空', trigger: 'blur'}
                    ]
                },
                deleteId:[],
                multipleSelection: [],
                Url:{url:''},
                labelPosition: 'left',
                addVisible: true,
                info: {
                    name: '',
                    id: '',
                    value:
                    {OAUTH_URL_AUTH:'', OAUTH_URL_TOKEN:'', OAUTH_URL_PROFILE:'', APP_KEY:'', APP_SECRET:''},
                    keyword:'', external_param:[], OauthExtParaIds:[]
                },
                authnameCheck:true,
                urlCheck:true,
                authtoken:true,
                profile:true,
                key:true,
                secret:true
            }
        },
        created() {
            this.info.name = this.currentData.name;
            this.info.id = this.currentData.id;
            this.info.value = JSON.parse(this.currentData.value);
            this.info.external_param = JSON.parse(this.currentData.external_param);
            this.deleteId = JSON.parse(this.currentData.external_param);
            this.info.keyword = this.currentData.keyword;
            this.info.OauthExtParaIds = [];
        },
        methods: {
            nameCheck(value){
                if(/^[\u4E00-\u9FA5A-Za-z0-9_]{1,99}$/.test(value) == false){
                    return false;
                }else {
                    return true;
                }
            },
            urlauthCheck(value){
                // if (/^[\da-zA-Z\u4e00-\u9fa5!@#$%^&*().]{1,}$/.test(value) == false) {
                if (value == '') {
                    return false;
                } else {
                    return true;
                }
            },
            tokenCheck(value){
                // if (/^[\da-zA-Z\u4e00-\u9fa5!@#$%^&*().]{1,}$/.test(value) == false) {
                if (value == '') {
                    return false;
                } else {
                    return true;
                }
            },
            profileCheck(value){
                // if (/^[\da-zA-Z\u4e00-\u9fa5!@#$%^&*().]{1,}$/.test(value) == false) {
                    if (value == '') {
                    return false;
                } else {
                    return true;
                }
            },
            keyCheck(value){
                // if (/^[\da-zA-Z\u4e00-\u9fa5!@#$%^&*().]{1,}$/.test(value) == false) {
                if (value == '') {
                    return false;
                } else {
                    return true;
                }
            },
            secretCheck(value){
                // if (/^[\da-zA-Z\u4e00-\u9fa5!@#$%^&*().]{1,}$/.test(value) == false) {
                    if (value == '') {
                    return false;
                } else {
                    return true;
                }
            },
            externalName(val){
                if (!val){
                    return true;
                } else if (/^[\da-zA-Z\u4e00-\u9fa5!@#$%^&*()._-]{1,}$/.test(val)== false) {
                    this.$message({
                        type:'warning',
                        message:'请输入合法拓展名！'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            externalValue(val){
                if (!val){
                    return true;
                } else if (/^[\da-zA-Z\u4e00-\u9fa5!@#$%^&*()._-]{1,}$/.test(val)== false) {
                    this.$message({
                        type:'warning',
                        message:'请输入合法拓展属性！'
                    });
                    return false;
                }else{
                    return true;
                }
            },
            handleClose() {
                this.$emit("onChangeStatus");
            },
            doTest() {
                this.addVisible = true;
            },
            domainDel(index,row){
                this.info.external_param.splice(index,1)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            arrRepeat(arr){
                var obj = {};
                for (var i in arr){
                    if(obj[arr[i]])
                        return true;
                    obj[arr[i]] = true;
                }
                return false;
            },
            submitInfo(formName){
                this.authnameCheck = this.nameCheck(this.info.name);
                this.urlCheck = this.urlauthCheck(this.info.value.OAUTH_URL_AUTH);
                this.authtoken = this.tokenCheck(this.info.value.OAUTH_URL_TOKEN);
                this.profile = this.profileCheck(this.info.value.OAUTH_URL_PROFILE);
                this.key = this.keyCheck(this.info.value.APP_KEY);
                this.secret = this.secretCheck(this.info.value.APP_SECRET);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updateConfig(this.info).then(resp => {
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type:'warning',
                                    message:resp.msg
                                });
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        return false;
                    }
                })
            },

            resetForm(formName) {
                this.addVisible = false;
                this.$refs[formName].resetFields();
            },
        }
    }
</script>
<style>
    .OAuth .el_put {
        position: relative;
        display: inline-block;
        /*width: 65% !important;*/
        margin-left: 20px;
    }

    .OAuth .el_sel {
        /*width: 65% !important;*/
        margin-left: 20px;
    }
</style>
