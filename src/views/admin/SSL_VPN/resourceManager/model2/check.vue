<template>
    <div class="cs public">
        <el-dialog
                title="查看白名单"
                :visible.sync="editVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div  class="cs-form cs_form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="104px" class="demo-ruleForm" >
                    <el-form-item label="应用名称" prop="appName"  class="el_lab">
                        <el-input v-model="editInfo.appName"  class="el_put" :disabled="true" placeholder="请输入应用名称"></el-input>
                        <el-checkbox v-model="remChecked" :disabled="true" class="padding_left20">设为推荐应用</el-checkbox>
                    </el-form-item>
                    <el-form-item label="说明 " prop="remark">
                        <el-input v-model="editInfo.remark" :disabled="true" placeholder="请输入说明" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="应用类型 "prop="appType">
                        <el-radio-group v-model="editInfo.radio" class="el_put" :disabled="true">
                            <el-radio :label="1" >Web</el-radio>
                            <el-radio :label="2" >TCP</el-radio>
                        </el-radio-group >
                    </el-form-item>
                    <el-form-item label="图标" class="cs_icon_name">
                        <div class="upload_icon_content" style="">
                            <span class="" v-if="editInfo.iconPath != ''">
                                <img class="icon_choosed" :src="editInfo.iconPath"/>
                            </span>
                            <el-button :disabled="true" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="修改状态" class="el_lab">
                        <!--<input v-model="modifyChecked" :disabled="true" type="checkbox" style="margin-left: 20px"> 允许用户修改-->
                        <el-checkbox v-model="modifyChecked" :disabled="true" style="">允许用户修改</el-checkbox>
                    </el-form-item>
                    <el-form-item label="" prop=""  class="el_lab" placeholder="请输入应用参数">
                        <el-input v-model="editInfo.appParams"  class="el_put" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="应用路径 " prop="programPath">
                        <el-input v-model="editInfo.programPath" :disabled="true" placeholder="示例c:/windows/enlink/enlink.exe"  class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="应用策略" prop="" class="el_lab">
                        <el-input v-model="sourceData" :autosize="{minRows: 5}" :placeholder=appTxt type="textarea" class="el_put" :disabled="true"></el-input>
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
    import {editCS, getPolicies} from "../../../../../api/SSL_VPN/new_resourceManager/new_cs";
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
                appTxt: '示例:\r\ntcp:192.168.1.0/255.255.255.0:any\r\ntcp:192.168.1.1-192.168.1.255:1-65535\r\nudp:192.168.1.0/255.255.255.0:53\r\nudp:any:any\n域名\n多行可换行',
                rules: {
                    appName: [
                        {required: true,validator: name, trigger: 'blur' }
                    ],
                    appType:[
                        {required: true, trigger: 'blur' }
                    ]
                },
                editInfo:{
                    id:'',
                    appName: '',
                    appType: '',
                    appParams: '',
                    programPath: '',
                    ifRecommend:'',
                    ifModify:'',
                    remark: '',
                    iconFile: '',
                    iconPath: '',
                    appsPoliciesDTOList:[],
                    radio:1,
                    abled:false
                },
                modifyChecked:false,
                remChecked:false,
                sourceData:'',
                editVisible:true,
            }
        },
        props: {
            currentData: Object,
            editFlag: Boolean
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            changeStatus() {
                this.$emit("onChangeStatus")
            },
            handleClose() {
                this.changeStatus();
            },
            doInit(currentData){
                let row=currentData;
                if(row.appType=='Web'){
                    this.editInfo.radio=1;
                    this.editInfo.abled=true;
                }
                if(row.appType=='TCP'){
                    this.editInfo.radio=2
                    this.editInfo.abled=false;
                }
                if(row.ifRecommend == 1){
                    this.remChecked = true;
                } else {
                    this.remChecked = false;
                }
                if(row.ifModify == 1 || row.ifModify == '允许'){
                    this.modifyChecked = true;
                } else {
                    this.modifyChecked = false;
                }
                let item={
                    id:row.id,
                    appName:row.appName,
                    appType:row.appType,
                    appParams:row.appParams,
                    programPath:row.programPath,
                    remark:row.remark,
                    iconFile:null,
                    iconPath:row.iconPath,
                    radio:this.editInfo.radio,
                    appsPoliciesDTOList:row.appsPoliciesDTOList,
                    abled:this.editInfo.abled
                };
                this.editInfo=item;
                for (let item of this.editInfo.appsPoliciesDTOList) {
                    this.sourceData += item['protocol'] + ':' + item['ip'] + ':' + item['port'] + '\n';
                }
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
        /*margin-left: 20px;*/
    }
    .icon_choosed{
        width: 72px;
        height: 72px;
    }
</style>