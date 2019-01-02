<template>
    <div class="fwtime public">
        <el-dialog
                title="新建时间设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose">
            <div class="fwtime-form fwtime_form">
                <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="95px" class="fwtime-form">
                    <el-form-item label="时间名称 " prop="name">
                        <el-input v-model="addInfo.name" placeholder="请输入时间名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="开始时间 " prop="begin">
                        <el-input v-model="addInfo.begin" placeholder="例如 08:30" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="结束时间 " prop="end">
                        <el-input v-model="addInfo.end" placeholder="例如 18:30" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="星期">
                        <el-checkbox-group v-model="addInfo.day" class="el_put">
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
                    <span class="cancle btn_middle" @click="resetForm('addInfo')">
                        取消
                    </span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
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
    import {addTime, isNameExist} from "api/firewall/fwTime";
    export default{
        components: {},
        data(){
            var validateName = (rule, value, callback) =>
            {
                if (/^(\w){1,20}$/.test(value) == false) {
                    callback(new Error("请输入1-20位字母、数字、下划线"));
                } else {
                    isNameExist({name:value}).then((resp)=> {
                        if (resp.data.exist == true) {
                            callback(new Error("该名称已存在"));
                        }
                        callback();
                    }).catch(e=> {});

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
                addInfo: {
                    name: '',
                    begin:'',
                    end:'',
                    day:[]
                },
                addVisible: true,
                validateBegin:'',
            }
        },
        created(){

        },
        methods: {
            handleClose() {
                console.log('handleClose')
                this.changeStatus();
            },
            changeStatus(){
                this.$emit("onChangeStatus")
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var newdto={
                            name: this.addInfo.name,
                            begin:this.addInfo.begin,
                            end:this.addInfo.end,
                            weekday:this.addInfo.day.toString()
                        };

                        addTime(newdto).then((resp)=> {
                            if (resp.status == 'SUCCESS') {
                                this.$message({
                                    type: 'success',
                                    message: '新建时间配置成功！'
                                });
                                this.addVisible = false;
                                this.$emit('onChangeStatus');
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message({
                                    type:'warning',
                                    message:'新建时间配置失败！'
                                });
                            }
                        }).catch(e=> {
                            console.log("新建出错", e);
                        });


                    } else {

                        return false;
                    }
                });
            },
            resetForm(formName) {
                console.log(formName, '------');
                this.addVisible = false;
                this.$refs[formName].resetFields();
            },

        },
    }
</script>
