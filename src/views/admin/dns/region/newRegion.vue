<template>
    <div class="region public">
        <el-dialog
                title="新建区域设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose">
            <div class="region-form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px">
                    <el-form-item label="区域名称" prop="name">
                        <el-input v-model="addInfo.name" placeholder="请输入区域名称" class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('addInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitForm('addInfo')">
                        确定
                    </el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {addRegion} from 'api/enDNS/region';

    export default{
        data(){

            var validateName = (rule, value, callback) =>
            {
                if (/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value) == false) {
                    callback(new Error("区域名只能包含字母、数字、中文"));
                } else {
                        callback();
                }
            };
            return {
                rules: {
                    name: [
                        {required: true, message: '请输入区域名称', trigger: 'blur'}
                    ]
                },
                addInfo: {
                    name:'',
                },
                addVisible: true,

            };

        },
        created(){
            
        },
        methods: {
            handleClose() {
                this.$emit("onChangeStatus");
            },

            submitForm(formName) {
//                this.$refs[formName].validate((valid) => {
//                    if (valid) {
                        addRegion(this.addInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '新建区域成功！'
                                    });
                                    this.addVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs['addInfo'].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.code.info
                                    });
                                }
                            }).catch(e => {
                                console.log("新建出错", e);
                            });
//                    } else {
//                        return false;
//                    }
//                });
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs['addInfo'].resetFields();
            }

        },
    }
</script>
<style>
    .region-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 130px;
    }

   .region-form .el_put {
        position: relative;
        margin-left: 20px;
    }
</style>