<template>
    <div>
        <section class="content-header">
            <h1>
                <small><!-- 系统管理员 --></small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-folder-open"></i>系统管理</a></li>
                <li><a >网络配置</a></li>
                <li class="active">域名解析</li>
            </ol>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header" style="border: none;">
                            <h3 class="box-title">域名解析</h3>
                        </div>

                        <div class="box-body">
                            <div class="row" style="margin-bottom:8px;">
                            </div>
                            <el-tabs v-model="activeName" type="border-card">
                                <el-tab-pane label="DNS设置" name="first">

                                    <div v-show="!isShow">
                                        <div  class="dodiv">
                                            <ul class="ula" style="padding: 0;margin: 0;text-align: right" >
                                                <li class="lia">IP类型</li>
                                                <li class="lia">首选DNS</li>
                                                <li class="lia">备选DNS</li>
                                            </ul>
                                            <ul class="ula">
                                                <li class="lias">
                                                    <el-radio checked v-model="list.ipType" :label="list.ipType"></el-radio>
                                                </li>
                                                <li class="lias">
                                                    <el-input v-model="list.DNS1" disabled style="width: 300px;"></el-input>
                                                </li>
                                                <li class="lias">
                                                    <el-input v-model="list.DNS2" disabled style="width: 300px;"></el-input>
                                                </li>
                                            </ul>
                                        </div>
                                        <div style="margin: 20px 0 15px 98px">
                                            <el-button
                                                    class="primary edit"
                                                    type="primary"
                                                    @click="doEdit()">
                                                编辑
                                            </el-button>
                                        </div>
                                    </div>
                                    <div v-show="isShow">
                                            <div class="domain-form">
                                                <el-form :model="dnsData" :rules="rules"  label-width="103px" label-position="right" ref="dnsData" class="demo-ruleForm">
                                                    <el-form-item label="IP类型" prop="ipType" style="margin-bottom: 20px;">
                                                        <el-radio-group v-model="dnsData.radio" @change="radioChange">
                                                            <el-radio :label="1" >IPv4</el-radio>
                                                            <el-radio :label="2" style="display: none">IPv6</el-radio>
                                                        </el-radio-group >
                                                    </el-form-item>
                                                    <el-form-item label="首选DNS" prop="DNS1" style="margin-bottom: 30px;">
                                                        <el-input v-model="dnsData.DNS1" style="width: 300px!important;"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="备选DNS" prop="DNS2" style="margin-bottom: 30px;">
                                                        <el-input v-model="dnsData.DNS2" style="width: 300px!important;"></el-input>
                                                    </el-form-item>
                                                    <div style="margin-left: 100px;">
                                                        <div>
                                                            <el-button
                                                                    class="cancle plain"
                                                                    style="margin: 15px 0;"
                                                                    @click="resetForm('dnsData')">
                                                                取消
                                                            </el-button>
                                                            <el-button
                                                                    class="primary confirm"
                                                                    type="primary"
                                                                    style="margin: 15px 0 15px 20px;"
                                                                    @click="editDNS('dnsData')">
                                                                确定
                                                            </el-button>
                                                        </div>
                                                    </div>
                                                </el-form>
                                            </div>
                                        </div>

                                </el-tab-pane>
                                <el-tab-pane label="Hosts设置" name="second">
                                    <el-row style="padding: 15px 0 30px">
                                        <el-col>
                                            <a class="function_btn_main" @click="onAdd('host')" style="display: inline-block;">
                                                <i class="fa fa-plus" > 新建</i>
                                            </a>
                                            <a class="function_btn_main" @click="multipleDelete()" style="display: inline-block;">
                                                <i class="fa fa-trash" > 批量删除</i>
                                            </a>
                                        </el-col>
                                    </el-row>
                                    <el-table
                                            ref="multipleTable"
                                            :data="pers"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                        <el-table-column
                                                type="selection"
                                                align="center"
                                                width="80">
                                        </el-table-column>
                                        <el-table-column
                                                prop="domainName"
                                                align="center"
                                                label="域名"
                                                width="">
                                        </el-table-column>
                                        <el-table-column
                                                prop="ipAddress"
                                                align="center"
                                                label="IP地址">
                                        </el-table-column>
                                        <el-table-column
                                                prop="hostDesc"
                                                align="center"
                                                label="描述">
                                        </el-table-column>

                                        <el-table-column
                                                label="操作"
                                                width="150"
                                                align="center"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a @click="onEdit(scope.row, 'host')" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                <a title="删除" @click="singleDelete(scope.row, 'host')"><i class="fa fa-trash"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="row" style="margin-top:8px;" id="pages_list">
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="listQuery.cur_page"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="listQuery.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="listQuery.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="内网域名解析" name="third">
                                    <el-row style="padding: 15px 0 30px">
                                        <el-col>
                                            <a class="function_btn_main" @click="onAdd('resolve')" style="display: inline-block;">
                                                <i class="fa fa-plus" > 新建</i>
                                            </a>
                                            <a class="function_btn_main" @click="multipleDelInnerDomain()" style="display: inline-block;">
                                                <i class="fa fa-trash" > 批量删除</i>
                                            </a>
                                        </el-col>
                                    </el-row>
                                    <el-table
                                            ref="multipleTable"
                                            :data="innerList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChangeInner">
                                        <el-table-column
                                                type="selection"
                                                align="center"
                                                width="80">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                align="center"
                                                label="名称"
                                                width="">
                                        </el-table-column>
                                        <el-table-column
                                                prop="domainName"
                                                align="center"
                                                label="域名">
                                        </el-table-column>
                                        <el-table-column
                                                prop="remark"
                                                align="center"
                                                label="说明">
                                        </el-table-column>

                                        <el-table-column
                                                label="操作"
                                                width="150"
                                                align="center"
                                                show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a @click="onEdit(scope.row, 'resolve')" title="修改"><i class="fa fa-pencil" style="margin-right: 8px"></i></a>
                                                <a title="删除" @click="singleDelete(scope.row, 'resolve')"><i class="fa fa-trash"></i></a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="row" style="margin-top:8px;">
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChanges"
                                                    @current-change="handleCurrentChanges"
                                                    :current-page="innerObj.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="innerObj.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="innerObj.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>

                        </div>
                    </div>
                </div>
            </div>

        </section>
        <addHost  @onChangeStatus="onChangeStatus" v-if="isAddHostShow"/>
        <editHost  @onChangeStatus="onChangeStatus" v-if="isEditHostShow" :currentData="currentData"/>
        <addResolve  @onChangeResolve="onChangeResolve" v-if="isAddResolveShow" />
        <editResolve  @onChangeResolve="onChangeResolve" v-if="isEditResolveShow"  :resolveData="resolveData"/>
    </div>
