<template>
    <div class="db-auth public">
        <el-dialog
                title="查看DB认证"
                :visible.sync="editVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div  class="db-form tab_form">
                <el-tabs v-model="activeName" type="border-card" >
                    <el-tab-pane label="基础设置" name="first">
                        <el-form :model="authEditItem" :rules="rules" ref="authEditItem" label-width="142px" class="demo-ruleForm" >
                            <el-form-item label="认证名称" prop="authName"  class="el_lab">
                                <el-input v-model="authEditItem.authName"  class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库类型" prop="authType">
                                <el-select v-model="authEditItem.authType" :disabled="true" class="el_put" style="">
                                    <el-option label="Mysql" value="01" ></el-option>
                                    <el-option label="Oracle" value="02"></el-option>
                                    <el-option label="Sql server" value="03"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="主机名或IP地址" prop="authHostOrIp"  class="el_lab">
                                <el-input v-model="authEditItem.authHostOrIp"  class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库端口" prop="authPort"  class="el_lab">
                                <!--@change="changePut"-->
                                <el-input v-model="authEditItem.authPort"  class="put_left" style="" :disabled="true"></el-input>
                                <el-checkbox v-model="checkPort" @change="changePort" style="" :disabled="true" v-if="false">默认端口</el-checkbox>

                            </el-form-item>

                            <el-form-item label="数据库名称" prop="authDatabaseName"  class="el_lab">
                                <el-input v-model="authEditItem.authDatabaseName"  class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库编码" prop="authEncoding" style="">
                                <el-select v-model="authEditItem.authEncoding" :disabled="true" class="el_put">
                                    <el-option label="UTF-8" value="UTF-8" ></el-option>
                                    <el-option label="UTF-16" value="UTF-16" ></el-option>
                                    <el-option label="UTF-32" value="UTF-32" ></el-option>
                                    <el-option label="GBK" value="GBK"></el-option>
                                    <el-option label="GB2312" value="GB2312"></el-option>
                                    <el-option label="ISO-8859" value="ISO-8859" ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据库用户名" prop="authUserName"  class="el_lab">
                                <el-input v-model="authEditItem.authUserName" :disabled="true" class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="数据库密码" prop="authPassword"  class="el_lab">
                                <el-input v-model="authEditItem.authPassword"  class="el_put" type="password"  :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="用户设置" name="second">
                        <el-form :model="authEditItem" :rules="rules" ref="authEditItem" label-width="142px" class="demo-ruleForm">
                            <!--<el-form :model="authEditItem" :rules="rules" ref="authEditItem" label-width="100px" class="demo-ruleForm">-->
                            <el-form-item label="数据表名" prop="authUserSetDTO.tableName"  class="el_lab" >
                                <el-input v-model="authEditItem.authUserSetDTO.tableName"  class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名字段" prop="authUserSetDTO.userName"  class="el_lab" >
                                <el-input v-model="authEditItem.authUserSetDTO.userName"  class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="密码字段" prop="authUserSetDTO.password" class="clearblock">
                                <el-input v-model="authEditItem.authUserSetDTO.password"
                                          :disabled="true" style="" class="put_left"></el-input>
                                <el-select v-model="authEditItem.authUserSetDTO.passwordType" :disabled="true" class="put_right"  style="" >
                                    <el-option label="明文" value="PLAINTEXT" ></el-option>
                                    <el-option label="MD5" value="MD5"></el-option>
                                    <el-option label="SHA-1" value="SHA-1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="用户全名字段" prop="authUserSetDTO.fullName"  class="el_lab" >
                                <el-input v-model="authEditItem.authUserSetDTO.fullName"   class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="手机字段" prop="name"  class="el_lab" >
                                <el-input v-model="authEditItem.authUserSetDTO.phone"  class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱字段" prop="name"  class="el_lab" >
                                <el-input v-model="authEditItem.authUserSetDTO.email"   class="el_put" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="查询条件"  class="el_lab" >
                                <el-table
                                        :data="authEditItem.searchConditionList"
                                        :header-cell-style="headerCellStyle"
                                        border
                                        style="">
                                    <el-table-column
                                            label="字段名" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.filedName"  class=""  :disabled="true"></el-input>

                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="选择条件" align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.searchType" :disabled="true"  style="width:120px;">
                                                <el-option
                                                        v-for="item in searchType"
                                                        :key="item.name"
                                                        :label="item.name"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="值" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.fieldValue" :disabled="true"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class='form-footer foot' slot="footer" >
                <!--<span @click="handleClose" class="canle">返回</span>-->
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
    import {mapGetters} from 'vuex'
    import {editAuths, getCondition} from "../../../../../api/SSL_VPN/new_authManager/new_auth";

    export default{
        components: {
        },

        data(){
            let port = (rule, value, callback) => {
                if (/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value) == false) {
                    callback(new Error('请输入1-65535之间的数字'));
                } else {
                    callback();
                }
            };
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                checkPort:false,
                searchType: [{id: 1, name: '精确', value: '精确'}, {id: 0, name: '模糊', value: '模糊'}],
                rules: {
                    authName: [
                        {required: true,message:'认证名不能为空',trigger: 'blur'}
                    ],
                    authHostOrIp:[
                        {required: true, message:'主机名或IP地址不能为空', trigger: 'blur' }
                    ],
                    authPort: [
                        {required: true, validator: port, trigger: 'blur'}
                    ],
                    authDatabaseName: [
                        {required: true, message:'数据库名称不能为空', trigger:'blur'}
                    ],
                    authUserName:[
                        {required: true,message:'数据库用户名不能为空', trigger: 'blur' }
                    ],
                    authPassword:[
                        {required: true,message:'数据库密码不能为空', trigger: 'blur' }
                    ],
                    'authUserSetDTO.tableName':[
                        {required: true,message:'数据库表名不能为空', trigger: 'blur' }
                    ],
                    'authUserSetDTO.userName':[
                        {required: true,message:'用户名不能为空', trigger: 'blur' }
                    ],
                    'authUserSetDTO.password':[
                        {required: true,message:'密码不能为空',  trigger: 'blur' }
                    ]
                },
                authEditItem:{
                    id:'',
                    isAbledEdit:false,
                    authName:'',
                    authType: '',
                    authHostOrIp: '',
                    authPort: '',
                    authDatabaseName: '',
                    authEncoding:'',
                    authUserName:'',
                    authPassword: '',
                    authUserSetDTO:{
                        tableName:'',
                        userName:'',
                        password: '',
                        passwordType:'',
                        fullName: '',
                        email : '',
                        phone:'',
                    },
                    Radios:{radio:''},
                    searchConditionList:[
                       /* {
                            "filedName": "",
                            "searchType": null,
                            "fieldValue": ""
                        }*/
                    ]
                },
                editVisible:true,
                activeName:'first',
                multipleSelection: []
            }
        },
        props: {
            currentData: Object
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            changeStatus() {
                this.$emit("onChangeStatus")
            },
            handleClose() {
                this.changeStatus();
            },
            getCondition(id){
                getCondition(id).then((resp) => {
                    if (resp.status == 'SUCCESS') {

                        this.authEditItem.searchConditionList = resp.data
                        console.log("结果：",this.searchConditionList)
                    }
                }).catch(e => {
                    console.log("获取查询条件出错", e);
                });
            },
            doInit(currentData){
                let row=currentData;
                this.getCondition(row.id)
                var searchCondition =[]
                let item={
                    id:row.id,
                    authName:row.authName,
                    authType:row.authType,
                    authHostOrIp:row.authHostOrIp  ,
                    authPort:row.authPort,
                    authDatabaseName:row.authDatabaseName,
                    authEncoding:row.authEncoding,
                    authUserName:row.authUserName,
                    authPassword:row.authPassword,
                    authUserSetDTO: row.authUserSetDTO,
                    searchConditionList:this.authEditItem.searchConditionList
                };
                this.authEditItem=item;
            },

            changePort(){
                if(this.checkPort){
                    this.authEditItem.authPort='3306';
                    this.authEditItem.isAbledEdit=true
                }else{
                    this.authEditItem.isAbledEdit=false
                }
            }
        }
    }
</script>
<style scoped>
    .db-auth .el-table td, .el-table th{
        padding: 3px 0!important;
    }
    .db-auth  .el-table_1_column_13{
        padding:0 17px!important;
    }
    .public .el_put{
        width: 65%;
    }
    .public .el_sel{
        width: 65%;
    }
</style>
