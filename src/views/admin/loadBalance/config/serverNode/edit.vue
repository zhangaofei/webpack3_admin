<template>
    <div class="admin public">
        <el-dialog
                title="修改服务器节点"
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
                                <el-input v-model="editInfo.name" placeholder="名称" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="IP地址" prop="">
                                <span style="color: red;position: absolute;left: 12px;">*</span>
                                <el-input v-model="editInfo.ipAddr" placeholder="IP地址" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="端口" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.port" placeholder="端口" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="权重" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-input v-model="editInfo.weight" placeholder="权重" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="健康检查" prop="">
                                <span style="color: red;position: absolute;left: -3px;">*</span>
                                <el-select v-model="editInfo.check" class="el_sel" placeholder="健康检查"
                                           popper-class="form-user-select">
                                    <el-option label="FALSE" value="FALSE"></el-option>
                                    <el-option label="TRUE" value="TRUE"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="备份" prop="">
                                <span style="color: red;position: absolute;left: 27px;">*</span>
                                <el-select v-model="editInfo.backup" class="el_sel" placeholder="备份"
                                           popper-class="form-user-select">
                                    <el-option label="FALSE" value="FALSE"></el-option>
                                    <el-option label="TRUE" value="TRUE"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Cookie值" prop="">
                                <el-input v-model="editInfo.cookie" placeholder="Cookie值" class="el_put"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="高级" name="second">
                        <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="0px" class="demo-ruleForm">
                            <el-form-item label="最大连接数" prop="">
                                <span style="color: red;position: absolute;left: 117px;">*</span>
                                <el-input v-model="editInfo.maxConn" placeholder="最大连接数" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="最大队列" prop="">
                                <span style="color: red;position: absolute;left:132px;">*</span>
                                <el-input v-model="editInfo.maxQueue" placeholder="最大队列" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="#次失败后终止" prop="">
                                <span style="color: red;position: absolute;left: 93px;">*</span>
                                <el-input v-model="editInfo.fall" placeholder="#次失败后终止" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="#次成功后启用" prop="">
                                <span style="color: red;position: absolute;left: 93px;">*</span>
                                <el-input v-model="editInfo.rise" placeholder="#次成功后启用" class="el_put"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class='form-footer ' slot="footer" >
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('editInfo')">取消</span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
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
                arrIndex:[],
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
                // this.editVisible = true;
            },
            validate(){
                //基本
                if (this.editInfo.name == '') {
                    this.$message({
                        type: 'warning',
                        message: '名称不能为空！'
                    });
                    return false
                }

                if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(this.editInfo.ipAddr) == false){
                    this.$message({
                        type: 'warning',
                        message: '请输入正确的IP地址！'
                    });
                    return false
                }
                if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.editInfo.port) == false) {
                    this.$message({
                        type: 'warning',
                        message: '端口为1-65535之间的数字！'
                    });
                    return false
                }
                if (/^\d+$/.test(this.editInfo.weight) == false) {
                    this.$message({
                        type: 'warning',
                        message: '权重为数字！'
                    });
                    return false
                }
                //高级
                if (/^\d+$/.test(this.editInfo.maxConn) == false) {
                    this.$message({
                        type: 'warning',
                        message: '最大连接数为数字！'
                    });
                    return false
                }
                if (/^\d+$/.test(this.editInfo.maxQueue) == false) {
                    this.$message({
                        type: 'warning',
                        message: '最大队列为数字！'
                    });
                    return false
                }
                if (/^\d+$/.test(this.editInfo.maxQueue) == false) {
                    this.$message({
                        type: 'warning',
                        message: '失败后终止为数字！'
                    });
                    return false
                }
                if (/^\d+$/.test(this.editInfo.rise) == false) {
                    this.$message({
                        type: 'warning',
                        message: '成功后启用为数字！'
                    });
                    return false
                }
                return true

            },
            submitForm(formName) {
                if (this.validate()) {
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
                                message:resp.message
                            });
                        }
                    }).catch(e=> {
                        console.log("编辑出错", e);
                    });

                }
            },
            resetForm(formName) {
                console.log(formName, '------');
                this.editVisible = false;
                this.$refs[formName].resetFields();
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
