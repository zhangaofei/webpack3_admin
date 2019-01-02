<template>
    <div>
        <div class="content-header">
            <h1>
                <!--系统配置-->
                <small>
                    <!--序列号管理-->
                </small>
            </h1>
            <ol class="breadcrumb " style="left:12px">
                <li><a ><i class="fa fa-gears"></i>系统管理</a></li>
                <li><a >系统设置</a></li>
                <li class="active">管理台设置</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">管理台设置</h3>
                            <div class="box-tools pull-right">
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 21px !important">
                            <div class="row ">
                                <div class="adminconfig_box" >
                                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition"
                                             label-width="135px" class="demo-ruleForm mail_form reset_margin_title_right">
                                        <div v-if="isEdit">
                                            <el-form-item label="设备名称" prop="device_name" class="form_item">
                                                <el-input v-model.trim="ruleForm.device_name" :disabled="true" class="reg_put"></el-input>
                                            </el-form-item>
                                            <el-form-item label="管理端协议/端口" prop=""  class="box_sub">
                                                <el-checkbox v-model="ruleForm.admin_suport_https" :disabled="true" @change="adminSuports(ruleForm.admin_suport_https)">启用HTTPS协议</el-checkbox>
                                            </el-form-item>
                                            <el-form-item label="设置协议端口" prop="" class="form_item put_sub user_mandatory">
                                                <el-input v-model="ruleForm.admin_https_port" class="ad_https reg_put" :disabled="true" ></el-input>
                                            </el-form-item>
                                            <el-form-item label="SSL通讯协议"  class="form_sub box_sub  sel_sub">
                                                <el-select v-model="a" placeholder="" :disabled="true"  class="reg_put">
                                                    <el-option label="国际商用密码标准" value="a"></el-option>
                                                    <!--<el-option label="中国国家密码标准" value="b"></el-option>-->
                                                </el-select>
                                                <span v-if="ruleForm.admin_agreement==null">
                                                    <span v-if="a=='a'" style="display: inline-block;">
                                                        <el-checkbox v-model="ruleForm.admin_agreement" :disabled="true" style="margin-left: 20px;">SSLv3</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement" :disabled="true">TLSv1.0</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement" :disabled="true">TLSv1.1</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement" :disabled="true">TLSv1.2</el-checkbox>
                                                    </span>
                                                    <span v-else="" style="display: inline-block;">
                                                        <el-checkbox v-model="ruleForm.admin_agreement" :disabled="true">SM2</el-checkbox>
                                                    </span>
                                                </span>
                                                <span v-else="">
                                                    <span v-if="a=='a'" style="display: inline-block;">
                                                        <el-checkbox v-model="ruleForm.admin_agreement['SSLv3']" :disabled="true" style="margin-left: 20px;">SSLv3</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement['TLSv1.0']" :disabled="true">TLSv1.0</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement['TLSv1.1']" :disabled="true">TLSv1.1</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement['TLSv1.2']" :disabled="true">TLSv1.2</el-checkbox>
                                                    </span>
                                                    <span v-else="" style="display: inline-block;">
                                                        <el-checkbox v-model="ruleForm.admin_agreement['SM2']" :disabled="true">SM2</el-checkbox>
                                                    </span>
                                                </span>
                                            </el-form-item>
                                            <el-form-item label="" prop="" class="box_sub">
                                                <el-checkbox v-model="ruleForm.admin_suport_http" style="margin-left: 48px" :disabled="true"  class="reg_put">启用HTTP协议</el-checkbox>
                                            </el-form-item>
                                            <el-form-item label="设置协议端口" prop="admin_http_port" class="form_item put_sub item_mark">
                                                <!--<span style="position: absolute;left: -100px;color: red;">*</span>-->
                                                <el-input v-model="ruleForm.admin_http_port" class="ad_http reg_put" :disabled="true" ></el-input>
                                            </el-form-item>
                                            <el-form-item label="自动跳转" prop="" class="box_thir">
                                                <el-checkbox v-model="ruleForm.admin_http_rewrite_https" @change="change(ruleForm.admin_http_rewrite_https)" :disabled="true">http自动跳转为https</el-checkbox>
                                            </el-form-item>
                                            <el-form-item label="客户端协议/端口" prop="" class="box_sub" >
                                                <el-checkbox v-model="ruleForm.client_suport_https"  :disabled="true">启用HTTPS协议</el-checkbox>
                                            </el-form-item>
                                            <!--<el-form-item label="设置协议端口" prop="client_https_port" class="form_item put_sub user_mandatory" >-->
                                                <!--<el-input v-model="ruleForm.client_https_port" class="cl_https reg_put" :disabled="true" ></el-input>-->
                                            <!--</el-form-item>-->
                                            <el-form-item label="Enwas端口" prop="client_https_port" class="form_item put_sub user_mandatory" >
                                                <el-input v-model="ruleForm.client_https_port" class="cl_https reg_put" :disabled="true" ></el-input>
                                            </el-form-item>
                                            <el-form-item label="Enssl端口" prop="client_https_port" class="form_item put_sub" >
                                                <el-input v-model="ruleForm.client_enssl_port" class="cl_https reg_put" :disabled="true" ></el-input>
                                            </el-form-item>
                                            <el-form-item label="SSL通讯协议" class="form_sub box_sub sel_sub">
                                                <el-select v-model="c" placeholder="" :disabled="true"  class="reg_put">
                                                    <el-option label="国际商用密码标准" value="c"></el-option>
                                                    <!--<el-option label="中国国家密码标准" value="d"></el-option>-->
                                                </el-select>
                                                <span v-if="ruleForm.client_agreement==null">
                                                    <span v-if="c=='c'" style="display: inline-block;">
                                                        <el-checkbox v-model="ruleForm.client_agreement" :disabled="true" style="margin-left: 20px;">SSLv3</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement" :disabled="true">TLSv1.0</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement" :disabled="true">TLSv1.1</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement" :disabled="true">TLSv1.2</el-checkbox>
                                                    </span>
                                                    <span v-else="" style="display: inline-block;">
                                                        <el-checkbox v-model="ruleForm.client_agreement" :disabled="true">SM2</el-checkbox>
                                                    </span>
                                                </span>
                                                <span v-else="">
                                                    <span v-if="c=='c'" style="display: inline-block;">
                                                        <el-checkbox v-model="ruleForm.client_agreement['SSLv3']" :disabled="true" style="margin-left: 20px;">SSLv3</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement['TLSv1.0']" :disabled="true">TLSv1.0</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement['TLSv1.1']" :disabled="true">TLSv1.1</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement['TLSv1.2']" :disabled="true">TLSv1.2</el-checkbox>
                                                    </span>
                                                    <span v-else="" style="display: inline-block;">
                                                        <el-checkbox v-model="ruleForm.client_agreement['SM2']" :disabled="true">SM2</el-checkbox>
                                                    </span>
                                                </span>
                                            </el-form-item>
                                            <el-form-item label="" prop="" class="box_sub" style="margin-left: 48px">
                                                <el-checkbox v-model="ruleForm.client_suport_http" :disabled="true">启用HTTP协议</el-checkbox>
                                            </el-form-item>
                                            <el-form-item label="设置协议端口" prop="" class="form_item put_sub item_mark">
                                                <!--<span style="position: absolute;left: -100px;color: red;">*</span>-->
                                                <el-input v-model="ruleForm.client_http_port" class="cl_http reg_put" :disabled="true" ></el-input>
                                            </el-form-item>
                                            <el-form-item label="自动跳转" prop="" class="box_thir">
                                                <el-checkbox v-model="ruleForm.client_http_rewrite_https" :disabled="true">http自动跳转为https</el-checkbox>
                                            </el-form-item>
                                            <el-form-item label="会话超时时间" prop="session_timeout" class="form_item">
                                                <el-input v-model="ruleForm.session_timeout" :disabled="true"  class="reg_put"></el-input>
                                            </el-form-item>
                                            <!--<el-form-item label="管理端账号锁定" prop="" class="box_sub" style="display: none">-->
                                                <!--<el-checkbox v-model="ruleForm.admin_suport_err_lock" :disabled="true">启用账号锁定</el-checkbox>-->
                                            <!--</el-form-item>-->
                                            <!--<el-form-item label="密码连续输入错误" prop="admin_error_num" class="form_sub form_item put_sub" style="margin-left: 174px !important;display: none">-->
                                                <!--<el-input v-model="ruleForm.admin_error_num"  :disabled="true"  class="reg_put"></el-input>-->
                                                <!--<span style="font-size: 12px">（5-1000次），登录时，需要输入验证码</span>-->
                                            <!--</el-form-item>-->
                                            <el-form-item label="" prop="" class=" form_item form_item_btn" style="margin-left: 50px;">
                                                <el-button type="primary" @click="available" class="primary edit">编辑</el-button>
                                            </el-form-item>
                                        </div>

                                        <div v-if="!isEdit">
                                            <el-form-item label="设备名称" prop="device_name" class="form_item">
                                                <el-input v-model.trim="ruleForm.device_name" class="reg_put"></el-input>
                                            </el-form-item>
                                            <el-form-item label="管理端协议/端口" prop=""  class="box_sub">
                                                <el-checkbox v-model="ruleForm.admin_suport_https" @change="adminSuports(ruleForm.admin_suport_https)"
                                                >启用HTTPS协议</el-checkbox>
                                            </el-form-item>

                                            <el-form-item label="设置协议端口" prop="admin_https_port" class="form_item put_sub item_mark">
                                                <!--<span style="position: absolute;left: -100px;color: red;">*</span>-->
                                                <el-input v-model="ruleForm.admin_https_port" class="ad_https reg_put" :disabled="!ruleForm.admin_suport_https"></el-input>
                                            </el-form-item>

                                            <el-form-item label="SSL通讯协议"  class="form_sub box_sub  sel_sub">
                                                <el-select v-model="a" placeholder="" :disabled="!ruleForm.admin_suport_https" class="reg_put">
                                                    <el-option label="国际商用密码标准" value="a"></el-option>
                                                    <!--<el-option label="中国国家密码标准" value="b"></el-option>-->
                                                </el-select>
                                                <span v-if="ruleForm.admin_agreement==null">
                                                    <span v-if="a=='a'" style="display: inline-block;">
                                                        <el-checkbox v-model="ruleForm.admin_agreement" style="margin-left: 20px;">SSLv3</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement">TLSv1.0</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement" >TLSv1.1</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement" >TLSv1.2</el-checkbox>
                                                    </span>
                                                    <span v-else="" style="">
                                                        <el-checkbox v-model="ruleForm.admin_agreement" >SM2</el-checkbox>
                                                    </span>
                                                </span>
                                                <span v-else="">
                                                    <span v-if="a=='a'" style="">
                                                        <el-checkbox v-model="ruleForm.admin_agreement['SSLv3']" style="margin-left: 20px;">SSLv3</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement['TLSv1.0']">TLSv1.0</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement['TLSv1.1']" >TLSv1.1</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.admin_agreement['TLSv1.2']" >TLSv1.2</el-checkbox>
                                                    </span>
                                                    <span v-else="" style="">
                                                        <el-checkbox v-model="ruleForm.admin_agreement['SM2']" >SM2</el-checkbox>
                                                    </span>
                                                </span>

                                            </el-form-item>
                                            <el-form-item label="" prop="" class="box_sub">
                                                <el-checkbox v-model="ruleForm.admin_suport_http" style="margin-left: 48px" @change="adminSuport(ruleForm.admin_suport_http)">启用HTTP协议</el-checkbox>
                                            </el-form-item>
                                            <el-form-item label="设置协议端口" prop="admin_http_port" class="form_item put_sub item_mark">
                                                <!--<span style="position: absolute;left: -100px;color: red;">*</span>-->
                                                <el-input v-model="ruleForm.admin_http_port" class="ad_http reg_put" :disabled="!ruleForm.admin_suport_http"></el-input>
                                            </el-form-item>
                                            <el-form-item label="自动跳转" prop="" class="box_thir">
                                                <el-checkbox v-model="ruleForm.admin_http_rewrite_https" @change="change(ruleForm.admin_http_rewrite_https)" :disabled="!ruleForm.admin_suport_http">http自动跳转为https</el-checkbox>
                                            </el-form-item>
                                            <el-form-item label="客户端协议/端口" prop="" class="box_sub" >
                                                <el-checkbox v-model="ruleForm.client_suport_https" style="" >启用HTTPS协议</el-checkbox>
                                            </el-form-item>
                                            <!--<el-form-item label="设置协议端口" prop="client_https_port" class="form_item put_sub user_mandatory" >-->
                                                <!--<el-input v-model="ruleForm.client_https_port" class="cl_https reg_put" :disabled="!ruleForm.client_suport_https" ></el-input>-->
                                            <!--</el-form-item>-->
                                            <el-form-item label="Enwas端口" prop="client_https_port" class="form_item put_sub user_mandatory" >
                                                <el-input v-model="ruleForm.client_https_port" class="cl_https reg_put" :disabled="!ruleForm.client_suport_https" ></el-input>
                                            </el-form-item>
                                            <el-form-item label="Enssl端口" prop="" class="form_item put_sub " >
                                                <el-input v-model="ruleForm.client_enssl_port" @change="chan(ruleForm.client_enssl_port)" class="cl_https reg_put" :disabled="!ruleForm.client_suport_https" ></el-input>
                                            </el-form-item>
                                            <el-form-item label="SSL通讯协议" class="form_sub box_sub sel_sub">
                                                <el-select v-model="c" placeholder="" :disabled="!ruleForm.client_suport_https" class="reg_put">
                                                    <el-option label="国际商用密码标准" value="c"></el-option>
                                                    <!--<el-option label="中国国家密码标准" value="d"></el-option>-->
                                                </el-select>
                                                <!--ruleForm.client_agreement 出错时可能为空-->
                                                <span v-if="ruleForm.client_agreement==null">
                                                    <span v-if="c=='c'" style="">
                                                        <el-checkbox v-model="ruleForm.client_agreement" style="margin-left: 20px;">SSLv3</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement">TLSv1.0</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement" >TLSv1.1</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement" >TLSv1.2</el-checkbox>
                                                    </span>
                                                    <span v-else="" style="">
                                                        <el-checkbox v-model="ruleForm.client_agreement" >SM2</el-checkbox>
                                                    </span>
                                                </span>
                                                <span v-else="">
                                                    <span v-if="c=='c'" style="">
                                                        <el-checkbox v-model="ruleForm.client_agreement['SSLv3']" style="margin-left: 20px;">SSLv3</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement['TLSv1.0']">TLSv1.0</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement['TLSv1.1']" >TLSv1.1</el-checkbox>
                                                        <el-checkbox v-model="ruleForm.client_agreement['TLSv1.2']" >TLSv1.2</el-checkbox>
                                                    </span>
                                                    <span v-else="" style="">
                                                        <el-checkbox v-model="ruleForm.client_agreement['SM2']" >SM2</el-checkbox>
                                                    </span>
                                                </span>
                                            </el-form-item>
                                            <el-form-item label="" prop="" class="box_sub" style="margin-left: 48px">
                                                <el-checkbox v-model="ruleForm.client_suport_http">启用HTTP协议</el-checkbox>
                                            </el-form-item>
                                            <el-form-item label="设置协议端口" prop="client_http_port" class="form_item put_sub user_mandatory">
                                                <el-input v-model="ruleForm.client_http_port" class="cl_http reg_put" :disabled="!ruleForm.client_suport_http"></el-input>
                                            </el-form-item>
                                            <el-form-item label="自动跳转" prop="" class="box_thir">
                                                <el-checkbox v-model="ruleForm.client_http_rewrite_https" :disabled="!ruleForm.client_suport_http">http自动跳转为https</el-checkbox>
                                            </el-form-item>
                                            <el-form-item label="会话超时时间" prop="session_timeout" class="form_item">
                                                <el-input v-model.number="ruleForm.session_timeout" class="reg_put"></el-input>
                                            </el-form-item>
                                            <!--<el-form-item label="管理端账号锁定" prop="admin_suport_err_lock" class="box_sub" style="display: none">-->
                                                <!--<el-checkbox v-model="ruleForm.admin_suport_err_lock" >启用账号锁定</el-checkbox>-->
                                            <!--</el-form-item>-->
                                            <!--<el-form-item label="密码连续输入错误" prop="admin_error_num" class="form_sub form_item put_sub" style="margin-left: 174px !important;display: none">-->
                                                <!--<el-input v-model="ruleForm.admin_error_num"  class="reg_put" :disabled="!ruleForm.admin_suport_err_lock"></el-input>-->
                                                <!--<span style="font-size: 12px">（5-1000次），登录时，需要输入验证码</span>-->
                                            <!--</el-form-item>-->
                                            <el-form-item label="" prop="" class=" form_item form_item_btn" style="margin-left: 50px;">
                                                <el-button @click="resetForm('ruleForm')" class="plain cancle">取消</el-button>
                                                <el-button type="primary" @click="save" class="primary confirm">保存</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-form>

                                    <el-dialog
                                            title="提示"
                                            :visible.sync="dialogVisible"
                                            size="tiny"
                                    >
                                        <p>取消：不保存任何数据。</p><br>
                                        <p>稍后手动重启：保存数据；不重启相关服务和设备。</p><br>
                                        <p> 确定：保存数据立即重启，重启相关服务（修改名称重启设备生效）</p>
                                        <span slot="footer" class="dialog-footer"  style="height:50px;">
                                            <el-button class="primary cancle" type="primary" @click="resetForm('ruleForm')">取 消</el-button>
                                            <el-button class="primary confirm" type="primary" @click="submitFormPause('ruleForm')" style="width: auto; padding: 0 20px;">稍后手动重启</el-button>
                                            <el-button class="primary confirm" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                                    </span>
                                    </el-dialog>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from "../../../../../store/index";
    import permissionRoutes from 'store/permission';
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import {getAdminList, ModAdminList} from "../../../../../api/systemSet/sysConfig/adminConfig";
    import {getShutDown, getRestart, getRestartServer} from "../../../../../api/sysMaintain/sysOperation";
    import {setDefaultPolicy} from "../../../../../api/firewall/policy";
    export default {
        components: {},
        data() {
            let device_name = (rule, value, callback) => {
                if(/^[A-Za-z0-9_]{1,}$/.test(value) == false){
                    callback(new Error('请输入数字、字母、_'));
                } else {
                    callback();
                }
            };
            let http_port = (rule, value, callback) => {
                if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value) == false) {
                    callback(new Error('请输入1-65535之间的数字'));
                } else {
                    callback();
                }
            };
            let time = (rule, value, callback) => {
                if (/^([5-9]|[1-9]\d|[1-9]\d{2}|1000)$/.test(value) == false) {
                    callback(new Error('请输入5-1000之间的整数'));
                } else {
                    callback();
                }
            };
            return {
                rules:{
                    device_name:[
                        {  required: true,validator: device_name, trigger: 'blur' },
                    ],
//                    admin_error_num:[
//                        {  required: true, validator: time,trigger: 'blur', },
//                    ],
                    session_timeout:[
                        {  required: true, validator: time,trigger: 'blur', },
                    ],
                },
                checked:undefined,
                pageId:146,
                readOnly:false,
                dialogVisible:false,
                radio: 1,
                serverChecked: false,
                isShow: true,
                isEdit:true,
                checked1:false,
                checked2:false,
                a_checked0:null,
                a_checked1:null,
                a_checked2:null,
                a_checked3:null,
                labelPosition:'right',
                a:'a',
                c:'c',
                name:'',//由于比较name是否变化
                ruleForm: {
                    device_name:'',
                    name:'',
                    session_timeout:null,
                    admin_agreement:{//字符串对象
                        'SM2':null,
                        'SSLv3':null,
                        'TLSv1.0':null,
                        'TLSv1.1':null,
                        'TLSv1.2':null,
                    },
                    admin_http_port:null,
                    admin_http_rewrite_https:null,
                    admin_https_port:null,
//                    ƒ:null,
//                    admin_error_num:null,
                    admin_suport_http:null,
                    admin_suport_https:null,

                    client_agreement:{//字符串对象
                        'SM2':null,
                        'SSLv3':null,
                        'TLSv1.0':null,
                        'TLSv1.1':null,
                        'TLSv1.2':null,
                    },
                    client_http_port:null,
                    client_http_rewrite_https:null,
                    client_https_port:null,
                    client_suport_err_lock:null,
                    client_suport_http:null,
                    client_suport_https:null,
                    client_enssl_port:null
                }
            }
        },
        computed: {},
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
            this.getList();
        },
        methods: {
            chan(val){
              // console.log('val_ssl',val,typeof (val))
            },
            adminSuports(val){
              /*  if(val==true){
                    this.ruleForm.admin_suport_http=false
                }
                if(val==false){
                    this.ruleForm.admin_suport_http=true
                }*/
            },
            adminSuport(val){
                // console.log(val,'adminSuport')
              /*  if(val==true){
                    this.ruleForm.admin_suport_https=false
                }
                if(val==false) {
                    this.ruleForm.admin_suport_https = true
                    }*/
            },
            available(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isEdit=!this.isEdit

                }
            },
            change(val){
              // console.log("val",val)
            },
            resetForm(formName) {
                this.isEdit=!this.isEdit;
                this.getList();
                this.$refs[formName].resetFields();
                this.dialogVisible=false
            },
            getList() {
                getAdminList().then((resp)=> {
                   console.log(resp,'respadmin')
                    // this.ruleForm=JSON.parse(resp.data[0]);
                    this.ruleForm=resp.data[0];
                    this.name=resp.data[0].device_name;
                    if(resp.data[0].client_enssl_port==''){
                        this.ruleForm.client_enssl_port==1
                    }
                    if(resp.data[0].admin_agreement==null){
                        this.ruleForm.admin_agreement={//字符串对象
                            'SM2':0,
                            'SSLv3':0,
                            'TLSv1.0':0,
                            'TLSv1.1':0,
                            'TLSv1.2':0,
                        }
                    }else {
                        this.ruleForm.admin_agreement=JSON.parse(resp.data[0].admin_agreement);
                    }

                    if(resp.data[0].client_agreement==null){
                        this.ruleForm.client_agreement={//字符串对象
                            'SM2':0,
                            'SSLv3':0,
                            'TLSv1.0':0,
                            'TLSv1.1':0,
                            'TLSv1.2':0,
                        }
                    }else {
                        this.ruleForm.client_agreement=JSON.parse(resp.data[0].client_agreement);
                    }

//                    this.ruleForm.client_agreement=JSON.parse(resp.data[0].client_agreement);
                    if(this.ruleForm.admin_agreement['SSLv3']==0){
                        this.ruleForm.admin_agreement['SSLv3']=false
                    }else{
                        this.ruleForm.admin_agreement['SSLv3']=true
                    }
                    if(this.ruleForm.admin_agreement['TLSv1.0']==0){
                        this.ruleForm.admin_agreement['TLSv1.0']=false
                    }else{
                        this.ruleForm.admin_agreement['TLSv1.0']=true
                    }
                    if(this.ruleForm.admin_agreement['TLSv1.1']==0){
                        this.ruleForm.admin_agreement['TLSv1.1']=false
                    }else{
                        this.ruleForm.admin_agreement['TLSv1.1']=true
                    }
                    if(this.ruleForm.admin_agreement['TLSv1.2']==0){
                        this.ruleForm.admin_agreement['TLSv1.2']=false
                    }else{
                        this.ruleForm.admin_agreement['TLSv1.2']=true
                    }
                    if(this.ruleForm.admin_agreement['SM2']==0){
                        this.ruleForm.admin_agreement['SM2']=false
                    }else{
                        this.ruleForm.admin_agreement['SM2']=true
                    }
                    if(this.ruleForm.admin_http_rewrite_https==0){//重新http
                        this.ruleForm.admin_http_rewrite_https=false
                    }else{
                        this.ruleForm.admin_http_rewrite_https=true
                    }
                    if(this.ruleForm.admin_suport_https==0){
                        this.ruleForm.admin_suport_https=false
                    }else{
                        this.ruleForm.admin_suport_https=true
                    }
                    if(this.ruleForm.admin_suport_http==0){
                        this.ruleForm.admin_suport_http=false
                    }else{
                        this.ruleForm.admin_suport_http=true
                    }
//                    if(this.ruleForm.admin_suport_err_lock==0){
//                        this.ruleForm.admin_suport_err_lock=false
//                    }else{
//                        this.ruleForm.admin_suport_err_lock=true
//                    }
                    // **************client*******************************

                    if(this.ruleForm.client_agreement['SSLv3']==0){
                        this.ruleForm.client_agreement['SSLv3']=false
                    }else{
                        this.ruleForm.client_agreement['SSLv3']=true
                    }
                    if(this.ruleForm.client_agreement['TLSv1.0']==0){
                        this.ruleForm.client_agreement['TLSv1.0']=false
                    }else{
                        this.ruleForm.client_agreement['TLSv1.0']=true
                    }
                    if(this.ruleForm.client_agreement['TLSv1.1']==0){
                        this.ruleForm.client_agreement['TLSv1.1']=false
                    }else{
                        this.ruleForm.client_agreement['TLSv1.1']=true
                    }
                    if(this.ruleForm.client_agreement['TLSv1.2']==0){
                        this.ruleForm.client_agreement['TLSv1.2']=false
                    }else{
                        this.ruleForm.client_agreement['TLSv1.2']=true
                    }
                    if(this.ruleForm.client_agreement['SM2']==0){
                        this.ruleForm.client_agreement['SM2']=false
                    }else{
                        this.ruleForm.client_agreement['SM2']=true
                    }
                    if(this.ruleForm.client_http_rewrite_https==0){//重新http
                        this.ruleForm.client_http_rewrite_https=false
                    }else{
                        this.ruleForm.client_http_rewrite_https=true
                    }
                    if(this.ruleForm.client_suport_https==0){
                        this.ruleForm.client_suport_https=false
                    }else{
                        this.ruleForm.client_suport_https=true
                    }
                    if(this.ruleForm.client_suport_http==0){
                        this.ruleForm.client_suport_http=false
                    }else{
                        this.ruleForm.client_suport_http=true
                    }
                    console.log(this.ruleForm,'pop',this.ruleForm.admin_agreement['SSLv3'])
                }).catch(err=> {

                });
            },
            save(){
                let ashs=this.ruleForm.admin_suport_https;
                let ash=this.ruleForm.admin_suport_http;
                let cshs=this.ruleForm.client_suport_https;
                let csh=this.ruleForm.client_suport_https;
//                *****************************
                let ahsp=this.ruleForm.admin_https_port;
                let ahp=this.ruleForm.admin_http_port;
                let chsp=this.ruleForm.client_https_port;
                let chp=this.ruleForm.client_http_port;
                if(this.ruleForm.client_enssl_port==''){
                    this.ruleForm.client_enssl_port=1
                }
                let cep=this.ruleForm.client_enssl_port;
                let arr=[];
                arr=[ahsp,ahp,chsp,chp,25,67,123,161,3306];
                let isReport;
                let reArr=[];

                console.log('checkInfo',this.checkInfo(),/^[0-9]*$/.test(this.ruleForm.session_timeout))
                if(this.ruleForm.admin_suport_https==true){
                    if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.ruleForm.admin_https_port) == false) {
                        this.$message({
                            type: 'warning',
                            message: '管理端HTTPS端口请输入1-65535之间的协议端口！'
                        });
                        return
                    }else {
                        this.ruleForm.admin_https_port=Number(this.ruleForm.admin_https_port)
                    }
                }else {
                    this.ruleForm.admin_https_port=Number(this.ruleForm.admin_https_port)
                }
                if(this.ruleForm.admin_suport_http==true){
                    if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.ruleForm.admin_http_port) == false) {
                        this.$message({
                            type: 'warning',
                            message: '管理端HTTP端口请输入1-65535之间的协议端口！'
                        });
                        return
                    }else{
                        this.ruleForm.admin_http_port=Number(this.ruleForm.admin_http_port)
                    }
                }else{
                    this.ruleForm.admin_http_port=Number(this.ruleForm.admin_http_port)
                }
                if(this.ruleForm.client_suport_https==true){
//                    if(this.ruleForm.client_https_port==null ||this.ruleForm.client_https_port==''){
                        if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.ruleForm.client_https_port) == false) {
                        this.$message({
                            type: 'warning',
                            message: '客户端Enwas端口请输入1-65535之间的协议端口！'
                        });
                        return
                    }else{
                        this.ruleForm.client_https_port=Number(this.ruleForm.client_https_port)
                    }
                    console.log('client_enssl_port:',this.ruleForm.client_enssl_port,typeof (this.ruleForm.client_enssl_port))
                    if(this.ruleForm.client_enssl_port&&this.ruleForm.client_enssl_port!=null){
                        if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.ruleForm.client_enssl_port) == false) {
                            this.$message({
                                type: 'warning',
                                message: '客户端Enssl端口请输入1-65535之间的协议端口！'
                            });
                            return
                        }else{
                            this.ruleForm.client_enssl_port=Number(this.ruleForm.client_enssl_port)
                        }
                    }
                }else{
                    this.ruleForm.client_https_port=Number(this.ruleForm.client_https_port)
                }
                if(this.ruleForm.client_suport_http==true){
                    if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.ruleForm.client_http_port) == false) {
                        this.$message({
                            type: 'warning',
                            message: '客户端HTTP端口请输入1-65535之间的协议端口！'
                        });
                        return
                    }else{
                        this.ruleForm.client_http_port=Number(this.ruleForm.client_http_port)
                    }
                }else{
                    this.ruleForm.client_http_port=Number(this.ruleForm.client_http_port)
                }
