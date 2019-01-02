<template>
    <div class="fwtime public">
        <el-dialog
                title="修改时间设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="fwtime-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="95px" class="fwtime-form fwtime_form">
                    <el-form-item label="时间名称 " prop="name">
                        <el-input v-model="editInfo.name"  class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="开始时间 " prop="begin">
                        <el-input v-model="editInfo.begin"  class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="结束时间 " prop="end">
                        <el-input v-model="editInfo.end"  class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="星期">
                        <el-checkbox-group v-model="editInfo.day" class="el_put">
                            <el-checkbox label="Mon">周一</el-checkbox>
                            <el-checkbox label="Tue">周二</el-checkbox>
                            <el-checkbox label="Wed">周三</el-checkbox>
                            <el-checkbox label="Thu">周四</el-checkbox>
                            <el-checkbox label="Fri">周五</el-checkbox>
                            <el-checkbox label="Sat">周六</el-checkbox>
                            <el-checkbox label="Sun">周日</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>


                </el-form>
            </div>
            <div class='form-footer ' slot="footer" style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo')">
                        取消
                    </span>
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
    import {updateTime, isNameExist} from "api/firewall/fwTime";
    export default{
        components: {},
        data(){
            var validateName = (rule, value, callback) =>
            {
                if (/^(\w){1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    if (this.preName != value) {
                        isNameExist({name: value}).then((resp) => {
                            if (resp.data.exist == true) {
                                callback(new Error("该名称已存在"));
                            }
                            callback();
                        }).catch(e => {
                        });
                    }else {
                            callback();
                        }

                }
            };

            var validateBegin = (rule, value, callback) => {

                if (/^([01][0-9]|2[0-3]):([0-5][0-9])$/.test(value)==false){
                    callback(new Error("请输入HH:MM格式对24小时制时间，如 08:30"));
                }
                this.validateBegin = value;
                callback();

            };

            var validateEnd = (rule, value, callback) => {
                if (/^([01][0-9]|2[0-3]):([0-5][0-9])$/.test(value)==false){
                    callback(new Error("请输入HH:MM格式对24小时制时间，如 08:30"));
                }else{
                    var s="1970/1/1 ";
                    var a=Date.parse(s+this.validateBegin);
                    var b=Date.parse(s+value);
                    if (a>b){
                        callback(new Error("结束时间不可早于开始时间"));
                    }
                }
                callback();

            };

            return {
                rules: {
                    name: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],
                    begin: [
                        {required: true, validator: validateBegin, trigger: 'blur'}
                    ],
                    end: [
                        {required: true, validator: validateEnd, trigger: 'blur'}
                    ],
                },
                editInfo: {
                    name: '',
                    begin:'',
                    end:'',
                    day:[]
                },
                editVisible: true,
                validateBegin:'',
                preName:'',
                id:''
            }
        },
        created(){
            this.doInit(this.currentData)
        },
        props: {
            currentData: Object
        },

        methods: {
            handleClose() {
                this.changeStatus();
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var newdto={
                            id:this.id,
                            name: this.editInfo.name,
                            begin:this.editInfo.begin,
                            end:this.editInfo.end,
                            weekday:this.editInfo.day.toString()
                        };

                        updateTime(newdto).then((resp)=> {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '修改时间配置成功！'
                                });
                                this.editVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type:'warning',
                                    message:'修改时间配置失败！'
                                });
                            }
                        }).catch(e=> {
                            console.log("修改出错", e);
                        });


                    } else {

                        return false;
                    }
                });
            },

            doInit(currentData){

                let row = this.currentData;
                this.editInfo.name = row.name;
                this.preName = row.name;
                this.editInfo.begin = row.begin;
                this.editInfo.end = row.end;
                this.id = row.id;
                this.editInfo.day = row.weekday.split(",");

            },
            resetForm(formName) {
                console.log(formName, '------');
                this.editVisible = false;
                this.$refs[formName].resetFields();
            },

        },
    }
</script>
<style>


</style>