<template>
    <div class="rdp public">
        <el-dialog
                :title="dialogVisible ? '使用图标库':'编辑RDP'"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose(dialogVisible)" @open="doInit(currentData)">
            <div class="rdp-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="148px" class="rdp-form">
                    <el-form-item label="名称" prop="appName" class="el_lab">
                        <el-input v-model="editInfo.appName" class="el_put" placeholder="请输入应用名称"></el-input>
                        <el-checkbox v-model="remChecked" style="margin-left: 15px">设为推荐应用</el-checkbox>
                    </el-form-item>
                    <el-form-item label="说明 " prop="remark">
                        <el-input v-model="editInfo.remark" placeholder="请输入说明" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" class="cs_icon_name">
                        <div class="upload_icon_content" style="margin-left: 86px;">
                            <span class="view_icon_content" v-if="editInfo.iconPath != ''">
                                <img class="icon_choosed" :src="editInfo.iconPath"/>
                            </span>
                            <el-button @click="chooseIcon" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="地址" prop="hostOrIp" class="el_lab">
                        <el-input v-model="editInfo.hostOrIp" class="el_put" placeholder="请输入应用服务器地址"></el-input>
                    </el-form-item>
                    <el-form-item label="端口 " prop="port">
                        <el-input v-model="editInfo.port" class="el_put" placeholder="请输入应用服务器端口"></el-input>
                    </el-form-item>

                    <el-form-item label="用户名">
                        <el-input v-model="editInfo.userName" placeholder="请输入应用服务器用户名" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="editInfo.password" placeholder="请输入应用服务器密码"
                                  class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="项目路径" prop="programPath">
                        <el-input v-model="editInfo.programPath" placeholder="请输入应用服务器项目路径" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input v-model="editInfo.programName" placeholder="请输入应用服务器项目名称" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器域" prop="domain">
                        <el-input v-model="editInfo.domain" placeholder="请输入应用服务器域" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="宽度" prop="width">
                        <el-input min="1" type="number" v-model="editInfo.width" placeholder="请输入应用服务器宽度"
                                  class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="高度" prop="height">
                        <el-input min="1" type="number" v-model="editInfo.height" placeholder="请输入应用服务器高度"
                                  class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <icon-libraty @reIconList="reIconList" v-show="dialogVisible"></icon-libraty>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo',dialogVisible)">取消</span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitEditForm('editInfo', dialogVisible)">
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
    import {editRdp} from "../../../../../api/SSL_VPN/new_resourceManager/new_rdp";
    import IconLibraty from "@/views/components/iconLibrary.vue"

    export default {
        components: {IconLibraty},
        computed: {},
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
                editInfo: {
                    id: '',
                    type: '',
                    appName: '',
                    hostOrIp: '',
                    port: '',
                    userName: '',
                    password: '',
                    programPath: '',
                    programName: '',
                    domain: '',
                    width: '',
                    height: '',
                    iconFile: '',
                    iconPath: '',
                    ifRecommend: ''
                },
                remChecked: false,
                selectArr: [],
                editVisible: true,
                dialogVisible: false,
                iconList: [],
                filepath: ''
            }
        },
        props: {
            currentData: Object,
            editFlag: Boolean
        },
        created() {
            this.doInit(this.currentData)
        },
        methods: {
            chooseIcon () {
                this.dialogVisible = true
            },
            changeStatus() {
                console.log('changeStatus')
                this.$emit("onChangeStatus")
            },
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            doInit(currentData) {
                this.editInfo.id = currentData.id;
                this.editInfo.type = currentData.type;
                this.editInfo.appName = currentData.appName;
                this.editInfo.hostOrIp = currentData.hostOrIp;
                this.editInfo.port = currentData.port;
                this.editInfo.userName = currentData.userName;
                this.editInfo.password = currentData.password;
                this.editInfo.programPath = currentData.programPath;
                this.editInfo.programName = currentData.programName;
                this.editInfo.domain = currentData.domain;
                this.editInfo.width = currentData.width;
                this.editInfo.height = currentData.height;
                this.editInfo.iconFile = currentData.iconFile;
                this.editInfo.iconPath = currentData.iconPath;
                this.editInfo.width = currentData.width;
                this.editInfo.remark = currentData.remark;
                this.editInfo.ifRecommend = currentData.ifRecommend;
                if (currentData.ifRecommend == 1) {
                    this.remChecked = true;
                } else {
                    this.remChecked = false;
                }
                console.log("rdpEditInfo:", currentData)
            },
            iconFileChange(e) {
                this.editInfo.iconFile = e.target.files[0]
            },
            onFileChangeEdit(e) {
                var files = e.target.files || e.dataTransfer.files
                if (!files.length) return;
                this.createImageEdit(files);
                this.editInfo.iconFile = e.target.files[0]
                //上传图片
                var formData = new FormData();
                for (let key in this.editInfo) {
                    formData.append(key, this.editInfo[key]);
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
                            this.editVisible = false

                        } else {
                            reject(this.status);
                        }
                    };
                    client.upload.addEventListener("progress", uploadProgress, false); //监听进度
                    client.send(formData);
                }).then(
                    function (resData) {

                        if (resData.status == 'SUCCESS') {

                            console.log("editInfo:", $this.editInfo);

                            $this.editInfo.iconPath = resData.data;
                            console.log("图片路径：", $this.editInfo);

                            $this.$message({
                                type: 'success',
                                message: '上传图片成功！'
                            });


                        } else {
                            $this.$message({
                                type: 'warning',
                                message: '上传图片失败！'
                            });
                        }
                    },
                );


            },
            removeImageEdit(e) {
                this.editInfo.iconPath = ''
            },
            createImageEdit(file) {
                var vm = this
                var reader = null
                var leng = file.length
                for (var i = 0; i < leng; i++) {
                    reader = new window.FileReader()
                    reader.readAsDataURL(file[i])

                }
            },
            submitEditForm(formName, blen) {
                this.filepath = "";
                if (blen) {
                    const len = this.iconList.length
                    var flag = false;
                    for (var i = 0; i < len; i++) {
                        if (this.iconList[i].choose) {
                            this.filepath = this.iconList[i].icon
                            this.editInfo.iconPath = this.iconList[i].icon
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
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("提交rdpEditInfo:", this.editInfo)
                        if (this.remChecked == false) {
                            this.editInfo.ifRecommend = 0;
                        } else {
                            this.editInfo.ifRecommend = 1;
                        }
                        editRdp(this.editInfo.id, this.editInfo).then((resp) => {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '编辑RDP成功！'
                                });
                                this.editVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                //
                            }
                        }).catch(e => {
                            console.log("新建auth出错", e);
                        });

                    } else {
                        return false;
                    }
                })

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
            reIconList (iconList) {
                this.iconList = iconList;
            }
        },
    }
</script>

<style>
    .upload_icon_content .choose_icon {
        margin-left: 20px;
        padding: 8px 20px;
    }
    .view_icon_content{
        margin-left: 20px;
    }
    .icon_choosed{
        width: 72px;
        height: 72px;
    }
    .rdp-form .el-form-item__label{
        margin-left: 5%;
    }
</style>