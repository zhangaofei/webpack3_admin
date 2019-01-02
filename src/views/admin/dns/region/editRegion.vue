<template>
    <div class="region public">
        <el-dialog
                title="修改区域设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose"  @open="doInit(currentData)">
            <div class="region-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="100px">
                    <el-form-item label="区域名称" prop="name">
                        <el-input v-model="editInfo.name" placeholder="请输入区域名称" class="el_put"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitForm('editInfo')">
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
    import {updateRegion} from 'api/enDNS/region';

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

                editInfo: {
                    name:'',
                    id:''
                },
                editVisible: true,
                preName:'',
            };

        },
        created(){
            this.doInit(this.currentData);
        },
        props: {
            currentData: Object
        },
        methods: {


            handleClose() {
                this.$emit("onChangeStatus");
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            updateRegion(this.editInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改区域成功！'
                                    });
                                    this.editVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs['editInfo'].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.code.info
                                    });
                                }
                            }).catch(e => {
                                console.log("修改出错", e);
                            });
                    } else {

                        return false;
                    }
                });
            },

            doInit(currentData){
                let row = currentData;

                //带修改补充
                this.preName = row.name;
                this.editInfo.name = row.name;
                this.editInfo.id = row.id;
            },

            resetForm(formName) {
                this.editVisible = false;
                this.$refs['editInfo'].resetFields();
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
        /*width: 65% !important;*/
        margin-left: 20px;
    }
</style>