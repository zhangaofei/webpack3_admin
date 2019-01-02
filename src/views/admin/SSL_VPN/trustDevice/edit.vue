<template>
    <div class="router public">
        <el-dialog
                title="修改全局可信设备"
                :visible.sync="editVisible"
                size="small"
                custom-class="public dialog"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div  class="router-form">
                <el-form  ref="info" label-width="" class="demo-ruleForm" MultipartFile>
                    <el-table
                            ref="multipleTable"
                            :data="editDeviceData"
                            :header-cell-style="headerCellStyle"
                            border
                            tooltip-effect="dark"
                            style="width: 100%;max-height: 206px;overflow-y: scroll"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                label="设备类型"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.termType" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="硬件特征码"
                                align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.hdName" ref="hdName" placeholder="请输入"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="描述"
                                align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.remark" placeholder="请输入描述"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span class="canle" @click="resetForm('info')">
                        取消
                    </span>
                    <el-button
                            class="btn_save"
                            type="primary"
                            @click="submitForm('info')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getDeviceList,getDeviceAdd,getDeviceEdit,getDeviceDelete} from "api/SSL_VPN/trustDevice/trustDevice";
    export default {
        data(){
            return{
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                editVisible:true,
                editDeviceData:[],
                options: [{
                    value: 'All',
                    label: 'All'
                },{
                    value: 'Windows',
                    label: 'Windows'
                }, {
                    value: 'Mac',
                    label: 'Mac'
                }, {
                    value: 'Android',
                    label: 'Android'
                }, {
                    value: 'iPhone',
                    label: 'iPhone'
                }, {
                    value: 'iPad',
                    label: 'iPad'
                }],
            }
        },
        props:['currentData'],
        created(){
            this.doInit(this.currentData);
        },
        methods:{
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.editVisible = false
            },
            doInit(currentData){
                this.editVisible = true;
                this.editDeviceData.push(currentData);
                console.log(this.editDeviceData[0],'edit')

            },
            deviceAdd(){
                this.editDeviceData.push({
                    termType: '',
                    hdName: '',
                    remark: '',
                })
            },
            deviceDel(index,row){
                this.editDeviceData.splice(index,1)
            },
            resetForm(formName) {
                this.editVisible=false;
                this.$refs[formName].resetFields();
            },
            validated(){
                if(this.$refs.hdName.value==''){
                    this.$message({
                        type:'warning',
                        message:'硬件特征码不能为空!'
                    });
                    return false
                }
                return true
            },
            submitForm(formName) {
                if(this.validated()){
                    getDeviceEdit(this.editDeviceData[0]).then((resp)=>{
                        if(resp.status=="SUCCESS"){
                            this.$message({
                                type:'success',
                                message:'编辑成功！'
                            });
                            this.$emit('onChangeStatus');
                            this.$refs[formName].resetFields();
                            this.editVisible=false;

                        }else {
                            this.$message({
                                type:'warning',
                                message:resp.code.info
                            });
                        }
                    }).catch((e)=>{
                        console.log("编辑出错：",e);
                    });
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        }
    }
</script>

<style scoped>

</style>