//                if(this.ruleForm.admin_suport_err_lock==true){
////                    if(this.ruleForm.admin_error_num==null||this.ruleForm.admin_error_num==''){
//                    if (/^([5-9]|[1-9]\d|[1-9]\d{2}|1000)$/.test(this.ruleForm.admin_error_num) == false) {
//                        this.$message({
//                            type: 'warning',
//                            message: '错误次数在5-1000之间！'
//                        });
//                        return
//                    }else{
//                        this.ruleForm.admin_error_num=Number(this.ruleForm.admin_error_num)
//                    }
//                }else{
//                    this.ruleForm.admin_error_num=Number(this.ruleForm.admin_error_num)
//                }

//            ***************判断 启用时 是否有设置协议端口重复*******
                if(cep&&cep!=null){
                    arr.push(cep);
                    arr.sort((a,b)=>{
                        return a-b
                    });
                    for(let i=0;i<arr.length;i++){
                        if(arr[i]==arr[i+1]){
                            reArr.push(arr[i])
                        }
                    }
                    // 有重复isReport=true
                    if(reArr.length>0){
                        this.$message({
                            type: 'warning',
                            // message: '端口重复或存在冲突端口！'
                            message: `端口${reArr.join()}重复或存在冲突！`
                        });
                        return
                    }else {
                        if(this.checkInfo()){
                            this.dialogVisible=!this.dialogVisible;
                        }

                    }
                }else {
                    // 有重复isReport=true
                    arr.sort((a,b)=>{
                        return a-b
                    });
                    for(let i=0;i<arr.length;i++){
                        if(arr[i]==arr[i+1]){
                            reArr.push(arr[i])
                        }
                    }
                    if(reArr.length>0){
                        this.$message({
                            type: 'warning',
                            message: `端口${reArr.join()}重复或存在冲突！`
                        });
                        return
                    }else {

                        if(this.checkInfo()){
                            this.dialogVisible=!this.dialogVisible;
                        }
                    }
                }
                console.log(ashs,ash,cshs,csh,'启动val')
            },
            //判断name 和 回话超时 是否存在
            checkInfo(){
                if(/^[A-Za-z0-9_]{1,}$/.test(this.ruleForm.device_name)&&/^[0-9]*$/.test(this.ruleForm.session_timeout)&&5<=this.ruleForm.session_timeout&&this.ruleForm.session_timeout<=1000){
                    return true
                }else {
                    return false
                }
            },
            submitFormPause(formName) {

                    if (typeof (this.ruleForm.admin_agreement) == 'string') {
                        console.log("string")
                        this.ruleForm.admin_agreement = JSON.parse(this.ruleForm.admin_agreement)
                    }
                    if (this.ruleForm.admin_agreement['SSLv3'] == false) {
                        this.ruleForm.admin_agreement['SSLv3'] = 0
                    } else {
                        this.ruleForm.admin_agreement['SSLv3'] = 1
                    }
                    if (this.ruleForm.admin_agreement['TLSv1.0'] == false) {
                        this.ruleForm.admin_agreement['TLSv1.0'] = 0
                    } else {
                        this.ruleForm.admin_agreement['TLSv1.0'] = 1
                    }
                    if (this.ruleForm.admin_agreement['TLSv1.1'] == false) {
                        this.ruleForm.admin_agreement['TLSv1.1'] = 0
                    } else {
                        this.ruleForm.admin_agreement['TLSv1.1'] = 1
                    }
                    if (this.ruleForm.admin_agreement['TLSv1.2'] == false) {
                        this.ruleForm.admin_agreement['TLSv1.2'] = 0
                    } else {
                        this.ruleForm.admin_agreement['TLSv1.2'] = 1
                    }
                    if (this.ruleForm.admin_agreement['SM2'] == false) {
                        this.ruleForm.admin_agreement['SM2'] = 0
                    } else {
                        this.ruleForm.admin_agreement['SM2'] = 1
                    }
                    if (this.ruleForm.admin_http_rewrite_https == false) {//重新http
                        this.ruleForm.admin_http_rewrite_https = 0
                    } else {
                        this.ruleForm.admin_http_rewrite_https = 1
                    }
                    if (this.ruleForm.admin_suport_https == false) {
                        this.ruleForm.admin_suport_https = 0
                    } else {
                        this.ruleForm.admin_suport_https = 1
                    }
                    if (this.ruleForm.admin_suport_http == false) {
                        this.ruleForm.admin_suport_http = 0
                    } else {
                        this.ruleForm.admin_suport_http = 1
                    }
//                    if (this.ruleForm.admin_suport_err_lock == false) {
//                        this.ruleForm.admin_suport_err_lock = 0
//                    } else {
//                        this.ruleForm.admin_suport_err_lock = 1
//                    }

                    // **************client*******************************

                    if (this.ruleForm.client_agreement['SSLv3'] == false) {
                        this.ruleForm.client_agreement['SSLv3'] = 0
                    } else {
                        this.ruleForm.client_agreement['SSLv3'] = 1
                    }
                    if (this.ruleForm.client_agreement['TLSv1.0'] == false) {
                        this.ruleForm.client_agreement['TLSv1.0'] = 0
                    } else {
                        this.ruleForm.client_agreement['TLSv1.0'] = 1
                    }
                    if (this.ruleForm.client_agreement['TLSv1.1'] == false) {
                        this.ruleForm.client_agreement['TLSv1.1'] = 0
                    } else {
                        this.ruleForm.client_agreement['TLSv1.1'] = 1
                    }
                    if (this.ruleForm.client_agreement['TLSv1.2'] == false) {
                        this.ruleForm.client_agreement['TLSv1.2'] = 0
                    } else {
                        this.ruleForm.client_agreement['TLSv1.2'] = 1
                    }
                    if (this.ruleForm.client_agreement['SM2'] == false) {
                        this.ruleForm.client_agreement['SM2'] = 0
                    } else {
                        this.ruleForm.client_agreement['SM2'] = 1
                    }
                    if (this.ruleForm.client_http_rewrite_https == false) {//重新http
                        this.ruleForm.client_http_rewrite_https = 0
                    } else {
                        this.ruleForm.client_http_rewrite_https = 1
                    }

                    if (this.ruleForm.client_suport_https == false) {
                        this.ruleForm.client_suport_https = 0
                    } else {
                        this.ruleForm.client_suport_https = 1
                    }
                    if (this.ruleForm.client_suport_http == false) {
                        this.ruleForm.client_suport_http = 0
                    } else {
                        this.ruleForm.client_suport_http = 1
                    }
                    this.ruleForm.admin_agreement = JSON.stringify(this.ruleForm.admin_agreement);
                    this.ruleForm.client_agreement = JSON.stringify(this.ruleForm.client_agreement);
                    this.ruleForm.session_timeout = Number(this.ruleForm.session_timeout);
//                    this.ruleForm.admin_error_num = Number(this.ruleForm.admin_error_num);
                    this.ruleForm.client_http_port = Number(this.ruleForm.client_http_port);
                // console.log(this.ruleForm, 'submit', this.ruleForm.id, this.ruleForm.admin_suport_https)
                    this.$refs[formName].validate((valid) => {

                        if (valid) {
                            ModAdminList(this.ruleForm).then((resp) => {
                                console.log(resp, 'resp');
                                if (resp.status = 1) {
                                    //设置防火墙开放端口
                                    //暂时注释（4.10）
                                    // this.setFirewallPort(this.ruleForm.admin_https_port+","+this.ruleForm.admin_http_port+","+this.ruleForm.client_https_port+","+this.ruleForm.client_http_port);

                                    this.$message({
                                        type: 'success',
                                        message: '保存成功！'
                                    });
                                    this.isEdit = !this.isEdit;
                                    this.getList();
                                    this.dialogVisible=false;
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '保存失败!'
                                    });
                                }
                            }).catch(e => {
                                console.log("保存出错", e);
                            })
                            // }

                        } else {
                            return false;
                        }
                    });
