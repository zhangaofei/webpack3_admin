<template>
    <div class="public">
        <el-dialog title="查看web应用" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <el-form :model="info" label-width="154px" ref="info" :rules="rules">
                <el-form-item label="应用名" prop="name">
                    <el-input v-model="info.name" class="el_put" :disabled="true"></el-input>
                    <el-checkbox v-model="remChecked" style="margin-left: 15px" v-if="false" :disabled="true">设为推荐应用</el-checkbox>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input v-model="info.describ" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="协议" prop="protocol">
                    <el-select v-model="info.protocol" class="el_put" :disabled="true">
                        <el-option label="HTTP" value="HTTP" ></el-option>
                        <el-option label="HTTPS" value="HTTPS" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图标" class="cs_icon_name" prop="">
                    <div class="upload_icon_content" style="">
                            <span class="view_icon_content" v-if="info.iconPath != ''">
                                <img class="icon_choosed" :src="info.iconPath"/>
                            </span>
                        <el-button :disabled="true" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                        </el-button>
                    </div>
                </el-form-item>

                <el-form-item label="哈希域名" prop="localUrl">
                    <el-input v-model="info.localUrl" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <!--<el-form-item label="哈希域名" prop="hashDomain" v-if="false">-->
                    <!--<el-input v-model="info.hashDomain" class="el_put" :disabled="true"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="域名" prop="localHost">
                    <el-input v-model="info.localHost" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="是否缓存" prop="is_need_speed" >
                    <el-select v-model="info.is_need_speed" :disabled="true" placeholder="请选择" class="el_sel">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--庞 11.29   is_anony-->
                <el-form-item label="是否匿名访问" prop="">
                    <el-select v-model="info.is_anony" placeholder="是否匿名访问" class="el_sel">
                        <el-option
                                v-for="item in anonyOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否cas或oauth认证" prop="">
                    <el-select v-model="info.is_cas_oauth" placeholder="是否cas或oauth认证" class="el_sel">
                        <el-option
                                v-for="item in casOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="用户名控件名称" style="display: none">
                    <el-input v-model="info.nameControl" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名控件ID" style="display: none">
                    <el-input v-model="info.nameId" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="密码控件名称" style="display: none">
                    <el-input v-model="info.passwordControl" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="密码控件ID" style="display: none">
                    <el-input v-model="info.passwordId" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="提交按钮控件名称" style="display: none">
                    <el-input v-model="info.loginControl" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="提交按钮控件ID" style="display: none">
                    <el-input v-model="info.loginId" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="默认用户名" style="display: none">
                    <el-input v-model="info.defaultName" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="默认密码" style="display: none">
                    <el-input v-model="info.defaultPassword" class="el_put" :disabled="true"></el-input>
                </el-form-item>

            </el-form>
            <div class='form-footer ' slot="footer"></div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {updateResource} from 'api/enWAS/resource';

    export default {
        components: {},
        data() {
            return {
                rules: {
                    appIcon: [
                        {required: true, trigger: 'blur'}
                    ],
                    name: [
                        {required: true,trigger: 'blur'}
                    ],
                    localUrl: [
                        {required: true,  trigger: 'blur'}
                    ],
                    protocol: [
                        {required: true,  trigger: 'blur'}
                    ],
                    localHost: [
                        {required: true, trigger: 'blur'}
                    ],
                    hashDomain: [
                        {required: true,  trigger: 'blur'}
                    ]
                },
                remChecked: false,
                addVisible: true,
                info:{
                    localUrl: '',
                    localHost:'',
                    name: '',
                    url: '',
                    host:'',
                    hashDomain:'',
                    protocol: '',
                    iconFile: '',
                    iconPath:'',
                    nameControl:'',
                    nameId:'',
                    passwordControl:'',
                    passwordId:'',
                    loginControl:'',
                    loginId:'',
                    defaultName:'',
                    defaultPassword:'',
                    describ:'',
                    ifRecommend: '',
                    is_need_speed:0,
                    is_anony:0,
                    is_cas_oauth:0
                },
                options: [{
                    value: 0,
                    label: '否'
                }, {
                    value: 1,
                    label: '是'
                }],
                anonyOptions: [{
                    value: 0,
                    label: '否'
                }, {
                    value: 1,
                    label: '是'
                }],
                casOptions: [{
                    value: 0,
                    label: '非cas应用非oauth应用'
                }, {
                    value: 1,
                    label: 'cas应用'
                },{
                    value: 2,
                    label: 'oauth'
                }],
            }
        },
        props: {
            currentData: Object,
        },
        created() {
            this.editVisible = true;
            this.info.name = this.currentData.name;
            this.info.id = this.currentData.id;
            this.info.protocol = this.currentData.protocol;
            this.info.url = this.currentData.url;
            this.info.hashDomain = this.currentData.hashDomain;
            this.info.host = this.currentData.host;
            this.info.iconFile = this.currentData.iconFile;
            this.info.iconPath = this.currentData.iconPath;
            this.info.nameControl = this.currentData.nameControl;
            this.info.nameId = this.currentData.nameId;
            this.info.passwordControl = this.currentData.passwordControl;
            this.info.passwordId = this.currentData.passwordId;
            this.info.loginControl = this.currentData.loginControl;
            this.info.loginId = this.currentData.loginId;
            this.info.defaultName = this.currentData.defaultName;
            this.info.defaultPassword = this.currentData.defaultPassword;
            this.info.describ = this.currentData.describ;
            this.info.if_recommend = this.currentData.if_recommend;
            this.info.is_need_speed = this.currentData.is_need_speed;
            this.info.is_anony = this.currentData.is_anony;
            this.info.is_cas_oauth=this.currentData.is_cas_oauth;
            if (this.currentData.if_recommend == 1) {
                this.remChecked = true;
            } else {
                this.remChecked = false;
            }
            if(this.currentData.protocol=='HTTPS'){
                this.info.localUrl =this.currentData.url.substring(6,this.currentData.url.indexOf('.'));
            }else{
                this.info.localUrl =this.currentData.url.substring(0,this.currentData.url.indexOf('.'));
            }
            this.info.localHost =this.currentData.host;
            if(this.currentData.url.indexOf('/')>-1){
                this.info.localHost=this.currentData.host+this.currentData.url.substring(this.currentData.url.indexOf('/'))
            }else {
                this.info.localHost=  this.currentData.host
            }
        },
        methods: {
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            handleClose() {
                this.changeStatus();
            },
            doInit(currentData){
                this.editVisible = true;
            },
            onFileChangeAdd (e) {
                var files = e.target.files || e.dataTransfer.files
                console.log(files,'files')//FileList {0: File, length: 1}
                if (!files.length) return;
                this.createImageAdd(files)
                this.info.iconFile = e.target.files[0]
                //上传图片
                var formData = new FormData();
                for (let key in this.info) {
                    formData.append(key, this.info[key]);
                }
                // 监听进度回调
                const uploadProgress = function(event) {

                };
                // 上传文件
                let $this = this;
                new Promise(function(resolve, reject) {
                    let client = new XMLHttpRequest();
                    console.log('============');
                    client.open('POST', '/api/admin/apps/icon', true);
                    client.onreadystatechange = function() {
                        if (this.readyState !== 4) {
                            return;
                        }
                        if (this.status === 200) {
                            console.log(this.responseText,'ajax add')
                            resolve(JSON.parse(this.responseText));

                        } else {
                            reject(this.status);
                        }
                    };
                    client.upload.addEventListener("progress",uploadProgress, false); //监听进度
                    client.send(formData);
                }).then(
                    // 上传成功
                    function(resData) {
                        if(resData.status=='SUCCESS'){
                            $this.$message({
                                type:'success',
                                message:'上传图片成功！'
                            });
                            $this.info.iconPath = resData.data
                        }else{
                            $this.$message({
                                type:'warning',
                                message:'上传图片失败！'
                            });
                        }
                    },
                );
            },
//            removeImageAdd(e) {
//                this.info.iconPath=''
//            },
            createImageAdd(file) {
                var vm = this;
                var reader = null;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    reader = new window.FileReader()
                    reader.readAsDataURL(file[i])
                }
            },
            submitInfo(formName){
               this.addVisible = false;
            }
        }
    }
</script>

<style>
    .cs_icon_name label:before{
        content: '*';
        color: #ff4949;
        margin-right: 5px;
    }
    .upload_icon_content .choose_icon {
        margin-left: 20px;
        padding: 8px 20px;
    }
    .view_icon_content{
        /*margin-left: 20px;*/
    }
    .icon_choosed{
        width: 72px;
        height: 72px;
    }
</style>
