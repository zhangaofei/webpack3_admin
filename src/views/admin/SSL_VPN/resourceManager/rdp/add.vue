<template>
    <div class="rdp public">
        <el-dialog
                :title="dialogVisible ? '使用图标库':'新建RDP'"
                :visible.sync="addVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose(dialogVisible)">
            <div class="rdp_form" v-show="!dialogVisible">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="148px" class="rdp_form">
                    <el-form-item label="名称" prop="appName" class="el_lab">
                        <el-input v-model="addInfo.appName" class="el_put" placeholder="请输入应用名称"></el-input>
                        <el-checkbox v-model="remChecked" style="margin-left: 15px">设为推荐应用</el-checkbox>
                    </el-form-item>
                    <el-form-item label="说明" prop="remark">
                        <el-input v-model="addInfo.remark" placeholder="请输入说明" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" class="cs_icon_name">
                        <div class="upload_icon_content" style="margin-left: 86px;">
                            <span class="view_icon_content" v-if="addInfo.iconPath != ''">
                                <img class="icon_choosed" :src="addInfo.iconPath" />
                            </span>
                            <el-button @click="chooseIcon" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="地址" prop="hostOrIp" class="el_lab">
                        <el-input v-model="addInfo.hostOrIp" class="el_put" placeholder="请输入应用服务器地址"></el-input>
                    </el-form-item>
                    <el-form-item label="端口 " prop="port">
                        <el-input v-model="addInfo.port" class="el_put" placeholder="请输入应用服务器端口"></el-input>
                    </el-form-item>

                    <el-form-item label="用户名">
                        <el-input v-model="addInfo.userName" placeholder="请输入应用服务器用户名" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器密码" prop="password">
                        <el-input type="password" v-model="addInfo.password" placeholder="请输入应用服务器密码"
                                  class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="项目路径" prop="programPath">
                        <el-input v-model="addInfo.programPath" placeholder="请输入应用服务器项目路径" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input v-model="addInfo.programName" placeholder="请输入应用服务器项目名称" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器域" prop="domain">
                        <el-input v-model="addInfo.domain" placeholder="请输入应用服务器域" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="宽度" prop="width">
                        <el-input min="1" type="number" @change="getAddInfoWidth" v-model="addInfo.width" placeholder="请输入应用服务器宽度"
                                  class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="高度" prop="height">
                        <el-input min="1" type="number" @change="getAddInfoHeight" v-model="addInfo.height" placeholder="请输入应用服务器高度"
                                  class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <icon-libraty @reIconList="reIconList" v-show="dialogVisible"></icon-libraty>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo',dialogVisible)">取消</span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitForm('addInfo',dialogVisible)">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
    import {mapGetters} from 'vuex'
    import {getRdpList, deleteRdp, multiDeleteRdp} from "api/SSL_VPN/resourceManager/rdp";
    import {createRdp} from "../../../../../api/SSL_VPN/new_resourceManager/new_rdp";
    import IconLibraty from "@/views/components/iconLibrary.vue"

    export default {
        components: {IconLibraty},
        data() {
            let name = (rule, value, callback) => {
                if (/^[A-Za-z0-9!#$^&_]{1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、特殊字符(除@和%、*)、下划线"));
                } else {
                    callback();
                }
            };
            let domain = (rule, value, callback) => {
                if (/^[\u4E00-\u9FA5A-Za-z0-9@_-]{1,67}$/.test(value) == false) {
                    callback(new Error("请输入1-67位字母、数字、中文及_-@"));
                } else {
                    callback();
                }
            };
            let ip = (rule, value, callback) => {
                if (/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/
                        .test(value) == false) {
                    callback(new Error("请输入合法IP"));
                } else {
                    callback();
                }
            };
            let port = (rule, value, callback) => {
                if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value) == false) {
                    callback(new Error('请输入1-65535之间的数字'));
                } else {
                    callback();
                }
            };
            let programPath = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else if (/^[\u4E00-\u9FA5A-Za-z0-9~!@#$%^&()_-]{1,199}$/.test(value) == false) {
                    callback(new Error("请输入字母、数字、中文及~!@#$%^&()_-"));
                } else {
                    callback();
                }
            };
            let remark = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else if (/^[\u4E00-\u9FA5A-Za-z0-9!#$^&@%*_]{1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、中文和部分英文字符"));
                } else {
                    callback();
                }
            };

            let width = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else if (value <= 0) {
                    callback(new Error("请输入大于0的数字"));
                } else {
                    callback();
                }
            };
            return {
                rules: {
                    appIcon: [
                        {required: true, validator: '', trigger: 'blur'}
                    ],
                    appName: [
                        {required: true, validator: name, trigger: 'blur'}
                    ],
                    hostOrIp: [
                        {required: true, validator: ip, trigger: 'blur'}
                    ],
                    port: [
                        {required: true, validator: port, trigger: 'blur'}
                    ],
                    domain: [
                        {trigger: 'blur'}
                    ],
                    programPath: [
                        {trigger: 'blur'}
                    ],
                    remark: [
                        {validator: remark, trigger: 'blur'}
                    ],
                    width: [
                        {validator: width, trigger: 'blur'}
                    ],
                    height: [
                        {validator: width, trigger: 'blur'}
                    ],
                },
                addInfo: {
                    ifRecommend: '',
                    type: 'RDP',
                    appName: '',
                    appIcon: '',
                    hostOrIp: '',
                    port: '',
                    userName: '',
                    password: '',
                    programPath: '',
                    programName: '',
                    domain: '',
                    width: '',
                    height: '',
                    remark: '',
                    iconFile: '',
                    iconPath: '/resource/image/default_RDP_application_icon.png'

                },
                remChecked: false,
                selectArr: [],
                addVisible: true,
                dialogVisible: false,
                iconList: [],
                filepath: ''
            }
        },
        props: {
            addFlag: Boolean,
        },
        computed: {
        },
        methods: {
            getAddInfoWidth () {
                if(this.addInfo.width != '' && this.addInfo.width.toString().indexOf('.') != -1) {
                    this.$nextTick( () => {
                        this.addInfo.width = parseInt(this.addInfo.width);
                    });
                }
                return;
            },
            getAddInfoHeight () {
                if(this.addInfo.height != '' && this.addInfo.height.toString().indexOf('.') != -1) {
                    this.$nextTick( () => {
                        this.addInfo.height = parseInt(this.addInfo.height);
                    });
                }
                return;
            },
            chooseIcon () {
                this.dialogVisible = true
            },
            handleClose (blen) {
                if (blen) {
                    this.dialogVisible = false
                    this.addVisible = true;
                    return;
                }else{
                    this.addVisible = false;
                    this.$emit("onChangeStatus")
                }
            },
            onFileChangeAdd(e) {
                var files = e.target.files || e.dataTransfer.files
                if (!files.length) return
                this.createImageAdd(files)
                this.addInfo.iconFile = e.target.files[0]
                //上传图片
                var formData = new FormData();
                for (let key in this.addInfo) {
                    formData.append(key, this.addInfo[key]);
                }
                // 监听进度回调
                const uploadProgress = function (event) {

                };
                // 上传文件
                let $this = this;
            },
            iconFileChange(e) {
                this.addInfo.iconFile = e.target.files[0]
            },
            removeImageAdd(e) {
                this.addInfo.iconPath = ''
            },
            createImageAdd(file) {
                var vm = this
                var reader = null
                var leng = file.length
                for (var i = 0; i < leng; i++) {
                    reader = new window.FileReader()
                    reader.readAsDataURL(file[i])
                }
            },
            reIconList (iconList) {
                this.iconList = iconList;
                console.log(this.iconList);
            },
            submitForm(formName,blen) {
                //新建
                this.filepath = "";
                if(blen){
                    const len = this.iconList.length
                    var flag = false;
                    for (var i = 0; i < len; i++) {
                        if(this.iconList[i].choose){
                            this.filepath = this.iconList[i].icon
                            this.addInfo.iconPath = this.iconList[i].icon
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
                console.log("新建RDP：", this.addInfo)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.remChecked == false) {
                            this.addInfo.ifRecommend = 0;
                        } else {
                            this.addInfo.ifRecommend = 1;
                        }
                        createRdp(this.addInfo).then((resp) => {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '新建RDP成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                type:'warning',
                                message:resp.code.info
                      });
                            }
                        }).catch(e => {
                            console.log("新建auth出错", e);
                        });
                    }
                    else {
                        return false;
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
            }
        }
    }
</script>

<style scoped>
    .cs_icon_name label:before{
        content: '*';
        color: #ff4949;
        margin-right: 5px;
    }
    .upload_icon_content .choose_icon {
        margin-left: 20px;
    }
    .view_icon_content{
        margin-left: 20px;
    }
    .icon_choosed{
        width: 72px;
        height: 72px;
    }

    .rdp_form .el-form-item__label{
        margin-left: 5%;
    }
</style>
