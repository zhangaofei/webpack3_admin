<template>
    <div class="l3net-auth public">
        <el-dialog
                title="查看L3-net"
                :visible.sync="editVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div  class="l3net-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="104px" class="demo-ruleForm" MultipartFile>
                    <el-form-item label="应用名称" prop="appName"  class="el_lab">
                        <el-input v-model="editInfo.appName"  class="el_put" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="应用类型 "prop="radio">
                        <el-radio-group v-model="editInfo.radio" class="el_put" :disabled="true">
                            <el-radio :label="1" >FN</el-radio>
                            <el-radio :label="2" >TUNNEL</el-radio>
                        </el-radio-group >
                    </el-form-item>
                    <!--<el-form-item label="应用图标"  >
                        <div class="" v-if="editInfo.iconPath== null||editInfo.iconPath==''" style="margin-left: 68px;">
                            <input type="file" :disabled="true" name="iconFile" style="margin-left: 92px;">
                        </div>
                        <div class="col-sm-10" v-else>
                            <span v-if="editInfo.iconPath!=null && editInfo.iconPath!=''"><img :src="'/api/admin/'+editInfo.iconPath" style="margin-left: 80px;max-width:60px;max-height: 52px;border-radius:50%">
                            <button style="display: none">移除全部图片</button>
                            </span>
                        </div>
                    </el-form-item>-->
                    <el-form-item label="应用图标" class="cs_icon_name">
                        <div class="upload_icon_content" style="">
                            <span class="" v-if="editInfo.iconPath != ''">
                                <img class="icon_choosed" :src="editInfo.iconPath"/>
                            </span>
                            <el-button @click="chooseIcon" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="说明 " prop="remark">
                        <el-input v-model="editInfo.remark"  :disabled="true" class="el_put" placeholder="请输入说明"></el-input>
                    </el-form-item>
                    <el-form-item label="应用参数" prop=""  class="el_lab">
                        <el-input type="textarea" v-model="editInfo.appParams" :autosize="{ minRows: 5}" :placeholder="'示例:\r\n192.168.1.1/255.255.255.255或\r\n192.168.1.0/255.255.255.0或\r\n192.168.1.0/24或\r\n192.168.1.0-192.168.1.199\r\n多行可换行'" class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="应用策略" prop=""  class="el_lab">
                        <el-input type="textarea" v-model="sourceData" :autosize="{ minRows: 5}" class="el_put" :placeholder="'示例:\r\ntcp:192.168.1.0/255.255.255.0:any或\r\ntcp:192.168.1.1-192.168.1.255:1-65535或\r\nudp:192.168.1.0/255.255.255.0:53或\r\nicmp:192.168.1.0/255.255.255.0:any\r\n多行可换行'" :disabled="true"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <div class='form-footer ' slot="footer"></div>
        </el-dialog>
    </div>
</template>
<script>

    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
    import {mapGetters} from 'vuex'
    import {editL3, getPolicies} from "../../../../../api/SSL_VPN/new_resourceManager/new_L3Net";
    export default{
        components: {
        },
        computed: {},
        data(){
            let comBase = (rule, value, callback) => {
                if(/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,20}$/.test(value) == false){
                    callback(new Error("请输入1-20位字母、数字、字符、下划线"));
                }else {
                    callback();
                }
            };
            return {
                rules: {
                    appName: [
                        {required: true, validator: name, trigger: 'blur' }
                    ],
                    appParams:[
                        { trigger: 'blur' }
                    ],
                    radio: [
                        {required: true, message: '选择应用类型', trigger: 'blur'}
                    ]
                },
                editInfo:{
                    id:'',
                    appName: '',
                    appType: '',
                    appParams: '',
                    remark: '',
                    iconFile: '',
                    iconPath: '',
                    appsPoliciesDTOList:[],
                    radio:1
                },
                sourceData:'',
                editVisible:true,
            }
        },
        created(){
            this.doInit(this.currentData)
        },
        props: {
            currentData: Object
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
            doInit(currentData){
                if(this.currentData.appType=='FN'){
                    this.editInfo.radio=1
                }else {
                    this.editInfo.radio=2
                }
                this.editInfo.id = this.currentData.id;
                this.editInfo.appType = this.currentData.appType;
                this.editInfo.appName = this.currentData.appName;
                this.editInfo.appParams = this.currentData.appParams;
                this.editInfo.iconFile = this.currentData.iconFile;
                this.editInfo.iconPath = this.currentData.iconPath;
                this.editInfo.remark=this.currentData.remark;
                this.editInfo.appsPoliciesDTOList=this.currentData.appsPoliciesDTOList;
                this.editInfo.radio=this.editInfo.radio
                for (let item of this.editInfo.appsPoliciesDTOList) {
                    this.sourceData += item['protocol'] + ':' + item['ip'] + ':' + item['port'] + '\n';
                }
            },
            submitEditForm(){
                this.editVisible = false;
            }
        }
    }
</script>

<style >
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
        margin-left: 20px;
    }
    .icon_choosed{
        width: 72px;
        height: 72px;
    }
</style>