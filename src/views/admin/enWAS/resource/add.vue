<template>
    <div class="web public">
        <el-dialog
                :title="dialogVisible ? '使用图标库':'新建web应用'"
                :visible.sync="addVisible"
                @close="handleClose(dialogVisible)"
                size="small"
                custom-class="dialog public"
                top="10%">
            <el-form v-show="!dialogVisible" :model="info" label-width="154px" :rules="rules" class="web-form"
                     ref="info">
                <el-form-item label="应用名" prop="name">
                    <el-input v-model="info.name" class="el_put" ploaceholder="请输入应用名"></el-input>
                    <el-checkbox v-model="remChecked" style="margin-left: 15px" v-if="false">设为推荐应用</el-checkbox>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input v-model="info.describ" class="el_put" ploaceholder="请输入说明"></el-input>
                </el-form-item>
                <el-form-item label="协议" prop="protocol">
                    <el-select v-model="info.protocol" class="el_put" ploaceholder="请选择协议">
                        <el-option label="HTTP" value="HTTP" ></el-option>
                        <el-option label="HTTPS" value="HTTPS"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图标" class="cs_icon_name">
                    <div class="upload_icon_content" style="margin-left: 0;">
                            <span class="" v-if="info.iconPath != ''">
                                <img class="icon_choosed" :src="info.iconPath" />
                            </span>
                        <el-button @click="chooseIcon" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                        </el-button>
                    </div>
                </el-form-item>

                <el-form-item label="哈希域名" prop="url">
                    <el-input v-model="info.url" class="el_put" ploaceholder="请输入哈希域名"></el-input>
                </el-form-item>
                <!--去掉 哈希域名-->
                <!--<el-form-item label="哈希域名" prop="hashDomain" >-->
                    <!--<el-input v-model="info.hashDomain" class="el_put"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="域名" prop="host">
                    <el-input v-model="info.host" class="el_put" ploaceholder="请输入域名"></el-input>
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
                    <el-input v-model="info.nameControl" class="el_put" ploaceholder="请输入用户名控件名称"></el-input>
                </el-form-item>
                <el-form-item label="用户名控件ID" style="display: none">
                    <el-input v-model="info.nameId" class="el_put" ploaceholder="请输入用户名控件ID"></el-input>
                </el-form-item>
                <el-form-item label="密码控件名称" style="display: none">
                    <el-input v-model="info.passwordControl" class="el_put" ploaceholder="请输入密码控件名称"></el-input>
                </el-form-item>
                <el-form-item label="密码控件ID" style="display: none">
                    <el-input v-model="info.passwordId" class="el_put" ploaceholder="请输入密码控件ID"></el-input>
                </el-form-item>
                <el-form-item label="提交按钮控件名称" style="display: none">
                    <el-input v-model="info.loginControl" class="el_put" ploaceholder="请输入提交按钮控件名称"></el-input>
                </el-form-item>
                <el-form-item label="提交按钮控件ID" style="display: none">
                    <el-input v-model="info.loginId" class="el_put" ploaceholder="请输入提交按钮控件ID"></el-input>
                </el-form-item>
                <el-form-item label="默认用户名" style="display: none">
                    <el-input v-model="info.defaultName" class="el_put" ploaceholder="请输入默认用户名"></el-input>
                </el-form-item>
                <el-form-item label="默认密码" style="display: none">
                    <el-input v-model="info.defaultPassword" class="el_put" ploaceholder="请输入默认密码"></el-input>
                </el-form-item>

            </el-form>
            <icon-libraty @reIconList="reIconList" v-show="dialogVisible"></icon-libraty>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('info',dialogVisible)">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitInfo('info',dialogVisible)">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {addResource, getTypeList} from  'api/enWAS/resource';
    import {getSystemConfigList} from 'api/enWAS/systemConfig';
    import IconLibraty from "@/views/components/iconLibrary.vue"

    export default {
        name: 'admin_resource_add',
        components: {
            IconLibraty
        },
        data() {
            var name = (rule, value, callback) => {
                if(/^[\u4E00-\u9FA5A-Za-z0-9_]{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位字母、数字、中文、下划线"));
                }else {
                    callback();
                }
            };
            let url = (rule, value , callback) => {
                if(value==''){
                    callback(new Error("哈希域名不能为空！"));
                }else {
                    callback()
                }
            };
            return {
                rules: {
                    // appIcon: [
                    //     {required: true, validator: '', trigger: 'blur'}
                    // ],
                    name: [
                        {required: true,validator: name, trigger: 'blur'}
                    ],
                    // url: [
                    //     {required: true, validator: url, trigger: 'blur'}
                    // ],
                    url: [
                        {required: true, message:'哈希域名不能为空', trigger: 'blur'}
                    ],
                    protocol: [
                        {required: true, message:'请选择协议类型', trigger: 'blur'}
                    ],
                    host: [
                        {required: true, message:'请输入域名', trigger: 'blur'}
                    ],
                    // hashDomain: [
                    //     {required: true, message:'请输入哈希域名', trigger: 'blur'}
                    // ]
                },
                addVisible: true,
                wildcardDomain:'',/*配置项中的 泛域名(没有星号的部分) */
                info: {
                    if_recommend: '',
                    name: '',
                    url: '',
                    host:'',
                    hashDomain:'',
                    protocol: 'HTTP',
                    iconFile: '',
                    iconPath: '/resource/image/default_Web_application_icon.png',
                    nameControl:'',
                    nameId:'',
                    passwordControl:'',
                    passwordId:'',
                    loginControl:'',
                    loginId:'',
                    defaultName:'',
                    defaultPassword:'',
                    describ:'',
                    is_need_speed:0,
                    is_anony:0,
                    is_cas_oauth:0,
                },
                remChecked: false,
                types: [],
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
        created() {
            // getTypeList({parentId: ''}).then(response => {
            //     const data = response.data;
            //     if (data.count > 0) {
            //         this.types = data.items.filter(function (item) {
            //             if (item.hasOwnProperty('isParent') && item.isParent == '1') {
            //                 //渲染单选按钮时用于子属性的选择
            //                 item['selectId'] = ''
            //             }
            //             return true
            //         });
            //     }
            // });

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
            chooseIcon () {
                this.dialogVisible = true
            },
            handleClose(blen) {
                if (blen) {
                    this.dialogVisible = false
                    this.addVisible = true;
                    return;
                }else{
                    this.$emit("onChangeStatus");
                }
            },

            onSelect(item, citem){
                item.selectId = citem.id
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
                console.log(blen,'blen')
                if(blen){
                    const len = this.iconList.length
                    var flag = false;
                    for (var i = 0; i < len; i++) {
                        if(this.iconList[i].choose){
                            this.filepath = this.iconList[i].icon
                            this.info.iconPath = this.iconList[i].icon
                            flag = true;
                        }
                    };
                    if (!flag) {
                        this.$message({
                            type: 'error',
                            message: '请选择图标后再确认！'
                        });
                        return;
                    }
                    this.dialogVisible = false;
                    this.addVisible = true;
                    return;
                };
                this.$refs.info.validate((valid) => {
                    console.log('valid',valid);
                    if (valid) {
//                        this.info['types'] = encodeURI(JSON.stringify(this.types))
                        let oldHost=this.info.host;
                        if(this.info.host.indexOf('/')>-1){
                            this.info.url=this.info.url+this.wildcardDomain+this.info.host.substring(this.info.host.indexOf('/'));
                            this.info.host=this.info.host.substring(0,this.info.host.indexOf('/'));
                        }else {
                            this.info.url=this.info.url+this.wildcardDomain;
                        }
                        // console.log('')
                        if (this.remChecked == false) {
                            this.info.if_recommend = 0;
                        } else {
                            this.info.if_recommend = 1;
                        }
                        addResource(this.info).then(resp => {
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '新建成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: resp.msg
                                });
                                this.info.url='';
                                this.info.host=oldHost;
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    }
                });
            },
            resetForm(formName, blen) {
                if(blen){
                    this.dialogVisible = false;
                    this.addVisible = true;
                    return;
                }else{
                    this.addVisible = false;
                    this.$refs[formName].resetFields();
                }
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