</template>

<script>
    import {isReadonly} from "../../../../../utils/permissionUtil";
    import permissionRoutes from 'store/permission';
    import store from "../../../../../store/index";
    import addHost from "./addHost"
    import editHost from "./editHost"
    import addResolve from "./addResolve"
    import editResolve from "./editResolve"
    import {codeMessage} from "../../../../../utils/codes";
    import {notifyFault} from "../../../../../utils/notify"
    import {mapGetters} from 'vuex'
    import {deleteHosts, editDNSs, getDNSs, getHosts,getInnerDomain,innerDomainDel} from "../../../../../api/systemSet/new_networkConfig/new_domainApi";
    export default{
        components: {
            addHost,
            editHost,
            addResolve,
            editResolve
        },
        data(){
            var ips = (rule, value, callback) => {
                if (!value){
                    callback();
                }  else {
                    if (/(^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$)/.test(value) == false){
                        callback(new Error("请输入正确的IP地址"));
                    } else {
                        callback();
                    }
                }
            };
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                readOnly:false,
                pageId:16,
                isShow:false,
                rules:{
                    DNS1 :[
                        {validator: ips, trigger:'blur'}
                    ],
                    DNS2 :[
                        {validator: ips, trigger:'blur'}
                    ],
                },
                radio:1,
                dnsData: {
                    radio:'',
                    ipType:'',
                    DNS1:'',
                    DNS2:''
                    },
                pers:[],
                activeName:'first',
                activeName2:'one',
                list: [],
                innerList:[],
                innerList2:[],
                role: '',
                listLoading: true,
                listQuery: {
                    cur_page: 1,
                    pageSize: 10,
                    search_content: "",
                    total:0
                },
                innerObj: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0
                },
                //应用类型
                multipleSelection:[],
                multipleSelectionInner:[],
                isAddHostShow:false,
                isEditHostShow:false,
                isAddResolveShow:false,
                isEditResolveShow:false,
                resolveData:null
            }
        },
        created(){
            this.readOnly = isReadonly(this.pageId);
            this.getList();
            this.getInnerList();
        },
        methods: {
            doEdit(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.isShow = !this.isShow;
                    this.getList();
                }
            },
            onChangeStatus(){
                this.isAddHostShow = false;
                this.isEditHostShow = false;
                this.getList();
            },
            onChangeResolve(){
                this.isAddResolveShow = false;
                this.isEditResolveShow = false;
                this.getList();
                this.getInnerList();
            },
            onAdd(type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'host'){
                        this.isAddHostShow = true;
                    } else {
                        this.isAddResolveShow = true;
                    }
                }
            },

            onEdit(row, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'host'){
                        this.currentData = row;
                        this.isEditHostShow = true;
                    } else {
                        this.resolveData = row;
                        this.isEditResolveShow = true;
                    }
                }
            },

            radioChange()
            {
                if(this.dnsData.radio==1){
                    this.dnsData.ipType='ipv4'

                }
                if(this.dnsData.radio==2){
                    this.dnsData.ipType='ipv6'

                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.isShow=!this.isShow;

            },
            getInnerList(){
                getInnerDomain(this.innerObj).then((resp)=>{
                    this.innerList=resp.data;
                    this.innerObj.total = resp.extend.page.totalHits
                });
            },
            getList() {
                getDNSs().then((resp)=>{
                    this.list = resp.data;
                    let ipType;
                    if (this.list.ipType =='ipv4'){
                        ipType = 1
                    }
                    else {
                        ipType = 2
                    }
                    let DNSData ={
                        radio:ipType,
                        ipType:this.list.ipType,
                        DNS1:this.list.DNS1,
                        DNS2:this.list.DNS2
                    }
                    this.dnsData = DNSData;
                });
                getHosts(this.listQuery.cur_page,this.listQuery.pageSize).then((resp)=>{
                    this.pers = resp.data;
                    this.listQuery.total = resp.extend.page.totalHits
                })
            },
            editDNS(formName){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            editDNSs(this.dnsData).then((resp) => {
                                if (resp.status == "SUCCESS") {
                                    this.isShow = !this.isShow;
                                    this.getList();
                                    this.$message({
                                        type: 'success',
                                        message: '修改DNS成功!'
                                    });
                                } else {
                                    this.$message({
                                        type:'warning',
                                        message:resp.code.info
                                    });
                                }
                            })
                        } else {
                            return false;
                        }
                    })
                }
            },
            singleDelete(row, type){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if(type == 'host'){
                        this.delHosts(row.id);
                    } else {
                        this.delInnerDomain(row.id);
                    }
                }
            },
            multipleDelete(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要删除的Host设置！'
                        });
                        return;
                    }
                    let ids = '';
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        ids = ids + this.multipleSelection[i].id + ','
                    }
                    ids = ids.substring(0, ids.length - 1);
                    this.delHosts(ids);
                }
            },
            multipleDelInnerDomain(){
                if(this.readOnly == true){
                    this.$message({
                        type: 'warning',
                        message: '您的权限为只读!'
                    });
                } else {
                        if (this.multipleSelectionInner.length == 0) {
                            this.$message({
                                type: 'warning',
                                message: '请选择要删除的内网域名解析！'
                            });
                            return;
                        }
                        let ids = '';
                        for (let i = 0; i < this.multipleSelectionInner.length; i++) {
                            ids = ids + this.multipleSelectionInner[i].id + ','
                        }
                        ids = ids.substring(0, ids.length - 1);
                        this.delInnerDomain(ids);
                }
            },
            //Host删除
            delHosts(id) {
                let information="确认删除?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                deleteHosts(id).then((resp)=>
                {
                    if(resp.status=="SUCCESS"){
                        this.$message({
                            type:'success',
                            message:'删除成功！'
                        });
                        this.getList();
                        this.multipleSelection=[];
                    }else {
                        this.$message({
                            type:'warning',
                            message:resp.code.info
                        });
                    }
                })
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });
            },
            delInnerDomain(id) {
                let information="确认删除?";
                this.$confirm(information, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    innerDomainDel(id).then((resp)=> {
                        if(resp.status=="SUCCESS"){
                            this.$message({
                                type:'success',
                                message:'删除成功！'
                            });
                            this.getInnerList();
                            this.multipleSelectionInner=[];
                        }else {
                            this.$message({
                                type:'warning',
                             message:resp.code.info
                            });
                        }
                    })
                }).catch(() => {    // 取消事件
                    console.log("取消删除。")
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSelectionChangeInner(val){
                this.multipleSelectionInner = val;
            },
            handleSizeChange(val) {
                this.listQuery.pageSize=val;
                this.getList();
            },
            handleSizeChanges(val) {
                this.innerObj.pageSize=val;
                this.getInnerList();
            },
            handleCurrentChange(val) {
                this.listQuery.cur_page=val;
                this.getList();
            },
            handleCurrentChanges (val) {
                this.innerObj.currentPage=val;
                this.getInnerList();
            }
        }
    }
