<template>
    <div class="sourceList-dialog public">
        <el-dialog title="设置资源"
                   custom-class="dialog public"
                   :visible.sync="InfoVisible"
                   top="2%"
                   @close="handleClose"
        >
            <div style="padding: 0 20px 0 20px">
                <el-table
                        ref="multipleTable"
                        :data="resourceList"
                        :header-cell-style="headerCellStyle"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleResourceSelectionChange">
                    <el-table-column
                            align="center"
                            type="selection"
                            :selectable = "isAvailable"
                            width="80"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="扩展组"
                    >
                        <template slot-scope="scope">{{ scope.row.external_name}}</template>
                    </el-table-column>
                    <el-table-column
                            prop="appType"
                            align="center"
                            label="当前用户组"
                    >
                        <template slot-scope="scope">{{ scope.row.usedGroupName}}</template>
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
                <div  class="foot">
                    <span  @click="sourceReset" class="cancle btn_middle">取消</span>
                    <el-button
                            type="primary"
                            class="primary confirm btn_middle"
                            @click="sourceSet">
                        确定
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {groupAppList, getEnvasOauthList} from 'api/SSL_VPN/userManager/new-groupSet';
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
                resourceQuery:{
                    currentPage: 1,
                    pageSize: 2,
                    total:0,
                    groupId:'',
                    authId:''
                },
                resourceList:[],
                allSelectedResource:[],
                cancelSelected:[]
            }
        },
        props:['authId',"cancelSource"],
        created() {
            this.getResourceList();
//            if (this.submitClick){
//                this.allSelectedResource = [];
//            } else {
//                this.allSelectedResource = this.selectedArr;
//            }
//            console.log('submitClick, allSelectedResource:', this.submitClick, this.allSelectedResource);
        },
        methods: {
            isAvailable(row, index){
                if (row.usedGroupId == this.groupId || row.usedGroupId == null){
                    return 1;
                } else {
                    return 0;
                }
            },
            handleClose() {
                this.$emit("onSourceStatus", this.cancelSelected);
                this.InfoVisible = false
            },
            doAddSource() {
                this.InfoVisible = true
                console.log('doSource',this.InfoVisible)
            },

            getResourceList(){
                this.resourceQuery.authId = this.authId;
                getEnvasOauthList(this.resourceQuery).then(resp=>{
                    this.resourceList=resp.data.oauthList;
                    this.resourceQuery.total=resp.extend.page.totalHits;
                    this.allSelectedResource = this.cancelSource;
                    let selectedIndexes = [];
                    for (let i = 0; i < this.resourceList.length; i++){
                        for (let j = 0; j < this.allSelectedResource.length; j++){
                            if (this.resourceList[i].external_id == this.allSelectedResource[j].external_id){
                                selectedIndexes.push(i);
                                break;
                            }
                        }
                    }
                    var $this = this;
                    this.$nextTick(function () {
                        selectedIndexes.forEach(index => {
                            $this.$refs.multipleTable.toggleRowSelection($this.resourceList[index], true);
                        });
                    })

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
                console.log(`当前页: ${val}`);
                this.resourceQuery.currentPage = val;

                this.getResourceList();
            },
            handleResourceSelectionChange(val) {
                for (let i = 0; i < this.resourceList.length; i++){
                    for (let j = 0; j < this.allSelectedResource.length; j++){
                        if (this.resourceList[i].external_id == this.allSelectedResource[j].external_id){
                            this.allSelectedResource.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
                for (let i = 0; i < val.length; i++){
                    this.allSelectedResource.push(val[i]);
                }
            },

            sourceSet(){
                this.$emit("onSourceStatus",this.allSelectedResource)
                this.InfoVisible = false;
            },
            sourceReset(){
                this.$emit("onSourceStatus",this.cancelSelected);
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