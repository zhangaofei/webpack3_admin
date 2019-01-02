<template>
    <div class="ipsec public">

        <el-dialog
                title="导入文件"
                :visible.sync="uploadVisible"
                size="small"
                custom-class="dialog public"
                :before-close="handleCloseUpload"
        >
            <div >
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        :file-list='fileList'
                        drag
                        :action="uploadUrl"
                        multiple
                        :with-credentials="true"
                        :on-success="uploadSuccess"
                        :auto-upload="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
                    <el-button style="margin-top:10px;margin-left: 10px;" size="small" @click="submitUpload">上传到服务器</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title="新建ipsec设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose">
            <div>

            <el-tabs v-model="activeName">
                <el-tab-pane label="基础配置" name="first">
                    <!---------------------------------------------------------------->
                    <div class="ipsec-form">
                        <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="180px" class="ipsec-form">

                            <el-form-item label="链接名称 " prop=""  required>
                                <el-input v-model="addInfo.name" placeholder="请输入名称" class="ipsec_put_1"></el-input>
                            </el-form-item>

                            <el-form-item label="本地接口" prop=""required>
                                <el-select v-model="addInfo.localEth"  placeholder="请选择" class="el_sel">
                                    <el-option label="任何" value="any" ></el-option>
                                    <el-option label="默认" value="default" ></el-option>
                                    <el-option
                                            v-for="eth in ethNames"
                                            :key="eth.device"
                                            :label="eth.device"
                                            :value="eth.device">
                                    </el-option>
                                </el-select>

                                <span v-if="addInfo.localEth=='any'">
                                            <a style="color: #3197ff;margin-left: 10px">该选项适用于本端PPPOE拨号时选择</a>
                                        </span>
                                <span v-if="addInfo.localEth=='default'">
                                            <a style="color: #3197ff;margin-left: 10px">请确保配置默认路由或者默认网关</a>
                                        </span>
                            </el-form-item>

                            <el-form-item label="远程地址 " prop=""  required>
                                <el-select v-model="remoteAddrType" placeholder="请选择" class="el_sel">
                                    <el-option label="静态" value="static" ></el-option>
                                    <el-option label="动态" value="any" ></el-option>
                                </el-select>
                                <span v-if="this.remoteAddrType=='static'">
                                    <el-input v-model="addInfo.remoteAddr" placeholder="请填写ipv4地址或域名" class="ipsec_put_2"></el-input>
                                </span>
                                <span v-else>
                                    <a style="color: #3197ff;margin-left: 10px">动态地址适用于对端为PPPOE拨号时选择</a>
                                </span>
                            </el-form-item>

                            <el-form-item label="认证方式" prop="">
                                <el-radio-group v-model="addInfo.authType"  class="ipsec_put_1">
                                    <el-radio label="secret">预共享密钥</el-radio>
                                    <el-radio label="pubkey">证书</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <span v-if="addInfo.authType=='pubkey'">
                                <el-form-item label="本地私钥" prop=""  required>
                                    <el-select v-model="addInfo.cacert"  placeholder="请选择" class="ipsec_put_1">
                                    <el-option
                                            v-for="file in privateList"
                                            :key="file"
                                            :label="file"
                                            :value="file">
                                    </el-option>
                                </el-select>
                                    <el-button style="margin-left: 10px;background-color: #3dcd4d;width: 100px;height: 37px; color: white" @click="trigUpload('private')">
                                        浏览
                                    </el-button>
                                </el-form-item>

                                <el-form-item label="私钥密码" prop="" required>
                                    <el-input v-model="addInfo.caSecret" placeholder="请输入私钥密码" class="ipsec_put_1"></el-input>
                                </el-form-item>

                                 <el-form-item label="根证书" prop=""  required>
                                     <el-select v-model="addInfo.rootCert"  placeholder="请选择" class="ipsec_put_1">
                                    <el-option
                                            v-for="file in rootCertList"
                                            :key="file"
                                            :label="file"
                                            :value="file">
                                    </el-option>
                                     </el-select>
                                     <el-button style="margin-left: 10px;background-color: #3dcd4d;width: 100px;height: 37px;color: white" @click="trigUpload('root')">
                                         浏览
                                    </el-button>
                                     </el-form-item>
                                 <el-form-item label="本地证书" prop=""  required>
                                       <el-select v-model="addInfo.localCert"  placeholder="请选择" class="ipsec_put_1">
                                    <el-option
                                            v-for="file in certList"
                                            :key="file"
                                            :label="file"
                                            :value="file">
                                    </el-option>
                                     </el-select>
                                     <el-button style="margin-left: 10px;background-color: #3dcd4d;width: 100px;height: 37px;color: white" @click="trigUpload('cert')">
                                         浏览
                                    </el-button>
                                     </el-form-item>
                                <el-form-item label="远程证书" prop=""  required>
                                      <el-select v-model="addInfo.remoteCert"  placeholder="请选择" class="ipsec_put_1">
                                    <el-option
                                            v-for="file in certList"
                                            :key="file"
                                            :label="file"
                                            :value="file">
                                    </el-option>
                                     </el-select>
                                    <el-button style="margin-left: 10px;background-color: #3dcd4d;width: 100px;height: 37px;color: white" @click="trigUpload('cert')">
                                        浏览
                                    </el-button>
                                     </el-form-item>

                                </span>
                            <span v-else>
                                <el-form-item label="预共享密钥" prop=""  required>
                                    <el-input v-model="addInfo.authPsd" placeholder="不可包含中文和空格" class="ipsec_put_1"></el-input>
                                </el-form-item>
                            </span>

                            <el-form-item label="本地网络 " prop=""  required>
                                <el-input v-model="addInfo.localIp" placeholder="如x.x.x.x/x" class="ipsec_put_1"></el-input>
                            </el-form-item>

                            <el-form-item label="远程网络 " prop=""  required>
                                <el-input v-model="addInfo.remoteIp" placeholder="如x.x.x.x/x" class="ipsec_put_1"></el-input>
                            </el-form-item>

                            <el-form-item label="本地ID " prop=""  required>
                                <el-select v-model="addInfo.localIdType" placeholder="请选择" class="el_sel">
                                    <el-option label="名称" value="name" ></el-option>
                                    <span v-if="addInfo.authType=='secret'">
                                        <el-option label="ip地址" value="ip" ></el-option>
                                    </span>

                                </el-select>
                                <el-input v-model="addInfo.localId" class="ipsec_put_2"></el-input>
                            </el-form-item>

                            <el-form-item label="远程ID " prop=""  required>
                                <el-select v-model="addInfo.remoteIdType" placeholder="请选择" class="el_sel">
                                    <el-option label="名称" value="name" ></el-option>
                                    <span v-if="addInfo.authType=='secret'">
                                        <el-option label="ip地址" value="ip" ></el-option>
                                    </span>

                                </el-select>
                                <el-input v-model="addInfo.remoteId" class="ipsec_put_2"></el-input>
                            </el-form-item>

                        </el-form>
                    </div>

                </el-tab-pane>
                
                
                <el-tab-pane label="安全提议" name="second" v-bind:disabled="true">


                        <div class="ipsec-form">
                            <el-form :model="addInfo" :rules="rules" ref="addInfo2" label-width="180px" class="ipsec-form">
                                <p >IKE参数</p>
                                <el-form-item label="IKE版本" prop="ikeVersion">
                                    <el-radio-group v-model="addInfo.ikeVersion"  class="ipsec_put_1">
                                        <span v-if="addInfo.authType=='secret'">
                                            <el-radio label="ikev1" style="margin-right: 30px">IKEv1</el-radio>
                                        </span>
                                        <el-radio label="ikev2">IKEv2</el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="协商模式" prop="negotiation">
                                    <el-radio-group v-model="addInfo.negotiation"  class="ipsec_put_1">
                                        <el-radio label="positive">主动模式</el-radio>
                                        <el-radio label="active">野蛮模式</el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="加密算法" prop="encryptionAlgIke">
                                    <span style="position: absolute;left: -81px;top: 0;color: red;">*</span>
                                    <el-checkbox-group v-model="addInfo.encryptionAlgIke"  class="el_check">
                                        <el-checkbox label="aes128">aes128</el-checkbox>
                                        <el-checkbox label="aes192">aes192</el-checkbox>
                                        <el-checkbox label="aes256">aes256</el-checkbox>
                                        <el-checkbox label="des">des</el-checkbox>
                                        <el-checkbox label="3des">3des</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>

                                <el-form-item label="认证算法" prop="authAlgIke">
                                    <span style="position: absolute;left: -81px;top: 0;color: red;">*</span>
                                    <el-checkbox-group v-model="addInfo.authAlgIke"  class="el_check">
                                        <el-checkbox label="md5">md5</el-checkbox>
                                        <el-checkbox label="sha1">sha1</el-checkbox>
                                        <el-checkbox label="sha256">sha256</el-checkbox>
                                        <el-checkbox label="sha382">sha382</el-checkbox>
                                        <el-checkbox label="sha512">sha512</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>

                                <el-form-item label="DH组" prop="dhGroup">
                                    <span style="position: absolute;left: -59px;color: red;">*</span>
                                    <el-checkbox-group v-model="addInfo.dhGroup"  class="el_check">
                                        <el-checkbox label="modp768">1</el-checkbox>
                                        <el-checkbox label="modp1024">2</el-checkbox>
                                        <el-checkbox label="modp1536">5</el-checkbox>
                                        <el-checkbox label="modp2048">14</el-checkbox>
                                        <el-checkbox label="modp3072">15</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>

                                <el-form-item label="IKE超时时间 " prop="">
                                    <el-input v-model="addInfo.ikeLifetime" placeholder="30-604880 默认 28800 秒" class="ip_put_1"></el-input>
                                </el-form-item>

                                <p>IPSEC参数</p>
                                <el-form-item label="封装模式" prop="packageType">
                                    <el-radio-group v-model="addInfo.packageType"  class="ipsec_put_1">
                                        <el-radio label="transport">传输模式</el-radio>
                                        <el-radio label="tunnel">隧道模式</el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="加密算法" prop="encryptionAlgIpsec">
                                    <span style="position: absolute;left: -81px;color: red;">*</span>
                                    <el-checkbox-group v-model="addInfo.encryptionAlgIpsec"  class="el_check">
                                        <el-checkbox label="aes128">aes128</el-checkbox>
                                        <el-checkbox label="aes192">aes192</el-checkbox>
                                        <el-checkbox label="aes256">aes256</el-checkbox>
                                        <el-checkbox label="des">des</el-checkbox>
                                        <el-checkbox label="3des">3des</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>

                                <el-form-item label="认证算法" prop="authAlgIpsec" >
                                    <span style="position: absolute;left: -81px;color: red;">*</span>
                                    <el-checkbox-group v-model="addInfo.authAlgIpsec"  class="el_check">
                                        <el-checkbox label="md5">md5</el-checkbox>
                                        <el-checkbox label="sha1">sha1</el-checkbox>
                                        <el-checkbox label="sha256">sha256</el-checkbox>
                                        <el-checkbox label="sha382">sha382</el-checkbox>
                                        <el-checkbox label="sha512">sha512</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>


                                <el-form-item label="SA超时时间 " prop="">
                                    <el-input v-model="addInfo.keyLife" placeholder="30-604880 默认 3600 秒" class="ip_put_1"></el-input>
                                </el-form-item>

                                <el-form-item label="是否由本地发起" prop="auto">
                                    <el-radio-group v-model="addInfo.auto"  class="ipsec_put_1">
                                        <el-radio label="yes">是</el-radio>
                                        <el-radio label="no">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <p>DPD参数</p>
                                <el-form-item label="状态" prop="dpdState">
                                    <el-radio-group v-model="addInfo.dpdState"  class="ipsec_put_1">
                                        <el-radio label="on">开启</el-radio>
                                        <el-radio label="off">关闭</el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <span v-if="addInfo.dpdState=='on'">
                                    <el-form-item label="DPD动作" prop="dpdAction">
                                    <el-radio-group v-model="addInfo.dpdAction"  class="ipsec_put_1">
                                        <el-radio label="restart">重启</el-radio>
                                        <el-radio label="clear">清除</el-radio>
                                    </el-radio-group>
                                    </el-form-item>
                                        <el-form-item label="检测时间间隔 " prop="dpdDelay">
                                        <el-input v-model="addInfo.dpdDelay" placeholder="10-3600 秒" class="ipsec_put_3"></el-input>
                                    </el-form-item>

                                        <el-form-item label="重传间隔 " prop="dpdLifetime">
                                        <el-input v-model="addInfo.dpdLifetime" placeholder="2-60 秒" class="ipsec_put_3"></el-input>
                                    </el-form-item>
                                </span>

                            </el-form>

                        </div>
                </el-tab-pane>

            </el-tabs>
            </div>

            <div class='form-footer' slot="footer" style="height:50px;">
                <div class="foot">
                    <span class="canle" @click="handleClose">
                        取消
                    </span>
                    <el-button
                            class="btn_sav"
                            @click="nextFormPart('addInfo')"
                            v-if="activeName=='first'"
                            style="margin-left: 20px; background-color: #2b7de3;color: white;width: 100px">
                        下一步
                    </el-button>
                    <el-button
                            class="btn_sav"
                            type="primary"
                            v-if="activeName=='second'"
                            @click="lastFormPart()"
                            style="margin-left: 20px;background-color: #2b7de3;color: white;width: 100px">上一步</el-button>
                    <el-button class="btn_sav"
                               style="background-color: #2b7de3;color: white;width: 100px"
                               @click="submitForm('addInfo2')">
                        提交
                    </el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {addIpsec,getEthWithIp,getPrivateList,getRootCertList,getCertList} from "api/ipsec/ipsec";

    export default{
        components: {
           },
        data(){

            var validateName = (rule, value, callback) =>
            {
                if (/^(\w){1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    callback();
                }
            };


            var validateRemoteAddr = (rule, value, callback) =>
            {
               // var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                var reg =  /^[\u4e00-\u9fa5]+$/
                if (reg.test(value)&&this.remoteAddrType=='static'){
                    callback(new Error("请输入ipv4地址或域名,不可包含中文字符"));
                }
                callback();
            };

            var validateAuthPsd = (rule, value, callback) =>
            {
                var reg = /^[a-zA-Z\d#@!~%^&*./]{1,20}$/;

                if (this.addInfo.authType=='secret') {
                    if (reg.test(value) == false) {
                        callback(new Error("预共享密钥不可包含中文和空格,长度20以内"));
                    }
                }
                callback();

            };

            var validateNet = (rule, value, callback) =>
            {
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                var numReg = /^-?\d+$/;

                var list = value.split(",");

                for(var i=0;i<list.length;i++){
                    if (list[i].indexOf("/")>0){
                        var ip = list[i].split("/");
                        if (ipReg.test(ip[0]) == false) {
                            callback(new Error("请输入正确的ipv4地址"));
                        }
                        if (numReg.test(ip[1])==false||ip[1]>32||ip[1]<0){
                            callback(new Error("简写掩码值不合法，请输入0-32数字"));
                        }
                    }else {
                        callback(new Error("简写掩码请用 ／ 分隔"));
                    }
                }
                callback();
            };


            var validateLocalId = (rule, value, callback) =>
            {
                var nameReg = /^[a-zA-Z\d#@!~%^&*./]{1,20}$/;
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                if (this.addInfo.localIdType=="name"){
                    if (nameReg.test(value)==false){
                        callback(new Error("名称不可包含空格和中文"));
                    }
                    callback();
                }else {
                    if (ipReg.test(value)==false){
                        callback(new Error("请输入正确的ipv4地址"));
                    }
                    callback();
                }
            };

            var validateRemoteId = (rule, value, callback) =>
            {
                var nameReg = /^[a-zA-Z\d#@!~%^&*./]{1,20}$/;
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                if (this.addInfo.remoteIdType=="name"){
                    if (nameReg.test(value)==false){
                        callback(new Error("名称不可包含空格和中文"));
                    }
                    callback();
                }else {
                    if (ipReg.test(value)==false){
                        callback(new Error("请输入正确的ipv4地址"));
                    }
                    callback();
                }
            };

            var validateCert = (rule, value, callback) =>
            {
                var nameReg = /^[a-zA-Z\d#@!~%^&*./]{1,20}$/;
                if (this.addInfo.authType=="pubkey"){
                    if (nameReg.test(value)==false){
                        callback(new Error("证书不可包含空格和中文"));
                    }
                }
                callback();
            };

            var validateCaSecret = (rule, value, callback) =>
            {
                if (this.addInfo.authType=="pubkey"){
                    if (value.indexOf(";")>-1){
                        callback(new Error("私钥密码不可包含';'字符"));
                    }
                }
                callback();
            };

            var validateIkeSA = (rule, value, callback) =>
            {
                var  numReg = /^-?\d+$/;

                if (value==""){
                    callback(new Error("请填写30-604880范围内数字"));
                }else if (numReg.test(value)==false||value<30||value>604880){
                    callback(new Error("请填写30-604880范围内数字"));
                }
                callback();
            };

            var validateDpdDelay = (rule, value, callback) =>
            {
                var  numReg = /^-?\d+$/;
                if (this.addInfo.dpdState=='on') {
                    if (numReg.test(value) == false || value < 10 || value > 3600) {
                        callback(new Error("请填写10-3600范围内数字"));
                    }
                }
                callback();
            };

            var validateDpdLifetime = (rule, value, callback) =>
            {
                var  numReg = /^-?\d+$/;
                if (this.addInfo.dpdState=='on') {
                    if (numReg.test(value) == false || value < 2 || value > 60) {
                        callback(new Error("请填写2-60范围内数字"));
                    }
                }
                callback();
            };

            return {

                rules: {
                    name: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],
//                    remoteAddr: [
//                         {required: true, validator: validateRemoteAddr, trigger: 'blur'}
//                    ],
                    authPsd:[
                        {required: true, validator: validateAuthPsd, trigger: 'blur'}
                    ],
                    localIp:[
                        {required: true, validator: validateNet, trigger: 'blur'}
                    ],
                    remoteIp:[
                        {required: true, validator: validateNet, trigger: 'blur'}
                    ],
                    localId:[
                        {required: true, validator: validateLocalId, trigger: 'blur'}
                    ],
                    remoteId:[
                        {required: true, validator: validateRemoteId, trigger: 'blur'}
                    ],
                    cacert:[
                        {required: true, validator: validateCert, trigger: 'blur'}
                    ],
                    caSecret:[
                        {required: false, validator: validateCaSecret, trigger: 'blur'}
                    ],
                    rootCert:[
                        {required: true, validator: validateCert, trigger: 'blur'}
                    ],
                    localCert:[
                        {required: true, validator: validateCert, trigger: 'blur'}
                    ],
                    remoteCert:[
                        {required: true, validator: validateCert, trigger: 'blur'}
                    ],
                    ikeLifetime:[
                        {required: true, validator: validateIkeSA, trigger: 'blur'}
                    ],
                    keyLife:[
                        {required: true, validator: validateIkeSA, trigger: 'blur'}
                    ],
                    dpdDelay:[
                        {required: true, validator: validateDpdDelay, trigger: 'blur'}
                    ],
                    dpdLifetime:[
                        {required: true, validator: validateDpdLifetime, trigger: 'blur'}
                    ],




                },

                addInfo: {
                    name:'',
                    localEth:'',
                    remoteAddr:'',
                    authType:'secret',
                    authPsd:'',
                    cacert:'',
                    caSecret:'',
                    rootCert:'',
                    localCert:'',
                    remoteCert:'',
                    localIdType:'name',
                    localId:'',
                    remoteIdType:'name',
                    remoteId:'',
                    localIp:'',
                    remoteIp:'',
                    localMask:'',
                    remoteMask:'',

                    ikeVersion:'ikev2',
                    negotiation:'positive',
                    encryptionAlgIke:[],
                    authAlgIke:[],
                    dhGroup:[],
                    ikeLifetime:'',

                    packageType:'transport',
                    encryptionAlgIpsec:[],
                    authAlgIpsec:[],
                    auto:'no',
                    keyLife:'',

                    dpdState:'off',
                    dpdAction:'restart',
                    dpdDelay:'',
                    dpdLifetime:''
                },
                addVisible: true,
                activeName:'first',
                ethNames:[],
                remoteAddrType:"any",

                rootCertList:[],
                privateList:[],
                certList:[],

                uploadVisible:false,
                currentUpload:"",
                uploadUrl:"",
                fileList:[],

            };

        },
        created(){
            this.setListForSelect();
        },
        methods: {


            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },

            handleCloseUpload() {
                this.$refs['upload'].clearFiles();
                this.uploadVisible = false;
            },
            chooseTab(tab, event) {

            },

            submitUpload(formName) {
                this.$refs['upload'].submit();
            },

            trigUpload(type){
                this.uploadVisible = true;
                this.currentUpload = type;
                if (type=="private"){
                    this.uploadUrl = "../api/admin/ipsec/upload/private";
                }else if(type=="root"){
                    this.uploadUrl = "../api/admin/ipsec/upload/rootcert";
                }else {
                    this.uploadUrl = "../api/admin/ipsec/upload/cert";
                }
            },

            uploadError:function(err){
                this.$message({
                    type:'warning',
                    message:'文件上传失败'
                });
            },

            uploadSuccess:function(response){
                if(response.status=='SUCCESS'){
                    if (this.currentUpload=="private"){
                        this.getPrivateList();
                    }else if(this.currentUpload=="root"){
                        this.getRootCertList();
                    }else {
                        this.getCertList();
                    }

                    this.$message({
                        type:'success',
                        message:"文件上传成功"
                    });
                }else{
                    this.$message({
                        type:'warning',
                        message:"文件上传出错"
                    });

                }
                this.$refs['upload'].clearFiles();
                this.uploadVisible = false;
            },

            setListForSelect(){
                //        获取接口名称
                getEthWithIp().then((resp)=>{
                    this.ethNames=resp.data;
                }).catch(err=>{});

                this.getPrivateList();  //获取私钥文件名列表
                this.getRootCertList();//获取根证书文件名列表
                this.getCertList();// 获取本地/远程证书文件名列表
            },

            getPrivateList(){
                getPrivateList().then((resp)=>{
                    this.privateList=resp.data;
                }).catch(err=>{});
            },
            getRootCertList(){
                getRootCertList().then((resp)=>{
                    this.rootCertList=resp.data;
                }).catch(err=>{});
            },
            getCertList(){
                getCertList().then((resp)=>{
                    this.certList=resp.data;
                }).catch(err=>{});
            },


            changeStatus(){
                this.$emit("onChangeStatus")
            },

            validate() {

                if (/^(\w){1,20}$/.test(this.addInfo.name) == false) {
                    this.$message({
                        type: 'warning',
                        message: '请输入1-20位字母、数字、下划线的名称'
                    });
                    return false
                }

//                if(this.addInfo.remoteAddr!='any'&&this.remoteAddrType=='static'){
//                    if(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.addInfo.remoteAddr)==false){
//                        this.$message({type: 'warning', message: '远程地址请输入正确的ipv4地址'});
//                        return false
//                    }
//                }
                if(this.addInfo.localEth==''){
                    this.$message({type: 'warning', message: '本地接口不能为空！'});
                    return false;
                }
                if (this.addInfo.authType=="secret") {
                    let reg = /^[a-zA-Z\d#@!~%^&*./]{1,20}$/;
                    if (reg.test(this.addInfo.authPsd) == false) {
                        this.$message({type: 'warning', message: '预共享密钥不可包含中文和空格,长度20以内'});
                        return false
                    }
                }
                if(this.addInfo.authType=='pubkey'){
                    if (/^[a-zA-Z\d#@!~%^&*./]{1,20}$/.test(this.addInfo.cacert)==false){
                        this.$message({type: 'warning', message: '本地私钥不可包含空格和中文'});
                        return false;
                    }
                    if (this.addInfo.caSecret.indexOf(";")>-1||/^[a-zA-Z\d#@!~%^&*./]{1,20}$/.test(this.addInfo.caSecret)==false){
                        this.$message({type: 'warning', message: '私钥密码不可包含;、中文和空格,长度20以内'});
                        return false;
                    }
                    if (/^[a-zA-Z\d#@!~%^&*./]{1,20}$/.test(this.addInfo.rootCert)==false){
                        this.$message({type: 'warning', message: '根证书不可包含空格和中文'});
                        return false;
                    }
                    if (/^[a-zA-Z\d#@!~%^&*./]{1,20}$/.test(this.addInfo.localCert)==false){
                        this.$message({type: 'warning', message: '本地证书不可包含空格和中文'});
                        return false;
                    }
                    if (/^[a-zA-Z\d#@!~%^&*./]{1,20}$/.test(this.addInfo.remoteCert)==false){
                        this.$message({type: 'warning', message: '远程证书不可包含空格和中文'});
                        return false;
                    }
                }

                // if (this.addInfo.localIp !='' ||this.addInfo.localIp !=null) {
                //     let ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                //     let numReg = /^-?\d+$/;
                //     let list = this.addInfo.localIp.split(",");
                //     console.log(list,'list_split')
                //     for(let i=0;i<list.length;i++){
                //         if (list[i].indexOf("/")>0){
                //             let ip = list[i].split("/");
                //             if (ipReg.test(ip[0]) == false) {
                //
                //                 this.$message({type: 'warning', message: '本地网络请输入正确的ipv4地址'});
                //                 return false
                //             }
                //             if (numReg.test(ip[1])==false||ip[1]>32||ip[1]<0){
                //                 this.$message({type: 'warning', message: '本地网络掩码值不合法，请输入0-32数字'});
                //                 return false
                //             }
                //         }else {
                //             this.$message({type: 'warning', message: '本地网络掩码请用 ／ 分隔'});
                //             return false
                //         }
                //     }
                // }

                if (/^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])))$/.test(this.addInfo.localIp) == false ) {
                    this.$message({type: 'warning', message: '本地网络请输入正确的ipv4地址'});
                    return false
                }
                if (/^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])))$/.test(this.addInfo.remoteIp) == false ) {
                    this.$message({type: 'warning', message: '远程网络请输入正确的ipv4地址'});
                    return false
                }

                // if (/^(\w){1,20}$/.test(this.addInfo.remoteIp) == false) {
                //     let ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                //     let numReg = /^-?\d+$/;
                //     let list = this.addInfo.remoteIp.split(",");
                //
                //     for(let i=0;i<list.length;i++){
                //         if (list[i].indexOf("/")>0){
                //             let ip = list[i].split("/");
                //             if (ipReg.test(ip[0]) == false) {
                //                 this.$message({type: 'warning', message: '远程网络请输入正确的ipv4地址'});
                //                 return false
                //
                //             }
                //             if (numReg.test(ip[1])==false||ip[1]>32||ip[1]<0){
                //                 this.$message({type: 'warning', message: '远程网络掩码值不合法，请输入0-32数字'});
                //                 return false
                //             }
                //         }else {
                //             this.$message({type: 'warning', message: '远程网络掩码请用 ／ 分隔'});
                //             return false
                //         }
                //     }
                //
                // }

//                if (/^(\w){1,20}$/.test(this.addInfo.localId) == false) {
                    if (this.addInfo.localIdType=="name"){
                        let nameReg = /^[a-zA-Z\d#@!~%^&*./]{1,20}$/;
                        if (nameReg.test(this.addInfo.localId)==false){
                            this.$message({type: 'warning', message: '本地ID名称不可包含空格和中文'});
                            return false;
                        }
                    }else {
                        let ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                        if (ipReg.test(this.addInfo.localId)==false){
                            this.$message({type: 'warning', message: '本地ID请输入正确的ipv4地址'});
                            return false;
                        }
                    }
//                }


//                if (/^(\w){1,20}$/.test(this.addInfo.remoteId) == false) {
                    if (this.addInfo.remoteIdType=="name"){
                        let nameReg = /^[a-zA-Z\d#@!~%^&*./]{1,20}$/;
                        if (nameReg.test(this.addInfo.remoteId)==false){
                            this.$message({type: 'warning', message: '远程ID名称不可包含空格和中文'});
                            return false;
                        }
                    }else {
                        let ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                        if (ipReg.test(this.addInfo.remoteId)==false){
                            this.$message({type: 'warning', message: '远程ID请输入正确的ipv4地址'});
                            return false;
                        }
                    }
//                }

                
                if (this.addInfo.encryptionAlgIke.length<1){
                    this.$message({type: 'warning', message: '请至少选择一项ike加密算法'});
                    return false;
                }
                if (this.addInfo.authAlgIke.length<1){
                    this.$message({type: 'warning', message: '请至少选择一项ike认证算法'});
                    return false;
                }
                if (this.addInfo.dhGroup.length<1){
                    this.$message({type: 'warning', message: '请至少选择一项dh组'});
                    return false;
                }

                if (this.addInfo.ikeLifetime !="" && (this.addInfo.ikeLifetime<30||this.addInfo.ikeLifetime>28800)){
                    this.$message({type: 'warning', message: 'IKE超时时间请填写30-28800范围内数字'});
                    return false;
                }

                if (this.addInfo.encryptionAlgIpsec.length<1){
                    this.$message({type: 'warning', message: '请至少选择一项ipsec加密算法'});
                    return false;
                }
                if (this.addInfo.authAlgIpsec.length<1){
                    this.$message({type: 'warning', message: '请至少选择一项ipsec认证算法'});
                    return false;
                }
                if (this.addInfo.keyLife !="" && (this.addInfo.keyLife<30||this.addInfo.keyLife>604880)){
                    this.$message({type: 'warning', message: 'SA超时时间请填写30-604880范围内数字'});
                    return false;
                }
                if(this.addInfo.dpdState=='on'&&this.addInfo.dpdDelay<10||this.addInfo.dpdDelay>3600){
                    this.$message({type: 'warning', message: '检测时间间隔请填写10-3600范围内数字'});
                    return false;
                }
                if(this.addInfo.dpdState=='on'&&this.addInfo.dpdLifetime<2||this.addInfo.dpdLifetime>60){
                    this.$message({type: 'warning', message: '检测时间间隔请填写2-60范围内数字'});
                    return false;
                }
                for(let i=0;i<this.ethNames.length;i++){
                    console.log(this.ethNames[i].device,this.addInfo.localEth)
                    if(this.ethNames[i].device==this.addInfo.localEth){
                        if(this.ethNames[i].staticIpv4Addr==''){
                            this.$message({
                                type: 'warning',
                                message: '本地接口对应的ip不存在！'
                            });
                            return false
                        }
                    }
                }
                return true;
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.validate()) {
                            var newdto = {
                                name:this.addInfo.name,
                                localIdType:this.addInfo.localIdType,
                                localId:this.addInfo.localId,
                                remoteIdType:this.addInfo.remoteIdType,
                                remoteId:this.addInfo.remoteId,
                                authType:this.addInfo.authType,
                                authPsd:this.addInfo.authPsd,
                                cacert:this.addInfo.cacert,
                                caSecret:this.addInfo.caSecret,
                                rootCert:this.addInfo.rootCert,
                                localCert:this.addInfo.localCert,
                                remotecert:this.addInfo.remoteCert,
                                localInterface:this.addInfo.localEth,
                                remoteAddr:(this.remoteAddrType=='any')?'any':this.addInfo.remoteAddr,
                                localIp:this.addInfo.localIp,
                                localSubnet:this.addInfo.localMask,
                                remoteIp:this.addInfo.remoteIp,
                                remoteSubnet:this.addInfo.remoteMask,

                                ikeVersion:this.addInfo.ikeVersion,
                                negotiation:this.addInfo.negotiation,
                                encryptionAlgIke:this.addInfo.encryptionAlgIke.toString(),
                                authAlgIke:this.addInfo.authAlgIke.toString(),
                                dhGroup:this.addInfo.dhGroup.toString(),
                                ikeLifetime:(this.addInfo.ikeLifetime=='')?28800:this.addInfo.ikeLifetime,
                                packageType:this.addInfo.packageType,
                                encryptionAlgIpsec:this.addInfo.encryptionAlgIpsec.toString(),
                                authAlgIpsec:this.addInfo.authAlgIpsec.toString(),
                                auto:this.addInfo.auto,
                                keyLife:(this.addInfo.keyLife=='')?3600:this.addInfo.keyLife,

                                dpdState:this.addInfo.dpdState,
                                dpdAction:this.addInfo.dpdAction,
                                dpdDelay:this.addInfo.dpdDelay,
                                dpdLifetime:this.addInfo.dpdLifetime,
                            };

                            addIpsec(newdto).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '新建ipsec配置成功！'
                                    });
                                    this.addVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs['addInfo'].resetFields();
                                    this.$refs['addInfo2'].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.code.info
                                    });
                                }
                            }).catch(e => {
                                console.log("新建出错", e);
                            });

                        }

                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs['addInfo'].resetFields();
                this.$refs['addInfo2'].resetFields();
            },

            nextFormPart() {
                this.activeName = "second";
            },

            lastFormPart() {
                this.activeName = "first";
            }

        },
    }
</script>
<style>

    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .ipsec .dialog {
        min-width: 830px;
    }

    .ipsec .el-dialog__header {
        padding-left: 5px;
    }


    .ipsec .ip_put_1 {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 75%;
        margin-left: 20px;
    }
    .ipsec .ipsec_put_1 {
        position: relative;
        /*width: 65% !important;*/
        margin-left: 20px;
    }
    .ipsec .ipsec_put_2 {
        position: relative;
        width: 41% !important;
        margin-left: 20px;
    }
    .ipsec .ipsec_put_3 {
        position: relative;
        width: 73% !important;
        margin-left: 20px;
    }
    .ipsec .el_check {
        width: 80% !important;
        margin-left: 20px;
    }

    .ipsec .el_sel {
        width: 20% !important;
        margin-left: 20px;
    }

    .ipsec .el_text {
        margin-left: 158px;
    }

    .ipsec-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 0px;
    }

    .ipsec-form .el-form-item {
        margin-bottom: 17px;
    }

    .ipsec .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .ipsec-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 20px;
    }
</style>