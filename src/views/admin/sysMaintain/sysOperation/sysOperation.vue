<template>
    <div>
        <div class="content-header">
            <h1>
                <!--系统配置-->
                <small>
                    <!--序列号管理-->
                </small>
            </h1>
            <ol class="breadcrumb " style="left:12px">
                <li><a ><i class="fa fa-gears"></i> 系统维护</a></li>
                <li class="active">系统操作</li>
            </ol>
        </div>
        <div class="content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" >
                        <div class="box-header with-border">
                            <h3 class="box-title">系统操作</h3>
                            <div class="box-tools pull-right"></div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 21px !important">
                            <div class="row">
                                <div class="time_box">
                                    <ul class="time_ul">
                                        <li flex="main:left cross:center">
                                            <el-button type="primary" class="primary edit" size="large" style="width: 140px;" @click="closeVisible=!closeVisible">
                                                <i class="fa fa-power-off"></i>&nbsp;关闭设备
                                            </el-button>
                                            <span>关闭设备所运行的服务,并保存设备保存的信息,这样您就可以安全的关闭设备了.</span>
                                        </li>
                                        <li flex="main:left cross:center">
                                            <el-button type="primary" class="primary edit" size="large" style="width: 140px;" @click="resetVisible=!resetVisible">
                                                <i class="fa fa-repeat"></i>&nbsp;重启设备
                                            </el-button>
                                            <span>关闭并重新启动设备.</span>
                                        </li>
                                        <li flex="main:left cross:center">
                                            <el-button type="primary" class="primary edit" size="large"
                                                       style="width: 140px;"
                                                       @click="serverVisible=!serverVisible"><i
                                                    class="fa fa-spinner"></i>&nbsp;重启服务
                                            </el-button>
                                            <span>终止当前所有接入的会话,释放资源并重新启动系统服务.</span>
                                        </li>
                                        <li flex="main:left cross:center">
                                            <el-button type="danger"
                                                       class="danger edit"
                                                       size="large"
                                                       style="width: 140px;"
                                                       @click="factoryDataReset=!factoryDataReset">恢复出厂设置
                                                       <!--class="reset_button_bg"-->
                                            </el-button>
                                            <span>清除系统上的所有数据.</span>
                                        </li>
                                    </ul>
                                    <!--*******************发送operation弹框*************************-->
                                    <div class="operation public">
                                        <el-dialog
                                                title="关闭设备"
                                                :visible.sync="closeVisible"
                                                size="small"
                                                custom-class="dialog"
                                                top="10%"
                                                @click="resetForm('eoperationInfo')">
                                            <div class="operation-form">
                                                <p>确定关闭设备？</p>
                                            </div>
                                            <div class='form-footer foot' slot="footer" style="height:50px;">
                                                <span @click="resetForm('operationInfo')" class="cancle">取消</span>
                                                <el-button class="primary confirm btn_middle" type="primary" @click="submitShutDown('operationInfo')">确定</el-button>
                                            </div>
                                        </el-dialog>
                                        <el-dialog
                                                title="重启设备"
                                                :visible.sync="resetVisible"
                                                size="small"
                                                custom-class="dialog"
                                                top="10%"
                                                @click="resetForm('operationInfo')">
                                            <div class="operation-form">
                                                <p>确定重启设备？</p>
                                            </div>
                                            <div class='form-footer' slot="footer" style="height:50px;">
                                                <div class="foot">
                                                    <span @click="resetForm('operationInfo')" class="cancle">取消</span>
                                                    <el-button class="primary confirm btn_middle" type="primary" @click="submitRestart('operationInfo')">确定</el-button>
                                                </div>
                                            </div>
                                        </el-dialog>
                                        <el-dialog
                                                title="重启服务"
                                                :visible.sync="serverVisible"
                                                size="small"
                                                custom-class="dialog"
                                                top="10%"
                                                @click="resetForm()">
                                            <div class="operation-form">
                                                <p>确定重启服务？</p>
                                            </div>
                                            <div class='form-footer foot' slot="footer" style="height:50px;">
                                                <span @click="resetForm()" class="cancle">取消</span>
                                                <el-button class="primary confirm btn_middle" type="primary" @click="submitServer()">确定</el-button>
                                            </div>
                                        </el-dialog>
                                        <el-dialog
                                                title="恢复出厂设置"
                                                :visible.sync="factoryDataReset"
                                                size="small"
                                                custom-class="dialog"
                                                top="10%"
                                                @click="resetForm()">
                                            <div class="operation-form">
                                                <p>确定恢复出厂设置？</p>
                                            </div>
                                            <div class='form-footer foot' slot="footer" style="height:50px;">
                                                <span @click="resetForm()" class="cancle">取消</span>
                                                <el-button class="primary confirm btn_middle" type="primary" @click="factoryReset()">确定</el-button>
                                            </div>
                                        </el-dialog>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {isReadonly} from "../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../store/index";
    import {getShutDown, getRestart, getRestartServer, resetFactoryData} from "../../../../api/sysMaintain/sysOperation";
    export default {
        components: {},
        data() {
            return {
                readOnly:false,
                pageId:152,
                closeVisible: false,
                resetVisible: false,
                serverVisible: false,
                factoryDataReset: false
            }
        },
        computed: {},
        created(){
            this.readOnly = isReadonly(this.pageId);
            console.log('readOnly:', this.readOnly);
        },
        methods: {
            resetForm(formName) {
                this.closeVisible = false;
                this.resetVisible = false;
                this.serverVisible = false;
                this.factoryDataReset = false;
            },
//            +++++++++++++++++
            submitShutDown(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    getShutDown().then((resp) => {
                        console.log(resp, 'resp-getShutDown')
                        this.closeVisible = false;

                    }).catch(err => {

                    })
                }
            },
            submitRestart(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    getRestart().then((resp) => {
                        this.resetVisible = false;
                        console.log(resp, 'resp-getRestart')
                    }).catch(err => {

                    })
                }
            },
            submitServer(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    getRestartServer().then((resp) => {
                        this.serverVisible = false;
                        console.log(resp, 'resp-getRestartServer')
                    }).catch(err => {

                    })
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                        .then(_ => {
                    done();
                }).catch(_ => {
                });
            },
            factoryReset () {
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    resetFactoryData().then((resp) => {
                        this.factoryDataReset = false;
                        this.$message({
                            type: 'success',
                            message: 'success!'
                        });
                    }).catch(err => {

                    })
                }
            }

            //            ________________

        }
    }
    ;
</script>
<style>
    .operation .dialog {
        min-width: 830px;
    }

    .operation .el-dialog__header {
        padding-left: 5px;
    }

    .operation-form p {
        margin-left: 35px;
        font-size: 18px;
    }

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            padding: 0;
            margin: 0;
        }
    }

    .time_box {
        margin: 0 20px;
        .time_ul {
            padding: 20px 0;
            li {
                margin-bottom: 30px;
                span {
                    font-size: 16px;
                    margin-left: 20px;
                }
            }
        }

    }
    .reset_button_bg{
        background: #139E66;
    }
    .reset_button_bg:hover {
        background: #13CE66;
    }
</style>
