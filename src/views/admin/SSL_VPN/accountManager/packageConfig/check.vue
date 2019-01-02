<template>
    <div class="user-set public">
        <el-dialog
                title="查看-套餐设置"
                :visible.sync="addVisible"
                custom-class="dialog public"
                top="5%"
                size="small"
                @open="doInit(currentData)"
                @close="handleClose"
        >
            <div class="">
                <el-form :model="userInfo" ref="userInfo" label-width="104px" :rules="rules" class="demo-ruleForm">
                    <el-form-item label="套餐名称" prop="name">
                        <el-input v-model="userInfo.name" :disabled="true" placeholder="请输入套餐名称" class="el_put"></el-input>
                    </el-form-item>

                    <el-form-item label="适用用户组" prop="groupIds">
                        <el-select v-model="groupIds" multiple collapse-tags  placeholder="适用用户组" class="el_sel">
                            <el-option v-for="item in groupList" :disabled="true" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="套餐周期" prop="value" class="clearblock">
                        <el-input v-model="userInfo.value" :disabled="true" placeholder="请输入套餐周期" style="" class="package_put put_left"></el-input>
                        <el-select v-model="userInfo.unit" :disabled="true" style="" class="put_right" placeholder="请输入套餐单位">
                            <el-option label="天" value="天"></el-option>
                            <el-option label="月" value="月"></el-option>
                            <el-option label="年" value="年"></el-option>
                            <el-option label="MB" value="MB"></el-option>
                            <el-option label="GB" value="GB"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="套餐金额" prop="price" class="clearblock">
                        <el-input v-model="userInfo.price" :disabled="true" placeholder="请输入套餐金额" class="el_put put_left"></el-input>
                        <span class="money_unit">元</span>
                    </el-form-item>
                </el-form>
            </div>
            <div class='form-footer ' slot="footer"></div>
        </el-dialog>
    </div>
</template>

<script>
    import {groupAllList} from "../../../../../api/SSL_VPN/user_new/groupApi";
    import {editPackage, getPackageGroup} from "../../../../../api/SSL_VPN/accountManager/packageConfig";
    export default{
        components: {

        },
        data(){
            return {
                rules: {
                    name: [
                        {required: true }
                    ],
                    price: [
                        {required: true }
                    ],
                    value: [
                        {required: true }
                    ],
                    groupIds: [
                        {required: true }
                    ],
                },
                userInfo: {
                    id:'',
                    name:'',
                    original:'',
                    price:'',
                    unit:'',
                    value:''
                },
                getInfo:{
                    packageId:'',
                    isUsedPackage:true
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
                selectedGroupList:[]
            }
        },
        props: {
            currentData: Object
        },
        created(){
            this.getGroupList();
            this.doInit(this.currentData);
        },

        methods: {
            doInit(Data){
                this.userInfo=Data;
                this.getInfo.packageId = Data.id;
                this.addVisible=true
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
            getGroupList() {
                this.groupList = [];
                groupAllList(this.listQuery).then(response => {
                    const data = response.data;
                    this.groupList = data;
                    this.getSelectedGroupList();
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            },
            getSelectedGroupList() {
                getPackageGroup(this.getInfo).then(response => {
                    this.selectedGroupList = response.data;
                    for(let i = 0; i < response.data.length; i++){
                        this.groupIds.push(response.data[i].id);
                    }
                }).catch((e) => {
                    console.log("获取组数据发生错误：",e)
                });
            },
        }
    }

</script>


