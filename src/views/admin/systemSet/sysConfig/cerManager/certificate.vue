<template>
    <div>
        <div class="content-header">
            <h1>
                <!--系统配置-->
                <small>
                    <!--序列号管理-->
                </small>
            </h1>
            <ol class="breadcrumb" style="left:12px">
                <li><a ><i class="fa fa-gears"></i>系统管理</a ></li>
                <li><a >系统设置</a ></li>
                <li class="active">证书管理</li>
            </ol>
        </div>
        <div class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box" style="border-top-color: #4392bf !important;">
                        <div class="box-header with-border">
                            <h3 class="box-title">证书管理</h3>

                            <div class="box-tools pull-right">

                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body" style="padding-bottom: 21px !important">
                            <el-tabs type="border-card">
                                <el-tab-pane label="CA服务器证书管理">
                                    <el-table
                                            ref="multipleTable"
                                            :data="CAList"
                                            :header-cell-style="headerCellStyle"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%;"
                                            @selection-change="">
                                        <el-table-column
                                                align="center"
                                                type="selection"
                                                width="80"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="pemInfo"
                                                label="证书信息">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="下载"
                                                width="180"
                                        >
                                            <template slot-scope="scope">
                                                <a :data-path="scope.row.pemcerPath" @click="downloadCa">点击下载</a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <h4 class="modal-title" id="myCertificate" style="padding:10px 25px;">证书生成</h4>

                                    <div class="user-form">
                                        <el-form :model="info" ref="info" label-width="100px" :rules="rules" class="demo-ruleForm">
                                            <el-form-item label="国家" prop="countryname">
                                                <el-input  v-model="info.countryname"></el-input>
                                            </el-form-item>
                                            <el-form-item label="省" prop="province">
                                                <el-input  v-model="info.province"></el-input>
                                            </el-form-item>
                                            <el-form-item label="市" prop="locality">
                                                <el-input  v-model="info.locality"></el-input>
                                            </el-form-item>
                                            <el-form-item label="组织" prop="org">
                                                <el-input  v-model="info.org"></el-input>
                                            </el-form-item>
                                            <el-form-item label="单位" prop="orgunit">
                                                <el-input  v-model="info.orgunit"></el-input>
                                            </el-form-item>
                                            <el-form-item label="名称" prop="commonname">
                                                <el-input  v-model="info.commonname"></el-input>
                                            </el-form-item>
                                            <el-form-item label="邮件" prop="email" :rules="[{type: 'email', message: '输入格式有误', trigger: 'blur'}]">
                                                <el-input  v-model.email="info.email"></el-input>
                                            </el-form-item>
                                            <el-form-item label="有效期(天)" prop="days">
                                                <el-input v-model="info.days"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="saveCa('info')" style="margin-left: 413px">保存</el-button>
                                                <el-button @click="deleteCa">删除</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>

                                </el-tab-pane>
                                <el-tab-pane label="服务器证书管理">

                                    <el-table
                                            ref="multipleTable"
                                            :data="serverList"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%;"
                                            @selection-change="">
                                        <el-table-column
                                                align="center"
                                                type="selection"
                                                width="80"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="pemInfo"
                                                label="证书信息">
                                        </el-table-column>
                                    </el-table>

                                    <!--<table id="example2" class="table table-bordered table-striped">-->
                                        <!--&lt;!&ndash; 内容部分  &ndash;&gt;-->
                                        <!--<thead>-->
                                        <!--<tr>-->
                                            <!--<th style="text-align:center;width:8%">-->
                                                <!--<input type="checkbox" value="" id="check_box_all2">-->
                                            <!--</th>-->
                                            <!--<th style="text-align:center;width:92%" id="res_name2">证书信息</th>-->
                                            <!--&lt;!&ndash;<th style="text-align:center;width:12%" id="res_download2">下载</th>&ndash;&gt;-->
                                        <!--</tr>-->
                                        <!--</thead>-->
                                        <!--<tbody>-->
                                        <!--<tr v-for="ser in serverList">-->
                                            <!--<td style="text-align:center;width:8%">-->
                                                <!--<input type="checkbox" value="">-->
                                            <!--</td>-->
                                            <!--<td style="text-align:center;width:92%">{{ser.pemInfo}}</td>-->
                                            <!--&lt;!&ndash;<td style="text-align:center;width:12%"><a>点击下载</a></td>&ndash;&gt;-->
                                        <!--</tr>-->
                                        <!--</tbody>-->
                                    <!--</table>-->
                                    <h4 class="modal-title" id="myCertificate2" style="padding:10px 25px;">证书生成</h4>

                                    <div class="user-form2">
                                        <el-form :model="serverInfo" ref="serverInfo" label-width="100px" :rules="rules" class="demo-ruleForm">
                                            <el-form-item label="国家" prop="countryname">
                                                <el-input  v-model="serverInfo.countryname"></el-input>
                                            </el-form-item>
                                            <el-form-item label="省" prop="province">
                                                <el-input  v-model="serverInfo.province"></el-input>
                                            </el-form-item>
                                            <el-form-item label="市" prop="locality">
                                                <el-input  v-model="serverInfo.locality"></el-input>
                                            </el-form-item>
                                            <el-form-item label="组织" prop="org">
                                                <el-input  v-model="serverInfo.org"></el-input>
                                            </el-form-item>
                                            <el-form-item label="单位" prop="orgunit">
                                                <el-input  v-model="serverInfo.orgunit"></el-input>
                                            </el-form-item>
                                            <el-form-item label="名称" prop="commonname">
                                                <el-input  v-model="serverInfo.commonname"></el-input>
                                            </el-form-item>
                                            <el-form-item label="邮件" prop="email" :rules="[{type: 'email', message: '输入格式有误', trigger: 'blur'}]">
                                                <el-input  v-model.email="serverInfo.email"></el-input>
                                            </el-form-item>
                                            <el-form-item label="有效期(天)" prop="days">
                                                <el-input v-model="serverInfo.days"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="saveServerCer('serverInfo')" style="margin-left: 413px">保存</el-button>
                                                <el-button @click="deleteServerCer">删除</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="用户证书管理">

                                    <el-table
                                            ref="multipleTable"
                                            :data="clientList"
                                            border
                                            tooltip-effect="dark"
                                            style="width: 100%;"
                                            @selection-change="checkBoxAll">
                                        <el-table-column
                                                align="center"
                                                type="selection"
                                                width="80"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="commonName"
                                                label="名称"
                                                width="200">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="pemInfo"
                                                label="证书信息">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="证书"
                                                width="180"
                                        >
                                            <template slot-scope="scope">
                                                <a :cer-path="scope.row.pemcerPath" @click="downloadCer">点击下载</a>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="密钥"
                                                width="180"
                                        >
                                            <template slot-scope="scope">
                                                <a :key-path="scope.row.pemkeyPath" @click="downloadKey">点击下载</a>
                                            </template>
                                        </el-table-column>
                                    </el-table>


                                    <!--<table id="user" class="table table-bordered table-striped">-->
                                        <!--&lt;!&ndash; 内容部分  &ndash;&gt;-->
                                        <!--<thead>-->
                                        <!--<tr>-->
                                            <!--<th style="text-align:center;width:8%">-->
                                                <!--<input type="checkbox" v-model="checkall" @change="checkBoxAll">-->
                                            <!--</th>-->
                                            <!--<th style="text-align:center;width:21%" id="name">名称</th>-->
                                            <!--<th style="text-align:center;width:29%" id="info">证书信息</th>-->
                                            <!--<th style="text-align:center;width:21%" id="certificate">证书</th>-->
                                            <!--<th style="text-align:center;width:21%" id="password">密钥</th>-->
                                        <!--</tr>-->
                                        <!--</thead>-->
                                        <!--<tbody>-->
                                        <!--<tr v-for="cli in clientList">-->
                                            <!--<td style="text-align:center;width:8%">-->
                                                <!--<input type="checkbox" :value="cli.id" v-model="checkedClientIds">-->
                                            <!--</td>-->
                                            <!--<td style="text-align:center;width:21%">{{cli.commonName}}</td>-->
                                            <!--<td style="text-align:center;width:29%">{{cli.pemInfo}}</td>-->
                                            <!--<td style="text-align:center;width:21%"><a :cer-path="cli.pemcerPath" @click="downloadCer">点击下载</a></td>-->
                                            <!--<td style="text-align:center;width:21%"><a :key-path="cli.pemkeyPath" @click="downloadKey">点击下载</a></td>-->
                                        <!--</tr>-->
                                        <!--</tbody>-->
                                    <!--</table>-->
                                    <div class="row" style="margin-top:8px;" >
                                        <div class="block" style="margin-right: 2%;float: right" >
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="page.currentPage"
                                                    :page-sizes="[10, 20, 30, 40,50]"
                                                    :page-size="page.pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="page.totalRows">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <h4 class="modal-title" id="myModalLabel" style="padding:10px 25px;">证书生成</h4>

                                    <div class="user-form3">
                                        <el-form :model="clientInfo" ref="clientInfo" label-width="100px" :rules="rules" class="demo-ruleForm">
                                            <el-form-item label="国家" prop="countryname">
                                                <el-input  v-model="clientInfo.countryname"></el-input>
                                            </el-form-item>
                                            <el-form-item label="省" prop="province">
                                                <el-input  v-model="clientInfo.province"></el-input>
                                            </el-form-item>
                                            <el-form-item label="市" prop="locality">
                                                <el-input  v-model="clientInfo.locality"></el-input>
                                            </el-form-item>
                                            <el-form-item label="组织" prop="org">
                                                <el-input  v-model="clientInfo.org"></el-input>
                                            </el-form-item>
                                            <el-form-item label="单位" prop="orgunit">
                                                <el-input  v-model="clientInfo.orgunit"></el-input>
                                            </el-form-item>
                                            <el-form-item label="名称" prop="commonname">
                                                <el-input  v-model="clientInfo.commonname"></el-input>
                                            </el-form-item>
                                            <el-form-item label="邮件" prop="email" :rules="[{type: 'email', message: '输入格式有误', trigger: 'blur'}]">
                                                <el-input  v-model.email="clientInfo.email"></el-input>
                                            </el-form-item>
                                            <el-form-item label="有效期(天)" prop="days">
                                                <el-input v-model="clientInfo.days"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="saveClientCer" style="margin-left: 413px">保存</el-button>
                                                <el-button @click="deleteClientCer(cli)">删除</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import{createCA, deleteCA, getCA} from '../../../../../api/systemSet/sysConfig/cerManager';
    import{createServerCer, deleteServerCer, getServerCer,getClientCer} from '../../../../../api/systemSet/sysConfig/cerManager';
    export default{
        name: 'admin_cermanager_certificate',
        components: {},
        data(){
            var validateDays = (rule, value, callback) => {
                if (!value){
                    return callback(new Error('有效期不能为空!'))
                }
                setTimeout(() => {
                    if (!/^[0-9]{1,}$/.test(value)) {
                        callback(new Error('有效期必须为数字!'))
                    } else {
                        callback();
                    }
                })
            }
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                CAList: [],
                serverList:[],
                clientList:[],
                checkedClientIds:[],
                checkall:false,
                rules: {
                    commonname: [
                        { required: true, message: '证书名称不能为空', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度至少一个字符', trigger: 'blur' }
                    ],
                    days: [
                        { required: true, message: '有效期不能为空', trigger: 'blur' },
                        {validator: validateDays, trigger: 'blur'}
                    ]
                },
                info: {
                    days: '',
                    commonname: '',
                    countryname: '',
                    email: '',
                    locality: '',
                    orgunit: '',
                    org: '',
                    province: ''
                },
                serverInfo:{
                    days: '',
                    commonname: '',
                    countryname: '',
                    email: '',
                    locality: '',
                    orgunit: '',
                    org: '',
                    province: ''
                },
                clientInfo:{
                    days: '',
                    commonname: '',
                    countryname: '',
                    email: '',
                    locality: '',
                    orgunit: '',
                    org: '',
                    province: ''
                },
                page:{
                    currentPage:1,
                    totalPages:1,
                    totalRows:1,
                    pageSize:10
                },
            }
        },
        computed: {
            pagination(){
                let start = 1, end = 1;
                if (this.page.totalPages <= 10) {
//                    如果总页码小于10,显示第一页到最后一页
                    start = 1;
                    end = this.page.totalPages;
                } else {
//                    如果总页码大于10
//                    如果当前页码小于5,显示1-10页
                    if (this.page.currentPage <= 5) {
                        start = 1;
                        end = 10;
                    } else if (this.page.totalPages - this.page.currentPage <= 5) {
//                        如果当前页面距离最后一页小于5,显示最后10页
                        start = this.page.totalPages - 9;
                        end = this.page.totalPages;
                    } else {
                        start = this.page.currentPage - 4;
                        end = this.page.currentPage + 5;
                    }
                }
                let resultArr = [];
                for (let i = start; i <= end; i++) {
//                    往数组中添加一个元素
                    resultArr.push(i);
                }
                return {
                    pages: resultArr
                };
            }
        },
        created() {
            this.getCAList();
            this.getServerList();
            this.getClientList();
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page.pageSize = val;
                this.getClientList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.currentPage = val;
                this.getClientList();
            },
            getCAList(){
                getCA().then(response => {
                    if (response.status=='SUCCESS'){
                        this.$message({
                            type:'success',
                            message:'获取CA证书成功!'
                        });
                        this.CAList = response.data;
                    }else {
//                        this.$message({
//                            type:'warning',
//                            message:'获取CA证书失败!'+codeMessage(response.code)
//                        });
                    }
                }).catch((e) => {
                    console.log(e);
                    this.$message({
                        type:'warning',
                        message:'网络或服务器故障!'
                    });
                });
            },
            getServerList(){
                getServerCer().then(response => {
                    if(response.status=="SUCCESS"){
                        this.$message({
                            type:'success',
                            message:'获取服务器证书成功!'
                        });
                        this.serverList = response.data;
                    }else {
//                        this.$message({
//                            type:'warning',
//                            message:'获取服务器证书失败!'+codeMessage(response.code)
//                        });
                    }
                }).catch((e) => {
                    console.log(e);
                    this.$message({
                        type:'warning',
                        message:'网络或服务器故障!'
                    });
                });
            },
            getClientList(){
                getClientCer({cur_page:this.page.currentPage, pageSize: this.page.pageSize}).then(response => {
                    if(response.status=="SUCCESS"){
                        this.$message({
                            type:'success',
                            message:'获取客户端证书成功!'
                        });
                        this.clientList = response.data;
                        this.page = response.extend.page;
                    }else {
//                        this.$message({
//                            type:'warning',
//                            message:'获取客户端证书失败!'+codeMessage(response.code)
//                        });
                    }
                }).catch((e) => {
                    console.log(e);
                    this.$message({
                        type:'warning',
                        message:'网络或服务器故障!'
                    });
                });
                this.checkall=false;
                this.checkedClientIds=[];
            },
            checkBoxAll(val){
//                if (this.checkall) {
//                    for (let i = 0; i < this.clientList.length; i++) {
//                        this.checkedClientIds.push(this.clientList[i].id);
//                    }
//                } else {
//                    this.checkedClientIds = [];
//                }
                this.checkedClientIds = val;
            },
            goto(e) {
                this.page.currentPage =parseInt(e.target.getAttribute('dt-idx'));
                this.getList();
            },
            goPrev() {
                if (this.page.currentPage != 1) {
                    this.page.currentPage--;
                    this.getList();
                }
            },
            goNext() {
                if (this.page.currentPage < this.page.totalPages) {
                    this.page.currentPage++;
                    this.getList();
                }
            },
            saveCa(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        createCA(this.info).then(response => {
                            if(response.status=='SUCCESS'){
                                this.$message({
                                    type:'success',
                                    message:'CA证书生成成功!'
                                });
                                this.CAList = response.data;
                                this.getCAList();
                            }else{
                                if (response.code=='MSG_B0105'){
                                    this.$message({
                                        type:'warning',
                                        message:'已有CA证书,如需创建,请先删除CA证书!'
                                    });
                                }else {
//                                    this.$message({
//                                        type:'warning',
//                                        message:'CA证书生成失败!'+codeMessage(response.code)
//                                    });
                                }
                            }

                        }).catch((e) => {

                            console.log(e);
                            this.$message({
                                type:'warning',
                                message:'网络或服务器故障!'
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        this.$message({
                            type:'warning',
                            message:'输入格式有误!'
                        });
                        return false;
                    }
                });
            },
            deleteCa(){
                deleteCA().then(response => {
                    if (response.status=='SUCCESS'){
                        this.$message({
                            type:'success',
                            message:'CA证书删除成功!'
                        });
                        this.getCAList();
                    }else {
//                        this.$message({
//                            type:'warning',
//                            messgae:'CA证书删除失败!'+codeMessage(response.code)
//                        });
                    }
                }).catch((e) => {
                    console.log(e);
                    this.$message({
                        type:'warning',
                        message:'网络或服务器故障!'
                    });
                });
            },
            downloadCa(e){
                let path = '/api/admin' + e.target.getAttribute('data-path');
                console.log("CAPath",path);
                window.open(path);
            },
            saveServerCer(){
                createServerCer(this.serverInfo).then(response => {
                    if(response.status=='SUCCESS'){
                        this.$message({
                            type:'success',
                            message:'服务器证书生成成功!'
                        });
                        this.serverList = response.data;
                        this.getServerList();
                    }else{
                        if (response.code=='MSG_B0105'){
                            this.$message({
                                type:'warning',
                                message:'已有服务器证书,如需创建,请先删除CA证书!'
                            });
                        }else {
//                            this.$message({
//                                type:'warning',
//                                message:'服务器证书生成失败!'+codeMessage(response.code)
//                            });
                        }
                    }
                }).catch((e) => {

                    console.log(e);
                    this.$message({
                        type:'warning',
                        message:'网络或服务器故障!'
                    });
                });
            },
            deleteServerCer(){
                deleteServerCer().then(response => {
                    if (response.status=='SUCCESS'){
                        this.$message({
                            type:'success',
                            message:'服务器证书删除成功!'
                        });
                        this.getServerList();
                    }else {
//                        this.$message({
//                            type:'warning',
//                            messgae:'服务器证书删除失败!'+codeMessage(response.code)
//                        });
                    }
                }).catch((e) => {
                    console.log(e);
                    this.$message({
                        type:'warning',
                        message:'网络或服务器故障!'
                    });
                });
            },
            downloadCer(e){
                let path = '/api/admin' + e.target.getAttribute('cer-path');
                console.log(path);
                window.open(path);
            },
            downloadKey(e){
                let path = '/api/admin' + e.target.getAttribute('key-path');
                console.log(path);
                window.open(path);
            },
            saveClientCer(){
                createClientCer(this.clientInfo).then(response => {
                    if(response.status=='SUCCESS'){
                        this.$message({
                            type:'success',
                            message:'客户端证书生成成功!'
                        });
                        this.clientList = response.data;
                        this.getClientList();
                    }else{
                        if (response.code=='MSG_B0103'){
                            this.$message({
                                type:'warning',
                                message:'已有相同证书存在,如需创建,请先删除原有证书!'
                            });
                        }else {
//                            this.$message({
//                                type:'warning',
//                                message:'客户端证书生成失败!'+codeMessage(response.code)
//                            });
                        }
                    }

                }).catch((e) => {

                    console.log(e);
                    this.$message({
                        type:'warning',
                        message:'网络或服务器故障!'
                    });
                });
            },
            deleteClientCer(){
                if (this.checkedClientIds.length == 0) { // 如果没有一项被选中则弹窗提示
                    this.$message({
                        type: 'warning',
                        message: '请选择要删除的证书管理！'
                    });
                    return;
                }
                this.$confirm('确认删除' + this.checkedClientIds.length + '项?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let newArr=[];
                    for(let i=0;i<this.checkedClientIds.length;i++){
                        newArr.push(this.checkedClientIds[i].id)
                    }
                    console.log('cer:', newArr);
                    deleteClientCer({ids: newArr.join(',')}).then(response => {
                        if (response.status == 'SUCCESS') {
                            this.$message({
                                type: 'success',
                                message: '证书删除成功!'
                            });
                            this.getClientList();
                        } else {
//                            this.$message({
//                                type: 'warning',
//                                messgae: '证书删除失败!'+codeMessage(response.code)
//                            });
                        }
                    }).catch((e) => {
                        console.log(e);
                        this.$message({
                            type: 'warning',
                            message: '网络或服务器故障!'
                        });
                    });
                });
            }
        }
    }
</script>
<style>
    .user-form .el-input {
        position: relative;
        display: inline-block;
        width: 490px;
        margin-left: 60px;
    }
    .user-form .el-form-item__content .el-input .el-input__inner {
        width: 488px;
    }
    .user-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 60px;
    }
    .user-form2 .el-input {
        position: relative;
        display: inline-block;
        width: 490px;
        margin-left: 60px;
    }
    .user-form2 .el-form-item__content .el-input .el-input__inner {
        width: 488px;
    }
    .user-form2 .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 60px;
    }
    .user-form3 .el-input {
        position: relative;
        display: inline-block;
        width: 490px;
        margin-left: 60px;
    }
    .user-form3 .el-form-item__content .el-input .el-input__inner {
        width: 488px;
    }
    .user-form3 .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 60px;
    }
</style>