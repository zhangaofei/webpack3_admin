<template>
    <div class="securityConfig public">
        <el-dialog
                title="修改记录设置"
                :visible.sync="securityConfigVisible"
                size="small"
                custom-class="dialog public"
                top="10%"
                @close="handleClose" @open="doInit(currentData)">

            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="轮询设置" name="first">
                    <el-table
                            ref="multipleTable"
                            :data="list"
                            :header-cell-style="headerCellStyle"
                            border
                            tooltip-effect="dark"
                            style="width: 100%">

                        <el-table-column
                                prop="fullDomainName"
                                align="center"
                                show-overflow-tooltip
                                label="域名">
                        </el-table-column>

                        <el-table-column
                                prop="dnsLineChName"
                                align="center"
                                label="线路">
                        </el-table-column>

                        <el-table-column
                                prop="recordValue"
                                align="center"
                                label="记录值">
                        </el-table-column>

                        <el-table-column
                                align="center"
                                label="权重值">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.weight" placeholder="请输入权重值"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                        <div style="margin-left: 70%;margin-top: 20px">
                            <span class="cancle btn_middle" @click="resetForm()">取消</span>
                            <el-button
                                    type="primary"
                                    class="primary confirm btn_middle"
                                    @click="submitForm()">
                                确定
                            </el-button>
                        </div>
                </el-tab-pane>


                <el-tab-pane label="安全跳转设置" name="second">

                    <div class="security-form">
                        <el-form :model="jumpConfig" ref="jumpConfig" label-width="100px">
                            <el-form-item label="域名" prop="fullDomainName">
                                <el-input v-model="jumpConfig.fullDomainName" placeholder="" class="el_put" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item label="自身线路" prop="dnsLineChName">
                                <el-input v-model="jumpConfig.dnsLineChName" placeholder="" class="el_put" :disabled="true"></el-input>
                            </el-form-item>

                            <!--<el-form-item label="健康检查方式" prop="checkMethod">-->
                                <!--<el-select v-model="jumpConfig.checkMethod" placeholder="请选择" class="el_sel_short">-->
                                    <!--<el-option label="无" value="NOCHECK" ></el-option>-->
                                    <!--<el-option label="Ping" value="PING" ></el-option>-->
                                    <!--<el-option label="Telnet" value="TELNET" ></el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->

                            <el-form-item label="失败跳转至" prop="jumpLine">
                                <el-select v-model="jumpConfig.jumpLine" placeholder="请选择" class="el_sel">
                                    <el-option
                                            v-for="line in lineNameList"
                                            :key="line.id"
                                            :label="line.chName"
                                            :value="line.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                                <div style="margin-left: 70%;margin-top: 20px">
                                    <span class="cancle btn_middle" @click="resetSecurity('jumpConfig')">取消</span>
                                    <el-button
                                            type="primary"
                                            class="primary confirm btn_middle"
                                            @click="submitSecurity('jumpConfig')">
                                        确定
                                    </el-button>
                                </div>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

    </div>
</template>
<script>
    import {codeMessage} from "utils/codes";
    import {notifyFault} from "utils/notify";
    import {getPollingList,changeWeight,updateRecord,saveLunxunConfig,getLineListForSecurity} from 'api/enDNS/domainAdmin';
    // import ElInput from "../../../../../node_modules/element-ui/packages/input/src/input";

    export default{

        // components: {ElInput},
        data(){

            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                rules: {

                },
                activeName:'first',
                securityConfigVisible: true,
                recordId:'',

                list:[],
                total: null,
                listLoading: true,
                currentView: null,
                currentData: null,
                listQuery:{
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:""
                },
                domain_name:'',
                self_line:'',
                jumpConfig:{
                    id:'',
                    fullDomainName:'',
                    dnsLineChName:'',
//                    checkMethod:'',
                    jumpLine:''
                },
                lineNameList:[],
                recordList:[]
            };
        },
        created(){
            this.getPollingList(this.currentData.id);
            this.getListForSelect();
            this.doInit(this.currentData);
        },

        props: {
            currentData: Object
        },
        methods: {
            handleClose() {
                this.changeStatus();
            },

            changeStatus(){
                this.$emit("onChangeStatus")
            },

            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },

            getListForSelect(){
                getLineListForSecurity({id:this.currentData.id}).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.lineNameList = response.data;
                    }
                }).catch((e) => {
                    console.log(e)
                });

            },

            onChangeWeight(row){
                var dto = {
                    recordId:this.recordId,
                    pollingId:row.id,
                    weight:row.weight
                }

                changeWeight(dto).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.$message({
                            type: 'success',
                            message: '权重更新成功!'
                        });
                        this.getPollingList();
                    }else {
                        this.$message({
                            type:'warning',
                            message:response.code.info
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },

            getPollingList(recordId){
                getPollingList({id: recordId}).then(response => {
                    if (response.status == 'SUCCESS'){
                        this.list = response.data;
                        console.log('list:', this.list, recordId);
                        for (let i = 0; i < this.list.length; i++){
                            if(this.list[i].id == recordId){
                                this.jumpConfig.fullDomainName = this.list[i].fullDomainName;
                                this.jumpConfig.dnsLineChName = this.list[i].dnsLineChName;
//                                this.jumpConfig.checkMethod = this.list[i].checkMethod.toString();
                                this.jumpConfig.id = recordId;
                            }
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                });
            },
            submitSecurity(){
                updateRecord(this.jumpConfig).then((resp) => {
                    if (resp.status == 'SUCCESS') {
                        this.$message({
                            type: 'success',
                            message: '安全跳转设置成功！'
                        });
                        this.securityConfigVisible = false;
                        this.$emit('onChangeStatus');
                    } else {
                        this.$message({
                            type: 'warning',
                            message: resp.code.info
                        });
                    }
                }).catch(e => {
                    console.log("修改出错", e);
                });
            },
            submitForm(formName) {
                for (let i = 0; i < this.list.length; i++) {
                    this.recordList.push({
                        id: this.list[i].id,
                        weight: this.list[i].weight
                    })
                }
                saveLunxunConfig(this.recordList).then((resp) => {
                    if (resp.status == 'SUCCESS') {
                        this.$message({
                            type: 'success',
                            message: '轮询设置成功！'
                        });
                        this.securityConfigVisible = false;
                        this.$emit('onChangeStatus');
                    } else {
                        this.$message({
                            type: 'warning',
                            message: resp.code.info
                        });
                    }
                }).catch(e => {
                    console.log("修改出错", e);
                });
            },

            doInit(currentData){
                let row = currentData;
                this.recordId = row.id;
            },
            resetForm(formName) {
                this.securityConfigVisible = false;
            },
            resetSecurity(){
                this.securityConfigVisible = false;
            }

        },
    }
</script>
<style>
   .security-form .el_put {
        position: relative;
        width: 60% !important;
        margin-left: 20px;
    }


    .security-form .el_sel {
        width: 60% !important;
        margin-left: 20px;
    }

    .el_sel_domain {
        width: 30% !important;
        margin-left: 20px;
    }

    .security-form .el_sel_short {
        width: 60% !important;
        margin-left: 20px;
    }



    .form-user-select{
        min-width: 488px!important;
        width: 488px!important;
    }
    .router-form .el-select{
        /*width:488px;*/
    }
    .route_put{
        ping-top:5px ;
        padding-bottom: 5px;
    }


</style>