<template>
    <div class="web">
        <el-dialog title="查看API" :visible.sync="editVisible" @close="handleClose" size="small" custom-class="dialog" top="10%">
            <el-form :model="info" label-width="142px" class="web-form" ref="info">
                <el-form-item label="名称">
                    <el-input  v-model="info.name" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="URI">
                    <el-input v-model="info.puri" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="upstream">
                    <el-input v-model="info.upstream" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="host">
                    <el-input v-model="info.host" class="el_put" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="info.status" placeholder="状态" class="el_put" :disabled="true">
                        <el-option label="启用" value="1" ></el-option>
                        <el-option label="不启用" value="0" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否需要认证">
                    <el-select v-model="info.needAuth" placeholder="是否需要认证" class="el_put" :disabled="true">
                        <el-option label="是" value="1" ></el-option>
                        <el-option label="否" value="0" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="方法">
                    <el-input v-model="info.Methods" class="el_put" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div style="margin-top: 20px;margin-right: 11%">
                    <el-button
                            type="primary"
                            @click="resetForm()">
                        关闭
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {editApi} from "../../../../../api/systemSet/adminSet/interface";
    import {mapGetters} from 'vuex';
    export default {
        components: {},
        data() {
            return {
                editVisible: true,
                info:{
                    id:'',
                    name:'',
                    puri:'',
                    status:'',
                    upstream:'',
                    needAuth:'',
                    host:'',
                    Methods:''
                }
            }
        },
        props: {
            currentData: Object,
        },
        created() {
            this.info.id = this.currentData.id;
            this.info.name = this.currentData.name;
            this.info.puri = this.currentData.uri;
            this.info.status = this.currentData.status;
            if (this.info.status == '0'){
                this.info.status = '不启用';
            } else {
                this.info.status = '启用';
            }
            this.info.upstream = this.currentData.upstream;
            this.info.needAuth = this.currentData.needAuth;
            if (this.info.needAuth == '0'){
                this.info.needAuth = '否';
            } else {
                this.info.needAuth = '是';
            }
            this.info.host = this.currentData.host;
            this.info.Methods = this.currentData.Methods;
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
            resetForm(formName) {
                this.editVisible = false;
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style>

    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .web .dialog {
        min-width: 830px;
    }

    .web .el-dialog__header {
        padding-left: 5px;
    }

    .web .el_put {
        position: relative;
        display: inline-block;
        margin-left: 80px;
    }

    .web .el_sel {
        margin-left: 80px;
    }

    .web .el_text {
        margin-left: 158px;
    }

    .web-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .web-form .el-form-item {
        margin-bottom: 20px;
    }

    .web .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .web-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 165px;
    }


</style>
