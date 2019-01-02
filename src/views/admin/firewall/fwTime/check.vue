<template>
    <div class="fwtime public">
        <el-dialog
                title="查看时间设置"
                :visible.sync="lookVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="fwtime-form">
                <el-form :model="info"  ref="info" label-width="95px" class="fwtime-form fwtime_form" :rules="rules">
                    <el-form-item label="时间名称 " prop="name">
                        <el-input v-model="info.name" :disabled="true" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="开始时间 " prop="begin">
                        <el-input v-model="info.begin" :disabled="true" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="结束时间 " prop="end">
                        <el-input v-model="info.end" :disabled="true" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="星期">
                        <el-checkbox-group v-model="info.day" :disabled="true" class="el_put">
                            <el-checkbox label="Mon" disabled>周一</el-checkbox>
                            <el-checkbox label="Tue" disabled>周二</el-checkbox>
                            <el-checkbox label="Wed" disabled>周三</el-checkbox>
                            <el-checkbox label="Thu" disabled>周四</el-checkbox>
                            <el-checkbox label="Fri" disabled>周五</el-checkbox>
                            <el-checkbox label="Sat" disabled>周六</el-checkbox>
                            <el-checkbox label="Sun" disabled>周日</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                </el-form>
            </div>

            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class='foot'>
                    <el-button style="border-color: #D1D1D1;"
                               class="reset_sure"
                               @click="resetForm()" v-if="false">
                        关闭
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";

    export default{
        components: {},
        data(){
            return {
                rules: {
                    name: [
                        {required: true, trigger: 'blur'}
                    ],
                    begin: [
                        {required: true,  trigger: 'blur'}
                    ],
                    end: [
                        {required: true,  trigger: 'blur'}
                    ],
                },
                info: {
                    name: '',
                    begin:'',
                    end:'',
                    day:[]
                },
                lookVisible: true,
                id:'',
            }
        },
        props: {
            currentData: Object
        },

        created(){
            this.doInit(this.currentData)
        },
        methods: {
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },

            changeStatus(){
                this.$emit("onChangeStatus")
            },

            doInit(currentData){

                let row = this.currentData;
                this.info.name = row.name;
                this.info.begin = row.begin;
                this.info.end = row.end;
                this.id = row.id;
                this.info.day = row.weekday.split(",");

            },
            resetForm(formName) {
                console.log(formName, '------');
                this.lookVisible = false;
                this.$refs[formName].resetFields();
            },

        },
    }
</script>
<style>

</style>