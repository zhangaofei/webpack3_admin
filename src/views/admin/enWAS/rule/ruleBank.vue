<template>
    <div class="banked public">
        <el-dialog title="更新规则库设置" :visible.sync="addVisible" @close="handleClose" size="small"
                   custom-class="dialog public" top="10%">
            <div class="banked-form">
                <el-form :model="info" label-width="80px" ref="info">
                    <el-form-item class="el_lab">
                        <el-checkbox v-model="info.status">自动与规则服务器同步</el-checkbox>
                    </el-form-item>
                    <el-form-item label="规则服务器" style="margin-left: 50px">
                        <el-input placeholder="请输入规则服务器" class="el_put" v-model="info.value"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer" >
                <div class="foot">
                    <!--<el-button-->
                            <!--@click="resetForm('info')" style="margin-left: 40px;background-color: #fff">-->
                        <!--取消-->
                    <!--</el-button>-->
                    <span  @click="resetForm('info')" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitInfo('info')">
                        保存
                    </el-button>

                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script>

    import {mapGetters} from 'vuex';
    import {getAutoUpdata,saveAutoUpdata} from  'api/enWAS/rule';

    export default {

        computed: {
            ...mapGetters([
                'parts', 'actions', 'compares', 'method', 'variables'
            ])
        },
        components: {},
        data() {
            return {
                info: {
                    id:'',
                    value:'',
                    status:0
                }
            }
        },
        created() {
            this.addVisible = true;
            this.getList()
        },
        methods: {
            handleClose() {
                this.changeStatus();
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },
            getList(){
                getAutoUpdata().then(resp => {
//                    const data = response.data.items;
//                    console.log(data, 'res.jdata')
//                    if (data.page_count > 0) {
//                        this.list = data.res;
//                        this.listQuery.total = data.page_count;
//                    } else {
//                        this.list = [];
//                        this.listQuery.total = 0;
//                    }

                    this.info=resp.data[0];
                    if(resp.data[0].status==0){
                        this.info.status=false
                    }else {
                        this.info.status=true
                    }
                    console.log(resp,'response',this.info)

                });
            },
            submitInfo(formName){
                if(this.info.status==false){
                    this.info.status=0
                }else {
                    this.info.status=1
                }
                this.$refs.info.validate((valid) => {
                    if (valid) {
                        saveAutoUpdata(this.info).then(resp => {
                            if (resp.status == 1) {
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
                                    message: '新建失败！'
                                });
                            }

                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
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
    /*.banked .dialog {*/
        /*min-width: 830px;*/
    /*}*/

    /*.banked .el-dialog__header {*/
        /*padding-left: 5px;*/
    /*}*/

    /*.banked .el_put {*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*width: 50% !important;*/
        /*margin-left: 40px;*/
    /*}*/

    /*.banked .el_sel {*/
        /*!*width: 65% !important;*!*/
        /*margin-left: 30px;*/
    /*}*/

    /*.banked-form .el-form-item__label {*/
        /*float: left;*/
        /*min-width: 135px;*/
        /*font-size: 15px;*/
        /*margin-left: 40px;*/
    /*}*/

    /*.banked-form .el-form-item {*/
        /*margin-bottom: 17px;*/
    /*}*/

    /*.banked .el-dialog__body {*/
        /*padding: 30px 20px;*/
        /*color: #48576a;*/
        /*font-size: 14px;*/
    /*}*/

    /*.banked-form .el-form-item__error {*/
        /*color: #ff4949;*/
        /*font-size: 12px;*/
        /*line-height: 1;*/
        /*padding-top: 0px;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 165px;*/
    /*}*/


</style>
