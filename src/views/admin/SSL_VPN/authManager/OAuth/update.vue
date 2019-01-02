<template>
    <div class="OAuth public">
        <el-dialog title="编辑OAuth认证"  :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <el-tabs type="border-card">
                <el-tab-pane label="基础参数">
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
                </el-tab-pane>
                <el-tab-pane label="扩展组参数">
                    <el-form :model="info"  label-width="182px" ref="info" :rules="rules" class="OAuth-form">
                        <el-form-item label="扩展组关键字" prop="keyword" >
                            <el-input v-model="info.keyword" placeholder="扩展组关键字" class="el_put"></el-input>
                        </el-form-item>
                        <el-table
                                ref="multipleTable"
                                :data="info.external_param"
                                :header-cell-style="headerCellStyle"
                                border
                                tooltip-effect="dark"
                                style="width: 65%;max-height: 206px;margin-left:202px;overflow-y: scroll"
                                @selection-change="handleSelectionChange">
                            <el-table-column
                                    label="扩展组名称" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.external_name" placeholder="请输入扩展组名称" @blur="externalName(scope.row.external_name)" class="external_name"></el-input>
                                    <!--<div class="el-form-item__error" id="nameErrMsg" style="display: none">该扩展组名称已经存在</div>-->
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="扩展组属性" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.external_value" placeholder="请输入扩展组属性" @blur="externalName(scope.row.external_value)" class="external_name"></el-input>
                                    <!--<div class="el-form-item__error" id="primaryErrMsg" style="display: none">该扩展组属性已经存在</div>-->
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作" align="center" style="text-align: center" width="160">
                                <template slot-scope="scope">
                                    <el-button
                                            size="small"
                                            class="btn_none_bg"
                                            @click="domainAdd()"> <img src="../../../../../assets/addIcon/add.png">
                                    </el-button>
                                    <span v-if="info.external_param.length != 1">
                                                <el-button
                                                        size="small"
                                                        class="btn_none_bg"
                                                        @click="domainDel(scope.$index,scope.row)"><img src="../../../../../assets/addIcon/del.png">
                                            </el-button>
                                            </span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
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
            console.log('deleteId:', this.deleteId);
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
            testAction(){
                this.Url.url = this.info.value.OAUTH_URL_AUTH.substring(0, this.info.value.OAUTH_URL_AUTH.length - 17);
                checkConfig(this.Url).then(resp => {
                    if (resp.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '测试成功！'
                        });
                        // this.addVisible = false;
                        // this.$emit('onChangeStatus');
                        // this.$refs[formName].resetFields();
                    } else {
                        this.$message({
                            type:'warning',
                            message:'失败！'
                        });
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            handleClose() {
                this.$emit("onChangeStatus");
            },
            doTest() {
                this.addVisible = true;
            },

            guid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
            },
            domainAdd() {
                let id = this.guid();
                this.info.external_param.push({
                    external_name: '',
                    external_value: '',
                    external_id: id
                })
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
                if (!this.authnameCheck || !this.urlCheck || !this.authtoken || !this.profile || !this.key || !this.secret) {
                    this.$message({
                        type: 'warning',
                        message: '存在不合法数据!'
                    });
                } else if (!this.info.keyword && this.info.external_param.length > 0){
                    this.$message({
                        type: 'warning',
                        message: '当扩展组关键字为空时,扩展组名称或扩展组属性不能保存!'
                    });
                } else if (this.info.keyword && this.info.external_param.length == 0){
                    this.$message({
                        type: 'warning',
                        message: '当扩展组关键字不为空时,扩展组名称和扩展组属性不能都为空!'
                    });
                } else {
                    this.nameArr = [];
                    this.primaryArr = [];
                    for (let i = 0; i < this.info.external_param.length; i++){
                        this.nameArr.push(this.info.external_param[i].external_name);
                        this.primaryArr.push(this.info.external_param[i].external_value);
                    }
                    let nameCheck = this.arrRepeat(this.nameArr);
                    let primaryCheck = this.arrRepeat(this.primaryArr);
                    console.log('namecheck, primary', nameCheck, primaryCheck, this.nameArr, this.primaryArr);
                    if ((this.externalName($('.external_name input').val()) && this.externalValue($('.external_value input').val()) ) == false) {
                        this.$message({
                            type: 'warning',
                            message: '格式有误!'
                        });
                    } else if (nameCheck && !primaryCheck){
                        this.$message({
                            type:'warning',
                            message:'有相同的扩展组名称存在!'
                        });
                    } else if(primaryCheck && !nameCheck){
                        this.$message({
                            type:'warning',
                            message:'有相同的扩展组属性存在!'
                        });
                    } else if (nameCheck && primaryCheck){
                        this.$message({
                            type:'warning',
                            message:'有相同的扩展组名称和扩展组属性存在!'
                        });
                    } else {
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
                    }
                }
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
