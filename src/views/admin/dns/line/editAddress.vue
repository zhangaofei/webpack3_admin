<template>
    <div class="address public">
        <el-dialog
                title="修改地址设置"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="address-form">
                <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="100px">
                    <el-form-item label="线路" prop="lineId">
                        <el-select v-model="editInfo.lineId"  placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="line in lineNameList"只要你
                                    :key="line.id"
                                    :label="line.chName"
                                    :value="line.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="区域" prop="areaId">
                        <el-select v-model="editInfo.areaId"  placeholder="请选择" class="el_sel">
                            <el-option
                                    v-for="region in regionNameList"
                                    :key="region.id"
                                    :label="region.name"
                                    :value="region.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="起始IP" prop="ipField1">
                        <el-input v-model="editInfo.ipField1" placeholder="请输入ipv4地址" class="el_put_1"></el-input>
                    </el-form-item>

                    <el-form-item label="结束IP" prop="ipField2">
                        <el-input v-model="editInfo.ipField2" placeholder="请输入ipv4地址" class="el_put_1"></el-input>
                    </el-form-item>

                    <el-form-item label="屏蔽" prop="isShield">
                        <el-radio-group v-model="editInfo.isShield"  class="el_put_1">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>


                    <el-form-item label="描述" prop="">
                        <el-input v-model="editInfo.description" placeholder="请输入描述" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="地址状态" prop="isStop">
                        <el-radio-group v-model="editInfo.isStop"  class="el_put_1">
                            <el-radio :label="false">启用</el-radio>
                            <el-radio :label="true">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>

                </el-form>
            </div>


            <div class='form-footer ' slot="footer" >
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
    import {updateAddress,getLineNameList,getRegionNameList} from 'api/enDNS/line';

    export default{
        data(){
            var validateIp = (rule, value, callback) =>
            {
                var ipReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                if (ipReg.test(value)==false){
                    callback(new Error("IP地址不正确"));
                }
                callback();
            };

            var validateSelect = (rule, value, callback) =>
            {
                if (value=='') {
                    callback(new Error("请选择"));
                }
                callback();
            };



            return {

                rules: {

                    lineId: [
                        {required: true, trigger: 'blur'}
                    ],
                    areaId: [
                        {required: true, trigger: 'blur'}
                    ],
                    ipField1: [
                        {required: true, validator: validateIp, trigger: 'blur'}
                    ],
                    ipField2: [
                        {required: true, validator: validateIp, trigger: 'blur'}
                    ],


                },

                editInfo: {
                    id:'',
                    lineId:'',
                    areaId:'',
                    ipField1:'',
                    ipField2:'',
                    isShield:'',
                    description:'',
                    isStop:''
                },
                editVisible: true,
                regionNameList:[],
                lineNameList:[]
            };

        },
        created(){
            this.getListForSelect();
            this.doInit(this.currentData);
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

            getListForSelect(){
                getRegionNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.regionNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });

                getLineNameList().then(response => {
                    if (response.status == 'SUCCESS'){
                        this.lineNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            updateAddress(this.editInfo).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '修改地址成功！'
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
                this.editInfo.id = row.id
                this.editInfo.lineId= row.lineId;
                this.editInfo.areaId = row.areaId;
                this.editInfo.ipField1 = row.ipField1;
                this.editInfo.ipField2 = row.ipField2;
                this.editInfo.isStop = row.isStop;
                this.editInfo.isShield = row.isShield;
                this.editInfo.description = row.description;
            },
            resetForm(formName) {
                this.editVisible = false;
                this.$refs['editInfo'].resetFields();
            }

        },
    }
</script>
<style>
    .address-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 130px;
    }

    .el_put {
        position: relative;
        width: 60% !important;
        margin-left: 20px;
    }

    .el_put_1 {
        position: relative;
        width: 60% !important;
        margin-left: 20px;
    }


    .el_sel {
        width: 60% !important;
        margin-left: 20px;
    }
</style>