<template>
    <div class="web public">
        <el-dialog
                :title="dialogVisible ? '使用图标库':'编辑web应用'"
                :visible.sync="editVisible"
                @close="handleClose(dialogVisible)"
                size="small"
                custom-class="dialog public"
                top="10%">
            <el-form :model="info" v-show="!dialogVisible" label-width="154px" class="web-form" ref="info" :rules="rules">
                <el-form-item label="应用名" prop="name">
                    <el-input v-model="info.name" class="el_put"></el-input>
                    <el-checkbox v-model="remChecked" style="margin-left: 15px" v-if="false">设为推荐应用</el-checkbox>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input v-model="info.describ" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="协议" prop="protocol">
                    <el-select v-model="info.protocol" class="el_put">
                        <el-option label="HTTP" value="HTTP" ></el-option>
                        <el-option label="HTTPS" value="HTTPS" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图标" class="cs_icon_name">
                    <div class="upload_icon_content" style="">
                            <span class="" v-if="info.iconPath != ''">
                                <img class="icon_choosed" :src="info.iconPath"/>
                            </span>
                        <el-button @click="chooseIcon" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                        </el-button>
                    </div>
                </el-form-item>

                <el-form-item label="哈希域名" prop="localUrl">
                    <el-input v-model="info.localUrl" class="el_put"></el-input>
                </el-form-item>
                <!--<el-form-item label="哈希域名" prop="hashDomain">-->
                    <!--<el-input v-model="info.hashDomain" class="el_put"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="域名" prop="localHost">
                    <el-input v-model="info.localHost" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="是否缓存" prop="is_need_speed">
                    <el-select v-model="info.is_need_speed" placeholder="请选择是否缓存" class="el_sel">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
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
                    <el-input v-model="info.nameControl" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="用户名控件ID" style="display: none">
                    <el-input v-model="info.nameId" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="密码控件名称" style="display: none">
                    <el-input v-model="info.passwordControl" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="密码控件ID" style="display: none">
                    <el-input v-model="info.passwordId" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="提交按钮控件名称" style="display: none">
                    <el-input v-model="info.loginControl" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="提交按钮控件ID" style="display: none">
                    <el-input v-model="info.loginId" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="默认用户名" style="display: none">
                    <el-input v-model="info.defaultName" class="el_put"></el-input>
                </el-form-item>
                <el-form-item label="默认密码" style="display: none">
                    <el-input v-model="info.defaultPassword" class="el_put"></el-input>
                </el-form-item>

            </el-form>
            <icon-libraty @reIconList="reIconList" v-show="dialogVisible"></icon-libraty>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('info',dialogVisible)">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitInfo('info', dialogVisible)">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {updateResource} from 'api/enWAS/resource';
    import {getSystemConfigList} from 'api/enWAS/systemConfig';
    import IconLibraty from "@/views/components/iconLibrary.vue"

    export default {
        components: {IconLibraty},
        data() {
            var name = (rule, value, callback) => {
                if(/^[\u4E00-\u9FA5A-Za-z0-9_]{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位字母、数字、中文、下划线"));
                }else {
                    callback();
                }
            };
            // let url = (rule, value , callback) => {
            //     let res = true;
            //     let arr = value.split('.');
            //     if(arr.length <= 1 || arr.length == null){
            //         res = true;
            //     } else {
            //         for (let i = 0; i < arr.length; i++){
            //             if(arr[i].length >1 ){
            //                 res = false;
            //             }
            //         }
            //     }
            //     if(res == false){
            //         callback(new Error("域名格式为x,x内不能有."));
            //     } else {
            //         callback();
            //     }
            // };
            let url = (rule, value , callback) => {
                if(value==''){
                    callback(new Error("哈希域名不能为空！"));
                }
            };
            return {
                rules: {
                    name: [
                        {required: true,validator: name, trigger: 'blur'}
                    ],
                    localUrl: [
                        // {required: true, validator: url, trigger: 'blur'}
                        {required: true, message:'哈希域名不能为空', trigger: 'blur'}
                    ],
                    protocol: [
                        {required: true, message:'请选择协议类型', trigger: 'blur'}
                    ],
                    localHost: [
                        {required: true, message:'请输入域名', trigger: 'blur'}
                    ],
                    // hashDomain: [
                    //     {required: true, message:'请输入哈希域名', trigger: 'blur'}
                    // ]
                },
                editVisible: true,
                wildcardDomain:'',/*配置项中的 泛域名(没有星号的部分) */
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
                    if_recommend: '',
                    is_need_speed:0,
                    is_anony:0,
                    is_cas_oauth:0
                },
                remChecked: false,
                dialogVisible: false,
                iconList: [],
                filepath: '',
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
//            this.editVisible = true;
            this.info.name = this.currentData.name;
            this.info.id = this.currentData.id;
            this.info.protocol = this.currentData.protocol;
            // this.info.url = this.currentData.url;
            this.info.hashDomain = this.currentData.hashDomain;
            // this.info.host = this.currentData.host;
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
            this.info.is_anony=this.currentData.is_anony;
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
                // this.info.localHost=  this.currentData.host
                this.info.localHost=this.currentData.host+this.currentData.url.substring(this.currentData.url.indexOf('/'))
            }else {
                this.info.localHost=  this.currentData.host
            }


            getSystemConfigList({page: 1, page_size: 100,},).then(response => {
                let str;
                if (response.data.items.page_count > 0) {
                    for(let item of response.data.items.res){
                        if(item.name=='hash_name'){
                            str = item.value;
                            this.wildcardDomain=str.substring(str.indexOf('*')+1);
                        }
                    }
                }
            })
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
                if (!files.length) return;
                if(files[0].size > 10000000){
                    this.$message({
                        type:'warning',
                        message:'请上传10M以内的图片!'
                    });
                } else {
                    this.createImageAdd(files)
                    this.info.iconFile = e.target.files[0]
                    //上传图片
                    var formData = new FormData();
                    for (let key in this.info) {
                        formData.append(key, this.info[key]);
                    }
                    // 监听进度回调
                    const uploadProgress = function (event) {

                    };
                    // 上传文件
                    let $this = this;
                    new Promise(function (resolve, reject) {
                        let client = new XMLHttpRequest();
                        console.log('============');
                        client.open('POST', '/api/admin/apps/icon', true);
                        client.onreadystatechange = function () {
                            if (this.readyState !== 4) {
                                return;
                            }
                            if (this.status === 200) {
                                console.log(this.responseText, 'ajax add')
                                resolve(JSON.parse(this.responseText));

                            } else {
                                reject(this.status);
                            }
                        };
                        client.upload.addEventListener("progress", uploadProgress, false); //监听进度
                        client.send(formData);
                    }).then(
                        // 上传成功
                        function (resData) {
                            if (resData.status == 'SUCCESS') {
                                $this.$message({
                                    type: 'success',
                                    message: '上传图片成功！'
                                });
                                $this.info.iconPath = resData.data
                            } else {
                                $this.$message({
                                    type: 'warning',
                                    message: resData.code.info
                                });
                            }
                        },
                    );
                }
            },
            removeImageAdd(e) {
                this.info.iconPath=''
            },
            createImageAdd(file) {
                var vm = this;
                var reader = null;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    reader = new window.FileReader()
                    reader.readAsDataURL(file[i])
                }
            },
            submitInfo(formName, blen){
                this.filepath = "";
                if (blen) {
                    const len = this.iconList.length
                    var flag = false;
                    for (var i = 0; i < len; i++) {
                        if (this.iconList[i].choose) {
                            this.filepath = this.iconList[i].icon
                            this.info.iconPath = this.iconList[i].icon
                            flag = true;
                        }
                    }
                    ;
                    if (!flag) {
                        this.$message({
                            type: 'error',
                            message: '请选择图标后再确认！'
                        });
                        return;
                    }
                    this.dialogVisible = false;
                    this.editVisible = true;
                    return;
                };
                this.info.id = this.currentData.id;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.remChecked == false) {
                            this.info.if_recommend = 0;
                        } else {
                            this.info.if_recommend = 1;
                        }
                        if(this.info.localHost.indexOf('/')>-1){
                            this.info.host =this.info.localHost.substring(0,this.info.localHost.indexOf('/'));
                        }else {
                            this.info.host=this.info.localHost;
                        }
                        if(this.info.localHost.indexOf('/')>-1){
                            this.info.url=this.info.localUrl  +this.wildcardDomain+this.info.localHost.substring(this.info.localHost.indexOf('/'))
                        }else {
                            this.info.url=this.info.localUrl  +this.wildcardDomain
                        }
                        console.log('info:', this.info);
                        updateResource(this.info).then(resp => {
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功！'
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
                });
            },

            resetForm(formName, blen) {
                if(blen){
                    this.dialogVisible = false;
                    this.editVisible = true;
                    return;
                }else{
                    this.editVisible = false;
                    this.$refs[formName].resetFields();
                }
            },
            chooseIcon () {
                this.dialogVisible = true
            },
            reIconList (iconList) {
                this.iconList = iconList;
            }
        }
    }
</script>

<style>
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
    .el-dialog--tiny {
        width: 25%;
    }
    .web-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        /* left: 131px; */
        left: 100px;
    }
</style>