</script>
<
<style >
    .el-dialog--tiny {
        width: 25%;
    }

    .domain  .el-dialog__title {
        margin-left: 52px;
    }
    .el-dialog__footer {
        background-color: #E7E7E7;
        border-top: 1px solid #E7E7E7;
        height: 100px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .domain-form .el_put {
        position: relative;
        display: inline-block;
        width: 490px!important;
        min-width: 300px;
        margin-left: 20px;
    }

    .domain-form .el-form-item__label {
        font-size: 15px;
        font-weight: 400;
    }

    .domain-form .el-form-item {
        margin-bottom: 17px;
    }

    .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .domain-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 100px !important;
    }

    .form-user-select{
        min-width: 488px!important;
        width: 488px!important;
    }
    .domain-form .el-select{
        width:488px;
    }

</style>
<style scoped>
    a {
        color: #3493E0;
    }
    .log-tag{
        float: left;
        width: 80px;
    }
    .log-download-checkbox{
        float: left;
        min-width: 600px;
        background-color: #b1b1b1;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .tag-input{
        color:black;
        background-color: #fff;
        border: none;
        zoom:1;
        outline: medium;
        /*以上三条样式去边框，使得输入框与父元素看起来融为一体*/
    }

    .multiple-condition{
        margin-left: 15px;
    }

    .multiple-condition .el-tag{
        height: 32px;
        line-height: 30px;
        margin-left: 6px;
        color: #3C8DBC;
        background-color: #fff;
        border: 1px solid #3C8DBC ;
    }

    .multiple-condition .el-tag *{
        color: #3C8DBC;
    }

    .multiple-condition .inter-select{
        min-width: 110px!important;
        width: 120px!important;
    }
</style>
<style scoped>
    .dodiv{
        overflow: auto;
        font-size: 15px;
    }
    .ula{
        list-style: none;
        float: left;

    }
    .ula .lia{
        padding: 15px 20px 15px 15px;
        height: 70px;
        line-height: 40px;
        color: #606266;
        /*margin*/
    }
    .ula .lia:nth-of-type(1){
        height: auto;
        line-height: 1;
    }
    .ula .lias{
        padding: 15px 0px;
        height: 70px;
        line-height: 40px;
        /*margin*/
    }
    .ula .lias:nth-of-type(1){
        height: auto;
        line-height: 1;
    }
</style>
