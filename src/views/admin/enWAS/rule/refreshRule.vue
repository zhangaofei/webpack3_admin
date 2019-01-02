<template>
    <div class="refreshed public">
        <el-dialog title="更新设置":visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <div class="refreshed-form">
                <el-form :model="info" label-width="80px" ref="info" >
                    <el-form-item class="el_lab">
                        <el-checkbox>在线更新</el-checkbox>
                    </el-form-item>
                    <el-form-item label="规则服务器" style="margin-left: 50px" >
                        <el-input placeholder="请输入规则服务器" class="el_put" v-model="info.service"></el-input>
                    </el-form-item>
                    <el-form-item class="el_lab">
                        <el-checkbox>离线更新</el-checkbox>
                    </el-form-item>
                    <el-form-item label="规则文件" style="margin-left: 50px" v-if="false">
                        <el-input placeholder="请输入规则服务器" class="el_put"></el-input>
                        <el-button
                                @click="scanne" style="margin-left: 40px;background-color: red; width: 100px">
                            浏览
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('info')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="nextStep">
                        确定
                    </el-button>
                    <!--<el-button-->
                            <!--@click="resetForm('info')" style="margin-left: 40px;background-color: #fff">-->
                        <!--取消-->
                    <!--</el-button>-->
                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script>

    import {mapGetters} from 'vuex';
    import {refresh} from  'api/enWAS/rule';


    export default {

        computed: {
            ...mapGetters([
                'parts', 'actions', 'compares', 'method', 'variables'
            ])
        },
        components: {},
        data() {
            return {
                rules:{},
                info: {
                    service:''
                }
            }
        },
        created() {
            this.addVisible = true;
            // this.getList();
        },
        methods: {
            handleClose() {
                this.changeStatus();
            },
            doTest() {
                this.addVisible = true;
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            scanne(){

            },
            nextStep(){
                alert('1111')
                refresh(this.info).then(resp => {
                    console.log(resp)
                    // if (resp.status == 1) {
                    //     this.$message({
                    //         type: 'success',
                    //         message: '新建成功！'
                    //     });
                    // }

                })},
            submitInfo(formName){
                this.$refs.info.validate((valid) => {
                    if (valid) {

//                        addRule(this.info).then(resp => {
//                            if (resp.status == 1) {
//                                this.$message({
//                                    type: 'success',
//                                    message: '新建成功！'
//                                });
//                                this.conditions = [];
                        this.addVisible = false;
                        this.$emit('onChangeStatus');
                        this.$refs[formName].resetFields();
//                            } else {
//                                this.$message({
//                                    type: 'warning',
//                                    message: '新建失败！'
//                                });
//                            }
//
//                        }).catch(error => {
//                            console.log(error)
//                        });
//                    } else {
//                        console.log('error submit!!');
//                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.addVisible = false;
                this.$emit('onChangeStatus');
                this.$refs[formName].resetFields();
            },
        }
    }
</script>
<style>

    /*.el-dialog--tiny {*/
        /*width: 25%;*/
    /*}*/

    /*!* 设置弹出框大小*!*/
    /*.refreshed .dialog {*/
        /*min-width: 830px;*/
    /*}*/

    /*.refreshed .el-dialog__header {*/
        /*padding-left: 5px;*/
    /*}*/

    /*.refreshed .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 50% !important;*/
        /*margin-left: 40px;*/
    /*}*/

    /*.refreshed .el_sel {*/
        /*!*width: 65% !important;*!*/
        /*margin-left: 30px;*/
    /*}*/

    /*.refreshed-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width: 135px;*/
        /*font-size: 15px;*/
        /*margin-left: 40px;*/
    /*}*/

    /*.refreshed-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.refreshed .el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.refreshed-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 165px;*/
    /*}*/


</style>
