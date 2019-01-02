<template>
    <div class="admin public">
        <el-dialog
                title="查看服务器节点"
                :visible.sync="editVisible"
                size="small"
                custom-class="dialog public"
                top="8%"
                @close="handleClose" @open="doInit(currentData)">
            <div class="admin-form">

                <el-tabs type="card"  v-model="activeName">
                    <el-tab-pane label="基本" name="first">
                        <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="142px" class="demo-ruleForm">
                            <el-form-item label="名称" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.name" placeholder="名称" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="IP地址" prop="">
                                <span style="color: red;position: absolute;left: 12px;">*</span>
                                <el-input v-model="editInfo.ipAddr" placeholder="IP地址" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="端口" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.port" placeholder="端口" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="权重" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.weight" placeholder="权重" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="健康检查" prop="">
                                <span style="color: red;position: absolute;left: -3px;">*</span>
                                <el-select v-model="editInfo.check" class="el_sel" placeholder="健康检查"
                                           popper-class="form-user-select" :disabled="true">
                                    <el-option label="FALSE" value="FALSE"></el-option>
                                    <el-option label="TRUE" value="TRUE"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="备份" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-select v-model="editInfo.backup" class="el_sel" placeholder="备份"
                                           popper-class="form-user-select" :disabled="true">
                                    <el-option label="FALSE" value="FALSE"></el-option>
                                    <el-option label="TRUE" value="TRUE"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Cookie值" prop="">
                                <el-input v-model="editInfo.cookie" placeholder="Cookie值" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="高级" name="second">
                        <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="0px" class="demo-ruleForm">
                            <el-form-item label="最大连接数" prop="">
                                <span style="color: red;position: absolute;left: 117px;">*</span>
                                <el-input v-model="editInfo.maxConn" placeholder="最大连接数" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="最大队列" prop="">
                                <span style="color: red;position: absolute;left:132px;">*</span>
                                <el-input v-model="editInfo.maxQueue" placeholder="最大队列" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="#次失败后终止" prop="">
                                <span style="color: red;position: absolute;left: 93px;">*</span>
                                <el-input v-model="editInfo.fall" placeholder="#次失败后终止" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="#次成功后启用" prop="">
                                <span style="color: red;position: absolute;left: 93px;">*</span>
                                <el-input v-model="editInfo.rise" placeholder="#次成功后启用" class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class='form-footer ' slot="footer" >
                <div class="foot">
                    <!--<span class="canle" @click="resetForm('editInfo')">取消</span>-->
                    <!--<el-button-->
                            <!--class="btn_save"-->
                            <!--type="primary"-->
                            <!--@click="submitForm('editInfo')">-->
                        <!--确定-->
                    <!--</el-button>-->
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {servernodeEdit} from '@/api/loadBalance/serverNode'
    export default{
        components: {},
        data(){
            return {
                checkListPort: [],
                isShow: false,
                isShowSub: false,
                val: '',
                rules: {

                },
                activeName: 'first',
                editInfo:{
                    id:'',
                    name:'',
                    ipAddr:'',
                    port:'',
                    weight:0,
                    check:'',
                    backup:'',
                    cookie:'',
                    maxConn:'',
                    maxQueue:'',
                    fall:'',
                    rise:'',
                },
                multipleSelection1: [],
                multipleSelection2: [],
                arrIndex:[],
                pswInfo: {
                    id: '',
                    password: '',
                    conpassword: ''
                },
                isExistUser: {
                    administratorId: '',
                    userName: ''
                },
                dialogVisible: false,
                editVisible: true,
            }
        },
        props: {
            currentData: Object,
        },
        created(){
            this.doInit(this.currentData);
            console.log(this.currentData,'currentData2')
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
                this.editInfo=currentData;
                this.editVisible = true;
            },
            toRight(){
                for(let i=0;i<this.multipleSelection1.length;i++){
                    this.tableData2.push(this.multipleSelection1[i]);
                }
            },
            toLeft(){
                for(let i=0;i<this.multipleSelection2.length;i++){
                    this.tableData1.push(this.multipleSelection2[i]);
                    this.tableData2.splice(i,1);
                }
                for(let i=0;i<this.tableData1.length;i++){
                    this.arrIndex.push(i);
                    console.log(i,'idnex')
                }
                console.log(this.tableData1,'tableData1_add',this.arrIndex);
            },
            submitForm(formName) {
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                servernodeEdit(this.editInfo).then((resp)=> {
                    if (resp.success == true) {
                        this.$message({
                            type: 'success',
                            message: '编辑成功！'
                        });
                        this.editVisible = false;
                        this.$emit('onChangeStatus');
                        this.$refs[formName].resetFields();
                    } else {
                        this.$message({
                            type:'warning',
                            message:resp.code.editInfo
                        });
                    }
                }).catch(e=> {
                    console.log("新建出错", e);
                });

                // }
                //     else {
                //
                //         return false;
                //     }
                // });
            },
            resetForm(formName) {
                console.log(formName, '------');
                this.editVisible = false;
                this.$refs[formName].resetFields();
            },
            validatorRange (val, regIp, regMask) {

            },
            handleSelectionChange1(val) {
                this.multipleSelection1 = val;
                console.log('val1:',val)
            },
            handleSelectionChange2(val) {
                this.multipleSelection2 = val;
                console.log('val2:',val)
            },
        }
    }
</script>
<style lang="scss">
    .checbox_20{
        margin-left: 20px;
    }
</style>
