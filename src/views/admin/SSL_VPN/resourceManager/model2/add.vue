<template>
    <div class="cs public">
        <el-dialog
                :title="dialogVisible ? '使用图标库':'新建白名单'"
                :visible.sync="addVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose(dialogVisible)">
            <div  class="cs-form cs_form" v-show="!dialogVisible">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="104px" class="demo-ruleForm" >
                    <el-form-item label="应用名称" prop="appName"  class="el_lab">
                        <el-input v-model="addInfo.appName"  class="el_put" placeholder="请输入应用名称"></el-input>
                    </el-form-item>
                    <el-form-item label="说明 " prop="remark">
                        <el-input v-model="addInfo.remark"  placeholder="请输入说明" class="el_put"></el-input>
                    </el-form-item>
                    <el-form-item label="应用类型 " prop="appType" v-if="false">
                        <el-radio-group v-model="addInfo.radio" class="el_put" @change="csType">
                            <el-radio :label="1" >Web</el-radio>
                            <el-radio :label="2" >TCP</el-radio>
                        </el-radio-group >
                    </el-form-item>
                    <el-form-item label="图标" class="cs_icon_name">
                        <div class="upload_icon_content" style="">
                            <span class="" v-if="addInfo.iconPath != ''">
                                <img class="icon_choosed" :src="addInfo.iconPath" />
                            </span>
                            <el-button @click="chooseIcon" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                            </el-button>
                        </div>
                    </el-form-item>
                    <template v-if="false">
                        <el-form-item label="修改状态" class="el_lab">
                            <!--<input v-model="modifyChecked" type="checkbox" style="margin-left: 20px"> 允许用户修改-->
                            <el-checkbox v-model="modifyChecked" style="">允许用户修改</el-checkbox>
                        </el-form-item>
                        <el-form-item label="应用参数" prop=""  class="el_lab">
                            <el-input v-model="addInfo.appParams"  class="el_put" placeholder="请输入应用参数"></el-input>
                        </el-form-item>
                        <el-form-item label="应用路径 " prop="programPath">
                            <el-input v-model="addInfo.programPath" placeholder="示例c:/windows/enlink/enlink.exe" class="el_put"></el-input>
                        </el-form-item>
                    </template>

                    <el-form-item label="应用策略" prop=""  class="el_lab">
                        <el-input v-model="sourceData" :autosize="{minRows: 5}" type="textarea" class="el_put" :placeholder="appTxt"></el-input>
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
                            :disabled="clickOnce"
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
    import {createCS} from "../../../../../api/SSL_VPN/new_resourceManager/new_cs";
    import IconLibraty from "@/views/components/iconLibrary.vue"

    export default{
        components: {
            IconLibraty
        },
        data(){
            let name = (rule, value, callback) => {
                if (/^[\u4E00-\u9FA5A-Za-z0-9_]{1,}$/.test(value) == false) {
                    callback(new Error("请输入中文、字母、数字、下划线"));
                } else {
                    callback();
                }
            };
            let appParams = (rule, value, callback) => {
                if (!value){
                    callback();
                } else if(/^[\u4E00-\u9FA5A-Za-z0-9!@#$%^&*_]{1,199}$/.test(value) == false){
                    callback(new Error("请输入字母、数字、中文及特殊字符"));
                }else {
                    callback();
                }
            };
            let programPath = (rule, value, callback) => {
                if (!value){
                    callback();
                } else if(/^[\u4E00-\u9FA5A-Za-z0-9~!@#$%^&()_-]{1,199}$/.test(value) == false){
                    callback(new Error("请输入字母、数字、中文及~!@#$%^&()_-"));
                }else {
                    callback();
                }
            };
            return {
                appTxt: '示例:\r\ntcp:192.168.1.0/255.255.255.0:any\r\ntcp:192.168.1.1-192.168.1.255:1-65535\r\nudp:192.168.1.0/255.255.255.0:53\r\nudp:any:any\r\n域名\n多行可换行',
                rules: {
                    appName: [
                        {required: true,validator: name, trigger: 'blur' }
                    ],
                    appType:[
                        {required: true, trigger: 'blur' }
                    ],
                    appParams:[
                        { validator: appParams,trigger: 'blur' }
                    ],
                    programPath:[
                        { trigger: 'blur'}
                    ]
                },
                addInfo:{
                    appName: '',
                    appType: 'ST',
                    appParams: '',
                    programPath: '',
                    remark: '',
                    iconFile: '',
                    iconPath: '/resource/image/default_Client_Web_application_icon.png',
                    ifRecommend:'',
                    ifModify:'',
                    appsPoliciesDTOList:[],
                    radio:1,
                    abled:'',
                },
                modifyChecked:false,
                remChecked:false,
                sourceData:'',
                addVisible:true,
                dialogVisible: false,
                iconList: [],
                filepath: '',
                clickOnce:false
            }
        },
        methods: {
            chooseIcon () {
                this.dialogVisible = true
            },
            handleClose(blen) {
                if (blen) {
                    this.dialogVisible = false;
                    this.addVisible = true;
                    return;
                }else{
                    this.addVisible = false;
                    this.$emit("onChangeStatus")
                }
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            submitForm(formName, blen){
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
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.remChecked == false){
                            this.addInfo.ifRecommend = 0;
                        } else {
                            this.addInfo.ifRecommend = 1;
                        }
                        if(this.modifyChecked == false){
                            this.addInfo.ifModify = 0;
                        } else {
                            this.addInfo.ifModify = 1;
                        }
                        this.addInfo.appsPoliciesDTOList = [];
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
                            this.addInfo.appsPoliciesDTOList.push({'protocol': dataItem[0],'ip': dataItem[1],'port':dataItem[2]});
                        }
                        this.clickOnce=true;
                        createCS(this.addInfo ).then((resp) => {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '新建成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                console.log( this.$refs[formName],'formName')
                                this.$refs[formName].resetFields();
                                this.clickOnce=false;
                            } else {
                                // this.addInfo.appsPoliciesDTOList=[];
                                this.clickOnce=false;
                            }
                        }).catch(e => {
                            console.log("新建Client出错", e);
                        });


                    } else {

                        return false;
                    }

                });
            },
            csType(){
                if(this.addInfo.radio==1){
                    this.addInfo.appType='Web';
                    this.addInfo.abled=true;
                    this.addInfo.iconPath = '/resource/image/default_Client_Web_application_icon.png';
                }
                if(this.addInfo.radio==2){
                    this.addInfo.appType='TCP';
                    this.addInfo.abled=false;
                    this.addInfo.iconPath = '/resource/image/default_Client_Tcp_application_icon.png';
                }
            },
            onFileChangeAdd (e) {
                var files = e.target.files || e.dataTransfer.files
                if (!files.length) return
                if(files[0].size > 10000000){
                    this.$message({
                        type:'warning',
                        message:'请上传10M以内的图片!'
                    });
                } else {
                    this.createImageAdd(files)
                    this.addInfo.iconFile = e.target.files[0]
                    //上传图片
                    var formData = new FormData();
                    for (let key in this.addInfo) {
                        formData.append(key, this.addInfo[key]);
                    }
                    console.log("form表单：", formData)
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
                                $this.addInfo.iconPath = resData.data;
                                console.log("上传图片的iconPath:", $this.addInfo.iconPath)
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
            iconFileChange(e) {
                this.addInfo.iconFile = e.target.files[0]
            },
            removeImageAdd(e) {
                this.addInfo.iconPath=''
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
            resetForm(formName, blen) {
                if(blen){
                    this.dialogVisible = false;
                    this.addVisible = true;
                    return;
                }else{
                    this.addVisible=false;
                    this.$refs[formName].resetFields();
                }
            },
            reIconList (iconList) {
                this.iconList = iconList;
            },
        }
    }
</script>

<style >
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
