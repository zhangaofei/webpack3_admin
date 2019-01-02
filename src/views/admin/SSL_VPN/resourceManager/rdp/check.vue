<template>
    <div class="rdp public">
        <el-dialog
                title="查看RDP"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose()" @open="doInit(currentData)">
            <div class="rdp-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="148px" class="rdp-form">
                    <el-form-item label="名称" prop="appName" class="el_lab">
                        <el-input v-model="editInfo.appName" class="el_put"  :disabled="true"></el-input>
                        <el-checkbox v-model="remChecked" :disabled="true" style="margin-left: 15px">设为推荐应用</el-checkbox>
                    </el-form-item>
                    <el-form-item label="说明 " prop="remark">
                        <el-input v-model="editInfo.remark"  class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" class="cs_icon_name">
                        <div class="upload_icon_content" style="margin-left: 86px;">
                            <span class="view_icon_content" v-if="editInfo.iconPath != ''">
                                <img class="icon_choosed" :src="editInfo.iconPath"/>
                            </span>
                            <el-button :disabled="true" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                            </el-button>
                        </div>
                    </el-form-item>

                    <el-form-item label="地址" prop="hostOrIp" class="el_lab">
                        <el-input v-model="editInfo.hostOrIp" class="el_put"  :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="端口 " prop="port">
                        <el-input v-model="editInfo.port" class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="用户名 " prop="userName">
                        <el-input v-model="editInfo.userName"  class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="editInfo.password"
                                  class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="项目路径" prop="programPath">
                        <el-input v-model="editInfo.programPath"  class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称" prop="programName">
                        <el-input v-model="editInfo.programName"  class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器域" prop="domain">
                        <el-input v-model="editInfo.domain" class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="宽度" prop="width">
                        <el-input type="number" v-model="editInfo.width"
                                  class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="高度" prop="height">
                        <el-input type="number" v-model="editInfo.height"
                                  class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer' slot="footer"></div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
    import {mapGetters} from 'vuex'
    import {editRdp} from "../../../../../api/SSL_VPN/new_resourceManager/new_rdp";
    export default{
        components: {},
        computed: {},
        data(){
            let name = (rule, value, callback) => {
                if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{0,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、字符、下划线"));
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
                if (/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
                        .test(value) == false) {
                    callback(new Error("请输入正确端口"));
                } else {
                    callback();
                }
            };
            return {
                rules: {
                    appName: [
                        {required: true,validator: name, trigger: 'blur'}
                    ],
                    hostOrIp: [
                        {required: true,validator: ip, trigger: 'blur' }
                    ],
                    port: [
                        {required: true,validator: port, trigger: 'blur'}
                    ],
                    userName: [
                        {validator: name, trigger: 'blur'}
                    ],
                    programName: [
                        {validator: name, trigger: 'blur'}
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
                    ifRecommend:''
                },
                remChecked:false,
                selectArr: [],
                editVisible: true,
            }
        },
        props: {
            currentData: Object,
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            changeStatus() {
                console.log('changeStatus')
                this.$emit("onChangeStatus")
            },
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            doInit(currentData){
                this.editInfo.id = currentData.id;
                this.editInfo.type = currentData.type;
                this.editInfo.appName = currentData.appName;
                this.editInfo.hostOrIp =currentData.hostOrIp;
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
                this.editInfo.remark=currentData.remark;
                this.editInfo.ifRecommend = currentData.ifRecommend;
                if(currentData.ifRecommend == 1){
                    this.remChecked = true;
                } else {
                    this.remChecked = false;
                }
                console.log("rdpLookInfo:",currentData)
            },

            resetFrom(){
                this.editVisible = false;
            }
        },
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
        width: 80px;
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