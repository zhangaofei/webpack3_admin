<template>
    <div class="user-set public">
        <el-dialog
                title="新建域名日志"
                :visible.sync="addVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @close="handleClose"
        >
            <div class="user-form user_form">

                <el-form :model="info" :rules="rules" ref="info" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="主域名" prop="host" >
                        <el-input v-model.trim="info.host"  class="el_put" placeholder="主域名"></el-input>
                    </el-form-item>
                    <el-form-item label="从属域名" prop="subdomains" >
                        <div style="height: 250px;overflow-y: auto">
                            <el-table
                                    :data="info.subdomains"
                                    :header-cell-style="headerCellStyle"
                                    border
                                    cell-class-name="reset_input_width">
                                <el-table-column label="从属域名" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.host"  class="el_put" placeholder="从属域名"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column label="操作" align="center" width="140">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="small"
                                                class="btn_none_bg"
                                                @click="add()">
                                            <img src="../../../../assets/addIcon/add.png">
                                        </el-button>
                                        <span v-if="info.subdomains.length != 1">
                                                <el-button
                                                        size="small"
                                                        class="btn_none_bg"
                                                        @click="del(scope.$index,scope.row)">
                                                <img src="../../../../assets/addIcon/del.png">
                                            </el-button>
                                            </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>


                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span class="cancle" @click="resetForm('info')">取消</span>
                    <el-button type="primary" class="primary confirm btn_middle" @click="submitForm('info')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import {addAclBasicRule,getBreakRuleName,addBreakRule} from "@/api/SSL_VPN/accessControl/accessControl";
    import {groupAllList} from "@/api/SSL_VPN/user_new/groupApi";
    // domainLogAdd
    import {domainLogAdd} from "@/api/log/logApi";
    export default{
        data(){
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                rules: {
                    host:[
                        { required: true,message:'主域名不能为空', trigger: 'blur' },
                    ]
                },
                info: {
                    host:'',
                    describ:'',
                    subdomains:[
                        {host:''}
                    ]
                },
                addVisible:true,
            }
        },
        created(){
            this.getList();
        },
        methods: {
            getList(){
              
            },
            add(){
                this.info.subdomains.push(
                    {
                        host:'',
                    }
                )
            },
            del(index){
                this.info.subdomains.splice(index,1)
            },
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            resetForm(formName) {
                this.addVisible=false;
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs.info.validate((valid) => {
                    if (valid) {
                        domainLogAdd(this.info).then((resp)=>{
                            if(resp.status==1){
                                this.$message({
                                    type:'success',
                                    message:'添加成功！'
                                });
                                this.$emit('onChangeStatus');
                                this.$refs.info.resetFields();
                                this.addVisible=false;
                            }else {
                                this.$message({
                                    type:'warning',
                                    message:resp.msg
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>

