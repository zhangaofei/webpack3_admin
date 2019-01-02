<template>
    <div class="line public">
        <el-dialog
                title="新建地址池"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose">
            <div class="pool-form">
                <el-form :model="addInfo" ref="jumpConfig" label-width="100px">
                    <el-form-item label="线路池名" prop="chName">
                        <el-input v-model="addInfo.chName" placeholder="" class="el_put"></el-input>
                    </el-form-item>


                    <el-form-item label="包含线路" prop="lineIds">
                        <el-select v-model="addInfo.lineIds" multiple  class="el_sel" collapse-tags  placeholder="请选择">
                            <el-option
                                    v-for="line in lineNameList" :key="line.id" :label="line.chName" :value="line.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="描述" prop="remarks">
                        <el-input v-model="addInfo.remarks" placeholder="请输入描述" class="el_put"></el-input>
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
    import {addPool, getLineNameList} from 'api/enDNS/line';

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
                    chName: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ]
                },
                addInfo: {
                    chName:'',
                    remarks:'',
                    lineIds:[]
                },
                lineNameList:[],
                addVisible: true,
            };
        },
        created(){
            this.getLineNameList();
        },
        methods: {
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },

            changeStatus(){
                this.$emit("onChangeStatus")
            },
            getLineNameList(){
                getLineNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.lineNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            submitForm(formName) {
                addPool(this.addInfo).then((resp) => {
                    if (resp.status == 'SUCCESS') {
                        this.$message({
                            type: 'success',
                            message: '新建地址池成功！'
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
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$refs['addInfo'].resetFields();
            }

        },
    }
</script>
<style>

   .pool-form .el_put {
        position: relative;
        /*width: 65% !important;*/
        margin-left: 20px;
    }


    .pool-form .el_sel {
        /*width: 65% !important;*/
        margin-left: 20px;
    }
</style>