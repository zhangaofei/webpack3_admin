<template>
    <div class="domainCheck-dialog public">
        <el-dialog title="查看域名统计"
                   custom-class="dialog public"
                   :visible.sync="InfoVisible"
                   top="2%"
                   @close="handleClose"
        >
            <div style="margin-bottom: 10px">
                详情--{{domainQuery.domainName}}
            </div>
            <div style="padding: 0 20px 0 20px">
                <el-table
                        ref="multipleTable"
                        :data="domainList"
                        :header-cell-style="headerCellStyle"
                        border
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            prop="time"
                            label="时间段"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="line"
                            label="线路"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            align="center"
                            label="次数"
                            >
                    </el-table-column>

                </el-table>
                <div class="row" style="margin-top:8px;" >
                    <div class="block" style="margin-right: 2%;float: right" >
                        <el-pagination
                                @size-change="handleUserSizeChange"
                                @current-change="handleUserCurrentChange"
                                :current-page="domainQuery.currentPage"
                                :page-sizes="[10]"
                                :page-size="domainQuery.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class='form-footer ' slot="footer" >

            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {getDetailDomainVisit} from 'api/enDNS/domainVisit';
    export default {
        computed: {},
        components: {

        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                InfoVisible: true,
                total:null,
                domainQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    domainName:'',
                    startTime:'',
                    endTime:''
                },
                domainList:[],
            }
        },
        props:['currentData', 'startTime', 'endTime'],
        created() {
            this.domainQuery.startTime = this.startTime;
            this.domainQuery.endTime = this.endTime;
            this.domainQuery.domainName = this.currentData.domain;
            this.getDomainList();
        },
        methods: {
            handleClose(){
                this.$emit("onChangeStatus")
            },
            resetFrom(){
                this.InfoVisible = false;
            },

            getDomainList(){
                getDetailDomainVisit(this.domainQuery).then(response=> {
                    this.domainList = response.data;
                    this.total = response.extend.page.totalHits;
                    this.domainQuery.currentPage = response.extend.page.currentPage;
                    this.domainQuery.pageSize = response.extend.page.pageSize;
                }).catch(e=>{

                })
            },
            handleUserSizeChange(val) {
                this.domainQuery.pageSize = val;
                this.getDomainList();
            },
            handleUserCurrentChange(val) {
                this.domainQuery.currentPage = val;
                this.getDomainList();
            }
        }
    }
</script>
<style>
    .domainCheck-dialog .el-dialog__body{
        min-height: 630px!important;
    }
    .domainCheck-dialog .dialog{
        min-width: 850px;
    }
    .domainCheck-dialog .el-dialog__header{
        padding-left:5px ;
    }
    .userList-dialog__footer {
        background-color: #E7E7E7;
        border-top: 1px solid #E7E7E7;
        height: 100px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }
</style>