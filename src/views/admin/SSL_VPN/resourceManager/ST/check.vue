<template>
    <div class="cs public">
        <el-dialog
                title="查看ST"
                :visible.sync="editVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div  class="st_form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="104px" class="demo-ruleForm" >
                    <el-form-item label="应用名称" prop="appName"  class="el_lab">
                        <el-input v-model="editInfo.appName"  class="el_put" :disabled="true" placeholder="请输入应用名称"></el-input>
                        <el-checkbox v-model="remChecked" :disabled="true" class="padding_left20">设为推荐应用</el-checkbox>

                    </el-form-item>
                    <el-form-item label="说明 " prop="remark">
                        <el-input v-model="editInfo.remark" :disabled="true" class="el_put" placeholder="请输入说明"></el-input>
                    </el-form-item>
                    <el-form-item label="应用图标" class="cs_icon_name">
                        <div class="upload_icon_content" style="">
                            <span class="" v-if="editInfo.iconPath != ''">
                                <img class="icon_choosed" :src="editInfo.iconPath"/>
                            </span>
                            <el-button :disabled="true" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                            </el-button>
                        </div>
                    </el-form-item>



                    <el-form-item label="应用参数" prop=""  class="el_lab">
                        <el-input v-model="editInfo.appParams"  class="el_put" :disabled="true" placeholder="请输入应用参数"></el-input>
                    </el-form-item>

                    <el-form-item label="应用策略" prop=""  class="el_lab">
                        <el-input v-model="sourceData" type="textarea" :autosize="{minRows: 5}" class="el_put" :placeholder="'示例:\r\ntcp:192.168.1.0/255.255.255.0:any或\r\ntcp:192.168.1.1-192.168.1.255:1-65535或\r\nudp:192.168.1.0/255.255.255.0:53\r\nudp:any:any\n多行可换行'"
                                  :disabled="true"></el-input>
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
    import {editST, getPolicies} from "../../../../../api/SSL_VPN/new_resourceManager/new_st";
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
                        {required: true, validator: comBase, trigger: 'blur' }
                    ]
                },
                editInfo:{
                    id:'',
                    appName: '',
                    appParams: '',
                    ifRecommend:'',
                    remark: '',
                    iconFile: '',
                    iconPath: '',
                    appsPoliciesDTOList:[]
                },
                modifyChecked:false,
                remChecked:false,
                sourceData:'',
                editVisible:true,
//                multipleSelection: []
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
                console.log('changeStatus')
                this.$emit("onChangeStatus")
            },
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            doInit(currentData){
                let row=currentData;
                if(row.ifRecommend == 1){
                    this.remChecked = true;
                } else {
                    this.remChecked = false;
                }
                let item={
                    id:row.id,
                    appName:row.appName,
                    appParams:row.appParams,
                    remark:row.remark,
                    iconFile:null,
                    iconPath:row.iconPath,
                    appsPoliciesDTOList:row.appsPoliciesDTOList,
                };
                this.editInfo=item;
                for (let item of this.editInfo.appsPoliciesDTOList) {
                    this.sourceData += item['protocol'] + ':' + item['ip'] + ':' + item['port'] + '\n';
                }
            },
            submitEditForm(formName){
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
    .icon_choosed{
        width: 72px;
        height: 72px;
    }
</style>