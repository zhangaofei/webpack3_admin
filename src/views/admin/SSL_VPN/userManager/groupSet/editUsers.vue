<template>
    <div class="userList-dialog public">
        <el-dialog title="设置关联用户"
                   custom-class="dialog public"
                   :visible.sync="InfoVisible"
                   top="2%"
                   @close="handleClose" @open="doUsersInit(groupId)"
        >
            <div style="padding: 0 20px 0 20px">
                <el-table
                        ref="multipleTable"
                        :data="currentPageList"
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
            <div class='form-footer ' slot="footer">
                <div  class="foot">
                    <span @click="InfoVisible = false" class="cancle btn_middle">取消</span>
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
    import {groupClientNotIncludeUserList, groupClientIncludeUserList} from 'api/SSL_VPN/userManager/new-groupSet';
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
                userQuery: {
                    currentPage: 1,
                    pageSize: 10,
                    total:0
                },
                userList:[],
                includeUserList:[],
                notIncludeUserList:[],
                allSelectedUsers:[],
                fakePageUserList:[],
                fakePageSelectedUserList:[],
                currentPageList:[],
                cancelArr:[],
                click:false
            }
        },
        props:['groupId', 'cancelUsers', 'userCk'],
        created() {
            this.allSelectedUsers = [];
            this.getUserList();
        },
        methods: {
            handleClose() {
                this.$emit('onUsersStatus',this.cancelArr, this.click);
            },
            doUsersInit(groupId){

            },
            log(){
                let msg = '';
                for(let arg of arguments) {
                    msg += JSON.stringify(arg);
                }
            },
            getUserList(){

                //获取不在该用户组下的所有用户
                groupClientNotIncludeUserList(this.groupId).then(response=>{
                    const data = response.data;
                    this.notIncludeUserList = data;
                    //获取该用户组下的用户
                    groupClientIncludeUserList(this.groupId).then(response=> {

                        const data = response.data;
//                        if(this.userCk == true){
//                            this.includeUserList = this.cancelUsers;
//                            this.cancelArr = this.cancelUsers;
//                        } else {
                            this.includeUserList = data;
                            this.cancelArr = data;
//                        }
                        this.userList = this.includeUserList.concat(this.notIncludeUserList);
                        // +++++++++++++++++++++ 开始假分页 ************************* //
                        let page = Math.ceil(this.userList.length/10); // 取到总页码
                        this.userQuery.total = this.userList.length;
                        for(let i = 0; i < page; i++) { // 初始化假的分页数据和被选中的数据
                            this.fakePageUserList.push([]);
                            this.fakePageSelectedUserList.push([]);
                        }

                        for(let i = 0; i < this.userList.length; i++) { // 假分页
                            let index = Math.floor(i / 10); // 获取在假分页的索引
                            this.fakePageUserList[index].push(this.userList[i]); // 数据存放到对应页的数组中

                        }

                        for(let i = 0; i < this.fakePageUserList.length; i++) {
                            for(let j = 0; j < this.fakePageUserList[i].length; j++) { // 遍历假分页的每一页数据
                                for (let n = 0; n < this.includeUserList.length; n++) { // 遍历被选中的列表
                                    if (this.fakePageUserList[i][j].id == this.includeUserList[n].id) {
                                        this.fakePageSelectedUserList[i].push(this.fakePageUserList[i][j]); // 把被选中的放进假的分页选中列表
                                    }
                                }
                            }
                        }

                        this.currentPageList = this.fakePageUserList[0];
                        this.log('fakePageSelectedUserList:',this.fakePageSelectedUserList);
                        // +++++++++++++++++++++ 假分页结束 ************************* //


                        this.allSelectedUsers = this.includeUserList;

                        var $this = this;

                        this.$nextTick(function () {
                            for(let i = 0; i < $this.fakePageUserList[0].length; i++) {
                                for(let j = 0; j < $this.fakePageSelectedUserList[0].length; j++) {
                                    if ($this.fakePageUserList[0][i] == $this.fakePageSelectedUserList[0][j]) {
                                        $this.$refs.multipleTable.toggleRowSelection($this.currentPageList[i], true);
                                    }
                                }
                            }
                        })
                    }).catch(e=>{
                        console.log("group_请求参数出错:",e);
                    })
                }).catch(e=>{


                })
            },
            handleUserSizeChange(val) {
                this.userQuery.pageSize = val;
            },
            handleUserCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.userQuery.currentPage = val;
                this.currentPageList =  this.fakePageUserList[parseInt(val) - 1];
                var $this = this;
                this.$nextTick(function () {
                    this.log('开始渲染选中项')
                    for(let i = 0; i < $this.fakePageUserList[parseInt(val) - 1].length; i++) {
                        for(let j = 0; j < $this.fakePageSelectedUserList[parseInt(val) - 1].length; j++) {
                            if ($this.fakePageUserList[parseInt(val) - 1][i] == $this.fakePageSelectedUserList[parseInt(val) - 1][j]) {
                                $this.$refs.multipleTable.toggleRowSelection($this.currentPageList[i], true);
                            }
                        }
                    }
                })
            },
            handleUserSelectionChange(val) {
                this.$nextTick(function () {
                    this.log('当前页: ', this.userQuery.currentPage, '被选中的数据: ', val);
                    this.fakePageSelectedUserList[parseInt(this.userQuery.currentPage) - 1] = val;
                    this.log('点击选项后的fakePageSelectedUserList: ', this.fakePageSelectedUserList);
                })
            },
            userSet(){
                this.allSelectedUsers = [];
                for (let i = 0; i < this.fakePageSelectedUserList.length; i++) {
                    if (this.fakePageSelectedUserList[i].length > 0) {
                        for (let item of this.fakePageSelectedUserList[i]) {
                            this.allSelectedUsers.push(item);
                        }
                    }
                }
                this.click = true;
                this.$emit('onUsersStatus',this.allSelectedUsers, this.click);
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