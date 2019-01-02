<template>
    <div class="OAuth public">
        <el-dialog title="查看cas认证"
                   :visible.sync="addVisible"
                   @close="handleClose"
                   size="small"
                   custom-class="dialog public" top="10%">
            <el-form :model="info" label-width="193px" :rules="rules" class="OAuth-form" ref="info">
                <el-form-item label="cas server地址" prop="cas_server" v-if="currentData.name=='cas_server'">
                    <el-input v-model.trim="info.cas_server" class="el_put" placeholder="示例：https://cas.enlink.cn:9990" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="cas协议登录uri" prop="cas_login" v-if="currentData.name=='cas_login'">
                    <el-input  class="el_put" v-model.trim="info.cas_login" placeholder="示例：/cas/login" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="cas协议获取用户信息uri" prop="cas_service_validate" v-if="currentData.name=='cas_service_validate'">
                    <el-input v-model.trim="info.cas_service_validate" class="el_put" placeholder="示例：/cas/serviceValidate" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="oauth协议登录uri" prop="oauth_authorization" v-if="currentData.name=='oauth_authorization'">
                    <el-input v-model.trim="info.oauth_authorization" class="el_put" placeholder="示例：/cas/oauth2.0/authorize" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="oauth协议获取访问令牌uri" prop="oauth_access_token" v-if="currentData.name=='oauth_access_token'">
                    <el-input v-model.trim="info.oauth_access_token" class="el_put" placeholder="示例：/cas/oauth2.0/accessToken" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="oauth协议获取用户信息uri" prop="oauth_profile" v-if="currentData.name=='oauth_profile'">
                    <el-input v-model.trim="info.oauth_profile" class="el_put" placeholder="示例：/cas/oauth2.0/profile" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="oauth2.0认证client_id" prop="APP_KEY" v-if="currentData.name=='APP_KEY'">
                    <el-input v-model.trim="info.APP_KEY" class="el_put" placeholder="oauth2.0认证client_id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="oauth2.0认证密钥" prop="APP_SECRET" v-if="currentData.name=='APP_SECRET'">
                    <el-input v-model.trim="info.APP_SECRET" class="el_put" placeholder="oauth2.0认证密钥" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div class='form-footer ' slot="footer">
                <div class="foot">

                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {addConfig, checkConfig} from 'api/enWAS/config';
    import  {EditCasAuth} from '@/api/SSL_VPN/authManager/auth'

    export default {
        components: {},
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
                    apiInfo: [
                        {required: true,message:'OAUTH_URL_AUTH不能为空',trigger: 'blur'}
                    ]
                },
                multipleSelection: [],
                labelPosition: 'left',
                addVisible: true,
                info: {
                    cas_server: '',
                    cas_login:'',
                    cas_service_validate:'',
                    oauth_authorization:'',
                    oauth_access_token:'',
                    oauth_profile:'',
                    APP_KEY:'',
                    APP_SECRET:''
                }
            }
        },
        props: {
            currentData: Object
        },
        created(){
            if(this.currentData.name=='cas_server'){
                this.info.cas_server=this.currentData.value
            }else if(this.currentData.name=='cas_login'){
                this.info.cas_login=this.currentData.value
            }else if(this.currentData.name=='cas_service_validate'){
                this.info.cas_service_validate=this.currentData.value
            }else if(this.currentData.name=='oauth_authorization'){
                this.info.oauth_authorization=this.currentData.value
            }else if(this.currentData.name=='oauth_access_token'){
                this.info.oauth_access_token=this.currentData.value
            }else if(this.currentData.name=='oauth_profile'){
                this.info.oauth_profile=this.currentData.value
            }else if(this.currentData.name=='APP_KEY'){
                this.info.APP_KEY=this.currentData.value
            }else if(this.currentData.name=='APP_SECRET'){
                this.info.APP_SECRET=this.currentData.value
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClose() {
                this.$emit("onChangeStatus");
            },
        }
    }
</script>
<style>

</style>
