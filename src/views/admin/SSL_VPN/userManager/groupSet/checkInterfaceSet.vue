<template>
    <div class="userList-dialog public">
        <el-dialog title="查看关联接口"
                   custom-class="dialog public"
                   :visible.sync="InfoVisible"
                   top="2%"
                   @close="handleClose" @open="doUsersInit(groupId)"
        >
            <div style="padding: 0 20px 0 20px">
                <el-table
                        ref="multipleTable"
                        :data="userList"
                        :header-cell-style="headerCellStyle"
                        border
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            align="center"
                            label="API"
                    >
                    </el-table-column>
                </el-table>
                <div class="row" style="margin-top:8px;" >
                    <div class="block" style="margin-right: 2%;float: right" >
                        <el-pagination
                                @size-change="handleUserSizeChange"
                                @current-change="handleUserCurrentChange"
                                :current-page="userQuery.currentPage"
                                :page-sizes="[10]"
                                :page-size="userQuery.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
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
    import {getApiScanList} from 'api/SSL_VPN/userManager/new-groupSet';
    export default {
        components: {

        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                InfoVisible: true,
                total:null,
                userQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    groupId:''
                },
                userList:[],
            }
        },
        props:["groupId"],
        created() {
            this.getUserList();
        },
        methods: {
            handleClose() {
                this.$emit("onInterfaceStatus")
            },
            doUsersInit(groupId){

            },
            resetFrom(){
                this.InfoVisible = false;
            },
            getUserList(){
                //获取该用户组下的用户
                this.userQuery.groupId = this.groupId;
                getApiScanList(this.userQuery).then(response=> {
                    const data = response.data;
                    this.userList = data;
                    console.log("查看该用户组下的用户：",data)
                    this.total = response.extend.page.totalHits;
                    this.userQuery.currentPage = response.extend.page.currentPage;
                    this.userQuery.pageSize = response.extend.page.pageSize;
                }).catch(e=>{

                })
            },
            handleUserSizeChange(val) {
                this.userQuery.pageSize = val;
            },
            handleUserCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.userQuery.currentPage = val;
            }
        }
    }
</script>
<style>
    .userList-dialog .el-dialog__body{
        min-height: 630px!important;
    }
    .userList-dialog .dialog{
        min-width: 850px;
    }
    .userList-dialog .el-dialog__header{
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