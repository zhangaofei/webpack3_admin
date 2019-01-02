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
                <li class="active">版本管理</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" >版本管理</h3>
                        </div>
                        <div class="box-body" style="margin-top: 30px; padding-top: 0;">
                            <div class="row" style="padding: 20px 0 30px;">
                                <el-col :span="15" style="margin-left: 10px;">&nbsp;
                                        <!--<a class="function_btn_main" @click="showDialog(4)">上传版</a>-->
                                    <a class="function_btn_main" title="" @click="showDialog(4)">
                                        <i class="fa fa-upload"> 上传版本</i>
                                    </a>
                                </el-col>
                            </div>
                            <el-table
                                    ref="multipleTable"
                                    :data="list"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        type="selection"
                                        width="80"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="名称"
                                        show-overflow-tooltip
                                        align="center"
                                        prop="show_version"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="版本号"
                                        show-overflow-tooltip
                                        align="center"
                                        prop="version"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="描述"
                                        show-overflow-tooltip
                                        align="center"
                                        prop="remark"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <a title="删除" @click="singleDel(scope.row.id)" style="margin-right: 8px" ><i class="fa fa-trash"></i></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <UploadIcon v-if="visibleDialog" :typeNum="typeNum"   @getList="regetList" @closeDialogs="closeDialogs"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import UploadIcon from './uploadIcon.vue';
    import {getBackgroundList,getBaseInfo,changeBackground,changeClientInfo,getVersionList,delVersion} from 'api/SSL_VPN/user_new/userApi';
    import {iconListData} from 'api/systemSet/sysConfig/iconCenter'
    import {isReadonly} from "@/utils/permissionUtil";
    getVersionList
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
                list:[],
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
            regetList(){
                this.getList();
            },
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
            getList() {
                getVersionList().then( res => {
                    if(res.msg == "success"){
                        this.list=res.data;
                        console.log('res_list',res);
                    }
                }).catch( res => {
                    this.$message({
                        message: res.status,
                        type: 'warning'
                    })
                })
            },
            singleDel(id){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.$confirm('确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        delVersion({id:id}).then( res => {
                            if(res.msg == "success"){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功！'
                                });
                                this.getList()
                            }else{
                                this.$message({
                                    type: 'success',
                                    message: res.msg
                                });
                            }
                        })
                    })
                }
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