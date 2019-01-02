<template>
    <div class="db-auth public">
        <el-dialog
                title="新建DB认证"
                :visible.sync="addVisible"
                custom-class="dialog public"
                size="small"
                top="10%"
                @close="handleClose"
                >
            <div  class="db-form tab_form">
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="基础设置" name="first">
                        <el-form :model="authAddItem" :rules="rules" ref="authAddItem" label-width="142px" class="db-form" >
                            <el-form-item label="认证名称" prop="authName"  class="el_lab item_mark">
                                <!--<span class="dot" style="position: absolute;left: -3px;color: red;">*</span>-->
                                <el-input v-model="authAddItem.authName" class="el_put" placeholder="请输入认证名"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库类型" prop="authType" style="">
                                <el-select v-model="authAddItem.authType" @change="dbAuthType(authAddItem.authType)"   placeholder="请选择数据库类型" class="el_sel" style="">
                                    <el-option label="Mysql" value="01" ></el-option>
                                    <el-option label="Oracle" value="02"></el-option>
                                    <el-option label="Sql server" value="03"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="主机名或IP地址" prop="authHostOrIp"  class="el_lab item_mark">
                                <!--<span class="dot" style="position: absolute;left: -48px;color: red;">*</span>-->
                                <el-input v-model="authAddItem.authHostOrIp"  class="el_put" placeholder="请输入主机名或IP地址"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库端口" prop="authPort"  class="el_lab item_mark">
                                <!--<span class="dot" style="position: absolute;left: -19px;color: red;">*</span>-->
                                <el-input v-model="authAddItem.authPort"  class="put_left" style="" :disabled="isAbled" placeholder="请输入数据库端口"  ></el-input>
                                <el-checkbox-group v-model="checkPort"  style="display:inline-block;">
                                    <el-checkbox label="默认端口" @change="changePort"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>

                            <el-form-item label="数据库名称" prop="authDatabaseName"  class="el_lab item_mark" >
                                <!--<span class="dot" style="position: absolute;left: -19px;color: red;">*</span>-->
                                <el-input v-model="authAddItem.authDatabaseName" placeholder="请输入数据库名称" class="el_put" ></el-input>
                            </el-form-item>
                            <el-form-item label="数据库编码" prop="authEncoding" style="">
                                <el-select v-model="authAddItem.authEncoding" placeholder="请选择编码方式" class="el_sel">
                                    <el-option label="UTF-8" value="UTF-8" ></el-option>
                                    <el-option label="UTF-16" value="UTF-16" ></el-option>
                                    <el-option label="UTF-32" value="UTF-32" ></el-option>
                                    <el-option label="GBK" value="GBK"></el-option>
                                    <el-option label="GB2312" value="GB2312"></el-option>
                                    <el-option label="ISO-8859" value="ISO-8859" ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据库用户名" prop="authUserName"  class="el_lab item_mark">
                                <!--<span class="dot" style="position: absolute;left: -33px;color: red;">*</span>-->
                                <el-input v-model="authAddItem.authUserName" placeholder="请输入数据库用户名" class="el_put" ></el-input>
                            </el-form-item>

                            <el-form-item label="数据库密码" prop="authPassword"  class="el_lab item_mark">
                                <!--<span class="dot" style="position: absolute;left: -19px;color: red;">*</span>-->
                                <el-input v-model="authAddItem.authPassword"  class="el_put"  placeholder="请输入数据库密码" type="password" ></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="用户设置" name="second">
                        <el-form :model="authAddItem" :rules="rules" ref="authAddItem" label-width="142px" class="db-form">
                            <el-form-item label="数据表名" prop="authUserSetDTO.tableName"  class="el_lab item_mark" >
                                <!--<span class="dot" style="position: absolute;left: -5px;color: red;">*</span>-->
                                <el-input v-model="authAddItem.authUserSetDTO.tableName"  class="el_put" placeholder="请输入数据表名" ></el-input>
                            </el-form-item>
                            <el-form-item label="用户名字段" prop="authUserSetDTO.userName"  class="el_lab item_mark" >
                                <!--<span class="dot" style="position: absolute;left: -18px;color: red;">*</span>-->
                                <el-input v-model="authAddItem.authUserSetDTO.userName"  class="el_put" placeholder="请输入用户名字段"></el-input>
                            </el-form-item>
                            <el-form-item label="密码字段" prop="authUserSetDTO.password" class="item_mark clearblock">
                                <!--<span class="dot" style="position: absolute;left: -5px;color: red;">*</span>-->
                                <el-input v-model="authAddItem.authUserSetDTO.password"
                                          class="put_left" placeholder="请输入密码字段" style=""></el-input>
                                <el-select v-model="val" class="put_right" placeholder="加密方式" style="">
                                    <el-option
                                            v-for="item in pswList"
                                            :key="item.v"
                                            :label="item.label"
                                            :value="item.v">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="用户全名字段" prop="authUserSetDTO.fullName"  class="el_lab" >
                                <el-input v-model="authAddItem.authUserSetDTO.fullName"  class="el_put" placeholder="请输入用户全名字段"></el-input>
                            </el-form-item>
                            <el-form-item label="手机字段" prop="authUserSetDTO.phone"  class="el_lab" >
                                <el-input v-model="authAddItem.authUserSetDTO.phone"   class="el_put" placeholder="请输入手机字段"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱字段" prop="authUserSetDTO.email"  class="el_lab" >
                                <el-input v-model="authAddItem.authUserSetDTO.email"   class="el_put" placeholder="请输入邮箱字段"></el-input>
                            </el-form-item>
                            <el-form-item label="查询条件"  class="el_lab" >
                                <span style="position: absolute;top: 16px;right: -39px;" @click="add()"> <img src="../../../../../assets/addIcon/add.png"></span>
                                <el-table
                                        :data="authAddItem.searchConditionList"
                                        :header-cell-style="headerCellStyle"
                                        border
                                        style=""
                                        cell-class-name="reset_input_width">
                                    <el-table-column
                                            label="字段名" align="center">
                                        <template slot-scope="scope">
                                            <!--<span>{{scope.row.fieldName}}</span>-->
                                            <el-input v-model.trim="scope.row.filedName" placeholder="请输入字段名"></el-input>
                                            <!--<el-input v-model="scope.row.fieldName"  class=""  placeholder="字段名2"></el-input>-->
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="选择条件" align="center" width="120">
                                        <template slot-scope="scope">
                                            <el-select v-model.trim="scope.row.searchType" placeholder="请选择">
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
                                            <el-input v-model.trim="scope.row.fieldValue" placeholder="请输入值"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="操作" align="center" width="140">
                                        <template slot-scope="scope">
                                            <!--style="position: absolute;top: 16px;right: -39px;"-->
                                            <!--<el-button
                                                    size="small"
                                                    class="btn_none_bg"
                                                    @click="add()">
                                                <img src="../../../../../assets/addIcon/add.png">
                                            </el-button>-->
                                            <span>
                                                <el-button
                                                        size="small"
                                                        class="btn_none_bg"
                                                        @click="del(scope.$index,scope.row)">
                                                <img src="../../../../../assets/addIcon/del.png">
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
            <div class='form-footer ' slot="footer"  style="height:50px;">
                <div class="foot">
                    <span class="cancle btn_middle" @click="resetForm('authAddItem')">
                        取消
                    </span>
                    <el-button class="primary confirm btn_middle"
                            type="primary"
                            @click="submitForm('authAddItem')">
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
    import {mapGetters} from 'vuex'
    import {addAuths} from "../../../../../api/SSL_VPN/new_authManager/new_auth";
    export default{
        components: {
        },
        computed: {

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
                checkPort:true,
                isAbled:true,
                searchType: [{id: 1, name: '精确', value: '精确'}, {id: 0, name: '模糊', value: '模糊'}],
                rules: {},
                authAddItem:{
//                    checkPort: [],
                    authName:'',
                    authType: '01',
                    authHostOrIp: '',
                    authPort: 3306,
                    authDatabaseName: '',
                    authEncoding:'UTF-8',
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
                addVisible:true,
                activeName:'first',
                multipleSelection: [],
                namechecked:true,
                ipchecked:true,
                pswList:[
                    {
                        v:'PLAINTEXT',
                        label:'明文'
                    },
                    {
                        v:'MD5',
                        label:'MD5'
                    },
                    {
                        v:'SHA-1',
                        label:'SHA-1'
                    },
                ],
                val:'PLAINTEXT',
            }
        },
        methods: {
            dbAuthType(val){
                if(this.isAbled==true){
                    if(val=='01'){
                        this.authAddItem.authPort=3306;
                    }else if(val=='02'){
                        this.authAddItem.authPort=1521;
                    }else {
                        this.authAddItem.authPort=1433
                    }
                }

            },
            changePort(){
                if(this.checkPort==true){
                    if(this.authAddItem.authType=='01'){
                        this.authAddItem.authPort=3306;
                    }else if(this.authAddItem.authType=='02'){
                        this.authAddItem.authPort=1521;
                    }else {
                        this.authAddItem.authPort=1433
                    }
                    this.isAbled=true
                }else {
                    this.isAbled=false
                }
            },
            validated(){
                if(this.authAddItem.authName==''){
                    this.$message({
                        type:'warning',
                        message:'认证名不能为空！'
                    });
                    return false;
                }
                if(this.authAddItem.authType==''){
                    this.$message({
                        type:'warning',
                        message:'数据库类型不能为空！'
                    });
                    return false;
                }

                if(this.authAddItem.authHostOrIp==''){
                    this.$message({
                        type:'warning',
                        message:'主机名或IP地址不能为空！'
                    });
                    return false;
                }
                if(/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(this.authAddItem.authPort)==false){
                    this.$message({
                        type:'warning',
                        message:'数据库端口在1-65535范围内！'
                    });
                    return false;
                }

                if(this.authAddItem.authDatabaseName==''){
                    this.$message({
                        type:'warning',
                        message:'数据库名称不能为空！'
                    });
                    return false;
                }

                if(this.authAddItem.authUserName==''){
                    this.$message({
                        type:'warning',
                        message:'数据库用户名不能为空！'
                    });
                    return false;
                }

                if(this.authAddItem.authPassword==''){
                    this.$message({
                        type:'warning',
                        message:'数据库密码不能为空！'
                    });
                    return false;
                }

                if(this.authAddItem.authUserSetDTO.tableName==''){
                    this.$message({
                        type:'warning',
                        message:'数据表名不能为空！'
                    });
                    return false;
                }

                if(this.authAddItem.authUserSetDTO.userName==''){
                    this.$message({
                        type:'warning',
                        message:'用户名字段不能为空！'
                    });
                    return false;
                }

                if(this.authAddItem.authUserSetDTO.password==''){
                    this.$message({
                        type:'warning',
                        message:'密码字段不能为空！'
                    });
                    return false;
                }
                return true

            },
            handleClose() {
                this.changeStatus();
            },
            changeStatus() {
                this.$emit("onChangeStatus")
                this.addVisible = false
            },
            del(index,row){
                this.authAddItem.searchConditionList.splice(index,1)
            },
            add(){
                this.authAddItem.searchConditionList.push(
                    {
                    "filedName": "",
                    "searchType": null,
                    "fieldValue": ""
                })
            },
            submitForm(formName) {
                    this.$refs[formName].validate((valid) => {
                        // console.log(pswTypechecked,authNamechecked,authHostOrIpchecked,authPortchecked,'tesst==else')
                        this.authAddItem.authUserSetDTO.passwordType=this.val;
                        if (this.validated()) {
                            let item = {
                                authName: this.authAddItem.authName,
                                authType: this.authAddItem.authType,
                                authHostOrIp : this.authAddItem.authHostOrIp  ,
                                authPort: this.authAddItem.authPort,
                                authDatabaseName: this.authAddItem.authDatabaseName,
                                authEncoding: this.authAddItem.authEncoding,
                                authUserName: this.authAddItem.authUserName,
                                authPassword: this.authAddItem.authPassword,
                                authUserSetDTO: this.authAddItem.authUserSetDTO,
                                searchConditionList:this.authAddItem.searchConditionList,
                            };
                          /*  for(let sub of item.searchConditionList){
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
                            addAuths(item).then((resp)=>{
                                if(resp.status=='SUCCESS'){
                                    this.$message({
                                        type:'success',
                                        message:'新建DB成功！'
                                    });
                                    this.addVisible=false;
                                    this.$emit('onChangeStatus');
                                    this.$refs[formName].resetFields();
                                }else{
                                    this.$message({
                                        type:'warning',
                                        message:resp.code.info
                                    });
                                }
                            }).catch(e=>{
                                console.log("新建DB出错",e);
                            });
                        } else {
                            return false;
                        }
                    });
                // }
            },
            resetForm(formName) {
                this.addVisible=false;
                this.$refs[formName].resetFields();
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
    .db-form .el_put{
        width: 65%;
    }
    .db-form .el_sel{
        width: 65%;
    }
</style>
<style>
    .reset_input_width input,
    .reset_input_width select,
    .reset_input_width select option{
        width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>
