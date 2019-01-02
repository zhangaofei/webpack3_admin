<template>
    <div>
        <section class="content-header">
            <h1>
                <!--    管理员设置 -->
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left: 12px;">
                <li><a><i class="fa fa-user">&nbsp;用户管理</i></a></li>
                <li>用户设置</li>
                <li class="active">拓展功能</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" >拓展功能</h3>
                        </div>
                        <div class="box-body" style="margin-top: 30px; padding-top: 0;">
                            <div >
                                <p class="p_title">背景图片和logo设置</p>
                                <table class="bg_tab">
                                    <tr>
                                        <td>设置自定义背景(只针对于浏览器客户端)</td>
                                        <td class="td_left">
                                            <el-select  placeholder="背景" v-model="bgInfo.back_file_name" class="el_sel" @change="changBg(bgInfo.back_file_name)">
                                                <el-option v-for="item in bgList"
                                                           :label="item.file_name"
                                                           :value="item.file_name"
                                                           :key="item.id"
                                                >
                                                </el-option>
                                            </el-select>
                                            <el-button class="primary " type="primary" @click="showDialog(2)" style="margin: 0 18px;">上传</el-button>
                                            <span>推荐大小1920X950</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>设置自定义logo(只针对于浏览器客户端)</td>
                                        <td class="td_left">
                                            <el-select    placeholder="logo" v-model="bgInfo.logo_name" @change="changLogo(bgInfo.logo_name)"  class="el_sel">
                                                <el-option v-for="item in logoList"
                                                           :label="item.file_name"
                                                           :value="item.file_name"
                                                           :key="item.id"
                                                >
                                                </el-option>
                                            </el-select>
                                            <!--<el-input  class="el_sel" style="width: 250px;" placeholder="上传logo图标" :disabled="true" v-model="expandLogo"></el-input>-->
                                            <el-button type="primary" class="primary" @click="showDialog(3)" style="margin: 0 18px;">上传</el-button>
                                            <span>推荐大小325X30</span>
                                        </td>
                                    </tr>
                                </table>
                                <p style="width: 50%;margin-top: 30px;text-align: center">
                                    <el-button
                                            class="plain cancle"
                                            @click="canleChangeBg()">
                                        取消
                                    </el-button>
                                    <el-button
                                            type="primary"
                                            class="primary confirm"
                                            @click="saveBackground()">
                                        保存
                                    </el-button>
                                </p>
                            </div>
                            <div style="margin-top: 80px;margin-bottom: 40px">
                                <p class="p_title">浏览器客户端显示</p>
                                <table class="bg_tab">
                                    <tr>
                                        <td>是否显示注册账号</td>
                                        <td class="td_left">
                                            <el-select  class="el_sel" v-model="baseInfo.show_register" placeholder="请选择">
                                                <el-option label="是" value="1"></el-option>
                                                <el-option label="否" value="0"></el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>是否显示忘记密码</td>
                                        <td class="td_left">
                                            <el-select  class="el_sel" v-model="baseInfo.show_forget_pswd" placeholder="请选择">
                                                <el-option label="是" value="1"></el-option>
                                                <el-option label="否" value="0"></el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>提示内容</td>
                                        <td>
                                            <el-input  type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" class="el_put" v-model="baseInfo.prompt_content" placeholder="多行内容用用换行分割！"></el-input>
                                        </td>
                                    </tr>
                                </table>
                                <p style="width: 50%;margin-top: 30px;text-align: center">
                                    <el-button
                                            class="plain cancle"
                                            @click="canleBaseInfo()">
                                        取消
                                    </el-button>
                                    <el-button
                                            type="primary"
                                            class="primary confirm"
                                            @click="saveBaseInfo()">
                                        保存
                                    </el-button>
                                </p>
                            </div>
                            <!--<UploadIcon :dialogStatus="visibleDialog" :typeNum="typeNum"   @getList="getList" @closeDialogs="closeDialogs"/>-->
                            <UploadIcon v-if="visibleDialog" :typeNum="typeNum"   @getList="getClientBackground" @closeDialogs="closeDialogs"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import UploadIcon from './uploadIcon.vue';
    import {getBackgroundList,getBaseInfo,changeBackground,changeClientInfo} from 'api/SSL_VPN/user_new/userApi';
    import {iconListData} from 'api/systemSet/sysConfig/iconCenter'
    import {isReadonly} from "@/utils/permissionUtil";
    export default {
        name: "expand",
        components:{
            UploadIcon
        },
        data(){
            return{
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                visibleDialog:false,
                typeNum:'',
                readOnly:false,
                pageId:220,
                listBackground:[
                    {
                        name:"设置自定义背景(只针对于浏览器客户端)",
                        cont:''
                    },
                    {
                        name:"设置自定义logo(只针对于浏览器客户端)",
                        cont:''
                    }
                ],
                expandBg:'',
                expandLogo:'',
                list:[
                    {id:1,name:'a.png'},
                    {id:2,name:'b.png'}
                ],
                listQuery: {
                    page: 1,
                    page_size: 1000,
                    total: ''
                },
                iconList:[],
                info:{
                    showPsw:'1',//1显示密码，0不显示
                    showReg:'1',
                    tips:''
                },
                bgList:[],
                logoList:[],
                /*bg提交信息*/
                bgInfo:{
                    back_id:160,
                    back_file_name:'default_user_for_client_bg.png',
                    logo_id:159,
                    logo_name:'default_user_for_client_logo.png'
                },
                baseInfo:{
                    show_register:'',
                    show_forget_pswd:'',
                    prompt_content:''
                }
            }
        },
        created(){
            this.getList();
            this.getClientBackground();
            this.getClientBaseInfoList();
            // this.getClientInfo();
            this.visibleDialog=false;
            this.readOnly = isReadonly(this.pageId);
        },
        methods: {
            getClientBaseInfoList(){
                getBaseInfo().then( res => {
                    if(res.msg == "success"){
                        this.baseInfo.show_register=res.data.items[0].value;
                        this.baseInfo.show_forget_pswd=res.data.items[1].value;
                        this.baseInfo.prompt_content=res.data.items[2].value
                    }
                }).catch( err => {
                    console.log(err)
                });
            },
            canleBaseInfo(){
              this.getClientBaseInfoList()
            },
            saveBaseInfo(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    changeClientInfo(this.baseInfo).then( res => {
                        if(res.msg=='success'){
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            })
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            })
                        }
                    }).catch( err => {
                        console.log(err)
                    });
                }
            },
            /*=========================*/
            canleChangeBg(){
                this.getClientBackground();
            },
            getClientBackground(){
                getBackgroundList().then( res => {
                    this.bgList=res.data.res_back_imag;
                    this.logoList=res.data.res_logo_imag;
                    for(let item of this.bgList){
                        if(item.status==1){
                            this.bgInfo.back_id=item.id;
                            this.bgInfo.back_file_name=item.file_name;
                        }
                    }
                    for(let item of this.logoList){
                        if(item.status==1){
                            this.bgInfo.logo_id=item.id;
                            this.bgInfo.logo_name=item.file_name;
                        }
                    }
                }).catch( err => {
                    console.log(err)
                });
            },
            saveBackground(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    changeBackground(this.bgInfo).then( res => {
                        console.log(res,'saveBackground');
                        if(res.msg=='success'){
                            this.$message({
                                message: '更换成功！',
                                type: 'success'
                            })
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            })
                        }
                    }).catch( err => {
                        console.log(err)
                    });
                }

            },
            changBg(val){

              for(let item of this.bgList){
                  if(val==item.file_name){
                      this.bgInfo.back_id=item.id
                  }
              }
                console.log('val',val,this.bgInfo.back_id);
            },
            changLogo(val){
                console.log('val_changLogo',val);
                for(let item of this.logoList){
                    if(val==item.file_name){
                        this.bgInfo.logo_id=item.id
                    }
                }
            },
            canle(){
                this.getClientBackground();
            },

            getList () {
                // iconListData({page: this.listQuery.page, page_size: this.listQuery.page_size}).then( res => {
                //     if(res.msg == "success"){
                //         console.log('res_list',res);
                //         this.iconList = res.data.items.res.filter(item => {
                //
                //             if(item.type==2||item.type==3){
                //                 return true
                //             }
                //         });
                //         console.log('iconList',this.iconList);
                //     }
                // }).catch( res => {
                //     this.$message({
                //         message: res.status,
                //         type: 'error'
                //     })
                // })
            },

            showDialog(type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.visibleDialog=true;
                    this.typeNum=type;
                }
            },
            closeDialogs () {
                this.visibleDialog = false;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .p_title{
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 30px;
    }
    .bg_tab{
        width: 850px;
        margin-left: 5%;
        td{
            height: 50px;
            border: 1px solid #ccc;
            padding: 15px;
            text-align: center;
        }
        .td_left{
            text-align: left;
        }
    }
</style>