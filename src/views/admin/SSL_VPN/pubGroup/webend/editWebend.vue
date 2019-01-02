<template>
    <div class="admin public">
        <el-dialog title="选择应用关联组" :visible.sync="addVisible" @close="handleClose" size="small" custom-class="dialog public" top="10%">
            <!--<div class="col-sm-6">-->
                <div style="float:left;">
                    <!--<el-input v-model="groupName" style="width: 170px; float: left" :disabled="true"></el-input>-->
                    <!--<el-input v-model="remark" style="width: 180px;padding-left: 10px" :disabled="true"></el-input>-->
                </div>
                <div id="example1_filter" class="dataTables_filter" style="margin-right:37px;float:right;" v-if="false">
                    <input type="text"
                           class="form-control"
                           placeholder=""
                           id="search_content"
                           v-model="listQuery.searchContent"
                           @keyup.enter="search($event)"/>
                    <span class="input-group-btn" style="float: right;position: relative;top:-34px">
                        <button class="btn btn-primary" type="button" @click="getList()" >
                            <span class="glyphicon glyphicon-search" ></span>
                        </button>
                    </span>
                </div>
            <!--</div>-->
            <el-table
                    ref="multipleTable"
                    :data="webendList"
                    :header-cell-style="headerCellStyle"
                    border
                    tooltip-effect="dark"
                    style="width: 100%;"
                    @select="handleSelect"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        prop=""
                        type="selection"
                        width="80"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="应用名"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        label="添加方法"
                        align="center"
                >
                    <template slot-scope="scope" >
                        <span v-if="scope.row.addType==0">协定添加</span>
                        <span v-else>自主添加</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="protocol"
                        label="协议类型"
                        align="center"
                >
                </el-table-column>
            </el-table>
            <div class="row" style="margin-top:8px;" id="pages_list">
                <div class="block" style="margin-right: 2%;float: right" >
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="listQuery.currentPage"
                            :page-sizes="[10]"
                            :page-size="listQuery.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="listQuery.total">
                    </el-pagination>
                </div>
            </div>
            <div class='form-footer ' slot="footer">
                <div class="foot">
                    <span class="canle" @click="sourceReset">取消</span>
                    <el-button
                            class="primary confirm btn_middle"
                            type="primary"
                            @click="sourceSet">
                        保存
                    </el-button>

                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getAllAppsList, getSelectedAppsList, updateAppsForGroup,getEnsslList} from "api/SSL_VPN/new_resourceManager/group";
    import {getTerminalBySort} from "api/SSL_VPN/userManager/pubGroup";
    import {getWebendList,getTerminalByGroup,getTerminalByGroupNoPage, updateTerminals} from "api/webTerminal/webTerminal";
    export default {

        components: {},
        computed: {

        },
        data() {
            return {
                headerCellStyle:{
                    backgroundColor:'#eef1f6'
                },
                addVisible: true,
                webendList:[],
                appsList:[],
                listQuery: {
                    searchContent:'',
                    currentPage:1,
                    pageSize:10,
                    total:10,
                    groupId: '',
                },
                groupId: '',
                selectedList:[],
                groupName:'',
                remark:'',
                selectArr:[]
            }
        },
        props:['id','objData'],
        created() {
            this.getSelectedList();
            this.getList();
            // this.groupName = '用户组:  ' + this.currentData.groupName;
            // this.remark = '说明:  ' + this.currentData.remark;
        },
        methods: {
            search(event){
                if(event.keyCode==13){
                    this.getList();
                }
            },
            getSelectedList(){
                getTerminalByGroupNoPage({groupId:this.id}).then(response => {
                    this.selectedList = response.data;
                    this.getList();
                }).catch((e) => {
                    console.log(e);
                })
            },
            getList(){
                this.listQuery.groupId=this.id;
                getTerminalBySort(this.listQuery).then(response => {
                        this.webendList = response.data;
                        this.listQuery.total = response.extend.page.totalHits;

                        let selectedIndexes = [];
                        for (let i = 0; i < this.webendList.length; i++){
                            for (let j = 0; j < this.selectedList.length; j++){
                                if (this.webendList[i].id == this.selectedList[j].id){
                                    selectedIndexes.push(i);
                                    break;
                                }
                            }
                        }
                        this.$nextTick(()=> {
                            selectedIndexes.forEach(index => {
                                this.$refs.multipleTable.toggleRowSelection(this.webendList[index], true);
                            });
                        })
                    /*===*/
                    /*this.webendList.forEach((row,index,arr) => {
                        if(row.status==1){
                            this.$nextTick(()=>{
                                this.$refs.multipleTable.toggleRowSelection(row);
                            })
                        }
                    });*/
                }).catch((e) => {
                    console.log(e);
                })
            },
            handleClose() {
                this.$emit("onWebendStatus");
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList();
            },
            handleSelect(val,row){
                this.curRow=row;
                let flag=val.some((item)=>{
                    if(this.curRow){
                        return item.id==this.curRow.id
                    }
                });
                if(!flag){
                    this.selectedList=this.selectedList.filter((item)=>{
                        if(this.curRow){
                            return item.id!=this.curRow.id
                        }
                    })
                }
            },
            handleSelectionChange(val){
                let len = Math.ceil(this.listQuery.total/this.listQuery.pageSize);
                this.selectArr.length = len;
                this.selectArr[this.listQuery.currentPage] = val.map(item => item);
                // console.log('selectArr',this.selectArr[this.listQuery.currentPage])
                let arr = [];
                this.selectArr.forEach(item => {
                    if (item instanceof Array) {
                        item.forEach(child => {
                            arr.push(child);
                        })
                    }
                });
                this.selectedList = [...this.selectedList, ...arr];
                let obj = {};
                this.selectedList = this.selectedList.reduce((cur,next) => {
                    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
                    return cur;
                },[]);
                if(val.length==0){
                    for(let i=0;i<this.webendList.length;i++){
                        for(let j=0;j<this.selectedList.length;j++){
                            if (this.selectedList[j].id == this.webendList[i].id){
                                this.selectedList.splice(j, 1);
                                j--;
                                break
                            }
                        }
                    }
                }
               /* for (let i = 0; i < this.webendList.length; i++){
                    for (let j = 0; j < this.selectedList.length; j++){
                        if (this.webendList[i].id == this.selectedList[j].id){
                            this.selectedList.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
                for (let i = 0; i < val.length; i++){
                    this.selectedList.push(val[i]);
                }*/
            },
            sourceReset(formName) {
                this.addVisible = false;
                this.$emit("onWebendStatus",this.selectedList);
            },
            sourceSet(formName) {
                this.appsList = this.selectedList;
                console.log('list:', this.selectedList);
                updateTerminals(this.id, this.selectedList).then(resp => {
                        if(resp.status=='SUCCESS'){
                            this.addVisible = false;
                            this.$emit("onWebendStatus");
                            this.$message({
                                type: 'success',
                                message: '关联成功!'
                            });
                        }else {
                            this.$message({
                                type: 'warning',
                                message: resp.code
                            });
                        }
                    }).catch((e) => {
                        console.log(e);
                    })

            }
        }
    }
</script>
<style>

    .el-dialog--tiny {
        width: 25%;
    }

    /* 设置弹出框大小*/
    .admin .dialog {
        min-width: 830px;
    }

    .admin .el-dialog__header {
        padding-left: 5px;
    }

    .admin .el_put {
        position: relative;
        display: inline-block;
        /*width: 65% !important;*/
        margin-left: 80px;
    }

    .admin .el_sel {
        /*width: 65% !important;*/
        margin-left: 80px;
    }

    .admin .el_text {
        margin-left: 158px;
    }

    .admin-form .el-form-item__label {
        float: left;
        min-width: 135px;
        font-size: 15px;
        margin-left: 78px;
    }

    .admin-form .el-form-item {
        margin-bottom: 17px;
    }

    .admin .el-dialog__body {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
    }

    .admin-form .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 165px;
    }
</style>
