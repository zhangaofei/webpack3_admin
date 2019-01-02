<template>
    <div class="user-set public">
        <el-dialog
                title="新建-套餐设置"
                :visible.sync="addVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @close="handleClose"
        >
            <div class="">
                <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="104px" class="demo-ruleForm">
                    <el-form-item label="套餐名称" prop="name">
                        <el-input v-model="userInfo.name" placeholder="请输入套餐名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="适用用户组" prop="groupIds">
                        <el-select v-model="groupIds" multiple  class="el_sel" collapse-tags  placeholder="适用用户组">
                            <el-option v-for="item in groupList" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="套餐周期" prop="value" class="clearblock">
                        <el-input v-model="userInfo.value" placeholder="请输入套餐周期" class="package_put put_left"></el-input>
                        <el-select v-model="userInfo.unit" style="" class="put_right" placeholder="请输入套餐单位">
                            <el-option label="天" value="天"></el-option>
                            <el-option label="月" value="月"></el-option>
                            <el-option label="年" value="年"></el-option>
                            <el-option label="MB" value="MB"></el-option>
                            <el-option label="GB" value="GB"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="套餐金额" prop="price" class="clearblock">
                        <el-input v-model="userInfo.price" placeholder="请输入套餐金额" class="el_put put_left"></el-input>
                        <span class="money_unit">元</span>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span class="cancle btn_middle" @click="resetForm('userInfo')">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="submitForm('userInfo')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {groupAllList} from "../../../../../api/SSL_VPN/user_new/groupApi";
    import {addPackage} from "../../../../../api/SSL_VPN/accountManager/packageConfig";
    export default{
        components: {

        },
        data(){
            var name = (rule, value, callback) => {
                if (/^[\u4E00-\u9FA5A-Za-z0-9]{1,99}$/.test(value) == false) {
                    callback(new Error('请输入字母、数字、中文'));
                } else {
                    callback();
                }
            };
            var num = (rule, value, callback) => {
                if (/^\+?[1-9]\d*$/.test(value) == false) {
                    callback(new Error('请输入大于0的整数套餐周期'));
                } else if(value>2147483640){
                    callback(new Error('套餐周期过大'));
                } else {
                    callback();
                }
            };
            var value = (rule, value, callback) => {
                if (/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[0-9][0-9]*\.[0-9]+)|([0-9]*[0-9][0-9]*))$/.test(value) == false) {
                    callback(new Error('请输入大于等于0的套餐金额'));
                } else if(value>2147483640){
                    callback(new Error('套餐金额过大'));
                } else {
                    callback();
                }
            };
            var group = (rule, value, callback) =>{
                callback();
            }
            return {
                rules: {
                    name: [
                        {required: true,validator: name, trigger: 'blur' }
                    ],
                    price: [
                        {required: true,validator: value, trigger: 'blur' }
                    ],
                    value: [
                        {required: true,validator: num, trigger: 'blur' }
                    ],
                    groupIds: [
                        {required: true,validator: group, trigger: 'blur' }
                    ],
                },
                userInfo: {
                    name:'',
                    original:'',
                    price:'',
                    unit:'',
                    value:''
                },
                groupIds:[],
                addVisible:true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0,
                    searchContent:null
                },
                groupList:[],
            }
        },
        created(){
            this.getGroupList();
        },
        methods: {
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
                if(this.groupIds.length == 0){
                    this.$message({
                        type: 'warning',
                        message: '请选择用户组！'
                    });
                } else if(this.userInfo.unit == ''){
                    this.$message({
                        type: 'warning',
                        message: '请选择套餐周期单位！'
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            let ids= {
                                groupIds:this.groupIds.join(',')
                            }
                            addPackage(ids, this.userInfo).then(resp => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '新建成功！'
                                    });
                                    this.addVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs[formName].resetFields();
                                }
                            }).catch(error => {
                                console.log(error)
                            });
                        } else {
                            return false;
                        }
                    });
                }
            },
            getGroupList() {
                this.groupList = [];
                groupAllList(this.listQuery).then(response => {
                    const data = response.data;
                    this.groupList = data;
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            },
        }
    }

</script>
