<template>
    <div class="userList-dialog public">
        <el-dialog title="设置关联用户"
                   custom-class="dialog public"
                   :visible.sync="InfoVisible"
                   top="2%"
                   @close="handleClose"
        >
            <div style="padding: 0 20px 0 20px">
                <el-table
                        ref="multipleTable"
                        :data="userList"
                        :header-cell-style="headerCellStyle"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleUserSelectionChange">
                    <el-table-column
                            align="center"
                            type="selection"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="userName"
                            label="用户名"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="fullName"
                            label="用户全名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="groupName"
                            align="center"
                            label="当前用户组"
                            show-overflow-tooltip>
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
                                :total="userQuery.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class='form-footer ' slot="footer"  >
                <div  class="foot">
                    <span  @click="userReset" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="userSet">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {groupClientUserList} from 'api/SSL_VPN/userManager/new-groupSet';
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
                userQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    searchContent:'',
                    total:0
                },
                userList:[],
                allSelectedUsers:[],
                cancelSelected:[]
            }
        },
        props:["cancelUsers"],
        created() {
            this.allSelectedUsers = []
            this.getUserList();
        },
        methods: {
            handleClose() {
                this.$emit("onUsersStatus", this.cancelSelected);
                this.InfoVisible = false
            },
            doAddUsers() {
                this.InfoVisible = true
                console.log('doUsers',this.InfoVisible)
            },
            getUserList(){
                groupClientUserList(this.userQuery.currentPage,
                        this.userQuery.pageSize,
                        this.userQuery.searchContent).then(response=>{
                    const data = response.data;
                    this.userList = data;
                    this.userQuery.total = response.extend.page.totalHits;
                    this.allSelectedUsers = this.cancelUsers;
                    let selectedIndexes = [];
                    for (let i = 0; i < this.userList.length; i++){
                        for (let j = 0; j < this.allSelectedUsers.length; j++){
                            if (this.userList[i].id == this.allSelectedUsers[j].id){
                                selectedIndexes.push(i);
                                break;
                            }
                        }
                    }
                    console.log('当前页: ' + this.userQuery.currentPage + ', 被选中的序号selectedIndexes: ' + selectedIndexes.join(','));

                    var $this = this;
                    this.$nextTick(function () {
                        selectedIndexes.forEach(index => {
                            console.log('选中序号: ' + index + ', 当前序号对应的行数据: ' + $this.userList[index]);
                            $this.$refs.multipleTable.toggleRowSelection($this.userList[index], true);
                        });
                    })

                }).catch(e=>{

                })
            },
            handleUserSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.userQuery.pageSize = val;
                this.getUserList();
            },
            handleUserCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.userQuery.currentPage = val;
                this.getUserList();
            },
            handleUserSelectionChange(val) {
                for (let i = 0; i < this.userList.length; i++){
                    for (let j = 0; j < this.allSelectedUsers.length; j++){
                        if (this.userList[i].id == this.allSelectedUsers[j].id){
                            this.allSelectedUsers.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
                for (let i = 0; i < val.length; i++){
                    this.allSelectedUsers.push(val[i]);
                }
            },
            userSet(){
                this.$emit("onUsersStatus",this.allSelectedUsers)
                this.InfoVisible = false;
            },
            userReset(){
                this.$emit("onUsersStatus",this.cancelSelected);
                this.InfoVisible = false;
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