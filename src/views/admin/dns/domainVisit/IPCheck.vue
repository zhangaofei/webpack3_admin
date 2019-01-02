<template>
    <div class="domainCheck-dialog public">
        <el-dialog title="查看来源IP"
                   custom-class="dialog public"
                   :visible.sync="InfoVisible"
                   top="2%"
                   @close="handleClose"
        >
            <div style="margin-bottom: 10px">
                详情--{{IPQuery.ip}}
            </div>
            <div style="padding: 0 20px 0 20px">
                <el-table
                        ref="multipleTable"
                        :data="IPList"
                        :header-cell-style="headerCellStyle"
                        border
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            prop="ipTime"
                            label="时间段"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="ipLine"
                            label="线路"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="ipCount"
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
                                :current-page="IPQuery.currentPage"
                                :page-sizes="[10]"
                                :page-size="IPQuery.pageSize"
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
    import {getDetailIPVisit} from 'api/enDNS/domainVisit';
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
                IPQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    ip:'',
                    startTime:'',
                    endTime:''
                },
                IPList:[],
            }
        },
        props:['currentData', 'startTime', 'endTime'],
        created() {
            this.IPQuery.startTime = this.startTime;
            this.IPQuery.endTime = this.endTime;
            this.IPQuery.ip = this.currentData.ip;
            this.getIPList();
        },
        methods: {
            handleClose(){
                this.$emit("onChangeStatus")
            },

            getIPList(){
                getDetailIPVisit(this.IPQuery).then(response=> {
                    this.IPList = response.data;
                    this.total = response.extend.page.totalHits;
                    this.IPQuery.currentPage = response.extend.page.currentPage;
                    this.IPQuery.pageSize = response.extend.page.pageSize;
                }).catch(e=>{

                })
            },
            handleUserSizeChange(val) {
                this.IPQuery.pageSize = val;
                this.getIPList();
            },
            handleUserCurrentChange(val) {
                this.IPQuery.currentPage = val;
                this.getIPList();
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