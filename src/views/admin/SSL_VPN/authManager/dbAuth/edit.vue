<template>
    <div class="db-auth public">
        <el-dialog
                title="修改DB认证"
                :visible.sync="editVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">
            <div  class="db-form tab_form">
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="基础设置" name="first">
                        <el-form :model="authEditItem" :rules="rules" ref="authEditItem" label-width="142px" class="demo-ruleForm" >
                            <el-form-item label="认证名称" prop="authName"  class="el_lab item_mark">
                                <el-input v-model="authEditItem.authName"  class="el_put" placeholder="请输入认证名"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库类型" prop="authType" style="">
                                <el-select v-model="authEditItem.authType" @change="dbAuthType(authEditItem.authType)"  placeholder="请选择数据库类型" class="el_put" style="">
                                    <el-option label="Mysql" value="01" ></el-option>
                                    <el-option label="Oracle" value="02"></el-option>
                                    <el-option label="Sql server" value="03"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="主机名或IP地址" prop="authHostOrIp"  class="el_lab item_mark">
                                <el-input v-model="authEditItem.authHostOrIp"  class="el_put" placeholder="请输入主机名或IP地址"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库端口" prop="authPort"  class="el_lab item_mark">
                                <el-input v-model="authEditItem.authPort"  class="put_left" style="" :disabled="isAbledEdit" placeholder="请输入数据库端口"  ></el-input>
                                <el-checkbox v-model="checkPort" @change="changePort" style="">默认端口</el-checkbox>

                            </el-form-item>

                            <el-form-item label="数据库名称" prop="authDatabaseName"  class="el_lab item_mark">
                                <el-input v-model="authEditItem.authDatabaseName"  placeholder="请输入数据库名称" class="el_put"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库编码" prop="authEncoding" style="">
                                <el-select v-model="authEditItem.authEncoding" placeholder="请选择编码方式" class="el_put">
                                    <el-option label="UTF-8" value="UTF-8" ></el-option>
                                    <el-option label="UTF-16" value="UTF-16" ></el-option>
                                    <el-option label="UTF-32" value="UTF-32" ></el-option>
                                    <el-option label="GBK" value="GBK"></el-option>
                                    <el-option label="GB2312" value="GB2312"></el-option>
                                    <el-option label="ISO-8859" value="ISO-8859" ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据库用户名" prop="authUserName"  class="el_lab item_mark">
                                <el-input v-model="authEditItem.authUserName"   placeholder="请输入数据库用户名" class="el_put"></el-input>
                            </el-form-item>

                            <el-form-item label="数据库密码" prop="authPassword"  class="el_lab item_mark">
                                <el-input v-model="authEditItem.authPassword"   class="el_put" type="password"  placeholder="请输入数据库密码"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="用户设置" name="second">
                        <el-form :model="authEditItem" :rules="rules" ref="authEditItem" label-width="142px" class="demo-ruleForm">
                            <!--<el-form :model="authEditItem" :rules="rules" ref="authEditItem" label-width="100px" class="demo-ruleForm">-->
                            <el-form-item label="数据表名" prop="authUserSetDTO.tableName"  class="el_lab item_mark" >
                                <el-input v-model="authEditItem.authUserSetDTO.tableName"   class="el_put" placeholder="请输入数据表名"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名字段" prop="authUserSetDTO.userName"  class="el_lab item_mark" >
                                <el-input v-model="authEditItem.authUserSetDTO.userName"   class="el_put" placeholder="请输入用户名字段"></el-input>
                            </el-form-item>
                            <el-form-item label="密码字段" prop="authUserSetDTO.password" class="item_mark clearblock">
                                <el-input v-model="authEditItem.authUserSetDTO.password"
                                          placeholder="请输入密码字段" style="" class="put_left"></el-input>
                                <el-select v-model="authEditItem.authUserSetDTO.passwordType" placeholder="加密方式" class="put_right"  style="" >
                                    <el-option label="明文" value="PLAINTEXT" ></el-option>
                                    <el-option label="MD5" value="MD5"></el-option>
                                    <el-option label="SHA-1" value="SHA-1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="用户全名字段" prop="authUserSetDTO.fullName"  class="el_lab" >
                                <el-input v-model="authEditItem.authUserSetDTO.fullName" class="el_put" placeholder="请输入用户全名字段"></el-input>
                            </el-form-item>
                            <el-form-item label="手机字段" prop="authUserSetDTO.phone" class="el_lab" >
                                <el-input v-model="authEditItem.authUserSetDTO.phone" class="el_put" placeholder="请输入手机字段"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱字段" prop="authUserSetDTO.email" class="el_lab" >
                                <el-input v-model="authEditItem.authUserSetDTO.email" class="el_put" placeholder="请输入邮箱字段"></el-input>
                            </el-form-item>
                            <el-form-item label="查询条件"  class="el_lab" >
                                <span style="position: absolute;top: 16px;right: -39px;" @click="add()"> <img src="../../../../../assets/addIcon/add.png"></span>
                                <el-table
                                        :data="authEditItem.searchConditionList"
                                        :header-cell-style="headerCellStyle"
                                        border
                                        style="">
                                    <el-table-column
                                            label="字段名" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.filedName"  class=""  placeholder="字段名"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="选择条件" align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.searchType" placeholder="请选择"  style="">
                                                <el-option
                                                        v-for="item in searchType"
                                                        :key="item.name"
                                                        :label="item.name"
                                                        :value="item.id">
                                                </el-option>
                                               <!-- <el-option label="" value=""></el-option>
                                                <el-option label="精确" value="1"></el-option>
                                                <el-option label="模糊" value="0"></el-option>-->
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="值" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.fieldValue"  class=""  placeholder="请输入值"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="操作" align="center" width="160">
                                        <template slot-scope="scope">
                                            <!--<el-button
                                                    size="small"
                                                    class="btn_none_bg"
                                                    @click="add()"> <img src="../../../../../assets/addIcon/add.png">
                                            </el-button>-->
                                            <span>
                                                <el-button
                                                        size="small"
                                                        class="btn_none_bg"
                                                        @click="del(scope.$index,scope.row)"><img src="../../../../../assets/addIcon/del.png">
                                            </el-button>
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span @click="resetForm('authEditItem')" class="cancle btn_middle">取消</span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="submitEditForm('authEditItem')">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {codeMessage} from "utils/codes"
    import {notifyFault} from "utils/notify"
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
                rules: {},
                isAbledEdit:false,
                authEditItem:{
                    id:'',
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
                        /*{
                            "filedName": "",
                            "searchType": null,
                            "fieldValue": ""
                        }*/
                    ]
                },
                searchType: [{id: 1, name: '精确', value: '精确'}, {id: 0, name: '模糊', value: '模糊'}],
                checkPort:false,
                editVisible:true,
                activeName:'first',
                multipleSelection: [],
                namechecked:true,
                ipchecked:true
            }
        },
        props: {
            currentData: Object
        },
        created(){
            this.doInit(this.currentData)
        },
        methods: {
            dbAuthType(val){
                if(this.isAbledEdit==true){
                    if(val=='01'){
                        this.authEditItem.authPort=3306;
                    }else if(val=='02'){
                        this.authEditItem.authPort=1521;
                    }else {
                        this.authEditItem.authPort=1433
                    }
                }
            },
            changePort(){
                if(this.checkPort==true){
                    if(this.authEditItem.authType=='01'){
                        this.authEditItem.authPort=3306;
                    }else if(this.authEditItem.authType=='02'){
                        this.authEditItem.authPort=1521;
                    }else {
                        this.authEditItem.authPort=1433
                    }
                    this.isAbledEdit=true
                }else{
                    this.isAbledEdit=false
                }
            },
            validated(){
                if(this.authEditItem.authName==''){
                    this.$message({
                        type:'warning',
                        message:'认证名不能为空！'
                    });
                    return false;
                }
                if(this.authEditItem.authType==''){
                    this.$message({
                        type:'warning',
                        message:'数据库类型不能为空！'
                    });
                    return false;
                }

                if(this.authEditItem.authHostOrIp==''){
                    this.$message({
                        type:'warning',
                        message:'主机名或IP地址不能为空！'
                    });
                    return false;
                }
                if(/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.authEditItem.authPort)==false){
                    this.$message({
                        type:'warning',
                        message:'数据库端口在1-65535范围内！'
                    });
                    return false;
                }

                if(this.authEditItem.authDatabaseName==''){
                    this.$message({
                        type:'warning',
                        message:'数据库名称不能为空！'
                    });
                    return false;
                }

                if(this.authEditItem.authUserName==''){
                    this.$message({
                        type:'warning',
                        message:'数据库用户名不能为空！'
                    });
                    return false;
                }

                if(this.authEditItem.authPassword==''){
                    this.$message({
                        type:'warning',
                        message:'数据库密码不能为空！'
                    });
                    return false;
                }

                if(this.authEditItem.authUserSetDTO.tableName==''){
                    this.$message({
                        type:'warning',
                        message:'数据表名不能为空！'
                    });
                    return false;
                }

                if(this.authEditItem.authUserSetDTO.userName==''){
                    this.$message({
                        type:'warning',
                        message:'用户名字段不能为空！'
                    });
                    return false;
                }

                if(this.authEditItem.authUserSetDTO.password==''){
                    this.$message({
                        type:'warning',
                        message:'密码字段不能为空！'
                    });
                    return false;
                }
                return true

            },
            
            handleClose() {
                this.$emit("onChangeStatus");
            },
            getCondition(id){
                getCondition(id).then((resp) => {
                    if (resp.status == 'SUCCESS') {
                        if(resp.data.length>0){
                            this.authEditItem.searchConditionList = resp.data
                        }
                    }
                }).catch(e => {
                    console.log("获取查询条件出错", e);
                });
            },
            doInit(currentData){
                console.log('edit:',currentData)
                let row=currentData;
//                this.$nextTick(function () {
//                    console.log(this.$refs)
                    this.getCondition(row.id)
               // })
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
                if(currentData.authPort==3306){
                    this.checkPort=true;
                    this.isAbledEdit=true;
                }else {
                    this.checkPort=false;
                    this.isAbledEdit=false;
                }
            },
            add(){
                this.authEditItem.searchConditionList.push(
                    {
                        "filedName": "",
                        "searchType": null,
                        "fieldValue": ""
                    })
            },
            del(index,row){
                this.authEditItem.searchConditionList.splice(index,1)
               /* if(this.authEditItem.searchConditionList.length == 1) {

                } else {
                    this.authEditItem.searchConditionList.splice(index,1)
                }*/

            },

            submitEditForm(formName){
                    this.$refs[formName].validate((valid) => {
                        if (this.validated()) {
                            let flag = true;
                            let item = {
                                id: this.authEditItem.id,
                                authName: this.authEditItem.authName,
                                authType: this.authEditItem.authType,
                                authHostOrIp: this.authEditItem.authHostOrIp,
                                authPort: this.authEditItem.authPort,
                                authDatabaseName: this.authEditItem.authDatabaseName,
                                authEncoding: this.authEditItem.authEncoding,
                                authUserName: this.authEditItem.authUserName,
                                authPassword: this.authEditItem.authPassword,
                                authUserSetDTO: this.authEditItem.authUserSetDTO,
                                searchConditionList: this.authEditItem.searchConditionList
                            };
                           /* for(let sub of item.searchConditionList){
                                if(sub.filedName===''&&sub.searchType===''&&sub.fieldValue===''){
                                    item.searchConditionList=[];
                                }else if(sub.filedName&&sub.searchType&&sub.fieldValue){
                                    // console.log('searchConditionList',item.searchConditionList);
                                }else {
                                    this.$message({
                                        type: 'warning',
                                        message: '查询条件不完整！'
                                    });
                                    return false;
                                }
                            }*/

                           /* for(let i=0;i<item.searchConditionList.length;i++){
                                if(item.searchConditionList[i].filedName===''&&item.searchConditionList[i].searchType===''&&item.searchConditionList[i].fieldValue===''){
                                    item.searchConditionList=item.searchConditionList.splice(i,1);
                                    console.log(item.searchConditionList[i])
                                } else if(item.searchConditionList[i].filedName&&item.searchConditionList[i].searchType&&item.searchConditionList[i].fieldValue){
                                    // console.log('searchConditionList',item.searchConditionList);
                                }else {
                                    this.$message({
                                        type: 'warning',
                                        message: '查询条件不完整！'
                                    });
                                    return false;
                                }
                            }*/
                            /**/
                           /* for (let i = 0; i < item.searchConditionList.length; i++) {
                                if(item.searchConditionList[i].searchType==='') {
                                    flag = false;
                                    break;
                                }
                            }*/

                            /*if(!flag && item.searchConditionList.length > 1) {
                                this.$message({
                                    type: 'error',
                                    message: '请选择查询条件，选择条件不能为空！'
                                });
                                return false;
                            } else*/
                           /* if(
                                item.searchConditionList.length == 1
                                && item.searchConditionList[0].searchType == ''
                                && item.searchConditionList[0].fieldValue == ''
                                && item.searchConditionList[0].fieldValue == ''
                            ){
                                item.searchConditionList = null;
                            }*/
                            editAuths(item).then((resp) => {
                                if (resp.status == 'SUCCESS') {
                                    this.$message({
                                        type: 'success',
                                        message: '编辑DB成功！'
                                    });
                                    this.editVisible = false;
                                    this.$emit('onChangeStatus');
                                    this.$refs[formName].resetFields();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: resp.code.info
                                    });
                                }
                            }).catch(e => {
                                console.log("编辑DB出错", e);
                            });


                        } else {
                            return false;
                        }
                    });
            },
            resetForm(formName) {
                this.editVisible=false;
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .public .el_put{
        width: 65%;
    }
    .public .el_sel{
        width: 65%;
    }
</style>