//                }
            },
            submitForm(formName) {
                    if (typeof (this.ruleForm.admin_agreement) == 'object') {
                        console.log("object")
                    }
                    if (typeof (this.ruleForm.admin_agreement) == 'string') {
                        console.log("string")
                        this.ruleForm.admin_agreement = JSON.parse(this.ruleForm.admin_agreement)
                    }
                    console.log(this.ruleForm.admin_http_rewrite_https, 'formName', this.ruleForm.admin_agreement, this.ruleForm.admin_agreement['SSLv3'])
                    if (this.ruleForm.admin_agreement['SSLv3'] == false) {
                        this.ruleForm.admin_agreement['SSLv3'] = 0
                    } else {
                        this.ruleForm.admin_agreement['SSLv3'] = 1
                    }
                    if (this.ruleForm.admin_agreement['TLSv1.0'] == false) {
                        this.ruleForm.admin_agreement['TLSv1.0'] = 0
                    } else {
                        this.ruleForm.admin_agreement['TLSv1.0'] = 1
                    }
                    if (this.ruleForm.admin_agreement['TLSv1.1'] == false) {
                        this.ruleForm.admin_agreement['TLSv1.1'] = 0
                    } else {
                        this.ruleForm.admin_agreement['TLSv1.1'] = 1
                    }
                    if (this.ruleForm.admin_agreement['TLSv1.2'] == false) {
                        this.ruleForm.admin_agreement['TLSv1.2'] = 0
                    } else {
                        this.ruleForm.admin_agreement['TLSv1.2'] = 1
                    }
                    if (this.ruleForm.admin_agreement['SM2'] == false) {
                        this.ruleForm.admin_agreement['SM2'] = 0
                    } else {
                        this.ruleForm.admin_agreement['SM2'] = 1
                    }
                    if (this.ruleForm.admin_http_rewrite_https == false) {//重新http
                        this.ruleForm.admin_http_rewrite_https = 0
                    } else {
                        this.ruleForm.admin_http_rewrite_https = 1
                    }
                    if (this.ruleForm.admin_suport_https == false) {
                        this.ruleForm.admin_suport_https = 0
                    } else {
                        this.ruleForm.admin_suport_https = 1
                    }
                    if (this.ruleForm.admin_suport_http == false) {
                        this.ruleForm.admin_suport_http = 0
                    } else {
                        this.ruleForm.admin_suport_http = 1
                    }
//                    if (this.ruleForm.admin_suport_err_lock == false) {
//                        this.ruleForm.admin_suport_err_lock = 0
//                    } else {
//                        this.ruleForm.admin_suport_err_lock = 1
//                    }

                    // **************client*******************************

                    if (this.ruleForm.client_agreement['SSLv3'] == false) {
                        this.ruleForm.client_agreement['SSLv3'] = 0
                    } else {
                        this.ruleForm.client_agreement['SSLv3'] = 1
                    }
                    if (this.ruleForm.client_agreement['TLSv1.0'] == false) {
                        this.ruleForm.client_agreement['TLSv1.0'] = 0
                    } else {
                        this.ruleForm.client_agreement['TLSv1.0'] = 1
                    }
                    if (this.ruleForm.client_agreement['TLSv1.1'] == false) {
                        this.ruleForm.client_agreement['TLSv1.1'] = 0
                    } else {
                        this.ruleForm.client_agreement['TLSv1.1'] = 1
                    }
                    if (this.ruleForm.client_agreement['TLSv1.2'] == false) {
                        this.ruleForm.client_agreement['TLSv1.2'] = 0
                    } else {
                        this.ruleForm.client_agreement['TLSv1.2'] = 1
                    }
                    if (this.ruleForm.client_agreement['SM2'] == false) {
                        this.ruleForm.client_agreement['SM2'] = 0
                    } else {
                        this.ruleForm.client_agreement['SM2'] = 1
                    }
                    if (this.ruleForm.client_http_rewrite_https == false) {//重新http
                        this.ruleForm.client_http_rewrite_https = 0
                    } else {
                        this.ruleForm.client_http_rewrite_https = 1
                    }

                    if (this.ruleForm.client_suport_https == false) {
                        this.ruleForm.client_suport_https = 0
                    } else {
                        this.ruleForm.client_suport_https = 1
                    }
                    if (this.ruleForm.client_suport_http == false) {
                        this.ruleForm.client_suport_http = 0
                    } else {
                        this.ruleForm.client_suport_http = 1
                    }
                    this.ruleForm.admin_agreement = JSON.stringify(this.ruleForm.admin_agreement);
                    this.ruleForm.client_agreement = JSON.stringify(this.ruleForm.client_agreement);
                    this.ruleForm.session_timeout = Number(this.ruleForm.session_timeout);
                    this.ruleForm.client_http_port = Number(this.ruleForm.client_http_port)
                    this.$refs[formName].validate((valid) => {
                        if (valid) {

                            ModAdminList(this.ruleForm).then((resp) => {


                                if (resp.status = 1) {

                                    //设置防火墙开放端口
                                    //暂时注释（4.10）
                                    // this.setFirewallPort(this.ruleForm.admin_https_port+","+this.ruleForm.admin_http_port+","+this.ruleForm.client_https_port+","+this.ruleForm.client_http_port);

                                    this.$message({
                                        type: 'success',
                                        message: '保存成功！'
                                    });
                                    this.isEdit = !this.isEdit;
                                    this.getList();
                                    this.dialogVisible=false;
                                    if(this.name===this.ruleForm.device_name){//重启服务
                                        console.log(this.name,this.ruleForm.device_name,'name')
                                        getRestartServer().then((resp)=> {
                                            console.log(resp, 'resp-getRestartServer')
                                        }).catch(err=> {

                                        })
                                    }
                                    if(this.name!==this.ruleForm.device_name) {//重启设备
                                        console.log(this.name,this.ruleForm.device_name,'name');
                                        getRestart().then((resp)=> {

                                        }).catch(err=> {

                                        })
                                    }
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '保存失败!'
                                    });
                                    this.editVisible = false;
                                }
                            }).catch(e => {
                                console.log("保存出错", e);
                            })


                        } else {
                            return false;
                        }
                    });
                // }
            },

            // setFirewallPort(ports){
            //     setDefaultPolicy({ports:ports}).then(response => {
            //         if (response.status == 'SUCCESS') {
            //             this.$message({
            //                 type: 'success',
            //                 message: '修改默认端口成功!'
            //             });
            //         } else {
            //             this.$message({
            //                 type: 'error',
            //                 message: '修改默认端口失败!'
            //             });
            //         }
            //     }).catch(() => {
            //     });
            // }
        }
    };
