<template>
    <div class="user-set public">
        <el-dialog
                title="查看域名日志"
                :visible.sync="editVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @close="handleClose"
        >
            <div class="user-form user_form">

                <el-form :model="info" :rules="rules" ref="info" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="主域名" prop="host" >
                        <el-input v-model.trim="info.host"  class="el_put" placeholder="主域名" :disabled="true"></el-input>
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
                                        <el-input v-model.trim="scope.row.host"  class="el_put" placeholder="从属域名" :disabled="true"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>


                </el-form>
            </div>
            <div class='form-footer ' slot="footer"  >

            </div>
        </el-dialog>

    </div>
</template>
<script>
    import {domainLogEdit,getDomainLogEditList} from "@/api/log/logApi";
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
                    id:'',
                    host:'',
                    describ:'',
                    subdomains:[
                        {
                            host:'',
                            describ:''
                        }
                    ]
                },
                editVisible:true,
            }
        },
        props:['currentData'],
        created(){
            this.info.host=this.currentData.host;
            this.info.describ=this.currentData.describ;
            this.info.id=this.currentData.id;
            this.getList();
        },
        methods: {
            getList(){
                getDomainLogEditList({pid:this.info.id}).then((resp)=>{
                    if(resp.status==1){
                        if(resp.data.items.length>0){
                            this.info.subdomains=resp.data.items
                        }
                    }else {
                        this.$message({
                            type:'warning',
                            message:resp.msg
                        });
                    }
                })
            },
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.editVisible = false
            }
        }
    }
</script>

