<template>
    <div class="mail public">
        <el-dialog
                title="备份到服务器"
                :visible.sync="dialogVisible"
                size="small"
                custom-class="dialog"
                @close="cancleDialog"
                top="10%"
        >
            <div class="mail-form">
                <el-form :model="backupInfo" :rules="rulesEmail" ref="backupInfo"
                         label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :offset="10" :span="4" style="text-align: center;">
                            <el-button
                                    type="primary"
                                    class="reset_sure"
                                    @click="startBackup"
                                    v-loading.fullscreen.lock="fullscreenLoading"
                                    >
                                开始
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div class="foot">
                    <el-button
                            type="danger"
                            style="background: #ff0000;"
                            class="reset_sure"
                            @click="cancleDialog">
                        关闭
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {backupToServerData} from "../../../../api/sysMaintain/backupRecovery";
    export default {
        props: {
            propsA: Boolean,
            propsB: Boolean,
            propsC: String,
            propsD: Object
        },
        data() {
            return {
                fullscreenLoading: false,
                backupInfo: {
                    filename: '74121212.txt',
                    remark: ''
                },
                tipVisible: false,
                rulesEmail: {},
                dialogVisible: false
            }
        },
        name: "backupConfirm",
        mounted () {
        },
        watch: {
            propsB (val, old) {
                if(val) this.dialogVisible = val;
            }
        },
        computed: {
            isCancle() {
                return this.dialogVisible = this.propsB;
            },
            getPropsA(beln) {
                return this.isBackupSuccess = this.propsA;
            }
        },
        methods: {
            cancleDialog () {
                this.dialogVisible = false;
                this.$emit("cancleNewVlan", this.dialogVisible);
            },
            startBackup () {
                this.dialogVisible = false;
                this.$emit("cancleNewVlan", this.dialogVisible);

                if(this.propsC == "backup"){
                    backupToServerData().then( (res) => {
                        // 假设备份成功，则重新刷新列表 （再次执行列表请求函数）
                        if (res.status == "SUCCESS") {
                            this.$emit("backupToServer", true);
                        };
                        this.isBackupSuccess = false;
                    }).catch( (res) => {
                        this.isBackupSuccess = false;
                        this.$message({
                            type: 'error',
                            message: res.status
                        })
                    });
                }else if(this.propsC == "restore"){

                    if(this.propsD.files.length == 0){

                        this.$message({
                            type: 'warning',
                            message: '请选择文件后进行恢复'
                        });

                    }else{
                        this.$confirm('恢复后有可能造成服务器停止运行，是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$emit("fileData");
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消恢复'
                            });
                        });
                    }

                };
            }
        }
    }
</script>

<style scoped>

</style>