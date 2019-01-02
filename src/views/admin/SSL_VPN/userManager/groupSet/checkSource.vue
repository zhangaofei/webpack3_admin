<template>
    <div class="sourceList-dialog public">
        <el-dialog title="设置资源"
                   custom-class="dialog public"
                   :visible.sync="InfoVisible"
                   top="2%"
                   @close="handleClose" @open="doSource(groupId)"
        >
            <div style="padding: 0 20px 0 20px">
                <el-table
                        ref="multipleTable"
                        :data="allSelectedResource"
                        :header-cell-style="headerCellStyle"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                    <el-table-column
                            prop="appType"
                            align="center"
                            label="当前用户组"
                    >
                        <template slot-scope="scope">{{ scope.row.group_name}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="appType"
                            align="center"
                            label="OAUTH认证"
                    >
                        <template slot-scope="scope">{{ scope.row.oauth_name}}</template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="appName"
                            label="扩展组"
                    >
                        <template slot-scope="scope">{{ scope.row.external_name}}</template>
                    </el-table-column>
                </el-table>

                <div class="row" style="margin-top:8px;" >
                    <div class="block" style="margin-right: 2%;float: right" >
                        <el-pagination
                                @size-change="handleAppSizeChange"
                                @current-change="handleAppCurrentChange"
                                :current-page="resourceQuery.currentPage"
                                :page-sizes="[2]"
                                :page-size="resourceQuery.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="resourceQuery.total">
                        </el-pagination>
                    </div>
                </div>
            </div>

            <div class='form-footer ' slot="footer">

            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {getEnvasOauthList, getEnvasOauthListByGroup} from 'api/SSL_VPN/userManager/new-groupSet';
    export default {
        computed: {},
        components: {

        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                reserveSelection:true,
                InfoVisible: true,
                resourceQuery:{
                    currentPage: 1,
                    pageSize: 2,
                    total:0,
                    groupId:''
                },
                resourceList:[],
                allSelectedResource:[],
                selectedAuthList:[],
                list:[]
            }
        },
        created() {
            this.getResourceList();
        },
        props:["groupId"],
        methods: {
            handleClose() {
                this.$emit("onSourceStatus")
            },
            doSource(groupId){
                this.InfoVisible = true;
            },
            getResourceList(){
                this.resourceQuery.groupId= this.groupId;
                getEnvasOauthListByGroup(this.resourceQuery).then(resp=>{
                    this.allSelectedResource = resp.data;
                    console.log('all11:', this.allSelectedResource);
                    this.resourceQuery.total=resp.extend.page.totalHits;
                }).catch(err=>{
                    console.log("获取用户组资源发生错误：",err);
                })
            },
            handleAppSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.resourceQuery.pageSize = val;
                this.getResourceList();
            },
            handleAppCurrentChange(val) {
                this.resourceQuery.currentPage = val;
                this.getResourceList();

            },
            sourceSet(){
                this.InfoVisible = false;
            }
        }
    }
</script>
<style>
    .sourceList-dialog .el-dialog__body{
        min-height: 630px!important;
    }
    .sourceList-dialog .dialog{
        min-width: 850px;
    }
    .sourceList-dialog .el-dialog__header{
        padding-left:5px ;
    }
    .sourceList-dialog__footer {
        background-color: #E7E7E7;
        border-top: 1px solid #E7E7E7;
        height: 100px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }
</style>