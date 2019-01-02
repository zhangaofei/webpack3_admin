<template>
    <div class="web public">
        <el-dialog
                :title="dialogVisible ? '使用图标库':'新建web终端'"
                :visible.sync="addVisible"
                @close="handleClose(dialogVisible)"
                size="small"
                custom-class="dialog public"
                top="10%">
            <el-form v-show="!dialogVisible" :model="info" label-width="104px" :rules="rules" class="web-form"
                     ref="info">
                <el-form-item label="应用名" prop="" class="item_mark">
                    <el-input v-model="info.name" class="el_put" placeholder="请输入应用名"></el-input>
                </el-form-item>
                <el-form-item label="添加方法" prop="" class="item_mark">
                    <el-select v-model="info.addType" class="el_put"  placeholder="添加方法">
                        <el-option
                                v-for="item in addTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="图标" class="cs_icon_name">
                    <div class="upload_icon_content" style="">
                            <span class="" v-if="info.iconPath != ''">
                                <img class="icon_choosed" :src="info.iconPath" />
                            </span>
                        <el-button @click="chooseIcon" class="success confirm btn_middle" style="margin-left: 20px;" size="small" type="success">浏览
                        </el-button>
                    </div>
                </el-form-item>
                <template v-if="info.addType==0">

                    <el-form-item label="协议类型" prop="" class="item_mark">
                        <el-select v-model="singleProtocol" placeholder="请选择" class="el_sel" @change="defaultPort(singleProtocol)">
                            <el-option
                                    v-for="item in protocolList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                        <el-form-item label="地址" prop="" class="item_mark">
                            <!--<span style="color: red;position:absolute;left: 27px;">*</span>-->
                            <el-input v-model="singleIpAddr" class="el_put" placeholder="请输入地址"></el-input>
                        </el-form-item>
                        <el-form-item label="端口" prop="" class="item_mark">
                            <el-input v-model="info.port" class="el_put" placeholder="请输入端口"></el-input>
                        </el-form-item>
                    <template v-if="singleProtocol=='VNC'&&info.fileTransfer==true">
                        <el-form-item label="用户名" class="item_mark">
                            <el-input v-model="info.userName" class="el_put" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" class="item_mark">
                            <el-input v-model="info.password" type="password" class="el_put" placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="用户名">
                            <el-input v-model="info.userName" class="el_put" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="info.password" type="password" class="el_put" placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </template>
                </template>
               <template v-else>

                   <el-form-item label="协议类型" prop="" class="item_mark">
                       <el-checkbox-group v-model="mulProtocol" style="width: 84%;">
                           <el-checkbox label="SSH" style=""></el-checkbox>
                           <el-checkbox label="Telnet"></el-checkbox>
                           <el-checkbox label="VNC"></el-checkbox>
                           <el-checkbox label="RDP"></el-checkbox>
                           <!--暂时没有-->
                           <!--<el-checkbox label="FTP"></el-checkbox>-->
                           <!--<el-checkbox label="SFTP"></el-checkbox>-->
                           <!--<el-checkbox label="MYSQL" style="margin-left: 97px"></el-checkbox>-->
                           <!--<el-checkbox label="ORACLE"></el-checkbox>-->
                           <!--<el-checkbox label="SQL SERVER"></el-checkbox>-->
                       </el-checkbox-group>

                   </el-form-item>
                   <el-form-item label="地址范围" prop="" v-if="info.addType==1" class="item_mark">
                       <el-input v-model="mulIpAddr" class="el_put" type="textarea" :rows="5" :placeholder="'多个IP或域名地址请换行,如:\r\ncas.enlink.cn\r\nCas.1.enlink.cn\r\n*.enlink.cn\r\n1.1.1.1\r\n1.1.1.1-2.2.2.2\r\n1.1.1.0/255.255.255.0\r\n1.1.2.0/24'" ></el-input>
                   </el-form-item>
               </template>

                <template v-if="info.addType==0 && (singleProtocol=='RDP')">
                    <el-form-item label="服务器域">
                        <el-input v-model="info.serviceArea" class="el_put" placeholder="请输入服务器域"></el-input>
                    </el-form-item>
                    <el-form-item label="项目路径">
                        <el-input v-model="info.projectPath" class="el_put" placeholder="请输入项目路径"></el-input>
                    </el-form-item>
                    <el-form-item label="项目别名">
                        <el-input v-model="info.projectName" class="el_put" placeholder="请输入项目别名"></el-input>
                    </el-form-item>

                    <el-form-item label="权限" >
                        <el-checkbox v-model="info.fileTransfer" style="">开启文件传输</el-checkbox>
                        <el-checkbox v-model="info.printer">开启打印机</el-checkbox>
                        <el-checkbox v-model="info.clipboard"  v-if="false">开启剪切板</el-checkbox>
                    </el-form-item>
                </template>
                <template v-if="info.addType==0 && (singleProtocol=='VNC')">
                    <el-form-item label="认证密码" class="item_mark">
                        <el-input v-model="info.vncPwd" type="password" class="el_put" placeholder="请输入认证密码"></el-input>
                    </el-form-item>
                    <el-form-item label="权限" >
                        <el-checkbox v-model="info.fileTransfer" style="">开启文件传输</el-checkbox>
                    </el-form-item>
                </template>
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

    import {getAddWebend} from 'api/webTerminal/webTerminal';
    import IconLibraty from "@/views/components/iconLibrary.vue"

    export default {
        name: 'admin_resource_add',
        components: {
            IconLibraty
        },
        data() {
            return {
                rules: {

                },
                addVisible: true,
                singleProtocol:'SSH',
                mulProtocol:['SSH'],
                singleIpAddr:'',
                mulIpAddr:'',
                info: {
                    iconPath: '/resource/image/default_Web_application_icon.png',
                    name: '',
                    addType:0,//添加类型，0协定添加，1自助添加
                    protocol: '',//协议，ssh;telnet;vnc;rdp     用分号分隔
                    ipAddr: '',
                    port:22,
                    userName:'',
                    password:'',
                    url:'',//邮件验证码
                    serviceArea:'',//服务器域
                    projectPath:'',//项目路径
                    projectName:'',//项目名称
                    clipboard:true,//是否开启剪切板
                    fileTransfer:true,//是否开启文件传输
                    printer:true,//是否开启打印机
                    vncPwd:'',//vnc
                },
                addTypeList:[
                    {
                        value: 0,
                        label: '协定添加'
                    },
                    {
                        value: 1,
                        label: '自主添加'
                    },
                ],
                protocolList: [
                    {
                        value: 'SSH',
                        label: 'SSH'
                    },
                    {
                        value: 'Telnet',
                        label: 'Telnet'
                    },
                    {
                        value: 'VNC',
                        label: 'VNC'
                    }, {
                        value: 'RDP',
                        label: 'RDP'
                    },
                    // {
                    //     value: 'FTP',
                    //     label: 'FTP'
                    // },
                    //
                    // {
                    //     value: 'SFTP',
                    //     label: 'SFTP'
                    // }, {
                    //     value: 'MYSQL',
                    //     label: 'MYSQL'
                    // },
                    // {
                    //     value: 'ORACLE',
                    //     label: 'ORACLE'
                    // },{
                    //     value: 'SQL SERVER',
                    //     label: 'SQL SERVER'
                    // },
                ],
                dialogVisible: false,
                iconList: [],
                filepath: '',
            }
        },
        created() {

        },
        methods: {
            defaultPort(val){
                if(val=='SSH'){
                    this.info.port=22
                }else if(val=='Telnet'){
                    this.info.port=23
                }else if(val=='VNC'){
                    this.info.port=5900
                }else if(val=='RDP'){
                    this.info.port=3389
                }else {

                }
            },
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
            validate(){
                if(this.info.name==''){
                    this.$message({
                        type: 'warning',
                        message: '名称不能为空！'
                    });
                    return false;
                }else if(this.info.name.length>20){
                    this.$message({
                        type: 'warning',
                        message: '名称长度不能超过20个字符！'
                    });
                    return false;
                }
                if(this.info.addType==0){
                    if(this.singleProtocol==''){
                        this.$message({
                            type: 'warning',
                            message: '协议类型不能为空！'
                        });
                        return false;
                    }

                        if(this.singleIpAddr.trim()==''){
                            this.$message({
                                type: 'warning',
                                message: '地址不能为空！'
                            });
                            return false;
                        }
                        if(/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.info.port)==false){
                            this.$message({
                                type: 'warning',
                                message: '端口为1-65535之间的数字！'
                            });
                            return false;
                        }

                    if(this.info.vncPwd==''&&this.singleProtocol=='VNC'){
                        this.$message({
                            type: 'warning',
                            message: '认证密码不能为空！'
                        });
                        return false;
                    }
                    if(this.info.fileTransfer==true&&this.singleProtocol=='VNC'){
                        if(this.info.userName==''){
                            this.$message({
                                type: 'warning',
                                message: '用户名不能空！'
                            });
                            return false;
                        }
                        if(this.info.password==''){
                            this.$message({
                                type: 'warning',
                                message: '密码不能空！'
                            });
                            return false;
                        }
                    }

                }
                if(this.info.addType==1){
                    if(this.mulProtocol.length==0){
                        this.$message({
                            type: 'warning',
                            message: '协议类型至少勾选一个！'
                        });
                        return false;
                    }
                    if(this.mulIpAddr==''||this.mulIpAddr=='\n'){
                        this.$message({
                            type: 'warning',
                            message: '地址范围不能为空！'
                        });
                        return false;
                    }
                }
                return true
            },
            submitInfo(formName, blen){
                this.filepath = "";
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
                    if (this.validate()) {
                        if(this.info.addType==0){
                            this.info.protocol=this.singleProtocol;
                            this.info.ipAddr=this.singleIpAddr;
                        }else {
                            this.info.protocol=this.mulProtocol.join(';');
                            this.info.ipAddr=this.mulIpAddr;
                        }
                        getAddWebend(this.info).then(resp => {
                            if (resp.status == 'SUCCESS') {
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
                                    message: resp.code.info
                                });
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    }
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

<style lang="scss">
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
    .web{
        .item_mark .el-form-item__label:before{
            content: '*';
            color: #f56c6c;
            margin-right: 4px;
        }
    }
</style>