</script>
<style>
    .reg_put{
        width: 260px;
    }
    .dot{
        color: red;
        position: absolute;
        left:-119px;
    }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .adminconfig_box {
        margin: 0 20px;
        margin-top: 20px;
        .el-form-item__label {
            text-align: left;
        }
        .form_item{
            margin-left: 50px;
        }
        .form_item_btn{
            margin-top: 37px;
        }

    }
</style>
<style>

    .adminconfig_box .mail_form .el_btn {
        position: relative;
        top: -36px;
        left: 110%;
    }
    /*************************************/
    .el-dialog--tiny {
        width: 25%;
    }
    /* 设置弹出框大小*/
    .adminconfig_box .dialog {
        /*min-width: 830px;*/
    }
    .adminconfig_box .el-dialog__title{
        margin-left: 12px;
    }
    .adminconfig_box .el-dialog__header {
        padding-left: 5px;
        height: 50px;
    }
    .adminconfig_box .el-dialog__footer{
        height: 59px;
    }
    .adminconfig_box .el-dialog__body {
        padding: 30px 20px;
    }

    .form_sub .el-form-item__content{
        /*width: 36%;*/
        /*min-width: 830px;*/
    }
    .put_sub {
        margin-left: 154px !important;

    }
    .put_sub .el-form-item__label{
        font-size: 12px !important;
        color: grey!important;
    }
    .box_thir .el-form-item__label{
        margin-left: 153px;
        font-size: 12px !important;
        color: grey!important;
    }
    .sel_sub{
        margin-left: -17px;
    }
    .sel_sub .el-form-item__label{
        font-size: 12px;
        color: grey;
    }
    .sel_sub .el-form-item__label{
        margin-left: 168px !important;
    }
    .box_sub .el-form-item__label{
        margin-left: 50px;
    }

    .reset_margin_title_right label.el-form-item__label{
        margin-right: 20px;
    }
    .el-form-item__error {
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 20px;
    }
</style>
<style lang="scss">
    .adminconfig_box {
        .el-form{
            .el_put{
                width: 300px;
            }
        }
    }
</style>
