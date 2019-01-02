<template>
    <div class="cs public">
        <el-dialog
                :title="dialogVisible ? '使用图标库':'编辑ST'"
                :visible.sync="editVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose(dialogVisible)" @open="doInit(currentData)">
            <div  class=" st_form" v-show="!dialogVisible">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="104px" class="demo-ruleForm" >
                    <el-form-item label="应用名称" prop="appName"  class="el_lab">
                        <el-input v-model="editInfo.appName"  class="el_put" placeholder="请输入应用名称"></el-input>
                        <el-checkbox v-model="remChecked" class="padding_left20">设为推荐应用</el-checkbox>
                    </el-form-item>
                    <el-form-item label="说明 " prop="remark">
                        <el-input v-model="editInfo.remark"  placeholder="请输入说明" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="应用图标" class="cs_icon_name">
                        <div class="upload_icon_content" style="">
                            <span class="" v-if="editInfo.iconPath != ''">
                                <img class="icon_choosed" :src="editInfo.iconPath" />
                            </span>
                            <el-button @click="chooseIcon" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                            </el-button>
                        </div>
                    </el-form-item>

                    <el-form-item label="应用参数" prop=""  class="el_lab" v-if="true">
                        <el-input v-model="editInfo.appParams"  class="el_put" placeholder="请输入应用参数"></el-input>
                    </el-form-item>

                    <el-form-item label="应用策略" prop=""  class="el_lab">
                        <el-input v-model="sourceData" type="textarea" :autosize="{minRows: 5}" class="el_put" :placeholder="'示例:\r\ntcp:192.168.1.0/255.255.255.0:any或\r\ntcp:192.168.1.1-192.168.1.255:1-65535或\r\nudp:192.168.1.0/255.255.255.0:53\r\nudp:any:any\n多行可换行'"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <icon-libraty @reIconList="reIconList" v-show="dialogVisible"></icon-libraty>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo',dialogVisible)">取消</span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            :disabled="clickOnce"
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
    import {editST, getPolicies} from "../../../../../api/SSL_VPN/new_resourceManager/new_st";
    import IconLibraty from "@/views/components/iconLibrary.vue"

    export default{
        components: {
            IconLibraty
        },
        computed: {},
        data(){
            let name = (rule, value, callback) => {
                if (/^[\u4E00-\u9FA5A-Za-z0-9_]{1,}$/.test(value) == false) {
                    callback(new Error("请输入中文、字母、数字、下划线"));
                } else {
                    callback();
                }
            };
            var appParams = (rule, value, callback) => {
                if (!value){
                    callback();
                } else if(/^[\u4E00-\u9FA5A-Za-z0-9~!@#$%^&()*_-]{1,199}$/.test(value) == false){
                    callback(new Error("请输入字母、数字、中文及特殊字符"));
                }else {
                    callback();
                }
            };
            return {
                rules: {
                    appName: [
                        {required: true,validator: name, trigger: 'blur' }
                    ],
                    appType:[
                        {required: true, trigger: 'blur' }
                    ],
                    appParams:[
                        { validator: appParams, trigger: 'blur' }
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
                    appsPoliciesDTOList:[],
                },
                remChecked:false,
                sourceData:'',
                editVisible:true,
                dialogVisible: false,
                iconList: [],
                filepath: '',
                clickOnce:false
            }
        },
        props: {
            currentData: Object,
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            handleClose() {
                this.$emit("onChangeStatus");
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
                    appsPoliciesDTOList:row.appsPoliciesDTOList
                };
                this.editInfo=item;
                for (let item of this.editInfo.appsPoliciesDTOList) {
                    this.sourceData += item['protocol'] + ':' + item['ip'] + ':' + item['port'] + '\n';
                }
            },
            submitEditForm(formName, blen){
                this.filepath = "";
                if(blen){
                    const len = this.iconList.length
                    var flag = false;
                    for (var i = 0; i < len; i++) {
                        if(this.iconList[i].choose){
                            this.filepath = this.iconList[i].icon
                            this.editInfo.iconPath = this.iconList[i].icon
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
                    this.editVisible = true;
                    return;
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.remChecked == false){
                            this.editInfo.ifRecommend = 0;
                        } else {
                            this.editInfo.ifRecommend = 1;
                        }
                        this.editInfo.appsPoliciesDTOList = [];
                        while(this.sourceData.indexOf(" ")!=-1){
                            this.sourceData=this.sourceData.replace(" ","");
                        }
                        let dataArray = this.sourceData.split('\n');
                        let arr = [];
                        for (let i = 0; i < dataArray.length; i++){
                            if(dataArray[i] != ""){
                                arr.push(dataArray[i]);
                            }
                        }
                        for (let item of arr) {
                            let dataItem = item.split(':');
                            this.editInfo.appsPoliciesDTOList.push({'protocol': dataItem[0],'ip': dataItem[1],'port':dataItem[2]});
                        }
                        this.clickOnce=true;
                        editST(this.editInfo.id, this.editInfo).then((resp) => {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功！'
                                });
                                this.editVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                                this.clickOnce=false;
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: resp.code.info
                                });
                                this.clickOnce=false;
                            }
                        }).catch(e => {
                            console.log("编辑出错", e);
                        });

                    } else {
                        return false;
                    }
                })
            },
            iconFileChange(e) {
                this.addInfo.iconFile = e.target.files[0]
            },
            onFileChangeEdit (e) {
                var files = e.target.files || e.dataTransfer.files
                if (!files.length) return;
                if(files[0].size > 10000000){
                    this.$message({
                        type:'warning',
                        message:'请上传10M以内的图片!'
                    });
                } else {
                    this.createImageEdit(files);
                    this.editInfo.iconFile = e.target.files[0]
                    //上传图片
                    var formData = new FormData();
                    for (let key in this.editInfo) {
                        formData.append(key, this.editInfo[key]);
                    }
                    if (this.editInfo.iconFile) {
                        this.editInfo.iconPath=null;
                        formData.append('iconFile', this.editInfo.iconFile);
                    } else {
                        formData.append('iconPath', this.editInfo.iconPath);
                    }
                    console.log("form表单：",formData)
                    // 监听进度回调
                    const uploadProgress = function(event) {
                    };
                    // 上传文件
                    let $this = this;
                    new Promise(function(resolve, reject) {
                        let client = new XMLHttpRequest();
                        client.open('POST', '/api/admin/apps/icon', true);
                        client.onreadystatechange = function() {
                            if (this.readyState !== 4) {
                                return;
                            }
                            if (this.status === 200) {
                                console.log(this.responseText,'ajax')
                                resolve(JSON.parse(this.responseText));
                            } else {
                                reject(this.status);
                            }
                        };
                        client.upload.addEventListener("progress", uploadProgress, false); //监听进度
                        client.send(formData);
                    }).then(
                        // 上传成功
                        function(resData) {
                            if(resData.status=='SUCCESS'){
                                $this.$message({
                                    type:'success',
                                    message:'上传图片成功！'
                                });
                                $this.editInfo.iconPath = resData.data;
                            }else{
                                $this.$message({
                                    type:'warning',
                                    message:resData.code.info
                                });
                            }
                        },
                    );
                }
            },
            removeImageEdit(e) {
                this.editInfo.iconPath= ''
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
            resetForm(formName, blen) {
                if(blen){
                    this.dialogVisible = false;
                    this.editVisible = true;
                    return;
                }else{
                    this.editVisible=false;
                    this.$refs[formName].resetFields();
                }
            },
            reIconList (iconList) {
                this.iconList = iconList;
            },
            chooseIcon () {
                this.dialogVisible = true
            },
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