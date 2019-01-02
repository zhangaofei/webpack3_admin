<template>
    <div class="service public">
        <el-dialog
                title="查看服务设置"
                :visible.sync="addVisible"
                size="small"
                custom-class="dialog"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="admin-form">
                <el-form :model="info"  ref="info" label-width="95px" class="demo-ruleForm" MultipartFile :rules="rules">

                    <el-form-item label="服务名称 " prop="name">
                        <el-input v-model="info.name" :disabled="true" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="协议"   prop="protocal" class="item_mark">
                        <el-select v-model="info.protocal" :disabled="true"  class="el_putnum el_sel">
                            <el-option label="任何" value="all" key="all"></el-option>
                            <el-option label="tcp" value="tcp" key="tcp"></el-option>
                            <el-option label="udp" value="udp" key="udp"></el-option>
                        </el-select>
                    </el-form-item>


                    <span v-if="this.info.protocal=='all'">
                       <el-form-item label="端口号 "  prop="singlePort">
                        <el-input-number style="" v-model="info.singlePort"  type="number"  maxlength=65535 minlength=0 :disabled="true" class="el_putnum2 el_put" ></el-input-number>
                    </el-form-item>
                   </span>

                    <span v-else>
                        <el-form-item label=" "  prop="">
                        <el-table ref="multipleTable" :data="info.addPorts" :header-cell-style="headerCellStyle"  border tooltip-effect="dark" style="max-height: 206px;overflow-y: scroll;"
                                  @selection-change="handleSelectionChange">
                        <el-table-column label="起始端口" prop="begin" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.begin"  :disabled="true" class="route_put" ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="结束端口" prop="end" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.end" :disabled="true" class="route_put"></el-input>
                            </template>
                        </el-table-column>

                    </el-table>
                            </el-form-item>
                    </span>

                   
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class='foot' >
                    <el-button style="border-color: #D1D1D1;" class="reset_sure"
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
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                rules: {
                    name: [
                        {required: true, trigger: 'blur'}
                    ],

                    begin: [
                        {required: true, trigger: 'blur'}
                    ],
                    end: [
                        {required: true,trigger: 'blur'}
                    ],
                },
                info: {
                    name: '',
                    addPorts:[]
                },
                addVisible: true,

                multipleSelection: [],
                id:'',
                preName:''
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
                console.log('handleClose');
                this.changeStatus();
            },

            changeStatus(){
                this.$emit("onChangeStatus")
            },

            resetForm(formName) {
                console.log(formName, '------');
                this.addVisible = false;
                this.$refs[formName].resetFields();
            },

            doInit(currentData){

                console.log(currentData);
                let row = this.currentData;
                this.info.name = row.name;
                this.preName = row.name;
                this.id = row.id;

                this.info.protocal = row.protocal;
                if (row.protocal=='all'){
                    this.info.singlePort = row.ports;
                }else {
                    var portList =  row.ports.split(",");
                    for (let item of portList){
                        if (item.indexOf(":")<0){
                            this.info.addPorts.push({"begin":item,"end":item});
                        }else {
                            var v = item.split(":");
                            this.info.addPorts.push({"begin":v[0],"end":v[1]});
                        }

                    }
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

        },
    }
</script>
<style>

</style>