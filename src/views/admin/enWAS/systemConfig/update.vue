<template>
    <div class="web public">
        <el-dialog
                :title="dialogVisible ? '使用图标库':'编辑环境变量配置'"
                :visible.sync="editVisible"
                @close="handleClose(dialogVisible)"
                size="small"
                custom-class="dialog public"
                top="10%">
            <el-form :model="info" :rules="rules" v-show="!dialogVisible" label-width="142px" class="config-form" ref="info">
                <el-form-item label="名称" prop="name">
                    <span v-if="currentData.canDelete == '1'">
                        <el-input v-model="info.name" class="el_put"></el-input>
                    </span>
                    <span v-else>
                        <el-input v-model="info.name" :disabled="true" class="el_put"></el-input>
                    </span>
                </el-form-item>
                <el-form-item label="系统参数" prop="value">
                    <el-select v-model="info.value" placeholder="请选择" class="el_sel" v-if="info.name=='smart_link_support'">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input v-model="info.value" class="el_put" v-else></el-input>

                </el-form-item>
                <el-form-item label="描述" prop="">
                    <el-input v-model="info.remark" class="el_put"></el-input>
                </el-form-item>
            </el-form>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('info',dialogVisible)">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitInfo('info', dialogVisible)">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {modifySystemConfigList} from 'api/enWAS/systemConfig';

    export default {
        components: {},
        data() {
            return {
                rules: {
                    value: [
                        {required: true, message:'请输入系统参数', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message:'请输入名称', trigger: 'blur'}]
                },
                editVisible: true,
                isEditName:null,
                info:{
                    id:'',
                    name: '',
                    value:'',
                    remark:'',
                },
                dialogVisible: false,
                options: [{
                    value: '1',
                    label: '开启'
                }, {
                    value: '0',
                    label: '关闭'
                }],
            }
        },
        props: {
            currentData: Object,
        },
        created() {
            this.info.id = this.currentData.id;
            this.info.name = this.currentData.name;
            this.info.value = this.currentData.value;
            this.info.remark = this.currentData.remark;
            this.isEditName=this.currentData.canDelete;
            if(this.info.name == 'update'){
                this.info.name = '更新'
            } else if(this.info.name == 'hash_name'){
                this.info.name = '泛域名'
            } else if(this.info.name == 'login_name'){
                this.info.name = 'https登录域名'
            } else if(this.info.name == 'http_login_name'){
                this.info.name = 'http登录域名'
            } else if(this.info.name == 'smart_link_support'){
                this.info.name = '链路解析'
            }
        },
        methods: {
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            handleClose() {
                this.changeStatus();
            },
            doInit(currentData){
                this.editVisible = true;
            },
            submitInfo(formName, blen){
                this.info.id = this.currentData.id;
                if(this.info.name == '更新'){
                    this.info.name = 'update'
                } else if(this.info.name == '泛域名'){
                    this.info.name = 'hash_name'
                } else if(this.info.name == 'https登录域名'){
                    this.info.name = 'login_name'
                } else if(this.info.name == 'http登录域名'){
                    this.info.name = 'http_login_name'
                } else if(this.info.name == '链路解析'){
                    this.info.name = 'smart_link_support'
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        modifySystemConfigList(this.info).then(resp => {
                            if (resp.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type:'warning',
                                    message:resp.msg
                                });
                            }

                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        return false;
                    }
                });
            },

            resetForm(formName, blen) {
                if(blen){
                    this.dialogVisible = false;
                    this.editVisible = true;
                    return;
                }else{
                    this.editVisible = false;
                    this.$refs[formName].resetFields();
                }
            }
        }
    }
</script>

<style>
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
    .el-dialog--tiny {
        width: 25%;
    }
    .config-form .el_put {
        position: relative;
        display: inline-block;
        width: 65%;
        margin-left: 20px;
    }
    .config-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        /* left: 131px; */
        left: 100px;
    }
</style>
