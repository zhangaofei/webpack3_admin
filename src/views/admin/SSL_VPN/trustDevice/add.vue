<template>
    <div class="router public">
        <el-dialog
                title="新增全局可信设备"
                :visible.sync="addVisible"
                size="small"
                custom-class="public dialog"
                top="10%"
                @close="handleClose">
            <div  class="router-form">
                <el-form  ref="info" label-width="" class="demo-ruleForm" MultipartFile>
                    <el-table
                            ref="multipleTable"
                            :data="addDeviceData"
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
                                <el-input v-model="scope.row.hdName" ref="hdName" placeholder="请输入" class="route_put netMasks"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="描述"
                                align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.remark"  placeholder="请输入描述" class="route_put gateways"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作" align="center" style="text-align: center" width="160">
                            <template slot-scope="scope">
                                <el-button
                                        size="small"
                                        class="btn_none_bg"
                                        @click="deviceAdd()"> <img src="../../../../assets/addIcon/add.png">
                                </el-button>
                                <span v-if="addDeviceData.length != 1">
                                    <el-button
                                            size="small"
                                            class="btn_none_bg"
                                            @click="deviceDel(scope.$index,scope.row)"><img src="../../../../assets/addIcon/del.png">
                                    </el-button>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('info')">
                        取消
                    </span>
                    <el-button
                            class="primary confirm btn_middle"
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
                addVisible:true,
                addDeviceData:[
                        {
                            termType: 'All',
                            hdName: '',
                            remark: ''
                        }
                    ],
                options: [{
                    value: 'All',
                    label: 'All'
                },{
                    value: 'Windows',
                    label: 'Windows'
                }, {
                    value: 'MacOS',
                    label: 'MacOS'
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
        created(){

        },
        methods:{
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            deviceAdd(){
                this.addDeviceData.push({
                    termType: 'All',
                    hdName: '',
                    remark: '',
                })
            },
            deviceDel(index,row){
                this.addDeviceData.splice(index,1)
            },
            resetForm(formName) {
                this.addVisible=false;
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
                   getDeviceAdd(this.addDeviceData).then((resp)=>{
                       if(resp.status=="SUCCESS"){
                           this.$message({
                               type:'success',
                               message:'新建成功！'
                           });

                           this.$emit('onChangeStatus');
                           this.$refs[formName].resetFields();
                           this.addVisible=false;

                       }else {
                           this.$message({
                               type:'warning',
                               message:resp.code.info
                           });
                       }
                   }).catch((e)=>{
                       console.log("新建出错：",e);
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
    .el-table--border::after, .el-table--group::after, .el-table::before {//解决出现横线的问题
        content: '';
        position: absolute;
        background-color: #ebeef5;
        z-index: 0;
    }
</style>